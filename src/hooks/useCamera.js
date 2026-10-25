import { useState, useEffect, useRef, useCallback } from 'react'

// Hook untuk mengontrol akses kamera, pergantian kamera depan/belakang, dan pengambilan frame foto
export function useCamera() {
  const videoRef = useRef(null)
  const streamRef = useRef(null)

  const [isStreaming, setIsStreaming] = useState(false)
  const [facingMode, setFacingMode] = useState('user') // 'user' (depan) atau 'environment' (belakang)
  const [cameraError, setCameraError] = useState(null)
  const [isMirrored, setIsMirrored] = useState(true)

  // Memulai stream kamera
  const startCamera = useCallback(async (desiredFacingMode = facingMode) => {
    setCameraError(null)

    // Hentikan stream aktif sebelumnya
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop())
      streamRef.current = null
    }

    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      setCameraError('Kamera tidak didukung pada peramban ini.')
      setIsStreaming(false)
      return
    }

    try {
      const constraints = {
        video: {
          facingMode: desiredFacingMode,
          width: { ideal: 1920 },
          height: { ideal: 1080 },
        },
        audio: false,
      }

      const stream = await navigator.mediaDevices.getUserMedia(constraints)
      streamRef.current = stream

      if (videoRef.current) {
        videoRef.current.srcObject = stream
        // Safari iOS mewajibkan attributes ini dan trigger play
        await videoRef.current.play()
      }

      setIsStreaming(true)
      setIsMirrored(desiredFacingMode === 'user')
    } catch (err) {
      console.warn('Gagal mengakses kamera:', err)
      if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
        setCameraError('Izin akses kamera ditolak. Silakan izinkan kamera di browser atau gunakan opsi unggah manual.')
      } else if (err.name === 'NotFoundError' || err.name === 'DevicesNotFoundError') {
        setCameraError('Tidak ditemukan perangkat kamera pada perangkat ini.')
      } else {
        setCameraError('Tidak dapat membuka stream kamera. Silakan coba lagi.')
      }
      setIsStreaming(false)
    }
  }, [facingMode])

  // Menghentikan stream kamera
  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop())
      streamRef.current = null
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null
    }
    setIsStreaming(false)
  }, [])

  // Mengganti kamera depan / belakang
  const toggleFacingMode = useCallback(() => {
    const nextMode = facingMode === 'user' ? 'environment' : 'user'
    setFacingMode(nextMode)
    startCamera(nextMode)
  }, [facingMode, startCamera])

  // Menangkap frame saat ini dari elemen video
  const captureFrame = useCallback(() => {
    const video = videoRef.current
    if (!video || !isStreaming) return null

    const width = video.videoWidth || 1280
    const height = video.videoHeight || 720

    const canvas = document.createElement('canvas')
    canvas.width = width
    canvas.height = height
    const ctx = canvas.getContext('2d')

    if (!ctx) return null

    // Jika kamera depan, lakukan horizontal mirror agar hasil sama persis dengan preview layar
    if (isMirrored) {
      ctx.translate(width, 0)
      ctx.scale(-1, 1)
    }

    ctx.drawImage(video, 0, 0, width, height)
    return canvas.toDataURL('image/jpeg', 0.92)
  }, [isStreaming, isMirrored])

  useEffect(() => {
    startCamera()
    return () => {
      stopCamera()
    }
  }, [])

  return {
    videoRef,
    isStreaming,
    facingMode,
    cameraError,
    isMirrored,
    startCamera,
    stopCamera,
    toggleFacingMode,
    captureFrame,
  }
}
