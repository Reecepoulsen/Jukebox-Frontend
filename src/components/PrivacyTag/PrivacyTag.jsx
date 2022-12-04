import { useState } from 'react';
import './PrivacyTag.scss';

const togglePrivacy = (widgetTitle, privacySetting, setPrivacySetting) => {
  const privacySettings = ['Private', 'Followers', 'Public'];
  const index = privacySettings.indexOf(privacySetting);
  
  // Set to the next privacy setting
  const nextPrivacySetting = index === 2 ? privacySettings[0] : privacySettings[index + 1];
  setPrivacySetting(nextPrivacySetting);

  const payload = JSON.stringify({
    widgetTitle: widgetTitle,
    privacy: nextPrivacySetting
  })

  fetch(`${process.env.REACT_APP_BACKEND_URL}/profile/widget`, {
    method: 'POST',
    headers: {
      "Authorization": `Bearer ${localStorage.getItem('loginToken')}`,
      "Content-type": "application/json"
    },
    body: payload
  }).then(res => res.json())
  .then(response => {
    localStorage.setItem('profileData', JSON.stringify(response.data));
  })
}

const PrivacyTag = ({text, widgetTitle}) => {
  const [privacySetting, setPrivacySetting] = useState(text);

  return(
    <div className="privacyTag" onClick={() => {
      togglePrivacy(widgetTitle, privacySetting, setPrivacySetting);
    }}>
      {privacySetting}
    </div>
  )
};

export default PrivacyTag;