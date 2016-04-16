function GameControls() {

  var self = this;
  var actions = {};
  var keyCodes = {};
  var active = false;

  this.createAction = function(key, cb) {
    actions[key] = cb;
  };

  this.startControls = function() {

    $(window).on('keydown', function(event) {
      keyCodes[event.keyCode] = (event.type == 'keydown');
      active = true;
    });

    $(window).on('keyup', function(event, a, b) {
      keyCodes[event.keyCode] = (event.type == 'keydown');
      if (self._is_empty()) {
        active = false;
      }
    });

    setInterval(function() {
      if (active) {
        self._exec_funs();
      }
    }, 1);
  };

  this._is_empty = function() {
    for (var key in keyCodes) {
      if (keyCodes[key]) return false;
    }
    return true;
  };

  this._exec_funs = function() {
    for (var key in keyCodes) {
      if (keyCodes[key]) {
        if (actions[key]) {
          actions[key]();
        }
      }
    }
  };
}
