function RegisterCallbacks()
    


    Callbacks:RegisterServerCallback("fw-phone:Server:Crypto:BuyCrypto", function(Source, Data, Cb)
        local Player = exports['bs_base']:FetchComponent('Fetch'):Source(Source)
        local Char = Player:GetData('Character')
        if Player == nil then
            Cb({Success = false, Msg = "Ongeldige Koper"})
            return
        end

        if tonumber(Data.Amount) <= 0 then
            Cb({Success = false, Msg = "Ongeldige Aantal"})
            return
        end

        local Crypto = nil
        for k, v in pairs(Config.Crypto) do
            if v.Id == Data.CryptoId then
                Crypto = v
                break
            end
        end

        if Crypto == nil then
            Cb({Success = false, Msg = "Ongeldige Crypto"})
            return
        end

        local Costs = Crypto.Costs * tonumber(Data.Amount)
        if exports['fw-financials']:RemoveMoneyFromAccount("1001", "3", Char:GetData('Source'), Costs, 'PURCHASE', 'Bought ' .. Data.Amount .. ' ' .. Crypto.Id) then
            Player.Functions.AddCrypto(Crypto.Id, tonumber(Data.Amount))
            Cb({Success = true})
        else
            Cb({Success = false, Msg = "Niet Genoeg Balans"})
        end
    end)

    Callbacks:RegisterServerCallback("fw-phone:Server:Crypto:TransferCrypto", function(Source, Data, Cb)
        local Player = exports['bs_base']:FetchComponent('Fetch'):Source(Source)
        local Char = Player:GetData('Character')
        if Player == nil then
            Cb({Success = false, Msg = "Ongeldige Speler"})
            return
        end

        local Player2 = exports['bs_base']:FetchComponent('Fetch'):Source(Source)
        local Char2 = Player:GetData('Character')
        local Target = Char2:GetData('Phone') --FW.Functions.GetPlayerByPhone(Data.Phone)
        if Target == nil then
            Cb({Success = false, Msg = "Ongeldige Speler"})
            return
        end

        if tonumber(Data.Amount) <= 0 then
            Cb({Success = false, Msg = "Ongeldige Aantal"})
            return
        end

        local Crypto = Config.Crypto[tonumber(Data.Id)]
        if Crypto == nil then
            Cb({Success = false, Msg = "Ongeldige Crypto"})
            return
        end

        if not Player.Functions.RemoveCrypto(Crypto.Id, tonumber(Data.Amount)) then
            Cb({Success = false, Msg = "Onvoldoende in Wallet"})
            return
        end

        Target.Functions.AddCrypto(Crypto.Id, tonumber(Data.Amount))
        TriggerClientEvent("fw-phone:Client:Notification", Char2:GetData('Source'), "crypto-transfer-"..Source, "fas fa-wallet", { "white", "#121315" }, "Crypto ontvangen", string.format("Er is %d %s overgemaakt naar je wallet.", Data.Amount, Crypto.Id), false, false, nil, nil, nil)

        Cb({Success = true})
    end)
end
