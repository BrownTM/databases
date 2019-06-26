var Messages = {
  // This is the form a message to the server should take
  // {
  //   username: 'shawndrost',
  //   text: 'trololo',
  //   roomname: '4chan'
  // }
  data: [],
  mostRecentTimestamp: 0,

  //create a function that will take in user input
  //and post message to chatterbox

  addMessage: (message) => {
    if (Date.parse(message.createdAt) > Messages.mostRecentTimestamp) {
      Messages.mostRecentTimestamp = Date.parse(message.createdAt);
      Messages.data.push(message);
      return true;
    }

    return false;
  }
};