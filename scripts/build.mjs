// On Windows a cwd whose casing differs from the on-disk casing - `cd ~/desktop/projects`
// in git bash instead of `~/Desktop/Projects` - makes Turbopack instantiate Next's internal
// singletons twice, and `next build` dies prerendering /_global-error with
// "Invariant: Expected workStore to be initialized". Re-run next from the canonical path.
import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const cwd = process.cwd();
const real = fs.realpathSync.native(cwd);

if (real !== cwd) {
  console.log(`Building from ${real} (cwd was ${cwd})`);
}

const { status } = spawnSync(
  process.execPath,
  [path.join(real, 'node_modules', 'next', 'dist', 'bin', 'next'), 'build', ...process.argv.slice(2)],
  { stdio: 'inherit', cwd: real }
);

process.exit(status ?? 1);
