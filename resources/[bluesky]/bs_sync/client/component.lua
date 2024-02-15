local _currentWeather = 'EXTRASUNNY'
local _weatherState = _currentWeather
local _timeState = 0
local _timeOffset = 0
local _freezeState = false
local _blackoutState = false
local _running = false
local _timer = 0
local _isTransitioning = false

AddEventHandler('Sync:Shared:DependencyUpdate', RetrieveComponents)
AddEventHandler('Core:Shared:Ready', function()
    exports['bs_base']:RequestDependencies('Sync', {'Callbacks', 'Logger', 'Sync'}, function(error)
        if #error > 0 then return end
        RetrieveComponents()
    end)
end)


AddEventHandler('Characters:Client:Spawn', function()
    Sync:Start()
end)


AddEventHandler('Characters:Client:Logout', function()
    Sync:Stop()
end)


AddEventHandler('Proxy:Shared:RegisterReady', function()
    exports['bs_base']:RegisterComponent('Sync', SYNC)
end)


local SYNC = {
    Start = function(self)
        if _running then return end
        Callbacks:ServerCallback('Sync:GetState', {}, function(weather, blackout, base, offset, freeze)
            _running = true
            _currentWeather = weather
            _blackoutState = blackout
            _timeState = base
            _timeOffset = offset
            _freezeState = freeze
            SetRainFxIntensity(-1.0)
            Logger:Trace('Sync', 'Starting Sync')
            StartSyncThreads()
        end)
    end,

    Stop = function(self)
        if not _running then return end
        Logger:Trace('Sync', 'Stopping Sync')
        _running = false
        Citizen.CreateThread(function()
            while not _running do
                SetRainFxIntensity(0.0)
                SetWeatherTypePersist('EXTRASUNNY')
                SetWeatherTypeNow('EXTRASUNNY')
                SetWeatherTypeNowPersist('EXTRASUNNY')
                NetworkOverrideClockTime(23, 0, 0)
                Citizen.Wait(5000)
            end
        end)
    end
}

function RetrieveComponents()
    Callbacks = exports['bs_base']:FetchComponent('Callbacks')
    Logger = exports['bs_base']:FetchComponent('Logger')
    Sync = exports['bs_base']:FetchComponent('Sync')
end

function StartSyncThreads()
    Citizen.CreateThread(function()
        while _running do
            local newBaseTime = _timeState
            if GetGameTimer() - 500 > _timer then
                newBaseTime = newBaseTime + 0.25
                _timer = GetGameTimer()
            end
            if _freezeState then
                _timeOffset = _timeOffset + _timeState - newBaseTime
            end
            _timeState = newBaseTime
            local hour = math.floor(((_timeState + _timeOffset) / 60) % 24)
            local minute = math.floor((_timeState + _timeOffset) % 60)
            NetworkOverrideClockTime(hour, minute, 0)
            Citizen.Wait(2000)
        end
    end)

    Citizen.CreateThread(function()
        while _running do
            if _weatherState ~= _currentWeather and not _isTransitioning then
                _isTransitioning = true
                _weatherState = _currentWeather
                ClearOverrideWeather()
                ClearWeatherTypePersist()
                SetWeatherTypeOvertimePersist(_weatherState, 12.0)
                Citizen.Wait(12000)
                _isTransitioning = false
            end
            Citizen.Wait(100)
            SetBlackout(_blackoutState)
            SetWeatherTypePersist(_weatherState)
            SetWeatherTypeNow(_weatherState)
            SetWeatherTypeNowPersist(_weatherState)
            if _weatherState == 'XMAS' then
                SetForceVehicleTrails(true)
                SetForcePedFootstepsTracks(true)
            else
                SetForceVehicleTrails(false)
                SetForcePedFootstepsTracks(false)
            end
        end
    end)
end
