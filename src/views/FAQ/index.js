import React, { Component } from 'react';
import Navigation from '../../components/Navigation';
import Footer from '../../components/Footer';

import './FAQ.scss';

class FAQ extends Component {

	componentDidMount() {
		window.scroll(0,0);
	}

	render() {


		return (
			<div className='page faq'>
				<Navigation />
				<div className="content">
					<div className="content-header">
						<h1>Gyakori kérdések<span className="ghost-text">GYIK</span></h1>
					</div>

					<div className="faqs-wrap">

						<div className="faq">
							<div className="q-header">
								<h3>Milyen édesítőszert használunk?</h3>
							</div>

							<div className="q-answer">
								<p>Eritritet használunk. De azok a tortáink, amelyiken van karamell illetve csoki bevonat, az tartalmaz fruktózt.</p>
							</div>
						</div>

						<div className="faq">
							<div className="q-header">
								<h3>Milyen lisztet használunk?</h3>
							</div>

							<div className="q-answer">
								<p>Fehér rizslisztet használunk a keksz alapunkban.</p>
							</div>
						</div>

						<div className="faq">
							<div className="q-header">
								<h3>A tejfehérje mentes süteményeinkben milyen növényi tejet használunk?</h3>
							</div>

							<div className="q-answer">
								<p>Mandulatejet használunk.<br/>De a tejfehérje mentes nyomokban tartalmazhat tejfehérjét.</p>
							</div>
						</div>

						<div className="faq">
							<div className="q-header">
								<h3>Keresztszennyeződés veszélye fenn áll-e?</h3>
							</div>

							<div className="q-answer">
								<p>Nem!<br/>Üzemünkben kizárólag gluténmentes termékeket készítünk.</p>
							</div>
						</div>
					</div>

					<div className="document-buttons">
						{/*<a href="#" className="download-btn" download>ÁSZF</a>
						<a href="#" className="download-btn" download>Adatvédelem</a>
		<a href="#" className="download-btn" download>Kalóriaértékek </a>*/}
						<a href="#" className="download-btn">ÁSZF</a>
						<a href="#" className="download-btn">Adatvédelem</a>
						<a href="#" className="download-btn">Kalóriaértékek </a>
					</div>

				</div>
				<Footer />
			</div>
		);
	}
}

export default FAQ;
