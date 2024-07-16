import Head from "next/head";
import _ from "lodash";
import Layout from "../components/layout";
import { getAllPostsForHome, getAllLocales } from "../util/api";
import HeroPost from "../components/heroPost";
import MorePosts from "../components/morePosts";

import dayjs from "dayjs";
let advancedFormat = require("dayjs/plugin/advancedFormat");
dayjs.extend(advancedFormat);

export default function Home(props) {
  const post = _.get(props, "legacyLegaAgreement[0].fields");
  const body = _.get(post, "body");

  return (
    <div>
      <Layout preview={preview}>
        <hr />
        <div>
       <div dangerouslySetInnerHTML={{__html:body.text}}></div>
      </div>
      </Layout>
      <div className=""></div>
    </div>
  );
}

export async function getStaticProps({ preview = false }) {
  const data = await getLegacyLegalAgreementsAndMoreLegacyAgreements(params.slug, preview);

  return {
    props: {
      preview,
      legacyLegaAgreement: data?.legacyLegalAgreement ?? null,
      moreLegacyLegalAgreements: data?.moreLegacyLegalAgreements ?? null,
    },
  };
}
