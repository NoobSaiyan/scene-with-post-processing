import React, { Suspense, useRef, useLayoutEffect } from 'react'
import { Canvas, useLoader, useThree, useFrame } from 'react-three-fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { OrbitControls, useHelper } from 'drei'
import {
  EffectComposer,
  Glitch,
  Bloom,
  Noise,
  Vignette,
} from '@react-three/postprocessing'
import { GlitchMode } from 'postprocessing'
import * as THREE from 'three'
import './App.css'
import url from './assets/sitting.glb'
import base from './assets/brick-diffuse.jpg'
import baseNoraml from './assets/brick-normal.jpg'
// import skybox from './assets/red/'

//the main model
function Model() {
  const gltf = useLoader(GLTFLoader, url)
  console.log('load')
  return gltf ? (
    <primitive
      object={gltf.scene}
      castShadow
      scale={[0.5, 0.5, 0.5]}
      position={[-0.1, -0.3, -0.2]}
      rotation={[0, Math.PI / 8, 0]}
    />
  ) : null
}

//crystal and the object around the model
function Crystal() {
  //declraing ref
  const mesh = useRef()
  const around = useRef()
  //animating box per frame
  useFrame(() => {
    mesh.current.rotation.x = mesh.current.rotation.y = mesh.current.rotation.z += 0.03
    around.current.rotation.x = around.current.rotation.y = around.current.rotation.z -= 0.005
  })
  //return the mesh
  return (
    <group position={[0, 0.2, 0.1]}>
      <mesh ref={around} scale={[1, 1, 1]}>
        <icosahedronGeometry attach='geometry' args={[1, 1, 1]} />
        <meshStandardMaterial attach='material' wireframe={true} />
      </mesh>
      <mesh ref={mesh} scale={[0.1, 0.1, 0.1]}>
        <icosahedronGeometry attach='geometry' args={[1, 1, 1]} />
        <meshStandardMaterial attach='material' wireframe={true} />
      </mesh>
    </group>
  )
}

//the skybox background
function SkyBox() {
  const { scene } = useThree()
  const [texture] = useLoader(THREE.CubeTextureLoader, [
    [
      './red/bkg3_right1.png', //right
      './red/bkg3_left2.png', //left
      './red/bkg3_top3.png', //top
      './red/bkg3_bottom4.png', //botton
      './red/bkg3_front5.png', //front
      './red/bkg3_back6.png', //back
    ],
  ])
  console.log('sky')
  useLayoutEffect(() => {
    const oldBg = scene.background
    const oldEnv = scene.environment
    scene.background = texture
    scene.environment = texture
    // Clean up on unmount
    return () => {
      scene.background = oldBg
      scene.environment = oldEnv
      texture.dispose()
    }
  }, [scene, texture])
  return null
}

// THREE.TextureLoader.prototype.crossOrigin = 'anonymous'

//base of the scene
function Plane() {
  //declaring the texture using texture loader
  const textureRaw = useLoader(THREE.TextureLoader, base)
  textureRaw.wrapS = textureRaw.wrapT = THREE.RepeatWrapping
  textureRaw.repeat.set(3, 3).multiplyScalar(5)
  //declaring normal map for the brick base
  const normalMap = useLoader(THREE.TextureLoader, baseNoraml)
  normalMap.wrapS = normalMap.wrapT = THREE.RepeatWrapping
  normalMap.repeat.copy(textureRaw.repeat)
  //returning the brick base
  return (
    <mesh position={[0, -0.3, 0]} rotation-x={-Math.PI / 2} receiveShadow>
      <planeGeometry args={[10, 10, 20]} />
      <meshStandardMaterial
        receiveShadow
        castShadow
        roughness={0.2}
        metalness={1}
        map={textureRaw}
        normalMap={normalMap}
      />
    </mesh>
  )
}

// returning default function containing all the components
export default function App() {
  return (
    <Suspense fallback={null}>
      <Canvas shadowMap camera={{ position: [1, 0, 1] }}>
        <ambientLight intensity={0.2} color={'#808080'} />
        <OrbitControls autoRotate enabled={false} />
        <Lights />
        <Crystal />
        <SkyBox />
        <Plane />
        <Model />
        <EffectComposer>
          <Glitch
            delay={[3, 10]} // min and max glitch delay
            duration={[0.4, 0.6]} // min and max glitch duration
            strength={[0.1, 0.2]} // min and max glitch strength
            mode={GlitchMode.SPORADIC} // glitch mode
            active // turn on/off the effect (switches between "mode" prop and GlitchMode.DISABLED)
            ratio={0.5} // Threshold for strong glitches, 0 - no weak glitches, 1 - no strong glitches.
          />
          <Bloom
            luminanceThreshold={0.1}
            luminanceSmoothing={0.3}
            height={100}
          />
          <Noise opacity={0.18} />
          <Vignette eskil={false} offset={0.1} darkness={1.1} />
        </EffectComposer>
      </Canvas>
    </Suspense>
  )
}

//light setup
function Lights() {
  //defing ref
  // const redLight = useRef()
  // const blueLight = useRef()
  // const whiteLight = useRef()
  //using helper
  // useHelper(redLight, THREE.PointLightHelper, 0.5, 'white')
  // useHelper(blueLight, THREE.PointLightHelper, 0.5, 'white')
  // useHelper(whiteLight, THREE.PointLightHelper, 0.5, 'white')
  //returing all lights
  return (
    <>
      <pointLight
        // ref={redLight}
        intensity={0.6}
        color={'red'}
        position={[0.5, 1, 0.5]}
        castShadow
      />
      <pointLight
        // ref={blueLight}
        intensity={0.6}
        color={'blue'}
        position={[-0.5, 1, 0.5]}
        castShadow
      />
      <pointLight
        // ref={whiteLight}
        intensity={0.5}
        color={'black'}
        position={[-1, 3, -1]}
        castShadow
      />
    </>
  )
}
