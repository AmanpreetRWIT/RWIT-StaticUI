const ourOfficeFields = [
    {
        name: "Title",
        label: "Title",
        type: "text",
    },
    {
        name: "Tags",
        label: "Tags",
        type: "text",
    },
    {
        name: "TitleColor",
        label: "Title Color",
        type: "text",
        defaultValue: "#000248",
    },
    {
        name: "BGColor",
        label: "Background Color",
        type: "text",
        defaultValue: "#ffffff",
    },
    {
        name: "OfficeCard",
        label: "Office Cards",
        type: "array",
        fields: [
            { name: "Heading", type: "text" },
            { name: "Description", type: "textarea" },
            {
                name: "Image",
                type: "upload",
                relationTo: "media",
            },
            {
                name: "Button",
                type: "array",
                fields: [{ name: "label", type: "text" }],
            },
        ],
    },
];

module.exports = ourOfficeFields;
