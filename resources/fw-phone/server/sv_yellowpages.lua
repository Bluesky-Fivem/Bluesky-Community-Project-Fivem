YellowPages = {
    Posts = {}
}

function RegisterCallbacks()
    
    Callbacks:RegisterServerCallback("fw-phone:Server:YellowPages:GetPosts", function(Source, Data, Cb)
        Cb(YellowPages.Posts)
    end)

    Callbacks:RegisterServerCallback("fw-phone:Server:YellowPages:PostAd", function(Source, Data, Cb)
        local Player = exports['bs_base']:FetchComponent('Fetch'):Source(Source)
        local Char = Player:GetData('Character')

        if Data.Msg == nil then return Cb(false) end

        local PostId = #YellowPages.Posts + 1
        YellowPages.Posts[PostId] = {
            Id = PostId,
            Cid = Char:GetData('ID'),
            Msg = Data.Msg,
            Sender = ("%s %s"):format(Char:GetData('First'), Char:GetData('Last')),
            Phone = Char:GetData('Phone'),
        }

        TriggerClientEvent("fw-phone:Client:YellowPages:PostAd", -1, PostId, YellowPages.Posts[PostId])

        Cb(true)
    end)

    Callbacks:RegisterServerCallback("fw-phone:Server:YellowPages:RemoveAd", function(Source, Data, Cb)
        local Player = exports['bs_base']:FetchComponent('Fetch'):Source(Source)
        local Char = Player:GetData('Character')

        local Index = 0

        for k, v in pairs(YellowPages.Posts) do
            if v.Cid == Char:GetData('ID') then
                Index = k
                break
            end
        end

        if YellowPages.Posts[Index] == nil then return Cb(false) end

        table.remove(YellowPages.Posts, Index)
        TriggerClientEvent("fw-phone:Client:YellowPages:RemoveAd", -1, Index)

        Cb(true)
    end)
end

function RegisterChatCommands()
    
    Chat:RegisterAdminCommand("clearyp", function(Source, args, raw)
        local Player = exports['bs_base']:FetchComponent('Fetch'):Source(Source)
        local Char = Player:GetData('Character')

        YellowPages.Posts = {}
        TriggerClientEvent("fw-phone:Client:YellowPages:ResetAds", -1)
    end, {
        help = '[Admin] Clear Yellow Pages'
    },0)
end

AddEventHandler("playerDropped", function(Reason)
    local Source = source
    local Player = exports['bs_base']:FetchComponent('Fetch'):Source(Source)
    local Char = Player:GetData('Character')

    local Cid = Char:GetData('ID')

    Citizen.SetTimeout((1000 * 60) * 15, function()
        local CurrentPlayer = FW.Functions.GetPlayerByCitizenId(Cid)
        if not CurrentPlayer then
            local Indexes = {}
            for k, v in pairs(YellowPages.Posts) do
                if v.Cid == Char:GetData('ID') then
                    table.insert(Indexes, k)
                end
            end

            for k, v in pairs(Indexes) do
                table.remove(YellowPages.Posts, v)
                TriggerClientEvent("fw-phone:Client:YellowPages:RemoveAd", -1, v)
            end
        end
    end)
end)