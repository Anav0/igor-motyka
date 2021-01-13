import * as THREE from "three"

export class Background {
    init(scene) {
        let multiplier = 10;
        this.geometry = new THREE.BoxGeometry(window.innerWidth * multiplier, window.innerHeight * multiplier, 1, 64, 64)
        this.material = new THREE.MeshPhongMaterial({
            color: 0xc50e40,
            shininess: 100,
            opacity: 1,
            specular: 0x000000,
        })
        this.mesh = new THREE.Mesh(this.geometry, this.material)
        this.mesh.position.z = -300

        scene.add(this.mesh)
    }

    update(scene) { }
}