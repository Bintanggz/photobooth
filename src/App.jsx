import React, { useState } from 'react'
import ThemeScreen from './components/ThemeScreen'
import CameraScreen from './components/CameraScreen'
import ResultScreen from './components/ResultScreen'
import { CameraIcon, SparklesIcon } from './components/common/Icons'
import { FRAME_COLORS } from './data/frameColors'

const SCREEN = {
  THEME: 'THEME',
  CAMERA: 'CAMERA',
  RESULT: 'RESULT',
}

export default function App() {
  const [currentScreen, setCurrentScreen] = useState(SCREEN.THEME)
  const [selectedTheme, setSelectedTheme] = useState('korean-strip')
  const [selectedColor, setSelectedColor] = useState(FRAME_COLORS[0])
  const [photos, setPhotos] = useState([])

  const goToCamera = () => setCurrentScreen(SCREEN.CAMERA)
  const goToTheme = () => setCurrentScreen(SCREEN.THEME)

  const handleFinishCameraSession = (capturedPhotos) => {
    setPhotos(capturedPhotos)
    setCurrentScreen(SCREEN.RESULT)
  }

  const restartFlow = () => {
    setPhotos([])
    setCurrentScreen(SCREEN.THEME)
  }

  return (
    <div className="min-h-dvh w-full flex flex-col bg-studio-bg text-text-primary font-sans overflow-x-hidden safe-padding-top safe-padding-bottom safe-padding-left safe-padding-right select-none">
      
      {/* Header Photobooth Studio Modern */}
      <header className="w-full border-b border-studio-border bg-studio-bg/90 backdrop-blur-md sticky top-0 z-20 px-4 py-3 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          
          {/* Logo & Identitas Photobooth */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-brand-pink to-brand-coral flex items-center justify-center text-white shadow-glow-pink">
              <CameraIcon className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-lg sm:text-xl tracking-tight text-white">
                  PHOTOBOOTH
                </span>
                <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-brand-pink/20 text-brand-pink border border-brand-pink/30 uppercase tracking-wider">
                  LIFE4CUTS
                </span>
              </div>
              <p className="text-xs text-text-secondary">
                Web Photo Booth Gratis Mahasiswa Indonesia
              </p>
            </div>
          </div>

          {/* Stepper Indikator 3 Tahap Cantik */}
          <nav aria-label="Tahapan Alur Photobooth" className="flex items-center gap-1.5 sm:gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
            {[
              { key: SCREEN.THEME, step: '1', label: 'Pilih Frame' },
              { key: SCREEN.CAMERA, step: '2', label: 'Ambil Foto' },
              { key: SCREEN.RESULT, step: '3', label: 'Hias & Unduh' },
            ].map((item) => {
              const isActive = currentScreen === item.key
              return (
                <button
                  key={item.key}
                  type="button"
                  onClick={() => setCurrentScreen(item.key)}
                  className={`min-h-[44px] px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 border focus:outline-none ${
                    isActive
                      ? 'bg-brand-pink text-white border-brand-pink shadow-glow-pink'
                      : 'bg-studio-card text-text-secondary border-studio-border hover:text-white hover:border-white/20'
                  }`}
                >
                  <span className={`w-5 h-5 rounded-full text-xs flex items-center justify-center font-black ${
                    isActive ? 'bg-white text-brand-pink' : 'bg-studio-bg text-text-secondary'
                  }`}>
                    {item.step}
                  </span>
                  <span>{item.label}</span>
                </button>
              )
            })}
          </nav>
        </div>
      </header>

      {/* Kontainer Layar Utama */}
      <main className="flex-1 flex flex-col w-full relative">
        {currentScreen === SCREEN.THEME && (
          <ThemeScreen
            selectedTheme={selectedTheme}
            onSelectTheme={setSelectedTheme}
            selectedColor={selectedColor}
            onSelectColor={setSelectedColor}
            onNext={goToCamera}
          />
        )}

        {currentScreen === SCREEN.CAMERA && (
          <CameraScreen
            onBack={goToTheme}
            onFinishSession={handleFinishCameraSession}
            selectedTheme={selectedTheme}
          />
        )}

        {currentScreen === SCREEN.RESULT && (
          <ResultScreen
            selectedTheme={selectedTheme}
            selectedColor={selectedColor}
            photos={photos}
            onRestart={restartFlow}
          />
        )}
      </main>

      {/* Footer Bersahaja */}
      <footer className="w-full border-t border-studio-border py-4 px-4 text-center text-text-secondary text-xs sm:text-sm bg-studio-bg">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <span>Photobooth Mahasiswa Indonesia • 100% Client-Side Tanpa Akun</span>
          <span className="text-brand-pink font-semibold flex items-center gap-1.5">
            <SparklesIcon className="w-4 h-4" />
            Privasi Aman di Perangkat Anda
          </span>
        </div>
      </footer>
    </div>
  )
}
