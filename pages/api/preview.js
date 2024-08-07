
import { getLegacyLegalAgreementBySlug, getBodyRegionBySid } from "../../util/api";
//import config from "../../components/config";
import { COOKIE_NAME_PRERENDER_BYPASS } from "next/dist/server/api-utils";

// http://localhost:9009/api/preview?secret=testing&slug=core-concepts

export default async function preview(req, res) {
    const { secret, slug, title, contentType, locale } = req.query;

    if (title) {
        if (secret !== process.env.NEXT_PUBLIC_previewSecret || !title || !contentType) {
            return res.status(401).json({ message: "Invalid token" });
        }
console.log(contentType,'88888888888888888888888')
        const regions = await getBodyRegionBySid(title, contentType);
        if (!regions) {
            return res.status(401).json({ message: "Invalid title" });
        }

        // Enable Preview Mode by setting the cookies
        res.setPreviewData({}); // more info on this here -> https://nextjs.org/docs/advanced-features/preview-mode

        const url1 = `/regions/${contentType}|${locale}|${regions.title}`;
        res.write(
            `<!DOCTYPE html><html><head><meta http-equiv="Refresh" content="0; url=${url1}" />
    <script>window.location.href = '${url1}'</script>
    </head>`
        );

    } else {
        if (secret !== process.env.NEXT_PUBLIC_previewSecret || !slug) {
            return res.status(401).json({ message: "Invalid token" });
        }

        const legacyLegalAgreements = await getLegacyLegalAgreementBySlug(slug);
        if (!legacyLegalAgreements) {
            return res.status(401).json({ message: "Invalid slug" });
        }

        // Enable Preview Mode by setting the cookies
        res.setPreviewData({}); // more info on this here -> https://nextjs.org/docs/advanced-features/preview-mode
        const url1 = `/legacyLegalAgreements/${legacyLegalAgreements.slug}`;
        res.write(
            `<!DOCTYPE html><html><head><meta http-equiv="Refresh" content="0; url=${url1}" />
    <script>window.location.href = '${url1}'</script>
    </head>`
        );

    }

    res.end();
}