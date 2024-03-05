RPC.register("pnp-racing:setAlias", function(pSource, pUsedItemId, pUsedItemSlot, pUsedItemMetadata, pAlias)
    local user = exports["pnp-base"]:getModule("Player"):GetUser(pSource)
    local char = user:getCurrentCharacter()
    local metaData = json.encode({
        characterId = char.id,
        Alias = pAlias.param,
        _hideKeys = {'characterId'}
    })

    local pName = "ply-" .. char.id

    local count = Await(SQL.execute("SELECT COUNT(*) AS total FROM _racing_aliases WHERE alias = @alias", {
        ["alias"] = pAlias.param
    }))

    local nameTaken = false
    if count[1].total > 0 then nameTaken = true else nameTaken = false end

    local msg = "Alias already taken!"
    if nameTaken then return false, msg end

    local data = Await(SQL.execute("UPDATE user_inventory2 SET information = @information WHERE item_id = @item_id AND slot = @slot AND name = @name", {
        ["information"] = metaData,
        ["item_id"] = pUsedItemId.param,
        ["slot"] = pUsedItemSlot.param,
        ["name"] = pName
    }))

    local data = Await(SQL.execute("INSERT INTO _racing_aliases (alias, cid) VALUES (@alias, @cid)", {
        ["alias"] = pAlias.param,
        ["cid"] = char.id
    }))

    if not data then return false end

    return true
end)