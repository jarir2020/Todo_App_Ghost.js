export function CssEditor(props = {}) {
    const rules = props.rules ?? [];
    const palette = props.palette ?? [];

    return {
        tag: 'section',
        props: { class: 'css-editor', 'data-template': 'blog' },
        children: [
            { tag: 'h2', props: {}, children: ['my-app CSS Editor'] },
            { tag: 'p', props: {}, children: ['Global tokens, theme overrides, and reusable style blocks.'] },
            {
                tag: 'div',
                props: { class: 'css-editor-palette' },
                children: palette.length
                    ? palette.map((item) => ({
                        tag: 'button',
                        props: { type: 'button' },
                        children: [String(item.label ?? item)]
                    }))
                    : [{ tag: 'div', props: {}, children: ['No palette presets yet'] }]
            },
            {
                tag: 'pre',
                props: { class: 'css-editor-rules' },
                children: [rules.length ? rules.map((rule) => String(rule.selector ?? rule)).join('\n') : '/* No rules yet */']
            }
        ]
    };
}

export const cssEditorMeta = {
    name: 'CssEditor',
    description: 'Global CSS tokens, overrides, and reusable style blocks.'
};

export default CssEditor;