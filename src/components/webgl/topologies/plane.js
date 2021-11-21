export default (x1, y1, z1, dx, dy, dz, position) => {

    let vertices = [];
    let indices = [];
    let normals = [];
    let textureCoords = [];

    if (position === 'Front'){
        vertices = [
            x1, y1, z1,
            x1 + dx, y1, z1,
            x1 + dx, y1 + dy, z1,
            x1, y1 + dy, z1,
        ]
        normals = [
            0.0, 0.0, 1.0,
            0.0, 0.0, 1.0,
            0.0, 0.0, 1.0,
            0.0, 0.0, 1.0,
        ]
        indices = [
            0, 1, 2, 0, 2, 3,
        ]
        textureCoords = [
            0.0, 0.0,
            1.0, 0.0,
            1.0, 1.0,
            0.0, 1.0,
        ]
    }
    if (position === 'Back'){
        vertices = [
            x1, y1, z1 + dz,
            x1 + dx, y1, z1 + dz,
            x1 + dx, y1 + dy, z1 + dz,
            x1, y1 + dy, z1 + dz,
        ]
        normals = [
            0.0, 0.0, -1.0,
            0.0, 0.0, -1.0,
            0.0, 0.0, -1.0,
            0.0, 0.0, -1.0,
        ]
        indices = [
            0, 1, 2, 0, 2, 3,
        ]
        textureCoords = [
            0.0, 0.0,
            1.0, 0.0,
            1.0, 1.0,
            0.0, 1.0,
        ]
    }
    if (position === 'Top'){
        vertices = [
            x1, y1 + dy, z1,
            x1 + dx, y1 + dy, z1,
            x1 + dx, y1 + dy, z1 + dz,
            x1, y1 + dy, z1 + dz,
        ]
        normals = [
            0.0, 1.0, 0.0,
            0.0, 1.0, 0.0,
            0.0, 1.0, 0.0,
            0.0, 1.0, 0.0,
        ]
        indices = [
            0, 1, 2, 0, 2, 3,
        ]
        textureCoords = [
            0.0, 0.0,
            1.0, 0.0,
            1.0, 1.0,
            0.0, 1.0,
        ]
    }
    if (position === 'Bottom'){
        vertices = [
            x1, y1, z1,
            x1 + dx, y1, z1,
            x1 + dx, y1, z1 + dz,
            x1, y1, z1 + dz,
        ]
        normals = [
            0.0, -1.0, 0.0,
            0.0, -1.0, 0.0,
            0.0, -1.0, 0.0,
            0.0, -1.0, 0.0,
        ]
        indices = [
            0, 1, 2, 0, 2, 3,
        ]
        textureCoords = [
            0.0, 0.0,
            1.0, 0.0,
            1.0, 1.0,
            0.0, 1.0,
        ]
    }
    if (position === 'Right'){
        vertices = [
            x1 + dx, y1, z1,
            x1 + dx, y1 + dy, z1,
            x1 + dx, y1 + dy, z1 + dz,
            x1 + dx, y1, z1 + dz,
        ]
        normals = [
            1.0, 0.0, 0.0,
            1.0, 0.0, 0.0,
            1.0, 0.0, 0.0,
            1.0, 0.0, 0.0,
        ]
        indices = [
            0, 1, 2, 0, 2, 3,
        ]
        textureCoords = [
            0.0, 0.0,
            1.0, 0.0,
            1.0, 1.0,
            0.0, 1.0,
        ]
    }
    if (position === 'Left'){
        vertices = [
            x1, y1, z1,
            x1, y1 + dy, z1,
            x1, y1 + dy, z1 + dz,
            x1, y1, z1 + dz,
        ]
        normals = [
            -1.0, 0.0, 0.0,
            -1.0, 0.0, 0.0,
            -1.0, 0.0, 0.0,
            -1.0, 0.0, 0.0
        ]
        indices = [
            0, 1, 2, 0, 2, 3,
        ]
        textureCoords = [
            0.0, 0.0,
            1.0, 0.0,
            1.0, 1.0,
            0.0, 1.0,
        ]
    }

    return {
        vertices,
        indices,
        normals,
        textureCoords
    };
}