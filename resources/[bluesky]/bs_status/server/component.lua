Callbacks = nil
Status = nil

local _statuses = {}

AddEventHandler('Status:Shared:DependencyUpdate', RetrieveComponents)
function RetrieveComponents()
    Callbacks = exports['bs_base']:FetchComponent('Callbacks')
    Fetch = exports['bs_base']:FetchComponent('Fetch')
    Utils = exports['bs_base']:FetchComponent('Utils')
    Chat = exports['bs_base']:FetchComponent('Chat')
    Status = exports['bs_base']:FetchComponent('Status')
    Wallet = exports['bs_base']:FetchComponent('Wallet')
    RegisterChatCommands()
    --registerUsables()
end

AddEventHandler('Core:Shared:Ready', function()
    exports['bs_base']:RequestDependencies('Status', {
        'Callbacks',
        'Fetch',
        'Utils',
        'Chat',
        'Status',
        'Wallet'
    }, function(error)
        if #error > 0 then return end -- Do something to handle if not all dependencies loaded
        RetrieveComponents()
        RegisterCallbacks()
    end)
end)

STATUS = {
    Register = function(self, name, max, icon, tick)
        table.insert(_statuses, {
            name = name,
            max = max,
            icon = icon,
            tick = tick,
        })
    end,
    Get = {
        All = function(self)
            return _statuses
        end,
        Single = function(self, name)
            for k, v in ipairs(_statuses) do
                if v.name == name then
                    return v
                end
            end
        end,
    },
    Set = {
        All = function(self, data)

        end,
        Single = function(self, name, data)

        end,
    },
}

AddEventHandler('Proxy:Shared:RegisterReady', function()
    exports['bs_base']:RegisterComponent('Status', STATUS)
end)

RegisterServerEvent('Status:Server:Update')
AddEventHandler('Status:Server:Update', function(data)
    local player = Fetch:Source(source)
    local char = player:GetData('Character')
    if char ~= nil then
        local status = char:GetData('Status')
        if status == nil then status = {} end
        status[data.status] = data.value
        char:SetData('Status', status)
    end
end)

RegisterServerEvent('Status:Server:GetData')
AddEventHandler('Status:Server:GetData', function(data)
    local player = Fetch:Source(source)
    local char = player:GetData('Character')

    if char ~= nil then
        local status = char:GetData('Status')
        if status == nil then status = {} end
        if status[data.name] ~= nil then
            TriggerClientEvent('Status:Client:SetStatusData', source, data, status[data.name])
            --cb(status[data.name])
        else
            status[data.name] = data.max
            char:SetData('Status', status)
            TriggerClientEvent('Status:Client:SetStatusData', source, data, data.max)
            --cb(data.max)
        end
    else
        TriggerClientEvent('Status:Client:SetStatusData', source, data, data.max)
        --cb(data.max)
    end
end)