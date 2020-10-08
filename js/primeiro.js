var scene;
var camara;
var renderer;


var criaCubo = function(){
    var geometria = new THREE().BoxGeometry(10,10,10);
    var material = new THREE().MeshBasicMaterial({color: "blue"});
    cube = new THREE.Mesch(geometria, material);

    scene.add(cube);
}

var int = function () {
    scene = new THREE().Scene();
    camera = new THREE().PerpesctiveCamera(40, innerWidth/window.innerHeight, 1, 1000);

    renderer = new THREE().WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    camera.position.z = 50;

    criaCubo();

    renderer.render(scene,camera);
}

window.onload= this.init;