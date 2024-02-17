--[[Citizen.CreateThread(function()
    while true do 
        Citizen.Wait(2000)
        local tree = GetClosestObjectOfType(GetEntityCoords(PlayerPedId()), 10.0, GetHashKey('test_tree_cedar_trunk_001'), 0, 1, 1)
        print(tostring(tree))
    end
end)--]]