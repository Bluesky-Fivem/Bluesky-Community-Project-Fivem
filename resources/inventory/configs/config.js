Config = {}

Config.Clothing = true

Config.Rarity = {
    0: {
        label: "Common",
        visibleOnRarity: false,
    },
    1: {
        label: "Uncommon",
        visibleOnRarity: false,
    },
    2: {
        label: "Rare",
        visibleOnRarity: true,
    },
    3: {
        label: "Epic",
        visibleOnRarity: true,
        background: "#de00ca"
    },
    4: {
        label: "Legendary",
        visibleOnRarity: true,
        background: "#ff9c00"
    }
}

Config.Filters = {
    "medical": [
        "bandage",
        "painkillers",
        "ifaks",
        "firstaid",
        "walkstick",
    ],
    "weapons": [
        // Searchs by type first
        "weapon_heavysniper",
        "weapon_navyrevolver",
        "weapon_revolver_mk2",
        "weapon_carbinerifle",
        "weapon_machete",
        "weapon_dagger",
        "weapon_knife",
        "weapon_molotov",
        "weapon_sawnoffshotgun",
        "weapon_wrench",
        "weapon_railgun",
        "weapon_battleaxe",
        "weapon_smg_mk2",
        "weapon_hatchet",
        "weapon_appistol",
        "weapon_musket",
        "weapon_garbagebag",
        "weapon_raycarbine",
        "weapon_heavysniper_mk2",
        "weapon_compactrifle",
        "weapon_combatmg_mk2",
        "weapon_hammer",
        "weapon_pumpshotgun",
        "weapon_remotesniper",
        "weapon_poolcue",
        "weapon_doubleaction",
        "weapon_switchblade",
        "weapon_microsmg",
        "weapon_combatpdw",
        "weapon_briefcase",
        "weapon_unarmed",
        "weapon_snspistol",
        "weapon_ceramicpistol",
        "weapon_raypistol",
        "weapon_rpg",
        "weapon_flaregun",
        "weapon_assaultsmg",
        "weapon_grenadelauncher",
        "weapon_dbshotgun",
        "weapon_grenadelauncher_smoke",
        "weapon_petrolcan",
        "weapon_flare",
        "weapon_snspistol_mk2",
        "weapon_pistol",
        "weapon_combatpistol",
        "weapon_ball",
        "weapon_compactlauncher",
        "weapon_snowball",
        "weapon_proxmine",
        "weapon_pistolxm3",
        "weapon_stickybomb",
        "weapon_bzgas",
        "weapon_smokegrenade",
        "weapon_rayminigun",
        "weapon_pipebomb",
        "weapon_hazardcan",
        "weapon_flashlight",
        "weapon_candycane",
        "weapon_machinepistol",
        "weapon_railgunxm3",
        "weapon_bullpuprifle",
        "weapon_firework",
        "weapon_minigun",
        "weapon_fireextinguisher",
        "weapon_minismg",
        "weapon_hominglauncher",
        "weapon_marksmanrifle_mk2",
        "weapon_marksmanrifle",
        "weapon_stone_hatchet",
        "weapon_sniperrifle",
        "weapon_gusenberg",
        "weapon_combatmg",
        "weapon_golfclub",
        "weapon_pistol50",
        "weapon_autoshotgun",
        "weapon_knuckle",
        "weapon_militaryrifle",
        "weapon_crowbar",
        "weapon_bullpuprifle_mk2",
        "weapon_gadgetpistol",
        "weapon_specialcarbine_mk2",
        "weapon_vintagepistol",
        "weapon_specialcarbine",
        "weapon_advancedrifle",
        "weapon_briefcase_02",
        "weapon_carbinerifle_mk2",
        "weapon_bat",
        "weapon_stungun",
        "weapon_combatshotgun",
        "weapon_assaultrifle_mk2",
        "weapon_smg",
        "weapon_bottle",
        "weapon_handcuffs",
        "weapon_assaultrifle",
        "weapon_bread",
        "weapon_pumpshotgun_mk2",
        "weapon_mg",
        "weapon_heavyshotgun",
        "weapon_grenade",
        "weapon_assaultshotgun",
        "weapon_revolver",
        "weapon_nightstick",
        "weapon_marksmanpistol",
        "weapon_heavypistol",
        "weapon_bullpupshotgun",
        "weapon_pistol_mk2",

        "pistol_ammo",
        "shotgun_ammo",
        "smg_ammo",
        "rifle_ammo",
        "mg_ammo",
        "snp_ammo",
        "emp_ammo",

        "heavypistol_grip",
        "bullpuprifle_defaultclip",
        "advancedrifle_luxuryfinish",
        "sawnoffshotgun_luxuryfinish",
        "specialcarbine_extendedclip",
        "machinepistol_defaultclip",
        "pistol50_luxuryfinish",
        "pistol50_defaultclip",
        "carbinerifle_scope",
        "smg_luxuryfinish",
        "vintagepistol_extendedclip",
        "pistol_flashlight",
        "heavypistol_defaultclip",
        "combatpistol_extendedclip",
        "minismg_extendedclip",
        "bullpuprifle_luxuryfinish",
        "weapontint_green",
        "sniper_scope",
        "microsmg_extendedclip",
        "appistol_defaultclip",
        "carbinerifle_luxuryfinish",
        "snipermax_scope",
        "combatpdw_defaultclip",
        "marksmanrifle_luxuryfinish",
        "appistol_luxuryfinish",
        "compactrifle_drum",
        "combatpistol_defaultclip",
        "rifle_suppressor",
        "pistol_defaultclip",
        "pistol50_extendedclip",
        "microsmg_defaultclip",
        "combatpistol_luxuryfinish",
        "heavyshotgun_drum",
        "combatpdw_grip",
        "heavyshotgun_extendedclip",
        "vintagepistol_defaultclip",
        "snspistol_defaultclip",
        "weapontint_plat",
        "heavypistol_extendedclip",
        "specialcarbine_defaultclip",
        "weapontint_lspd",
        "weapontint_army",
        "weapontint_pink",
        "marksmanrifle_defaultclip",
        "sniper_grip",
        "weapontint_gold",
        "smg_defaultclip",
        "combatpdw_drum",
        "specialcarbine_drum",
        "machinepistol_drum",
        "marksmanrifle_extendedclip",
        "assaultsmg_defaultclip",
        "microsmg_scope",
        "smg_suppressor",
        "compactrifle_extendedclip",
        "sniperrifle_defaultclip",
        "appistol_extendedclip",
        "gusenberg_extendedclip",
        "gusenberg_defaultclip",
        "pistol_suppressor",
        "heavysniper_defaultclip",
        "minismg_defaultclip",
        "assaultshotgun_extendedclip",
        "pistol_extendedclip",
        "revolver_vipvariant",
        "smg_extendedclip",
        "combatpdw_extendedclip",
        "pistol_luxuryfinish",
        "specialcarbine_luxuryfinish",
        "weapontint_black",
        "revolver_bodyguardvariant",
        "advancedrifle_defaultclip",
        "weapontint_orange",
        "advancedrifle_extendedclip",
        "compactrifle_defaultclip",
        "pumpshotgun_luxuryfinish",
        "snspistol_grip",
        "assaultrifle_luxuryfinish",
        "carbinerifle_drum",
        "rifle_flashlight",
        "assaultrifle_drum",
        "bullpuprifle_extendedclip",
        "assaultrifle_defaultclip",
        "smg_scope",
        "combatpdw_scope",
        "assaultrifle_extendedclip",
        "assaultshotgun_defaultclip",
        "carbinerifle_extendedclip",
        "snspistol_extendedclip",
        "shotgun_suppressor",
        "marksmanrifle_scope",
        "machinepistol_extendedclip",
        "rifle_grip",
        "assaultsmg_luxuryfinish",
        "assaultsmg_extendedclip",
        "microsmg_luxuryfinish",
        "heavyshotgun_defaultclip",
        "smg_drum",
        "revolver_defaultclip",
        "carbinerifle_defaultclip",

    ],
    "foods": [
        "tosti",
        "twerks_candy",
        "snikkel_candy",
        "sandwich",
        "water_bottle",
        "coffee",
        "kurkakola",
        "beer",
        "whiskey",
        "vodka",
        "grape",
        "wine",
        "grapejuice"
    ],
    "clothing": [
        "top",
        "pants",
        "bag",
        "shoes",
        "hat",
        "mask",
        "gloves",
        "shirt",
        "ear",
        "watch",
        "glasses",
        "bracelet",
        "armor",
    ]
}

Config.ItemsByIcons = {
    "medical": {
        icon: `<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
        <path d="M1.5 7.5C0.671573 7.5 0 6.82843 0 6C0 5.17157 0.671573 4.5 1.5 4.5H4.5V1.5C4.5 0.671573 5.17157 0 6 0C6.82843 0 7.5 0.671573 7.5 1.5V4.5H10.5C11.3284 4.5 12 5.17157 12 6C12 6.82843 11.3284 7.5 10.5 7.5H7.5V10.5C7.5 11.3284 6.82843 12 6 12C5.17157 12 4.5 11.3284 4.5 10.5V7.5H1.5Z" fill="url(#paint0_linear_48_122)"/>
        <defs>
        <linearGradient id="paint0_linear_48_122" x1="6" y1="0" x2="6" y2="12" gradientUnits="userSpaceOnUse">
        <stop stop-color="white"/>
        <stop offset="0.0001" stop-color="white" stop-opacity="0.5"/>
        <stop offset="1" stop-color="#D9D9D9" stop-opacity="0.5"/>
        </linearGradient>
        </defs>
        </svg>`,
        items: Config.Filters["medical"]
    },
    "foods": {
        icon: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="14" viewBox="0 0 16 14" fill="none">
        <path d="M10.8 14L9.6 3.88889H11.384L10.48 0.357778L11.872 0L12.872 3.88889H16L14.8 14H10.8ZM2.4 6.22222H6.4C7.03652 6.22222 7.64697 6.46805 8.09706 6.90564C8.54714 7.34322 8.8 7.93672 8.8 8.55556H0C0 7.93672 0.252856 7.34322 0.702944 6.90564C1.15303 6.46805 1.76348 6.22222 2.4 6.22222ZM8.8 11.6667C8.8 12.2855 8.54714 12.879 8.09706 13.3166C7.64697 13.7542 7.03652 14 6.4 14H2.4C1.76348 14 1.15303 13.7542 0.702944 13.3166C0.252856 12.879 0 12.2855 0 11.6667H8.8ZM0.8 9.33333H4.8L6 10.5L7.2 9.33333H8C8.21217 9.33333 8.41566 9.41528 8.56568 9.56114C8.71571 9.707 8.8 9.90483 8.8 10.1111C8.8 10.3174 8.71571 10.5152 8.56568 10.6611C8.41566 10.8069 8.21217 10.8889 8 10.8889H0.8C0.587827 10.8889 0.384344 10.8069 0.234314 10.6611C0.0842854 10.5152 4.97281e-09 10.3174 0 10.1111C0 9.90483 0.0842854 9.707 0.234314 9.56114C0.384344 9.41528 0.587827 9.33333 0.8 9.33333Z" fill="white" fill-opacity="0.5"/>
        </svg>`,
        items: Config.Filters["foods"]
    },
    "weapons": {
        icon: '',
        items: Config.Filters["weapons"]
    },
    "clothing": {
        icon: '<i class="fa-solid fa-shirt"></i>',
        items: Config.Filters["clothing"]
    },
}

Config.Language = {
    "tooltip_card": "Tooltip Card",
    "use": "Use",
    "give": "Give",
    "clothing": '<i class="fa-solid fa-shirt"></i>',
    "settings":  '<i class="fa-solid fa-gear"></i>',

    // Inventory Settings \\
    "change_background_color": "Background Color",
    "change_health_color": "Health Color",
    "change_armor_color": "Armor Color",

    "clothing_inventory": "Clothing",

    "ruined": "Ruined",

    
    "add": "Received",
    "remove": "Removed",
    "used": "Used",

    "change_sounds": "Inventory Sounds",

    "true": "Active",
    "false": "Disable",

    "craft_item": "Craft Item",
    "crafting_item_label": "Crafting",

    "ingredients": "Costs",

    "crafting_status": "Crafting...",

    "inventory_design": "Inventory Design",

    "default": "Default",
    "type_2": "More Lighter",
    "type_3": "More Sharper",

    "amount": "Amount",

    "craft_info_time": "This item will be generated in <b>10</b> seconds",
    "crafting_history": "Crafting History",

    "auto": "Auto",
    "select_to_craft": "Select an item from crafting screen to craft!",
    "waiting_craft_item": "Waiting for item to craft...",



    "warning": "Warning!",
    "inventory_design_warning": "Inventory design will be changed!\n In this action, inventory will reloaded!\nYou'll lost all clothing items!\nDo you want to continue?",
    "accept": "Accept",
    "cancel": "Cancel",

    "you": "Yourself"
}

Config.InventoryIcons = {
    "player": "fa-solid fa-user",
    "trunk": "fa-solid fa-box-open",
    "glovebox": "fa-solid fa-folder-open",
    "drop": "fa-regular fa-trash-can",

    "stash": "fa-solid fa-briefcase",
    "traphouse": "fa-solid fa-briefcase",

    "crafting": "fa-solid fa-screwdriver-wrench", 
    "shop": "fa-solid fa-cart-shopping",

    "clothing": "fa-solid fa-person",

}

Config.InventoryClothings = [
    "shoes", "pants", "armor", "bracelet", "gloves", "watch", "bag", "glasses", "top", "ear", "mask", "hat"
]

const createInfo = (item) => {
    let info = ""
    if (item.info.quality) {
        if (100/4 > item.info.quality) {
            color = "rgb(238, 41, 21)";
        } else if (100/2.5 > item.info.quality) {
            color = "rgb(192, 57, 43)";
        } else if (100/2 > item.info.quality) {
            color = "rgb(230, 126, 34)";
        } else if(100/1.5 > item.info.quality) {
            color = "rgb(141, 159, 34)";
        } else if(100/1.2 > item.info.quality) {
            color = "rgb(172, 209, 35)";
        } else {
            color = "rgb(39, 174, 96)";
        }

        info += `<div class="item-durability-bar">
            <div class="item-durability-bar-current" style="height: ${item.info.quality.toFixed(2)}%; ${getSettingsData("inventory_design") == "default" && `
            background: ${color};
            box-shadow:
                0 0 .4vh ${color},
                0 0 .8vh ${color},
                0 0 1.2vh ${color};
            `}"></div>
        </div>`
    }
    else if (item.info.quality == 0) {
        color = "black"
        info += `<div class="item-durability-bar">
            <div class="item-durability-bar-current" style="height: 100%;
            background: ${color};
            ${getSettingsData("inventory_design") == "default" && `box-shadow:
                0 0 .4vh ${color},
                0 0 .8vh ${color},
                0 0 1.2vh ${color};`}

            "></div>
        </div>`    
    }

    return info
}

const createTooltipInfo = (item, inventoryItem) => {
    let info = `
    <div class="tooltip-top">
        <div class="tooltip-image-parent"  ${inventorySettingsData != "default" ? `style="background: ${item.color}"` : ""}>
            <img src="images/${getItemImage(allItems[item.name])}" class="tooltip-image"></img>
        </div>
        <div class="tooltip-label">
            <span class="tooltip-label-span" style='--coloritem: ${rgb2hex(allItems[item.name].color)}'>
            ${ inventorySettingsData == "default" ? `<span class="tooltip-label-span-inner">${item.label}</span>` : item.label } ${allItems[item.name].rarity != undefined && Config.Rarity[allItems[item.name].rarity] != undefined && Config.Rarity[allItems[item.name].rarity].visibleOnRarity && inventorySettingsData != "default" ? `
                <b class="rarity-${inventorySettingsData}" style="--colorrarity: ${Config.Rarity[allItems[item.name].rarity].background}">
                ${Config.Rarity[allItems[item.name].rarity].label}
                </b>
            ` : ""} 
            ${inventorySettingsData != "default" ? `
            ${item.price != undefined && inventoryItem.inventoryType == "shop" ? `
            <b class="item-price-tooltip">
                <span>$${item.price}</span> ${((item.amount*item.weight)/1000).toFixed(1)}${weightSVG}
            </b>` : `
            <b class="item-price-tooltip">
                ${((item.amount*item.weight)/1000).toFixed(1)}${weightSVG}
            </b>`}</span>
            ` : ""}

            ${allItems[item.name].description != undefined && allItems[item.name].description.length > 0 ? `<div class="tooltip-desc"> ${allItems[item.name].description} </div>` : "" }
        </div>
    </div>
    <span class="tooltip-card">${Config.Language["tooltip_card"]}</span>`

    if (item.info.quality) {
        if (100/4 > item.info.quality) {
            color = "rgb(238, 41, 21)";
        } else if (100/2.5 > item.info.quality) {
            color = "rgb(192, 57, 43)";
        } else if (100/2 > item.info.quality) {
            color = "rgb(230, 126, 34)";
        } else if(100/1.5 > item.info.quality) {
            color = "rgb(141, 159, 34)";
        } else if(100/1.2 > item.info.quality) {
            color = "rgb(172, 209, 35)";
        } else {
            color = "rgb(39, 174, 96)";
        }
        
        info += `<div class="tooltip-durability-bar">
            <div class="tooltip-durability-bar-current" style="width: ${item.info.quality}%; background: ${color};"></div>
            <span class="tooltip-durability-count">${item.info.quality.toFixed(2)}/100</span>
        </div>`
    } else if ( item.info.quality == 0 ) {
        info += `<div class="tooltip-durability-bar">
            <div class="tooltip-durability-bar-current" style="width: 100%; background: black;"></div>
            <span class="tooltip-durability-count">${Config.Language["ruined"]}</span>
        </div>`
    }

    if ( item.info.attachments && inventorySettingsData != "default" ) {
        info += `<div class="tooltip-attachments">`
        $.each(item.info.attachments, (key, value) => {
            info += `<div class="tooltip-item"><img src="images/${value.image}"></div>`
        })
        info += `</div>`
    }

    if (item.costs != undefined && inventorySettingsData == "default") {
        info += '<div class="tooltip-craft-cost">'
        $.each(item.costs, (key, cost) => {
            let costItem = allItems[key]
            info += `
            <div class="tooltip-craft-item">
                <img src="images/${getItemImage(costItem)}">
                <span class="tooltip-craft-amount">${costItem.label} <b>x${cost}</b></span>
            </div>
            `
        })
        info += '</div>'
    }

    return info
}
