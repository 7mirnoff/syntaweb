import GUM from './gum/gum'
import SRCS from './srcs'
import * as THREE from 'three'

window.onload = function () {
  director.init()
}

const director = {
  init: function () {
    function hideSimplePreloader () {
      document.querySelector('#simple_preloader').style.display = 'none'
    }

    function changeSimpleProgress (p) {
      document.querySelector('#simple_progress_bar').style.width = Math.round(p * 100) + '%'
    }

    this.g = new GUM({
      container: document.querySelector('#webgl_container'),
      renderData: {
        antialias: true,
        // alpha: true
      }
    }, {
      srcs: SRCS.main,
      loadCb: () => {
        hideSimplePreloader()

        initScene(this.g)
      },
      progressCb: changeSimpleProgress
    })
  }
}

const initScene = (gum) => {
  const g = gum
  const clone = gum.d.res.glb['delorean-packed'].scene.clone()
  g.v.scene.add(clone)

  const uniforms = {
    offset: {
      type: 'f',
      value: 0.0
    }
  }

  var geometry = new THREE.CircleGeometry(5, 32)
  var material = new THREE.ShaderMaterial({
    uniforms: uniforms,
    vertexShader: document.getElementById('sunVertexShader').textContent,
    fragmentShader: document.getElementById('sunFragmentShader').textContent
  })
  var circle = new THREE.Mesh(geometry, material)
  // g.v.scene.add( circle );

  g.l.addLoop('sunShaider', () => {
    uniforms.offset.value += 0.05
  })










  // MOVE Plane





  const plane = clone.getObjectByName('plane')

  const plane2 = clone.getObjectByName('plane').clone()

  const wapper = new THREE.Object3D()
  plane.add(wapper)
  const lenght = plane.children[0].geometry.boundingBox.size().z

  let counter = 1
  console.log(g.v.renderer)
  g.l.addLoop('move', () => {
    plane.position.z -= 0.4

    if (plane.position.z <= -lenght * (counter)) {
      console.log(1)
      counter++
      const planeCopy = plane2.clone()
      planeCopy.position.z += lenght * (counter)
      wapper.add(planeCopy)
    }
  })
}
