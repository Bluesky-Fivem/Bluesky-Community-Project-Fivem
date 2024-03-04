fx_version "cerulean"

description "NoProblem - Phone"
author "Sharlock"
version '0.0.1'

lua54 'yes'

game "gta5"

ui_page 'web/build/index.html'


client_scripts {
  "@bs_rpc/client/cl_main.lua",
  "client/cl_*.lua"
}

server_scripts {
  "@bs_rpc/server/sv_main.lua",
  "server/sv_*.lua"
}

files {
  'web/build/index.html',
  'web/build/**/*'
}