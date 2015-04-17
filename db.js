'use strict';

const 
  pg = require('pg'),
    conString = 'postgres://root:password@localhost/database';

  /*
   * Query Object
   */
  var Query = function () {
    this.name = null;
    this.text = null;
    this.values = null;
  };

  var query = module.exports = function (text, values, cb) {
    var q = new Query();

    //sanity check
    if (typeof values === 'function') {
      cb = values;
      values = [];
    }

    if (typeof text ==='string') {
      q.text = text;
      q.values = values;
    } else {
      cb('Invalid query');
      return;
    }

    pg.connect(conString, function (err, client, done) {
      if (err) {
        cb(err);
        return;
      }

      client.query(q.text, values, function (err, result) {
        done();
        if (err) {
          cb(err);
          return;
        } 

        cb(null,result);
      });

    });
  };
