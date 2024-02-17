local paperCount = 0
local bike = nil
local before = nil

function CheckJob()
    if CharData.Job.job == 'postal' then 
        Jobs.PostalJob:CreateWorkMarkers()
    else 
        Jobs.PostalJob:RemoveWorkMarkers()
    end
end

RegisterNetEvent('Jobs:Client:JobCreate')
AddEventHandler('Jobs:Client:JobCreate', function()
    CheckJob()
end)

RegisterNetEvent('Jobs:Client:UpdateCharData')
AddEventHandler('Jobs:Client:UpdateCharData', function()
    CheckJob()
end)

RegisterNetEvent('Characters:Client:Logout')
AddEventHandler('Characters:Client:Logout', function()
    Jobs.PostalJob:RemoveWorkMarkers()
    Jobs.PostalJob:RemoveGeneratedWork()
end)

JOBS.PostalJob = {
    CreateWorkMarkers = function(self)
        for k, v in pairs(Config.PostalJob.Locations) do 
            Markers.MarkerGroups:Add('postaljob_' .. k, v.DutyPos, 50.0)
            Markers.Markers:Add('postaljob_' .. k, 'dutymarker', v.DutyPos, 20, vector3(1.0, 1.0, 1.0), ({ r = 200, b = 255, g = 0 }), function()
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
                        Jobs.PostalJob:GeneratePoint(v.PaperPoses)
                    else 
                        Jobs.PostalJob:RemoveGeneratedPoint()
                    end
                end)
            end)
            Blips:Add('postaljob_dutyblip', 'Posta | öltözö', v.DutyPos, Config.PostalJob.BlipData[1], Config.PostalJob.BlipData[2], Config.PostalJob.BlipData[3])
            Markers.Markers:Add('postaljob_' .. k, 'bikemarker', v.BikeRentPos, 20, vector3(1.0, 1.0, 1.0), ({ r = 200, b = 255, g = 0 }), function()
                return true
            end, 'Nyomj {key}E{/key} gombot a kerékpár igényléséhez', 1.35, function()
                Jobs.PostalJob:ManageBike()
            end)
            Blips:Add('postaljob_bikeblip', 'Posta | kerékpár bérlés', v.BikeRentPos, Config.PostalJob.BlipData[1], Config.PostalJob.BlipData[2], Config.PostalJob.BlipData[3])
        end
    end,
    RemoveWorkMarkers = function(self)
        for k, v in pairs(Config.PostalJob.Locations) do 
            Markers.MarkerGroups:Remove('postaljob_' .. k)
        end
        Markers.MarkerGroups:Remove('postaljob_drop')
        Blips:Remove('postaljob_dutyblip')
        Blips:Remove('postaljob_bikeblip')
        Jobs.PostalJob:RemoveGeneratedPoint()
    end,
    GeneratePoint = function(self, points)
        if paperCount <= 0 then 
            paperCount = math.random(Config.PostalJob.MinPaperCount, Config.PostalJob.MaxPaperCount)
        end

        if paperCount > 0 then 
            local randomNumber = math.random(1, #points)
            while randomNumber == before do 
                randomNumber = math.random(1, #points)
            end
            before = randomNumber
            Markers.MarkerGroups:Add('postaljob_drop', points[randomNumber], 20.0)
            Markers.Markers:Add('postaljob_drop', 'dropmarker', points[randomNumber], 20, vector3(1.0, 1.0, 1.0), ({ r = 200, b = 255, g = 0 }), function()
                return true
            end, 'Nyomj {key}E{/key} gombot a levél lerakásához', 1.35, function()
                Jobs.MetalWork:PickupMetalPlate()
            end)
            Blips:Add('postaljob_dropblip', 'Posta | szállítási pont', points[randomNumber], Config.PostalJob.BlipData[1], 1, Config.PostalJob.BlipData[3])
        end
        --[[local randomNumber = math.random(1, #Config.MetalWork.MetalPoints)
        while randomNumber == before do 
            randomNumber = math.random(1, #Config.MetalWork.MetalPoints)
        end
        before = randomNumber
        Markers.Markers:Add('metalwork', 'pickupmarker', Config.MetalWork.MetalPoints[randomNumber], 20, vector3(1.0, 1.0, 1.0), ({ r = 200, b = 255, g = 0 }), function()
            return true
        end, 'Nyomj {key}E{/key} gombot a fémhulladék felszedéséhez', 1.35, function()
            Jobs.MetalWork:PickupMetalPlate()
        end)
        Blips:Add('metalwork_pickupmarker', 'Fémfeldolgozó | fémhulladék', Config.MetalWork.MetalPoints[randomNumber], Config.MetalWork.BlipData[1], 1, Config.MetalWork.BlipData[3])--]]
    end,
    RemoveGeneratedPoint = function(self)
        if before ~= nil then 
            before = nil 
            Markers.MarkerGroups:Remove('postaljob_drop')
            --Markers.Markers:Remove('metalwork', 'pickupmarker')
            Blips:Remove('postaljob_dropblip')
        end
    end,
    PickupMetalPlate = function(self)
        if plate == nil then 
            Progress:ProgressWithStartEvent({
                name = 'platepickup',
                duration = math.random(10000, 17000),
                label = 'Fémhulladék felszedése folyamatban...',
                canCancel = true,
                controlDisables = {
                    disableMovement = true,
                    disableCarMovement = true,
                    disableMouse = false,
                    disableCombat = true,
                },
                animation = {
                    task = "PROP_HUMAN_BUM_BIN",
                }
            }, function()
                Jobs.MetalWork:RemoveGeneratedWork()
                Action:Hide()
            end, function(status)
                --TriggerServerEvent('Bank:SyncDoor', bank, type, door, true)
                local player = PlayerPedId()
                if not status then 
                    local model = 'prop_rub_carpart_05'
                    --[[while not HasModelLoaded(GetHashKey(model)) do
                        RequestModel(GetHashKey(model))
                        Citizen.Wait(10)
                    end
                    plate = CreateObject(GetHashKey(model), GetEntityCoords(player), true, false, false)--]]
                    Game.Objects:Spawn(GetEntityCoords(player), model, 0.0, function(object)
                        if object ~= nil then 
                            plate = object
                            AttachEntityToEntity(plate, player, GetPedBoneIndex(player, 57005), 0.0, 0.0, 0.0, 0, 0.0, 0.0, true, true, false, true, 1, true)
                            ClearPedTasks(player)
                            RequestAnimDict("anim@heists@box_carry@")
                            while not HasAnimDictLoaded("anim@heists@box_carry@") do
                                Citizen.Wait(10)
                            end
                            TaskPlayAnim(player, 'anim@heists@box_carry@', 'idle', 1.0, -1.0,-1,49,0,0, 0,0)
                        end
                    end)
                else 
                    ClearPedTasks(player)
                    Jobs.MetalWork:GenerateWork()
                end
            end)
        end
    end,
    ManageBike = function(self)
        if bike == nil then 
            bike = 'asd'
            for k, v in pairs(Config.PostalJob.Locations) do 
                Markers.Markers:Update('postaljob_' .. k, 'bikemarker', v.BikeRentPos, 20, vector3(1.0, 1.0, 1.0), ({ r = 200, b = 255, g = 0 }), function()
                    return true
                end, 'Nyomj {key}E{/key} gombot a kerékpár leadásához', 1.35, function()
                    Jobs.PostalJob:ManageBike()
                end)
            end
        else 
            bike = nil
            for k, v in pairs(Config.PostalJob.Locations) do 
                Markers.Markers:Update('postaljob_' .. k, 'bikemarker', v.BikeRentPos, 20, vector3(1.0, 1.0, 1.0), ({ r = 200, b = 255, g = 0 }), function()
                    return true
                end, 'Nyomj {key}E{/key} gombot a kerékpár igényléséhez', 1.35, function()
                    Jobs.PostalJob:ManageBike()
                end)
            end
        end
    end
}

AddEventHandler('Proxy:Shared:RegisterReady', function()
    exports['bs_base']:RegisterComponent('Jobs', JOBS)
end)