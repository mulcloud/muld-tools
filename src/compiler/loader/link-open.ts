export function linkOpen(md: any) {
    const defaultRender =
        md.renderer.rules.link_open ||
        function (tokens: any, idx: any, options: any, env: any, self: any) {
            return self.renderToken(tokens, idx, options);
        };

    md.renderer.rules.link_open = function (
        tokens: any,
        idx: any,
        options: any,
        env: any,
        self: any,
    ) {
        const aIndex = tokens[idx].attrIndex('target');

        if (aIndex < 0) {
            tokens[idx].attrPush(['target', '_blank']); // add new attribute
        }

        return defaultRender(tokens, idx, options, env, self);
    };
}
