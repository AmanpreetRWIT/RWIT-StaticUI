const brandTwoFields = [
    {
        name: "title",
        type: "text",
    },
    {
        name: "titleColor",
        type: "text",
        defaultValue: "rgb(255, 255, 255)",
    },
    {
        name: "bgColor",
        type: "text",
        defaultValue: "#f9f9f9",
    },
    {
        name: "sliderBgColor",
        type: "text",
        defaultValue: "rgb(0, 2, 72)",
    },
    {
        name: "logos",
        type: "array",
        fields: [
            { name: "src", type: "upload", relationTo: "media" },
            { name: "alt", type: "text" },
            { name: "width", type: "number", defaultValue: 120 },
            { name: "height", type: "number", defaultValue: 80 },
            { name: "grayscale", type: "checkbox", defaultValue: false },
        ],
    },
    {
        name: "sliderSettings",
        type: "group",
        fields: [
            { name: "autoplay", type: "checkbox", defaultValue: true },
            { name: "speed", type: "number", defaultValue: 12000 },
            { name: "infinite", type: "checkbox", defaultValue: true },
            { name: "slidesToShow", type: "number", defaultValue: 4 },
        ],
    },
];

module.exports = brandTwoFields;
