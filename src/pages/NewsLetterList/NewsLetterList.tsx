import './NewsLetterList.scss'
import { FunctionComponent } from 'react'
import { MdAdd, MdFreeCancellation } from 'react-icons/md'
import Button from '@components/Button/Button'
import { Newsletter } from '@data/models/Newsletter'

type NewsLetterListProps = {
  newsletters: Newsletter[]
}
const NewsLetterList: FunctionComponent<NewsLetterListProps> = ({
  newsletters = [],
}) => {
  return (
    <div className='Newsletter'>
      <section className='EmailList__header'>
        <h1>Newsletters</h1>

        <div className='actions'>
          <Button
            variant='link-icon'
            title='Create a newsletter'
            to='/newsletters/create'
          >
            <MdAdd />
          </Button>
        </div>
      </section>

      <ul className='list'>
        <li className='list-header'>
          <b>Subject</b>
          <b>Status</b>
          <b>Date</b>
          <b>Actions</b>
        </li>

        {newsletters.map((newsletter) => {
          console.log(
            '🚀 ~ file: NewsLetterList.tsx:53 ~ {newsletters.map ~ newsletter:',
            newsletter
          )
          return (
            <li key={newsletter.id ?? newsletter.subject}>
              <p className='subject'>{newsletter.subject}</p>
              <p className='status'>{newsletter.status}</p>
              <p>{newsletter.date}</p>
              <div className='actions'>
                {newsletter.status === 'scheduled' && (
                  <Button variant='icon' title='Cancel the scheduled email'>
                    <MdFreeCancellation />
                  </Button>
                )}
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default NewsLetterList
