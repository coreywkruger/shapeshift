function GameEntity() {
  this.mesh;
  this.name = null;
  this.components = {};
}

GameEntity.prototype.Initialize = function(threejs_object, name){    
  this.mesh = threejs_object;
  this.name = name;
  return this;
};

GameEntity.prototype.translate = function(x, y, z){
  this.translateX(x);
  this.translateY(y);
  this.translateZ(z);
  return this.mesh;
};
GameEntity.prototype.translateX = function(x){
  this.setPositionX(this.getMesh().position.x + x);
};
GameEntity.prototype.translateY = function(y){
  this.setPositionY(this.getMesh().position.y + y);
};
GameEntity.prototype.translateZ = function(z){
  this.setPositionZ(this.getMesh().position.z + z);
};

GameEntity.prototype.setPosition = function(x, y, z) {
  this.setPositionX(x);
  this.setPositionY(y);
  this.setPositionZ(z);
  return this.mesh;
};

GameEntity.prototype.setPositionX = function(x){
  this.mesh.position.x = x ? x : this.mesh.position.x;
};
GameEntity.prototype.setPositionZ = function(z){
  this.mesh.position.z = z ? z : this.mesh.position.z;
};
GameEntity.prototype.setPositionY = function(y){
  this.mesh.position.y = y ? y : this.mesh.position.y;
};

GameEntity.prototype.setRotation = function(x, y, z) {
  this.setRotationX(x);
  this.setRotationY(y);
  this.setRotationZ(z);
  return this.mesh;
};

GameEntity.prototype.rotate = function(x, y, z){
  this.rotateX(x);
  this.rotateY(y);
  this.rotateZ(z);
  return this.mesh;
};
GameEntity.prototype.rotateX = function(x){
  this.setRotationX(this.getMesh().rotation.x + x);
};
GameEntity.prototype.rotateY = function(y){
  this.setRotationY(this.getMesh().rotation.y + y);
};
GameEntity.prototype.rotateZ = function(z){
  this.setRotationZ(this.getMesh().rotation.z + z);
};

GameEntity.prototype.setRotationX = function(x){
  this.mesh.rotation.x = x ? x : this.mesh.rotation.x;
};
GameEntity.prototype.setRotationZ = function(z){
  this.mesh.rotation.z = z ? z : this.mesh.rotation.z;
};
GameEntity.prototype.setRotationY = function(y){
  this.mesh.rotation.y = y ? y : this.mesh.rotation.y;
};

GameEntity.prototype.rotateLeft = function() {
  this.mesh.rotation.y += Math.PI / 460;
};

GameEntity.prototype.rotateRight = function() {
  this.mesh.rotation.y -= Math.PI / 460;
};

GameEntity.prototype.moveForward = function() {
  var els = this.mesh.matrix.elements;
  var v = new THREE.Vector3(els[8], els[9], els[10]);
  this.mesh.position.add(v.clone().setLength(-300));
};

GameEntity.prototype.moveBackward = function() {
  var els = this.mesh.matrix.elements;
  var v = new THREE.Vector3(els[8], els[9], els[10]);
  this.mesh.position.add(v.clone().setLength(300));
};

GameEntity.prototype.getChild = function(name){
  return this.components[name];
};

GameEntity.prototype.getMesh = function(){
  return this.mesh;
};

GameEntity.prototype.addChild = function(child){
  this.mesh.add(child.getMesh());
  this.components[child.name] = child;
};

function _create_car(id) {

  var cab = _create_cab_mesh(id);

  var rear_left = _create_wheel('rear_left');
  rear_left.setPosition(-5000, -5000, -9000);
  rear_left.setRotationZ(Math.PI / 2);
  cab.addChild(rear_left);

  var rear_right = _create_wheel('rear_right');
  rear_right.setPosition(5000, -5000, -9000);
  rear_right.setRotationZ(Math.PI / 2);
  cab.addChild(rear_right);

  var front_left = _create_wheel('front_left');
  front_left.setPosition(-5000, -5000, -1000);
  front_left.setRotationZ(Math.PI / 2);
  cab.addChild(front_left);

  var front_right = _create_wheel('front_right');
  front_right.setPosition(5000, -5000, -1000);
  front_right.setRotationZ(Math.PI / 2);
  cab.addChild(front_right);

  cab.setPositionX(2000);
  cab.setPositionZ(2000);

  return cab;
}

function _create_cab_mesh(name){
  var greenMat = new THREE.MeshBasicMaterial({
    color: 0x00ff00,
    wireframe: true
  });
  var geometry = new THREE.BoxGeometry(4500, 4500, 15000);
  var mesh = new THREE.Mesh(geometry, greenMat);
  mesh.name = name;
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