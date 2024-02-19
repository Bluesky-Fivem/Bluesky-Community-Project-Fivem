AddEventHandler('Wallet:Shared:DependencyUpdate', RetrieveComponents)
function RetrieveComponents()
  Logger = exports['bs_base']:FetchComponent('Logger')
  Callbacks = exports['bs_base']:FetchComponent('Callbacks')
  Wallet = exports['bs_base']:FetchComponent('Wallet')
  CurrencyConfig = exports['bs_base']:FetchComponent('Config').Currency
  UI = exports['bs_base']:FetchComponent('UI')
end

AddEventHandler('Core:Shared:Ready', function()
  exports['bs_base']:RequestDependencies('Wallet', {
    'Logger',
    'Callbacks',
    'Wallet',
    'Config',
    'UI'
  }, function(error)
    if #error > 0 then
      return
    end -- Do something to handle if not all dependencies loaded
    RetrieveComponents()
    RegisterCallbacks()
  end)
end)

function RegisterCallbacks()
  Callbacks:RegisterServerCallback('Wallet:GetCash', function(source, data, cb)
    local player = exports['bs_base']:FetchComponent('Fetch'):Source(source)
    local char = player:GetData('Character')
    Wallet:Get(char, function(wallet)
      cb(wallet.Cash)
    end)
  end)
end



WALLET = {
  
  Get = function(self, char, cb)
    MySQL.Async.fetchAll('SELECT * FROM characters WHERE _id = @char', {
      ['@char'] = char:GetData('ID')
    }, function(results)
      if results and #results > 0 then
        local _data = results[1]
        _data.Modify = function(self, amount)
          MySQL.Async.execute('UPDATE characters SET Cash = Cash + @amount WHERE _id = @char', {
            ['@amount'] = amount,
            ['@char'] = _data.Char
          })
        end
        cb(_data)
      else
        Logger:Error('Wallet', "Looking for non-existent Wallet")
        cb(nil)
      end
    end)
  end,

  Add = function(self, char, amount)
    Wallet:Get(char, function(wallet)
      if wallet then
        UI.Balance:UpdateCash(char:GetData('Source'), wallet.Cash, amount)
        wallet:Modify(amount)
      end
    end)
  end,

  Remove = function(self, char, amount)
    Wallet:Get(char, function(wallet)
      if wallet then
        UI.Balance:UpdateCash(char:GetData('Source'), wallet.Cash, -amount)
        wallet:Modify(-amount)
      end
    end)
  end,
}

AddEventHandler('Proxy:Shared:RegisterReady', function()
  exports['bs_base']:RegisterComponent('Wallet', WALLET)
end)



RegisterServerEvent('Wallet:Server:GiveCash')
AddEventHandler('Wallet:Server:GiveCash', function(cash)
  local player = exports['bs_base']:FetchComponent('Fetch'):Source(source)
  local char = player:GetData('Character')
  Wallet:Add(char, cash)
end)

RegisterServerEvent('Wallet:Server:RemoveCash')
AddEventHandler('Wallet:Server:RemoveCash', function(cash)
  local player = exports['bs_base']:FetchComponent('Fetch'):Source(source)
  local char = player:GetData('Character')
  Wallet:Remove(char, cash)
end)
