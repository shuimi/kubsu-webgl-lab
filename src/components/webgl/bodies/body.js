import { v4 as getUUID } from 'uuid';
import BodyGeometry from "./body-geometry";
import BodyPosition from "./body-position";


export default class Body {

    constructor(type, materials) {
        this.type = new BodyGeometry(type);
        this.position = new BodyPosition(0, 0, 0, 0, 0, 0, 0.5);
        this.id = getUUID();
        materials.forEach(material => this.type.addMaterial(material));
    }

}