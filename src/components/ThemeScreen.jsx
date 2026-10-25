import React from 'react'

// Komponen Layar 1: Pilih Tema
export default function ThemeScreen({ selectedTheme, onSelectTheme, onNext }) {
  // Daftar tema awal sebagai demonstrasi state
  const availableThemes = [
    {
      id: 'korean-strip',
      name: 'Korean Life4Cuts',
      category: 'Korean',
      badge: 'Tren Populer',
      bgClass: 'bg-rose-100 text-rose-950 border-rose-300',
      description: 'Strip 4 foto vertikal dengan nuansa pastel lembut khas Korea.'
    },
    {
      id: 'y2k-cyber',
      name: 'Y2K Cyber Glow',
      category: 'Y2K',
      badge: 'Estetik 2000s',
      bgClass: 'bg-violet-950 text-fuchsia-300 border-fuchsia-500',
      description: 'Gaya futuristik retro tahun 2000 dengan aksen warna neon.'
    },
    {
      id: 'retro-film',
      name: 'Retro 35mm Film',
      category: 'Vintage',
      badge: 'Klasik',
      bgClass: 'bg-amber-950 text-amber-200 border-amber-600',
      description: 'Bingkai film analog 35mm bernuansa hangat dan butiran grain.'
    },
    {
      id: 'kampus-merdeka',
      name: 'Edisi Mahasiswa & Wisuda',
      category: 'Kampus',
      badge: 'Spesial Kampus',
      bgClass: 'bg-sky-950 text-sky-200 border-sky-500',
      description: 'Tema biru almamater dan stiker khas kehidupan mahasiswa.'
    }
  ]

  const currentTheme = availableThemes.find(t => t.id === selectedTheme) || availableThemes[0]

  return (
    <div className="w-full flex-1 flex flex-col justify-between overflow-x-hidden p-4 md:p-6 lg:p-8">
      {/* Konten Utama Responsif: Desktop 2 kolom (kiri: preview, kanan: pilihan), Tablet/Mobile adaptif */}
      <div className="w-full flex-1 flex flex-col lg:flex-row gap-6 items-stretch justify-center max-w-7xl mx-auto">
        
        {/* Kolom Kiri: Pratinjau Tema Terpilih */}
        <div className="w-full lg:w-1/2 flex flex-col items-center justify-center bg-stone-800/80 rounded-2xl p-6 border border-stone-700/60 shadow-xl">
          <span className="text-stone-400 font-medium mb-3 text-base">
            Pratinjau Tema Terpilih
          </span>
          
          {/* Ilustrasi Frame Photobooth Miniatur */}
          <div className={`w-52 sm:w-60 md:w-64 p-4 rounded-xl border-2 shadow-2xl flex flex-col items-center gap-2.5 transition-all duration-300 ${currentTheme.bgClass}`}>
            <div className="w-full flex justify-between items-center px-1">
              <span className="text-base font-bold tracking-wider">{currentTheme.category}</span>
              <span className="text-base font-semibold opacity-80">★ 4 CUTS</span>
            </div>
            
            {/* 4 Slot Foto Miniatur */}
            <div className="w-full h-16 sm:h-20 bg-stone-900/20 rounded border border-black/10 flex items-center justify-center font-medium text-base">Foto 1</div>
            <div className="w-full h-16 sm:h-20 bg-stone-900/20 rounded border border-black/10 flex items-center justify-center font-medium text-base">Foto 2</div>
            <div className="w-full h-16 sm:h-20 bg-stone-900/20 rounded border border-black/10 flex items-center justify-center font-medium text-base">Foto 3</div>
            <div className="w-full h-16 sm:h-20 bg-stone-900/20 rounded border border-black/10 flex items-center justify-center font-medium text-base">Foto 4</div>
            
            <span className="text-base font-semibold pt-1 tracking-widest uppercase">
              PHOTOBOOTH ID
            </span>
          </div>

          <div className="mt-4 text-center">
            <h3 className="text-xl font-bold text-stone-100">{currentTheme.name}</h3>
            <p className="text-base text-stone-300 mt-1 max-w-sm">{currentTheme.description}</p>
          </div>
        </div>

        {/* Kolom Kanan / Bawah: Daftar Pilihan Tema */}
        <div className="w-full lg:w-1/2 flex flex-col justify-between bg-stone-800/50 rounded-2xl p-6 border border-stone-700/40">
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">Pilih Tema Favorit</h2>
            <p className="text-base text-stone-300 mb-5">
              Pilih gaya strip foto yang kamu sukai. Semua gratis tanpa perlu login.
            </p>

            {/* Grid Kartu Tema */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {availableThemes.map((theme) => {
                const isSelected = theme.id === selectedTheme
                return (
                  <button
                    key={theme.id}
                    type="button"
                    onClick={() => onSelectTheme(theme.id)}
                    className={`min-h-[56px] text-left p-4 rounded-xl border-2 transition-all duration-200 flex flex-col justify-between focus:outline-none focus:ring-2 focus:ring-rose-500 ${
                      isSelected
                        ? 'border-rose-500 bg-rose-500/15 shadow-md shadow-rose-950/40 ring-1 ring-rose-500'
                        : 'border-stone-700 bg-stone-800/90 hover:border-stone-500 hover:bg-stone-750'
                    }`}
                  >
                    <div className="flex justify-between items-center w-full mb-1">
                      <span className="text-base font-bold text-stone-100">{theme.name}</span>
                      {isSelected && (
                        <span className="text-base font-semibold text-rose-400">✓ Terpilih</span>
                      )}
                    </div>
                    <span className="text-base text-stone-400">{theme.badge}</span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Kontrol Tombol Lanjut: Selalu di bawah dengan tinggi minimal 44px */}
          <div className="mt-6 pt-4 border-t border-stone-700/60 flex flex-col sm:flex-row justify-end gap-3">
            <button
              type="button"
              onClick={onNext}
              className="w-full sm:w-auto min-h-[48px] px-8 py-3 rounded-xl bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white text-base font-bold tracking-wide shadow-lg shadow-rose-600/30 transition-all duration-200 active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-rose-400 focus:ring-offset-2 focus:ring-offset-stone-900"
            >
              Lanjut ke Kamera →
            </button>
          </div>
        </div>

      </div>
    </div>
  )
}
