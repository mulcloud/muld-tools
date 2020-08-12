import { cardWrapper } from './card-wrapper';
import { Demos, CodeFragments, genDemoCode, Demo } from './gen-demo';
import { parseMarkdown } from './parse-markdown';
const loaderUtils = require('loader-utils');
const frontMatter = require('front-matter');

function assembler(options: {
    content: string;
    demos: Demos;
    codeFragments: CodeFragments;
    importFragment: string;
    useRender: boolean;
}) {
    let { content, demos, codeFragments, importFragment, useRender } = options;
    content = cardWrapper(content);
    content = escape(content);

    const [defineCompFragment, renderFragment] = genDemoCode(demos, codeFragments, useRender);

    let codeContent = `${importFragment}\n`;
    let codeContent1 = `
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
            }, []);\n`;
    let codeContent2 = `
        if (renderer) {
            return <DemoSection><React.Fragment>${renderFragment}</React.Fragment></DemoSection>
        }\n
    `;
    let codeContent3 = `
        return <section ref={description} dangerouslySetInnerHTML={{ __html: content }} />;
    }
    `;

    if (useRender) {
        codeContent += `\n${defineCompFragment}`;
        codeContent += codeContent1;
        codeContent += codeContent2;
        codeContent += codeContent3;
    } else {
        codeContent += codeContent1;
        codeContent += codeContent3;
    }

    return codeContent;
}

module.exports = function (source: string) {
    let options = loaderUtils.getOptions(this) || {};
    (this as any).cacheable && (this as any).cacheable();
    options = {
        assembler,
        linkOpen: true,
        ...options,
    };

    let fm;
    if (options.enableMetaData) {
        fm = frontMatter(source);
        source = fm.body;
    }

    const compiled = parseMarkdown(source, options);
    return options.assembler({ ...compiled, useRender: options.useRender });
};
