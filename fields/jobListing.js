const jobListingFields = [
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
        name: "BGColor",
        label: "Background Color",
        type: "group",
        fields: [{ name: "color", type: "text" }],
    },
    {
        name: "Description",
        label: "Description",
        type: "textarea",
    },
    {
        name: "DescriptionColor",
        label: "Description Color",
        type: "group",
        fields: [{ name: "color", type: "text" }],
    },
    {
        name: "EmptyCardMsg",
        label: "Empty Card Message",
        type: "text",
    },
];

module.exports = jobListingFields;
