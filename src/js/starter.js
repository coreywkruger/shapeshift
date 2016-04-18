init();
animate();

var sce, car;
      
function init() { 
  // make scene
  sce = new GameScene();
  sce.Initialize();

  // initialize with a car object
  car = _create_car();
  var carCam = new GameEntity().Initialize(sce._createCamera(95, 16 / 9, 1, 1000000), 'cam_1');
  car.addChild(carCam);

  sce.addObjectToScene(car.getMesh());
  sce.setActiveCamera(carCam.getMesh());

  // handle controls
  controls = new GameControls();
  controls.createAction('87', function(){
    car.moveForward();
    var fr = car.getChild('front_right').rotateX(-0.01);
    var fl = car.getChild('front_left').rotateX(-0.01);
    var rr = car.getChild('rear_right').rotateX(-0.01);
    var rl = car.getChild('rear_left').rotateX(-0.01);
  });
  controls.createAction('83', function(){
    car.moveBackward();
    var fr = car.getChild('front_right').rotateX(0.01);
    var fl = car.getChild('front_left').rotateX(0.01);
    var rr = car.getChild('rear_right').rotateX(0.01);
    var rl = car.getChild('rear_left').rotateX(0.01);
  });
  controls.createAction('65', function(){
    car.rotateLeft();
  });
  controls.createAction('68', function(){
    car.rotateRight();
  });
  controls.startControls();

  $('#ThreeJS').append(sce.getElement());
}

function animate() {
  requestAnimationFrame( animate );
  render();   
  update();
}

function update() {
  // delta = change in time since last call (in seconds)
  // var delta = clock.getDelta(); 
}

function render() { 
  // renderer.render( scene, camera );
  sce.render();
}

