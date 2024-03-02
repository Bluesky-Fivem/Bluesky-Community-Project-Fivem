local DroppedNotes = {}

function RegisterCallbacks3()
    
    Callbacks:RegisterServerCallback("fw-phone:Server:Documents:GetDocuments", function(Source, Data, Cb)
        local Player = exports['bs_base']:FetchComponent('Fetch'):Source(Source)
            local Char = Player:GetData('Character')
        if Player == nil then return end
    
        local Result = exports['ghmattimysql']:executeSync("SELECT * FROM `phone_documents` WHERE `type` = @Type AND (`citizenid` = @Cid OR `sharees` LIKE @LikeCid)", {
            ['@Cid'] = Char:GetData('ID'),
            ['@LikeCid'] = '%' .. Char:GetData('ID') .. '%',
            ['@Type'] = Data.Type,
        })
    
        for k, v in pairs(Result) do
            v.signatures = json.decode(v.signatures)
            v.sharees = json.decode(v.sharees)
        end
    
        Cb(Result)
    end)
    
    Callbacks:RegisterServerCallback("fw-phone:Server:Documents:SaveDocument", function(Source, Data, Cb)
        local Player = exports['bs_base']:FetchComponent('Fetch'):Source(Source)
        local Char = Player:GetData('Character')
        if Player == nil then return end
    
        local Query = "INSERT INTO `phone_documents` (`citizenid`, `type`, `title`, `content`, `signatures`) VALUES (@Cid, @Type, @Title, @Content, '[]')"
        if Data.Id then
            Query = "UPDATE `phone_documents` SET `title` = @Title, `content` = @Content WHERE `id` = @Id"
        end
    
        exports['ghmattimysql']:executeSync(Query, {
            ['@Cid'] = Char:GetData('ID'),
            ['@Id'] = Data.Id or false,
            ['@Title'] = Data.Title,
            ['@Type'] = Data.Type,
            ['@Content'] = Data.Content,
        })
    
        Cb({Success = true})
    end)
    
    Callbacks:RegisterServerCallback("fw-phone:Server:Documents:GetDocumentById", function(Source, Data, Cb)
        local Player = exports['bs_base']:FetchComponent('Fetch'):Source(Source)
            local Char = Player:GetData('Character')
        if Player == nil then return end
        
        local Result = exports['ghmattimysql']:executeSync("SELECT * FROM `phone_documents` WHERE `id` = @Id", { ['@Id'] = Data.Id })
        if Result[1] == nil then Cb(nil) return end
    
        Result[1].signatures = json.decode(Result[1].signatures)
        Result[1].sharees = json.decode(Result[1].sharees)
    
        Cb(Result[1])
    end)
    
    Callbacks:RegisterServerCallback("fw-phone:Server:Documents:GetDocumentSignatures", function(Source, Data, Cb)
        local Player = exports['bs_base']:FetchComponent('Fetch'):Source(Source)
            local Char = Player:GetData('Character')
        if Player == nil then return end
        
        local Result = exports['ghmattimysql']:executeSync("SELECT * FROM `phone_documents` WHERE `id` = @Id", { ['@Id'] = Data.Id })
        Cb(json.decode(Result[1].signatures))
    end)
    
    Callbacks:RegisterServerCallback("fw-phone:Server:Documents:Finalize", function(Source, Data, Cb)
        local Player = exports['bs_base']:FetchComponent('Fetch'):Source(Source)
            local Char = Player:GetData('Character')
        if Player == nil then return end
    
        local Document = exports['ghmattimysql']:executeSync("SELECT * FROM `phone_documents` WHERE `id` = @Id", { ['@Id'] = Data.Id })
        Document = Document[1]
    
        if Document.finalized == 1 then
            Cb({Success = false, Msg = "Document is al afgerond."})
            return
        end
    
        if Document.citizenid ~= Char:GetData('ID') then
            Cb({Success = false, Msg = "Jij kan dit document niet afronden."})
            return
        end
        
        if Document.type ~= 5 then
            Cb({Success = false, Msg = "Ongeldige Document Type."})
            return
        end
    
        local Result = exports['ghmattimysql']:executeSync("UPDATE `phone_documents` SET `finalized` = 1 WHERE `id` = @Id", {
            ['@Id'] = Data.Id,
        })
        
        Cb({Success = true})
    end)
    
    Callbacks:RegisterServerCallback("fw-phone:Server:Documents:RequestSignature", function(Source, Data, Cb)
        local Player = exports['bs_base']:FetchComponent('Fetch'):Source(Source)
            local Char = Player:GetData('Character')
        if Player == nil then return end
    
        local Document = exports['ghmattimysql']:executeSync("SELECT * FROM `phone_documents` WHERE `id` = @Id", { ['@Id'] = Data.Id })
        Document = Document[1]
    
        if Document.finalized == 0 then
            Cb({Success = false, Msg = "Document is nog niet afgerond.."})
            return
        end
        
        if Document.citizenid ~= Char:GetData('ID') then
            Cb({Success = false, Msg = "Jij kan geen handtekeningen aanvragen."})
            return
        end
        
    
        local Sharees = json.decode(Document.sharees)
        local Signatures = json.decode(Document.signatures)
    
        local IsShared = Document.citizenid == Char:GetData('ID')
        for k, v in pairs(Sharees) do
            if v == Data.Cid then
                IsShared = true
                break
            end
        end
    
        if not IsShared then
            Cb({Success = false, Msg = "Document moet gedeeld zijn met de speler."})
            return
        end
    
        for k, v in pairs(Signatures) do
            if v.Cid == Data.Cid then
                Cb({Success = false, Msg = "Handtekening is al aangevraagd."})
                return
            end
        end
    
        table.insert(Signatures, {
            Name = FW.Functions.GetPlayerCharName(Data.Cid),
            Cid = Data.Cid,
            Signed = false,
        })
    
        local Result = exports['ghmattimysql']:executeSync("UPDATE `phone_documents` SET `signatures` = @Signatures WHERE `id` = @Id", {
            ['@Id'] = Data.Id,
            ['@Signatures'] = json.encode(Signatures)
        })
        
        Cb({Success = true, Signatures = Signatures})
    end)
    
    Callbacks:RegisterServerCallback("fw-phone:Server:Documents:SignDocument", function(Source, Data, Cb)
        local Player = exports['bs_base']:FetchComponent('Fetch'):Source(Source)
            local Char = Player:GetData('Character')
        if Player == nil then return end
    
        local Document = exports['ghmattimysql']:executeSync("SELECT * FROM `phone_documents` WHERE `id` = @Id", { ['@Id'] = Data.Id })
        Document = Document[1]
    
        if Document.finalized == 0 then
            Cb({Success = false, Msg = "Document is niet afgerond."})
            return
        end
        
        local Signatures = json.decode(Document.signatures)
    
        for k, v in pairs(Signatures) do
            if Char:GetData('ID') == v.Cid then
                v.Signed = true
                v.Timestamp = os.time() * 1000
                break
            end
        end
        
        local Result = exports['ghmattimysql']:executeSync("UPDATE `phone_documents` SET `signatures` = @Signatures WHERE `id` = @Id", {
            ['@Id'] = Data.Id,
            ['@Signatures'] = json.encode(Signatures)
        })
        
        Cb({Success = true, Signatures = Signatures})
    end)
    
    Callbacks:RegisterServerCallback("fw-phone:Server:Documents:ShareLocal", function(Source, Data, Cb)
        local Player = exports['bs_base']:FetchComponent('Fetch'):Source(Source)
            local Char = Player:GetData('Character')
        if Player == nil then return end
    
        local MyCoords = GetEntityCoords(GetPlayerPed(Source))
        for k, v in pairs(FW.GetPlayers()) do
            if v.ServerId ~= Source and #(MyCoords - v.Coords) <= 3.0 then
                TriggerClientEvent("fw-phone:Client:Notification", v.ServerId, 'view-document-' .. Data.Id, 'fas fa-folder', { 'white', 'transparent' }, 'Document Bekijken', "Een document wordt gedeeld met je.", false, true, "fw-phone:Server:Documents:AcceptShare", "", { Id = Data.Id, IsLocal = true })
            end
        end
    
        Cb({Success = true})
    end)
    
    Callbacks:RegisterServerCallback("fw-phone:Server:Documents:AddSharee", function(Source, Data, Cb)
        local Player = exports['bs_base']:FetchComponent('Fetch'):Source(Source)
            local Char = Player:GetData('Character')
        if Player == nil then return end
        
        local Target = FW.Functions.GetPlayerByCitizenId(Data.Cid)
        if Target == nil then return end
    
        local Document = exports['ghmattimysql']:executeSync("SELECT * FROM `phone_documents` WHERE `id` = @Id", { ['@Id'] = Data.Id })
        Document = Document[1]
    
        TriggerClientEvent("fw-phone:Client:Notification", Target.PlayerData.source, 'view-document-' .. Data.Id, 'fas fa-folder', { 'white', 'transparent' }, 'Document Bekijken', "Een document wordt gedeeld met je.", false, true, "fw-phone:Server:Documents:AcceptShare", "", { Id = Data.Id, IsLocal = false })
    
        Cb({Success = true})
    end)
    
    Callbacks:RegisterServerCallback("fw-phone:Server:Documents:DeleteDocument", function(Source, Data, Cb)
        local Player = exports['bs_base']:FetchComponent('Fetch'):Source(Source)
            local Char = Player:GetData('Character')
        if Player == nil then return end
    
        local Document = exports['ghmattimysql']:executeSync("SELECT * FROM `phone_documents` WHERE `id` = @Id", { ['@Id'] = Data.Id })
        Document = Document[1]
    
        if Document.citizenid ~= Char:GetData('ID') then
            Cb({Success = false, Msg = "Geen toegang."})
            return
        end
    
        local Result = exports['ghmattimysql']:executeSync("DELETE FROM `phone_documents` WHERE `id` = @Id", {
            ['@Id'] = Data.Id,
        })
    
        for k, v in pairs(DroppedNotes) do
            if v.Id == Data.Id then
                DroppedNotes[k] = nil
                TriggerClientEvent('fw-phone:Client:Documents:SetDrop', -1, k, nil)
            end
        end
        
        Cb({Success = true})
    end)
    
    Callbacks:RegisterServerCallback("fw-phone:Server:Documents:GetDroppedNotes", function(Source, Cb)
        print(DroppedNotes)
        Cb(DroppedNotes)
    end)
    
    Callbacks:RegisterServerCallback("fw-phone:Server:Documents:DropQRCode", function(Source, Data, Cb)
        local DropId = #DroppedNotes + 1
        DroppedNotes[DropId] = { Id = Data.Id, Coords = GetEntityCoords(GetPlayerPed(Source)) }
        TriggerClientEvent('fw-phone:Client:Documents:SetDrop', -1, DropId, DroppedNotes[DropId])
    end)

end



RegisterNetEvent("fw-phone:Server:Documents:DeleteQRCode")
AddEventHandler("fw-phone:Server:Documents:DeleteQRCode", function(DropId)
    DroppedNotes[DropId] = nil
    TriggerClientEvent('fw-phone:Client:Documents:SetDrop', -1, DropId, nil)
end)

RegisterNetEvent("fw-phone:Server:Documents:AcceptShare")
AddEventHandler("fw-phone:Server:Documents:AcceptShare", function(Data)
    local Source = source
    local Player = exports['bs_base']:FetchComponent('Fetch'):Source(Source)
        local Char = Player:GetData('Character')
    if Player == nil then return end

    local Document = exports['ghmattimysql']:executeSync("SELECT * FROM `phone_documents` WHERE `id` = @Id", { ['@Id'] = Data.Id })
    Document = Document[1]

    if Document == nil then return end

    Document.signatures = json.decode(Document.signatures)
    Document.sharees = json.decode(Document.sharees)

    TriggerClientEvent("fw-phone:Client:Documents:ForceDocument", Source, Document)
    TriggerClientEvent('fw-phone:Client:UpdateNotification', Source, "view-document-" .. Data.Id, true, true, false, "Openen..", true)

    if not Data.IsLocal then
        table.insert(Document.sharees, Char:GetData('ID'))

        local Result = exports['ghmattimysql']:executeSync("UPDATE `phone_documents` SET `sharees` = @Sharees WHERE `id` = @Id", {
            ['@Id'] = Data.Id,
            ['@Sharees'] = json.encode(Document.sharees)
        })
    end
end)

RegisterNetEvent("fw-phone:Server:Documents:AddDocument")
AddEventHandler("fw-phone:Server:Documents:AddDocument", function(Cid, Data)
    exports['ghmattimysql']:executeSync("INSERT INTO `phone_documents` (`citizenid`, `type`, `title`, `content`, `signatures`, `sharees`, `finalized`) VALUES (@Cid, @Type, @Title, @Content, @Signatures, @Sharees, @Finalized)", {
        ['@Cid'] = Cid,
        ['@Type'] = Data.Type or 0,
        ['@Title'] = Data.Title,
        ['@Content'] = Data.Content,
        ['@Signatures'] = json.encode(Data.Signatures or {}),
        ['@Sharees'] = json.encode(Data.Sharees or {}),
        ['@Finalized'] = Data.Finalized or 0,
    })
end)
