const aboutUsFields = [
    {
        name: "BGColor",
        label: "Background Color",
        type: "group",
        fields: [
            {
                name: "color",
                type: "text",
                defaultValue: "#ffffff",
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
        fields: [
            {
                name: "color",
                type: "text",
                defaultValue: "#000248",
            },
        ],
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
        fields: [
            {
                name: "color",
                type: "text",
                defaultValue: "#757589",
            },
        ],
    },
    {
        name: "Tags",
        label: "Tags",
        type: "array",
        fields: [
            {
                name: "tag",
                type: "text",
            },
        ],
    },
    {
        name: "DisableBgShape",
        label: "Disable Background Shape",
        type: "checkbox",
        defaultValue: true,
    },
    {
        name: "Form",
        label: "Contact Forms",
        type: "array",
        fields: [
            {
                name: "FormTitle",
                type: "text",
            },
            {
                name: "FormName",
                type: "text",
            },
            {
                name: "SubmitButton",
                type: "text",
                defaultValue: "Submit",
            },
            {
                name: "PhoneNumber",
                type: "text",
            },
            {
                name: "fields",
                type: "array",
                fields: [
                    {
                        name: "Name",
                        type: "text",
                    },
                    {
                        name: "Type",
                        type: "select",
                        options: [
                            { label: "Text", value: "text" },
                            { label: "Email", value: "email" },
                            { label: "Textarea", value: "textarea" },
                        ],
                    },
                    {
                        name: "Placeholder",
                        type: "text",
                    },
                    {
                        name: "Required",
                        type: "checkbox",
                    },
                ],
            },
        ],
    },
];

module.exports = aboutUsFields;
