const caseStudyMediaFields = [
    {
        name: "stories",
        label: "Case Study Media Items",
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
                name: "Label",
                label: "Button Label",
                type: "text",
                defaultValue: "Read Case Study",
            },
            {
                name: "Image",
                type: "upload",
                relationTo: "media",
            },
            {
                name: "Logo",
                type: "upload",
                relationTo: "media",
            },
            {
                name: "Link",
                type: "text",
                defaultValue: "/casestudies",
            },
        ],
    },
];

module.exports = caseStudyMediaFields;
