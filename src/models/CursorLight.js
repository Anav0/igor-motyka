import * as THREE from "three"

export class CursorLight {

    constructor(camera) {
        this.camera = camera;
        this.mesh = undefined;
        this.material = undefined;
        this.light = undefined;
        this.mouse = {
            x: 0,
            y: 0
        }
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

        window.addEventListener("mousemove", (e) => {
            this.mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
            this.mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
        })

        scene.add(this.light);
    }

    update(scene) {
        if (!this.light) return

        let vector = new THREE.Vector3(this.mouse.x, this.mouse.y, 0.5)
        vector.unproject(this.camera)
        let dir = vector.sub(this.camera.position).normalize()
        let distance = -this.camera.position.z / dir.z
        let pos = this.camera.position.clone().add(dir.multiplyScalar(distance))
        this.light.position.x = pos.x
        this.light.position.y = pos.y
        this.light.position.z = pos.z
        this.light.position.needsUpdate = true
    }

}

