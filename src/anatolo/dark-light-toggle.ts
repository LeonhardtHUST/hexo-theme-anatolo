function getTheme() {
  return document.querySelector('html')!.getAttribute('theme') ?? 'default';
}

function setTheme() {
  const theme = localStorage.getItem('theme');
  if (theme) {
    document.querySelector('html')!.setAttribute('theme', theme);
    const beaudarIframe = document.querySelector('.beaudar-frame');
    // 与 beaudar 通信
    if (beaudarIframe != null && (beaudarIframe as any).contentWindow) {
      (beaudarIframe as any).contentWindow.postMessage({
        type: 'set-theme',
        theme: `github-${theme}`
      }, 'https://beaudar.lipk.org');
    }
  }
}

setTheme();

export function darkLightToggle() {
  let themeNow = getTheme();
  if (themeNow === 'default') {
    themeNow = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'true';
  }
  if (themeNow === 'dark') {
    localStorage.setItem('theme', 'light');
  } else {
    localStorage.setItem('theme', 'dark');
  }
  setTheme();
}

export function darkLightSync() {
  let themeNow = getTheme();
  if (themeNow === 'default') {
    themeNow = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'true';
  }
  localStorage.setItem('theme', themeNow);
  setTheme();
}
