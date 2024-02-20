Config = {}

Config.Clothing = true

Config.Shared = {}

Config.Shared.Player = {
    slotSize = 50,
    maxWeight = 80, -- IN KG --
}

Config.Shared.Glovebox = {
    slotSize = 10,
    maxWeight = 20, -- IN KG --
}

--  Not Recommended --
Config.ItemsOnBack = {
    isEnabled = true,
    items  = {
        ["markedbills"] = { -- Item Name
            model="prop_money_bag_01", -- Model you want to display
            back_bone = 24818, -- PED bone the entity is attached to.
            -- Location of the model on the players back. Note this is and offset relative to the players bone coords.
            x = -0.4,
            y = -0.17,
            z = -0.12,
            -- Rotaion of the object.
            x_rotation = 0.0,
            y_rotation = 90.0,
            z_rotation = 0.0,
        },

        ["meth"] = {
            model="hei_prop_pill_bag_01", 
            back_bone = 24818,
            x = -0.1,
            y = -0.17,
            z = 0.12,
            x_rotation = 0.0,
            y_rotation = 90.0,
            z_rotation = 0.0,
        },
        
        ["weapon_smg"] = {
            model="w_sb_smg", 
            back_bone = 24818,
            x = 0.0,
            y = -0.17,
            z = -0.12,
            x_rotation = 0.0,
            y_rotation = -180.0,
            z_rotation = 180.0,
        },
        ["weapon_assaultrifle"] = {
            model="w_ar_assaultrifle",
            back_bone = 24818,
            x = 0.0,
            y = -0.17,
            z = -0.05,
            x_rotation = 0.0,
            y_rotation = -180.0,
            z_rotation = 180.0,
        },
        ["weapon_carbinerifle"] = {
            model="w_ar_carbinerifle", 
            back_bone = 24818,
            x = 0.0,
            y = -0.17,
            z = 0.08,
            x_rotation = 0.0,
            y_rotation = -180.0,
            z_rotation = 180.0,
        },
        ["weapon_rpg"] = {
            model="w_lr_rpg", 
            back_bone = 24818,
            x = 0.2,
            y = -0.17,
            z = 0.0,
            x_rotation = 0.0,
            y_rotation = 180.0,
            z_rotation = 180.0,
        },
        ["coke_brick"] = {
            model="bkr_prop_coke_cutblock_01", 
            back_bone = 24818,
            x = -0.20,
            y = -0.17,
            z = 0.0,
            x_rotation = 0.0,
            y_rotation = 90.0,
            z_rotation = 90.0,
        },
        ["weed_bud"] = {
            model="bkr_prop_weed_drying_01a", 
            back_bone = 24818,
            x = -0.20,
            y = -0.17,
            z = 0.0,
            x_rotation = 0.0,
            y_rotation = 90.0,
            z_rotation = 0.0,
        },
    }
}

-- If in ground there is 1 more than item, its spawns package ! --
Config.DropsItems = {
    isEnabled = true,
    items  = {
        ["weapon_assaultrifle"] = {
            object ="w_ar_assaultrifle",
        },  
        ["coke_brick"] = {
            object ="bkr_prop_coke_cutblock_01",
        },  
        ["meth"] = {
            object ="hei_prop_pill_bag_01",
        }, 
        ["markedbills"] = { -- Item Name
            object="prop_money_bag_01", -- Model you want to display
        },

    }
}



-- Crafting section for qb-core but can be used for esx too --
Config.RefreshDrops         = 1 -- In seconds
Config.RefreshServerDrops   = 1 -- In seconds
Config.EmptyRefresh         = 5000 -- In milisecond
Config.CraftingObject = 'prop_toolchest_05'
Config.CraftingItems = {
    [1] = {
        name = "lockpick",
        amount = 50,
        info = {},
        costs = {
            ["metalscrap"] = 22,
            ["plastic"] = 32,
        },
        type = "item",
        slot = 1,
        threshold = 0,
        points = 1,
    },
    [2] = {
        name = "screwdriverset",
        amount = 50,
        info = {},
        costs = {
            ["metalscrap"] = 30,
            ["plastic"] = 42,
        },
        type = "item",
        slot = 2,
        threshold = 0,
        points = 2,
    },
    [3] = {
        name = "electronickit",
        amount = 50,
        info = {},
        costs = {
            ["metalscrap"] = 30,
            ["plastic"] = 45,
            ["aluminum"] = 28,
        },
        type = "item",
        slot = 3,
        threshold = 0,
        points = 3,
    },
    [4] = {
        name = "radioscanner",
        amount = 50,
        info = {},
        costs = {
            ["electronickit"] = 2,
            ["plastic"] = 52,
            ["steel"] = 40,
        },
        type = "item",
        slot = 4,
        threshold = 0,
        points = 4,
    },
    [5] = {
        name = "gatecrack",
        amount = 50,
        info = {},
        costs = {
            ["metalscrap"] = 10,
            ["plastic"] = 50,
            ["aluminum"] = 30,
            ["iron"] = 17,
            ["electronickit"] = 2,
        },
        type = "item",
        slot = 5,
        threshold = 110,
        points = 5,
    },
    [6] = {
        name = "handcuffs",
        amount = 50,
        info = {},
        costs = {
            ["metalscrap"] = 36,
            ["steel"] = 24,
            ["aluminum"] = 28,
        },
        type = "item",
        slot = 6,
        threshold = 160,
        points = 6,
    },
    [7] = {
        name = "repairkit",
        amount = 50,
        info = {},
        costs = {
            ["metalscrap"] = 32,
            ["steel"] = 43,
            ["plastic"] = 61,
        },
        type = "item",
        slot = 7,
        threshold = 200,
        points = 7,
    },
    [8] = {
        name = "pistol_ammo",
        amount = 50,
        info = {},
        costs = {
            ["metalscrap"] = 50,
            ["steel"] = 37,
            ["copper"] = 26,
        },
        type = "item",
        slot = 8,
        threshold = 250,
        points = 8,
    },
    [9] = {
        name = "ironoxide",
        amount = 50,
        info = {},
        costs = {
            ["iron"] = 60,
            ["glass"] = 30,
        },
        type = "item",
        slot = 9,
        threshold = 300,
        points = 9,
    },
    [10] = {
        name = "aluminumoxide",
        amount = 50,
        info = {},
        costs = {
            ["aluminum"] = 60,
            ["glass"] = 30,
        },
        type = "item",
        slot = 10,
        threshold = 300,
        points = 10,
    },
    [11] = {
        name = "armor",
        amount = 50,
        info = {},
        costs = {
            ["iron"] = 33,
            ["steel"] = 44,
            ["plastic"] = 55,
            ["aluminum"] = 22,
        },
        type = "item",
        slot = 11,
        threshold = 350,
        points = 11,
    },
    [12] = {
        name = "drill",
        amount = 50,
        info = {},
        costs = {
            ["iron"] = 50,
            ["steel"] = 50,
            ["screwdriverset"] = 3,
            ["advancedlockpick"] = 2,
        },
        type = "item",
        slot = 12,
        threshold = 1750,
        points = 12,
    },
}


tablelength = function(T)
    local count = 0
    for _ in pairs(T) do count = count + 1 end
    return count
end
