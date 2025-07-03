export default function robots() {
    return {
        rules: [
            {
                userAgent: "*",
                allow: "/",
            },
        ],
        sitemap: "https://achcharu.lk/sitemap.xml",
        host: "https://achcharu.lk",
    }
}