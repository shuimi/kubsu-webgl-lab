import GLW from '../../gl-wrapper';
import VertexSource from './vertex';
import FragmentSource from './fragment';
import Locations from './locations';


export default class ModelShader {
    constructor(){
        const vertexShader = GLW.createVertexShader();
        GLW.addShaderSource(vertexShader, VertexSource);
        GLW.compileShader(vertexShader);
        this.compileStatus(vertexShader);

        const fragmentShader = GLW.createFragmentShader();
        GLW.addShaderSource(fragmentShader, FragmentSource);
        GLW.compileShader(fragmentShader);
        this.compileStatus(fragmentShader);

        const program = GLW.createShaderProgram();
        GLW.attachShaderToProgram(program, vertexShader);
        GLW.attachShaderToProgram(program, fragmentShader);
        GLW.linkProgram(program);

        this.positionAttribute = GLW.getAttribLocation(program, Locations.POSITION);
        this.textureCoordsAttribute = GLW.getAttribLocation(program, Locations.TEXTURE_COORDS);
        this.normalAttribute = GLW.getAttribLocation(program, Locations.NORMAL);

        this.transformationMatrix = GLW.getUniformLocation(program, Locations.TRANSFORMATION_MATRIX);
        this.viewMatrix =  GLW.getUniformLocation(program, Locations.VIEW_MATRIX);
        this.projectionMatrix =  GLW.getUniformLocation(program, Locations.PROJECTION_MATRIX);

        this.lightPosition = GLW.getUniformLocation(program, Locations.LIGHT_POSITION);
        this.lightColor = GLW.getUniformLocation(program, Locations.LIGHT_COLOR);
        this.lightAmbient = GLW.getUniformLocation(program, Locations.LIGHT_AMBIENT);

        this.diffuseTexture = GLW.getUniformLocation(program, Locations.DIFFUSE_TEXTURE);
        this.hasDiffuseTexture = GLW.getUniformLocation(program, Locations.HAS_DIFFUSE_TEXTURE);
        this.program = program;
    }

    compileStatus = (shader) => {
        if(!GLW.gl.getShaderParameter(shader, GLW.gl.COMPILE_STATUS)) {
            console.error(GLW.gl.getShaderInfoLog(shader));
        }
    }

    use = () => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        GLW.useProgram(this.program);
    }

    enablePosition = () => {
        GLW.enableVertexAttribArray(this.positionAttribute);
        GLW.pointToAttribute(this.positionAttribute, 3);
    }

    enableTextureCoords = () => {
        GLW.enableVertexAttribArray(this.textureCoordsAttribute);
        GLW.pointToAttribute(this.textureCoordsAttribute, 2);
    }

    enableNormals = () => {
        GLW.enableVertexAttribArray(this.normalAttribute);
        GLW.pointToAttribute(this.normalAttribute, 3);
    }

    enableTransformationMatrix = (matrix) => {
        GLW.uploadMatrix4fv(this.transformationMatrix, matrix);
    }

    enableViewProjectionMatrices = (view, projection) => {
        GLW.uploadMatrix4fv(this.viewMatrix, view);
        GLW.uploadMatrix4fv(this.projectionMatrix, projection);
    }

    enableLight = (light) => {
        GLW.uploadVec3f(this.lightPosition, light.getPosition());
        GLW.uploadVec3f(this.lightColor, light.getColor());
        GLW.uploadFloat(this.lightAmbient, light.getAmbient());
    }
}