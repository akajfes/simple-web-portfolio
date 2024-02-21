import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';

//this is our boiler plate to setup the website we want to make
//a simple class definition that runs our render function: 
export default class Sketch {
    constructor(options){
        this.container = options.domElement
        this.width = this.container.offsetWidth;
        this.height = this.container.offsetHeight;
    
        this.camera = new THREE.PerspectiveCamera( 70, this.width / this.height, 0.01, 10 );
        this.camera.position.z = 1;
        //scene is the JS object that Three.js is using to render something on our screens
        this.scene = new THREE.Scene();
    
        this.renderer = new THREE.WebGLRenderer( { antialias: true } );
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.container.appendChild(this.renderer.domElement);
        this.controls = new OrbitControls(this.camera,this.renderer.domElement);
    
        this.time = 0;
        this.resize();
        this.setupResize();
        this.render = this.render.bind(this); // Bind render to the current instance
        this.addObjects();
        this.render(); // Start the rendering loop
    }

    //how we can resize the screen to match viewport
    resize(){
        this.width = this.container.offsetWidth;
        this.height = this.container.offsetHeight;
        this.renderer.setSize( this.width, this.height );
        this.camera.aspect = this.width / this.height;
        this.camera.updateProjectionMatrix();
    }

    setupResize(){
        window.addEventListener('resize',this.resize.bind(this));
    }
    

    addObjects(){
        this.geometry = new THREE.BoxGeometry( 0.2, 0.2, 0.2 );
        this.material = new THREE.MeshNormalMaterial();
    
        this.mesh = new THREE.Mesh( this.geometry, this.material );
        this.scene.add( this.mesh );
    }

    render(){
        this.time += 0.05;
        this.mesh.rotation.x = this.time / 2000;
	    this.mesh.rotation.y = this.time / 1000;

	    this.renderer.render( this.scene, this.camera );
        //render function that is binded to what we want to redner
        requestAnimationFrame(this.render.bind(this));
    }
}

//running an instance of the class for testing
new Sketch({
    domElement: document.getElementById('container')
});


// init



// animation

// function animation( time ) {

	

// }