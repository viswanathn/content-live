import * as contentful from "contentful";
import _ from "lodash";

const getOptions = (is_preview) => {
  let options = {
    space: process.env.NEXT_PUBLIC_space_id || '',
    accessToken: process.env.NEXT_PUBLIC_preview_token || '',
    host: "preview.contentful.com",
    environment: process.env.NEXT_PUBLIC_environment || ''
  };

  return options;
};

export const getAllLocales = async () => {
  const options = getOptions(false);
  const contentfulClient = contentful.createClient(options);

  try {
    const locales = await contentfulClient.getLocales();
    const dataType = _.get(locales, "sys.type");
    const items = _.get(locales, "items");
    if (dataType === "Array") {
      return items;
    } else {
      return false;
    }
  } catch (er) {
    console.log("Error LOCALES", er);
    return false;
  }
};

export const getAllPostsWithSlug = async (preview) => {
  const options = getOptions(preview);
  const contentfulClient = contentful.createClient(options);

  let pages = await contentfulClient
    .getEntries({
      content_type: "post",
    })
    .then((entries) => {
      let items = _.get(entries, "items");

      const itemsWithSlug = items.filter((entry) => {
        const slugVal = _.get(entry, "fields.slug");
        if (slugVal) {
          return entry;
        }
      });

      if (itemsWithSlug) {
        return itemsWithSlug;
      } else {
        return false;
      }
    })
    .catch((er) => {
      console.log("ERROR", er);
      return false;
    });

  return pages;
  }

  export const getPostAndMorePosts = async (slug, preview) => {
    const options = getOptions(preview);
  
    const contentfulClient = contentful.createClient(options);
  
    let posts = await contentfulClient
      .getEntries({
        content_type: "post",
      })
      .then((entries) => {
        let items = _.get(entries, "items");
        //   item that matches the provided slug
        const itemsWithThisSlug = items.filter((entry) => {
          const fields = _.get(entry, "fields");
          const slugVal = _.get(entry, "fields.slug");
  
          if (slugVal === slug) {
            return fields;
          }
        });
        //   all others -> morePosts
        const itemsWithoutThisSlug = items.filter((entry) => {
          const slugVal = _.get(entry, "fields.slug");
          if (slugVal != slug) {
            return entry;
          }
        });
  
        return {
          post: itemsWithThisSlug,
          morePosts: itemsWithoutThisSlug,
        };
      })
      .catch((er) => {
        console.log("ERROR", er);
        return false;
      });
  
    return posts;
  }
export const getBodyRegionBySid = async (sid, contentType) => {
  const options = getOptions(true);
  const contentfulClient = contentful.createClient(options);

  try {
    const entries = await contentfulClient.getEntries({
      content_type: contentType,
      "fields.title": sid,
      locale: "en-US"
    });
    console.log(entries)
    const dataType = _.get(entries, "sys.type");
    const fields = _.get(entries, "items[0].fields");

    return fields;
  } catch (er) {
    console.log("ERROR", er);
    return false;
  }
};

export const getLegacyLegalAgreementBySlug = async (slug) => {
  const options = getOptions(true);
  const contentfulClient = contentful.createClient(options);

  try {
    const entries = await contentfulClient.getEntries({
      content_type: "legacyLegalAgreements",
      "fields.slug": slug,
    });
    const dataType = _.get(entries, "sys.type");
    const fields = _.get(entries, "items[0].fields");

    return fields;
  } catch (er) {
    console.log("ERROR", er);
    return false;
  }
};

export const getAllRegionsBySlug = async () => {
  const options = getOptions(false);
  const contentfulClient = contentful.createClient(options);

  try {
    const entries = await contentfulClient.getEntries({
      content_type: 'bodyAfricaCaribbeanAndOceaniaRegions',
      locale: 'en-US'
    });
    const items = _.get(entries, "items");

    const itemsWithSlug = items.filter((entry) => {
      const slugVal = _.get(entry, "fields.title");
      if (slugVal) {
        return entry;
      }
    });

    if (itemsWithSlug) {
      return itemsWithSlug;
    } else {
      return false;
    }
  } catch (er) {
    console.log("ERROR", er);
    return false;
  }
};

export const getAllLegacyLegalAgreementBySlug = async (preview) => {
  const options = getOptions(preview);
  const contentfulClient = contentful.createClient(options);

  try {
    const entries = await contentfulClient.getEntries({
      content_type: "legacyLegalAgreements",
    });
    const items = _.get(entries, "items");

    const itemsWithSlug = items.filter((entry) => {
      const slugVal = _.get(entry, "fields.slug");
      if (slugVal) {
        return entry;
      }
    });

    if (itemsWithSlug) {
      return itemsWithSlug;
    } else {
      return false;
    }
  } catch (er) {
    console.log("ERROR", er);
    return false;
  }
};

export const getRegionsAndMoreRegions = async (sid, contentType, locale) => {
  const options = getOptions(false);
  const contentfulClient = contentful.createClient(options);

  try {
    const entries = await contentfulClient.getEntries({
      content_type: contentType,
      locale: locale
    });
    const items = _.get(entries, "items");

    const itemsWithThisSlug = items.filter((entry) => {
      const fields = _.get(entry, "fields");
      const slugVal = _.get(entry, "fields.title");

      if (slugVal === sid) {
        return fields;
      }
    });

    const itemsWithoutThisSlug = items.filter((entry) => {
      const slugVal = _.get(entry, "fields.title");
      if (slugVal != sid) {
        return entry;
      }
    });

    return {
      regions: itemsWithThisSlug,
      moreRegions: itemsWithoutThisSlug,
    };
  } catch (er) {
    console.log("ERROR", er);
    return false;
  }
};

export const getLegacyLegalAgreementsAndMoreLegacyAgreements = async (slug, preview) => {
  const options = getOptions(preview);
  const contentfulClient = contentful.createClient(options);

  try {
    const entries = await contentfulClient.getEntries({
      content_type: "legacyLegalAgreements",
    });
    const items = _.get(entries, "items");

    const itemsWithThisSlug = items.filter((entry) => {
      const fields = _.get(entry, "fields");
      const slugVal = _.get(entry, "fields.slug");

      if (slugVal === slug) {
        return fields;
      }
    });

    const itemsWithoutThisSlug = items.filter((entry) => {
      const slugVal = _.get(entry, "fields.slug");
      if (slugVal != slug) {
        return entry;
      }
    });

    return {
      legacyLegalAgreement: itemsWithThisSlug,
      moreLegacyLegalAgreements: itemsWithoutThisSlug,
    };
  } catch (er) {
    console.log("ERROR", er);
    return false;
  }
};
  