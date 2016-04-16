function GameScene() {

  var mainRenderer;
  var mainScene;
  var mainCamera;

  this.Initialize = function(force, from) {
    mainScene = new THREE.Scene();
    mainCamera = this._createCamera(75, 16 / 9, 1, 1000000);

    var gridHelper = new THREE.GridHelper(10000000, 10000);
    gridHelper.position.y = -5000;
    mainScene.add(gridHelper);
    mainRenderer = _createRenderer(1000, 1000, 9/16);
  };

  this.getScene = function() {
    return mainScene;
  };

  this.setActiveCamera = function(cam){
    mainCamera = cam;
    return mainCamera;
  };

  this.addObjectToScene = function(obj) {
    mainScene.add(obj);
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
    mainRenderer.render(mainScene, mainCamera);
  };

  this._createCamera = function(fov, aspect, near, far){
    var camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.y = 9000;
    camera.position.z = 23000;
    return camera;
  };
};

function _createRenderer(width, height, aspect) {
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