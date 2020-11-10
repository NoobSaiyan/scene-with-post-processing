import React from 'react'
import { useLoader } from 'react-three-fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
//the main model
const Model = () => {
  const gltf = useLoader(GLTFLoader, './assets/sitting.glb')
  console.log('model')
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

export default Model
