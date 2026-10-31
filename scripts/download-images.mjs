import fs from 'node:fs';
import path from 'node:path';
import https from 'node:https';

const IMAGES = {
  'mascarpone.jpg': 'https://images.unsplash.com/photo-1541658016709-82535e94bc69?q=80&w=1200&auto=format&fit=crop', // rich velvety cream / mascarpone
  'olive-oil.jpg': 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?q=80&w=1200&auto=format&fit=crop', // golden olive oil in glass cruet
  'basil.jpg': 'https://images.unsplash.com/photo-1608686207856-001b95cf60ca?q=80&w=1200&auto=format&fit=crop', // fresh Genovese sweet basil
  'suite-courtyard.jpg': 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=1200&auto=format&fit=crop', // luxury courtyard suite
  'suite-penthouse.jpg': 'https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=1200&auto=format&fit=crop', // luxury penthouse suite
  'suite-roastery.jpg': 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=1200&auto=format&fit=crop', // boutique hotel suite
  'suite-villa.jpg': 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?q=80&w=1200&auto=format&fit=crop', // Tuscan villa suite
};

const outputDir = path.resolve('public/images');

async function download(filename, url) {
  const dest = path.join(outputDir, filename);
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return download(filename, res.headers.location).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        return reject(new Error(`Failed to download ${url}: status ${res.statusCode}`));
      }
      const fileStream = fs.createWriteStream(dest);
      res.pipe(fileStream);
      fileStream.on('finish', () => {
        fileStream.close();
        console.log(`Saved: ${filename} (${fs.statSync(dest).size} bytes)`);
        resolve();
      });
      fileStream.on('error', reject);
    }).on('error', reject);
  });
}

async function main() {
  for (const [name, url] of Object.entries(IMAGES)) {
    try {
      await download(name, url);
    } catch (err) {
      console.error(`Error downloading ${name}:`, err.message);
    }
  }
}

main();
