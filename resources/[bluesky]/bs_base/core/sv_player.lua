COMPONENTS.Players = {}
COMPONENTS.RecentDisconnects = {}

AddEventHandler('Proxy:Shared:RegisterReady', function()
    COMPONENTS.Middleware:Add('playerDropped', function(source, message)
        local player = COMPONENTS.Players[source]
        if player ~= nil then
            local char = player:GetData('Character')
            
            if char ~= nil then
                table.insert(COMPONENTS.RecentDisconnects, { 
                    ['name'] = char:GetData('First')..' '..char:GetData('Last'), 
                    ['reason'] = message, 
                    ['source'] = source, 
                    ['sid'] = COMPONENTS.Players[source]:GetData('SID'), 
                    ['cid'] = char:GetData('ID')
                })
            else
                local player = COMPONENTS.Players[source]
                table.insert(COMPONENTS.RecentDisconnects, { 
                    ['name'] = player:GetData('Name'), 
                    ['reason'] = message, 
                    ['source'] = source, 
                    ['sid'] = player:GetData('SID') 
                })
            end
        end
    end, 10000)
end)

AddEventHandler('playerDropped', function(message)
    local src = source
    COMPONENTS.Middleware:TriggerEvent('playerDropped', src, message)
    COMPONENTS.Players[src] = nil 
    collectgarbage()
end)

AddEventHandler('Queue:Server:SessionActive', function(source, data)
    Citizen.CreateThread(function()
        local pData = COMPONENTS.Player:GetData(source, data)
        if pData == nil then
            DropPlayer(source, 'Unable To Get Your User Data, Please Try To Rejoin')
        else
            COMPONENTS.Players[source] = Player(source, pData)
            TriggerClientEvent('Player:Client:SetData', source, COMPONENTS.Players[source]:GetData())
        end
    end)
end)


COMPONENTS.Player = {
    _required = { 'GetData' },
    _name = 'base',

    --- @param source number The source of the player.
    --- @param data string The data you want to get.

    GetData = function(self, source, data)
        local retVal = -1
        
        MySQL.Async.fetchAll('SELECT * FROM users WHERE sid = @sid LIMIT 1', {
            ['@sid'] = data.SID
        }, function(results)
            if results and #results > 0 then
                retVal = {
                    Source = source,
                    ID = results[1].id,
                    Name = data.Name,
                    SID = data.SID,
                    Identifier = data.Identifier,
                    Roles = data.Roles
                }
            else
                MySQL.Async.execute('INSERT INTO users (sid, identifier, priority, name) VALUES (@sid, @identifier, 0, @name)', {
                    ['@sid'] = data.SID,
                    ['@identifier'] = data.Identifier,
                    ['@name'] = GetPlayerName(source)
                }, function(success, rowsAffected, insertedId)
                    if not success then
                        COMPONENTS.Logger:Error('Database', '[^8Error^7] Error in insert Base sv_player : ' .. tostring(rowsAffected), { console = true })
                        return
                    end
    
                    retVal = {
                        Source = source,
                        ID = insertedId,
                        Name = data.Name,
                        SID = data.SID,
                        Identifier = data.Identifier,
                        Roles = data.Roles
                    }
                end)
            end
        end)
    
        while retVal == -1 do
            Citizen.Wait(10)
        end

        
        return retVal
    end
}


function Player(source, data)
   
    local _data = COMPONENTS.DataStore:CreateStore(source, 'Player', data)

    

    return _data
end