RPC.register("arp:vehicles:getPlayerVehiclesWithCoordinates", function(pSource)
    local user = exports["pnp-base"]:getModule("Player"):GetUser(pSource)
    local char = user:getCurrentCharacter()

    local data = Await(SQL.execute("SELECT * FROM characters_cars WHERE cid = @cid", {
        ["cid"] = char.id
    }))

    if not data then return {} end

    return data
end)

RPC.register("vehicle:coords", function(pSource, pPlate, pCoords, pHeading)
    local plate = pPlate.param
    local coords = pCoords.param
    local heading = pHeading.param

    location = {
        x = coords.x,
        y = coords.y,
        z = coords.z,
        h = heading
    }

    local update = Await(SQL.execute("UPDATE characters_cars SET location = @location WHERE license_plate = @license_plate", {
        ["location"] = json.encode(location),
        ["license_plate"] = plate
    }))
end)

RPC.register("arp:garage:vehicleSpawn", function(pSource, pModel, pCoords, pPlate)
    local coords = pCoords.param
    local model = pModel.param
    local plate = pPlate.param
    plate = plate:gsub("%s+", "")
    plate = string.gsub(plate, "%s+", "")
    local car = CreateVehicle(model, coords.x, coords.y, coords.z, coords.h , true, true)
    local osTime = os.time()
    while not DoesEntityExist(car) do 
        Citizen.Wait(0) 
        if os.time() > osTime + 5 then break end
    end
    SetVehicleNumberPlateText(car, plate)
    print("set plate", plate)
    TriggerClientEvent("keys:addNew", pSource, car, plate)
    local netId = NetworkGetNetworkIdFromEntity(car)

    return netId
end)

RPC.register("arp:vehicles:respawnVehicle", function(pSource, pData)
    local data = pData.param
    local plate = data.plate
    local model = data.model
    local coords = json.decode(data.location)

    plate = plate:gsub("%s+", "")
    plate = string.gsub(plate, "%s+", "")
    local car = CreateVehicle(model, coords.x, coords.y, coords.z, coords.h, true, true)
    local osTime = os.time()
    while not DoesEntityExist(car) do 
        Citizen.Wait(0) 
        if os.time() > osTime + 5 then break end
    end
    SetVehicleNumberPlateText(car, plate)
    print("set plate", plate)
    TriggerClientEvent("keys:addNew", pSource, car, plate)
    local netId = NetworkGetNetworkIdFromEntity(car)

    return true, netId
end)

RegisterNetEvent("arp:vehicles:sell:vehicle")
AddEventHandler("arp:vehicles:sell:vehicle", function(pCid, pSeller, pSellerSrc, pPrice, pPlate)
    print("arp:vehicles:sell:vehicle")
    print("pCid", pCid)
    print("pSeller", pSeller)
    print("pSellerSrc", pSellerSrc)
    print("pPrice", pPrice)
    print("pPlate", pPlate)
    
    local src = source

    local getBuyerBankAccount = Await(SQL.execute("SELECT bank FROM characters WHERE id = @cid", {
        ["cid"] = pCid
    }))

    print("bank check")

    if not getBuyerBankAccount then return end

    print("passed bank check")

    if tonumber(getBuyerBankAccount[1].bank) < tonumber(pPrice) then return end

    print("has enough bread")

    local buyer = exports["pnp-base"]:getModule("Player"):GetUser(src)
    local seller = exports["pnp-base"]:getModule("Player"):GetUser(tonumber(pSellerSrc))

    print("get buyer and seller user")

    if not buyer then return end
    if not seller then return end

    print("passed buyer and seller check")

    buyer:removeBank(tonumber(pPrice))
    seller:addBank(tonumber(pPrice))

    print("take the bread")

    local update = Await(SQL.execute("UPDATE characters_cars SET cid = @cid WHERE license_plate = @license_plate", {
        ["cid"] = pCid,
        ["license_plate"] = pPlate
    }))

    print("attempt transfer of car")

    if not update then return end

    print("transfer of car successful")

    TriggerClientEvent("vehicle:keys:addNew:login", src, pPlate)

    print("add keys")

    TriggerClientEvent("DoLongHudText", tonumber(pSellerSrc), "You've sold your car.")
end)