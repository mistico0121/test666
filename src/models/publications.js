'use strict';
module.exports = (sequelize, DataTypes) => {
  const publications = sequelize.define('publication', {
    title: DataTypes.STRING,
    category: DataTypes.STRING,
    description: DataTypes.STRING,
    state: DataTypes.STRING
  }, {});
  publications.associate = function(models) {
    // associations can be defined here
    publications.belongsTo(models.user);
    publications.belongsTo(models.group);
    publications.hasMany(models.deal);
    publications.hasMany(models.comment);
    publications.hasMany(models.review);
    publications.hasMany(models.item);

  };
  return publications;
};
