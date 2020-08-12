import { join } from 'path';
import { SRC_DIR } from '../../config/constant';
import { highlight } from './highlight';
import { linkOpen } from './link-open';
import { Demos, CodeFragments } from './gen-demo';

const MarkdownIt = require('markdown-it');
const markdownItAnchor = require('markdown-it-anchor');
const { slugify } = require('transliteration');

export function parseMarkdown(source: string, options: any) {
    const demos: Demos = [];
    const codeFragments: CodeFragments = [];
    let importFragment = `
        import * as React from 'react';
        import DemoSection from '@trillion/muld-tools/site/mobile/layout/DemoSection';
        import DemoBlock from '@trillion/muld-tools/site/mobile/layout/DemoBlock';
    `;
    const parser = new MarkdownIt({
        html: true,
        typographer: true,
        highlight: function (content: string, languageHint: string) {
            if (!(languageHint === 'js' && content.includes('@trillion/muld'))) {
                codeFragments.push({ type: languageHint, content });
            } else {
                if (content.includes('@trillion/muld')) {
                    const regex = /\{(.+?)\}/g;
                    const components = content.match(regex);
                    if (components && components.length > 0) {
                        importFragment += `\n import ${components[0]} from '${join(
                            SRC_DIR,
                            'index.ts',
                        )}';`;
                    }
                } else {
                    importFragment += content;
                }
            }

            return highlight(content, languageHint);
        },
    }).use(markdownItAnchor, {
        level: 2,
        slugify,
        callback: (token: Record<string, string>, info: Record<string, string>) => {
            if (token.tag && info.title) {
                const name = info.slug.replace(/-/g, '').replace(/^[a-z]/g, (L) => L.toUpperCase());
                demos.push({ tag: token.tag, title: info.title, name: `${name}Example` });
            }
        },
    });

    if (options.linkOpen) {
        linkOpen(parser);
    }

    const content = parser.render(source);
    return { content, demos, codeFragments, importFragment };
}
