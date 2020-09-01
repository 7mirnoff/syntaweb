import * as THREE from 'three'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'
import Stats from 'three/examples/jsm/libs/stats.module'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

const Viewer = class {
  constructor (data) {
    var that = this
    this.container = data.container
    this.scene = new THREE.Scene()
    this.renderData = data.renderData ? data.renderData : {}
    this.renderer = new THREE.WebGLRenderer(this.renderData)

    this.renderer.outputEncoding = THREE.sRGBEncoding
    this.renderer.setPixelRatio(1.5)
    this.container.appendChild(this.renderer.domElement)

    this.setSize()
    this.camera = new THREE.PerspectiveCamera(45, this.width / this.height, 1, 10000)
    this.scene.add(this.camera)
    this.camera.position.y = 2
    this.camera.position.z = -5
    this.stats = new Stats()
    this.container.appendChild(this.stats.dom)
    this.controls = new OrbitControls(this.camera, this.renderer.domElement)

    this.composer = new EffectComposer(this.renderer)
    this.renderPass = new RenderPass(this.scene, this.camera)
    this.composer.addPass(this.renderPass)

    // ПОСТПРОЦЕССИНГ

    window.addEventListener('resize', function () {
      that.onResize()
    })
  }

  addEffect (effect) {
    this.composer.addPass(effect)
  }

  setSize () {
    this.width = this.container.offsetWidth | window.innerWidth
    this.height = this.container.offsetHeight | window.innerHeight
    this.renderer.setSize(this.width, this.height)
  }

  onResize () {
    this.setSize()
    if (this.camera.type === 'PerspectiveCamera') {
      this.camera.aspect = this.width / this.height
    } else if (this.camera.type === 'OrthographicCamera') {
      this.camera.left = this.width / -2
      this.camera.right = this.width / 2
      this.camera.top = this.height / 2
      this.camera.bottom = this.height / -2
    }
    this.camera.updateProjectionMatrix()
  }

  update () {
    this.controls.update()
    // this.renderer.render(this.scene, this.camera)
    this.composer.render()
    this.stats.update()
  }
}

export default Viewer
