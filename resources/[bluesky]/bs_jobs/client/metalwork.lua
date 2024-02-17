local before = nil
local plate = nil

function CheckJob()
    if CharData.Job.job == 'metalworker' then 
        Jobs.MetalWork:CreateWorkMarkers()
    else 
        Jobs.MetalWork:RemoveWorkMarkers()
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
    Jobs.MetalWork:RemoveWorkMarkers()
    Jobs.MetalWork:RemoveGeneratedWork()
    if plate ~= nil then 
        DeleteEntity(plate)
        plate = nil
    end
end)

JOBS.MetalWork = {
    CreateWorkMarkers = function(self)
        Markers.MarkerGroups:Add('metalwork', Config.MetalWork.DropPoint, 150.0)
        Markers.Markers:Add('metalwork', 'dutymarker', Config.MetalWork.DutyPos, 20, vector3(1.0, 1.0, 1.0), ({ r = 200, b = 255, g = 0 }), function()
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
                print(tostring(plate))
                if CharData.JobDuty then 
                    Jobs.MetalWork:GenerateWork()
                else 
                    Jobs.MetalWork:RemoveGeneratedWork()
                    if plate ~= nil then 
                        DeleteEntity(plate)
                        plate = nil
                    end
                end
            end)
            --[[local dutyBefore = CharData.JobDuty
            TriggerServerEvent('Jobs:Server:ToggleDuty')
            while CharData.JobDuty == dutyBefore do 
                Citizen.Wait(4)
            end
            if CharData.JobDuty then 
                Jobs.MetalWork:GenerateWork()
            else 
                Jobs.MetalWork:RemoveGeneratedWork()
                if plate ~= nil then 
                    DeleteEntity(plate)
                    plate = nil
                end
            end
            Callbacks:ServerCallback('Jobs:ChangeClothes', {job = CharData.Job.job, id = CharData.Job.grade.id, wearing = Jobs:GetWearing()}, function(success)
                if success then 
                    Jobs:ChangeWearing()
                else 
                    Notification:Error('Ismeretlen hiba lépett fel!', 7500)
                end
            end)--]]
        end)
        Blips:Add('metalwork_dutymarker', 'Fémfeldolgozó | öltözö', Config.MetalWork.DutyPos, Config.MetalWork.BlipData[1], Config.MetalWork.BlipData[2], Config.MetalWork.BlipData[3])
        Markers.Markers:Add('metalwork', 'dropmarker', Config.MetalWork.DropPoint, 20, vector3(1.0, 1.0, 1.0), ({ r = 200, b = 255, g = 0 }), function()
            return true
        end, 'Nyomj {key}E{/key} gombot a fémhulladék lerakásához', 1.35, function()
            Jobs.MetalWork:DropMetalPlate()
        end)
        Blips:Add('metalwork_dropmarker', 'Fémfeldolgozó | fémleadó', Config.MetalWork.DropPoint, Config.MetalWork.BlipData[1], Config.MetalWork.BlipData[2], Config.MetalWork.BlipData[3])
    end,
    RemoveWorkMarkers = function(self)
        Markers.MarkerGroups:Remove('metalwork')
        Blips:Remove('metalwork_dutymarker')
        Blips:Remove('metalwork_dropmarker')
    end,
    GenerateWork = function(self)
        local randomNumber = math.random(1, #Config.MetalWork.MetalPoints)
        while randomNumber == before do 
            randomNumber = math.random(1, #Config.MetalWork.MetalPoints)
        end
        before = randomNumber
        Markers.Markers:Add('metalwork', 'pickupmarker', Config.MetalWork.MetalPoints[randomNumber], 20, vector3(1.0, 1.0, 1.0), ({ r = 200, b = 255, g = 0 }), function()
            return true
        end, 'Nyomj {key}E{/key} gombot a fémhulladék felszedéséhez', 1.35, function()
            Jobs.MetalWork:PickupMetalPlate()
        end)
        Blips:Add('metalwork_pickupmarker', 'Fémfeldolgozó | fémhulladék', Config.MetalWork.MetalPoints[randomNumber], Config.MetalWork.BlipData[1], 1, Config.MetalWork.BlipData[3])
    end,
    RemoveGeneratedWork = function(self)
        if before ~= nil then 
            before = nil 
            Markers.Markers:Remove('metalwork', 'pickupmarker')
            Blips:Remove('metalwork_pickupmarker')
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
    DropMetalPlate = function(self)
        if plate ~= nil then 
            Progress:ProgressWithStartEvent({
                name = 'platedrop',
                duration = math.random(7500, 11200),
                label = 'Fémhulladék lerakása folyamatban...',
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
                Action:Hide()
                ClearPedTasks(PlayerPedId())
            end, function(status)
                local player = PlayerPedId()
                if not status then 
                    DeleteEntity(plate)
                    plate = nil
                    ClearPedTasks(player)
                    Jobs.MetalWork:GenerateWork()
                else 
                    ClearPedTasks(player)
                end
            end)
        else
            Notification:Error('Nincs nálad fémhulladék!', 7500)
        end
    end
}

AddEventHandler('Proxy:Shared:RegisterReady', function()
    exports['bs_base']:RegisterComponent('Jobs', JOBS)
end)