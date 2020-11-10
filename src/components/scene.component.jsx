import React, { Suspense } from 'react'
import { Canvas } from 'react-three-fiber'
import { OrbitControls } from 'drei'
import {
  EffectComposer,
  Glitch,
  Bloom,
  Noise,
  Vignette,
} from '@react-three/postprocessing'
import { GlitchMode } from 'postprocessing'

import Floor from './floor.component'
import Model from './model.component'
import Lights from './lights.component'
import Crystal from './crystal.component'
import Background from './background.component'

// THREE.TextureLoader.prototype.crossOrigin = 'anonymous'

// returning default function containing all the components
const Scene = () => {
  return (
    <Canvas shadowMap camera={{ position: [1, 0, 1] }}>
      <fog attach='fog' args={['black', 100, 700]} />
      <ambientLight intensity={0.2} color={'#808080'} />
      <OrbitControls autoRotate autoRotateSpeed={0.8} enabled={false} />
      <Lights />
      <Suspense fallback={null}>
        <Crystal />
        <Background />
        <Floor />
        <Model />
      </Suspense>
      <EffectComposer>
        <Glitch
          delay={[3, 10]} // min and max glitch delay
          duration={[0.4, 0.6]} // min and max glitch duration
          strength={[0.1, 0.2]} // min and max glitch strength
          mode={GlitchMode.SPORADIC} // glitch mode
          active // turn on/off the effect (switches between "mode" prop and GlitchMode.DISABLED)
          ratio={0.5} // Threshold for strong glitches, 0 - no weak glitches, 1 - no strong glitches.
        />
        <Bloom luminanceThreshold={0.1} luminanceSmoothing={0.3} height={300} />
        <Noise opacity={0.18} />
        <Vignette eskil={false} offset={0.1} darkness={1.1} />
      </EffectComposer>
    </Canvas>
  )
}
export default Scene
