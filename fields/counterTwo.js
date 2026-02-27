const counterTwoFields = [
    {
        name: "SecondLayout",
        type: "checkbox",
        defaultValue: false,
    },
    {
        name: "InvertColumns",
        type: "checkbox",
        defaultValue: true,
    },
    {
        name: "BgColor",
        type: "group",
        fields: [{ name: "color", type: "text", defaultValue: "#f7f7f7" }],
    },
    {
        name: "Heading",
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
        name: "CounterTextColor",
        type: "group",
        fields: [{ name: "color", type: "text", defaultValue: "#000248" }],
    },
    {
        name: "CounterItem",
        type: "array",
        fields: [
            { name: "Number", type: "number" },
            { name: "Description", type: "text" },
            {
                name: "Icon",
                type: "group",
                fields: [
                    { name: "type", type: "text" },
                    { name: "icon", type: "text" },
                ],
            },
            {
                name: "IconColor",
                type: "group",
                fields: [{ name: "color", type: "text" }],
            },
            {
                name: "BgColor",
                type: "group",
                fields: [{ name: "color", type: "text" }],
            },
        ],
    },
    {
        name: "Buttons",
        type: "group",
        fields: [
            { name: "label", type: "text" },
            { name: "onClick", type: "text", admin: { description: "Function call string (optional)" } },
        ],
    },
];

module.exports = counterTwoFields;
