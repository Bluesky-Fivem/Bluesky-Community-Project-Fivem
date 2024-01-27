RegisterNUICallback('bs-context:close', function()
    UI.ContextUIClose()
    SetNuiFocus(false, false)
end)


RegisterNUICallback('bs-context:pressButton', function(data)
    Citizen.Wait(200)
    UI.ContextUIClose()

    if data.parameters then
        SetNuiFocus(false, false)
        if data.server then
            TriggerServerEvent(data.event, data.parameters)
        else
            TriggerEvent(data.event, data.parameters)
        end
    else
        SetNuiFocus(false, false)
        if data.server then
            TriggerServerEvent(data.event)
        else
            TriggerEvent(data.event)
        end
    end
end)


UI = {
    UIMessage = function(NuiAction, NuiData)
        SendNUIMessage({
            action = NuiAction,
            data = NuiData
        })
    end,

    ContextOpen = function(data)
        SetNuiFocus(true, true)
        UI.UIMessage('bs-context:setData', data)
        UI.UIMessage('bs-context:open', true)
    end,

    ContextClose = function()
        UI.UIMessage('bs-context:open', false)
        UI.ContextUIOpen({title = '', data = {}})
    end,
}

AddEventHandler('Proxy:Shared:RegisterReady', function()
    exports['bs_base']:RegisterComponent('Context', UI)
end)

---EXAMPLE -----


-- Context.ContextOpen {
--     title = 'Emote Menu',
--     data = {
--         {
--             title = "Animations",
--             description = "Browse over 300 Animations!",
--             event = "bs-emotes:AnimationsMenu",
--             parameters = {}
--         },
        
--     }
-- }