/**
 * Génère le QR dans .form-qr-mount (pages *-editable-qr.html).
 * Texte encodé : attribut body data-qr-text (non vide), sinon URL de la page.
 * Requiert qrcodejs (global QRCode) chargé avant ce fichier.
 */
(function () {
  'use strict';

  function encodedText() {
    var raw = document.body.getAttribute('data-qr-text');
    if (raw != null && String(raw).trim() !== '') return String(raw).trim();
    return String(window.location.href.split('#')[0]);
  }

  document.addEventListener('DOMContentLoaded', function () {
    var mount = document.querySelector('.form-qr-mount');
    if (!mount) return;
    if (typeof QRCode === 'undefined') {
      mount.textContent = 'QR';
      return;
    }
    var text = encodedText();
    mount.innerHTML = '';
    try {
      new QRCode(mount, {
        text: text,
        width: 72,
        height: 72,
        correctLevel: QRCode.CorrectLevel.M,
        colorDark: '#000000',
        colorLight: '#ffffff'
      });
    } catch (e) {
      mount.textContent = 'QR';
    }
  });
})();
