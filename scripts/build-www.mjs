// Prépare le dossier « www » embarqué dans l'application iPhone :
// copie de l'application web + Leaflet en local (l'application démarre sans réseau).
import { cpSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';

const OUT = 'www';
const FILES = ['index.html', 'style.css', 'app.js', 'extras.js', 'rides.js', 'reports.js', 'native.js', 'manifest.webmanifest'];
const DIRS = ['icons', 'profiles'];

rmSync(OUT, { recursive: true, force: true });
mkdirSync(OUT, { recursive: true });
FILES.forEach((f) => cpSync(f, `${OUT}/${f}`));
DIRS.forEach((d) => cpSync(d, `${OUT}/${d}`, { recursive: true }));
cpSync('node_modules/leaflet/dist', `${OUT}/vendor/leaflet`, { recursive: true });

const html = readFileSync(`${OUT}/index.html`, 'utf8')
  .replaceAll('https://unpkg.com/leaflet@1.9.4/dist/', 'vendor/leaflet/');
if (html.includes('unpkg.com/leaflet')) throw new Error('Leaflet : lien non remplacé');
writeFileSync(`${OUT}/index.html`, html);
console.log('www prêt');
