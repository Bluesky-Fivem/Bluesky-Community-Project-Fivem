AddEventHandler('Characters:Shared:DependencyUpdate', RetrieveComponents)
function RetrieveComponents()
    Chat = exports['bs_base']:FetchComponent('Chat')
end

AddEventHandler('Core:Shared:Ready', function()
    exports['bs_base']:RequestDependencies('Characters', {
        'Chat',
    }, function(error)
        if #error > 0 then return end -- Do something to handle if not all dependencies loaded
        RetrieveComponents()
    end)
end)

---Server.Chat
--@class Server.Chat
CHAT = {
    _required = { 'Send' },
    -- Refresh
    --@rename Chat.Refresh
    Refresh = {
      --- Commands
      -- This is method you can refresh all commands
      --@rename Chat.Refresh:Commands
        Commands = function(self, source)
            local player = exports['bs_base']:FetchComponent('Fetch'):Source(source)
            if player ~= nil then
                local pData = player:GetData()
                local char = player:GetData('Character')
                if char ~= nil then
                    local cData = char:GetData()
                    TriggerClientEvent('chat:resetSuggestions', player:GetData('Source'))
                    for k, command in pairs(commandSuggestions) do
                        TriggerClientEvent('chat:addSuggestion', player:GetData('Source'), '/' .. k, '')
                        if IsPlayerAceAllowed(source, ('command.%s'):format(k)) then
                            if commands[k] ~= nil then
                                if commands[k].admin then
                                    if player:GetData('Roles') == 'dev' then
                                        TriggerClientEvent('chat:addSuggestion', player:GetData('Source'), '/' .. k, command.help, command.params)
                                    else
                                        TriggerClientEvent('chat:removeSuggestion', player:GetData('Source'), '/' .. k)
                                    end
                                elseif commands[k].job ~= nil then
                                    for k2, v2 in pairs(commands[k].job) do
                                        if cData.Job ~= nil and v2['name'] == cData.Job.job and cData.JobDuty then
                                            if tonumber(v2['gradelevel']) <= cData.Job.grade.level then
                                                TriggerClientEvent('chat:addSuggestion', player:GetData('Source'), '/' .. k, command.help, command.params)
                                            else
                                                TriggerClientEvent('chat:removeSuggestion', player:GetData('Source'), '/' .. k)
                                            end
                                        else
                                            TriggerClientEvent('chat:removeSuggestion', player:GetData('Source'), '/' .. k)
                                        end
                                    end
                                else
                                    TriggerClientEvent('chat:addSuggestion', player:GetData('Source'), '/' .. k, command.help, command.params)
                                end
                            else
                                TriggerClientEvent('chat:addSuggestion', player:GetData('Source'), '/' .. k, '')
                            end
                        end
                    end
                end
            end
        end
    },
    ---RegisterCommand
    --
    -- You can register custom command with help text
    --@example
        -- -- The simple command can be used by everyone on the server
    --   Chat:RegisterCommand('clear', function(source, args, rawCommand)
    --     TriggerClientEvent('chat:clearChat', source)
    --   end, {
    --     help = 'Clear The Chat'
    --   })
    --
    --@example
        -- -- You can add specified job who use this command
    --    Chat:RegisterCommand('policelock', function(source, args, rawCommand)
    --      TriggerClientEvent('Doors:Lockdown', source)
    --    end, {
    --      help = 'Lockdown a door',
    --      params = {}
    --    }, -1, { { name = "police", gradelevel = 1 } })
    --@tparam table this self obj
    --@tparam string command command name
    --@tparam function callback callback function
    --@tparam string suggestion suggestion message
    --@tparam table arguments command arguments
    --@tparam string job job name which job use this command
    --@rename Chat:RegisterCommand
    RegisterCommand = function(this, command, callback, suggestion, arguments, job)
      if job ~= nil then
          if type(job) == 'table' and #job > 0 then
              for k,v in pairs(job) do
                  if v.name == nil then return end 
                  if v.gradelevel == nil then job.gradelevel = 1 end
              end
          end
      end

      commands[command] = {
            cb = callback,
            args = (arguments or -1),
            job = job
        }

      if suggestion ~= nil then
        if not suggestion.params or not type(suggestion.params) == "table" then suggestion.params = {} end
        if not suggestion.help or not type(suggestion.help) == "string" then suggestion.help = "" end

        commandSuggestions[command] = suggestion
      end

      RegisterCommand(command, function(source, args, rawCommand)
          local pData = exports['bs_base']:FetchComponent('Fetch'):Source(source)
          if pData ~= nil then
              -- TODO : Implement character specific data for commands (IE Jobs)
              local cData = pData:GetData('Character'):GetData()
              if commands[command].job ~= nil then
                  for k, v in pairs(commands[command].job) do
                      if cData.Job ~= nil and cData.JobDuty ~= nil and v['name'] == cData.Job.job and cData.JobDuty then
                          if tonumber(v['gradelevel']) <= cData.Job.grade.level then
                              if ((#args <= commands[command].args and #args == commands[command].args) or commands[command].args == -1) then
                                  callback(source, args, rawCommand)
                              else
                                  Chat.Send.Server:Single(source, 'Invalid Number Of Arguments')
                              end
                          end
                      end
                  end
              else
                  if ((#args <= commands[command].args and #args == commands[command].args) or commands[command].args == -1) then
                      callback(source, args, rawCommand)
                  else
                      Chat.Send.Server:Single(source, 'Invalid Number Of Arguments')
                  end
              end
          end
      end, false)
    end,
    ---RegisterAdminCommand
    --
    -- You can register admin command with specified job and help text
    --@example
    --  Chat:RegisterAdminCommand('system', function(source, args, rawCommand)
    --      Chat.Send.System:All(rawCommand:sub(8))
    --  end, {
    --    help = 'Send System Message To All Players',
    --    params = {{
    --            name = 'Message',
    --            help = 'The Message You Want To Send To System Channel'
    --        }
    --    }
    --  }, -1)
    --@tparam table this self obj
    --@tparam string command command name
    --@tparam function callback callback function
    --@tparam string suggestion suggestion message
    --@tparam table arguments command arguments
    --@rename Chat:RegisterAdminCommand
    RegisterAdminCommand = function(this, command, callback, suggestion, arguments)
        commands[command] = {
          cb = callback,
          args = (arguments or -1),
          admin = true
      }

      if suggestion then
        if not suggestion.params or not type(suggestion.params) == "table" then suggestion.params = {} end
        if not suggestion.help or not type(suggestion.help) == "string" then suggestion.help = "" end

        commandSuggestions[command] = suggestion
      end

        RegisterCommand(command, function(source, args, rawCommand)
            local player = exports['bs_base']:FetchComponent('Fetch'):Source(source)
            if player ~= nil then
                local pData = player:GetData()
                if player:GetData('Roles') == 'dev' then
                    if((#args <= commands[command].args and #args == commands[command].args) or commands[command].args == -1)then
                        callback(source, args, rawCommand)
                    else
                        Chat.Send.Server:Single(source, 'Invalid Number Of Arguments')
                    end
                else
                    --Do Something
                end
            end
        end, false)
    end
}

AddEventHandler('Proxy:Shared:RegisterReady', function()
    exports['bs_base']:RegisterComponent('Chat', CHAT)
end)

AddEventHandler('chatMessage', function(source, n, message)
    local player = exports['bs_base']:FetchComponent('Fetch'):Source(source)
    
    if player ~= nil then
        local char = player:GetData('Character')
        if char ~= nil then
            local cData = char:GetData()

            if(starts_with(message, '/'))then
                local command_args = stringsplit(message, " ")

                command_args[1] = string.gsub(command_args[1], '/', "")

                local commandName = command_args[1]

                if commands[commandName] ~= nil then
                    if commands[commandName].job ~= nil then
                        for k, v in pairs(commands[commandName].job) do
                            if cData.Job.job == v.name then
                                if v.gradelevel <= cData.job.grade.level and cData.JobDuty then
                                    local command = commands[commandName]
                                end
                            end
                        end
                    else
                        local command = commands[commandName]
                    end

                    if(command)then
                        local Source = source
                        CancelEvent()
                        table.remove(command_args, 1)
                        if (not (command.arguments <= (#command_args - 1)) and command.arguments > -1) then
                            Chat.Send.Server:Single(source, 'Invalid Number Of Arguments')
                        end
                    else
                        Chat.Send.Server:Single(source, 'Invalid Command Handler')
                    end
                else
                    Chat.Send.Server:Single(source, 'Invalid Command')
                end
            end
        end
    end
    CancelEvent()
end)

function CHAT.ClearAll(self)
    TriggerClientEvent('chat:clearChat', -1)
end

CHAT.Send = {
    OOC = function(self, source, message)
        local player = exports['bs_base']:FetchComponent('Fetch'):Source(source)
    
        if player ~= nil then
            local char = player:GetData('Character'):GetData()
            if char ~= nil then
                fal = char.First .. " " .. char.Last
                TriggerClientEvent('chat:addMessage', -1, {
                    template = '<div class="chat-message"><div class="chat-message-header">[OOC] {0}:</div><div class="chat-message-body">{1}</div></div>',
                    args = { fal, message }
                })
            end
        end
    end,
    Server = {
        All = function(self, message)
            TriggerClientEvent('chat:addMessage', -1, {
                template = '<div class="chat-message server"><div class="chat-message-header">[SERVER]</div><div class="chat-message-body">{0}</div></div>',
                args = { message }
            })
        end,
        Single = function(self, source, message)
            TriggerClientEvent('chat:addMessage', source, {
                template = '<div class="chat-message server"><div class="chat-message-header">[SERVER]</div><div class="chat-message-body">{0}</div></div>',
                args = { message }
            })
        end,
    },
    System = {
        All = function(self, message)
            TriggerClientEvent('chat:addMessage', -1, {
                template = '<div class="chat-message system"><div class="chat-message-header">[SYSTEM]</div><div class="chat-message-body">{0}</div></div>',
                args = { message }
            })
        end,
        Single = function(self, source, message)
            TriggerClientEvent('chat:addMessage', source, {
                template = '<div class="chat-message system"><div class="chat-message-header">[SYSTEM]</div><div class="chat-message-body">{0}</div></div>',
                args = { message }
            })
        end,
        Help = function(self, source, message)
            TriggerClientEvent('chat:addMessage', source, {
                template = '<div class="chat-message help"><div class="chat-message-header">[INFO]</div><div class="chat-message-body">{0}</div></div>',
                args = { message }
            })
        end
    }
}

AddEventHandler('Chat:Server:Server', function(source, message)
    TriggerClientEvent('chat:addMessage', source, {
        template = '<div class="chat-message server"><div class="chat-message-header">[SERVER]</div><div class="chat-message-body">{0}</div></div>',
        args = { message }
    })
    CancelEvent()
end)

RegisterServerEvent('Chat:ServerSendMeToNear')
AddEventHandler('Chat:ServerSendMeToNear', function(source, message)
    local src = source
    TriggerClientEvent('Chat:Client:ReceiveMe', -1, src, message)
end)

function stringsplit(inputstr, sep)
	if sep == nil then
		sep = "%s"
	end
	local t={} ; i=1
	for str in string.gmatch(inputstr, "([^"..sep.."]+)") do
		t[i] = str
		i = i + 1
	end
	return t
end