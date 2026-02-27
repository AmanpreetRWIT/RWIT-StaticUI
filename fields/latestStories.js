const latestStoriesFields = [
    {
        name: "BGColor",
        label: "Background Color",
        type: "text",
        defaultValue: "#ffffff",
    },
    {
        name: "ShowSearchField",
        label: "Show Search Field",
        type: "checkbox",
        defaultValue: false,
    },
    {
        name: "ShowSectionTitle",
        label: "Show Section Title",
        type: "checkbox",
        defaultValue: true,
    },
    {
        name: "Title",
        label: "Title",
        type: "text",
    },
    {
        name: "Tags",
        label: "Tags (Subtitle)",
        type: "text",
    },
    {
        name: "Description",
        label: "Description",
        type: "textarea",
    },
    {
        name: "TitleColor",
        label: "Title Color",
        type: "text",
    },
    {
        name: "DescriptionColor",
        label: "Description Color",
        type: "text",
    },
    {
        name: "Buttons",
        label: "Buttons",
        type: "array",
        fields: [
            { name: "label", type: "text" },
            { name: "href", type: "text" },
            {
                name: "style",
                type: "select",
                defaultValue: "btn-solid",
                options: [
                    { label: "Solid", value: "btn-solid" },
                    { label: "Outline", value: "btn-outline" },
                ],
            },
            { name: "icon", type: "text" },
        ],
    },
];

module.exports = latestStoriesFields;
