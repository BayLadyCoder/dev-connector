import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentProfile } from "../../actions/profile";
import Spinner from "../layout/Spinner";

const Dashboard = (props) => {
  const { getCurrentProfile } = props;

  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);

  const { profile, loading } = props.profile;
  const { user } = props.auth;

  if (loading && profile === null) {
    return <Spinner />;
  }

  return (
    <React.Fragment>
      <h1 className="large text-primary">Dashboard</h1>
      <p className="lead">
        <i className="fa fas-user" /> Welcome {user && user.name}
      </p>
      {profile !== null ? (
        <React.Fragment>Has</React.Fragment>
      ) : (
        <React.Fragment>Has not</React.Fragment>
      )}
    </React.Fragment>
  );
};

Dashboard.propTypes = {
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, { getCurrentProfile })(Dashboard);
