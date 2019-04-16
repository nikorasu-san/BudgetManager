module.exports = function (sequelize, DataTypes) {
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
      type: DataTypes.STRING
      //   allowNull: false,
      // validate: { len: [10] }
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
    cat0warn: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 800
    },
    // The other categories are optional, for slicing the pie (chart)
    cat1name: DataTypes.STRING,
    cat1cap: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0
    },
    cat1warn: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0
    },
    cat2warn: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0
    },
    cat2name: DataTypes.STRING,
    cat2cap: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0
    },
    cat3name: DataTypes.STRING,
    cat3cap: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0
    },
    cat3warn: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0
    },
    cat4name: DataTypes.STRING,
    cat4cap: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0
    },
    cat4warn: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0
    },
    cat5name: DataTypes.STRING,
    cat5cap: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0
    },
    cat5warn: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0
    },
    cat6name: DataTypes.STRING,
    cat6cap: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0
    },
    cat6warn: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0
    },
    cat7name: DataTypes.STRING,
    cat7cap: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0
    },
    cat7warn: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0
    },
    cat8name: DataTypes.STRING,
    cat8cap: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0
    },
    cat8warn: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0
    },
    cat9name: DataTypes.STRING,
    cat9cap: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0
    },
    cat9warn: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0
    },
    // should the user wish to 'delete' their account, it will be deactivated
    activeFlag: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  });
  // 1 user to many events
  User.associate = function (models) {
    // console.log("hello", models);

    User.hasMany(models.Event, {
      // onDelete: "cascade"
    });
  };

  return User;
};
