const clientAndPartnerFields = [
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
        name: "BgColor",
        type: "group",
        fields: [{ name: "color", type: "text", defaultValue: "#ffffff" }],
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
        name: "InfoTextColor",
        type: "group",
        fields: [{ name: "color", type: "text", defaultValue: "#333333" }],
    },
    {
        name: "HideBorder",
        type: "checkbox",
        defaultValue: true,
    },
    {
        name: "ClientAndPartnerInfo",
        type: "array",
        fields: [
            {
                name: "Image",
                type: "upload",
                relationTo: "media",
            },
            {
                name: "Grayscale",
                type: "checkbox",
                defaultValue: false,
            },
            {
                name: "LinkText",
                type: "text",
                defaultValue: "Partner",
            },
            {
                name: "LinkTextClass",
                type: "text",
            },
            {
                name: "Link",
                type: "group",
                fields: [
                    { name: "url", type: "text" },
                    {
                        name: "target",
                        type: "select",
                        options: [
                            { label: "New Tab", value: "_blank" },
                            { label: "Same Tab", value: "_self" },
                        ],
                        defaultValue: "_blank",
                    },
                ],
            },
        ],
    },
];

module.exports = clientAndPartnerFields;
