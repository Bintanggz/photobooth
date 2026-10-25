// Utilitas perenderan HTML5 Canvas untuk komposisi strip photobooth Life4Cuts resolusi tinggi

export function loadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.onload = () => resolve(img)
    img.onerror = (err) => reject(err)
    img.src = src
  })
}

// Algoritma Smart Center-Crop: Memotong foto agar pas di slot tanpa distorsi aspek rasio
export function drawImageCenterCrop(ctx, img, destX, destY, destW, destH, borderRadius = 0) {
  const imgW = img.naturalWidth || img.width
  const imgH = img.naturalHeight || img.height

  const sourceAspect = imgW / imgH
  const targetAspect = destW / destH

  let cropW, cropH, cropX, cropY

  if (sourceAspect > targetAspect) {
    cropH = imgH
    cropW = imgH * targetAspect
    cropX = (imgW - cropW) / 2
    cropY = 0
  } else {
    cropW = imgW
    cropH = imgW / targetAspect
    cropX = 0
    cropY = (imgH - cropH) / 2
  }

  ctx.save()

  if (borderRadius > 0) {
    ctx.beginPath()
    if (ctx.roundRect) {
      ctx.roundRect(destX, destY, destW, destH, borderRadius)
    } else {
      ctx.rect(destX, destY, destW, destH)
    }
    ctx.clip()
  }

  ctx.drawImage(img, cropX, cropY, cropW, cropH, destX, destY, destW, destH)
  ctx.restore()
}

// Filter piksel visual pada canvas
export function applyFilterToCanvas(ctx, filterId, width, height) {
  if (filterId === 'normal') return

  const imageData = ctx.getImageData(0, 0, width, height)
  const data = imageData.data

  for (let i = 0; i < data.length; i += 4) {
    const r = data[i]
    const g = data[i + 1]
    const b = data[i + 2]

    if (filterId === 'bw') {
      const gray = 0.299 * r + 0.587 * g + 0.114 * b
      const contrast = (gray - 128) * 1.25 + 128
      const clamped = Math.max(0, Math.min(255, contrast))
      data[i] = clamped
      data[i + 1] = clamped
      data[i + 2] = clamped
    } else if (filterId === 'korean-glow') {
      data[i] = Math.min(255, r * 1.08 + 12)
      data[i + 1] = Math.min(255, g * 1.05 + 10)
      data[i + 2] = Math.min(255, b * 1.01 + 8)
    } else if (filterId === 'retro') {
      const tr = 0.393 * r + 0.769 * g + 0.189 * b
      const tg = 0.349 * r + 0.686 * g + 0.168 * b
      const tb = 0.272 * r + 0.534 * g + 0.131 * b
      data[i] = Math.min(255, tr * 0.9 + r * 0.1)
      data[i + 1] = Math.min(255, tg * 0.85 + g * 0.15)
      data[i + 2] = Math.min(255, tb * 0.8 + b * 0.2)
    } else if (filterId === 'y2k') {
      const highR = (r - 128) * 1.2 + 128
      const highG = (g - 128) * 1.2 + 128
      const highB = (b - 128) * 1.25 + 135
      data[i] = Math.max(0, Math.min(255, highR * 0.95))
      data[i + 1] = Math.max(0, Math.min(255, highG * 1.05))
      data[i + 2] = Math.max(0, Math.min(255, highB * 1.1))
    }
  }

  ctx.putImageData(imageData, 0, 0)
}

// Render komposisi penuh strip foto ke elemen canvas
export async function renderFullStrip(canvas, theme, photoUrls, filterId = 'normal', stickers = [], customColor = null) {
  if (!canvas || !theme) return

  const ctx = canvas.getContext('2d')
  if (!ctx) return

  const canvasWidth = theme.canvas.width || 1200
  const canvasHeight = theme.canvas.height || 3600

  canvas.width = canvasWidth
  canvas.height = canvasHeight

  // Warna latar frame (dukungan custom color swatch)
  const bgColor = customColor?.hex || theme.canvas.backgroundColor || '#FAF6EE'
  const textColor = customColor?.textColor || theme.canvas.textColor || '#26262B'

  // 1. Gambar Background Kanvas
  ctx.fillStyle = bgColor
  ctx.fillRect(0, 0, canvasWidth, canvasHeight)

  // 2. Muat & Gambar Tiap Foto ke Slot
  const loadedImages = await Promise.all(
    photoUrls.map((url) => (url ? loadImage(url).catch(() => null) : Promise.resolve(null)))
  )

  theme.slots.forEach((slot, index) => {
    const img = loadedImages[index]
    if (img) {
      drawImageCenterCrop(ctx, img, slot.x, slot.y, slot.width, slot.height, slot.borderRadius || 12)
    } else {
      ctx.fillStyle = customColor?.slotBg || '#EFEBE4'
      ctx.beginPath()
      if (ctx.roundRect) {
        ctx.roundRect(slot.x, slot.y, slot.width, slot.height, slot.borderRadius || 12)
      } else {
        ctx.rect(slot.x, slot.y, slot.width, slot.height)
      }
      ctx.fill()

      ctx.fillStyle = textColor
      ctx.font = 'bold 36px "Plus Jakarta Sans", sans-serif'
      ctx.textAlign = 'center'
      ctx.fillText(`POSE #${index + 1}`, slot.x + slot.width / 2, slot.y + slot.height / 2)
    }
  })

  // 3. Terapkan Filter Warna
  if (filterId !== 'normal') {
    applyFilterToCanvas(ctx, filterId, canvasWidth, canvasHeight)
  }

  // 4. Header & Footer Branding Teks
  ctx.fillStyle = textColor
  ctx.textAlign = 'center'

  if (theme.branding.topText) {
    ctx.font = 'bold 36px "Space Mono", monospace'
    ctx.fillText(theme.branding.topText, canvasWidth / 2, 85)
  }

  if (theme.branding.bottomText) {
    ctx.font = 'bold 34px "Plus Jakarta Sans", sans-serif'
    ctx.fillText(theme.branding.bottomText, canvasWidth / 2, canvasHeight - 110)

    ctx.font = '22px "Plus Jakarta Sans", sans-serif'
    ctx.fillStyle = textColor
    ctx.globalAlpha = 0.65
    ctx.fillText('MAHASISWA PHOTOBOOTH • ID', canvasWidth / 2, canvasHeight - 65)
    ctx.globalAlpha = 1.0
  }

  // 5. Stempel Tanggal Cantik di Sudut
  if (theme.branding.stampText) {
    ctx.save()
    ctx.translate(canvasWidth - 200, canvasHeight - 160)
    ctx.rotate((-2 * Math.PI) / 180)
    ctx.fillStyle = '#FF4B72'
    ctx.font = 'bold 28px "Space Mono", monospace'
    ctx.fillText(theme.branding.stampText, 0, 0)
    ctx.restore()
  }

  // 6. Gambar Stiker
  stickers.forEach((sticker) => {
    ctx.save()
    ctx.translate(sticker.x, sticker.y)
    ctx.rotate((sticker.rotation * Math.PI) / 180)
    ctx.scale(sticker.scale, sticker.scale)

    if (sticker.hasBg) {
      ctx.fillStyle = sticker.bgColor || '#1E1E24'
      const rad = 14
      const x = -sticker.width / 2
      const y = -sticker.height / 2

      ctx.beginPath()
      if (ctx.roundRect) {
        ctx.roundRect(x, y, sticker.width, sticker.height, rad)
      } else {
        ctx.rect(x, y, sticker.width, sticker.height)
      }
      ctx.fill()

      ctx.strokeStyle = sticker.borderColor || '#FF4B72'
      ctx.lineWidth = 3
      ctx.stroke()
    }

    ctx.fillStyle = sticker.color || '#FFFFFF'
    ctx.font = `bold ${sticker.fontSize || 26}px "Plus Jakarta Sans", sans-serif`
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText(sticker.text, 0, 0)
    ctx.restore()
  })
}

export function canvasToBlob(canvas) {
  return new Promise((resolve) => {
    canvas.toBlob((blob) => resolve(blob), 'image/png', 1.0)
  })
}

export function downloadBlob(blob, filename = 'photobooth-mahasiswa.png') {
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  setTimeout(() => URL.revokeObjectURL(url), 2000)
}
