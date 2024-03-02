local DroppedNotes = {} 
local ShowingInteraction = false

function InitDocuments()
    Callbacks:ServerCallback("fw-phone:Server:Documents:GetDroppedNotes", {}, function(Result)
        DroppedNotes = Result
    end)
end


RegisterNUICallback("Documents/GetDocuments", function(Data, Cb)
    Callbacks:ServerCallback("fw-phone:Server:Documents:GetDocuments", Data, function(Result)
        Cb(Result)
    end)
end)

RegisterNUICallback("Documents/SaveDocument", function(Data, Cb)
    Callbacks:ServerCallback("fw-phone:Server:Documents:SaveDocument", Data, function(Result)
        Cb(Result)
    end)
end)

RegisterNUICallback("Documents/Finalize", function(Data, Cb)
    Callbacks:ServerCallback("fw-phone:Server:Documents:Finalize", Data, function(Result)
        Cb(Result)
    end)
end)

RegisterNUICallback("Documents/GetDocumentSignatures", function(Data, Cb)
    Callbacks:ServerCallback("fw-phone:Server:Documents:GetDocumentSignatures", Data, function(Result)
        Cb(Result)
    end)
end)

RegisterNUICallback("Documents/RequestSignature", function(Data, Cb)
    Callbacks:ServerCallback("fw-phone:Server:Documents:RequestSignature", Data, function(Result)
        Cb(Result)
    end)
end)

RegisterNUICallback("Documents/SignDocument", function(Data, Cb)
    Callbacks:ServerCallback("fw-phone:Server:Documents:SignDocument", Data, function(Result)
        Cb(Result)
    end)
end)

RegisterNUICallback("Documents/ShareLocal", function(Data, Cb)
    Callbacks:ServerCallback("fw-phone:Server:Documents:ShareLocal", Data, function(Result)
        Cb(Result)
    end)
end)

RegisterNUICallback("Documents/AddSharee", function(Data, Cb)
    Callbacks:ServerCallback("fw-phone:Server:Documents:AddSharee", Data, function(Result)
        Cb(Result)
    end)
end)

RegisterNUICallback("Documents/DeleteDocument", function(Data, Cb)
    Callbacks:ServerCallback("fw-phone:Server:Documents:DeleteDocument", Data, function(Result)
        Cb(Result)
    end)
end)

RegisterNUICallback("Documents/DropQRCode", function(Data, Cb)
    Callbacks:ServerCallback("fw-phone:Server:Documents:DropQRCode", Data, function(Result)
        Cb(Result)
    end)
end)


RegisterNetEvent("fw-phone:Client:Documents:ForceDocument")
AddEventHandler("fw-phone:Client:Documents:ForceDocument", function(Data)
    SendNUIMessage({
        Action = "Documents/SetDocument",
        Document = Data
    })
end)

RegisterNetEvent("fw-phone:Client:Documents:SetDrop")
AddEventHandler("fw-phone:Client:Documents:SetDrop", function(DropId, Data)
    DroppedNotes[DropId] = Data
end)

local DroppedNotes = {}

Citizen.CreateThread(function()
    while true do
        local NearDistance, NearDropId = false, false -- Initialize NearDropId outside the loop

        if not DroppedNotes then
            Citizen.Wait(1000)
        else
            local Coords = GetEntityCoords(PlayerPedId())

            for k, v in pairs(DroppedNotes) do
                local Distance = #(Coords - v.Coords)

                if Distance < 10.0 then
                    DrawMarker(27, v.Coords.x, v.Coords.y, v.Coords.z - 0.8, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.2, 0.2, 2.0, 98, 0, 234, 100, 0, 0, 2, 0, 0, 0, 0)
                end
        
                if not NearDistance or Distance < NearDistance then
                    NearDistance, NearDropId = Distance, k
                end
            end

            if NearDistance and NearDistance < 2.0 then
                local Note = DroppedNotes[NearDropId]
                DrawMarker(27, Note.Coords.x, Note.Coords.y, Note.Coords.z - 0.8, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.3, 0.3, 2.0, 98, 0, 234, 100, 0, 0, 2, 0, 0, 0, 0)

                if not ShowingInteraction then
                    ShowingInteraction = true
                    exports['fw-ui']:ShowInteraction("[E] Notitie Openen / [F] Notitie Verwijderen")
                end

                if IsControlJustPressed(0, 38) then
                    local Result = Callbacks:ServerCallback("fw-phone:Server:Documents:GetDocumentById", { Id = Note.Id })
                    if Result then
                        if not IsPhoneOpen then OpenPhone(true, false) end
                        SendNUIMessage({
                            Action = "Documents/SetDocument",
                            Document = Result,
                            IsDrop = true,
                        })
                    end
                end

                if IsControlJustPressed(0, 23) then
                    TriggerServerEvent("fw-phone:Server:Documents:DeleteQRCode", NearDropId)
                end
            elseif ShowingInteraction then
                ShowingInteraction = false
                exports['fw-ui']:HideInteraction()
            end
        end

        Citizen.Wait(4)
    end
end)
