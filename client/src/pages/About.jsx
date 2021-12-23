import { Link } from "react-router-dom"

const About = () => {
  return (
    <div className="about">
      <h2>About</h2>
      <h3>The Jokes</h3>
      <p>Laughter is medicine for the soul. It's also fun! Anyone may enjoy the jokes by simply visiting the <Link to="/jokes">"Jokes"</Link> tab. If you'd like to contribute your own humor by adding new jokes and "liking" current jokes, <Link to="/signup">create an account</Link> and <Link to="/login">log in</Link>. Welcome and enjoy!</p>
      <h3>The Tech</h3>
      <p>"Good Dad Bad Jokes" is a project created by Benjamin Peck for General Assembly's Software Engineering Immersive course. As required for project completion, this app is fullstack MERN (Mongo, Express, React, and Node) and full CRUD (Create, Read, Update, and Delete) with two backend databases.</p>
      <h3>Credits</h3>
      <ul>
        <li>Site Creation: <a href="https://www.linkedin.com/in/benjaminlpeck/" target="_blank" rel="noopener noreferrer">Benjamin Peck</a></li>
        <li>Laugh Icon: <a href="https://www.flaticon.com/authors/tulpahn" title="tulpahn" target="_blank" rel="noopener noreferrer">tulpahn</a> from <a href="https://www.flaticon.com/" title="Flaticon" target="_blank" rel="noopener noreferrer">www.flaticon.com</a></li>
        <li>Sad Icon: <a href="https://www.freepik.com" title="Freepik" target="_blank" rel="noopener noreferrer">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon" target="_blank" rel="noopener noreferrer">www.flaticon.com</a></li>
        <li>Happy Dad Image: <a href="https://www.pinclipart.com/"target="_blank" rel="noopener noreferrer">Pinclipart.com</a></li>
        <li>Jokes: Everyone who has ever told me a joke</li>
      </ul>
      <h3>Contact</h3>
      <p>Contact the developer at <a href="mailto:benjaminlpeck@gmail.com?subject=Good Dad Bad Jokes" target="_blank" rel="noopener noreferrer">benjaminlpeck@gmail.com</a>.</p>
    </div>
  )
}

export default About