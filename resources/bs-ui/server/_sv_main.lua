
-- Code

-- RegisterNetEvent("bs-ui:Server:CreateBadge")
-- AddEventHandler("bs-ui:Server:CreateBadge", function(Data, Badge)
--     local Source = source
--     local Player = FW.Functions.GetPlayer(Source)
--     if Player == nil then return end

--     if not Data.Job then goto SkipJob end
--     if Player.PlayerData.job.name ~= Data.Job then return end
--     if not Player.PlayerData.metadata.ishighcommand then return end

--     ::SkipJob::

--     local ItemInfo = {
--         Name = Badge.Name,
--         Rank = Badge.Rank,
--         Callsign = #Badge.Callsign > 0 and Badge.Callsign or nil,
--         Image = Badge.Image,
--         Department = Badge.Department or Data.Department,
--     }

--     --Player.Functions.AddItem("identification-badge", 1, false, ItemInfo, true, Data.Badge)
-- end)

RegisterCommand("ui-r", function(source, args)
    TriggerClientEvent('bs-ui:Client:refresh', source)
    TriggerClientEvent('FW:Client:CloseNui', source)
end)



RegisterCommand("+jumpscarePlayer", function(source, args)
    if source ~= 0 then return end

    TriggerClientEvent("bs-ui:Client:DoJumpscare", tonumber(args[1]))
end)