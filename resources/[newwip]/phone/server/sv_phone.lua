RegisterNetEvent('message:tome')
AddEventHandler('message:tome', function(messagehueifh)
    local src = source		
    local first = messagehueifh:sub(1, 3)
    local second = messagehueifh:sub(4, 6)
    local third = messagehueifh:sub(7, 11)

    local msg = first .. "-" .. second .. "-" .. third
    TriggerClientEvent('chatMessage', src, 'Phone Number ', 4, msg)
end)

RegisterNetEvent('message:inDistanceZone')
AddEventHandler('message:inDistanceZone', function(somethingsomething, messagehueifh)
    local src = source		
    local first = messagehueifh:sub(1, 3)
    local second = messagehueifh:sub(4, 6)
    local third = messagehueifh:sub(7, 11)

    local msg = first .. "-" .. second .. "-" .. third
    TriggerClientEvent('chatMessage', somethingsomething, 'Phone Number ', 4, msg)
end)

function getNumberPhone(identifier)
    local result = Await(SQL.execute("SELECT Phone FROM characters WHERE _id = @id", {
        ['id'] = identifier
    }))
    if result[1] ~= nil then
        return result[1].Phone
    end
    return nil
end

RegisterCommand("pnum", function(source, args, rawCommand)
    local src = source
    local Player = exports['bs_base']:FetchComponent('Fetch'):Source(src)
    local Char = Player:GetData('Character')
    local srcPhone = getNumberPhone(Char:GetData('ID'))
    TriggerClientEvent('sendMessagePhoneN', src, srcPhone)
end, false)