import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';

import { fetchBirdIfNeeded } from '../../actions/birds.js';

import Banner from '../presentation/Banner/Banner';
import PrettyBandCombo from '../helpers/PrettyBandCombo';
import Error from '../helpers/Error';
import Loader from '../helpers/Loader';

import placeholder from '../../assets/img/placeholder_large.png';
import './BirdDetail.css';

class BirdDetail extends Component {
  componentDidMount() {
    const { dispatch, slug } = this.props;
    dispatch(fetchBirdIfNeeded(slug));
  }

  render() {
    const bird = this.props.item;

    if (this.props.isFetching) {
      return (<div className="container"><Loader /></div>);
    }
    else if (this.props.isError) {
      return (<div className="container"><Error>Either this bird doesn't exist, or something went wrong here.</Error></div>);
    }
    else {
      return(
        <div className="BirdDetail">
          <Helmet title={ bird.name } />
          <Banner size="medium">
            <div className="row">
              <div className="col-sm-4 col-sm-push-8">
                <div className="profile-picture">
                  { bird.bird_extended && bird.bird_extended.profile_picture
                    ? <img src={ bird.bird_extended.profile_picture.large } alt={ bird.name } className="img-thumbnail img-responsive" />
                    : <img src={ placeholder } alt="placeholder" className="img-thumbnail img-responsive" />
                  }
                </div>
              </div>
              <div className="col-sm-8 col-sm-pull-4">
                <p className="introducing">Kia Ora, my name is:</p>
                <h1>{ bird.name }</h1>
                <p className="bandcombo">
                  { bird.band_combo &&
                    <PrettyBandCombo band={ bird.band_combo } />
                  }
                </p>
              </div>
            </div>
          </Banner>
          <div className="container">
            <div className="row">
              <div className="col-sm-7">
                <section>
                  <h2>My Details</h2>
                  <table className="table table-condensed table-responsive details-table">
                    <tbody>
                      <tr>
                        <th>Status</th>
                        <td>
                          { bird.status }
                        </td>
                      </tr>
                      <tr>
                        <th>Life Stage</th>
                        <td>
                          { bird.get_life_stage }
                        </td>
                      </tr>
                      <tr>
                        <th>Age</th>
                        <td>
                          { bird.get_age }
                        </td>
                      </tr>

                      <tr>
                        <th>Sex</th>
                        <td>
                          { bird.sex }
                        </td>
                      </tr>
                      <tr>
                        <th>Study Area</th>
                        <td>
                          { bird.study_area }
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </section>
              </div>
              <div className="col-sm-4 col-sm-offset-1">
                {/* Placeholder for image (with negative margins) */}
              </div>
            </div>
            { bird.bird_extended &&
              <section className="bird-extended">
                { bird.bird_extended.description &&
                  <section>
                    <h3>About Me</h3>
                    <p>{ bird.bird_extended.description }</p>
                  </section>
                }
                { bird.bird_extended.sponsor_name &&
                  <section>
                    <h3>Sponsor</h3>
                    <p>
                      { bird.bird_extended.sponsor_website
                        ? <a className="sponsor" href={ bird.bird_extended.sponsor_website }
                             target="_blank" rel="noopener noreferrer">
                            { bird.bird_extended.sponsor_name }
                          </a>
                        : <span className="sponsor">
                            { bird.bird_extended.sponsor_name }
                          </span>
                      }
                      .
                    </p>
                  </section>
                }
                { bird.bird_extended.profile_picture_attribution &&
                  <span className="attribution">
                    <strong>Photo:</strong> { bird.bird_extended.profile_picture_attribution }
                  </span>
                }
              </section>
            }
          </div>
        </div>
      );
    }
  }
}

BirdDetail.propTypes = {
  slug: PropTypes.string.isRequired,
  item: PropTypes.object,
  isFetching: PropTypes.bool.isRequired,
  isError: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state, ownProps) {
  const { slug } = ownProps;
  const { birdsReducer } = state;

  const {
    isFetching,
    item,
    isError
  } = birdsReducer[slug] || {
    isFetching: true,
    item: {},
    isError: false
  };

  return {
    slug,
    isFetching,
    item,
    isError
  }
}

export default connect(mapStateToProps)(BirdDetail);
