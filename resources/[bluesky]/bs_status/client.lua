local playerState = LocalPlayer.state

AddEventHandler('onClientResourceStart', function(resourceName)
    if GetCurrentResourceName() ~= resourceName then return end
    TriggerServerEvent('statusLoad')
end)

CreateThread(function()
    while true do
      Citizen.Wait(100)
      SetPlayerHealthRechargeMultiplier(PlayerId(), 0)
    end
end)

RegisterNetEvent('HealthTick', function()
    local player = PlayerPedId()
    local health = GetEntityHealth(player)
    SetEntityHealth(player, health - 5)
end)

function statusUpdate(foodDelta, waterDelta)
    local playerId = PlayerId()
    TriggerServerEvent('ModifyNeeds', foodDelta, waterDelta)
end

RegisterCommand('eat', function()
    print('eat')
    statusUpdate( 5, 5)
end, false)

exports('statusUpdate', foodDelta, waterDelta)
