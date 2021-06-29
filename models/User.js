const { Model, DataTypes, UUIDV4 } = require("sequelize");
const sequelize = require("../config/connection");
const argon2 = require("argon2");

class User extends Model {
  checkPassword(loginPw) {
    return argon2.verify(loginPw, this.password);
  }
}

User.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: UUIDV4,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [3, 16],
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [8],
      },
    },
  },
  {
    hooks: {
      beforeCreate: async (newUser) => {
        try {
          newUser.password = await argon2.hash(newUser.password);
          return newUser;
        } catch (err) {
          console.log(err);
          return err;
        }
      },
      beforeUpdate: async (updatedUser) => {
        try {
          updatedUser.password = await argon2.hash(updatedUser.password);
          return updatedUser;
        } catch (err) {
          console.log(err);
          return err;
        }
      },
    },
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: "user",
  }
);

module.exports = User;
