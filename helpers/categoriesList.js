const categories = [
  {
    parentCategory: 'general knowledge',
    subCategories: [
      {
        name: 'logos',
        logo: 'https://cdn.discordapp.com/attachments/1110409819808079982/1209819063069573160/logos.png?ex=65e84ecd&is=65d5d9cd&hm=cf8b73a95fc4aed0f0e7baad55a84b589c8bba3467c2fd231b06c934f9090f6e&',
      },
      {
        name: 'flags',
        logo: 'https://cdn.discordapp.com/attachments/1110409819808079982/1209819064101376111/flags.png?ex=65e84ece&is=65d5d9ce&hm=e3b5bc72fc91b1570c0a8f6401e9ad08dc83b88a3494c9a1ed375ac8c4fe4c80&',
      },
      {
        name: 'capitals',
        logo: 'https://cdn.discordapp.com/attachments/1110409819808079982/1209819147039678464/capitals.jpg?ex=65e84ee2&is=65d5d9e2&hm=fc521ce3d3ddd2f7d38b1f7f0346dc3415e95cc42a5675a13ad54f7273373036&',
      },
      {
        name: 'landmarks',
        logo: 'https://cdn.discordapp.com/attachments/1110409819808079982/1209819065015607306/landmarks.png?ex=65e84ece&is=65d5d9ce&hm=79f3f092914004f03d10cea2b48c74ef4af59715a3b206d4bc8c0b1b6482253a&',
      },
      {
        name: 'general knowledge',
        logo: 'https://cdn.discordapp.com/attachments/1110409819808079982/1209819146087436349/general_knowledge.png?ex=65e84ee1&is=65d5d9e1&hm=48cb70f1ecd2fa736e0133e077a6b66cc0d297416aaec1db3ddef64ceed9c800&',
      },
      // Added from the original list
      {
        name: 'us geography',
        logo: 'https://cdn.discordapp.com/attachments/1110409819808079982/1209819012595458098/us_geography.jpg?ex=65e84ec1&is=65d5d9c1&hm=6ae540f9649c2ec23f1890e64148e625b981fe9eaa52c1b0d829fac5f7926ca2&',
      },
      {
        name: 'world war 1',
        logo: 'https://cdn.discordapp.com/attachments/1110409819808079982/1209819019977424916/world_war_1.jpg?ex=65e84ec3&is=65d5d9c3&hm=7eedb1a74c4c066d2dd2a807ba4ff39e55a33dc1d8e0a278e1a0284f8c4f18f9&',
      },
    ],
  },
  {
    parentCategory: 'Facts & Wonders',
    subCategories: [
      {
        name: 'size comparison',
        logo: 'https://i.imgur.com/36E0YWn.png',
      },
      {
        name: 'history of internet',
        logo: 'https://i.imgur.com/t5NRicE.jpeg',
      },
      {
        name: 'baby animals',
        logo: 'https://i.imgur.com/8Oj1jBh.png',
      },
      {
        name: 'what happened first',
        logo: 'https://i.imgur.com/xx0yqNa.png',
      },
    ],
  },
  {
    parentCategory: 'games',
    subCategories: [
      {
        name: 'valorant',
        logo: 'https://cdn.discordapp.com/attachments/1110409819808079982/1209819148398501908/valorant.png?ex=65e84ee2&is=65d5d9e2&hm=01b845c6146aec3156cf732275278dcf3aeb54945a7be29a6269edabe5bdeae3&',
      },
      {
        name: 'league of legends',
        logo: 'https://images.contentstack.io/v3/assets/blt370612131b6e0756/blt506e08edefd08617/5fad8432faf76f509e12fe13/WR_Cityscape_Channel_Header_Thailand_Vertical_01.jpg',
      },
      {
        name: 'overwatch',
        logo: 'https://cdn.discordapp.com/attachments/1110409819808079982/1209819035525578822/overwatch.png?ex=65e84ec7&is=65d5d9c7&hm=12c791aaea1048b2866989523d69e0e74e7533e4742db6dcd34b501dda55a42a&',
      },
      {
        name: 'pokemon gen 1',
        logo: 'https://cdn.discordapp.com/attachments/1110409819808079982/1209819145600901130/pokemon_gen_1.png?ex=65e84ee1&is=65d5d9e1&hm=0045b0557d2bdf76875e1b9ed896245feeb21085500213ac3ee4995e590b4b1d&',
      },
    ],
  },
  {
    parentCategory: 'tv shows',
    subCategories: [
      {
        name: 'friends',
        logo: 'https://cdn.discordapp.com/attachments/1110409819808079982/1209819146418917387/friends.png?ex=65e84ee1&is=65d5d9e1&hm=f5abe6e54e67fcce60cbfffec6888a4c5116a1bf2da395132b249caacbaa5126&',
      },
      {
        name: 'the office',
        logo: 'https://cdn.discordapp.com/attachments/1110409819808079982/1209819035299225650/the_office.png?ex=65e84ec7&is=65d5d9c7&hm=4769b1b9ad7a8aa34f168eb090ba3cd46a31d9b05663c177bad55958d9cd42b9&',
      },
      {
        name: 'game of thrones',
        logo: 'https://cdn.discordapp.com/attachments/1110409819808079982/1209819064357093416/game_of_thrones.png?ex=65e84ece&is=65d5d9ce&hm=b8969a9287c6ea01acec3bc68a156576c5907eff070a8538d14a4faad5938cbb&',
      },
      // Added from the original list
      {
        name: 'british sitcoms',
        logo: 'https://cdn.discordapp.com/attachments/1110409819808079982/1209818989216407582/british_sitcoms.jpg?ex=65e84ebc&is=65d5d9bc&hm=28389a0f1e5fc1caf198aaf40e8cd61cdf389213e2e21f76484d303641adc514&',
      },
      {
        name: 'soap opera',
        logo: 'https://cdn.discordapp.com/attachments/1110409819808079982/1209819014352609300/soap_opera.jpg?ex=65e84ec2&is=65d5d9c2&hm=7fe9b4542fce241e01e006e7243fd002fd91abb6c28b0fe235cf0da9b874b848&',
      },
      // {
      //   name: 'The Simpsons',
      //   logo: 'https://cdn.discordapp.com/attachments/1110409819808079982/1209819065280106577/the_simpsons.jpg?ex=65e84ece&is=65d5d9ce&hm=4d69535d8c6f87b4b057a2036cc0d5850b8be947926f1dbb5b65053809729138&',
      // },
    ],
  },
  {
    parentCategory: 'anime',
    subCategories: [
      {
        name: 'naruto',
        logo: 'https://cdn.discordapp.com/attachments/1110409819808079982/1209819147966353478/naruto.png?ex=65e84ee2&is=65d5d9e2&hm=e25cd39f9095d40170cc1e741202ec4a54befb652d2297d03d726e5509db2efd&',
      },
      {
        name: 'one piece',
        logo: 'https://cdn.discordapp.com/attachments/1110409819808079982/1209819035819184128/one_piece.png?ex=65e84ec7&is=65d5d9c7&hm=e55e904df1f3c6e44389cf4f766d5907f61f8ad1fdbd22d6f8ad24378a656f9a&',
      },
      {
        name: 'attack on titan',
        logo: 'https://cdn.discordapp.com/attachments/1110409819808079982/1209819036360118332/attack_on_titan.png?ex=65e84ec7&is=65d5d9c7&hm=9103e03b1e10b94cc8b5f092e5f3d2deed878e18118cf028533bafce560f3ed3&',
      },
      {
        name: 'hunter x hunter',
        logo: 'https://wallpapers.com/images/hd/hunter-x-hunter-characters-phone-zjdpyw2h2b7b282a.jpg',
      },
      {
        name: 'dragon ball series',
        logo: 'https://i.pinimg.com/originals/60/60/ef/6060ef7fcf978530b51d7ee4f5690dd2.jpg',
      },
    ],
  },
  {
    parentCategory: 'Sports',
    subCategories: [
      {
        name: 'soccer',
        logo: 'https://cdn.discordapp.com/attachments/1110409819808079982/1209819063866499183/soccer.png?ex=65e84ece&is=65d5d9ce&hm=d250f8a9b0cec2f76d657479820bd18a144b06629428760440cd5bc5dc31f042&',
      },
      {
        name: 'cricket',
        logo: 'https://cdn.discordapp.com/attachments/1110409819808079982/1209819065498075237/cricket.png?ex=65e84ece&is=65d5d9ce&hm=d2b174c48176630b516cf1cc315a96dd37bc13d471f4b1b8a195e097156d046b&',
      },
      {
        name: 'basketball',
        logo: 'https://cdn.discordapp.com/attachments/1110409819808079982/1209819063363047434/basketball.png?ex=65e84ece&is=65d5d9ce&hm=a5f135e7635c4e46d195f253b9f4a2c21fe0b52ed1148562f9b1e1c47d52a33e&',
      },
      // Added from the original list
      {
        name: 'formula 1',
        logo: 'https://cdn.discordapp.com/attachments/1110409819808079982/1209818992890613790/nascar.jpg?ex=65e84ebd&is=65d5d9bd&hm=8aa600661b9c2a418e8a52eb588c2820b72360d802b6b85ed7b1c8cc52aa791d&',
      },
      {
        name: 'golf',
        logo: 'https://cdn.discordapp.com/attachments/1110409819808079982/1209818998359720017/golf.jpg?ex=65e84ebe&is=65d5d9be&hm=0733ec2e077ae401e2ea33e685f90d2073505de346c51727b38ec6ffe029e316&',
      },
      {
        name: 'horse racing',
        logo: 'https://cdn.discordapp.com/attachments/1110409819808079982/1209818991363883098/horse_racing.jpg?ex=65e84ebc&is=65d5d9bc&hm=d52401b78a6ed9434693c7ebddea5fa82a23779b60025081aaf3113b26108c7f&',
      },
      {
        name: 'nascar',
        logo: 'https://cdn.discordapp.com/attachments/1110409819808079982/1209818985965682729/formula_1.png?ex=65e84ebb&is=65d5d9bb&hm=4c104c0d9a91f674d86add49c2e069ff017fdaf745bb97cd710b50b5b105b9dd&',
      },
      {
        name: 'rugby league',
        logo: 'https://cdn.discordapp.com/attachments/1110409819808079982/1209819147614289940/rugby_league.jpg?ex=65e84ee2&is=65d5d9e2&hm=b6aa1113f48707314f5b83065324fc6d57642fedcff4ecf2d99bb541c444fdc5&',
      },
      {
        name: 'winter sports',
        logo: 'https://cdn.discordapp.com/attachments/1110409819808079982/1209818999962214400/winter_sports.jpg?ex=65e84ebe&is=65d5d9be&hm=ce3597276ce9e205196818939b9ee576d56ad0730ce28770e1783343388d2b17&',
      },
      {
        name: 'world cup',
        logo: 'https://cdn.discordapp.com/attachments/1110409819808079982/1209819035034980432/world_cup.jpg?ex=65e84ec7&is=65d5d9c7&hm=1e9aeb12a2ddeb0c11fe5d9acbede53bd3e552ae075cb2d341667a5b2569b840&',
      },
      {
        name: 'liverpool football club',
        logo: 'https://cdn.discordapp.com/attachments/1110409819808079982/1209819017913835640/liverpool_football_club.jpg?ex=65e84ec3&is=65d5d9c3&hm=e2983e3afec943981d4a3648ea97cd42639cdabd4d0b1db944c97d1dea658c99&',
      },
      {
        name: 'golden state warriors',
        logo: 'https://cdn.discordapp.com/attachments/1110409819808079982/1209819018609950751/golden_state_warriors.png?ex=65e84ec3&is=65d5d9c3&hm=b9b1c75ca9b8694e1780f7ffb1664e8d386610a39214a775a91b83d86a0e0d9a&',
      },
      {
        name: 'champions league',
        logo: 'https://cdn.discordapp.com/attachments/1110409819808079982/1209823158866157628/championsleague_1179453.gif?ex=65e8529e&is=65d5dd9e&hm=5808ce8438e9908f7628368476479a7a29c4b52803211a2b8190a88a8899096d&',
      },
    ],
  },
  {
    parentCategory: 'science',
    subCategories: [
      {
        name: 'chemistry',
        logo: 'https://cdn.discordapp.com/attachments/1110409819808079982/1209819037023076382/chemistry.png?ex=65e84ec7&is=65d5d9c7&hm=9b0f5a92077a839c1a7ab96e3ea761c02c6f30ba90ab56207f270e933bb6fa30&',
      },
      {
        name: 'biology',
        logo: 'https://cdn.discordapp.com/attachments/1110409819808079982/1209819036679020574/biology.png?ex=65e84ec7&is=65d5d9c7&hm=200e7f267f3e632f6f32be3dd85c60eb337a3401e752bdce7dcd2f398b8eb241&',
      },
      {
        name: 'mathematics',
        logo: 'https://cdn.discordapp.com/attachments/1110409819808079982/1209819064776785980/mathematics.png?ex=65e84ece&is=65d5d9ce&hm=c88ec6677e6ce2f62aee83a6585b9e68ce55007fb1d76bd5f2a8bbf542fe31ec&',
      },
      {
        name: 'physics',
        logo: 'https://cdn.discordapp.com/attachments/1110409819808079982/1209819146771103784/physics.png?ex=65e84ee1&is=65d5d9e1&hm=3c4b85ba241bab1abaefd018e4dd982a31041074f30c97b4406f71f71dc10acd&',
      },
      {
        name: 'scientists',
        logo: 'https://cdn.discordapp.com/attachments/1110409819808079982/1209819019012481044/scientists.png?ex=65e84ec3&is=65d5d9c3&hm=8de0d7c2114797aec624779bef635e3abac29689822da2084262ce04cc29b64e&',
      },
      {
        name: 'psychology',
        logo: 'https://cdn.discordapp.com/attachments/1110409819808079982/1209819034707820584/psychology.jpeg?ex=65e84ec7&is=65d5d9c7&hm=f775f8e5cb3421a9c32f2f21ad3ea111f1c1ff77ac873c169e481bf96b41125a&',
      },
      // Added from the original list
      {
        name: 'science general',
        logo: 'https://cdn.discordapp.com/attachments/1110409819808079982/1209819018261831690/science_general.jpg?ex=65e84ec3&is=65d5d9c3&hm=f415b4c62b5b394c1a57d3c3294f31e707e82a2cc9ec66eb591ad8143eac075f&',
      },
      // {
      //   name: 'mental math',
      //   logo: 'https://cdn.discordapp.com/attachments/1110409819808079982/1209818995444813924/mental_math.jpg?ex=65e84ebd&is=65d5d9bd&hm=141caf86069ad68b1a6ca1649e9fb9c253d54096cda9477d5be9474992d1b31d&',
      // },
    ],
  },
  {
    parentCategory: 'nature & universe',
    subCategories: [
      {
        name: 'space',
        logo: 'https://cdn.discordapp.com/attachments/1110409819808079982/1209818986846494791/space.png?ex=65e84ebb&is=65d5d9bb&hm=5fab24659eee02b1900561a61f7ee2705c0e70abedcf48840202fbcef1cdcbe8&',
      },
      // Added from the original list
      {
        name: 'solar system',
        logo: 'https://cdn.discordapp.com/attachments/1110409819808079982/1209819148645961728/solar_system.jpeg?ex=65e84ee2&is=65d5d9e2&hm=7f34fb6a698bbf10338465a33e7f942ac7cdbbad074200dc936e9eee049a261d&',
      },
    ],
  },
  {
    parentCategory: 'movies',
    subCategories: [
      {
        name: 'harry potter',
        logo: 'https://cdn.discordapp.com/attachments/1110409819808079982/1209819063644332143/harry_potter.png?ex=65e84ece&is=65d5d9ce&hm=da6fba6270f69e4af341486c1e316396588924f0c31a6afd44edcdd88cdd0031&',
      },

      // Added from the original list
      {
        name: 'disney',
        logo: 'https://cdn.discordapp.com/attachments/1110409819808079982/1209819017104068608/disney.jpg?ex=65e84ec3&is=65d5d9c3&hm=037a0fa55d868af97d1a6f685e1940511739638f4ef0c95b2cb69b8688c8cb62&',
      },
      {
        name: 'movies since 2010',
        logo: 'https://cdn.discordapp.com/attachments/1110409819808079982/1209818997055430666/movies_since_2010.jpg?ex=65e84ebe&is=65d5d9be&hm=d4ed6377f03b49f31fbfcd96ea18f83a720f03e2824184b42d7c84522e5a2ad0&',
      },
      {
        name: 'james bond',
        logo: 'https://cdn.discordapp.com/attachments/1110409819808079982/1209819147387535390/james_bond.jpeg?ex=65e84ee2&is=65d5d9e2&hm=3cf92759e847682008b7a67bd36ea9a92f803d5b91c36319117d51ed968fce1b&',
      },
      {
        name: 'movie quotes',
        logo: 'https://cdn.discordapp.com/attachments/1110409819808079982/1209819020338008084/movie_quotes.jpg?ex=65e84ec3&is=65d5d9c3&hm=3cc7086c789cd6b51e06b51a2014b5d8a0cabde3b0b3c85164cfc7c4e50d9b82&',
      },
      {
        name: 'british films',
        logo: 'https://cdn.discordapp.com/attachments/1110409819808079982/1209819016194035793/british_films.jpg?ex=65e84ec2&is=65d5d9c2&hm=25fa8ca30622b7858678066c6b4125e5e95808bcd33a420b5f17967a08316258&',
      },
      {
        name: 'hunger games',
        logo: 'https://i.imgur.com/RienNxC.jpeg',
      },
    ],
  },
  {
    parentCategory: 'indian tv shows',
    subCategories: [
      {
        name: 'taarak mehta ka ooltah chashmah',
        logo: 'https://cdn.discordapp.com/attachments/1110409819808079982/1209819034367959121/tmkoc.jpeg?ex=65e84ec7&is=65d5d9c7&hm=0de3d005d7a92e845d2f0411fe88bc8e9b863a8cfa66e44e61ae299ba87aa77d&',
      },
    ],
  },
];

module.exports = categories;
