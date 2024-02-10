// const User = require('../models/User');

const botList = [
  {
    socketId: 'EWw4E8ELTbxHZx7ZAAABOTBUNYY',
    userId: '65986b8569ca51f17288d5e1',
    name: 'bunyy',
  },
  {
    socketId: 'EWw4E8ELTbxHZx7ZAAABOTZezima',
    userId: '659e190556ddf7999c4a35ed',
    name: 'Zezima',
  },
  {
    socketId: 'EWw4E8ELTbxHZx7ZAAABOTChrish',
    userId: '659e18cf56ddf7999c4a35e4',
    name: 'Chrish',
  },
  {
    socketId: 'EWw4E8ELTbxHZx7ZAAABOTEyeslol',
    userId: '659e194256ddf7999c4a35f6',
    name: 'Eyeslol',
  },
  {
    socketId: 'EWw4E8ELTbxHZx7ZAAABOT400iq',
    userId: '659e197656ddf7999c4a360e',
    name: '400iq',
  },
  {
    socketId: 'EWw4E8ELTbxHZx7ZAAABOTHarry',
    userId: '659e19a256ddf7999c4a3616',
    name: 'Harry',
  },
  {
    socketId: 'EWw4E8ELTbxHZx7ZAAABOTQuizzy',
    userId: '659e19b956ddf7999c4a361e',
    name: 'Quizzy',
  },
  {
    socketId: 'EWw4E8ELTbxHZx7ZAAABOTSgt.Lieut',
    userId: '659e1a1156ddf7999c4a3627',
    name: 'Sgt.Lieut',
  },
  {
    socketId: 'EWw4E8ELTbxHZx7ZAAABOTLadzone',
    userId: '659e1b50bc06fc1bfa019962',
    name: 'Ladzone',
  },
  {
    socketId: 'EWw4E8ELTbxHZx7ZAAABOTSophiaaaa',
    userId: '659e1b1fbc06fc1bfa01995a',
    name: 'Sophiaaaa',
  },
  {
    socketId: 'EWw4E8ELTbxHZx7ZAAABOTMonotropz',
    userId: '659edf926ca18f87c3ce65d5',
    name: 'Monotropz',
  },
  {
    socketId: 'EWw4E8ELTbxHZx7ZAAABOTjojax',
    userId: '65a0e450f8bddcbb4035f23f',
    name: 'jojax',
  },
  {
    socketId: 'EWw4E8ELTbxHZx7ZAAABOTbidik',
    userId: '65a0e4eaf8bddcbb4035f2c1',
    name: 'bidik',
  },
  {
    socketId: 'EWw4E8ELTbxHZx7ZAAABOTY4ppi',
    userId: '65a0e577f8bddcbb4035f2e1',
    name: 'Y4ppi',
  },
  {
    socketId: 'EWw4E8ELTbxHZx7ZAAABOTSpacial',
    userId: '65a0e58df8bddcbb4035f2e9',
    name: 'Spacial',
  },
  {
    socketId: 'EWw4E8ELTbxHZx7ZAAABOTDeadlySyco',
    userId: '65a0e848b58205a1a6aadad9',
    name: 'DeadlySyco',
  },
  {
    socketId: 'EWw4E8ELTbxHZx7ZAAABOTKunjP',
    userId: '65a0e491f8bddcbb4035f24f',
    name: 'KunjP',
  },
  {
    socketId: 'EWw4E8ELTbxHZx7ZAAABOTSpyte',
    userId: '65a0e470f8bddcbb4035f247',
    name: 'Spyte',
  },
  {
    socketId: 'EWw4E8ELTbxHZx7ZAAABOTRolls',
    userId: '65a1f9fd35573bfa94bdd416',
    name: 'Rolls',
  },
  {
    socketId: 'EWw4E8ELTbxHZx7ZAAABOT_fiction_',
    userId: '65a1faa2975858c85219636b',
    name: '_fiction_',
  },
  {
    name: 'Griffin',
    userId: '65a4dd636d54217e3682b7dc',
    socketId: 'EWw4E8ELTbxHZx7ZAAABOTGriffin',
  },
  {
    name: 'Cernuie3',
    userId: '65a4dd636d54217e3682b7de',
    socketId: 'EWw4E8ELTbxHZx7ZAAABOTCernuie3',
  },
  {
    name: 'Keval',
    userId: '65a4dd636d54217e3682b7e0',
    socketId: 'EWw4E8ELTbxHZx7ZAAABOTKeval',
  },
  {
    name: 'LegendFork',
    userId: '65a4dd636d54217e3682b7e2',
    socketId: 'EWw4E8ELTbxHZx7ZAAABOTLegendFork',
  },
  {
    name: 'Fortriss',
    userId: '65a4dd636d54217e3682b7e4',
    socketId: 'EWw4E8ELTbxHZx7ZAAABOTFortriss',
  },
  {
    name: 'WaveBeam',
    userId: '65a4dd636d54217e3682b7e6',
    socketId: 'EWw4E8ELTbxHZx7ZAAABOTWaveBeam',
  },
  {
    name: 'NickJ',
    userId: '65a4dd636d54217e3682b7e8',
    socketId: 'EWw4E8ELTbxHZx7ZAAABOTNickJ',
  },
  {
    name: 'Preston',
    userId: '65a4dd636d54217e3682b7ea',
    socketId: 'EWw4E8ELTbxHZx7ZAAABOTPreston',
  },
  {
    name: 'Evul',
    userId: '65a4dd636d54217e3682b7ec',
    socketId: 'EWw4E8ELTbxHZx7ZAAABOTEvul',
  },
  {
    name: 'ZyzzBrah',
    userId: '65a4dd636d54217e3682b7ee',
    socketId: 'EWw4E8ELTbxHZx7ZAAABOTZyzzBrah',
  },
  {
    name: 'SingedMain',
    userId: '65a4dd636d54217e3682b7f0',
    socketId: 'EWw4E8ELTbxHZx7ZAAABOTSingedMain',
  },
  {
    name: 'Prism',
    userId: '65a4dd636d54217e3682b7f2',
    socketId: 'EWw4E8ELTbxHZx7ZAAABOTPrism',
  },
  {
    name: 'Sawyer',
    userId: '65a4e9f1aaa78351b376209f',
    socketId: 'EWw4E8ELTbxHZx7ZAAABOTSawyer',
  },
  {
    name: 'Fra3nk',
    userId: '65a4e9f1aaa78351b37620a5',
    socketId: 'EWw4E8ELTbxHZx7ZAAABOTFra3nk',
  },
  {
    name: 'Effr',
    userId: '65a4e9f1aaa78351b37620a9',
    socketId: 'EWw4E8ELTbxHZx7ZAAABOTEffr',
  },
  {
    name: 'Eiffel',
    userId: '65a4e9f2aaa78351b3762128',
    socketId: 'EWw4E8ELTbxHZx7ZAAABOTEiffel',
  },
  {
    name: 'Ernest',
    userId: '65a4e9f2aaa78351b376212c',
    socketId: 'EWw4E8ELTbxHZx7ZAAABOTErnest',
  },
  {
    name: 'Frank',
    userId: '65a4e9f2aaa78351b3762130',
    socketId: 'EWw4E8ELTbxHZx7ZAAABOTFrank',
  },
  {
    name: 'Felipe',
    userId: '65a4e9f2aaa78351b3762134',
    socketId: 'EWw4E8ELTbxHZx7ZAAABOTFelipe',
  },
  {
    name: 'Eduardo',
    userId: '65a4e9f2aaa78351b3762138',
    socketId: 'EWw4E8ELTbxHZx7ZAAABOTEduardo',
  },
  {
    name: 'E3333',
    userId: '65a4e9f2aaa78351b376213c',
    socketId: 'EWw4E8ELTbxHZx7ZAAABOTE3333',
  },
  {
    name: 'LEON',
    userId: '65a4e9f3aaa78351b3762140',
    socketId: 'EWw4E8ELTbxHZx7ZAAABOTLEON',
  },
  {
    name: 'KITTY',
    userId: '65a4e9f3aaa78351b3762144',
    socketId: 'EWw4E8ELTbxHZx7ZAAABOTKITTY',
  },
  {
    name: 'King',
    userId: '65a4e9f3aaa78351b3762148',
    socketId: 'EWw4E8ELTbxHZx7ZAAABOTKing',
  },
  {
    name: 'King_James',
    userId: '65a4e9f3aaa78351b376214c',
    socketId: 'EWw4E8ELTbxHZx7ZAAABOTKing_James',
  },
  {
    name: 'Azn',
    userId: '65a4e9f3aaa78351b3762150',
    socketId: 'EWw4E8ELTbxHZx7ZAAABOTAzn',
  },
  {
    name: 'LBoy',
    userId: '65a4e9f3aaa78351b3762154',
    socketId: 'EWw4E8ELTbxHZx7ZAAABOTLBoy',
  },
  {
    name: 'Zaary',
    userId: '65a4e9f3aaa78351b3762158',
    socketId: 'EWw4E8ELTbxHZx7ZAAABOTZaary',
  },
  {
    name: 'Queenie',
    userId: '65a4e9f4aaa78351b376215c',
    socketId: 'EWw4E8ELTbxHZx7ZAAABOTQueenie',
  },
  {
    name: 'ElonMusk',
    userId: '65a4e9f4aaa78351b3762160',
    socketId: 'EWw4E8ELTbxHZx7ZAAABOTElonMusk',
  },
  {
    name: 'TjM',
    userId: '65a4e9f4aaa78351b3762164',
    socketId: 'EWw4E8ELTbxHZx7ZAAABOTTjM',
  },
  {
    name: 'IndianLad',
    userId: '65a4e9f4aaa78351b3762168',
    socketId: 'EWw4E8ELTbxHZx7ZAAABOTIndianLad',
  },
  {
    name: 'Laddu',
    userId: '65a4e9f4aaa78351b376216c',
    socketId: 'EWw4E8ELTbxHZx7ZAAABOTLaddu',
  },
  {
    name: 'QueenMarry',
    userId: '65a4e9f4aaa78351b3762170',
    socketId: 'EWw4E8ELTbxHZx7ZAAABOTQueenMarry',
  },
  {
    name: 'Roshni',
    userId: '65c7d4a1f3e7dbb91197a7d2',
    socketId: 'EWw4E8ELTbxHZx7ZAAABOTRoshni',
  },
  {
    name: 'Rohitt3',
    userId: '65c7d8b504088479797ca9ad',
    socketId: 'EWw4E8ELTbxHZx7ZAAABOTRohitt3',
  },
  {
    name: 'LeoDash',
    userId: '65c7d8b504088479797ca9b1',
    socketId: 'EWw4E8ELTbxHZx7ZAAABOTLeoDash',
  },
  {
    name: 'QuizBee',
    userId: '65c7d8b504088479797ca9b5',
    socketId: 'EWw4E8ELTbxHZx7ZAAABOTQuizBee',
  },
  {
    name: 'Xylo4',
    userId: '65c7d8b504088479797ca9b9',
    socketId: 'EWw4E8ELTbxHZx7ZAAABOTXylo4',
  },
  {
    name: 'JadeStar',
    userId: '65c7d8b504088479797ca9bd',
    socketId: 'EWw4E8ELTbxHZx7ZAAABOTJadeStar',
  },
  {
    name: 'TrekFan9',
    userId: '65c7d8b604088479797ca9c1',
    socketId: 'EWw4E8ELTbxHZx7ZAAABOTTrekFan9',
  },
  {
    name: 'SkyGaze',
    userId: '65c7d8b604088479797ca9c5',
    socketId: 'EWw4E8ELTbxHZx7ZAAABOTSkyGaze',
  },
  {
    name: 'Nimble4',
    userId: '65c7d8b604088479797ca9c9',
    socketId: 'EWw4E8ELTbxHZx7ZAAABOTNimble4',
  },
  {
    name: 'Zephyr',
    userId: '65c7d8b604088479797ca9cd',
    socketId: 'EWw4E8ELTbxHZx7ZAAABOTZephyr',
  },
  {
    name: 'MazeRunr',
    userId: '65c7d8b604088479797ca9d1',
    socketId: 'EWw4E8ELTbxHZx7ZAAABOTMazeRunr',
  },
  {
    name: 'Pixel8',
    userId: '65c7d8b604088479797ca9d5',
    socketId: 'EWw4E8ELTbxHZx7ZAAABOTPixel8',
  },
  {
    name: 'Cirrus',
    userId: '65c7d8b604088479797ca9d9',
    socketId: 'EWw4E8ELTbxHZx7ZAAABOTCirrus',
  },
  {
    name: 'BoltSpeed',
    userId: '65c7d8b704088479797ca9dd',
    socketId: 'EWw4E8ELTbxHZx7ZAAABOTBoltSpeed',
  },
  {
    name: 'EchoSonic',
    userId: '65c7d8b704088479797ca9e1',
    socketId: 'EWw4E8ELTbxHZx7ZAAABOTEchoSonic',
  },
  {
    name: 'NovaLight',
    userId: '65c7d8b704088479797ca9e5',
    socketId: 'EWw4E8ELTbxHZx7ZAAABOTNovaLight',
  },
  {
    name: 'Qu2artz',
    userId: '65c7d8b704088479797ca9e9',
    socketId: 'EWw4E8ELTbxHZx7ZAAABOTQu2artz',
  },
  {
    name: 'RiftWaer',
    userId: '65c7d8b704088479797ca9ed',
    socketId: 'EWw4E8ELTbxHZx7ZAAABOTRiftWaer',
  },
  {
    name: 'Glyph',
    userId: '65c7d8b704088479797ca9f1',
    socketId: 'EWw4E8ELTbxHZx7ZAAABOTGlyph',
  },
  {
    name: 'FrostByte',
    userId: '65c7d8b704088479797ca9f5',
    socketId: 'EWw4E8ELTbxHZx7ZAAABOTFrostByte',
  },
  {
    name: 'LunarTide',
    userId: '65c7d8b804088479797ca9f9',
    socketId: 'EWw4E8ELTbxHZx7ZAAABOTLunarTide',
  },
  {
    name: 'StarBeam',
    userId: '65c7d8b804088479797ca9fd',
    socketId: 'EWw4E8ELTbxHZx7ZAAABOTStarBeam',
  },
  {
    name: 'Chrisin',
    userId: '65c7d8b804088479797caa01',
    socketId: 'EWw4E8ELTbxHZx7ZAAABOTChrisin',
  },
  {
    name: 'Ariel3',
    userId: '65c7d8b804088479797caa05',
    socketId: 'EWw4E8ELTbxHZx7ZAAABOTAriel3',
  },
  {
    name: 'Chrisinn',
    userId: '65c7d8b804088479797caa09',
    socketId: 'EWw4E8ELTbxHZx7ZAAABOTChrisinn',
  },
  {
    name: 'Aryy',
    userId: '65c7d8b804088479797caa0d',
    socketId: 'EWw4E8ELTbxHZx7ZAAABOTAryy',
  },
  {
    name: 'DuneRaider',
    userId: '65c7d8b904088479797caa11',
    socketId: 'EWw4E8ELTbxHZx7ZAAABOTDuneRaider',
  },
  {
    name: 'EchoPulse',
    userId: '65c7d8b904088479797caa15',
    socketId: 'EWw4E8ELTbxHZx7ZAAABOTEchoPulse',
  },
  {
    name: 'FlareHeart',
    userId: '65c7d8b904088479797caa19',
    socketId: 'EWw4E8ELTbxHZx7ZAAABOTFlareHeart',
  },
  {
    name: 'GaleForce',
    userId: '65c7d8b904088479797caa1d',
    socketId: 'EWw4E8ELTbxHZx7ZAAABOTGaleForce',
  },
  {
    name: 'HaloSpark',
    userId: '65c7d8b904088479797caa21',
    socketId: 'EWw4E8ELTbxHZx7ZAAABOTHaloSpark',
  },
  {
    name: 'Heart1',
    userId: '65c7d8b904088479797caa25',
    socketId: 'EWw4E8ELTbxHZx7ZAAABOTHeart1',
  },
  {
    name: 'Juliet_E',
    userId: '65c7d8ba04088479797caa29',
    socketId: 'EWw4E8ELTbxHZx7ZAAABOTJuliet_E',
  },
  {
    name: 'Ericaa',
    userId: '65c7d8ba04088479797caa2d',
    socketId: 'EWw4E8ELTbxHZx7ZAAABOTEricaa',
  },
  {
    name: 'LumenRe',
    userId: '65c7d8ba04088479797caa31',
    socketId: 'EWw4E8ELTbxHZx7ZAAABOTLumenRe',
  },
  {
    name: 'S4r4h',
    userId: '65c7d8ba04088479797caa35',
    socketId: 'EWw4E8ELTbxHZx7ZAAABOTS4r4h',
  },
  {
    name: 'MakGirl',
    userId: '65c7d8ba04088479797caa39',
    socketId: 'EWw4E8ELTbxHZx7ZAAABOTMakGirl',
  },
];

// const UpdateBotInformation = async () => {
//   const categories = require('./categoriesList')
//     .map((category) => {
//       return category.subCategories.map((subCategory) => {
//         return subCategory.name;
//       });
//     })
//     .flat();

//   for (const bot of botList) {
//     try {
//       const newElo = {};
//       const randomGamesPlayed = Math.floor(Math.random() * 1000);
//       const randomWins = Math.floor(Math.random() * randomGamesPlayed);
//       const randomLosses = Math.floor(Math.random() * randomGamesPlayed - randomWins);
//       const randomDraws = randomGamesPlayed - randomWins - randomLosses;

//       categories.forEach((category) => {
//         newElo[category.toLowerCase()] = Math.floor(Math.random() * 1000 + 1000);
//       });

//       // Update the user's elo field
//       // await User.findByIdAndUpdate(bot.userId, { elo: { rating: newElo } });
//       await User.findByIdAndUpdate(bot.userId, {
//         elo: {
//           rating: newElo,
//           gamesPlayed: randomGamesPlayed,
//           wins: randomWins,
//           losses: randomLosses,
//           draws: randomDraws,
//         },
//       });
//       console.log(`Updated elo for user ${bot.userId}`);
//     } catch (error) {
//       console.error(`Error updating user ${bot.userId}:`, error);
//     }

//     //   // Update the user's lastActive field
//     //   try {
//     //     const threeDaysAgo = new Date();
//     //     threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);
//     //     const randomTimestamp = new Date(
//     //       threeDaysAgo.getTime() + Math.random() * (Date.now() - threeDaysAgo.getTime()),
//     //     );

//     //     // Update the user's lastActive field
//     //     await User.findByIdAndUpdate(bot.userId, { lastActive: randomTimestamp });
//     //     console.log(`Updated lastActive for user ${bot.userId}`);
//     //   } catch (error) {
//     //     console.error(`Error updating user ${bot.userId}:`, error);
//     //   }
//   }
// };

// UpdateBotInformation();

module.exports = botList;
