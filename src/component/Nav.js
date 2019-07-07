import React from 'react'
import { Link } from 'react-router-dom';

// import styles
import Typography from '@material-ui/core/Typography'

const Nav = (props) => {
  return (
    <header>
      <nav>
        <h1 Typography variant='display1' align='center' gutterBottom>Data App</h1>
        <div className="wrapper">
          <ul className="navList">
            <li>
              <Link to="/">Search</Link>
            </li>
            <li>
              <Link to="/graph">Graphs</Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  )
}

export default Nav