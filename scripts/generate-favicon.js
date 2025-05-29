const sharp = require('sharp');
const fs = require('fs').promises;
const path = require('path');
const ico = require('png-to-ico');

async function generateIcons() {
  const sizes = [16, 32, 48, 192, 512];
  const svgBuffer = await fs.readFile(path.join(__dirname, '../public/music-note.svg'));
  const pngFiles = [];

  for (const size of sizes) {
    const pngBuffer = await sharp(svgBuffer)
      .resize(size, size)
      .png()
      .toBuffer();

    if (size <= 48) {
      // Save individual PNGs for favicon
      const filename = path.join(__dirname, `../public/favicon-${size}.png`);
      await fs.writeFile(filename, pngBuffer);
      pngFiles.push(filename);
    } else {
      // For larger icons
      await fs.writeFile(
        path.join(__dirname, `../public/logo${size}.png`),
        pngBuffer
      );
    }
  }

  // Generate favicon.ico from the PNG files
  const icoBuffer = await ico(pngFiles);
  await fs.writeFile(path.join(__dirname, '../public/favicon.ico'), icoBuffer);

  console.log('Icons generated successfully!');
}

generateIcons().catch(console.error); 