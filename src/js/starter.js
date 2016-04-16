// var keyboard = new THREEx.KeyboardState();
// var clock = new THREE.Clock();

init();
animate();

var sce;
      
function init() { 
  sce = new GameScene();
  sce.Initialize();
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

