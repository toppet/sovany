import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './views/Home';
import ConstantOffers from './views/ConstantOffers';
import OrderCake from './views/OrderCake';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import './App.scss';

class App extends Component {
	constructor(props) {
		super(props);
		this.mainWrap = React.createRef();
	}

  render() {
    return (
			<MuiThemeProvider>
				<div className="sovany-vigasz" ref={this.mainWrap}>
					<Router>
						<Switch>
							<Route exact path="/" component={Home}/>
							<Route exact path="/kezdolap" component={Home}/>
							<Route exact path="/allando-sutik" component={ConstantOffers}/>
							<Route exact path="/tortarendeles" component={OrderCake}/>
						</Switch>
					</Router>
				</div>
			</MuiThemeProvider>
    );
  }
}

export default App;
