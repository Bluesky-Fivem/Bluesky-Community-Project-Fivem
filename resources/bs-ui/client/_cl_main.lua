local ScannerOpen, isMeosOpened, isEPDOpened = false, false, false
LoggedIn, Restarting = false, false
InVehicle, Seatbelt, ShowCompass = false, false, true


AddEventHandler('MyUi:Shared:DependencyUpdate', RetrieveComponents)
function RetrieveComponents()
    Callbacks = exports['bs_base']:FetchComponent('Callbacks')
    Notification = exports["bs_base"]:FetchComponent("Notification")
    Keybinds = exports["bs_base"]:FetchComponent("Keybinds")
end

AddEventHandler('Core:Shared:Ready', function()
    exports['bs_base']:RequestDependencies('MyUi', {
        'Callbacks',
        "Notification",
        'Keybinds'
    }, function(error)  
        if #error > 0 then return; end
        RetrieveComponents()
        RegisterKeybinds()
    end)
end)

RegisterNetEvent('Characters:Client:Spawn')
AddEventHandler('Characters:Client:Spawn', function()
    Citizen.SetTimeout(1250, function()
        LoggedIn = true

        RequestStreamedTextureDict('fw_sprites')
        if Keybinds.GetCustomizedKey("eyePeek") ~= "L Alt" then
            Notification:SendAlert("You have changed the keyboard shortcut of the eye, so the eye will not function correctly. (Default: Left Alt)", 10000)
        end

        InitUI()
    end)
end)



RegisterNetEvent('FW:Client:CloseNui')
AddEventHandler('FW:Client:CloseNui', function()
    SetNuiFocus(false, false)
end)

-- Code

RegisterNUICallback("uiReady", function(Data, Cb)
    SetNuiFocus(false, false)
    TriggerEvent("bs-ui:Ready")
    Cb("Ok")
end)

RegisterNUICallback("appRestart", function(Data, Cb)
    if Data.App == "root" then
        TriggerEvent("bs-ui:Ready")
        InitUI()
    end

    TriggerEvent("bs-ui:appRestart", Data.App)
end)

-- // Events \\ --

RegisterNetEvent("bs-ui:Client:CreateBadge")
AddEventHandler("bs-ui:Client:CreateBadge", function(Data)
    local Inputs = {
        { Label = 'Naam', Icon = 'fas fa-user', Name = 'Name' },
        { Label = 'Functie', Icon = 'fas fa-mask', Name = 'Rank' },
        { Label = 'Roepnummer (optioneel)', Icon = 'fas fa-tag', Name = 'Callsign' },
        { Label = 'Foto URL (.png/.jpg/.jpeg)', Icon = 'fas fa-heading', Name = 'Image' },
    }

    if Data.Badge == 'pd' then
        table.insert(Inputs, {
            Label = 'Department',
            Icon = 'fas fa-certificate',
            Name = 'Department',
            Choices = {
                { Text = "Unified PD" },
                { Text = "Los Santos PD" },
                { Text = "State Troopers" },
                { Text = "State Parks" },
                { Text = "Blaine County Sheriffs Office" },
            }
        })
    end

    local Result = exports['bs-ui']:CreateInput(Inputs)

    if Result and #Result.Name > 0 and #Result.Rank > 0 and #Result.Image > 0 then
        TriggerServerEvent("bs-ui:Server:CreateBadge", Data, Result)
    else
        Notification:SendAlert("You must indicate a name, rank and photo!", 10000)
    end
end)


function RequestAnimationDict(AnimDict)
    RequestAnimDict(AnimDict)
    while not HasAnimDictLoaded(AnimDict) do
        Citizen.Wait(1)
    end
end

RegisterNetEvent('bs-ui:Client:BadgeAnim')
AddEventHandler('bs-ui:Client:BadgeAnim', function(ItemInfo)
    RequestAnimationDict('paper_1_rcm_alt1-7')
    TaskPlayAnim(PlayerPedId(), "paper_1_rcm_alt1-7", "player_one_dual-7", 1.0, 1.0, -1, 63, 0, 0, 0, 0)
    --exports['fw-assets']:AddProp('PBadge')
    Citizen.SetTimeout(9000, function()
        --exports['fw-assets']:RemoveProp()
        ClearPedTasks(PlayerPedId())
    end)
end)

RegisterNetEvent('bs-ui:Client:ShowBadge')
AddEventHandler('bs-ui:Client:ShowBadge', function(Type, Data, Department)
    SendUIMessage("Badge", "ShowBadge", {
        Type = Type,
        Badge = Data,
    })
end)

RegisterNetEvent("bs-ui:Client:DoJumpscare")
AddEventHandler("bs-ui:Client:DoJumpscare", function()
    SendUIMessage("Halloween", "DoJumpscare")
end)

-- // Functions \\ --

function SendUIMessage(App, Action, Payload)
    SendNUIMessage({
        App = App,
        Action = Action,
        Payload = Payload,
    })
end
exports("SendUIMessage", SendUIMessage)
exports("SetUIFocus", SetNuiFocus)
exports("SetNuiFocus", SetNuiFocus)
exports("SetNuiFocusKeepInput", SetNuiFocusKeepInput)

function OpenEPD()
    isEPDOpened = true
    SetNuiFocus(true, true)
    SendUIMessage("Tablet", "SetIframe", {
        Iframe = "epd"
    })
end

function InitUI()
    SendUIMessage("Root", "SetPlayerData", {
        Cid = exports['bs_base']:FetchComponent('Player').LocalPlayer:GetData('Character'):GetData('ID'),
        Job = exports['bs_base']:FetchComponent('Player').LocalPlayer:GetData('Character'):GetData('Job').job,
        Duty = exports['bs_base']:FetchComponent('Player').LocalPlayer:GetData('Character'):GetData('Duty'),
    })
end

RegisterNUICallback("Tablet/Close", function(Data, Cb)
    isEPDOpened = false
    SendUIMessage("Tablet", "HideIframe", {})
    SetNuiFocus(false, false)

    --exports['fw-assets']:RemoveProp()
    ClearPedTasks(PlayerPedId())

    Cb("Ok")
end)

exports('isEPDOpened', function()
    return isEPDOpened
end)


RegisterNetEvent('bs-ui:Client:refresh')
AddEventHandler('bs-ui:Client:refresh', function()
    SendUIMessage("Prompt", "Reload", {})
end)

function _RequestModel(Model)
    RequestModel(Model)
    while not HasModelLoaded(Model) do
        Citizen.Wait(1)
    end
end