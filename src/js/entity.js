
function GameEntity() {

  var self = this;
  var entity;

  this.Initialize = function(object){
    entity = object;
  };

  this.translateObject = function(x, y, z) {
    entity.position.x = x ? x : entity.position.x;
    entity.position.y = y ? y : entity.position.y;
    entity.position.z = z ? z : entity.position.z;
    return entity;
  };

  this.rotateObject = function(x, y, z) {
    entity.rotation.x = x ? x : entity.rotation.x;
    entity.rotation.y = y ? y : entity.rotation.y;
    entity.rotation.z = z ? z : entity.rotation.z;
    return entity;
  };

  this.rotateLeft = function() {
    entity.rotation.y += Math.PI / 460;
  };

  this.rotateRight = function() {
    entity.rotation.y -= Math.PI / 460;
  };

  this.moveForward = function() {
    entity.updateWheels(1);
    var els = entity.matrix.elements;
    var v = new THREE.Vector3(els[8], els[9], els[10]);
    entity.position.add(v.clone().setLength(-300));
  };

  this.moveBackward = function() {
    entity.updateWheels(-1);
    var els = entity.matrix.elements;
    var v = new THREE.Vector3(els[8], els[9], els[10]);
    entity.position.add(v.clone().setLength(300));
  };

  this.getEntity = function(){
    return entity;
  };

  this.addChild = function(childObject){
    entity.add(childObject);
  };
}

function _createCar(id) {

  var greenMat = new THREE.MeshBasicMaterial({
    color: 0x00ff00,
    wireframe: true
  });
  var blueMat = new THREE.MeshBasicMaterial({
    color: 0xffff00,
    wireframe: false
  });
  var redMat = new THREE.MeshBasicMaterial({
    color: 0xff0000,
    wireframe: true
  });

  var cube = new THREE.Object3D();

  var bodyGeometry = new THREE.BoxGeometry(4500, 4500, 15000);
  // bodyGeometry.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
  var body = new THREE.Mesh(bodyGeometry, greenMat)
  cube.add(body);

  var wheelGeometry1 = new THREE.CylinderGeometry(3000, 3000, 2000, 16);
  // wheelGeometry1.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, 0));
  var rear_left = new THREE.Mesh(wheelGeometry1, redMat);
  rear_left.rotation.z = Math.PI / 2;
  rear_left.position.x = -5000;
  rear_left.position.z = 5000;
  rear_left.position.y = -1000;
  cube.add(rear_left);

  var rear_right = new THREE.Mesh(wheelGeometry1, redMat);
  rear_right.rotation.z = Math.PI / 2;
  rear_right.position.x = 5000;
  rear_right.position.z = 5000;
  rear_right.position.y = -1000;
  cube.add(rear_right);

  var front_left = new THREE.Mesh(wheelGeometry1, redMat);
  front_left.rotation.z = Math.PI / 2;
  front_left.position.x = -5000;
  front_left.position.z = -5000;
  front_left.position.y = -1000;
  cube.add(front_left);

  var front_right = new THREE.Mesh(wheelGeometry1, redMat);
  front_right.rotation.z = Math.PI / 2;
  front_right.position.x = 5000;
  front_right.position.z = -5000;
  front_right.position.y = -1000;
  cube.add(front_right);

  cube.wheels = {
    rear_left: rear_left,
    rear_right: rear_right,
    front_left: front_left,
    front_right: front_right
  };

  cube.updateWheels = function(dir) {
    for (var key in cube.wheels) {
      cube.wheels[key].rotation.x += dir * Math.PI / 20;
    }
  }

  cube.name = id;
  cube.game_id = id;
  cube.type = "user";
  cube.position.x += 2000;
  cube.position.z += 2000;

  return cube;
};