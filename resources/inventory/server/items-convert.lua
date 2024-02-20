local LS_CORE = exports["ls-core"]:GetCoreObject()
local QBCore = LS_CORE.Config.FRAMEWORK == "QB" and exports["qb-core"]:GetCoreObject() or exports["es_extended"]:getSharedObject()


RegisterCommand('convertitems', function(src, args, raw)
    if src == 0 then
        local convertDB, convertedDB = QBCore.Shared ~= nil and QBCore.Shared.Items or QBCore.Items, {}
        
        for k,v in pairs(convertDB) do
            local rarity = "common"
            if v.type == "weapon" then
                rarity = "rare"
            end

            local maxStack = 100
            if v.unique then
                maxStack = 1
            end

            local width = 1
            local height = 1
            if v.type == "weapon" then
                width = 2
                height= 2
            end

            local bg = "black"
            if v.type == "weapon" then
                bg = "green"
            end

            local newtxt = v.description
			if v.description ~= nil then
				if string.find(v.description, "'") then
					newtxt = string.gsub(v.description, "'", "\\" .. "'")
				end
			end

            convertedDB[k] = { 
                name = k,
                label = v.label,
                weight = v.weight or 100, 
                type = "item",
                image = v.image or k..".png",
                unique = v.unique or false,
                useable = v.useable or false,
                shouldClose = v.shouldClose or false,
                combinable = v.combinable or false,
                description = newtxt,
            }

        end
        local converted = print_table( convertedDB )

        print("All Items has been converted.")
        SaveResourceFile(GetCurrentResourceName(), './config_converted.lua', converted, -1)
    end
end)

function firstToUpper(str)
    return (str:gsub("^%l", string.upper))
end

function print_table(node)
    local cache, stack, output = {},{},{}
    local depth = 1
    local output_str = "{\n"

    while true do
        local size = 0
        for k,v in pairs(node) do
            size = size + 1
        end

        local cur_index = 1
        for k,v in pairs(node) do
            if (cache[node] == nil) or (cur_index >= cache[node]) then

                if (string.find(output_str,"}",output_str:len())) then
                    output_str = output_str .. ",\n"
                elseif not (string.find(output_str,"\n",output_str:len())) then
                    output_str = output_str .. "\n"
                end

                -- This is necessary for working with HUGE tables otherwise we run out of memory using concat on huge strings
                table.insert(output,output_str)
                output_str = ""

                local key
                if (type(k) == "number" or type(k) == "boolean") then
                    key = "["..tostring(k).."]"
                else
                    key = "['"..tostring(k).."']"
                end

                if (type(v) == "number" or type(v) == "boolean") then
                    output_str = output_str .. string.rep('\t',depth) .. key .. " = "..tostring(v)
                elseif (type(v) == "table") then
                    output_str = output_str .. string.rep('\t',depth) .. key .. " = {\n"
                    table.insert(stack,node)
                    table.insert(stack,v)
                    cache[node] = cur_index+1
                    break
                else
                    output_str = output_str .. string.rep('\t',depth) .. key .. " = '"..tostring(v).."'"
                end

                if (cur_index == size) then
                    output_str = output_str .. "\n" .. string.rep('\t',depth-1) .. "}"
                else
                    output_str = output_str .. ","
                end
            else
                -- close the table
                if (cur_index == size) then
                    output_str = output_str .. "\n" .. string.rep('\t',depth-1) .. "}"
                end
            end

            cur_index = cur_index + 1
        end

        if (size == 0) then
            output_str = output_str .. "\n" .. string.rep('\t',depth-1) .. "}"
        end

        if (#stack > 0) then
            node = stack[#stack]
            stack[#stack] = nil
            depth = cache[node] == nil and depth + 1 or depth - 1
        else
            break
        end
    end

    -- This is necessary for working with HUGE tables otherwise we run out of memory using concat on huge strings
    table.insert(output,output_str)
    output_str = table.concat(output)

    return output_str
end