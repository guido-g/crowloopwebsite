/**
 * Regenerates every served image in `public/` from the originals in `assets/`.
 *
 * `assets/` is the source of truth and is never served; `public/` holds only
 * web-sized derivatives. Run after adding or replacing an original:
 *
 *   npm run images
 *
 * Output is committed, so this does not run during `npm run build` — the build
 * stays fast and the size win is visible in the PR diff.
 *
 * Target sizes come from how each image is actually laid out (see the CSS
 * reference on each job below), doubled for 2x displays. Nothing is ever
 * upscaled: `withoutEnlargement` keeps sources smaller than their target at
 * native size.
 */
import { mkdir, readdir, rm, stat } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const ROOT = path.resolve(import.meta.dirname, "..");
const asset = (...p) => path.join(ROOT, "assets", ...p);
const publish = (...p) => path.join(ROOT, "public", ...p);

let written = 0;
let bytesIn = 0;
let bytesOut = 0;

async function emit(from, to, { width, quality, format = "webp" }) {
  await mkdir(path.dirname(to), { recursive: true });

  const pipeline = sharp(from).resize({ width, withoutEnlargement: true });
  const output =
    format === "webp"
      ? pipeline.webp({ quality, effort: 6 })
      : pipeline.png({ compressionLevel: 9, palette: true });

  const { size: outSize } = await output.toFile(to);
  const { size: inSize } = await stat(from);

  bytesIn += inSize;
  bytesOut += outSize;
  written += 1;

  const saved = Math.round((1 - outSize / inSize) * 100);
  console.log(
    `  ${path.relative(ROOT, to).padEnd(52)} ${kb(inSize).padStart(8)} -> ${kb(outSize).padStart(8)}  (-${saved}%)`,
  );
}

const kb = (bytes) => `${(bytes / 1024).toFixed(0)} kB`;

const pngsIn = async (dir) =>
  (await readdir(dir)).filter((f) => /\.(png|jpe?g)$/i.test(f)).sort();

const baseName = (file) => file.replace(/\.(png|jpe?g)$/i, "");

async function main() {
  // Start clean so renamed or deleted originals never leave orphans behind.
  await rm(publish("brand"), { recursive: true, force: true });
  await rm(publish("portfolio"), { recursive: true, force: true });

  // Hero backdrop — `.hero__backdrop` is full-bleed with `object-fit: cover`,
  // and it is the LCP element, so it is the one image that ships a srcset.
  // The original is 1920x1080, so no variant upscales.
  console.log("hero");
  for (const width of [768, 1280, 1920]) {
    await emit(asset("img", "HeroImage.png"), publish("brand", "hero", `hero-${width}.webp`), {
      width,
      quality: 72,
    });
  }

  // Russel mascot — largest render is `.russel-hero__portrait-wrap` at 9.5rem
  // (152px), so 320px covers 2x. Originals are 1024x1024.
  console.log("russel");
  for (const file of await pngsIn(asset("russel"))) {
    await emit(asset("russel", file), publish("brand", "russel", `${baseName(file)}.webp`), {
      width: 320,
      quality: 80,
    });
  }

  // Client brand marks — `.brands-strip__list li` is a fixed 6.25rem (100px)
  // box with `object-fit: contain`, so 200px covers 2x.
  console.log("brands");
  for (const file of await pngsIn(asset("img", "brands"))) {
    await emit(
      asset("img", "brands", file),
      publish("brand", "brands", `${baseName(file).toLowerCase()}.webp`),
      { width: 200, quality: 80 },
    );
  }

  // Studio wordmark — header renders at height 48, footer at 40; the original
  // is 922x414, so 320px wide covers 2x for both. Higher quality than photos
  // because it carries small lettering. Only the two variants the site
  // actually references are published; the rest stay in assets/.
  console.log("logo");
  for (const file of ["CLS_Logo_Main.png", "CLS_Logo_white.png"]) {
    await emit(asset("logo", file), publish("brand", "logo", `${baseName(file)}.webp`), {
      width: 320,
      quality: 85,
    });
  }

  // Favicon and touch icon stay PNG for compatibility. The source is a
  // 2048x2048 logo that was previously served whole as the favicon.
  await emit(asset("logo", "CLS_Logo_Main_image.png"), publish("brand", "logo", "favicon-96.png"), {
    width: 96,
    format: "png",
  });
  await emit(
    asset("logo", "CLS_Logo_Main_image.png"),
    publish("brand", "logo", "apple-touch-icon-180.png"),
    { width: 180, format: "png" },
  );

  // Portfolio covers render in `.project-card__thumb` (16/10, `object-fit:
  // cover`) at roughly 370px in the widest grid; galleries render in a
  // two-column 4/3 grid inside a 1200px container. 800px covers 2x for both,
  // and several originals are narrower than that — those stay native.
  console.log("portfolio");
  for (const slug of (await readdir(asset("portfolio"), { withFileTypes: true }))
    .filter((e) => e.isDirectory())
    .map((e) => e.name)
    .sort()) {
    for (const file of await pngsIn(asset("portfolio", slug))) {
      await emit(
        asset("portfolio", slug, file),
        publish("portfolio", slug, `${baseName(file)}.webp`),
        { width: 800, quality: 75 },
      );
    }
  }

  console.log(
    `\n${written} images  ${kb(bytesIn)} -> ${kb(bytesOut)}  (-${Math.round((1 - bytesOut / bytesIn) * 100)}%)`,
  );
}

await main();
