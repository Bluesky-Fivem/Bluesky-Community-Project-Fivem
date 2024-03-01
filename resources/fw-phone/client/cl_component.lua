AddEventHandler('Phone:Shared:DependencyUpdate', RetrieveComponents)
function RetrieveComponents()
    Callbacks = exports['bs_base']:FetchComponent('Callbacks')
    Notification = exports["bs_base"]:FetchComponent("Notification")
    Keybinds = exports["bs_base"]:FetchComponent("Keybinds")
end

AddEventHandler('Core:Shared:Ready', function()
    exports['bs_base']:RequestDependencies('Phone', {
        'Callbacks',
        "Notification",
        'Keybinds'
    }, function(error)  
        if #error > 0 then return; end
        RetrieveComponents()
        RegisterKeybinds()
    end)
end)