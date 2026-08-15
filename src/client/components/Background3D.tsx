import { useEffect, useRef, useState } from "react";
import {
  Scene,
  FogExp2,
  PerspectiveCamera,
  WebGLRenderer,
  BufferGeometry,
  BufferAttribute,
  Color,
  CanvasTexture,
  PointsMaterial,
  AdditiveBlending,
  Points,
  Group,
  IcosahedronGeometry,
  OctahedronGeometry,
  TorusKnotGeometry,
  MeshBasicMaterial,
  Mesh,
  Clock,
} from "three";

export default function Background3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;
    setIsLoaded(true);

    const scene = new Scene();
    scene.fog = new FogExp2(0x0b0d13, 0.0018);

    const camera = new PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      1,
      1000
    );
    camera.position.z = 400;

    const renderer = new WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    containerRef.current.appendChild(renderer.domElement);

    const particleCount = 1200;
    const geometry = new BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const scales = new Float32Array(particleCount);

    const amberColor = new Color(0xf59e0b);
    const goldColor = new Color(0xfbbf24);
    const slateColor = new Color(0x334155);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 1200;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 1200;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 1200;

      const mixRatio = Math.random();
      let pColor: Color;
      if (mixRatio > 0.8) {
        pColor = amberColor;
      } else if (mixRatio > 0.6) {
        pColor = goldColor;
      } else {
        pColor = slateColor;
      }

      colors[i * 3] = pColor.r;
      colors[i * 3 + 1] = pColor.g;
      colors[i * 3 + 2] = pColor.b;

      scales[i] = Math.random() * 3 + 1;
    }

    geometry.setAttribute(
      "position",
      new BufferAttribute(positions, 3)
    );
    geometry.setAttribute("color", new BufferAttribute(colors, 3));

    const canvas = document.createElement("canvas");
    canvas.width = 16;
    canvas.height = 16;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      const gradient = ctx.createRadialGradient(8, 8, 0, 8, 8, 8);
      gradient.addColorStop(0, "rgba(255, 255, 255, 1)");
      gradient.addColorStop(0.3, "rgba(245, 158, 11, 0.8)");
      gradient.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 16, 16);
    }
    const particleTexture = new CanvasTexture(canvas);

    const material = new PointsMaterial({
      size: 6,
      map: particleTexture,
      transparent: true,
      vertexColors: true,
      blending: AdditiveBlending,
      depthWrite: false,
      opacity: 0.8,
    });

    const particles = new Points(geometry, material);
    scene.add(particles);

    const wireframeGroup = new Group();

    const geo1 = new IcosahedronGeometry(70, 1);
    const mat1 = new MeshBasicMaterial({
      color: 0xf59e0b,
      wireframe: true,
      transparent: true,
      opacity: 0.12,
    });
    const mesh1 = new Mesh(geo1, mat1);
    mesh1.position.set(-250, 120, -100);
    wireframeGroup.add(mesh1);

    const geo2 = new OctahedronGeometry(90, 2);
    const mat2 = new MeshBasicMaterial({
      color: 0xfbbf24,
      wireframe: true,
      transparent: true,
      opacity: 0.08,
    });
    const mesh2 = new Mesh(geo2, mat2);
    mesh2.position.set(300, -150, -150);
    wireframeGroup.add(mesh2);

    const geo3 = new TorusKnotGeometry(40, 8, 64, 8);
    const mat3 = new MeshBasicMaterial({
      color: 0xf59e0b,
      wireframe: true,
      transparent: true,
      opacity: 0.1,
    });
    const mesh3 = new Mesh(geo3, mat3);
    mesh3.position.set(220, 200, -200);
    wireframeGroup.add(mesh3);

    scene.add(wireframeGroup);

    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      mouseX = (event.clientX - window.innerWidth / 2) * 0.1;
      mouseY = (event.clientY - window.innerHeight / 2) * 0.1;
    };

    window.addEventListener("mousemove", handleMouseMove);

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    let animationFrameId: number;
    const clock = new Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      targetX += (mouseX - targetX) * 0.05;
      targetY += (mouseY - targetY) * 0.05;

      camera.position.x = targetX * 0.5;
      camera.position.y = -targetY * 0.5;
      camera.lookAt(scene.position);

      particles.rotation.y = elapsedTime * 0.03;
      particles.rotation.x = elapsedTime * 0.015;

      mesh1.rotation.x = elapsedTime * 0.15;
      mesh1.rotation.y = elapsedTime * 0.2;

      mesh2.rotation.x = -elapsedTime * 0.1;
      mesh2.rotation.z = elapsedTime * 0.15;

      mesh3.rotation.y = elapsedTime * 0.25;
      mesh3.rotation.z = elapsedTime * 0.1;

      renderer.render(scene, camera);
    };

    animate();

    const container = containerRef.current;
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      particleTexture.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`fixed inset-0 pointer-events-none z-0 overflow-hidden transition-opacity duration-1000 ${
        isLoaded ? "opacity-60" : "opacity-0"
      }`}
    />
  );
}
