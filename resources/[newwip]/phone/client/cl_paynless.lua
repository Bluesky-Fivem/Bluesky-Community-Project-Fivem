RegisterNUICallback('getUnitData', function(_, cb)
    local units = RPC.execute("pnp-business:storage:getOwnedUnits")

    print("getUnitData", units)

    local employed = RPC.execute("IsEmployedAt", "paynless")
    cb({ data = units, employed = employed })
end)

RegisterNUICallback('getManageData', function(_, cb)
    local units = RPC.execute("pnp-business:storage:getAllUnits")
    print("getManageData", units)
    cb({ data = units })
end)