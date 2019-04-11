module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    // how app will address the user
    preferredName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    monthlyIncome: {
      type: DataTypes.DECIMAL(12, 2),
      defaultValue: 1000
    },
    // email is required as it is used for login
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { len: [1] }
    },
    // if user would like email updates
    emailFlag: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    phone: {
      type: DataTypes.STRING,
      //   allowNull: false,
      validate: { len: [7] }
    },
    // if user would like text updates
    phoneFlag: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    // the user is invited to name their own budget categories
    cat0name: {
      type: DataTypes.STRING,
      defaultValue: "Spending",
      validate: { len: [1] }
    },
    cat0cap: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 1000
    },
    // The other categories are optional, for slicing the pie (chart)
    cat1name: DataTypes.STRING,
    cat1cap: DataTypes.DECIMAL(10, 2),
    cat1warn: DataTypes.DECIMAL(10, 2),
    cat2warn: DataTypes.DECIMAL(10, 2),
    cat2name: DataTypes.STRING,
    cat2cap: DataTypes.DECIMAL(10, 2),
    cat3name: DataTypes.STRING,
    cat3cap: DataTypes.DECIMAL(10, 2),
    cat3warn: DataTypes.DECIMAL(10, 2),
    cat4name: DataTypes.STRING,
    cat4cap: DataTypes.DECIMAL(10, 2),
    cat4warn: DataTypes.DECIMAL(10, 2),
    cat5name: DataTypes.STRING,
    cat5cap: DataTypes.DECIMAL(10, 2),
    cat5warn: DataTypes.DECIMAL(10, 2),
    cat6name: DataTypes.STRING,
    cat6cap: DataTypes.DECIMAL(10, 2),
    cat6warn: DataTypes.DECIMAL(10, 2),
    cat7name: DataTypes.STRING,
    cat7cap: DataTypes.DECIMAL(10, 2),
    cat7warn: DataTypes.DECIMAL(10, 2),
    cat8name: DataTypes.STRING,
    cat8cap: DataTypes.DECIMAL(10, 2),
    cat8warn: DataTypes.DECIMAL(10, 2),
    cat9name: DataTypes.STRING,
    cat9cap: DataTypes.DECIMAL(10, 2),
    cat9warn: DataTypes.DECIMAL(10, 2),
    // should the user wish to 'delete' their account, it will be deactivated
    activeFlag: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  });
  // 1 user to many events
  // User.associate = function(models) {
  //   User.hasMany(models.Event);
  // };

  return User;
};
