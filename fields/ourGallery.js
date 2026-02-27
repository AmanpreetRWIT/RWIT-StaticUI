const ourGalleryFields = [
    {
        name: "Title",
        label: "Title",
        type: "text",
    },
    {
        name: "ShowTitle",
        label: "Show Title",
        type: "checkbox",
        defaultValue: false,
    },
    {
        name: "Tags",
        label: "Tags",
        type: "text",
    },
    {
        name: "BgColor",
        label: "Background Color",
        type: "group",
        fields: [{ name: "color", type: "text", defaultValue: "#ffffff" }],
    },
    {
        name: "Loop",
        label: "Loop Slider",
        type: "checkbox",
        defaultValue: true,
    },
    {
        name: "CursorColor",
        label: "Cursor Color",
        type: "group",
        fields: [{ name: "color", type: "text", defaultValue: "#1b90dc" }],
    },
    {
        name: "CursorTextColor",
        label: "Cursor Text Color",
        type: "group",
        fields: [{ name: "color", type: "text", defaultValue: "#ffffff" }],
    },
    {
        name: "Slide",
        label: "Slides",
        type: "array",
        fields: [
            {
                name: "Layout",
                label: "Layout Type (1-4)",
                type: "select",
                options: [
                    { label: "Layout 1", value: "1" },
                    { label: "Layout 2", value: "2" },
                    { label: "Layout 3", value: "3" },
                    { label: "Layout 4", value: "4" },
                ],
                defaultValue: "4",
            },
            { name: "ImageA", type: "upload", relationTo: "media" },
            { name: "ImageB", type: "upload", relationTo: "media" },
            { name: "ImageC", type: "upload", relationTo: "media" },
            { name: "ImageD", type: "upload", relationTo: "media" },
        ],
    },
];

module.exports = ourGalleryFields;
