/* You'll need to have MySQL running and your Node server running
 * for these tests to pass. */

var mysql = require('mysql');
var request = require('request'); // You might need to npm install the request module!
var expect = require('chai').expect;

describe('Persistent Node Chat Server', function() {
  var dbConnection;

  beforeEach(function(done) {
    dbConnection = mysql.createConnection({
      user: 'root',
      password: 'passkey',
      database: 'chat'
    });
    dbConnection.connect();

    var tablename = 'messages';

    /* Empty the db table before each test so that multiple tests
     * (or repeated runs of the tests) won't screw each other up: */
    dbConnection.query('truncate ' + tablename);
    dbConnection.query('DELETE FROM users');
    dbConnection.query('DELETE FROM rooms', done);
  });

  afterEach(function() {
    dbConnection.end();
  });

  it('Should insert posted messages to the DB', function(done) {
    // Post the user to the chat server.
    request({
      method: 'POST',
      uri: 'http://127.0.0.1:3000/classes/users',
      json: { username: 'Valjean' }
    }, function () {
      // Post a message to the node chat server:
      request({
        method: 'POST',
        uri: 'http://127.0.0.1:3000/classes/messages',
        json: {
          username: 'Valjean',
          text: 'In mercy\'s name, three days is all I need.',
          roomname: 'Hello'
        }
      }, function () {
        // Now if we look in the database, we should find the
        // posted message there.

        // TODO: You might have to change this test to get all the data from
        // your message table, since this is schema-dependent.
        var queryString = 'SELECT * FROM messages';
        var queryArgs = [];

        dbConnection.query(queryString, queryArgs, function(err, results) {
          // Should have one result:
          expect(results.length).to.equal(1);

          // TODO: If you don't have a column named text, change this test.
          expect(results[0].text).to.equal('In mercy\'s name, three days is all I need.');

          done();
        });
      });
    });
  });

  // test classes/users
  it('Should get and post to classes/users', function(done) {
    request({
      method: 'POST',
      uri: 'http://127.0.0.1:3000/classes/users',
      json: { username: 'Valjean' }
    }, function () {
      dbConnection.query('SELECT * FROM users', (err, results) => {
        expect(results.length).to.equal(1);
        expect(results[0].username).to.equal('Valjean');
        done();
      });
    });
  });
  
  // test classes/rooms
  it('Should get and post to classes/rooms', function(done) {
    request({
      method: 'POST',
      uri: 'http://127.0.0.1:3000/classes/rooms',
      json: { roomname: 'lobby' }
    }, function () {
      request('http://127.0.0.1:3000/classes/rooms', function (err, response, body) {
        const roomlist = JSON.parse(body);
        expect(roomlist.results[0].roomname).to.equal('lobby');
        done();
      });
    });
  });

  // test no duplicate usernames
  it('Should not insert duplicate userames', function(done) {
    request({
      method: 'POST',
      uri: 'http://127.0.0.1:3000/classes/users',
      json: { username: 'Valjean' }
    }, function() {
      request({
        method: 'POST',
        uri: 'http://127.0.0.1:3000/classes/users',
        json: { username: 'Valjean' }
      }, function() {
        dbConnection.query('SELECT * FROM users', (err, results) => {
          expect(results.length).to.equal(1);
          expect(results[0].username).to.equal('Valjean');
          done();
        });
      });
    });
  });

  // test no duplicate roomnames
  it('Should not insert duplicate roomnames', function(done) {
    request({
      method: 'POST',
      uri: 'http://127.0.0.1:3000/classes/rooms',
      json: { roomname: 'lobby' }
    }, () => {
      request({
        method: 'POST',
        uri: 'http://127.0.0.1:3000/classes/rooms',
        json: { roomname: 'lobby' }
      }, () => {
        request('http://127.0.0.1:3000/classes/rooms', function (err, response, body) {
          const roomlist = JSON.parse(body);
          expect(roomlist.results.length).to.equal(1);
          expect(roomlist.results[0].roomname).to.equal('lobby');
          done();
        });
      });
    });
  });

  it('Should output all messages from the DB', function(done) {
    // Let's insert a message into the db
    // INSERT INTO rooms
    // INSERT INTO users
    // INSERT INTO messages
    var queryString = 'INSERT INTO messages (user_id, room_id, text) VALUES ((SELECT id FROM users WHERE username = ?), (SELECT id FROM rooms WHERE roomname = ?), ?)';
    var queryArgs = ['test', 'main', 'Men like you can never change!'];
    // TODO - The exact query string and query args to use
    // here depend on the schema you design, so I'll leave
    // them up to you. */
    dbConnection.query('INSERT IGNORE INTO rooms (roomname) VALUES (?)', 'main', function(err) {
      if (err) { throw err; }
      dbConnection.query('INSERT IGNORE INTO users (username) VALUES (?)', 'test', function(err) {
        if (err) { throw err; }
        dbConnection.query(queryString, queryArgs, function(err) {
          if (err) { throw err; }

          // Now query the Node chat server and see if it returns
          // the message we just inserted:
          request('http://127.0.0.1:3000/classes/messages', function(error, response, body) {
            var messageLog = JSON.parse(body);
            expect(messageLog.results[0].text).to.equal('Men like you can never change!');
            expect(messageLog.results[0].roomname).to.equal('main');
            done();
          });
        });
      }); 
    });
  });

  it('Should output messsages with a username, roomname, and text properties', function(done) {
    // Let's insert a message into the db
    // INSERT INTO rooms
    // INSERT INTO users
    // INSERT INTO messages
    var queryString = 'INSERT INTO messages (user_id, room_id, text) VALUES ((SELECT id FROM users WHERE username = ?), (SELECT id FROM rooms WHERE roomname = ?), ?)';
    var queryArgs = ['test', 'main', 'Men like you can never change!'];
    // TODO - The exact query string and query args to use
    // here depend on the schema you design, so I'll leave
    // them up to you. */
    dbConnection.query('INSERT IGNORE INTO rooms (roomname) VALUES (?)', 'main', function(err) {
      if (err) { throw err; }
      dbConnection.query('INSERT IGNORE INTO users (username) VALUES (?)', 'test', function(err) {
        if (err) { throw err; }
        dbConnection.query(queryString, queryArgs, function(err) {
          if (err) { throw err; }

          // Now query the Node chat server and see if it returns
          // the message we just inserted:
          request('http://127.0.0.1:3000/classes/messages', function(error, response, body) {
            var messageLog = JSON.parse(body);
            expect(messageLog.results[0].text).to.not.equal(undefined);
            expect(messageLog.results[0].roomname).to.not.equal(undefined);
            expect(messageLog.results[0].username).to.not.equal(undefined);
            done();
          });
        });
      }); 
    });
  });

  it('Should output messsages with timestamps "createdAt", and "updatedAt"', function(done) {
    // Let's insert a message into the db
    // INSERT INTO rooms
    // INSERT INTO users
    // INSERT INTO messages
    var queryString = 'INSERT INTO messages (user_id, room_id, text) VALUES ((SELECT id FROM users WHERE username = ?), (SELECT id FROM rooms WHERE roomname = ?), ?)';
    var queryArgs = ['test', 'main', 'Men like you can never change!'];
    // TODO - The exact query string and query args to use
    // here depend on the schema you design, so I'll leave
    // them up to you. */
    dbConnection.query('INSERT IGNORE INTO rooms (roomname) VALUES (?)', 'main', function(err) {
      if (err) { throw err; }
      dbConnection.query('INSERT IGNORE INTO users (username) VALUES (?)', 'test', function(err) {
        if (err) { throw err; }
        dbConnection.query(queryString, queryArgs, function(err) {
          if (err) { throw err; }

          // Now query the Node chat server and see if it returns
          // the message we just inserted:
          request('http://127.0.0.1:3000/classes/messages', function(error, response, body) {
            var messageLog = JSON.parse(body);
            expect(messageLog.results[0].createdAt).to.not.equal(undefined);
            expect(messageLog.results[0].updatedAt).to.not.equal(undefined);
            done();
          });
        });
      }); 
    });
  });
});
