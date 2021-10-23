import GLW from '../../gl-wrapper';
import Material from '../../materials/material';


export default class BodyGeometry {

    constructor({ vertices, indices, normals, textureCoords }, material) {
        this.vertices = vertices;
        this.indices = indices;
        this.normals = normals;
        this.textureCoords = textureCoords;

        if (material) {
            this.addMaterial(material);
        }

        this._genTextureCoordBuffer();
        this._genVertexBuffer();
        this._genIndexBuffer();
        this._genNormalBuffer();
        this.material = new Material();
    }

    _genTextureCoordBuffer = () => {
        this.textureCoordBuffer = GLW.createBuffer();
        GLW.bindArrayBuffer(this.textureCoordBuffer);
        GLW.addArrayBufferData(this.textureCoords);
        GLW.unbindArrayBuffer();
    }

    _genNormalBuffer = () => {
        this.normalBuffer = GLW.createBuffer();
        GLW.bindArrayBuffer(this.normalBuffer);
        GLW.addArrayBufferData(this.normals);
        GLW.unbindArrayBuffer();
    }

    _genVertexBuffer = () => {
        this.vertexBuffer = GLW.createBuffer();
        GLW.bindArrayBuffer(this.vertexBuffer);
        GLW.addArrayBufferData(this.vertices);
        GLW.unbindArrayBuffer();
    }

    _genIndexBuffer = () => {
        this.indexBuffer = GLW.createBuffer();
        GLW.bindElementArrayBuffer(this.indexBuffer);
        GLW.addElementArrayBufferData(this.indices);
        GLW.unbindElementArrayBuffer();
    }

    addMaterial = (material) => {
        this.material = material;
    }

    use = (shader) => {
        GLW.bindArrayBuffer(this.vertexBuffer);
        shader.enablePosition();
        GLW.bindArrayBuffer(this.textureCoordBuffer);
        shader.enableTextureCoords();
        GLW.bindArrayBuffer(this.normalBuffer);
        shader.enableNormals();
        GLW.bindElementArrayBuffer(this.indexBuffer);
        this.material.enable(shader);
    }

}