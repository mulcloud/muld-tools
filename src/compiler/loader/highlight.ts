const hljs = require('highlight.js');

export function highlight(str: string, lang: string) {
    if (lang && hljs.getLanguage(lang)) {
        return hljs.highlight(lang, str, true).value;
    }

    return '';
}
