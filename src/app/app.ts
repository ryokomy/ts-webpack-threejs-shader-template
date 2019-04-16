import {
  Camera,
  Mesh,
  PlaneGeometry,
  Scene,
  ShaderMaterial,
  ShaderMaterialParameters,
  Vector2,
  WebGLRenderer,
} from 'three';

export class App {
  private readonly scene: Scene;
  private readonly camera: Camera;
  private shaderMaterialParams: ShaderMaterialParameters;
  private material: ShaderMaterial;
  private mesh: Mesh;
  private readonly renderer: WebGLRenderer;

  private startTime: number;

  constructor() {

    this.startTime = Date.now();

    // camera
    this.camera =  new Camera();
    this.camera.position.z = 1;

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

    // mesh
    this.mesh = new Mesh(new PlaneGeometry(2, 2), this.material);

    // scene
    this.scene = new Scene();
    this.scene.add(this.mesh);

    // renderer
    this.renderer = new WebGLRenderer({
      antialias: true,
      canvas: document.getElementById('main-canvas') as HTMLCanvasElement,
    });
    this.renderer.setPixelRatio(window.devicePixelRatio ? window.devicePixelRatio : 1);

    // uniform
    this.shaderMaterialParams.uniforms.resolution.value.x = window.innerWidth;
    this.shaderMaterialParams.uniforms.resolution.value.y = window.innerHeight;

    this.adjustCanvasSize();
    this.render();
  }

  private render() {
    this.update();

    this.renderer.render(this.scene, this.camera);
    requestAnimationFrame(() => { this.render(); });

    this.adjustCanvasSize();
  }

  private update() {
    const elapsedMilliseconds = Date.now() - this.startTime;
    const elapsedSeconds = elapsedMilliseconds / 1000.;
    this.shaderMaterialParams.uniforms.time.value = 60. * elapsedSeconds;
  }

  private adjustCanvasSize() {
    this.renderer.setSize(innerWidth, innerHeight);
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
