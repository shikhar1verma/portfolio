#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const readline = require('readline');

const root = process.cwd();
const sampleDir = path.join(root, 'content-sample');
const contentDir = path.join(root, 'content');
const publicDir = path.join(root, 'public');

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function targetFiles() {
  return [
    path.join(contentDir, 'site.json'),
    path.join(contentDir, 'profile.json'),
    path.join(contentDir, 'projects.json'),
    path.join(contentDir, 'experience.json'),
    path.join(contentDir, 'achievements.json'),
    path.join(contentDir, 'skills.json'),
    path.join(contentDir, 'education.json'),
    path.join(publicDir, 'sample-avatar.jpg'),
  ];
}

function existingTargets(files) {
  return files.filter((f) => fs.existsSync(f));
}

async function confirmOverwrite(files) {
  if (files.length === 0) return true;
  console.log('The following files already exist and will be overwritten if you continue:\n');
  files.forEach((f) => console.log(' -', path.relative(root, f)));
  console.log();
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  const answer = await new Promise((res) => rl.question('Proceed and overwrite? (y/N): ', (a) => res(a.trim().toLowerCase())));
  rl.close();
  return answer === 'y' || answer === 'yes';
}

function removeFiles(files) {
  for (const f of files) {
    try {
      fs.unlinkSync(f);
      console.log('Deleted', f);
    } catch {
      /* ignore */
    }
  }
}

function copySampleContent() {
  ensureDir(contentDir);
  const files = [
    'site.json',
    'profile.json',
    'projects.json',
    'experience.json',
    'achievements.json',
    'skills.json',
    'education.json',
  ];
  for (const filename of files) {
    const src = path.join(sampleDir, filename);
    const dest = path.join(contentDir, filename);
    if (!fs.existsSync(src)) continue;
    fs.copyFileSync(src, dest);
    console.log('Wrote', dest);
  }
}

async function writeSampleAvatar() {
  ensureDir(publicDir);
  const outPath = path.join(publicDir, 'sample-avatar.jpg');
  const url = 'https://placehold.co/256x256/jpg?text=Avatar';
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const buffer = Buffer.from(await res.arrayBuffer());
    fs.writeFileSync(outPath, buffer);
    console.log('Wrote', outPath);
  } catch (e) {
    console.log('Skipping avatar download:', e.message);
  }
}

async function main() {
  const files = targetFiles();
  const existing = existingTargets(files);
  const ok = await confirmOverwrite(existing);
  if (!ok) {
    console.log('Aborted. No changes made.');
    process.exit(0);
  }
  removeFiles(existing);
  copySampleContent();
  await writeSampleAvatar();
  console.log('Setup complete. You can now run `npm run dev`.');
}

main(); 