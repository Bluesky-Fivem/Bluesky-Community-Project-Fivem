local _ran = false

_jobs = Config.Job

function Startup()
    if _ran then return end

    
        Logger:Trace('Jobs', 'Loaded ^5' .. #_jobs .. '^7 Jobs', { console = true })
        
        for k, v in ipairs(_jobs) do
            v._id = nil
            _jobs[v.job] = v
            
            if not v.whitelisted and v.jobcenter ~= nil then
                jobCenterJobs[v.job] = v
            end
        end

        for k,v in pairs(_jobs) do
            _onDuty[k] = {}
        end

    
    _ran = true
end