export function FormBuilder(props = {}) {
    const fields = props.fields ?? [];
    const layout = props.layout ?? 'single-column';

    return {
        tag: 'section',
        props: { class: 'form-builder', 'data-template': 'blog' },
        children: [
            { tag: 'h2', props: {}, children: ['my-app Form Builder'] },
            { tag: 'p', props: {}, children: ['Drag-and-drop fields, validation rules, and bindings.'] },
            {
                tag: 'div',
                props: { class: 'form-layout', 'data-layout': layout },
                children: fields.length
                    ? fields.map((field) => ({
                        tag: 'div',
                        props: { class: 'form-field' },
                        children: [String(field.label ?? field)]
                    }))
                    : [{ tag: 'div', props: {}, children: ['No fields yet'] }]
            }
        ]
    };
}

export const formBuilderMeta = {
    name: 'FormBuilder',
    description: 'Field layout, validation, and binding design.'
};

export default FormBuilder;