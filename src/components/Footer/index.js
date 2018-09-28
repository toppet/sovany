import React, {Component} from 'react';
import { NavLink } from 'react-router-dom';
import './Footer.scss';
import insta from '../../images/instagram-icon@3x.png';
import fb from '../../images/facebook-font-awesome@3x.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInstagram, faFacebookF } from '@fortawesome/free-brands-svg-icons';

class Footer extends Component {

	render() {
		return (
			<div className='footer-wrap'>

				<hr/>

				<div className='top'>
					<div className="sitemap">
						<h3>Oldaltérkép</h3>
						<div className="links">
							<NavLink exact to="/" activeClassName="selected">Bemutatkozás</NavLink>
							<NavLink exact to="/allando-sutemenyeink" activeClassName="selected">Állandó sütemények</NavLink>
							<NavLink exact to="/szezonalis-kinalat" activeClassName="selected">Szezonális kínálatunk</NavLink>
							<NavLink exact to="/tortarendeles" className="order-cake-btn">Tortarendelés</NavLink>
							<NavLink exact to="/gyakori-kerdesek" className="order-cake-btn">Gyakori kérdések</NavLink>
							{/*<a href="">Kalóriaértékek</a>*/}
						</div>
					</div>

					<div className="subscribe">
						<h3>Érdekességek, receptek hírlevelünkön!</h3>
						<form action="">
							<input type="text" placeholder="Név"/>
							<input type="text" placeholder="E-mail cím"/>
							<button type="submit">Feliratkozom</button>
						</form>
					</div>
				</div>

				<hr/>

				<div className='bottom'>
					<div className="copyright">
						<span>© 2018. Sovány Vígasz</span>
					</div>

					<div className="social">
						<a href='#'>
							<FontAwesomeIcon icon={faInstagram} />
						</a>
						<a href='#'>
							<FontAwesomeIcon icon={faFacebookF} />
						</a>
					</div>

					<div className="info">
						<a href='#'>Adatvédelem</a>
						<a href='#'>GDPR (Cookie-k)</a>
						<a href='#'>Impresszum</a>
					</div>
				</div>
			</div>
		)
	}
}

export default Footer;
