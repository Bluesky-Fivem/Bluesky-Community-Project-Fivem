AddEventHandler('Police:Shared:DependencyUpdate', RetrieveComponents)
function RetrieveComponents()
  Callbacks = exports['bs_base']:FetchComponent('Callbacks')
  Logger = exports['bs_base']:FetchComponent('Logger')
  UI = exports['bs_base']:FetchComponent('UI')
  Keybinds = exports['bs_base']:FetchComponent('Keybinds')
end

AddEventHandler('Core:Shared:Ready', function()
  exports['bs_base']:RequestDependencies('Phone', {
    'Callbacks',
    'Logger',
    'UI',
    'Keybinds',
  }, function(error)
    if #error > 0 then return end
    RetrieveComponents()
  end)
end)
