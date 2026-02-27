/**
 * Hero section fields — maps every editable prop from Hero.js
 * to a Payload CMS field definition.
 */
const heroFields = [
    // ── Content ──────────────────────────────────────────────
    {
        name: "title",
        label: "Title (Tagline)",
        type: "text",
        admin: { description: "Short tagline above the main heading" },
    },
    {
        name: "titleColor",
        label: "Title Color",
        type: "text",
        admin: { description: "Hex colour, e.g. #1b90dc" },
    },
    {
        name: "heading",
        label: "Heading",
        type: "text",
        required: true,
        admin: { description: "Main heading text (h1 or h2)" },
    },
    {
        name: "headingColor",
        label: "Heading Color",
        type: "text",
        admin: { description: "Hex colour for the heading" },
    },
    {
        name: "useH2Heading",
        label: "Use H2 instead of H1",
        type: "checkbox",
        defaultValue: false,
    },
    {
        name: "description",
        label: "Description",
        type: "textarea",
        admin: { description: "Paragraph text below the heading" },
    },
    {
        name: "descriptionColor",
        label: "Description Color",
        type: "text",
        admin: { description: "Hex colour for description" },
    },

    // ── Styling ──────────────────────────────────────────────
    {
        name: "gradientStyle",
        label: "Gradient Style",
        type: "select",
        defaultValue: "theme-gradient-7",
        options: [
            { label: "Gradient 1", value: "theme-gradient-1" },
            { label: "Gradient 2", value: "theme-gradient-2" },
            { label: "Gradient 3", value: "theme-gradient-3" },
            { label: "Gradient 4", value: "theme-gradient-4" },
            { label: "Gradient 5", value: "theme-gradient-5" },
            { label: "Gradient 6", value: "theme-gradient-6" },
            { label: "Gradient 7", value: "theme-gradient-7" },
        ],
    },
    {
        name: "bgColor",
        label: "Background Color Override",
        type: "text",
        admin: { description: "Hex colour that overrides the gradient" },
    },
    {
        name: "removeExtraPadding",
        label: "Remove Extra Padding",
        type: "checkbox",
        defaultValue: false,
    },
    {
        name: "textAlignment",
        label: "Text Alignment",
        type: "select",
        defaultValue: "centre",
        options: [
            { label: "Left", value: "left" },
            { label: "Centre", value: "centre" },
            { label: "Right", value: "right" },
        ],
    },

    // ── Button ───────────────────────────────────────────────
    {
        name: "buttons",
        label: "CTA Button",
        type: "group",
        fields: [
            {
                name: "label",
                label: "Button Label",
                type: "text",
                required: true,
                defaultValue: "Get in touch",
            },
            {
                name: "href",
                label: "Button Link",
                type: "text",
                required: true,
                defaultValue: "/contact",
            },
        ],
    },

    // ── Badges / Logos Slider ────────────────────────────────
    {
        name: "showBadges",
        label: "Show Badges Section",
        type: "checkbox",
        defaultValue: false,
    },
    {
        name: "logos",
        label: "Badge Logos",
        type: "array",
        admin: {
            condition: (data) => data?.showBadges,
            description: "Logos shown in the badges slider",
        },
        fields: [
            {
                name: "image",
                label: "Logo Image",
                type: "upload",
                relationTo: "media",
                required: true,
            },
        ],
    },

    // ── Banner Image ─────────────────────────────────────────
    {
        name: "showbannerImage",
        label: "Show Banner Image",
        type: "checkbox",
        defaultValue: false,
    },
    {
        name: "bannerImage",
        label: "Banner Image",
        type: "upload",
        relationTo: "media",
        admin: {
            condition: (data) => data?.showbannerImage,
        },
    },

    // ── Grid Images ──────────────────────────────────────────
    {
        name: "showGridImages",
        label: "Show Grid Images",
        type: "checkbox",
        defaultValue: false,
    },
    {
        name: "gridImages",
        label: "Grid Images (exactly 4)",
        type: "array",
        minRows: 4,
        maxRows: 4,
        admin: {
            condition: (data) => data?.showGridImages && !data?.showFlatColors,
            description: "Exactly 4 images for the grid layout",
        },
        fields: [
            {
                name: "image",
                label: "Grid Image",
                type: "upload",
                relationTo: "media",
                required: true,
            },
        ],
    },

    // ── Flat Colors ──────────────────────────────────────────
    {
        name: "showFlatColors",
        label: "Show Flat Colors",
        type: "checkbox",
        defaultValue: false,
    },
    {
        name: "flatColors",
        label: "Flat Color Blocks (exactly 4)",
        type: "array",
        minRows: 4,
        maxRows: 4,
        admin: {
            condition: (data) => data?.showFlatColors,
            description: "4 hex colours for animated color blocks",
        },
        fields: [
            {
                name: "color",
                label: "Hex Color",
                type: "text",
                required: true,
                admin: { description: "e.g. #FF6F61" },
            },
        ],
    },

    // ── Partners ─────────────────────────────────────────────
    {
        name: "partnerTitle",
        label: "Partners Section Title",
        type: "text",
        admin: { description: "Heading above partner logos, e.g. 'Certified Agency Partners of'" },
    },
    {
        name: "partnersLogo",
        label: "Partner Logos",
        type: "array",
        fields: [
            {
                name: "image",
                label: "Partner Logo",
                type: "upload",
                relationTo: "media",
                required: true,
            },
            {
                name: "href",
                label: "Partner Link (optional)",
                type: "text",
            },
        ],
    },

    // ── Scroll ───────────────────────────────────────────────
    {
        name: "hideScrollToBottomIcon",
        label: "Show Scroll-to-Bottom Icon",
        type: "checkbox",
        defaultValue: false,
    },
];

module.exports = heroFields;
