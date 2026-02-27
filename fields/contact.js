const contactFields = [
    {
        name: "BGColor",
        label: "Background Color",
        type: "group",
        fields: [{ name: "color", type: "text", defaultValue: "#f9fafb" }],
    },
    {
        name: "paddingTop",
        label: "Padding Top",
        type: "number",
        defaultValue: 100,
    },
    {
        name: "paddingBottom",
        label: "Padding Bottom",
        type: "number",
        defaultValue: 100,
    },
    {
        name: "TitleColor",
        label: "Title Color",
        type: "group",
        fields: [{ name: "color", type: "text", defaultValue: "#000248" }],
    },
    {
        name: "DisableBgShape",
        label: "Disable Background Shape",
        type: "checkbox",
        defaultValue: false,
    },
    {
        name: "contactForms",
        label: "Contact Forms",
        type: "array",
        fields: [
            { name: "formTitle", type: "text" },
            { name: "formType", type: "text", defaultValue: "default-form" },
            { name: "submitButton", type: "text", defaultValue: "Submit" },
            { name: "submitButtonClass", type: "text", defaultValue: "btn-primary" },
            {
                name: "fields",
                type: "array",
                fields: [
                    { name: "name", type: "text" },
                    {
                        name: "fieldType",
                        type: "select",
                        options: [
                            { label: "Text", value: "text" },
                            { label: "Email", value: "email" },
                            { label: "Textarea", value: "textarea" },
                        ],
                    },
                    { name: "label", type: "text" },
                    { name: "placeholder", type: "text" },
                    { name: "required", type: "checkbox" },
                ],
            },
        ],
    },
    {
        name: "ContactCardData",
        label: "Contact Cards",
        type: "array",
        fields: [
            {
                name: "Icon",
                type: "group",
                fields: [
                    { name: "type", type: "text", defaultValue: "fa" },
                    { name: "icon", type: "text" },
                ],
            },
            { name: "Heading", type: "text" },
            { name: "Description", type: "textarea" },
            {
                name: "Links",
                type: "array",
                fields: [
                    { name: "label", type: "text" },
                    { name: "url", type: "text" },
                ],
            },
        ],
    },
];

module.exports = contactFields;
