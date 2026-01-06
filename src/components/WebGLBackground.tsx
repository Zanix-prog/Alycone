import { useEffect, useRef } from 'react';

const WebGLBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });
  const animationRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
    if (!gl) {
      console.warn('WebGL not supported, using fallback');
      return;
    }

    // Vertex shader
    const vertexShaderSource = `
      attribute vec2 a_position;
      varying vec2 v_uv;
      void main() {
        v_uv = a_position * 0.5 + 0.5;
        gl_Position = vec4(a_position, 0.0, 1.0);
      }
    `;

    // Fragment shader - Premium glossy shader with mouse interaction
    const fragmentShaderSource = `
      precision highp float;
      varying vec2 v_uv;
      uniform float u_time;
      uniform vec2 u_resolution;
      uniform vec2 u_mouse;

      // Noise functions
      vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
      vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
      vec4 permute(vec4 x) { return mod289(((x * 34.0) + 1.0) * x); }
      vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

      float snoise(vec3 v) {
        const vec2 C = vec2(1.0/6.0, 1.0/3.0);
        const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
        vec3 i  = floor(v + dot(v, C.yyy));
        vec3 x0 = v - i + dot(i, C.xxx);
        vec3 g = step(x0.yzx, x0.xyz);
        vec3 l = 1.0 - g;
        vec3 i1 = min(g.xyz, l.zxy);
        vec3 i2 = max(g.xyz, l.zxy);
        vec3 x1 = x0 - i1 + C.xxx;
        vec3 x2 = x0 - i2 + C.yyy;
        vec3 x3 = x0 - D.yyy;
        i = mod289(i);
        vec4 p = permute(permute(permute(
                 i.z + vec4(0.0, i1.z, i2.z, 1.0))
               + i.y + vec4(0.0, i1.y, i2.y, 1.0))
               + i.x + vec4(0.0, i1.x, i2.x, 1.0));
        float n_ = 0.142857142857;
        vec3 ns = n_ * D.wyz - D.xzx;
        vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
        vec4 x_ = floor(j * ns.z);
        vec4 y_ = floor(j - 7.0 * x_);
        vec4 x = x_ *ns.x + ns.yyyy;
        vec4 y = y_ *ns.x + ns.yyyy;
        vec4 h = 1.0 - abs(x) - abs(y);
        vec4 b0 = vec4(x.xy, y.xy);
        vec4 b1 = vec4(x.zw, y.zw);
        vec4 s0 = floor(b0)*2.0 + 1.0;
        vec4 s1 = floor(b1)*2.0 + 1.0;
        vec4 sh = -step(h, vec4(0.0));
        vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
        vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
        vec3 p0 = vec3(a0.xy, h.x);
        vec3 p1 = vec3(a0.zw, h.y);
        vec3 p2 = vec3(a1.xy, h.z);
        vec3 p3 = vec3(a1.zw, h.w);
        vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
        p0 *= norm.x;
        p1 *= norm.y;
        p2 *= norm.z;
        p3 *= norm.w;
        vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
        m = m * m;
        return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
      }

      void main() {
        vec2 uv = v_uv;
        vec2 aspect = vec2(u_resolution.x / u_resolution.y, 1.0);
        
        // Deep purple/violet base colors
        vec3 color1 = vec3(0.08, 0.02, 0.15);  // Deep violet
        vec3 color2 = vec3(0.15, 0.03, 0.25);  // Rich purple
        vec3 color3 = vec3(0.25, 0.05, 0.35);  // Bright purple
        vec3 color4 = vec3(0.4, 0.1, 0.5);     // Vibrant magenta-purple
        vec3 color5 = vec3(0.6, 0.2, 0.8);     // Light purple glow
        
        // Time-based animation
        float t = u_time * 0.15;
        
        // Multi-layer noise for depth
        float noise1 = snoise(vec3(uv * 2.0, t * 0.5)) * 0.5 + 0.5;
        float noise2 = snoise(vec3(uv * 4.0 - t * 0.3, t * 0.3)) * 0.5 + 0.5;
        float noise3 = snoise(vec3(uv * 8.0 + t * 0.2, t * 0.2)) * 0.5 + 0.5;
        
        // Combine noises for flow effect
        float flow = noise1 * 0.5 + noise2 * 0.3 + noise3 * 0.2;
        
        // Mouse interaction - create a soft glow around cursor
        float mouseDist = length((uv - u_mouse) * aspect);
        float mouseGlow = smoothstep(0.5, 0.0, mouseDist) * 0.6;
        
        // Create flowing gradient
        vec3 baseColor = mix(color1, color2, flow);
        baseColor = mix(baseColor, color3, noise2 * 0.5);
        
        // Add bright flowing streams
        float stream1 = smoothstep(0.4, 0.6, noise1 + noise2 * 0.5);
        float stream2 = smoothstep(0.5, 0.7, noise2 + noise3 * 0.3);
        
        baseColor = mix(baseColor, color4, stream1 * 0.4);
        baseColor = mix(baseColor, color5, stream2 * 0.2);
        
        // Mouse glow effect - adds brightness near cursor
        baseColor += color5 * mouseGlow * 0.5;
        baseColor += vec3(0.8, 0.3, 1.0) * mouseGlow * 0.3 * (1.0 + sin(u_time * 2.0) * 0.3);
        
        // Glossy highlights
        float highlight = pow(noise3, 3.0) * 0.3;
        baseColor += vec3(0.5, 0.2, 0.7) * highlight;
        
        // Vignette
        float vignette = 1.0 - pow(length(uv - 0.5) * 1.2, 2.0);
        baseColor *= vignette;
        
        // Subtle grain for texture
        float grain = (fract(sin(dot(uv, vec2(12.9898, 78.233) + u_time)) * 43758.5453) - 0.5) * 0.02;
        baseColor += grain;
        
        gl_FragColor = vec4(baseColor, 1.0);
      }
    `;

    // Compile shader
    const compileShader = (source: string, type: number) => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error('Shader compile error:', gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vertexShader = compileShader(vertexShaderSource, gl.VERTEX_SHADER);
    const fragmentShader = compileShader(fragmentShaderSource, gl.FRAGMENT_SHADER);
    
    if (!vertexShader || !fragmentShader) return;

    const program = gl.createProgram();
    if (!program) return;
    
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error('Program link error:', gl.getProgramInfoLog(program));
      return;
    }

    gl.useProgram(program);

    // Create fullscreen quad
    const positions = new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]);
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);

    const positionLocation = gl.getAttribLocation(program, 'a_position');
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    // Uniforms
    const timeLocation = gl.getUniformLocation(program, 'u_time');
    const resolutionLocation = gl.getUniformLocation(program, 'u_resolution');
    const mouseLocation = gl.getUniformLocation(program, 'u_mouse');

    // Resize handler
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = window.innerWidth + 'px';
      canvas.style.height = window.innerHeight + 'px';
      gl.viewport(0, 0, canvas.width, canvas.height);
    };

    resize();
    window.addEventListener('resize', resize);

    // Mouse handler with smoothing
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = {
        x: e.clientX / window.innerWidth,
        y: 1.0 - e.clientY / window.innerHeight,
      };
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Smoothed mouse position
    let smoothMouse = { x: 0.5, y: 0.5 };

    // Animation loop
    const startTime = Date.now();
    const render = () => {
      const time = (Date.now() - startTime) / 1000;

      // Smooth mouse following
      smoothMouse.x += (mouseRef.current.x - smoothMouse.x) * 0.05;
      smoothMouse.y += (mouseRef.current.y - smoothMouse.y) * 0.05;

      gl.uniform1f(timeLocation, time);
      gl.uniform2f(resolutionLocation, canvas.width, canvas.height);
      gl.uniform2f(mouseLocation, smoothMouse.x, smoothMouse.y);

      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      animationRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10"
      style={{ 
        background: 'linear-gradient(135deg, hsl(260, 25%, 4%) 0%, hsl(280, 30%, 6%) 50%, hsl(260, 20%, 3%) 100%)'
      }}
    />
  );
};

export default WebGLBackground;
