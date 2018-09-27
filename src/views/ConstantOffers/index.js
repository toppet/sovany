import React, { Component } from 'react';
import Navigation from '../../components/Navigation';
import Footer from '../../components/Footer';

import cakeOfferData from '../../cakeData';

import eggFree from '../../images/egg-free.png';
import sugarFree from '../../images/sugar-free.png';
import milkFree from '../../images/milk-free.png';
import glutenFree from '../../images/gluten-free.png';
import lactoseFree from '../../images/lactose-free.png';

import './ConstantOffers.scss';

class ConstantOffers extends Component {

	getSigns(cakeData) {
		const props = [];

		if(cakeData.eggFree) {
			props.push(<img src={eggFree} alt="Tojásmentes" title="Tojásmentes" key="Tojásmentes" />);
		}

		if(cakeData.sugarFree) {
			props.push(<img src={sugarFree} alt="Cukormentes" title="Cukormentes" key="Cukormentes"/>);
		}

		if(cakeData.milkFree) {
			props.push(<img src={milkFree} alt="Tejmentes" title="Tejmentes" key="Tejmentes"/>);
		}

		if(cakeData.glutenFree) {
			props.push(<img src={glutenFree} alt="Gluténmentes" title="Gluténmentes" key="Gluténmentes"/>);
		}

		if(cakeData.lactoseFree) {
			props.push(<img src={lactoseFree} alt="Laktózmentes" title="Laktózmentes" key="Laktózmentes"/>);
		}

		return props;
	}

	getTags(cakeData) {
		const tags = [];

		if(cakeData.new) {
			tags.push(<span className="tag" key={cakeData.id}>ÚJ</span>);
		}

		return tags;
	}

	render() {

		const cakes = cakeOfferData.map(cakeData => (
			<div className="cake" key={cakeData.id}>
				<div className="tags">
					{this.getTags(cakeData)}
				</div>
				<div className="image-wrap">
					<img src={cakeData.image} alt="torta"/>
				</div>
				<h2>{cakeData.name}</h2>
				<h3>{cakeData.price}</h3>
				<div className="signs">
					{this.getSigns(cakeData)}
				</div>
			</div>
		));

		return (
			<div className='page constant-offers'>
				<Navigation />
				<div className="content">
					<div className="content-header">
						<h1>Állandó sütemények <span className="ghost-text">Állandó</span></h1>

						<p>A megjelölt árak szeletekre vonatkoznak!<br/>Az áraink nem tartalmazzák az extra díszt és a csomagolást.</p>
					</div>

					<div className="explanation">
						<h2>Jelmagyarázat</h2>

						<div className="signs">
							<div className="sign">
								<img src={eggFree} alt="eggFree"/>
								<div className="sign-text-wrap">
									<h4>JELENTÉS</h4>
									<span>Tojásmentes</span>
								</div>
							</div>

							<div className="sign">
								<img src={sugarFree} alt="sugarFree"/>
								<div className="sign-text-wrap">
									<h4>JELENTÉS</h4>
									<span>Cukormentes</span>
								</div>
							</div>

							<div className="sign">
								<img src={milkFree} alt="milkFree"/>
								<div className="sign-text-wrap">
									<h4>JELENTÉS</h4>
									<span>Tejmentes</span>
								</div>
							</div>

							<div className="sign">
								<img src={glutenFree} alt="glutenFree"/>
								<div className="sign-text-wrap">
									<h4>JELENTÉS</h4>
									<span>Gluténmentes</span>
								</div>
							</div>

							<div className="sign">
								<img src={lactoseFree} alt="lactoseFree"/>
								<div className="sign-text-wrap">
									<h4>JELENTÉS</h4>
									<span>Laktózmentes</span>
								</div>
							</div>

						</div>

					</div>

					<div className="cakes">
						{cakes}
					</div>

				</div>
				<Footer />
			</div>
		);
	}
}

export default ConstantOffers;
