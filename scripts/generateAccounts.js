const User = require('../models/User');
require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_CONNECTION_STRING, {});

const Players = [
  {
    username: 'Rohitt3',
    avatar:
      'https://cdn.discordapp.com/attachments/1110409819808079982/1205969513313472634/image.png?ex=65da4da1&is=65c7d8a1&hm=2324223dfef7d6544ac5dc3235a45303bf52e0fe9cefe8b70d8647a943e3dcfe&',
  },
  {
    username: 'LeoDash',
    avatar: 'https://cdnblog.picsart.com/2022/06/DiscordProfile_1200x800_Idea2-780x520.png',
  },
  {
    username: 'QuizBee',
    avatar: 'https://wallpapers.com/images/hd/discord-profile-pictures-r964cfq39ul4xqqd.jpg',
  },
  {
    username: 'Xylo4',
    avatar: 'https://wallpapers.com/images/hd/discord-profile-pictures-xk3qyllfj1j46kte.jpg',
  },
  {
    username: 'JadeStar',
    avatar: 'https://i.redd.it/kdgvn74dmd061.png',
  },
  {
    username: 'TrekFan9',
    avatar: 'https://i.pinimg.com/736x/4f/9f/1d/4f9f1dfc260585c3034d6df83403a5eb.jpg',
  },
  {
    username: 'SkyGaze',
    avatar:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSR3Ije1R8jbTievVaM1mLtEmmkXjMCXf1aug&usqp=CAU',
  },
  {
    username: 'Nimble4',
    avatar: 'https://wallpapers.com/images/hd/discord-profile-pictures-i5bkr03e3ic1olz4.jpg',
  },
  {
    username: 'Zephyr',
    avatar: 'https://i.pinimg.com/736x/59/cc/f7/59ccf7a5d2cf3809925755bc9a8007f2.jpg',
  },
  {
    username: 'MazeRunr',
    avatar: 'https://cdn.pfps.gg/pfps/5338-kirby.png',
  },
  {
    username: 'Pixel8',
    avatar:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgWSj03Xl4-ZyxRo9hUAQGO1aiPaowWnJJHA&usqp=CAU',
  },
  {
    username: 'Cirrus',
    avatar: 'https://e-safety-docs.s3.amazonaws.com/media/Selfie.jpg',
  },
  {
    username: 'BoltSpeed',
    avatar: 'https://live.staticflickr.com/8595/15909072636_0a4722037f_c.jpg',
  },
  {
    username: 'EchoSonic',
    avatar: 'https://i.pinimg.com/originals/ec/cc/cc/ecccccbf09695e1d80a5a5e624ffa7fe.jpg',
  },
  {
    username: 'NovaLight',
    avatar:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8zOIbgaus2IpiTZsZTu-uHwhRAzLBroq2gw&usqp=CAU',
  },
  {
    username: 'Qu2artz',
    avatar:
      'https://image.cnbcfm.com/api/v1/image/106686172-1598966433320-gettyimages-1152439648-istockalypse-home-office-00062.jpeg?v=1599013160',
  },
  {
    username: 'RiftWaer',
    avatar:
      'https://www.vetcarepethospital.ca/wp-content/uploads/sites/247/2022/03/petrabbitcare-1-scaled.jpg',
  },
  {
    username: 'Glyph',
    avatar: 'https://i.imgur.com/j0mzbwz.jpeg',
  },
  {
    username: 'FrostByte',
    avatar:
      'https://static.wikia.nocookie.net/flyff/images/8/8f/Lawolf.jpg/revision/latest/scale-to-width-down/276?cb=20080910044309',
  },
  {
    username: 'LunarTide',
    avatar:
      'https://static.wikia.nocookie.net/mushmootflyff/images/6/6d/Npc-upgrade-specialist-bobochan.jpg/revision/latest/smart/width/386/height/259?cb=20120713020005',
  },
  {
    username: 'StarBeam',
    avatar:
      'https://static.wikia.nocookie.net/flyff/images/b/b2/Female_Ringmaster.jpg/revision/latest/smart/width/386/height/259?cb=20080525010829',
  },
  {
    username: 'Chrisin',
    avatar: 'https://i.pinimg.com/736x/6f/03/8e/6f038ee358bc0e6be400f6e94384dbb7.jpg',
  },
  {
    username: 'Ariel3',
    avatar:
      'https://images.squarespace-cdn.com/content/v1/6050231ed854783f2f2cb756/1668103818484-TQRSPAG74KFB5HOQ4UG2/unsplash-image-RrSsw-LjPo8.jpg',
  },
  {
    username: 'Chrisinn',
    avatar:
      'https://hips.hearstapps.com/hmg-prod/images/ever-think-you-look-better-in-a-selfie-v-a-pic-someone-s-taken-1653993294.jpg?crop=1.00xw:0.562xh;0,0.325xh&resize=640:*',
  },
  {
    username: 'Aryy',
    avatar: 'https://soranews24.com/wp-content/uploads/sites/3/2014/04/zidoriaf2.jpg',
  },
  {
    username: 'DuneRaider',
    avatar: 'https://i.ytimg.com/vi/XRSFvwlEEP4/maxresdefault.jpg',
  },
  {
    username: 'EchoPulse',
    avatar:
      'https://cdn.akamai.steamstatic.com/steam/apps/1343400/ss_58bfd7022db000a7a78910678e9f088f41bb69e2.1920x1080.jpg?t=1702553711',
  },
  {
    username: 'FlareHeart',
    avatar:
      'https://static.wikia.nocookie.net/leagueoflegends/images/5/5f/Zed_OriginalCentered.jpg/revision/latest/scale-to-width-down/1280?cb=20180414203801',
  },
  {
    username: 'GaleForce',
    avatar:
      'https://image.civitai.com/xG1nkqKTMzGDvpLrqFT7WA/9a7595b6-4b9f-4b48-9307-a5054b69cc4e/width=1200/9a7595b6-4b9f-4b48-9307-a5054b69cc4e.jpeg',
  },
  {
    username: 'HaloSpark',
    avatar: 'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/TwistedFate_25.jpg',
  },
  {
    username: 'Heart1',
    avatar:
      'https://hips.hearstapps.com/hmg-prod/images/ever-think-you-look-better-in-a-selfie-v-a-pic-someone-s-taken-1653993294.jpg?crop=1.00xw:0.562xh;0,0.325xh&resize=640:*',
  },
  {
    username: 'Juliet_E',
    avatar:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLSjNR5IUTbP_MGdy7PknruP48PuK-UHAQDw&usqp=CAU',
  },
  {
    username: 'Ericaa',
    avatar:
      'https://parade.com/.image/ar_16:9%2Cc_fill%2Ccs_srgb%2Cfl_progressive%2Cq_auto:good%2Cw_1200/MTkwNTgwOTk1NjA3MDQ1MjQ1/instagram-captions-for-selfies-jpg.jpg',
  },
  {
    username: 'LumenRe',
    avatar:
      'https://api.time.com/wp-content/uploads/2014/03/beyonce-selfie.jpg?quality=85&w=600&h=600&crop=1',
  },
  {
    username: 'S4r4h',
    avatar:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTlHaxrdnEATyh85u9VNwtTZctLN-c8Dnz4g&usqp=CAU',
  },
  {
    username: 'MakGirl',
    avatar:
      'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/2ae77912-2825-4dd7-b434-e2939591743a/de39cok-ea45fd71-f29c-4954-ae83-d926edea5126.jpg/v1/fit/w_375,h_500,q_70,strp/selfie_3476_by_shinykatia_de39cok-375w.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTcwNyIsInBhdGgiOiJcL2ZcLzJhZTc3OTEyLTI4MjUtNGRkNy1iNDM0LWUyOTM5NTkxNzQzYVwvZGUzOWNvay1lYTQ1ZmQ3MS1mMjljLTQ5NTQtYWU4My1kOTI2ZWRlYTUxMjYuanBnIiwid2lkdGgiOiI8PTEyODAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.BXWnLV3sKmU9hNU8NnR_m5xdRDQMvqxun0jsUFkBkOc',
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
          userId: existingUser._id.toString(),
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
        userId: createdUser._id.toString(),
        socketId: `EWw4E8ELTbxHZx7ZAAABOT${player.username}`,
      });
    } catch (err) {
      console.log('Error creating user: ', err);
    }
  }

  console.log('botList:', botList);
  // stop node process
  process.exit();
};

generateAccounts();

module.exports = generateAccounts;
