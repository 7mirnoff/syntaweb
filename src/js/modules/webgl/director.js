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
        alpha: true
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

  const sun = clone.getObjectByName('sun')
  console.log(sun);
  // sun.material = new THREE.ShaderMaterial({
  //   uniforms: {
  //     offset: { value: 0.0 }
  //   },
  //   vertexShader: document.getElementById('sunVertexShader').textContent,
  //   fragmentShader: document.getElementById('sunFragmentShader').textContent
  // })

  sun.material = new THREE.MeshBasicMaterial({
    color: 0xFF0000,    // red (можно также использовать css цвета)
  });

  console.log(sun);
  console.log(sun);
  g.l.addLoop('sunShaider', () => {
  })

}
