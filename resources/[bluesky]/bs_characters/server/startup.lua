Spawns = {}

local _ran = false

function Startup()
    if _ran then return end

    local query = "SELECT * FROM locations WHERE Type = 'spawn'"

    -- Assuming you have established a MySQL connection
    MySQL.Async.fetchAll(query, {}, function(results)
        if results then
            Logger:Trace('Characters', 'Loaded ^5' .. #results .. '^7 Spawn Locations', { console = true })

            Spawns = {}
            table.insert(Spawns, Config.NewSpawn)
            for _, v in ipairs(results) do
                local spawn = {
                    label = v.Name,
                    location = { x = v.x, y = v.y, z = v.z, h = v.h }
                }
                table.insert(Spawns, spawn)
            end
            _ran = true
        else
            -- Handle error
        end
    end)
end


AddEventHandler('Locations:Server:Added', function(type, location)
    if type == 'spawn' then
        table.insert(Spawns, {
            label = location.Name,
            location = { x = location.Coords.x, y = location.Coords.y, z = location.Coords.z, h = location.Coords.h }
        })
        Logger:Info('Characters', 'New Spawn Point Created: ^5' .. location.Name, { console = true })
    end
end)