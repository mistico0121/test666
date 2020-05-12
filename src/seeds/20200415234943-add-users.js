'use strict';

const faker = require('faker');
const Sequelize = require('sequelize');
const db = require('../models');
const Condition = db.Condition;

module.exports = {
  up: (queryInterface, Sequelize) => {
        const users = generateFakeUsers(100);
        return queryInterface.bulkInsert('users', users, {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};


function generateFakeUsers(count) {
  const users = [];
  for (let i = 0; i < count; i++) {
    const newUser = {
      is_admin: false,
      email: faker.internet.email(),
      name: faker.name.findName(),
      username: faker.internet.userName(),
      password: faker.internet.password(),
      phone: faker.phone.phoneNumber(),
      address: faker.address.streetAddress()
    };
    users.push(newUser);
  }
  return users;
}
