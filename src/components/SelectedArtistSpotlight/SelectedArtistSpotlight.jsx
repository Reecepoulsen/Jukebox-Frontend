import { useState } from "react";
import ArtistModal from "../ArtistModal/ArtistModal";
import GenModal from "../GenModal/GenModal";
import "./SelectedArtistSpotlight.scss";

const SelectedArtistSpotlight = ({
  artistData,
  setPlayerList,
  setPlayerTrackIndex,
  playerTrackIndex,
}) => {
  const [openModal, setOpenModal] = useState(false);

  return (
    <div className="selectedArtistSpotlight">
      <div
        className="selectedArtistSpotlight__image"
        onClick={() => setOpenModal(true)}
      >
        <img src={artistData.images[0].url} alt={artistData.name} />
      </div>
      <div className="selectedArtistSpotlight__name">{artistData.name}</div>
      <GenModal
        modalIsOpen={openModal}
        setModalIsOpen={setOpenModal}
        width={"90vw"}
        top={"42%"}
        background={"#121212"}
        body={
          <ArtistModal
            artistData={artistData}
            setPlayerList={setPlayerList}
            setPlayerTrackIndex={setPlayerTrackIndex}
            playerTrackIndex={playerTrackIndex}
          />
        }
      />
    </div>
  );
};

export default SelectedArtistSpotlight;
