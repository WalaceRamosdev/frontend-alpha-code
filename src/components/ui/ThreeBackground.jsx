import React, { useEffect, useRef } from "react";
import * as THREE from "three";

const ThreeBackground = () => {
    const mountRef = useRef(null);

    useEffect(() => {
        if (!mountRef.current) return;

        // --- Scene Setup ---
        const scene = new THREE.Scene();
        // Add subtle fog for depth
        scene.fog = new THREE.FogExp2(0x000000, 0.02);

        const camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );
        camera.position.z = 5;

        const renderer = new THREE.WebGLRenderer({
            alpha: true,
            antialias: true,
            powerPreference: "high-performance"
        });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        mountRef.current.appendChild(renderer.domElement);

        // --- Logo Setup ---
        const textureLoader = new THREE.TextureLoader();
        const logoGroup = new THREE.Group();
        scene.add(logoGroup);

        // Load the Logo
        textureLoader.load("/assets/logo3d.svg", (texture) => {
            texture.minFilter = THREE.LinearFilter;
            texture.magFilter = THREE.LinearFilter;
            texture.colorSpace = THREE.SRGBColorSpace;

            // Base the aspect ratio on the new SVG dimensions (2651x2376 ~ 1.115)
            // NOTE: The SVG code provided in chat was truncated. Please save the full SVG code to public/assets/logo.svg manually.
            const aspect = 2651 / 2376;
            const geometry = new THREE.PlaneGeometry(3 * aspect, 3);
            const material = new THREE.MeshStandardMaterial({
                map: texture,
                transparent: true,
                opacity: 0.9,
                side: THREE.DoubleSide,
                roughness: 0.4, // Glossy but not mirror-like
                metalness: 0.6  // Metallic feel for tech look
            });

            const plane = new THREE.Mesh(geometry, material);
            logoGroup.add(plane);

            // Add a subtle glow behind the logo
            const glowGeo = new THREE.PlaneGeometry(6 * aspect, 6);
            const glowMat = new THREE.MeshBasicMaterial({
                color: 0x8a1c26, // Brand primary color
                transparent: true,
                opacity: 0.15,
                side: THREE.DoubleSide,
                blending: THREE.AdditiveBlending,
            });
            // Create a circular texture for glow manually to avoid external dep
            const canvas = document.createElement('canvas');
            canvas.width = 32;
            canvas.height = 32;
            const context = canvas.getContext('2d');
            const gradient = context.createRadialGradient(16, 16, 0, 16, 16, 16);
            gradient.addColorStop(0, 'rgba(255,255,255,1)');
            gradient.addColorStop(1, 'rgba(0,0,0,0)');
            context.fillStyle = gradient;
            context.fillRect(0, 0, 32, 32);
            const glowTexture = new THREE.CanvasTexture(canvas);
            glowMat.map = glowTexture;
            glowMat.alphaMap = glowTexture; // Use alpha map

            const glowMesh = new THREE.Mesh(glowGeo, glowMat);
            glowMesh.position.z = -0.5;
            logoGroup.add(glowMesh);

            // Position Logo in the CENTER
            // Shift x to 0 
            logoGroup.position.x = 0;
            logoGroup.position.y = 0;
        });

        // --- Particles Setup (Red Honeycomb/Hexagons) ---
        // Function to create Hexagon Texture
        const createHexagonTexture = () => {
            const canvas = document.createElement('canvas');
            canvas.width = 64;
            canvas.height = 64;
            const ctx = canvas.getContext('2d');

            ctx.beginPath();
            const r = 28;
            const cx = 32;
            const cy = 32;
            for (let i = 0; i < 6; i++) {
                const angle = (Math.PI / 3) * i; // 60 degrees
                const x = cx + r * Math.cos(angle);
                const y = cy + r * Math.sin(angle);
                if (i === 0) ctx.moveTo(x, y);
                else ctx.lineTo(x, y);
            }
            ctx.closePath();
            ctx.fillStyle = '#FFFFFF';
            ctx.fill();
            return new THREE.CanvasTexture(canvas);
        };

        const particlesGeometry = new THREE.BufferGeometry();
        const particlesCount = 400; // Slightly fewer to emphasize shape
        const posArray = new Float32Array(particlesCount * 3);

        for (let i = 0; i < particlesCount * 3; i++) {
            posArray[i] = (Math.random() - 0.5) * 30; // Wide spread
        }

        particlesGeometry.setAttribute(
            "position",
            new THREE.BufferAttribute(posArray, 3)
        );

        const particlesMaterial = new THREE.PointsMaterial({
            size: 0.15, // Larger size to see the hexagon shape
            map: createHexagonTexture(),
            color: 0x8a1c26, // Brand RED
            transparent: true,
            opacity: 0.8,
            blending: THREE.AdditiveBlending,
            depthWrite: false,
        });

        const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
        scene.add(particlesMesh);

        // --- Lighting (Pulsating) ---
        const pulsingLight = new THREE.PointLight(0x8a1c26, 2, 10);
        pulsingLight.position.set(0, 0, 2);
        scene.add(pulsingLight);

        // Add ambient light for base visibility
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        scene.add(ambientLight);

        // --- Interaction ---
        let mouseX = 0;
        let mouseY = 0;

        // Smooth dampening variables
        let targetRotationX = 0;
        let targetRotationY = 0;

        const handleMouseMove = (event) => {
            mouseX = (event.clientX / window.innerWidth) * 2 - 1;
            mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
        };

        window.addEventListener("mousemove", handleMouseMove);

        // --- Animation Loop ---
        const clock = new THREE.Clock();

        const animate = () => {
            const elapsedTime = clock.getElapsedTime();

            // Particles rotation
            particlesMesh.rotation.y = elapsedTime * 0.05;
            particlesMesh.rotation.x = elapsedTime * 0.02;

            // Logo Animation (Floating in Center)
            logoGroup.position.y = Math.sin(elapsedTime * 0.5) * 0.1; // Gentle float

            // Pulsating Light Animation
            if (pulsingLight) {
                // Pulse intensity between 0.8 and 2.5
                pulsingLight.intensity = 1.65 + Math.sin(elapsedTime * 2) * 0.85;
                // Move light slightly for dynamic shadow feel
                pulsingLight.position.x = Math.sin(elapsedTime * 0.5) * 2;
            }

            // Mouse Interaction for parallax
            targetRotationY = mouseX * 0.15; // Slightly reduced range for center focus
            targetRotationX = mouseY * 0.15;

            logoGroup.rotation.y += 0.05 * (targetRotationY - logoGroup.rotation.y);
            logoGroup.rotation.x += 0.05 * (targetRotationX - logoGroup.rotation.x);

            requestAnimationFrame(animate);
            renderer.render(scene, camera);
        };

        animate();

        // --- Resize Handler ---
        const handleResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        };

        window.addEventListener("resize", handleResize);

        // --- Cleanup ---
        return () => {
            window.removeEventListener("resize", handleResize);
            window.removeEventListener("mousemove", handleMouseMove);
            if (mountRef.current && renderer.domElement) {
                mountRef.current.removeChild(renderer.domElement);
            }
            // Dispose resources
            geometry?.dispose();
            material?.dispose();
            renderer.dispose();
        };
    }, []);

    return (
        <div
            ref={mountRef}
            style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                zIndex: 0,
                overflow: "hidden",
                pointerEvents: "none" // Let clicks pass through
            }}
        />
    );
};

export default ThreeBackground;
