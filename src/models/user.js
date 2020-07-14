import crypto from 'crypto';
const jwt = require('jsonwebtoken');

export default (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    salt: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });

  // Instance methods
  User.prototype.passwordMatches = function (value) {
    return User.encryptPassword(value, this.salt) === this.password;
  };

  User.prototype.getJWT = function () {
    const payload = {
      firstName: this.firstName,
      lastName: this.lastName,
    };
    const options = {
      subject: this.id,
      expiresIn: '10d',
    };

    return jwt.sign(payload, process.env.SECRET, options);
  };

  // Class methods
  User.hashPasswordHook = async function (user) {
    if (!user.password || !user.changed('password')) return user;

    user.salt = this.getRandomSalt();
    user.password = await User.encryptPassword(user.password, user.salt);
  };

  User.getRandomSalt = function (bytes = 16) {
    return crypto.randomBytes(bytes).toString('hex');
  };

  User.encryptPassword = function (plainPassword, salt) {
    return crypto.scryptSync(plainPassword, salt, 64).toString('hex');
  };

  User.findUserByUsername = async function (username) {
    return await this.findOne({
      where: {
        username: username,
      },
    });
  };

  // hooks
  User.beforeCreate(User.hashPasswordHook.bind(User));
  User.beforeUpdate(User.hashPasswordHook.bind(User));

  return User;
};
