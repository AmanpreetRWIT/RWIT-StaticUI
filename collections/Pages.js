const Pages = {
    slug: "pages",
    admin: {
        useAsTitle: "title",
        defaultColumns: ["title", "slug", "createdAt"],
        livePreview: {
            url: ({ data }) => {
                const slug = data.slug === 'home' ? '' : data.slug;
                return `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/${slug}`;
            },
        },
    },
    access: {
        read: () => true,
        create: () => true,
        update: () => true,
        delete: () => true,
    },
    fields: [
        {
            name: "title",
            label: "Page Title",
            type: "text",
            required: true,
        },
        {
            name: "slug",
            label: "Slug",
            type: "text",
            required: true,
            unique: true,
            index: true,
            admin: {
                description: "URL-friendly identifier, e.g. 'home', 'about'",
            },
        },
        {
            name: "description",
            label: "Page Description",
            type: "textarea",
            admin: {
                description: "Meta description for SEO",
            },
        },
        {
            name: "sections",
            label: "Sections",
            type: "relationship",
            relationTo: "sections",
            hasMany: true,
            admin: {
                description: "Add sections to this page in display order",
            },
        },
    ],
};

module.exports = Pages;
