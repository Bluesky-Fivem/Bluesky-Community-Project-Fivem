JOBS.MowerJob = {
    GenerateWork = function(self)
        GenerateMowerWork()
    end
}

AddEventHandler('Proxy:Shared:RegisterReady', function()
    exports['bs_base']:RegisterComponent('Jobs', JOBS)
end)