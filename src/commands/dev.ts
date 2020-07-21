import { setNodeEnv } from '../utils';
import { compileSite } from '../compiler/compile-site';

export async function dev() {
    setNodeEnv('development');
    await compileSite();
}