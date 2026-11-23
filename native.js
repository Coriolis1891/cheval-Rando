/* Sentiers à Cheval — pont avec l'application iPhone (Capacitor).
 * Dans le navigateur, rien ne change : NATIVE vaut false et on utilise le GPS du navigateur.
 * Dans l'application installée :
 *  - GPS en arrière-plan (écran verrouillé, téléphone en poche) via le module BackgroundGeolocation ;
 *  - partage et export de fichiers (GPX, liens) via la feuille de partage d'iOS.
 */
'use strict';

const CAP = window.Capacitor;
const NATIVE = !!CAP?.isNativePlatform?.();
const nativePlugin = (name) => (NATIVE && CAP.registerPlugin ? CAP.registerPlugin(name) : null);
const BgGeo = nativePlugin('BackgroundGeolocation');
const NativeShare = nativePlugin('Share');
const NativeFs = nativePlugin('Filesystem');
/** Adresse publique de l'application (pour les liens partagés depuis l'application installée). */
const WEB_URL = 'https://coriolis1891.github.io/cheval-Rando/';
if (NATIVE) document.documentElement.classList.add('native');

/**
 * Suit la position. Renvoie { stop() }.
 * onPos reçoit un objet au format du navigateur ({ coords, timestamp }) ;
 * onErr reçoit { code } (1 = autorisation refusée).
 */
function watchGeo(onPos, onErr) {
  if (!BgGeo) {
    const id = navigator.geolocation.watchPosition(onPos, onErr, { enableHighAccuracy: true, maximumAge: 1000 });
    return { stop: () => navigator.geolocation.clearWatch(id) };
  }
  let id = null, stopped = false;
  BgGeo.addWatcher({
    backgroundTitle: 'Sentiers à Cheval',
    backgroundMessage: 'Enregistrement de votre balade en cours',
    requestPermissions: true, stale: false, distanceFilter: 0,
  }, (loc, err) => {
    if (stopped) return;
    if (err) {
      if (err.code === 'NOT_AUTHORIZED' && confirm('Sentiers à Cheval a besoin de votre position.\n\nOuvrir les Réglages pour l’autoriser ?')) BgGeo.openSettings();
      onErr?.({ code: err.code === 'NOT_AUTHORIZED' ? 1 : 2, message: err.message });
      return;
    }
    if (!loc) return;
    onPos({
      timestamp: loc.time || Date.now(),
      coords: { latitude: loc.latitude, longitude: loc.longitude, accuracy: loc.accuracy, altitude: loc.altitude,
        altitudeAccuracy: loc.altitudeAccuracy, heading: loc.bearing, speed: loc.speed },
    });
  }).then((w) => { id = w; if (stopped) BgGeo.removeWatcher({ id }); }, (e) => onErr?.({ code: 2, message: String(e) }));
  return { stop: () => { stopped = true; if (id) BgGeo.removeWatcher({ id }); } };
}

/** Partage d'un fichier texte (GPX, JSON) par la feuille de partage d'iOS. Renvoie false hors application. */
async function nativeShareFile(text, filename, title) {
  if (!NativeShare || !NativeFs) return false;
  const { uri } = await NativeFs.writeFile({ path: filename, data: text, directory: 'CACHE', encoding: 'utf8' });
  try { await NativeShare.share({ title: title || filename, url: uri }); } catch (e) { if (!/cancel/i.test(String(e?.message || e))) throw e; }
  return true;
}
/** Partage d'un lien. Renvoie false hors application. */
async function nativeShareLink(title, text, url) {
  if (!NativeShare) return false;
  try { await NativeShare.share({ title, text, url }); } catch (e) { if (!/cancel/i.test(String(e?.message || e))) throw e; }
  return true;
}
