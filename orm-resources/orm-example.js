/* You'll need to
 *   npm install sequelize
 * before running this example. Documentation is at http://sequelizejs.com/
 */

var Sequelize = require('sequelize');
var db = new Sequelize('chat', 'root', 'passkey');
/* TODO this constructor takes the database name, username, then password.
 * Modify the arguments if you need to */

/* first define the data structure by giving property names and datatypes
 * See http://sequelizejs.com for other datatypes you can use besides STRING. */
var User = db.define('User', {
  // id: {
  //   type: Sequelize.INTEGER,
  //   primaryKey: true
  // },
  username: Sequelize.STRING
}, {
  timestamps: false
});

var Room = db.define('Room', {
  // id: {
  //   type: Sequelize.INTEGER,
  //   primaryKey: true
  // },
  roomname: Sequelize.STRING
}, {
  timestamps: false
});

var Message = db.define('Message', {
  'user_id': {
    type: Sequelize.INTEGER,
    references: {
      model: 'users',
      key: 'id'
    } 
  },
  'text': Sequelize.STRING,
  'room_id': {
    type: Sequelize.INTEGER,
    references: {
      model: 'rooms',
      key: 'id'
    } 
  }
});

//Message.hasMany(User);
//Message.hasMany(Room);

/*Message.create({'username': 'Jean Valjean', text: 'Working?', 'roomname': 'main'}).then(
  (msg) => { console.log(JSON.stringify(msg)); }
);*/

/* Sequelize comes with built in support for promises
 * making it easy to chain asynchronous operations together */
/*User.create({username: 'Jimbo'}, {ignore: true})
  .then(User.find({
    where: {
      username: 'Baconator'
    }
  }).then((user) => { console.log(JSON.stringify(user)); }));*/

let foreignKeys = {};
User.find({
  where: {
    username: 'Baconator'
  }
}).then((user) => {
  if (!user) {
    return User.create({username: 'Baconator'}, {ignore: true});
  } else {
    return user;
  }
}).then((user) => {
  foreignKeys['user_id'] = user.id;
});
/*User.sync()
  .then(function() {
    // Now instantiate an object and save it:
    return 
  })
  .then(function() {
    // Retrieve objects from the database:
    return User.findAll({ where: {username: 'Jean Valjean'} });
  })
  .then(function(users) {
    users.forEach(function(user) {
      console.log(user.username + ' exists');
    });
    db.close();
  })
  .catch(function(err) {
    // Handle any error in the chain
    console.error(err);
    db.close();
  });

Room.sync()
  .then(function() {
    // Now instantiate an object and save it:
    return User.create({roomname: 'lobby'});
  })
  .then(function() {
    // Retrieve objects from the database:
    return User.findAll({ where: {roomname: 'lobby'} });
  })
  .then(function(users) {
    users.forEach(function(user) {
      console.log(room.roomname + ' exists');
    });
    db.close();
  })
  .catch(function(err) {
    // Handle any error in the chain
    console.error(err);
    db.close();
  });*/
