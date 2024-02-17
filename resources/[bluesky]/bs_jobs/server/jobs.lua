_onDuty = {}
_jobs = Config.Job
jobCenterJobs = {}

AddEventHandler('Jobs:Shared:DependencyUpdate', RetrieveComponents)
function RetrieveComponents()
    Middleware = exports['bs_base']:FetchComponent('Middleware')
    Default = exports['bs_base']:FetchComponent('Default')
    Callbacks = exports['bs_base']:FetchComponent('Callbacks')
    Logger = exports['bs_base']:FetchComponent('Logger')
    Utils = exports['bs_base']:FetchComponent('Utils')
    Fetch = exports['bs_base']:FetchComponent('Fetch')
    Chat = exports['bs_base']:FetchComponent('Chat')
    Jobs = exports['bs_base']:FetchComponent('Jobs')
    Execute = exports['bs_base']:FetchComponent('Execute')
    CuntingConfig = exports['bs_base']:FetchComponent('Config')
    AlzarIsAPrickCauseHeDoesStupidThings = exports['bs_base']:FetchComponent('Config')
    Wallet = exports['bs_base']:FetchComponent('Wallet')
    RegisterChatCommands()
end

AddEventHandler('Core:Shared:Ready', function()
    exports['bs_base']:RequestDependencies('Jobs', {
        'Middleware',
        'Default',
        'Callbacks',
        'Logger',
        'Utils',
        'Fetch',
        'Execute',
        'Chat',
        'Jobs',
        'Config',
        'Wallet',
    }, function(error)
        if #error > 0 then return end -- Do something to handle if not all dependencies loaded
        RetrieveComponents()
        Startup()
        RegisterCallbacks()
        RegisterMiddleware()
    end)
end)

function RegisterMiddleware()
    Middleware:Add('Characters:Logout', function(source)
        for k, v in pairs(_onDuty) do
            _onDuty[k][source] = nil
        end
    end)
end

JOBS = {
    Player = {
        ToggleAutoDefineDuty = function(self, source)
            local char = Fetch:Source(source):GetData('Character')
            self:ToggleDuty(source, not char:GetData('JobDuty'))
        end,
        ToggleDuty = function(self, source, toggle, silent, cb)
            local player = Fetch:Source(source)
            local char = player:GetData('Character')
            local jobData = char:GetData('Job')

            if jobData.job ~= 'unemployed' then
                _onDuty[jobData.job][source] = toggle or nil
                char:SetData('JobDuty', toggle)
                Chat.Refresh:Commands(source)
                TriggerClientEvent('Characters:Client:SetData', source, char:GetData())
                if silent == nil or not silent then
                    TriggerClientEvent('Notification:SendAlert', source, ('You went %s.'):format(toggle and 'on duty' or 'off duty'))
                    TriggerClientEvent('Jobs:Client:UpdateCharData', source)
                end
            end
            if cb then
                cb(_onDuty[jobData.job][source])
            end 
        end,
        SetJob = function(self, source, job, grade, workplace, cb)
            if _jobs[job] == nil then 
                cb(false)
                return 
            end

            local targetJob, targetGrade, targetWorkplace = _jobs[job], _jobs[job].grades[grade], _jobs[job].workplaces
            if (targetJob and targetGrade) and (targetWorkplace == nil or targetWorkplace[workplace]) then
                if targetWorkplace ~= nil and targetWorkplace[workplace] then
                    targetWorkplace = targetWorkplace[workplace] 
                else
                    workplace, targetWorkplace = 0, 'None'
                end
                local char = Fetch:Source(source):GetData('Character')
                local currentJob = char:GetData('Job')
                if currentJob.job == 'unemployed' or job ~= currentJob.job or grade ~= currentJob.grade.id or workplace ~= currentJob.workplace.id then
                    self:ToggleDuty(source, false, true)
                    local newJob = {
                        job = targetJob.job,
                        salary = targetGrade.salary,
                        label = targetJob.label,
                        grade = { id = grade, label = targetGrade.label, level = targetGrade.level },
                        workplace = { id = workplace, label = targetWorkplace },
                    }
                    char:SetData('Job', newJob)
                    char:SetData('JobTimer', Config.TimerAfterJobChange)
                    TriggerClientEvent('Characters:Client:SetData', source, char:GetData())
                    TriggerClientEvent('Jobs:Client:UpdateCharData', source)
                    Chat.Send.System:Single(source, 'Your Job Was Set To ' .. newJob.label .. '.' .. (newJob.workplace.workplace ~= 0 and (' Workplace: ' .. newJob.workplace.label) or ' ') .. ', Grade: '.. newJob.grade.label)
                    --TriggerClientEvent('Jobs:Client:Updated', source, newJob)
                    cb(newJob)
                elseif job == currentJob.job and grade == currentJob.grade.id and workplace == currentJob.workplace.id then
                    cb(false, true)
                end
            else
                cb(false)
            end
        end,
        RevokeJob = function(self, source)
            local char = Fetch:Source(source):GetData('Character')
            self:ToggleDuty(source, false, true)
            char:SetData('Job', AlzarIsAPrickCauseHeDoesStupidThings.DefaultJob)
            TriggerClientEvent('Characters:Client:SetData', source, char:GetData())
            Chat.Send.System:Single(source, 'Your Job Was Removed, You Are Now Unemployed.')
            TriggerClientEvent('Jobs:Client:UpdateCharData', source)
        end,
    },
    GetOnDutyCount = function(self, job)
        if _jobs[job] then
            local amount = 0
            for _ in pairs(_onDuty[job]) do
                amount = amount + 1
            end
            return amount
        end
        return 0
    end, 
    GetOnDuty = function(self, job)
        if _jobs[job] and _onDuty[job] then
            return _onDuty[jobData.job]
        end
        return nil
    end,
    GetFromJob = function(self, job)
        if _jobs[job] then
            return _jobs[job]
        end
        return nil
    end,
    GetAllJobs = function(self, cb)
        cb(_jobs)
    end
}

AddEventHandler('Proxy:Shared:RegisterReady', function()
    exports['bs_base']:RegisterComponent('Jobs', JOBS)
end)

AddEventHandler('playerDropped', function()
    local _src = source
    for k, v in pairs(_onDuty) do
        _onDuty[k][_src] = nil
    end
end)

RegisterServerEvent('Jobs:Server:SetJobTimer')
AddEventHandler('Jobs:Server:SetJobTimer', function(time)
    local char = Fetch:Source(source):GetData('Character')
    if char ~= nil then 
        char:SetData('JobTimer', time)
    end
end)

RegisterServerEvent('Jobs:Server:ToggleDuty')
AddEventHandler('Jobs:Server:ToggleDuty', function()
    Jobs.Player:ToggleAutoDefineDuty(source)
end)

RegisterServerEvent('Characters:Server:Spawn')
AddEventHandler('Characters:Server:Spawn', function()
    Jobs.Player:ToggleDuty(source, false, true) -- Always Off Duty On Character Spawn
end)

RegisterServerEvent('Jobs:Server:QuitJobFromJobCenter')
AddEventHandler('Jobs:Server:QuitJobFromJobCenter', function()
    local _src = source
    local char = Fetch:Source(_src):GetData('Character')
    local charJob = char:GetData('Job')
    if jobCenterJobs[charJob.job] then -- if is a non WL job
        Jobs.Player:RevokeJob(_src)
    end
end)
