import koreanStrip from './korean-strip.json'
import y2kCyber from './y2k-cyber.json'
import retroFilm from './retro-film.json'
import kampusMerdeka from './kampus-merdeka.json'

// Daftar tema foto berbasis data file JSON mandiri
export const THEMES = [
  koreanStrip,
  y2kCyber,
  retroFilm,
  kampusMerdeka,
]

export const getThemeById = (id) => {
  return THEMES.find((theme) => theme.id === id) || THEMES[0]
}
