const ourValuesFields = [
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
        defaultValue: "#000248",
    },
    {
        name: "DescriptionColor",
        label: "Description Color",
        type: "text",
        defaultValue: "#757589",
    },
    {
        name: "BGColor",
        label: "Background Color",
        type: "text",
        defaultValue: "#ffffff",
    },
    {
        name: "OurValueCardTextColor",
        label: "Card Text Color",
        type: "text",
        defaultValue: "#111111",
    },
    {
        name: "OurValueCardTextAlignment",
        label: "Card Text Alignment",
        type: "select",
        defaultValue: "text-center",
        options: [
            { label: "Left", value: "text-left" },
            { label: "Center", value: "text-center" },
            { label: "Right", value: "text-right" },
        ],
    },
    {
        name: "OurValueCard",
        label: "Values Cards",
        type: "array",
        fields: [
            {
                name: "Heading",
                type: "text",
            },
            {
                name: "Description",
                type: "textarea",
            },
            {
                name: "Counter",
                type: "text",
            },
            {
                name: "CounterBgColor",
                type: "text",
            },
            {
                name: "CounterColor",
                type: "text",
                defaultValue: "#ffffff",
            },
            {
                name: "Link",
                type: "text",
            },
        ],
    },
];

module.exports = ourValuesFields;
