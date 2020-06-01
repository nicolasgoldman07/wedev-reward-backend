'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('users', [
      {
        id: '00000000-0000-0000-0000-000000000000',
        firstName: 'Elu',
        lastName: 'Suario',
        username: 'eluSuario@gmail.com',
        password: '123456789',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', null, {});
  },
};
