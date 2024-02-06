local deadAnimDict = 'dead'
local deadAnim = 'dead_a'
local dick = 5
deathTime = 60

-- Functions

local function loadAnimDict(dict)
    while (not HasAnimDictLoaded(dict)) do
        RequestAnimDict(dict)
        Wait(5)
    end
end

function OnDeath()
    if not isDead then
        isDead = true
        local player = PlayerPedId()

        while GetEntitySpeed(player) > 0.5 or IsPedRagdoll(player) do
            Wait(10)
        end

        if isDead then
            local pos = GetEntityCoords(player)
            local heading = GetEntityHeading(player)

            local ped = PlayerPedId()
            if IsPedInAnyVehicle(ped) then
                local veh = GetVehiclePedIsIn(ped)
                local vehseats = GetVehicleModelNumberOfSeats(GetHashKey(GetEntityModel(veh)))
                for i = -1, vehseats do
                    local occupant = GetPedInVehicleSeat(veh, i)
                    if occupant == ped then
                        NetworkResurrectLocalPlayer(pos.x, pos.y, pos.z + 0.5, heading, true, false)
                        SetPedIntoVehicle(ped, veh, i)
                    end
                end
            else
                NetworkResurrectLocalPlayer(pos.x, pos.y, pos.z + 0.5, heading, true, false)
            end

            SetEntityInvincible(player, true)
            SetEntityHealth(player, GetEntityMaxHealth(player))
            if IsPedInAnyVehicle(player, false) then
                loadAnimDict('veh@low@front_ps@idle_duck')
                TaskPlayAnim(player, 'veh@low@front_ps@idle_duck', 'sit', 1.0, 1.0, -1, 1, 0, 0, 0, 0)
            else
                loadAnimDict(deadAnimDict)
                TaskPlayAnim(player, deadAnimDict, deadAnim, 1.0, 1.0, -1, 1, 0, 0, 0, 0)
            end
            -- dispatch 
        end
    end
end

function DeathTimer()
    local player = PlayerPedId()
    local pos = GetEntityCoords(player)
    local heading = GetEntityHeading(player)
    dick = 5
    while isDead do
        Wait(1000)
        deathTime = deathTime - 1
        while deathTime <= 0 do
            Wait(0)
            if IsControlPressed(0, 38) then
                if dick < 1 then 
                    TriggerEvent('hospital:client:Revive')
                    dick = 5
                end
            end
            if IsControlPressed(0, 38) then
                if dick - 1 >= 0 then
                    dick = dick - 1
                else
                    dick = 0
                end
            end
            if IsControlReleased(0, 38) then
                dick = 5
            end
        end
    end
end

local function DrawTxt(x, y, width, height, scale, text, r, g, b, a, _)
    SetTextFont(4)
    SetTextProportional(0)
    SetTextScale(scale, scale)
    SetTextColour(r, g, b, a)
    SetTextDropShadow(0, 0, 0, 0, 255)
    SetTextEdge(2, 0, 0, 0, 255)
    SetTextDropShadow()
    SetTextOutline()
    BeginTextCommandDisplayText('STRING')
    AddTextComponentSubstringPlayerName(text)
    EndTextCommandDisplayText(x - width / 2, y - height / 2 + 0.005)
end

-- Damage Handler

AddEventHandler('gameEventTriggered', function(event, data)
    if event == 'CEventNetworkEntityDamage' then
        if IsEntityDead(PlayerPedId()) then
            if not isDead then
                OnDeath()
                DeathTimer()
            end
        end
    end
end)


CreateThread(function()
    while true do
        local sleep = 1000
        if isDead  then
            sleep = 5
            local ped = PlayerPedId()
            DisableAllControlActions(0)
            EnableControlAction(0, 1, true)
            EnableControlAction(0, 2, true)
            EnableControlAction(0, 245, true)
            EnableControlAction(0, 38, true)
            EnableControlAction(0, 0, true)
            EnableControlAction(0, 322, true)
            EnableControlAction(0, 288, true)
            EnableControlAction(0, 213, true)
            EnableControlAction(0, 249, true)
            EnableControlAction(0, 46, true)
            EnableControlAction(0, 47, true)

            if isDead then
                if deathTime > 0 then
                    DrawTxt(0.89, 1.42, 1.0,1.0,0.6, "Dead: ~r~" .. math.ceil(deathTime) .. "~w~ seconds remaining", 255, 255, 255, 255)
                else
                   DrawTxt(0.89, 1.42, 1.0,1.0,0.6, "~w~ HOLD ~r~[E] ("..dick..")~w~ TO RESPAWN ~w~OR WAIT FOR ~r~EMS", 255, 255, 255, 255)
                end
        

                if IsPedInAnyVehicle(ped, false) then
                    loadAnimDict('veh@low@front_ps@idle_duck')
                    if not IsEntityPlayingAnim(ped, 'veh@low@front_ps@idle_duck', 'sit', 3) then
                        TaskPlayAnim(ped, 'veh@low@front_ps@idle_duck', 'sit', 1.0, 1.0, -1, 1, 0, 0, 0, 0)
                    end
                end
                SetCurrentPedWeapon(ped, `WEAPON_UNARMED`, true)
            end
        end
        Wait(sleep)
    end
end)

RegisterNetEvent('hospital:client:Revive', function()
    local player = PlayerPedId()

    if isDead then
        local pos = GetEntityCoords(player, true)
        NetworkResurrectLocalPlayer(pos.x, pos.y, pos.z, GetEntityHeading(player), true, false)
        isDead = false
        SetEntityInvincible(player, false)
    end

    SetEntityMaxHealth(player, 200)
    SetEntityHealth(player, 200)
    ClearPedBloodDamage(player)
    SetPlayerSprint(PlayerId(), true)
    ResetPedMovementClipset(player, 0.0)
end)