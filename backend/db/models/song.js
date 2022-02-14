'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const Song = sequelize.define('Song', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 60]
      }
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false
    },
    public_id: {
      type: DataTypes.STRING,
      allowNull: false
    },
    picture_url: {
      type: DataTypes.STRING,
      default: 'https://www.pngitem.com/pimgs/m/646-6463491_music-note-png-icon-song-note-transparent-png.png',
      allowNull: true
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: Model.Users }
    }
  });

  Song.associate = function (models) {
    Song.hasOne(models.User, { foreignKey: 'id'})
  };

  // Song.upload = async function ({ name, url }) {

  //   console.log(url);

  //   try {
  //     const song = await Song.create({
  //       name, 
  //       url
  //     });

  //     console.log('SUCCESS', song)
  //     return song;
  //   } catch(e) {
  //     console.log(e);
  //   }

  //   return 'fail';
  // }

  // Song.find = async function () {
  //   console.log('GETTING SONG');
  //   let song = null;
  //   try {
  //     return await Song.findByPk(1);
  //   } catch(e) {
  //     return 'COULD NOT FIND IN DATABASE';
  //   }

    
  // }

  return Song;
};