const channels = [
  {
    id: 1,
    img: "../imagenes/coscu.png",
    name: "coscu",
    followers: "+3,6M",
    edad: 31,
    url: "https://www.twitch.tv/coscu",
    popular: true,
    pais: 'argentina',
    price: 4.99
  },
  {
    id: 2,
    img: "../imagenes/tinymedrano.jpg",
    name: "tinymedrano",
    followers: "+64K",
    edad: 19,
    url: "https://www.twitch.tv/tinymedrano",
    popular: false,
    pais: 'argentina',
    price: 4.99
  },
  {
    id: 3,
    img: "../imagenes/davoxeneize.jpg",
    name: "davooxeneize",
    followers: "+300k",
    edad: 19,
    url: "https://www.twitch.tv/davooxeneize",
    popular: false,
    pais: 'argentina',
    price: 4.99
  },
  {
    id: 4,
    img: "../imagenes/condu.jpg",
    name: "elcondu",
    followers: "+11k",
    edad: 19,
    url: "https://www.twitch.tv/elcondu",
    popular: false,
    pais: 'argentina',
    price: 4.99
  },
  {
    id: 5,
    img: "../imagenes/lacobra.png",
    name: "lacobraaa",
    followers: "+180k",
    edad: 25,
    url: "https://www.twitch.tv/lacobraa",
    popular: false,
    pais: 'argentina',
    price: 4.99
  },
  {
    id: 6,
    img: "../imagenes/auronplay.png",
    name: "auronplay",
    followers: "+14M",
    edad: 33,
    url: "https://www.twitch.tv/auronplay",
    popular: true,
    pais: 'españa',
    price: 1.99
  },
  {
    id: 7,
    img: "../imagenes/ibai.webp",
    name: "ibai",
    followers: "+11M",
    edad: 33,
    url: "https://www.twitch.tv/ibai",
    popular: true,
    pais: 'españa',
    price: 1.99
  },
  {
    id: 8,
    img: "../imagenes/llobeti.jpg",
    name: "llobeti",
    followers: "+1.5M",
    edad: 22,
    url: "https://www.twitch.tv/llobeti4",
    popular: false,
    pais: 'españa',
    price: 1.99
  },
  {
    id: 9,
    img: "../imagenes/rubius.jpg",
    name: "rubius",
    followers: "+13M",
    edad: 32,
    url: "https://www.twitch.tv/rubius",
    popular: false,
    pais: 'españa',
    price: 1.99
  },
  {
    id: 10,
    img: "../imagenes/elded.jpg",
    name: "elded",
    followers: "+5M",
    edad: 31,
    url: "https://www.twitch.tv/elded",
    popular: false,
    pais: 'mexico',
    price: 1.99
  },
  {
    id: 11,
    img: "../imagenes/arigameplays.png",
    name: "arigameplays",
    followers: "+5M",
    edad: 24,
    url: "https://www.twitch.tv/arigameplays",
    popular: false,
    pais: 'mexico',
    price: 1.99
  },
  {
    id: 12,
    img: "../imagenes/thegrefg.png",
    name: "thegrefg",
    followers: "+10M",
    edad: 25,
    url: "https://www.twitch.tv/thegrefg",
    popular: false,
    pais: 'españa',
    price: 1.99
  },
  {
    id: 13,
    img: "../imagenes/elmariana.png",
    name: "elmariana",
    followers: "+5M",
    edad: 25,
    url: "https://www.twitch.tv/elmariana",
    popular: false,
    pais: 'mexico',
    price: 1.99
  },
  {
    id: 14,
    img: "../imagenes/mymalkapone.png",
    name: "mym_alkapone",
    followers: "+1M",
    edad: 38,
    url: "https://www.twitch.tv/mym_alkapone",
    popular: false,
    pais: 'mexico',
    price: 1.99
  },
  {
    id: 15,
    img: "../imagenes/jelty.png",
    name: "jelty",
    followers: "+2,9M",
    edad: 21,
    url: "https://www.twitch.tv/jelty",
    popular: false,
    pais: 'mexico',
    price: 1.99
  },
];


const divideArray = (size) => {
  let arrayDividido = [];
  for (let i = 0; i < channels.length; i += size) {
    arrayDividido.push(channels.slice(i, i + size));
  }
  return arrayDividido;
};

//  objeto para controlar la paginacion
const channelsController = {
  arrayDividido: divideArray(4),
  nextPage: 1,
  limitsChannels: divideArray(4).length,
};
