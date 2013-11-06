var People = function () {
  this.respondsWith = ['html', 'json', 'xml', 'js', 'txt'];

  this.index = function (req, resp, params) {
    var self = this;

    geddy.model.Person.all(function(err, people) {
      self.respondWith(people, {type:'Person'});
    });
  };

  this.add = function (req, resp, params) {
    this.respond({params: params});
  };

  this.create = function (req, resp, params) {
    var self = this
      , person = geddy.model.Person.create(params);
    
    person.firstname = params.firstname;
    person.lastname = params.lastname;

    if (!person.isValid()) {
      this.respondWith(person);
    }
    else {
      person.save(function(err, data) {
        if (err) {
          throw err;
        }
        self.respondWith(person, {status: err});
      });
    }
  };

  this.show = function (req, resp, params) {
    var self = this;

    geddy.model.Person.first(params.id, function(err, person) {
      if (err) {
        throw err;
      }
      if (!person) {
        throw new geddy.errors.NotFoundError();
      }
      else {
        self.respondWith(person);
      }
    });
  };

  this.edit = function (req, resp, params) {
    var self = this;

    geddy.model.Person.first(params.id, function(err, person) {
      if (err) {
        throw err;
      }
      if (!person) {
        throw new geddy.errors.BadRequestError();
      }
      else {
        self.respondWith(person);
      }
    });
  };

  this.update = function (req, resp, params) {
    var self = this;

    geddy.model.Person.first(params.id, function(err, person) {
      if (err) {
        throw err;
      }
      person.updateProperties(params);

      if (!person.isValid()) {
        self.respondWith(person);
      }
      else {
        person.save(function(err, data) {
          if (err) {
            throw err;
          }
          self.respondWith(person, {status: err});
        });
      }
    });
  };

  this.remove = function (req, resp, params) {
    var self = this;

    geddy.model.Person.first(params.id, function(err, person) {
      if (err) {
        throw err;
      }
      if (!person) {
        throw new geddy.errors.BadRequestError();
      }
      else {
        geddy.model.Person.remove(params.id, function(err) {
          if (err) {
            throw err;
          }
          self.respondWith(person);
        });
      }
    });
  };

};

exports.People = People;
