export default class Model {
    constructor(bodies) {
        this.bodies = bodies ? bodies : [];
    }

    addBodies = (bodies) => {
        this.bodies.forEach(body => this.addBody(body));
    }

    addBody = (body) => {
        this.bodies.push(body);
    }

    updateTransform = (x, y, z) => {
        this.bodies.forEach(body => body.position.updateTransform(x, y, z));
    }

    updateRotation = (rx, ry, rz) => {
        this.bodies.forEach(body => body.position.updateRotation(rx, ry, rz));
    }

    updateScale = (scale) => {
        this.bodies.forEach(body => body.position.updateScale(scale));
    }

}