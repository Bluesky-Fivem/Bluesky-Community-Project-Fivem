local vehicle = nil
local numgears = nil
local topspeedGTA = nil
local topspeedms = nil
local acc = nil
local hash = nil
local selectedgear = 0 
local hbrake = nil

local manualon = false

local incar = false

local currspeedlimit = nil
local ready = false
local realistic = false



-- Global variable
isInVehicleModel = false

Citizen.CreateThread(function()
    local hasBeenSet = false
    local vehicleModels = {'sultan', 'tyrus'}

    while true do
        Citizen.Wait(100) 

        local player = GetPlayerPed(-1)
        local vehicle = GetVehiclePedIsIn(player, false)
        local model = GetEntityModel(vehicle)

        -- check if the model of the current vehicle is in the vehicleModels table
        isInVehicleModel = false
        for i, modelName in ipairs(vehicleModels) do
            if model == GetHashKey(modelName) then
                isInVehicleModel = true
                break
            end
        end

        if IsPedInAnyVehicle(player, false) and isInVehicleModel then
            if not hasBeenSet then
                manualon = true
                print("A manual car? cool cool")
                hasBeenSet = true
            end
        else
            manualon = false
            hasBeenSet = false
        end
    end
end)

function getinfo(gea)
    if isInVehicleModel then
        if gea == 0 then
            return "N"
        elseif gea == -1 then
            return "R"
        else
            return gea
        end
    else
        return "A"
    end
end


Citizen.CreateThread(function()
    while true do
        Citizen.Wait(100) 
        realistic = true
    end
end)



Citizen.CreateThread(function()
    while true do
        Citizen.Wait(100) 

        local ped = PlayerPedId()
        local newveh = GetVehiclePedIsIn(ped,false)
        local class = GetVehicleClass(newveh)

        if newveh == vehicle then

        elseif newveh == 0 and vehicle ~= nil then
            resetvehicle()
        else
            if GetPedInVehicleSeat(newveh,-1) == ped then
                if class ~= 13 and class ~= 14 and class ~= 15 and class ~= 16 and class ~= 21 then
                    vehicle = newveh
                    hash = GetEntityModel(newveh)
                   
                    
                    if GetVehicleMod(vehicle,13) < 0 then
                        numgears = GetVehicleHandlingInt(newveh, "CHandlingData", "nInitialDriveGears")
                    else
                        numgears = GetVehicleHandlingInt(newveh, "CHandlingData", "nInitialDriveGears") + 1
                    end
                    
                    

                    hbrake = GetVehicleHandlingFloat(newveh, "CHandlingData", "fHandBrakeForce")
                    
                    topspeedGTA = GetVehicleHandlingFloat(newveh, "CHandlingData", "fInitialDriveMaxFlatVel")
                    topspeedms = (topspeedGTA * 1.32)/3.6

                    acc = GetVehicleHandlingFloat(newveh, "CHandlingData", "fInitialDriveForce")
                    selectedgear = 0
                    Citizen.Wait(50)
                    ready = true
                end
            end
        end

    end
end)

function resetvehicle()
    SetVehicleHandlingFloat(vehicle, "CHandlingData", "fInitialDriveForce", acc)
    SetVehicleHandlingFloat(vehicle, "CHandlingData", "fInitialDriveMaxFlatVel",topspeedGTA)
    SetVehicleHandlingFloat(vehicle, "CHandlingData", "fHandBrakeForce", hbrake)
    SetVehicleHighGear(vehicle, numgears)
    ModifyVehicleTopSpeed(vehicle,1)
    SetVehicleHandbrake(vehicle, false)
    
    vehicle = nil
    numgears = nil
    topspeedGTA = nil
    topspeedms = nil
    acc = nil
    hash = nil
    hbrake = nil
    selectedgear = 0
    currspeedlimit = nil
    ready = false
end

Citizen.CreateThread(function()
    while true do
        Citizen.Wait(0) 
        if manualon == true and vehicle ~= nil then
        end
    end
end)

-- SHIFT Alert --
local isCooldown = false

-- Define a variable to save the user's preference for the beep sound
local beepSoundEnabled = true

Citizen.CreateThread(function()
    local hasPlayed = false -- add this line

    while true do
        Citizen.Wait(0) -- prevent the script from running too fast

        local player = GetPlayerPed(-1) -- get the player ped
        if IsPedInAnyVehicle(player, false) then -- check if the player is in a vehicle
            local vehicle = GetVehiclePedIsIn(player, false) -- get the vehicle the player is in
            local rpm = GetVehicleCurrentRpm(vehicle) -- get the current RPM of the vehicle

            if rpm >= 0.99 and not isCooldown and not hasPlayed and beepSoundEnabled then -- check if RPM is at maximum and sound has not been played
                TriggerEvent("InteractSound_CL:PlayOnOne","beep",0.05) -- play the beep sound
                hasPlayed = true -- set hasPlayed to true after playing the sound
                isCooldown = true -- start cooldown period
                Citizen.Wait(1000) -- wait for 2 seconds (2000 milliseconds)
                isCooldown = false -- end cooldown period
            elseif rpm < 0.96 then -- reset hasPlayed when RPM drops below maximum
                hasPlayed = false
            end
        end
    end
end)

-- Function to toggle the beep sound on or off
function toggleBeepSound()
    beepSoundEnabled = not beepSoundEnabled
end

-- Register a new command to toggle the beep sound on or off
RegisterCommand('shiftalert', function()
    toggleBeepSound()
    if beepSoundEnabled then
        
        TriggerEvent('DoLongHudText', 'Shift alert sound enabled', 1)
    else
        
        TriggerEvent('DoLongHudText', 'Shift alert sound disabled', 2)
    end
end, false)


function drawProgressBar(x, y, width, height, color, progress)
    -- Draw the background
    DrawRect(x + width / 2, y + height / 2, width, height, 128, 128, 128, 255)

    -- Draw the progress
    local width = width * progress
    DrawRect(x + width / 2, y + height / 2, width, height, color.r, color.g, color.b, 255)
end



-- Register the key bindings
RegisterKeyMapping('+gearUp', 'Gear Up', 'keyboard', 'LSHIFT')
RegisterKeyMapping('+gearDown', 'Gear Down', 'keyboard', 'LCONTROL')

Citizen.CreateThread(function()
    while true do
        Citizen.Wait(0) 

        if manualon == true and vehicle ~= nil then
            if vehicle ~= nil then
                -- Shift up and down
                RegisterCommand('+gearUp', function()
                    if isInVehicleModel and ready == true and selectedgear <= numgears - 1 then
                        DisableControlAction(0, 71, true)
                        selectedgear = selectedgear + 1
                        DisableControlAction(0, 71, false)
                        SimulateGears()
                    end
                end, false)

                RegisterCommand('+gearDown', function()
                    if isInVehicleModel and ready == true and selectedgear > -1 then
                        DisableControlAction(0, 71, true)
                        --Wait(300)
                        selectedgear = selectedgear - 1
                        DisableControlAction(0, 71, false)
                        SimulateGears()
                    end
                end, false)
            end
        end
    end
end)




function SimulateGears()

    local engineup = GetVehicleMod(vehicle,11)      

    if selectedgear > 0 then
        
        local ratio 
        if Config.vehicles[hash] ~= nil then
            if selectedgear ~= 0 and selectedgear ~= nil  then
                if numgears ~= nil and selectedgear ~= nil then
                    ratio = Config.vehicles[hash][numgears][selectedgear] * (1/0.9)
                else
		    ratio = Config.gears[numgears][selectedgear] * (1/0.9)
                end
            end
        
        else
            if selectedgear ~= 0 and selectedgear ~= nil then
                if numgears ~= nil and selectedgear ~= nil then
                    ratio = Config.gears[numgears][selectedgear] * (1/0.9)
                else
                
                end
            
            end
        end

        if ratio ~= nil then
    
            SetVehicleHighGear(vehicle,1)
            newacc = ratio * acc
            newtopspeedGTA = topspeedGTA / ratio
            newtopspeedms = topspeedms / ratio

            SetVehicleHandbrake(vehicle, false)
            SetVehicleHandlingFloat(vehicle, "CHandlingData", "fInitialDriveForce", newacc)
            SetVehicleHandlingFloat(vehicle, "CHandlingData", "fInitialDriveMaxFlatVel", newtopspeedGTA)
            SetVehicleHandlingFloat(vehicle, "CHandlingData", "fHandBrakeForce", hbrake)
            ModifyVehicleTopSpeed(vehicle,1)
            currspeedlimit = newtopspeedms 
        end
    elseif selectedgear == 0 then
        --SetVehicleHandlingFloat(vehicle, "CHandlingData", "fInitialDriveMaxFlatVel", 0.0)
    elseif selectedgear == -1 then
        SetVehicleHandbrake(vehicle, false)
        SetVehicleHighGear(vehicle,numgears)    
        SetVehicleHandlingFloat(vehicle, "CHandlingData", "fInitialDriveForce", acc)
        SetVehicleHandlingFloat(vehicle, "CHandlingData", "fInitialDriveMaxFlatVel", topspeedGTA)
        SetVehicleHandlingFloat(vehicle, "CHandlingData", "fHandBrakeForce", hbrake)
        ModifyVehicleTopSpeed(vehicle,1)
    end
    SetVehicleMod(vehicle,11,engineup,false)	
end

Citizen.CreateThread(function()
    while true do
        Citizen.Wait(0)
        if manualon == true and vehicle ~= nil then
            if selectedgear == -1 then
                if GetVehicleCurrentGear(vehicle) == 1 then
                    DisableControlAction(0, 71, true)
                end
            elseif selectedgear > 0 then
                if GetEntitySpeedVector(vehicle,true).y < 0.0 then   
                    DisableControlAction(0, 72, true)
                end
            elseif selectedgear == 0 then
                SetVehicleHandbrake(vehicle, true)
                if IsControlPressed(0, 76) == false then
                    SetVehicleHandlingFloat(vehicle, "CHandlingData", "fHandBrakeForce", 0.0)
                else
                    SetVehicleHandlingFloat(vehicle, "CHandlingData", "fHandBrakeForce", hbrake)
                end
            end
        else
            Citizen.Wait(100) 
        end
    end
end)



local disable = false
    
Citizen.CreateThread(function()
    while true do
        Citizen.Wait(0)
        if realistic == true then
            if manualon == true and vehicle ~= nil then
                if selectedgear > 1 then
                    if IsControlPressed(0,71) then
                        local speed = GetEntitySpeed(vehicle) 
                        local minspeed = currspeedlimit / 7 

                        if speed < minspeed then
                            if GetVehicleCurrentRpm(vehicle) < 0.4 then
                                disable = true
                            end
                        end
                    end
                end
            else
                Citizen.Wait(100) 
            end  
        else
            Citizen.Wait(100) 
        end
    end
end)



Citizen.CreateThread(function()
    while true do 
        Citizen.Wait(0)
        if disable == true then
            SetVehicleEngineOn(vehicle,false,true,false)
            Citizen.Wait(1000) 
            disable = false
        end   
    end
end)

Citizen.CreateThread(function()
    while true do
        Citizen.Wait(0)
        if vehicle ~= nil and selectedgear ~= 0 then 
            local speed = GetEntitySpeed(vehicle) 
            if currspeedlimit ~= nil then
                if speed >= currspeedlimit then
                    if Config.enginebrake == true then
                        if speed / currspeedlimit > 1.1 then
                        local hhhh = speed / currspeedlimit
                        SetVehicleCurrentRpm(vehicle,hhhh)
                        SetVehicleCheatPowerIncrease(vehicle,-100.0)
                    else
                        SetVehicleCheatPowerIncrease(vehicle,0.0)
                        end
                    else
                        SetVehicleCheatPowerIncrease(vehicle,0.0)
                    end 
                end
            else
                if speed >= topspeedms then
                    SetVehicleCheatPowerIncrease(vehicle,0.0)
                end
            end
        end
    end
end)


function round(value, numDecimalPlaces)
	if numDecimalPlaces then
		local power = 10^numDecimalPlaces
		return math.floor((value * power) + 0.5) / (power)
	else
		return math.floor(value + 0.5)
	end
end

-- Get Gears
function getSelectedGear()
    return selectedgear
end
