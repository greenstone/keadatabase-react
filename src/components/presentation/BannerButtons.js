import React from 'react';
import { Link } from 'react-router-dom';

import './BannerButtons.css';

const BannerButtons = ({ additionalClasses }) => {
  // Add classes
  var classNames = ['BannerButtons'];

  // Add additional classes
  classNames.push(additionalClasses);

  return(
    <div className={ classNames.join(' ') }>
      <div className="container">
        <div className="row">
          <div className="col-md-4 banner-button">
            <Link to="/birds" className="btn btn-lg btn-transparent">
            <i className="fas fa-search"></i> Browse Birds
            </Link>
          </div>
          <div className="col-md-4 banner-button">
            <Link to="/report/sighting" className="btn btn-lg btn-transparent">
              <i className="fas fa-feather-alt"></i> Report Sighting
            </Link>
          </div>
          <div className="col-md-4 banner-button">
            <Link to="/report/non-sighting" className="btn btn-lg btn-transparent">
              <i className="fas fa-eye-slash"></i> Report Non-Sighting
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BannerButtons;
