import {
    Mesh,
    PlaneGeometry,
    ShaderMaterial,
    ShaderMaterialParameters,
    Vector2,
} from 'three';

export class SampleShaderMesh extends Mesh {

    private shaderMaterialParams: ShaderMaterialParameters;
    private startTime: number;

    constructor() {
        super();

        this.startTime = Date.now();

        // material
        const shaders: string[] = this.getShaders();
        this.shaderMaterialParams = {
            fragmentShader: shaders[1],
            uniforms: {
                resolution: { type: 'v2', value: new Vector2() },
                time: { type: 'f', value: 1.0 },
            },
            vertexShader: shaders[0],
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

    private getShaders(): string[] {
        const vertexShaderElement = document.getElementById('vertexShader');
        const fragmentShaderElement = document.getElementById('fragmentShader');
        const vertexShaderTextContent = vertexShaderElement ? vertexShaderElement.textContent : '';
        const fragmentShaderTextContent = fragmentShaderElement ? fragmentShaderElement.textContent : '';
        const vertexShader = vertexShaderTextContent ? vertexShaderTextContent : '';
        const fragmentShader = fragmentShaderTextContent ? fragmentShaderTextContent : '';
        return [vertexShader, fragmentShader];
    }
}
