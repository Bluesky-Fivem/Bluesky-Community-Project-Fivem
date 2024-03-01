fx_version 'cerulean'
game 'gta5'

lua54 'yes'

ui_page 'http://localhost:5000'


--ui_page 'web/public/index.html'

files {
    'web/public/**/*'
}

client_scripts {
    'config.lua',
    'client/*.lua',
}

server_scripts {
    'config.lua',
    'sv_config.lua',
    'server/*.lua',
}