
const PAYLOAD_API_URL = "http://127.0.0.1:3000/api";

async function diag() {
    const slug = "about";
    const url = `${PAYLOAD_API_URL}/pages?where[slug][equals]=${slug}&depth=2`;
    console.log(`Diagnostic: Fetching ${url}`);

    try {
        const res = await fetch(url);
        if (!res.ok) {
            console.error(`Diagnostic: Response NOT OK. Status: ${res.status}`);
            return;
        }
        const data = await res.json();
        console.log(`Diagnostic: Docs found: ${data.docs?.length || 0}`);
        if (data.docs && data.docs.length > 0) {
            const page = data.docs[0];
            console.log(`Diagnostic: Page Title: ${page.title}`);
            console.log(`Diagnostic: Page Sections Count: ${page.sections?.length || 0}`);
            if (page.sections) {
                page.sections.forEach((s, i) => {
                    console.log(`Diagnostic: Section ${i}: Type=${s.type}, ID=${s.id || s}`);
                    if (typeof s === 'object') {
                        console.log(`Diagnostic: Section ${i} keys: ${Object.keys(s).join(', ')}`);
                    }
                });
            }
        } else {
            // Check all pages
            console.log("Diagnostic: Checking all pages to find slug matches...");
            const allRes = await fetch(`${PAYLOAD_API_URL}/pages`);
            const allData = await allRes.json();
            console.log("Diagnostic: Available slugs:", allData.docs?.map(d => d.slug).join(', '));
        }
    } catch (err) {
        console.error("Diagnostic: Error:", err);
    }
}

diag();
