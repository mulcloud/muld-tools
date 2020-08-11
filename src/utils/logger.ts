import ora from 'ora';
import chalk from 'chalk';
import consola from 'consola';
import { ROOT } from '../config/constant';

export function slimPath(path: string) {
    return chalk.yellow(path.replace(ROOT, ''));
}
export { ora, consola };
