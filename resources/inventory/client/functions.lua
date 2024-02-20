
function DrawText3Ds(x, y, z, text)
    SetTextScale(0.35, 0.35)
    SetTextFont(4)
    SetTextProportional(1)
    SetTextColour(255, 255, 255, 215)
    SetTextEntry("STRING")
    SetTextCentre(true)
    AddTextComponentString(text)
    SetDrawOrigin(x,y,z, 0)
    DrawText(0.0, 0.0)
    local factor = string.len(text) / 370
    DrawRect(0.0, 0.0125, 0.017 + factor, 0.03, 0, 0, 0, 75)
    ClearDrawOrigin()
end

CreateThread(function()
    while true do
        local sleep = 1000
            local pos = GetEntityCoords(PlayerPedId())
            local craftObject = GetClosestObjectOfType(pos, 2.0, GetHashKey(Config.CraftingObject), false, false, false)
            if craftObject ~= 0 and not exports["ls-weapons"]:isInAttachmentScreen() then
                local objectPos = GetEntityCoords(craftObject)
                if #(pos - objectPos) < 1.5 then
                    sleep = 0
                    DrawText3Ds(objectPos.x, objectPos.y, objectPos.z + 1.0, "E - Craft")
                    if IsControlJustReleased(0, 38) then
                        local crafting = {}
                        crafting.label = "Craft"
                        crafting.items = GetThresholdItems()
                        TriggerServerEvent("inventory:server:OpenInventory", "crafting", math.random(1, 99), crafting)
                        sleep = 100
                    end
                end
            end
        Wait(sleep)
    end
end)

RegisterNetEvent('inventory:client:craftTarget',function()
    local crafting = {}
    crafting.label = "Crafting"
    crafting.items = GetThresholdItems()
    TriggerServerEvent("inventory:server:OpenInventory", "crafting", math.random(1, 99), crafting)
end)

function GetThresholdItems()
	ItemsToItemInfo()
	local items = {}
	for k in pairs(Config.CraftingItems) do
		items[k] = Config.CraftingItems[k]
	end
	return items
end

function ItemsToItemInfo()
	local itemInfos = {
		[1] = {costs = Config.Shared.Items["metalscrap"]["label"] .. ": 22x, " ..Config.Shared.Items["plastic"]["label"] .. ": 32x."},
		[2] = {costs = Config.Shared.Items["metalscrap"]["label"] .. ": 30x, " ..Config.Shared.Items["plastic"]["label"] .. ": 42x."},
		[3] = {costs = Config.Shared.Items["metalscrap"]["label"] .. ": 30x, " ..Config.Shared.Items["plastic"]["label"] .. ": 45x, "..Config.Shared.Items["aluminum"]["label"] .. ": 28x."},
		[4] = {costs = Config.Shared.Items["electronickit"]["label"] .. ": 2x, " ..Config.Shared.Items["plastic"]["label"] .. ": 52x, "..Config.Shared.Items["steel"]["label"] .. ": 40x."},
		[5] = {costs = Config.Shared.Items["metalscrap"]["label"] .. ": 10x, " ..Config.Shared.Items["plastic"]["label"] .. ": 50x, "..Config.Shared.Items["aluminum"]["label"] .. ": 30x, "..Config.Shared.Items["iron"]["label"] .. ": 17x, "..Config.Shared.Items["electronickit"]["label"] .. ": 1x."},
		[6] = {costs = Config.Shared.Items["metalscrap"]["label"] .. ": 36x, " ..Config.Shared.Items["steel"]["label"] .. ": 24x, "..Config.Shared.Items["aluminum"]["label"] .. ": 28x."},
		[7] = {costs = Config.Shared.Items["metalscrap"]["label"] .. ": 32x, " ..Config.Shared.Items["steel"]["label"] .. ": 43x, "..Config.Shared.Items["plastic"]["label"] .. ": 61x."},
		[8] = {costs = Config.Shared.Items["metalscrap"]["label"] .. ": 50x, " ..Config.Shared.Items["steel"]["label"] .. ": 37x, "..Config.Shared.Items["copper"]["label"] .. ": 26x."},
		[9] = {costs = Config.Shared.Items["iron"]["label"] .. ": 60x, " ..Config.Shared.Items["glass"]["label"] .. ": 30x."},
		[10] = {costs = Config.Shared.Items["aluminum"]["label"] .. ": 60x, " ..Config.Shared.Items["glass"]["label"] .. ": 30x."},
		[11] = {costs = Config.Shared.Items["iron"]["label"] .. ": 33x, " ..Config.Shared.Items["steel"]["label"] .. ": 44x, "..Config.Shared.Items["plastic"]["label"] .. ": 55x, "..Config.Shared.Items["aluminum"]["label"] .. ": 22x."},
		[12] = {costs = Config.Shared.Items["iron"]["label"] .. ": 50x, " ..Config.Shared.Items["steel"]["label"] .. ": 50x, "..Config.Shared.Items["screwdriverset"]["label"] .. ": 3x, "..Config.Shared.Items["advancedlockpick"]["label"] .. ": 2x."},
	}

	local items = {}
	for _, item in pairs(Config.CraftingItems) do
		local itemInfo = Config.Shared.Items[item.name:lower()]
		items[item.slot] = {
			name = itemInfo["name"],
			amount = tonumber(item.amount),
            count = tonumber(item.amount),
			info = itemInfos[item.slot],
			label = itemInfo["label"],
			description = itemInfo["description"] or "",
			weight = itemInfo["weight"],
			type = itemInfo["type"],
			unique = itemInfo["unique"],
			useable = itemInfo["useable"],
			image = itemInfo["image"],
			slot = item.slot,
			costs = item.costs,
			threshold = item.threshold,
			points = item.points,
            color = item.color or GenerateColor(item),
		}
	end
	Config.CraftingItems = items
end

RegisterNetEvent('inventory:c:GiveAnim', function()
    if IsPedInAnyVehicle(PlayerPedId(), false) then
	return
    else
	LoadAnimDict('mp_common')
	TaskPlayAnim(PlayerPedId(), 'mp_common', 'givetake1_b', 8.0, 1.0, -1, 16, 0, 0, 0, 0)
    end
end)

RegisterNetEvent('inventory:client:ItemBox', function(itemData, type)
    if itemData == nil then return end
	itemData.color = itemData.color or GenerateColor(itemData)
    SendNUIMessage({
        action = "itemBox",
        item = itemData,
        type = type
    })
end)

currentWeapon = nil
RegisterNetEvent('inventory:client:checkWeaponSecond', function(weaponData, isSame)
    local ped = PlayerPedId()
    local weaponName = tostring(weaponData.name)
    local weaponHash = joaat(weaponData.name)
    if isSame then
        if currentWeapon == weaponData.name then
            TriggerEvent('weapons:client:DrawWeapon', weaponName)
            TriggerEvent('weapons:client:SetCurrentWeapon', weaponData, true)
            local ammo = tonumber(weaponData.info.ammo) or 0

            if weaponName == "weapon_petrolcan" or weaponName == "weapon_fireextinguisher" then
                ammo = 4000
            end

            GiveWeaponToPed(ped, weaponHash, ammo, false, false)
            SetPedAmmo(ped, weaponHash, ammo)
            SetCurrentPedWeapon(ped, weaponHash, true)

            currentWeapon = weaponName

            Wait(100)
            if weaponData.info.attachments then
                for _, attachment in pairs(weaponData.info.attachments) do
                    GiveWeaponComponentToPed(ped, weaponHash, joaat(attachment.component))
                end
            end
        end
    else
        if currentWeapon == weaponData.name then
            TriggerEvent('inventory:client:UseWeapon', weaponData, false)
        end
    end
end)
RegisterNetEvent('inventory:client:UseWeapon', function(weaponData, shootbool)
    local ped = PlayerPedId()
    local weaponName = tostring(weaponData.name)
    local weaponHash = joaat(weaponData.name)

    if currentWeapon == weaponName then
        TriggerEvent('weapons:client:DrawWeapon', nil)
        SetCurrentPedWeapon(ped, `WEAPON_UNARMED`, true)
        RemoveAllPedWeapons(ped, true)
        TriggerEvent('weapons:client:SetCurrentWeapon', nil, shootbool)
        currentWeapon = nil
    elseif weaponName == "weapon_stickybomb" or weaponName == "weapon_pipebomb" or weaponName == "weapon_smokegrenade" or weaponName == "weapon_flare" or weaponName == "weapon_proxmine" or weaponName == "weapon_ball"  or weaponName == "weapon_molotov" or weaponName == "weapon_grenade" or weaponName == "weapon_bzgas" then
        TriggerEvent('weapons:client:DrawWeapon', weaponName)
        GiveWeaponToPed(ped, weaponHash, 1, false, false)
        SetPedAmmo(ped, weaponHash, 1)
        SetCurrentPedWeapon(ped, weaponHash, true)
        TriggerEvent('weapons:client:SetCurrentWeapon', weaponData, shootbool)
        currentWeapon = weaponName
    elseif weaponName == "weapon_snowball" then
        TriggerEvent('weapons:client:DrawWeapon', weaponName)
        GiveWeaponToPed(ped, weaponHash, 10, false, false)
        SetPedAmmo(ped, weaponHash, 10)
        SetCurrentPedWeapon(ped, weaponHash, true)
        TriggerServerEvent('inventory:server:snowball', 'remove')
        TriggerEvent('weapons:client:SetCurrentWeapon', weaponData, shootbool)
        currentWeapon = weaponName
    else
        TriggerEvent('weapons:client:DrawWeapon', weaponName)
        TriggerEvent('weapons:client:SetCurrentWeapon', weaponData, shootbool)
        local ammo = tonumber(weaponData.info.ammo) or 0

        if weaponName == "weapon_petrolcan" or weaponName == "weapon_fireextinguisher" then
            ammo = 4000
        end

        GiveWeaponToPed(ped, weaponHash, ammo, false, false)
        SetPedAmmo(ped, weaponHash, ammo)
        SetCurrentPedWeapon(ped, weaponHash, true)

        currentWeapon = weaponName

        Wait(100)
        if weaponData.info.attachments then
            for _, attachment in pairs(weaponData.info.attachments) do
                GiveWeaponComponentToPed(ped, weaponHash, joaat(attachment.component))
            end
        end
    end
end)

RegisterNetEvent('inventory:client:CheckWeapon', function(weaponName)
    if currentWeapon ~= weaponName:lower() then return end
    local ped = PlayerPedId()
    TriggerEvent('weapons:ResetHolster')
    SetCurrentPedWeapon(ped, `WEAPON_UNARMED`, true)
    RemoveAllPedWeapons(ped, true)
    currentWeapon = nil
end)

for i = 1, 6 do
    RegisterCommand('slot' .. i,function()
		TriggerServerEvent("inventory:s:UseItemSlot", i)
		exports["inventory"]:CloseInventory()
    end, false)
    RegisterKeyMapping('slot' .. i, "Use Item " .. i, 'keyboard', i)
end


RegisterNetEvent("inventory:c:giveClothesAsItem")
AddEventHandler("inventory:c:giveClothesAsItem", function(data, previousSkinData, isFirst)
    if GetResourceState("fivem-appearance") == "started" or GetResourceState("illenium-appearance") == "started" then
        local function CheckAndGetDrawable(item)
            if item.TypeItem == "props" then
                return item.Prop
            else
                return item.Drawable
            end
        end
    
        local function FFSI(table, id, type)
            if type == "props" then
                for k,v in pairs(table[type]) do
                    if id == v.prop_id then
                        return k
                    end 
                end
            else
                for k,v in pairs(table[type]) do
                    if id == v.component_id then
                        return k
                    end 
                end
            end
        end

        if isFirst then
            for key,v in pairs(Config.Client.Clothings) do
                if data[v.TypeItem][FFSI(data, CheckAndGetDrawable(v), v.TypeItem)] ~= nil and data[v.TypeItem][FFSI(data, CheckAndGetDrawable(v), v.TypeItem)].drawable >= 0 then
                    local itemData = data[v.TypeItem][FFSI(data, CheckAndGetDrawable(v), v.TypeItem)]

                    local info = {}
                    if v.Drawable ~= nil then
                        info.drawable = itemData.drawable
                        info.texture = itemData.texture
                    else
                        info.prop = itemData.drawable
                        info.texture = itemData.texture
                    end

                    TriggerServerEvent("inventory:s:GiveItem", key, 1, info)
                end
            end
        else
            for key,v in pairs(Config.Client.Clothings) do
                local pre = previousSkinData
                local newItem = data[v.TypeItem][FFSI(data, CheckAndGetDrawable(v), v.TypeItem)]
                local oldItem = pre[v.TypeItem][FFSI(data, CheckAndGetDrawable(v), v.TypeItem)]
                if (newItem.drawable ~= oldItem.drawable or newItem.texture ~= oldItem.texture) then
                    local info = {}
                    if v.Drawable ~= nil then
                        info.drawable = newItem.drawable
                        info.texture = newItem.texture
                    else
                        info.prop = newItem.drawable
                        info.texture = newItem.texture
                    end

                    TriggerServerEvent("inventory:s:GiveItem", key, 1, info)
                end
            end
        end
    else
        if LS_CORE.Config.FRAMEWORK == "QB" then
            if isFirst then
                for key,v in pairs(Config.Client.Clothings) do
                    if data[v.DatabaseName] ~= nil and data[v.DatabaseName].item >= 0 then
                        local itemData = data[v.DatabaseName]

                        local info = {}
                        if v.Drawable ~= nil then
                            info.drawable = itemData.item
                            info.texture = itemData.texture
                        else
                            info.prop = itemData.item
                            info.texture = itemData.texture
                        end

                        TriggerServerEvent("inventory:s:GiveItem", key, 1, info)
                    end
                end
            else
                for key,v in pairs(Config.Client.Clothings) do
                    local pre = type(previousSkinData) == "string" and json.decode(previousSkinData) or previousSkinData
                    if (data[v.DatabaseName].item ~= pre[v.DatabaseName].item or data[v.DatabaseName].texture ~= pre[v.DatabaseName].texture) then
                        local itemData = data[v.DatabaseName]

                        local info = {}
                        if v.Drawable ~= nil then
                            info.drawable = itemData.item
                            info.texture = itemData.texture
                        else
                            info.prop = itemData.item
                            info.texture = itemData.texture
                        end

                        TriggerServerEvent("inventory:s:GiveItem", key, 1, info)
                    end
                end
            end
        else
            if isFirst then
                for key,v in pairs(Config.Client.Clothings) do
                    if data[v.DatabaseName] ~= nil then
                        if data[v.DatabaseName] >= 0 then
                            local itemData = data[v.DatabaseName]
                            local itm = v.DatabaseName:gsub("_1", "_2")
                            local secItemdata = data[itm]
    
                            local info = {}
                            if v.Drawable ~= nil then
                                info.drawable = itemData
                                info.texture = secItemdata
                            else
                                info.prop = itemData
                                info.texture = secItemdata
                            end
    
                            TriggerServerEvent("inventory:s:GiveItem", key, 1, info)
                        end
                    end
                end
            else
                for key,v in pairs(Config.Client.Clothings) do
                    local pre = previousSkinData
                    local itm = v.DatabaseName:gsub("_1", "_2")
                    local secItemdata = data[itm]
                    if (data[v.DatabaseName] ~= pre[v.DatabaseName] or data[itm] ~= pre[itm]) then
                        local itemData = data[v.DatabaseName]
    
                        local info = {}
                        if v.Drawable ~= nil then
                            info.drawable = itemData
                            info.texture = secItemdata
                        else
                            info.prop = itemData
                            info.texture = secItemdata
                        end

                        TriggerServerEvent("inventory:s:GiveItem", key, 1, info)
                    end
                end
            end
        end
    end
end)


CheckInClothingEdit = function ()
    if GetResourceState("qb-clothing") == "started" then
        return exports["qb-clothing"]:IsCreatingCharacter()
    end

    return false
end

local function HasItem(items, amount)
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
    for _, itemData in pairs(LS_CORE.Functions.GetPlayerData().items) do
        if isTable then
            for k, v in pairs(items) do
                local itemKV = {k, v}
                if itemData and itemData.name == itemKV[kvIndex] and ((amount and itemData.amount >= amount) or (not isArray and itemData.amount >= v) or (not amount and isArray)) then
                    count += 1
                end
            end
            if count == totalItems then
                return true
            end
        else -- Single item as string
            if itemData and itemData.name == items and (not amount or (itemData and amount and itemData.amount >= amount)) then
                return true
            end
        end
    end
    return false
end

exports("HasItem", HasItem)