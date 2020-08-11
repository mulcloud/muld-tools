import { join } from 'path';
import { SRC_DIR } from '../../config/constant';
import { highlight } from './highlight';
import { linkOpen } from './link-open';
import { cardWrapper } from './card-wrapper';
import { Demos, CodeFragments, genDemoCode } from './gen-demo';
const loaderUtils = require('loader-utils');
const MarkdownIt = require('markdown-it');
const markdownItAnchor = require('markdown-it-anchor');
const frontMatter = require('front-matter');
const { slugify } = require('transliteration');

const demos: Demos = [];
const codeFragments: CodeFragments = [];
let importFragment = `
    import * as React from 'react';
    import DemoSection from '@trillion/muld-tools/site/mobile/layout/DemoSection';
    import DemoBlock from '@trillion/muld-tools/site/mobile/layout/DemoBlock';
`;

function wrapper(content: string, useRender: boolean = false) {
    content = cardWrapper(content);
    content = escape(content);

    const [defineCompFragment, renderFragment] = genDemoCode(demos, codeFragments, useRender);

    return `
    ${importFragment}

    ${defineCompFragment ? defineCompFragment : ''}

    export default ({renderer}) => {
        const content = unescape(\`${content}\`);
        const scrollToAnchor = (event) => {
            if (event.target.id) {
                // TODO: push operator
                // router.push({
                //     path: route.path,
                //     hash: event.target.id,
                // });
            }
        };
        const description = React.useRef(null);
        React.useEffect(() => {
            if (description && description.current) {
                const anchors = [].slice.call(
                    description.current.querySelectorAll('h2, h3, h4, h5'),
                );
                anchors.forEach((anchor) => {
                    anchor.addEventListener('click', scrollToAnchor);
                });
            } 
        }, []);

        if (renderer) {
            return <DemoSection><React.Fragment>${
                renderFragment ? renderFragment : ''
            }</React.Fragment></DemoSection>
        }
    
        return <section ref={description} dangerouslySetInnerHTML={{ __html: content }} />;
    }
    `;
}

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
                importFragment += importFragment;
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

module.exports = function (source: string) {
    let options = loaderUtils.getOptions(this) || {};
    (this as any).cacheable && (this as any).cacheable();
    options = {
        wrapper,
        linkOpen: true,
        ...options,
    };

    let fm;
    if (options.enableMetaData) {
        fm = frontMatter(source);
        source = fm.body;
    }

    if (options.linkOpen) {
        linkOpen(parser);
    }

    const content = parser.render(source);
    return options.wrapper(content, options.useRender);
};
