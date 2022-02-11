const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class IceCream extends Model {}

IceCream.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    freezeTableName: true,
    modelName: "iceCream",
  }
);

module.exports = IceCream;
