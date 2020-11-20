
var scene;
var camera;
var renderer;

var velocity = 0.1;
function createMaterial() {
    const material = new THREE.MeshPhongMaterial({
      side: THREE.DoubleSide,
    });
   
    const hue = Math.random();
    const saturation = 1;
    const luminance = .5;
    material.color.setHSL(hue, saturation, luminance);
   
    return material;
}


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
    braco1 = new THREE.Mesh( geometry, material );
    

    var geometry2 = new THREE.SphereGeometry(2, 32,32);
    var material2 = new THREE.MeshBasicMaterial( { color: new THREE.Color(0, 1, 0)} );
    cotovelo = new THREE.Mesh(geometry2, material2);
    cotovelo.position.y-=5;
    braco1.add(cotovelo);

    pivot = new THREE.Group();
    pivot.position.set(0,0,0);
    pivot.add(braco1);

    scene.add(pivot);
    braco1.position.y+=pivot.position.x+5;


    var geometryesfere = new THREE.SphereGeometry(6, 8, 16);
    sfera1 = new THREE.Mesh( geometryesfere, material2 );
    sfera1.position.set(10 ,0,-9);
    scene.add(sfera1);


    const geometryobject2 = new THREE.TorusBufferGeometry(5, 2,8, 24);
    Object2 = new THREE.Mesh( geometryobject2, material2 );
    Object2.position.set(25,0,0);
    scene.add(Object2);

    //cria um cone
    const cone = new THREE.Mesh( new THREE.ConeGeometry( 5, 20, 32 ), new THREE.MeshBasicMaterial( {color: 0x663366} ) );
    cone.position.set(-20,0,10)
    scene.add( cone );

    //cria um cilindro 
    const cylinder = new THREE.Mesh( new THREE.CylinderBufferGeometry( 5, 5, 20, 32 ), new THREE.MeshBasicMaterial( {color: 0xffff00} ) );
    cylinder.position.set(-40,5,40)
    scene.add( cylinder );

    //cria um cilindro 
    const cylinder2 = new THREE.Mesh( new THREE.CylinderBufferGeometry( 5, 5, 20, 32 ), new THREE.MeshBasicMaterial( {color: 0xff00ff} ) );
    cylinder2.position.set(-70,5,40)
    scene.add( cylinder2 );

    //cria um cubo 
    const cubo = new THREE.Mesh( new THREE.BoxBufferGeometry(8, 8, 8), new THREE.MeshBasicMaterial( {color: 0x0000ff} ) );
    cubo.position.set(-100, 5, 0);
    scene.add(cubo);

};

var init = function() {

    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera( 

                                60                                          // angulo
                                ,window.innerWidth / window.innerHeight     //aspect
                                ,0.1                                       // Near
                                ,1000                                      // Far
                            );

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    this.createACube();

   
	camera.position.set( 0, 20, 100 );

    

    //Essas linhas criam o gridView, lembrando que ele basicamente é só uma grade de linhas no eixo X
    //scene.add( new THREE.GridHelper( 400, 40 ) );
  

    
   /*Para criar o plano */
   const ground = new THREE.Mesh(
        new THREE.PlaneBufferGeometry( 100, 100, 10 ),
        new THREE.MeshBasicMaterial( { color: 0xffffff})
    ); //Cria a forma plana

    ground.rotation.x = - Math.PI / 2; // rotaciona para que ela fique paralela ao eixo X
    ground.position.y-=6; // Posiciona o ground abaixo da nossa figura.
    scene.add( ground );


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

var rotationVelocity = 0.1;

var onKeyDown = function(e){
    console.log(e.keyCode);
    if (e.keyCode == 38){ //Seta Up : avança no eixo y;
        camera.position.y+= 0.2;
    }
    if (e.keyCode == 40){ //Seta Down: recua no eixo y;
        camera.position.y-=0.2;
    }
    
    if(e.keyCode == 37){// seta esquerda: recua no eixo X;
       camera.position.x-=0.2;
    }
    if(e.keyCode == 39){ //Seta direita: avança no eixo X;
        camera.position.x+=0.2;
    }

    if (e.keyCode == 81){// 'Q' : avança no eixo Z;
        camera.position.z+=0.2;
    }
    if (e.keyCode == 65){ // 'A': Recua no eixo Z;
        camera.position.z-=0.2;
    }

    if (e.keyCode == 32){ //'espaço' = Deve fazer a rotação sobre o eixo y, deixando-o fixo.
        camera.rotation.y+=0.1;        
    }
    if (e.keyCode == 187){ // +
        braco1.scale.x+=0.1;
        braco1.scale.y+=0.1;
        braco1.scale.z+=0.1;
    }
    if (e.keyCode == 189){ // -
        camera.position.z+=0.1;
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

        braco1.rotation.x += toRadians(deltaMovimento.y*1)*0.5;
        braco1.rotation.y += toRadians(deltaMovimento.x*1)*0.5;
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