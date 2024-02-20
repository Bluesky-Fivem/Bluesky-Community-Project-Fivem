local isDisable = false

if isDisable then return end

local LS_CORE = exports["ls-core"]:GetCoreObject()
local Drops = {}

if not isDisable then
    CreateThread(function()
        Wait(600)
        local version = GetResourceMetadata(GetCurrentResourceName(), 'version')
        LS_CORE.Functions.GetVersionScript(version, "inventory")
    end)
end

getInventory = function(id)
    local result = LS_CORE.Config.DATABASE(LS_CORE.Config.DATABASE_NAME, 'fetchAll', 'SELECT * FROM ls_inventory where identifier = ?', { id })[1]
    if (Drops[id] == nil) then
        if result == nil then
            LS_CORE.Config.DATABASE( LS_CORE.Config.DATABASE_NAME, 'execute', 'INSERT INTO `ls_inventory` (identifier, data) VALUES (@identifier, @data)', {
                ["@identifier"] = id,
                ["@data"] = json.encode({}),
            })
        end
    else
        result = {}
        result.data = json.encode(Drops[id].items)
    end
    return result ~= nil and createItems(json.decode(result.data)) or {}
end
saveInventory = function(id, items)
    if (Drops[id] == nil) then
        LS_CORE.Config.DATABASE( LS_CORE.Config.DATABASE_NAME, 'execute', 'UPDATE `ls_inventory` SET `data` = @data WHERE `identifier` = @identifier', {
            ['@identifier'] = id,
            ['@data']       = json.encode(items),
        })
    else
        Drops[id].items = items
    end
    return true
end

SetupShopItems = function(shopItems)
	local items = {}
	if shopItems and next(shopItems) then
		for _, item in pairs(shopItems) do
			local itemInfo = Config.Shared.Items[item.name:lower()]
			if itemInfo then
				items[item.slot] = {
					name = itemInfo["name"],
					amount = tonumber(item.amount),
                    count = tonumber(item.amount),
					info = item.info or "",
					label = itemInfo["label"],
					description = itemInfo["description"] or "",
					weight = itemInfo["weight"],
					type = itemInfo["type"],
					unique = itemInfo["unique"],
					useable = itemInfo["useable"],
					price = item.price,
					image = itemInfo["image"],
					slot = item.slot,
                    color = item.color or GenerateColor(item),
				}
			end
		end
	end
	return items
end

RegisterNetEvent("inventory:server:OpenInventory", function(name, id, other)
    local src = source
	local Player = LS_CORE.Functions.GetPlayer(src)
    if Player == nil then return print("Player not found") end
    local firstInventory = {
        inventoryId = Player.DATA.cid,
        inventoryLabel = "Player Inventory",
        inventorySize = Config.Shared.Player.slotSize,
        inventoryWeight = Config.Shared.Player.maxWeight,
        inventoryType = "player",
        inventoryItems = createItems(Player.DATA.items)
    }

    if name and id then
        local secInventory = {}

        if name == "trunk" then
            secInventory = {
                inventoryId = id,
                inventoryLabel = "Trunk",
                inventorySize = other.slots,
                inventoryWeight = other.maxweight,
                inventoryType = name,
                inventoryItems = getInventory(id)
            }
        elseif name == "glovebox" then
                secInventory = {
                    inventoryId = id,
                    inventoryLabel = "Glovebox",
                    inventorySize = Config.Shared.Glovebox.slotSize,
                    inventoryWeight = Config.Shared.Glovebox.maxWeight,
                    inventoryType = name,
                    inventoryItems = getInventory(id)
                }
        elseif name == "drop" then
            if (Drops[id] == nil) then
                Drops[id] = {
                    id = id,
                    items = {},
                    open = true,
                    coords = other
                }
            end
            
            secInventory = {
                inventoryId = id,
                inventoryLabel = "Drop",
                inventorySize = 100,
                inventoryWeight = 9999,
                inventoryType = name,
                inventoryItems = Drops[id].items
            }
        elseif name == "stash" then
            local maxweight = 999
			local slots = 50
			if other then
				maxweight = other.maxweight/1000 or 9999
				slots = other.slots or 50
			end

            secInventory = {
                inventoryId = "S-"..id,
                inventoryLabel = "Stash-"..id,
                inventorySize = slots,
                inventoryWeight = maxweight,
                inventoryType = name,
                inventoryItems = getInventory("S-"..id)
            }
        elseif name == "traphouse" then
            secInventory = {
                inventoryId = "traphouse-"..id,
                inventoryLabel = other.label,
                inventorySize = other.slots,
                inventoryWeight = 9999,
                inventoryType = name,
                inventoryItems = other.items
            }
        elseif name == "crafting" then
            secInventory = {
                inventoryId = "crafting",
                inventoryLabel = other.label,
                inventorySize = #other.items,
                inventoryWeight = 9999,
                inventoryType = name,
                inventoryItems = other.items
            }
        elseif name == "shop" then
            secInventory = {
                inventoryId = "itemshop-"..id,
                inventoryLabel = other.label,
                inventorySize = #other.items,
                inventoryWeight = 9999,
                inventoryType = name,
                inventoryItems = SetupShopItems(other.items)
            }
        elseif name == "search" then
            local TargetPlayer = LS_CORE.Functions.GetPlayer(id)
            secInventory = {
                inventoryId = TargetPlayer.DATA.cid,
                inventoryLabel = "Player Inventory",
                inventorySize = Config.Shared.Player.slotSize,
                inventoryWeight = Config.Shared.Player.maxWeight,
                inventoryType = "player",
                inventoryItems = createItems(TargetPlayer.DATA.items)
            }
        else 
            secInventory = {
                inventoryId = "unk-"..id,
                inventoryLabel = "Unknown",
                inventorySize = 100,
                inventoryWeight = 999,
                inventoryType = name,
                inventoryItems = getInventory("unk-"..id)
            }
        end
        TriggerClientEvent("inventory:client:OpenInventory", src, firstInventory, secInventory)
    else
        TriggerClientEvent("inventory:client:OpenInventory", src, firstInventory, {})
    end
end)

RegisterNetEvent("inventory:s:ItemMove", function(data)
    local toInventoryID = data.toInventoryID
    local fromInventoryID = data.fromInventoryID

    local toSlot = data.toSlot
    local fromSlot = data.fromSlot

    local toInventory = createItems(data.toInventory)
    local fromInventory = createItems(data.fromInventory)

    local fromInventoryType = data.fromInventoryType
    local toInventoryType = data.toInventoryType

    local fromPlayer = LS_CORE.Functions.GetIdentifier(fromInventoryID)
    local toPlayer = LS_CORE.Functions.GetIdentifier(toInventoryID)

    local fromItem = data.fromItem
    local toItem = data.toItem

    if fromPlayer ~= nil then
        if fromPlayer.DATA.items[fromSlot].type == "weapon" then
            TriggerClientEvent('inventory:client:checkWeaponSecond', fromPlayer.Source, fromPlayer.DATA.items[fromSlot], fromInventoryID == toInventoryID)
        end
    end

    if fromPlayer ~= nil then
        if fromPlayer.DATA.items[fromSlot] == nil then return end
    else
        local items = getInventory(fromInventoryID)
        if items[fromSlot] == nil then return end
    end 

    if (fromPlayer ~= nil or toPlayer ~= nil) and (toInventoryID == fromInventoryID) then -- If same person
        
        if fromItem == nil then
            toPlayer.DATA.items[fromSlot] = nil
        else
            toPlayer.DATA.items[fromSlot] = fromItem
        end
        toPlayer.DATA.items[toSlot] = toItem

        fromInventory = toPlayer.DATA.items
        toInventory = toPlayer.DATA.items

        SetInventoryItems(toPlayer, toInventory)

    elseif (fromPlayer ~= nil or toPlayer ~= nil) then -- If from or to is an real player

        if (fromPlayer ~= nil) then

            if fromItem == nil then
                fromPlayer.DATA.items[fromSlot] = nil
            else
                fromPlayer.DATA.items[fromSlot] = fromItem
            end
            fromInventory = fromPlayer.DATA.items

            SetInventoryItems(fromPlayer, fromInventory)

        else

            if (fromInventoryType ~= "shop" or fromInventoryType ~= "crafting") then
                local items = getInventory(fromInventoryID)

                if fromItem == nil then
                    items[fromSlot] = nil
                else
                    items[fromSlot] = fromItem
                end
                fromInventory = items

                saveInventory(fromInventoryID, fromInventory)
            end

        end

        if(toPlayer ~= nil) then
            toPlayer.DATA.items[toSlot] = toItem
            toInventory = toPlayer.DATA.items

            SetInventoryItems(toPlayer, toInventory)
        else
            if (toInventoryType ~= "shop" or toInventoryType ~= "crafting") then
                local items = getInventory(toInventoryID)

                items[toSlot] = toItem
                toInventory = items

                saveInventory(toInventoryID, toInventory)
            end
        end
    else
        if (fromInventoryID == toInventoryID) then

            if (toInventoryType ~= "shop" or toInventoryType ~= "crafting") then
                local items = getInventory(toInventoryID)

                if fromItem == nil then
                    items[fromSlot] = nil
                else
                    items[fromSlot] = fromItem
                end
                items[toSlot] = toItem

                fromInventory = items
                toInventory = items

                saveInventory(toInventoryID, toInventory)
            end

        else

            print("WTF? Tottaly different")

        end
    end

    TriggerClientEvent("inventory:c:ItemMove", -1, fromInventoryID, toInventoryID, fromInventory, toInventory)
end)

LS_CORE.Callback.Functions.CreateCallback("inventory:server:GetDrops", function(_, cb)
    local result = {}
    if (Drops ~= nil) then
        for k,v in pairs(Drops) do
            if (v.id ~= nil) then
                result[k] = v
            end
        end
    end
    cb(result)
end)

LS_CORE.Callback.Functions.CreateCallback("inventory:server:getCash", function(src, cb)
    local Player = LS_CORE.Functions.GetPlayer(src)
    if Player == nil then cb(-1) end
    cb( Player.Functions.GetPlayerMoney("cash") )
end)

RegisterNetEvent("inventory:s:BuyItem", function(price)
    local Player = LS_CORE.Functions.GetPlayer(source)
    if Player == nil then return end
    Player.Functions.RemoveMoney("cash", price)
end)

AddCraftingItem = function(source, item)
    local Player = LS_CORE.Functions.GetPlayer(source)
    if Player == nil then return end
    local currentTime = os.time()
    Player.DATA.craftinghistory[currentTime] = {
        craftedAt = currentTime,
        crafted = item
    }

    Player.Functions.SetPlayerData(Player.DATA)
end


RegisterNetEvent("inventory:s:CraftItem", function(item, amount)
    local Player = LS_CORE.Functions.GetPlayer(source)
    if Player == nil then return end
    Wait(100)
    AddCraftingItem(Player.Source, item.name)
    exports["inventory"]:AddItem(Player.Source, item.name, amount)
    for k,v in pairs(item.costs) do
        exports["inventory"]:RemoveItem(Player.Source, k, v*amount, nil)
    end

    TriggerClientEvent('inventory:client:ItemBox',Player.Source, Config.Shared.Items[item.name], "add")
end)


Citizen.CreateThread(function()
    local sleep = 0
	while true do
		if Drops ~= nil then
			for k,v in pairs(Drops) do
                if v.id ~= nil then
                    Drops[k].open = false
                    Citizen.CreateThread(function()
                        TriggerClientEvent("inventory:c:checkDropOpen", -1, k)
                        Citizen.Wait(500)
                        if tablelength(v.items) < 1 and not Drops[k].open then
                            Drops[k] = nil
                        end
                    end)
                end
			end
		end

        if (tablelength(Drops) > 0) then
            sleep = 1000*Config.RefreshServerDrops
        else
            sleep = Config.EmptyRefresh
        end
        Citizen.Wait(sleep)
	end
end)

RegisterNetEvent("inventory:s:checkDropOpen", function(id)
	if Drops[id] ~= nil then
		Drops[id].open = true
	end
end)

