RPC.register("getYpData", function(pSource)
    local Player = exports['bs_base']:FetchComponent('Fetch'):Source(pSource)
    local Char = Player:GetData('Character')
    local cid = Char:GetData('ID')
    local data = Await(SQL.execute("SELECT * FROM phone_yp ORDER BY id DESC", {}))

    if not data then return {} end

    local count = Await(SQL.execute("SELECT COUNT(*) AS total FROM phone_yp WHERE cid = @cid", {
        ["cid"] = cid
    }))

    return data, count[1].total or 0
end)

RPC.register("postAd", function(pSource, pMessage)
    local Player = exports['bs_base']:FetchComponent('Fetch'):Source(pSource)
    local Char = Player:GetData('Character')
    local CitizenId = Char:GetData('ID')
    local name = Char:GetData('First').."_"..Char:GetData('Last')
    local data = Await(SQL.execute("INSERT INTO phone_yp (cid, phonenr, message, name) VALUES (@cid, @phonenr, @message, @name)", {
        ["cid"] = CitizenId,
        ["phonenr"] = Char:GetData('Phone'),
        ["message"] = pMessage.param,
        ["name"] = name
    }))

    if not data then return false end


    return true
end)

RPC.register("removeYp", function(pSource)
    local Player = exports['bs_base']:FetchComponent('Fetch'):Source(pSource)
    local Char = Player:GetData('Character')
    local cid = Char:GetData('ID')
    local data = Await(SQL.execute("DELETE FROM phone_yp WHERE cid = @cid", {
        ["cid"] = cid
    }))

    if not data then return false end

    return true
end)