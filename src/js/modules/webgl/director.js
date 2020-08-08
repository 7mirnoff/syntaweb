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

}
