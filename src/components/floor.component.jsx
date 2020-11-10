//base of the scene
import { useLoader } from 'react-three-fiber'
import * as THREE from 'three'

const Floor = () => {
  //declaring the texture using texture loader
  const textureRaw = useLoader(
    THREE.TextureLoader,
    './assets/brick-diffuse.jpg'
  )
  textureRaw.wrapS = textureRaw.wrapT = THREE.RepeatWrapping
  textureRaw.repeat.set(3, 3).multiplyScalar(5)

  //declaring normal map for the brick base
  const normalMap = useLoader(THREE.TextureLoader, './assets/brick-normal.jpg')
  normalMap.wrapS = normalMap.wrapT = THREE.RepeatWrapping
  normalMap.repeat.copy(textureRaw.repeat)

  console.log('base')
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

export default Floor
