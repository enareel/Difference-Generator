#!/usr/bin/env node

import { Command } from 'commander';

const com = new Command();

com
  .name('Название')
  .description('Описание')
  .version('0.1.1')
  .option('-s, --split <separator>', 'Разделение')
  .option('-uc, --uppercase')
  .argument('<string>', 'Строка')
  .action((string, options, command) => {
    console.log(string, options, command);
  });

com.parse();
