import Head from "next/head";
import _ from "lodash";
import { getAllLegacyLegalAgreementBySlug, getLegacyLegalAgreementsAndMoreLegacyAgreements } from "../../util/api";

import dayjs from "dayjs";
let advancedFormat = require("dayjs/plugin/advancedFormat");
dayjs.extend(advancedFormat);
import { useContentfulLiveUpdates } from "@contentful/live-preview/react";
const LegacyLegalAgreement = (props) => {
 const obj = useContentfulLiveUpdates(props);

  const post = _.get(obj, "legacyLegaAgreement[0].fields");

  //const preview = _.get(post, "preview");
  const body = _.get(post, "body");
 
 
  return (
    <div>
      <div style={{background:'cornflowerblue',height:'100px',fontSize:'30px'}}>Content Live </div>
       Field: Body<div dangerouslySetInnerHTML={{__html:body?.text}}></div>
      </div>
       
  );
};

export async function getStaticProps({ params, preview = false }) {
  const data = await getLegacyLegalAgreementsAndMoreLegacyAgreements(params.slug, preview);

  return {
    props: {
      preview,
      legacyLegaAgreement: data?.legacyLegalAgreement ?? null,
      moreLegacyLegalAgreements: data?.moreLegacyLegalAgreements ?? null,
    },
  };
}

export async function getStaticPaths() {
  const allLegacyLegalAgreements = await getAllLegacyLegalAgreementBySlug();
  return {
    paths: Array.isArray()
      ? allLegacyLegalAgreements?.map(({ slug }) => `/legacyLegalAgreements/${slug}`) ?? []
      : [],
    fallback: true,
  };
}

export default LegacyLegalAgreement;
