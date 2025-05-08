import PropTypes from 'prop-types';

function PackageDetails({ packageType = '', packageDetails = {} }) {
  if (!packageType || !packageDetails) {
    return null; // Or you can render a loading state, or an error message
  }

  switch (packageType) {
    case "tour":
      return (
        <div className="mt-5">
          <h2 className="font-bold">Tour Package Details</h2>
          <p>
            Tour Name:{" "}
            <span className="font-medium">{packageDetails.name}</span>
          </p>
          <p>
            Tour ID: <span className="font-medium">{packageDetails.id}</span>
          </p>
          <p>
            Price:{" "}
            <span className="font-medium">
              ${packageDetails.pricePerAdult} / Adult, $
              {packageDetails.pricePerChild} / Child
            </span>
          </p>
        </div>
      );
    case "hotel":
      return (
        <div className="mt-5">
          <h2 className="font-bold">Hotel Package Details</h2>
          <p>
            Hotel Name:{" "}
            <span className="font-medium">{packageDetails.name}</span>
          </p>
          <p>
            Room Type: <span className="font-medium">{packageDetails.room}</span>
          </p>
          <p>
            Hotel ID: <span className="font-medium">{packageDetails.id}</span>
          </p>
          <p>
            Price/Night:{" "}
            <span className="font-medium">${packageDetails.pricePerNight}</span>
          </p>
        </div>
      );
    case "flight":
      return (
        <div className="mt-5">
          <h2 className="font-bold">Flight Package Details</h2>
          <p>
            From: <span className="font-medium">{packageDetails.origin}</span>
          </p>
          <p>
            To: <span className="font-medium">{packageDetails.destination}</span>
          </p>
          <p>
            Airline: <span className="font-medium">{packageDetails.airline}</span>
          </p>
          <p>
            Flight ID: <span className="font-medium">{packageDetails.id}</span>
          </p>
          <p>
            Price: <span className="font-medium">${packageDetails.price}</span>
          </p>
        </div>
      );
    default:
      return null;
  }
}

PackageDetails.propTypes = {
  packageType: PropTypes.string.isRequired,
  packageDetails: PropTypes.object.isRequired,
};

PackageDetails.defaultProps = {
  packageDetails: {},
};

export default PackageDetails;
