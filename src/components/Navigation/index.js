import React, { Component } from 'react';
import SovanyVigasz from '../../images/sovany-vigasz-logo.png';
import { NavLink } from 'react-router-dom';
import './Navigation.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInstagram, faFacebookF } from '@fortawesome/free-brands-svg-icons';

class Navigation extends Component {
	state = {
		isOpen: false,
	}

	toggleMenu() {
		console.log('toggleshit', document.querySelector('body'));
		// ReactDOM.findDomNode(this.refs.mainWrap).classList.toggle('scrollBlocked');
		document.querySelector('body').classList.toggle('scrollBlocked');
		this.setState({ isOpen: !this.state.isOpen });
	}

	render() {
		const { isOpen } = this.state;
		const menuItems = (
			<div className={`nav-wrap ${isOpen ? 'open' : ''}`}>
				<nav>
					<NavLink exact to="/" activeClassName="selected">Bemutatkozás</NavLink>
					<NavLink exact to="/allando-sutik" activeClassName="selected">Állandó sütik</NavLink>
					<NavLink exact to="/szezonalis-kinalat" activeClassName="selected">Szezonális kínálatunk</NavLink>
					<NavLink exact to="/gyakori-kerdesek" activeClassName="selected">Gyakori kérdések</NavLink>
				</nav>
				<div className="additional">
					<NavLink exact to="/tortarendeles" className="order-cake-btn">TORTARENDELÉS</NavLink>
					<div className="social">
						<a href="">
							<FontAwesomeIcon icon={faFacebookF} />
						</a>
						<a href="">
							<FontAwesomeIcon icon={faInstagram} />
						</a>
					</div>
					<span className="phone">Tel: +36 1 123 456</span>
				</div>
			</div>
		);

		return (
			<div className='navigation-wrap'>
				<div className="mobile-menu">
					<img className='sovany-vigasz-logo' src={SovanyVigasz} alt="sovany-vigasz"/>
					<div className={`nav-btn ${isOpen ? 'open' : ''}`} onClick={() => this.toggleMenu()}>
						<span></span>
						<span></span>
						<span></span>
					</div>
					{menuItems}
				</div>

				<div className="desktop-menu">
					<img className='sovany-vigasz-logo' src={SovanyVigasz} alt="sovany-vigasz"/>
					{menuItems}
				</div>
			</div>
		)
	}
}

export default Navigation;
