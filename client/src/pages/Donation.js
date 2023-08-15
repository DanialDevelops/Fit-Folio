import "../index.css";
import DonateButton from "../components/donationButton";
import donationImg from "../assets/donation.png";

const Donation = () => {
  return (
    <div className="donationPage">
      <img src={donationImg} alt="Donation" className="heroImage" />
      <h1 className="donationHeading">
        Your kind donations are most appreciated! If you want to continue to
        support passion projects like this one, click that link below!{" "}
      </h1>
      <DonateButton />
    </div>
  );
};

export default Donation;
