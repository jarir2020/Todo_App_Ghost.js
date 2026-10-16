export function AdminDashboard(props = {}) {
    const metrics = props.metrics ?? [];

    return {
        tag: 'section',
        props: { class: 'admin-dashboard', 'data-template': 'blog' },
        children: [
            { tag: 'h2', props: {}, children: ['my-app Admin Dashboard'] },
            { tag: 'p', props: {}, children: ['Project summary, recent changes, and health checks.'] },
            {
                tag: 'ul',
                props: {},
                children: metrics.length
                    ? metrics.map((metric) => ({
                        tag: 'li',
                        props: {},
                        children: [String(metric.label ?? metric)]
                    }))
                    : [
                        { tag: 'li', props: {}, children: ['No metrics yet'] }
                    ]
            }
        ]
    };
}

export const adminDashboardMeta = {
    name: 'AdminDashboard',
    description: 'Project summaries, recent changes, and health checks.'
};

export default AdminDashboard;