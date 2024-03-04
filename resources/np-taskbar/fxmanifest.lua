fx_version 'bodacious'
games { 'rdr3', 'gta5' }

ui_page "web/dist/index.html"
files {
  "web/dist/*",
  "web/dist/index.html",
  "web/dist/assets/*",

}
client_script {
  "client.lua",
}

export "taskBar"
export "closeGuiFail"