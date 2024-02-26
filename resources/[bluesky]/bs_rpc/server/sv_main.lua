local res, promises, functions, callIden = GetCurrentResourceName(), {}, {}, 0

AddEventHandler('RPC:Shared:DependencyUpdate', RetrieveComponents)
function RetrieveComponents()
    RPC = exports['bs_base']:FetchComponent('RPC')
end

AddEventHandler('Core:Shared:Ready', function()
    exports['bs_base']:RequestDependencies('RPC', {
        'RPC'
    }, function(error)  
        if #error > 0 then return; end
        RetrieveComponents()
    end)
end)

AddEventHandler('Proxy:Shared:RegisterReady', function()
    exports['bs_base']:RegisterComponent('RPC', remoteCalls)
end)

remoteCalls = {
    register = function(name, func)
        functions[name] = func
    end,

    remove = function(name)
        functions[name] = nil
    end
}

paramPacker = function(...)
    local params, pack = {...}, {}

    for i = 1, 15, 1 do
        pack[i] = {param = params[i]}
    end
    return pack
end

paramUnpacker = function(params, index)
    local idx = index or 1

    if idx <= #params then return params[idx]['param'], paramPacker(params, idx + 1) end
end

unpacker = function(params, index)
    local idx = index or 1

    if idx <= 15 then return params[idx], unpacker(params, idx + 1) end
end

clearPromise = function(callId)
    Citizen.SetTimeout(5000, function()
        promises[callId] = nil
    end)
end

RegisterNetEvent('bs_rpc:cl_request')
AddEventHandler('bs_rpc:cl_request', function(origin, name, callId, params)
    local response

    if functions[name] == nil then return end
    local success, error = pcall(function()
        if packaged then
            response = paramPacker(functions[name](paramUnpacker(params)))
        else
            response = paramPacker(functions[name](unpacker(params)))
        end
    end)

    if not success then
        print(string.format('Data Fetch Error: %s %s %s', origin, name, error))
    end

    if response == nil then response = {} end

    TriggerClientEvent('bs_rpc:cl_response', source, origin, callId, response)
end)