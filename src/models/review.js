'use strict';
module.exports = (sequelize, DataTypes) => {
  const review = sequelize.define('review', {
    puntaje: DataTypes.INTEGER,
    text: DataTypes.STRING
  }, {});
  review.associate = function(models) {
    // associations can be defined here
    review.belongsTo(models.user);
    review.belongsTo(models.publication);

  };
  return review;
};
