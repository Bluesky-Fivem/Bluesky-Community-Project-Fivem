local LS_CORE = exports["ls-core"]:GetCoreObject()
local QBCore = LS_CORE.Config.FRAMEWORK == "QB" and exports["qb-core"]:GetCoreObject() or exports["es_extended"]:getSharedObject()

if LS_CORE.Config.FRAMEWORK == "QB" then
    QBCore.Commands.Add("giveitem", "Give An Item (Admin Only)", {{name="id", help="Player ID"},{name="item", help="Name of the item (not a label)"}, {name="amount", help="Amount of items"}}, false, function(source, args)
        local id = tonumber(args[1])
        local Player = QBCore.Functions.GetPlayer(id)
        local amount = tonumber(args[3]) or 1
        local itemData = Config.Shared.Items[tostring(args[2]):lower()]
        if Player then
                if itemData then
                    -- check iteminfo
                    local info = {}
                    if itemData["name"] == "id_card" then
                        info.citizenid = Player.PlayerData.citizenid
                        info.firstname = Player.PlayerData.charinfo.firstname
                        info.lastname = Player.PlayerData.charinfo.lastname
                        info.birthdate = Player.PlayerData.charinfo.birthdate
                        info.gender = Player.PlayerData.charinfo.gender
                        info.nationality = Player.PlayerData.charinfo.nationality
                    elseif itemData["name"] == "driver_license" then
                        info.firstname = Player.PlayerData.charinfo.firstname
                        info.lastname = Player.PlayerData.charinfo.lastname
                        info.birthdate = Player.PlayerData.charinfo.birthdate
                        info.type = "Class C Driver License"
                    elseif itemData["type"] == "weapon" then
                        amount = 1
                        info.serie = tostring(LS_CORE.Config.RandomInt(2) .. LS_CORE.Config.RandomStr(3) .. LS_CORE.Config.RandomInt(1) .. LS_CORE.Config.RandomStr(2) .. LS_CORE.Config.RandomInt(3) .. LS_CORE.Config.RandomStr(4))
                        info.quality = 100
                    elseif itemData["name"] == "harness" then
                        info.uses = 20
                    elseif itemData["name"] == "markedbills" then
                        info.worth = math.random(5000, 10000)
                    elseif itemData["name"] == "labkey" then
                        info.lab = exports["qb-methlab"]:GenerateRandomLab()
                    elseif itemData["name"] == "printerdocument" then
                        info.url = "https://cdn.discordapp.com/attachments/870094209783308299/870104331142189126/Logo_-_Display_Picture_-_Stylized_-_Red.png"
                    elseif itemData["name"] == "bag" then
                        info.drawable = 45
                        info.texture = 0
                    end

                    if exports["inventory"]:AddItem(Player.PlayerData.source, itemData["name"], amount, false, info) then
                        print(GetPlayerName(id).." "..amount.." "..itemData["name"].. "")
                    else
                        print("Cannot given")
                    end
                else
                    print("This item not real")
                end
        else
            print("Not an person")
        end
    end, "admin")
else
	QBCore.RegisterCommand('giveitem', 'admin', function(xPlayer, args)
		args.playerId.addInventoryItem(args.item, args.count)
	end, true, {
		help = "Give Item",
		validate = true,
		arguments = {
			{ name = 'playerId', help = "Player ID", type = 'player' },
			{ name = 'item',     help = "Item Name",   type = 'string' },
			{ name = 'count',    help = "Item Count",  type = 'number' }
		}
	})
end

RegisterCommand("test_has", function(source)
    local Player = LS_CORE.Functions.GetPlayer(source)
    
    local has = QBCore.Functions.HasItem(Player.Source, "id_card", 1)
    print(has)
end)