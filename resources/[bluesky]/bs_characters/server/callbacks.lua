AddEventHandler('Characters:Shared:DependencyUpdate', RetrieveComponents)
function RetrieveComponents()
    Middleware = exports['bs_base']:FetchComponent('Middleware')
    Callbacks = exports['bs_base']:FetchComponent('Callbacks')
    DataStore = exports['bs_base']:FetchComponent('DataStore')
    Logger = exports['bs_base']:FetchComponent('Logger')
    Fetch = exports['bs_base']:FetchComponent('Fetch')
    Logger = exports['bs_base']:FetchComponent('Logger')
    Chat = exports['bs_base']:FetchComponent('Chat')
    AlzarIsAPrickCauseHeDoesStupidThings = exports['bs_base']:FetchComponent('Config')
    RegisterCommands()
end

AddEventHandler('Core:Shared:Ready', function()
    exports['bs_base']:RequestDependencies('Characters', {
        'Callbacks',
        'Middleware',
        'DataStore',
        'Logger',
        'Fetch',
        'Logger',
        'Chat',
        'Config',
    }, function(error)
        if #error > 0 then return end -- Do something to handle if not all dependencies loaded
        RetrieveComponents()
        RegisterCallbacks()
        RegisterMiddleware()
        Startup()
    end)
end)

RegisterNetEvent('Characters:Server:StoreUpdate')
AddEventHandler('Characters:Server:StoreUpdate', function()
    local src = source
    local char = Fetch:Source(src):GetData('Character')

    if char ~= nil then
        local data = char:GetData() 
    end
end)

function RegisterCallbacks()
    Callbacks:RegisterServerCallback('Characters:GetServerData', function(source, data, cb)
        local motd = GetConvar('motd', 'Welcome to Blue Sky!')
        local query = "SELECT * FROM changelogs ORDER BY date DESC LIMIT 1"
        
        -- Assuming you have established a MySQL connection
        MySQL.Async.fetchAll(query, {}, function(results)
            if results and #results > 0 then
                cb({ changelog = results[1], motd = motd })
            else
                cb({ changelog = nil, motd = motd })
            end
        end)
    end)

    Callbacks:RegisterServerCallback('Characters:GetCharacters', function(source, data, cb)
        local player = Fetch:Source(source)
        local playerId = player:GetData('Identifier')
        
        
        local query = "SELECT * FROM characters WHERE User = @userId"
        local params = {['@userId'] = playerId}
        
        -- Assuming you have established a MySQL connection
        MySQL.Async.fetchAll(query, params, function(results)
            if not results then cb(nil) return end
            local cData = {}
            for _, v in ipairs(results) do
                table.insert(cData, {
                    ID = v.ID,
                    First = v.First,
                    Last = v.Last,
                    Phone = v.Phone,
                    DOB = v.DOB,
                    Gender = v.Gender,
                    LastPlayed = v.LastPlayed,
                    Job = v.Job
                })
            end
            player:SetData('Characters', cData)
            cb(cData)
        
        end)
    end)
    

    Callbacks:RegisterServerCallback('Characters:CreateCharacter', function(source, data, cb)
        local player = Fetch:Source(source)
        local pNumber = GeneratePhoneNumber()
        
        -- Function to check if phone number is in use
        local function IsNumberInUse(number)
            local query = "SELECT * FROM characters WHERE Phone = @phone"
            local params = {['@phone'] = number}
    
            -- Assuming you have established a MySQL connection
            local result = MySQL.Sync.fetchAll(query, params)
            return #result > 0
        end
    
        while IsNumberInUse(pNumber) do
            pNumber = GeneratePhoneNumber()
        end
    
        local doc = {
            User = player:GetData('Identifier'),
            First = data.first,
            Last = data.last,
            Phone = pNumber,
            Gender = tonumber(data.gender),
            Bio = data.bio,
            DOB = data.dob,
            LastPlayed = -1,
            Job = json.encode(AlzarIsAPrickCauseHeDoesStupidThings.DefaultJob),
            Armor = 100,
            HP = 200,
            Admin = 'user'
        }
        
        local query = "INSERT INTO characters ( User, First, Last, Phone, Gender, Bio, DOB, LastPlayed, Job, Armor, HP, Admin) VALUES ( @User,  @First, @Last, @Phone, @Gender, @Bio, @DOB, @LastPlayed, @Job, @Armor, @HP, @Admin)"
        local params = {
    
            ['@User'] = doc.User,
            ['@First'] = doc.First,
            ['@Last'] = doc.Last,
            ['@Phone'] = doc.Phone,
            ['@Gender'] = doc.Gender,
            ['@Bio'] = doc.Bio,
            ['@DOB'] = doc.DOB,
            ['@LastPlayed'] = doc.LastPlayed,
            ['@Job'] = doc.Job,
            ['@Armor'] = doc.Armor,
            ['@HP'] = doc.HP,
            ['@Admin'] = doc.Admin
        }
        
        local id = MySQL.insert.await(query, params)
        if not id then
            cb(nil)
            return
        end
        doc.ID = id
        TriggerEvent('Characters:Server:CharacterCreated', id)
        cb(doc)
    end)
    

    Callbacks:RegisterServerCallback('Characters:DeleteCharacter', function(source, data, cb)
        local player = Fetch:Source(source)
        local userId = player:GetData('ID')
    
        local function DeleteCharacter(characterId)
            local query = "DELETE FROM characters WHERE User = @userId AND _id = @characterId"
            local params = {
                ['@userId'] = userId,
                ['@characterId'] = characterId
            }
    
            -- Assuming you have established a MySQL connection
            MySQL.Sync.execute(query, params, function(rowsDeleted)
                if rowsDeleted > 0 then
                    TriggerEvent('Characters:Server:CharacterDeleted', characterId)
                    cb(true)
                else
                    cb(false)
                end
            end)
        end
    
        local query = "SELECT * FROM characters WHERE User = @userId AND _id = @characterId"
        local params = {
            ['@userId'] = userId,
            ['@characterId'] = data
        }
    
        -- Assuming you have established a MySQL connection
        MySQL.Async.fetchAll(query, params, function(results)
            if results and #results > 0 then
                local characterId = results[1]._id
                DeleteCharacter(characterId)
            else
                cb(false)
            end
        end)
    end)
    

    Callbacks:RegisterServerCallback('Characters:GetSpawnPoints', function(source, data, cb)
        local player = Fetch:Source(source)
        local userId = player:GetData('Identifier')
    
        local function GetSpawnPoints(characterId)
            local query = "SELECT LastPlayed FROM characters WHERE User = @userId"
            local params = {
                ['@userId'] = userId,
            }
    
            -- Assuming you have established a MySQL connection
            MySQL.Async.fetchAll(query, params, function(results)
                if results and #results > 0 then
                    if results[1].LastPlayed == -1 then
                        cb({ Config.NewSpawn })
                    else
                        cb(Spawns)
                    end
                else
                    cb(nil)
                end
            end)
        end
    
        GetSpawnPoints(data)
    end)
    

    Callbacks:RegisterServerCallback('Characters:GetCharacterData', function(source, data, cb)
        local player = Fetch:Source(source)
        local userId = player:GetData('Identifier')
        local id = player:GetData('ID')
    
        local function UpdateLastPlayed(characterId)
            local query = "UPDATE characters SET LastPlayed = @currentTime WHERE _id = @userId"
            local params = {
                ['@currentTime'] = os.time() * 1000,
                ['@userId'] = id,
            }
    
            -- Assuming you have established a MySQL connection
            MySQL.Sync.execute(query, params, function(rowsUpdated)
                if rowsUpdated > 0 then
                    Fetch:Source(source).SetData("Character", cData)
                    cb(cData)
                else
                    cb(nil)
                end
            end)
        end
    
        local function GetCharacterData(characterId)
            local query = "SELECT * FROM characters WHERE User = @userId"
            local params = {
                ['@userId'] = userId,
                
            }
    
            -- Assuming you have established a MySQL connection
            MySQL.Async.fetchAll(query, params, function(results)
                if results and #results > 0 then
                    local cData = results[1]
                    cData.Source = source
                    cData.ID = cData._id
                    cData._id = nil
                    cData.Job = json.decode(cData.Job) or {}
                    cData.skin = json.decode(cData.skin) or {}
                    cData.Cash = cData.Cash
                    cData.Bank = cData.Bank
                    player:SetData('Character', DataStore:CreateStore(source, 'Character', cData))
                    UpdateLastPlayed(characterId)
                    cb(cData)
                else
                    cb(nil)
                end
            end)
        end
    
        GetCharacterData(data)
    end)
    

    Callbacks:RegisterServerCallback('Characters:Logout', function(source, data, cb)
        local player = Fetch:Source(source)
        Middleware:TriggerEvent('Characters:Logout', source)
        player:SetData('Character', nil)
        cb('ok')
        TriggerClientEvent('Characters:Client:Logout', source)
    end)
end

function RegisterMiddleware() 

    Middleware:Add("Characters:Spawning", function(source)
		TriggerClientEvent("Characters:Client:Spawned", source)
	end, 100000)

    Middleware:Add('Characters:Logout', function(source)
        local player = Fetch:Source(source)
        if player ~= nil then
            local char = player:GetData('Character')
            if char ~= nil then
                StoreData(player:GetData('ID'), char)
            end
        end
    end, 10000)

    Middleware:Add('playerDropped', function(source, message)
        local player = Fetch:Source(source)
        if player ~= nil then
            local char = player:GetData('Character')
            if char ~= nil then
                StoreData(player:GetData('ID'), char)
            end
        end
    end, 10000)
end

function IsNumberInUse(number)
    local var = nil

    local query = "SELECT * FROM characters WHERE phone = @number"
    local params = {
        ['@number'] = number
    }

    -- Assuming you have established a MySQL connection
    MySQL.Async.fetchAll(query, params, function(results)
        if results then
            var = #results > 0
        else
            var = true -- Indicate an error occurred
        end
    end)

    while var == nil do
        Citizen.Wait(10)
    end

    return var
end


function GeneratePhoneNumber()
    local areaCode = math.random(50) > 25 and 415 or 628
    local numBase2 = math.random(100,999)
    local numBase3 = math.random(1000,9999)

    return string.format('%s%s%s', areaCode, numBase2, numBase3)
end

RegisterServerEvent('Characters:Server:Spawning', function()
    Middleware:TriggerEvent("Characters:Spawning", source)
end)