const heroFields = require("../fields/hero");
const aboutUsFields = require("../fields/aboutUs");
const ourValuesFields = require("../fields/ourValues");
const callToActionFields = require("../fields/callToAction");
const teamsFields = require("../fields/teams");
const brandThreeFields = require("../fields/brandThree");
const ourGalleryFields = require("../fields/ourGallery");
const latestStoriesFields = require("../fields/latestStories");
const servicesFields = require("../fields/services");
const caseStudySliderFields = require("../fields/caseStudySlider");
const caseStudyGridFields = require("../fields/caseStudyGrid");
const caseStudyMediaFields = require("../fields/caseStudyMedia");
const caseStudySlidesFields = require("../fields/caseStudySlides");
const clientAndPartnerFields = require("../fields/clientAndPartner");
const heroWithoutImageFields = require("../fields/heroWithoutImage");
const clientLogoSliderFields = require("../fields/clientLogoSlider");
const counterTwoFields = require("../fields/counterTwo");
const contentWithMediaFields = require("../fields/contentWithMedia");
const faqFields = require("../fields/faq");
const testimonialFields = require("../fields/testimonial");
const heroWithFormFields = require("../fields/heroWithForm");
const callToActionWithAvatarFields = require("../fields/callToActionWithAvatar");
const servicesWithLeftTitleFields = require("../fields/servicesWithLeftTitle");
const heroWithVerticalImageFields = require("../fields/heroWithVerticalImage");
const brandTwoFields = require("../fields/brandTwo");
const servicesWithStickyCardsFields = require("../fields/servicesWithStickyCards");
const comparisonFields = require("../fields/comparison");
const newsletterFields = require("../fields/newsletter");
const repeatableItemsFields = require("../fields/repeatableItems");

const Sections = {
    slug: "sections",
    admin: {
        useAsTitle: "type",
        defaultColumns: ["type", "createdAt"],
    },
    access: {
        read: () => true,
        create: () => true,
        update: () => true,
        delete: () => true,
    },
    fields: [
        {
            name: "type",
            label: "Section Type",
            type: "select",
            required: true,
            options: [
                { label: "Hero", value: "hero" },
                { label: "About Us", value: "aboutUs" },
                { label: "Our Values", value: "ourValues" },
                { label: "Call To Action", value: "callToAction" },
                { label: "Teams", value: "teams" },
                { label: "Gallery", value: "ourGallery" },
                { label: "Latest Stories", value: "latestStories" },
                { label: "Services", value: "services" },
                { label: "Case Study Slider", value: "caseStudySlider" },
                { label: "Case Study Grid", value: "caseStudyGrid" },
                { label: "Case Study Media", value: "caseStudyMedia" },
                { label: "Case Study Slides", value: "caseStudySlides" },
                { label: "Client And Partner", value: "clientAndPartner" },
                { label: "Hero Without Image", value: "heroWithoutImage" },
                { label: "Content With Media", value: "contentWithMedia" },
                { label: "FAQ", value: "faq" },
                { label: "Testimonial", value: "testimonial" },
                { label: "Hero With Form", value: "heroWithForm" },
                { label: "CTA With Avatar", value: "callToActionWithAvatar" },
                { label: "Services With Left Title", value: "servicesWithLeftTitle" },
                { label: "Hero With Vertical Image", value: "heroWithVerticalImage" },
                { label: "Brand Two", value: "brandTwo" },
                { label: "Services With Sticky Cards", value: "servicesWithStickyCards" },
                { label: "Comparison", value: "comparison" },
                { label: "Newsletter", value: "newsletter" },
                { label: "Repeatable Items", value: "repeatableItems" },
            ],
            defaultValue: "hero",
        },
        {
            name: "hero",
            label: "Hero Section",
            type: "group",
            admin: {
                condition: (data) => data?.type === "hero",
            },
            fields: heroFields,
        },
        {
            name: "aboutUs",
            label: "About Us Section",
            type: "group",
            admin: {
                condition: (data) => data?.type === "aboutUs",
            },
            fields: aboutUsFields,
        },
        {
            name: "ourValues",
            label: "Our Values Section",
            type: "group",
            admin: {
                condition: (data) => data?.type === "ourValues",
            },
            fields: ourValuesFields,
        },
        {
            name: "callToAction",
            label: "Call To Action Section",
            type: "group",
            admin: {
                condition: (data) => data?.type === "callToAction",
            },
            fields: callToActionFields,
        },
        {
            name: "teams",
            label: "Teams Section",
            type: "group",
            admin: {
                condition: (data) => data?.type === "teams",
            },
            fields: teamsFields,
        },
        {
            name: "brandThree",
            label: "Brands Three Section",
            type: "group",
            admin: {
                condition: (data) => data?.type === "brandThree",
            },
            fields: brandThreeFields,
        },
        {
            name: "ourGallery",
            label: "Gallery Section",
            type: "group",
            admin: {
                condition: (data) => data?.type === "ourGallery",
            },
            fields: ourGalleryFields,
        },
        {
            name: "latestStories",
            label: "Latest Stories Section",
            type: "group",
            admin: {
                condition: (data) => data?.type === "latestStories",
            },
            fields: latestStoriesFields,
        },
        {
            name: "services",
            label: "Services Section",
            type: "group",
            admin: {
                condition: (data) => data?.type === "services",
            },
            fields: servicesFields,
        },
        {
            name: "caseStudySlider",
            label: "Case Study Slider Section",
            type: "group",
            admin: {
                condition: (data) => data?.type === "caseStudySlider",
            },
            fields: caseStudySliderFields,
        },
        {
            name: "caseStudyGrid",
            label: "Case Study Grid Section",
            type: "group",
            admin: {
                condition: (data) => data?.type === "caseStudyGrid",
            },
            fields: caseStudyGridFields,
        },
        {
            name: "caseStudyMedia",
            label: "Case Study Media Section",
            type: "group",
            admin: {
                condition: (data) => data?.type === "caseStudyMedia",
            },
            fields: caseStudyMediaFields,
        },
        {
            name: "caseStudySlides",
            label: "Case Study Slides Section",
            type: "group",
            admin: {
                condition: (data) => data?.type === "caseStudySlides",
            },
            fields: caseStudySlidesFields,
        },
        {
            name: "clientAndPartner",
            label: "Client And Partner",
            type: "group",
            admin: {
                condition: (data) => data?.type === "clientAndPartner",
            },
            fields: clientAndPartnerFields,
        },
        {
            name: "heroWithoutImage",
            label: "Hero Without Image Section",
            type: "group",
            admin: {
                condition: (data) => data?.type === "heroWithoutImage",
            },
            fields: heroWithoutImageFields,
        },
        {
            name: "clientLogoSlider",
            label: "Client Logo Slider Section",
            type: "group",
            admin: {
                condition: (data) => data?.type === "clientLogoSlider",
            },
            fields: clientLogoSliderFields,
        },
        {
            name: "counterTwo",
            label: "Counter Two Column Section",
            type: "group",
            admin: {
                condition: (data) => data?.type === "counterTwo",
            },
            fields: counterTwoFields,
        },
        {
            name: "contentWithMedia",
            label: "Content With Media Section",
            type: "group",
            admin: {
                condition: (data) => data?.type === "contentWithMedia",
            },
            fields: contentWithMediaFields,
        },
        {
            name: "faq",
            label: "FAQ Section",
            type: "group",
            admin: {
                condition: (data) => data?.type === "faq",
            },
            fields: faqFields,
        },
        {
            name: "testimonial",
            label: "Testimonial Section",
            type: "group",
            admin: {
                condition: (data) => data?.type === "testimonial",
            },
            fields: testimonialFields,
        },
        {
            name: "heroWithForm",
            label: "Hero With Form Section",
            type: "group",
            admin: {
                condition: (data) => data?.type === "heroWithForm",
            },
            fields: heroWithFormFields,
        },
        {
            name: "callToActionWithAvatar",
            label: "CTA With Avatar Section",
            type: "group",
            admin: {
                condition: (data) => data?.type === "callToActionWithAvatar",
            },
            fields: callToActionWithAvatarFields,
        },
        {
            name: "servicesWithLeftTitle",
            label: "Services With Left Title Section",
            type: "group",
            admin: {
                condition: (data) => data?.type === "servicesWithLeftTitle",
            },
            fields: servicesWithLeftTitleFields,
        },
        {
            name: "heroWithVerticalImage",
            label: "Hero With Vertical Image Section",
            type: "group",
            admin: {
                condition: (data) => data?.type === "heroWithVerticalImage",
            },
            fields: heroWithVerticalImageFields,
        },
        {
            name: "brandTwo",
            label: "Brands Two Section",
            type: "group",
            admin: {
                condition: (data) => data?.type === "brandTwo",
            },
            fields: brandTwoFields,
        },
        {
            name: "servicesWithStickyCards",
            label: "Services With Sticky Cards Section",
            type: "group",
            admin: {
                condition: (data) => data?.type === "servicesWithStickyCards",
            },
            fields: servicesWithStickyCardsFields,
        },
        {
            name: "comparison",
            label: "Comparison Section",
            type: "group",
            admin: {
                condition: (data) => data?.type === "comparison",
            },
            fields: comparisonFields,
        },
        {
            name: "newsletter",
            label: "Newsletter Section",
            type: "group",
            admin: {
                condition: (data) => data?.type === "newsletter",
            },
            fields: newsletterFields,
        },
        {
            name: "repeatableItems",
            label: "Repeatable Items Section",
            type: "group",
            admin: {
                condition: (data) => data?.type === "repeatableItems",
            },
            fields: repeatableItemsFields,
        },
    ],
};

module.exports = Sections;
