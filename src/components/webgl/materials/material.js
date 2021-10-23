import Texture from './texture';
import GLW from '../gl-wrapper';

export default class Material {
    constructor(){
        this.diffuse = new Texture();
    }

    addDiffuse = (url) => {
        this.diffuse.loadTexture(url);
        return this;
    }

    _enableDiffuse = (shader) => {
        GLW.activeTexture(0);
        this.diffuse.enable();
        GLW.uploadInt(shader.diffuseTexture, 0);
        GLW.uploadBool(shader.hasDiffuseTexture, this.diffuse.hasTexture());
    }

    enable = (shader) => {
        this._enableDiffuse(shader);
    }
}