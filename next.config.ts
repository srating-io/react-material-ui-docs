import { execSync } from 'child_process';
import fs from 'fs';
import { NextConfig } from 'next';
import path from 'path';

// 1. Resolve the path to the main entry point of the library
const mainEntryPath = require.resolve('@esmalley/react-material-ui');

// 2. Traverse up to the package's root folder to find its package.json
const packageJsonPath = path.join(
  mainEntryPath.substring(0, mainEntryPath.lastIndexOf('node_modules')),
  'node_modules',
  '@esmalley/react-material-ui',
  'package.json'
);

// 3. Read and parse the file directly from the disk
const depPkg = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));


const commitHash = execSync('git rev-parse --short HEAD')
  .toString()
  .trim();


const commitDate = execSync('git log -1 --format=%cd')
  .toString()
  .trim();

const isProduction = process.env.NODE_ENV === 'production';


const config: NextConfig = {
  env: {
    VERSION: `v${depPkg.version}`,
    COMMIT_HASH: commitHash,
    COMMIT_DATE: commitDate,
  },
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  devIndicators: false,
  reactStrictMode: true,
};

if (!isProduction) {
  config.outputFileTracingRoot = path.join(__dirname, '../'); // turbopack sucks and breaks symlinks, so add this crap instead
//   outputFileTracingExcludes: {
//   '*': [
//     '../**/node_modules/@swc/**',
//     '../**/.git/**',
//     '../**/dist/**',
//     '../**/.next/**',
//   ],
// },
}


export default config;



