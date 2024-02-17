local before = nil
local current = nil
local block = false

function GenerateMowerWork()
    if IsMowerWorker() then 
        Blips:Add('mower_duty', 'Fünyiró öltözö', Config.MowerJob.DutyPos, Config.MowerJob.Blip, 2, Config.BlipSize)
        Markers.MarkerGroups:Add('mowerwork', Config.MowerJob.DutyPos, 1500.0)
        Markers.Markers:Add('mowerwork', 'duty_marker', Config.MowerJob.DutyPos, 20, vector3(1.0, 1.0, 1.0), ({ r = 200, b = 255, g = 0 }), function()
            return true
        end, 'Nyomj {key}E{/key} gombot az átöltözéshez.', 1.35, function()
            Progress:ProgressWithStartEvent({
                name = 'changeClothes',
                duration = 7500,
                label = 'Átöltözés folyamatban...',
                canCancel = false,
                controlDisables = {
                    disableMovement = true,
                    disableCarMovement = true,
                    disableMouse = false,
                    disableCombat = true,
                },
                animation = {
                    animDict = "clothingtie",
                    anim = "try_tie_negative_a",
                    flags = 49,
                }
            }, function()
                Action:Hide()
                TriggerServerEvent('Jobs:Server:ToggleDuty')
            end, function(status)
                Callbacks:ServerCallback('Jobs:ChangeClothes', {job = CharData.Job.job, id = CharData.Job.grade.id, wearing = Jobs:GetWearing()}, function(success)
                    if success then 
                        Jobs:ChangeWearing()
                    else 
                        Notification:Error('Ismeretlen hiba lépett fel!', 7500)
                    end
                end)
                if CharData.JobDuty then 
                    GenerateVehicleMarker()
                else 
                    Callbacks:ServerCallback('Jobs:ModifyWalletMoney', Payment, function(success)
                        if success then 
                            Notification:Success('Megkaptad a fizetésedet ami ' .. Payment .. '$ volt.', 7500)
                            Payment = 0
                        end
                    end)
                end
            end)
        end)
    end
end

function GenerateVehicleMarker()
    if WorkVehicle == nil then 
        if Markers.Markers:Exist('mowerwork', 'vehicle_marker') then 
            Markers.Markers:Update('mowerwork', 'vehicle_marker', Config.MowerJob.VehiclePos, 20, vector3(1.0, 1.0, 1.0), ({ r = 200, b = 255, g = 0 }), function()
                return true
            end, 'Nyomj {key}E{/key} gombot új munkajármű igényléséhez.', 1.35, function()
                if WorkVehicle == nil then 
                    SpawnMowerVehicle()
                end
            end)
        else 
            Markers.Markers:Add('mowerwork', 'vehicle_marker', Config.MowerJob.VehiclePos, 20, vector3(1.0, 1.0, 1.0), ({ r = 200, b = 255, g = 0 }), function()
                return true
            end, 'Nyomj {key}E{/key} gombot új munkajármű igényléséhez.', 1.35, function()
                if WorkVehicle == nil then 
                    SpawnMowerVehicle()
                end
            end)
        end
    else 
        if Markers.Markers:Exist('mowerwork', 'vehicle_marker') then 
            Markers.Markers:Update('mowerwork', 'vehicle_marker', Config.MowerJob.VehiclePos, 20, vector3(1.0, 1.0, 1.0), ({ r = 200, b = 255, g = 0 }), function()
                return true
            end, 'Nyomj {key}E{/key} gombot a munkajármű leadásához.', 1.35, function()
                if WorkVehicle ~= nil then 
                    DeleteMowerVehicle()
                end
            end)
        else 
            Markers.Markers:Add('mowerwork', 'vehicle_marker', Config.MowerJob.VehiclePos, 20, vector3(1.0, 1.0, 1.0), ({ r = 200, b = 255, g = 0 }), function()
                return true
            end, 'Nyomj {key}E{/key} gombot a munkajármű leadásához.', 1.35, function()
                if WorkVehicle ~= nil then 
                    DeleteMowerVehicle()
                end
            end)
        end
    end
end

function SpawnMowerVehicle()
    Game.Vehicles:Spawn(Config.MowerJob.VehiclePos, GetHashKey('Mower'), Config.MowerJob.VehicleHeading, function(veh)
        Notification:Success('Munkajármű igényelve!', 7500)
        local vehNet = VehToNet(veh)
        SetNetworkIdExistsOnAllMachines(vehNet, true)
        SetNetworkIdCanMigrate(vehNet, true)
        SetVehicleFuelLevel(veh, 100 + 0.0)
        DecorSetFloat(veh, 'VEH_FUEL', 100 + 0.0)
        SetPedIntoVehicle(PlayerPedId(), veh, -1)
        WorkVehicle = veh
        before = GetEntityCoords(PlayerPedId())
        GenerateNextCheckPoint()
        GenerateVehicleMarker()
    end)
end

function DeleteMowerVehicle()
    if IsPedInVehicle(PlayerPedId(), WorkVehicle, false) then 
        Game.Vehicles:Delete(WorkVehicle)
        WorkVehicle = nil
        Notification:Success('Munkajármű leadva!', 7500)
        GenerateVehicleMarker()
        if Blips:Exist('mower_workcp') then 
            Blips:Remove('mower_workcp')
        end
        if Markers.Markers:Exist('mowerwork', 'job_marker') then
            Markers.Markers:Remove('mowerwork', 'job_marker')
        end
    else 
        Notification:Error('Nem ülsz a járműveden!', 7500)
    end
end

function GenerateNextCheckPoint()
    if current ~= nil and before ~= nil then 
        local dist = GetDistanceBetweenCoords(current, before, false)
        Payment = Payment + math.floor(dist * Config.MowerJob.DistancePayment)
        Notification:Info(math.floor(dist * Config.MowerJob.DistancePayment) .. '$ hozzáírva a fizetésedhez.', 7500)
        before = current
    end
    current = Config.MowerJob.MowingPoses[math.random(1, #Config.MowerJob.MowingPoses)]
    while current == before do 
        Citizen.Wait(30)
        current = Config.MowerJob.MowingPoses[math.random(1, #Config.MowerJob.MowingPoses)]
    end

    if Blips:Exist('mower_workcp') then 
        Blips:Remove('mower_workcp')
    end
    Blips:Add('mower_workcp', 'Fünyiró munkapont', current, Config.MowerJob.Blip, 1, Config.BlipSize)
    if Markers.Markers:Exist('mowerwork', 'job_marker') then 
        Markers.Markers:Update('mowerwork', 'job_marker', current, 1, vector3(1.5, 1.5, 1.5), ({ r = 200, b = 255, g = 0 }), function()
            return true
        end, '', 1.75, function()
            if not block then 
                block = true
                GenerateNextCheckPoint()
            end
        end, false, false)
    else 
        Markers.Markers:Add('mowerwork', 'job_marker', current, 1, vector3(1.5, 1.5, 1.5), ({ r = 200, b = 255, g = 0 }), function()
            return true
        end, '', 1.75, function()
            if not block then 
                block = true
                GenerateNextCheckPoint()
            end
        end, false, false)
    end
    Citizen.Wait(250)
    block = false
end

function IsMowerWorker()
    while CharData == nil do 
        Citizen.Wait(100)
    end
    return CharData.Job.job == 'mower'
end

function DetectWorkingMarkers()
    Citizen.CreateThread(function()
        while WorkVehicle ~= nil do 
            Citizen.Wait(100)
            if current ~= nil and GetDistanceBetweenCoords(GetEntityCoords(PlayerPedId()), current, true) < 2.0 then 
                GenerateNextCheckPoint()
            end
        end
    end)
end

function RemoveFenceAtDutyPosition()
    local fenceModel = 'prop_fnclink_02gate3'
    local fence = nil
    Citizen.CreateThread(function()
        while Spawned do 
            fence = GetClosestObjectOfType(Config.MowerJob.VehiclePos, 10.0, GetHashKey(fenceModel), 0, 1, 1)
            if fence ~= 0 and fence ~= nil then 
                SetEntityAsMissionEntity(fence, 1, 1)
                DeleteObject(fence)
                SetEntityAsNoLongerNeeded(fence)
            end
            Citizen.Wait(1500)
        end
    end)
end