AddEventHandler('Phone:Shared:DependencyUpdate', RetrieveComponents)
function RetrieveComponents()
    Fetch = exports["bs_base"]:FetchComponent("Fetch")
    Callbacks = exports['bs_base']:FetchComponent('Callbacks')
    Chat = exports['bs_base']:FetchComponent('Chat')
end

AddEventHandler('Core:Shared:Ready', function()
    exports['bs_base']:RequestDependencies('Phone', {
        'Fetch',
        'Callbacks',
        'Chat',
    }, function(error)
        if #error > 0 then return end -- Do something to handle if not all dependencies loaded
        RetrieveComponents()
        RegisterCallbacks()
        RegisterChatCommands()
    end)
end)