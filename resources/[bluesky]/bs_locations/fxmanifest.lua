fx_version 'bodacious'

game 'gta5'

server_script("@oxmysql/lib/MySQL.lua")

client_scripts {
    'client/*.lua',
}
shared_script 'config.lua'

server_scripts {
    'server/*.lua',
}