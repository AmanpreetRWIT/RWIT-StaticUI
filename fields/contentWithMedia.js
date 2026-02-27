const contentWithMediaFields = [
    {
        name: "layoutType",
        type: "select",
        defaultValue: "flex-row",
        options: [
            { label: "Row (Image Left)", value: "flex-row" },
            { label: "Row Reverse (Image Right)", value: "flex-row-reverse" },
        ],
    },
    {
        name: "gradientStyle",
        type: "text",
        defaultValue: "theme-gradient-2",
    },
    {
        name: "bgColor",
        type: "text",
        defaultValue: "#F8F9FA",
    },
    {
        name: "disableBgShape",
        type: "checkbox",
        defaultValue: false,
    },
    {
        name: "image",
        type: "upload",
        relationTo: "media",
    },
    {
        name: "video",
        type: "group",
        fields: [{ name: "filename", type: "text" }],
    },
    {
        name: "tags",
        type: "array",
        fields: [{ name: "name", type: "text" }],
    },
    {
        name: "title",
        type: "text",
    },
    {
        name: "titleColor",
        type: "text",
        defaultValue: "#222222",
    },
    {
        name: "description",
        type: "textarea",
    },
    {
        name: "descriptionColor",
        type: "text",
        defaultValue: "#555555",
    },
    {
        name: "buttons",
        type: "array",
        fields: [
            { name: "text", type: "text" },
            { name: "href", type: "text" },
            { name: "style", type: "text", defaultValue: "btn-primary" },
        ],
    },
];

module.exports = contentWithMediaFields;
