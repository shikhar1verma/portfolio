#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

function getGitCommit() {
  try {
    const rev = require('child_process').execSync('git rev-parse --short HEAD').toString().trim();
    return rev;
  } catch {
    return null;
  }
}

const outPath = path.join(process.cwd(), 'public', 'build.json');
const payload = {
  version: process.env.VERCEL_GIT_COMMIT_SHA?.slice(0, 7) || getGitCommit() || `${Date.now()}`,
  builtAt: Date.now(),
};

fs.mkdirSync(path.dirname(outPath), { recursive: true });
fs.writeFileSync(outPath, JSON.stringify(payload, null, 2));
console.log('Wrote', outPath, payload); 