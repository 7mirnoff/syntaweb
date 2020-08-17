import * as THREE from 'three'

const initLights = (g) => {
  g.v.scene.add(g.d.res.scenes['lights'])
  console.log(g);
}

export { initLights }
