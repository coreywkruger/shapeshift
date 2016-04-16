
function GameEntity() {

  var self = this;
  var mesh;
  var behaviors = {};
  var components = {};

  this.name = null;

  this.Initialize = function(threejs_object, name){
    mesh = threejs_object;
    self.name = name;
    return self;
  };

  this.translateObject = function(x, y, z) {
    self.setPositionX(x);
    self.setPositionY(y);
    self.setPositionZ(z);
    return mesh;
  };

  this.setPositionX = function(x){
    mesh.position.x = x ? x : mesh.position.x;
  };
  this.setPositionZ = function(z){
    mesh.position.z = z ? z : mesh.position.z;
  };
  this.setPositionY = function(y){
    mesh.position.y = y ? y : mesh.position.y;
  };

  this.rotateObject = function(x, y, z) {
    self.setRotationX(x);
    self.setRotationY(y);
    self.setRotationZ(z);
    return mesh;
  };

  this.setRotationX = function(x){
    mesh.rotation.x = x ? x : mesh.rotation.x;
  };
  this.setRotationZ = function(z){
    mesh.rotation.z = z ? z : mesh.rotation.z;
  };
  this.setRotationY = function(y){
    mesh.rotation.y = y ? y : mesh.rotation.y;
  };

  this.rotateLeft = function() {
    mesh.rotation.y += Math.PI / 460;

    executeBehavior('rotate_left');
  };

  this.rotateRight = function() {
    mesh.rotation.y -= Math.PI / 460;

    executeBehavior('rotate_right');
  };

  this.moveForward = function() {
    var els = mesh.matrix.elements;
    var v = new THREE.Vector3(els[8], els[9], els[10]);
    mesh.position.add(v.clone().setLength(-300));

    executeBehavior('move_forward');
  };

  this.moveBackward = function() {
    var els = mesh.matrix.elements;
    var v = new THREE.Vector3(els[8], els[9], els[10]);
    mesh.position.add(v.clone().setLength(300));

    executeBehavior('move_backward');
  };

  this.getEntity = function(){
    return mesh;
  };

  this.addChild = function(child){
    mesh.add(child.getEntity());
    components[child.name] = child;
  };

  this.createBehavior = function(key, action){
    behaviors[key] = action;
  };

  function executeBehavior(key){
    if(behaviors[key] && typeof behaviors[key] === 'function'){
      behaviors[key]();
    }
  };
}

function _create_cab(name){
  var greenMat = new THREE.MeshBasicMaterial({
    color: 0x00ff00,
    wireframe: true
  });
  var geometry = new THREE.BoxGeometry(4500, 4500, 15000);
  var mesh = new THREE.Mesh(geometry, greenMat);
  var cab = new GameEntity();
  return cab.Initialize(mesh, name);
}

function _create_wheel(name){
  var mat = new THREE.MeshBasicMaterial({
    color: 0xff0000,
    wireframe: true
  });
  var geometry = new THREE.CylinderGeometry(3000, 3000, 2000, 16);
  var mesh = new THREE.Mesh(geometry, mat);
  var wheel = new GameEntity();
  return wheel.Initialize(mesh, name);
}

function _create_car() {

  var cab = _create_cab('cab_1');

  var rear_left = _create_wheel('rear_left');
  
  rear_left.translateObject(-5000, -5000, -9000);
  rear_left.setRotationZ(Math.PI / 2);
  cab.addChild(rear_left);

  var rear_right = _create_wheel('rear_right');
  rear_right.translateObject(5000, -5000, -9000);
  rear_right.setRotationZ(Math.PI / 2);
  cab.addChild(rear_right);

  var front_left = _create_wheel('front_left');
  front_left.translateObject(-5000, -5000, -1000);
  front_left.setRotationZ(Math.PI / 2);
  cab.addChild(front_left);

  var front_right = _create_wheel('front_right');
  front_right.translateObject(5000, -5000, -1000);
  front_right.setRotationZ(Math.PI / 2);
  cab.addChild(front_right);

  cab.setPositionX(2000);
  cab.setPositionZ(2000);

  return cab;
};