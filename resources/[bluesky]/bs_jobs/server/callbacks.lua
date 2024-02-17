function RegisterCallbacks()
    Callbacks:RegisterServerCallback('Jobs:GetOnDutyCount', function(source, data, cb)
        cb(Jobs:GetOnDutyCount(data))
    end)
    
    Callbacks:RegisterServerCallback('Jobs:GetJobCenterJobs', function(source, data, cb)
        cb(jobCenterJobs)
    end)

    Callbacks:RegisterServerCallback('Jobs:ModifyWalletMoney', function(source, data, cb)
        local player = exports['bs_base']:FetchComponent('Fetch'):Source(source)
        local char = player:GetData('Character')
        Wallet:Get(char, function(wallet)
            wallet:Modify(tonumber(data))
            cb(true)
        end)
    end)
end