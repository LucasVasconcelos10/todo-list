import Link from 'next/link';

import Date from '../components/date'
import utilStyles from '../styles/utils.module.css'
import { getSortedPostsData } from '../lib/posts';

const name = 'Lucas';
export const siteTitle = 'Next.js Sample Website';

export async function getStaticProps() {
  const items = getSortedPostsData();
  return {
    props: {
      items,
    },
  };
}

export default function Item_List({ items }) {
  return (
    <ul>
      {
        items.map(({ id, date, title }) => (
          <li className={utilStyles.listItem} key={id}>
            <Link href={`/todos/${id}`}>{title}</Link>
            <br />
            <small className={utilStyles.lightText}>
              <Date dateString={date} />
            </small>
          </li>
        ))
      }
      <li></li>
    </ul>
  )
}
