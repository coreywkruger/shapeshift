function GameWebsocket(host){
  this.ws = new WebSocket(host);
  this.ws.onopen = function() {
    if (this.ws.bufferedAmount == 0) {
      this.sendMessage({
        message: 'connected'
      });
    }
  }.bind(this);
  this.ws.onmessage = function(event) {
    var message = JSON.parse(event.data);
    console.log('received message: ', message);
  }.bind(this);
}

GameWebsocket.prototype.sendMessage = function(message){
  this.ws.send(JSON.stringify(message));
};

GameWebsocket.prototype.close = function() {
  this.ws.close();
  this.ws = null;
};