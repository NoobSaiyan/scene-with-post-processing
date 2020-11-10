//light setup
const Lights = () => {
  console.log('lights')
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

export default Lights
