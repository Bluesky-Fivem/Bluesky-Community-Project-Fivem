function RegisterCallbacks()
    Callbacks:RegisterServerCallback('Commands:ValidateAdmin', function(source, data, cb)
        local player = exports['bs_base']:FetchComponent('Fetch'):Source(source)
        if player:GetData('Roles') == 'dev' then
            cb(true)
        else
            exports['bs_base']:FetchComponent('Logger'):Log('Commands', ('%s attempted to use an admin command but failed Admin Validation.'):format(player:GetData('Identifier')), {
                console = true,
                file = true,
                database = true,
                discord = {
                    type = 'error'
                }
            })
        end
    end)
end

RegisterCommand('test', function(source)
    local player = exports['bs_base']:FetchComponent('Fetch'):Source(source)
    local roles = player:GetData('Roles')
    print(roles)
end)
