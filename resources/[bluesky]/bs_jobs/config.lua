Config = {}

--Config.JobCenterLocation = {['x'] = 180.56, ['y'] = -1129.26, ['z'] = 29.33}

Config.Job = {
    {
    
        job = 'mechanic',
        label = 'Mechanic',
        whitelisted = true,
        grades = {
            mechanic = { label = 'Mechanic', level = 1, salary = 50 },
            boss = { label = 'Mechanic Boss', level = 4, salary = 100 },
        },
        workplaces = {
            'LS Customs - Vinewood', -- 1
        }
    },
    {
        job = 'police',
        label = 'Police',
        whitelisted = true,
        grades = {
            lspd_cadet = { label = 'Cadet', level = 0, salary = 200 },
            lscs_cadet = { label = 'Cadet', level = 0, salary = 200 },

            lspd_officer = { label = 'Officer', level = 1, salary = 300 },
            lscs_deputy = { label = 'Deputy', level = 1, salary = 300 },

            lspd_sofficer = { label = 'Senior Officer', level = 2, salary = 375 },
            lscs_sdeputy = { label = 'Senior Deputy', level = 2, salary = 375 },

            lspd_sergeant = { label = 'Sergeant', level = 3, salary = 400 },
            lscs_sergeant = { label = 'Sergeant', level = 3, salary = 400 },
            sasp_trooper = { label = 'Trooper', level = 3, salary = 400 },

            lspd_lieutenant = { label = 'Lieutenant', level = 4, salary = 450 },
            lscs_lieutenant = { label = 'Lieutenant', level = 4, salary = 450 },
            sasp_lieutenant = { label = 'Lieutenant', level = 4, salary = 450 },

            lspd_captain = {
                label = 'Captain',
                level = 5,
                salary = 500,
                vehicles = {
                    police = {
                        name = 'Elso police',
                        price = 500
                    },
                    police2 = {
                        name = 'Masodik police',
                        price = 750
                    },
                    police3 = {
                        name = 'Harmadik police',
                        price = 100
                    },
                },
                uniform = {
                    components = {
                        mask = {
                            paletteId = 0,
                            textureId = 0,
                            componentId = 1,
                            drawableId = 0,
                        },
                        arms = {
                            paletteId = 0,
                            textureId = 0,
                            componentId = 3,
                            drawableId = 0,
                        },
                        leg = {
                            paletteId = 0,
                            textureId = 0,
                            componentId = 4,
                            drawableId = 35,
                        },
                        bag = {
                            paletteId = 0,
                            textureId = 0,
                            componentId = 5,
                            drawableId = 0,
                        },
                        shoe = {
                            paletteId = 0,
                            textureId = 0,
                            componentId = 6,
                            drawableId = 25,
                        },
                        accessory = {
                            paletteId = 0,
                            textureId = 0,
                            componentId = 7,
                            drawableId = 0,
                        },
                        undershirt = {
                            paletteId = 0,
                            textureId = 0,
                            componentId = 8,
                            drawableId = 122,
                        },
                        kevlar = {
                            paletteId = 0,
                            textureId = 0,
                            componentId = 9,
                            drawableId = 0,
                        },
                        badge = {
                            paletteId = 0,
                            textureId = 0,
                            componentId = 10,
                            drawableId = 0,
                        },
                        shirt = {
                            paletteId = 0,
                            textureId = 0,
                            componentId = 11,
                            drawableId = 55,
                        },
                    },
                    props = {
                        hat = {
                            disabled = false,
                            textureId = 0,
                            componentId = 0,
                            drawableId = 46,
                        },
                        glass = {
                            disabled = true,
                            textureId = 0,
                            componentId = 1,
                            drawableId = 0,
                        },
                        ear = {
                            disabled = true,
                            textureId = 0,
                            componentId = 2,
                            drawableId = 0,
                        },
                        watch = {
                            disabled = true,
                            textureId = 0,
                            componentId = 6,
                            drawableId = 0,
                        },
                        bracelet = {
                            disabled = true,
                            textureId = 0,
                            componentId = 7,
                            drawableId = 0,
                        },
                    },
                }
            },
            lscs_captain = { label = 'Captain', level = 5, salary = 500 },
            sasp_captain = { label = 'Captain', level = 5, salary = 500 },

            lspd_assistchief = { label = 'Assistant Chief', level = 6, salary = 600 },
            lscs_undersheriff = { label = 'Undersheriff', level = 6, salary = 600 },
            sasp_colonel = { label = 'Colonel', level = 6, salary = 600 },

            lspd_chief = { label = 'Chief', level = 7, salary = 700 },
            lscs_sheriff = { label = 'Sheriff', level = 7, salary = 700 },
            sasp_assistcommissioner = { label = 'Assistant Commissioner', level = 7, salary = 700 },

            sasp_commissioner = { label = 'Commissioner', level = 10, salary = 700 },
        },
        workplaces = {
            'Los Santos Police Department', -- 1
            'Los Santos County Sheriff', -- 2
            'San Andreas State Police', -- 3
        },
    },
    {
        job = 'doctor',
        label = 'Doctor',
        whitelisted = true,
        grades = {
            junior = { label = 'Junior Doctor', level = 0, salary = 200 },
            doctor = { label = 'Doctor', level = 1, salary = 250 },
            senior = { label = 'Senior Doctor', level = 2, salary = 300 },
            chief = { label = 'Chief Doctor', level = 4, salary = 500 },
        },
        workplaces = {
            'Pillbox Medical', -- 1
            'Los Santos Central Hospital', -- 2
            'Sandy Shores Hospital', -- 3
            'Paleto Bay Medical', -- 4
        },
    },
    {
        job = 'ems',
        label = 'Emergency Medical Services',
        whitelisted = true,
        grades = {
            recruit = { label = 'Recruit EMS', level = 0, salary = 150 },
            paramedic = { label = 'Paramedic', level = 1, salary = 250 },
            head = { label = 'Head of EMS', level = 4, salary = 450 },
        },
    },
    {
        job = 'judge',
        label = 'Judge',
        whitelisted = true,
        grades = {
            judge = { label = 'Judge', level = 1, salary = 400 },
            chief = { label = 'Chief Justice', level = 4, salary = 800 },
        },
    },
    {
        job = 'realestate',
        label = 'Real Estate Agent',
        whitelisted = true,
        grades = {
            employee = { label = 'Employee', level = 1, salary = 100 },
            boss = { label = 'Boss', level = 4, salary = 300 }
        },
    },
    {
        job = 'cardealer',
        label = 'Car Dealer',
        whitelisted = true,
        grades = {
            employee = { label = 'Employee', level = 1, salary = 100 },
            boss = { label = 'Boss', level = 4, salary = 300 }
        },
        workplaces = {
            'Premium Deluxe Motorsport', -- 1
        },
    },
    {
        job = 'postal',
        label = 'Postal Worker',
        whitelisted = false,
        jobcenter = { 
            default = 'employee',
            description = 'A job where you post stuff.',
            requirements = 'Don\'t steal packages you prick.',
            instructions = 'Go and deliver stuff.',
        },
        grades = {
            employee = { label = 'Employee', level = 1, salary = 50 },
        },
    },
    {
        job = 'metalworker',
        label = 'Fémfeldolgozó',
        whitelisted = false,
        jobcenter = { 
            default = 'employee',
            description = 'Fémfeldolgozó munka, a Sandy Shores mellett lévő roncstelepen kell a roncsok közül feldolgozható / újrahasznosítható fémdarabokat gyűjteni.',
            requirements = 'Nincsen különösebb elvárás csak végezd a munkád.',
            instructions = 'Nincsen',
        },
        grades = {
            employee = {
                label = 'Employee',
                level = 1, 
                salary = 50,
                uniform = {
                    components = {
                        mask = {
                            paletteId = 0,
                            textureId = 0,
                            componentId = 1,
                            drawableId = 0,
                        },
                        arms = {
                            paletteId = 0,
                            textureId = 0,
                            componentId = 3,
                            drawableId = 0,
                        },
                        leg = {
                            paletteId = 0,
                            textureId = 0,
                            componentId = 4,
                            drawableId = 36,
                        },
                        bag = {
                            paletteId = 0,
                            textureId = 0,
                            componentId = 5,
                            drawableId = 0,
                        },
                        shoe = {
                            paletteId = 0,
                            textureId = 0,
                            componentId = 6,
                            drawableId = 25,
                        },
                        accessory = {
                            paletteId = 0,
                            textureId = 0,
                            componentId = 7,
                            drawableId = 0,
                        },
                        undershirt = {
                            paletteId = 0,
                            textureId = 0,
                            componentId = 8,
                            drawableId = 59,
                        },
                        kevlar = {
                            paletteId = 0,
                            textureId = 0,
                            componentId = 9,
                            drawableId = 0,
                        },
                        badge = {
                            paletteId = 0,
                            textureId = 0,
                            componentId = 10,
                            drawableId = 0,
                        },
                        shirt = {
                            paletteId = 0,
                            textureId = 0,
                            componentId = 11,
                            drawableId = 56,
                        },
                    },
                    props = {
                        hat = {
                            disabled = true,
                            textureId = 0,
                            componentId = 0,
                            drawableId = 0,
                        },
                        glass = {
                            disabled = true,
                            textureId = 0,
                            componentId = 1,
                            drawableId = 0,
                        },
                        ear = {
                            disabled = true,
                            textureId = 0,
                            componentId = 2,
                            drawableId = 0,
                        },
                        watch = {
                            disabled = true,
                            textureId = 0,
                            componentId = 6,
                            drawableId = 0,
                        },
                        bracelet = {
                            disabled = true,
                            textureId = 0,
                            componentId = 7,
                            drawableId = 0,
                        },
                    },
                }
            },
        },
    },
    {
        job = 'mower',
        label = 'Fűnyíró',
        whitelisted = false,
        jobcenter = { 
            default = 'employee',
            description = 'Fűnyíróként a nagyváros golfklubbjánál kell tevékenykedni, a terület óriási így folyamatosan van munka. A munkások számára a szervezet biztosít munkaruházatot, valamint munkagépet.',
            requirements = 'Különösebb elvárás nincsen.',
            instructions = 'Nincsen.',
        },
        grades = {
            employee = {
                label = 'Employee',
                level = 1, 
                salary = 50,
                uniform = {
                    components = {
                        mask = {
                            paletteId = 0,
                            textureId = 0,
                            componentId = 1,
                            drawableId = 0,
                        },
                        arms = {
                            paletteId = 0,
                            textureId = 0,
                            componentId = 3,
                            drawableId = 0,
                        },
                        leg = {
                            paletteId = 0,
                            textureId = 0,
                            componentId = 4,
                            drawableId = 36,
                        },
                        bag = {
                            paletteId = 0,
                            textureId = 0,
                            componentId = 5,
                            drawableId = 0,
                        },
                        shoe = {
                            paletteId = 0,
                            textureId = 0,
                            componentId = 6,
                            drawableId = 25,
                        },
                        accessory = {
                            paletteId = 0,
                            textureId = 0,
                            componentId = 7,
                            drawableId = 0,
                        },
                        undershirt = {
                            paletteId = 0,
                            textureId = 0,
                            componentId = 8,
                            drawableId = 59,
                        },
                        kevlar = {
                            paletteId = 0,
                            textureId = 0,
                            componentId = 9,
                            drawableId = 0,
                        },
                        badge = {
                            paletteId = 0,
                            textureId = 0,
                            componentId = 10,
                            drawableId = 0,
                        },
                        shirt = {
                            paletteId = 0,
                            textureId = 0,
                            componentId = 11,
                            drawableId = 56,
                        },
                    },
                    props = {
                        hat = {
                            disabled = true,
                            textureId = 0,
                            componentId = 0,
                            drawableId = 0,
                        },
                        glass = {
                            disabled = true,
                            textureId = 0,
                            componentId = 1,
                            drawableId = 0,
                        },
                        ear = {
                            disabled = true,
                            textureId = 0,
                            componentId = 2,
                            drawableId = 0,
                        },
                        watch = {
                            disabled = true,
                            textureId = 0,
                            componentId = 6,
                            drawableId = 0,
                        },
                        bracelet = {
                            disabled = true,
                            textureId = 0,
                            componentId = 7,
                            drawableId = 0,
                        },
                    },
                }
            },
        },
    },
}


Config.JobCenters = {
    Paleto = {
        Pos = vector3(-150.74, 6303.16, 30.65),
        Jobs = {}
    },
    Sandy = {
        Pos = vector3(1701.56, 3783.65, 33.81),
        Jobs = {}
    },
    City = {
        Pos = vector3(-550.84, -192.54, 37.26),
        Jobs = {}
    }
}

Config.TimerAfterJobChange = 120 * 60000 -- 120 minutes
Config.JobRefreshTime = 15000 -- 15 sec
Config.JobCenterBlip = 176
Config.JobCenterBlipSize = 0.8

Config.MetalWork = {
    DutyPos = vector3(2368.52, 3155.94, 48.62),
    JobAcceptPos = vector3(2341.15, 3128.59, 48.21),
    DropPoint = vector3(2358.17, 3138.52, 48.21),
    BlipData = {467, 5, 0.8}, -- iconId, color, scale
    MetalPoints = {
        vector3(2415.35, 3120.29, 48.68),
        vector3(2409.8, 3147.39, 48.25),
        vector3(2398.89, 3140.81, 48.17),
        vector3(2399.71, 3082.27, 48.65),
        vector3(2427.35, 3084.83, 48.62),
        vector3(2370.86, 3085.6, 48.15),
        vector3(2379.22, 3091.38, 48.57),
        vector3(2389.84, 3071.18, 48.84),
        vector3(2365.85, 3067.01, 48.15),
        vector3(2333.07, 3070.26, 48.57),
        vector3(2357.47, 3037.75, 48.15)
    },
    MetalProps = {
        'prop_rub_carpart_02',
        'prop_rub_carpart_04',
        'prop_rub_carpart_05',
        'prop_rub_chassis_02',
    }
}

Config.PostalJob = {
    Locations = {
        Sandy = {
            Name = "Sandy Shore Posta",
            DutyPos = vector3(1361.04, 3603.26, 34.95),
            BikeRentPos = vector3(1357.88, 3616.52, 34.89),
            BikeRentHeading = 284.0,
            PaperPickupPos = vector3(1367.35, 3603.59, 34.91),
            PaperPoses = {
                vector3(1438.15, 3624.88, 34.86),
                vector3(1498.18, 3694.13, 34.86),
                vector3(1529.66, 3724.65, 34.86),
                vector3(1535.65, 3779.53, 34.86),
                vector3(1647.62, 3725.71, 34.34),
                vector3(1664.64, 3815.9, 34.87),
                vector3(1747.95, 3776.6, 34.05),
                vector3(1732.23, 3811.56, 34.61),
                vector3(1758.47, 3825.93, 34.52),
                vector3(1773.2, 3794.8, 33.8),
                vector3(1786.39, 3740.57, 33.8),
                vector3(1856.12, 3749.68, 33.07),
                vector3(1891.33, 3713.31, 32.82),
                vector3(1836.88, 3667.47, 33.68),
                vector3(1931.19, 3719.56, 32.87),
                vector3(1972.55, 3741.18, 32.19),
                vector3(1988.86, 3779.54, 32.18),
                vector3(1966.16, 3807.51, 32.37),
                vector3(1948.66, 3799.85, 32.06),
                vector3(1958.18, 3840.29, 32.02),
                vector3(1898.08, 3890.54, 32.52),
                vector3(1862.34, 3869.3, 32.98),
                vector3(1729.59, 3849.71, 34.72),
                vector3(1839.19, 3777.59, 33.25),
            }
        },
        Paleto = {
            Name = "Paletoi Posta",
            DutyPos = vector3(-268.27, 6140.98, 31.53),
            BikeRentPos = vector3(-275.5, 6147.13, 31.52),
            BikeRentHeading = 223.0,
            PaperPickupPos = vector3(-271.75, 6143.33, 31.53),
            PaperPoses = {
                vector3(-289.91, 6202.68, 31.47),
                vector3(-325.37, 6225.33, 31.49),
                vector3(-301.74, 6253.06, 31.55),
                vector3(-202.27, 6349.69, 31.48),
                vector3(-153.4, 6326.85, 31.58),
                vector3(-141.44, 6304.14, 31.51),
                vector3(-263.11, 6288.65, 31.48),
                vector3(-245.09, 6333.23, 32.49),
                vector3(-192.97, 6382.44, 31.86),
                vector3(-188.51, 6413.32, 31.9),
                vector3(-111.37, 6457.54, 31.47),
                vector3(-42.1, 6470.8, 31.5),
                vector3(-10.43, 6558.83, 31.97),
                vector3(34.98, 6597.39, 32.47),
                vector3(0.17, 6519.79, 31.48),
                vector3(36.6, 6658.61, 31.72),
                vector3(-37.05, 6632.67, 30.28),
                vector3(-53.33, 6524.09, 31.49),
                vector3(122.23, 6626.53, 31.94),
                vector3(157.62, 6637.55, 31.64),
                vector3(-325.82, 6072.84, 31.22),
                vector3(-410, 6063.7, 31.5),
                vector3(-381.08, 6036.22, 31.5),
                vector3(-440.81, 6020.21, 31.49),
            },
        },
        City = {
            Name = "Városi Posta",
            DutyPos = vector3(78.64, 111.87, 81.17),
            BikeRentPos = vector3(63.52, 125.85, 79.19),
            BikeRentHeading = 157.0,
            PaperPickupPos = vector3(74.15, 121.46, 79.2),
            PaperPoses = {
                vector3(81.47, 83.25, 78.64),
                vector3(6.03, 101.42, 79.02),
                vector3(92.97, 41.31, 73.52),
                vector3(7.72, -8.69, 70.11),
                vector3(-59.95, 27.31, 72.2),
                vector3(-75.47, 141.21, 81.49),
                vector3(-142.42, 63.61, 70.84),
                vector3(5.6, 220.07, 107.72),
                vector3(83.51, 271.86, 110.21),
                vector3(155, 234.17, 106.71),
                vector3(175, 184.82, 105.67),
                vector3(277.73, 146.97, 104.33),
                vector3(231.9, 77.75, 87.92),
                vector3(175.63, 57.78, 83.62),
                vector3(173.89, -29.29, 68.09),
                vector3(235.74, -27.15, 69.9),
                vector3(247.98, -96.93, 70.09),
                vector3(174.75, -73.45, 68.52),
                vector3(131.9, -66.27, 67.67),
                vector3(105.76, -5.27, 67.98),
                vector3(57.2, 162.96, 104.76),
                vector3(-85.94, 240.51, 100.27),
            },
        },
    },
    MinPayment = 5,
    MaxPayment = 15,
    MinPaperCount = 5,
    MaxPaperCount = 20,
    BlipData = {501, 5, 0.8}, -- iconId, color, scale
}

Config.MowerJob = {
    DutyPos = vector3(-1358.48, 120.41, 56.27),
    VehiclePos = vector3(-1352.05, 118.87, 56.24),
    VehicleHeading = 3.83,
    DistancePayment = 0.05,
    Blip = 496,
    MowingPoses = {
        vector3(-1337.66, 150.68, 55.89),
        vector3(-1278.37, 184.81, 58.69),
        vector3(-1218.61, 154.7, 59.26),
        vector3(-1144.95, 108.97, 57.76),
        vector3(-1071.35, 129.74, 56.96),
        vector3(-1070.69, 56.62, 50.1),
        vector3(-1004.67, 9.74, 48.23),
        vector3(-1080.05, -23.01, 49.51),
        vector3(-1039.28, -94.72, 42.6),
        vector3(-946.45, -85.48, 39.12),
        vector3(-1051.14, -114.96, 41.14),
        vector3(-1155.28, -89.54, 43.09),
        vector3(-1228.44, -51.19, 44.46),
        vector3(-1280.21, 15.11, 49.08),
        vector3(-1336.27, 86.24, 53.81),
        vector3(-1266.1, 78.9, 52.3),
        vector3(-1155.95, 44.96, 52.03),
        vector3(-1102.02, 54.72, 51.84),
        vector3(-1209.03, -25.23, 45.88),
        vector3(-1387.57, 151.68, 55.8)
    }
}