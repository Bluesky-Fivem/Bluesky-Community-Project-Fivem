doors = {}

-- Event needed so we can be listening for any updates to components that may
-- occur as a result of overriding or extending
AddEventHandler('Doors:Shared:DependencyUpdate', RetrieveComponents)
function RetrieveComponents()
    Callbacks = exports['bs_base']:FetchComponent('Callbacks')
    Logger = exports['bs_base']:FetchComponent('Logger')
    Utils = exports['bs_base']:FetchComponent('Utils')
    Doors = exports['bs_base']:FetchComponent('Doors')
    Chat = exports['bs_base']:FetchComponent('Chat')
    Jobs = exports['bs_base']:FetchComponent('Jobs')
    -- Inventory = exports['bs_base']:FetchComponent('Inventory')
end

AddEventHandler('Core:Shared:Ready', function()
    exports['bs_base']:RequestDependencies('Doors', {
        'Callbacks',
        'Logger',
        'Utils',
        'Doors',
        'Chat',
        -- 'Inventory',
        'Jobs'
    }, function(error)
        if #error > 0 then return end -- Do something to handle if not all dependencies loaded
        RetrieveComponents()
        RegisterCallbacks()
        RegisterChatCommands()
        -- RegisterItems()
        Doors:SetDefaultLocks(function(done)
            Doors:Fetch(function(d)
                if Utils:GetTableLength(d) > 0 then
                    for k, v in pairs(d) do
                        v.id = tonumber(v.id)
                        doors[v.id] = v
                    end
                end
            end)
        end)
    end)
end)

AddEventHandler('Proxy:Shared:RegisterReady', function()
    exports['bs_base']:RegisterComponent('Doors', DOORS)
end)

function RegisterChatCommands()
    Chat:RegisterAdminCommand('doors', function(source, args, rawCommand)
        TriggerClientEvent('Doors:AddDoor', source)
    end, {
        help = 'Add a door'
    })

    Chat:RegisterCommand('policelock', function(source, args, rawCommand)
        TriggerClientEvent('Doors:Lockdown', source)
    end, {
        help = 'Lockdown a door',
        params = {}
    }, -1, { { name = "police", gradelevel = 1 } })
end

-- function RegisterItems()
--     Inventory.Items:RegisterUse('lockpick', 'Doors', function(source, item)
--         TriggerClientEvent('Doors:client:usedLockpick', source, item)
--     end)
-- end

function RegisterCallbacks()
    Callbacks:RegisterServerCallback('Doors:Add', function(source, data, cb)
        Doors:Add(data.settings, source, cb)
    end)
    Callbacks:RegisterServerCallback('Doors:Remove', function(source, data, cb)
        Doors:Remove(data.door, cb)
    end)
    Callbacks:RegisterServerCallback('Doors:Fetch', function(source, data, cb)
        Doors:Fetch(cb)
    end)
    Callbacks:RegisterServerCallback('Doors:AdjustSettings', function(source, data, cb)
        Doors:AdjustSettings(data.door, data.setting, data.value, cb)
    end)
    Callbacks:RegisterServerCallback('Doors:SetLock', function(source, data, cb)
        Doors:SetLock(data.door, data.state, data.lockdown)
    end)
    Callbacks:RegisterServerCallback('Doors:GetJobs', function(source, data, cb)
        Jobs:GetAllJobs(function(jobs)
            cb(jobs)
        end)
    end)
end

DOORS = {
    Add = function(self, settings, source, cb)
        local nextId = 1
        exports.oxmysql:scalar('SELECT MAX(id) FROM doors', {}, function(nextIdResult)
            nextId = nextIdResult and (nextIdResult + 1) or 1
            local dataTable = {
                id = nextId,
                Coords = {
                    x = settings.coords.x,
                    y = settings.coords.y,
                    z = settings.coords.z,
                    h = settings.coords.h
                },
                Pitch = settings.pitch,
                Yaw = settings.yaw,
                DrawDistance = settings.draw,
                Public = settings.privacy,
                Multi = settings.multi,
                DoorType = settings.type,
                Model = settings.model,
                Lock = settings.lock,
                DefaultLock = (settings.defaultLock ~= nil and settings.defaultLock or settings.lock),
                Auth = settings.auth,
                Static = settings.static,
                Lockpickable = settings.lockpickable,
                Lockdown = false
            }
            exports.oxmysql:execute('INSERT INTO doors (id, x, y, z, h, Pitch, Yaw, DrawDistance, Public, Multi, DoorType, Model, Lock, DefaultLock, Auth, Static, Lockpickable, Lockdown) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            {nextId, settings.coords.x, settings.coords.y, settings.coords.z, settings.coords.h, settings.pitch, settings.yaw, settings.draw, settings.privacy, settings.multi, settings.type, settings.model, settings.lock, settings.defaultLock or settings.lock, settings.auth, settings.static, settings.lockpickable, 0},
            function(success)
                if success then
                    doors[nextId] = dataTable
                    if doors[nextId].Multi > 0 then
                        exports.oxmysql:execute('UPDATE doors SET Multi = ? WHERE id = ?', {nextId, doors[nextId].Multi}, function(s)
                            doors[Doors:GetMultiID(nextId)].Multi = nextId
                            TriggerClientEvent('Doors:client:updateNewDoor', -1, tonumber(nextId), dataTable)
                            TriggerClientEvent('Doors:client:adminCancelDoor', source)
                            cb(success)
                        end)
                    else
                        TriggerClientEvent('Doors:client:updateNewDoor', -1, tonumber(nextId), dataTable)
                        TriggerClientEvent('Doors:client:adminCancelDoor', source)
                        cb(success)
                    end
                else
                    cb(success)
                end
            end)
        end)
    end,
    
    Remove = function(self, door, cb)
        if doors[door].Multi > 0 then
            Doors:AdjustSettings(doors[door].Multi, 'Multi', 0, function() end)
        end
        exports.oxmysql:execute('DELETE FROM doors WHERE id = ?', {door}, function(success)
            if not success then
                cb(success)
                return
            end
            doors[door] = nil
            TriggerClientEvent('Doors:client:deleteDoor', -1, door)
            cb(success)
        end)
    end,
    
    SetDefaultLocks = function(self, cb)
        Doors:Fetch(function(d)
            if Utils:GetTableLength(d) > 0 then
                for k, v in pairs(d) do
                    exports.oxmysql:execute('UPDATE doors SET Lock = ? WHERE id = ?', {v.DefaultLock, v.id})
                end
            end
            cb(true)
        end)
    end,
    
    SetLock = function(self, door, state, lockdown)
        if doors[door] then
            doors[door].Lock = state
            doors[door].Lockdown = lockdown and state or false
            local multi = (doors[door].Multi > 0 and doors[door].Multi or false)
            if multi then doors[Doors:GetMultiID(door)].Lock = state end
            exports.oxmysql:execute('UPDATE doors SET Lock = ?, Lockdown = ? WHERE id = ?', {state, lockdown and state or false, door}, function(success)
                if multi then
                    exports.oxmysql:execute('UPDATE doors SET Lock = ?, Lockdown = ? WHERE id = ?', {state, lockdown and state or false, multi}, function(s)
                        TriggerClientEvent('Doors:client:updateDoor', -1, door, state)
                    end)
                else
                    TriggerClientEvent('Doors:client:updateDoor', -1, door, state)
                end
            end)
        end
    end,
    
    ToggleLock = function(self, door)
        if doors[door] then
            doors[door].Lock = not doors[door].Lock
            local multi = (doors[door].Multi > 0 and doors[door].Multi or false)
            if multi then doors[Doors:GetMultiID(door)].Lock = not doors[Doors:GetMultiID(door)].Lock end
            exports.oxmysql:execute('UPDATE doors SET Lock = ? WHERE id = ?', {not doors[door].Lock, door}, function(success)
                if multi then
                    exports.oxmysql:execute('UPDATE doors SET Lock = ? WHERE id = ?', {not doors[Doors:GetMultiID(door)].Lock, multi}, function(s)
                        TriggerClientEvent('Doors:client:updateDoor', -1, door, not doors[Doors:GetMultiID(door)].Lock)
                    end)
                else
                    TriggerClientEvent('Doors:client:updateDoor', -1, door, not doors[Doors:GetMultiID(door)].Lock)
                end
            end)
        end
    end,
    
    AdjustSettings = function(self, door, setting, value, cb)
        exports.oxmysql:transaction(function(callback)
            exports.oxmysql:execute('UPDATE doors SET ' .. setting .. ' = ? WHERE id = ?', {value, door}, function(success)
                if not success then
                    cb(success)
                    return
                end
                if doors[door].Multi > 0 then
                    exports.oxmysql:execute('UPDATE doors SET ' .. setting .. ' = ? WHERE id = ?', {value, doors[door].Multi}, function(s)
                        local multiIndex = Doors:GetMultiID(door)
                        doors[multiIndex][setting] = value
                        TriggerClientEvent('Doors:client:updateSettings', -1, multiIndex, setting, value)
                        callback(success)
                    end)
                else
                    doors[door][setting] = value
                    TriggerClientEvent('Doors:client:updateSettings', -1, door, setting, value)
                    callback(success)
                end
            end)
        end, function(finalSuccess)
            cb(finalSuccess)
        end)
    end,
    
    Fetch = function(self, cb)
        exports.oxmysql:execute('SELECT * FROM doors', {}, function(result)
            cb(result)
        end)
    end,

    GetNext = function(self, cb)
        exports.oxmysql:transaction(function(callback)
            exports.oxmysql:execute('INSERT INTO counters (type, next) VALUES (?, 1) ON DUPLICATE KEY UPDATE next = LAST_INSERT_ID(next + 1)', {'doors'}, function(success)
                if not success then
                    cb(nil)
                    return
                end
                exports.oxmysql:scalar('SELECT LAST_INSERT_ID()', {}, function(nextId)
                    callback(nextId)
                end)
            end)
        end, function(finalSuccess, insertedId)
            cb(insertedId)
        end)
    end,
    
    GetMultiID = function(self, door)
        if doors[door] then
            local multi = doors[door].Multi
            if multi > 0 then
                exports.oxmysql:scalar('SELECT id FROM doors WHERE id = ?', {multi}, function(multiId)
                    return multiId
                end)
            end
        end
        return 0
    end
    
}
