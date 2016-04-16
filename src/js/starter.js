init();
animate();

var sce, car;
      
function init() { 
  // make scene
  sce = new GameScene();
  sce.Initialize();

  // create a game entity
  car = new GameEntity();
  // initialize with a car object
  car.Initialize(_createCar("blah"));
  var carCam = sce._createCamera(75, 16 / 9, 1, 1000000);
  car.addChild(carCam);
  sce.addObject(car.getEntity());
  sce.setActiveCamera(carCam);

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

