var Parse = {

  server: 'http://localhost:3000/classes/messages', 
  //server: `http://parse.${window.CAMPUS}.hackreactor.com/chatterbox/classes/messages`,

  create: function(message, successCB, errorCB = null) {
    // todo: save a message to the server
    $.ajax({
      url: Parse.server,
      type: 'POST',
      data: JSON.stringify(message),
      contentType: 'application/json',
      success: successCB || ((data) => {
        console.log('Chatterbox: message sent');
      }),
      error: errorCB || ((data) => {
        console.error('Chatterbox : failed to send message', data);
      })
    });
  },

  readAll: function(successCB, errorCB = null) {
    $.ajax({
      url: Parse.server,
      type: 'GET',
      data: { order: '-createdAt' },
      contentType: 'application/json',
      success: successCB,
      error: errorCB || function(error) {
        console.error('chatterbox: Failed to fetch messages', error);
      }
    });
  },

  readRoom: function(roomname, successCB, errorCB = 'null') {
    $.ajax({
      url: Parse.server + `?where={"roomname":"${roomname}"}`,
      type: 'GET',
      data: { order: '-createdAt' },
      contentType: 'application/json',
      succes: successCB || ((data) => {
        console.log('In room:' + roomname);
      }),
      error: errorCB || ((error) => {
        console.error('chatterbox: Failed to fetch messages from', error);
      })
    });
  }
  //+ `?where={"roomname":"${App.roomname}"}`

};