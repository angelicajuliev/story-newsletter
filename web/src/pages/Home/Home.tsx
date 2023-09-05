import './Home.scss'

const Home = () => {
  return (
    <div className='Home'>
      <h1>Home</h1>

      <section>
        <div className='card'>
          <h2>500</h2>
          <h6>Emails enviados</h6>
        </div>
        
        <div className='card'>
          <h2>100</h2>
          <h6>Emails registrados</h6>
        </div>
      </section>
    </div>
  );
}

export default Home;
