import { formatDate } from './formatDate'

describe('formatDate', () => {
  it('when the date is a object formats a date', () => {
    const date = new Date('2020/01/01')
    expect(formatDate(date)).toEqual('January 01, 2020')
  })

  it('when the date is a string formats a date', () => {
    const date = '2020/01/01'
    expect(formatDate(date)).toEqual('January 01, 2020')
  })
})
