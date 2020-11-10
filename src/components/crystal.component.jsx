import { useRef } from 'react'
import { useFrame } from 'react-three-fiber'

//crystal and the object around the model
const Crystal = () => {
  //declraing ref
  const mesh = useRef()
  const around = useRef()
  //animating box per frame
  useFrame(() => {
    mesh.current.rotation.x = mesh.current.rotation.y = mesh.current.rotation.z += 0.03
    around.current.rotation.x = around.current.rotation.y = around.current.rotation.z -= 0.005
  })
  console.log('crystal')
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

export default Crystal
