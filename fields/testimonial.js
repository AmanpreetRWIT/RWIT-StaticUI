const testimonialFields = [
    {
        name: "BGColor",
        type: "text",
        defaultValue: "#F8F9FA",
    },
    {
        name: "Heading",
        type: "text",
    },
    {
        name: "HeadingColor",
        type: "text",
        defaultValue: "#000248",
    },
    {
        name: "Description",
        type: "textarea",
    },
    {
        name: "DescriptionColor",
        type: "text",
        defaultValue: "#757589",
    },
    {
        name: "Tags",
        type: "array",
        fields: [{ name: "tag", type: "text" }],
    },
    {
        name: "TestimonialCardTextColor",
        type: "text",
        defaultValue: "#333333",
    },
    {
        name: "TestimonialCard",
        type: "array",
        fields: [
            { name: "Name", type: "text" },
            { name: "Designation", type: "text" },
            { name: "ProfileImage", type: "upload", relationTo: "media" },
            { name: "Description", type: "textarea" },
            { name: "SelectStars", type: "number", min: 1, max: 5, defaultValue: 5 },
        ],
    },
    {
        name: "SelectClients",
        type: "array",
        fields: [
            { name: "FirstName", type: "text" },
            { name: "ContactPosition", type: "text" },
            { name: "ClientImage", type: "upload", relationTo: "media" },
            { name: "Testimonial", type: "textarea" },
            { name: "SelectRatingStars", type: "number", min: 1, max: 5, defaultValue: 5 },
        ],
    },
];

module.exports = testimonialFields;
