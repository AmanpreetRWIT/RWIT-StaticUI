const callToActionWithAvatarFields = [
    {
        name: "isSlim",
        type: "checkbox",
        defaultValue: false,
    },
    {
        name: "isBlogPage",
        type: "checkbox",
        defaultValue: false,
    },
    {
        name: "bgColor",
        type: "text",
        defaultValue: "#f9f9f9",
    },
    {
        name: "avatar",
        type: "upload",
        relationTo: "media",
    },
    {
        name: "heading",
        type: "text",
    },
    {
        name: "tags",
        type: "text",
    },
    {
        name: "description",
        type: "textarea",
    },
    {
        name: "headingColor",
        type: "text",
        defaultValue: "#000248",
    },
    {
        name: "descriptionColor",
        type: "text",
        defaultValue: "#757589",
    },
    {
        name: "showTags",
        type: "checkbox",
        defaultValue: true,
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

module.exports = callToActionWithAvatarFields;
