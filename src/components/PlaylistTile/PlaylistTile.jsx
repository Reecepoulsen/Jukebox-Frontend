import { useState } from "react";
import GenModal from "../GenModal/GenModal";
import PlaylistModal from "../PlaylistModal/PlaylistModal";
import "./PlaylistTile.scss";

const PlaylistTile = ({ playlistData }) => {
  const [openModal, setOpenModal] = useState(false);

  return (
    <div className="playlistTile">
      <div className="tile" onClick={() => setOpenModal(true)}>
        <div className="tile__image">
          <img
            src={
              playlistData.images.length > 0 ? playlistData.images[0].url : ""
            }
            alt={`${playlistData.name}'s cover art`}
          />
        </div>
        <div className="tile__title">
          {playlistData.name.length > 12
            ? playlistData.name.substring(0, 12) + "..."
            : playlistData.name}
        </div>
      </div>
      <GenModal
        modalIsOpen={openModal}
        setModalIsOpen={setOpenModal}
        width={"90vw"}
        top={"45%"}
        background={"#121212"}
        body={<PlaylistModal playlistData={playlistData} />}
      />
    </div>
  );
};

export default PlaylistTile;
