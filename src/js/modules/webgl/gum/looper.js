const Looper = class {
  constructor (data) {
    this.loops = {}
    this.limits = {}
    this.autoUpdate = true
    this.update()
  }

  addLoop (name, func) {
    this.loops[name] = func
  }

  removeLoop (name) {
    delete this.loops[name]
  }

  addLimit (name, func, framesCount) {
    this.limits[name] = {
      func: func,
      currentFrame: 0,
      duration: framesCount
    }
  }

  removeLimit (name) {
    delete this.limits[name]
  }

  update () {
    const that = this

    for (const l in this.loops) {
      this.loops[l]()
    }

    for (const l in this.limits) {
      if (this.limits[l].currentFrame >= this.limits[l].duration) {
        this.removeLimit(l)
        continue
      } else this.limits[l].currentFrame++
      this.limits[l].func(this.limits[l].currentFrame / this.limits[l].duration, this.limits[l].currentFrame)
    }

    if (this.autoUpdate) {
      window.requestAnimationFrame(function () {
        that.update()
      })
    }
  }

  smooth (progress, p1, p2) {
    return Math.pow(1 - progress, 3) * 0 + 3 * progress * Math.pow(1 - progress, 2) * p1 + 3 * progress * progress * (1 - progress) * p2 + Math.pow(progress, 3) * 1
  }

  lerp (start, end, p) {
    return start + p * (end - start)
  }

  frameStep (start, end, frame) {
    return (frame - start) / (end - start)
  }
}

export default Looper
