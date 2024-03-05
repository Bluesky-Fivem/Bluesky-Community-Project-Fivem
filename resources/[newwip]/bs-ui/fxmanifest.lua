fx_version 'cerulean'
game 'gta5'

ui_page 'web/dist/index.html'
files {
    'web/dist/**/*'
}

client_scripts {
    '@PolyZone/client.lua',
	'@PolyZone/BoxZone.lua',
    'config/sh_*.lua',
    'client/*.lua',
}

server_scripts {
    'config/*.lua',
    'server/*.lua'
}

exports {
    'HideHud',
    'OpenMenu',
    'OpenInput',
    'RemoveInfo',
    'ImportEyeData',
    'ForceStopSkill',
    'StartSkillTest',
    'StartBlocksGame',
    'OpenPoliceTablet',
    'OpenEPD',
    'OpenPoliceFinger',
    'GetEntityPlayerIsLookingAt',
    'RayCastGamePlayCamera',
}