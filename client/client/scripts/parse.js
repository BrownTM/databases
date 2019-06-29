var Parse = {

  messageEndpoint: 'http://localhost:3000/classes/messages', //`http://parse.${window.CAMPUS}.hackreactor.com/chatterbox/classes/messages`,
  userEndpoint: 'http://localhost:3000/classes/users',

  create: function(message, successCB, errorCB = null) {
    // todo: save a message to the server
    $.ajax({
      url: Parse.messageEndpoint,
      type: 'POST',
      data: JSON.stringify(message),
      contentType: 'application/json',
      success: successCB,
      error: errorCB || function(error) {
        console.error('chatterbox: Failed to send messages ): ): ): ', error);
      }
    });
  },

  createUser: function(username, successCB, errorCB = null) {
    // todo: save a message to the server
    $.ajax({
      url: Parse.userEndpoint,
      type: 'POST',
      data: JSON.stringify({username}),
      contentType: 'application/json',
      success: successCB,
      error: errorCB || function(error) {
        console.error('chatterbox: Failed to send messages ): ): ): ', error);
      }
    });
  },

  updateUser: function(user, successCB, errorCB = null) {
    $.ajax({
      url: Parse.userEndpoint,
      type: 'PUT',
      data: JSON.stringify(user),
      contentType: 'application/json',
      success: successCB,
      error: errorCB || function(error) {
        console.error('chatterbox: Failed to update color ): ): ): ', error);
      }
    });
  },

  readUser: function(username, successCB, errorCB = null) {
    $.ajax({
      url: Parse.userEndpoint,
      type: 'GET',
      data: {username},
      contentType: 'application/json',
      success: successCB,
      error: errorCB || function(error) {
        console.error('chatterbox: Failed to fetch messages', error);
      }
    });
  },

  readAll: function(successCB, errorCB = null) {
    $.ajax({
      url: Parse.messageEndpoint,
      type: 'GET',
      data: { order: '-createdAt' },
      contentType: 'application/json',
      success: successCB,
      error: errorCB || function(error) {
        console.error('chatterbox: Failed to fetch messages', error);
      }
    });
  },

  search: function(params, successCB, errorCB = null) {
    $.ajax({
      url: Parse.messageEndpoint,
      type: 'GET',
      data: params,
      contentType: 'application/json',
      success: successCB,
      error: errorCB || function(error) {
        console.error('chatterbox: Failed to fetch messages', error);
      }
    });
  }

};