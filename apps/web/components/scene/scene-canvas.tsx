"use client"

import { Canvas } from "@react-three/fiber"
import { Float, OrbitControls } from "@react-three/drei"

function Orb() {
return ( <Float speed={2} rotationIntensity={2} floatIntensity={3}> <mesh>
<icosahedronGeometry args={[1.5, 1]} /> <meshStandardMaterial
       color="#ffffff"
       emissive="#ffffff"
       emissiveIntensity={2}
       roughness={0}
     /> </mesh> </Float>
)
}

export default function SceneCanvas() {
return (
<Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
<color attach="background" args={["#050505"]} />

```
  <ambientLight intensity={1.5} />
  <directionalLight position={[3, 3, 3]} intensity={4} />

  <Orb />

  <OrbitControls
    enableZoom={false}
    autoRotate
    autoRotateSpeed={1.5}
  />
</Canvas>
```

)
}
