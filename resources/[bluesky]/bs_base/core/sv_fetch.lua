COMPONENTS.Fetch = {
    _required = { 'Source', 'PlayerData', 'All' },
    _name = 'base',

    --- @param source number
    Source = function(self, source)
        return COMPONENTS.Players[source]
    end,


    --- @param key string The key to fetch the data from.
    --- @param value any The value to fetch the data from.
    PlayerData = function(self, key, value)
        for k, v in pairs(COMPONENTS.Players) do
            if v:GetData(key) == value then
                return v
            end
        end
    
        return nil
    end,

    --- @param key string The key to fetch the data from.
    --- @param value any The value to fetch the data from.
    
    Database = function(self, key, value)
        local retVal = -1
    
        MySQL.Async.fetchAll('SELECT * FROM users WHERE ' .. key:lower() .. ' = @value LIMIT 1', {
            ['@value'] = value
        }, function(results)
            if results and #results > 0 then
                retVal = COMPONENTS.DataStore:CreateStore(-1, value, {
                    ID = results[1].id,
                    SID = results[1].sid,
                    Identifier = results[1].identifier,
                    Name = results[1].username,
                    Roles = results[1].roles
                })
            else
                retVal = nil
            end
        end)
    
        while retVal == -1 do
            Citizen.Wait(10)
        end
    
        return retVal
    end,
    
    
    All = function(self)
        return COMPONENTS.Players
    end
}