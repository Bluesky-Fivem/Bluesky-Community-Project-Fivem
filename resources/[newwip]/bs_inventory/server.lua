
AddEventHandler('Inventory:Shared:DependencyUpdate', RetrieveComponents)
function RetrieveComponents()
    Callbacks = exports['bs_base']:FetchComponent('Callbacks')
    Wallet = exports['bs_base']:FetchComponent('Wallet')
    Chat = exports['bs_base']:FetchComponent("Chat")

end

AddEventHandler('Core:Shared:Ready', function()
    exports['bs_base']:RequestDependencies('Inventory', {
        'Callbacks',
        'Wallet',
        'Chat'
    }, function(error)
        if #error > 0 then return end -- Do something to handle if not all dependencies loaded
        RetrieveComponents()
        RegisterCallbacks()
        RegisterChatCommands()
    end)
end)

function RegisterCallbacks()
    Callbacks:RegisterServerCallback('Inventory:Data', function(Source, data, cb)
        local Player = exports['bs_base']:FetchComponent('Fetch'):Source(Source)
        local Char = Player:GetData('Character')
        local someData = {
            citizenId = Char:GetData("ID"),
            cash = Char:GetData('Cash')          
        }
        cb(someData)
    end)

end

function RegisterChatCommands()
    Chat:RegisterAdminCommand("giveitem", function(source, args, rawCommand)
        TriggerClientEvent('player:receiveItem', source, args[1], args[2])
    end, {
        help = "Give Yourself A Item",
        params = {
            {
                name = "Item Name",
                help = "Amount To Give",
            },
        },
    },2)
end

RegisterServerEvent("cash:remove")
AddEventHandler("cash:remove", function(pSource, pAmount)
    local src = pSource
    local Player = exports['bs_base']:FetchComponent('Fetch'):Source(pSource)
    local Char = Player:GetData('Character')

    Wallet:Modify(pSource, -pAmount)
end)
