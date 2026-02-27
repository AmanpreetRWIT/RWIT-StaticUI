const faqFields = [
    {
        name: "Title",
        type: "text",
    },
    {
        name: "Tags",
        type: "text",
    },
    {
        name: "Description",
        type: "textarea",
    },
    {
        name: "BGColor",
        type: "group",
        fields: [{ name: "color", type: "text", defaultValue: "#ffffff" }],
    },
    {
        name: "TitleColor",
        type: "group",
        fields: [{ name: "color", type: "text", defaultValue: "#000248" }],
    },
    {
        name: "DescriptionColor",
        type: "group",
        fields: [{ name: "color", type: "text", defaultValue: "#757589" }],
    },
    {
        name: "FaqCardTitleColor",
        type: "group",
        fields: [{ name: "color", type: "text", defaultValue: "#000248" }],
    },
    {
        name: "FaqDescriptionColor",
        type: "group",
        fields: [{ name: "color", type: "text", defaultValue: "#757589" }],
    },
    {
        name: "FaqCard",
        type: "array",
        fields: [
            { name: "Heading", type: "text" },
            {
                name: "Description",
                type: "richText",
            },
        ],
    },
];

module.exports = faqFields;
