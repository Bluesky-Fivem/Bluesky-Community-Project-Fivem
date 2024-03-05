local payphoneModels = {
  `p_phonebox_02_s`,
  `prop_phonebox_03`,
  `prop_phonebox_02`,
  `prop_phonebox_04`,
  `prop_phonebox_01c`,
  `prop_phonebox_01a`,
  `prop_phonebox_01b`,
  `p_phonebox_01b_s`,
}

Citizen.CreateThread(function()
  exports["pnp-interact"]:AddPeekEntryByModel(payphoneModels, {{
    event = "pnp-phone:startPayPhoneCall",
    id = "uniqueIdLMAO",
    icon = "phone-volume",
    label = "Make Call",
    parameters = {},
  }}, { 
    distance = { radius = 1.5 },
    isEnabled = function()
      return true
    end
   })
end)

local entityPayPhoneCoords = nil
AddEventHandler("pnp-phone:startPayPhoneCall", function(pArgs, pEntity)
  entityPayPhoneCoords = GetEntityCoords(pEntity)
  print("entity coords", entityPayPhoneCoords)

  local numb = exports["pnp-applications"]:KeyboardInput({
    header = "Spawn Vehicle",
    rows = {
    {
        id = 0,
        txt = "Phone Number"
    }
    }
    })
    if numb[1] ~= nil then
        local number = numb[1].input
        RPC.execute("phone:callStart", number, true)
        Citizen.CreateThread(function()
          while entityPayPhoneCoords do
            if #(GetEntityCoords(PlayerPedId()) - entityPayPhoneCoords) > 2.0 then
              entityPayPhoneCoords = nil
              print("more than 2 dist, end phone call")
              endPhoneCall()
            end
            Citizen.Wait(500)
          end
        end)
    end
end)