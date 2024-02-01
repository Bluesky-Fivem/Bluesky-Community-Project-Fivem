local function exportHandler(exportName, func)
    print(exportName)
    AddEventHandler(('__cfx_export_qb-target_%s'):format(exportName), function(setCB)
        setCB(func)
    end)
end

exportHandler('AddBoxZone', function(name, center, length, width, options, targetoptions)
    local z = center.z

    if not options.minZ then
        options.minZ = -100
    end

    if not options.maxZ then
        options.maxZ = 800
    end

    if not options.useZ then
        z = z + math.abs(options.maxZ - options.minZ) / 2
        center = vec3(center.x, center.y, z)
    end

    return exports['bs_target']:boxZone(name, center, length, width, options, targetoptions)
end)

exportHandler('AddPolyZone', function(name, points, options, targetoptions)
    return exports['bs_target']:polyZone(name, points, options, targetoptions)
end)

exportHandler('AddCircleZone', function(name, center, radius, options, targetoptions)
    return exports['bs_target']:circleZone(name, center, radius, options, targetoptions)
end)

exportHandler('RemoveZone', function(id)
    return exports['bs_target']:removeZone(id)
end)

exportHandler('AddTargetBone', function(bones, options)
    exports['bs_target']:targetBone(bones, options)
end)

exportHandler('AddTargetEntity', function(entities, options)
    exports['bs_target']:targetEntity(entities, options)
end)

exportHandler('RemoveTargetEntity', function(entities, labels)
    exports['bs_target']:removeTEntity(entities, labels)
end)

exportHandler('AddTargetModel', function(models, options)
    exports['bs_target']:targetModel(models, options)
end)

exportHandler('RemoveTargetModel', function(models, labels)
    exports['bs_target']:removeTModel(models, labels)
end)

exportHandler('AddGlobalPed', function(options)
    exports['bs_target']:globalPed(options)
end)

exportHandler('RemoveGlobalPed', function(labels)
    exports['bs_target']:RemoveGlobalPed(labels)
end)

exportHandler('AddGlobalVehicle', function(options)
    exports['bs_target']:globalVehicle(options)
end)

exportHandler('RemoveGlobalVehicle', function(labels)
    exports['bs_target']:removeGlobalVehicle(labels)
end)

exportHandler('AddGlobalObject', function(options)
    exports['bs_target']:globalObject(options)
end)

exportHandler('RemoveGlobalObject', function(labels)
    exports['bs_target']:RemoveGlobalObject(labels)
end)

exportHandler('AddGlobalPlayer', function(options)
    exports['bs_target']:globalPlayer(options)
end)

exportHandler('AddEntityZone', function(name, entity, options, targetoptions)
    exports['bs_target']:entityZone(name, entity, options, targetoptions)
end)

exportHandler('RemoveTargetBone', function(bones, labels)
    exports['bs_target']:removeTBone(bones, labels)
end)