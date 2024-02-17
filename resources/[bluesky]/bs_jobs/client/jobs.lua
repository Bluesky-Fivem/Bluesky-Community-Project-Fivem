WorkClothesOn = false
WorkVehicle = nil
CharData = nil
Spawned = false
JobTimer = 0
Payment = 0

AddEventHandler('Jobs:Shared:DependencyUpdate', RetrieveComponents)
function RetrieveComponents()
    Callbacks = exports['bs_base']:FetchComponent('Callbacks')
    Logger = exports['bs_base']:FetchComponent('Logger')
    Jobs = exports['bs_base']:FetchComponent('Jobs')
    Markers = exports['bs_base']:FetchComponent('Markers')
    Blips = exports['bs_base']:FetchComponent('Blips')
    Menu = exports['bs_base']:FetchComponent('Menu')
    Action = exports['bs_base']:FetchComponent('Action')
    Progress = exports['bs_base']:FetchComponent('Progress')
    Notification = exports['bs_base']:FetchComponent('Notification')
    Utils = exports['bs_base']:FetchComponent('Utils')
    Game = exports['bs_base']:FetchComponent('Game')
end

AddEventHandler('Core:Shared:Ready', function()
    exports['bs_base']:RequestDependencies('Jobs', {
        'Callbacks',
        'Logger',
        'Utils',
        'Jobs',
        'Markers',
        'Blips',
        'Menu',
        'Action',
        'Progress',
        'Notification',
        'Game',
    }, function(error)  
        if #error > 0 then return; end
        RetrieveComponents()
    end) 
end)

JOBS = {
    ChangeWearing = function(self)
        WorkClothesOn = not WorkClothesOn
    end,
    GetWearing = function(self)
        return WorkClothesOn
    end,
    GetCharacterData = function(self)
        return CharData
    end
    
}

RegisterNetEvent('Jobs:Client:UpdateCharData')
AddEventHandler('Jobs:Client:UpdateCharData', function()
    CharData = exports['bs_base']:FetchComponent('Player').LocalPlayer:GetData('Character'):GetData()
end)

RegisterNetEvent('Jobs:Client:ResetJobTimer')
AddEventHandler('Jobs:Client:ResetJobTimer', function()
    JobTimer = 0
end)

AddEventHandler('Characters:Client:Spawn', function()
    CharData = exports['bs_base']:FetchComponent('Player').LocalPlayer:GetData('Character'):GetData()
    Spawned = true
    while CharData == nil do 
        Citizen.Wait(100)
    end
    JobTimer = CharData.JobTimer
    TriggerEvent('Jobs:Client:JobCreate')
    StartThread()
end)

RegisterNetEvent('Characters:Client:Logout')
AddEventHandler('Characters:Client:Logout', function()
    Spawned = false
    WorkClothesOn = false
end)

RegisterNetEvent('Jobs:Client:ViewJobInformation')
AddEventHandler('Jobs:Client:ViewJobInformation', function(jobData, jobDuty)
    if jobData.job == 'unemployed' then
        Notification:SendAlert('You\'re Unemployed')
    else
        Notification:SendAlert('Your Job Is: '.. jobData.label .. ' - Grade: ' .. jobData.grade.label .. (jobData.workplace.id == 0 and '' or (' - Workplace: '.. jobData.workplace.label)) .. ' - Salary: '.. jobData.salary .. '. You Are '..(onDuty and 'On' or 'Off')..' Duty.', 12000)
    end
end)


function StartThread()
    Citizen.CreateThread(function()
        while Spawned do 
            if JobTimer > 0 and Spawned then 
                JobTimer = JobTimer - Config.JobRefreshTime
                TriggerServerEvent('Jobs:Server:SetJobTimer', JobTimer)
            end
            Citizen.Wait(Config.JobRefreshTime)
        end
    end)
end