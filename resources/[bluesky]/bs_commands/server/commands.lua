AddEventHandler('Commands:Shared:DependencyUpdate', RetrieveComponents)
function RetrieveComponents()
    Callbacks = exports['bs_base']:FetchComponent('Callbacks')
    Chat = exports['bs_base']:FetchComponent('Chat')
    WebAPI = exports['bs_base']:FetchComponent('WebAPI')
    Config = exports['bs_base']:FetchComponent('Config')
    RegisterChatCommands()
end

AddEventHandler('Core:Shared:Ready', function()
    exports['bs_base']:RequestDependencies('Commands', {
        'Chat',
        'Callbacks',
        'WebAPI',
        'Config',
    }, function(error)
        if #error > 0 then return end -- Do something to handle if not all dependencies loaded
        RetrieveComponents()
        RegisterCallbacks()
    end)
end)

function RegisterChatCommands()
    

    

    Chat:RegisterCommand('clear', function(source, args, rawCommand)
        TriggerClientEvent('chat:clearChat', source)
    end, {
        help = 'Clear The Chat'
    })
    
    Chat:RegisterCommand('ooc', function(source, args, rawCommand)
        if #rawCommand:sub(4) > 0 then
            Chat.Send:OOC(source, rawCommand:sub(4))
        end
    end, {
        help = 'Out of Character Chat, THIS IS NOT A SUPPORT CHAT',
        params = {{
                name = 'Message',
                help = 'The Message You Want To Send To The OOC Channel'
            }
        }
    }, -1)
    
    --[[ ADMIN-RESTRICTED COMMANDS ]]--
    Chat:RegisterAdminCommand('server', function(source, args, rawCommand)
        Chat.Send.Server:All(rawCommand:sub(8))
    end, {
        help = 'Send Server Message To All Players',
        params = {{
                name = 'Message',
                help = 'The Message You Want To Send To Server Channel'
            }
        }
    }, -1)
    
    Chat:RegisterAdminCommand('system', function(source, args, rawCommand)
        Chat.Send.System:All(rawCommand:sub(8))
    end, {
        help = 'Send System Message To All Players',
        params = {{
                name = 'Message',
                help = 'The Message You Want To Send To System Channel'
            }
        }
    }, -1)
    
    Chat:RegisterAdminCommand('kick', function(source, args, rawCommand)
        exports['bs_base']:FetchComponent('Punishment'):Kick(tonumber(args[1]), args[2], source)
    end, {
        help = 'Kick Player From Server',
        params = {{
                name = 'Target',
                help = 'Server ID of Who You Want To Kick'
            }, {
                name = 'Reason',
                help = 'Reason For The Kick'
            }
        }
    }, 2)

    Chat:RegisterAdminCommand("tpm", function(source, args, rawCommand)
		TriggerClientEvent("Commands:Client:TeleportToMarker", source)
	end, {
		help = "Teleport to Marker",
	})

    Chat:RegisterAdminCommand("tp", function(source, args, rawCommand)
		local coolArgs = stringsplit(rawCommand:sub(4):gsub(",", ""), " ")

		if tonumber(coolArgs[1]) ~= nil and tonumber(coolArgs[2]) ~= nil and tonumber(coolArgs[3]) ~= nil then
			SetEntityCoords(
				GetPlayerPed(source),
				tonumber(coolArgs[1]) + 0.0,
				tonumber(coolArgs[2]) + 0.0,
				tonumber(coolArgs[3]) + 0.0,
				0,
				0,
				0,
				false
			)
		else
			Chat.Send.System:Single(source, "Not All Numbers")
		end
	end, {
		help = "Teleport To Given Coords",
		params = {
			{
				name = "X",
				help = "X Coord",
			},
			{
				name = "Y",
				help = "Y Coord",
			},
			{
				name = "Z",
				help = "Z Coord",
			},
		},
	}, 3)

    Chat:RegisterAdminCommand('sv', function(source, args, rawCommand)
        TriggerClientEvent('Commands:Client:SpawnVehicle', source, args[1])
    end, {
        help = 'Spawn Vehicle With Given Model',
        params = {{
                name = 'Model Name',
                help = 'Name of the model you want to spawn'
            }
        }
    }, 1)


    Chat:RegisterAdminCommand('dv', function(source, args, rawCommand)
        TriggerClientEvent('Commands:Client:RemoveVehicle', source)
    end, {
        help = 'Deletes a Vehicle',
    }, 0)

end