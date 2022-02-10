'use strict';
const { Model, Validator } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  const Song = sequelize.define('Song', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 60]
      }
    },
    file: {
      type: DataTypes.BLOB,
      allowNull: false
    }
  });

  Song.associate = function (models) {

  };

  Song.upload = async function ({ name, file }) {
    const song = await Song.create({
      name, 
      file
    });

    return song;
  }

  Song.find = async function () {
    console.log('GETTING SONG');
    let song = null;
    try {
      song = await Song.findByPk(1);
    } catch(e) {
      console.log('COULD NOT FIND IN DATABASE');
    }

    return await Song.findByPk(1);
  }

  return Song;
};