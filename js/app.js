/**
 * PT Ziflazz Premium Server - Payment Page Logic
 * Implements Clipboard API with fallback, toast notifications, download trigger, and dark mode.
 */

document.addEventListener('DOMContentLoaded', () => {
  // Elements
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const themeIconSun = document.getElementById('themeIconSun');
  const themeIconMoon = document.getElementById('themeIconMoon');
  const toast = document.getElementById('toastNotification');
  const toastText = document.getElementById('toastText');
  const copyButtons = document.querySelectorAll('[data-copy-target]');
  const downloadQrisBtn = document.getElementById('downloadQrisBtn');

  let toastTimer = null;

  /* --------------------------------------------------------------------------
     Theme Management (Light / Dark Mode - PRD F7)
     -------------------------------------------------------------------------- */
  function getPreferredTheme() {
    const savedTheme = localStorage.getItem('ziflazz_theme');
    if (savedTheme) {
      return savedTheme;
    }
    // Check if initial HTML already specified a theme
    const htmlTheme = document.documentElement.getAttribute('data-theme');
    if (htmlTheme) {
      return htmlTheme;
    }
    // Check system preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    // Default is light according to PRD
    return 'light';
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('ziflazz_theme', theme);

    if (theme === 'dark') {
      if (themeIconSun) themeIconSun.style.display = 'block';
      if (themeIconMoon) themeIconMoon.style.display = 'none';
      if (themeToggleBtn) themeToggleBtn.setAttribute('aria-label', 'Aktifkan mode terang');
    } else {
      if (themeIconSun) themeIconSun.style.display = 'none';
      if (themeIconMoon) themeIconMoon.style.display = 'block';
      if (themeToggleBtn) themeToggleBtn.setAttribute('aria-label', 'Aktifkan mode gelap');
    }
  }

  // Initialize theme
  applyTheme(getPreferredTheme());

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      applyTheme(newTheme);
      showToast(newTheme === 'dark' ? 'Mode gelap aktif' : 'Mode terang aktif');
    });
  }

  /* --------------------------------------------------------------------------
     Toast Notification System (PRD F5)
     -------------------------------------------------------------------------- */
  function showToast(message) {
    if (!toast) return;

    if (toastText) {
      toastText.textContent = message;
    }

    toast.classList.add('show');

    // Trigger haptic feedback if available on mobile
    if (navigator.vibrate) {
      navigator.vibrate(25);
    }

    if (toastTimer) {
      clearTimeout(toastTimer);
    }

    toastTimer = setTimeout(() => {
      toast.classList.remove('show');
    }, 2500);
  }

  /* --------------------------------------------------------------------------
     Robust Copy with Fallback (PRD F2, F3)
     -------------------------------------------------------------------------- */
  async function copyTextToClipboard(text) {
    if (navigator.clipboard && window.isSecureContext) {
      try {
        await navigator.clipboard.writeText(text);
        return true;
      } catch (err) {
        console.warn('Clipboard API failed, trying fallback execCommand', err);
      }
    }

    // Fallback using invisible textarea
    try {
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.top = '-9999px';
      textArea.style.left = '-9999px';
      textArea.setAttribute('readonly', '');
      document.body.appendChild(textArea);
      textArea.select();
      const successful = document.execCommand('copy');
      document.body.removeChild(textArea);
      return successful;
    } catch (err) {
      console.error('Fallback execCommand copy error:', err);
      return false;
    }
  }

  /* --------------------------------------------------------------------------
     Copy Button Interaction Handlers
     -------------------------------------------------------------------------- */
  copyButtons.forEach((btn) => {
    btn.addEventListener('click', async () => {
      const targetText = btn.getAttribute('data-copy-target');
      const label = btn.getAttribute('data-copy-label') || 'Nomor';

      if (!targetText) return;

      const success = await copyTextToClipboard(targetText);

      if (success) {
        // Visual feedback on button
        const originalContent = btn.innerHTML;
        btn.classList.add('copied');
        btn.innerHTML = `
          <svg viewBox="0 0 24 24" stroke="currentColor" fill="none" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="width:14px;height:14px;">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
          <span>Tersalin</span>
        `;

        showToast(`${label} berhasil disalin!`);

        setTimeout(() => {
          btn.classList.remove('copied');
          btn.innerHTML = originalContent;
        }, 2000);
      } else {
        showToast('Gagal menyalin. Silakan salin secara manual.');
      }
    });
  });

  /* --------------------------------------------------------------------------
     QRIS Download Handler (PRD F4)
     -------------------------------------------------------------------------- */
  if (downloadQrisBtn) {
    downloadQrisBtn.addEventListener('click', () => {
      showToast('Mengunduh kode QRIS...');
    });
  }
});
