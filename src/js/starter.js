init();
animate();
    
var sce;

function init() { 
  // make scene
  sce = new GameScene();
  sce.Initialize();

  // initialize with a car object
  var car = _create_car();
  var carCam = new GameEntity().Initialize(sce._createCamera(95, 16 / 9, 1, 1000000), 'cam_1');
  car.addChild(carCam);
  sce.addObjectToScene(car);
  sce.setActiveCamera(carCam);

  // handle controls
  var controls = new GameControls();
  controls.createAction('87', function(){
    car.moveForward();
    car.getChild('front_right').rotateX(-0.01);
    car.getChild('front_left').rotateX(-0.01);
    car.getChild('rear_right').rotateX(-0.01);
    car.getChild('rear_left').rotateX(-0.01);
  });
  controls.createAction('83', function(){
    car.moveBackward();
    car.getChild('front_right').rotateX(0.01);
    car.getChild('front_left').rotateX(0.01);
    car.getChild('rear_right').rotateX(0.01);
    car.getChild('rear_left').rotateX(0.01);
  });
  controls.createAction('65', function(){
    car.rotateLeft();
  });
  controls.createAction('68', function(){
    car.rotateRight();
  });
  controls.startControls();
  $('#ThreeJS').append(sce.getElement());

  var ws = new GameWebsocket('ws://localhost:3334/register');
  // ws.Init();
  console.log(ws);
  setTimeout(function(){
    ws.sendMessage({
      'message': 'hello world'
    });
  }, 2000);

  
}

function animate() {
  requestAnimationFrame(animate);
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

