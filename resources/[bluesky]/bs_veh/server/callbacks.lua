function RegisterCallbacks()
    Callbacks:RegisterServerCallback('Vehicle:HasKey', function(source, data, cb)
        cb(Vehicle.Keys:Has(source, data))
    end)

    Callbacks:RegisterServerCallback('Vehicle:AddKey', function(source, data, cb)
        Vehicle.Keys:Add(source, data)
        cb('ok')
    end)

    Callbacks:RegisterServerCallback('Vehicle:RemoveKey', function(source, data, cb)
        Vehicle.Keys:Remove(source, data)
        cb('ok')
    end)

    Callbacks:RegisterServerCallback('Vehicle:ChargeRepair', function(source, data, cb)
        local player = exports['bs_base']:FetchComponent('Fetch'):Source(source)
        local char = player:GetData('Character')
        Wallet:Remove(char, Config.RepairPrice)
        cb('ok')
    end)
    Callbacks:RegisterServerCallback('Vehicle:ChargeColor', function(source, data, cb)
        local player = exports['bs_base']:FetchComponent('Fetch'):Source(source)
        local char = player:GetData('Character')
        Wallet:Remove(char, Config.ColourChangePrice)
        cb('ok')
    end)
end
