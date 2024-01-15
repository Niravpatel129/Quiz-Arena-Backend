const User = require('../models/User');

const Players = [
  {
    username: 'Sawyer',
    avatar:
      'https://www.spongebobshop.com/cdn/shop/products/SB-Standees-Spong-3_800x.jpg?v=1603744568',
  },
  {
    username: 'Fra3nk',
    avatar: 'https://miro.medium.com/v2/resize:fit:1400/1*GfkQDoOm35w_kipsUMN7vw.png',
  },
  {
    username: 'Effr',
    avatar:
      'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/b0cfbcda-9b0e-465b-a1a1-63e2e7fb8614/dfxswli-99cbc544-2a93-4f19-891c-e3d7407a6e11.png/v1/fill/w_894,h_894,q_70,strp/ai_girl_or_real_photo__by_ameliaai_dfxswli-pre.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTI4MCIsInBhdGgiOiJcL2ZcL2IwY2ZiY2RhLTliMGUtNDY1Yi1hMWExLTYzZTJlN2ZiODYxNFwvZGZ4c3dsaS05OWNiYzU0NC0yYTkzLTRmMTktODkxYy1lM2Q3NDA3YTZlMTEucG5nIiwid2lkdGgiOiI8PTEyODAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.hYt8-xtMALM5PbaXX8Gkv6sztx6jXFINd2SnJ3gPy4Q',
  },
  {
    username: 'Eiffel',
    avatar: 'https://cdn.pixabay.com/photo/2023/03/22/09/47/ai-generated-7869046_1280.jpg',
  },
  {
    username: 'Ernest',
    avatar:
      'https://images.unsplash.com/photo-1544465544-1b71aee9dfa3?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fHBob3RvfGVufDB8fDB8fHww',
  },
  {
    username: 'Frank',
    avatar:
      'https://st2.depositphotos.com/2001755/5408/i/450/depositphotos_54081723-stock-photo-beautiful-nature-landscape.jpg',
  },
  {
    username: 'Felipe',
    avatar: 'https://www.buildersmart.in/media/wysiwyg/bgpsdts.jpg',
  },
  {
    username: 'Eduardo',
    avatar: 'https://m.media-amazon.com/images/I/31iH1SJizUL._AC_UF1000,1000_QL80_.jpg',
  },
  {
    username: 'E3333',
    avatar: 'https://img.freepik.com/free-photo/girl-sky_1340-27755.jpg',
  },
  {
    username: 'LEON',
    avatar: 'https://miro.medium.com/v2/resize:fit:1358/1*jPuEs4dGcUJSI46ZjBG_ew.jpeg',
  },
  {
    username: 'KITTY',
    avatar:
      'https://static.wikia.nocookie.net/p__/images/6/68/BigBossRemake.jpg/revision/latest?cb=20230524203503&path-prefix=protagonist',
  },
  {
    username: 'King',
    avatar: '',
  },
  {
    username: 'King_James',
    avatar:
      'https://www.mercurynews.com/wp-content/uploads/2016/09/20160513_074630_leonardo_dicaprio_24734_13519.jpg?w=800',
  },
  {
    username: 'Azn',
    avatar:
      'https://www.southernliving.com/thmb/9E2guP65DZP_ZnUP13pcVG8Sfmc=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-1285438779-2000-9ea25aa777df42e6a046b10d52b286b7.jpg',
  },
  {
    username: 'LBoy',
    avatar:
      'https://assets-global.website-files.com/5f7a5e204f25f20dc72567dc/630feb2331313e9d59b61c4b_richard.png',
  },
  {
    username: 'Zaary',
    avatar: '',
  },
  {
    username: 'Queenie',
    avatar:
      'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/b0cfbcda-9b0e-465b-a1a1-63e2e7fb8614/dfxswli-99cbc544-2a93-4f19-891c-e3d7407a6e11.png/v1/fill/w_894,h_894,q_70,strp/ai_girl_or_real_photo__by_ameliaai_dfxswli-pre.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTI4MCIsInBhdGgiOiJcL2ZcL2IwY2ZiY2RhLTliMGUtNDY1Yi1hMWExLTYzZTJlN2ZiODYxNFwvZGZ4c3dsaS05OWNiYzU0NC0yYTkzLTRmMTktODkxYy1lM2Q3NDA3YTZlMTEucG5nIiwid2lkdGgiOiI8PTEyODAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.hYt8-xtMALM5PbaXX8Gkv6sztx6jXFINd2SnJ3gPy4Q',
  },
  {
    username: 'ElonMusk',
    avatar:
      'https://www.befunky.com/images/prismic/5ddfea42-7377-4bef-9ac4-f3bd407d52ab_landing-photo-to-cartoon-img5.jpeg?auto=avif,webp&format=jpg&width=863',
  },
  {
    username: 'TjM',
    avatar: 'https://www.buildersmart.in/media/wysiwyg/bgpsdts.jpg',
  },
  {
    username: 'IndianLad',
    avatar:
      'https://st2.depositphotos.com/2001755/5408/i/450/depositphotos_54081723-stock-photo-beautiful-nature-landscape.jpg',
  },
  {
    username: 'Laddu',
    avatar:
      'https://images.unsplash.com/photo-1544465544-1b71aee9dfa3?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fHBob3RvfGVufDB8fDB8fHww',
  },
  {
    username: 'QueenMarry',
    avatar: 'https://cdn.pixabay.com/photo/2023/03/22/09/47/ai-generated-7869046_1280.jpg',
  },
];

const botList = [];
const generateAccounts = async () => {
  console.log('Generating accounts...');

  for (const player of Players) {
    try {
      const existingUser = await User.findOne({
        username: player.username,
      });

      if (existingUser) {
        botList.push({
          name: player.username,
          userId: existingUser._id,
          socketId: `EWw4E8ELTbxHZx7ZAAABOT${player.username}`,
        });
        continue;
      }

      const countries = ['in', 'ca', 'us', 'gb', 'au', 'nz', 'fr', 'us', 'us', 'us'];

      const newUser = new User({
        email: player.username + '@gmail.com',
        username: player.username,
        password: player.username,
        profile: {
          avatar: player.avatar,
          country: countries[Math.floor(Math.random() * countries.length)],
        },
      });

      const createdUser = await newUser.save();

      botList.push({
        name: player.username,
        userId: createdUser._id,
        socketId: `EWw4E8ELTbxHZx7ZAAABOT${player.username}`,
      });
    } catch (err) {
      console.log('Error creating user: ', err);
    }
  }

  console.log('botList:', botList);
};

module.exports = generateAccounts;
