RegisterNUICallback("Crypto/GetCrypto", function(Data, Cb)
    
    Cb(Config.Crypto)
end)

RegisterNUICallback("Crypto/BuyCrypto", function(Data, Cb)
    Callbacks:ServerCallback("fw-phone:Server:Crypto:BuyCrypto", Data, function(Result)
        if Result.Success then
            UpdatePlayerData()
        end
        Cb(Result)
    end)
end)

RegisterNUICallback("Crypto/TransferCrypto", function(Data, Cb)
    Callbacks:ServerCallback("fw-phone:Server:Crypto:TransferCrypto", Data, function(Result)
        if Result.Success then
            UpdatePlayerData()
        end
        Cb(Result)
    end)
end)
