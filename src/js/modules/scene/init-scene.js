import * as THREE from 'three'

import { initSunShader } from './init-sun-shader'
import { initLights } from './init-lights'
import { postprocessing } from './postprocessing'

const initScene = (g) => {
  const mainScene = g.d.res.glb['delorean-packed'].scene.clone()
  g.v.scene.add(mainScene)

  initSunShader(g)
  initLights(g)
  postprocessing(g)

  const plane = mainScene.getObjectByName('plane').clone()

  const wheel1 = mainScene.getObjectByName('wheel-1')
  const wheel2 = mainScene.getObjectByName('wheel-2')
  const wheel3 = mainScene.getObjectByName('wheel-3')
  const wheel4 = mainScene.getObjectByName('wheel-4')
  const wheels = [wheel1, wheel2, wheel3, wheel4]

  mainScene.remove(mainScene.getObjectByName('plane'))

  const wapper = new THREE.Object3D()
  mainScene.add(wapper)

  wapper.add(plane.clone())
  const lenght = plane.children[0].geometry.boundingBox.size().z

  let counter = 0

  const direct = new THREE.Vector3(0, 0, 1)
  let speed = 0.1
  const speedTarget = 0.3

  const addPartRoad = () => {
    counter++
    const planeCopy = plane.clone()
    planeCopy.position.z += lenght * (counter)
    wapper.add(planeCopy)
  }

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



    wheels.forEach(wheel => {
      wheel.rotation.x -= 0.1 / speed
    })

    if (wapper.position.z <= -lenght * (counter) + 4 * lenght) {
      addPartRoad()
      wapper.remove(wapper.children[0])
    }
  })

  const bg = g.d.res.scenes['bg'].clone()
  g.v.scene.add(bg)
  const bgsphere = bg.getObjectByName('bgsphere')
  bgsphere.material.side = THREE.DoubleSide
  const lightbg = bg.getObjectByName('lightbg')
  const lightTarget = new THREE.Object3D()
  lightTarget.position.set(880, 880, 800)
  lightbg.target = lightTarget

}

export { initScene }
