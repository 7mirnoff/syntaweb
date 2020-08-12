import * as THREE from 'three'

const initSunShader = (g) => {
  const sunUniforms = {
    offset: {
      type: 'f',
      value: 0.0
    }
  }

  const sunShaderMaterial = new THREE.ShaderMaterial({
    uniforms: sunUniforms,
    vertexShader: document.getElementById('sunVertexShader').textContent,
    fragmentShader: document.getElementById('sunFragmentShader').textContent
  })

  g.l.addLoop('sun-shader', () => {
    sunUniforms.offset.value += 0.05
  })

  const sun = g.v.scene.getObjectByName('sun')
  sun.material = sunShaderMaterial
}

export { initSunShader }
