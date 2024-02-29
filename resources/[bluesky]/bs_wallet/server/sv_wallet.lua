AddEventHandler('Wallet:Shared:DependencyUpdate', RetrieveComponents)
function RetrieveComponents()
  Logger = exports['bs_base']:FetchComponent('Logger')
  Callbacks = exports['bs_base']:FetchComponent('Callbacks')
  Execute = exports['bs_base']:FetchComponent('Execute')
  Wallet = exports['bs_base']:FetchComponent('Wallet')
  CurrencyConfig = exports['bs_base']:FetchComponent('Config').Currency
  Chat = exports['bs_base']:FetchComponent('Chat')
  Fetch = exports["bs_base"]:FetchComponent('Fetch')
end

AddEventHandler('Core:Shared:Ready', function()
    exports['bs_base']:RequestDependencies('Wallet', {
        'Logger',
        'Callbacks',
        'Execute',
        'Wallet',
        'Config',
        'Fetch',
        'Chat',
    }, function(error)
        if #error > 0 then
            return
        end -- Do something to handle if not all dependencies loaded
        RetrieveComponents()
        RegisterChatCommands()
        RegisterCallbacks()
    end)
end)

local taxRate = 0.1 

local jobPayRates = {
  ["police"] = 1500,
  ["ems"] = 1300,
}

local function CalculatePaycheckAmount(grossPaycheckAmount)
  local taxAmount = math.floor(grossPaycheckAmount * taxRate)
  
  local netPaycheckAmount = grossPaycheckAmount - taxAmount
  
  return netPaycheckAmount, taxAmount
end

local function GivePlayerPaycheck(playerId, grossPaycheckAmount)
  local netPaycheckAmount, taxAmount = CalculatePaycheckAmount(grossPaycheckAmount)
  
  Wallet:ModifyBank(playerId, netPaycheckAmount)
  
  TriggerClientEvent('Notification:SendAlert', playerId, "You received your paycheck of $" .. netPaycheckAmount .. " after $" .. taxAmount .. " in taxes", 2500)
end

function GivePaychecksToAllPlayers()
  local allPlayers = exports['bs_base']:FetchComponent('Fetch'):All()
  for src,playerData in pairs(allPlayers) do
    local player = Fetch:Source(src):GetData("Character")
    local job = player:GetData('Job').job
    if job ~= nil and jobPayRates[job] ~= nil then
      local grossPaycheckAmount = 1000
      GivePlayerPaycheck(src, grossPaycheckAmount)
    end
  end
end

Citizen.CreateThread(function()
  while true do
      GivePaychecksToAllPlayers()
      Citizen.Wait(600000)
  end
end)


function RegisterCallbacks()
    Callbacks:RegisterServerCallback("Wallet:GetCash", function(source, data, cb)
		cb(Wallet:Get(source))
    end)

    Callbacks:RegisterServerCallback("Wallet:GetBank", function(source, data, cb)
      cb(Wallet:GetBank(source))
    end)


	Chat:RegisterAdminCommand("addcash", function(source, args, rawCommand)
		local addingAmount = tonumber(args[1])
		if addingAmount and addingAmount > 0 then
			Wallet:Modify(source, addingAmount)
		end
	end, {
		help = "Give Cash To Yourself",
		params = {
			{
				name = "Amount",
				help = "Amount of cash to give",
			},
		},
	}, 1)
end

function RegisterChatCommands()
  Chat:RegisterCommand('cash1', function(source, args, data, rawCommand)
    local char = Fetch:Source(source):GetData("Character")
    if char ~= nil then 
      local cash = char:GetData('Cash')
      TriggerClientEvent('Notification:SendAlert', source, "You have $".. tonumber(cash) ,2500)
    end   
  end, {
    help = 'Show Current Cash'
  },0)

  Chat:RegisterCommand('bank', function(source, args, data, rawCommand)
    local char = Fetch:Source(source):GetData("Character")
    if char ~= nil then 
      local bank = char:GetData('Bank')
      TriggerClientEvent('Notification:SendAlert', source, "You have $".. tonumber(bank) ,2500)
    end   
  end, {
    help = 'Show Current Bank'
  },0)




end



WALLET = {
	Get = function(self, source)
		local char = Fetch:Source(source):GetData("Character")
		if char then
			return char:GetData("Cash") or 0
		end
		return 0
	end,
	Has = function(self, source, amount)
		local char = Fetch:Source(source):GetData("Character")
		if char and amount > 0 then
			local currentCash = char:GetData("Cash") or 0
			if currentCash >= amount then
				return true
			end
		end
		return false
	end,
	Modify = function(self, source, amount, skipNotify)
		local char = Fetch:Source(source):GetData("Character")
		if char then
			local currentCash = char:GetData("Cash") or 0
			local newCashBalance = math.floor(currentCash + amount)
			if newCashBalance >= 0 then
				char:SetData("Cash", newCashBalance)

				if not skipNotify then
					if amount < 0 then
						TriggerClientEvent('Notification:SendAlert',source, string.format("You Paid $%s In Cash",(amount)))
					else
						TriggerClientEvent('Notification:SendAlert', source, string.format("You Received $%s In Cash", (amount)))
					end
				end
				return newCashBalance
				
			end
		end
		return false
	end,

 --bank 

  GetBank = function(self, source)
    local char = Fetch:Source(source):GetData("Character")
    if char then
      return char:GetData("Bank") or 0
    end
    return 0
  end,
  HasBank = function(self, source, amount)
    local char = Fetch:Source(source):GetData("Character")
    if char and amount > 0 then
      local currentBank = char:GetData("Bank") or 0
      if currentBank >= amount then
        return true
      end
    end
    return false
  end,
  ModifyBank = function(self, source, amount, skipNotify)
    local char = Fetch:Source(source):GetData("Character")
    if char then
      local currentBank = char:GetData("Bank") or 0
      local newBankBalance = math.floor(currentBank + amount)
      if newBankBalance >= 0 then
        char:SetData("Bank", currentBank)

        if not skipNotify then
          if amount < 0 then
            TriggerClientEvent('Notification:SendAlert',source, string.format("You Paid $%s In Bank",(amount)))
          else
            TriggerClientEvent('Notification:SendAlert', source, string.format("You Received $%s In Bank", (amount)))
          end
        end
        return newBankBalance
        
      end
    end
    return false
  end,

}





AddEventHandler('Proxy:Shared:RegisterReady', function()
    exports['bs_base']:RegisterComponent('Wallet', WALLET)
end)