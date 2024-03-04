AddEventHandler('Phone:Shared:DependencyUpdate', RetrieveComponents)
function RetrieveComponents()
    Fetch = exports["bs_base"]:FetchComponent("Fetch")
    Callbacks = exports['bs_base']:FetchComponent('Callbacks')
    Wallet = exports['bs_base']:FetchComponent('Wallet')
    
end

AddEventHandler('Core:Shared:Ready', function()
    exports['bs_base']:RequestDependencies('Phone', {
        'Fetch',
        'Callbacks',
        'Wallet'
    }, function(error)
        if #error > 0 then return end -- Do something to handle if not all dependencies loaded
        RetrieveComponents()
    end)
end)


Citizen.CreateThread(function()
    local deleteEmails = Await(SQL.execute("DELETE FROM character_emails", {}))
    local deleteTwitter = Await(SQL.execute("DELETE FROM phone_tweets", {}))
    local deleteYp = Await(SQL.execute("DELETE FROM phone_yp", {}))
end)