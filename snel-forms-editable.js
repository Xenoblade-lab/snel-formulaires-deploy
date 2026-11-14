/**
 * Transforme cases vides et pointillés en champs <input> / bandes saisissables.
 * À charger sur les pages *-editable.html uniquement.
 */
(function () {
  'use strict';

  function ncellsFromStrip(el) {
    const d = el.getAttribute('data-ncells');
    if (d) return Math.max(0, parseInt(d, 10));
    const t = el.getAttribute('title') || '';
    const m = t.match(/(\d+)/);
    return m ? parseInt(m[1], 10) : 0;
  }

  function replaceCellStrips() {
    document.querySelectorAll('.cell-strip').forEach(function (strip) {
      var n = ncellsFromStrip(strip);
      if (n < 1) return;
      var wrap = document.createElement('span');
      wrap.className = 'cells cells--inputs';
      for (var i = 0; i < n; i++) {
        var inp = document.createElement('input');
        inp.type = 'text';
        inp.className = 'cell in-cell';
        inp.maxLength = 1;
        inp.setAttribute('autocomplete', 'off');
        inp.setAttribute('spellcheck', 'false');
        wrap.appendChild(inp);
      }
      strip.replaceWith(wrap);
    });
  }

  function replaceSpanCells() {
    document.querySelectorAll('.cells .cell').forEach(function (cell) {
      if (cell.tagName !== 'SPAN') return;
      var inp = document.createElement('input');
      inp.type = 'text';
      inp.className = 'cell in-cell';
      inp.maxLength = 1;
      inp.setAttribute('autocomplete', 'off');
      inp.setAttribute('spellcheck', 'false');
      cell.replaceWith(inp);
    });
  }

  function replaceDots() {
    document.querySelectorAll('span.dots, span.exec-dots').forEach(function (el) {
      var inp = document.createElement('input');
      inp.type = 'text';
      inp.className = 'field-line';
      if (el.classList.contains('exec-dots')) inp.classList.add('exec-dots');
      else inp.classList.add('dots-field');
      var st = el.getAttribute('style');
      if (st) inp.setAttribute('style', st);
      el.replaceWith(inp);
    });
  }

  function wireAutoTabInCellGroup() {
    document.querySelectorAll('.cells').forEach(function (group) {
      var inputs = group.querySelectorAll('.in-cell');
      inputs.forEach(function (inp) {
        inp.addEventListener('input', function () {
          if (inp.value.length >= inp.maxLength) {
            var next = inp.nextElementSibling;
            if (next && next.classList && next.classList.contains('in-cell')) next.focus();
          }
        });
        inp.addEventListener('keydown', function (e) {
          if (e.key === 'Backspace' && inp.value === '') {
            var prev = inp.previousElementSibling;
            if (prev && prev.classList && prev.classList.contains('in-cell')) {
              prev.focus();
              e.preventDefault();
            }
          }
        });
      });
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    if (!document.body.classList.contains('form-saisie')) return;
    replaceCellStrips();
    replaceSpanCells();
    replaceDots();
    wireAutoTabInCellGroup();
  });
})();
