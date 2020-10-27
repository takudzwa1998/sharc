import React,{useState} from 'react';
import * as myIcons from "react-icons/fa";
import * as myAIIcons from "react-icons/ai";
import { Redirect, Link } from "react-router-dom"
import {Navigation_data} from "./navigation_info.js";
import {IconContext} from 'react-icons';
import './navigation.css';
import { withRouter } from "react-router";
import Dashboard from "./dashboard.js";

function Navigation (){

  const [sidebar, setSidebar] = useState(false)
  const isSidebar =()=> setSidebar(!sidebar)

  const [islogout, setLogout]=useState(false)
  const logout=()=>setLogout(true)
  const signOut = () => {localStorage.removeItem("token");};
  const redirection=()=>{return <Redirect to="/Admin_login" />;}

  if ( !(localStorage.getItem("token")) ) {
    return <Redirect to="/Admin_login" />;
  }
else{
  return(
    <>
    <IconContext.Provider value={{color:'#fff'}}>
    <div className="navigation-bar">
      <Link to="#" className="menu-bars">
      <myIcons.FaBars onClick={isSidebar}/>
      </Link>
      <button data-testid="logout-button" className="popup-button" onClick={signOut} href="#">
        Sign Out
      </button>
    </div>

    <nav className={sidebar ? 'nav-menu active': 'nav-menu'}>
      <ul className='nav-menu-items' onClick={isSidebar}>
        <li className="navbar-toggle">
        <Link to="#" className='menu-bars'>
          <myAIIcons.AiOutlineClose/>
        </Link>
        </li>
        {Navigation_data.map((item, index)=>{
          return (
            <li key={index} className={item.className}>
              <Link to={item.path}>
              {item.icon}
              <span>{item.title}</span>
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
    </IconContext.Provider>
    </>
  );
}
}

export default withRouter(Navigation);
