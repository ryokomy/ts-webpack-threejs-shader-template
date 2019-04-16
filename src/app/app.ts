import {
  Camera,
  Scene,
  WebGLRenderer,
} from 'three';

import {SampleShaderMesh} from './SampleShaderMesh';

export class App {
  private readonly scene: Scene;
  private readonly camera: Camera;
  private sampleShaderMesh: SampleShaderMesh;
  private readonly renderer: WebGLRenderer;

  constructor() {

    // camera
    this.camera =  new Camera();
    this.camera.position.z = 1;

    // SampleShaderMesh
    this.sampleShaderMesh = new SampleShaderMesh();

    // scene
    this.scene = new Scene();
    this.scene.add(this.sampleShaderMesh);

    // renderer
    this.renderer = new WebGLRenderer({
      antialias: true,
      canvas: document.getElementById('main-canvas') as HTMLCanvasElement,
    });
    this.renderer.setPixelRatio(window.devicePixelRatio ? window.devicePixelRatio : 1);

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
    this.sampleShaderMesh.update();
  }

  private adjustCanvasSize() {
    this.renderer.setSize(innerWidth, innerHeight);
  }

}
