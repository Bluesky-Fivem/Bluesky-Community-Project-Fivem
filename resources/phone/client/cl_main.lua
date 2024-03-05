open = false
hiddenapp = false
heistzone = nil


AddEventHandler('Phone:Shared:DependencyUpdate', RetrieveComponents)
function RetrieveComponents()
    Callbacks = exports['bs_base']:FetchComponent('Callbacks')
    Notification = exports["bs_base"]:FetchComponent("Notification")
    Keybinds = exports["bs_base"]:FetchComponent("Keybinds")
    RegisterKeybinds()
end

AddEventHandler('Core:Shared:Ready', function()
    exports['bs_base']:RequestDependencies('Phone', {
        'Callbacks',
        "Notification",
        'Keybinds', 
    }, function(error)  
        if #error > 0 then return; end
        RetrieveComponents()
        --RegisterKeybinds()
    end)
end)


Citizen.CreateThread(function()
  local deleteCalls = RPC.execute("deleteCalls")
end)

RegisterNetEvent("pnp-phone:SendNotify")
AddEventHandler("pnp-phone:SendNotify", function(message, type, title, number)
local serverid = GetPlayerServerId(PlayerId())
if type == "messages" then
  local contactName = getContactName(number)
  SendReactMessage('setNotify', {
    serverid = serverid,
    app = "phone",
    data = {
      action = "notification",
      target_app = "messages",
      title = contactName,
      body = message
    }
  })
elseif type == "charge" then
  SendReactMessage('setNotify', {
    serverid = serverid,
    app = "phone",
    data = {
      action = "notification",
      target_app = "home-screen",
      title = title,
      body = message,
      bgColor = "rgba(39, 48, 53, 255)"
    }
  })
elseif type == "jobcenter" then
  SendReactMessage('setNotify', {
    serverid = serverid,
    app = "phone",
    data = {
      action = "notification",
      target_app = "home-screen",
      title = title,
      body = message,
      bgColor = "#2a3038"
    }
  })
end
end)

RegisterNUICallback('hideFrame', function(_, cb)
  open = not open
  SetNuiFocus(open, open)
  SendReactMessage('closeApps')
  --SendReactMessage('openPhone', open)
  SendReactMessage('closePhone')
  TriggerEvent("destroyPropPhone")
  ClearPedSecondaryTask(PlayerPedId())
end)

RegisterNetEvent("pnp-ui:restartUI")
AddEventHandler("pnp-ui:restartUI", function()
  open = false
  SetNuiFocus(false, false)
  SendReactMessage('closeApps')
  --SendReactMessage('openPhone', false)
  SendReactMessage('closePhone')
  TriggerEvent("destroyPropPhone")
  ClearPedSecondaryTask(PlayerPedId())
end)

RegisterCommand('phone', function()
  generalPhone()
end)

function generalPhone()
  
  LoadAnimationDic("cellphone@")
  TaskPlayAnim(PlayerPedId(), "cellphone@", "cellphone_text_read_base", 2.0, 3.0, -1, 49, 0, 0, 0, 0)
  TriggerEvent("attachItemPhone", "phone01")
  open = not open
  serverid = GetPlayerServerId(PlayerId())
  --local hasDongle = exports["pnp-inventory"]:hasEnoughOfItem("racingusb", 1, false)
  --local hasVPN = exports["pnp-inventory"]:hasEnoughOfItem("vpnxj", 1, false)
  SetNuiFocus(open, open)
  SendReactMessage('openPhone', {
    bool = open,
    serverid = serverid,
    hiddenapp = hiddenapp,
    burner = false,
    notifications = notifications,
    hasDongle = hasDongle,
    hasVPN = hasVPN
  })
end

Citizen.CreateThread(function()
  local serverid = GetPlayerServerId(PlayerId())
  while true do
    Citizen.Wait(0)
    -- upd
    local hour = GetClockHours()
    local minute = GetClockMinutes()

    if hour < 10 then
      hour = '0'..hour
    end
    if minute < 10 then
      minute = '0'..minute
    end
    local time = hour .. ":" .. minute
    SendReactMessage('setTime', time)
    SendReactMessage('setSrc', serverid)
    Citizen.Wait(1000)
  end
end)

function RegisterKeybinds()
  Keybinds.AddKeybind("openMobile", "Phone", "Open", "P", generalPhone)
end
