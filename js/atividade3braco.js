var scene;
var camera;
var renderer;

var velocity = 0.1;
var d_cot = 0;


var createACube = function() {
    var geometry = new THREE.BoxGeometry( 2, 10, 2 );

    red = new THREE.Color(1, 0, 0);
    green = new THREE.Color(0, 1, 0);
    blue = new THREE.Color(0, 0, 1);
    var colors = [red, green, blue];

    for (var i = 0; i < 3; i++) {
        geometry.faces[4 * i].color = colors[i];
        geometry.faces[4 * i+1].color = colors[i];
        geometry.faces[4 * i+2].color = colors[i];
        geometry.faces[4 * i+3].color = colors[i];

    }
    var material = new THREE.MeshBasicMaterial( { color: 0xffffff, vertexColors: true } );
    var geometry2 = new THREE.SphereGeometry(2, 32,32);
    var material2 = new THREE.MeshBasicMaterial( { color: 0xffffff} );
    
    cube = new THREE.Mesh( geometry, material );
    cube2 = new THREE.Mesh(geometry, material);

    sphere = new THREE.Mesh(geometry2, material2);
    sphere.position.y-=5;
    cube.add(sphere);

    sphere2 = new THREE.Mesh(geometry2, material2);
    sphere2.position.y-=5;
    cube2.add(sphere2);

    pivot = new THREE.Group();
    pivot.position.set(0,0,0);
    pivot.add(cube);
    pivot2 = new THREE.Group();
    pivot2.position.set(0,10,0);
    pivot2.add(cube2);
   
    pivot.add(pivot2);
    scene.add(pivot);

    cube.position.y+=pivot.position.x+5;
    cube2.position.y+=pivot2.position.x+5;

};

var init = function() {

    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 1, 1000 );

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    this.createACube();

    camera.position.z = 100;

    render();

    document.addEventListener('keydown', onKeyDown ); 

    document.addEventListener('mousedown', onMouseDown ); //metodos de controle do mouser
    document.addEventListener('mouseup', onMouseUp ); 
    document.addEventListener('mousemove', onMouseMouse ); 
  
};

var ci = 0
var render = function() {
    requestAnimationFrame( render );

    renderer.render( scene, camera );
};

var rotationVelocity = 0.005;
var rotationVelocity2 = 0.1;

var onKeyDown = function(e){
    console.log(e.keyCode);
    
    if (e.keyCode == 32){ //espaço -> rotação pelo pivo.
        
         if (pivot.rotation.z > 3 || pivot.rotation.z < 0 ){
            rotationVelocity*=-1;        
        }
        pivot.rotation.z+=rotationVelocity;

        if (pivot2.rotation.z > 0 || pivot2.rotation.z < -2){
            rotationVelocity2*=-1;
        }
        pivot2.rotation.z-=rotationVelocity2;
        
       // pivo.rotation.y+=0.1;
    }
    if (e.keyCode == 187){ // +
        scene.scale.x+=0.1;
        scene.scale.y+=0.1;
        scene.scale.z+=0.1;
    }
    if (e.keyCode == 189){ // -
        scene.scale.x-=0.1;
        scene.scale.y-=0.1;
        scene.scale.z-=0.1;
    }
}


var posicaoMouser = { //controla a posição do mouser
    x: 0,
    y: 0
};

var cliquePressionado = false; //para controlar o tempo que o cara esta pressionando o botao do mouser

var onMouseDown = function(e){
    cliquePressionado = true;
    //console.log("Apertou Clicou")
}


var onMouseUp = function(e){
    cliquePressionado = false;
  //  console.log("SOltou o clique");
}


var onMouseMouse = function (e){
    if (cliquePressionado){

        var deltaMovimento = {
            x: e.offsetX - posicaoMouser.x,
            y: e.offsetY - posicaoMouser.y,
        }

        //cube.position.x += deltaMovimento.x*0.01;
        //cube.position.y += deltaMovimento.y*0.01*-1;

        //cube.rotation.x += toRadians(deltaMovimento.y*1)*0.5;
       // cube.rotation.y += toRadians(deltaMovimento.x*1)*0.5;
    }

    posicaoMouser = {  //nova posição do mouser
        x : e.offsetX,
        y : e.offsetY
    };
}

window.onload = this.init;

function toRadians(angle) {
	return angle * (Math.PI / 180);
}