import React from 'react';
import GLW from "./gl-wrapper";
import MouseEvent from "./event-handlers/mouse-listener";
import Renderer from "./renderer";
import Light from "./light-sources/light-sources";
import Camera from "./camera/camera";
import Material from "./materials/material";
import Body from "./bodies/body";
import Cube from "./topologies/cube";
import Box from "./topologies/box";
import Model from "./model/model";

export default class WebGL extends React.Component {

    componentDidMount(){

        const canvas = document.querySelector('#webgl');
        const gl = canvas.getContext('webgl');

        GLW.init(gl);
        MouseEvent.init();


        // scene config

        const renderer = new Renderer();
        const lightA = new Light(-2, 10, -10, 1.0, 1.0, 1.0, 0.4);
        const camera = new Camera(0, 0.5, 1);


        // materials config

        const material = new Material();
        material.addDiffuse(require('./resources/testimage.png'));


        // bodies init

        const body = new Body(Box(0, 0, 0, 3.0, 1.0, -1.0), [material]);
        const head = new Body(Box(-0.75, 1, 0.15, 1.3, 1.3, -1.3), [material]);

        const earA = new Body(Box(-0.55, 2.2, -1.14, 0.3, 0.3, 0.3), [material]);
        const earB = new Body(Box(-0.55, 2.2, 0.14, 0.3, 0.3, -0.3), [material]);

        const legA = new Body(Box(0.1, 0, -0.1, 0.4, -0.5, -0.3), [material]);
        const legB = new Body(Box(2.4, 0, -0.6, 0.4, -0.5, -0.3), [material]);
        const legC = new Body(Box(0.1, 0, -0.6, 0.4, -0.5, -0.3), [material]);
        const legD = new Body(Box(2.4, 0, -0.0, 0.4, -0.5, -0.3), [material]);

        const tail = new Body(Box(3.0, 0.6, -0.3, 0.5, 0.3, -0.4), [material]);

        // bodies config

        // body.position.setTransform(-0.5, 0.0, -2.0);

        // make model

        const cat = new Model([body, head, earA, earB, legA, legB, legC, legD, tail]);
        cat.updateTransform(0, 0, -3.0);

        // add bodies to rendering list

        renderer.addModel(cat);

        let frameIndex = 0;

        const render = () => {
            GLW.clear(1.0, 1.0, 1.0, 1.0);

            // animate bodies here

            cat.updateRotation(0, 0.4, 0);
            cat.setTransform(0, Math.abs(Math.sin(frameIndex / 20) ** 6), -4);

            // render frame

            renderer.render(lightA, camera);
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