import * as THREE from 'three'

import { initSunShader } from './init-sun-shader'

const initScene = (g) => {
  const mainScene = g.d.res.glb['delorean-packed'].scene.clone()
  g.v.scene.add(mainScene)

  initSunShader(g)

  // MOVE Plane

  const plane = mainScene.getObjectByName('plane').clone()

  mainScene.remove(mainScene.getObjectByName('plane'))


  const wapper = new THREE.Object3D()
  mainScene.add(wapper)


  wapper.add(plane.clone())
  const lenght = plane.children[0].geometry.boundingBox.size().z

  let counter = 1

  const direct = new THREE.Vector3(0, 0, 1)
  let speed = 0
  let speedTarget = 0.8

  const addPartRoad = () => {
    counter++
    const planeCopy = plane.clone()
    planeCopy.position.z += lenght / 2 * (counter)
    wapper.add(planeCopy)
  }

  addPartRoad()
  addPartRoad()
  addPartRoad()
  addPartRoad()
  addPartRoad()
  addPartRoad()

  g.l.addLoop('move', () => {

    speed = g.l.lerp(speed, speedTarget, 0.01)

    direct.normalize()
    direct.multiplyScalar(speed)
    wapper.position.sub(direct)

    if (wapper.position.z <= -lenght / 2 * (counter - 5)) {
      addPartRoad()
      wapper.remove(wapper.children[0])
    }
  })
}

export { initScene }
