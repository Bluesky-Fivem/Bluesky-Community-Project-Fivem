walkStyle = 'default'
facialExpression = 'default'
emoteBinds = {}


Config = {}

Config.MenuKeybind = 167 -- F6 for now
Config.CancelKeybind = 178 -- Del Key
--Config.RagdollKeybind

Config.KeybindKeys = { -- Nice and Confusing :)
    [1] = { ['id'] = 159, ['keyName'] = 'Number 6' },
    [2] = { ['id'] = 161, ['keyName'] = 'Number 7' },
    [3] = { ['id'] = 162, ['keyName'] = 'Number 8' },
    [4] = { ['id'] = 163, ['keyName'] = 'Number 9' },
}

Config.DefaultSettings = {
    ['walk'] = 'default',
    ['expression'] = 'default',
    ['emoteBinds'] = {}
}

Config.Expressions = {
    ["Angry"]         = "mood_angry_1",
    ["Drunk"]         = "mood_drunk_1",
    ["Dumb"]          = "pose_injured_1",
    ["Electrocuted"]  = "electrocuted_1",
    ["Grumpy"]        = "effort_1",
    ["Grumpy 2"]      = "mood_drivefast_1",
    ["Grumpy 3"]      = "pose_angry_1",
    ["Happy"]         = "mood_happy_1",
    ["Injured"]       = "mood_injured_1",
    ["Joyful"]        = "mood_dancing_low_1",
    ["Mouthbreather"] = "smoking_hold_1",
    ["Never Blink"]   = "pose_normal_1",
    ["One Eye"]       = "pose_aiming_1",
    ["Shocked"]       = "shocked_1",
    ["Shocked2"]      = "shocked_2",
    ["Sleeping"]      = "mood_sleeping_1",
    ["Sleeping 2"]    = "dead_1",
    ["Sleeping 3"]    = "dead_2",
    ["Smug"]          = "mood_smug_1",
    ["Speculative"]   = "mood_aiming_1",
    ["Stressed"]      = "mood_stressed_1",
    ["Sulking"]       = "mood_sulk_1",
    ["Weird"]         = "effort_2",
    ["Weird2"]        = "effort_3",
}

Config.Walks = {
    ["Alien"]          = "move_m@alien",
    ["Armored"]        = "anim_group_move_ballistic",
    ["Arrogant"]       = "move_f@arrogant@a",
    ["Brave"]          = "move_m@brave",
    ["Casual"]         = "move_m@casual@a",
    ["Casual 2"]       = "move_m@casual@b",
    ["Casual 3"]       = "move_m@casual@c",
    ["Casual 4"]       = "move_m@casual@d",
    ["Casual 5"]       = "move_m@casual@e",
    ["Casual 6"]       = "move_m@casual@f",
    ["Chichi"]         = "move_f@chichi",
    ["Confident"]      = "move_m@confident",
    ["Cop"]            = "move_m@business@a",
    ["Cop 2"]          = "move_m@business@b",
    ["Cop 3"]          = "move_m@business@c",
    ["Default Female"] = "move_f@multiplayer",
    ["Default Male"]   = "move_m@multiplayer",
    ["Drunk"]          = "move_m@drunk@a",
    ["Drunk"]          = "move_m@drunk@slightlydrunk",
    ["Drunk2"]         = "move_m@buzzed",
    ["Drunk3"]         = "move_m@drunk@verydrunk",
    ["Femme"]          = "move_f@femme@",
    ["Fire"]           = "move_characters@franklin@fire",
    ["Fire 2"]         = "move_characters@michael@fire",
    ["Fire 3"]         = "move_m@fire",
    ["Flee"]           = "move_f@flee@a",
    ["Franklin"]       = "move_p_m_one",
    ["Gangster"]       = "move_m@gangster@generic",
    ["Gangster2"]      = "move_m@gangster@ng",
    ["Gangster3"]      = "move_m@gangster@var_e",
    ["Gangster4"]      = "move_m@gangster@var_f",
    ["Gangster5"]      = "move_m@gangster@var_i",
    ["Grooving"]       = "anim@move_m@grooving@",
    ["Guard"]          = "move_m@prison_gaurd",
    ["Handcuffs"]      = "move_m@prisoner_cuffed",
    ["Heels"]          = "move_f@heels@c",
    ["Heels 2"]        = "move_f@heels@d",
    ["Hiking"]         = "move_m@hiking",
    ["Hipster"]        = "move_m@hipster@a",
    ["Hobo"]           = "move_m@hobo@a",
    ["Hurry"]          = "move_f@hurry@a",
    ["Janitor"]        = "move_p_m_zero_janitor",
    ["Janitor 2"]      = "move_p_m_zero_slow",
    ["Jog"]            = "move_m@jog@",
    ["Lemar"]          = "anim_group_move_lemar_alley",
    ["Lester"]         = "move_heist_lester",
    ["Lester 2"]       = "move_lester_caneup",
    ["Maneater"]       = "move_f@maneater",
    ["Michael"]        = "move_ped_bucket",
    ["Money"]          = "move_m@money",
    ["Muscle"]         = "move_m@muscle@a",
    ["Posh"]           = "move_m@posh@",
    ["Posh2"]          = "move_f@posh@",
    ["Quick"]          = "move_m@quick",
    ["Runner"]         = "female_fast_runner",
    ["Sad"]            = "move_m@sad@a",
    ["Sassy"]          = "move_m@sassy",
    ["Sassy 2"]        = "move_f@sassy",
    ["Scared"]         = "move_f@scared",
    ["Sexy"]           = "move_f@sexy@a",
    ["Shady"]          = "move_m@shadyped@a",
    ["Slow"]           = "move_characters@jimmy@slow@",
    ["Swagger"]        = "move_m@swagger",
    ["Tough"]          = "move_m@tough_guy@",
    ["Tough 2"]        = "move_f@tough_guy@",
    ["Trash"]          = "clipset@move@trash_fast_turn",
    ["Trash 2"]        = "missfbi4prepp1_garbageman",
    ["Trevor"]         = "move_p_m_two",
    ["Wide"]           = "move_m@bag",
}

Config.EmoteNaming = {
    ['regular'] = {
        ["idles"] = {
            ['name'] = 'Idles',
            ['emotes'] = {
                ["idle"] = "Idle",
                ["idle2"] = "Idle 2",
                ["idle3"] = "Idle 3",
                ["idle4"] = "Idle 4",
                ["idle5"] = "Idle 5",
                ["idle6"] = "Idle 6",
                ["idle7"] = "Idle 7",
                ['idle8'] = "Idle 8",
                ["idle9"] = "Idle 9",
                ["idle10"] = "Idle 10",
                ["idle11"] = "Idle 11",
                ["idledrunk"] = "Idle Drunk",
                ["idledrunk2"] = "Idle Drunk 2",
                ["idledrunk3"] = "Idle Drunk 3",
            },
        },
        ['armfolding'] = {
            ['name'] = 'Arm Folding',
            ['emotes'] = {
                ["crossarms"] = "Crossarms",
                ["crossarms2"] = "Crossarms 2",
                ["crossarms3"] = "Crossarms 3",
                ["crossarms4"] = "Crossarms 4",
                ["crossarms5"] = "Crossarms 5",
                ["crossarms6"] = "Crossarms 6",
                ["foldarms"] = "Fold Arms",
                ["foldarms2"] = "Fold Arms 2",
                ["crossarmsside"] = "Crossarms Side",
            },
        },
        ['lying'] = {
            ['name'] = 'Lying',
            ['emotes'] = {
                ["fallasleep"] = "Fall Asleep",
                ["sleep"] = "Sleep",
                ["cloudgaze"] = "Cloudgaze",
                ["cloudgaze2"] = "Cloudgaze 2",
                ["passout"] = "Passout",
                ["passout2"] = "Passout 2",
                ["passout3"] = "Passout 3",
                ["passout4"] = "Passout 4",
                ["passout5"] = "Passout 5",
                ["sunbathe"] = "Sunbathe",
                ["sunbathe2"] = "Sunbathe 2",
                ["sunbathe3"] = "Sunbathe 3",
                ["sunbatheback"] = "Sunbathe Back",
                
            },
        },
        ['sitting'] = {
            ['name'] = 'Sitting',
            ['emotes'] = {
                ["sit"] = "Sit",
                ["sit2"] = "Sit 2",
                ["sit3"] = "Sit 3",
                ["sit4"] = "Sit 4",
                ["sit5"] = "Sit 5",
                ["sit6"] = "Sit 6",
                ["sit7"] = "Sit 7",
                ["sit8"] = "Sit 8",
                ["sit9"] = "Sit 9",
                ["sitchair"] = "Sit Chair",
                ["sitchair2"] = "Sit Chair 2",
                ["sitchair3"] = "Sit Chair 3",
                ["sitchair4"] = "Sit Chair 4",
                ["sitchair5"] = "Sit Chair 5",
                ["sitchair6"] = "Sit Chair 6",
                ["sitchairside"] = "Sit Chair Side",
                ["sitscared"] = "Sit Scared",
                ["sitscared2"] = "Sit Scared 2",
                ["sitscared3"] = "Sit Scared 3",
                ["sitdrunk"] = "Sit Drunk",
                ["sitlean"] = "Sit Lean",
                ["sitsad"] = "Sit Sad",
            },
        },
        
        ['falling'] = {
            ['name'] = 'Falling Over',
            ['emotes'] = {
                ["fallover"] = "Fall Over",
                ["fallover2"] = "Fall Over 2",
                ["fallover3"] = "Fall Over 3",
                ["fallover4"] = "Fall Over 4",
                ["fallover5"] = "Fall Over 5",
            },
        },
        
        ['waiting'] = {
            ['name'] = 'Waiting',
            ['emotes'] = {
                ["wait"] = "Wait",
                ["wait2"] = "Wait 2",
                ["wait3"] = "Wait 3",
                ["wait4"] = "Wait 4",
                ["wait5"] = "Wait 5",
                ["wait6"] = "Wait 6",
                ["wait7"] = "Wait 7",
                ["wait8"] = "Wait 8",
                ["wait9"] = "Wait 9",
                ["wait10"] = "Wait 10",
                ["wait11"] = "Wait 11",
                ["wait12"] = "Wait 12",
                ["wait13"] = "Wait 13",
            },
        },
        
        ['leaning'] = {
            ['name'] = 'Leaning',
            ['emotes'] = {
                ["lean"] = "Lean",
                ["lean2"] = "Lean 2",
                ["lean3"] = "Lean 3",
                ["lean4"] = "Lean 4",
                ["lean5"] = "Lean 5",
                ["leanflirt"] = "Lean Flirt",
                ["leanbar"] = "Lean Bar",
                ["leanbar2"] = "Lean Bar 2",
                ["leanbar3"] = "Lean Bar 3",
                ["leanbar4"] = "Lean Bar 4",
                ["leanhigh"] = "Lean High",
                ["leanhigh2"] = "Lean High 2",
                ["leanside"] = "Leanside",
                ["leanside2"] = "Leanside 2",
                ["leanside3"] = "Leanside 3",
                ["leanside4"] = "Leanside 4",
                ["leanside5"] = "Leanside 5",
            },
        },
        
        ['mechanic'] = {
            ['name'] = 'Mechanical',
            ['emotes'] = {
                ["mechanic"] = "Mechanic",
                ["mechanic2"] = "Mechanic 2",
                ["mechanic3"] = "Mechanic 3",
                ["mechanic4"] = "Mechanic 4",
            },
        },
        
        ['weird'] = {
            ['name'] = 'Weird',
            ['emotes'] = {
                ["clown"] = "Clown",
                ["clown2"] = "Clown 2",
                ["clown3"] = "Clown 3",
                ["clown4"] = "Clown 4",
                ["clown5"] = "Clown 5",
                ["superhero"] = "Superhero",
                ["superhero2"] = "Superhero 2",
                ["mindcontrol"] = "Mind Control",
                ["mindcontrol2"] = "Mind Control 2",
                ["beast"] = "Beast",
                ["bird"] = "Bird",
                ["chicken"] = "Chicken",
                ["bark"] = "Bark",
                ["rabbit"] = "Rabbit",
                ["spiderman"] = "Spider-Man",
                ["t"] = "T",
                ["t2"] = "T 2",
                ["statue"] = "Statue",
                ["statue2"] = "Statue 2",
                ["statue3"] = "Statue 3",
                ["airplane"] = "Air Plane",
            },
        },
        
        ['fighting'] = {
            ['name'] = 'Fighting',
            ['emotes'] = {
                ["fightme"] = "Fight Me",
                ["fightme2"] = "Fight Me 2",
                ["bringiton"] = "Bring It On",
                ["comeatmebro"] = "Come at me bro",
                ["threaten"] = "Threaten",
                ["karate"] = "Karate",
                ["karate2"] = "Karate 2",
                ["cutthroat"] = "Cut Throat",
                ["cutthroat2"] = "Cut Throat 2",
                ["surrender"] = "Surrender",
                ["boxing"] = "Boxing",
                ["boxing2"] = "Boxing 2",
                ["knucklecrunch"] = "Knuckle Crunch",
                ["slap"] = "Slap",
                ["headbutt"] = "Headbutt",
            },
        },
        
        ['medical'] = {
            ['name'] = 'Medical',
            ['emotes'] = {
                ["medic"] = "Medic",
                ["medic2"] = "Medic 2",
                ["cpr"] = "CPR",
                ["cpr2"] = "CPR 2",
                ["inspect"] = "Inspect",
            },
        },
        
        ['interactions'] = {
            ['name'] = 'Greetings & Interaction',
            ['emotes'] = {
                ["wave"] = "Wave",
                ["wave2"] = "Wave 2",
                ["wave3"] = "Wave 3",
                ["wave4"] = "Wave 4",
                ["wave5"] = "Wave 5",
                ["wave6"] = "Wave 6",
                ["wave7"] = "Wave 7",
                ["wave8"] = "Wave 8",
                ["wave9"] = "Wave 9",
                ["hug"] = "Hug",
                ["hug2"] = "Hug 2",
                ["hug3"] = "Hug 3",
                ["argue"] = "Argue",
                ["argue2"] = "Argue 2",
                ["handshake"] = "Handshake",
                ["handshake2"] = "Handshake 2",
                ["salute"] = "Salute",
                ["salute2"] = "Salute 2",
                ["salute3"] = "Salute 3",
                ["flipoff"] = "Flip Off",
                ["flipoff2"] = "Flip Off 2",
                ["thumbsup"] = "Thumbs Up",
                ["thumbsup2"] = "Thumbs Up 2",
                ["thumbsup3"] = "Thumbs Up 3",
                ["curtsy"] = "Curtsy",
                ["blowkiss"] = "Blow Kiss",
                ["blowkiss2"] = "Blow Kiss 2",
                ["finger"] = "Finger",
                ["finger2"] = "Finger 2",
                ["whistle"] = "Whistle",
                ["whistle2"] = "Whistle 2",
                ["type"] = "Type",
                ["type2"] = "Type 2",
                ["type3"] = "Type 3",
                ["type4"] = "Type 4",
                ["point"] = "Point",
                ["pointright"] = "Point Right",
                ["pointdown"] = "Point Down",
                ["bow"] = "Bow",
                ["bow2"] = "Bow 2",
            },
        },
        
        ['reactions'] = {
            ['name'] = 'Reactions',
            ['emotes'] = {
                ["lol"] = "LOL",
                ["lol2"] = "LOL 2",
                ["nervous2"] = "Nervous 2",
                ["nervous"] = "Nervous",
                ["nervous3"] = "Nervous 3",
                ["screwyou"] = "Screw You",
                ["damn"] = "Damn",
                ["damn2"] = "Damn 2",
                ["facepalm"] = "Facepalm",
                ["facepalm2"] = "Facepalm 2",
                ["facepalm3"] = "Facepalm 3",
                ["facepalm4"] = "Facepalm 4",
                ["mindblown"] = "Mind Blown",
                ["mindblown2"] = "Mind Blown 2",
                ["yeah"] = "Yeah",
                ["shrug"] = "Shrug",
                ["shrug2"] = "Shrug 2",
                ["no"] = "No",
                ["no2"] = "No 2",
                ["noway"] = "No Way",
                ["ok"] = "OK",
                ["me"] = "Me",
                ["stunned"] = "Stunned",
                ["boi"] = "BOI",
                ["handsup"] = "Hands Up",
            },
        },
        
        ['thinking'] = {
            ['name'] = 'Thinking',
            ['emotes'] = {
                ["think"] = "Think",
                ["think2"] = "Think 2",
                ["think3"] = "Think 3",
                ["think4"] = "Think 4",
                ["think5"] = "Think 5",
            },
        },
        
        ['relax'] = {
            ['name'] = 'Relaxation',
            ['emotes'] = {
                ["yoga"] = "Yoga",
                ["meditate"] = "Meditiate",
                ["meditate2"] = "Meditiate 2",
                ["meditate3"] = "Meditiate 3",
                ["namaste"] = "Namaste",
                ["stretch"] = "Stretch",
                ["stretch2"] = "Stretch 2",
                ["stretch3"] = "Stretch 3",
                ["stretch4"] = "Stretch 4",
                ["chill"] = "Chill",
            },
        },
        
        ['exercise'] = {
            ['name'] = 'Exercise',
            ['emotes'] = {
                ["jog"] = "Jog",
                ["jog2"] = "Jog 2",
                ["jog3"] = "Jog 3",
                ["jog4"] = "Jog 4",
                ["jog5"] = "Jog 5",
                ["golfswing"] = "Golf Swing",
                ["jumpingjacks"] = "Jumping Jacks",
                ["hiking"] = "Hiking",
                ["flip"] = "Flip",
                ["flip2"] = "Flip 2",
                ["flex"] = "Flex",
                ["situp"] = "Sit Up",
                ["pushup"] = "Pushup",
                ["chinup"] = "Chinup",
                ["pull"] = "Pull",
                ["push"] = "Push",
                ["push2"] = "Push 2",
            },
        },
        
        ['clothing'] = {
            ['name'] = 'Clothing',
            ['emotes'] = {
                ["tryclothes"] = "Try Clothes",
                ["tryclothes2"] = "Try Clothes 2",
                ["tryclothes3"] = "Try Clothes 3",
                ["adjust"] = "Adjust",
                ["adjusttie"] = "Adjust Tie",
            },
        },
        
        ['police'] = {
            ['name'] = 'Cop',
            ['emotes'] = {
                ["cop"] = "Cop",
                ["cop2"] = "Cop 2",
                ["cop3"] = "Cop 3",
                ["copbeacon"] = "Cop Beacon",
                ["pullover"] = "Pullover",
                ["radio"] = "Radio",
            },
        },
        
        ['celebration'] = {
            ['name'] = 'Celebration',
            ['emotes'] = {
                ["clap"] = "Clap",
                ["slowclap"] = "Slow Clap",
                ["slowclap2"] = "Slow Clap 2",
                ["slowclap3"] = "Slow Clap 3",
                ["celebrate"] = "Celebrate",
                ["clapangry"] = "Clap Angry",
                ["jazzhands"] = "Jazzhands",
                ["slide"] = "Slide",
                ["slide2"] = "Slide 2",
                ["slide3"] = "Slide 3",
                ["cheer"] = "Cheer",
            },
        },
        
        ['randomactions'] = {
            ['name'] = 'Random Actions',
            ['emotes'] = {
                ["scared"] = "Scared",
                ["scared2"] = "Scared 2",
                ["kneel"] = "Kneel",
                ["kneel2"] = "Kneel 2",
                ["kneel3"] = "Kneel 3",
                ["knock"] = "Knock",
                ["knock2"] = "Knock 2",
                ["peace"] = "Peace",
                ["peace2"] = "Peace 2",
                ["gangsign"] = "Gang Sign",
                ["gangsign2"] = "Gang Sign 2",
                ["ledge"] = "Ledge",
                ["peek"] = "Peek",
                ["bartender"] = "Bartender",
                ["airguitar"] = "Air Guitar",
                ["airsynth"] = "Air Synth",
                ["dj"] = "DJ",
            },
        },
        ['misc'] = {
            ['name'] = 'Miscellaneous',
            ['emotes'] = {
                ["drink"] = "Drink",
                ["eat"] = "Eat",
                ["prone"] = "Prone",
                ["metal"] = "Metal",
                ["nosepick"] = "Nose Pick",
                ["outofbreath"] = "Out of Breath",
                ["pickup"] = "Pickup",
                ["countdown"] = "Countdown",
                ["shakeoff"] = "Shake Off",
                ["shot"] = "Shot",
                ["smell"] = "Smell",
                ["stickup"] = "Stick Up",
                ["stumble"] = "Stumble",
                ["warmth"] = "Warmth",
                ["lift"] = "Lift",
                ["bumbin"] = "Bum Bin",
                ["bumsleep"] = "Bum Sleep",
                ["petting"] = "Petting",
                ["crawl"] = "Crawl",
                ["slugger"] = "Slugger",
                ["reaching"] = "Reaching",
                ["cough"] = "Cough",
                ["guard"] = "Guard",
                ["hangout"] = "Hangout",
                ["impatient"] = "Impatient",
                ["lookout"] = "Lookout",
                ["parkingmeter"] = "Parking Meter",
                ["puddle"] = "Puddle",
                ["windowshop"] = "Window Shop",
                ["stink"] = "Stink",
            },
        },
    },
    ['prop'] = {
        ['name'] = 'Prop Emotes',
        ['emotes'] = {
            ["backpack"] = "Backpack",
            ["bbq"] = "BBQ",
            ["beer"] = "Beer",
            ["beg"] = "Beg",
            ["bong"] = "Bong",
            ["book"] = "Book",
            ["bouquet"] = "Bouquet",
            ["box"] = "Box",
            ["brief"] = "Briefcase",
            ["tennis"] = "Tennis",
            ["burger"] = "Burger",
            ["camera"] = "Camera",
            ["champagne"] = "Champagne",
            ["champagne2"] = "Champagne 2",
            ["cig"] = "Cig",
            ["cigar"] = "Cigar",
            ["cigar2"] = "Cigar 2",
            ["clean"] = "Clean",
            ["clean2"] = "Clean 2",
            ["clipboard"] = "Clipboard",
            ["clipboard2"] = "Clipboard 2",
            ["cocaine"] = "Crack",
            ["coffee"] = "Coffee",
            ["crack"] = "Crack",
            ["cup"] = "Cup",
            ["cup2"] = "Cup 2",
            ["donut"] = "Donut",
            ["egobar"] = "Ego Bar",
            ["energydrink"] = "Energy Drink",
            ["filmshocking"] = "Film Shocking",
            ["flute"] = "Flute",
            ["guitar"] = "Guitar",
            ["guitar2"] = "Guitar 2",
            ["guitarelectric"] = "Guitar Electric",
            ["guitarelectric2"] = "Guitar Electric 2",
            ["hammer"] = "Hammer",
            ["janitor"] = "Janitor",
            ["joint"] = "Joint",
            ["leafblower"] = "Leafblower",
            ["maid"] = "Cleaner",
            ["makeitrain"] = "Make It Rain",
            ["map"] = "Map",
            ["mugshot"] = "Mugshot",
            ["musician"] = "Musician",
            ["newspaper"] = "Newspaper",
            ["notepad"] = "Notepad",
            ["notepad2"] = "Notepad 2",
            ["party"] = "Party",
            ["phone"] = "Phone",
            ["phonecall"] = "Phone Call",
            ["rose"] = "Rose",
            ["sandwich"] = "Sandwich",
            ["smoke2"] = "Smoke 2",
            ["smoke3"] = "Smoke 3",
            ["smoke4"] = "Smoke 4",
            ["smoke5"] = "Smoke 2",
            ["soda"] = "Soda",
            ["suitcase"] = "Suitcase",
            ["suitcase2"] = "Suitcase 2",
            ["tablet"] = "Tablet",
            ["tablet2"] = "Tablet 2",
            ["taco"] = "Taco",
            ["teddy"] = "Teddy",
            ["umbrella"] = "Umbrella",
            ["vodka"] = "Vodka",
            ["water"] = "Drinking Water",
            ["weld"] = "Weld",
            ["whiskey"] = "Whiskey",
            ["wine"] = "Wine",
        },
    },
    ['dance'] = {
        ['name'] = 'Dance Emotes',
        ['emotes'] = {
            ["dance"] = "Dance",
            ["dance2"] = "Dance 2",
            ["dance3"] = "Dance 3",
            ["dance4"] = "Dance 4",
            ["dance5"] = "Dance 5",
            ["dance6"] = "Dance 6",
            ["dance7"] = "Dance 7",
            ["dance8"] = "Dance 8",
            ["dance9"] = "Dance 9",
            ["dancef"] = "Dance F",
            ["dancef2"] = "Dance F2",
            ["dancef3"] = "Dance F3",
            ["dancef4"] = "Dance F4",
            ["dancef5"] = "Dance F5",
            ["dancef6"] = "Dance F6",
            ["danceglowstick"] = "Dance Glowsticks",
            ["danceglowstick2"] = "Dance Glowsticks 2",
            ["danceglowstick3"] = "Dance Glowsticks 3",
            ["dancehorse"] = "Dance Horse",
            ["dancehorse2"] = "Dance Horse 2",
            ["dancehorse3"] = "Dance Horse 3",
            ["danceshy"] = "Dance Shy",
            ["danceshy2"] = "Dance Shy 2",
            ["dancesilly"] = "Dance Silly",
            ["dancesilly2"] = "Dance Silly 2",
            ["dancesilly3"] = "Dance Silly 3",
            ["dancesilly4"] = "Dance Silly 4",
            ["dancesilly5"] = "Dance Silly 5",
            ["dancesilly6"] = "Dance Silly 6",
            ["dancesilly7"] = "Dance Silly 7",
            ["dancesilly8"] = "Dance Silly 8",
            ["dancesilly9"] = "Dance Silly 9",
            ["danceslow"] = "Dance Slow",
            ["danceslow2"] = "Dance Slow 2",
            ["danceslow3"] = "Dance Slow 3",
            ["danceslow4"] = "Dance Slow 4",
            ["danceupper"] = "Dance Upper",
            ["danceupper2"] = "Dance Upper 2",
            ["fishdance"] = "Fish Dance",
            ["lapdance"] = "Lapdance",
            ["lapdance2"] = "Lapdance 2",
            ["lapdance3"] = "Lapdance 3",
            ["lapdance3"] = "Lapdance 3",
            ["twerk"] = "Twerk",
        },
    },
    ['shared'] = {
        ["handshake"] = "Handshake", 
        ["handshake2"] = "Handshake 2", 
        ["hug"] = "Hug", 
        ["hug2"] = "Hug 2", 
        ["bro"] = "Bro", 
        ["bro2"] = "Bro 2", 
        ["give"] = "Give", 
        ["give2"] = "Give 2", 
        ["baseball"] = "Baseball", 
        ["baseballthrow"] = "Baseball Throw", 
        ["stickup"] = "Stick Up", 
        ["stickupscared"] = "Stickup Scared", 
        ["punch"] = "Punch", 
        ["punched"] = "Punched", 
        ["headbutt"] = "Headbutt", 
        ["headbutted"] = "Headbutted", 
        ["slap2"] = "Slap 2", 
        ["slap"] = "Slap", 
        ["slapped"] = "Slapped", 
        ["slapped2"] = "Slapped 2", 
    },
}