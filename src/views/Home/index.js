import React, { Component } from 'react';
import Slider from "react-slick";
import Navigation from '../../components/Navigation';
import Footer from '../../components/Footer';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight, faBirthdayCake, faMobileAlt, faClock } from '@fortawesome/free-solid-svg-icons';

import logoLg from '../../images/sovany-vigasz-logo@3x.png';
import owner from '../../images/sovany-vigasz-copy@3x.png';

import budapest from '../../images/sovany-vigasz.png';
import pilis from '../../images/sovany-vigasz.png';
import gyor from '../../images/sovany-vigasz.png';
import budaors from '../../images/sovany-vigasz.png';

import shopData from './shopData.js';

import './Home.scss';

const settings = {
	dots: false,
	infinite: true,
	speed: 500,
	centerMode: true,
	arrows: false,
	//centerPadding: '100px',
	slidesToShow: 5,
	slidesToScroll: 5,
	responsive: [
		{
			breakpoint: 1024,
			settings: {
				arrows: false,
				centerMode: true,
				centerPadding: '40px',
				slidesToShow: 3,
				slidesToScroll: 3,
			}
		},
		{
			breakpoint: 768,
			settings: {
				arrows: false,
				centerMode: true,
				centerPadding: '40px',
				slidesToShow: 3,
				slidesToScroll: 3,
			}
		},
		{
			breakpoint: 375,
			settings: {
				arrows: false,
				centerMode: true,
				centerPadding: '40px',
				slidesToShow: 1,
				slidesToScroll: 1,
			}
		},
	]
};

const cakeSlider = (
	<Slider {...settings}>
		<div className="cake">
			<h3>Termek neve 1</h3>
			<span>
				<FontAwesomeIcon icon={faArrowRight} />
			</span>
		</div>

		<div className="cake">
			<h3>Termek neve 2</h3>
			<span>
				<FontAwesomeIcon icon={faArrowRight} />
			</span>
		</div>

		<div className="cake">
			<h3>Termek neve 3</h3>
			<span>
				<FontAwesomeIcon icon={faArrowRight} />
			</span>
		</div>

		<div className="cake">
			<h3>Termek neve 4</h3>
			<span>
				<FontAwesomeIcon icon={faArrowRight} />
			</span>
		</div>

		<div className="cake">
			<h3>Termek neve 5</h3>
			<span>
				<FontAwesomeIcon icon={faArrowRight} />
			</span>
		</div>

		<div className="cake">
			<h3>Termek neve 6</h3>
			<span>
				<FontAwesomeIcon icon={faArrowRight} />
			</span>
		</div>

		<div className="cake">
			<h3>Termek neve 7</h3>
			<span>
				<FontAwesomeIcon icon={faArrowRight} />
			</span>
		</div>

	</Slider>
);


class Home extends Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedShopIndex: 0,
			selectedShop: {},
		}
	}

	componentDidMount() {
		window.scroll(0,0);
		this.setState({selectedShop: shopData[0]});
	}

	selectShop(shopIndex) {
		this.setState({
			selectedShopIndex: shopIndex,
			selectedShop: shopData[shopIndex],
		});
	}

	render() {

		const { selectedShopIndex, selectedShop } = this.state;
		const locationImages = [budapest, pilis, gyor, budaors];
		let openingHours = null;

		if(selectedShop.openingHours) {
			openingHours = (
				<div className="opening-hours">
					<FontAwesomeIcon icon={faClock} className="clock-icon"/>
					<span className="day">Hétfő <span className="time">{selectedShop.openingHours.mon}</span></span>
					<span className="day">Kedd <span className="time">{ selectedShop.openingHours.tue }</span></span>
					<span className="day">Szerda <span className="time">{ selectedShop.openingHours.wed }</span></span>
					<span className="day">Csütörtök <span className="time">{ selectedShop.openingHours.thu }</span></span>
					<span className="day">Péntek <span className="time">{ selectedShop.openingHours.fri }</span></span>
					<span className="day">Szombat <span className="time">{ selectedShop.openingHours.sat }</span></span>
					<span className="day">Vasárnap <span className="time">{ selectedShop.openingHours.sun }</span></span>
				</div>
			)
		}

		return (
			<div className='page home'>
				<Navigation/>
				<div className="content">
					<div className="top-section">
						<div className="top-section-1">
							<h1>Legújabb ötletünk most limitált mennyiségben!</h1>
							<p>There is a lot of exciting stuff going on in the stars above us that make astronomy so much fun. The truth is the universe is a constantly changing, moving.</p>
							<div className="buttons">
								<button type="button">MEGNÉZEM</button>
								<button type="button">TORTARENDELÉS</button>
							</div>
						</div>
						<div className="top-section-2">
							<div className="slider-wrap"></div>
						</div>
					</div>

					<div className="welcome">
						<h2>Üdvözöllek!<span className="ghost-text left">Üdvözöllek!</span></h2>
						<p>There is a lot of exciting stuff going on in the stars above us that make astronomy so much fun. The truth is the universe is a constantly changing, moving.
There is a lot of exciting stuff going on in the stars above us that make astronomy so much fun. The truth is the universe is a constantly changing, moving.
There is a lot of exciting stuff going on in the stars above us that make astronomy so much fun. The truth is the universe is a constantly changing, moving.
There is a lot of exciting stuff going on in the stars above us that make astronomy so much fun. The truth is the universe is a constantly changing, moving.</p>
					<img src={logoLg} alt="sovany vigasz"/>
				</div>

				<div className="owner">
					<img src={owner} alt="csurpek klaudia"/>
					<div className="owner-info">
						<p className="name">Csurpek Klaudia</p>
						<span className="title">tulajdonos</span>
					</div>
				</div>

				<div className="cakes">
					<h2>Torták<span className="ghost-text">Torták!</span></h2>
					<div className="slider-wrap">
						{cakeSlider}
					</div>
					<button type="button" className="all-product">ÖSSZES TERMÉKÜNK</button>
				</div>

				<div className="shops">

					<h2>Üzleteink<span className="ghost-text">Üzleteink</span></h2>

					<div className="locations-wrap">
						<span onClick={() => this.selectShop(0)} className={selectedShopIndex === 0 ? 'selected' : ''}>Budapest (HQ)</span>
						<span onClick={() => this.selectShop(1)} className={selectedShopIndex === 1 ? 'selected' : ''}>Pilisvörösvár</span>
						<span onClick={() => this.selectShop(2)} className={selectedShopIndex === 2 ? 'selected' : ''}>Győr</span>
						<span onClick={() => this.selectShop(3)} className={selectedShopIndex === 3 ? 'selected' : ''}>Budaörs</span>
					</div>

					<div className="location-info">
						<img src={locationImages[selectedShopIndex]} alt=""/>

						<div className="location-details">
							<div className="address">
								<span className="detail-title">CÍMÜNK</span>
								<span className="address-text">{selectedShop.address}</span>
							</div>

							<div className="details-row">

								<div className="details-1">
									<div className="detail">
										<span className="detail-title">ÜZLET</span>
										<span className="phone-text">
											<span className="icon"><FontAwesomeIcon icon={faMobileAlt} /></span>
											{selectedShop.shopPhone}
										</span>
									</div>
									<div className="detail">
										<span className="detail-title">TORTARENDELÉS</span>
										<span className="phone-text">
											<span className="icon"><FontAwesomeIcon icon={faBirthdayCake} /></span>
											{selectedShop.orderPhone}
										</span>
									</div>
								</div>

								<div className="details-2">
									<span className="detail-title">NYITVATARTÁS</span>

									{ openingHours }
								</div>
							</div>

							<div className="buttons">
								<button className="email">E-MAIL</button>
								<button className="directions">ÚTVONAL</button>
							</div>
						</div>
					</div>
				</div>

				<div className="blocks">
					<div className="constant">
						<h3>Állandó<br/>süteményeink</h3>
					</div>
					<div className="seasonal">
						<h3>Szezonális<br/>ajánlataink</h3>
					</div>
					<div className="ordering">
						<h3>Tortarendelés<br/>alkalmakra</h3>
					</div>
				</div>

				</div>
				<Footer/>
			</div>
		);
	}
}

export default Home;
