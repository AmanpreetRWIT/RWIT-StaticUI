const brandThreeFields = [
    {
        name: "bgColor",
        label: "Background Color",
        type: "text",
        defaultValue: "#ffffff",
    },
    {
        name: "revertColumn",
        label: "Revert Column Order",
        type: "checkbox",
        defaultValue: false,
    },
    {
        name: "title",
        label: "Title",
        type: "text",
    },
    {
        name: "subtitle",
        label: "Subtitle (Tags)",
        type: "text",
    },
    {
        name: "description",
        label: "Description",
        type: "textarea",
    },
    {
        name: "titleColor",
        label: "Title Color",
        type: "text",
    },
    {
        name: "descriptionColor",
        label: "Description Color",
        type: "text",
    },
    {
        name: "logos",
        label: "Logos",
        type: "array",
        fields: [
            {
                name: "image",
                type: "upload",
                relationTo: "media",
            },
            {
                name: "grayscale",
                label: "Gray Scale",
                type: "checkbox",
                defaultValue: false,
            },
        ],
    },
];

module.exports = brandThreeFields;
