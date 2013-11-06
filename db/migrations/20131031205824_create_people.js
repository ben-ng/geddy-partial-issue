var CreatePeople = function () {
  this.up = function (next) {
    var def = function (t) {
          t.column('firstname', 'string');
          t.column('lastname', 'string');
        }
      , callback = function (err, data) {
          if (err) {
            throw err;
          }
          else {
            next();
          }
        };
    this.createTable('person', def, callback);
  };

  this.down = function (next) {
    var callback = function (err, data) {
          if (err) {
            throw err;
          }
          else {
            next();
          }
        };
    this.dropTable('person', callback);
  };
};

exports.CreatePeople = CreatePeople;
