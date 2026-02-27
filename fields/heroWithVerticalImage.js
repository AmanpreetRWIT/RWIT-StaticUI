const heroWithVerticalImageFields = [
    {
        name: "title",
        label: "Title (Tagline)",
        type: "text",
    },
    {
        name: "titleColor",
        label: "Title Color",
        type: "text",
        defaultValue: "#1b90dc",
    },
    {
        name: "heading",
        label: "Heading",
        type: "text",
    },
    {
        name: "headingColor",
        label: "Heading Color",
        type: "text",
        defaultValue: "#000248",
    },
    {
        name: "description",
        label: "Description",
        type: "textarea",
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
        defaultValue: "#f0f0f0",
    },
    {
        name: "gradientStyle",
        label: "Gradient Style",
        type: "text",
        defaultValue: "theme-gradient-3",
    },
    {
        name: "imageOnTop",
        label: "Image On Top",
        type: "checkbox",
        defaultValue: false,
    },
    {
        name: "bannerImage",
        label: "Banner Image",
        type: "upload",
        relationTo: "media",
    },
    {
        name: "textAlignment",
        label: "Text Alignment",
        type: "select",
        defaultValue: "left",
        options: [
            { label: "Left", value: "left" },
            { label: "Center", value: "center" },
            { label: "Right", value: "right" },
        ],
    },
    {
        name: "showButtons",
        label: "Show Buttons",
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
        ],
    },
];

module.exports = heroWithVerticalImageFields;
