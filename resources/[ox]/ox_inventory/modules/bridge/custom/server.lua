--CreateThread(function() lib.load('@ox_core.imports.server') end)


local Inventory = require 'modules.inventory.server'
local Items = require 'modules.items.server'

function server.setPlayerData(player)
    local src = source
    local user = exports['bs_base']:FetchComponent('Fetch'):Source(src)

    
    local playerData = user:GetData('Character')

    if playerData == nil then
        print("Error: Unable to fetch player data")
        return nil
    end

    return {
        source = playerData:GetData('Source'),
        name = playerData:GetData('First') .. ' ' .. playerData:GetData('Last'),
        groups = 'police',
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

