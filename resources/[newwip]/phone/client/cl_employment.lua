RegisterNUICallback("getEmploymentData", function(data, cb)
  local employment = RPC.execute("pnp-business:business:GetEmploymentInformation")
  cb(employment)
end)

RegisterNUICallback("getEmployeesData", function(data, cb)
  local characterId = exports["isPed"]:isPed("cid")
  local business = RPC.execute("pnp-business:business:GetBusiness", data.id)
  local roles = RPC.execute("pnp-business:business:GetBusinessRoles", data.id)
  local role = RPC.execute("pnp-business:business:GetUserRole", data.id, characterId)
  local roleManagePerm, roleCreatePerm, canHirePerm, canFirePerm, canUseBank, canChargePerm = RPC.execute("pnp-business:business:GetRolePermission", data.id, role)

  cb({
    employees = business,
    roles = roles,
    cid = characterId,
    permission = {
      roleManage = roleManagePerm,
      roleCreate = roleCreatePerm,
      canHire = canHirePerm,
      canFire = canFirePerm,
      canCharge = canChargePerm
    }
  })
end)

RegisterNUICallback("removeEmployee", function(data, cb)
  if data == nil then return end
  if tonumber(data.id) == tonumber(exports['isPed']:isPed('cid')) then TriggerEvent("DoLongHudText", "You can't fire yourself!", 2) return end
  local result = RPC.execute("pnp-business:business:fireEmployee", data.id, data.businessid)
  if not result then return TriggerEvent("DoLongHudText", "Error", 2) end
  local characterId = exports["isPed"]:isPed("cid")
  local business = RPC.execute("pnp-business:business:GetBusiness", data.businessid)
  local roles = RPC.execute("pnp-business:business:GetBusinessRoles", data.businessid)
  cb({
    employees = business,
    roles = roles,
    cid = characterId
  })
end)

RegisterNUICallback("editEmployee", function(data, cb)
  if data == nil then return end
  local result = RPC.execute("pnp-business:business:updateEmployee", data.id, data.businessid, data.role)
  if not result then return TriggerEvent("DoLongHudText", "Error", 2) end
  local characterId = exports["isPed"]:isPed("cid")
  local business = RPC.execute("pnp-business:business:GetBusiness", data.businessid)
  local roles = RPC.execute("pnp-business:business:GetBusinessRoles", data.businessid)
  cb({
    employees = business,
    roles = roles,
    cid = characterId
  })
end)

RegisterNUICallback("hireEmployee", function(data, cb)
  if data == nil then return end
  local result = RPC.execute("pnp-business:business:hireEmployee", data.id, data.role, data.businessid)
  if not result then return TriggerEvent("DoLongHudText", "This person is already hired!", 2) end
  local characterId = exports["isPed"]:isPed("cid")
  local business = RPC.execute("pnp-business:business:GetBusiness", data.businessid)
  local roles = RPC.execute("pnp-business:business:GetBusinessRoles", data.businessid)
  cb({
    employees = business,
    roles = roles,
    cid = characterId
  })
end)

RegisterNUICallback("deleteRole", function(data, cb)
  if data == nil then return end
  local role = data.role
  if tostring(role) == "Owner" then return TriggerEvent("DoLongHudText", "Can't delete Owner role.", 2) end
  local result = RPC.execute("pnp-business:business:deleteRole", data.businessid, data.role)
  if not result then return TriggerEvent("DoLongHudText", "Error", 2) end
  local characterId = exports["isPed"]:isPed("cid")
  local business = RPC.execute("pnp-business:business:GetBusiness", data.businessid)
  local roles = RPC.execute("pnp-business:business:GetBusinessRoles", data.businessid)
  cb({
    employees = business,
    roles = roles,
    cid = characterId
  })
end)

RegisterNUICallback("createRole", function(data, cb)
  if data == nil then return end
  local perms = data.permissions
  local doesExist = RPC.execute("pnp-business:business:checkRoleExistance", data.businessid, data.role)
  if doesExist then return TriggerEvent("DoLongHudText", "Role name already exists!", 2) end
  local result = RPC.execute("pnp-business:business:createRole", data.businessid, data.role, perms.hire, perms.fire, perms.changeRole, perms.propertyKeys, perms.stash, perms.craft, perms.chargeExternal, perms.bank) -- last is bank
  if not result then return TriggerEvent("DoLongHudText", "Error", 2) end
  local characterId = exports["isPed"]:isPed("cid")
  local business = RPC.execute("pnp-business:business:GetBusiness", data.businessid)
  local roles = RPC.execute("pnp-business:business:GetBusinessRoles", data.businessid)
  cb({
    employees = business,
    roles = roles,
    cid = characterId
  })
end)

RegisterNUICallback("editRole", function(data, cb)
  if data == nil then return end
  if tostring(data.role) == "Owner" then return TriggerEvent("DoLongHudText", "Can't edit Owner role.", 2) end
  local perms = data.permissions
  local result = RPC.execute("pnp-business:business:editRole", data.businessid, data.role, data.role, perms.fire, perms.hire, perms.changeRole, perms.propertyKeys, perms.stash, perms.craft, perms.chargeExternal, perms.bank) -- last is bank
  if not result then return TriggerEvent("DoLongHudText", "Error", 2) end
  local characterId = exports["isPed"]:isPed("cid")
  local business = RPC.execute("pnp-business:business:GetBusiness", data.businessid)
  local roles = RPC.execute("pnp-business:business:GetBusinessRoles", data.businessid)
  cb({
    employees = business,
    roles = roles,
    cid = characterId
  })
end)

RegisterNUICallback("getRolePermission", function(data, cb)
  local roleManagePerm, roleCreatePerm, canHirePerm, canFirePerm, hasBankPerm, canChargePerm, hasKeysPerm, hasStashPerm, hasCraftPerm = RPC.execute("pnp-business:business:GetRolePermission", data.businessid, data.role)    
  cb({roleManage = roleManagePerm, roleCreate = roleCreatePerm, canHire = canHirePerm, canFire = canFirePerm, canCharge = canChargePerm, hasKeys = hasKeysPerm, hasStash = hasStashPerm, hasCraft = hasCraftPerm, hasBank = hasBankPerm})
end)

RegisterNUICallback("chargeCustomer", function(data, cb)
  if data == nil then return end
  RPC.execute("pnp-business:business:charge", data.businessid, data.id, exports["isPed"]:isPed("cid"), data.amount, data.comment)
  cb(true)
end)

local years, months, days, hours, minutes, seconds
local date = 31

function time()
    years, months, days, hours, minutes, seconds =
    Citizen.InvokeNative(0x50C7A99057A69748, Citizen.PointerValueInt(),Citizen.PointerValueInt(),Citizen.PointerValueInt(),Citizen.PointerValueInt(),Citizen.PointerValueInt(), Citizen.PointerValueInt())

    if months < 10 then months = "0" .. months end

    if days < 10 then days = "0" .. days end

    if minutes < 10 then minutes = "0" .. minutes - 1 end

    if seconds < 10 then seconds = "0" .. seconds end

    if hours < 10 then hours = "0" .. hours end

    date = years .. "-" .. months .. "-" .. days .. "T" .. hours .. ":" ..minutes .. ":" .. seconds
end

function format_int(n)
  if not n then return 0 end
  n = tonumber(n)
  if n >= 1e14 then return tostring(n) end
  if n <= -1e14 then return "-" .. tostring(math.abs(n)) end
  local negative = n < 0
  n = tostring(math.abs(n))
  local dp = string.find(n, "%.") or #n + 1

  for i = dp - 4, 1, -3 do
      n = n:sub(1, i) .. "," .. n:sub(i + 1)
  end

  -- Make sure the amount is padded with zeroes
  if n[#n - 1] == "." then
      n = n .. "0"
  end

  return (negative and "-" or "") .. n
end

RegisterNetEvent("showPaymentNotify")
AddEventHandler("showPaymentNotify", function(businessid, cid, charger, amount, comment)
    local mycid = exports["isPed"]:isPed("cid")
    if tonumber(mycid) == tonumber(cid) then
      local clientId = PlayerId()
      local src = GetPlayerServerId(clientId)
        local realamount = format_int(tonumber(amount))
        local message = "$" .. tostring(realamount) .. " incl tax"
        local result = DoPhoneConfirmation(nil, "Service Charge", message)
        if result then
            -- if this succeeds then a noti will send to the charger

            time()

            RPC.execute("chargeCustomer", businessid, cid, comment, charger, amount, src, date)
        end
    end
end)

RegisterNetEvent("showPaymentReceivedNotify")
AddEventHandler("showPaymentReceivedNotify", function(charger)
    local mycid = exports["isPed"]:isPed("cid")
    if tonumber(mycid) == tonumber(charger) then
        Wait(500)
        TriggerEvent("pnp-phone:SendNotify", "Payment Successful!", "charge", "Business Charge") -- Payment Received!
      end
end)