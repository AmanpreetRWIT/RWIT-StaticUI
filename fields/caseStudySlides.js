const caseStudySlidesFields = [
    {
        name: "Tag",
        type: "text",
    },
    {
        name: "TagColor",
        type: "group",
        fields: [{ name: "color", type: "text" }],
    },
    {
        name: "Heading",
        type: "text",
    },
    {
        name: "HeadingColor",
        type: "group",
        fields: [{ name: "color", type: "text" }],
    },
    {
        name: "Description",
        type: "textarea",
    },
    {
        name: "DescriptionColor",
        type: "group",
        fields: [{ name: "color", type: "text" }],
    },
    {
        name: "SliderSpeed",
        type: "number",
        defaultValue: 50000,
    },
    {
        name: "slides",
        type: "array",
        fields: [
            {
                name: "RightToLeft",
                type: "checkbox",
                defaultValue: false,
            },
            {
                name: "images",
                type: "array",
                fields: [
                    {
                        name: "Image",
                        type: "group",
                        fields: [
                            {
                                name: "filename",
                                type: "upload",
                                relationTo: "media",
                            },
                            {
                                name: "alt",
                                type: "text",
                            },
                        ],
                    },
                ],
            },
        ],
    },
];

module.exports = caseStudySlidesFields;
