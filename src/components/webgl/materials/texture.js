import GLW from '../gl-wrapper';

export default class Texture {
    constructor(){
        this.texture = GLW.createTexture();
        GLW.bindTexture(this.texture);
        GLW.defineDummyTexture();
    }

    loadTexture = (url) => {
        const img = new Image();
        img.setAttribute('crossOrigin', '');
        img.onload = () => this.onLoad(img);
        img.src = url;
    }

    onLoad = (img) => {
        GLW.bindTexture(this.texture);
        GLW.defineTexture(img);
        if (this.isPowerOf2(img.width) && this.isPowerOf2(img.height)) {
            GLW.texturePowerOfTwo();
        } else {
            GLW.textureNoPowerOfTwo();
        }
        this.done = true;
    }

    isPowerOf2 = (side) => (side & (side -1)) === 0;

    enable = () => GLW.bindTexture(this.texture);
    hasTexture = () => !!this.done;
}