const repeatableItemsFields = [
    {
        name: "BgColor",
        type: "group",
        fields: [{ name: "color", type: "text", defaultValue: "#ffffff" }],
    },
    {
        name: "RowBlock",
        type: "array",
        fields: [
            {
                name: "ColumnWidth",
                type: "select",
                defaultValue: "col-12",
                options: [
                    { label: "Col 3", value: "col-3" },
                    { label: "Col 4", value: "col-4" },
                    { label: "Col 6", value: "col-6" },
                    { label: "Col 8", value: "col-8" },
                    { label: "Col 9", value: "col-9" },
                    { label: "Col 12", value: "col-12" },
                ],
            },
            {
                name: "TextAlign",
                type: "select",
                defaultValue: "text-start",
                options: [
                    { label: "Start", value: "text-start" },
                    { label: "Center", value: "text-center" },
                    { label: "End", value: "text-end" },
                ],
            },
            {
                name: "BlockContents",
                type: "array",
                fields: [
                    { name: "Title", type: "text" },
                    {
                        name: "Description",
                        type: "richText",
                    },
                ],
            },
        ],
    },
];

module.exports = repeatableItemsFields;
