import React from 'react'
import '../styles/navbar.css'
import {ReactComponent as AppleLogo} from '../assets/svg/apple.svg';
import {ReactComponent as LngLogo} from '../assets/svg/language.svg';
import {ReactComponent as ShoppingCart} from '../assets/svg/shopping-cart.svg';
import {ReactComponent as Logout} from '../assets/svg/logout.svg';
import {useHistory} from 'react-router-dom'
import PropTypes from 'prop-types';
import i18n from "i18next";


const Navbar = (props) => {
    const history = useHistory()

  
    const linkClick = (val) => {
        history.push('/' + val)
    }


    return (
        <nav  className='navbar'>
            <div className='navbar-menu'>
                <div onClick={() => linkClick('home')} className='AppleLogo'>
                    <AppleLogo width={'20px'} fill={'#ddd'} />
                </div>
                {props.menuCategories.map((item, key) => 
                    <div onClick={() => linkClick(item.Name)} key={key} className='navbar_navbar-menu_title'>
                        {item.Name}
                    </div>    
                )}
                <div onClick={() => linkClick('cart')} className='navbar_navbar-menu_title'>
                    <div className='cart_logo'>
                        <ShoppingCart width={'20px'} fill={'#ddd'}/>
                    </div>
                </div>
                <div  className='navbar_navbar-menu_dropdown'>
                    <LngLogo width={'20px'} fill={'#ddd'}/>
                    
                    <div className="navbar_navbar-menu_dropdown-content">
                        <div onClick={() => i18n.changeLanguage('pl')}>Pl</div>
                        <div onClick={() => i18n.changeLanguage('en')}>Eng</div>
                        <div onClick={() => i18n.changeLanguage('ru')}>Rus</div>
                        <div onClick={() => i18n.changeLanguage('fr')}>Fr</div>
                    </div>
                </div>
                <div onClick={() => props.logout()} className='navbar_navbar-menu_title'>
                    <div className='logout_logo'>
                     <Logout width={'20px'} fill={'#ddd'}/>
                    </div>
                </div>
            </div>
            
        </nav>
    )
}

Navbar.propTypes = {
    menuCategories: PropTypes.array,
    lng: PropTypes.string,
    setLng: PropTypes.func,
    logout: PropTypes.func
  }

export default Navbar
