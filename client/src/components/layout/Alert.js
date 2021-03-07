import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

function Alert(props) {
  let alerts = null;
  if (props.alerts !== null && props.alerts.length > 0) {
    alerts = props.alerts.map((alert) => (
      <div key={alert.id} className={`alert alert-${alert.alertType}`}>
        {alert.msg}
      </div>
    ));
  }

  return alerts;
}

Alert.propTypes = {
  alerts: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => {
  return { alerts: state.alerts };
};

const mapDispatchToProps = (dispatch) => {
  return null;
};

export default connect(mapStateToProps, mapDispatchToProps)(Alert);
