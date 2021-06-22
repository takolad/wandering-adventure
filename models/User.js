const { Model, DataTypes, UUIDV4 } = require("sequelize");
const sequelize = require("../config/connection");

class User extends Model {}

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
          const salt = await bcrypt.genSalt(10);
          newUser.password = await bcrypt.hash(newUser.password, salt);
          return newUser;
        } catch (err) {
          console.log(err);
          return err;
        }
      },
      beforeUpdate: async (updatedUser) => {
        try {
          const salt = await bcrypt.genSalt(10);
          updatedUser.password = await bcrypt.hash(updatedUser.password, salt);
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
