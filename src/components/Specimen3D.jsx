import React, { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js'

// Slow-spinning cast-aluminum specimen. Drag to rotate. Falls back to a
// procedural torus knot if the generated GLB is unavailable.
export default function Specimen3D() {
  const mountRef = useRef(null)

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100)
    camera.position.set(0, 0.1, 3.4)

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.1
    mount.appendChild(renderer.domElement)

    const pmrem = new THREE.PMREMGenerator(renderer)
    scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture

    const key = new THREE.DirectionalLight(0xffffff, 1.4)
    key.position.set(2, 3, 4)
    scene.add(key)
    scene.add(new THREE.AmbientLight(0xffffff, 0.35))

    const aluminum = new THREE.MeshStandardMaterial({
      color: 0xb8bcc2,
      metalness: 0.92,
      roughness: 0.38,
    })

    const group = new THREE.Group()
    scene.add(group)

    let disposed = false

    const fit = (obj) => {
      const box = new THREE.Box3().setFromObject(obj)
      const size = box.getSize(new THREE.Vector3())
      const center = box.getCenter(new THREE.Vector3())
      const maxDim = Math.max(size.x, size.y, size.z)
      const scale = 1.9 / maxDim
      obj.scale.setScalar(scale)
      obj.position.sub(center.multiplyScalar(scale))
    }

    new GLTFLoader().load(
      import.meta.env.BASE_URL + 'models/specimen.glb',
      (gltf) => {
        if (disposed) return
        gltf.scene.traverse((c) => {
          if (c.isMesh) c.material = aluminum
        })
        fit(gltf.scene)
        group.add(gltf.scene)
      },
      undefined,
      () => {
        if (disposed) return
        const mesh = new THREE.Mesh(
          new THREE.TorusKnotGeometry(0.72, 0.26, 220, 36, 2, 3),
          aluminum,
        )
        group.add(mesh)
      },
    )

    // drag rotation with inertia
    let targetRX = 0.15
    let targetRY = 0
    let velY = 0.0035
    let dragging = false
    let lastX = 0
    let lastY = 0

    const onDown = (e) => {
      dragging = true
      lastX = e.clientX
      lastY = e.clientY
    }
    const onMove = (e) => {
      if (!dragging) return
      const dx = e.clientX - lastX
      const dy = e.clientY - lastY
      lastX = e.clientX
      lastY = e.clientY
      targetRY += dx * 0.008
      targetRX += dy * 0.005
      velY = dx * 0.0004
    }
    const onUp = () => {
      dragging = false
    }
    mount.addEventListener('pointerdown', onDown)
    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerup', onUp)

    const resize = () => {
      const w = mount.clientWidth
      const h = mount.clientHeight
      renderer.setSize(w, h)
      camera.aspect = w / h
      camera.updateProjectionMatrix()
    }
    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(mount)

    let raf
    const tick = () => {
      raf = requestAnimationFrame(tick)
      if (!dragging) {
        velY += (0.0035 - velY) * 0.01
        targetRY += velY
        targetRX += (0.15 - targetRX) * 0.02
      }
      group.rotation.y += (targetRY - group.rotation.y) * 0.12
      group.rotation.x += (targetRX - group.rotation.x) * 0.12
      renderer.render(scene, camera)
    }
    if (reduced) {
      group.rotation.set(0.15, 0.6, 0)
      // render a few frames so async GLB load still appears
      let n = 0
      const still = () => {
        renderer.render(scene, camera)
        if (n++ < 120) raf = requestAnimationFrame(still)
      }
      still()
    } else {
      tick()
    }

    return () => {
      disposed = true
      cancelAnimationFrame(raf)
      ro.disconnect()
      mount.removeEventListener('pointerdown', onDown)
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerup', onUp)
      renderer.dispose()
      pmrem.dispose()
      mount.removeChild(renderer.domElement)
    }
  }, [])

  return <div ref={mountRef} className="hero__canvas" aria-hidden="true" />
}
