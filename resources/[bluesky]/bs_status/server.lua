local players = {}
local playerLoaded = true


RegisterServerEvent('statusLoad', function()
    Player(source).state.food = 100
    Player(source).state.water = 100
    Player(source).state.needs = {hunger = 100, thirst =  100}
end)

function updateFoodWater()
    local players = GetPlayers()
    if playerLoaded == nil then return end
    for i=1, #players do
        local playerId = players[i]
        local plyState = Player(playerId).state
        local food = plyState.food
        local water = plyState.water
        plyState.food = math.max(0, math.min(100, food - Config.FoodDecreaseAmount)) or 0
        plyState.water = math.max(0, math.min(100, water - Config.WaterDecreaseAmount)) or 0
        plyState.needs = {hunger = plyState.food, thirst =  plyState.water}
        if Player(playerId).state.food == 0 or Player(playerId).state.water == 0 then
            TriggerClientEvent('HealthTick', playerId)
        end
    end
end

RegisterServerEvent('ModifyNeeds', function( foodDelta, waterDelta)
    local food = Player(source).state.food
    local water = Player(source).state.water
    local plyState = Player(source).state
    plyState.food = math.max(0, math.min(100, food + foodDelta ))
    plyState.water = math.max(0, math.min(100, water + waterDelta ))
 
end)

local function foodWaterLoop()
    while true do
        Wait(Config.TickRate * 60000)
        updateFoodWater()
       
    end
end
foodWaterLoop()

