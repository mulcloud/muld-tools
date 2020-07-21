import { emptyDir } from 'fs-extra';
import { setNodeEnv } from '../utils';
import { compileSite } from '../compiler/compile-site';
import { SITE_DIST_DIR } from '../config/constant';

export async function buildSite() {
    setNodeEnv('production');
    await emptyDir(SITE_DIST_DIR);
    await compileSite(true);
}
