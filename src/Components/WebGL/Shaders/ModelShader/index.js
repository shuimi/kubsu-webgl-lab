import GLC from '../../GLCommander';
import VertexSource from './vertex';
import FragmentSource from './fragment';
import Locations from './locations';


export default class ModelShader {
    constructor() {
        const vertexShader = GLC.createVertexShader();
        GLC.addShaderSource(vertexShader, VertexSource);
        GLC.compileShader(vertexShader);

        const fragmentShader = GLC.createFragmentShader();
        GLC.addShaderSource(fragmentShader, FragmentSource);
        GLC.compileShader(fragmentShader);

        const program = GLC.createShaderProgram();
        GLC.attachShaderToProgram(program, vertexShader);
        GLC.attachShaderToProgram(program, fragmentShader);
        GLC.linkProgram(program);

        this.positionAttribute = GLC.getAttribLocation(program, Locations.POSITION);
        this.tranformationMatrix = GLC.getUniformLocation(program, 'transformationMatrix');
        this.program = program;
    }

    use = () => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        GLC.useProgram(this.program);
    }

    enablePosition = () => {
        GLC.enableVertexAttribArray(this.positionAttribute);
        GLC.pointToAttribute(this.positionAttribute, 3);
    }

    enableTransformationMatrix = (matrix) => {
        GLC.uploadMatrix4fv(this.tranformationMatrix, matrix);
    }
}