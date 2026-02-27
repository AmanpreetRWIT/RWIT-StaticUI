const Media = {
    slug: "media",
    upload: {
        staticDir: "public/uploads",
        staticURL: "/uploads",
        mimeTypes: ["image/*"],
        imageSizes: [
            {
                name: "thumbnail",
                width: 300,
                height: 300,
                position: "centre",
            },
            {
                name: "hero",
                width: 1260,
                height: 500,
                position: "centre",
            },
        ],
    },
    access: {
        read: () => true,
        create: () => true,
        update: () => true,
        delete: () => true,
    },
    fields: [
        {
            name: "alt",
            label: "Alt Text",
            type: "text",
            required: true,
        },
    ],
};

module.exports = Media;
