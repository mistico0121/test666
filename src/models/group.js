'use strict';
module.exports = (sequelize, DataTypes) => {
  const group = sequelize.define('group', {
    name: DataTypes.STRING,
    image: DataTypes.STRING,
    description: DataTypes.STRING
  }, {});
  group.associate = function(models) {
    // associations can be defined here
    group.belongsToMany(models.user, { through: 'Usergroup' });
    group.hasMany(models.publication);

  };
  return group;
};
