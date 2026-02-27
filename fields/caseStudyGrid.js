const caseStudyGridFields = [
    {
        name: "caseStudies",
        label: "Case Studies",
        type: "array",
        fields: [
            {
                name: "Title",
                type: "text",
            },
            {
                name: "Description",
                type: "textarea",
            },
            {
                name: "CoverImage",
                type: "upload",
                relationTo: "media",
            },
            {
                name: "full_slug",
                label: "Link / Slug",
                type: "text",
            },
            {
                name: "Label",
                label: "Button Label",
                type: "text",
                defaultValue: "Read Case Study",
            },
            {
                name: "CaseStudyLabels",
                label: "Labels / Tags",
                type: "array",
                fields: [{ name: "label", type: "text" }],
            },
        ],
    },
];

module.exports = caseStudyGridFields;
