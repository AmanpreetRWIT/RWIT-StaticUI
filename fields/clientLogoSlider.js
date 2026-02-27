const clientLogoSliderFields = [
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
        name: "BGColor",
        type: "group",
        fields: [{ name: "color", type: "text", defaultValue: "#f9f9f9" }],
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
        name: "FreeMode",
        type: "checkbox",
        defaultValue: true,
    },
    {
        name: "Autoplay",
        type: "checkbox",
        defaultValue: true,
    },
    {
        name: "Loop",
        type: "checkbox",
        defaultValue: true,
    },
    {
        name: "SliderDelay",
        type: "number",
        defaultValue: 2500,
    },
    {
        name: "Logos",
        type: "array",
        fields: [
            {
                name: "Image",
                type: "group",
                fields: [
                    { name: "filename", type: "upload", relationTo: "media" },
                    { name: "alt", type: "text" },
                ],
            },
        ],
    },
];

module.exports = clientLogoSliderFields;
