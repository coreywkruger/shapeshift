function GameWebsocket(host){
  console.log(host);
  this.ws = new WebSocket(host);
  this.ws.onopen = function() {
    if (this.ws.bufferedAmount == 0) {
      this.sendMessage({
        message: 'connected'
      });
    }
  }.bind(this);
}

GameWebsocket.prototype.sendMessage = function(message){
  this.ws.send(JSON.stringify(message));
};

GameWebsocket.prototype.close = function() {
  this.ws.close();
  this.ws = null;
};