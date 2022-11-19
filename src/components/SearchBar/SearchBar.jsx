import { useEffect } from "react";
import { useRef, useState } from "react";
import { IoMdSearch } from "react-icons/io";
import "./SearchBar.scss";

export default function SearchBar(props) {
  const [searchString, setSearchString] = useState("");

  useEffect(() => {
    const filteredList = props.searchList.filter((i) =>
      i.name.toLowerCase().includes(searchString.toLowerCase())
    );
    props.setUserList(filteredList)
    if (searchString === '') {
      props.setUserList(JSON.parse(localStorage.getItem('userList')))
    }
  }, [searchString])
  

  return (
    <div className="searchBar">
      <input
        className="searchBar__input"
        type="text"
        placeholder="Search"
        onChange={(e) => setSearchString(e.target.value)}
      />
      <IoMdSearch className="searchBar__icon" size={25} />
    </div>
  );
}
