Phone.Contacts = {
  Create = function(self, data)
    TriggerServerEvent('Phone:Contacts:Create', data)
    Phone.Contacts:Get()
  end,

  Update = function(self, data)
    TriggerServerEvent('Phone:Contacts:Update', data)
    Phone.Contacts:Get()
  end,

  Delete = function(self, data)
    TriggerServerEvent('Phone:Contacts:Delete', data)
    Phone.Contacts:Get()
  end,

  Get = function(self)
    Callbacks:ServerCallback('Phone:Contacts:Get', {}, function(contacts)
      UI:SendUIMessage('phone:updatePhoneContacts', contacts)
    end)
  end,
}
