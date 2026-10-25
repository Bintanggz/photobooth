import React, { useState } from 'react'
import { THEMES, getThemeById } from '../data/themes'
import { FRAME_COLORS } from '../data/frameColors'
import { ArrowRightIcon, CameraIcon, CheckIcon, PaletteIcon, SparklesIcon } from './common/Icons'

// Pose ilustrasi panduan photobooth yang ramah dan estetik
const POSE_GUIDES = [
  { id: 1, label: 'Pose 1: Senyum Ceria', icon: '✌️', desc: 'V-sign manis' },
  { id: 2, label: 'Pose 2: Heart Cheek', icon: '🫰', desc: 'Tangan di pipi' },
  { id: 3, label: 'Pose 3: Wink Seru', icon: '😉', desc: 'Kedip & senyum' },
  { id: 4, label: 'Pose 4: Candid Bebas', icon: '✨', desc: 'Gaya bebasmu' },
]

export default function ThemeScreen({ selectedTheme, onSelectTheme, onNext, selectedColor, onSelectColor }) {
  const currentTheme = getThemeById(selectedTheme)
  const [activeFrameColor, setActiveFrameColor] = useState(selectedColor || FRAME_COLORS[0])

  const handleColorChange = (color) => {
    setActiveFrameColor(color)
    if (onSelectColor) onSelectColor(color)
  }

  return (
    <div className="w-full flex-1 flex flex-col justify-between overflow-x-hidden p-4 md:p-6 lg:p-8">
      {/* Konten Utama Responsif: Desktop 2 Kolom, Tablet/Mobile Adaptif */}
      <div className="w-full flex-1 flex flex-col lg:flex-row gap-8 items-center lg:items-stretch justify-center max-w-7xl mx-auto">
        
        {/* Kolom Kiri: Pratinjau Strip Foto Fisik (Estetika Korean Life4Cuts) */}
        <div className="w-full lg:w-1/2 flex flex-col items-center justify-center bg-studio-card/80 p-6 sm:p-8 rounded-3xl border border-studio-border shadow-studio relative">
          
          {/* Header Marka Studio */}
          <div className="w-full flex justify-between items-center mb-6 pb-3 border-b border-studio-border">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-brand-pink animate-pulse"></span>
              <span className="text-sm font-semibold tracking-wide text-text-primary uppercase">
                Pratinjau Strip 4-Cuts
              </span>
            </div>
            <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-studio-bg text-brand-pink border border-studio-border">
              RASIO 1:3 • HD
            </span>
          </div>

          {/* Badan Strip Foto (Warna Bingkai Dinamis Sesuai Pilihan Swatch) */}
          <div
            className="w-56 sm:w-64 p-3.5 sm:p-4 rounded-2xl shadow-photo-card transition-all duration-300 flex flex-col items-center gap-2.5"
            style={{
              backgroundColor: activeFrameColor.hex,
              color: activeFrameColor.textColor,
            }}
          >
            {/* Header Strip */}
            <div className="w-full flex justify-between items-center px-1 font-mono text-xs font-bold tracking-widest border-b border-current/15 pb-1">
              <span>{currentTheme.branding.topText}</span>
              <span className="opacity-75">4 CUTS</span>
            </div>

            {/* 4 Slot Frame Foto dengan Panduan Pose Ceria */}
            {[1, 2, 3, 4].map((num) => (
              <div
                key={num}
                className="w-full h-20 sm:h-24 rounded-xl border border-black/10 flex flex-col items-center justify-center relative overflow-hidden transition-all"
                style={{ backgroundColor: activeFrameColor.slotBg }}
              >
                <div className="text-center p-2">
                  <span className="text-xs font-bold tracking-wider opacity-70 block mb-0.5">
                    POSE #{num}
                  </span>
                  <span className="text-xs font-medium opacity-90">
                    {POSE_GUIDES[num - 1].desc}
                  </span>
                </div>
              </div>
            ))}

            {/* Footer Strip dengan Stempel Tanggal Cantik */}
            <div className="w-full pt-1.5 border-t border-current/15 flex justify-between items-end">
              <div className="text-[11px] font-semibold leading-tight">
                <p className="font-bold tracking-wider">{currentTheme.branding.bottomText}</p>
                <p className="opacity-60 text-[10px]">PHOTOBOOTH ID</p>
              </div>
              <span className="text-[11px] font-mono font-bold px-1.5 py-0.5 rounded bg-black/10">
                {currentTheme.branding.stampText}
              </span>
            </div>
          </div>

          {/* Keterangan Bingkai Terpilih */}
          <div className="mt-6 text-center">
            <h3 className="text-xl font-bold text-text-primary">{currentTheme.name}</h3>
            <p className="text-sm text-text-secondary mt-1 max-w-sm">
              Warna: <span className="font-semibold text-text-primary">{activeFrameColor.name}</span>
            </p>
          </div>
        </div>

        {/* Kolom Kanan: Pilihan Format & Warna Bingkai */}
        <div className="w-full lg:w-1/2 flex flex-col justify-between bg-studio-card p-6 sm:p-8 rounded-3xl border border-studio-border shadow-studio">
          <div>
            {/* Header Kontrol */}
            <div className="mb-6">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-pink/10 border border-brand-pink/30 text-brand-pink text-xs font-bold uppercase tracking-wider mb-2">
                <SparklesIcon className="w-3.5 h-3.5" />
                <span>Web Photobooth Online</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-text-primary tracking-tight">
                Pilih Bingkai & Warna
              </h2>
              <p className="text-base text-text-secondary mt-1">
                Pilih palet warna strip dan tema gaya untuk 4 jepretan foto seru bersama teman.
              </p>
            </div>

            {/* Bagian 1: Pilih Warna Bingkai Fisik (Color Swatches) */}
            <div className="mb-6 p-4 rounded-2xl bg-studio-bg/60 border border-studio-border">
              <div className="flex items-center justify-between mb-3">
                <label className="text-sm font-bold text-text-primary flex items-center gap-2">
                  <PaletteIcon className="w-4 h-4 text-brand-pink" />
                  <span>Pilihan Warna Bingkai:</span>
                </label>
                <span className="text-xs text-text-secondary font-medium">
                  {activeFrameColor.name}
                </span>
              </div>

              {/* Swatch Lingkaran Warna-Warni */}
              <div className="flex flex-wrap gap-2.5 sm:gap-3">
                {FRAME_COLORS.map((c) => {
                  const isActive = c.id === activeFrameColor.id
                  return (
                    <button
                      key={c.id}
                      type="button"
                      title={c.name}
                      onClick={() => handleColorChange(c)}
                      className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full border-2 transition-all flex items-center justify-center ${
                        isActive
                          ? 'border-brand-pink scale-110 shadow-glow-pink ring-2 ring-brand-pink/50'
                          : 'border-white/20 hover:scale-105 hover:border-white/40'
                      }`}
                      style={{ backgroundColor: c.hex }}
                    >
                      {isActive && (
                        <CheckIcon
                          className="w-4 h-4"
                          style={{ color: c.textColor }}
                        />
                      )}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Bagian 2: Pilih Gaya Format / Tema */}
            <div className="mb-6">
              <label className="block text-sm font-bold text-text-primary mb-3">
                Pilih Gaya Tema:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {THEMES.map((theme) => {
                  const isSelected = theme.id === selectedTheme
                  return (
                    <button
                      key={theme.id}
                      type="button"
                      onClick={() => onSelectTheme(theme.id)}
                      className={`text-left p-4 rounded-2xl border-2 transition-all flex flex-col justify-between min-h-[64px] ${
                        isSelected
                          ? 'border-brand-pink bg-brand-pink/10 shadow-md ring-1 ring-brand-pink/40'
                          : 'border-studio-border bg-studio-bg/80 hover:border-studio-border/80 hover:bg-studio-bg'
                      }`}
                    >
                      <div className="flex justify-between items-start w-full mb-1">
                        <span className="text-base font-bold text-text-primary">
                          {theme.name}
                        </span>
                        {isSelected && (
                          <span className="text-xs font-bold text-brand-pink bg-brand-pink/15 px-2 py-0.5 rounded-full">
                            ✓ Aktif
                          </span>
                        )}
                      </div>
                      <span className="text-xs text-text-secondary">
                        {theme.badge}
                      </span>
                    </button>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Tombol Mulai Sesi Foto */}
          <div className="pt-4 border-t border-studio-border">
            <button
              type="button"
              onClick={onNext}
              className="w-full min-h-[52px] px-8 py-3.5 rounded-2xl bg-gradient-to-r from-brand-pink to-brand-coral hover:from-brand-pink-hover hover:to-brand-pink text-white text-base font-bold tracking-wide shadow-glow-pink hover:shadow-lg transition-all active:scale-[0.98] flex items-center justify-center gap-2 focus:outline-none"
            >
              <CameraIcon className="w-5 h-5" />
              <span>Mulai Sesi Foto (4 Pose)</span>
              <ArrowRightIcon className="w-5 h-5 ml-1" />
            </button>
          </div>
        </div>

      </div>
    </div>
  )
}
