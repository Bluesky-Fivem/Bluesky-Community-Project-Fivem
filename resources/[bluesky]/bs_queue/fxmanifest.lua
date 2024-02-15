fx_version 'bodacious'
games { 'gta5' }

server_script("@oxmysql/lib/MySQL.lua")

server_only 'yes'

server_scripts {
	'config.lua',
    'server/*.lua',
}