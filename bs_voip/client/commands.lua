local wasProximityDisabledFromOverride = false
disableProximityCycle = false

RegisterCommand('setvoiceintent', function(source, args, raw)
	if GetConvarInt('voice_allowSetIntent', 1) == 1 then
		local intent = args[1]
		if intent == 'speech' then
			MumbleSetAudioInputIntent(`speech`)
		elseif intent == 'music' then
			MumbleSetAudioInputIntent(`music`)
		end
		LocalPlayer.state:set('voiceIntent', intent, true)
	end
end, false)

RegisterCommand('vol', function(source, args, raw)
	if not args[1] then return end
	setVolume(tonumber(args[1]))
end, false)

RegisterCommand('+cycleproximity', function()
	-- Proximity is either disabled, or manually overwritten.
	local newMode = mode + 1

	-- If we're within the range of our voice modes, allow the increase, otherwise reset to the first state
	if newMode <= #Cfg.voiceModes then
		mode = newMode
	else
		mode = 1
	end

	setProximityState(Cfg.voiceModes[mode][1], false)
	TriggerEvent('pma-voice:setTalkingMode', mode)
end, false)

function RegisterKeybinds()
	Keybinds:Register("Voip", "Cycles the proximity state.", "+cycleproximity", "-cycleproximity", "keyboard", 'Z')
end

exports('setAllowProximityCycleState', function(state)
	type_check({ state, "boolean" })
	disableProximityCycle = state
end)

function setProximityState(proximityRange, isCustom)
	local voiceModeData = Cfg.voiceModes[mode]
	UI.Hud:Update({ id = "voice", value = mode - 1 })
	MumbleSetTalkerProximity(proximityRange + 0.0)
	LocalPlayer.state:set('proximity', {
		index = mode,
		distance = proximityRange,
		mode = isCustom and "Custom" or voiceModeData[2],
	}, true)
end

exports("overrideProximityRange", function(range, disableCycle)
	type_check({ range, "number" })
	setProximityState(range, true)
	if disableCycle then
		disableProximityCycle = true
		wasProximityDisabledFromOverride = true
	end
end)

exports("clearProximityOverride", function()
	local voiceModeData = Cfg.voiceModes[mode]
	setProximityState(voiceModeData[1], false)
	if wasProximityDisabledFromOverride then
		disableProximityCycle = false
	end
end)
