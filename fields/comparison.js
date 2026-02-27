const comparisonFields = [
    {
        name: "isSlim",
        type: "checkbox",
        defaultValue: false,
    },
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
        name: "HeadingColor",
        type: "text",
        defaultValue: "#000248",
    },
    {
        name: "DescriptionColor",
        type: "text",
        defaultValue: "#757589",
    },
    {
        name: "BGColor",
        type: "text",
        defaultValue: "#f5f5f5",
    },
    {
        name: "LabelText",
        type: "text",
    },
    {
        name: "ButtonText",
        type: "text",
    },
    {
        name: "DropDownOne",
        type: "array",
        fields: [{ name: "option", type: "text" }],
    },
];

module.exports = comparisonFields;
