init();
animate();
    
var sce;

function init() { 
  // make scene
  sce = new GameScene();
  sce.Initialize();

  // initialize with a car object
  var id = Math.floor((Math.random() * 1000) + 1);
  var car = _create_car(id);
  var carCam = new GameEntity().Initialize(sce._createCamera(95, 16 / 9, 1, 1000000), 'cam_1');
  car.addChild(carCam);
  sce.addObjectToScene(car);
  sce.setActiveCamera(carCam);

  // handle keyboard
  var keyboard = new KeyboardControls();

  // forward
  keyboard.createAction('87', function(){
    car.moveForward();
    car.getChild('front_right').rotateX(-0.01);
    car.getChild('front_left').rotateX(-0.01);
    car.getChild('rear_right').rotateX(-0.01);
    car.getChild('rear_left').rotateX(-0.01);
    var m = car.getMesh();
    ws.sendMessage({
      'message': 'moving',
      'data': {
        position: m.position.toArray(),
        rotation: m.rotation.toArray()
      }, id: m.name
    });
  });

  // backward
  keyboard.createAction('83', function(){
    car.moveBackward();
    car.getChild('front_right').rotateX(0.01);
    car.getChild('front_left').rotateX(0.01);
    car.getChild('rear_right').rotateX(0.01);
    car.getChild('rear_left').rotateX(0.01);
    var m = car.getMesh();
    ws.sendMessage({
      'message': 'moving',
      'data': {
        position: m.position.toArray(),
        rotation: m.rotation.toArray()
      }, id: m.name
    });
  });

  // left
  keyboard.createAction('65', function(){
    car.rotateLeft();
    var m = car.getMesh();
    ws.sendMessage({
      'message': 'moving',
      'data': {
        position: m.position.toArray(),
        rotation: m.rotation.toArray()
      }, id: m.name
    });
  });

  // right
  keyboard.createAction('68', function(){
    car.rotateRight();
    var m = car.getMesh();
    ws.sendMessage({
      'message': 'moving',
      'data': {
        position: m.position.toArray(),
        rotation: m.rotation.toArray()
      }, id: m.name
    });
  });

  // start listening to keyboard
  keyboard.start();

  var entities = {};
  // connect to server and claim name/id
  var ws = new GameWebsocket('ws://localhost:3334/register'+'?id='+id, id, function(){
    ws.sendMessage({
      message: 'entering',
      id: id
    });

    // signal other players you are entering
    ws.addEvent('entering', function(data){
      if(data.id !== car.id && !entities[data.id]){
        entities[data.id] = _create_car(data.id);
        sce.addObjectToScene(entities[data.id]);
        ws.sendMessage({
          message: 'entering',
          id: id
        });

        // set initial position
        var m = car.getMesh();
        ws.sendMessage({
          'message': 'moving',
          'data': {
            position: m.position.toArray(),
            rotation: m.rotation.toArray()
          }, id: id
        });
      }
    });
    
    // when a player signals they are moving
    ws.addEvent('moving', function(data){
      if(data.id !== car.id && entities[data.id]){
        entities[data.id].setPosition(data.data.position[0], data.data.position[1], data.data.position[2]);
        entities[data.id].setRotation(data.data.rotation[0], data.data.rotation[1], data.data.rotation[2]);
      }
    });

    // when a player signals they are exiting
    ws.addEvent('exit', function(data){
      var ob = sce.getObject(data.id);
      delete entities[data.id];
      sce.deleteObject(data.id);
    }.bind(this));
  });

  // add canvas to page
  $('#ThreeJS').append(sce.getElement());
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

