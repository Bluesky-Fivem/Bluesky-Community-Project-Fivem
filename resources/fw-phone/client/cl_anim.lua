local HoldState = false
local myPedId = nil
local phoneProp = 0
local phoneModel = `prop_npc_phone`
local HoldAnim = { "cellphone@", "cellphone_text_read_base" }
local CallAnim = { "cellphone@", "cellphone_text_to_call" }

function StartPhoneAnim()
    local AnimTable = HoldAnim

    RequestAnimDict(AnimTable[1])
    while not HasAnimDictLoaded(AnimTable[1]) do
        Citizen.Wait(4)
    end

    TaskPlayAnim(PlayerPedId(), AnimTable[1], AnimTable[2], 1.0, 3.0, -1, 49, 0, 0, 0, 0)
    RequestModel(phoneModel)

	while not HasModelLoaded(phoneModel) do
		Citizen.Wait(1)
	end

	phoneProp = CreateObject(phoneModel, 1.0, 1.0, 1.0, 1, 1, 0)
    SetEntityCollision(phoneProp, false, false)
    local bone = GetPedBoneIndex(myPedId, 28422)
    AttachEntityToEntity(phoneProp, myPedId, bone, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1, 1, 0, 0, 2, 1)
end

function StopPhoneAnim()
    StopAnimTask(PlayerPedId(), HoldAnim[1], HoldAnim[2], 1.0)
    if not CallData or CallData.Dialing == nil then
        deletePhone()
    end
end

function deletePhone()
	if phoneProp ~= 0 then
		DeleteEntity(phoneProp)
		phoneProp = 0
	end
end