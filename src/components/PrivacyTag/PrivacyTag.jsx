import { useState, useEffect } from "react";
import { Timeout } from "../../helpers/abortController";
import "./PrivacyTag.scss";

const togglePrivacy = async (
  widgetTitle,
  privacySetting,
  setPrivacySetting
) => {
  const privacySettings = ["Private", "Followers", "Public"];
  const index = privacySettings.indexOf(privacySetting);

  const nextPrivacySetting =
    index === 2 ? privacySettings[0] : privacySettings[index + 1];
  setPrivacySetting(nextPrivacySetting);

  const payload = JSON.stringify({
    widgetTitle: widgetTitle,
    privacy: nextPrivacySetting,
  });

  return fetch(`${process.env.REACT_APP_BACKEND_URL}/profile/widget`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("loginToken")}`,
      "Content-type": "application/json",
    },
    signal: Timeout(15).signal,
    body: payload,
  })
    .then((res) => res.json())
    .then((response) => {
      localStorage.setItem("profileData", JSON.stringify(response.data));
    });
};

const PrivacyTag = ({ text, widgetTitle }) => {
  const [error, setError] = useState(false);
  useEffect(() => {
    if (error) throw new Error(error);
  }, [error]);

  const [privacySetting, setPrivacySetting] = useState(text);

  return (
    <div
      className="privacyTag"
      onClick={() => {
        togglePrivacy(widgetTitle, privacySetting, setPrivacySetting).catch(
          (err) => setError(err)
        );
      }}
    >
      {privacySetting}
    </div>
  );
};

export default PrivacyTag;
