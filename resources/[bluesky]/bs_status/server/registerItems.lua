--Nem működik az inventory miatt kikerült a függvény hívása
function registerUsables()
    Inventory.Items:RegisterUse('bread', 'Status', function(source, item)
        local player = Fetch:Source(source)
        local char = player:GetData('Character')
        Inventory:RemoveItem(char:GetData('ID'), item.Name, 1, item.Slot, 1)
        TriggerClientEvent('Status:Client:updateStatus', source, 'PLAYER_HUNGER', true, 15)
    end)
    
    Inventory.Items:RegisterUse('water', 'Status', function(source, item)
        local player = Fetch:Source(source)
        local char = player:GetData('Character')
        Inventory:RemoveItem(char:GetData('ID'), item.Name, 1, item.Slot, 1)
        TriggerClientEvent('Status:Client:updateStatus', source, 'PLAYER_THIRST', true, 10)
    end)
end