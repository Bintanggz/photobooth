import React, { useState, useEffect, useRef, useCallback } from 'react'
import { THEMES, getThemeById } from '../data/themes'
import { FRAME_COLORS } from '../data/frameColors'
import { STICKERS } from '../data/stickers'
import { renderFullStrip, canvasToBlob, downloadBlob } from '../utils/canvasHelpers'
import { DownloadIcon, ShareIcon, RestartIcon, PaletteIcon, SparklesIcon, CheckIcon } from './common/Icons'

export default function ResultScreen({ onRestart, selectedTheme: initialThemeId, selectedColor, photos = [] }) {
  const [currentThemeId, setCurrentThemeId] = useState(initialThemeId || 'korean-strip')
  const [activeFrameColor, setActiveFrameColor] = useState(selectedColor || FRAME_COLORS[0])
  const [activeFilter, setActiveFilter] = useState('normal')
  const [activeStickers, setActiveStickers] = useState([])
  const [isExporting, setIsExporting] = useState(false)
  const [notification, setNotification] = useState(null)
  const [activeTab, setActiveTab] = useState('color') // 'color', 'filter', 'sticker'

  const canvasRef = useRef(null)
  const previewCanvasRef = useRef(null)

  const theme = getThemeById(currentThemeId)

  const filterList = [
    { id: 'normal', name: 'Asli', desc: 'Warna natural' },
    { id: 'korean-glow', name: 'Korean Glow', desc: 'Cerah merona' },
    { id: 'bw', name: 'B&W Film', desc: 'Klasik monokrom' },
    { id: 'retro', name: 'Vintage Warm', desc: 'Hangat 90-an' },
    { id: 'y2k', name: 'Y2K Cyber', desc: 'Kontras perak' },
  ]

  // Render canvas setiap kali ada perubahan
  const renderCanvas = useCallback(async () => {
    if (!canvasRef.current) return
    setIsExporting(true)

    try {
      await renderFullStrip(
        canvasRef.current,
        theme,
        photos,
        activeFilter,
        activeStickers,
        activeFrameColor
      )

      const preview = previewCanvasRef.current
      if (preview && canvasRef.current) {
        const pCtx = preview.getContext('2d')
        preview.width = canvasRef.current.width
        preview.height = canvasRef.current.height
        pCtx.drawImage(canvasRef.current, 0, 0)
      }
    } catch (err) {
      console.error('Gagal merender strip:', err)
    } finally {
      setIsExporting(false)
    }
  }, [theme, photos, activeFilter, activeStickers, activeFrameColor])

  useEffect(() => {
    renderCanvas()
  }, [renderCanvas])

  const addSticker = (stickerTemplate) => {
    const newSticker = {
      ...stickerTemplate,
      instanceId: Date.now() + Math.random(),
      x: 600,
      y: 900 + activeStickers.length * 400,
      rotation: Math.floor(Math.random() * 8) - 4,
      scale: 1,
    }
    setActiveStickers([...activeStickers, newSticker])
  }

  const removeSticker = (instanceId) => {
    setActiveStickers(activeStickers.filter((s) => s.instanceId !== instanceId))
  }

  const handleDownload = async () => {
    if (!canvasRef.current) return
    setIsExporting(true)
    try {
      const blob = await canvasToBlob(canvasRef.current)
      if (blob) {
        const timestamp = new Date().toISOString().slice(0, 10)
        downloadBlob(blob, `photobooth-mahasiswa-${timestamp}.png`)
        showToast('Strip foto berhasil diunduh ke galeri!')
      }
    } catch {
      showToast('Gagal memproses unduhan.')
    } finally {
      setIsExporting(false)
    }
  }

  const handleShare = async () => {
    if (!canvasRef.current) return
    setIsExporting(true)

    try {
      const blob = await canvasToBlob(canvasRef.current)
      const file = new File([blob], 'photobooth-mahasiswa.png', { type: 'image/png' })

      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: 'Strip Photobooth Mahasiswa',
          text: 'Lihat hasil foto Life4Cuts kami!',
        })
        showToast('Berhasil membuka menu bagikan!')
      } else {
        handleDownload()
        showToast('Mengunduh foto langsung (bagikan lewat WhatsApp/Instagram).')
      }
    } catch (err) {
      if (err.name !== 'AbortError') {
        handleDownload()
      }
    } finally {
      setIsExporting(false)
    }
  }

  const showToast = (message) => {
    setNotification(message)
    setTimeout(() => setNotification(null), 3000)
  }

  return (
    <div className="w-full flex-1 flex flex-col justify-between overflow-x-hidden p-4 md:p-6 lg:p-8">
      {/* Toast Notifikasi */}
      {notification && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 px-5 py-2.5 rounded-full bg-brand-pink text-white font-bold text-sm shadow-lg animate-bounce">
          {notification}
        </div>
      )}

      {/* Konten Utama Responsif */}
      <div className="w-full flex-1 flex flex-col lg:flex-row gap-8 items-center lg:items-stretch justify-center max-w-7xl mx-auto">
        
        {/* Kolom Kiri: Pratinjau Kanvas Cetak */}
        <div className="w-full lg:w-1/2 flex flex-col items-center justify-center bg-studio-card p-6 sm:p-8 rounded-3xl border border-studio-border shadow-studio relative">
          
          <div className="w-full flex justify-between items-center mb-4 pb-3 border-b border-studio-border">
            <span className="text-xs font-bold text-brand-pink uppercase tracking-wider flex items-center gap-1.5">
              <SparklesIcon className="w-4 h-4" />
              Hasil Cetak Life4Cuts
            </span>
            <span className="text-xs font-mono text-text-secondary">
              {isExporting ? 'Memproses...' : 'Siap Disimpan'}
            </span>
          </div>

          {/* Pratinjau Kertas Foto Fisik */}
          <div className="py-2 flex items-center justify-center w-full">
            <div className="w-56 sm:w-64 md:w-72 rounded-2xl shadow-photo-card overflow-hidden transition-transform duration-300 hover:scale-[1.01] border border-black/10">
              <canvas
                ref={previewCanvasRef}
                className="w-full h-auto object-contain block"
              />
              <canvas ref={canvasRef} className="hidden" />
            </div>
          </div>

          <div className="mt-4 text-xs font-mono text-text-secondary text-center">
            Format: 1200 × 3600 PX • Siap Cetak Kertas Foto
          </div>
        </div>

        {/* Kolom Kanan: Panel Tab Kustomisasi (Warna, Filter, Stiker) */}
        <div className="w-full lg:w-1/2 flex flex-col justify-between bg-studio-card p-6 sm:p-8 rounded-3xl border border-studio-border shadow-studio">
          <div>
            {/* Header Kontrol */}
            <div className="mb-5">
              <span className="text-xs font-bold text-brand-pink tracking-wider uppercase block mb-1">
                Langkah 3 dari 3
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-text-primary tracking-tight">
                Hias & Unduh Strip Foto
              </h2>
              <p className="text-sm text-text-secondary mt-1">
                Sesuaikan warna bingkai, filter foto, dan tambahkan stiker lucu.
              </p>
            </div>

            {/* Tab Navigasi Alat */}
            <div className="flex border-b border-studio-border mb-5 gap-2">
              {[
                { key: 'color', label: 'Warna Frame' },
                { key: 'filter', label: 'Filter Foto' },
                { key: 'sticker', label: 'Stiker' },
              ].map((tab) => (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => setActiveTab(tab.key)}
                  className={`pb-3 px-4 text-sm font-bold border-b-2 transition-all ${
                    activeTab === tab.key
                      ? 'border-brand-pink text-brand-pink'
                      : 'border-transparent text-text-secondary hover:text-text-primary'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab 1: Pilihan Warna Frame */}
            {activeTab === 'color' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs text-text-secondary">
                  <span>Warna saat ini:</span>
                  <span className="font-bold text-text-primary">{activeFrameColor.name}</span>
                </div>

                <div className="grid grid-cols-4 gap-3">
                  {FRAME_COLORS.map((c) => {
                    const isActive = c.id === activeFrameColor.id
                    return (
                      <button
                        key={c.id}
                        type="button"
                        onClick={() => setActiveFrameColor(c)}
                        className={`h-12 rounded-xl border-2 transition-all flex flex-col items-center justify-center p-1 ${
                          isActive
                            ? 'border-brand-pink scale-105 shadow-glow-pink ring-2 ring-brand-pink/40'
                            : 'border-studio-border hover:scale-102 hover:border-white/40'
                        }`}
                        style={{ backgroundColor: c.hex }}
                      >
                        {isActive && <CheckIcon className="w-4 h-4" style={{ color: c.textColor }} />}
                        <span className="text-[10px] font-bold" style={{ color: c.textColor }}>
                          {c.name}
                        </span>
                      </button>
                    )
                  })}
                </div>
              </div>
            )}

            {/* Tab 2: Pilihan Filter Foto */}
            {activeTab === 'filter' && (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {filterList.map((f) => {
                  const isActive = f.id === activeFilter
                  return (
                    <button
                      key={f.id}
                      type="button"
                      onClick={() => setActiveFilter(f.id)}
                      className={`p-3 rounded-2xl border-2 text-left transition-all ${
                        isActive
                          ? 'border-brand-pink bg-brand-pink/15 shadow-sm ring-1 ring-brand-pink/30'
                          : 'border-studio-border bg-studio-bg hover:border-studio-border/90'
                      }`}
                    >
                      <span className="text-sm font-bold block text-text-primary">{f.name}</span>
                      <span className="text-xs text-text-secondary">{f.desc}</span>
                    </button>
                  )
                })}
              </div>
            )}

            {/* Tab 3: Pilihan Stiker */}
            {activeTab === 'sticker' && (
              <div className="space-y-3">
                <div className="flex justify-between items-center text-xs text-text-secondary">
                  <span>Ketuk stiker untuk menambahkan:</span>
                  {activeStickers.length > 0 && (
                    <button
                      type="button"
                      onClick={() => setActiveStickers([])}
                      className="text-brand-pink font-bold hover:underline"
                    >
                      Hapus Semua Stiker
                    </button>
                  )}
                </div>

                <div className="flex flex-wrap gap-2 max-h-48 overflow-y-auto pr-1">
                  {STICKERS.map((stk) => (
                    <button
                      key={stk.id}
                      type="button"
                      onClick={() => addSticker(stk)}
                      className="px-3.5 py-2 rounded-xl bg-studio-bg text-text-primary text-xs font-bold border border-studio-border hover:border-brand-pink hover:scale-105 active:scale-95 transition-all shadow-sm"
                    >
                      + {stk.text}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Tombol Ekspor Utama */}
          <div className="mt-8 pt-4 border-t border-studio-border flex flex-col gap-3">
            <button
              type="button"
              onClick={handleDownload}
              disabled={isExporting}
              className="w-full min-h-[54px] px-6 py-3.5 rounded-2xl bg-gradient-to-r from-brand-pink to-brand-coral hover:from-brand-pink-hover hover:to-brand-pink text-white text-base font-extrabold tracking-wide shadow-glow-pink hover:shadow-lg transition-all active:scale-[0.98] flex items-center justify-center gap-2.5 focus:outline-none"
            >
              <DownloadIcon className="w-5 h-5" />
              <span>Unduh Foto Strip (PNG)</span>
            </button>

            <button
              type="button"
              onClick={handleShare}
              disabled={isExporting}
              className="w-full min-h-[48px] px-6 py-2.5 rounded-2xl bg-studio-bg text-text-primary text-sm font-bold border border-studio-border hover:border-white/30 transition-all flex items-center justify-center gap-2"
            >
              <ShareIcon className="w-5 h-5 text-brand-pink" />
              <span>Bagikan Foto ke Teman</span>
            </button>

            <button
              type="button"
              onClick={onRestart}
              className="w-full min-h-[44px] px-4 py-2 text-text-secondary hover:text-text-primary text-xs font-semibold transition-all flex items-center justify-center gap-2"
            >
              <RestartIcon className="w-4 h-4" />
              <span>Mulai Sesi Foto Baru</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  )
}
