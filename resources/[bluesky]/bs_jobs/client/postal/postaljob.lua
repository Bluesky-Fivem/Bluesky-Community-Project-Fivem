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
        GeneratePostalWork()
    end,
    RemoveWorkMarkers = function(self)
        DeleteWorkMarkers(true)
    end,
    GeneratePoint = function(self, points)
        GenerateWorkPoint(points, true)
    end,
    DeliveryDrop = function(self)
        PlaceDelivery()
    end,
    ManageBike = function(self)
        BikeManagement()
    end
}

AddEventHandler('Proxy:Shared:RegisterReady', function()
    exports['bs_base']:RegisterComponent('Jobs', JOBS)
end)