import React from "react";
import BasicButton from "../BasicButton/BasicButton";
import "./ErrorPage.scss";

export default function ErrorPage(props) {
  return (
    <div className="errorPage">
      <div className="container">
        <h1>Oops Something Went Wrong</h1>
        <p>
          Looks like we have encountered an error, thank you for your patience.
        </p>
        <BasicButton
          type={"submit"}
          text={"Reload"}
          OnClickFunc={() => {
            props.setLoginToken(null);
            localStorage.setItem("profileData", null);
          }}
        />
      </div>
    </div>
  );
}
