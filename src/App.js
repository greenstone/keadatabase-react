import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import ReactGA from 'react-ga';

import configureStore from './store/store';
import Navigation from './components/Navigation/Navigation';
import Footer from './components/Footer/Footer';
import ScrollToTop from './components/ScrollToTop/ScrollToTop';

import HomePage from './views/index';
import AboutPage from './views/about';
import TermsPage from './views/terms';
import BirdsPage from './views/birds/index';
import BirdDetailPage from './views/birds/detail';
import SightingsPage from './views/sightings/index';
import SightingDetailPage from './views/sightings/detail';
import ReportPage from './views/report';
import NoMatchPage from './views/nomatch';
import LicencePage from './views/licence';

import './assets/css/bootstrap.css';
import './assets/css/custom.css';

const store = configureStore();

if (process.env.NODE_ENV === 'production') {
  // Only runs once, but better than nothing!
  ReactGA.initialize('UA-67905653-2');
  ReactGA.set({ page: window.location.pathname + window.location.search });
  ReactGA.pageview(window.location.pathname + window.location.search);
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <ScrollToTop>
            <div className="MainRouter">
              <Navigation />

              <main className="constrainer">
                <Switch>
                  <Route exact path="/" component={HomePage} />
                  <Route exact path="/about" component={AboutPage} />
                  <Route exact path="/terms" component={TermsPage} />
                  <Route exact path="/licence" component={LicencePage} />

                  <Route exact path="/birds" component={BirdsPage} />
                  <Route exact path="/birds/:slug" component={BirdDetailPage} />

                  <Route exact path="/sightings" component={SightingsPage} />
                  <Route exact path="/sightings/:slug" component={SightingDetailPage} />

                  <Route exact path="/report" component={ReportPage} />

                  <Route component={NoMatchPage} />
                </Switch>
              </main>

              <Footer />
            </div>
          </ScrollToTop>
        </Router>
      </Provider>
    );
  }
}

export default App;
