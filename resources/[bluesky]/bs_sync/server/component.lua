AvailableWeatherTypes = {
    'EXTRASUNNY',
    'CLEAR',
    'NEUTRAL',
    'SMOG',
    'FOGGY',
    'OVERCAST',
    'CLOUDS',
    'CLEARING',
    'RAIN',
    'THUNDER',
    'SNOW',
    'BLIZZARD',
    'SNOWLIGHT',
    'XMAS',
    'HALLOWEEN',
}

AvailableTimeTypes = {
    'MORNING',
    'NOON',
    'EVENING',
    'NIGHT',
}

local _weather = "EXTRASUNNY"
local _isDynamic = true
local _time = 0
local _timeOffset = 0
local _freezeState = false
local _blackoutState = false
local _temperature = 25 
local _windSpeed = 10

AddEventHandler('Sync:Shared:DependencyUpdate', RetrieveComponents)

function RetrieveComponents()
    Logger = exports['bs_base']:FetchComponent('Logger')
    Callbacks = exports['bs_base']:FetchComponent('Callbacks')
    Chat = exports['bs_base']:FetchComponent('Chat')
    Sync = exports['bs_base']:FetchComponent('Sync')
    RegisterChatCommands()
    StartThreads()
end

AddEventHandler('Core:Shared:Ready', function()
    exports['bs_base']:RequestDependencies('Sync', {
        'Callbacks',
        'Fetch',
        'Utils',
        'Chat',
    }, function(error)
        if #error > 0 then return end 
        RetrieveComponents()
        RegisterCallbacks()
    end)
end)

function RegisterCallbacks()
    Callbacks:RegisterServerCallback('Sync:GetState', function(source, data, cb)
        cb(_weather, _blackoutState, _time, _timeOffset, _freezeState, _temperature, _windSpeed)
    end)
end

local started = false
function StartThreads()
    if started then return end
    Logger:Trace("Sync", "Started Time and Weather Sync Threads", { console = true })
    started = true

    Citizen.CreateThread(function()
        while true do
            Citizen.Wait(1000)
            TriggerClientEvent('Sync:Client:Time', -1, _time, _timeOffset)
        end
    end)

    Citizen.CreateThread(function()
        while true do
            Citizen.Wait(8000)
            TriggerClientEvent('Sync:Client:Weather', -1, _weather, _temperature, _windSpeed)
        end
    end)

    Citizen.CreateThread(function()
        while Sync == nil do
            Citizen.Wait(10)
        end

        Sync:NextWeatherStage()

        while true do
            Citizen.Wait(1800000) 
            if _isDynamic then
                Sync:NextWeatherStage()
            end
        end
    end)
end

SYNC = {
    Set = {
        Freeze = function(self, element)
            if element == 'weather' then
                _isDynamic = not _isDynamic
                if not _isDynamic then
                    Chat.Send.System:All('Dynamic weather changes are now disabled')
                else
                    Chat.Send.System:All('Dynamic weather changes are now enabled')
                end
            else
                _freezeState = not _freezeState
                if _freezeState then
                    Chat.Send.System:All('Time is now frozen')
                else
                    Chat.Send.System:All('Time is no longer frozen')
                end
            end
        end,
        Blackout = function(self)
            _blackoutState = not _blackoutState
            if _blackoutState then
                Chat.Send.System:All('Blackout Is Now Enabled')
            else
                Chat.Send.System:All('Blackout Is Now Disabled')
            end
            TriggerClientEvent('Sync:Client:Blackout', -1, _blackoutState)
        end,
        Weather = function(self, type)
            _weather = string.upper(type)
            Chat.Send.System:All('Weather set to ' .. type)
            TriggerClientEvent('Sync:Client:Weather', -1, _weather, _temperature, _windSpeed)
        end,
        Time = function(self, type)
            if type:upper() == AvailableTimeTypes[1] then
                ShiftToMinute(0)
                ShiftToHour(9)
                Chat.Send.System:All('Time is now morning')
            elseif type:upper() == AvailableTimeTypes[2] then
                ShiftToMinute(0)
                ShiftToHour(12)
                Chat.Send.System:All('Time is now noon')
            elseif type:upper() == AvailableTimeTypes[3] then
                ShiftToMinute(0)
                ShiftToHour(18)
                Chat.Send.System:All('Time is now evening')
            else
                ShiftToMinute(0)
                ShiftToHour(23)
                Chat.Send.System:All('Time is now night')
            end

            TriggerClientEvent('Sync:Client:Time', -1, _time, _timeOffset)
        end,
        ExactTime = function(self, hour, minute)
            local argh = tonumber(hour)
            local argm = tonumber(minute)
            if argh < 24 then
                ShiftToHour(argh)
            else
                ShiftToHour(0)
            end
            if argm < 60 then
                ShiftToMinute(argm)
            else
                ShiftToMinute(0)
            end
            local newtime = math.floor(((_time + _timeOffset) / 60) % 24) .. ":"
            local minute = math.floor((_time + _timeOffset) % 60)
            if minute < 10 then
                newtime = newtime .. "0" .. minute
            else
                newtime = newtime .. minute
            end

            Chat.Send.System:All('Time was changed to: ' .. newtime)
            TriggerClientEvent('Sync:Client:Time', -1, _time, _timeOffset)
        end,
        Temperature = function(self, temp)
            _temperature = temp
            Chat.Send.System:All('Temperature set to ' .. temp .. '°C')
            TriggerClientEvent('Sync:Client:Weather', -1, _weather, _temperature, _windSpeed)
        end,
        WindSpeed = function(self, speed)
            _windSpeed = speed
            Chat.Send.System:All('Wind speed set to ' .. speed .. ' m/s')
            TriggerClientEvent('Sync:Client:Weather', -1, _weather, _temperature, _windSpeed)
        end,
    },
    NextWeatherStage = function(self)
        if _weather == "CLEAR" or _weather == "CLOUDS" or _weather == "EXTRASUNNY" then
            local newWeather = math.random(1, 2)
            if newWeather == 1 then
                _weather = "CLEARING"
            else
                _weather = "OVERCAST"
            end
        elseif _weather == "CLEARING" or _weather == "OVERCAST" then
            local newWeather = math.random(1, 6)
            if newWeather == 1 then
                if _weather == "CLEARING" then _weather = "FOGGY" else _weather = "RAIN" end
            elseif newWeather == 2 then
                _weather = "CLOUDS"
            elseif newWeather == 3 then
                _weather = "CLEAR"
            elseif newWeather == 4 then
                _weather = "EXTRASUNNY"
            elseif newWeather == 5 then
                _weather = "SMOG"
            else
                _weather = "FOGGY"
            end
        elseif _weather == "THUNDER" or _weather == "RAIN" then
            _weather = "CLEARING"
        elseif _weather == "SMOG" or _weather == "FOGGY" then
            _weather = "CLEAR"
        end

        UpdateTemperatureAndWindSpeed()

        Logger:Info('Sync', 'Weather Updated: ^5' .. _weather .. '^7', { console = true })
        TriggerClientEvent('Sync:Client:Weather', -1, _weather, _temperature, _windSpeed)
    end,
}

function UpdateTemperatureAndWindSpeed()
    if _weather == "EXTRASUNNY" then
        _temperature = 30
        _windSpeed = 5
    elseif _weather == "CLEAR" then
        _temperature = 25
        _windSpeed = 7
    elseif _weather == "CLOUDS" then
        _temperature = 20
        _windSpeed = 10
    elseif _weather == "OVERCAST" then
        _temperature = 18
        _windSpeed = 12
    elseif _weather == "RAIN" or _weather == "THUNDER" then
        _temperature = 15
        _windSpeed = 15
    elseif _weather == "FOGGY" then
        _temperature = 12
        _windSpeed = 5
    elseif _weather == "SNOW" or _weather == "BLIZZARD" or _weather == "SNOWLIGHT" then
        _temperature = 0
        _windSpeed = 20
    elseif _weather == "XMAS" or _weather == "HALLOWEEN" then
        _temperature = 10
        _windSpeed = 10
    else
        _temperature = 25 
        _windSpeed = 10 
    end
end

AddEventHandler('Proxy:Shared:RegisterReady', function(component)
    exports['bs_base']:RegisterComponent('Sync', SYNC)
end)

function ShiftToMinute(minute)
    _timeOffset = _timeOffset - (((_time + _timeOffset) % 60) - minute)
end

function ShiftToHour(hour)
    _timeOffset = _timeOffset - ((((_time + _timeOffset) / 60) % 24) - hour) * 60
end

Citizen.CreateThread(function()
    while true do
        Citizen.Wait(1000)
        local newBaseTime = os.time(os.date("!*t")) / 2 + 360
        if _freezeState then
            _timeOffset = _timeOffset + _time - newBaseTime
        end
        _time = newBaseTime
    end
end)

function AnnounceWeatherInfo(source, args)
    local hour = math.floor(((_time + _timeOffset) / 60) % 24)
    local minute = math.floor((_time + _timeOffset) % 60)
    local timeString = string.format("%02d:%02d", hour, minute)
    local message = string.format("Current weather: %s, Temperature %s°C, Wind Speed %sm/s, Time %s", _weather, _temperature, _windSpeed, timeString)
    TriggerClientEvent('chat:addMessage', source, { args = { '^*Weather Info^r', message }, color = { 255, 255, 255 } })
end

function AnnounceWeatherInfoOnJoin(playerId)
    AnnounceWeatherInfo(playerId, nil)
end

AddEventHandler('onResourceStart', function(resourceName)
    if GetCurrentResourceName() == resourceName then
        RegisterChatCommands()
    end
end)

function RegisterChatCommands()
    RegisterCommand('weatheri', function(source, args)
        AnnounceWeatherInfo(source, args)
    end, false)
end

RegisterNetEvent('Characters:Server:Spawn')
AddEventHandler('Characters:Server:Spawn', function()
    print('nigga')
    local playerId = source
    AnnounceWeatherInfoOnJoin(playerId)
end)
