RegisterNetEvent('fw-phone:Server:Mails:AddMail', function(From, Subject, Msg, Target)
    local Source = Target and tonumber(Target) or source
    local Player = exports['bs_base']:FetchComponent('Fetch'):Source(Source)
    local Char = Player:GetData('Character')
    if Player == nil then return end

    TriggerClientEvent('fw-phone:Client:Mails:AddMail', Source, {
        From = From,
        Subject = Subject,
        Msg = Msg,
        Timestamp = os.time() * 1000
    })
end)

RegisterNetEvent("Admin:Server:SendMail")
AddEventHandler("Admin:Server:SendMail", function(Data)
    local Source = source
    local Player = exports['bs_base']:FetchComponent('Fetch'):Source(Source)
    local Char = Player:GetData('Character')
    if Player == nil then return end

    local Target = exports['bs_base']:FetchComponent('Fetch'):Source(tonumber(Data.player))
    if Target == nil then return end

    if not Player:GetData('Roles') == 'dev' then
        return print(source .. " tried to send a mail through admin menu but lacks permission.")
    end

    TriggerEvent('fw-phone:Server:Mails:AddMail', Data.From, Data.Subject, Data.Message, Target.PlayerData.source)
end)

RegisterCommand('mail', function()
    
    TriggerClientEvent('fw-phone:Client:Mails:AddMail', -1, {
        From = "Anonymous",
        Subject = 'Washed-up container found!',
        Msg = "There are signals of a possibly washed-up container found with ",
        Timestamp = os.time() * 1000
    })
    
end)