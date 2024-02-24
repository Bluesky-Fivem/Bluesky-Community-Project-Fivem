FETCH = {
    CharacterData = function(self, key, value)
        local players = exports['bs_base']:FetchComponent('Fetch'):All()
        for k, v in pairs(players) do
            local data = v:GetData('Character'):GetData(key)
            if data ~= nil and data == value then
                return v
            end
        end

        return nil
    end,

    Next = function(self, prev)
		local retNext = false
		for k, v in pairs(Fetch:All()) do
			if prev == 0 or retNext then
				return v
			elseif prev == v:GetData("Source") then
				retNext = true
			end
		end

		return nil
	end,
}

AddEventHandler('Proxy:Shared:ExtendReady', function(component)
    if component == 'Fetch' then
        exports['bs_base']:ExtendComponent(component, FETCH)
    end
end)