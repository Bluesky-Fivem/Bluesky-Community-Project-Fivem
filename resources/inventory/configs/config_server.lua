Config.Server = {}

Config.FirstMessage = true

CreateThread(function ()
    Wait(1500)
    local version = GetResourceMetadata(GetCurrentResourceName(), 'version')
    if version == "1.0.0" and Config.FirstMessage then
        print("Thank you for purchasing ^3" .. GetCurrentResourceName() .. "^7.")
        print("Since this version is a ^3release edition^7, there may be ^3unnoticed errors.^7")
        print("If you encounter any ^3issues^7 and are able to ^2report them to us^7, we will work at full speed to address and fixed them in the ^3as soon as possible!^7")
        print("^2We appreciate your support!^7")
        Wait(500)
        print('This message will sent ^3every server start^7. It will deleted at ^3first update^7, if this ^1annoying^7. Please disable ^3Config.FirstMessage^7 from ^3"configs/config_server.lua"^7')
    end
end)