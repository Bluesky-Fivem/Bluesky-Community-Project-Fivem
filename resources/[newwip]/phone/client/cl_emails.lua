RegisterNUICallback('getEmailData', function(data, cb)
  local characterId = exports['bs_base']:FetchComponent('Player').LocalPlayer:GetData('Character'):GetData('ID')
  local data = RPC.execute("getEmailData", characterId)
  cb(data)
end)

RegisterNetEvent("addEmail")
AddEventHandler("addEmail", function(args)
  local pTime = GetCloudTimeAsInt()
  RPC.execute("sendEmail", args.title, args.subject, args.message, pTime)
end)

RegisterNetEvent("emailNotify")
AddEventHandler("emailNotify", function(message)
  local serverid = GetPlayerServerId(PlayerId())
  SendReactMessage('setNotify', {
    serverid = serverid,
    app = "phone",
    data = {
      action = "notification",
      target_app = "email",
      title = "Email",
      body = message
    }
  })

  local characterId = exports['bs_base']:FetchComponent('Player').LocalPlayer:GetData('Character'):GetData('ID')
  local data = RPC.execute("getEmailData", characterId)
  SendReactMessage('updateEmail', data)
end)