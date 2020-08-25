#!/usr/bin/env node
import { command, parse, version } from 'commander';

// @ts-ignore
import packageJson from '../package.json';

// commands
import { dev } from './commands/dev';
import { build } from './commands/build';
import { buildSite } from './commands/build-site';
import { commitLint } from './commands/commit-lint';
import { clean } from './commands/clean';

version(`@mulcloud/muld-tools ${packageJson.version}`);
process.env.MULD_TOOLS_VERSION = packageJson.version;

command('dev').description('Run webpack dev server').action(dev);

command('build-site').description('Compile site in production mode').action(buildSite);

command('clean').description('Clean all dist files').action(clean);

command('commit-lint').description('Lint commit message').action(commitLint);

command('build')
    .description('Compile components in production mode')
    .option('--watch', 'Watch file change')
    .action(build);

parse();

