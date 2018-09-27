import React, { Component } from 'react';
import Navigation from '../../components/Navigation';
import Footer from '../../components/Footer';
import moment from 'moment';
import DatePicker from 'material-ui/DatePicker';
import KeyboardArrowDown from '@material-ui/icons/KeyboardArrowDown';
import { Select, MenuItem, FormControl } from '@material-ui/core';
import _ from 'lodash';


import { Form, Field } from 'react-final-form';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBirthdayCake } from '@fortawesome/free-solid-svg-icons';
import group6 from '../../images/group-6.png';

import './OrderCake.scss';
import { NavLink } from 'react-router-dom';

import cakeDataJSON from '../../cakeData';

const IntlPolyfill = require('intl');
const DateTimeFormat = IntlPolyfill.DateTimeFormat;
require('intl/locale-data/jsonp/hu');


const dateFormat = 'YYYY.MM.DD.';

const addresses = {
	budapest: '1138 Budapest, Kiss utca 51.',
	budaors: '1828 Budaors, Nagy utca 4.',
	gyor: '1828 Gyor, Malac utca 21.',
	pilisvorosvar: '2323 Pilisvorosvar, Petofi setany 23.',
};

const defaultCakeValues = {
	cakeType: null,
	cakeId: null,
	sliceCount: 0,
	decoration: '-',
	requestPriceAdded: false,
	comment: '',
	price: 0,
};


class OrderCake extends Component {
	state= {
		selectedShopName: 'budapest',
		selectedShopIndex: 0,
		formData: {
			date: null,
			name: '',
			phone: '',
			location: addresses['budapest'],
			finalPrice: 0,
			cakes: [defaultCakeValues]
		},
		touched: {
			date: false,
			name: false,
			phone: false,
		},
	}

	selectShop(index, shopLocation) {
		const new_formData = this.state.formData;
		new_formData.location = addresses[shopLocation];

		this.setState({
			formData: new_formData,
			selectedShopIndex: index,
			selectedShopName: shopLocation
		});
	}

	addCake() {
		const newData =  this.state.formData.cakes.push(defaultCakeValues);
		const newFormData =  {...this.state.formData, ...newData};

		this.setState({ formData: newFormData });
	}

	removeCake(index) {
		const newFormData = this.state.formData;
		const lastIndex = (this.state.formData.cakes.length - 1);

		if(index === lastIndex) {
			newFormData.cakes.pop();
		} else {
			newFormData.cakes.splice(1, index);
		}

		//console.log('newFormDAta', formData);
		this.setState({
			formData: newFormData,
		});
	}

	disableWeekends(date) {
		return date.getDay() === 0 || date.getDay() === 6;
	}

	handleDateChange(date) {
		const newFormData = {...this.state.formData, date: moment(date).format(dateFormat)};
		this.setState({ formData: newFormData });
	}

	handleCakeTypeChange(e, index) {
		const formData = this.state.formData;
		const cakesData = this.state.formData.cakes;

		const newCakes = cakesData.map((cake, cakeIndex) => {
			let ne = { ...cake }

			if(index === cakeIndex) {
				ne = { ...defaultCakeValues };
				ne.cakeType = e.target.value || null;
				ne.cakeId = _.findIndex(cakeDataJSON, (cake) => cake.id === e.target.value);
			}

			return ne;
		});

		formData.cakes = newCakes;

		this.setState({ formData });
	}

	handleSliceChange(e, index) {
		const formData = this.state.formData;
		const cakesData = this.state.formData.cakes;
		// const cakeId = formData.cakes[index].cakeId;
		// const slicePrice = cakeDataJSON[cakeId].price;

		const newCakes = cakesData.map((cake, cakeIndex) => {
			const ne = { ...cake };

			if(index === cakeIndex) {
				ne.sliceCount = e.target.value || 0;

				if(e.target.value === 12) {
					ne.price = 11400;
				}

				if(e.target.value === 16) {
					ne.price = 15200;
				}

				if(e.target.value === 20) {
					ne.price = 19000;
				}

			}

			return ne;
		});

		formData.cakes = newCakes;

		this.setState({ formData });
	}

	handleCustomRequestChange(e, index) {
		const formData = this.state.formData;
		const cakesData = this.state.formData.cakes;
		const customRequestPrice = 1500;

		const newCakes = cakesData.map((cake, cakeIndex) => {
			const ne = { ...cake };

			if(index === cakeIndex) {

				if (e.target.value !== "-" && ne.requestPriceAdded === false) {
					ne.price += customRequestPrice;
					ne.requestPriceAdded = true;
				} else if(e.target.value === '-' && ne.requestPriceAdded === true) {
					ne.price -= customRequestPrice;
					ne.requestPriceAdded = false;
				}

				ne.decoration = e.target.value;
			}

			return ne;
		});

		formData.cakes = newCakes;

		this.setState({ formData });
	}

	onSubmit = values => {
		const finalPrice = this.getFinalPrice();
		const newFormData = { ...this.state.formData, ...values, finalPrice };
		console.log('newFormData', newFormData);
	}

	validate = values => {
		const errors = {};
		const requiredText = "A mező kitöltése kötelező!";
		const numReg = /^\d+$/;
		const invalidTextFormat = "Hibas formatum";
		const emailReg = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
		const formData = this.state.formData;

		/* date */
		if (!formData.date) {
			errors.date = requiredText;
		}

		/* name */
		if (!values.name) {
			errors.name = requiredText;
		}

		/* phone number */
		if (values.phone && !numReg.test(values.phone)) {
			errors.phone = invalidTextFormat;
		}
		if (!values.phone) {
			errors.phone = requiredText;
		}

		/* email */
		if (!values.email) {
			errors.email = requiredText;
		}
		if (values.email && !emailReg.test(values.email)) {
			errors.email = invalidTextFormat;
		}

		if(!formData.cakes[0].sliceCount) {
			errors.sliceCount = requiredText;
		}
		return errors;
	}

	renderRemoveBtn = index => <button type='button' className='remove-cake-btn' onClick={ () => this.removeCake(index)}/>;

	customRequestTextArea = () => (
		<FormControl className='formControl custom-request-comment'>
			<label htmlFor="comment">
				<p className="summary-label">Az Ön kérése</p>
				<textarea name="comment" placeholder='Ide írja mit szeretne pontosan!'></textarea>
			</label>
		</FormControl>
	);

	getFinalPrice() {
		const formData = this.state.formData;
		const boxPrice = 500;
		let finalPrice = 0;

		if (formData.cakes.length === 1 && !formData.cakes[0].sliceCount) {
			return finalPrice;
		}

		formData.cakes.forEach(cake => {
			finalPrice += (cake.price + boxPrice);
		});

		return finalPrice;
	}

	getCakeImage(index, cakeId) {
		if(cakeId === null || cakeId === -1) {
			return null;
		}

		const selectedCake = this.state.formData.cakes[index];
		const cakeImgSrc = cakeDataJSON[cakeId].image;

		return (
			<div className="cake-image-wrap">
				<img src={cakeImgSrc} alt={selectedCake.cakeType} className="cake-image"/>
			</div>
		);
	}


	render() {
		const { formData, selectedShopIndex } = this.state;

		const CustomIconComponent = (
			<KeyboardArrowDown className='customSelectIcon' />
		);

		const cakesForm = formData.cakes.map((item, index) => (
			<div key={index} className='cake'>

				<FormControl className={`formControl ${index > 0 ? 'additional' : ''}`}>
					{index > 0 ? this.renderRemoveBtn(index) : null}

					<div className="label-wrap">
						<label htmlFor="cakeType">Melyik tortát szeretné rendelni?</label>
						<Select
							value={formData.cakes[index].cakeType || ""}
							onChange={(e) => this.handleCakeTypeChange(e, index)}
							inputProps={{
								name: 'cakeType',
								id: 'cake-type',
							}}
							IconComponent={() => CustomIconComponent}
							className='cake-select'
							disableUnderline={true}
						>
							{	cakeDataJSON.map(cake => <MenuItem key={cake.id} value={cake.id}>{cake.name}</MenuItem>) }
						</Select>
					</div>
				</FormControl>

				<div className="col-divided" style={{display: formData.cakes[index].cakeType ? 'flex' : 'none'}}>
					<FormControl className='formControl'>
						<label htmlFor="sliceCount">Szeletek száma</label>

						<Field name="sliceCount">
							{({ input, meta }) => (
								<div>
									<Select
										value={formData.cakes[index].sliceCount}
										onChange={(e) => this.handleSliceChange(e, index)}
										inputProps={{
											name: 'sliceCount',
											id: 'slice-count',
										}}
										IconComponent={() => CustomIconComponent}
										disableUnderline={true}
										className={`slice-select ${meta.touched && meta.error ? 'err-required' : ''}`}
									>
										<MenuItem value={12}>12</MenuItem>
										<MenuItem value={16}>16</MenuItem>
										<MenuItem value={20}>20</MenuItem>
									</Select>
									<Error name="sliceCount" />
								</div>
							)}
						</Field>
					</FormControl>

					<FormControl className='formControl'>
						<label htmlFor="customRequest">Különleges díszítés</label>
						<Select
							value={formData.cakes[index].decoration}
							onChange={(e) => this.handleCustomRequestChange(e, index)}
							inputProps={{
								name: 'customRequest',
								id: 'custom-request',
							}}
							IconComponent={() => CustomIconComponent}
							disableUnderline={true}
							className='custom-request-select'
						>
							<MenuItem value="-">Nem kérek</MenuItem>
							<MenuItem value="Fiúknak">Fiúknak</MenuItem>
							<MenuItem value="Lányoknak">Lányoknak</MenuItem>
							<MenuItem value="Egyedi">Egyedi kérés</MenuItem>
						</Select>
					</FormControl>
				</div>

				<div className="custom-price-wrap">

					{formData.cakes[index].decoration === "Egyedi" ? this.customRequestTextArea() : null}

					<div className="price-wrap">
							<div className="price-text">
								<h3>Összesen:</h3>
								<span>{formData.cakes[index].price},-Ft</span>
							</div>

							{this.getCakeImage(index, formData.cakes[index].cakeId)}

					</div>
				</div>
			</div>
		));

		const Error = ({ name }) => (
			<Field
				name={name}
				subscription={{ touched: true, error: true }}
				render={({ meta: { touched, error } }) =>
					// touched && error ? <span className='error-text'>A mező kitöltése kötelező!</span> : null
					touched && error ? <span className='error-text'>{error}</span> : null
				}
			/>
		);



		return (
			<div className='page order-cake'>
				<Navigation />
				<div className="content">
					<div className="content-header">
						<h2>Tortarendelés<span className="ghost-text">Rendelés</span></h2>
						<img src={group6} alt=""/>
						<p>Kérjük válasszon települést/cukrászdát, ahonnan rendelni szeretné a tortát!</p>
					</div>

					<div className="location-selector">
						<div className="locations-wrap">
							<span onClick={() => this.selectShop(0, 'budapest')} className={selectedShopIndex === 0 ? 'selected' : ''}>Budapest</span>
							<span onClick={() => this.selectShop(1, 'pilisvorosvar')} className={selectedShopIndex === 1 ? 'selected' : ''}>Pilisvörösvár</span>
							<span onClick={() => this.selectShop(2, 'gyor')} className={selectedShopIndex === 2 ? 'selected' : ''}>Győr</span>
							<span onClick={() => this.selectShop(3, 'budaors')} className={selectedShopIndex === 3 ? 'selected' : ''}>Budaörs</span>
						</div>
					</div>

					<div className="form-wrap">
						<Form
							onSubmit={this.onSubmit}
							validate={this.validate}
							render={({ handleSubmit, reset, submitting, pristine, values }) => (
								<form onSubmit={handleSubmit}>

									<FormControl className='formControl'>
										<label htmlFor='date'>Mikorra szeretné a tortát?</label>

										<Field name="date">
											{({ input, meta }) => (
												<div style={{ position: 'relative'}}>
													<KeyboardArrowDown className='customSelectIcon' style={{ top: '25px'}} />
													<DatePicker
														className={`dateInput ${meta.touched && meta.error ? 'err-required' : ''}`}
														hintText="Válasszon dátumot"
														formatDate={(date) => moment(date).format(dateFormat)}
														DateTimeFormat={DateTimeFormat}
														locale="hu"
														okLabel="OK"
														cancelLabel="Mégsem"
														minDate={new Date(moment().add(3, 'day'))}
														shouldDisableDate={(date) => this.disableWeekends(date)}
														onChange={(semmi, date) => this.handleDateChange(date)}
													/>
													{ meta.touched && meta.error ? <Error name="date" /> : null }
													<span className='extra-info'>Kérjük vegye figyelembe, hogy a torta elkészítése kb. 3 napot<br/> vesz igénybe.</span>
												</div>
											)}
										</Field>
									</FormControl>

									<FormControl className='formControl'>
										<label htmlFor='name'>Neve</label>
										<Field name="name">
											{({ input, meta }) => (
												<div>
													<input {...input} className={meta.touched && meta.error ? 'err-required' : ''}/>
													{ meta.touched && meta.error ? <Error name="name" /> : null }
												</div>
											)}
										</Field>

									</FormControl>

									<FormControl className='formControl'>
										<label htmlFor='phone'>Telefonszám</label>
										<Field name="phone">
											{({ input, meta }) => (
												<div>
													<input {...input} maxLength="11" className={meta.touched && meta.error ? 'err-required' : ''}/>
													{ meta.touched && meta.error ? <Error name="phone" /> : null }
												</div>
											)}
										</Field>
									</FormControl>

									<FormControl className='formControl'>
										<label htmlFor='email'>E-mail cím</label>
										<Field name="email">
											{({ input, meta }) => (
												<div>
													<input {...input} className={meta.touched && meta.error ? 'err-required' : ''}/>
													{ meta.touched && meta.error ? <Error name="email" /> : null }
												</div>
											)}
										</Field>
									</FormControl>

									{ cakesForm }

									<div className="add-cake-button-wrap">
										<button type='button' onClick={() => this.addCake()}>+ 1 Torta</button>
									</div>


									<div className="summary">

										<div className="delivery-type">
											<p className="summary-label">Átvétel módja</p>

											<div className="delivery-select">
												<div className="delivery-mode">
													<h3>Személyes átvétel üzletünkben</h3>
													<h4>Átvehető: ~3 nap</h4>
												</div>
												<span className="delivery-price">Ingyenes</span>
											</div>
										</div>

										<div className="cake-box">
											<p className="summary-label">Tortadoboz</p>

											<div className="cake-box-price-wrap">
												<div className="shop-address">
													<h3>Címünk:</h3>
													<p>{formData.location}</p>
												</div>

												<div className="cake-icon-wrap">
													<div className="cake-icon">
														<FontAwesomeIcon icon={faBirthdayCake} size={"lg"} color="#f2d4cb"/>
													</div>
												</div>

												<div className="cake-box-price">
													<h3>500,-Ft / darab:</h3>
													<p>{(formData.cakes.length * 500)},-Ft</p>
												</div>
											</div>
										</div>

										<div className="final-price-wrap">
											<p className="summary-label">Végösszeg</p>
											<span className="final-price">{this.getFinalPrice()},-Ft</span>
										</div>
									</div>

									<div className="buttons">
										<NavLink exact to="/allando-sutik">TORTÁK</NavLink>
										<button type="submit" disabled={submitting || pristine}>RENDELÉS ELKÜLDÉSE</button>
									</div>

									<pre>{JSON.stringify(values, 0, 2)}</pre>
								</form>
							)}
						/>

					</div>



				</div>
				<Footer />
			</div>
		)
	}
}

export default OrderCake;
