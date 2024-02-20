--CreateThread(function() lib.load('@ox_core.imports.server') end)


local Inventory = require 'modules.inventory.server'

function server.setPlayerData(player)
    local source = source
    local player = exports['bs_base']:FetchComponent('Fetch'):Source(source)

    if player == nil then
        print("Error: Unable to fetch user data")
        return nil
    end

    local playerData = player:GetData('Character')

    if playerData == nil then
        print("Error: Unable to fetch player data")
        return nil
    end

    return {
        source = 1,
        name = playerData:GetData('First') .. ' ' .. playerData:GetData('Last'),
        groups = playerData:GetData('Job'),
        sex = playerData:GetData('Gender'),
        dateofbirth = playerData:GetData('DOB'),
        identifier = playerData:GetData('ID'),
    }
end


RegisterServerEvent('Characters:Server:Spawn')
AddEventHandler('Characters:Server:Spawn', function()
	print("CLIENT SPAWN")
      --run if player spawn
    local player = server.setPlayerData()
	if player then
		server.setPlayerInventory(player)
		print(player)
	end
end)

