local playerState = LocalPlayer.state



RegisterNetEvent('bs_status:add')
AddEventHandler('bs_status:add', function(name, val)
    local amount = val / 1000
    if name == 'food' or 'hunger' then
        statusUpdate( amount, 0)
    elseif name == 'water' or 'thirst' then
        statusUpdate( 0, amount)
    else
        lib.notify({ title = 'error', 
            description = "Status Undefined", 
            type = 'error', 
            duration = 5000, 
        })
    end      
end)

RegisterNetEvent('bs_status:remove')
AddEventHandler('bs_status:remove', function(name, val)
    local amount = val / 1000
    if name == 'food' or 'hunger' then
        statusUpdate( amount , 0)
    elseif name == 'water' or 'thirst' then
        statusUpdate( 0, amount)
    else
        lib.notify({ title = 'error', 
            description = "Status Undefined", 
            type = 'error', 
            duration = 5000, 
        })
    end
end)

AddEventHandler('bs_status:getStatus', function(name, cb)
    local food = playerState.needs.hunger
    local water = playerState.needs.water
    if name == 'food' or 'hunger' then
        local amount = food
        cb(amount)
		return 
    elseif name == 'water' or 'thirst' then
        local amount = water
        cb(amount)
		return 
    else
		--''do wahtever''
    end
end)


RegisterCommand('check1', function()
    TriggerEvent('bs_status:getStatus', 'hunger', function(status)
        if status then 
            print(status) 
        end
    end)
end, false)

-- AddStateBagChangeHandler('needs', GetPlayerServerId(PlayerPedId()), function(bagName, key, value)

--     -- Print the updated thirst value
--     print("Updated Thirst: " .. value.thirst)
--     print("Updated hugner: " .. value.hunger)
--     -- Send a message to update item.thirst
-- end)
