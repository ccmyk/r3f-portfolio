// src/lib/responsive.ts 

interface DesignConfig {
  L: {
    w: number
    h: number
    multi: number
    total: number
    ratio: number
  }
  P: {
    w: number
    h: number
    multi: number
    total: number
  }
}

export const designConfig: DesignConfig = {
  L: {
    w: 1440,
    h: 800,
    multi: 0.4,
    total: 0,
    ratio: 5.56
  },
  P: {
    w: 390,
    h: 640,
    multi: 0.4,
    total: 0
  }
}

export function initializeResponsiveSystem() {
  // Calculate responsive multipliers
  designConfig.L.total = (designConfig.L.w / window.innerWidth) * 10
  designConfig.L.total = 10 - ((10 - designConfig.L.total) * designConfig.L.multi)
  designConfig.L.total = Math.min(10, designConfig.L.total)

  designConfig.P.total = (designConfig.P.w / window.innerWidth) * 10
  designConfig.P.total = 10 - ((10 - designConfig.P.total) * designConfig.P.multi)
  designConfig.P.total = Math.min(10, designConfig.P.total)

  // Set CSS custom properties
  document.documentElement.style.setProperty('--ck_multiL', designConfig.L.total.toString())
  document.documentElement.style.setProperty('--ck_multiP', designConfig.P.total.toString())
  document.documentElement.style.setProperty('--ck_hvar', `${window.innerHeight}px`)
  document.documentElement.style.setProperty('--ck_accent', '#fff')
  document.documentElement.style.setProperty('--ck_other', '#050505')

  // Device detection classes
  const isTouch = 'ontouchstart' in window
  if (isTouch) {
    document.documentElement.classList.add('T')
    document.documentElement.style.setProperty('--ck_hscr', `${window.screen.height}px`)
  } else {
    document.documentElement.classList.add('D')
    document.documentElement.style.setProperty('--ck_hscr', `${window.innerHeight}px`)
  }
}

export function updateResponsiveSystem() {
  initializeResponsiveSystem()
}
