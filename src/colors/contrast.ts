import { contrastRatio } from './culori';
import type { HexColor } from './hex';
import { normalizeHexColorOrThrow } from './hex';

export interface ReadableForegroundResult {
  foreground: HexColor;
  contrast: number;
}

const BLACK = normalizeHexColorOrThrow('#000000');
const WHITE = normalizeHexColorOrThrow('#FFFFFF');

export function getReadableForeground(background: HexColor): ReadableForegroundResult {
  const contrastOnBlack = contrastRatio(background, BLACK);
  const contrastOnWhite = contrastRatio(background, WHITE);

  if (contrastOnBlack >= contrastOnWhite) {
    return { foreground: BLACK, contrast: contrastOnBlack };
  }

  return { foreground: WHITE, contrast: contrastOnWhite };
}
