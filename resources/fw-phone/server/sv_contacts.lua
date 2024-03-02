local OngoingCalls, CallerSources = {}, {}

RegisterNetEvent("fw-phone:Server:GiveContactDetails")
AddEventHandler("fw-phone:Server:GiveContactDetails", function(Data)
    local Source = source
    local MyCoords = GetEntityCoords(GetPlayerPed(Source))
    local players = exports['bs_base']:FetchComponent('Fetch'):All()
    local Player = exports['bs_base']:FetchComponent('Fetch'):Source(Source)
    local Char = Player:GetData('Character')
    if Player == nil then return end
    
    for k, v in pairs(players()) do
        if v.ServerId ~= Source and #(MyCoords - v.Coords) <= 3.0 then
            TriggerClientEvent('fw-phone:Client:AddContactSuggestion', v.ServerId, {
                Name = Char:GetData('First') .. ' ' .. Char:GetData('Last'),
                Phone = Char:GetData('Phone')
            })
        end
    end
end)

RegisterNetEvent("fw-phone:Server:DialContact")
AddEventHandler("fw-phone:Server:DialContact", function(Data, UsingBurner)
    local Source = source
    local Player = exports['bs_base']:FetchComponent('Fetch'):Source(Source)
    local Char = Player:GetData('Character')
    if Player == nil then return end

    local MyPhone = UsingBurner and UsingBurner or Player:GetData('Phone')

    if Data.Phone and Data.Phone.Number then
        Data.Phone = Data.Phone.Number
    end

    if not IsNetworkEnabled then
        return Player.Functions.Notify("Geen internet toegang..", "error")
    end

    if Data.Phone == MyPhone then
        return Player.Functions.Notify("Het is wel heel eenzaam om met jezelf te bellen..", "error")
    end

    -- Check if already in call, if so then cancel and return notify.
    if CallerSources[Source] then
        return Player.Functions.Notify("Je zit al in een gesprek..", "error")
    end

    local CallId = RandomInt(6)
    CallerSources[Source] = CallId

    -- Get contact info by ID
    local Result = exports['ghmattimysql']:executeSync("SELECT * FROM `phone_contacts` WHERE `phone` = @Phone AND `citizenid` = @Cid", { ['@Phone'] = Data.Phone, ['@Cid'] = Player:GetData('ID') })
    local ContactName = Result[1] and Result[1].name or FormatPhone(Data.Phone)
    
    TriggerClientEvent("fw-phone:Client:Notification", Source, 'contacts-dial-' .. CallId, 'fas fa-phone-alt', { 'white', '#029587' }, ContactName, "Verbinden...", false, false, nil, "fw-phone:Server:Contacts:DeclineCall", { HideOnAction = false, CallId = CallId })
    
    TriggerClientEvent('fw-phone:Client:AddCall', Source, {Burner = UsingBurner ~= nil, Incoming = false, Contact = ContactName, Phone = Data.Phone, Timestamp = os.time() * 1000})

    Citizen.Wait(1000) -- waiting simulator belike 👀

    -- Check if player online with that phonenumber, if it isn't than return 'Disconnected.'
    local player2 = exports['bs_base']:FetchComponent('Fetch'):Source(Source)
    local Char2 = Player:GetData('Character')
    if Data.Phone == Char2:GetData('Phone') then 
        local Target = Char2:GetData('Phone')
        if Target == nil then
            TriggerClientEvent('fw-phone:Client:UpdateNotification', Source, 'contacts-dial-' .. CallId, true, true, nil, 'Verbinding verbroken!', true, false)
            CallerSources[Source] = nil
            return
        end
    end

    -- Check if Target has phone, if not return 'Disconnected.'
    -- if not Target.Functions.HasEnoughOfItem("phone", 1) then
    --     TriggerClientEvent('fw-phone:Client:UpdateNotification', Source, 'contacts-dial-' .. CallId, true, true, nil, 'Verbinding verbroken!', true, false)
    --     CallerSources[Source] = nil
    --     return
    -- end

    local TargetPhone = exports['ghmattimysql']:executeSync("SELECT * FROM `phone_contacts` WHERE `phone` = @Phone AND `citizenid` = @Cid", { ['@Phone'] = MyPhone, ['@Cid'] = Char2:GetData('ID') })
    local TargetContactName = TargetPhone[1] and TargetPhone[1].name or FormatPhone(MyPhone)

    OngoingCalls[CallId] = {
        Payphone = true,
        CallId = CallId,
        Dialing = true,
        Caller = Char:GetData('Source'),
        Target = Char2:GetData('Source'),
        CallerPhone = Char:GetData('Phone'),
        TargetPhone = Char2:GetData('Phone'),
        CallerName = TargetContactName, -- Name that the TARGET sees
        TargetName = ContactName, -- Name that the CALLER sees
    }
    
    SetCallData(CallId, false)
    TriggerClientEvent("fw-phone:Client:Notification", OngoingCalls[CallId].Target, 'contacts-dial-' .. CallId, 'fas fa-phone-alt', { 'white', '#029587' }, TargetContactName, "Inkomende Oproep", false, false, "fw-phone:Server:Contacts:AnswerContact", "fw-phone:Server:Contacts:DeclineCall", { HideOnAction = false, CallId = CallId })
    TriggerClientEvent('fw-phone:Client:AddCall', Char2:GetData('Source'), { Burner = false, Incoming = true, Contact = TargetContactName, Phone = MyPhone, Timestamp = os.time() * 1000})
    
    Citizen.CreateThread(function()
        while OngoingCalls[CallId] and OngoingCalls[CallId].Dialing do
            if not SoundMuters[OngoingCalls[CallId].Caller] then
                TriggerClientEvent('fw-misc:Client:PlaySoundEntity', OngoingCalls[CallId].Caller, 'phone.phoneDial', false, true, OngoingCalls[CallId].Caller)
            end

            Citizen.Wait(4000)
        end
    end)

    Citizen.CreateThread(function()
        while OngoingCalls[CallId] and OngoingCalls[CallId].Dialing do
            if not SoundMuters[OngoingCalls[CallId].Target] then
                TriggerClientEvent('fw-misc:Client:PlaySoundEntity', OngoingCalls[CallId].Target, 'phone.phoneRing', false, true, OngoingCalls[CallId].Target)
            end

            --Citizen.Wait(exports['fw-misc']:GetSoundTimeout('phone.phoneRing') + 2000)
        end
    end)

    Citizen.SetTimeout(15000, function()
        if OngoingCalls[CallId] and OngoingCalls[CallId].Dialing then
            TriggerClientEvent("fw-phone:Client:UpdateNotification", OngoingCalls[CallId].Caller, 'contacts-dial-' .. CallId, true, true, nil, 'Verbinding verbroken!', true, false)
            TriggerClientEvent("fw-phone:Client:UpdateNotification", OngoingCalls[CallId].Target, 'contacts-dial-' .. CallId, true, true, nil, 'Verbinding verbroken!', true, false)
            SetCallData(CallId, true)

            OngoingCalls[CallId] = nil
            CallerSources[Source] = nil
            CallerSources[Char2:GetData('Source')] = nil
        end
    end)
end)

local StringCharset = {}
local NumberCharset = {}
for i = 48,  57 do table.insert(NumberCharset, string.char(i)) end
for i = 65,  90 do table.insert(StringCharset, string.char(i)) end
for i = 97, 122 do table.insert(StringCharset, string.char(i)) end

RandomInt = function(length)
	if length > 0 then
		return RandomInt(length-1) .. NumberCharset[math.random(1, #NumberCharset)]
	else
		return ''
	end
end

RegisterNetEvent("fw-phone:Server:DialPayphone")
AddEventHandler("fw-phone:Server:DialPayphone", function(Data)
    local Source = source
    local Player = exports['bs_base']:FetchComponent('Fetch'):Source(Source)
    local Char = Player:GetData('Character')
    if Player == nil then return end

    if Data.Phone == Char:GetData('Phone') then
        return Player.Functions.Notify("Het is wel heel eenzaam om met jezelf te bellen..", "error")
    end

    -- Check if already in call, if so then cancel and return notify.
    if CallerSources[Source] then
        return Player.Functions.Notify("Je zit al in een gesprek..", "error")
    end

    local CallId = RandomInt(6)
    CallerSources[Source] = CallId

    local ContactName = Data.CalleeName and Data.CalleeName or FormatPhone(Data.Phone)
    TriggerClientEvent("fw-phone:Client:Notification", Source, 'contacts-dial-' .. CallId, 'fas fa-phone-alt', { 'white', '#029587' }, ContactName, "Verbinden...", false, false, nil, "fw-phone:Server:Contacts:DeclineCall", { HideOnAction = false, CallId = CallId })

    Citizen.Wait(1000) -- waiting simulator belike 👀

    -- Check if player online with that phonenumber, if it isn't than return 'Disconnected.'
    local player2 = exports['bs_base']:FetchComponent('Fetch'):Source(Source)
    local Char2 = Player:GetData('Character')
    if Data.Phone == Char2:GetData('Phone') then 
        local Target = Char2:GetData('Phone')
        if Target == nil then
            TriggerClientEvent('fw-phone:Client:UpdateNotification', Source, 'contacts-dial-' .. CallId, true, true, nil, 'Verbinding verbroken!', true, false)
            CallerSources[Source] = nil
            return
        end
    end

    local TargetPhone = exports['ghmattimysql']:executeSync("SELECT * FROM `phone_contacts` WHERE `phone` = @Phone AND `citizenid` = @Cid", { ['@Phone'] = Data.CallingFrom, ['@Cid'] = Target.PlayerData.citizenid })
    local TargetContactName = Data.CallerName and Data.CallerName or FormatPhone(Data.CallingFrom)

    OngoingCalls[CallId] = {
        Payphone = true,
        CallId = CallId,
        Dialing = true,
        Caller = Char:GetData('Source'),
        Target = Char2:GetData('Source'),
        CallerPhone = Char:GetData('Phone'),
        TargetPhone = Char2:GetData('Phone'),
        CallerName = TargetContactName, -- Name that the TARGET sees
        TargetName = ContactName, -- Name that the CALLER sees
    }

    SetCallData(CallId, false)
    TriggerClientEvent("fw-phone:Client:Notification", OngoingCalls[CallId].Target, 'contacts-dial-' .. CallId, 'fas fa-phone-alt', { 'white', '#029587' }, TargetContactName, "Inkomende Oproep", false, false, "fw-phone:Server:Contacts:AnswerContact", "fw-phone:Server:Contacts:DeclineCall", { HideOnAction = false, CallId = CallId })
    TriggerClientEvent('fw-phone:Client:AddCall', OngoingCalls[CallId].Target, { Incoming = true, Contact = TargetContactName, Phone = Data.CallingFrom, Timestamp = os.time() * 1000})

    Citizen.CreateThread(function()
        while OngoingCalls[CallId] and OngoingCalls[CallId].Dialing do
            if not SoundMuters[OngoingCalls[CallId].Caller] then
                TriggerClientEvent('fw-misc:Client:PlaySoundEntity', OngoingCalls[CallId].Caller, 'phone.phoneDial', false, true, OngoingCalls[CallId].Caller)
            end
            
            if not SoundMuters[OngoingCalls[CallId].Target] then
                TriggerClientEvent('fw-misc:Client:PlaySoundEntity', OngoingCalls[CallId].Target, 'phone.phoneRing', false, true, OngoingCalls[CallId].Target)
            end
            Citizen.Wait(4000)
        end
    end)

    Citizen.SetTimeout(15000, function()
        if OngoingCalls[CallId] and OngoingCalls[CallId].Dialing then
            TriggerClientEvent("fw-phone:Client:UpdateNotification", OngoingCalls[CallId].Caller, 'contacts-dial-' .. CallId, true, true, nil, 'Verbinding verbroken!', true, false)
            TriggerClientEvent("fw-phone:Client:UpdateNotification", OngoingCalls[CallId].Target, 'contacts-dial-' .. CallId, true, true, nil, 'Verbinding verbroken!', true, false)
            SetCallData(CallId, true)

            OngoingCalls[CallId] = nil
            CallerSources[Source] = nil
            CallerSources[Char2:GetData('Source')] = nil
        end
    end)
end)

RegisterNetEvent("fw-phone:Server:Contacts:AnswerContact")
AddEventHandler("fw-phone:Server:Contacts:AnswerContact", function(Data)
    if not OngoingCalls[Data.CallId] then return end

    local Caller = exports['bs_base']:FetchComponent('Fetch'):Source(OngoingCalls[Data.CallId].Caller)
    if Caller == nil then return end

    OngoingCalls[Data.CallId].Dialing = false

    SetCallData(Data.CallId, false)

    TriggerClientEvent("fw-phone:Client:RemoveNotification", OngoingCalls[Data.CallId].Caller, 'contacts-dial-' .. Data.CallId)
    TriggerClientEvent("fw-phone:Client:RemoveNotification", OngoingCalls[Data.CallId].Target, 'contacts-dial-' .. Data.CallId)

    Citizen.Wait(30)

    TriggerClientEvent('fw-phone:Client:Contacts:SetVoice', OngoingCalls[Data.CallId].Caller, true, Caller.PlayerData.charinfo.phone, OngoingCalls[Data.CallId].Target)

    TriggerClientEvent("fw-phone:Client:Notification", OngoingCalls[Data.CallId].Caller, 'contacts-dial-' .. Data.CallId, 'fas fa-phone-alt', { 'white', '#029587' }, OngoingCalls[Data.CallId].TargetName, nil, true, false, nil, "fw-phone:Server:Contacts:DeclineCall", { HideOnAction = false, CallId = Data.CallId })
    TriggerClientEvent("fw-phone:Client:Notification", OngoingCalls[Data.CallId].Target, 'contacts-dial-' .. Data.CallId, 'fas fa-phone-alt', { 'white', '#029587' }, OngoingCalls[Data.CallId].CallerName, nil, true, false, nil, "fw-phone:Server:Contacts:DeclineCall", { HideOnAction = false, CallId = Data.CallId })
end)

RegisterNetEvent("fw-phone:Server:Contacts:DeclineCall")
AddEventHandler("fw-phone:Server:Contacts:DeclineCall", function(Data)
    if not OngoingCalls[Data.CallId] then return end

    local Caller = exports['bs_base']:FetchComponent('Fetch'):Source(OngoingCalls[Data.CallId].Caller)
    if Caller == nil then return end

    TriggerClientEvent("fw-phone:Client:UpdateNotification", OngoingCalls[Data.CallId].Caller, 'contacts-dial-' .. Data.CallId, true, true, nil, 'Verbinding verbroken!', true, false)
    TriggerClientEvent("fw-phone:Client:UpdateNotification", OngoingCalls[Data.CallId].Target, 'contacts-dial-' .. Data.CallId, true, true, nil, 'Verbinding verbroken!', true, false)

    SetCallData(Data.CallId, true)

    TriggerClientEvent('fw-phone:Client:Contacts:SetVoice', OngoingCalls[Data.CallId].Caller, false, Caller.PlayerData.charinfo.phone, OngoingCalls[Data.CallId].Target)

    CallerSources[OngoingCalls[Data.CallId].Caller] = nil
    CallerSources[OngoingCalls[Data.CallId].Target] = nil
    OngoingCalls[Data.CallId] = nil
end)

function RegisterCallbacks2()

    Callbacks:RegisterServerCallback("fw-phone:Server:Contacts:GetContacts", function(Source, Data, Cb)
        local Player = exports['bs_base']:FetchComponent('Fetch'):Source(Source)
        local Char = Player:GetData('Character')
        if Player == nil then return end
        
        local Result = exports['ghmattimysql']:executeSync("SELECT * FROM `phone_contacts` WHERE `citizenid` = @Cid ORDER BY `name` ASC", {
            ['@Cid'] = Char:GetData('ID')
        })

        Cb(Result)
    end)

    Callbacks:RegisterServerCallback("fw-phone:Server:Contacts:AddContacts", function(Source, Data, Cb)
        print('Add')
        local Player = exports['bs_base']:FetchComponent('Fetch'):Source(Source)
        local Char = Player:GetData('Character')
        if Player == nil then return end

        if not Data.Name or not Data.Phone then return Cb(false) end
        
        local Result = exports['oxmysql']:execute("INSERT INTO `phone_contacts` (`citizenid`, `name`, `phone`) VALUES (@Cid, @Name, @Phone)", {
            ['@Cid'] = Char:GetData('ID'),
            ['@Name'] = Data.Name,
            ['@Phone'] = Data.Phone,
        })

        Cb(true)
    end)

    Callbacks:RegisterServerCallback("fw-phone:Server:Contacts:EditContact", function(Source, Cb, Data)
        local Player = exports['bs_base']:FetchComponent('Fetch'):Source(Source)
        local Char = Player:GetData('Character')
        if Player == nil then return end

        if not Data.Name or not Data.Phone then return Cb(false) end
        
        local Result = exports['oxmysql']:execute("UPDATE `phone_contacts` SET `name` = @Name, `phone` = @Phone WHERE `id` = @Id", {
            ['@Id'] = Data.Id,
            ['@Name'] = Data.Name,
            ['@Phone'] = Data.Phone,
        })

        Cb(true)
    end)

    Callbacks:RegisterServerCallback("fw-phone:Server:Contacts:DeleteContact", function(Source, Cb, Data)
        local Player = exports['bs_base']:FetchComponent('Fetch'):Source(Source)
        local Char = Player:GetData('Character')
        if Player == nil then return end
        
        local Result = exports['ghmattimysql']:executeSync("DELETE FROM `phone_contacts` WHERE `id` = @Id", {
            ['@Id'] = Data.ContactId,
        })

        Cb(true)
    end)
end

AddEventHandler("playerDropped", function(Reason)
    local Source = source
    local CallId = CallerSources[Source]

    if not CallId then
        return
    end

    if not OngoingCalls[CallId] then
        return
    end

    local Caller = exports['bs_base']:FetchComponent('Fetch'):Source(OngoingCalls[CallId].Caller)
    if Caller then
        TriggerClientEvent("fw-phone:Client:UpdateNotification", OngoingCalls[CallId].Caller, 'contacts-dial-' .. CallId, true, true, nil, 'Verbinding verbroken!', true, false)
        TriggerClientEvent('fw-phone:Client:Contacts:SetVoice', OngoingCalls[CallId].Caller, false, Caller.PlayerData.charinfo.phone, OngoingCalls[CallId].Target)
        CallerSources[OngoingCalls[CallId].Caller] = nil
    end

    local Target = exports['bs_base']:FetchComponent('Fetch'):Source(OngoingCalls[CallId].Target)
    if Target then
        TriggerClientEvent("fw-phone:Client:UpdateNotification", OngoingCalls[CallId].Target, 'contacts-dial-' .. CallId, true, true, nil, 'Verbinding verbroken!', true, false)
        TriggerClientEvent('fw-phone:Client:Contacts:SetVoice', OngoingCalls[CallId].Target, false, Target.PlayerData.charinfo.phone, OngoingCalls[CallId].Target)
        CallerSources[OngoingCalls[CallId].Target] = nil
    end

    SetCallData(CallId, true)

    CallerSources[OngoingCalls[CallId].Target] = nil
    OngoingCalls[CallId] = nil
end)

function FormatPhone(Phone)
    if not Phone then return "" end
    return string.gsub(Phone, "(%d%d)(%d%d%d%d%d%d%d%d)", "%1 %2")
end

function GetContactName(Cid, Phone)
    local Result = exports['ghmattimysql']:executeSync('SELECT * FROM `phone_contacts` WHERE `citizenid` = @Cid and `phone` = @Phone', { ['@Cid'] = Cid, ['@Phone'] = Phone })
    return Result[1] and Result[1].name or FormatPhone(Phone)
end

function SetCallData(CallId, Reset)
    if Reset then
        TriggerClientEvent("fw-phone:Client:SetCallData", OngoingCalls[CallId].Caller, nil)
        TriggerClientEvent("fw-phone:Client:SetCallData", OngoingCalls[CallId].Target, nil)
    else
        TriggerClientEvent("fw-phone:Client:SetCallData", OngoingCalls[CallId].Caller, OngoingCalls[CallId])
        TriggerClientEvent("fw-phone:Client:SetCallData", OngoingCalls[CallId].Target, OngoingCalls[CallId])
    end
end

function IsCallOngoingByPhone(Phone)
    for k, v in pairs(OngoingCalls) do
        if v.CallerPhone == Phone or v.TargetPhone == Phone then
            return true
        end
    end

    return false
end
exports("IsCallOngoingByPhone", IsCallOngoingByPhone)