export default (x1, y1, z1, dx, dy, dz) => {


    const vertices = [
        // Front
        x1, y1, z1,
        x1 + dx, y1, z1,
        x1 + dx, y1 + dy, z1,
        x1, y1 + dy, z1,

        // Back
        x1, y1, z1 + dz,
        x1 + dx, y1, z1 + dz,
        x1 + dx, y1 + dy, z1 + dz,
        x1, y1 + dy, z1 + dz,

        // Top
        x1, y1 + dy, z1,
        x1 + dx, y1 + dy, z1,
        x1 + dx, y1 + dy, z1 + dz,
        x1, y1 + dy, z1 + dz,

        // Bottom
        x1, y1, z1,
        x1 + dx, y1, z1,
        x1 + dx, y1, z1 + dz,
        x1, y1, z1 + dz,

        // Right
        x1 + dx, y1, z1,
        x1 + dx, y1 + dy, z1,
        x1 + dx, y1 + dy, z1 + dz,
        x1 + dx, y1, z1 + dz,

        // Left
        x1, y1, z1,
        x1, y1 + dy, z1,
        x1, y1 + dy, z1 + dz,
        x1, y1, z1 + dz,
    ];

    const indices = [
        0, 1, 2, 0, 2, 3,    // Front
        4, 5, 6, 4, 6, 7,    // Back
        8, 9, 10, 8, 10, 11,   // Top
        12, 13, 14, 12, 14, 15,   // Bottom
        16, 17, 18, 16, 18, 19,   // Right
        20, 21, 22, 20, 22, 23,   // Left
    ];

    const normals = [
        // Front
        0.0, 0.0, 1.0,
        0.0, 0.0, 1.0,
        0.0, 0.0, 1.0,
        0.0, 0.0, 1.0,

        // Back
        0.0, 0.0, -1.0,
        0.0, 0.0, -1.0,
        0.0, 0.0, -1.0,
        0.0, 0.0, -1.0,

        // Top
        0.0, 1.0, 0.0,
        0.0, 1.0, 0.0,
        0.0, 1.0, 0.0,
        0.0, 1.0, 0.0,

        // Bottom
        0.0, -1.0, 0.0,
        0.0, -1.0, 0.0,
        0.0, -1.0, 0.0,
        0.0, -1.0, 0.0,

        // Right
        1.0, 0.0, 0.0,
        1.0, 0.0, 0.0,
        1.0, 0.0, 0.0,
        1.0, 0.0, 0.0,

        // Left
        -1.0, 0.0, 0.0,
        -1.0, 0.0, 0.0,
        -1.0, 0.0, 0.0,
        -1.0, 0.0, 0.0
    ];

    const textureCoords = [
        // Front
        0.0, 0.0,
        1.0, 0.0,
        1.0, 1.0,
        0.0, 1.0,
        // Back
        0.0, 0.0,
        1.0, 0.0,
        1.0, 1.0,
        0.0, 1.0,
        // Top
        0.0, 0.0,
        1.0, 0.0,
        1.0, 1.0,
        0.0, 1.0,
        // Bottom
        0.0, 0.0,
        1.0, 0.0,
        1.0, 1.0,
        0.0, 1.0,
        // Right
        0.0, 0.0,
        1.0, 0.0,
        1.0, 1.0,
        0.0, 1.0,
        // Left
        0.0, 0.0,
        1.0, 0.0,
        1.0, 1.0,
        0.0, 1.0,
    ];

    return {
        vertices,
        indices,
        normals,
        textureCoords
    };
}