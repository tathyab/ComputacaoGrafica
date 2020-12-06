var scene;
var camera;
var renderer;

var velocity = 0.1;

var ground;

var objLoader;
var textureLoader;

var spotLight;

var obj; //objeto dinamico.

var objCarregado = [];


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
    var material2 = new THREE.MeshBasicMaterial( { color: 0xffffff} );
    cotovelo = new THREE.Mesh(geometry2, material2);
    cotovelo.position.y-=5;
    braco1.add(cotovelo);

    pivot = new THREE.Group();
    pivot.position.set(0,0,0);
    pivot.add(braco1);

    scene.add(pivot);
    braco1.position.y+=pivot.position.x+5;

};

var guiFunction = function(){
    const gui = new dat.GUI();

    var parametroQualquer;

    param = {
        campoTexto: "Testes dos Braço",
        escala: 1,
        cor: "#000000",
        x:0,
        y:0,
        z:0,
        geometria: ""
    };    

    gui.add(param, 'campoTexto').name("nome obj");
    
    var scale = gui.add(param, 'escala').min(0.1).max(5).step(0.1).name("escala");
    scale.onChange(function (parametroQualquer){
        objCarregado.scale.x = parametroQualquer;
        objCarregado.scale.y = parametroQualquer;
        objCarregado.scale.z = parametroQualquer;
    });


    var colore = gui.addColor(param, 'cor').name("Cor Obj");
    colore.onChange(function (parametroQualquer){
        console.log(objCarregado);
        objCarregado.traverse( function ( child ) {
            if ( child instanceof THREE.Mesh ) {
                child.material.color.setHex(parametroQualquer.replace("#", "0x"));
            }
        });
        //cotovelo.material.color.setHex(parametroQualquer.replace("#", "0x"));
    });


    var pastaPosicao = gui.addFolder("Posicao");

    var posX = pastaPosicao.add(param, 'x').min(-30).max(30).step(1).name("x");
    posX.onChange(function (parametroQualquer){
        objCarregado.position.x = parametroQualquer;
    });

    var posY = pastaPosicao.add(param, 'y').min(-30).max(30).step(1).name("y");
    posY.onChange(function (parametroQualquer){
        objCarregado.position.y = parametroQualquer;
    });

    var posZ = pastaPosicao.add(param, 'z').min(-30).max(30).step(1).name("z");
    posZ.onChange(function (parametroQualquer){
        objCarregado.position.z = parametroQualquer;
    });
    
    var chGeometry = gui.add(param, 'geometria', ['Sphere', 'Cube', 'Cylinder']).name("Elementos");
    chGeometry.onChange(function(parametroQualquer){
        
        var geometry2;

        scene.remove(obj);
        
        if (parametroQualquer == 'Sphere'){
            geometry2 = new THREE.SphereGeometry(2, 32,32);
        } else if (parametroQualquer == 'Cube'){
            geometry2 = new THREE.CubeGeometry(6, 6, 6);
        } else if (parametroQualquer == 'Cylinder'){
            geometry2 = new THREE.CylinderGeometry(2, 2,10, 32);
        }

        obj = new THREE.Mesh(
            geometry2, 
            new THREE.MeshPhongMaterial( { color: 0xffffff} )
        );
        obj.castShadow = true;
        obj.position.x = -5;
        obj.position.y = 10;

        scene.add(obj);
        
    });
    
    
   


    gui.open();
   
};


var criaGround = function (){

    textureLoader = new THREE.TextureLoader();
    groundTexture = textureLoader.load('assets/textura/terrain/grasslight-big.jpg');
    groundTexture.wrapS = groundTexture.wrapT = THREE.RepeatWrapping;
    groundTexture.repeat.set( 20, 20 );
    groundTexture.anisotropy = 16;
    groundTexture.encoding = THREE.sRGBEncoding;

    ground = new  THREE.Mesh(
        new THREE.PlaneGeometry(1050, 1050, 25,25),
        new THREE.MeshBasicMaterial({map : groundTexture})
    );

    ground.rotation.x -= Math.PI / 2;
    ground.position.y=-2;

    scene.add(ground);
};

var loadObj = function(){
    objLoader = new THREE.OBJLoader(); //THREE.FBXLoader
    textureLoader = new THREE.TextureLoader();
 
    objLoader.load(
        'assets/Cerberus.obj', //arquivo que vamos carregar
        function(object){
            objCarregado = object;

            object.traverse( function ( child ) {
                        if ( child instanceof THREE.Mesh ) {
                            console.log(child);
                            child.material.map = textureLoader.load("assets/textura/Cerberus_A.jpg");
                            //child.material.displacementBias = 0.7;
                            //child.material.displacementScale = 2.1;
                            child.material.metalnessMap = child.material.roughnessMap = textureLoader.load( 'assets/textura/Cerberus_RM.jpg' );
                            //child.material.normalMap = loader.load( 'assets/textura/Cerberus_N.jpg' );

                        }
                    });

            objCarregado.scale.x =20;
            objCarregado.scale.y = 20;
            objCarregado.scale.z = 20;

            objCarregado.position.z = 30;
            objCarregado.position.x = 5;
            objCarregado.position.y = 23;


            objCarregado.rotation.y += 1;

            objCarregado.castShadow = true;

           // camera.lookAt(objCarregado.position)

            scene.add(objCarregado);    
        },//metodo, tudo deu certo
        function( andamento) {
            console.log((andamento.loaded / andamento.total *100) + "% pronto!");
        },//metodo executa enquanto carrega
        function (error){
            console.log("Deu caca: " + error);
        } //metodo deu merda
    );


}

var init = function() {

    scene = new THREE.Scene();
    scene.background = new THREE.Color( 0xcce0ff );

    camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 1, 140 );

    renderer = new THREE.WebGLRenderer();
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
  

    //createACube();

    loadObj();

    camera.position.z = 100;
    camera.position.y = 30;


    //Iluminação 
    //Não se preocupe com essa parte por enquanto, apenas usem :)
    spotLight = new THREE.SpotLight( 0xffffff );
    scene.add(spotLight);
    spotLight.position.set( 100, 100, 100 );
    spotLight.castShadow = true;
    spotLight.shadow.mapSize.width = 100;
    spotLight.shadow.mapSize.height = 100;
    spotLight.shadow.camera.near = 1;
    spotLight.shadow.camera.far = 99;
    spotLight.shadow.camera.fov = 40;

    renderer.shadowMap.enable = true;
    renderer.shadowMap.type = THREE.BasicShadowMap;


    
    scene.add(new THREE.AmbientLight( 0xffffff ));


    criaGround();

    guiFunction();

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
    if(e.keyCode == 37){
        obj.position.x-=velocity;
    }
    if(e.keyCode == 38){
        if (camera.position.y >=0)
            camera.position.y-= 1;
    }
    if(e.keyCode == 40){
        camera.position.y+= 1;
    }
    if (e.keyCode == 32){ //espaço -> rotação pelo pivo.
        
        console.log("Z: "+ pivot.rotation.z);
        if (pivot.rotation.z > 1.7 || pivot.rotation.z < -1){
            rotationVelocity*=-1;
        }
        obj.rotation.z+=rotationVelocity; 
       // pivo.rotation.y+=0.1;
    }
    if (e.keyCode == 187){ // +
        braco1.scale.x+=0.1;
        braco1.scale.y+=0.1;
        braco1.scale.z+=0.1;

       
    }
    if (e.keyCode == 189){ // -
        braco1.scale.x-=0.1;
        braco1.scale.y-=0.1;
        braco1.scale.z-=0.1;

        braco1.position.x+=1;

        // ground.scale.x -=0.1;
        // ground.scale.y -=0.1;
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

        objCarregado.rotation.x += toRadians(deltaMovimento.y*1)*0.5;
        objCarregado.rotation.y += toRadians(deltaMovimento.x*1)*0.5;
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