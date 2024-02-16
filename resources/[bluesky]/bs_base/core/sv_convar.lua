COMPONENTS.Convar = {}
Citizen.CreateThread(function()
    COMPONENTS.Convar = {
        MDT_API_ADDRESS = { key = 'mdt_api_address', value = GetConvar('mdt_api_address', 'CONVAR_DEFAULT'), stop = true },
        API_ADDRESS = { key = 'api_address', value = GetConvar('api_address', 'CONVAR_DEFAULT'), stop = true },
        API_TOKEN = { key = 'api_token', value = GetConvar('api_token', 'CONVAR_DEFAULT'), stop = true },
        BOT_TOKEN = { key = 'discord_bot_token', value = GetConvar('discord_bot_token', 'CONVAR_DEFAULT'), stop = true },
        LOGGING = { value = GetConvarInt('log_level', 0), key = 'log_level', stop = false },
        RRP_VERSION = { value = GetConvar('rrp_version', "UNKNOWN"), key = 'rrp_version', stop = false }
    }
end)

AddEventHandler('Core:Shared:Watermark', function()
    for k, v in pairs(COMPONENTS.Convar) do
        if v.value == 'CONVAR_DEFAULT' then
            COMPONENTS.Logger:Error('Convar', 'Missing Convar ' .. v.key, {
                console = true,
                file = true,
            })

            if v.stop then
                COMPONENTS.Core:Shutdown('Missing Convar ' .. v.key)
                return
            end
        end
    end

    TriggerEvent('Core:Server:StartupReady')
end)