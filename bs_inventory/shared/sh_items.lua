--- @class ITEM
--- @field label string
--- @field description string
--- @field weight number
--- @field price number
--- @field isStackable boolean

--- @type ITEM[]
SHARED_ITEMS = {}

SHARED_ITEMS["water"] = {
  label = "Water",
  description = "Sates Thirst",
  weight = 1,
  price = 10,
  isStackable = true,
}

SHARED_ITEMS["bread"] = {
  label = "Bread",
  description = "Sates Hunger",
  weight = 1,
  price = 10,
  isStackable = true,
}

SHARED_ITEMS["mobilephone"] = {
  label = "Mobile Phone",
  weight = 1,
  price = 400,
  isStackable = true,
}

SHARED_ITEMS["armour"] = {
  label = "Chest Armour",
  description = "Protects you from physical injury or damage.",
  weight = 40,
  price = 400,
  isStackable = true,
}

SHARED_ITEMS["radio"] = {
  label = "Radio",
  description = "Used to chat with other people on radio channels.",
  weight = 5,
  price = 3000,
  isStackable = true,
}

SHARED_ITEMS["heartstopper"] = {
  label = "Heart Stopper",
  description = "Sates Hunger and reduces stress.",
  weight = 1,
  price = 20,
  isStackable = true,
}

SHARED_ITEMS["card"] = {
  label = "Bank Card",
  weight = 0,
  price = 20,
  isStackable = true,
}
