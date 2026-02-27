const PAYLOAD_API_URL =
    process.env.NEXT_PUBLIC_PAYLOAD_API_URL || "http://127.0.0.1:3000/api";

/**
 * Fetch a page by slug with all sections populated (depth=2 to populate media).
 */
async function getPageBySlug(slug) {
    try {
        const url = `${PAYLOAD_API_URL}/pages?where[slug][equals]=${slug}&depth=2`;
        console.log(`Fetching page from Payload: ${url}`);
        const res = await fetch(
            url,
            { next: { revalidate: 60 } }
        );
        if (!res.ok) {
            console.error(`Payload fetch failed with status: ${res.status}`);
            return null;
        }
        const data = await res.json();
        console.log(`Payload returned ${data.docs?.length || 0} docs for slug '${slug}'`);
        return data.docs?.[0] || null;
    } catch (err) {
        console.error("Failed to fetch page:", err);
        return null;
    }
}

/**
 * Extract the first hero section from a page document.
 */
function getHeroFromPage(page) {
    if (!page?.sections?.length) return null;

    const heroSection = page.sections.find((s) => s.type === "hero");
    return heroSection?.hero || null;
}

/**
 * Transform Payload media object into a { src, alt } shape
 * that the static Hero component expects.
 */
function mediaToImage(mediaObj) {
    if (!mediaObj) return null;

    // If it's a Payload media document with url
    if (mediaObj.url) {
        return {
            src: mediaObj.url,
            alt: mediaObj.alt || "",
            width: mediaObj.width,
            height: mediaObj.height,
        };
    }

    // Fallback — already plain object
    return mediaObj;
}

/**
 * Robustly extract URL/filename from a Payload media object OR a static object.
 */
function getImageUrl(img) {
    if (!img) return "";
    return img.url || img.filename || (typeof img === "string" ? img : "");
}

/**
 * Robustly extract color string from a Payload color group OR a static string.
 */
function getColor(colorObj, fallback = "") {
    if (!colorObj) return fallback;
    if (typeof colorObj === "string") return colorObj;
    return colorObj.color || fallback;
}

/**
 * Map Payload hero data to the prop shape the Hero.js component expects.
 */
function mapHeroToProps(hero) {
    if (!hero) return null;

    return {
        title: hero.title || "",
        titleColor: getColor(hero.titleColor, ""),
        heading: hero.heading || "",
        headingColor: getColor(hero.headingColor, ""),
        useH2Heading: hero.useH2Heading || false,
        description: hero.description || "",
        descriptionColor: getColor(hero.descriptionColor, ""),
        gradientStyle: hero.gradientStyle || "theme-gradient-7",
        bgColor: getColor(hero.bgColor, ""),
        removeExtraPadding: hero.removeExtraPadding || false,
        textAlignment: hero.textAlignment || "centre",
        buttons: hero.buttons || { label: "", href: "#" },
        showBadges: hero.showBadges || false,
        logos: (hero.logos || []).map((item) => mediaToImage(item.image)).filter(Boolean),
        showbannerImage: hero.showbannerImage || false,
        bannerImage: mediaToImage(hero.bannerImage),
        gridImages: (hero.gridImages || []).map((item) => mediaToImage(item.image)).filter(Boolean),
        showGridImages: hero.showGridImages || false,
        flatColors: hero.flatColors || [],
        showFlatColors: hero.showFlatColors || false,
        partnersLogo: (hero.partnersLogo || []).map((item) => ({
            ...mediaToImage(item.image),
            href: item.href || "",
        })),
        partnerTitle: hero.partnerTitle || "",
        hideScrollToBottomIcon: hero.hideScrollToBottomIcon || false,
    };
}

/**
 * Map Payload aboutUs data to the prop shape the AboutUs.js component expects.
 */
function mapAboutUsToProps(aboutUs) {
    if (!aboutUs) return null;

    return {
        BGColor: { color: getColor(aboutUs.BGColor, "#ffffff") },
        Title: aboutUs.Title || "",
        TitleColor: { color: getColor(aboutUs.TitleColor, "#000248") },
        Description: aboutUs.Description || "",
        DescriptionColor: { color: getColor(aboutUs.DescriptionColor, "#757589") },
        Tags: (aboutUs.Tags || []).map((t) => (typeof t === 'string' ? t : t.tag)).filter(Boolean),
        DisableBgShape: aboutUs.DisableBgShape || false,
        Form: (aboutUs.Form || []).map((f) => ({
            FormTitle: f.FormTitle || "",
            FormName: f.FormName || "",
            SubmitButton: f.SubmitButton || "Submit",
            PhoneNumber: f.PhoneNumber || "",
            fields: (f.fields || []).map((field) => ({
                Name: field.Name,
                Type: field.Type,
                Label: field.Name,
                Placeholder: field.Placeholder,
                Required: field.Required,
            })),
        })),
    };
}

/**
 * Map Payload ourValues data to the prop shape the OurValues.js component expects.
 */
function mapOurValuesToProps(ourValues) {
    if (!ourValues) return null;

    return {
        Title: ourValues.Title || "",
        Tags: ourValues.Tags || "",
        Description: ourValues.Description || "",
        TitleColor: ourValues.TitleColor || "#000248",
        DescriptionColor: ourValues.DescriptionColor || "#757589",
        BGColor: ourValues.BGColor || "#ffffff",
        OurValueCardTextColor: ourValues.OurValueCardTextColor || "#111111",
        OurValueCardTextAlignment: ourValues.OurValueCardTextAlignment || "text-center",
        OurValueCard: (ourValues.OurValueCard || []).map((card) => ({
            Heading: card.Heading || "",
            Description: card.Description || "",
            Counter: card.Counter || "",
            CounterBgColor: card.CounterBgColor || "",
            CounterColor: card.CounterColor || "#ffffff",
            Link: card.Link || "",
        })),
    };
}

/**
 * Map Payload callToAction data to the prop shape the CallToAction.js component expects.
 */
function mapCallToActionToProps(cta) {
    if (!cta) return null;

    return {
        heading: cta.heading || "",
        description: cta.description || "",
        tags: cta.tags || "",
        titleColor: cta.titleColor || "#000248",
        descriptionColor: cta.descriptionColor || "#757589",
        bgColor: cta.bgColor || "#f3f3f3",
        backgroundImage: cta.backgroundImage?.url || "",
        minHeight: cta.minHeight || 400,
        buttons: cta.buttons || { label: "", href: "" },
        showPhone: cta.showPhone || false,
        phone: (cta.phone || []).map((p) => ({
            label: p.label || "",
            href: p.href || "",
        })),
        showTags: cta.showTags || false,
        disableBgShape: cta.disableBgShape || false,
        Sectiontitle: cta.Sectiontitle || false,
    };
}

/**
 * Map Payload teams data to the prop shape the Teams.js component expects.
 */
function mapTeamsToProps(teams) {
    if (!teams) return null;

    return {
        BGColor: { color: getColor(teams.BGColor, "#f8f9fa") },
        centeredTitle: teams.centeredTitle || false,
        showTags: teams.showTags || false,
        Tag: (teams.Tag || []).map((t) => ({
            TagName: t.TagName || "",
            TextColor: { color: getColor(t.TextColor, "") },
            BGColor: { color: getColor(t.BGColor, "") },
        })),
        Title: teams.Title || "",
        TitleColor: { color: getColor(teams.TitleColor, "#000248") },
        Description: teams.Description || "",
        DescriptionColor: { color: getColor(teams.DescriptionColor, "#555555") },
        TeamCardTextColor: { color: getColor(teams.TeamCardTextColor, "#1d1d1d") },
        RemoveCardBorder: teams.RemoveCardBorder || false,
        RemoveCardAnimation: teams.RemoveCardAnimation || false,
        Team: (teams.Team || []).map((member) => ({
            name: member.name || "",
            role: member.role || "",
            image: getImageUrl(member.image),
            socials: member.socials || {},
        })),
    };
}

/**
 * Map Payload brandThree data to the prop shape the BrandsThree.js component expects.
 */
function mapBrandThreeToProps(brand) {
    if (!brand) return null;

    return {
        bgColor: brand.bgColor || "#ffffff",
        revertColumn: brand.revertColumn || false,
        title: brand.title || "",
        subtitle: brand.subtitle || "",
        description: brand.description || "",
        titleColor: brand.titleColor || "",
        descriptionColor: brand.descriptionColor || "",
        logos: (brand.logos || []).map((l) => ({
            ...mediaToImage(l.image),
            grayscale: l.grayscale || false,
        })),
    };
}

/**
 * Map Payload ourGallery data to the prop shape the OurGallery.js component expects.
 */
function mapOurGalleryToProps(gallery) {
    if (!gallery) return null;

    return {
        Title: gallery.Title || "",
        Tags: gallery.Tags || "",
        TitleColor: { color: getColor(gallery.TitleColor, "") },
        BgColor: { color: getColor(gallery.BgColor, "") },
        CursorColor: { color: getColor(gallery.CursorColor, "") },
        CursorTextColor: { color: getColor(gallery.CursorTextColor, "") },
        showTitle: gallery.showTitle ?? true,
        Loop: gallery.Loop || false,
        Slide: (gallery.Slide || []).map((s) => ({
            Layout: s.Layout || "4",
            ImageA: { filename: getImageUrl(s.ImageA) },
            ImageB: { filename: getImageUrl(s.ImageB) },
            ImageC: { filename: getImageUrl(s.ImageC) },
            ImageD: { filename: getImageUrl(s.ImageD) },
        })),
    };
}

/**
 * Map Payload latestStories data to the prop shape the LatestStories.js component expects.
 */
function mapLatestStoriesToProps(stories) {
    if (!stories) return null;

    return {
        BGColor: stories.BGColor || "#ffffff",
        ShowSearchField: stories.ShowSearchField || false,
        ShowSectionTitle: stories.ShowSectionTitle ?? true,
        Title: stories.Title || "",
        Tags: stories.Tags || "",
        Description: stories.Description || "",
        TitleColor: stories.TitleColor || "",
        DescriptionColor: stories.DescriptionColor || "",
        Buttons: (stories.Buttons || []).map((b) => ({
            label: b.label || "",
            href: b.href || "",
            style: b.style || "btn-solid",
            icon: b.icon || "",
        })),
        stories: [], // This would typically be fetched separately or passed as a fallback
    };
}

/**
 * Map Payload contact data to the prop shape the Contact.js component expects.
 */
function mapContactToProps(contact) {
    if (!contact) return null;

    return {
        BGColor: contact.BGColor || { color: "#f9fafb" },
        paddingTop: contact.paddingTop || 100,
        paddingBottom: contact.paddingBottom || 100,
        TitleColor: contact.TitleColor || { color: "#000248" },
        DisableBgShape: contact.DisableBgShape || false,
        contactForms: (contact.contactForms || []).map((f) => ({
            formTitle: f.formTitle || "",
            formType: f.formType || "default-form",
            submitButton: f.submitButton || "Submit",
            submitButtonClass: f.submitButtonClass || "btn-primary",
            fields: (f.fields || []).map((field) => ({
                name: field.name,
                type: field.fieldType,
                label: field.label,
                placeholder: field.placeholder,
                required: field.required,
            })),
        })),
        ContactCardData: (contact.ContactCardData || []).map((card) => ({
            Icon: card.Icon || { type: "fa", icon: "" },
            Heading: card.Heading || "",
            Description: card.Description || "",
            Links: (card.Links || []).map((l) => ({
                label: l.label || "",
                url: l.url || "",
            })),
        })),
    };
}

/**
 * Map Payload ourOffice data to the prop shape the OurOffice.js component expects.
 */
function mapOurOfficeToProps(office) {
    if (!office) return null;

    return {
        Title: office.Title || "",
        Tags: office.Tags || "",
        TitleColor: office.TitleColor || "#000248",
        BGColor: office.BGColor || "#ffffff",
        OfficeCard: (office.OfficeCard || []).map((card) => ({
            Heading: card.Heading || "",
            Description: card.Description || "",
            Image: { filename: card.Image?.url || "", alt: card.Image?.alt || "" },
            Button: (card.Button || []).map((b) => ({ label: b.label || "" })),
        })),
    };
}

/**
 * Map Payload jobListing data to the prop shape the JobListing.js component expects.
 */
function mapJobListingToProps(jobListing) {
    if (!jobListing) return null;

    return {
        Title: jobListing.Title || "",
        Tags: jobListing.Tags || "",
        BGColor: jobListing.BGColor || { color: "" },
        Description: jobListing.Description || "",
        DescriptionColor: jobListing.DescriptionColor || { color: "" },
        EmptyCardMsg: jobListing.EmptyCardMsg || "No job openings at the moment.",
        data: [], // Typically fetched separately
    };
}

/**
 * Map Payload breadcrumb data to the prop shape the Breadcrumb.js component expects.
 */
function mapBreadcrumbToProps(breadcrumb) {
    if (!breadcrumb) return null;

    return {
        title: breadcrumb.title || "",
        root: breadcrumb.root || "Home",
        rootUrl: breadcrumb.rootUrl || "/",
        current: breadcrumb.current || "",
        description: breadcrumb.description || "",
        BGColor: { color: getColor(breadcrumb.BGColor, "") },
        TextColor: { color: getColor(breadcrumb.TextColor, "") },
        showBreadcrumb: breadcrumb.showBreadcrumb ?? true,
    };
}

/**
 * Map Payload services data to the prop shape the Services.js component expects.
 */
function mapServicesToProps(services) {
    if (!services) return null;

    return {
        Heading: services.Heading || "",
        Description: services.Description || "",
        Tags: services.Tags || "",
        TextAlign: services.TextAlign || "center",
        BGColor: getColor(services.BGColor, "#ffffff"),
        TitleColor: { color: getColor(services.TitleColor, "") },
        DescriptionColor: { color: getColor(services.DescriptionColor, "") },
        RemoveAnimations: services.RemoveAnimations || false,
        RemoveBorders: services.RemoveBorders || false,
        ServiceCardTextColor: { color: getColor(services.ServiceCardTextColor, "") },
        ServiceCard: (services.ServiceCard || []).map((card) => ({
            Heading: card.Heading || "",
            Description: card.Description || "",
            Image: getImageUrl(card.Image),
            AltText: card.AltText || "",
            IconBgColor: getColor(card.IconBgColor, ""),
            GradientStyle: card.GradientStyle || "",
            Link: card.Link || "",
            HideBG: card.HideBG ?? true,
            HideBorder: card.HideBorder || false,
        })),
    };
}

/**
 * Map Payload caseStudySlider data.
 */
function mapCaseStudySliderToProps(slider) {
    if (!slider) return null;

    return {
        BGColor: slider.BGColor || { color: "#f8f9fa" },
        Title: slider.Title || "",
        Description: slider.Description || "",
        TextAlignment: slider.TextAlignment || "center",
        TitleColor: slider.TitleColor || { color: "#000248" },
        DescriptionColor: slider.DescriptionColor || { color: "#757589" },
        CaseStudyCard: (slider.CaseStudyCard || []).map((card) => ({
            Image: { filename: card.Image?.url || "", alt: card.Image?.alt || "" },
            Tags: (card.Tags || []).map((t) => t.tag),
            Heading: card.Heading || "",
            Description: card.Description || "",
            Button: (card.Button || []).map((b) => ({ Label: b.Label || "", Link: b.Link || "" })),
            ShowCaseStudyStatistics: card.ShowCaseStudyStatistics ?? true,
            CaseStudyStatistics: (card.CaseStudyStatistics || []).map((s) => ({
                Counter: s.Counter || 0,
                CounterType: s.CounterType || "",
                CounterTitle: s.CounterTitle || "",
            })),
        })),
    };
}

/**
 * Map Payload caseStudyGrid data.
 */
function mapCaseStudyGridToProps(grid) {
    if (!grid) return null;

    return {
        caseStudies: (grid.caseStudies || []).map((cs) => ({
            Title: cs.Title || "",
            Description: cs.Description || "",
            CoverImage: cs.CoverImage?.url || "",
            full_slug: cs.full_slug || "",
            Label: cs.Label || "Read Case Study",
            CaseStudyLabels: (cs.CaseStudyLabels || []).map((l) => l.label),
        })),
    };
}

/**
 * Map Payload caseStudyMedia data.
 */
function mapCaseStudyMediaToProps(media) {
    if (!media) return null;

    return {
        stories: (media.stories || []).map((s) => ({
            content: {
                body: [
                    {
                        component: "CaseStudyDetails",
                        Title: s.Title || "",
                        Description: s.Description || "",
                        Label: s.Label || "Read Case Study",
                        Image: { filename: s.Image?.url || "", alt: s.Image?.alt || "" },
                        Logo: { filename: s.Logo?.url || "", alt: s.Logo?.alt || "" },
                        Link: s.Link || "/casestudies",
                    },
                ],
            },
        })),
    };
}

/**
 * Map Payload caseStudySlides data.
 */
function mapCaseStudySlidesToProps(slides) {
    if (!slides) return null;

    return {
        Tag: slides.Tag || "",
        TagColor: slides.TagColor || { color: "" },
        Heading: slides.Heading || "",
        HeadingColor: slides.HeadingColor || { color: "" },
        Description: slides.Description || "",
        DescriptionColor: slides.DescriptionColor || { color: "" },
        SliderSpeed: slides.SliderSpeed || 50000,
        slides: (slides.slides || []).map((s) => ({
            RightToLeft: s.RightToLeft ?? false,
            images: (s.images || []).map((img) => ({
                Image: {
                    filename: img.Image?.filename?.url || "",
                    alt: img.Image?.alt || "",
                },
            })),
        })),
    };
}

/**
 * Map Payload heroWithoutImage data.
 */
function mapHeroWithoutImageToProps(hero) {
    if (!hero) return null;

    return {
        title: hero.title || "",
        titleColor: hero.titleColor || "#1b90dc",
        heading: hero.heading || "",
        headingColor: hero.headingColor || "#000248",
        description: hero.description || "",
        descriptionColor: hero.descriptionColor || "#757589",
        bgColor: hero.bgColor || "#f0f0f0",
        gradientStyle: hero.gradientStyle || "theme-gradient-3",
        textAlignment: hero.textAlignment || "left",
        showButtons: hero.showButtons ?? false,
        buttons: hero.buttons || { label: "", href: "" },
    };
}

/**
 * Map Payload clientLogoSlider data.
 */
function mapClientLogoSliderToProps(slider) {
    if (!slider) return null;

    return {
        Title: slider.Title || "",
        Tags: slider.Tags || "",
        Description: slider.Description || "",
        BGColor: slider.BGColor || { color: "#f9f9f9" },
        TitleColor: slider.TitleColor || { color: "#000248" },
        DescriptionColor: slider.DescriptionColor || { color: "#757589" },
        FreeMode: slider.FreeMode ?? true,
        Autoplay: slider.Autoplay ?? true,
        Loop: slider.Loop ?? true,
        SliderDelay: slider.SliderDelay || 2500,
        Logos: (slider.Logos || []).map((l) => ({
            Image: { filename: l.Image?.filename?.url || "", alt: l.Image?.alt || "" },
        })),
    };
}

/**
 * Map Payload counterTwo data.
 */
function mapCounterTwoToProps(counter) {
    if (!counter) return null;

    return {
        SecondLayout: counter.SecondLayout ?? false,
        InvertColumns: counter.InvertColumns ?? true,
        BgColor: counter.BgColor || { color: "#f7f7f7" },
        Heading: counter.Heading || "",
        Tags: counter.Tags || "",
        Description: counter.Description || "",
        TitleColor: counter.TitleColor || { color: "#000248" },
        DescriptionColor: counter.DescriptionColor || { color: "#757589" },
        CounterTextColor: counter.CounterTextColor || { color: "#000248" },
        CounterItem: (counter.CounterItem || []).map((item) => ({
            Number: item.Number || 0,
            Description: item.Description || "",
            Icon: item.Icon || { type: "", icon: "" },
            IconColor: item.IconColor || { color: "" },
            BgColor: item.BgColor || { color: "" },
        })),
        Buttons: counter.Buttons || { label: "", onClick: "" },
    };
}

/**
 * Map Payload contentWithMedia data.
 */
function mapContentWithMediaToProps(content) {
    if (!content) return null;

    return {
        layoutType: content.layoutType || "flex-row",
        gradientStyle: content.gradientStyle || "theme-gradient-2",
        bgColor: content.bgColor || "#F8F9FA",
        disableBgShape: content.disableBgShape ?? false,
        image: { filename: content.image?.url || "", alt: content.image?.alt || "" },
        video: content.video || { filename: "" },
        tags: (content.tags || []).map((t) => ({ name: t.name })),
        title: content.title || "",
        titleColor: content.titleColor || "#222222",
        description: content.description || "",
        descriptionColor: content.descriptionColor || "#555555",
        buttons: (content.buttons || []).map((b) => ({
            text: b.text || "",
            href: b.href || "",
            style: b.style || "btn-primary",
        })),
    };
}

/**
 * Map Payload faq data.
 */
function mapFaqToProps(faq) {
    if (!faq) return null;

    return {
        Title: faq.Title || "",
        Tags: faq.Tags || "",
        Description: faq.Description || "",
        BGColor: faq.BGColor || { color: "#ffffff" },
        TitleColor: faq.TitleColor || { color: "#000248" },
        DescriptionColor: faq.DescriptionColor || { color: "#757589" },
        FaqCardTitleColor: faq.FaqCardTitleColor || { color: "#000248" },
        FaqDescriptionColor: faq.FaqDescriptionColor || { color: "#757589" },
        FaqCard: (faq.FaqCard || []).map((card) => ({
            Heading: card.Heading || "",
            Description: card.Description || { content: [] },
        })),
    };
}

/**
 * Map Payload testimonial data.
 */
function mapTestimonialToProps(testimonial) {
    if (!testimonial) return null;

    return {
        BGColor: testimonial.BGColor || "#F8F9FA",
        Heading: testimonial.Heading || "",
        HeadingColor: testimonial.HeadingColor || "#000248",
        Description: testimonial.Description || "",
        DescriptionColor: testimonial.DescriptionColor || "#757589",
        Tags: (testimonial.Tags || []).map((t) => t.tag),
        TestimonialCardTextColor: testimonial.TestimonialCardTextColor || "#333333",
        TestimonialCard: (testimonial.TestimonialCard || []).map((card) => ({
            Name: card.Name || "",
            Designation: card.Designation || "",
            ProfileImage: card.ProfileImage?.url || "",
            Description: card.Description || "",
            SelectStars: card.SelectStars || 5,
        })),
        SelectClients: (testimonial.SelectClients || []).map((client) => ({
            FirstName: client.FirstName || "",
            ContactPosition: client.ContactPosition || "",
            ClientImage: client.ClientImage?.url || "",
            Testimonial: client.Testimonial || "",
            SelectRatingStars: client.SelectRatingStars || 5,
        })),
    };
}

/**
 * Map Payload heroWithForm data.
 */
function mapHeroWithFormToProps(hero) {
    if (!hero) return null;

    return {
        title: hero.title || "",
        heading: hero.heading || "",
        description: hero.description || "",
        bgColor: hero.bgColor || "#F5F5F5",
        gradientStyle: hero.gradientStyle || "theme-gradient-3",
        removeExtraPadding: hero.removeExtraPadding ?? false,
        buttons: hero.buttons || { label: "", href: "", target: "_blank" },
        contactForms: (hero.contactForms || []).map((form) => ({
            formTitle: form.formTitle || "",
            formType: form.formType || "default-form",
            submitButton: form.submitButton || "Submit",
            submitButtonClass: form.submitButtonClass || "btn-primary",
            fields: (form.fields || []).map((f) => ({
                name: f.name || "",
                type: f.type || "text",
                label: f.label || "",
                placeholder: f.placeholder || "",
                required: f.required ?? false,
            })),
        })),
    };
}

/**
 * Map Payload callToActionWithAvatar data.
 */
function mapCallToActionWithAvatarToProps(cta) {
    if (!cta) return null;

    return {
        isSlim: cta.isSlim ?? false,
        isBlogPage: cta.isBlogPage ?? false,
        bgColor: cta.bgColor || "#f9f9f9",
        avatar: cta.avatar?.url || "",
        heading: cta.heading || "",
        tags: cta.tags || "",
        description: cta.description || "",
        headingColor: cta.headingColor || "#000248",
        descriptionColor: cta.descriptionColor || "#757589",
        showTags: cta.showTags ?? true,
        buttons: cta.buttons || { label: "", href: "" },
    };
}

/**
 * Map Payload servicesWithLeftTitle data.
 */
function mapServicesWithLeftTitleToProps(services) {
    if (!services) return null;

    return {
        Tags: services.Tags || "",
        Title: services.Title || "",
        BGColor: services.BGColor || "#ffffff",
        TitleColor: services.TitleColor || "#000248",
        DescriptionColor: services.DescriptionColor || "#757589",
        InvertColumn: services.InvertColumn ?? false,
        Description: services.Description || "",
        Services: (services.Services || []).map((s) => ({
            Heading: s.Heading || "",
            Description: s.Description || "",
            Image: s.Image?.url || "",
            AltText: s.AltText || "",
        })),
    };
}

/**
 * Map Payload heroWithVerticalImage data.
 */
function mapHeroWithVerticalImageToProps(hero) {
    if (!hero) return null;

    return {
        title: hero.title || "",
        titleColor: hero.titleColor || "#1b90dc",
        heading: hero.heading || "",
        headingColor: hero.headingColor || "#000248",
        description: hero.description || "",
        descriptionColor: hero.descriptionColor || "#757589",
        bgColor: hero.bgColor || "#f0f0f0",
        gradientStyle: hero.gradientStyle || "theme-gradient-3",
        imageOnTop: hero.imageOnTop ?? false,
        bannerImage: { src: hero.bannerImage?.url || "", alt: hero.bannerImage?.alt || "" },
        textAlignment: hero.textAlignment || "left",
        showButtons: hero.showButtons ?? false,
        buttons: hero.buttons || { label: "", href: "" },
    };
}

/**
 * Map Payload brandTwo data.
 */
function mapBrandTwoToProps(brand) {
    if (!brand) return null;

    return {
        title: brand.title || "",
        titleColor: brand.titleColor || "rgb(255, 255, 255)",
        bgColor: brand.bgColor || "#f9f9f9",
        sliderBgColor: brand.sliderBgColor || "rgb(0, 2, 72)",
        logos: (brand.logos || []).map((l) => ({
            src: l.src?.url || "",
            alt: l.alt || "",
            width: l.width || 120,
            height: l.height || 80,
            grayscale: l.grayscale ?? false,
        })),
        sliderSettings: brand.sliderSettings || { autoplay: true, speed: 12000, infinite: true, slidesToShow: 4 },
    };
}

/**
 * Map Payload servicesWithStickyCards data.
 */
function mapServicesWithStickyCardsToProps(services) {
    if (!services) return null;

    return {
        BGColor: services.BGColor || "",
        Title: services.Title || "",
        TitleColor: services.TitleColor || "",
        DescriptionColor: services.DescriptionColor || "#757589",
        Description: services.Description || "",
        Tags: (services.Tags || []).map((t) => t.tag),
        Image: services.Image?.url || null,
        ImageAlt: services.ImageAlt || "",
        showImageOnRight: services.showImageOnRight ?? false,
        CardTitleColor: services.CardTitleColor || "",
        CardDescriptionColor: services.CardDescriptionColor || "#757589",
        Services: (services.Services || []).map((s) => ({
            Heading: s.Heading || "",
            Description: s.Description || "",
            Image: s.Image?.url || "",
            AltText: s.AltText || "",
            Link: s.Link || "",
        })),
    };
}

/**
 * Map Payload comparison data.
 */
function mapComparisonToProps(comp) {
    if (!comp) return null;

    return {
        isSlim: comp.isSlim ?? false,
        Title: comp.Title || "",
        Tags: comp.Tags || "",
        Description: comp.Description || "",
        HeadingColor: comp.HeadingColor || "#000248",
        DescriptionColor: comp.DescriptionColor || "#757589",
        BGColor: comp.BGColor || "#f5f5f5",
        LabelText: comp.LabelText || "",
        ButtonText: comp.ButtonText || "",
        DropDownOne: (comp.DropDownOne || []).map((o) => o.option),
    };
}

/**
 * Map Payload newsletter data.
 */
function mapNewsletterToProps(news) {
    if (!news) return null;

    return {
        Title: news.Title || "",
        TitleColor: news.TitleColor || "#000248",
        BgColor: news.BgColor || "#eef0fa",
        BorderColor: news.BorderColor || "#E0E6FF",
        ButtonName: news.ButtonName || "Subscribe",
        SuccessMessage: news.SuccessMessage || "Thanks for subscribing to our newsletter!",
    };
}

/**
 * Map Payload repeatableItems data.
 */
function mapRepeatableItemsToProps(rin) {
    if (!rin) return null;

    return {
        BgColor: rin.BgColor || { color: "#ffffff" },
        RowBlock: (rin.RowBlock || []).map((row) => ({
            ColumnWidth: row.ColumnWidth || "col-12",
            TextAlign: row.TextAlign || "text-start",
            BlockContents: (row.BlockContents || []).map((block) => ({
                Title: block.Title || "",
                Description: block.Description || { content: [] },
            })),
        })),
    };
}

/**
 * Map Payload clientAndPartner data.
 */
function mapClientAndPartnerToProps(cap) {
    if (!cap) return null;

    return {
        Title: cap.Title || "",
        Tags: cap.Tags || "",
        Description: cap.Description || "",
        BgColor: cap.BgColor || { color: "#ffffff" },
        TitleColor: cap.TitleColor || { color: "#000248" },
        DescriptionColor: cap.DescriptionColor || { color: "#757589" },
        InfoTextColor: cap.InfoTextColor || { color: "#333333" },
        HideBorder: cap.HideBorder ?? true,
        ClientAndPartnerInfo: (cap.ClientAndPartnerInfo || []).map((info) => ({
            Image: { filename: info.Image?.url || "", alt: info.Image?.alt || "" },
            Grayscale: info.Grayscale ?? false,
            LinkText: info.LinkText || "Partner",
            LinkTextClass: info.LinkTextClass || "",
            Link: info.Link || { url: "", target: "_blank" },
        })),
    };
}

function mapPageSections(page) {
    if (!page?.sections?.length) {
        console.log("mapPageSections: No sections found in page object.");
        return [];
    }

    console.log(`mapPageSections: Mapping ${page.sections.length} sections for page.`);

    const mapped = page.sections.map((section, idx) => {
        const type = section.type;
        let mappedData = null;

        console.log(`[SECTION ${idx}] Mapping type: ${type}`);

        if (type === "hero") mappedData = mapHeroToProps(section.hero);
        else if (type === "aboutUs") mappedData = mapAboutUsToProps(section.aboutUs);
        else if (type === "ourValues") mappedData = mapOurValuesToProps(section.ourValues);
        else if (type === "callToAction") mappedData = mapCallToActionToProps(section.callToAction);
        else if (type === "teams") mappedData = mapTeamsToProps(section.teams);
        else if (type === "brandThree") mappedData = mapBrandThreeToProps(section.brandThree);
        else if (type === "ourGallery") mappedData = mapOurGalleryToProps(section.ourGallery);
        else if (type === "latestStories") mappedData = mapLatestStoriesToProps(section.latestStories);
        else if (type === "contact") mappedData = mapContactToProps(section.contact);
        else if (type === "ourOffice") mappedData = mapOurOfficeToProps(section.ourOffice);
        else if (type === "jobListing") mappedData = mapJobListingToProps(section.jobListing);
        else if (type === "breadcrumb") mappedData = mapBreadcrumbToProps(section.breadcrumb);
        else if (type === "services") mappedData = mapServicesToProps(section.services);
        else if (type === "caseStudySlider") mappedData = mapCaseStudySliderToProps(section.caseStudySlider);
        else if (type === "caseStudyGrid") mappedData = mapCaseStudyGridToProps(section.caseStudyGrid);
        else if (type === "caseStudyMedia") mappedData = mapCaseStudyMediaToProps(section.caseStudyMedia);
        else if (type === "caseStudySlides") mappedData = mapCaseStudySlidesToProps(section.caseStudySlides);
        else if (type === "clientAndPartner") mappedData = mapClientAndPartnerToProps(section.clientAndPartner);
        else if (type === "heroWithoutImage") mappedData = mapHeroWithoutImageToProps(section.heroWithoutImage);
        else if (type === "clientLogoSlider") mappedData = mapClientLogoSliderToProps(section.clientLogoSlider);
        else if (type === "counterTwo") mappedData = mapCounterTwoToProps(section.counterTwo);
        else if (type === "contentWithMedia") mappedData = mapContentWithMediaToProps(section.contentWithMedia);
        else if (type === "faq") mappedData = mapFaqToProps(section.faq);
        else if (type === "testimonial") mappedData = mapTestimonialToProps(section.testimonial);
        else if (type === "heroWithForm") mappedData = mapHeroWithFormToProps(section.heroWithForm);
        else if (type === "callToActionWithAvatar") mappedData = mapCallToActionWithAvatarToProps(section.callToActionWithAvatar);
        else if (type === "servicesWithLeftTitle") mappedData = mapServicesWithLeftTitleToProps(section.servicesWithLeftTitle);
        else if (type === "heroWithVerticalImage") mappedData = mapHeroWithVerticalImageToProps(section.heroWithVerticalImage);
        else if (type === "brandTwo") mappedData = mapBrandTwoToProps(section.brandTwo);
        else if (type === "servicesWithStickyCards") mappedData = mapServicesWithStickyCardsToProps(section.servicesWithStickyCards);
        else if (type === "comparison") mappedData = mapComparisonToProps(section.comparison);
        else if (type === "newsletter") mappedData = mapNewsletterToProps(section.newsletter);
        else if (type === "repeatableItems") mappedData = mapRepeatableItemsToProps(section.repeatableItems);

        if (!mappedData) {
            console.warn(`[SECTION ${idx}] Mapping returned NULL for type: ${type}`);
        }

        return {
            type,
            data: mappedData,
        };
    });

    const filtered = mapped.filter(s => s.data !== null);
    console.log(`mapPageSections: Retained ${filtered.length} valid sections out of ${mapped.length}.`);
    return filtered;
}

module.exports = {
    getPageBySlug,
    getHeroFromPage,
    mapHeroToProps,
    mediaToImage,
    mapPageSections,
};
