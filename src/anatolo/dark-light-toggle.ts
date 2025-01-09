function getTheme() {
  return document.querySelector('html')!.getAttribute('theme') ?? 'default';
}

function setTheme() {
  const theme = localStorage.getItem('theme');
  if (theme) {
    document.querySelector('html')!.setAttribute('theme', theme);
    const utrcIframe = document.querySelector('.utterances-frame');
    if (utrcIframe != null && (utrcIframe as any).contentWindow) {
      (utrcIframe as any).contentWindow.postMessage({
        type: 'set-theme',
        theme: `github-${theme}`
      }, 'https://utteranc.es');
    }
  }
}

setTheme();

export function darkLightGet() {
  let themeNow = getTheme();
  if (themeNow === 'default')
    themeNow = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  return themeNow;
}

export function darkLightToggle() {
  if (darkLightGet() === 'dark') {
    localStorage.setItem('theme', 'light');
  } else {
    localStorage.setItem('theme', 'dark');
  }
  setTheme();
}
