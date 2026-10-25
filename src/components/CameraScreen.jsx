import React, { useState, useEffect, useRef, useCallback } from 'react'
import { useCamera } from '../hooks/useCamera'
import { playTickSound, playShutterSound } from '../utils/audioEffects'
import { ShutterIcon, FlipCameraIcon, ArrowLeftIcon, SparklesIcon } from './common/Icons'

const QUICK_FILTERS = [
  { id: 'normal', name: 'Asli', css: '' },
  { id: 'korean-glow', name: 'Korean Glow', css: 'brightness(1.08) contrast(1.03) saturate(1.08)' },
  { id: 'soft', name: 'Soft Peach', css: 'brightness(1.05) sepia(0.12) contrast(1.02)' },
  { id: 'bw', name: 'B&W Film', css: 'grayscale(1) contrast(1.2)' },
  { id: 'retro', name: 'Vintage Warm', css: 'sepia(0.25) contrast(1.1) brightness(1.02)' },
]

export default function CameraScreen({ onBack, onFinishSession }) {
  const {
    videoRef,
    isStreaming,
    cameraError,
    toggleFacingMode,
    captureFrame,
    startCamera,
  } = useCamera()

  // State sesi jepretan otomatis
  const [sessionActive, setSessionActive] = useState(false)
  const [countdown, setCountdown] = useState(null)
  const [currentShotIndex, setCurrentShotIndex] = useState(0)
  const [capturedPhotos, setCapturedPhotos] = useState([])
  const [showFlash, setShowFlash] = useState(false)
  const [selectedPreviewFilter, setSelectedPreviewFilter] = useState('normal')

  const timerRef = useRef(null)
  const fileInputRef = useRef(null)

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [])

  // Mengambil 1 jepretan foto
  const takeSingleShot = useCallback((photoIndex, currentPhotos) => {
    playShutterSound()
    setShowFlash(true)

    const frameUrl = captureFrame()
    const newPhotos = [...currentPhotos, frameUrl]
    setCapturedPhotos(newPhotos)

    setTimeout(() => {
      setShowFlash(false)
    }, 200)

    if (photoIndex >= 3) {
      setTimeout(() => {
        setSessionActive(false)
        setCountdown(null)
        onFinishSession(newPhotos)
      }, 700)
    } else {
      setTimeout(() => {
        const nextIndex = photoIndex + 1
        setCurrentShotIndex(nextIndex)
        startCountdown(nextIndex, newPhotos)
      }, 800)
    }
  }, [captureFrame, onFinishSession])

  // Hitung mundur 3, 2, 1
  const startCountdown = useCallback((photoIndex, currentPhotos) => {
    setCountdown(3)
    playTickSound()

    let currentSec = 3
    const interval = setInterval(() => {
      currentSec -= 1
      if (currentSec > 0) {
        setCountdown(currentSec)
        playTickSound()
      } else {
        clearInterval(interval)
        setCountdown(null)
        takeSingleShot(photoIndex, currentPhotos)
      }
    }, 1000)
  }, [takeSingleShot])

  const startPhotoSession = () => {
    if (sessionActive || !isStreaming) return
    setSessionActive(true)
    setCurrentShotIndex(0)
    setCapturedPhotos([])
    startCountdown(0, [])
  }

  // Dukungan tombol Space / Enter
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.code === 'Space' || e.code === 'Enter') && !sessionActive && isStreaming) {
        e.preventDefault()
        startPhotoSession()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [sessionActive, isStreaming, startPhotoSession])

  // Fallback: Unggah foto dari perangkat
  const handleManualUpload = (e) => {
    const files = Array.from(e.target.files || []).slice(0, 4)
    if (files.length === 0) return

    const readers = files.map((file) => {
      return new Promise((resolve) => {
        const reader = new FileReader()
        reader.onload = (evt) => resolve(evt.target.result)
        reader.readAsDataURL(file)
      })
    })

    Promise.all(readers).then((results) => {
      const fourPhotos = [...results]
      while (fourPhotos.length < 4) {
        fourPhotos.push(results[0])
      }
      onFinishSession(fourPhotos)
    })
  }

  const activeCssFilter = QUICK_FILTERS.find((f) => f.id === selectedPreviewFilter)?.css || ''

  return (
    <div className="w-full flex-1 flex flex-col justify-between overflow-x-hidden p-4 md:p-6 lg:p-8">
      {/* Konten Utama Responsif */}
      <div className="w-full flex-1 flex flex-col lg:flex-row gap-8 items-stretch justify-center max-w-7xl mx-auto">
        
        {/* Kolom Kiri: Layar Cermin Kamera Photobooth */}
        <div className="w-full lg:w-2/3 flex flex-col items-center justify-center bg-studio-card p-4 sm:p-6 rounded-3xl border border-studio-border shadow-studio relative overflow-hidden min-h-[360px] sm:min-h-[440px] md:min-h-[520px]">
          
          {/* Bar Filter Cepat di Atas Viewfinder */}
          <div className="w-full flex items-center justify-between gap-2 mb-3 z-10 px-1">
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
              <span className="text-xs font-bold text-text-secondary uppercase mr-1 hidden sm:inline">
                Filter:
              </span>
              {QUICK_FILTERS.map((f) => (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => setSelectedPreviewFilter(f.id)}
                  className={`text-xs px-3 py-1.5 rounded-full transition-all whitespace-nowrap font-medium ${
                    selectedPreviewFilter === f.id
                      ? 'bg-brand-pink text-white shadow-sm font-bold'
                      : 'bg-studio-bg text-text-secondary hover:text-white hover:bg-studio-border'
                  }`}
                >
                  {f.name}
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={toggleFacingMode}
              disabled={sessionActive}
              className="p-2 rounded-xl bg-studio-bg border border-studio-border text-text-secondary hover:text-white hover:border-brand-pink transition-all flex items-center gap-1.5 text-xs font-medium"
              title="Putar Kamera"
            >
              <FlipCameraIcon className="w-4 h-4 text-brand-pink" />
              <span className="hidden sm:inline">Putar</span>
            </button>
          </div>

          {/* Area Kotak Viewfinder Kamera */}
          <div className="w-full flex-1 flex items-center justify-center relative rounded-2xl overflow-hidden bg-black/60 border border-studio-border">
            
            {/* Elemen Video Live Stream Kamera */}
            <video
              ref={videoRef}
              playsInline
              autoPlay
              muted
              style={{ filter: activeCssFilter }}
              className={`w-full h-full object-cover transition-opacity duration-300 ${
                isStreaming ? 'opacity-100' : 'opacity-0'
              }`}
            />

            {/* Kilatan Flash Putih */}
            {showFlash && (
              <div
                className="absolute inset-0 bg-white z-30 pointer-events-none animate-flash"
                aria-hidden="true"
              />
            )}

            {/* Animasi Hitung Mundur Bulat Besar 3, 2, 1 */}
            {countdown !== null && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 backdrop-blur-sm z-20 pointer-events-none">
                <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-brand-pink text-white flex flex-col items-center justify-center shadow-glow-pink animate-countdown border-4 border-white/60">
                  <span className="text-5xl sm:text-6xl font-black font-sans leading-none">{countdown}</span>
                </div>
                <div className="mt-4 px-4 py-1.5 rounded-full bg-studio-card/90 border border-studio-border text-white text-sm font-bold tracking-wide">
                  Bersiap untuk Pose #{currentShotIndex + 1}!
                </div>
              </div>
            )}

            {/* Fallback Jika Kamera Belum Siap / Ditolak */}
            {!isStreaming && (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 bg-studio-card z-10">
                <div className="max-w-md p-6 rounded-2xl bg-studio-bg border border-studio-border shadow-xl">
                  <span className="w-12 h-12 rounded-full bg-brand-pink/15 text-brand-pink flex items-center justify-center mx-auto mb-3">
                    <SparklesIcon className="w-6 h-6" />
                  </span>
                  <h3 className="text-xl font-bold text-text-primary mb-2">
                    {cameraError ? 'Akses Kamera Terkendala' : 'Menghubungkan Kamera...'}
                  </h3>
                  <p className="text-sm text-text-secondary mb-5">
                    {cameraError || 'Mohon izinkan akses webcam atau kamera HP untuk mengambil 4 foto seru.'}
                  </p>

                  <div className="flex flex-col sm:flex-row gap-2.5 justify-center">
                    <button
                      type="button"
                      onClick={() => startCamera()}
                      className="min-h-[44px] px-5 py-2.5 rounded-xl bg-brand-pink text-white font-bold hover:bg-brand-pink-hover shadow-md text-sm"
                    >
                      Coba Sambungkan Lagi
                    </button>
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="min-h-[44px] px-5 py-2.5 rounded-xl bg-studio-card text-text-primary border border-studio-border hover:border-white/40 text-sm font-semibold"
                    >
                      Unggah 4 Foto dari Galeri
                    </button>
                    <input
                      ref={fileInputRef}
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleManualUpload}
                      className="hidden"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Petunjuk Pintas Keyboard di Bawah Kamera */}
            {isStreaming && !sessionActive && (
              <div className="absolute bottom-3 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white/90 text-xs font-medium">
                Tekan tombol <span className="font-bold underline text-brand-pink">Space</span> atau klik tombol di samping untuk mulai
              </div>
            )}
          </div>
        </div>

        {/* Kolom Kanan: Status 4 Jepretan & Tombol Shutter Utama */}
        <div className="w-full lg:w-1/3 flex flex-col justify-between bg-studio-card p-6 sm:p-8 rounded-3xl border border-studio-border shadow-studio">
          <div>
            {/* Header Sesi */}
            <div className="mb-6">
              <span className="text-xs font-bold text-brand-pink tracking-wider uppercase block mb-1">
                Langkah 2 dari 3
              </span>
              <h2 className="text-2xl font-extrabold text-text-primary tracking-tight">
                Sesi Foto Booth
              </h2>
              <p className="text-sm text-text-secondary mt-1">
                Kamera akan mengambil 4 foto berturut-turut dengan jeda 3 detik tiap foto.
              </p>
            </div>

            {/* Progres 4 Slot Foto (Thumbnail Live) */}
            <div className="space-y-3 mb-6">
              <div className="flex justify-between items-center text-sm font-bold">
                <span className="text-text-primary">Progres Foto:</span>
                <span className="text-brand-pink">
                  {capturedPhotos.length} / 4 Selesai
                </span>
              </div>

              {/* Grid 4 Slot Thumbnail */}
              <div className="grid grid-cols-4 gap-2.5">
                {[1, 2, 3, 4].map((num) => {
                  const isCurrent = sessionActive && currentShotIndex === num - 1
                  const photoData = capturedPhotos[num - 1]
                  return (
                    <div
                      key={num}
                      className={`h-24 sm:h-28 rounded-xl border-2 flex flex-col items-center justify-center p-1 relative overflow-hidden transition-all ${
                        photoData
                          ? 'border-brand-pink bg-studio-bg shadow-sm'
                          : isCurrent
                          ? 'border-brand-pink bg-brand-pink/10 animate-pulse'
                          : 'border-studio-border bg-studio-bg/60 text-text-secondary'
                      }`}
                    >
                      {photoData ? (
                        <img
                          src={photoData}
                          alt={`Jepretan ${num}`}
                          className="w-full h-full object-cover rounded-lg"
                        />
                      ) : (
                        <div className="text-center">
                          <span className="text-xs font-bold block mb-1">#{num}</span>
                          <span className="text-xs font-medium opacity-60">
                            {isCurrent ? countdown || '...' : 'Siap'}
                          </span>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Opsi Unggah Manual */}
            <div className="pt-2">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={sessionActive}
                className="w-full min-h-[44px] px-4 py-2 rounded-xl bg-studio-bg text-text-secondary hover:text-text-primary text-xs font-semibold border border-studio-border hover:border-studio-border/80 transition-all"
              >
                Atau pilih 4 foto dari galeri HP
              </button>
            </div>
          </div>

          {/* Baris Tombol Aksi Bawah: Shutter Bulat Keren */}
          <div className="mt-8 pt-4 border-t border-studio-border flex flex-col gap-3">
            <button
              type="button"
              onClick={startPhotoSession}
              disabled={sessionActive || !isStreaming}
              className="w-full min-h-[56px] px-6 py-3 rounded-2xl bg-gradient-to-r from-brand-pink to-brand-coral hover:from-brand-pink-hover hover:to-brand-pink text-white text-base font-extrabold tracking-wide shadow-glow-pink hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all active:scale-[0.98] flex items-center justify-center gap-3 focus:outline-none"
            >
              <ShutterIcon className="w-6 h-6 animate-pulse" />
              <span>
                {sessionActive ? `Mengambil Foto #${currentShotIndex + 1}...` : 'Mulai 4 Jepretan (Space)'}
              </span>
            </button>

            <button
              type="button"
              onClick={onBack}
              disabled={sessionActive}
              className="w-full min-h-[44px] px-4 py-2.5 rounded-xl bg-transparent text-text-secondary hover:text-text-primary text-sm font-semibold transition-all flex items-center justify-center gap-2"
            >
              <ArrowLeftIcon className="w-4 h-4" />
              <span>Kembali ke Pilih Bingkai</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  )
}
