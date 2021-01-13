import * as THREE from "three"

export class CursorLight {

    constructor(camera) {
        this.camera = camera;
        this.mesh = undefined;
        this.material = undefined;
        this.light = undefined;
    }

    init(scene) {
        this.light = new THREE.PointLight(0xffffff, 0.75, 0, 2)

        this.geometry = new THREE.SphereBufferGeometry(32, 32, 32)
        this.material = new THREE.MeshBasicMaterial({
            color: 0xfffafa,
        })

        this.mesh = new THREE.Mesh(this.geometry, this.material);
        this.light.add(this.mesh);
        this.light.position.needsUpdate = true

        scene.add(this.light);
    }

    update(scene) {
        if (!this.light) return

        let mouse = {
            x: 0,
            y: 0,
        }
        mouse.x = (window.clientX / window.innerWidth) * 2 - 1
        mouse.y = -(window.clientY / window.innerHeight) * 2 + 1
        let vector = new THREE.Vector3(mouse.x, mouse.y, 0.5)
        vector.unproject(this.camera)
        let dir = vector.sub(this.camera.position).normalize()
        let distance = -this.camera.position.z / dir.z
        let pos = this.camera.position.clone().add(dir.multiplyScalar(distance))
        this.light.position.x = pos.x
        this.light.position.y = pos.y
        this.light.position.z = pos.z
    }



}

