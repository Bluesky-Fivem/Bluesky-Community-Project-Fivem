local paperCount = 0
local before = nil
local dropping = false
local currentPoints = nil

function GeneratePostalWork()
    for k, v in pairs(Config.PostalJob.Locations) do 
        if not Blips:Exist('postaljob_dutyblip_' .. k) then 
            Blips:Add('postaljob_dutyblip_' .. k, 'Posta öltözö', v.DutyPos, Config.PostalJob.BlipData[1], Config.PostalJob.BlipData[2], Config.PostalJob.BlipData[3])
        end
        if not Markers.MarkerGroups:Exist('postaljob_' .. k) then 
            Markers.MarkerGroups:Add('postaljob_' .. k, v.DutyPos, 50.0)
        end
        if not Markers.Markers:Exist('postaljob_' .. k, 'duty_marker') then 
            Markers.Markers:Add('postaljob_' .. k, 'duty_marker', v.DutyPos, 20, vector3(1.0, 1.0, 1.0), ({ r = 200, b = 255, g = 0 }), function()
                return true
            end, 'Nyomj {key}E{/key} gombot az átöltözéshez', 1.35, function()
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
                        Jobs.PostalJob:ManageBike()
                        if not Blips:Exist('postaljob_bikeblip_' .. k) then 
                            Blips:Add('postaljob_bikeblip_' .. k, 'Posta kerékpár bérlés', v.BikeRentPos, Config.PostalJob.BlipData[1], Config.PostalJob.BlipData[2], Config.PostalJob.BlipData[3])
                        end
                        if not Markers.Markers:Exist('postaljob_' .. k, 'paper_marker') then 
                            Markers.Markers:Add('postaljob_' .. k, 'paper_marker', v.PaperPickupPos, 20, vector3(1.0, 1.0, 1.0), ({ r = 200, b = 255, g = 0 }), function()
                                return true
                            end, 'Nyomj {key}E{/key} gombot a küldemények felvételéhez', 1.35, function()
                                Jobs.PostalJob:GeneratePoint(v.PaperPoses)
                            end)
                        end
                    else 
                        DeleteWorkMarkers(false)
                        if before ~= nil then 
                            before = nil
                        end
                    end
                end)
            end)
        end
    end
end

function DeleteWorkMarkers(all)
    if not all then 
        for k, v in pairs(Config.PostalJob.Locations) do 
            if Markers.Markers:Exist('postaljob_' .. k, 'paper_marker') then 
                Markers.Markers:Remove('postaljob_' .. k, 'paper_marker')
            end
            if Markers.Markers:Exist('postaljob_' .. k, 'bike_marker') then 
                Markers.Markers:Remove('postaljob_' .. k, 'bike_marker')
            end
            if Blips:Exist('postaljob_dropblip_' .. k) then 
                Blips:Remove('postaljob_dropblip_' .. k)
            end
            if Blips:Exist('postaljob_bikeblip_' .. k) then 
                Blips:Remove('postaljob_bikeblip_' .. k)
            end
        end
        if Markers.MarkerGroups:Exist('postaljob_drop') then 
            Markers.MarkerGroups:Remove('postaljob_drop')
        end
    else 
        for k, v in pairs(Config.PostalJob.Locations) do 
            if Markers.MarkerGroups:Exist('postaljob_' .. k) then 
                Markers.MarkerGroups:Remove('postaljob_' .. k)
            end
            if Blips:Exist('postaljob_dutyblip_' .. k) then 
                Blips:Remove('postaljob_dutyblip_' .. k)
            end
            if Blips:Exist('postaljob_bikeblip_' .. k) then 
                Blips:Remove('postaljob_bikeblip_' .. k)
            end
            if Blips:Exist('postaljob_dropblip_' .. k) then 
                Blips:Remove('postaljob_dropblip_' .. k)
            end
        end
        if Markers.MarkerGroups:Exist('postaljob_drop') then 
            Markers.MarkerGroups:Remove('postaljob_drop')
        end
    end
end

function BikeManagement()
    if WorkVehicle == nil then 
        for k, v in pairs(Config.PostalJob.Locations) do 
            if Markers.Markers:Exist('postaljob_' .. k, 'bike_marker') then 
                Markers.Markers:Update('postaljob_' .. k, 'bike_marker', v.BikeRentPos, 20, vector3(1.0, 1.0, 1.0), ({ r = 200, b = 255, g = 0 }), function()
                    return true
                end, 'Nyomj {key}E{/key} gombot a kerékpár igényléséhez', 1.35, function()
                    SpawnPostalBike(v.BikeRentPos, v.BikeRentHeading)
                end)
            else 
                Markers.Markers:Add('postaljob_' .. k, 'bike_marker', v.BikeRentPos, 20, vector3(1.0, 1.0, 1.0), ({ r = 200, b = 255, g = 0 }), function()
                    return true
                end, 'Nyomj {key}E{/key} gombot a kerékpár igényléséhez', 1.35, function()
                    SpawnPostalBike(v.BikeRentPos, v.BikeRentHeading)
                end)
            end
        end
    else 
        for k, v in pairs(Config.PostalJob.Locations) do 
            if Markers.Markers:Exist('postaljob_' .. k, 'bike_marker') then 
                Markers.Markers:Update('postaljob_' .. k, 'bike_marker', v.BikeRentPos, 20, vector3(1.0, 1.0, 1.0), ({ r = 200, b = 255, g = 0 }), function()
                    return true
                end, 'Nyomj {key}E{/key} gombot a kerékpár leadásához', 1.35, function()
                    DeletePostalBike()
                end)
            else 
                Markers.Markers:Add('postaljob_' .. k, 'bike_marker', v.BikeRentPos, 20, vector3(1.0, 1.0, 1.0), ({ r = 200, b = 255, g = 0 }), function()
                    return true
                end, 'Nyomj {key}E{/key} gombot a kerékpár leadásához', 1.35, function()
                    DeletePostalBike()
                end)
            end
        end
    end
end

function GenerateWorkPoint(points, new)
    if paperCount <= 0 then 
        paperCount = math.random(Config.PostalJob.MinPaperCount, Config.PostalJob.MaxPaperCount)
        Notification:Success('Felvettél ' .. paperCount .. ' darab küldeményt, az első szállítási pozíció meg lett jelölve a térképen!', 7500)
    end

    if paperCount > 0 then 
        local randomNumber = math.random(1, #points)
        while randomNumber == before do 
            randomNumber = math.random(1, #points)
        end
        before = randomNumber
        if not Markers.MarkerGroups:Exist('postaljob_drop') then 
            Markers.MarkerGroups:Add('postaljob_drop', points[randomNumber], 20.0)
        else 
            Markers.MarkerGroups:Update('postaljob_drop', points[randomNumber], 20.0)
        end
        if not Markers.Markers:Exist('postaljob_drop', 'drop_marker') then 
            Markers.Markers:Add('postaljob_drop', 'drop_marker', points[randomNumber], 20, vector3(1.0, 1.0, 1.0), ({ r = 200, b = 255, g = 0 }), function()
                return true
            end, 'Nyomj {key}E{/key} gombot a küldemény lerakásához', 1.35, function()
                Jobs.PostalJob:DeliveryDrop()
            end)
        else 
            Markers.Markers:Update('postaljob_drop', 'drop_marker', points[randomNumber], 20, vector3(1.0, 1.0, 1.0), ({ r = 200, b = 255, g = 0 }), function()
                return true
            end, 'Nyomj {key}E{/key} gombot a küldemény lerakásához', 1.35, function()
                Jobs.PostalJob:DeliveryDrop()
            end)
        end
        if not Blips:Exist('postaljob_dropblip') then 
            Blips:Add('postaljob_dropblip', 'Posta szállítási pont', points[randomNumber], Config.PostalJob.BlipData[1], 1, Config.PostalJob.BlipData[3])
        else 
            Blips:Remove('postaljob_dropblip')
            Blips:Add('postaljob_dropblip', 'Posta szállítási pont', points[randomNumber], Config.PostalJob.BlipData[1], 1, Config.PostalJob.BlipData[3])
        end
    end

    if new then 
        currentPoints = points
    end
end

function PlaceDelivery()
    if paperCount > 0 and not dropping and WorkVehicle ~= nil and IsPedInVehicle(PlayerPedId(), WorkVehicle, false) then 
        dropping = true
        GenerateWorkPoint(currentPoints, false)
        local pay = math.random(Config.PostalJob.MinPayment, Config.PostalJob.MaxPayment)
        Payment = Payment + pay
        paperCount = paperCount - 1
        Notification:Success('Küldemény leszállítva, ' .. pay .. '$ hozzáírva a fizetésedhez! (összesen: ' .. Payment .. '$)' , 7500)
        if paperCount <= 0 then 
            Notification:Info('Kiszállítottad az összes küldeményt ami nálad volt, ha szeretnél még dolgozni, akkor az öltöző mellől vegyél fel még küldeményeket.' , 15000)
            Notification:Info('Ha befejezted a munkát, akkor átöltözés után megkapod a fizetésedet.' , 15000)
        else 
            Notification:Info('Még van nálad ' .. paperCount .. ' darab küldemény, haladj tovább a következő címre.' , 7500)
        end
        ClearPedTasks(PlayerPedId())
        Citizen.Wait(250)
        dropping = false
        --[[Progress:ProgressWithStartEvent({
            name = 'deliveryDrop',
            duration = Config.PostalJob.DeliveryTimer,
            label = 'Küldemény lerakása folyamatban...',
            canCancel = false,
            controlDisables = {
                disableMovement = true,
                disableCarMovement = true,
                disableMouse = false,
                disableCombat = true,
            },
        }, function()
            dropping = true
            GenerateWorkPoint(currentPoints, false)
        end, function(status)
            local pay = math.random(Config.PostalJob.MinPayment, Config.PostalJob.MaxPayment)
            Payment = Payment + pay
            paperCount = paperCount - 1
            Notification:Success('Küldemény leszállítva, ' .. pay .. '$ hozzáírva a fizetésedhez! (összesen: ' .. Payment .. '$)' , 7500)
            if paperCount <= 0 then 
                Notification:Info('Kiszállítottad az összes küldeményt ami nálad volt, ha szeretnél még dolgozni, akkor az öltöző mellől vegyél fel még küldeményeket.' , 15000)
                Notification:Info('Ha befejezted a munkát, akkor átöltözés után megkapod a fizetésedet.' , 15000)
            else 
                Notification:Info('Még van nálad ' .. paperCount .. ' darab küldemény, haladj tovább a következő címre.' , 7500)
            end
            SetVehicleMaxSpeed(WorkVehicle, -1.0)
            ClearPedTasks(PlayerPedId())
            dropping = false
        end)--]]
    end
end

function SpawnPostalBike(pos, heading)
    if WorkVehicle == nil then 
        Game.Vehicles:Spawn(pos, GetHashKey('scorcher'), heading, function(veh)
            Notification:Success('Kerékpár igényelve!', 7500)
            local vehNet = VehToNet(veh)
            SetNetworkIdExistsOnAllMachines(vehNet, true)
            SetNetworkIdCanMigrate(vehNet, true)
            SetPedIntoVehicle(PlayerPedId(), veh, -1)
            WorkVehicle = veh
            Jobs.PostalJob:ManageBike()
        end)
    end
end

function DeletePostalBike()
    if IsPedInVehicle(PlayerPedId(), WorkVehicle, false) then 
        Game.Vehicles:Delete(WorkVehicle)
        WorkVehicle = nil
        Notification:Success('Kerékpár leadva!', 7500)
    else 
        Notification:Error('Nem ülsz a kerékpárodon!', 7500)
    end
end