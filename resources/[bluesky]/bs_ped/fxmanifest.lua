fx_version 'bodacious'
games { 'gta5' }

ui_page "ui/html/index.html"

files{"ui/html/main.js","ui/html/index.html"}

server_script("@oxmysql/lib/MySQL.lua")


client_scripts {
    'config.lua',
    'utils/*.lua',
    'client/*.lua'
}

server_scripts {
	'config.lua',
    'utils/*.lua',
    'server/*.lua',
}