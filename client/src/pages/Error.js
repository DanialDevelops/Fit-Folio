import React from "react";
import Header from "../components/header";

export default function Error() {
  return (
    <div>
      <Header />
      <div className="d-flex align-items-center justify-content-center mt-5">
        <h3>
          Apologies, but it seems like the page you're looking for is not
          available at the moment.
        </h3>
      </div>
    </div>
  );
}
