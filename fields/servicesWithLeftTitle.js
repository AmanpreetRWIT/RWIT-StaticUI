const servicesWithLeftTitleFields = [
    {
        name: "Tags",
        type: "text",
    },
    {
        name: "Title",
        type: "text",
    },
    {
        name: "BGColor",
        type: "text",
        defaultValue: "#ffffff",
    },
    {
        name: "TitleColor",
        type: "text",
        defaultValue: "#000248",
    },
    {
        name: "DescriptionColor",
        type: "text",
        defaultValue: "#757589",
    },
    {
        name: "InvertColumn",
        type: "checkbox",
        defaultValue: false,
    },
    {
        name: "Description",
        type: "textarea",
    },
    {
        name: "Services",
        type: "array",
        fields: [
            { name: "Heading", type: "text" },
            { name: "Description", type: "textarea" },
            { name: "Image", type: "upload", relationTo: "media" },
            { name: "AltText", type: "text" },
        ],
    },
];

module.exports = servicesWithLeftTitleFields;
