local _noUpdate = { 'Source', 'User', '_id', 'ID', 'First', 'Last', 'Phone', 'DOB', 'Gender' }


function StoreData(userId, char)
    local data = char:GetData()
    local id = data.ID
    for k, v in ipairs(_noUpdate) do 
        data[v] = nil 
    end

    local ped = GetPlayerPed(char:GetData('Source'))
    data.HP = GetEntityHealth(ped)
    data.Armor = GetPedArmour(ped)
    data.LastPlayed = os.time() * 1000

    MySQL.Async.execute("UPDATE characters SET HP = @hp, Armor = @armor, LastPlayed = @lastPlayed WHERE User = @userId", {
        ['@hp'] = data.HP,
        ['@armor'] = data.Armor,
        ['@lastPlayed'] = data.LastPlayed,
        ['@userId'] = userId,
    }, function(rowsChanged)
        -- Handle success or failure here if needed
        -- rowsChanged contains the number of rows affected by the query
    end)
end


Citizen.CreateThread(function()
    while Fetch == nil or Database == nil do Citizen.Wait(1000) end

    while true do
        Citizen.Wait(180000)
        Logger:Trace('Characters', 'Storing Character Data', { console = true })
        for k, v in pairs(Fetch:All()) do
            local char = v:GetData('Character')
            if char ~= nil then
                StoreData(v:GetData('ID'), char)
            end

            Citizen.Wait(1000)
        end
    end
end)