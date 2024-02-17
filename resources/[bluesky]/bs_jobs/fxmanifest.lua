fx_version 'bodacious'

game 'gta5'

client_scripts {
    'client/jobs.lua',
    'client/jobcenter.lua',
    'client/metalwork.lua',
    'client/mower/*.lua',
    'client/postal/*.lua',
    'client/lumberjack/*.lua',
    --'client/postaljob.lua',
}
shared_script 'config.lua'

server_scripts {
    'server/*.lua',
}