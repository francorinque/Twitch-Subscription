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
