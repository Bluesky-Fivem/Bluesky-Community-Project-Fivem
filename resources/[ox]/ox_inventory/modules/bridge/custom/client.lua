
---@diagnostic disable-next-line: duplicate-set-field
function client.setPlayerStatus(values)
	for name, value in pairs(values) do
		if value > 0 then TriggerEvent('bs_status:add', name, value) else TriggerEvent('bs_status:remove', name, -value) end
	end
end
