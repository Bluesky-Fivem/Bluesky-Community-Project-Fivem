fx_version 'cerulean'
game 'gta5'

lua54 'yes'

description 'LquenS made inventory system'
version '1.0.0'

shared_scripts {
    "configs/config.lua",
    "configs/config_items.lua",
}

server_scripts {
    'configs/config_server.lua',
    'server/main.lua',
    'server/functions.lua',
    'server/decay.lua',
    'server/commands.lua',
    'server/items-convert.lua',
    'server/transfer-items.lua',
}

client_scripts {
    'configs/config_client.lua',
    'client/main.lua',
    'client/functions.lua',
    'client/itemsback.lua',
}

ui_page {
    'web/ui.html'
}

files {
    'configs/config.js',
    'web/ui.html',
    'web/main.js',
    'web/*.css',
    'web/images/*.png',
    'web/svg/*.png',
	'web/images/*.jpg',
    'web/sounds/*.mp3',
    'web/sounds/*.ogg',

    "module/*.js",
    "module/animation/tracks/*.js",
    "module/animation/*.js",
    "module/audio/*js",
    "module/cameras/*.js",
    "module/core/*.js",
    "module/extras/core/*.js",
    "module/extras/curves/*.js",
    "module/extras/objects/*.js",
    "module/extras/*.js",
    "module/geometries/*.js",
    "module/helpers/*.js",
    "module/lights/*.js",
    "module/loaders/*.js",
    "module/materials/*.js",
    "module/math/interpolants/*.js",
    "module/math/*.js",
    "module/objects/*.js",
    "module/renderers/shaders/*.js",
    "module/renderers/shaders/ShaderChunk/*.js",
    "module/renderers/shaders/ShaderLib/*.js",
    "module/renderers/webgl/*.js",
    "module/renderers/webvr/*.js",
    "module/renderers/*.js",
    "module/scenes/*.js",
    "module/textures/*.js",
    "script.js",
}

escrow_ignore {
    'server/decay.lua',
    'server/items-convert.lua',
    'server/transfer-items.lua',
    'server/commands.lua',
    
    'client/functions.lua',
    'client/itemsback.lua',

    'configs/config.lua',
	'configs/config_client.lua',
	'configs/config_server.lua',
	'configs/config_items.lua',
}