import React, { useState } from 'react'
import ThemeScreen from './components/ThemeScreen'
import CameraScreen from './components/CameraScreen'
import ResultScreen from './components/ResultScreen'

// Definisi enum layar aplikasi
const SCREEN = {
  THEME: 'THEME',
  CAMERA: 'CAMERA',
  RESULT: 'RESULT',
}

export default function App() {
  // State navigasi dan data foto
  const [currentScreen, setCurrentScreen] = useState(SCREEN.THEME)
  const [selectedTheme, setSelectedTheme] = useState('korean-strip')
  const [shotCount, setShotCount] = useState(0)

  // Fungsi navigasi alur
  const goToCamera = () => setCurrentScreen(SCREEN.CAMERA)
  const goToTheme = () => setCurrentScreen(SCREEN.THEME)
  const goToResult = () => setCurrentScreen(SCREEN.RESULT)
  const restartFlow = () => {
    setShotCount(0)
    setCurrentScreen(SCREEN.THEME)
  }

  return (
    <div className="min-h-dvh w-full flex flex-col bg-stone-900 text-stone-100 overflow-x-hidden safe-padding-top safe-padding-bottom safe-padding-left safe-padding-right select-none">
      
      {/* Header / Navigasi Indikator Alur */}
      <header className="w-full border-b border-stone-800 bg-stone-900/90 backdrop-blur sticky top-0 z-20 px-4 py-3 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          
          {/* Logo & Info Brand */}
          <div className="flex items-center gap-3">
            <span className="text-2xl" aria-hidden="true">📸</span>
            <div>
              <h1 className="text-lg sm:text-xl font-bold tracking-tight text-white">
                Photobooth Mahasiswa
              </h1>
              <p className="text-base text-stone-400 hidden sm:block">
                Gratis • 100% Client-Side • Tanpa Akun
              </p>
            </div>
          </div>

          {/* Stepper Indikator 3 Tahap */}
          <nav aria-label="Tahapan Alur Photobooth" className="flex items-center gap-1.5 sm:gap-2">
            {[
              { key: SCREEN.THEME, label: '1. Tema' },
              { key: SCREEN.CAMERA, label: '2. Kamera' },
              { key: SCREEN.RESULT, label: '3. Hasil' },
            ].map((step) => {
              const isActive = currentScreen === step.key
              return (
                <button
                  key={step.key}
                  type="button"
                  onClick={() => setCurrentScreen(step.key)}
                  className={`min-h-[44px] px-3.5 sm:px-4 py-2 rounded-xl text-base font-semibold transition-all flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-rose-500 ${
                    isActive
                      ? 'bg-rose-500/20 text-rose-400 border border-rose-500/50 shadow-sm'
                      : 'text-stone-400 hover:text-stone-200 hover:bg-stone-800'
                  }`}
                >
                  {step.label}
                </button>
              )
            })}
          </nav>
        </div>
      </header>

      {/* Kontainer Layar Utama (Disesuaikan secara responsif saat rotasi perangkat) */}
      <main className="flex-1 flex flex-col w-full relative">
        {currentScreen === SCREEN.THEME && (
          <ThemeScreen
            selectedTheme={selectedTheme}
            onSelectTheme={setSelectedTheme}
            onNext={goToCamera}
          />
        )}

        {currentScreen === SCREEN.CAMERA && (
          <CameraScreen
            onBack={goToTheme}
            onNext={goToResult}
            shotCount={shotCount}
          />
        )}

        {currentScreen === SCREEN.RESULT && (
          <ResultScreen
            selectedTheme={selectedTheme}
            onRestart={restartFlow}
          />
        )}
      </main>

      {/* Footer Minimalis */}
      <footer className="w-full border-t border-stone-800/80 py-3 px-4 text-center text-stone-400 text-base">
        <p>Photobooth Mahasiswa Indonesia • Privasi 100% aman di perangkat Anda</p>
      </footer>
    </div>
  )
}
