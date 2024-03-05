RPC.register("purchaseCrypto", function(pSource, pCid, pCryptoId, pAmount, pDate)
    if pAmount.param == nil then
        return false, "Amount can't be empty"
    end

    if tonumber(pAmount.param) < 0 then
        return false, "Negative values not allowed"
    end

    local getCryptoValue = Await(SQL.execute("SELECT value, cryptotag FROM cryptos WHERE cryptoid = @cryptoid",{
        ["cryptoid"] = pCryptoId.param
    }))

    local getBankValue = Await(SQL.execute("SELECT Bank FROM characters WHERE _id = @id",{
        ["id"] = pCid.param
    }))

    local total = tonumber(pAmount.param) * tonumber(getCryptoValue[1].value)
    local bank = tonumber(getBankValue[1].Bank)

    if total > bank then
        return false, "Not enough money in bank" 
    end

        
    Wallet:Modify(pSource, -total)

    addCrypto(pCid.param, pAmount.param, pCryptoId.param)

    return true, "success"
end)

RPC.register("exchangeCrypto", function(pSource, pCid, pCryptoId, pReceiver, pAmount)
    --print("exchangeCrypto")
    if pReceiver.param == nil or pReceiver.param == "" then
        return false, "Number can't be empty"
    end
    --print("Number not empty")
    if pAmount.param == nil or pAmount.param == "" then
        return false, "Amount can't be empty"
    end
    --print("Amount not empty")
    local data = Await(SQL.execute("SELECT * FROM user_crypto WHERE cryptocid = @cid AND cryptoid = @cryptoid",{
        ["cid"] = pCid.param,
        ["cryptoid"] = pCryptoId.param
    }))
    --print("data select")
    if tonumber(pAmount.param) > tonumber(data[1].cryptoamount) then
        return false, "Not enough crypto"
    end
    --print("enough crypto")

    -- check if receiver has wallet?
    -- if they dont generate one

    if tonumber(pAmount.param) < 0 then
        return false, "Negative values not allowed"
    end

    --print("not a negative value")

    local receiver = Await(SQL.execute("SELECT * FROM characters WHERE Phone = @phone_number",{
        ["phone_number"] = pReceiver.param
    }))

    --print("send it")

    local receivercid = receiver[1].id

    takeCrypto(pCid.param, pAmount.param, pCryptoId.param)
    giveCrypto(receivercid, pAmount.param, pCryptoId.param)

    return true
end)

RPC.register("phone:removeCrypto", function(pSource, pCryptoId, pAmount)
    local Player = exports['bs_base']:FetchComponent('Fetch'):Source(pSource)
    local Char = Player:GetData('Character')

    local data = Await(SQL.execute("SELECT * FROM user_crypto WHERE cryptocid = @cid AND cryptoid = @cryptoid",{
        ["cid"] = Char:GetData('ID'),
        ["cryptoid"] = pCryptoId.param
    }))

    if tonumber(pAmount.param) > tonumber(data[1].cryptoamount) then
        return false, "Not enough crypto"
    end

    local update = Await(SQL.execute("UPDATE user_crypto SET cryptoamount = cryptoamount - @cryptoamount WHERE cryptocid = @cryptocid AND cryptoid = @cryptoid", {
        ["cryptoamount"] = tonumber(pAmount.param),
        ["cryptocid"] = Char:GetData('ID'),
        ["cryptoid"] = tonumber(pCryptoId.param)
    }))

    return true, "Success"
end)

RPC.register("phone:getCryptos", function(pSource)
    local data = Await(SQL.execute("SELECT * FROM cryptos", {}))
    return data
end)

RPC.register("phone:getCryptoBalance", function(pSource, pCid, pCryptoId)
    local data = Await(SQL.execute("SELECT * FROM user_crypto WHERE cryptocid = @cid AND cryptoid = @cryptoid",{
        ["cid"] = pCid.param,
        ["cryptoid"] = pCryptoId.param
    }))

    return data[1].cryptoamount
end)

RPC.register("phone:generateWallet", function(pSource, pCid, pCryptoId)
    local insert = Await(SQL.execute("INSERT INTO user_crypto (cryptoid, cryptoamount, cryptocid) VALUES (@cryptoid, @cryptoamount, @cryptocid)",{
        ["cryptoid"] = pCryptoId.param,
        ["cryptoamount"] = 0,
        ["cryptocid"] = pCid.param
    }))

    return true
end)

function addCrypto(cid, amount, cryptoid)
    local add = Await(SQL.execute("UPDATE user_crypto SET cryptoamount = cryptoamount + @cryptoamount WHERE cryptoid = @cryptoid AND cryptocid = @cryptocid", {
        ["cryptoamount"] = amount,
        ["cryptoid"] = cryptoid,
        ["cryptocid"] = cid
    }))
end

function takeCrypto(cid, amount, cryptoid)
    local take = Await(SQL.execute("UPDATE user_crypto SET cryptoamount = cryptoamount - @cryptoamount WHERE cryptoid = @cryptoid AND cryptocid = @cryptocid", {
        ["cryptoamount"] = amount,
        ["cryptoid"] = cryptoid,
        ["cryptocid"] = cid
    }))
end

function giveCrypto(cid, amount, cryptoid)
    local give = Await(SQL.execute("UPDATE user_crypto SET cryptoamount = cryptoamount + @cryptoamount WHERE cryptoid = @cryptoid AND cryptocid = @cryptocid", {
        ["cryptoamount"] = amount,
        ["cryptoid"] = cryptoid,
        ["cryptocid"] = cid
    }))
end