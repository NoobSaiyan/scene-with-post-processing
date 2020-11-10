import { useLayoutEffect } from 'react'
import { useThree, useLoader } from 'react-three-fiber'
import * as THREE from 'three'

//the skybox background
const Background = () => {
  const { scene } = useThree()
  const [texture] = useLoader(THREE.CubeTextureLoader, [
    [
      './assets/red/bkg3_right1.png', //right
      './assets/red/bkg3_left2.png', //left
      './assets/red/bkg3_top3.png', //top
      './assets/red/bkg3_bottom4.png', //botton
      './assets/red/bkg3_front5.png', //front
      './assets/red/bkg3_back6.png', //back
    ],
  ])
  console.log('background')
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
export default Background
