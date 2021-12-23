import { Link } from "react-router-dom"

const About = () => {
  return (
    <div className="about">
      <h2>About</h2>
      <h4>The Jokes</h4>
      <p>Laughter is medicine for the soul. It&#8217;s also fun! At &#8220;Good Dad Bad Jokes,&#8221; anyone may enjoy the jokes by simply visiting the <Link to="/jokes">&#8220;Jokes&#8221;</Link> tab. If you&#8217;d like to join the fun by adding new jokes and &#8220;liking&#8221; current jokes, <Link to="/signup">create an account</Link> and <Link to="/login">log in</Link>.</p>
      <h4>The Tech</h4>
      <p>&#8220;Good Dad Bad Jokes&#8221; is a project created by Benjamin Peck for General Assembly&#8217;s Software Engineering Immersive course. As required for project completion, this app is full-stack MERN (Mongo, Express, React, and Node) and full CRUD (Create, Read, Update, and Delete) with two back-end databases and front-end axios calls.</p>
      <h4>Credits</h4>
      <ul>
        <li>Site Creation: <a href="https://www.linkedin.com/in/benjaminlpeck/" target="_blank" rel="noopener noreferrer">Benjamin Peck</a></li>
        <li>Happy Dad Image: <a href="https://www.pinclipart.com/"target="_blank" rel="noopener noreferrer">Pinclipart.com</a></li>
        <li>Laugh Icon: <a href="https://www.flaticon.com/authors/tulpahn" title="tulpahn" target="_blank" rel="noopener noreferrer">tulpahn</a> from <a href="https://www.flaticon.com/" title="Flaticon" target="_blank" rel="noopener noreferrer">www.flaticon.com</a></li>
        <li>Sad Icon: <a href="https://www.freepik.com" title="Freepik" target="_blank" rel="noopener noreferrer">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon" target="_blank" rel="noopener noreferrer">www.flaticon.com</a></li>
        <li>Jokes: Everyone who has ever told me a joke</li>
      </ul>
      <h4>Contact</h4>
      <p className="contact">Contact the developer at <a href="mailto:benjaminlpeck@gmail.com?subject=Good Dad Bad Jokes" target="_blank" rel="noopener noreferrer">benjaminlpeck@gmail.com</a>.</p>
    </div>
  )
}

export default About