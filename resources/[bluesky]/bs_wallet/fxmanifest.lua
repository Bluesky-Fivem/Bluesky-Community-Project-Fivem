fx_version 'cerulean'
game 'gta5'

server_only 'yes'

server_script("@oxmysql/lib/MySQL.lua")

server_scripts {

    'server/sv_*.lua',
}

shared_scripts {
    'shared/sh_*.lua',
}
