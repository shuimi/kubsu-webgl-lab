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
import Plane from "./topologies/plane";
import Model from "./model/model";

import FrontTexture from './resources/floppa.png';
import BackTexture from './resources/back.png';
import TopTexture from './resources/top.png';
import BottomTexture from './resources/bottom.png';
import LeftTexture from './resources/left.png';
import RightTexture from './resources/right.png';


export default class WebGL extends React.Component {

    componentDidMount() {

        const canvas = document.querySelector('#webgl');
        const gl = canvas.getContext('webgl');

        GLW.init(gl);
        MouseEvent.init();


        // scene config

        const renderer = new Renderer();

        const lightA = new Light(-2, 10, -10, 1.0, 1.0, 1.0, 0.6);

        const camera = new Camera(0, 0.5, 1);


        // materials config

        const defaultMaterial = new Material();

        const headFrontMaterial = new Material();
        headFrontMaterial.addDiffuse(FrontTexture);

        const headBackMaterial = new Material();
        headBackMaterial.addDiffuse(BackTexture);

        const headTopMaterial = new Material();
        headTopMaterial.addDiffuse(TopTexture);

        const headBottomMaterial = new Material();
        headBottomMaterial.addDiffuse(BottomTexture);

        const headLeftMaterial = new Material();
        headLeftMaterial.addDiffuse(LeftTexture);

        const headRightMaterial = new Material();
        headRightMaterial.addDiffuse(RightTexture);

        // bodies init

        const body = new Body(Box(0, 0, 0, 3.0, 1.0, -1.0), [ defaultMaterial ]);

        const headFront = new Body(Plane(-0.75, 1, 0.15, 1.3, 1.3, -1.3, 'Front'), [headRightMaterial]);
        const headBack = new Body(Plane(-0.75, 1, 0.15, 1.3, 1.3, -1.3, 'Back'), [headLeftMaterial]);
        const headTop = new Body(Plane(-0.75, 1, 0.15, 1.3, 1.3, -1.3, 'Top'), [headTopMaterial]);
        const headBottom = new Body(Plane(-0.75, 1, 0.15, 1.3, 1.3, -1.3, 'Bottom'), [headBottomMaterial]);
        const headLeft = new Body(Plane(-0.75, 1, 0.15, 1.3, 1.3, -1.3, 'Left'), [headFrontMaterial]);
        const headRight = new Body(Plane(-0.75, 1, 0.15, 1.3, 1.3, -1.3, 'Right'), [headBackMaterial]);

        const head = new Body(Box(-0.75, 1, 0.15, 1.3, 1.3, -1.3), [ defaultMaterial ]);

        const earA = new Body(Box(-0.55, 2.2, -1.14, 0.3, 0.3, 0.3), [ defaultMaterial ]);
        const earB = new Body(Box(-0.55, 2.2, 0.14, 0.3, 0.3, -0.3), [ defaultMaterial ]);

        const legA = new Body(Box(0.1, 0, -0.1, 0.4, -0.5, -0.3), [ defaultMaterial ]);
        const legB = new Body(Box(2.4, 0, -0.6, 0.4, -0.5, -0.3), [ defaultMaterial ]);
        const legC = new Body(Box(0.1, 0, -0.6, 0.4, -0.5, -0.3), [ defaultMaterial ]);
        const legD = new Body(Box(2.4, 0, -0.0, 0.4, -0.5, -0.3), [ defaultMaterial ]);

        const tail = new Body(Box(3.0, 0.6, -0.3, 0.5, 0.3, -0.4), [ defaultMaterial ]);

        // bodies config

        // body.position.setTransform(-0.5, 0.0, -2.0);

        // make model

        const cat = new Model([ body, headFront, headBack, headTop, headBottom, headLeft, headRight, earA, earB, legA, legB, legC, legD, tail ]);
        cat.updateTransform(0, 0, -3.0);

        // add bodies to rendering list

        renderer.addModel(cat);


        cat.updateRotation(15, 45, 0);

        let frameIndex = 0;
        let lightRotationRadius = 6;

        const render = () => {
            GLW.clear(1.0, 1.0, 1.0, 1.0);

            // animate bodies here

            lightA.setPosition(0,
                lightRotationRadius * Math.sin(frameIndex / 16),
                lightRotationRadius * Math.cos(frameIndex / 16)
            );

            cat.updateRotation(0, 1, 0);

            // render frame

            renderer.render(lightA, camera);
            frameIndex += 1;
            window.requestAnimationFrame(render);
        }

        window.requestAnimationFrame(render);
    }

    render() {
        return <div tabIndex={'0'}>
            <canvas id="webgl" width='800' height='450'
                    style={ { border: '1px solid black', marginLeft: 'auto', marginRight: 'auto', display: 'block' } }
            />
        </div>
    }
}