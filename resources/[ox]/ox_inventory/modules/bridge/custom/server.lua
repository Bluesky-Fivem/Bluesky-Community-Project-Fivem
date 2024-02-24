--CreateThread(function() lib.load('@ox_core.imports.server') end)


local Inventory = require 'modules.inventory.server'
local Items = require 'modules.items.server'

function server.setPlayerData(player)
    local playerData = exports['bs_base']:FetchComponent('Fetch'):Source(player.source)
    local char = playerData:GetData('Character')

    print(json.encode(char,{indent = true}))

    if char == nil then
        print("Error: Unable to fetch player data")
        return nil
    end

    return {
        source = char:GetData('Source'),
        name = char:GetData('First') .. ' ' .. char:GetData('Last'),
        groups = 'police',
        sex = char:GetData('Gender'),
        dateofbirth = char:GetData('DOB'),
        identifier = char:GetData('ID')   
    }
end


RegisterServerEvent('Characters:Server:Spawn')
AddEventHandler('Characters:Server:Spawn', function()
    local player = server.setPlayerData({source = source})
    if player then
        server.setPlayerInventory(player)
    end
end)