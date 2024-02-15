function RegisterChatCommands()
    -- Command to freeze weather or time
    Chat:RegisterAdminCommand('freeze', function(source, args, rawCommand)
        local arg = args[1]:lower()
        if arg == 'weather' or arg == 'time' then
            Sync.Set:Freeze(arg)
        else
            Chat.Send.Server:Single(source, 'Invalid Argument')
        end
    end, {
        help = 'Freeze Weather or Time',
        params = {
            { name = 'Type', help = 'Weather or Time' }
        }
    }, 1)

    -- Command to set weather
    Chat:RegisterAdminCommand('weather', function(source, args, rawCommand)
        local arg = args[1]:upper()
        if AvailableWeatherTypes[arg] then
            Sync.Set:Weather(arg)
        else
            Chat.Send.Server:Single(source, 'Invalid Argument')
        end
    end, {
        help = 'Set Weather',
        params = {
            { name = 'Type', help = 'Weather type' }
        }
    }, 1)

    -- Command to set time
    Chat:RegisterAdminCommand('time', function(source, args, rawCommand)
        local arg = args[1]:upper()
        if AvailableTimeTypes[arg] then
            Sync.Set:Time(arg)
        else
            Chat.Send.Server:Single(source, 'Invalid Argument')
        end
    end, {
        help = 'Set Time',
        params = {
            { name = 'Type', help = 'Time of day' }
        }
    }, 1)

    -- Command to set exact time
    Chat:RegisterAdminCommand('clock', function(source, args, rawCommand)
        local hour, minute = tonumber(args[1]), tonumber(args[2])
        if hour and minute and hour >= 0 and hour <= 23 and minute >= 0 and minute <= 59 then
            Sync.Set:ExactTime(hour, minute)
        else
            Chat.Send.Server:Single(source, 'Invalid Argument')
        end
    end, {
        help = 'Set Time To An Exact Hour & Minute',
        params = {
            { name = 'Hour', help = 'Number Between 0 - 23' },
            { name = 'Minute', help = 'Number Between 0 - 59' }
        }
    }, 2)

    -- Command to toggle blackout
    Chat:RegisterAdminCommand('blackout', function(source, args, rawCommand)
        Sync:ToggleBlackout()
    end, {
        help = 'Toggle Blackout'
    }, 0)
end
