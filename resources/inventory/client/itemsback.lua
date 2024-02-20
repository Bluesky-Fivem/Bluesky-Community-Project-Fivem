if Config.ItemsOnBack.isEnabled then



local CurrentBackItems = {}
local ItemChecking = true
local Slots = {}

AddEventHandler('onResourceStart', function(resourceName)
	if (GetCurrentResourceName() ~= resourceName) then return end
    ItemsLoop()
end)

AddEventHandler('onResourceStop', function(resourceName)
	if (GetCurrentResourceName() ~= resourceName) then return end
    DeleteItems()
end)

RegisterNetEvent("LS_CORE:PLAYER:PLAYERUNLOAD", function()
    DeleteItems()
end)

DeleteItems = function()
    removeAllItemsFromPed()
    CurrentBackItems = {}
    currentWeapon = nil
    Slots = {}
    ItemChecking = false
end

ItemsLoop = function()
    ItemChecking = true
    CreateThread(function()
        while ItemChecking do
            setItems()
            Wait(60000)
        end
    end)
end

RegisterNetEvent("inventory:client:checkBackItems", function()
    setItems()
end)

setItems = function()
    local Player = LS_CORE.Functions.GetPlayerData()

    while Player == nil do Player = LS_CORE.Functions.GetPlayerData() Wait(500) end
    for i = 1, Config.Shared.Player.slotSize do
        Slots[i] = Player.items[i]
    end

    local itemsOnBack = Config.ItemsOnBack.items
    local currentBackItems = CurrentBackItems

    for i, item in pairs(Slots) do
        local name = item.name
        if itemsOnBack[name] and name ~= currentWeapon then
            createItemsOnPed(name, item)
        end
    end

    for k, _ in pairs(currentBackItems) do
        local hasItem = false
        for _, item in pairs(Slots) do
            if item.name == k then
                hasItem = true
                break
            end
        end
        if not hasItem then
            removeItemsFromPed(k)
        end
    end
end

createItemsOnPed = function(item, item2)
    if not CurrentBackItems[item] then
        local playerData = LS_CORE.Functions.GetPlayerData()
        local gender = playerData.charinfo ~= nil and playerData.charinfo.gender or playerData.sex == "m" and 0 or 1

        if Config.ItemsOnBack.items[item] then
            local obj = Config.ItemsOnBack.items[item]
            local model = obj["model"]
            local ped = PlayerPedId()
            local bone = GetPedBoneIndex(ped, obj["back_bone"])

            RequestModel(model)
            while not HasModelLoaded(model) do Wait(10) end
            SetModelAsNoLongerNeeded(model)

            if (item2 ~= nil and item2.type == "weapon") then

                RequestWeaponAsset(GetHashKey(item), 31, 0)
                while not HasWeaponAssetLoaded(GetHashKey(item)) do Citizen.Wait(10) end

                CurrentBackItems[item] = CreateWeaponObject(GetHashKey(item), 30, 1.0, 1.0, 1.0 , true, 1.0, 0)

                if item2.info and item2.info.attachments then
                    for _, attachment in pairs(item2.info.attachments) do
                        local model = GetWeaponComponentTypeModel(attachment.component)
                        RequestModel(model)
                        while not HasModelLoaded(model) do Citizen.Wait(10) end
                    
                        GiveWeaponComponentToWeaponObject(CurrentBackItems[item], GetHashKey(attachment.component))
                    end
                end
            else
                CurrentBackItems[item] = CreateObject(GetHashKey(model), 1.0, 1.0, 1.0, true, true, false)
            end
            local y = obj["y"]  

            if gender == 1 then
                y = y + 0.035
            end

            AttachEntityToEntity(CurrentBackItems[item], ped, bone, obj["x"], y, obj["z"], obj["x_rotation"], obj["y_rotation"], obj["z_rotation"], 0, 1, 0, 1, 0, 1)
            SetEntityCompletelyDisableCollision(CurrentBackItems[item], false, true)        
        end
    end
end


removeItemsFromPed = function(item)
    if CurrentBackItems[item] then
        DeleteEntity(CurrentBackItems[item])
        CurrentBackItems[item] = nil
    end
end

removeAllItemsFromPed = function()
    for k,v in pairs(CurrentBackItems) do 
        removeItemsFromPed(k)
    end
end

local weaponItem = nil
RegisterNetEvent('weapons:client:SetCurrentWeapon', function(weap, shootbool)
    if weap == nil then
        createItemsOnPed(weaponItem.name, weaponItem)
        weaponItem = nil
    else
        if weaponItem ~= nil then  
            createItemsOnPed(weaponItem.name, weap)
            weaponItem = nil
        end
        weaponItem = weap
        removeItemsFromPed(weaponItem.name)
    end
end)

end
