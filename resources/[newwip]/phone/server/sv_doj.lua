RPC.register("pnp-gov:getDOJData", function(pSource)
    local user = exports["pnp-base"]:getModule("Player"):GetUser(pSource)
    local cid = user:getCurrentCharacter().id
    local list = Await(SQL.execute("SELECT * FROM doj_duty", {}))
    local myData = Await(SQL.execute("SELECT status FROM doj_duty WHERE cid = @cid", {
        ["cid"] = cid
    }))

    local status = "None"

    if myData[1] ~= nil then
        status = myData[1].status
    end

    return list, status
end)

RPC.register("pnp-gov:dojApp:setStatus", function(pSource, pJob, pStatus)
    local user = exports["pnp-base"]:getModule("Player"):GetUser(pSource)
    local cid = user:getCurrentCharacter().id
    local update = Await(SQL.execute("UPDATE doj_duty SET status = @status WHERE cid = @cid AND job = @job", {
        ["status"] = pStatus.param,
        ["cid"] = cid,
        ["job"] = pJob.param
    }))
end)