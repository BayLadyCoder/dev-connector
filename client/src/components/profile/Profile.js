import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import { getProfileById } from "../../actions/profile";
import ProfileTop from "./ProfileTop";
import ProfileAbout from "./ProfileAbout";
import ProfileExperience from "./ProfileExperience";
import ProfileEducation from "./ProfileEducation";

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
          <div className="profile-grid my-1">
            <ProfileTop profile={props.profile} />
            <ProfileAbout profile={props.profile} />
            <div className="profile-exp bg-white p-2">
              <h2 className="text-primary">Experience</h2>
              {props.profile.experience.length > 0 ? (
                <React.Fragment>
                  {props.profile.experience.map((exp) => (
                    <ProfileExperience key={exp._id} experience={exp} />
                  ))}
                </React.Fragment>
              ) : (
                <h4>No experience credential</h4>
              )}
            </div>

            <div className="profile-edu bg-white p-2">
              <h2 className="text-primary">Education</h2>
              {props.profile.education.length > 0 ? (
                <React.Fragment>
                  {props.profile.education.map((edu) => (
                    <ProfileEducation key={edu._id} education={edu} />
                  ))}
                </React.Fragment>
              ) : (
                <h4>No education credential</h4>
              )}
            </div>
          </div>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

Profile.propTypes = {
  profile: PropTypes.object,
  auth: PropTypes.object.isRequired,
  getProfileById: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile.profile,
  auth: state.auth,
});

export default connect(mapStateToProps, { getProfileById })(Profile);
