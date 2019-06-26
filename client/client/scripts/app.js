var App = {

  $spinner: $('.spinner img'),

  username: 'anonymous',
  roomname: '',

  initialize: function() {
    App.username = window.location.search.substr(10);

    FormView.initialize();
    RoomsView.initialize();
    MessagesView.initialize();

    // Fetch initial batch of messages
    App.startSpinner();
    App.fetch(() => {
      App.stopSpinner();
      RoomsView.render();
      App.roomname = $('#rooms select').children()[0].innerHTML;

      //MessagesView.render();
      App.refresh();
    });
  },

  fetch: function(callback = ()=>{}) {
    if (App.roomname === '') {
      Parse.readAll((data) => {
        Messages.data = [];
        Rooms.data = [];

        data.results.filter(message => {
          if (message.username === undefined) {
            if (message.roomname !== undefined) {
              if (Rooms.add(message.roomname)) {
                RoomsView.render();
              }
            }
          } else {
            Messages.data.push(message);
            // MessagesView.render();
            if (!Rooms.data.includes(message.roomname)) {
              if (Rooms.add(message.roomname)) {
                RoomsView.render();
              }
            }
          }

        });

        // not code duplication, must be inside aysnc callback
        MessagesView.render();
        callback();
      });
    } else {
      Parse.readRoom(App.roomname, (data) => {
        Messages.data = [];
        data.results.each((message) => {
          Messages.data.push(message);
        });

        // not code duplication, must be inside aysnc callback
        MessagesView.render();
        callback();
      });
    }
  },

  startSpinner: function() {
    App.$spinner.show();
    FormView.setStatus(true);
  },

  stopSpinner: function() {
    App.$spinner.fadeOut('fast');
    FormView.setStatus(false);
  },

  refresh: function() {
    // Should we only render messages if there are new ones
    // and only render rooms if there are new ones?
    // Rendering every second causes the room selector to close
    // every second as its HTML is rewritten
    App.fetch();
    MessagesView.render();
    //RoomsView.render();
    setTimeout(App.refresh, 1000);
  }
};
