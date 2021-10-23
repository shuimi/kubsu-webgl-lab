import React from 'react';
import GLW from "./gl-wrapper";
import MouseEvent from "./event-handlers/mouse-listener";
import Renderer from "./renderer";
import Light from "./light-sources/light-sources";
import Camera from "./camera/camera";
import Material from "./materials/material";
import Body from "./bodies/body";
import Cube from "./topologies/cube";
import Model from "./model/model";

export default class WebGL extends React.Component {

    componentDidMount(){

        const canvas = document.querySelector('#webgl');
        const gl = canvas.getContext('webgl');

        GLW.init(gl);
        MouseEvent.init();


        // scene config

        const renderer = new Renderer();
        const light = new Light(-10, 0, -10, 1.0, 1.0, 1.0, 0.5);
        const camera = new Camera();


        // materials config

        const material = new Material();
        material.addDiffuse(require('./resources/testimage.png'));


        // bodies init

        const cubeA = new Body(Cube, [material]);
        const cubeB = new Body(Cube, [material]);
        const cubeС = new Body(Cube, [material]);


        // bodies config

        cubeA.position.setTransform(0.5, 0.5, 0.5);
        cubeB.position.setTransform(0.5, 0.5, 0.5);
        cubeС.position.setTransform(0.1, 0.1,0.1);

        // make model

        const cat = new Model([cubeA, cubeB, cubeС])

        // add bodies to rendering list

        renderer.addModel(cat);


        let frameIndex = 0;

        const render = () => {
            GLW.clear(1.0, 1.0, 1.0, 1.0);

            // animate bodies here

            // cat.updateTransform(-0.005, 0.001, 0.001);

            // render frame

            renderer.render(light, camera);
            frameIndex += 1;
            window.requestAnimationFrame(render);
        }

        window.requestAnimationFrame(render);
    }

    render(){
        return <canvas id="webgl" width='800' height='450' style={
            { border: '1px solid black', marginLeft: 'auto', marginRight: 'auto', display: 'block' }
        }/>
    }
}