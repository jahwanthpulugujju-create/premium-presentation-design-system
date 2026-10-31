/**
 * PPD's first reference art direction: restrained editorial, warm paper and ink.
 * These tokens are deliberately not a universal preset; each deck should define
 * its own Deck DNA after the art-direction phase.
 */
export const ppdTokens = {
  page: { width: 13.333, height: 7.5 },
  color: {
    ink: "121B20",
    inkSoft: "26343B",
    paper: "F3F0E7",
    paperDeep: "E8E3D7",
    white: "FFFFFF",
    muted: "7D898A",
    mutedLight: "B8C0B8",
    accent: "D4EF70",
    accentDeep: "A5BE4D",
    line: "C8C7BC",
    bar: "9AA5A0",
  },
  font: {
    display: "Georgia",
    body: "Arial",
    mono: "Courier New",
  },
  spacing: {
    pageX: 0.72,
    top: 0.52,
    footerY: 7.08,
  },
} as const;
