var scene;
var camera;
var renderer;
var controls;

var velocity = 0.1;

var ground;

var objLoader;
var textureLoader;

//iluminação
var spotLight;
var ambientLight;
var directionalLight;

var clock = new THREE.Clock();


var mixer;//mixer: THREE.AnimationMixer;
var modelReady = false;
var animationActions = Array();
var activeAction;//: THREE.AnimationAction;
var lastAction;// : THREE.AnimationAction;
var loadFinished = false;

var bouding = [];
var boudingBox = [];
var boudingTree = [];

var objCarregado = [];
var directionObject = [];
var animationsFolder;

var ataque = false;

var guiFunction = function(){
    const gui = new dat.GUI();

    var parametroQualquer;

    param = {
        campoTexto: "Teste Texturas",
        escalaA: 1,
        escalaD: 1,
        cor: "#000000",
        corD: "#000000",
        x:0,
        y:0,
        z:0,
        animais: "",
        walk: function () {
            setAction(animationActions[1]);
        },
        run: function () {
            setAction(animationActions[0]);
        },
        sit: function () {
            setAction(animationActions[3])
        },
        creep: function () {
            setAction(animationActions[5])
        },
        gira: function () {
            setAction(animationActions[0])
        },
        seiNao: function () {
            setAction(animationActions[2])
        }
    };    


    gui.add(param, 'campoTexto').name("nome obj");
    
    var pastaAmb = gui.addFolder("Luz Ambiente");
    var scalep = pastaAmb.add(param, 'escalaA').min(0.1).max(5).step(0.1).name("Luz Ambiente");
    scalep.onChange(function (parametroQualquer){
        ambientLight.intensity = parametroQualquer;
    });
    var colore = pastaAmb.addColor(param, 'cor').name("Cor Obj");
    colore.onChange(function (parametroQualquer){
        ambientLight.color.setHex(parametroQualquer.replace("#", "0x"));

        //cotovelo.material.color.setHex(parametroQualquer.replace("#", "0x"));
    });


    var pastaDir = gui.addFolder("Luz Direcional");
    var scalep = pastaDir.add(param, 'escalaD').min(0).max(5).step(0.1).name("Luz Direc");
    scalep.onChange(function (parametroQualquer){
        ambientLight.intensity = parametroQualquer;
    });
    var colore = pastaDir.addColor(param, 'corD').name("Cor Directional");
    colore.onChange(function (parametroQualquer){
        ambientLight.color.setHex(parametroQualquer.replace("#", "0x"));

        //cotovelo.material.color.setHex(parametroQualquer.replace("#", "0x"));
    });


    var pastaPosicao = gui.addFolder("Posicao");

    var posX = pastaPosicao.add(param, 'x').min(-30).max(30).step(1).name("x");
    posX.onChange(function (parametroQualquer){
        directionalLight.position.x = parametroQualquer;
    });

    var posY = pastaPosicao.add(param, 'y').min(-30).max(30).step(1).name("y");
    posY.onChange(function (parametroQualquer){
        directionalLight.position.y = parametroQualquer;
    });

    var posZ = pastaPosicao.add(param, 'z').min(-30).max(30).step(1).name("z");
    posZ.onChange(function (parametroQualquer){
        objCardirectionalLightregado.position.z = parametroQualquer;
    });
    
    var chGeometry = gui.add(param, 'animais', ['Vaca', 'Jacare', 'Cavalo', 'Gato', 'Moinho', 'Casas','Criancas', 'Galinha' ]).name("Elementos");
    chGeometry.onChange(function(parametroQualquer){
        
        if (parametroQualquer == 'Vaca'){
            camera.lookAt(objCarregadoVaca.position);
        } else if (parametroQualquer == 'Jacare'){
        camera.lookAt(objCarregadoJacare.position);
        } else if (parametroQualquer == 'Cavalo'){
        camera.lookAt(objCarregadoCavalo.position);
        } else if (parametroQualquer == 'Gato'){
        camera.lookAt(objCarregadoGato.position);
        }else if (parametroQualquer == 'Moinho'){
        camera.lookAt(objCarregadoMoinho.position);
        }else if (parametroQualquer == 'Casas'){
        camera.lookAt(objCarregadoCasas.position);
        }else if (parametroQualquer == 'Criancas'){
        camera.lookAt(objCarregadoCriancas.position);
        }else if (parametroQualquer == 'Galinha'){
        camera.lookAt(objCarregadoGalinha.position)
            
            camera.position.z = objCarregado[1].position.z + 10;
            camera.position.x = objCarregado[1].position.x + 5;
            camera.position.y = objCarregado[1].position.y - 5;

            camera.lookAt(objCarregado[1].position);
        }
        
    });

    animationsFolder = gui.addFolder("Animations");
    
    gui.open();
   
};





var criaGround = function (){

    textureLoader = new THREE.TextureLoader();
    groundTexture = textureLoader.load('assets/textura/terrain/grasslight-big.jpg');

    material = new THREE.MeshStandardMaterial({map : groundTexture});
    groundTexture.wrapS = groundTexture.wrapT = THREE.RepeatWrapping;
    groundTexture.repeat.set( 20, 20 );
    groundTexture.encoding = THREE.sRGBEncoding;
    groundTexture.anisotropy = 16;
    material.normalMap =  textureLoader.load('assets/textura/terrain/grasslight-big-nm.jpg');
    
    
    ground = new  THREE.Mesh(
        new THREE.PlaneBufferGeometry(1050, 1050, 25),
        material
    );
    ground.receiveShadow = true;    
    ground.rotation.x -= Math.PI / 2;
    ground.position.y=-2;

    scene.add(ground);
};

var loadObj = function(){
    objLoader = new THREE.OBJLoader();
    fbxLoader = new THREE.FBXLoader();
    textureLoader = new THREE.TextureLoader();

    for (i=0; i<7; i++){
        objLoader.load(
            'assets/models/tree.obj', //arquivo que vamos carregar
            function(object){
                
                object.traverse( function ( child ) {
                            if ( child instanceof THREE.Mesh ) {
                                child.material.map = textureLoader.load("assets/textura/Wood.jpg");
                                //child.material.shininess = 0;
                            }
                        });

                object.scale.x = 30;
                object.scale.y = 30;
                object.scale.z = 30;

                object.position.z = Math.random()*200*(Math.random() > 0.5 ? -1: 1);
                object.position.x = Math.random()*200*(Math.random() > 0.5 ? -1: 1);
                
                object.position.y = -1;


                //object.rotation.y += 1;

                object.castShadow = true;

            // camera.lookAt(objCarregado.position)

                scene.add(object);    
            },//metodo, tudo deu certo
            function( andamento) {
                console.log((andamento.loaded / andamento.total *100) + "% pronto!");
            },//metodo executa enquanto carrega
            function (error){
                console.log("Deu caca: " + error);
            } //metodo deu merda
        );
    }
    
    // carega galinha
    fbxLoader.load(
        'assets/galinha/Chicken.fbx', //arquivo que vamos carregar
        function(object){
            object.traverse( function ( child ) {
                if ( child instanceof THREE.Mesh ) {
                    console.log(child);
                    child.material.map = textureLoader.load("assets/galinha/UVChicken.png");
                    child.material.shininess = 0;
                }
            });
            object.scale.set(0.010, 0.010, 0.010);
            object.position.set(8,-1,0);      
            object.rotation.y += 0.7;
            object.castShadow = true;

            objCarregadoGalinha = object;
            scene.add(objCarregadoGalinha);    
        },//metodo, tudo deu certo
        function( andamento) {
            console.log((andamento.loaded / andamento.total *100) + "% pronto!");
        },//metodo executa enquanto carrega
        function (error){
            console.log("Deu caca: " + error);
        } //metodo deu merda
    );

   /// carega aligator
    fbxLoader.load(
        'assets/Aligator/Alligator Walking.fbx', //arquivo que vamos carregar
        function(object){
            object.traverse( function ( child ) {
                if ( child instanceof THREE.Mesh ) {
                    console.log(child);
                    child.material.map = textureLoader.load("assets/Aligator/UVAlligator.png");
                    child.material.shininess = 0;
                }
            });

                    
        mixer = new THREE.AnimationMixer(object);
        
        animationAction = mixer.clipAction(object.animations[0]);
        animationActions.push(animationAction);
        animationAction.setLoop(1, THREE.LoopOnce);
        console.log(animationActions);

        activeAction = animationAction;

            object.scale.set(0.025, 0.025, 0.025);// x, y, z
            object.position.set(-15, 0,0); // x, y, z
            object.rotation.y = 2.7;
            object.castShadow = true;
            

            objCarregadoJacare = object;
            scene.add(objCarregadoJacare);
                
        },//metodo, tudo deu certo
        function( andamento) {
            console.log((andamento.loaded / andamento.total *100) + "% pronto!");
        },//metodo executa enquanto carrega
        function (error){
            console.log("Deu caca: " + error);
        } //metodo deu merda
    );
    fbxLoader.load(// Vaca A fbx
        'assets/models/Cow.fbx', //arquivo que vamos carregar
        function(object){
            objCarregadoVaca = object;

            object.traverse( function ( child ) {
                if ( child instanceof THREE.Mesh ) {
                    console.log(child);
                    child.material.map = textureLoader.load("assets/textura/UVCow.png");
                    child.material.shininess = 0;
                }
            });

            objCarregadoVaca.scale.x = 0.1;
            objCarregadoVaca.scale.y = 0.1;
            objCarregadoVaca.scale.z = 0.1;

            objCarregadoVaca.position.z = 10;
            objCarregadoVaca.position.x = 185;
            objCarregadoVaca.position.y = -1;


            objCarregadoVaca.rotation.y += 1;

            objCarregadoVaca.castShadow = true;

            scene.add(objCarregadoVaca);    
        },//metodo, tudo deu certo
        function( andamento) {
            console.log((andamento.loaded / andamento.total *100) + "% pronto!");
        },//metodo executa enquanto carrega
        function (error){
            console.log("Deu caca: " + error);
        } //metodo deu merda
    );

 
    fbxLoader.load(// cavalo fbx
        'assets/models/Horse.fbx', //arquivo que vamos carregar
        function(object){
            objCarregadoCavalo = object;

            object.traverse( function ( child ) {
                if ( child instanceof THREE.Mesh ) {
                    console.log(child);
                    child.material.map = textureLoader.load("assets/textura/UVHorse.png");
                    child.material.shininess = 0;
                }
           });

            objCarregadoCavalo.scale.x = 0.08;
            objCarregadoCavalo.scale.y = 0.08;
            objCarregadoCavalo.scale.z = 0.08;

            objCarregadoCavalo.position.z = 1;
            objCarregadoCavalo.position.x = -88;
            objCarregadoCavalo.position.y = -1;


            objCarregadoCavalo.rotation.y += 1;
            objCarregadoCavalo.castShadow = true;

            scene.add(objCarregadoCavalo);    
        },//metodo, tudo deu certo
        function( andamento) {''
            console.log((andamento.loaded / andamento.total *100) + "% pronto!");
        },//metodo executa enquanto carrega
        function (error){
            console.log("Deu caca: " + error);
        } //metodo deu merda
    );

 
    fbxLoader.load(// cat fbx
        'assets/models/Cat.fbx', //arquivo que vamos carregar
        function(object){
            objCarregadoGato = object;

            object.traverse( function ( child ) {
                if ( child instanceof THREE.Mesh ) {
                    console.log(child);
                    child.material.map = textureLoader.load("assets/textura/CatTexture.png");
                    child.material.shininess = 0;
                }
            });
            object.scale.set(0.012, 0.012, 0.012);// x, y, z
            object.position.set(-108, 1,0); // x, y, z
            object.rotation.y = 2.7;
            object.castShadow = true;

            objCarregadoGato.rotation.y += 1;
            objCarregadoGato.castShadow = true;

            scene.add(objCarregadoGato);    
        },//metodo, tudo deu certo
        function( andamento) {
            console.log((andamento.loaded / andamento.total *100) + "% pronto!");
        },//metodo executa enquanto carrega
        function (error){
            console.log("Deu caca: " + error);
        } //metodo deu merda
    );

 fbxLoader.load(// Moinho fbx
        'assets/models/Farm_ANIM.fbx', //arquivo que vamos carregar
        function(object){
            
            // animationAction = mixer.clipAction((object).animations[0]);
            // animationActions.push(animationAction)         
            // animationsFolder.add(animations, "gira")
            // activeAction = animationAction;
            // console.log(activeAction)   

            object.traverse( function ( child ) {
                if ( child instanceof THREE.Mesh ) {
                    console.log(child);
                    child.material.map = textureLoader.load("assets/textura/Diffuse_palette_noise.jpg");
                    child.material.shininess = 0;
                }
            });

            object.scale.set(0.17, 0.17, 0.17);
        

            object.position.z = 1;
            object.position.x = 98;
            object.position.y = -1;

            object.rotation.y -= 1;

            object.castShadow = true;

            objCarregadoMoinho = object;
            scene.add(objCarregadoMoinho);    
        },//metodo, tudo deu certo
        function( andamento) {
            console.log((andamento.loaded / andamento.total *100) + "% pronto!");
        },//metodo executa enquanto carrega
        function (error){
            console.log("Deu caca: " + error);
        } //metodo deu merda
    );

 fbxLoader.load(// Crianças fbx
        'assets/models/Animated Human.fbx', //arquivo que vamos carregar

        function(object){
             objCarregadoCriancas = object;
            object.traverse( function ( child ) {
                if ( child instanceof THREE.Mesh ) {
                    console.log(child);
                    child.material.map = textureLoader.load("assets/textura/ClothedLightSkin.png");
                    child.material.shininess = 0;
                }
            });
            objCarregadoCriancas.scale.x = 0.04;
            objCarregadoCriancas.scale.y = 0.04;
            objCarregadoCriancas.scale.z = 0.04;

            objCarregadoCriancas.position.z = 1;
            objCarregadoCriancas.position.x = -138;
            objCarregadoCriancas.position.y = -1;


            objCarregadoCriancas = object;
            scene.add(objCarregadoCriancas);
        },//metodo, tudo deu certo
        function( andamento) {
            console.log((andamento.loaded / andamento.total *100) + "% pronto!");
        },//metodo executa enquanto carrega
        function (error){
            console.log("Deu caca: " + error);
        } //metodo deu merda
    );

 /* fbxLoader.load(// Carrossel fbx
        'assets/models/Carousel.fbx', //arquivo que vamos carregar
        function(object){
            objCarregadoCarrossel = object;

            object.traverse( function ( child ) {
                if ( child instanceof THREE.Mesh ) {
                    console.log(child);
                    child.material.map = textureLoader.load("assets/textura/1 (3).png");
                    child.material.shininess = 0;
                }
            });

            objCarregadoCarrossel.scale.x = 0.1;
            objCarregadoCarrossel.scale.y = 0.1;
            objCarregadoCarrossel.scale.z = 0.1;

            objCarregadoCarrossel.position.z = 8;
            objCarregadoCarrossel.position.x = -180;
            objCarregadoCarrossel.position.y = -1;

            objCarregadoCarrossel.rotation.y += 1;

            objCarregadoCarrossel.castShadow = true;

            scene.add(objCarregadoCarrossel);    
        },//metodo, tudo deu certo
        function( andamento) {
            console.log((andamento.loaded / andamento.total *100) + "% pronto!");
        },//metodo executa enquanto carrega
        function (error){
            console.log("Deu caca: " + error);
        } //metodo deu merda
    ); */

 fbxLoader.load(// Casas fbx
        'assets/models/House1.fbx', //arquivo que vamos carregar
        function(object){
            objCarregadoCasas = object;

            object.traverse( function ( child ) {
                if ( child instanceof THREE.Mesh ) {
                    console.log(child);
                    child.material.map = textureLoader.load("assets/textura/Wood.jpg");
                    child.material.shininess = 0;
                }
            });

            objCarregadoCasas.scale.x = 0.045;
            objCarregadoCasas.scale.y = 0.045;
            objCarregadoCasas.scale.z = 0.045;

            objCarregadoCasas.position.z = -2;
            objCarregadoCasas.position.x = 315;
            objCarregadoCasas.position.y = -1;

            objCarregadoCasas.rotation.y += 1;

            objCarregadoCasas.castShadow = true;

            scene.add(objCarregadoCasas);    
        },//metodo, tudo deu certo
        function( andamento) {
            console.log((andamento.loaded / andamento.total *100) + "% pronto!");
        },//metodo executa enquanto carrega
        function (error){
            console.log("Deu caca: " + error);
        } //metodo deu merda
    );
       
}


const setAction = function(toAction) {
    if (toAction != activeAction) {
        lastAction = activeAction
        activeAction = toAction
        lastAction.stop()
        activeAction.reset()
        activeAction.play()
    }
}


var iluminacaoDirectional = function(){
    //corPixel = corPixel * corLuzDirecional * intensidade * tetha ... (integração das cores do ambeinte).

    directionalLight = new THREE.DirectionalLight(0xffffff, 1, 1000);
    directionalLight.position.y = 250;
    directionalLight.castShadow = true;

    directionalLight.shadow.mapSize.width = 4096;
    directionalLight.shadow.mapSize.height = 4096;
    directionalLight.shadow.camera.left = 1000;
    directionalLight.shadow.camera.bottom = 1000;
    directionalLight.shadow.camera.right = -1000
    directionalLight.shadow.camera.top = -1000;

    directionalLight.target = ground;

    scene.add(directionalLight);
    scene.add(directionalLight.target);

    scene.add(new THREE.DirectionalLightHelper(directionalLight));

}


var iluminacaoSpot = function(){
    //corPixel = corPixel * corLuzDirecional * intensidade * tetha ... (integração das cores do ambeinte).

    spotLight = new THREE.SpotLight(0xffffff, 1);
    spotLight.angle = 0.5;
    spotLight.position.y = 25;
    spotLight.position.z = 60;
    spotLight.castShadow = true;

    spotLight.shadow.distance = 30;
    spotLight.shadow.penumbra = 30;
    spotLight.shadow.angle = 25;
        

    spotLight.target.position.set(5,20,0);

    scene.add(spotLight);

    spotLight.intensity = 0;


    helperSpot = new THREE.SpotLightHelper(spotLight);
    scene.add(helperSpot);

}


var init = function() {

    scene = new THREE.Scene();
    scene.background = new THREE.Color( 0xcce0ff );
    camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 1, 1000 );

    renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    //renderer.shadowMap.type = THREE.PCFShadowMap;
    document.body.appendChild(renderer.domElement);


    
    criaGround();
    
    guiFunction();
    
    loadObj();
   
    iluminacaoDirectional();
    //iluminacaoSpot();
    
    scene.fog = new THREE.Fog( 0xcce0ff, 200, 500 );
   
    ambientLight = new THREE.AmbientLight( 0x888888 );
    ambientLight.intensity = 1;



    //pixel = objeto.pixel[][] * ambiente.color * intensidade

    scene.add(ambientLight);


    camera.position.z = 100;
    camera.position.y = 20;


    render();


    document.addEventListener('keydown', onKeyDown );
    document.addEventListener('keyup', onKeyUp ); 

   // document.addEventListener('mousedown', onMouseDown ); //metodos de controle do mouser
    //document.addEventListener('mouseup', onMouseUp ); 
    //document.addEventListener('mousemove', onMouseMouse ); 
  
};

var ci = 0
var render = function() {
    requestAnimationFrame( render );

    let delta = clock.getDelta(); //pegando o offset do clock

    if(typeof mixer != "undefined"){ //faz a animação avançar de quadro (frame)
        mixer.update(delta); //
    }

    if (caminhandoF){ //andando para frente
        objCarregado[0].position.z += (ataque ? 0.1 : (correr ? 0.8 : 0.3) )*directionObject[0].z;
        camera.position.z += (ataque ? 0.1 : (correr ? 0.8 : 0.3) )*directionObject[0].z;

    }else if (caminhandoA) { //andando para traz
        objCarregado[0].position.z -= 0.2*directionObject[0].x*directionObject[0].z;
        camera.position.z -= 0.2*directionObject[0].x*directionObject[0].z;
    }

   // camControls.update(delta);

 if (loadFinished)
    for(i=0; i< 7; i++) { //arvores
        if (boudingTree[i].intersectsBox(boudingBox[0])){
            
            //detecção mias fina do elemento.
            console.log("Funfa");
            setAction(animationActions[3]);
        }
    }
    
    
    bouding.forEach(a => { //fazer a caixinha acompanha
        a.update();
    });


     if (loadFinished) //translada a o box do meu elemento
        boudingBox[0].setFromObject(objCarregado[0].children[0]);
    
    
    renderer.render( scene, camera );
};

var rotationVelocity = 0.1;
var luz = false;
var caminhandoF = false;
var caminhandoA = false;
var correr = false;

var apertando = false;

var onKeyUp = function(e){
    console.log("parou de apertar "+ e.keyCode);
    if (e.keyCode == 38){
        // setAction(animationActions[2]);    
        // caminhandoF = false;
    }
    if (e.keyCode == 40){
        // setAction(animationActions[2]);
        // caminhandoA = false;
    }
}

var onKeyDown = function(e){
    console.log(e.keyCode);
    // if(e.keyCode == 67){ //tecla C
    //     correr = !correr;
    // }

    if(e.keyCode == 65){ //tecla a
//        ataque = !ataque;
        console.log("ataque: "+ ataque);
        setAction(animationActions[0]);    

    }
    if(e.keyCode == 38){
        
        
    }
    if(e.keyCode == 37){
        objCarregado[0].position.x-=0.5;
        //camera.rotation.y+=0.1;
    }
    if(e.keyCode == 39){
        objCarregado[0].position.x+=0.5;
       // objCarregado[0].rotation.y-=0.1;
       // camera.rotation.y-=0.1;
    }
    if(e.keyCode == 40){
        //animationActions[1].timeScale = -1;
        //animationActions[1].setLoop(THREE.LoopOnce);
//        setAction(animationActions[1]);

//        caminhandoA = true;
    }
    if (e.keyCode == 32){ //espaço -> rotação pelo pivo.
       
        if (objCarregado[0].rotation.y == 0){
            objCarregado[0].rotation.y = Math.PI;
            directionObject[0].z = -1;
        } else {
            objCarregado[0].rotation.y = 0;
            directionObject[0].z = 1;
        }
       

        
    }
    if (e.keyCode == 76){
        luz = !luz;
        if (luz)
            spotLight.intensity = 1;
        else
            spotLight.intensity = 0;
         
    }
    if(e.keyCode == 87){
        spotLight.target = objCarregado[1];
        helperSpot.update();
    }
    if(e.keyCode == 83){
        spotLight.target = objCarregado[1];
        helperSpot.update();
    }

    if(e.keyCode == 27){
       // controls.activeLook = !controls.activeLook;
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

       //camera.rotation.x += toRadians(deltaMovimento.y*0.5)*0.1;
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