Twitter = {
    Tweets = {},
    Reports = {},
}


function RegisterCallbacks()
    

    Callbacks:RegisterServerCallback("fw-phone:Server:Twitter:GetTweets", function(Source, Data, Cb)
        Cb(Twitter.Tweets)
    end)

    Callbacks:RegisterServerCallback("fw-phone:Server:Twitter:PostTweet", function(Source, Data, Cb)
        local Player = exports['bs_base']:FetchComponent('Fetch'):Source(Source)
        local Char = Player:GetData('Character')
        
        if Data.Msg == nil then return Cb(false) end

        local TweetId = #Twitter.Tweets + 1
        Twitter.Tweets[TweetId] = {
            Cid = Char:GetData('ID'),
            Id = TweetId,
            Msg = Data.Msg,
            Sender = string.gsub(("%s %s"):format(Char:GetData('First'), Char:GetData('Last')), "%s", "_"),
            Timestamp = os.time() * 1000,
        }

        TriggerClientEvent("fw-phone:Client:Twitter:PostTweet", -1, TweetId, Twitter.Tweets[TweetId])

        Cb(true)
    end)

    Callbacks:RegisterServerCallback("fw-phone:Server:Twitter:ReportTweet", function(Source, Data, Cb)
        local Player = exports['bs_base']:FetchComponent('Fetch'):Source(Source)
        local Char = Player:GetData('Character')

        if Twitter.Reports[Data.Id] ~= nil and Twitter.Reports[Data.Id].Reporters[Char:GetData('ID')] then Cb(false) return end

        if Twitter.Reports[Data.Id] == nil then Twitter.Reports[Data.Id] = { Count = 0, Reporters = {} } end
        Twitter.Reports[Data.Id].Count = Twitter.Reports[Data.Id].Count + 1
        Twitter.Reports[Data.Id].Reporters[Char:GetData('ID')] = true


        if Twitter.Reports[Data.Id].Count >= 20 then
            table.remove(Twitter.Tweets, Data.Id)
            TriggerClientEvent('fw-phone:Client:Twitter:RemoveTweet', -1, Data.Id)
        end

        Cb(true)
    end)
end

function RegisterChatCommands()
    Chat:RegisterAdminCommand("cleartwt", function(Source, args, raw)
        local Player = exports['bs_base']:FetchComponent('Fetch'):Source(Source)
    
        Twitter.Tweets = {}
        TriggerClientEvent("fw-phone:Client:Twitter:ResetTweets", -1)
    end, {
        help = '[Admin] Reset Tweets',
    }, 1) 
end



RegisterNetEvent("Admin:Server:PostTwat")
AddEventHandler("Admin:Server:PostTwat", function(Data)
    local Source = source
    local Player = exports['bs_base']:FetchComponent('Fetch'):Source(Source)
    local Char = Player:GetData('Character')
    

    if not Char:GetData('ID') == dev then
        return print(source .. " tried to post a tweet through admin menu but lacks permission.")
    end

    local TweetId = #Twitter.Tweets + 1
    Twitter.Tweets[TweetId] = {
        Cid = Char:GetData('ID'),
        Id = TweetId,
        Msg = Data.Message,
        Sender = string.gsub(Data.Poster, "%s", "_"),
        Timestamp = os.time() * 1000,
    }

    TriggerClientEvent("fw-phone:Client:Twitter:PostTweet", -1, TweetId, Twitter.Tweets[TweetId])
end)