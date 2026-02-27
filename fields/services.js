const servicesFields = [
    {
        name: "Heading",
        label: "Heading",
        type: "text",
    },
    {
        name: "Description",
        label: "Description",
        type: "textarea",
    },
    {
        name: "Tags",
        label: "Tags",
        type: "text",
    },
    {
        name: "TextAlign",
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
        name: "BGColor",
        label: "Background Color",
        type: "text",
        defaultValue: "#ffffff",
    },
    {
        name: "TitleColor",
        label: "Title Color",
        type: "text",
    },
    {
        name: "DescriptionColor",
        label: "Description Color",
        type: "text",
    },
    {
        name: "RemoveAnimations",
        label: "Remove Animations",
        type: "checkbox",
        defaultValue: false,
    },
    {
        name: "RemoveBorders",
        label: "Remove Borders",
        type: "checkbox",
        defaultValue: false,
    },
    {
        name: "ServiceCardTextColor",
        label: "Service Card Text Color",
        type: "text",
    },
    {
        name: "ServiceCard",
        label: "Service Cards",
        type: "array",
        fields: [
            {
                name: "Heading",
                type: "text",
            },
            {
                name: "Description",
                type: "textarea",
            },
            {
                name: "Image",
                type: "upload",
                relationTo: "media",
            },
            {
                name: "AltText",
                type: "text",
            },
            {
                name: "IconBgColor",
                type: "text",
            },
            {
                name: "GradientStyle",
                type: "text",
            },
            {
                name: "Link",
                type: "text",
            },
            {
                name: "HideBG",
                type: "checkbox",
                defaultValue: true,
            },
            {
                name: "HideBorder",
                type: "checkbox",
                defaultValue: false,
            },
        ],
    },
];

module.exports = servicesFields;
