var scene;
var camara;
var renderer;

var velocidadeCubo = 0.5;
var cube;

var criaCubo = function(){
    var geometria = new THREE.BoxGeometry(10,10,10);
    var material = new THREE.MeshBasicMaterial({color: "blue"});
	
    cube = new THREE.Mesh(geometria, material);

    scene.add(cube);
}

var render = function (){
    requestAnimationFrame(render);

    animaCubo();
    renderer.render(scene,camera);
}

var animaCubo = function(){
    
    if (this.cube.position.x >= 75 || this.cube.position.x <= -75){
        velocidadeCubo = velocidadeCubo * -1;   
    }
    this.cube.position.x += velocidadeCubo;
    console.log("Posicao Cubi" + this.cube.position.x); 
}

var init = function (){
    scene = new THREE.Scene;
    camera = new THREE.PerspectiveCamera(40, innerWidth/window.innerHeight, 1, 1000);

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    camera.position.z = 100;
	
    criaCubo();
    
    render();
}

window.onload = this.init;