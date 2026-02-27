const caseStudySliderFields = [
    {
        name: "BGColor",
        label: "Background Color",
        type: "group",
        fields: [{ name: "color", type: "text", defaultValue: "#f8f9fa" }],
    },
    {
        name: "Title",
        label: "Title",
        type: "text",
    },
    {
        name: "Description",
        label: "Description",
        type: "textarea",
    },
    {
        name: "TextAlignment",
        label: "Text Alignment",
        type: "select",
        defaultValue: "center",
        options: [
            { label: "Left", value: "left" },
            { label: "Center", value: "center" },
            { label: "Right", value: "right" },
        ],
    },
    {
        name: "TitleColor",
        label: "Title Color",
        type: "group",
        fields: [{ name: "color", type: "text", defaultValue: "#000248" }],
    },
    {
        name: "DescriptionColor",
        label: "Description Color",
        type: "group",
        fields: [{ name: "color", type: "text", defaultValue: "#757589" }],
    },
    {
        name: "CaseStudyCard",
        label: "Case Study Cards",
        type: "array",
        fields: [
            {
                name: "Image",
                type: "upload",
                relationTo: "media",
            },
            {
                name: "Tags",
                type: "array",
                fields: [{ name: "tag", type: "text" }],
            },
            {
                name: "Heading",
                type: "text",
            },
            {
                name: "Description",
                type: "textarea",
            },
            {
                name: "Button",
                type: "array",
                fields: [
                    { name: "Label", type: "text" },
                    { name: "Link", type: "text" },
                ],
            },
            {
                name: "ShowCaseStudyStatistics",
                type: "checkbox",
                defaultValue: true,
            },
            {
                name: "CaseStudyStatistics",
                type: "array",
                fields: [
                    { name: "Counter", type: "number" },
                    { name: "CounterType", type: "text", admin: { description: "e.g. + or %" } },
                    { name: "CounterTitle", type: "text" },
                ],
            },
        ],
    },
];

module.exports = caseStudySliderFields;
