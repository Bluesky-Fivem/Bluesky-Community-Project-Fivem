
    

RPC.register("getTwitterData", function(pSource)
    local data = Await(SQL.execute("SELECT * FROM phone_tweets ORDER BY id DESC", {}))

    if not data then return {} end

    return data
end)

RPC.register("postTweet", function(pSource, pMessage)
    print(pMessage)
    local Player = exports['bs_base']:FetchComponent('Fetch'):Source(pSource)
    local Char = Player:GetData('Character')
    local CitizenId = Char:GetData('ID')
    local name = Char:GetData('First').."_"..Char:GetData('Last')
    local data = Await(SQL.execute("INSERT INTO phone_tweets (citizenid, sender, message, date) VALUES (@citizenid, @sender, @message, @date)", {
        ["citizenid"] = CitizenId,
        ["sender"] = name,
        ["message"] = pMessage.param,
        ["date"] = os.time()
    }))

    if not data then return false end

    
    TriggerClientEvent("twitterNotify", -1, name, pMessage.param, pSource)

    if not data then return false end

    --print("SQL")
    TriggerClientEvent("twitterNotify", -1, name, pMessage.param, pSource)

    return true
end)
