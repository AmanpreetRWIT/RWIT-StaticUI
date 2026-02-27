const callToActionFields = [
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
        name: "tags",
        label: "Tags",
        type: "text",
    },
    {
        name: "titleColor",
        label: "Title Color",
        type: "text",
        defaultValue: "#000248",
    },
    {
        name: "descriptionColor",
        label: "Description Color",
        type: "text",
        defaultValue: "#757589",
    },
    {
        name: "bgColor",
        label: "Background Color",
        type: "text",
        defaultValue: "#f3f3f3",
    },
    {
        name: "backgroundImage",
        label: "Background Image",
        type: "upload",
        relationTo: "media",
    },
    {
        name: "minHeight",
        label: "Minimum Height",
        type: "number",
        defaultValue: 400,
    },
    {
        name: "buttons",
        label: "Button",
        type: "group",
        fields: [
            {
                name: "label",
                type: "text",
            },
            {
                name: "href",
                type: "text",
            },
        ],
    },
    {
        name: "showPhone",
        label: "Show Phone Numbers",
        type: "checkbox",
        defaultValue: false,
    },
    {
        name: "phone",
        label: "Phone Numbers",
        type: "array",
        admin: {
            condition: (data) => data?.showPhone,
        },
        fields: [
            {
                name: "label",
                type: "text",
            },
            {
                name: "href",
                type: "text",
            },
        ],
    },
    {
        name: "showTags",
        label: "Show Tags",
        type: "checkbox",
        defaultValue: true,
    },
    {
        name: "disableBgShape",
        label: "Disable Background Shape",
        type: "checkbox",
        defaultValue: false,
    },
    {
        name: "Sectiontitle",
        label: "Show Section Title",
        type: "checkbox",
        defaultValue: true,
    },
];

module.exports = callToActionFields;
