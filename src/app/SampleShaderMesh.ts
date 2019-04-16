import {
    Mesh,
    PlaneGeometry,
    ShaderMaterial,
    ShaderMaterialParameters,
    Vector2,
} from 'three';

// tslint:disable-next-line
const fragmentShader = require('../shaders/shader.fs') // tslint-disable-line no-alert
// tslint:disable-next-line
const vertexShader = require('../shaders/shader.vs') // eslint-disable-line no-alert

export class SampleShaderMesh extends Mesh {

    private shaderMaterialParams: ShaderMaterialParameters;
    private startTime: number;

    constructor() {
        super();

        this.startTime = Date.now();

        // material
        this.shaderMaterialParams = {
            fragmentShader,
            uniforms: {
                resolution: { type: 'v2', value: new Vector2() },
                time: { type: 'f', value: 1.0 },
            },
            vertexShader,
        };
        this.material = new ShaderMaterial(this.shaderMaterialParams);

        // geometry
        this.geometry = new PlaneGeometry(2, 2);

        this.shaderMaterialParams.uniforms.resolution.value.x = window.innerWidth;
        this.shaderMaterialParams.uniforms.resolution.value.y = window.innerHeight;
    }

    public update() {
        const elapsedMilliseconds = Date.now() - this.startTime;
        const elapsedSeconds = elapsedMilliseconds / 1000.;
        this.shaderMaterialParams.uniforms.time.value = 60. * elapsedSeconds;
    }
}
