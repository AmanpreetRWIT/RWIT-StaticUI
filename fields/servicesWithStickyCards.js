const servicesWithStickyCardsFields = [
    {
        name: "BGColor",
        type: "text",
    },
    {
        name: "Title",
        type: "text",
    },
    {
        name: "TitleColor",
        type: "text",
    },
    {
        name: "DescriptionColor",
        type: "text",
        defaultValue: "#757589",
    },
    {
        name: "Description",
        type: "textarea",
    },
    {
        name: "Tags",
        type: "array",
        fields: [{ name: "tag", type: "text" }],
    },
    {
        name: "Image",
        type: "upload",
        relationTo: "media",
    },
    {
        name: "ImageAlt",
        type: "text",
    },
    {
        name: "showImageOnRight",
        type: "checkbox",
        defaultValue: false,
    },
    {
        name: "CardTitleColor",
        type: "text",
    },
    {
        name: "CardDescriptionColor",
        type: "text",
        defaultValue: "#757589",
    },
    {
        name: "Services",
        type: "array",
        fields: [
            { name: "Heading", type: "text" },
            { name: "Description", type: "textarea" },
            { name: "Image", type: "upload", relationTo: "media" },
            { name: "AltText", type: "text" },
            { name: "Link", type: "text" },
        ],
    },
];

module.exports = servicesWithStickyCardsFields;
