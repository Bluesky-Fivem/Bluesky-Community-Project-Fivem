local usedItemId, usedItemSlot, usedItemMetadata

RegisterNUICallback('joinRace', function(data)
    local hasRaceUsbAndAlias = getHasRaceUsbAndAlias()
    if not hasRaceUsbAndAlias.has_usb_racing or not hasRaceUsbAndAlias.racingAlias then return end
    print("[Racing] joinRace")
    RPC.execute("pnp-racing:joinRace", data.id, hasRaceUsbAndAlias.racingAlias, 2)
end)

RegisterNUICallback('leaveRace', function(data)
    exports["pnp-racing"]:leaveRace()
end)

RegisterNUICallback('startRace', function(data, cb)
    exports["pnp-racing"]:startRace(data.countdown)
end)

-- This shows in the active race category
RegisterNUICallback('endRace', function(data, cb)
    exports["pnp-racing"]:endRace()
end)

RegisterNUICallback('locateRace', function(data, cb)
    TriggerEvent("DoLongHudText", "Updated GPS.", 1)
    exports["pnp-racing"]:locateRace(data.id)
end)

RegisterNUICallback('previewRace', function(data, cb)
    exports["pnp-racing"]:previewRace(data.id)
end)

RegisterNUICallback('setTrackGps', function(data, cb)
    local x, y = RPC.execute("racing:tracks:set:gps", data.id)
    TriggerEvent("DoLongHudText", "Updated GPS.", 1)
    SetNewWaypoint(x, y)
end)

AddEventHandler("pnp-racing:api:updatedState", function(state)
    local data = {}
    if state.finishedRaces then data.completed = state.finishedRaces end
    if state.races then data.maps = state.races end
    if state.pendingRaces then data.pending = state.pendingRaces end
    if state.activeRaces then data.active = state.activeRaces end
    SendReactMessage("updateRacing", data)
end)

local function openAliasTextbox()
exports['pnp-ui']:openApplication('textbox', {
    callbackUrl = 'pnp-interface:racing:input:alias',
    key = 1,
    items = {
        {
            icon = "pencil-alt", 
            label = "Alias", 
            name = "alias"
        }
    },
    show = true
    })
end

local function openNameTextbox()
    exports['pnp-ui']:openApplication('textbox', {
        callbackUrl = 'pnp-interface:racing:input:name',
        key = 1,
        items = {
            {
                icon = "pencil-alt", 
                label = "Track Name", 
                name = "name"
            }
        },
        show = true
        })
    end

AddEventHandler("pnp-inventory:itemUsed", function(item, metadata, inventoryName, slot)
    if item ~= "racingusb" then return end
    usedItemId = item
    usedItemSlot = slot
    usedItemMetadata = json.decode(metadata)
    if usedItemMetadata ~= nil then
        local characterId = exports["isPed"]:isPed("cid")
        if usedItemMetadata.characterId ~= nil then
        if tonumber(usedItemMetadata.characterId) ~= tonumber(characterId) then
        TriggerEvent("DoLongHudText", "You don't own this usb!", 2)
        return
        end
        end
    if usedItemMetadata.Alias then
        TriggerEvent("DoLongHudText", "Alias can't be changed for this usb!", 2)
        return
    end
    end
    openAliasTextbox()
end)

local isCreating = false

AddEventHandler("pnp-inventory:itemUsed", function(item, metadata, inventoryName, slot)
    if item ~= "racingusb0" then return end
    -- TODO; Check if they are already creating, and if they are finish creating it?
    -- Hmm what if they want to start over? And cancel?

    if isCreating then
        TriggerEvent("pnp-racing:cmd:racecreatedone")
    end

    if not isCreating then
        openNameTextbox()
    end
end)

RegisterInterfaceCallback("pnp-interface:racing:input:alias", function(data, cb)
    cb({data = {}, meta = {ok = true, message = ''}})
    exports['pnp-ui']:closeApplication('textbox')
    local alias = data.values.alias
    if usedItemMetadata ~= nil then
    if usedItemMetadata.Alias then return end
    end
    
    if not alias then
        TriggerEvent("DoLongHudText", "No alias entered!", 2)
        return
    end

    local success, message = RPC.execute("pnp-racing:setAlias", usedItemId, usedItemSlot, usedItemMetadata, alias)
    if success then
        local serverid = GetPlayerServerId(PlayerId())
        SendReactMessage('setNotify', {
            serverid = serverid,
            app = "phone",
            data = {
                action = "racing-alias-set",
                title = "From The PM",
                text = "Welcome to the underground, " .. alias .. ".",
            }
            
        })
    else
        TriggerEvent("DoLongHudText", message or "Alias could not be set.", 2)
        if message == "Alias already taken!" then
            openAliasTextbox()
        end
    end
end)

RegisterInterfaceCallback("pnp-interface:racing:input:name", function(data, cb)
    cb({data = {}, meta = {ok = true, message = ''}})
    exports['pnp-ui']:closeApplication('textbox')
    local trackName = data.values.name

    if not trackName then
        TriggerEvent("DoLongHudText", "No track name entered!", 2)
        openNameTextbox()
        return
    end

    local isTaken = RPC.execute("pnp-racing:isRaceNameTaken", raceName)

    if isTaken then
        TriggerEvent("DoLongHudText", "Track name already taken!", 2)
        openNameTextbox()
        return
    end

    local options = {
        raceName = trackName,
        raceType = "Lap",
        raceThumbnail = ""
    }

    isCreating = true

    TriggerEvent("pnp-racing:cmd:racecreate", options)
end)

-- Use this function when joining races, and when opening laptop for boosting.
function getHasRaceUsbAndAlias()
    local characterId = exports["isPed"]:isPed("cid")
    local racingUsbItem = exports["pnp-inventory"]:GetInfoForFirstItemOfName("racingusb")
    local has_usb_racing = racingUsbItem ~= nil and racingUsbItem.quality > 0
    local usbMetadata = has_usb_racing and json.decode(racingUsbItem.information) or {}
    has_usb_racing = has_usb_racing and characterId == usbMetadata.characterId
    local racingAlias = has_usb_racing and usbMetadata.Alias or nil
    return { has_usb_racing = has_usb_racing, racingAlias = racingAlias }
end
exports("getHasRaceUsbAndAlias", getHasRaceUsbAndAlias)