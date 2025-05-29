const sharp = require('sharp');
const fs = require('fs').promises;
const path = require('path');

async function generateIcons() {
  const sizes = [16, 32, 48, 192, 512];
  const svgBuffer = await fs.readFile(path.join(__dirname, '../public/music-note.svg'));

  for (const size of sizes) {
    const pngBuffer = await sharp(svgBuffer)
      .resize(size, size)
      .png()
      .toBuffer();

    if (size <= 48) {
      // For favicon.ico (combine 16, 32, and 48px)
      await sharp(pngBuffer)
        .toFile(path.join(__dirname, `../public/favicon-${size}.png`));
    } else {
      // For larger icons
      await sharp(pngBuffer)
        .toFile(path.join(__dirname, `../public/logo${size}.png`));
    }
  }

  console.log('Icons generated successfully!');
}

generateIcons().catch(console.error); 