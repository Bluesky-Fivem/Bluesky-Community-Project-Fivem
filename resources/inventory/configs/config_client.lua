Config.Client = {}

Config.Client.Clothings = {
    ["top"] = {
		Drawable = 11,
        DatabaseName = "torso2",
        TypeItem = "components",
		Table = { Male = 15, Female = 74},
		Emote = {Dict = "clothingtie", Anim = "try_tie_negative_a", Move = 51, Dur = 1200}
	},
    ["shirts"] = {
		Drawable = 8,
        DatabaseName = "t-shirt",
        TypeItem = "components",
		Table = { Male = 15, Female = 15},
		Emote = {Dict = "clothingtie", Anim = "try_tie_negative_a", Move = 51, Dur = 1200}
	},
    ["pants"] = {
        Drawable = 4,
        DatabaseName = "pants",
        TypeItem = "components",
		Table = {Male = 61, Female = 14},
		Emote = {Dict = "re@construction", Anim = "out_of_breath", Move = 51, Dur = 1300}
    },
    ["bag"] = {
        Drawable = 5,
        DatabaseName = "bag",
        TypeItem = "components",
		Table = {Male = 0, Female = 0},
		Emote = {Dict = "clothingtie", Anim = "try_tie_negative_a", Move = 51, Dur = 1200}
    },
    ["shoes"] = {
		Drawable = 6,
        DatabaseName = "shoes",
        TypeItem = "components",
		Table = {Male = 34, Female = 35},
		Emote = {Dict = "random@domestic", Anim = "pickup_low", Move = 0, Dur = 1200}
	},
    ["mask"] = {
		Drawable = 1,
        DatabaseName = "mask",
        TypeItem = "components",
		Table = {Male = 0, Female = 0 },
		Emote = {Dict = "mp_masks@standard_car@ds@", Anim = "put_on_mask", Move = 51, Dur = 800}
	},
    ["armor"] = {
		Drawable = 9,
        DatabaseName = "vest",
        TypeItem = "components",
		Table = {Male = 0, Female = 0 },
		Emote = {Dict = "mp_masks@standard_car@ds@", Anim = "put_on_mask", Move = 51, Dur = 800}
	},
    ["gloves"] = {
		Drawable = 3,
        DatabaseName = "arms",
		Table = {Male = 15, Female = 15},
        DrawableCheck = {Male = 15, Female = 15},
        TypeItem = "components",
		Emote = {Dict = "nmt_3_rcm-10", Anim = "cs_nigel_dual-10", Move = 51, Dur = 1200}
	},
    ["hat"] = {
		Prop = 0,
        DatabaseName = "hat",
        TypeItem = "props",
		Emote = {Dict = "mp_masks@standard_car@ds@", Anim = "put_on_mask", Move = 51, Dur = 600},
	},
    ["ear"] = {
		Prop = 2,
        DatabaseName = "ear",
        TypeItem = "props",
		Emote = {Dict = "mp_cp_stolen_tut", Anim = "b_think", Move = 51, Dur = 900},
	},
    ["watch"] = {
		Prop = 6,
        DatabaseName = "watch",
        TypeItem = "props",
		Emote = {Dict = "nmt_3_rcm-10", Anim = "cs_nigel_dual-10", Move = 51, Dur = 1200},
	},
    ["glasses"] = {
		Prop = 1,
        DatabaseName = "glass",
        TypeItem = "props",
		Emote = {Dict = "clothingspecs", Anim = "take_off", Move = 51, Dur = 1400},
	},
    ["bracelet"] = {
		Prop = 7,
        DatabaseName = "bracelet",
        TypeItem = "props",
		Emote = {Dict = "nmt_3_rcm-10", Anim = "cs_nigel_dual-10", Move = 51, Dur = 1200},
	},
}