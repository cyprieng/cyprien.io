import { createRef, useEffect } from "react";
import * as THREE from "three";
import { SDFGeometryGenerator } from "three/addons/geometries/SDFGeometryGenerator.js";

export default function HomeAnimation() {
  const refContainer = createRef<HTMLDivElement>();

  // Get current mouse position
  let event = { clientX: 500, clientY: 500 };

  // If on mobile device use touch events
  if ("ontouchstart" in window) {
    window.addEventListener("touchmove", (e) => {
      event = e.touches[0];
    });
  } else {
    window.addEventListener("mousemove", (e) => {
      event = e;
    });
  }

  useEffect(() => {
    if (!refContainer.current) return;

    // Settings for the SDF geometry
    const settings = {
      res: 4,
      bounds: 3,
      vertexCount: 0,
    };

    const shader = /* glsl */ `
				float dist(vec3 p) {
					p.xyz = p.xzy;
					p *= 1.2;
					vec3 z = p;
					vec3 dz=vec3(0.0);
					float power = 8.0;
					float r, theta, phi;
					float dr = 1.0;

					float t0 = 1.0;
					for(int i = 0; i < 7; ++i) {
						r = length(z);
						if(r > 2.0) continue;
						theta = atan(z.y / z.x);
						#ifdef phase_shift_on
						phi = asin(z.z / r) ;
						#else
						phi = asin(z.z / r);
						#endif

						dr = pow(r, power - 1.0) * dr * power + 1.0;

						r = pow(r, power);
						theta = theta * power;
						phi = phi * power;

						z = r * vec3(cos(theta)*cos(phi), sin(theta)*cos(phi), sin(phi)) + p;

						t0 = min(t0, r);
					}

					return 0.5 * log(r) * r / dr;
				}
			`;

    const w = refContainer.current.getBoundingClientRect().width;
    const h = refContainer.current.getBoundingClientRect().height;

    const camera = new THREE.OrthographicCamera(
      w / -1 - 50,
      w / 1,
      h / 1,
      h / -1,
      0.01,
      1600
    );
    camera.position.z = 1100;

    const scene = new THREE.Scene();

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(
      refContainer.current.getBoundingClientRect().width,
      refContainer.current.getBoundingClientRect().height
    );
    renderer.setAnimationLoop(animate);
    refContainer.current &&
      refContainer.current.appendChild(renderer.domElement);

    const generator = new SDFGeometryGenerator(renderer);
    const geometry = generator.generate(
      Math.pow(2, settings.res + 2),
      shader,
      settings.bounds
    );
    geometry.computeVertexNormals();

    const meshFromSDF = new THREE.Mesh(geometry, new THREE.MeshDepthMaterial());
    scene.add(meshFromSDF);
    const scale = (Math.min(w, h) / 2) * 1.8;
    meshFromSDF.scale.set(scale, scale, scale);
    meshFromSDF.material.dispose();
    meshFromSDF.material.wireframe = true;

    // Event listener for resizing the window
    function onWindowResize() {
      if (!refContainer.current) return;
      const w = refContainer.current.getBoundingClientRect().width;
      const h = refContainer.current.getBoundingClientRect().height;

      renderer.setSize(w, h);

      camera.left = w / -1 - 50;
      camera.right = w / 1;
      camera.top = h / 1;
      camera.bottom = h / -1;

      camera.updateProjectionMatrix();
    }
    window.addEventListener("resize", onWindowResize);

    // Animation function
    function animate() {
      const mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      const mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
      meshFromSDF.rotation.y = mouseX * 1;
      meshFromSDF.rotation.x = mouseY * 1;

      renderer.render(scene, camera);
    }
    window.addEventListener("mousemove", animate);
  }, []);

  return <div ref={refContainer} className="w-full h-full"></div>;
}
