local LS_CORE = exports["ls-core"]:GetCoreObject()
local QBCore = LS_CORE.Config.FRAMEWORK == "QB" and exports["qb-core"]:GetCoreObject() or exports["es_extended"]:getSharedObject()

SetInventoryItems = function(Player, Inventory)
    Player.DATA.items = createItems(Inventory) --createItems(Inventory)

    Player.Functions.SetPlayerData(Player.DATA)
    SetPlayerItems(Player, Player.DATA.items)

	TriggerClientEvent("inventory:client:checkBackItems", Player.Source)
end

SetPlayerItems = function(Player, items)
	if LS_CORE.Config.FRAMEWORK == "QB" then
		Player.Player.Functions.SetPlayerData("items", items)
	end
end

exports("SetMainItems", function(source, items)
	local Player = LS_CORE.Functions.GetPlayer(source)
	if Player == nil then return end

	Player.DATA.items = createItems(items) 
    Player.Functions.SetPlayerData(Player.DATA)
end)

--#region Made because in newest qb versions requires

---Loads the inventory for the player with the citizenid that is provided
---@param source number Source of the player
---@param citizenid string CitizenID of the player
---@return { [number]: { name: string, amount: number, info?: table, label: string, description: string, weight: number, type: string, unique: boolean, useable: boolean, image: string, shouldClose: boolean, slot: number, combinable: table } } loadedInventory Table of items with slot as index
LoadInventory = function(source, citizenid)
    local inventory = LS_CORE.Config.DATABASE(LS_CORE.Config.DATABASE_NAME, 'fetchAll', 'SELECT * FROM ls_inventory where identifier = ?', { citizenid })[1]
	local loadedInventory = {}
    local missingItems = {}

    if not inventory then return loadedInventory end

    inventory = json.decode(inventory.data)
    if next(inventory) == nil then return loadedInventory end

	for _, item in pairs(inventory) do
		if item then
			local itemInfo = Config.Shared.Items[item.name:lower()]
			if itemInfo then
				loadedInventory[item.slot] = {
					name = itemInfo['name'],
					amount = item.amount,
                    count = item.count,
					info = item.info or '',
					label = itemInfo['label'],
					description = itemInfo['description'] or '',
					weight = itemInfo['weight'],
					type = itemInfo['type'],
					unique = itemInfo['unique'],
					useable = itemInfo['useable'],
					image = itemInfo['image'],
					shouldClose = itemInfo['shouldClose'],
					slot = item.slot,
					combinable = itemInfo['combinable'],
					color = GenerateColor(item),
				}
			else
				missingItems[#missingItems + 1] = item.name:lower()
			end
		end
	end

    if #missingItems > 0 then
        print(("The following items were removed for player %s as they no longer exist"):format(GetPlayerName(source)))
    end

    return loadedInventory
end

exports("LoadInventory", LoadInventory)

---Saves the inventory for the player with the provided source or DATA is they're offline
---@param source number | table Source of the player, if offline, then provide the DATA in this argument
---@param offline boolean Is the player offline or not, if true, it will expect a table in source
SaveInventory = function(source, offline)
    local DATA
    if not offline then
        local Player = LS_CORE.Functions.GetPlayer(source)
        if not Player then return end
        DATA = Player.DATA
    else
        DATA = source -- for offline users, the DATA gets sent over the source variable
    end

    local ItemsJson = {}
    for slot, item in pairs(DATA.items) do
        ItemsJson[#ItemsJson+1] = {
            name = item.name,
            amount = item.amount,
            count = item.amount,
            info = item.info,
            type = item.type,
            slot = slot,
        }
    end

    executeSave(DATA.cid, ItemsJson) -- Identifier => cid , because esx using dogshit identifier system
end
exports("SaveInventory", SaveInventory)

executeSave = function(identifier, items)
    local result = LS_CORE.Config.DATABASE(LS_CORE.Config.DATABASE_NAME, 'fetchAll', 'SELECT * FROM ls_inventory where identifier = ?', { identifier })[1]
    if result == nil then
        LS_CORE.Config.DATABASE( LS_CORE.Config.DATABASE_NAME, 'execute', 'INSERT INTO `ls_inventory` (identifier, data) VALUES (@identifier, @data)', {
            ["@identifier"] = identifier,
            ["@data"] = json.encode(items),
        })
    else
        LS_CORE.Config.DATABASE( LS_CORE.Config.DATABASE_NAME, 'execute', 'UPDATE `ls_inventory` SET `data` = @data WHERE `identifier` = @identifier', {
            ['@identifier'] = identifier,
            ['@data']       = json.encode(items),
        })
    end
end

---Gets the totalweight of the items provided
---@param items { [number]: { amount: number, weight: number } } Table of items, usually the inventory table of the player
---@return number weight Total weight of param items
GetTotalWeight = function(items)
	local weight = 0
    if not items then return 0 end
    for _, item in pairs(items) do
        weight += item.weight * item.amount
    end
    return tonumber(weight)
end

exports("GetTotalWeight", GetTotalWeight)

---Gets the slots that the provided item is in
---@param items { [number]: { name: string, amount: number, info?: table, label: string, description: string, weight: number, type: string, unique: boolean, useable: boolean, image: string, shouldClose: boolean, slot: number, combinable: table } } Table of items, usually the inventory table of the player
---@param itemName string Name of the item to the get the slots from
---@return number[] slotsFound Array of slots that were found for the item
GetSlotsByItem = function(items, itemName)
    local slotsFound = {}
    if not items then return slotsFound end
    for slot, item in pairs(items) do
        if item.name:lower() == itemName:lower() then
            slotsFound[#slotsFound+1] = slot
        end
    end
    return slotsFound
end

exports("GetSlotsByItem", GetSlotsByItem)

---Get the first slot where the item is located
---@param items { [number]: { name: string, amount: number, info?: table, label: string, description: string, weight: number, type: string, unique: boolean, useable: boolean, image: string, shouldClose: boolean, slot: number, combinable: table } } Table of items, usually the inventory table of the player
---@param itemName string Name of the item to the get the slot from
---@return number | nil slot If found it returns a number representing the slot, otherwise it sends nil
GetFirstSlotByItem = function(items, itemName)
    if not items then return nil end
    for slot, item in pairs(items) do
        if item.name:lower() == itemName:lower() then
            return tonumber(slot)
        end
    end
    return nil
end

exports("GetFirstSlotByItem", GetFirstSlotByItem)

---Add an item to the inventory of the player
---@param source number The source of the player
---@param item string The item to add to the inventory
---@param amount? number The amount of the item to add
---@param slot? number The slot to add the item to
---@param info? table Extra info to add onto the item to use whenever you get the item
---@return boolean success Returns true if the item was added, false it the item couldn't be added
AddItem = function(source, item, amount, slot, info)
    local Player = LS_CORE.Functions.GetPlayer(source)
    if not Player then return false end

    local totalWeight = GetTotalWeight(Player.DATA.items)
    local itemInfo = Config.Shared.Items[item:lower()]
    if not itemInfo and not Player.Offline then
        print("Item wasn't real!")
        return false
    end

    amount = tonumber(amount) or 1
    slot = tonumber(slot) or GetFirstSlotByItem(Player.DATA.items, item)
    info = info or {}

    if itemInfo['type'] == 'weapon' then
        info.serie = info.serie or tostring(LS_CORE.Config.RandomInt(2) .. LS_CORE.Config.RandomStr(3) .. LS_CORE.Config.RandomInt(1) .. LS_CORE.Config.RandomStr(2) .. LS_CORE.Config.RandomInt(3) .. LS_CORE.Config.RandomStr(4))
        info.quality = info.quality or 100
    end

	if item == "phone" then
		if GetResourceState("lb-phone") == "started" then
			TriggerClientEvent('lb-phone:itemAdded', source)
		end
	end

	if (itemInfo["decay"] and itemInfo["decay"] > 0.0) and (info and info.created == nil) then
		info.created = os.time()
	end

    local function addItemToSlot(slot, newAmount)
        Player.DATA.items[slot] = {
            name = itemInfo['name'],
            amount = newAmount,
            count = newAmount,
            info = info or '',
            label = itemInfo['label'],
            description = itemInfo['description'] or '',
            weight = itemInfo['weight'],
            type = itemInfo['type'],
            unique = itemInfo['unique'],
            useable = itemInfo['useable'],
            image = itemInfo['image'],
            shouldClose = itemInfo['shouldClose'],
            slot = slot,
            combinable = itemInfo['combinable'],
            color = GenerateColor(itemInfo),
        }
        Player.Functions.SetPlayerData(Player.DATA)
		SetPlayerItems(Player, Player.DATA.items)

        TriggerClientEvent('inventory:c:ItemMove', -1, Player.DATA.cid, nil, Player.DATA.items, nil)
        return true
    end

    if ((totalWeight + (itemInfo['weight'] * amount)) / 1000) <= Config.Shared.Player.maxWeight then
        if slot ~= nil and Player.DATA.items[slot] and Player.DATA.items[slot].name:lower() == item:lower() and itemInfo['type'] == 'item' and not itemInfo['unique'] then
            Player.DATA.items[slot].amount = tonumber(Player.DATA.items[slot].amount) + tonumber(amount)
            Player.DATA.items[slot].count = Player.DATA.items[slot].amount
            addItemToSlot(slot, Player.DATA.items[slot].amount )
            return true
        elseif slot ~= nil and (not itemInfo.unique and (slot and Player.DATA.items[slot] == nil)) then
            addItemToSlot(slot, amount)
            return true
        else
            for i = 1, Config.Shared.Player.slotSize, 1 do
                if not Player.DATA.items[tostring(i)] and not Player.DATA.items[tonumber(i)] then
                    addItemToSlot(i, amount)
                    return true
                end
            end
        end
    elseif not Player.Offline then
        print("Inventory full")
    end

    return false
end

exports("AddItem", AddItem)

---Remove an item from the inventory of the player
---@param source number The source of the player
---@param item string The item to remove from the inventory
---@param amount? number The amount of the item to remove
---@param slot? number The slot to remove the item from
---@return boolean success Returns true if the item was remove, false it the item couldn't be removed

RemoveItem = function(source, item, amount, slot)
	local Player = LS_CORE.Functions.GetPlayer(source)

	if not Player then return false end

	amount = tonumber(amount) or 1
	slot = tonumber(slot)

	local function removeItemFromSlot(slotToRemove)
		if Player.DATA.items[slotToRemove].amount > amount then
			Player.DATA.items[slotToRemove].amount = Player.DATA.items[slotToRemove].amount - amount
			Player.Functions.SetPlayerData(Player.DATA)
			SetPlayerItems(Player, Player.DATA.items)

			TriggerClientEvent('inventory:c:ItemMove', -1, Player.DATA.cid, nil, Player.DATA.items, nil)

			return true
		elseif Player.DATA.items[slotToRemove].amount == amount then
			Player.DATA.items[slotToRemove] = nil
			Player.Functions.SetPlayerData(Player.DATA)
			SetPlayerItems(Player, Player.DATA.items)

			TriggerEvent('qb-log:server:CreateLog', 'playerinventory', 'RemoveItem', 'red', '**' .. GetPlayerName(source) .. ' (citizenid: ' .. Player.DATA.cid .. ' | id: ' .. source .. ')** lost item: [slot:' .. slotToRemove .. '], itemname: ' .. item .. ', removed amount: ' .. amount .. ', item removed')

			TriggerClientEvent('inventory:c:ItemMove', -1, Player.DATA.cid, nil, Player.DATA.items, nil)

			return true
		end
	end

	if item == "phone" then
		if GetResourceState("lb-phone") == "started" then
			TriggerClientEvent('lb-phone:itemRemoved', source)
		end
	end

	if slot then
		return removeItemFromSlot(slot)
	else
		local slots = GetSlotsByItem(Player.DATA.items, item)
		local amountToRemove = amount

		if not slots then return false end

		for _, _slot in pairs(slots) do
			if removeItemFromSlot(_slot) then
				return true
			end
		end
	end

	return false
end

exports("RemoveItem", RemoveItem)

---Get the item with the slot
---@param source number The source of the player to get the item from the slot
---@param slot number The slot to get the item from
---@return { name: string, amount: number, info?: table, label: string, description: string, weight: number, type: string, unique: boolean, useable: boolean, image: string, shouldClose: boolean, slot: number, combinable: table } | nil item Returns the item table, if there is no item in the slot, it will return nil
GetItemBySlot = function(source, slot)
	local Player = LS_CORE.Functions.GetPlayer(source)
	slot = tonumber(slot)
	return Player.DATA.items[slot]
end

exports("GetItemBySlot", GetItemBySlot)

---Get the item from the inventory of the player with the provided source by the name of the item
---@param source number The source of the player
---@param item string The name of the item to get
---@return { name: string, amount: number, info?: table, label: string, description: string, weight: number, type: string, unique: boolean, useable: boolean, image: string, shouldClose: boolean, slot: number, combinable: table } | nil item Returns the item table, if the item wasn't found, it will return nil
GetItemByName = function(source, item)
	local Player = LS_CORE.Functions.GetPlayer(source)
	item = tostring(item):lower()
	local slot = GetFirstSlotByItem(Player.DATA.items, item)
	return Player.DATA.items[slot]
end

exports("GetItemByName", GetItemByName)

---Get the item from the inventory of the player with the provided source by the name of the item in an array for all slots that the item is in
---@param source number The source of the player
---@param item string The name of the item to get
---@return { name: string, amount: number, info?: table, label: string, description: string, weight: number, type: string, unique: boolean, useable: boolean, image: string, shouldClose: boolean, slot: number, combinable: table }[] item Returns an array of the item tables found, if the item wasn't found, it will return an empty table
local function GetItemsByName(source, item)
	local Player = LS_CORE.Functions.GetPlayer(source)
	item = tostring(item):lower()
	local items = {}
	local slots = GetSlotsByItem(Player.DATA.items, item)
	for _, slot in pairs(slots) do
		if slot then
			items[#items+1] = Player.DATA.items[slot]
		end
	end
	return items
end

exports("GetItemsByName", GetItemsByName)

---Clear the inventory of the player with the provided source and filter any items out of the clearing of the inventory to keep (optional)
---@param source number Source of the player to clear the inventory from
---@param filterItems? string | string[] Array of item names to keep
ClearInventory = function(source, filterItems)
	local Player = LS_CORE.Functions.GetPlayer(source)
	local savedItemData = {}

	if filterItems then
		local filterItemsType = type(filterItems)
		if filterItemsType == "string" then
			local item = GetItemByName(source, filterItems)

			if item then
				savedItemData[item.slot] = item
			end
		elseif filterItemsType == "table" and table.type(filterItems) == "array" then
			for i = 1, #filterItems do
				local item = GetItemByName(source, filterItems[i])

				if item then
					savedItemData[item.slot] = item
				end
			end
		end
	end

	Player.Functions.SetPlayerData(savedItemData)
	SetPlayerItems(Player, savedItemData)

	if Player.Offline then return end

	TriggerEvent('qb-log:server:CreateLog', 'playerinventory', 'ClearInventory', 'red', '**' .. GetPlayerName(source) .. ' (citizenid: ' .. Player.DATA.cid .. ' | id: ' .. source .. ')** inventory cleared')
end

exports("ClearInventory", ClearInventory)

---Sets the items DATA to the provided items param
---@param source number The source of player to set it for
---@param items { [number]: { name: string, amount: number, info?: table, label: string, description: string, weight: number, type: string, unique: boolean, useable: boolean, image: string, shouldClose: boolean, slot: number, combinable: table } } Table of items, the inventory table of the player
SetInventory = function(source, items)
	local Player = LS_CORE.Functions.GetPlayer(source)

	Player.Functions.SetPlayerData(items)
	SetPlayerItems(Player, items)

	if Player.Offline then return end

	TriggerEvent('qb-log:server:CreateLog', 'playerinventory', 'SetInventory', 'blue', '**' .. GetPlayerName(source) .. ' (citizenid: ' .. Player.DATA.cid .. ' | id: ' .. source .. ')** items set: ' .. json.encode(items))
end

exports("SetInventory", SetInventory)

---Set the data of a specific item
---@param source number The source of the player to set it for
---@param itemName string Name of the item to set the data for
---@param key string Name of the data index to change
---@param val any Value to set the data to
---@return boolean success Returns true if it worked
SetItemData = function(source, itemName, key, val)
	if not itemName or not key then return false end

	local Player = LS_CORE.Functions.GetPlayer(source)

	if not Player then return end

	local item = GetItemByName(source, itemName)

	if not item then return false end

	item[key] = val
	Player.DATA.items[item.slot] = item
	Player.Functions.SetPlayerData(Player.DATA)

	return true
end

exports("SetItemData", SetItemData)

---Checks if you have an item or not
---@param source number The source of the player to check it for
---@param items string | string[] | table<string, number> The items to check, either a string, array of strings or a key-value table of a string and number with the string representing the name of the item and the number representing the amount
---@param amount? number The amount of the item to check for, this will only have effect when items is a string or an array of strings
---@return boolean success Returns true if the player has the item
HasItem = function(source, items, amount)
    local Player = LS_CORE.Functions.GetPlayer(source)
    if not Player then return false end
    local isTable = type(items) == 'table'
    local isArray = isTable and table.type(items) == 'array' or false
    local totalItems = #items
    local count = 0
    local kvIndex = 2
    if isTable and not isArray then
        totalItems = 0
        for _ in pairs(items) do totalItems += 1 end
        kvIndex = 1
    end
    if isTable then
        for k, v in pairs(items) do
            local itemKV = {k, v}
            local item = GetItemByName(source, itemKV[kvIndex])
            if item and ((amount and item.amount >= amount) or (not isArray and item.amount >= v) or (not amount and isArray)) then
                count += 1
            end
        end
        if count == totalItems then
            return true
        end
    else -- Single item as string
        local item = GetItemByName(source, items)
        if item and (not amount or (item and amount and item.amount >= amount)) then
            return true
        end
    end
    return false
end

exports("HasItem", HasItem)

if LS_CORE.Config.FRAMEWORK == "QB" then
	---Create a usable item with a callback on use
	---@param itemName string The name of the item to make usable
	---@param data any
	local function CreateUsableItem(itemName, data)
		QBCore.Functions.CreateUseableItem(itemName, data)
	end

	exports("CreateUsableItem", CreateUsableItem)

	---Get the usable item data for the specified item
	---@param itemName string The item to get the data for
	---@return any usable_item
	local function GetUsableItem(itemName)
		return QBCore.Functions.CanUseItem(itemName)
	end

	exports("GetUsableItem", GetUsableItem)

	---Use an item from the QBCore.UsableItems table if a callback is present
	---@param itemName string The name of the item to use
	---@param ... any Arguments for the callback, this will be sent to the callback and can be used to get certain values
	local function UseItem(itemName, ...)
		local itemData = GetUsableItem(itemName)
		local callback = type(itemData) == 'table' and (rawget(itemData, '__cfx_functionReference') and itemData or itemData.cb or itemData.callback) or type(itemData) == 'function' and itemData
		if not callback then return end
		callback(...)
	end

	exports("UseItem", UseItem)

	--#endregion
	
	AddEventHandler('QBCore:Server:PlayerLoaded', function(Player)
		QBCore.Functions.AddPlayerMethod(Player.PlayerData.source, "AddItem", function(item, amount, slot, info)
			return AddItem(Player.PlayerData.source, item, amount, slot, info)
		end)

		QBCore.Functions.AddPlayerMethod(Player.PlayerData.source, "RemoveItem", function(item, amount, slot)
			return RemoveItem(Player.PlayerData.source, item, amount, slot)
		end)

		QBCore.Functions.AddPlayerMethod(Player.PlayerData.source, "GetItemBySlot", function(slot)
			return GetItemBySlot(Player.PlayerData.source, slot)
		end)

		QBCore.Functions.AddPlayerMethod(Player.PlayerData.source, "GetItemByName", function(item)
			return GetItemByName(Player.PlayerData.source, item)
		end)

		QBCore.Functions.AddPlayerMethod(Player.PlayerData.source, "GetItemsByName", function(item)
			return GetItemsByName(Player.PlayerData.source, item)
		end)

		QBCore.Functions.AddPlayerMethod(Player.PlayerData.source, "ClearInventory", function(filterItems)
			ClearInventory(Player.PlayerData.source, filterItems)
		end)

		QBCore.Functions.AddPlayerMethod(Player.PlayerData.source, "SetInventory", function(items)
			SetInventory(Player.PlayerData.source, items)
		end)
	end)
else
	local function UseItem(itemName, source, itemData)
		QBCore.UseItem(source, itemName, itemData)
	end

	exports("UseItem", UseItem)
end

local function useItem(src, itemData)
    local itemInfo = Config.Shared.Items[itemData.name]

    if itemData.type == "weapon" then
        TriggerClientEvent("inventory:client:UseWeapon", src, itemData, itemData.info.quality and itemData.info.quality > 0)
    else
        if itemData.info and itemData.info.quality and itemData.info.quality < 1 then
            return false
        end
        exports["inventory"]:UseItem(itemData.name, src, itemData)
    end

    TriggerClientEvent('inventory:client:ItemBox', src, itemInfo, "use")
end

RegisterNetEvent("inventory:s:UseItem", function(item)
    local src = source
    if src == nil then return end

    local itemData = item
    if not itemData then return end

    useItem(src, itemData)
end)

RegisterNetEvent("inventory:s:UseItemSlot", function(slot)
    local src = source
    local Player = LS_CORE.Functions.GetPlayer(src)
    if Player == nil then return end

    local itemData = Player.DATA.items[tostring(slot)] or Player.DATA.items[tonumber(slot)]
    if not itemData then return end

    useItem(src, itemData)
end)

RegisterServerEvent("inventory:s:GiveItem", function(target, item)
    local src = source
    local Player = LS_CORE.Functions.GetPlayer(src)
	target = tonumber(target)
    local OtherPlayer = LS_CORE.Functions.GetPlayer(target)

	if Player == OtherPlayer then return end
	if #(GetEntityCoords(GetPlayerPed(src))-GetEntityCoords(GetPlayerPed(target))) > 2 then return end

	local item = item
	if not item then return end

	if exports["inventory"]:RemoveItem(src, item.name, item.amount, item.slot) then
		if exports["inventory"]:AddItem(target, item.name, item.amount, false, item.info) then
			TriggerClientEvent('inventory:client:ItemBox',target, Config.Shared.Items[item.name], "add")

			TriggerClientEvent('inventory:client:ItemBox',src, Config.Shared.Items[item.name], "remove")

			TriggerClientEvent('inventory:c:GiveAnim', src)
			TriggerClientEvent('inventory:c:GiveAnim', target)
		else
			exports["inventory"]:AddItem(src, item.name, item.amount, item.slot, item.info)
		end
	end
end)

RegisterNetEvent("inventory:s:GiveItem", function(itemName, Amount, ItemData)
	local Player = QBCore.Functions.GetPlayer(source)
	if Player == nil then return end
	exports["inventory"]:AddItem(Player.PlayerData.source, itemName, Amount, false, ItemData)
end)