import React from 'react'

// Komponen Layar 2: Kamera
export default function CameraScreen({ onBack, onNext, shotCount = 0 }) {
  return (
    <div className="w-full flex-1 flex flex-col justify-between overflow-x-hidden p-4 md:p-6 lg:p-8">
      {/* Konten Utama Responsif:
          - Mobile: 1 kolom (preview atas, kontrol bawah)
          - Tablet Portrait: 1 kolom seimbang
          - Tablet Landscape & Desktop: 2 kolom (preview kiri/tengah, kontrol samping kanan)
      */}
      <div className="w-full flex-1 flex flex-col lg:flex-row gap-6 items-stretch justify-center max-w-7xl mx-auto">
        
        {/* Kolom Kiri / Area Preview Kamera */}
        <div className="w-full lg:w-2/3 flex flex-col items-center justify-center bg-stone-950 rounded-2xl border border-stone-800 shadow-2xl relative overflow-hidden min-h-[300px] sm:min-h-[400px] md:min-h-[480px]">
          {/* Simulasi Viewfinder Kamera */}
          <div className="w-full h-full flex flex-col items-center justify-center text-center p-6 bg-gradient-to-b from-stone-900 to-stone-950">
            {/* Garis Pembidik Viewfinder */}
            <div className="w-48 h-48 sm:w-64 sm:h-64 border-2 border-dashed border-rose-500/40 rounded-2xl flex items-center justify-center relative">
              <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-rose-400"></div>
              <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-rose-400"></div>
              <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-rose-400"></div>
              <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-rose-400"></div>
              
              <div className="text-center px-4">
                <span className="text-3xl block mb-2">📸</span>
                <p className="text-stone-300 font-medium text-base">Pratinjau Kamera</p>
                <p className="text-stone-400 text-base mt-1">Siapkan senyum terbaikmu!</p>
              </div>
            </div>

            {/* Indikator Hitung Mundur Simulasi */}
            <div className="mt-4 bg-stone-800/90 px-4 py-2 rounded-full border border-stone-700">
              <span className="text-rose-400 font-bold text-base">Countdown: 3 detik per foto</span>
            </div>
          </div>
        </div>

        {/* Kolom Kanan / Kontrol Samping & Indikator Jepretan */}
        <div className="w-full lg:w-1/3 flex flex-col justify-between bg-stone-800/70 rounded-2xl p-6 border border-stone-700/50">
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">Sesi Foto</h2>
            <p className="text-base text-stone-300 mb-5">
              Kamera akan mengambil 4 foto otomatis dengan jeda 3 detik tiap foto.
            </p>

            {/* Progres 4 Slot Foto */}
            <div className="space-y-3">
              <div className="flex justify-between items-center text-base">
                <span className="text-stone-300 font-medium">Status Jepretan:</span>
                <span className="font-bold text-rose-400">{shotCount} / 4 Foto</span>
              </div>

              {/* Grid 4 Slot Thumbnail */}
              <div className="grid grid-cols-4 gap-2">
                {[1, 2, 3, 4].map((num) => {
                  const isDone = num <= shotCount
                  return (
                    <div
                      key={num}
                      className={`h-20 rounded-lg border-2 flex flex-col items-center justify-center transition-all ${
                        isDone
                          ? 'border-emerald-500 bg-emerald-950/40 text-emerald-400'
                          : 'border-stone-700 bg-stone-800/60 text-stone-400'
                      }`}
                    >
                      <span className="text-base font-bold">#{num}</span>
                      <span className="text-base">{isDone ? '✓' : '—'}</span>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Opsi Kontrol Tambahan */}
            <div className="mt-6 space-y-3">
              <button
                type="button"
                className="w-full min-h-[48px] px-4 py-2.5 rounded-xl bg-stone-700/80 hover:bg-stone-700 text-stone-200 text-base font-semibold border border-stone-600 flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
              >
                🔄 Putar Kamera (Depan / Belakang)
              </button>
            </div>
          </div>

          {/* Baris Tombol Aksi Bawah */}
          <div className="mt-6 pt-4 border-t border-stone-700/60 flex flex-col gap-3">
            <button
              type="button"
              onClick={onNext}
              className="w-full min-h-[52px] px-6 py-3 rounded-xl bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white text-base font-bold tracking-wide shadow-lg shadow-rose-600/30 transition-all duration-200 active:scale-[0.98] flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-rose-400"
            >
              ⚡ Mulai Ambil 4 Foto
            </button>

            <button
              type="button"
              onClick={onBack}
              className="w-full min-h-[44px] px-4 py-2.5 rounded-xl bg-transparent hover:bg-stone-700/50 text-stone-300 hover:text-white text-base font-semibold transition-all"
            >
              ← Kembali ke Pilih Tema
            </button>
          </div>
        </div>

      </div>
    </div>
  )
}
