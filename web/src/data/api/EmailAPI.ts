import { AxiosResponse } from 'axios'
import { API } from './APIClass'
import { Email } from '@data/models/Email'

export default class EmailAPI extends API {
  list(): Promise<AxiosResponse<Email[]>> {
    return this.http.get('/emails')
  }

  create(data: { email: string }): Promise<AxiosResponse<Email>> {
    return this.http.post('/emails', data)
  }

  unsubscribe({ id }: { id: number }): Promise<AxiosResponse> {
    return this.http.delete(`/emails/${id}`)
  }
}
