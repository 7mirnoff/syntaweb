import * as THREE from 'three'

import { initSunShader } from './init-sun-shader'

const initScene = (g) => {
  const mainScene = g.d.res.glb['delorean-packed'].scene.clone()
  g.v.scene.add(mainScene)

  initSunShader(g)

  // MOVE Plane

  const plane = mainScene.getObjectByName('plane')

  const plane2 = mainScene.getObjectByName('plane').clone()

  const wapper = new THREE.Object3D()
  plane.add(wapper)
  const lenght = plane.children[0].geometry.boundingBox.size().z

  let counter = 1

  g.l.addLoop('move', () => {
    plane.position.z -= 0.2

    if (plane.position.z <= -lenght * (counter)) {
      console.log(1)
      counter++
      const planeCopy = plane2.clone()
      planeCopy.position.z += lenght * (counter)
      wapper.add(planeCopy)
    }
  })
}

export { initScene }
