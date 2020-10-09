var scene;
var camara;
var renderer;

var velocidadeEsferax = 0.5;
var velocidadeEsferay = 0.5;
var esfera;


var criaEsfera = function(){
    var geometria = new THREE.SphereGeometry(10,10,10);
    var material = new THREE.MeshBasicMaterial({color: "red",  wireframe: false});
	
    esfera = new THREE.Mesh(geometria, material);


    scene.add(esfera);
}

var render = function (){
    requestAnimationFrame(render);

    animaEsfera();
    renderer.render(scene,camera);
}

var animaEsfera = function(){
    
    if (this.esfera.position.x >= 70 || this.esfera.position.x <= -70 ){
        velocidadeEsferax = velocidadeEsferax * -1;   
    }
    if (this.esfera.position.y >= 27 || this.esfera.position.y <= -27 ){
        velocidadeEsferay = velocidadeEsferay * -1;   
    }

    console.log("Posicao esfera x " + this.esfera.position.x);
    console.log("position  esfera Y"+ this.esfera.position.y);

    this.esfera.position.x += velocidadeEsferax;
    this.esfera.position.y += velocidadeEsferay;

}

var init = function (){
    scene = new THREE.Scene;
    camera = new THREE.PerspectiveCamera(40, innerWidth/window.innerHeight, 2, 1000);

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    camera.position.z = 100;
	
    criaEsfera();
    
    render();
}

window.onload = this.init;