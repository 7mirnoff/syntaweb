import GUM from './gum/gum'
import SRCS from './srcs'

import { initScene } from '../scene/init-scene'

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
