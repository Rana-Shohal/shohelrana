/**
 * Custom line-art icon set — consistent 1.6px stroke, 24x24 grid.
 * Kept as inline SVG strings so they inherit `currentColor` and
 * can be recolored purely through CSS.
 */
const ICONS = {
  about: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="3" y="3" width="18" height="18" rx="4" stroke="currentColor" stroke-width="1.6"/>
    <circle cx="12" cy="9.6" r="2.6" stroke="currentColor" stroke-width="1.6"/>
    <path d="M6.5 18c1-2.6 3.1-4 5.5-4s4.5 1.4 5.5 4" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>
  </svg>`,

  files: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 6.5C3 5.67 3.67 5 4.5 5h4.4c.5 0 .96.25 1.24.66l.9 1.34H19.5c.83 0 1.5.67 1.5 1.5v9c0 .83-.67 1.5-1.5 1.5h-15C3.67 19 3 18.33 3 17.5v-11z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/>
    <path d="M7.5 12.5h9" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>
  </svg>`,

  pictures: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="3" y="4.5" width="18" height="15" rx="2" stroke="currentColor" stroke-width="1.6"/>
    <circle cx="8.3" cy="9.3" r="1.6" stroke="currentColor" stroke-width="1.6"/>
    <path d="M4 17l5.2-5.2c.6-.6 1.5-.6 2.1 0L15 15.5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M12.5 15L15.6 12c.6-.6 1.5-.6 2.1 0L20.5 14.7" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`,

  experience: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="3" y="8" width="18" height="11" rx="2" stroke="currentColor" stroke-width="1.6"/>
    <path d="M8.5 8V6.5c0-.83.67-1.5 1.5-1.5h4c.83 0 1.5.67 1.5 1.5V8" stroke="currentColor" stroke-width="1.6"/>
    <path d="M3 12.8c2.6 1.3 5.7 2 9 2s6.4-.7 9-2" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>
  </svg>`,

  projects: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="3" y="3" width="13" height="10" rx="1.6" stroke="currentColor" stroke-width="1.6"/>
    <path d="M8 17.5h9c1.1 0 2-.9 2-2v-6" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>
    <path d="M6.3 8.3l-1.6 1.7 1.6 1.7M10.7 8.3l1.6 1.7-1.6 1.7" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`,

  contact: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="3" y="5.5" width="18" height="13" rx="2" stroke="currentColor" stroke-width="1.6"/>
    <path d="M4 7l7.3 5.4a1.2 1.2 0 0 0 1.4 0L20 7" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`,

  skills: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="7" y="7" width="10" height="10" rx="1.6" stroke="currentColor" stroke-width="1.6"/>
    <rect x="10" y="10" width="4" height="4" rx="0.8" stroke="currentColor" stroke-width="1.4"/>
    <path d="M12 3.5v2.3M12 18.2v2.3M3.5 12h2.3M18.2 12h2.3M6 6l1.6 1.6M16.4 16.4L18 18M18 6l-1.6 1.6M7.6 16.4L6 18" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/>
  </svg>`,

  education: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 4L2.5 8.6 12 13.2l9.5-4.6L12 4z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/>
    <path d="M6.5 10.8V15c0 1.4 2.5 3 5.5 3s5.5-1.6 5.5-3v-4.2" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>
    <path d="M21.5 8.6V14" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>
  </svg>`,

  edit: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 20l0.9-3.6L15.5 5.8a1.6 1.6 0 0 1 2.3 0l0.4.4a1.6 1.6 0 0 1 0 2.3L7.6 19.1 4 20z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/>
    <path d="M14.2 7.1l2.7 2.7" stroke="currentColor" stroke-width="1.6"/>
  </svg>`,

  camera: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 8.5c0-.83.67-1.5 1.5-1.5h2l1-1.5h7l1 1.5h2c.83 0 1.5.67 1.5 1.5v9c0 .83-.67 1.5-1.5 1.5h-13A1.5 1.5 0 0 1 4 17.5v-9z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/>
    <circle cx="12" cy="13" r="3.3" stroke="currentColor" stroke-width="1.6"/>
  </svg>`,

  plus: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 5v14M5 12h14" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>`,
  trash: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 7h14M9.5 7V5.2c0-.66.54-1.2 1.2-1.2h2.6c.66 0 1.2.54 1.2 1.2V7M7 7l.7 12.1c.05.9.8 1.6 1.7 1.6h5.2c.9 0 1.65-.7 1.7-1.6L17 7" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>`,

  close: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>`,
  minimize: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 18h12" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>`,

  external: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 6H6a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-3" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/><path d="M14 4h6v6M20 4l-9 9" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>`,

  download: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 4v11" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/><path d="M7.5 11.5L12 16l4.5-4.5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/><path d="M4.5 18h15" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>`,
};
