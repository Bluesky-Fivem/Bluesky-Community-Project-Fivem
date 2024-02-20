local isDisable = false
if GetResourceState("ls-core") ~= "started" then
    isDisable = true
    CreateThread(function()
        while true do
            if GetResourceState("ls-core") == "started" then
                print("ls-core is started. \n^8Please restart your server.^7 \nPhone not will work.")
            else
                print("ls-core not found. Please install before trying to use phone. ^8Error Code 2^7")
            end
            Citizen.Wait(5000)
        end
    end)
end
if isDisable then return end

local LS_CORE = exports["ls-core"]:GetCoreObject()
local isOpen = false
local firstInventory = nil
local secondInventory = nil
local CurrentVehicle = nil
local BackEngineVehicles = {
    [`ninef`] = true,
    [`adder`] = true,
    [`vagner`] = true,
    [`t20`] = true,
    [`infernus`] = true,
    [`zentorno`] = true,
    [`reaper`] = true,
    [`comet2`] = true,
    [`comet3`] = true,
    [`jester`] = true,
    [`jester2`] = true,
    [`cheetah`] = true,
    [`cheetah2`] = true,
    [`prototipo`] = true,
    [`turismor`] = true,
    [`pfister811`] = true,
    [`ardent`] = true,
    [`nero`] = true,
    [`nero2`] = true,
    [`tempesta`] = true,
    [`vacca`] = true,
    [`bullet`] = true,
    [`osiris`] = true,
    [`entityxf`] = true,
    [`turismo2`] = true,
    [`fmj`] = true,
    [`re7b`] = true,
    [`tyrus`] = true,
    [`italigtb`] = true,
    [`penetrator`] = true,
    [`monroe`] = true,
    [`ninef2`] = true,
    [`stingergt`] = true,
    [`surfer`] = true,
    [`surfer2`] = true,
    [`gp1`] = true,
    [`autarch`] = true,
    [`tyrant`] = true
}

local trunkSize = {
    [0] = {
        maxweight = 38000,
        slots = 30
    },
    [1] = {
        maxweight = 50000,
        slots = 40
    },
    [2] = {
        maxweight = 75000,
        slots = 50
    },
    [3] = {
        maxweight = 42000,
        slots = 35
    },
    [4] = {
        maxweight = 38000,
        slots = 30
    },
    [5] = {
        maxweight = 30000,
        slots = 25
    },
    [6] = {
        maxweight = 30000,
        slots = 25
    },
    [7] = {
        maxweight = 30000,
        slots = 25
    },
    [8] = {
        maxweight = 15000,
        slots = 15
    },
    [9] = { -- default weight if no class is set
        maxweight = 60000,
        slots = 35
    },
    [12] = {
        maxweight = 120000,
        slots = 25
    },
    [13] = {
        maxweight = 0,
        slots = 0
    },
    [14] = {
        maxweight = 120000,
        slots = 50
    },
    [15] = {
        maxweight = 120000,
        slots = 50
    },
    [16] = {
        maxweight = 120000,
        slots = 50
    }
}

LoadAnimDict = function(dict)
    if HasAnimDictLoaded(dict) then return end

    RequestAnimDict(dict)
    while not HasAnimDictLoaded(dict) do
        Wait(10)
    end
end

OpenTrunk = function ()
    local vehicle = LS_CORE.Functions.GetClosestVehicle()
    LoadAnimDict("amb@prop_human_bum_bin@idle_b")
    TaskPlayAnim(PlayerPedId(), "amb@prop_human_bum_bin@idle_b", "idle_d", 4.0, 4.0, -1, 50, 0, false, false, false)
    if IsBackEngine(GetEntityModel(vehicle)) then
        SetVehicleDoorOpen(vehicle, 4, false, false)
    else
        SetVehicleDoorOpen(vehicle, 5, false, false)
    end
end

CloseTrunk = function()
    local vehicle = LS_CORE.Functions.GetClosestVehicle()
    LoadAnimDict("amb@prop_human_bum_bin@idle_b")
    TaskPlayAnim(PlayerPedId(), "amb@prop_human_bum_bin@idle_b", "exit", 4.0, 4.0, -1, 50, 0, false, false, false)
    if IsBackEngine(GetEntityModel(vehicle)) then
        SetVehicleDoorShut(vehicle, 4, false)
    else
        SetVehicleDoorShut(vehicle, 5, false)
    end
end

GetTrunkSize = function(vehicleClass)
    if not trunkSize[vehicleClass] then vehicleClass = 9 end
    return trunkSize[vehicleClass].maxweight, trunkSize[vehicleClass].slots
end

IsBackEngine = function(vehModel)
    return BackEngineVehicles[vehModel]
end

RegisterCommand("inventory", function () 
    if IsNuiFocused() then return end
    if not isOpen then
        if  not IsPauseMenuActive() then
            local ped = PlayerPedId()

            local curVeh = nil
            if IsPedInAnyVehicle(ped, false) then -- Is Player In Vehicle
                local vehicle = GetVehiclePedIsIn(ped, false)
                CurrentGlovebox = "G-"..Trim(GetVehicleNumberPlateText(vehicle))
                curVeh = vehicle
                CurrentVehicle = nil
            else
                local vehicle = LS_CORE.Functions.GetClosestVehicle()
                if vehicle ~= 0 and vehicle ~= nil then
                    local pos = GetEntityCoords(ped)
                    local dimensionMin, dimensionMax = GetModelDimensions(GetEntityModel(vehicle))
		            local trunkpos = GetOffsetFromEntityInWorldCoords(vehicle, 0.0, (dimensionMin.y), 0.0)

                    if (IsBackEngine(GetEntityModel(vehicle))) then
                        trunkpos = GetOffsetFromEntityInWorldCoords(vehicle, 0.0, (dimensionMax.y), 0.0)
                    end
                    if #(pos - trunkpos) < 1.5 and not IsPedInAnyVehicle(ped) then
                        if GetVehicleDoorLockStatus(vehicle) < 2 then
                            CurrentVehicle = "T-"..Trim(GetVehicleNumberPlateText(vehicle))
                            curVeh = vehicle
                            CurrentGlovebox = nil
                        else
                            return
                        end
                    else
                        CurrentVehicle = nil
                    end
                else
                    CurrentVehicle = nil
                end
            end

            if CurrentVehicle then -- Trunk
                local vehicleClass = GetVehicleClass(curVeh)
                local maxweight, slots = GetTrunkSize(vehicleClass)
                local other = {
                    maxweight = maxweight,
                    slots = slots,
                }
                TriggerServerEvent("inventory:server:OpenInventory", "trunk", CurrentVehicle, other)
                OpenTrunk()
            elseif CurrentGlovebox then
                TriggerServerEvent("inventory:server:OpenInventory", "glovebox", CurrentGlovebox)
            else
                CurrentDrop = GetNearDrop()
                TriggerServerEvent("inventory:server:OpenInventory", "drop", CurrentDrop, GetEntityCoords(PlayerPedId()))
            end

        end
    else
        SendNUIMessage({
            action = "close",
        })
    end
end)
RegisterKeyMapping('inventory', "Open Inventory", 'keyboard', "TAB")

RegisterNetEvent('inventory:client:OpenInventory', function(inventory, other)
    if not IsEntityDead(PlayerPedId()) and not isOpen then
        LS_CORE.Callback.Functions.TriggerCallback('inventory:server:ConvertQuality', function(first, second)
            inventory = first
            other = second

            firstInventory = inventory.inventoryId
            secondInventory = other.inventoryId

            if not IsPedInAnyVehicle(ped, false) then
                LoadAnimDict('clothingtie')
                TaskPlayAnim(PlayerPedId(), 'clothingtie', 'try_tie_neutral_c', 8.0, 1.0, -1, 1, 0, 0, 0, 0)
            end
            
            for k,v in pairs(inventory.inventoryItems) do inventory.inventoryItems[v.slot].color = GenerateColor(v) end
            for k,v in pairs(other.inventoryItems) do other.inventoryItems[v.slot].color = GenerateColor(v) end

            SendNUIMessage({
                action = "open",
                inventory = inventory,
                other = other,
                items = Config.Shared.Items,
                chistory = LS_CORE.Functions.GetPlayerData().craftinghistory,
            })
            SetNuiFocus(true, true)
            isOpen = true

            startUpdateStatus()

        end, inventory, other)
    end
end)

Trim = function(value)
    if not value then return nil end
    return (string.gsub(value, '^%s*(.-)%s*$', '%1'))
end

RegisterNetEvent('inventory:c:ItemMove', function(fromInventoryID, toInventoryID, fromInventory, toInventory)
    if not IsEntityDead(PlayerPedId()) and isOpen then
        SendNUIMessage({
            action = "update",
            fromId = fromInventoryID,
            toId = toInventoryID,
            fromInventory = fromInventory,
            toInventory = toInventory,
        })
    end
end)

RegisterNUICallback("GiveItem", function(data, cb)
    local player, distance = LS_CORE.Functions.GetClosestPlayer(GetEntityCoords(PlayerPedId()))
    if player ~= -1 and distance < 3 then
        local playerId = GetPlayerServerId(player)
        SetCurrentPedWeapon(PlayerPedId(),'WEAPON_UNARMED',true)
        TriggerServerEvent("inventory:s:GiveItem", playerId, data.item)
    end
    cb( true )
end)

RegisterNUICallback("closeInventory", function (_, cb)
    CloseInventory()

    cb ( true )
end)

RegisterNUICallback("ItemMove", function (data, cb)
    TriggerServerEvent("inventory:s:ItemMove", data)
    cb ( true )
end)

RegisterNUICallback("GetCash", function (data, cb)
    LS_CORE.Callback.Functions.TriggerCallback("inventory:server:getCash", function(result)
        cb(result)
    end)
end)

RegisterNUICallback("BuyItem", function (data, cb)
    TriggerServerEvent("inventory:s:BuyItem", data.price)
    cb ( true )
end)

RegisterNUICallback("CraftItem", function (data, cb)
    PlayToggleEmote({ Dict = "anim@amb@clubhouse@tutorial@bkr_tut_ig3@", Anim = "machinic_loop_mechandplayer", Move = 51, Dur = 2500}, function()
        TriggerServerEvent("inventory:s:CraftItem", data.item, data.amount)
    end)
    cb ( true )
end)
RegisterNUICallback("UseItem", function (data, cb)
    TriggerServerEvent("inventory:s:UseItem", data.item)
    cb ( true )
end)


CreateDropId = function()
	local id = "DROP-"..math.random(10000, 99999)
    return id
end

Drops       = {}
DropsNear   = nil
CreateThread(function()
    local sleep = 0
    while true do
        LS_CORE.Callback.Functions.TriggerCallback("inventory:server:GetDrops", function(drops)
            for _,v in pairs(Drops) do
                if v.object ~= nil then
                    DeleteObject(v.object)
                end
            end
            Drops = {}
            for k,v in pairs(drops) do
                Drops[k] = {}
                Drops[k].id = v.id
                Drops[k].coords = v.coords
                Drops[k].items = v.items

                if Drops[k].object == nil and json.encode(Drops[k].items) ~= '"[]"' then
                    if json.encode(Drops[k].items) ~= "[]" then
                        local object = 'hei_prop_heist_box'
                        if (tablelength(Drops[k].items) < 2) and (Config.DropsItems.isEnabled) then
                            local __, firstItem = next(Drops[k].items)

                            if (firstItem ~= nil and firstItem.name ~= nil) and (Config.DropsItems.items[firstItem.name] ~= nil) then
                                object = Config.DropsItems.items[firstItem.name].object
                            end
                        end
                        RequestModel(GetHashKey(object))
                        while not HasModelLoaded(GetHashKey(object)) do Wait(10) end
                        
						local box = CreateObject(GetHashKey(object), v.coords.x, v.coords.y, v.coords.z, false, false, false)
                        PlaceObjectOnGroundProperly(box)
                        FreezeEntityPosition(box, true)
                        SetEntityCollision(box, false, false)
                
                        Drops[k].object = box
                    end
                end

            end
            
        end)

        if (tablelength(Drops) > 0) then
            sleep = Config.RefreshDrops*1000
        else
            sleep = Config.EmptyRefresh
        end
        Wait(sleep)
    end
end)

tablelength = function(T)
    local count = 0
    for _ in pairs(T) do count = count + 1 end
    return count
end

FindNearDrops = function()
	for _,v in pairs(Drops) do
		if v.coords then
			local coordsP = GetEntityCoords(PlayerPedId())
			if #(coordsP - v.coords) < 2.0 then
				DropsNear = v
				break
			end
		end
	end
end

GetNearDrop = function()
    local newId = CreateDropId()
    DropsNear = nil
	FindNearDrops()

    if DropsNear ~= nil then
        newId = DropsNear.id
    else
        RequestModel(GetHashKey("hei_prop_heist_box"))
        while not HasModelLoaded(GetHashKey("hei_prop_heist_box")) do Citizen.Wait(10) end
    
        DropsNear = {id=newId, coords=GetEntityCoords(PlayerPedId())}
        Drops[newId] = {id=newId, coords=GetEntityCoords(PlayerPedId())}
    end
    return newId
end

RegisterNetEvent("inventory:c:checkDropOpen", function(id)
    if secondInventory == id then
        TriggerServerEvent("inventory:s:checkDropOpen", id)
    end
end)

startUpdateStatus = function()
    CreateThread(function()
        while isOpen do
            local ped = PlayerPedId()
            SendNUIMessage({
                action = "updatestatus",
                health = math.floor((GetEntityHealth(ped) - 100) / (GetEntityMaxHealth(ped) - 100) * 100),
                armor = GetPedArmour(ped),
                coords = GetEntityCoords(ped),
                heading = GetEntityHeading(ped),
            })
            Wait(500)
        end
    end)
end

CloseInventory = function() 
    firstInventory = nil
    secondInventory = nil

    SetNuiFocus(false, false)
    isOpen = false
    
    ClearPedTasks(PlayerPedId())

    if CurrentVehicle then CloseTrunk() end

    CurrentVehicle = nil
    CurrentGlovebox = nil

    DeleteDrawedPed()
end
exports("CloseInventory", CloseInventory)


RegisterCommand("rob", function ()
    exports["inventory"]:RobPerson()
end)

exports("RobPerson", function()
    local player, distance = LS_CORE.Functions.GetClosestPlayer(GetEntityCoords(PlayerPedId()))
    if player ~= -1 and distance < 4 then
        local playerId = GetPlayerServerId(player)
        TriggerServerEvent("inventory:server:OpenInventory", "search", playerId)
    end
end)

RegisterNUICallback("SetClothings", function( data, cb )
    local Ped = PlayerPedId()
    local Gender = IsMpPed(Ped)

    for k,v in pairs(data.data) do

        if v.data == false then
            local configItem = Config.Client.Clothings[v.item]
            if configItem then
                if configItem.Drawable ~= nil then
                    local clothingType = configItem.Table[Gender]
                    local text = GetPedTextureVariation(Ped, configItem.Drawable)
                    SetPedComponentVariation(Ped, configItem.Drawable, clothingType, text, 0)
                else
                    ClearPedProp(Ped, configItem.Prop)
                end
            end
        else
            local configItem = Config.Client.Clothings[v.item]

            if configItem then
                if configItem.Drawable ~= nil then
                    if v.data.drawable ~= nil  then
                        SetPedComponentVariation(Ped, configItem.Drawable, v.data.drawable, v.data.texture, 0)
                    end
                else
                    if v.data.prop ~= nil then
                        SetPedPropIndex(Ped, configItem.Prop, v.data.prop, v.data.texture, true)
                    end
                end
            end
        end
    end
    cb( true )
end)

exports("SetInventoryClothings", function()
    if not Config.Clothing then return end
    
    if CheckInClothingEdit() then return end

    SendNUIMessage({
        action = "getClothing",
        items = LS_CORE.Functions.GetPlayerData().items,
        allitems = Config.Shared.Items
    }) 
end)

RegisterNetEvent("inventory:client:SetDefaultClothing", function()
    exports["inventory"]:SetInventoryClothings()
end)

DrawPed = nil
DrawPedToScreen = function(ped, draw)
    if draw == nil then draw = 0 end
    CreateThread(function()
        SetFrontendActive(true)

        ActivateFrontendMenu(GetHashKey("FE_MENU_VERSION_EMPTY_NO_BACKGROUND"), false, -1)
        Wait(100)
        SetMouseCursorVisibleInMenus(false)

        local Male = GetHashKey("mp_m_freemode_01") local Female = GetHashKey("mp_f_freemode_01")
        local modelFinal
        if GetEntityModel(ped) == Male then modelFinal = "mp_m_freemode_01" elseif GetEntityModel(ped) == Female then modelFinal = "mp_f_freemode_01" else return false end

        PlayerPedPreview = CreatePed(2, modelFinal, 0, 0, 0, 0, false, true)
        ClonePedToTarget( ped, PlayerPedPreview)

        FreezeEntityPosition(PlayerPedPreview, true)
        SetEntityVisible(PlayerPedPreview, false, false)
        NetworkSetEntityInvisibleToNetwork(PlayerPedPreview, false)

        Wait(200)
        SetPedAsNoLongerNeeded(PlayerPedPreview)
        GivePedToPauseMenu(PlayerPedPreview, draw)
        SetPauseMenuPedLighting(true)
        SetPauseMenuPedSleepState(true)
        DrawPed = PlayerPedPreview
    end)
end

DeleteDrawedPed = function()
    SetFrontendActive(false)
    DeleteEntity(DrawPed)
end

RefreshPedScreen = function(timeToWait)
    CreateThread(function()
        if DoesEntityExist(DrawPed) then
            Wait(timeToWait)
            DeleteDrawedPed()
            Wait(50)
            if isOpen then
                DrawPedToScreen(PlayerPedId(), 1)
            end
        end
    end)
end

RegisterNUICallback("ChangeClothingPedStatus", function(data, cb)
    local isDisplay = data.isDisplay

    if isDisplay then
        DrawPedToScreen(PlayerPedId(), 1)
    else
        DeleteDrawedPed()
    end
end)

local isStarted = false
RegisterNetEvent("LS_CORE:PLAYER:CREATED", function()
    CreateThread(function()
        isStarted = true
        while Config.Clothing do
            exports["inventory"]:SetInventoryClothings()
            Wait(30000)
        end
    end)
end)

CreateThread(function ()
    Wait(200)
    if not isStarted and LS_CORE.Functions.GetPlayerData() ~= nil then
        while Config.Clothing do
            exports["inventory"]:SetInventoryClothings()
            Wait(30000)
        end
    end
end)

function IncurCooldown(ms)
    Citizen.CreateThread(function()
        Cooldown = true Wait(ms) Cooldown = false
    end)
end

function PlayToggleEmote(e, cb)
    local Ped = PlayerPedId()
    while not HasAnimDictLoaded(e.Dict) do RequestAnimDict(e.Dict) Wait(100) end
    if IsPedInAnyVehicle(Ped) then e.Move = 51 end
    TaskPlayAnim(Ped, e.Dict, e.Anim, 3.0, 3.0, e.Dur, e.Move, 0, false, false, false)
    local Pause = e.Dur-500 if Pause < 500 then Pause = 500 end
    IncurCooldown(Pause)
    Wait(Pause) -- Lets wait for the emote to play for a bit then do the callback.
    cb()
end

function IsMpPed(ped)
    local Male = GetHashKey("mp_m_freemode_01") local Female = GetHashKey("mp_f_freemode_01")
    local CurrentModel = GetEntityModel(ped)
    if CurrentModel == Male then return "Male" elseif CurrentModel == Female then return "Female" else return false end
end

RegisterNUICallback("ChangeClothing", function(data, cb)
    local Ped = PlayerPedId()
    local Gender = IsMpPed(Ped)
    
    if not data then return end

    local configItem = Config.Client.Clothings[data.slot]
    if configItem then
        if data.isDress then
            PlayToggleEmote(configItem.Emote, function()
                if configItem then
                    if configItem.Drawable ~= nil then
                        if data.clothingInfo.drawable ~= nil  then
                            SetPedComponentVariation(Ped, configItem.Drawable, data.clothingInfo.drawable, data.clothingInfo.texture, 0)
                        end
                    else
                        if data.clothingInfo.prop ~= nil then
                            SetPedPropIndex(Ped, configItem.Prop, data.clothingInfo.prop, data.clothingInfo.texture, true)
                        end
                    end

                    RefreshPedScreen(configItem.Emote.dur)
                end
            end)
        else
            PlayToggleEmote(configItem.Emote, function()
                if configItem.Drawable ~= nil then
                    local clothingType = configItem.Table[Gender]
                    local text = GetPedTextureVariation(Ped, configItem.Drawable)
                    SetPedComponentVariation(Ped, configItem.Drawable, clothingType, text, 0)
                else
                    ClearPedProp(Ped, configItem.Prop)
                end

                RefreshPedScreen(configItem.Emote.dur)
            end)
        end
    else
        cb(false)
    end
end)

CreateThread(function()
    while true do
        Wait(0)
        BlockWeaponWheelThisFrame()
        DisableControlAction(0, 37, true)
    end
end)
