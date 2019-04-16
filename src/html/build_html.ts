import * as fsExtra from 'fs-extra';

const srcHTML = fsExtra.readFileSync(__dirname + '/index_src.html').toString();
const vertexShader = fsExtra.readFileSync(__dirname + '/../shaders/shader.vert').toString();
const fragmentShader = fsExtra.readFileSync(__dirname + '/../shaders/shader.frag').toString();

let distHTML;

distHTML = srcHTML.replace('REPLACE_VERTEX_SHADER', vertexShader);
distHTML = distHTML.replace('REPLACE_FRAGMENT_SHADER', fragmentShader);

fsExtra.writeFileSync(__dirname + '/../../index.html', distHTML);
