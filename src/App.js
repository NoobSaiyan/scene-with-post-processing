import React, { Suspense, useRef, useLayoutEffect } from 'react'
import { Canvas, useLoader, useThree, useFrame } from 'react-three-fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { OrbitControls, useHelper } from 'drei'
import {
  EffectComposer,
  DepthOfField,
  Bloom,
  Noise,
  Vignette,
} from '@react-three/postprocessing'
import * as THREE from 'three'
import './App.css'
import url from './assets/sitting.glb'
import base from './assets/brick-diffuse.jpg'
import baseNoraml from './assets/brick-normal.jpg'
// import skybox from './assets/red/'

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

function Crystal() {
  //decraing ref
  const mesh = useRef()
  const around = useRef()
  //animating box per frame
  useFrame(() => {
    mesh.current.rotation.x = mesh.current.rotation.y = mesh.current.rotation.z += 0.03
    around.current.rotation.x = around.current.rotation.y = around.current.rotation.z -= 0.005
  })
  //using box helper
  // useHelper(mesh, THREE.BoxHelper, '#272740')
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
function Plane() {
  const textureRaw = useLoader(THREE.TextureLoader, base)
  textureRaw.wrapS = textureRaw.wrapT = THREE.RepeatWrapping
  textureRaw.repeat.set(3, 3).multiplyScalar(5)
  const normalMap = useLoader(THREE.TextureLoader, baseNoraml)
  normalMap.wrapS = normalMap.wrapT = THREE.RepeatWrapping
  normalMap.repeat.copy(textureRaw.repeat)
  return (
    <mesh position={[0, -0.3, 0]} rotation-x={-Math.PI / 2} receiveShadow>
      <planeGeometry args={[10, 10, 20]} />
      <meshStandardMaterial
        receiveShadow
        castShadow
        // color={'darkgray'}
        roughness={0.2}
        metalness={1}
        map={textureRaw}
        normalMap={normalMap}
      />
    </mesh>
  )
}

export default function App() {
  return (
    <Canvas shadowMap camera={{ position: [1, 0, 1] }}>
      <ambientLight intensity={0.2} color={'#808080'} />
      <OrbitControls autoRotate={false} />
      <Lights />
      <Crystal />
      <Suspense fallback={null}>
        <SkyBox />
        <Plane />
        <Model />
      </Suspense>
      <EffectComposer>
        <DepthOfField
          focusDistance={0}
          focalLength={0.005}
          bokehScale={1}
          height={480}
        />
        <Bloom luminanceThreshold={0.1} luminanceSmoothing={0.3} height={100} />
        <Noise opacity={0.08} />
        <Vignette eskil={false} offset={0.1} darkness={1.1} />
      </EffectComposer>
    </Canvas>
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
      />
      <pointLight
        // ref={blueLight}
        intensity={0.6}
        color={'blue'}
        position={[-0.5, 1, 0.5]}
      />
      <pointLight
        // ref={whiteLight}
        intensity={0.5}
        color={'black'}
        position={[-1, 3, -1]}
      />
    </>
  )
}
