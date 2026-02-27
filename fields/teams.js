const teamsFields = [
    {
        name: "BGColor",
        label: "Background Color",
        type: "group",
        fields: [
            {
                name: "color",
                type: "text",
                defaultValue: "#f8f9fa",
            },
        ],
    },
    {
        name: "centeredTitle",
        label: "Centered Title",
        type: "checkbox",
        defaultValue: false,
    },
    {
        name: "showTags",
        label: "Show Tags",
        type: "checkbox",
        defaultValue: false,
    },
    {
        name: "Tag",
        label: "Tags",
        type: "array",
        fields: [
            {
                name: "TagName",
                type: "text",
            },
            {
                name: "TextColor",
                type: "group",
                fields: [{ name: "color", type: "text" }],
            },
            {
                name: "BGColor",
                type: "group",
                fields: [{ name: "color", type: "text" }],
            },
        ],
    },
    {
        name: "Title",
        label: "Title",
        type: "text",
    },
    {
        name: "TitleColor",
        label: "Title Color",
        type: "group",
        fields: [{ name: "color", type: "text", defaultValue: "#000248" }],
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
        fields: [{ name: "color", type: "text", defaultValue: "#555555" }],
    },
    {
        name: "TeamCardTextColor",
        label: "Card Text Color",
        type: "group",
        fields: [{ name: "color", type: "text", defaultValue: "#1d1d1d" }],
    },
    {
        name: "RemoveCardBorder",
        label: "Remove Card Border",
        type: "checkbox",
        defaultValue: false,
    },
    {
        name: "RemoveCardAnimation",
        label: "Remove Card Animation",
        type: "checkbox",
        defaultValue: false,
    },
    {
        name: "Team",
        label: "Team Members",
        type: "array",
        fields: [
            {
                name: "name",
                type: "text",
            },
            {
                name: "role",
                type: "text",
            },
            {
                name: "image",
                type: "upload",
                relationTo: "media",
            },
            {
                name: "socials",
                type: "group",
                fields: [
                    { name: "facebook", type: "text" },
                    { name: "twitter", type: "text" },
                    { name: "linkedin", type: "text" },
                    { name: "instagram", type: "text" },
                ],
            },
        ],
    },
];

module.exports = teamsFields;
