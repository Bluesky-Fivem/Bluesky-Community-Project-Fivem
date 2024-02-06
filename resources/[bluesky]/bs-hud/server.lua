AddEventHandler('Hud:Shared:DependencyUpdate', RetrieveComponents)
function RetrieveComponents()
    Callbacks = exports['bs_base']:FetchComponent('Callbacks')

end

AddEventHandler('Core:Shared:Ready', function()
    exports['bs_base']:RequestDependencies('Hud', {
        'Callbacks',
    }, function(error)
        if #error > 0 then return end -- Do something to handle if not all dependencies loaded
        RetrieveComponents()
        RegisterCallbacks()
    end)
end)

function RegisterCallbacks()
    Callbacks:RegisterServerCallback('hud:server:getMenu', function(_, cb)
        cb(Config.Menu)
    end)
end
