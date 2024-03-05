Config = Config or {}
Config.DoingSkill = false

-- Eye
--[[
    Here"s a example on how to place a interaction on a specific "bone".
    You actually can"t place it on the bone directly, but by checking the distance of the ped and the bone you will get a fairly accurate result.
    (Full bonelist: bs-ui/bonelist.md)

    Enabled = function(Entity)
        if GetBoneDistanceFromVehicle(2, "wheel_lr") < 1.0 then
            return true
        else
            return false
        end
    end,

    A great example of this bone checking usage would be checking the `wheel_lr` for showing the fuel option, then a player actually has to be at the fuel tank to fuel the car.
]]

--[[
    EntityTypes:
    0 = no entity
    1 = ped
    2 = vehicle
    3 = object
]]

exports("GetPeekingEntity", function()
    return PeekingEntity
end)

function GetBoneDistanceFromVehicle(EntityType, BoneName)
    if PeekingEntity ~= nil and DoesEntityExist(PeekingEntity) then
        if GetEntityType(PeekingEntity) == EntityType then
            local Bone = GetEntityBoneIndexByName(PeekingEntity, BoneName)
        
            local BoneCoords = GetWorldPositionOfEntityBone(PeekingEntity, Bone)
            local PlayerCoords = GetEntityCoords(PlayerPedId())
        
            return #(BoneCoords - PlayerCoords)
        end
    end

    return 99999.0
end

Config.EyeEntries = {
    ["peds"] = {
        Type = "Default",
        SpriteDistance = 0.0,
        State = false,
        Options = {
            {
                Name = "sell_meth",
                Icon = "fas fa-comment-dollar",
                Label = "Sell Meth",
                EventType = "Client",
                EventName = "fw-misc:Client:CorneringSale",
                EventParams = {},
                Enabled = function(Entity)
                    if IsPedDeadOrDying(Entity) then
                        return false
                    end

                    return exports['fw-misc']:IsCorneringActive() and exports['fw-misc']:IsCorneringPed(Entity)
                end,
            },
        },
    },
    ["vehicles"] = {
        Type = "Default",
        SpriteDistance = 0.0,
        State = false,
        Options = {
            {
                Name = 'enter_trunk',
                Label = 'Enter Trunk',
                Icon = 'fas fa-user-secret',
                EventType = 'Client',
                EventName = ':client:getin:trunk',
                EventParams = {},
                Enabled = function(Entity)
                    return GetBoneDistanceFromVehicle(2, "bumper_r") < 2.0 and (GetVehicleDoorAngleRatio(Entity, 5) > 0.0 or IsVehicleDoorDamaged(Entity, 5))
                end,
            },
            {
                Name = 'open_trunk',
                Label = 'Open Trunk',
                Icon = 'fas fa-truck-loading',
                EventType = 'Client',
                EventName = 'fw-inventory:Client:OpenTrunk',
                EventParams = {},
                Enabled = function(Entity)
                    return GetBoneDistanceFromVehicle(2, "bumper_r") < 2.0 and GetVehicleDoorLockStatus(Entity) ~= 2
                end,
            },

            {
                Name = 'pickup_bicycle',
                Label = 'Pick up bike',
                Icon = 'fas fa-spinner',
                EventType = 'Client',
                EventName = 'fw-vehicles:client:carry:bicycle',
                EventParams = {},
                Enabled = function(Entity)
                    return IsThisModelABicycle(GetEntityModel(Entity)) and not IsEntityAttachedToAnyPed(Entity) and not IsEntityAttachedToAnyPed(PlayerPedId())
                end,
            },
            
        }
    },
    ["motorcycle"] = {
        Type = "Default",
        SpriteDistance = 0.0,
        State = false,
        Options = {
            {
                Name = 'steal_rim',
                Label = 'Steal Rim',
                Icon = 'fas fa-cog',
                EventType = 'Client',
                EventName = 'fw-vehicles:Client:StealRim',
                EventParams = {},
                Enabled = function(Entity)
                    if not exports['fw-inventory']:HasEnoughOfItem('screwdriver', 1) then
                        return false
                    end

                    if GetBoneDistanceFromVehicle(2, "wheel_lf") < 1.0 then
                        return true
                    end

                    if GetBoneDistanceFromVehicle(2, "wheel_rf") < 1.0 then
                        return true
                    end

                    if GetBoneDistanceFromVehicle(2, "wheel_lr") < 1.0 then
                        return true
                    end

                    if GetBoneDistanceFromVehicle(2, "wheel_rr") < 1.0 then
                        return true
                    end
                end,
            },
        }
    },
    ["watercraft"] = {
        Type = "Default",
        SpriteDistance = 0.0,
        State = false,
        Options = {
            
        }
    },
    ["aircraft"] = {
        Type = "Default",
        SpriteDistance = 0.0,
        State = false,
        Options = {
            
        }
    },
    ["train"] = { -- why not xd
        Type = "Default",
        SpriteDistance = 0.0,
        State = false,
        Options = {}
    },
}