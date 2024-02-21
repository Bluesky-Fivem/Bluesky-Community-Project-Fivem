--CreateThread(function() lib.load('@ox_core.imports.server') end)


local Inventory = require 'modules.inventory.server'

function server.setPlayerData(src, user)
    local src = source
    local player = exports['bs_base']:FetchComponent('Fetch'):Source(src)

    
    local playerData = player:GetData('Character')

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
    local user = server.setPlayerData()
    print(json.encode(user))
	if user then
		server.setPlayerInventory(user)
		print(user)
	end
end)

