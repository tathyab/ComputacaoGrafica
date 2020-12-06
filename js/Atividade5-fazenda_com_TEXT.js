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
        campoTexto: " Animais ",
        animais: ""
    };    

    gui.add(param, 'campoTexto').name("Fazenda");
    
    
    var chGeometry = gui.add(param, 'animais', ['Vaca', 'Gato', 'Galinha', 'Cavalo', 'Pterodactyl', 'Ovelha','Touro', 'Burro']).name("Elementos");
    chGeometry.onChange(function(parametroQualquer){
      
        if (parametroQualquer == 'Vaca'){
            camera.lookAt(ObjVaca.position);
        } else if (parametroQualquer == 'Gato'){
            camera.lookAt(ObjGato.position);
        } else if (parametroQualquer == 'Galinha'){
            camera.lookAt(ObjGalinha.position);
        }else if (parametroQualquer == 'Pterodactyl'){
            camera.lookAt(ObjPtero.position);
        } else if (parametroQualquer == 'Cavalo'){
            camera.lookAt(ObjCavalo.position);
        }else if (parametroQualquer == 'Ovelha'){
            camera.lookAt(ObjOvelha.position);
        }else if (parametroQualquer == 'Touro'){
            camera.lookAt(ObjTouro.position);
        }else if (parametroQualquer == 'Burro'){
            camera.lookAt(ObjBurro.position);
        }
      
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

    material = new THREE.MeshBasicMaterial({map : groundTexture});
    
    material.normalMap =  textureLoader.load('assets/textura/terrain/grasslight-big-nm.jpg');

    ground = new  THREE.Mesh(
        new THREE.PlaneGeometry(1050, 1050, 25,25),
        material
    );

    ground.rotation.x -= Math.PI / 2;
    ground.position.y=-2;

    scene.add(ground);
};

var loadObj = function(){
    objLoader = new THREE.OBJLoader();
    fbxLoader = new THREE.FBXLoader();
    textureLoader = new THREE.TextureLoader();


    fbxLoader.load(  //carega vaca
        'assets/modelos/vaca/Cow.FBX', //arquivo que vamos carregar
        function(object){
            ObjVaca = object;

            object.traverse( function ( child ) {
                        if ( child instanceof THREE.Mesh ) {
                            console.log(child);
                            child.material.map = textureLoader.load("assets/modelos/vaca/UVCow.png");
                            child.material.shininess = 0;
                        }
                    });

            ObjVaca.scale.x =0.1;
            ObjVaca.scale.y = 0.1;
            ObjVaca.scale.z = 0.1;

            ObjVaca.position.z = 0;
            ObjVaca.position.x = 0;
            ObjVaca.position.y = -2;


            ObjVaca.rotation.y += 1;

            ObjVaca.castShadow = true;

            scene.add(ObjVaca);    
        },//metodo, tudo deu certo
        function( andamento) {
            console.log((andamento.loaded / andamento.total *100) + "% pronto!");
        },//metodo executa enquanto carrega
        function (error){
            console.log("Deu caca: " + error);
        } //metodo deu merda
    );

    fbxLoader.load(  //carega touro
        'assets/modelos/touro/Bull.fbx', //arquivo que vamos carregar
        function(object){
            ObjTouro = object;

            object.traverse( function ( child ) {
                        if ( child instanceof THREE.Mesh ) {
                            console.log(child);
                            child.material.map = textureLoader.load("assets/modelos/touro/UVBull.png");
                            child.material.shininess = 0;
                        }
                    });

            ObjTouro.scale.x =0.05;
            ObjTouro.scale.y = 0.05;
            ObjTouro.scale.z = 0.05;

            ObjTouro.position.z = 60;
            ObjTouro.position.x = -120;
            ObjTouro.position.y = -2.5;


            ObjTouro.rotation.y = -4.5;

            ObjTouro.castShadow = true;

            scene.add(ObjTouro);    
        },//metodo, tudo deu certo
        function( andamento) {
            console.log((andamento.loaded / andamento.total *100) + "% pronto!");
        },//metodo executa enquanto carrega
        function (error){
            console.log("Deu caca: " + error);
        } //metodo deu merda
    );

        // carega galinha
        fbxLoader.load(
        'assets//modelos/galinha/Chicken.fbx', //arquivo que vamos carregar
        function(object){
            ObjGalinha = object;

            ObjGalinha.traverse( function ( child ) {
                if ( child instanceof THREE.Mesh ) {
                    console.log(child);
                    child.material.map = textureLoader.load("assets/modelos/galinha/UVChicken.png");
                    child.material.shininess = 0;
                }
            });

            ObjGalinha.scale.x = 0.01;
            ObjGalinha.scale.y = 0.01;
            ObjGalinha.scale.z = 0.01;

            ObjGalinha.position.z = 50;
            ObjGalinha.position.x = 90;
            ObjGalinha.position.y = -1;


            ObjGalinha.rotation.y += 0.7;

            ObjGalinha.castShadow = true;

            scene.add(ObjGalinha);    
        },//metodo, tudo deu certo
        function( andamento) {
            console.log((andamento.loaded / andamento.total *100) + "% pronto!");
        },//metodo executa enquanto carrega
        function (error){
            console.log("Deu caca: " + error);
        } //metodo deu merda
    );

    // carega GATO
    fbxLoader.load(
        'assets/modelos/gato/Cat.fbx', //arquivo que vamos carregar
        function(object){
            ObjGato = object;

            object.traverse( function ( child ) {
                if ( child instanceof THREE.Mesh ) {
                    console.log(child);
                    child.material.map = textureLoader.load("assets/modelos/gato/CatTexture.png");
                    child.material.shininess = 0;
                }
            });

            ObjGato.scale.x = 0.01;
            ObjGato.scale.y = 0.01;
            ObjGato.scale.z = 0.01;


            ObjGato.position.x = -30;
            ObjGato.position.y = -2;


            ObjGato.rotation.y = 3;
            ObjGato.castShadow = true;

            scene.add(ObjGato);    
        },//metodo, tudo deu certo
        function( andamento) {
            console.log((andamento.loaded / andamento.total *100) + "% pronto!");
        },//metodo executa enquanto carrega
        function (error){
            console.log("Deu caca: " + error);
        } //metodo deu merda
    );

    // carega Pterodactyl
    fbxLoader.load(
        'assets/modelos/ptero/Pterodactyl.fbx', //arquivo que vamos carregar
        function(object){
            ObjPtero = object;

            object.traverse( function ( child ) {
                if ( child instanceof THREE.Mesh ) {
                    console.log(child);
                    child.material.map = textureLoader.load("assets/modelos/ptero/UVPterodactyl.png");
                    child.material.shininess = 0;
                }
            });

            
            ObjPtero.scale.x = 0.01;
            ObjPtero.scale.y = 0.01;
            ObjPtero.scale.z = 0.01;

            ObjPtero.position.x = -100;
            ObjPtero.position.y = 25;
            ObjPtero.position.z = 50;

           ObjPtero.rotation.y -= 1;
           ObjPtero.rotation.x = 0.1;

            scene.add(ObjPtero);    
        },//metodo, tudo deu certo
        function( andamento) {
            console.log((andamento.loaded / andamento.total *100) + "% pronto!");
        },//metodo executa enquanto carrega
        function (error){
            console.log("Deu caca: " + error);
        } //metodo deu merda
    );

    // carega cavalo
    fbxLoader.load(
        'assets/modelos/cavalo/Horse.fbx', //arquivo que vamos carregar
        function(object){
            ObjCavalo = object;

            object.traverse( function ( child ) {
                if ( child instanceof THREE.Mesh ) {
                    console.log(child);
                    child.material.map = textureLoader.load("assets/modelos/cavalo/UVHorse.png");
                    child.material.shininess = 0;
                }
            });
    
            ObjCavalo.scale.x = 0.07;
            ObjCavalo.scale.y = 0.07;
            ObjCavalo.scale.z = 0.07;

            ObjCavalo.position.x = 60;
            ObjCavalo.position.y = -2;
            ObjCavalo.position.z = 5;

            ObjCavalo.rotation.y -= 1;

            scene.add(ObjCavalo);    
        },//metodo, tudo deu certo
        function( andamento) {
            console.log((andamento.loaded / andamento.total *100) + "% pronto!");
        },//metodo executa enquanto carrega
        function (error){
            console.log("Deu caca: " + error);
        } //metodo deu merda
    );

    // carega ovelha
    fbxLoader.load(
        'assets/modelos/ovelha/Sheep.fbx', //arquivo que vamos carregar
        function(object){
            ObjOvelha = object;

            object.traverse( function ( child ) {
                if ( child instanceof THREE.Mesh ) {
                    console.log(child);
                    child.material.map = textureLoader.load("assets/modelos/ovelha/UVSheep.png");
                    child.material.shininess = 0;
                }
            });
    
            ObjOvelha.scale.x = 0.04;
            ObjOvelha.scale.y = 0.04;
            ObjOvelha.scale.z = 0.04;

            ObjOvelha.position.x = 100;
            ObjOvelha.position.y = -2;
            ObjOvelha.position.z = 70;

            ObjOvelha.rotation.y -= 2;

            scene.add(ObjOvelha);    
        },//metodo, tudo deu certo
        function( andamento) {
            console.log((andamento.loaded / andamento.total *100) + "% pronto!");
        },//metodo executa enquanto carrega
        function (error){
            console.log("Deu caca: " + error);
        } //metodo deu merda
    );

    // carega burro
    fbxLoader.load(
    'assets/modelos/burro/Donkey.fbx', //arquivo que vamos carregar
    function(object){
        ObjBurro = object;

        object.traverse( function ( child ) {
            if ( child instanceof THREE.Mesh ) {
                console.log(child);
                child.material.map = textureLoader.load("assets/modelos/burro/UVDonkey.png");
                child.material.shininess = 0;
            }
        });

        ObjBurro.scale.x = 0.05;
        ObjBurro.scale.y = 0.05;
        ObjBurro.scale.z = 0.05;

        ObjBurro.position.x = 120;
        ObjBurro.position.y = -2;
        ObjBurro.position.z = 140;

        ObjBurro.rotation.y -= 2;

        scene.add(ObjBurro);    
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

    scene.fog = new THREE.Fog( 0xcce0ff, 200, 500 );

    render();

    document.addEventListener('keydown', onKeyDown ); 

    document.addEventListener('mousedown', onMouseDown ); //metodos de controle do mouser
    document.addEventListener('mouseup', onMouseUp ); 
    document.addEventListener('mousemove', onMouseMouse ); 
  
};

var ci = 0
var render = function() {
    requestAnimationFrame( render );

    //const delta = clock.getDelta();

	//if ( mixer ) mixer.update( delta );
    

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
    // if (e.keyCode == 187){ // +
    //     braco1.scale.x+=0.1;
    //     braco1.scale.y+=0.1;
    // }
    // if (e.keyCode == 189){ // -
    //     braco1.scale.x-=0.1;
    //     braco1.scale.y-=0.1;
    //     braco1.scale.z-=0.1;

    //     braco1.position.x+=1;

        // ground.scale.x -=0.1;
        // ground.scale.y -=0.1;
    //}
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

        //objCarregado.rotation.x += toRadians(deltaMovimento.y*1)*0.5;
        //objCarregado.rotation.y += toRadians(deltaMovimento.x*1)*0.5;
        camera.rotation.y += toRadians(deltaMovimento.x*0.1)*0.1;
  
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

var stop = false;