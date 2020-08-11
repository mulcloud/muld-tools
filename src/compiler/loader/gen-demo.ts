export type Demo = { tag: string; title: string; name: string };
export type Demos = Array<Demo>;
export type CodeFragment = { type: string; content: string };
export type CodeFragments = Array<CodeFragment>;

export function genDemoCode(
    demos: Demos,
    codeFragments: CodeFragments,
    useRender: boolean = false,
) {
    if (!useRender) {
        return [];
    }

    let _first = false;
    const titles = demos.filter((item: Demo) => {
        if (item.tag === 'h2') {
            if (_first) {
                _first = false;
            } else {
                _first = true;
            }
        }
        if (item.tag === 'h3' && _first) {
            return item.title;
        }
    });

    let defineCompFragment = '';
    let renderFragment = '';
    let _nextIndex = 0;

    titles.forEach((t: Demo, index: number) => {
        let fragment = codeFragments[_nextIndex] as CodeFragment;
        let js = '';
        if (!fragment) {
            return;
        }
        if (fragment.type === 'js') {
            js = fragment.content;
            _nextIndex = _nextIndex + 1;
            fragment = codeFragments[_nextIndex];
        }
        _nextIndex = _nextIndex + 1;
        const c = `
            function ${t.name}() {
                ${js}

                return (<React.Fragment>${fragment.content}</React.Fragment>);
            }\n
        `;
        defineCompFragment += c;
        renderFragment += `<DemoBlock title='${t.title}'><${t.name} /></DemoBlock>\n`;
    });

    return [defineCompFragment, renderFragment];
}
