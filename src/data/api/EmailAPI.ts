import { AxiosResponse } from 'axios'
import { API } from './APIClass'
import { Email } from '@data/models/Email'

export default class EmailAPI extends API {
  list(): Promise<AxiosResponse<Email[]>> {
    return this.http.get('/emails')
  }

  create({ email }: { email: string }): Promise<AxiosResponse<Email>> {
    return this.http.post('/emails', email)
  }
}
