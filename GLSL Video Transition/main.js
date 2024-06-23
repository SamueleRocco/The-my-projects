var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
var Tween = /** @class */ (function () {
    function Tween(object, targetValues, duration, lerpFunction, callback) {
        this.object = object; // The object whose properties we're interpolating
        this.targetValues = targetValues; // The target values we're interpolating towards
        this.duration = duration; // The duration of the interpolation in milliseconds
        this.initialValues = {}; // Store initial values of properties
        this.elapsedTime = 0; // Track elapsed time
        this.active = false; // Whether the tween is active
        this.lerpFunction = lerpFunction || this.defaultLerp; // Use provided lerp function or default to linear interpolation
        this.callback = callback || (function () { }); // Use provided callback or default to empty function
        this.initialize();
    }
    Tween.prototype.initialize = function () {
        // Store the initial values of the properties we're interpolating
        for (var key in this.targetValues) {
            if (this.object.hasOwnProperty(key)) {
                this.initialValues[key] = this.object[key];
            }
        }
        this.start();
    };
    Tween.prototype.start = function () {
        this.active = true;
        this.elapsedTime = 0;
        this.update();
    };
    Tween.prototype.update = function () {
        var _this = this;
        if (!this.active)
            return;
        // Calculate elapsed time
        this.elapsedTime += 16; // Roughly 60 frames per second
        var t = Math.min(this.elapsedTime / this.duration, 1); // Clamp t between 0 and 1
        // Interpolate each property
        for (var key in this.targetValues) {
            if (this.object.hasOwnProperty(key)) {
                this.object[key] = this.lerpFunction(this.initialValues[key], this.targetValues[key], t);
            }
        }
        // If we have reached the target values, stop the tween
        if (t === 1) {
            this.active = false;
            this.callback();
        }
        else {
            // Otherwise, request the next frame
            requestAnimationFrame(function () { return _this.update(); });
        }
    };
    Tween.prototype.defaultLerp = function (start, end, t) {
        return (1 - t) * start + t * end;
    };
    return Tween;
}());
var linear = function (start, end, t) { return (1 - t) * start + t * end; };
var easeInQuad = function (start, end, t) { return start + (end - start) * t * t; };
var easeOutQuad = function (start, end, t) { return start - (end - start) * t * (t - 2); };
var easeInOutQuad = function (start, end, t) {
    return t < 0.5
        ? 2 * (end - start) * t * t + start
        : -1 * (end - start) * (--t * (t - 2) - 1) + start;
};
var easeInCubic = function (start, end, t) { return (end - start) * t * t * t + start; };
var easeOutCubic = function (start, end, t) {
    return (end - start) * ((t = t - 1) * t * t + 1) + start;
};
var easeInOutCubic = function (start, end, t) {
    return t < 0.5
        ? 4 * (end - start) * t * t * t + start
        : (end - start) * ((2 * t - 2) * (2 * t - 2) * (2 * t - 2) + 1) + start;
};
var easeInQuart = function (start, end, t) { return (end - start) * t * t * t * t + start; };
var easeOutQuart = function (start, end, t) {
    return -(end - start) * ((t = t - 1) * t * t * t - 1) + start;
};
var easeInOutQuart = function (start, end, t) {
    return t < 0.5
        ? 8 * (end - start) * t * t * t * t + start
        : -1 * (end - start) * ((t = t - 1) * t * t * t - 1) + start;
};
var easeInQuint = function (start, end, t) {
    return (end - start) * t * t * t * t * t + start;
};
var easeOutQuint = function (start, end, t) {
    return (end - start) * ((t = t - 1) * t * t * t * t + 1) + start;
};
var easeInOutQuint = function (start, end, t) {
    return t < 0.5
        ? 16 * (end - start) * t * t * t * t * t + start
        : (end - start) * (16 * (t -= 0.5) * t * t * t * t + 1) + start;
};
var easeInExpo = function (start, end, t) {
    return (end - start) * Math.pow(2, 10 * (t - 1)) + start;
};
var easeOutExpo = function (start, end, t) {
    return (end - start) * (-Math.pow(2, -10 * t) + 1) + start;
};
var easeInOutExpo = function (start, end, t) {
    return t < 0.5
        ? ((end - start) * Math.pow(2, 10 * (2 * t - 1))) / 2 + start
        : ((end - start) * (2 - Math.pow(2, -10 * (2 * t - 1)))) / 2 + start;
};
var easeInCirc = function (start, end, t) {
    return -(end - start) * (Math.sqrt(1 - t * t) - 1) + start;
};
var easeOutCirc = function (start, end, t) {
    return (end - start) * Math.sqrt(1 - (t = t - 1) * t) + start;
};
var easeInOutCirc = function (start, end, t) {
    return t < 0.5
        ? (-(end - start) / 2) * (Math.sqrt(1 - 4 * t * t) - 1) + start
        : ((end - start) / 2) * (Math.sqrt(1 - (2 * t - 2) * (2 * t - 2)) + 1) +
            start;
};
// Example usage:
/*
let obj = { x: 0, y: 0 };
let customLerpFunction = (start, end, t) => (1 - t) * start + t * end; // A custom lerp function
let tween = new Tween(obj, { x: 100, y: 200 }, 2000, customLerpFunction); // 2 seconds duration
tween.start();
*/
var poster = document.getElementById("poster");
// Get the canvas element by ID
var canvas = document.getElementById("canvas");
var videos = [
    "https://alieninterfaces.com/static/pages/14-monster/assets/videos/header1.mp4",
    "https://alieninterfaces.com/static/pages/14-monster/assets/videos/header2.mp4"
];
var currentIndex = 0; // Index of currently playing video
var videoElements = []; // Array of video elements
var initialValues = {
    exposure: 0.0,
    contrast: 1.0,
    brightness: 0.0,
    distortion: 1.0
};
var targetValues = {
    exposure: 1.0,
    contrast: 3.0,
    brightness: 1.9,
    distortion: 3
};
var values = Object.assign({}, initialValues);
var switchVideo = function () {
    currentIndex = (currentIndex + 1) % videos.length; // Cycle through the list of videos
};
function createVideoElement(src) {
    return new Promise(function (resolve, reject) {
        // Create a video element
        /*
        const video = document.createElement("video");
    
        // Set video attributes
        video.src = src; // source URL of the video
        video.autoplay = true; // make video autoplay when it's loaded
        video.loop = true; // make video loop when it ends
        video.muted = true; // mute the video
        video.playsInline = true; // to allow the video to play inline on iOS devices.
        video.crossorigin="anonymous"
        */
        var video = document.querySelector(".hide-vid[src=\"" + src + "\"]");
        console.log("vid", video);
        video.setAttribute("crossorigin", "anonymous");
        // Event listener for successful loading of video
        video.addEventListener("canplaythrough", function () {
            video.play();
            setTimeout(function () {
                poster.style.opacity = "0";
            }, 200);
            resolve(video);
        });
        // Event listener for errors while loading video
        video.addEventListener("error", function () {
            reject(new Error("Failed to load video from source: " + src));
        });
        // Load the video
        video.load();
    });
}
// Example of using the createVideoElement function to asynchronously load multiple video files
function loadVideos(videoSources) {
    return __awaiter(this, void 0, void 0, function () {
        var videoElements_1, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, Promise.all(videoSources.map(function (src) { return createVideoElement(src); }))];
                case 1:
                    videoElements_1 = _a.sent();
                    // Do something with the loaded video elements, like appending them to the DOM
                    //videoElements.forEach((video) => document.body.appendChild(video));
                    return [2 /*return*/, videoElements_1];
                case 2:
                    error_1 = _a.sent();
                    console.error("Error loading videos:", error_1);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
function initializeWebGLCanvas() {
    // Attempt to get the WebGL rendering context
    var gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
    if (!gl) {
        console.error("Unable to initialize WebGL. Your browser may not support it.");
        return null;
    }
    // Set clear color to black, fully opaque
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    // Clear the color buffer with specified clear color
    gl.clear(gl.COLOR_BUFFER_BIT);
    return gl;
}
function drawVideoOnCanvas(gl, video) {
    // Initialize shaders
    var vertexShaderSource = "\n        attribute vec2 position;\n      varying vec2 vTexCoord;\n      void main() {\n          vTexCoord = vec2(position.x * 0.5 + 0.5, 1.0 - (position.y * 0.5 + 0.5));\n          gl_Position = vec4(position, 0.0, 1.0);\n      }\n      ";
    var fragmentShaderSource = "\n  precision mediump float;\n  varying vec2 vTexCoord;\n  uniform sampler2D uSampler;\n  uniform float uDistortion; // uniform variable for spherical distortion\n  uniform float uExposure;   // uniform variable for exposure\n  uniform float uContrast;   // uniform variable for contrast\n  uniform float uBrightness; // uniform variable for brightness\n  \n  void main() {\n      vec2 center = vec2(0.5, 0.5);\n      vec2 coord = vTexCoord - center; // translate to center\n      float dist = length(coord);\n      \n      // apply spherical warp and zoom distortion\n      //vec2 newCoord = coord / (1.0 + uDistortion * dist * dist) + vec2(0.5); \n      vec2 newCoord = center + normalize(coord) * pow(dist, uDistortion);\n  \n      vec4 color = texture2D(uSampler, newCoord);\n  \n          // adjust exposure, contrast, and brightness\n      color.rgb = (color.rgb - 0.5) * uContrast + 0.5; // contrast\n      color.rgb += uBrightness; // brightness\n      color.rgb = color.rgb * pow(2.0, uExposure); // exposure\n      \n      gl_FragColor = color;\n      \n  }\n  \n      ";
    var vertexShader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertexShader, vertexShaderSource);
    gl.compileShader(vertexShader);
    var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fragmentShader, fragmentShaderSource);
    gl.compileShader(fragmentShader);
    var shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    gl.linkProgram(shaderProgram);
    gl.useProgram(shaderProgram);
    // Initialize buffer
    var vertices = new Float32Array([
        -1.0,
        -1.0,
        1.0,
        -1.0,
        -1.0,
        1.0,
        1.0,
        1.0
    ]);
    var vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
    var positionAttribLocation = gl.getAttribLocation(shaderProgram, "position");
    gl.vertexAttribPointer(positionAttribLocation, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(positionAttribLocation);
    var uDistortionLocation = gl.getUniformLocation(shaderProgram, "uDistortion");
    var uExposureLocation = gl.getUniformLocation(shaderProgram, "uExposure");
    var uContrastLocation = gl.getUniformLocation(shaderProgram, "uContrast");
    var uBrightnessLocation = gl.getUniformLocation(shaderProgram, "uBrightness");
    // Set initial value for distortion
    gl.uniform1f(uDistortionLocation, values.distortion);
    gl.uniform1f(uExposureLocation, values.exposure);
    gl.uniform1f(uContrastLocation, values.contrast);
    gl.uniform1f(uBrightnessLocation, values.brightness);
    // Initialize texture
    var texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    var adjustSize = function () {
        var canvasAspectRatio = gl.canvas.width / gl.canvas.height;
        var videoAspectRatio = video.videoWidth / video.videoHeight;
        var renderWidth, renderHeight;
        if (canvasAspectRatio > videoAspectRatio) {
            renderWidth = gl.canvas.height * videoAspectRatio;
            renderHeight = gl.canvas.height;
        }
        else {
            renderWidth = gl.canvas.width;
            renderHeight = gl.canvas.width / videoAspectRatio;
        }
        var xOffset = (gl.canvas.width - renderWidth) / 2;
        var yOffset = (gl.canvas.height - renderHeight) / 2;
        gl.viewport(xOffset, yOffset, renderWidth, renderHeight);
    };
    // Animation loop
    var animate = function () {
        adjustSize();
        var currentVideo = videoElements[currentIndex];
        if (currentVideo.readyState >= video.HAVE_CURRENT_DATA) {
            gl.bindTexture(gl.TEXTURE_2D, texture);
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, currentVideo);
        }
        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.uniform1f(uDistortionLocation, values.distortion);
        gl.uniform1f(uExposureLocation, values.exposure);
        gl.uniform1f(uContrastLocation, values.contrast);
        gl.uniform1f(uBrightnessLocation, values.brightness);
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
        requestAnimationFrame(animate);
    };
    animate();
}
var gl = initializeWebGLCanvas();
(function () { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, loadVideos(videos)];
            case 1:
                videoElements = _a.sent();
                canvas.width = videoElements[0].videoWidth;
                canvas.height = videoElements[0].videoHeight;
                drawVideoOnCanvas(gl, videoElements[0]);
                setTimeout(function () {
                    transitionOut();
                }, 1000);
                return [2 /*return*/];
        }
    });
}); })();
window.addEventListener("click", function () { return transitionOut(); });
var body = document.querySelector("body");
var sectionA = document.querySelector(".sectionA");
var sectionB = document.querySelector(".sectionB");
sectionB.style.display = "none";
var transitionOut = function () {
    sectionA.style.opacity = 0;
    sectionB.style.opacity = 0;
    new Tween(values, targetValues, 1000, easeInQuad, function () { return transitionIn(); });
};
var transitionIn = function () {
    switchVideo();
    body.classList.toggle("dark");
    var tween = new Tween(values, initialValues, 1000, easeOutQuad, function () {
        if (currentIndex === 1) {
            sectionA.style.display = "none";
            sectionB.style.display = "block";
            sectionB.style.opacity = 0;
            setTimeout(function () {
                sectionB.style.opacity = 1;
            }, 100);
        }
        else if (currentIndex === 0) {
            sectionA.style.display = "block";
            sectionB.style.display = "none";
            sectionA.style.opacity = 0;
            setTimeout(function () {
                sectionA.style.opacity = 1;
            }, 100);
        }
    });
};
var videoButtons = document.querySelectorAll(".video-btn");
videoButtons.forEach(function (videoButton) {
    videoButton.addEventListener("mouseover", function () {
        videoButton.play();
    });
    videoButton.addEventListener("mouseout", function () {
        videoButton.pause();
    });
});
