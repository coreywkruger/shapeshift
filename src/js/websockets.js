function GameWebsocket(host, id, cb){
  
  this.id = id;
  this.ws = new WebSocket(host);
  this.ws.onopen = function(a,b,c) {
    if (this.ws.bufferedAmount == 0) {
      cb()
    }
  }.bind(this);

  this.events = {};
  this.ws.onmessage = function(event) {
    var message = JSON.parse(event.data);
    console.log('received message: ', message);
    if(this.events[message.message]){
      this.events[message.message](message);
    }
  }.bind(this);

  window.onbeforeunload = function() {
      this.sendMessage({
        id: this.id,
        message: 'exit'
      });
      this.ws.onclose = function () {}; // disable onclose handler first
      this.ws.close()
  }.bind(this);
};

GameWebsocket.prototype.addEvent = function(key, action){
  this.events[key] = action;
};

GameWebsocket.prototype.sendMessage = function(message){
  this.ws.send(JSON.stringify(message));
};