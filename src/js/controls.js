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
      if (_is_empty()) {
        active = false;
      }
    });

    setInterval(function() {
      if (active) {
        _exec_funs();
      }
    }, 1);
  };

  function _is_empty() {
    for (var key in keyCodes) {
      if (keyCodes[key]) return false;
    }
    return true;
  };

  function _exec_funs() {
    for (var key in keyCodes) {
      if (keyCodes[key]) {
        if (actions[key]) {
          actions[key]();
        }
      }
    }
  };
}
