const breadcrumbFields = [
    {
        name: "title",
        label: "Title",
        type: "text",
    },
    {
        name: "root",
        label: "Root Label",
        type: "text",
        defaultValue: "Home",
    },
    {
        name: "rootUrl",
        label: "Root URL",
        type: "text",
        defaultValue: "/",
    },
    {
        name: "current",
        label: "Current Page Label",
        type: "text",
    },
    {
        name: "description",
        label: "Description",
        type: "text",
    },
    {
        name: "BGColor",
        label: "Background Color",
        type: "group",
        fields: [{ name: "color", type: "text" }],
    },
    {
        name: "TextColor",
        label: "Text Color",
        type: "group",
        fields: [{ name: "color", type: "text" }],
    },
    {
        name: "showBreadcrumb",
        label: "Show Breadcrumb",
        type: "checkbox",
        defaultValue: true,
    },
];

module.exports = breadcrumbFields;
