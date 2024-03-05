RPC.register("getCharacterInfo", function(pSource, pCid)
    local data = Await(SQL.execute("SELECT * FROM characters WHERE _id = @cid", {
        ["cid"] = pCid.param
    }))
 
    -- local licenses = Await(SQL.execute("SELECT * FROM user_licenses WHERE cid = @cid", {
    --     ["cid"] = pCid.param
    -- }))

    --if not data then return false, "" end
    --if not licenses then return false, "" end
    --userlicenses = {}
    --print("yo")
    -- for k,v in pairs(licenses) do
    --     --print("for loop", k, v)
    --     local licensestatus = false
    --     if tonumber(v.status) == 1 then
    --         licensestatus = true
    --     end


    --     userlicenses[#userlicenses+1] = {
    --         type = v.type,
    --         status = licensestatus
    --     }
    -- end

    --print("return") ---####  TODO

    return data[1]._id or 0, data[1].Phone or 0, data[1].Cash or 0, data[1].Bank or 0, 0--userlicenses
end)