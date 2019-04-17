var db = require("../models");

var put16 = function(entryObject, callback) {
  let uid = entryObject.uid;
  // rather than delete a user, we deactivate hir
  let insertObject = {
    activeFlag: false
  };
  db.User.update(insertObject, { where: { id: uid } }).then(response => {
    callback(response);
  });
};
module.exports = put16;
