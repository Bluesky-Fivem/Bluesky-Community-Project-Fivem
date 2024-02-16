Config = {}

Config = {
    JobCenterLocation = { ['x'] = 162.28, ['y'] = -1104.18, ['z'] = 28.34 },
}


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
}