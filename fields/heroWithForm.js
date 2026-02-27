const heroWithFormFields = [
    {
        name: "title",
        label: "Title (Tagline)",
        type: "text",
    },
    {
        name: "heading",
        label: "Heading",
        type: "text",
    },
    {
        name: "description",
        label: "Description",
        type: "textarea",
    },
    {
        name: "bgColor",
        label: "Background Color",
        type: "text",
        defaultValue: "#F5F5F5",
    },
    {
        name: "gradientStyle",
        label: "Gradient Style",
        type: "text",
        defaultValue: "theme-gradient-3",
    },
    {
        name: "removeExtraPadding",
        label: "Remove Extra Padding",
        type: "checkbox",
        defaultValue: false,
    },
    {
        name: "buttons",
        label: "Button",
        type: "group",
        fields: [
            { name: "label", type: "text" },
            { name: "href", type: "text" },
            { name: "target", type: "text", defaultValue: "_blank" },
        ],
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
                        name: "type",
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
];

module.exports = heroWithFormFields;
