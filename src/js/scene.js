function GameScene() {

  var mainRenderer;
  var mainScene;

  this.Initialize = function(force, from) {
    mainScene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, 16 / 9, 1, 1000000);
    this.camera.position.y = 9000;
    this.camera.position.z = 23000;

    var gridHelper = new THREE.GridHelper(10000000, 10000);
    gridHelper.position.y = -5000;
    mainScene.add(gridHelper);
    mainRenderer = createRenderer(1000, 1000, 9/16);
  };

  this.getScene = function() {
    return mainScene;
  };

  this.addObject = function(obj) {
    if (obj instanceof Array) {
      for (var i = 0; i < obj.length; i++) {
        mainScene.add(obj[i]);
      }
    } else {
      mainScene.add(obj);
    }
  };

  this.deleteObject = function(id) {
    mainScene.remove(
      this.getObject(id)
    );
  };

  this.getObject = function(id) {
    for (var i = 0; i < mainScene.children.length; i++) {
      if (mainScene.children[i].game_id == id) {
        return mainScene.children[i];
      }
    }
  };

  this.getElement = function() {
    return mainRenderer.domElement;
  };

  this.render = function() {
    mainRenderer.render(mainScene, this.camera);
  };
};

function createRenderer(width, height, aspect) {
  var renderer = new THREE.WebGLRenderer({
    antialias: true,
    autoClear: true,
    alpha: true
  });
  renderer.setSize(width, height * (aspect));
  renderer.setClearColor(0x000000);
  renderer.setClear = true;
  return renderer;
};