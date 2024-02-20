-- RemoveItem = function(source, item, amount, slot)
-- 	local Player = LS_CORE.Functions.GetPlayer(source)

-- 	if not Player then return false end

-- 	amount = tonumber(amount) or 1
-- 	slot = tonumber(slot)

-- 	if slot then
-- 		if Player.DATA.items[slot].amount > amount then
-- 			Player.DATA.items[slot].amount = Player.DATA.items[slot].amount - amount
-- 			Player.Functions.SetPlayerData(Player.DATA)
-- 			Player.Player.Functions.SetPlayerData("items", Player.DATA.items)

-- 			TriggerClientEvent('inventory:c:ItemMove', -1, Player.DATA.cid, nil, Player.DATA.items, nil)

-- 			return true
-- 		elseif Player.DATA.items[slot].amount == amount then
-- 			Player.DATA.items[slot] = nil
-- 			Player.Functions.SetPlayerData(Player.DATA)
-- 			Player.Player.Functions.SetPlayerData("items", Player.DATA.items)

			
-- 			TriggerClientEvent('inventory:c:ItemMove', -1, Player.DATA.cid, nil, Player.DATA.items, nil)

-- 			TriggerEvent('qb-log:server:CreateLog', 'playerinventory', 'RemoveItem', 'red', '**' .. GetPlayerName(source) .. ' (citizenid: ' .. Player.DATA.cid .. ' | id: ' .. source .. ')** lost item: [slot:' .. slot .. '], itemname: ' .. item .. ', removed amount: ' .. amount .. ', item removed')

-- 			return true
-- 		end
-- 	else
-- 		local slots = GetSlotsByItem(Player.DATA.items, item)
-- 		local amountToRemove = amount

-- 		if not slots then return false end
-- 		for _, _slot in pairs(slots) do
-- 			if Player.DATA.items[_slot].amount > amountToRemove then
-- 				Player.DATA.items[_slot].amount = Player.DATA.items[_slot].amount - amountToRemove
-- 				print(Player.DATA.items[_slot].amount)
-- 				Player.Functions.SetPlayerData(Player.DATA)
-- 				Player.Player.Functions.SetPlayerData("items", Player.DATA.items)

-- 				TriggerClientEvent('inventory:c:ItemMove', -1, Player.DATA.cid, nil, Player.DATA.items, nil)
				
-- 				return true
-- 			elseif Player.DATA.items[_slot].amount == amountToRemove then
-- 				Player.DATA.items[_slot] = nil
-- 				Player.Functions.SetPlayerData(Player.DATA)
-- 				Player.Player.Functions.SetPlayerData("items", Player.DATA.items)

				

-- 				TriggerEvent('qb-log:server:CreateLog', 'playerinventory', 'RemoveItem', 'red', '**' .. GetPlayerName(source) .. ' (citizenid: ' .. Player.DATA.cid .. ' | id: ' .. source .. ')** lost item: [slot:' .. _slot .. '], itemname: ' .. item .. ', removed amount: ' .. amount .. ', item removed')
-- 				TriggerClientEvent('inventory:c:ItemMove', -1, Player.DATA.cid, nil, Player.DATA.items, nil)

-- 				return true
-- 			end
-- 		end
-- 	end
-- 	return false
-- end

-- AddItem = function(source, item, amount, slot, info)
-- 	local Player = LS_CORE.Functions.GetPlayer(source)
-- 	if not Player then return false end

-- 	local totalWeight = GetTotalWeight(Player.DATA.items)
-- 	local itemInfo = Config.Shared.Items[item:lower()]
-- 	if not itemInfo and not Player.Offline then
-- 		print("Item wasnt real!")
-- 		return false
-- 	end

-- 	amount = tonumber(amount) or 1
-- 	slot = tonumber(slot) or GetFirstSlotByItem(Player.DATA.items, item)
-- 	info = info or {}

-- 	if itemInfo['type'] == 'weapon' then
-- 		info.serie = info.serie or tostring(LS_CORE.Config.RandomInt(2) .. LS_CORE.Config.RandomStr(3) .. LS_CORE.Config.RandomInt(1) .. LS_CORE.Config.RandomStr(2) .. LS_CORE.Config.RandomInt(3) .. LS_CORE.Config.RandomStr(4))
-- 		info.quality = info.quality or 100
-- 	end
-- 	if ((totalWeight + (itemInfo['weight'] * amount))/1000) <= Config.Shared.Player.maxWeight then
-- 		if slot ~= nil and ((slot and Player.DATA.items[slot]) and (Player.DATA.items[slot].name:lower() == item:lower()) and (itemInfo['type'] == 'item' and not itemInfo['unique'])) then
-- 			Player.DATA.items[slot].amount = tonumber(Player.DATA.items[slot].amount) + tonumber(amount)
-- 			Player.DATA.items[slot].count = Player.DATA.items[slot].amount

-- 			Player.Functions.SetPlayerData(Player.DATA)
-- 			Player.Player.Functions.SetPlayerData("items", Player.DATA.items)

-- 			TriggerEvent('qb-log:server:CreateLog', 'playerinventory', 'AddItem', 'green', '**' .. GetPlayerName(source) .. ' (citizenid: ' .. Player.DATA.cid .. ' | id: ' .. source .. ')** got item: [slot:' .. slot .. '], itemname: ' .. Player.DATA.items[slot].name .. ', added amount: ' .. amount .. ', new total amount: ' .. Player.DATA.items[slot].amount)
-- 			TriggerClientEvent('inventory:c:ItemMove', -1, Player.DATA.cid, nil, Player.DATA.items, nil)
			
-- 			return true
-- 		elseif slot ~= nil and (not itemInfo.unique and (slot or slot and Player.DATA.items[slot] == nil)) and (Player.DATA.items[slot] == nil or Player.DATA.items[tonumber(slot)] == nil) then
-- 			Player.DATA.items[slot] = { 
-- 				name = itemInfo['name'], 
-- 				amount = amount, 
-- 				count = amount, 
-- 				info = info or '', 
-- 				label = itemInfo['label'], 
-- 				description = itemInfo['description'] or '', 
-- 				weight = itemInfo['weight'], 
-- 				type = itemInfo['type'], 
-- 				unique = itemInfo['unique'], 
-- 				useable = itemInfo['useable'], 
-- 				image = itemInfo['image'], 
-- 				shouldClose = itemInfo['shouldClose'], 
-- 				slot = slot, 
-- 				combinable = itemInfo['combinable'],
-- 				color = GenerateColor(itemInfo), 
-- 			}
-- 			Player.Functions.SetPlayerData(Player.DATA)
-- 			Player.Player.Functions.SetPlayerData("items", Player.DATA.items)

			

-- 			TriggerEvent('qb-log:server:CreateLog', 'playerinventory', 'AddItem', 'green', '**' .. GetPlayerName(source) .. ' (citizenid: ' .. Player.DATA.cid .. ' | id: ' .. source .. ')** got item: [slot:' .. slot .. '], itemname: ' .. Player.DATA.items[slot].name .. ', added amount: ' .. amount .. ', new total amount: ' .. Player.DATA.items[slot].amount)
-- 			TriggerClientEvent('inventory:c:ItemMove', -1, Player.DATA.cid, nil, Player.DATA.items, nil)

-- 			return true
-- 		else
-- 			for i = 1, Config.Shared.Player.slotSize, 1 do
-- 				i = tonumber(i)
-- 				if Player.DATA.items[tostring(i)] == nil and Player.DATA.items[tonumber(i)] == nil then
-- 					Player.DATA.items[i] = { 
-- 						name = itemInfo['name'], 
-- 						amount = amount, 
-- 						count = amount, 
-- 						info = info or '', 
-- 						label = itemInfo['label'], 
-- 						description = itemInfo['description'] or '', 
-- 						weight = itemInfo['weight'], 
-- 						type = itemInfo['type'], 
-- 						unique = itemInfo['unique'], 
-- 						useable = itemInfo['useable'], 
-- 						image = itemInfo['image'], 
-- 						shouldClose = itemInfo['shouldClose'], 
-- 						slot = i, 
-- 						combinable = itemInfo['combinable'],
-- 						color = GenerateColor(itemInfo), 
-- 					}
-- 					Player.Functions.SetPlayerData(Player.DATA)
-- 					Player.Player.Functions.SetPlayerData("items", Player.DATA.items)

					

-- 					TriggerEvent('qb-log:server:CreateLog', 'playerinventory', 'AddItem', 'green', '**' .. GetPlayerName(source) .. ' (citizenid: ' .. Player.DATA.cid .. ' | id: ' .. source .. ')** got item: [slot:' .. i .. '], itemname: ' .. Player.DATA.items[i].name .. ', added amount: ' .. amount .. ', new total amount: ' .. Player.DATA.items[i].amount)
-- 					TriggerClientEvent('inventory:c:ItemMove', -1, Player.DATA.cid, nil, Player.DATA.items, nil)

-- 					return true
-- 				end
-- 			end
-- 		end
-- 	elseif not Player.Offline then
-- 		print("Inventory full")
-- 	end
-- 	return false
-- end

-- SaveInventory = function(source, offline)
-- 	local DATA
-- 	if not offline then
-- 		local Player = LS_CORE.Functions.GetPlayer(source)

-- 		if not Player then return end

-- 		DATA = Player.DATA
-- 	else
-- 		DATA = source -- for offline users, the DATA gets sent over the source variable
-- 	end

--     local items = DATA.items
--     local ItemsJson = {}
--     if items and table.type(items) ~= "empty" then
--         for slot, item in pairs(items) do
--             if items[slot] then
--                 ItemsJson[#ItemsJson+1] = {
--                     name = item.name,
--                     amount = item.amount,
--                     count = item.amount,
--                     info = item.info,
--                     type = item.type,
--                     slot = slot,
--                 }
--             end
--         end
--         executeSave(DATA.cid, ItemsJson)
--     else
--         executeSave(DATA.cid, "[]")
--     end
-- end