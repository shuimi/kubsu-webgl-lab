import GLW from '../gl-wrapper';
import Shader from '../shaders/body-shader';

export default class Renderer {

    constructor(){
        this.shader = new Shader();
        this.models = {};
    }

    registerNewModel = (model, id) => {
        if(!this.models[id]) {
            this.models[id] = {
                type: model,
                instances: [],
            }
        }
    }

    addPosition = (instance, id) => {
        this.models[id].instances.push(instance);
    }


    preRender = () => {
        GLW.viewport();
        GLW.depthTest(true);
    }

    render = (light, camera) => {
        this.preRender();
        this.shader.use();
        this.shader.enableLight(light);
        camera.enable(this.shader);
        Object.keys(this.models).forEach(model => {
            this.models[model].type.use(this.shader);
            this.models[model].instances.forEach(instance => {
                this.shader.enableTransformationMatrix(instance.getTransformationMatrix());
                GLW.drawTriangles(this.models[model].type.indices.length);
            })
        })
    }

    addBodies = (bodies) => {
        bodies.forEach(body => this.addBody(body));
    }

    addBody = (body) => {
        this.registerNewModel(body.type, body.id);
        this.addPosition(body.position, body.id);
    }

    addModel = (model) => {
        this.addBodies(model.bodies);
    }
}