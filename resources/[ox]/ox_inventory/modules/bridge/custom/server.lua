--CreateThread(function() lib.load('@ox_core.imports.server') end)

local Inventory = require 'modules.inventory.server'

function server.setPlayerData(player)
	print('Hello')
	local source = source
	local player = exports['bs_base']:FetchComponent('Fetch'):Source(source)
    local char = player:GetData('Character')

	--local groups = {
	--	[player.job.name] = player:GetData('Job')
	--}

	return {
		source = char:GetData('ID'),
		name = char:GetData('First') .. ' ' .. char:GetData('Last'),
		groups = player:GetData('Job'),
		sex = player:GetData('Gender'),
		dateofbirth = player:GetData('DOB'),
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

