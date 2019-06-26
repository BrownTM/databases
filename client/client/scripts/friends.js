var Friends = {

  /*
  be able to store our friends into a friendsList array
    create a function that will add users into our friendsList upon click
  */
  friends: {},

  toggleStatus: (username) => {
    if (Friends.friends[username] !== undefined) {
      Friends.friends[username] = !Friends.friends[username];
    } else {
      Friends.friends[username] = true;
    }
  }

};