RPC.register("ping:request", function(pSource, pTarget, pCoords, pAnon)
    local isAnon = pAnon.param
    local Player = exports['bs_base']:FetchComponent('Fetch'):Source(pSource)
    local Char = Player:GetData('Character')
    local name = Char:GetData('First')
    local last = Char:GetData('Last')
    local name = name .. " " .. last
    if isAnon then
        name = "Anonymous"
    end
    local target = pTarget.param
    local coords = pCoords.param
    TriggerClientEvent("ping:receive", target, coords, name)
    return true
end)