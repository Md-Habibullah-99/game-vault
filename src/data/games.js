const rawGames = [
  {
    id: 1,
    title: "Far Cry 3",
    genre: "First-Person Shooter",
    status: "Played",
    rating: 9.2,
    platform: "PC / PS3 / Xbox 360",
    year: 2012,
    publisher: "Ubisoft",
    developer: "Ubisoft Montreal",
    esrb: "M",
    image: new URL("../assets/farcry3.jpg", import.meta.url).href,
    description: "Beyond the reach of civilization lies a lawless island ruled by absolute violence and psychotic warlords.",
    reqs: {
      os: "Windows 10",
      cpu: "i5-2400",
      gpu: "GTX 480",
      ram: "8 GB",
      storage: "15 GB"
    },
    playtime: "45h"
  },
  {
    id: 2,
    title: "Cyberpunk 2077",
    genre: "Action RPG",
    status: "Playing",
    rating: 8.8,
    platform: "PC / PS5 / PS4 / Xbox Series X / Xbox One",
    year: 2020,
    publisher: "CD Projekt",
    developer: "CD Projekt Red",
    esrb: "M",
    image: new URL("../assets/cyberpunk.jpg", import.meta.url).href,
    description: "Night City is a megalopolis obsessed with power, glamour and body modification. Become V and explore a neon future.",
    reqs: {
      os: "Windows 11",
      cpu: "Ryzen 5 3600",
      gpu: "RTX 3060 Ti",
      ram: "16 GB",
      storage: "70 GB SSD"
    },
    playtime: "120h"
  },
  {
    id: 3,
    title: "God of War",
    genre: "Action-Adventure",
    status: "Played",
    rating: 9.8,
    platform: "PS4 / PS5 / PC",
    year: 2018,
    publisher: "Sony Interactive",
    developer: "Santa Monica Studio",
    esrb: "M",
    image: new URL("../assets/godOfWar.jpg", import.meta.url).href,
    description: "His vengeance against the Gods of Olympus years behind him, Kratos now lives as a man in the realm of Norse Gods.",
    reqs: {
      os: "Windows 10",
      cpu: "i7-4770K",
      gpu: "GTX 1060",
      ram: "12 GB",
      storage: "70 GB"
    },
    playtime: "60h"
  },
  {
    id: 4,
    title: "Elden Ring",
    genre: "Open-World Action RPG",
    status: "Playing",
    rating: 9.9,
    platform: "PC / PS5 / PS4 / Xbox Series X / Xbox One",
    year: 2022,
    publisher: "Bandai Namco",
    developer: "FromSoftware",
    esrb: "M",
    image: new URL("../assets/eldenring.jpg", import.meta.url).href,
    description: "Rise, Tarnished, and be led by grace to brandish the power of the Elden Ring and become an Elden Lord.",
    reqs: {
      os: "Windows 10",
      cpu: "i5-8400",
      gpu: "GTX 1060",
      ram: "12 GB",
      storage: "60 GB"
    },
    playtime: "210h"
  },
  {
    id: 5,
    title: "Red Dead Redemption 2",
    genre: "Action-Adventure",
    status: "Played",
    rating: 9.7,
    platform: "PC / PS4 / Xbox One / PS5 / Xbox Series X",
    year: 2018,
    publisher: "Rockstar Games",
    developer: "Rockstar Studios",
    esrb: "M",
    image: new URL("../assets/rdr2.jpg", import.meta.url).href,
    description: "Arthur Morgan and the Van der Linde gang are outlaws on the run. Fight your way across the heartland of America.",
    reqs: {
      os: "Windows 10",
      cpu: "i7-4770K",
      gpu: "GTX 1060",
      ram: "12 GB",
      storage: "150 GB"
    },
    playtime: "160h"
  },
  {
    id: 6,
    title: "Spider-Man Remastered",
    genre: "Action-Adventure",
    status: "Wishlist",
    rating: 9.4,
    platform: "PC / PS5",
    year: 2022,
    publisher: "Sony Interactive",
    developer: "Insomniac Games",
    esrb: "T",
    image: new URL("../assets/spiderman.jpg", import.meta.url).href,
    description: "In Marvel’s Spider-Man Remastered, the worlds of Peter Parker and Spider-Man collide in an original story.",
    reqs: {
      os: "Windows 10",
      cpu: "i5-4670",
      gpu: "GTX 1060",
      ram: "16 GB",
      storage: "75 GB SSD"
    },
    playtime: "40h"
  },
  {
    id: 7,
    title: "Resident Evil Village",
    genre: "Survival Horror",
    status: "Played",
    rating: 9.1,
    platform: "PC / PS5 / PS4 / Xbox Series X / Xbox One",
    year: 2021,
    publisher: "Capcom",
    developer: "Capcom",
    esrb: "M",
    image: new URL("../assets/reVillage.jpg", import.meta.url).href,
    description: "Experience survival horror like never before in the eighth major installment in the Resident Evil franchise.",
    reqs: {
      os: "Windows 10",
      cpu: "i7-8700",
      gpu: "RTX 2070",
      ram: "16 GB",
      storage: "50 GB"
    },
    playtime: "25h"
  },
  {
    id: 8,
    title: "Doom Eternal",
    genre: "First-Person Shooter",
    status: "Playing",
    rating: 9.5,
    platform: "PC / PS5 / PS4 / Xbox Series X / Xbox One / Nintendo Switch",
    year: 2020,
    publisher: "Bethesda",
    developer: "id Software",
    esrb: "M",
    image: new URL("../assets/doomEthernal.jpg", import.meta.url).href,
    description: "Hell’s armies have invaded Earth. Become the Slayer in an epic campaign to conquer demons across dimensions.",
    reqs: {
      os: "Windows 10",
      cpu: "i5 @ 3.3 GHz",
      gpu: "GTX 1050Ti",
      ram: "8 GB",
      storage: "80 GB"
    },
    playtime: "22h"
  },
  {
    id: 9,
    title: "Minecraft",
    genre: "Sandbox",
    status: "Played",
    rating: 9.0,
    platform: "PC / PS4 / PS5 / Xbox One / Xbox Series X / Switch / Mobile",
    year: 2011,
    publisher: "Mojang",
    developer: "Mojang Studios",
    esrb: "E",
    image: new URL("../assets/Minecraft.jpg", import.meta.url).href,
    description: "Explore infinite worlds and build everything from the simplest of homes to the grandest of castles.",
    reqs: {
      os: "Win 7+",
      cpu: "i3-3210",
      gpu: "Intel HD 4000",
      ram: "4 GB",
      storage: "4 GB"
    },
    playtime: "1000h"
  },
  {
    id: 10,
    title: "Forza Horizon 5",
    genre: "Racing",
    status: "Wishlist",
    rating: 9.2,
    platform: "PC / Xbox Series X / Xbox One",
    year: 2021,
    publisher: "Xbox Game Studios",
    developer: "Playground Games",
    esrb: "E",
    image: new URL("../assets/forzaHorizon5.jpg", import.meta.url).href,
    description: "Your ultimate Horizon Adventure awaits! Lead breathtaking expeditions across the vibrant landscapes of Mexico.",
    reqs: {
      os: "Windows 10",
      cpu: "i5-4460",
      gpu: "GTX 970",
      ram: "8 GB",
      storage: "110 GB"
    },
    playtime: "50h"
  },
  {
    id: 11,
    title: "The Last of Us Part I",
    genre: "Action-Adventure",
    status: "Played",
    rating: 9.5,
    platform: "PS5 / PC",
    year: 2022,
    publisher: "Sony Interactive",
    developer: "Naughty Dog",
    esrb: "M",
    image: new URL("../assets/lastOfUsP1.jpg", import.meta.url).href,
    description: "A sweeping cinematic adventure where Joel and Ellie fight to survive in a hostile, post-pandemic world.",
    reqs: {
      os: "Windows 10",
      cpu: "i7-4770K",
      gpu: "GTX 1050 Ti",
      ram: "16 GB",
      storage: "100 GB SSD"
    },
    playtime: "30h"
  },
  {
    id: 12,
    title: "Assassin's Creed Valhalla",
    genre: "Action RPG",
    status: "Playing",
    rating: 8.4,
    platform: "PC / PS4 / PS5 / Xbox One / Xbox Series X",
    year: 2020,
    publisher: "Ubisoft",
    developer: "Ubisoft Montreal",
    esrb: "M",
    image: new URL("../assets/Assassins-Creed-Valhalla.avif", import.meta.url).href,
    description: "Become Eivor, a legendary Viking raider. Explore England's Dark Ages as you raid your enemies.",
    reqs: {
      os: "Windows 10",
      cpu: "Ryzen 3 1200",
      gpu: "GTX 960",
      ram: "8 GB",
      storage: "160 GB"
    },
    playtime: "140h"
  },
  {
    id: 13,
    title: "Valorant",
    genre: "Tactical FPS",
    status: "Playing",
    rating: 8.2,
    platform: "PC",
    year: 2020,
    publisher: "Riot Games",
    developer: "Riot Games",
    esrb: "T",
    image: new URL("../assets/valorant.jpg", import.meta.url).href,
    description: "A character-based 5v5 tactical shooter where precise gunplay meets unique agent abilities.",
    reqs: {
      os: "Windows 10",
      cpu: "i3-4150",
      gpu: "GT 730",
      ram: "4 GB",
      storage: "20 GB"
    },
    playtime: "500h"
  },
  {
    id: 14,
    title: "Ghost of Tsushima",
    genre: "Action-Adventure",
    status: "Wishlist",
    rating: 9.6,
    platform: "PS4 / PS5 / PC",
    year: 2020,
    publisher: "Sony Interactive",
    developer: "Sucker Punch",
    esrb: "M",
    image: new URL("../assets/ghost-of-tsushima.jpg", import.meta.url).href,
    description: "Jin Sakai must embrace the way of the Ghost to protect Tsushima from the invading Mongol forces.",
    reqs: {
      os: "Windows 10",
      cpu: "i5-8600",
      gpu: "RTX 2060",
      ram: "16 GB",
      storage: "75 GB SSD"
    },
    playtime: "70h"
  },
  {
    id: 15,
    title: "Apex Legends",
    genre: "Battle Royale Shooter",
    status: "Playing",
    rating: 8.7,
    platform: "PC / PS4 / PS5 / Xbox One / Xbox Series X / Switch",
    year: 2019,
    publisher: "EA",
    developer: "Respawn",
    esrb: "T",
    image: new URL("../assets/apexLegends.jpg", import.meta.url).href,
    description: "Conquer with character in Apex Legends, a free-to-play hero shooter where legendary combatants fight for glory.",
    reqs: {
      os: "Windows 7+",
      cpu: "i3-6300",
      gpu: "GT 640",
      ram: "6 GB",
      storage: "56 GB"
    },
    playtime: "300h"
  },
  {
    id: 16,
    title: "Sekiro: Shadows Die Twice",
    genre: "Souls-like",
    status: "Wishlist",
    rating: 9.5,
    platform: "PC / PS4 / Xbox One",
    year: 2019,
    publisher: "Activision",
    developer: "FromSoftware",
    esrb: "M",
    image: new URL("../assets/sekiro.jpg", import.meta.url).href,
    description: "Carve your own clever path to vengeance in the award-winning adventure from developer FromSoftware.",
    reqs: {
      os: "Windows 10",
      cpu: "i5-2500K",
      gpu: "GTX 760",
      ram: "8 GB",
      storage: "25 GB"
    },
    playtime: "60h"
  },
  {
    id: 17,
    title: "The Witcher 3",
    genre: "Action RPG",
    status: "Played",
    rating: 9.6,
    platform: "PC / PS4 / Xbox One / Switch",
    year: 2015,
    publisher: "CD Projekt",
    developer: "CD Projekt Red",
    esrb: "M",
    image: new URL("../assets/witcher3.webp", import.meta.url).href,
    description: "As monster hunter Geralt of Rivia, track down the Child of Prophecy in the vast, war-torn Continent.",
    reqs: {
      os: "Windows 10",
      cpu: "i7-3770 / AMD FX-8350",
      gpu: "GTX 770 / Radeon R9 290",
      ram: "8 GB",
      storage: "35 GB"
    },
    playtime: "100h"
  },
  {
    id: 18,
    title: "Battlefield 2042",
    genre: "FPS",
    status: "Playing",
    rating: 7.0,
    platform: "PC / PS4 / PS5 / Xbox One / Xbox Series X",
    year: 2021,
    publisher: "EA",
    developer: "DICE",
    esrb: "M",
    image: new URL("../assets/battlefield2042.jpg", import.meta.url).href,
    description: "Battlefield 2042 is a first-person shooter that marks the return to the iconic all-out warfare of the franchise.",
    reqs: {
      os: "Windows 10",
      cpu: "i5 6600K",
      gpu: "GTX 1050 Ti",
      ram: "8 GB",
      storage: "100 GB"
    },
    playtime: "45h"
  },
  {
    id: 19,
    title: "Hades",
    genre: "Rogue-like",
    status: "Played",
    rating: 9.7,
    platform: "PC / Switch / PS4 / PS5 / Xbox One / Xbox Series X",
    year: 2020,
    publisher: "Supergiant Games",
    developer: "Supergiant Games",
    esrb: "T",
    image: new URL("../assets/hades.jpg", import.meta.url).href,
    description: "Defy the god of the dead as you hack and slash out of the Underworld in this rogue-like dungeon crawler.",
    reqs: {
      os: "Windows 7",
      cpu: "Duo 2.4 GHz",
      gpu: "1GB VRAM",
      ram: "4 GB",
      storage: "15 GB"
    },
    playtime: "80h"
  },
  {
    id: 20,
    title: "Starfield",
    genre: "Action RPG",
    status: "Wishlist",
    rating: 8.3,
    platform: "PC / Xbox Series X / Xbox One",
    year: 2023,
    publisher: "Bethesda",
    developer: "Bethesda Games",
    esrb: "M",
    image: new URL("../assets/starfield.jpg", import.meta.url).href,
    description: "Starfield is the first new universe in over 25 years from Bethesda Game Studios, the creators of Skyrim.",
    reqs: {
      os: "Windows 10",
      cpu: "i7-6800K",
      gpu: "RTX 2080",
      ram: "16 GB",
      storage: "125 GB"
    },
    playtime: "150h"
  }
];

const GENRE_ALIASES = {
  FPS: ["First-Person Shooter"],
  "First-Person Shooter": ["First-Person Shooter"],
  "Tactical FPS": ["First-Person Shooter", "Tactical Shooter"],
  "Battle Royale Shooter": ["First-Person Shooter", "Battle Royale"],
  "Action-Adventure": ["Action", "Adventure"],
  "Action RPG": ["Action", "RPG"],
  "Open-World Action RPG": ["Open World", "Action", "RPG"],
  "Survival Horror": ["Horror", "Survival"],
  "Souls-like": ["Action", "RPG", "Souls-like"],
  "Rogue-like": ["Action", "Rogue-like"]
};

function normalizeGenres(genre) {
  const mapped = GENRE_ALIASES[genre] || [genre];
  return [...new Set(mapped)];
}

export const games = rawGames.map((game) => {
  const genres = normalizeGenres(game.genre);

  return {
    ...game,
    genre: genres[0],
    genres
  };
});
