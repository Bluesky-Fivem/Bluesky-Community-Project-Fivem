Hud = nil
Vehicle = nil
Logged = nil

posX = 0.01 - 0.028
posY = -0.01-- 0.0152

width = 0.183--0.183
height = 0.32--0.32--0.354

local _toggled = false
local _paused = false
local _vehToggled = false
local _statuses = {}
local _statusCount = 0
local _zoomLevel = 1
local _streamed = false

local _zoomLevels = {
    900,
    1000,
    1100,
    1200,
    1300,
    1400
}

CreateThread(function()
    SetMapZoomDataLevel(0, 0.96, 0.9, 0.08, 0.0, 0.0)
    SetMapZoomDataLevel(1, 1.6, 0.9, 0.08, 0.0, 0.0)
    SetMapZoomDataLevel(2, 8.6, 0.9, 0.08, 0.0, 0.0)
    SetMapZoomDataLevel(3, 12.3, 0.9, 0.08, 0.0, 0.0)
    SetMapZoomDataLevel(4, 15.3, 0.9, 0.08, 0.0, 0.0)

    while true do
        GLOBAL_PED = PlayerPedId()

        if IsPedInAnyVehicle(GLOBAL_PED, true) then
            GLOBAL_VEH = GetVehiclePedIsIn(GLOBAL_PED)
        else
            GLOBAL_VEH = nil
        end

        Wait(500)
    end
end)

AddEventHandler('Action:Shared:DependencyUpdate', RetrieveComponents)
function RetrieveComponents()
    Hud = exports['bs_base']:FetchComponent('Hud')
    Vehicle = exports['bs_base']:FetchComponent('Vehicle')
    Utils = exports['bs_base']:FetchComponent('Utils')
end

AddEventHandler('Core:Shared:Ready', function()
    exports['bs_base']:RequestDependencies('Action', {
        'Hud',
        'Vehicle',
        'Utils'
    }, function(error)  
        if #error > 0 then return; end
        RetrieveComponents()
        SendNUIMessage({
            type = 'UPDATE_HP',
            --data = { hp = (GetEntityHealth(GLOBAL_PED) - 100), armor = GetPedArmour(GLOBAL_PED) }
            data = { hp = (GetEntityHealth(GLOBAL_PED) - 100), armor = GetPedArmour(GLOBAL_PED), stamina = GetPlayerSprintTimeRemaining(PlayerId()) * 10, oxygen = GetPlayerUnderwaterTimeRemaining(PlayerId()) * 10 }
        })
        Hud.Minimap:Set()
    end)
end)


HUD = {
    _required = { 'Show', 'Hide', 'Toggle', 'Vehicle', 'RegisterStatus', 'Minimap' },
    Show = function(self)
        if _toggled then return end

        SendNUIMessage({
            type = 'SHOW_HUD'
        })
        _toggled = true
        StartThreads()

        if GLOBAL_VEH ~= nil then
            Hud.Vehicle:Show()
        end
    end,
    Hide = function(self)
        if not _toggled then return end
        
        SendNUIMessage({
            type = 'HIDE_HUD'
        })
        _toggled = false

        Hud.Vehicle:Hide()

        Citizen.Wait(150)
        DisplayRadar(false)
    end,
    Toggle = function(self)
        SendNUIMessage({
            type = 'TOGGLE_HUD'
        })
        _toggled = not _toggled
        DisplayRadar(_toggled)
        if _toggled then
            StartThreads()

            if GLOBAL_VEH ~= nil then
                Hud.Vehicle:Show()
            else
                Hud.Vehicle:Hide()
            end
        else
            Hud.Vehicle:Hide()
        end
    end,
    ShiftLocation = function(self, status)
        SendNUIMessage({
            type = 'SHIFT_LOCATION',
            data = { shift = status }
        })
    end,
    Vehicle = {
        Show = function(self)
            if _vehToggled then return end
    
            SendNUIMessage({
                type = 'SHOW_VEHICLE'
            })
            _vehToggled = true
            StartVehicleThreads()
        end,
        Hide = function(self)
            if not _vehToggled then return end
            
            SendNUIMessage({
                type = 'HIDE_VEHICLE'
            })
            _vehToggled = false
        end,
        Toggle = function(self)
            SendNUIMessage({
                type = 'TOGGLE_VEHICLE'
            })
            _vehToggled = not _vehToggled
            if _vehToggled then
                StartVehicleThreads()
            end
        end,
    },
    RegisterStatus = function(self, name, current, max, icon, flash, update)
        local data = { name = name, max = max, value = current, icon = icon, flash = flash }

        if update then
            SendNUIMessage({
                type = 'UPDATE_STATUS',
                data = { status = data }
            })
        else
            SendNUIMessage({
                type = 'REGISTER_STATUS',
                data = { status = data }
            })
            _statusCount = _statusCount + 1
        end

        _statuses[name] = data
    end,
    ResetStatus = function(self)
        SendNUIMessage({
            type = 'RESET_STATUSES'
        })
    end,
    Minimap = {
        Set = function(self)
            SetRadarZoom(_zoomLevels[_zoomLevel])
        end,
        In = function(self)
            if _zoomLevel == 1 then
                _zoomLevel = #_zoomLevels
            else
                _zoomLevel = _zoomLevel - 1
            end
            SetRadarZoom(_zoomLevels[_zoomLevel])
        end,
        Out = function(self)
            if _zoomLevel == #_zoomLevels then
                _zoomLevel = 1
            else
                _zoomLevel = _zoomLevel + 1
            end
            SetRadarZoom(_zoomLevels[_zoomLevel])
        end,
    }
}

AddEventHandler('Proxy:Shared:RegisterReady', function()
    exports['bs_base']:RegisterComponent('Hud', HUD)
end)

function GetLocation()
    local direction = GetDirection(GetEntityHeading(GLOBAL_PED))
    local pos = GetEntityCoords(GLOBAL_PED)
    local var1, var2 = GetStreetNameAtCoord(pos.x, pos.y, pos.z, Citizen.ResultAsInteger(), Citizen.ResultAsInteger())
    local area = GetLabelText(GetNameOfZone(pos.x, pos.y, pos.z))

    return {
        main = GetStreetNameFromHashKey(var1),
        cross = GetStreetNameFromHashKey(var2),
        area = area,
        direction = direction,
    }
end


function GetDirection(heading)
    if ((heading >= 0 and heading < 45) or (heading >= 315 and heading < 360)) then
        return "N"
    elseif (heading >= 45 and heading < 135) then
        return "E"
    elseif (heading >=135 and heading < 225) then
        return "S"
    elseif (heading >= 225 and heading < 315) then
        return "W"
    end
end

function StartThreads()
    CreateThread(function()
        while _toggled do

            if IsPauseMenuActive() and not _paused then
                _paused = true
                
                SendNUIMessage({
                    type = 'TOGGLE_HUD'
                })

                if _vehToggled then
                    SendNUIMessage({
                        type = 'TOGGLE_VEHICLE'
                    })
                end
            end

            if not _paused then

                SendNUIMessage({
                    type = 'UPDATE_LOCATION',
                    data = { location = GetLocation() }
                })
                Wait(500)
                SendNUIMessage({
                    type = 'UPDATE_HP',
                    data = { hp = (GetEntityHealth(GLOBAL_PED) - 100), armor = GetPedArmour(GLOBAL_PED), stamina = GetPlayerSprintTimeRemaining(PlayerId()) * 10, oxygen = GetPlayerUnderwaterTimeRemaining(PlayerId()) * 10 }
                })
                --print('STAMINA: ' .. GetPlayerSprintTimeRemaining(PlayerId()) .. ' | UNDERWATER: ' .. GetPlayerUnderwaterTimeRemaining(PlayerId()))
                if not IsRadarEnabled() and Logged and not IsEntityDead(GLOBAL_PED) and _toggled then 
                    DisplayRadar(true)
                end
                Wait(500)
            else
                if not IsPauseMenuActive() then
                    SendNUIMessage({
                        type = 'TOGGLE_HUD'
                    })
    
                    if _vehToggled then
                        SendNUIMessage({
                            type = 'TOGGLE_VEHICLE'
                        })
                    end
                    _paused = false
                end
                Wait(1000)
            end
        end
    end)
end

function StartVehicleThreads()
    if not _toggled then return end

    SendNUIMessage({
        type = 'UPDATE_FUEL',
        data = { fuel = DecorGetFloat(GetVehiclePedIsIn(GLOBAL_PED, true), 'VEH_FUEL') }
    })

    local class = GetVehicleClass(GetVehiclePedIsIn(GLOBAL_PED, true))
    if class == 8 or class == 13 then
        SendNUIMessage({
            type = 'HIDE_SEATBELT',
        })
    else
        SendNUIMessage({
            type = 'SHOW_SEATBELT',
        })
    end

    CreateThread(function()
        while _vehToggled do
            local speed = math.ceil(GetEntitySpeed(GLOBAL_VEH) * 2.237)
            SendNUIMessage({
                type = 'UPDATE_SPEED',
                data = { speed = speed }
            })
            Wait(100)
        end
    end)

    -- Citizen.CreateThread(function()
    --     while _vehToggled do
    --         SendNUIMessage({
    --             type = 'UPDATE_FUEL',
    --             data = { fuel = DecorGetFloat(GLOBAL_VEH, 'VEH_FUEL') }
    --         })
    --         Citizen.Wait(9000)
    --     end
    -- end)
end

RegisterCommand('toghud', function()
    Hud:Toggle()
end)

RegisterCommand('zoom+', function()
    Hud.Minimap:In()
end)

RegisterCommand('zoom-', function()
    Hud.Minimap:Out()
end)

TriggerEvent('chat:removeSuggestion', 'toghud')
TriggerEvent('chat:removeSuggestion', 'zoom+')
TriggerEvent('chat:removeSuggestion', 'zoom-')

RegisterKeyMapping('toghud', 'Hud ki / be kapcsolása', 'keyboard', 'F11')
RegisterKeyMapping('zoom+', 'Hud térkép zoom +', 'keyboard', 'ADD')
RegisterKeyMapping('zoom-', 'Hud térkép zoom -', 'keyboard', 'SUBTRACT')