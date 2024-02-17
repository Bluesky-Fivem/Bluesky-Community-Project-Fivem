AddEventHandler('Characters:Client:Spawn', function()
    RemoveFenceAtDutyPosition()
    Jobs.MowerJob:GenerateWork()
end)