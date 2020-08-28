import * as THREE from 'three'
import { GlitchPass } from 'three/examples/jsm/postprocessing/GlitchPass.js'
import { BokehPass } from 'three/examples/jsm/postprocessing/BokehPass.js'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js'

const postprocessing = (g) => {
  const params = {
    exposure: 0.1,
    bloomStrength: 0.7,
    bloomThreshold: 0,
    bloomRadius: 0
  }

  const bloomPass = new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 1.5, 0.4, 0.85)
  bloomPass.threshold = params.bloomThreshold
  bloomPass.strength = params.bloomStrength
  bloomPass.radius = params.bloomRadius
  g.v.addEffect(bloomPass)

  const glitch = new GlitchPass()
  g.v.addEffect(glitch)

  const bokehPass = new BokehPass(g.v.scene, g.v.camera, {
    focus: 1.0,
    aperture: 0.00001,
    maxblur: 0.001,

    width: window.innerWidth,
    height: window.innerHeight
  })
  g.v.addEffect(bokehPass)
}

export { postprocessing }
