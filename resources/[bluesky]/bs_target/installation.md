---
description: AC Target Installation Document
---

# Installation

## How to use ?


## Adding Circle Zone
```lua
exports['bs_target']:circleZone("name", vector3(x, y, z), radius, {
    name = "name",
    useZ = bool,
    debugPoly = bool
}, {
    options = {
        {
            event = "eventname",
            parms = "string or table",
            icon = "fas fa icon",
            label = "label",
            item = 'itemname', -- if there is no item check delete it.
            action = function(entity) -- if you're using event parameter delete this functions
                if IsPedAPlayer(entity) then
                    TriggerEvent('your-event')
                end
            end,
            canInteract = function(entity) -- this is checking if you can interact with your function
                if true then return false end
            end,
            job = 'string, table or all',
            gang = 'gangname',
            citizenid = 'XXXXX123'
        }
    },
    distance = 3.5
})
```

## Adding Box Zone
```lua
exports['bs_target']:boxZone("name", vector3(x, y, z), length, width, {
    name = "name",
    heading = number,
    debugPoly = bool,
    minZ = number,
    maxZ = number
}, {
    options = {
        {
            event = "eventname",
            parms = "string or table",
            icon = "fas fa icon",
            label = "label",
            item = 'itemname', -- if there is no item check delete it.
            action = function(entity) -- if you're using event parameter delete this functions
                if IsPedAPlayer(entity) then
                    TriggerEvent('your-event')
                end
            end,
            canInteract = function(entity) -- this is checking if you can interact with your function
                if true then return false end
            end,
            job = 'string, table or all',
            gang = 'gangname',
            citizenid = 'XXXXX123'
        }
    },
    distance = 3.5
})
```

## Adding Poly Zone
```lua
exports['bs_target']:polyZone("name", {
    vector2(x, y),
    vector2(x, y),
    vector2(x, y),
    vector2(x, y)
}, {
    name = "name",
    debugPoly= bool,
    minZ= number,
    maxZ= number
}, {
    options = {
        {
            event = "eventname",
            parms = "string or table",
            icon = "fas fa icon",
            label = "label",
            item = 'itemname', -- if there is no item check delete it.
            action = function(entity) -- if you're using event parameter delete this functions
                if IsPedAPlayer(entity) then
                    TriggerEvent('your-event')
                end
            end,
            canInteract = function(entity) -- this is checking if you can interact with your function
                if true then return false end
            end,
            job = 'string, table or all',
            gang = 'gangname',
            citizenid = 'XXXXX123'
        }
    },
    distance = 3.5
})
```

## Adding Entity Zone
```lua
exports['bs_target']:entityZone("name", entity, { 
    name = "name", 
    debugPoly = bool,
    minZ = number,
    maxZ = number, 
}, {
    options = {
        {
            event = "eventname",
            parms = "string or table",
            icon = "fas fa icon",
            label = "label",
            item = 'itemname', -- if there is no item check delete it.
            action = function(entity) -- if you're using event parameter delete this functions
                if IsPedAPlayer(entity) then
                    TriggerEvent('your-event')
                end
            end,
            canInteract = function(entity) -- this is checking if you can interact with your function
                if true then return false end
            end,
            job = 'string, table or all',
            gang = 'gangname',
            citizenid = 'XXXXX123'
        }
    },
    distance = 2.5,
})
```

## Removing Zones
```lua
exports['bs_target']:removeZone("name")
```

## Adding Entity
```lua
exports['bs_target']:targetEntity(entity, {
    options = {
        {
            event = "eventname",
            parms = "string or table",
            icon = "fas fa icon",
            label = "label",
            item = 'itemname', -- if there is no item check delete it.
            action = function(entity) -- if you're using event parameter delete this functions
                if IsPedAPlayer(entity) then
                    TriggerEvent('your-event')
                end
            end,
            canInteract = function(entity) -- this is checking if you can interact with your function
                if true then return false end
            end,
            job = 'string, table or all',
            gang = 'gangname',
            citizenid = 'XXXXX123'
        }
    },
    distance = 2.5
})
```

## Removing Entity
```lua
exports['bs_target']:removeTEntity(entity, 'name')
```

## Adding Model
```lua
exports['bs_target']:targetModel(hash, {
    options = {
        { 
            event = "eventname",
            parms = "string or table",
            icon = "fas fa icon",
            label = "label",
            item = 'itemname', -- if there is no item check delete it.
            action = function(entity) -- if you're using event parameter delete this functions
                if IsPedAPlayer(entity) then
                    TriggerEvent('your-event')
                end
            end,
            canInteract = function(entity) -- this is checking if you can interact with your function
                if true then return false end
            end,
            job = 'string, table or all',
            gang = 'gangname',
            citizenid = 'XXXXX123'
        }
    },
    distance = 2.5
})
```

## Removing Model
```lua
exports['bs_target']:RemoveTargetModel(hash, 'label')
```