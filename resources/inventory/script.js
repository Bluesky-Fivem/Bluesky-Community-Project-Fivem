//! CONFIG

const uploadUrl = ""; //? default upload url
const uploadField = ""; //? default upload field

//! CONFIG

import {OrthographicCamera, Scene, WebGLRenderTarget, LinearFilter, NearestFilter, RGBAFormat, UnsignedByteType, CfxTexture, ShaderMaterial, PlaneBufferGeometry, Mesh, WebGLRenderer} from "/module/Three.js";

var isAnimated = false;
var MainRender = null;
var scId = 0;

// citizenfx/screenshot-basic
class GameRender {
    constructor() {
        window.addEventListener('resize', this.resize);

        const cameraRTT = new OrthographicCamera(window.innerWidth / -2, window.innerWidth / 2, window.innerHeight / 2, window.innerHeight / -2, -10000, 10000);
        cameraRTT.position.z = 0;
        //const width = Math.floor(window.innerHeight * 10 / 23);
        cameraRTT.setViewOffset(window.innerWidth, window.innerHeight, 0, 0, window.innerWidth, window.innerHeight);

        const sceneRTT = new Scene();

        const rtTexture = new WebGLRenderTarget(window.innerWidth, window.innerHeight, {minFilter: LinearFilter, magFilter: NearestFilter, format: RGBAFormat, type: UnsignedByteType});
        const gameTexture = new CfxTexture();
        gameTexture.needsUpdate = true;

        const material = new ShaderMaterial({
            uniforms: { "tDiffuse": { value: gameTexture } },
            vertexShader: `
			varying vec2 vUv;

			void main() {
				vUv = vec2(uv.x, 1.0-uv.y);
				gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
			}
`,
            fragmentShader: `
			varying vec2 vUv;
			uniform sampler2D tDiffuse;

			void main() {
				gl_FragColor = texture2D(tDiffuse, vUv);
			}
`
        });

        this.material = material;

        const plane = new PlaneBufferGeometry(window.innerWidth, window.innerHeight);
        const quad = new Mesh(plane, material);
        quad.position.z = -100;
        sceneRTT.add(quad);

        const renderer = new WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.autoClear = false;

        let appendArea = document.createElement("div");
        appendArea.id = "three-game-render";

        document.body.append(appendArea);

        appendArea.appendChild(renderer.domElement);
        appendArea.style.display = 'none';

        this.renderer = renderer;
        this.rtTexture = rtTexture;
        this.sceneRTT = sceneRTT;
        this.cameraRTT = cameraRTT;
        this.gameTexture = gameTexture;
        this.customCamRatio = false;
        this.tempCanvas = false;

        this.animate = this.animate.bind(this);

        requestAnimationFrame(this.animate);
    }

    resize() {
        const cameraRTT = new OrthographicCamera(window.innerWidth / -2, window.innerWidth / 2, window.innerHeight / 2, window.innerHeight / -2, -10000, 10000);
        cameraRTT.position.z = 100;
        let width = window.innerWidth;
        let screenLeft = 0;
        if (this.customCamRatio) {
            width = Math.floor(window.innerHeight * (this.customCamRatio));
            screenLeft = this.screenLeft;
        }
        cameraRTT.setViewOffset(window.innerWidth, window.innerHeight, screenLeft, 0, width, window.innerHeight);
        cameraRTT.zoom = 0.1;
        this.cameraRTT = cameraRTT;

        const sceneRTT = new Scene();
        const plane = new PlaneBufferGeometry(window.innerWidth, window.innerHeight);
        const quad = new Mesh(plane, this.material);
        quad.position.z = -100;
        sceneRTT.add(quad);

        this.sceneRTT = sceneRTT;
        this.rtTexture = new WebGLRenderTarget(window.innerWidth, window.innerHeight, {minFilter: LinearFilter, magFilter: NearestFilter, format: RGBAFormat, type: UnsignedByteType});
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    animate() {
        requestAnimationFrame(this.animate);
        if (isAnimated) {
            this.renderer.clear();
            this.renderer.render(this.sceneRTT, this.cameraRTT, this.rtTexture, true);
            const read = new Uint8Array(window.innerWidth * window.innerHeight * 4);
            this.renderer.readRenderTargetPixels(this.rtTexture, 0, 0, window.innerWidth, window.innerHeight, read);
            this.canvas.style.display = 'inline';
            this.canvas.width = window.innerWidth;
            this.canvas.height = window.innerHeight;

            const d = new Uint8ClampedArray(read.buffer);

            const cxt = this.canvas.getContext('2d');
            const imageData = new ImageData(d, window.innerWidth, window.innerHeight);
            if (this.tempCanvas) {
                const temp_cxt = this.tempCanvas.getContext('2d');
                temp_cxt.putImageData(imageData, 0, 0);
            }
            cxt.putImageData(imageData, 0, 0);
        }
    }

    createTempCanvas() {
        this.tempCanvas = document.createElement("canvas");
        this.tempCanvas.style.display = 'inline';
        this.tempCanvas.width = window.innerWidth;
        this.tempCanvas.height = window.innerHeight;
    }

    renderToTarget(element, ratio, left) {
        if (ratio) {
            this.customCamRatio = ratio;
            this.screenLeft = left;
            let width = Math.floor(window.innerHeight * (this.customCamRatio));
            let screenLeft = this.screenLeft;
            this.cameraRTT.setViewOffset(window.innerWidth, window.innerHeight, screenLeft, 0, width, window.innerHeight);
        }

        this.canvas = element;
        isAnimated = true;
    }

    stop() {
        isAnimated = false;
        if (this.canvas) {
            if (this.canvas.style.display != "none") {
                this.canvas.style.display = "none";
            }
        }
    }

    isRendering() {
        return isAnimated;
    }
}

window.MainRender = null
setTimeout(() => {
    MainRender = new GameRender();
    window.MainRender = MainRender;
}, 1000);