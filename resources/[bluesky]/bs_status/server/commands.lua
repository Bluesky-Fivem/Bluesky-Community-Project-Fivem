function RegisterChatCommands()
    Chat:RegisterAdminCommand('reset', function(source, args, rawCommand)
        TriggerClientEvent('Status:Client:Reset', source, true)
    end, {
        help = 'Reset Statuses',
    }, 0)
end