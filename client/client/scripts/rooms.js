var Rooms = {

  data: [],

  add: (roomname) => {
    if (roomname === undefined) {
      return;
    }

    for (let i = 0; i < Rooms.data.length; i++) {
      if (Rooms.data[i].roomname === roomname) {
        return false;
      }
    }

    Rooms.data.push({'roomname': roomname, 'encoded': roomname.replace(/\s/g, '%20')});
    return true;
  }

};