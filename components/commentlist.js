import Link from 'next/link';

import Date from './date'
import utilStyles from '../styles/utils.module.css'
import { getVideoCommentsFromUrl } from '../lib/youtube_service';

const name = 'Lucas';
export const siteTitle = 'Next.js Sample Website';


export default function CommentList({ comments }) {
    return (
        <ul>
            {
                comments.map(({id, date, text, authorDisplayName, authorProfileImageUrl}) => (
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
