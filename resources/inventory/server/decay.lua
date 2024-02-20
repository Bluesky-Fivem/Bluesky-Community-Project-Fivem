local LS_CORE = exports["ls-core"]:GetCoreObject()

local TimeAllowed = 60 * 60 * 24 * 1 -- Maths for 1 day dont touch its very important and could break everything
ConvertQuality = function(item)
    local StartDate = item.info.created
    local DecayRate = Config.Shared.Items[item.name:lower()]["decay"] or 0.0
    DecayRate = DecayRate or 0
    local TimeExtra = math.ceil((TimeAllowed * DecayRate))
    local percentDone = 100 - math.ceil((((os.time() - StartDate) / TimeExtra) * 100))
    percentDone = percentDone < 0 and 0 or percentDone
    return percentDone
end

LS_CORE.Callback.Functions.CreateCallback('inventory:server:ConvertQuality', function(src, cb, inventory, other)
    local Player = LS_CORE.Functions.GetPlayer(src)
    if inventory.inventoryItems and next(inventory.inventoryItems) then
        local decayConfig = Config.Shared.Items
        for _, item in pairs(inventory.inventoryItems) do
            if item.info.created then
                local decay = decayConfig[item.name:lower()]["decay"]
                if decay ~= nil and decay ~= 0 then
                    item.info = item.info or {}
                    item.info.quality = item.info.quality or 100
                    local quality = ConvertQuality(item)
                    item.info.quality = quality < item.info.quality and quality or item.info.quality
                end
            end
        end
    end

    if other then
        for _, item in pairs(other.inventoryItems) do
            if item.info.created then
                local decay = Config.Shared.Items[item.name:lower()]["decay"]
                if decay ~= nil or decay ~= 0 then
                    item.info = item.info or {}
                    item.info.quality = item.info.quality or 100
                    local quality = ConvertQuality(item)
                    item.info.quality = quality < item.info.quality and quality or item.info.quality
                end
            end
        end
    end

    SetInventoryItems(Player, inventory.inventoryItems)
    if other then
        if other.inventoryType == "search" then
            SetInventoryItems(LS_CORE.Functions.GetIdentifier(other.inventoryId), other.inventoryItems)
        elseif other.inventoryType == "shop" and other.inventoryType ~= "crafting" then
            saveInventory(other.inventoryId, other.inventoryItems)
        end
    end

    cb(inventory, other)
end)