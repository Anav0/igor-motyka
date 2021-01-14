import * as THREE from "three"

export class Background {

    constructor(camera) {
        this.camera = camera;
        this.z = -300;
    }

    init(scene) {
        this.geometry = new THREE.BoxGeometry(1, 1, 1, 1, 1)
        this.material = new THREE.MeshPhongMaterial({
            color: 0xc50e40,
            shininess: 100,
            opacity: 1,
            specular: 0x000000,
        })
        this.mesh = new THREE.Mesh(this.geometry, this.material)
        this.mesh.position.z = this.z


        scene.add(this.mesh)

        this.resizePlane()
        window.addEventListener("resize", () => {
            this.resizePlane();
        })
    }

    resizePlane() {
        var distance = this.camera.position.z - this.z;
        var aspect = window.innerWidth / window.innerHeight;
        var vFov = this.camera.fov * Math.PI / 180;
        var planeHeightAtDistance = 2 * Math.tan(vFov / 2) * distance;
        var planeWidthAtDistance = planeHeightAtDistance * aspect;

        this.mesh.scale.set(planeWidthAtDistance, planeHeightAtDistance * 2, 1)//TODO: for now i double height cuz its not calculated correct
    }

    update(scene) {

    }
}