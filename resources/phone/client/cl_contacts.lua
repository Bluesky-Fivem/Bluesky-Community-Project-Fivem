RegisterNUICallback('getContactsData', function(_, cb)
  local characterId = exports['bs_base']:FetchComponent('Player').LocalPlayer:GetData('Character'):GetData('ID')
  local contacts = RPC.execute("getCharacterContacts", characterId)
  cb(contacts)
end)

RegisterNUICallback('addPhoneContact', function(data, cb)
  local characterId = exports['bs_base']:FetchComponent('Player').LocalPlayer:GetData('Character'):GetData('ID')
  
  local success = RPC.execute("addPhoneContact", characterId, data.number, data.name)
  if success then
    cb({meta = {ok = true}})
  else
    cb({meta = {ok = false}})
  end
end)

RegisterNUICallback('removePhoneContact', function(data, cb)
  local characterId = exports['bs_base']:FetchComponent('Player').LocalPlayer:GetData('Character'):GetData('ID')
  local success = RPC.execute("removePhoneContact", data.id)
  if success then
    cb({meta = {ok = true}})
  else
    cb({meta = {ok = false}})
  end
end)