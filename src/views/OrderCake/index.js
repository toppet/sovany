import React, { Component } from 'react';
import Navigation from '../../components/Navigation';
import Footer from '../../components/Footer';
import moment from 'moment';
import DatePicker from 'material-ui/DatePicker';
import { Select, MenuItem, FormControl, TextField } from '@material-ui/core';
import _ from 'lodash';

import { Form, Field } from 'react-final-form';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBirthdayCake } from '@fortawesome/free-solid-svg-icons';
import group6 from '../../images/group-6.png';

import './OrderCake.scss';
import { NavLink } from 'react-router-dom';

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
	cakeType: "",
	sliceCount: 0,
	decoration: '-',
	comment: '',
	price: 0,
};


class OrderCake extends Component {
	state= {
		selectedShopName: 'budapest',
		selectedShopIndex: 0,
		formData: {
			date: moment().format(dateFormat),
			name: '',
			phone: '',
			location: addresses['budapest'],
			finalPrice: 0,
			cakes: [defaultCakeValues]
		},
		/*finalPrices: {
			budapest: 0,
			pilisvorosvar: 0,
			gyor: 0,
			budaors: 0,
		}*/
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
		/*const newFormData = formData.cakes.slice(index,1);
		formData.cakes = newFormData;*/
		// const newCakes = this.state.formData.cakes;
		//console.log('index', index);
		//console.log('formData.cakes', formData.cakes[index], index);
		//console.log('newCakes',);
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
		const newFormData = {...this.state.formData, date};
		this.setState({ formData: newFormData });
	}

	handleCakeTypeChange(e, index) {
		const formData = this.state.formData;
		const cakesData = this.state.formData.cakes;

		const newCakes = cakesData.map((cake, cakeIndex) => {
			//const ne = { ...cake };
			let ne = { ...cake }

			if(index === cakeIndex) {
				ne = { ...defaultCakeValues };
				ne.cakeType = e.target.value || "";
			}

			return ne;
		});

		formData.cakes = newCakes;

		this.setState({ formData });
	}

	handleSliceChange(e, index) {
		const formData = this.state.formData;
		const cakesData = this.state.formData.cakes;

		const newCakes = cakesData.map((cake, cakeIndex) => {
			const ne = { ...cake };

			if(index === cakeIndex) {
				ne.sliceCount = e.target.value || 0;
			}

			return ne;
		});

		formData.cakes = newCakes;

		this.setState({ formData });
	}

	handleRequestChange(e, index) {
		const formData = this.state.formData;
		const cakesData = this.state.formData.cakes;

		const newCakes = cakesData.map((cake, cakeIndex) => {
			const ne = { ...cake };

			if(index === cakeIndex) {
				ne.decoration = e.target.value;
			}

			return ne;
		});

		formData.cakes = newCakes;

		this.setState({ formData });
	}

	onSubmit = values => {
		const newFormData = {...this.state.formData, ...values};
		console.log('newFormData', newFormData);
	}

	validate = values => {
		const errors = {}
		if (!values.firstName) {
			errors.firstName = 'Required';
		}
		if (!values.lastName) {
			errors.lastName = 'Required';
		}
		if (!values.email) {
			errors.email = 'Required';
		}
		return errors;
	}

	required = value => (value ? undefined : 'Required');

	renderRemoveBtn = index => <button type='button' className='remove-cake-btn' onClick={ () => this.removeCake(index)}/>;



	customRequestTextArea = () => (
		<FormControl className='formControl custom-request-comment'>
			<label htmlFor="comment">
				<p className="summary-label">Az Ön kérése</p>
				<textarea name="comment" placeholder='Ide írja mit szeretne pontosan!'></textarea>
			</label>
		</FormControl>
	);

	render() {
		const { formData, selectedShopIndex } = this.state;

		const cakesForm = formData.cakes.map((item, index) => (
			<div key={index} className='cake'>
				<h1>Cake-{index}</h1>
				<FormControl className={`formControl ${index > 0 ? 'additional' : ''}`}>
					{index > 0 ? this.renderRemoveBtn(index) : null}

					<div className="label-wrap">
						<label htmlFor="cakeType">Melyik tortát szeretné rendelni?</label>
						<Select
							value={formData.cakes[index].cakeType}
							onChange={(e) => this.handleCakeTypeChange(e, index)}
							inputProps={{
								name: 'cakeType',
								id: 'cake-type',
							}}
							className='cake-select'
							disableUnderline={true}
						>
							<MenuItem value=""></MenuItem>
							<MenuItem value="Sós-karamellás sajttorta">Sós-karamellás sajttorta</MenuItem>
							<MenuItem value="OREO-s kinder">OREO-s kinder</MenuItem>
							<MenuItem value="Epres sajttorta">Epres sajttorta</MenuItem>
						</Select>
					</div>
				</FormControl>

				<div className="col-divided">
					<FormControl className='formControl'>
						<label htmlFor="sliceCount">Szeletek száma</label>
						<Select
							value={formData.cakes[index].sliceCount}
							onChange={(e) => this.handleSliceChange(e, index)}
							inputProps={{
								name: 'sliceCount',
								id: 'slice-count',
							}}
							disableUnderline={true}
							className='slice-select'
						>
							<MenuItem value=""></MenuItem>
							<MenuItem value={8}>8</MenuItem>
							<MenuItem value={12}>12</MenuItem>
							<MenuItem value={16}>16</MenuItem>
						</Select>
					</FormControl>

					<FormControl className='formControl'>
						<label htmlFor="customRequest">Különleges díszítés</label>
						<Select
							value={formData.cakes[index].decoration}
							onChange={(e) => this.handleRequestChange(e, index)}
							inputProps={{
								name: 'customRequest',
								id: 'custom-request',
							}}
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
							<img src="" alt={formData.cakes[index].cakeType} className="cake-image"/>
					</div>
				</div>
				{/*
					<DatePicker
						className="dateInput"
						hintText="Válasszon dátumot"
						formatDate={(date) => moment(date).format(dateFormat)}
						DateTimeFormat={DateTimeFormat}
						locale="hu"
						okLabel="OK"
						cancelLabel="Mégsem"
						minDate={new Date(moment().add(3, 'days'))}
						shouldDisableDate={(date) => this.disableWeekends(date)}
						onChange={(semmi, date) => this.handleDateChange(date, currentTab, index)}
					/>
					<span className='extra-info'>Kérjük vegye figyelembe, hogy a torta elkészítése kb. 3 napot<br/> vesz igénybe.</span>
				<label htmlFor="name">
					Neve
					<Field type="text" name='name' className='input-name' component={<input type="text" />}/>
				</label>

				<label htmlFor="phone">
					Telefonszám
					<Field type="text" name='phone' className='input-phone' component={<input type="text" />}/>
		</label>*/}

			{/*	<FormControl>
					<label htmlFor='cutomerName'>Neve</label>
					<Field
						name="firstName"
						component={TextFieldAdapter}
						validate={this.required}
					/>
				</FormControl>

				<FormControl>
					<label htmlFor='phone'>Telefonszám</label>
					<Field
						name="phone"
						component="input"
						type="text"
						placeholder=""
					/>
				</FormControl>

				<FormControl>
					<label htmlFor='phone'>Datum</label>

				<Field
						name="date"
						component={ () => (
							<DatePicker
								name="date"
								className="dateInput"
								hintText="Válasszon dátumot"
								formatDate={(date) => moment(date).format(dateFormat)}
								DateTimeFormat={DateTimeFormat}
								locale="hu"
								okLabel="OK"
								cancelLabel="Mégsem"
								minDate={new Date(moment().add(3, 'days'))}
								shouldDisableDate={(date) => this.disableWeekends(date)}
								onChange={(semmi, date) => this.handleDateChange(date, currentTab, index)}
							/>
						)}
					/>
				</FormControl>

		</select>


						<Select
							value={currentTab[index].sliceCount}
							onChange={(e) => this.handleSelectChange(e, currentTab, index)}
							inputProps={{
								name: 'sliceCount',
								id: 'slice-count',
							}}
						>
							<MenuItem value=""></MenuItem>
							<MenuItem value={8}>8</MenuItem>
							<MenuItem value={12}>12</MenuItem>
							<MenuItem value={16}>16</MenuItem>
						</Select>

				</label>

				<label htmlFor="sliceNum">
					Szeletek száma
					<select name="sliceNum" id="sliceNum">
						<option value="8">8</option>
						<option value="12">12</option>
						<option value="16">16</option>
					</select>
				</label>

				<label htmlFor="customReq">
					Egyedi kérés
					<select name="customReq" id="customReq">
						<option value="8">8</option>
						<option value="12">12</option>
					</select>
				</label>

				<label htmlFor="comment">
					<p className="summary-label">Az Ön kérése</p>
					<textarea name="comment" placeholder='Ide írja mit szeretne pontosan!'>

					</textarea>
				</label>*/}
			</div>
		));

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

					{/*<Form
						onSubmit={this.onSubmit}
						render={({ handleSubmit, form, submitting, pristine, values, valid, input }) => (
							<form onSubmit={handleSubmit}>

								{ cakeForm }

								<div className="summary">

									<div className="delivery-type">
										<p className="summary-label">Átvétel módja</p>

										<div className="delivery-select">
											<h3>Személyes átvétel üzletünkben</h3>
											<h4>Átvehető: ~3 nap</h4>
											<span className="delivery-price">Ingyenes</span>
										</div>
									</div>

									<div className="cake-box">
										<p className="summary-label">Tortadoboz</p>

										<div className="cake-box-price-wrap">
											<div className="shop-address">
												<h3>Címünk:</h3>
												<p>{currentTab.address}</p>
											</div>

											<FontAwesomeIcon icon={faBirthdayCake} />

											<div className="cake-box-price">
												<h3>500,-Ft / darab:</h3>
												<p>{(currentTab.length * 500)},-Ft</p>
											</div>
										</div>
									</div>

									<div className="final-price-wrap">
										<p className="summary-label">Végösszeg</p>
										<span className="final-price">{finalPrice},-Ft</span>
									</div>
								</div>

								<div className="buttons">
									<button type='button' onClick={() => this.addCake(selectedShopName)}>+ 1 Torta</button>
									<button type="submit" disabled={submitting || pristine}>
										Submit
									</button>
								</div>
								<pre>{JSON.stringify(values, 0, 2)}</pre>
							</form>
						)}
						/>*/}



						<Form
							onSubmit={this.onSubmit}
							render={({ handleSubmit, reset, submitting, pristine, values }) => (
								<form onSubmit={handleSubmit}>

									<FormControl className='formControl'>
										<label htmlFor='date'>Mikorra szeretné a tortát?</label>
										<DatePicker
											className="dateInput"
											hintText="Válasszon dátumot"
											formatDate={(date) => moment(date).format(dateFormat)}
											DateTimeFormat={DateTimeFormat}
											locale="hu"
											okLabel="OK"
											cancelLabel="Mégsem"
											minDate={new Date(moment().add(1, 'day'))}
											shouldDisableDate={(date) => this.disableWeekends(date)}
											onChange={(semmi, date) => this.handleDateChange(date)}
										/>
										<span className='extra-info'>Kérjük vegye figyelembe, hogy a torta elkészítése kb. 3 napot<br/> vesz igénybe.</span>
									</FormControl>

									<FormControl className='formControl'>
										<label htmlFor='name'>Neve</label>
										<Field
											name='name'
											component="input"
											type="text"
											placeholder=""
										/>
									</FormControl>

									<FormControl className='formControl'>
										<label htmlFor='phone'>Telefonszám</label>
										<Field
											name='phone'
											component="input"
											type="text"
											placeholder=""
										/>
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
											<span className="final-price">{formData.finalPrice},-Ft</span>
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
