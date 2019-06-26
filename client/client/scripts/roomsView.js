var RoomsView = {

  $button: $('#rooms button'),
  $select: $('#rooms select'),

  // <%- sanitizes input whereas <%= does not
  template: _.template('<option value=<%- encoded %>><%- roomname %></option>'),

  initialize: function() {
  },

  render: function() {
    //crete var to concatenate results of rooms
    // var html = '';
    _.each(Rooms.data, (room) => {
      //html += this.template({roomname: room});
      //if (this.$select.children().filter(`[value*='${room.roomname}']`).length === 0) {
      if (this.$select.children().filter(`:contains('${room.roomname}')`).length === 0) {
        this.$select.append(this.template(room));
      }
      //<label>Hello%20World</label>
    });
    //this.$select.html(html);
  },

  renderRoom: function(room) {
    var roomname = {roomname: room};
    this.$select.html(this.template(roomname));
  }

};
