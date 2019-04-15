module.exports = function(sequelize, DataTypes) {
  var Event = sequelize.define("Event", {
    // how app will address the user
    description: {
      type: DataTypes.STRING,
      //   allowNull: false,
      validate: {
        len: [1]
      }
    },
    category: {
      type: DataTypes.INTEGER(2),
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    amount: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 1000
    },
    // optional entry field for future or past events, otherwise we will take CREATED AT
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    // is bill(true means event has not yet occured; funds not yet transferred)
    billFlag: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    // if the Bill is recurring
    recurringFlag: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    //** recurrence periodicity as string to parse
    periodicity: {
      type: DataTypes.STRING,
      defaultValue: "Monthly"
    },

    // should the user wish to cancel the event, it will be deactivated
    activeFlag: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  });
  // 1 user to many events
  Event.associate = function(models) {
    Event.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Event;
};
