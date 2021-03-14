import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import { getProfileById } from "../../actions/profile";

const Profile = (props) => {
  const { getProfileById, match } = props;
  useEffect(() => {
    getProfileById(match.params.id);
  }, [getProfileById, match]);

  return (
    <React.Fragment>
      {props.profile === null || props.loading ? (
        <Spinner />
      ) : (
        <React.Fragment>
          <Link to="/profiles" className="btn btn-light">
            Back To Profiles
          </Link>
          {props.auth.isAuthenticated &&
            props.auth.loading === false &&
            props.profile.user &&
            props.auth.user &&
            props.auth.user._id === props.profile.user._id && (
              <Link to="/edit-profile" className="btn btn-dark">
                Edit Profile
              </Link>
            )}
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

Profile.propTypes = {
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  getProfileById: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile.profile,
  auth: state.auth,
});

export default connect(mapStateToProps, { getProfileById })(Profile);
