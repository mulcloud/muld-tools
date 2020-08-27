const ZH_CN = 'zh-CN';
const EN_US = 'en-US';
const CACHE_KEY = 'muld-cli-lang';
const COMPONENT_CACHE_KEY = 'muld-components';
let currentLang = ZH_CN;

export function getLang() {
    return currentLang;
}

export function setLang(lang: string) {
    currentLang = lang;
    localStorage.setItem(CACHE_KEY, lang);
}

export function setDefaultLang(langFromConfig: string) {
    const cached = localStorage.getItem(CACHE_KEY);

    if (cached) {
        currentLang = cached;
        return;
    }

    if (navigator.language && navigator.language.indexOf('zh-') !== -1) {
        currentLang = ZH_CN;
        return;
    }

    currentLang = langFromConfig || EN_US;
}

export function getComponents() {
    return localStorage.getItem(COMPONENT_CACHE_KEY);
}

export function getComponent(path: string) {
    const cacheComponents = JSON.parse(getComponents());
    if (cacheComponents) {
        return cacheComponents[path];
    }
    return '';
}

export function setComponents(components: Record<string, string>) {
    localStorage.setItem(COMPONENT_CACHE_KEY, JSON.stringify(components));
}
