Logger = nil

AddEventHandler('Keybinds:Shared:DependencyUpdate', RetrieveComponents)
function RetrieveComponents()
  Logger = exports['bs_base']:FetchComponent('Logger')
  Keybinds = exports['bs_base']:FetchComponent('Keybinds')
end

AddEventHandler('Core:Shared:Ready', function()
  exports['bs_base']:RequestDependencies('Keybinds', {
    'Logger',
    'Keybinds'
  }, function(error)
    if #error > 0 then return end -- Do something to handle if not all dependencies loaded
    RetrieveComponents()
  end)
end)

local KeyNames = {
  b_100 = 'Mouse 1', b_101 = 'Mouse 2', b_102 = 'Mouse 3', b_103 = 'Mouse 4', b_104 = 'Mouse 5', b_105 = 'Mouse 6', b_106 = 'Mouse 7', b_107 = 'Mouse 8', b_108 = 'Mouse left', b_109 = 'Mouse right', 
  b_110 = 'Mouse up', b_111 = 'Mouse down', b_112 = 'Mouse left/right', b_113 = 'Mouse up/down', b_114 = 'Mouse', b_115 = 'Scroll up', b_116 = 'Scroll down', b_117 = 'Scroll wheel', b_130 = 'Num -', b_131 = 'Num +',
  b_132 = 'Num .', b_133 = 'Num /', b_134 = 'Num *', b_135 = 'Num Enter', b_136 = 'Num 0', b_137 = 'Num 1', b_138 = 'Num 2', b_139 = 'Num 3', b_140 = 'Num 4', b_141 = 'Num 5',
  b_142 = 'Num 6', b_143 = 'Num 7', b_144 = 'Num 8', b_145 = 'Num 9', b_146 = 'Num =', b_147 = 'Num ,', b_148 = 'Num ÷', b_149 = 'Num x', b_150 = 'Intro', b_170 = 'F1',
  b_171 = 'F2', b_172 = 'F3', b_173 = 'F4', b_174 = 'F5', b_175 = 'F6', b_176 = 'F7', b_177 = 'F8', b_178 = 'F9', b_179 = 'F10', b_180 = 'F11',
  b_181 = 'F12', b_182 = 'F13', b_183 = 'F14', b_184 = 'F15', b_185 = 'F16', b_186 = 'F17', b_187 = 'F18', b_188 = 'F19', b_189 = 'F20', b_190 = 'F21',
  b_191 = 'F22', b_192 = 'F23', b_193 = 'F24', b_194 = 'Up Arrow', b_195 = 'Down Arrow', b_196 = 'Left Arrow', b_197 = 'Right Arrow', b_198 = 'Del', b_199 = 'Esc', b_200 = 'Ins',
  b_201 = 'End', b_202 = 'Suppr', b_203 = 'Échap', b_204 = 'Fin', b_205 = 'Entf', b_206 = 'Einfg', b_207 = 'Ende', b_208 = 'Canc', b_209 = 'Fine', b_210 = 'Supr',
  b_211 = 'Insertar', b_212 = 'Fin', b_213 = 'Supr', b_214 = 'Insertar', b_215 = 'Fin', b_216 = '¨', b_217 = '`', b_995 = '???', b_998 = '+', b_1000 = 'L Shift',
  b_1001 = 'R Shift', b_1002 = 'Tab', b_1003 = 'Enter', b_1004 = 'Backspace', b_1005 = 'Print Screen', b_1006 = 'Scroll Lock', b_1007 = 'Pause', b_1008 = 'Home', b_1009 = 'Page Up', b_1010 = 'Page Down',
  b_1011 = 'Num Lock', b_1012 = 'Caps', b_1013 = 'L Ctrl', b_1014 = 'R Ctrl', b_1015 = 'L Alt', b_1016 = 'R Alt', b_1017 = 'Menu', b_1018 = 'L Win', b_1019 = 'R Win', b_1020 = 'Imppr écran',
  b_1021 = 'Arrèt défil', b_1025 = 'Verr Numm', b_1026 = 'Verr Maj', b_1027 = 'Ctrl G', b_1028 = 'Ctrl D', b_1029 = 'Druck', b_1030 = 'Rollen ↓', b_1031 = 'Pos 1', b_1032 = 'Bild ↑', b_1033 = 'Bild ↓',
  b_1034 = 'Num ↓', b_1036 = 'Strg L', b_1037 = 'Strg R', b_1038 = 'Maiusc sx', b_1039 = 'Maiusc dx', b_1040 = 'Invio', b_1041 = 'Stampa', b_1042 = 'Bloc Scorr', b_1043 = 'Pausa', b_1045 = 'Pag ↑',
  b_1046 = 'Pag ↓', b_1047 = 'Bloc Num', b_1048 = 'Bloc Maiusc', b_1049 = 'Ctrl sx', b_1050 = 'Ctrl dx', b_1051 = 'Alt gr', b_1052 = 'Impr Pant', b_1053 = 'Bloq Despl', b_1054 = 'Pausa', b_1055 = 'Inicio',
  b_1056 = 'Re Pág', b_1057 = 'Av Pág', b_1058 = 'Bloq Num', b_1059 = 'Bloq Mayús', b_1060 = 'Ctrl I', b_1061 = 'Ctrl D', b_1062 = 'Menú', b_1063 = 'Impr Pant', b_1064 = 'Bloq Despl', b_1065 = 'Pausa',
  b_1066 = 'Inicio', b_1067 = 'Re Pág', b_1068 = 'Av Pág', b_1069 = 'Bloq Num', b_1070 = 'Mayús', b_1071 = 'Opsciones', b_1072 = 'Maj G', b_1073 = 'Maj D', b_1074 = 'Alt', b_1075 = 'Alt D',
  b_1076 = 'I Shift', b_1077 = 'D Shift', b_2000 = 'Space'
}

KEYBINDS = {
  
  GetCustomizedKey = function(CommandString)
    local RawKey = GetControlInstructionalButton(2, GetHashKey("+bs_" .. CommandString) | 0x80000000, true)
    local NormalKey = string.gsub(RawKey, "^t_", "")
    if NormalKey ~= RawKey then
      return NormalKey
    elseif KeyNames[RawKey] then
      return KeyNames[RawKey]
    else
      return RawKey
    end
	end,

  AddKeybind = function(CommandString, Category, Description, DefaultParameter, OnKey, Event, IsHold, DefaultWrapper)
    local Pressed = false
    RegisterCommand('+bs_'..CommandString, function()
      if IsPauseMenuActive() then return end
      if IsHold and Pressed then return end
      Pressed = true
  
      if OnKey then OnKey(true) end
      if Event ~= nil and Event ~= '' then TriggerEvent(Event, true) end
    end, false)
  
    RegisterCommand('-bs_'..CommandString, function()
      if IsPauseMenuActive() then return end
      if IsHold then Pressed = false end
  
      if OnKey then OnKey(false) end
      if Event ~= nil and Event ~= '' then TriggerEvent(Event, false) end
    end, false)
  
    RegisterKeyMapping('+bs_'..CommandString, Category..' - ' .. Description, DefaultWrapper or 'keyboard', DefaultParameter)
  end
}
    
  

AddEventHandler('Proxy:Shared:RegisterReady', function()
  exports['bs_base']:RegisterComponent('Keybinds', KEYBINDS)
end)

CreateThread(function()
	while true do
		DisableControlAction(1, 199, true)
		Wait(5)
	end
end)