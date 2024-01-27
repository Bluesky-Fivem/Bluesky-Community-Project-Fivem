fx_version "cerulean"
games { 'gta5' }
ui_page 'build/index.html'
 
files {
    'build/index.html',
    'build/**/*',
    'build/**/**/*',
}

client_scripts {
    'client/ui.lua',
    'client/main.lua',
}



shared_script {
    'resource/client/**/shared/*.lua',
}