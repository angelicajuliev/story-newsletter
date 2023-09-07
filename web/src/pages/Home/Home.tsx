import { FunctionComponent } from 'react';
import './Home.scss'
import { DashboardData } from '@data/models/DashboardData';

type HomeProps = {
  dashboardData: DashboardData
}
const Home: FunctionComponent<HomeProps> = ({ dashboardData }) => {
  return (
    <div className='Home'>
      <h1>Home</h1>

      <section>
        <div className='card'>
          <h2>{dashboardData.totalSentEmails ?? 0}</h2>
          <h6>Sent emails</h6>
        </div>

        <div className='card'>
          <h2>{dashboardData.totalSentNewsletters ?? 0}</h2>
          <h6>Sent newsletters</h6>
        </div>

        <div className='card'>
          <h2>{dashboardData.totalScheduledNewsletters ?? 0}</h2>
          <h6>Scheduled newsletters</h6>
        </div>
        
        <div className='card'>
          <h2>{dashboardData.totalRecipients ?? 0}</h2>
          <h6>Subscribed recipients</h6>
        </div>
        
        <div className='card'>
          <h2>{dashboardData.totalNewsletters ?? 0}</h2>
          <h6>Total newsletters</h6>
        </div>
      </section>
    </div>
  );
}

export default Home;
