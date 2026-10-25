import React, { useState } from 'react'

// Komponen Layar 3: Hasil & Editor
export default function ResultScreen({ onRestart, selectedTheme }) {
  const [activeFilter, setActiveFilter] = useState('normal')

  const filterList = [
    { id: 'normal', name: 'Asli' },
    { id: 'korean-glow', name: 'Korean Soft' },
    { id: 'bw', name: 'Monokrom' },
    { id: 'retro', name: 'Retro Warm' },
    { id: 'y2k', name: 'Y2K Cyber' },
  ]

  return (
    <div className="w-full flex-1 flex flex-col justify-between overflow-x-hidden p-4 md:p-6 lg:p-8">
      {/* Konten Utama Responsif:
          - Mobile: 1 kolom (preview atas/tengah, kontrol di bawah)
          - Tablet: landscape 2 kolom / portrait 1 kolom
          - Desktop: 2 kolom (preview kiri, panel alat di kanan)
      */}
      <div className="w-full flex-1 flex flex-col lg:flex-row gap-6 items-stretch justify-center max-w-7xl mx-auto">
        
        {/* Kolom Kiri: Pratinjau Kanvas Hasil Foto */}
        <div className="w-full lg:w-1/2 flex flex-col items-center justify-center bg-stone-950/70 rounded-2xl p-6 border border-stone-800 shadow-2xl">
          <span className="text-stone-400 font-medium mb-3 text-base">
            Pratinjau Hasil Cetak Kanvas
          </span>

          {/* Pratinjau Strip Foto */}
          <div className="w-56 sm:w-64 md:w-72 bg-amber-50 text-stone-900 p-4 rounded-xl shadow-2xl border border-stone-300 flex flex-col items-center gap-3 transition-transform hover:scale-[1.01]">
            <div className="w-full flex justify-between items-center px-1 text-base font-bold text-stone-700">
              <span>PHOTO STRIP</span>
              <span>4 CUTS</span>
            </div>

            {/* 4 Simulasi Foto Hasil Jepretan */}
            <div className="w-full h-24 sm:h-28 bg-stone-200 rounded border border-stone-300 flex items-center justify-center text-stone-700 font-semibold text-base">
              Foto 1
            </div>
            <div className="w-full h-24 sm:h-28 bg-stone-200 rounded border border-stone-300 flex items-center justify-center text-stone-700 font-semibold text-base">
              Foto 2
            </div>
            <div className="w-full h-24 sm:h-28 bg-stone-200 rounded border border-stone-300 flex items-center justify-center text-stone-700 font-semibold text-base">
              Foto 3
            </div>
            <div className="w-full h-24 sm:h-28 bg-stone-200 rounded border border-stone-300 flex items-center justify-center text-stone-700 font-semibold text-base">
              Foto 4
            </div>

            <div className="text-center pt-2 border-t border-stone-300 w-full">
              <p className="text-base font-bold tracking-widest text-stone-700">MAHASISWA PHOTOBOOTH</p>
              <p className="text-base text-stone-500">Jakarta, 2026</p>
            </div>
          </div>
        </div>

        {/* Kolom Kanan / Panel Alat & Ekspor */}
        <div className="w-full lg:w-1/2 flex flex-col justify-between bg-stone-800/60 rounded-2xl p-6 border border-stone-700/50">
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">Sesuaikan & Simpan</h2>
            <p className="text-base text-stone-300 mb-6">
              Pilih filter warna, stiker, dan unduh foto resolusi tinggi ke galeri perangkatmu.
            </p>

            {/* Bagian Pilihan Filter */}
            <div className="mb-6">
              <label className="block text-base font-semibold text-stone-200 mb-3">
                Pilih Filter Foto
              </label>
              <div className="flex flex-wrap gap-2.5">
                {filterList.map((filter) => {
                  const isActive = filter.id === activeFilter
                  return (
                    <button
                      key={filter.id}
                      type="button"
                      onClick={() => setActiveFilter(filter.id)}
                      className={`min-h-[44px] px-4 py-2 rounded-xl text-base font-semibold transition-all border ${
                        isActive
                          ? 'bg-rose-500 text-white border-rose-400 shadow-md shadow-rose-900/50'
                          : 'bg-stone-800 text-stone-300 border-stone-700 hover:border-stone-500 hover:text-white'
                      }`}
                    >
                      {filter.name}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Informasi Privasi Klien */}
            <div className="p-4 rounded-xl bg-stone-900/60 border border-stone-800 text-stone-300 text-base flex items-start gap-3">
              <span className="text-xl">🔒</span>
              <p>
                Foto diproses sepenuhnya di browser tanpa diunggah ke server mana pun. Privasimu 100% terjaga.
              </p>
            </div>
          </div>

          {/* Baris Tombol Aksi Ekspor */}
          <div className="mt-6 pt-4 border-t border-stone-700/60 flex flex-col gap-3">
            <button
              type="button"
              className="w-full min-h-[50px] px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white text-base font-bold tracking-wide shadow-lg shadow-emerald-700/30 transition-all duration-200 active:scale-[0.98] flex items-center justify-center gap-2"
            >
              📥 Unduh Foto Strip (PNG)
            </button>

            <button
              type="button"
              className="w-full min-h-[48px] px-6 py-2.5 rounded-xl bg-stone-700 hover:bg-stone-600 text-stone-100 text-base font-bold transition-all duration-200 flex items-center justify-center gap-2"
            >
              📤 Bagikan Foto
            </button>

            <button
              type="button"
              onClick={onRestart}
              className="w-full min-h-[44px] px-4 py-2 rounded-xl bg-transparent hover:bg-stone-700/40 text-stone-400 hover:text-stone-200 text-base font-semibold transition-all mt-1"
            >
              ↺ Buat Foto Baru (Mulai dari Awal)
            </button>
          </div>
        </div>

      </div>
    </div>
  )
}
