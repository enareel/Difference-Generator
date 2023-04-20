#!/usr/bin/env node

import { Command } from 'commander';

const data = {
  NAME: 'gendiff',
  VERSION: '0.0.1',
  DESCRIPTION: 'Compares two configuration files and shows a difference.',
};

const program = new Command();
program.name(data.NAME).version(data.VERSION).description(data.DESCRIPTION);
program.parse();
