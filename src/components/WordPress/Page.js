import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { fetchPagesIfNeeded } from '../../actions/pages.js';

class Page extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchPagesIfNeeded());
  }

  render() {
    const page = this.props.items.filter(page => { return page.id  === this.props.id });
    return(
      <div className="Page">
        {this.props.isFetching &&
          <div className="loader"></div>
        }
        {this.props.isError &&
          <div className="error"><p><span className="glyphicon glyphicon-warning-sign" aria-hidden="true"></span>
Hmm, something went wrong here. Try refreshing?</p></div>
        }
        {/* TODO */}
        {page.map(page =>
          <div className="Page-content" key={ page.id }>
            {
              this.props.hideTitle === false &&
              <h2 dangerouslySetInnerHTML={{__html: page.title.rendered }}></h2>
            }
            <p dangerouslySetInnerHTML={{__html: page.content.rendered }}></p>
          </div>
        )}
      </div>
    );
  }
}

Page.defaultProps = {
  hideTitle: false
};

Page.propTypes = {
  id: PropTypes.number.isRequired,
  hideTitle: PropTypes.bool.isRequired,
  items: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  isError: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
  const { pagesReducer } = state;

  const {
      isFetching,
      items,
      isError
  } = pagesReducer || {
    isFetching: true,
    items: [],
    isError: false
  }

  return {
    isFetching,
    items,
    isError
  }
}

export default connect(mapStateToProps)(Page);
