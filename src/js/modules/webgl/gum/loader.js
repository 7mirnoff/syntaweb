import * as THREE from 'three'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'

const dracoLoader = new DRACOLoader()
dracoLoader.setDecoderPath('/assets/libs/draco/')

const Loader = class {
  constructor (data) {
    // let that = this
    this.res = {
      textures: {},
      fbx: {},
      glb: {},
      scenes: {},
      images: {}
    }
    this.srcs = []
    this.setLoadCallBack(data.loadCb)
    this.setProgressCallBack(data.progressCb)
    this.loadData(data.srcs)
  }

  loadData (srcs) {
    if (!srcs) return
    this.srcs = this.srcs.concat(srcs)
    for (const s of srcs) this.loadOne(s)
  }

  setProgressCallBack (cb) {
    if (!cb) return
    this.progressCallBack = cb
  }

  setLoadCallBack (cb) {
    if (!cb) return
    this.loadCallBack = cb
  }

  checkProgress () {
    let count = 0
    for (const r in this.res) {
      for (const d in this.res[r]) {
        count++
      }
    }

    if (count > 0) this.progressCallBack(count / Object.keys(this.srcs).length)
    if (Object.keys(this.srcs).length === count) {
      for (const n in this.res.textures) {
        const t = this.res.textures[n]
        if (t.pMaterial) {
          if (!t.pMaterial.m) this.res.scenes[t.pMaterial.s].getObjectByName(t.pMaterial.o).material[t.pMaterial.t] = t
          else this.res.scenes[t.pMaterial.s].getOjectByName(t.pMaterial.o).material[t.pMaterial.m][t.pMaterial.t] = t
        }
      }
      this.loadCallBack()
    }
  }

  progressCallBack (p) {
    console.log(parseInt(p * 100) + '%')
  }

  loadCallBack () {
    console.log('Загрузка завершена!')
  }

  loadOne (d) {
    const that = this
    if (d.type === 'scene') {
      new THREE.ObjectLoader().load(d.path, function (scene) {
        that.res.scenes[d.name] = scene
        that.checkProgress()
      })
    } else if (d.type === 'fbx') {
      new FBXLoader().load(d.path, function (model) {
        that.res.fbx[d.name] = model
        that.checkProgress()
      })
    } else if (d.type === 'glb') {
      new GLTFLoader().setDRACOLoader(dracoLoader).load(d.path, function (model) {
        that.res.glb[d.name] = model
        that.checkProgress()
      })
    } else if (d.type === 'texture') {
      new THREE.TextureLoader().load(d.path, function (texture) {
        that.res.textures[d.name] = texture
        if (d.pMaterial) that.res.textures[d.name].pMaterial = d.pMaterial
        that.checkProgress()
      })
    } else if (d.type === 'image') {
      const img = new Image()
      img.onload = function () {
        that.res.images[d.name] = img
        that.checkProgress()
      }
      img.src = d.path
    }
  }
}

export default Loader
