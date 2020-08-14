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

  const direct = new THREE.Vector3(0, 0, 1)
  let speed = 0
  let speedTarget = 0.2

  g.l.addLoop('move', () => {

    speed = g.l.lerp(speed, speedTarget, 0.01)

    direct.normalize()
    direct.multiplyScalar(speed)
    plane.position.sub(direct)

    if (plane.position.z <= -lenght / 2 * (counter)) {
      console.log(1)
      counter++
      const planeCopy = plane2.clone()
      planeCopy.position.z += lenght / 2 * (counter)
      wapper.add(planeCopy)
    }
  })
}

export { initScene }
