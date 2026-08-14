/**
 * Composes the 1200x630 Open Graph card served with every page.
 *
 * Nothing in `assets/` is that shape, and a card is the one image whose only job is being
 * scraped, so it is generated rather than art-directed: the white wordmark centred on the
 * brand navy. Run after changing the logo or the brand colour:
 *
 *   npm run og
 *
 * Output is committed — it changes about as often as the logo does, and generating it during
 * `npm run build` would put sharp on the deploy path for one static file.
 *
 * PNG rather than WebP: several link-preview scrapers still reject WebP.
 */
import { mkdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const ROOT = path.resolve(import.meta.dirname, "..");

const WIDTH = 1200;
const HEIGHT = 630;
/** `--bg-navy` in src/styles/global.css. */
const BACKGROUND = { r: 0x1c, g: 0x23, b: 0x40, alpha: 1 };
/** Leaves the wordmark a little over half the card's width, which keeps it legible at the
 * ~500px Slack and WhatsApp render it down to. */
const LOGO_WIDTH = 660;

const source = path.join(ROOT, "assets", "logo", "CLS_Logo_white.png");
const target = path.join(ROOT, "public", "brand", "og", "og-default.png");

const logo = await sharp(source).resize({ width: LOGO_WIDTH }).toBuffer();
const { height: logoHeight } = await sharp(logo).metadata();

await mkdir(path.dirname(target), { recursive: true });

const { size } = await sharp({
  create: { width: WIDTH, height: HEIGHT, channels: 4, background: BACKGROUND },
})
  .composite([
    {
      input: logo,
      left: Math.round((WIDTH - LOGO_WIDTH) / 2),
      top: Math.round((HEIGHT - logoHeight) / 2),
    },
  ])
  .png({ compressionLevel: 9 })
  .toFile(target);

console.log(`${path.relative(ROOT, target)}  ${WIDTH}x${HEIGHT}  ${(size / 1024).toFixed(0)} kB`);
