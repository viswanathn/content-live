import React from 'react';
import Head from "next/head";
import _ from "lodash";
import { GetStaticProps, GetStaticPaths } from 'next';
import { getAllLocales, getAllRegionsBySlug, getRegionsAndMoreRegions } from "../../util/api";
import { useContentfulLiveUpdates } from "@contentful/live-preview/react";

import Meta from "../../components/meta";



const Regions= (props) => {
  const obj = useContentfulLiveUpdates(props);

  const post = _.get(obj, "region[0].fields");

  const body = _.get(post, "body");

  return (
    <>
      <Meta />
      <div className="legalContainer Desktop Mac">
        <div
          className="legalAgreement nsg-font-family--platform content"
          id="legalContainer"
        >
          <div style={{ background: 'cornflowerblue', height: '46px', fontSize: '26px' }}>Live Content</div>
          <div dangerouslySetInnerHTML={{__html:body?.text}} style={{paddingLeft:'80px',paddingRight:'80px',paddingTop:'80px'}}></div>
     
        </div>
      </div>
    </>
  );
};

export const getStaticPaths = async () => {
  try {
    const allRegions = await getAllRegionsBySlug();
    const paths = allRegions?.map(({ title }) => ({
      params: { slug: `bodyAfricaCaribbeanAndOceaniaRegions|en-US|${title}` || '' }
    })) ?? [];
    return {
      paths,
      fallback: true,
    };
  } catch (error) {
    console.error(error);
    return {
      paths: [],
      fallback: true,
    };
  }
}

export const getStaticProps = async ({ params, preview = false }) => {
  const delimiter = '|';
  let parts = Array.isArray(params?.slug) ? params?.slug.join('')?.split(delimiter) : params?.slug?.split(delimiter);
  if (parts?.length === 3) {
    const [contentType, locale, remainingContent] = parts;

    const data = await getRegionsAndMoreRegions(remainingContent, contentType, locale);

    return {
      props: {
        preview,
        region: data?.regions ?? null,
        moreRegions: data?.moreRegions ?? null,
      },
    };
  } else {
    return {
      props: {
        preview,
        region: null,
        moreRegions: null,
      },
    };
  }
}

export default Regions;