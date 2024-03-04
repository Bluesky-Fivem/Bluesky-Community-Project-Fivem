local editMode = false

RegisterNUICallback('getHousingData', function(_, cb)
  print("getHousingData")
  local characterId = exports["isPed"]:isPed("cid")
  local roomNumber, roomType, available, owned, access = RPC.execute("getHousingData", characterId)
  print(roomNumber, roomType, available, owned, access)
  cb({
    roomNumber = roomNumber,
    roomType = roomType,
    available = available,
    owned = owned,
    access = access
  })
end)

RegisterNUICallback('checkLocation', function(data, cb)
  print("checkLocation")
  local success, data = exports["pnp-housing"]:currentLocation()
  print(success, json.encode(data))
  if not success then 
    print("not success")
    cb({foundHouse = false})
    return
  end
  print("success")
  cb({foundHouse = true, foundHouseName = data.housingName, foundHousePrice = data.housingPrice, foundHouseCategory = data.housingCat, foundHouseIsOwned = data.isOwned})
end)

RegisterNUICallback('purchaseHousing', function(data, cb)
  local complete, info = exports["pnp-housing"]:buyProperty()
  if not complete then 
    cb({success = false, owned = info})
    return
  end
  cb({success = true, owned = info})
end)

RegisterNUICallback('manageHousingLocks', function(data, cb)
  local characterId = exports["isPed"]:isPed("cid")
  if data.action == "lock" then
    local result, message = exports["pnp-housing"]:lock(tonumber(data.id))
    if not result then
      TriggerEvent("DoLongHudText", message, 2)
    end
    local roomNumber, roomType, available, owned, access = RPC.execute("getHousingData", characterId)
    if result then
      cb({
        owned = owned,
        access = access
      })
    end
  else
    local result, message = exports["pnp-housing"]:unlock(tonumber(data.id))
    if not result then
      TriggerEvent("DoLongHudText", message, 2)
    end
    local roomNumber, roomType, available, owned, access = RPC.execute("getHousingData", characterId)
    if result then
      cb({
        owned = owned,
        access = access
      })
    end
  end
end)

RegisterNUICallback('setHousingGps', function(data, cb)
  local result, message = exports["pnp-housing"]:setGps(data.id)
end)

RegisterNUICallback('enterEditMode', function(data, cb)
  -- local availableEditOptions = {
  --   garage = false,
  --   stash = true,
  --   backdoor = false,
  --   wardrobe = true,
  --   furniture = true,
  -- }

    local success, message = exports["pnp-housing"]:enterEdit(data.id)
    cb({ data = message,  meta = { ok = success, message = (not success and message or 'done') } })

  --local message = availableEditOptions -- "Too far from property.""
  --local success = true -- false
end)

RegisterNUICallback('exitEditMode', function(data, cb)
  local success, message = exports["pnp-housing"]:exitEdit(true)
  cb({ data = "Success",  meta = { ok = true, message = 'done' } })
end)

RegisterNUICallback("upgradeApartmentType", function(data, cb)
  local success, message = exports["pnp-apartments"]:getModule("func").upgradeApartment(data.type)
  cb({ data = message, meta = { ok = success, message = (not success and message or 'done') } })
end)