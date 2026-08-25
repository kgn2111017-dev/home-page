import { Jimp } from './node_modules/jimp/dist/esm/index.js';

async function processLogo() {
  const srcPath = 'C:/Users/곽경남/.gemini/antigravity-ide/brain/842ec2ed-bcf7-4e5d-b224-decf7199b4c8/logo_gold_isolated_1786446800572.png';
  const destPath = 'c:/Users/곽경남/Desktop/home page/home page/public/logo_pungeo_transparent.png';

  const image = await Jimp.read(srcPath);

  image.scan(0, 0, image.bitmap.width, image.bitmap.height, function (x, y, idx) {
    const red = this.bitmap.data[idx + 0];
    const green = this.bitmap.data[idx + 1];
    const blue = this.bitmap.data[idx + 2];

    // If background pixel is light/white
    if (red > 190 && green > 190 && blue > 190) {
      this.bitmap.data[idx + 3] = 0; // Make 100% transparent
    }
  });

  await image.write(destPath);
  console.log('SUCCESS_TRANSPARENT_PNG');
}

processLogo().catch(console.error);
