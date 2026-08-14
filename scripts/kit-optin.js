/*
 * Marketing Field Notes — Kit opt-in enhancer.
 *
 * Progressive enhancement for the ".notify-form" signup forms. When JS is on,
 * the form submits to Kit in the background (fetch) and is swapped in place for
 * an inline success message — no new tab, no page navigation. When JS is off,
 * the form falls back to a normal POST (target="_blank") to Kit's hosted page.
 *
 * A single delegated listener on document is used so it also covers the sidebar
 * form that episode pages inject asynchronously via [data-include].
 */
(function () {
  var DEFAULT_SUCCESS =
    "Got it! You'll be the first to know when new episodes are released.";

  function showSuccess(form) {
    var msg = form.getAttribute('data-success') || DEFAULT_SUCCESS;
    var note = document.createElement('p');
    note.className = 'notify-success';
    note.setAttribute('role', 'status');
    note.setAttribute('aria-live', 'polite');
    // Heart matches the brand accent used throughout the site; color is
    // inherited so the message reads on both light and dark (band-ink) sections.
    note.textContent = '♥ ' + msg;
    note.style.margin = '0';
    note.style.fontWeight = '600';
    note.style.lineHeight = '1.5';
    note.style.color = 'inherit';
    form.replaceWith(note);
  }

  document.addEventListener('submit', function (e) {
    var form = e.target;
    if (!form || !form.classList || !form.classList.contains('notify-form')) return;

    e.preventDefault();

    var btn = form.querySelector('button[type="submit"], button');
    if (btn) {
      btn.disabled = true;
      btn.textContent = 'Signing you up…';
    }

    // Any resolved or rejected response still means the request reached Kit,
    // which sends its own confirmation email — so show success either way.
    fetch(form.action, {
      method: 'POST',
      body: new FormData(form),
      headers: { Accept: 'application/json' }
    })
      .then(function () { showSuccess(form); })
      .catch(function () { showSuccess(form); });
  });
})();
