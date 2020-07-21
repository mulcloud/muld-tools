const loaderUtils = require('loader-utils');
const MarkdownIt = require('markdown-it');
const markdownItAnchor = require('markdown-it-anchor');
const frontMatter = require('front-matter');
const highlight = require('./highlight');
const linkOpen = require('./linkOpen');
const cardWrapper = require('./cardWrapper');
const { slugify } = require('transliteration');

function wrapper(content: any) {
    content = cardWrapper(content);
    content = escape(content);
    return `
    import * as React from 'react';
    export default () => {
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
            const anchors = [].slice.call(
                description.current.querySelectorAll('h2, h3, h4, h5'),
            );
            anchors.forEach((anchor) => {
                anchor.addEventListener('click', scrollToAnchor);
            });
        }, []);
        return <section ref={description} dangerouslySetInnerHTML={{ __html: content }} />;
    }
    `;
}

const parser = new MarkdownIt({
    html: true,
    highlight: function (content: string, languageHint: string) {
        codeBlock.push({ type: languageHint, content });
        return highlight(content, languageHint);
    },
}).use(markdownItAnchor, {
    level: 2,
    slugify,
});

// TODO: generator render components from md file
// demo css ?
// component spilit ?
const codeBlock: any = []
let components:any = [];
// function genComponent(name, jsx, js) {
//     components += `const ${name} = () => {
//         	        		${js}
//         	        		return <React.Fragment>${jsx}</React.Fragment>
//         	        	}\n`;
// }

// let imports = '';
// for (let i = 0; i < codes.length; i++) {
//     const { type, content } = codes[i];
//     if (i === 0 && type === 'js' && content.includes(`'muld'`)) {
//         imports += content;
//         continue;
//     }
//     if (type === 'html') {
//         const js = codes[i + 1] && codes[i + 1].type === 'js' ? codes[i + 1].content : '';
//         genComponent(`Demo${i}`, content, js);
//     }
// }
module.exports = function (source: any) {
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
    return options.wrapper(content, fm);
};
