const resources = (sequelize, DataTypes) => {
  const Resources = sequelize.define("resources", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  });

  Resources.associate = (models) => {};

  return Resources;
};

module.exports = resources;
