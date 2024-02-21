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

DoesCidExist = function(source, cid)
    local player = exports['bs_base']:FetchComponent('Fetch'):Source(source)
    local char = player:GetData('Character')
    return #exports.oxmysql:executeSync("SELECT 1 FROM characters WHERE `_id`=:id LIMIT 1", { id = char:GetData('ID') }) > 0
end

exports('doesCidExist', function(...) -- exports['bs_base']:doesCidExist(cid)
	return DoesCidExist(...)
end) 
