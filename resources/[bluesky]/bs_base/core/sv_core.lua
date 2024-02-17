COMPONENTS.Core = {
	--- @param reason string The reason for the error.
	Shutdown = function(self, reason)
		COMPONENTS.Logger:Critical('Core', 'Shutting Down Core, Reason: ' .. reason, { 
			console = true,
			file = true
		})
    
		Citizen.Wait(1000) -- Need wait period so logging can finish
		os.exit()
	end
}

AddEventHandler('Core:Server:StartupReady', function()
	Citizen.CreateThread(function()
		
	
		while not exports or exports[GetCurrentResourceName()] == nil do
			Citizen.Wait(1)
		end
	
		
	
		TriggerEvent('Proxy:Shared:RegisterReady')
		for k, v in pairs(COMPONENTS) do TriggerEvent('Proxy:Shared:ExtendReady', k) end
	
		Citizen.Wait(1000)
	
		COMPONENTS.Proxy.ExportsReady = true
		TriggerEvent('Proxy:Shared:ExportsReady')
		return
	end)
end)

AddEventHandler('Database:Server:Ready', function(db)
	COMPONENTS.Proxy.DatabaseReady = true
	TriggerEvent('Core:Shared:Ready')
end)