UI = {
  _required = { 'SendUIMessage', 'SetFocus' },

  --- @param action string The action you wish to target
  --- @param data any The data you wish to send along with this action
  SendUIMessage = function(self, action, data)
    SendNUIMessage({
      action = action,
      data = data
    })
  end,

  --- @param shouldFocus boolean Whether or not to focus the NUI frame
  --- @param cursor? number The cursor location you wish to set
  SetFocus = function(self, shouldFocus, cursor)
    SetNuiFocus(shouldFocus, shouldFocus)

    if cursor then
      SetCursorLocation(cursor, cursor)
    end
  end,

  

  Balance = {
    ShowCash = function(self, currentCash)
      UI:SendUIMessage('balance:showCash', currentCash)
    end,

    UpdateCash = function(self, currentCash, toUpdate)
      UI:SendUIMessage('balance:updateCash', {
        currentCash = currentCash,
        toUpdate = toUpdate
      })
    end,
  },

  Voip = {
    --- @param data any
    UpdateTalking = function(self, data)
      UI:SendUIMessage('voip:updateTalkingStatus', data)
    end,

    --- @param enabled boolean Whether or not to enable the voip listener
    ToggleRadio = function(self, enabled)
      UI:SendUIMessage('voip:toggleRadio', enabled)
    end,
  },

  Action = {
    --- @param actionText string The text you wish to display on the action bar.
    --- @param color "success" | "error" | "default" The color you wish to display the action bar in.
    Show = function(self, actionText, color)
      local aux = {
        action = actionText,
        colorType = color or "default",
      }

      UI:SendUIMessage('hud:action:showInteraction', aux)
    end,

    Hide = function(self)
      UI:SendUIMessage('hud:action:hideInteraction')
    end,
  }
}

AddEventHandler('Proxy:Shared:RegisterReady', function()
  exports['bs_base']:RegisterComponent('UI', UI)
end)

CreateThread(function() while true do collectgarbage("collect") Wait(30000) end end)
