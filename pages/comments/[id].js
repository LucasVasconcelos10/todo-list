import Head from 'next/head';

import Layout from '../../components/layout'
import Date from '../../components/date'
import {getVideoCommentsFromUrl} from '../../lib/youtube_service';
import utilStyles from '../../styles/utils.module.css'

export async function getStaticProps({ params }) {
    // "comments": [
    //     {
    //       "kind": "youtube#comment",
    //       "etag": "dClgAjSJQrJjJKp-E1buYTNUUeQ",
    //       "id": "UgwEUq1I1tAB1Jz_SAt4AaABAg.9qwjHqE9Py79qwnDy7xbjL",
    //       "snippet": {
    //         "videoId": "8CLdvl11fPY",
    //         "textDisplay": "Then his next wedge shot the divot had a better shot tracer.",
    //         "textOriginal": "Then his next wedge shot the divot had a better shot tracer.",
    //         "parentId": "UgwEUq1I1tAB1Jz_SAt4AaABAg",
    //         "authorDisplayName": "Tupelo River",
    //         "authorProfileImageUrl": "https://yt3.ggpht.com/ytc/AGIKgqMPfd9WIGdTe_ZhIrFE5Nn1HOCoBOkiP-K3cw=s48-c-k-c0x00ffffff-no-rj",
    //         "authorChannelUrl": "http://www.youtube.com/channel/UCL-mZbJHb8LjlvFueaJuJJQ",
    //         "authorChannelId": {
    //           "value": "UCL-mZbJHb8LjlvFueaJuJJQ"
    //         },
    //         "canRate": true,
    //         "viewerRating": "none",
    //         "likeCount": 1,
    //         "publishedAt": "2023-06-14T13:55:51Z",
    //         "updatedAt": "2023-06-14T13:55:51Z"
    //       }
    //     }
    //   ]
    // comments will look like this ^^
    const commentData = await getPostData(params.id);
    return {
        props: {
            postData,
        }
    };
}

export async function getStaticPaths() {
    const paths = getAllPostIds();
    return {
        paths,
        fallback: false,
    };
}

export default function Comment({ commentData }) {
    return (
        <Layout>
            <Head>
                <title>{commentData.date}</title>
            </Head>
            <article>
                <h1 className={utilStyles.headingXl}>{postData.title}</h1>
                <div className={utilStyles.lightText}>
                    <Date dateString={postData.date} />
                </div>
                <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
            </article>
        </Layout>
    );
}