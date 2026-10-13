import { execSync } from 'child_process';
import fs from 'fs';
import { NextConfig } from 'next';
import path from 'path';

export default async function config(): Promise<NextConfig> {
  
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

  // Same again for the icons package: its version names the directory that
  // scripts/generate-icons.mjs writes the icon geometry to.
  const iconsPkg = JSON.parse(
    fs.readFileSync(
      path.join(
        mainEntryPath.substring(0, mainEntryPath.lastIndexOf('node_modules')),
        'node_modules',
        '@esmalley/react-material-icons',
        'package.json'
      ),
      'utf8'
    )
  );


  // Optional build metadata. Not every build runs inside a git checkout.
  const gitInfo = (command: string): string => {
    try {
      return execSync(command, { stdio: ['ignore', 'pipe', 'ignore'] }).toString().trim();
    } catch {
      return 'unknown';
    }
  };

  const commitHash = gitInfo('git rev-parse --short HEAD');
  const commitDate = gitInfo('git log -1 --format=%cd');

  const config: NextConfig = {
    env: {
      VERSION: `v${depPkg.version}`,
      COMMIT_HASH: commitHash,
      COMMIT_DATE: commitDate,
      ICONS_VERSION: iconsPkg.version,
    },
    logging: {
      fetches: {
        fullUrl: true,
      },
    },
    devIndicators: false,
    reactStrictMode: true,
  };

  // The icon geometry under public/icons/ is written per icons-package version, so the
  // file at a given url never changes: bumping the package writes a new directory.
  config.headers = async () => [
    {
      source: '/icons/:version/:file',
      headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
    },
  ];

  // Turbopack does not follow the symlink that 'npm link @esmalley/react-material-ui' creates,
  // so the tracing root has to cover the parent directory. This is needed in production builds
  // too, not just dev - without it 'next build' fails to resolve the library entirely.
  config.outputFileTracingRoot = path.join(__dirname, '../');

  return config;
}




