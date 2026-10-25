// Efek audio mekanik menggunakan Web Audio API bawaan browser (bebas dependensi eksternal)

let audioCtx = null

function getAudioContext() {
  if (!audioCtx && typeof window !== 'undefined') {
    const AudioContext = window.AudioContext || window.webkitAudioContext
    if (AudioContext) {
      audioCtx = new AudioContext()
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume()
  }
  return audioCtx
}

// Bunyi 'tick' mekanik pada detik 3, 2, 1
export function playTickSound() {
  try {
    const ctx = getAudioContext()
    if (!ctx) return

    const osc = ctx.createOscillator()
    const gain = ctx.createGain()

    osc.type = 'square'
    osc.frequency.setValueAtTime(880, ctx.currentTime) // Nada A5

    gain.gain.setValueAtTime(0.08, ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.06)

    osc.connect(gain)
    gain.connect(ctx.destination)

    osc.start()
    osc.stop(ctx.currentTime + 0.06)
  } catch {
    // Abaikan jika browser membatasi autoplay audio
  }
}

// Bunyi rana kamera mekanik saat jepretan diambil
export function playShutterSound() {
  try {
    const ctx = getAudioContext()
    if (!ctx) return

    // Kombinasi klik nada rendah dan white noise singkat menyerupai shutter analog
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()

    osc.type = 'triangle'
    osc.frequency.setValueAtTime(140, ctx.currentTime)
    osc.frequency.exponentialRampToValueAtTime(40, ctx.currentTime + 0.1)

    gain.gain.setValueAtTime(0.2, ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12)

    osc.connect(gain)
    gain.connect(ctx.destination)

    osc.start()
    osc.stop(ctx.currentTime + 0.12)
  } catch {
    // Abaikan jika browser membatasi autoplay audio
  }
}
