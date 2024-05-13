function generateAnonymousName() {
  const adjectives = [
    // Cool theme
    "Cool",
    "Awesome",
    "Rad",
    "Epic",
    "Slick",
    "Chill",
    "Groovy",
    "Dope",
    "Funky",
    "Swag",
    // Creative theme
    "Creative",
    "Imaginative",
    "Innovative",
    "Original",
    "Artistic",
    "Visionary",
    "Inspired",
    "Experimental",
    "Expressive",
    "Unconventional",
    // Mysterious theme
    "Mysterious",
    "Enigmatic",
    "Cryptic",
    "Secretive",
    "Ethereal",
    "Arcane",
    "Obscure",
    "Elusive",
    "Shadowy",
    "Veiled",
    // Warrior theme
    "Warrior",
    "Brave",
    "Fearless",
    "Valiant",
    "Mighty",
    "Heroic",
    "Courageous",
    "Fierce",
    "Bold",
    "Spirited",
    // Tech theme
    "Digital",
    "Cyber",
    "Virtual",
    "Techno",
    "Pixel",
    "Binary",
    "Algorithmic",
    "Giga",
    "Nano",
    "Smart",
    // Nature theme
    "Wild",
    "Green",
    "Sunny",
    "Breezy",
    "Floral",
    "Oceanic",
    "Mountain",
    "Vivid",
    "Natural",
    "Serene",
    // Space theme
    "Galactic",
    "Cosmic",
    "Stellar",
    "Nebula",
    "Astro",
    "Lunar",
    "Solar",
    "Orbital",
    "Celestial",
    "Interstellar",
    // Fantasy theme
    "Mythical",
    "Magical",
    "Enchanted",
    "Fantastical",
    "Whimsical",
    "Fabled",
    "Legendary",
    "Mystical",
    "Fairy",
    "Epic",
    // Gaming theme
    "Gamer",
    "Pro",
    "Legend",
    "Elite",
    "Boss",
    "Master",
    "Noob",
    "Pixel",
    "Retro",
    "Arcade",
    // Animal theme
    "Fierce",
    "Wild",
    "Majestic",
    "Cunning",
    "Graceful",
    "Swift",
    "Mighty",
    "Savage",
    "Noble",
    "Fearless",
    // Dinosaur theme
    "Ferocious",
    "Ancient",
    "Jurassic",
    "Tyrannical",
    "Prehistoric",
    "Mighty",
    "Roaring",
    "Massive",
    "Raptor",
    "Stomping",
    // Asteroid theme
    "Astral",
    "Celestial",
    "Meteor",
    "Cometary",
    "Orbital",
    "Interstellar",
    "Cosmic",
    "Stellar",
    "Galactic",
    "Nebular",
  ];

  const nouns = [
    // Ninja theme
    "Ninja",
    "Shinobi",
    "Assassin",
    "Sensei",
    "Ronin",
    "Shadow",
    "Stealth",
    "Blade",
    "Shuriken",
    "Dojo",
    // Tech theme
    "Geek",
    "Nerd",
    "Coder",
    "Hacker",
    "Byte",
    "Chip",
    "Data",
    "Matrix",
    "Cyber",
    "Bot",
    // Nature theme
    "Leaf",
    "Blossom",
    "River",
    "Sunset",
    "Meadow",
    "Tree",
    "Wave",
    "Star",
    "Forest",
    "Storm",
    // Space theme
    "Cosmos",
    "Planet",
    "Galaxy",
    "Star",
    "Asteroid",
    "Comet",
    "Orbit",
    "Rocket",
    "Alien",
    "Explorer",
    // Fantasy theme
    "Dragon",
    "Wizard",
    "Sorcerer",
    "Mage",
    "Elf",
    "Fairy",
    "Troll",
    "Orc",
    "Knight",
    "Quest",
    // Gaming theme
    "Gamer",
    "Champion",
    "Boss",
    "Noob",
    "Avatar",
    "Guild",
    "Loot",
    "Quest",
    "Raid",
    "Respawn",
    // Animal theme
    "Wolf",
    "Tiger",
    "Lion",
    "Eagle",
    "Bear",
    "Panther",
    "Fox",
    "Hawk",
    "Dragonfly",
    "Cobra",
    // Vehicle theme
    "Racer",
    "Driver",
    "Pilot",
    "Captain",
    "Cruiser",
    "Jet",
    "Speedster",
    "Navigator",
    "Voyager",
    "Rocket",
    // Pirate theme
    "Pirate",
    "Captain",
    "Buccaneer",
    "Corsair",
    "Privateer",
    "Scallywag",
    "Swashbuckler",
    "Freebooter",
    "Rogue",
    "Plunderer",
    // Zombie theme
    "Zombie",
    "Walker",
    "Infected",
    "Undead",
    "Ghoul",
    "Flesh Eater",
    "Cadaver",
    "Revenant",
    "Lich",
    "Necromancer",
    // Dinosaur theme
    "Tyrannosaur",
    "Stegosaur",
    "Velociraptor",
    "Triceratops",
    "Brachiosaur",
    "Pterosaur",
    "Ankylosaur",
    "Allosaur",
    "Diplodocus",
    "Archaeopteryx",
    // Asteroid theme
    "Meteorite",
    "Comet",
    "Cosmos",
    "Galaxy",
    "Stardust",
    "Nebula",
    "Cosmonaut",
    "Orbit",
    "Spacecraft",
    "Satellite",
  ];

  const randomAdjective =
    adjectives[Math.floor(Math.random() * adjectives.length)];
  const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];

  return `${randomAdjective} ${randomNoun}`;
}

module.exports = { generateAnonymousName };
