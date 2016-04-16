init();
animate();

var sce, car;
      
function init() { 
  // make scene
  sce = new GameScene();
  sce.Initialize();

  // initialize with a car object
  car = _create_car();
  var carCam = new GameEntity().Initialize(sce._createCamera(75, 16 / 9, 1, 1000000), 'cam_1');
  car.addChild(carCam);

  sce.addObjectToScene(car.getEntity());
  sce.setActiveCamera(carCam.getEntity());

  // handle controls
  controls = new GameControls();
  controls.createAction('87', function(){
    car.moveForward();
  });
  controls.createAction('83', function(){
    car.moveBackward();
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

