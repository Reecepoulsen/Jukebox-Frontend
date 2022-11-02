import { useState } from 'react'
import SearchBar from '../SearchBar/SearchBar'
import UserList from '../UserList/UserList'
import './Connect.scss'

const userListData = [
  {
    profileImage: "https://firebasestorage.googleapis.com/v0/b/jukebox-cfda4.appspot.com/o/profilePic.jpg?alt=media&token=4aab569b-d138-49fb-b1b3-4124b00076cd",
    username: "Reece Poulsen",
    followerCount: "25",
    isFollowed: true
  },
  {
    profileImage: 'https://firebasestorage.googleapis.com/v0/b/jukebox-cfda4.appspot.com/o/ajr.jpg?alt=media&token=088cb826-aa4a-4350-8804-2f657e21271d',
    username: "Test Account 1",
    followerCount: "1",
    isFollowed: false
  },
  {
    profileImage: 'https://firebasestorage.googleapis.com/v0/b/jukebox-cfda4.appspot.com/o/back2U.jpg?alt=media&token=e72089d1-c837-4015-945c-100b4a9600c5',
    username: "Test Account 2",
    followerCount: "2",
    isFollowed: false
  },
  {
    profileImage: 'https://firebasestorage.googleapis.com/v0/b/jukebox-cfda4.appspot.com/o/betterOffAlone.jpg?alt=media&token=60391939-1ecc-4796-afe3-3042115df5a0',
    username: "Test Account3 ",
    followerCount: "3",
    isFollowed: true
  },
  {
    profileImage: 'https://firebasestorage.googleapis.com/v0/b/jukebox-cfda4.appspot.com/o/dontLetMeLetGo.jpg?alt=media&token=f2657381-df1f-44f6-bb5d-1a35519a0947',
    username: "Test Account 4",
    followerCount: "4",
    isFollowed: false
  },
  {
    profileImage: 'https://firebasestorage.googleapis.com/v0/b/jukebox-cfda4.appspot.com/o/dryBlood.jpg?alt=media&token=30ebeb71-9eea-496e-92f4-18a4f229bca1',
    username: "Test Account 5",
    followerCount: "5",
    isFollowed: true
  },
  {
    profileImage: 'https://firebasestorage.googleapis.com/v0/b/jukebox-cfda4.appspot.com/o/finalCall.jpg?alt=media&token=bfcf46df-80f2-41f8-8050-99b00e0931a7',
    username: "Test Account 6",
    followerCount: "6",
    isFollowed: true
  },
  {
    profileImage: 'https://firebasestorage.googleapis.com/v0/b/jukebox-cfda4.appspot.com/o/halfwayDown.jpg?alt=media&token=ddf2cadd-3edd-4e3e-9d0e-c1a6793e47bf',
    username: "Test Account 7",
    followerCount: "7",
    isFollowed: false
  },
  {
    profileImage: 'https://firebasestorage.googleapis.com/v0/b/jukebox-cfda4.appspot.com/o/ifILoseItAll.jpg?alt=media&token=36465d8a-69e7-45b2-96b3-b92763856b08',
    username: "Test Account 8",
    followerCount: "8",
    isFollowed: false
  },
  {
    profileImage: 'https://firebasestorage.googleapis.com/v0/b/jukebox-cfda4.appspot.com/o/runWithMe.jpg?alt=media&token=8ca6fd79-e293-4eb3-9974-13cdcabb6122',
    username: "Test Account 9",
    followerCount: "9",
    isFollowed: true
  },
  {
    profileImage: "https://firebasestorage.googleapis.com/v0/b/jukebox-cfda4.appspot.com/o/profilePic.jpg?alt=media&token=4aab569b-d138-49fb-b1b3-4124b00076cd",
    username: "Reece Poulsen",
    followerCount: "25",
    isFollowed: true
  },
  {
    profileImage: 'https://firebasestorage.googleapis.com/v0/b/jukebox-cfda4.appspot.com/o/ajr.jpg?alt=media&token=088cb826-aa4a-4350-8804-2f657e21271d',
    username: "Test Account 1",
    followerCount: "1",
    isFollowed: false
  },
  {
    profileImage: 'https://firebasestorage.googleapis.com/v0/b/jukebox-cfda4.appspot.com/o/back2U.jpg?alt=media&token=e72089d1-c837-4015-945c-100b4a9600c5',
    username: "Test Account 2",
    followerCount: "2",
    isFollowed: false
  },
  {
    profileImage: 'https://firebasestorage.googleapis.com/v0/b/jukebox-cfda4.appspot.com/o/betterOffAlone.jpg?alt=media&token=60391939-1ecc-4796-afe3-3042115df5a0',
    username: "Test Account3 ",
    followerCount: "3",
    isFollowed: true
  },
  {
    profileImage: 'https://firebasestorage.googleapis.com/v0/b/jukebox-cfda4.appspot.com/o/dontLetMeLetGo.jpg?alt=media&token=f2657381-df1f-44f6-bb5d-1a35519a0947',
    username: "Test Account 4",
    followerCount: "4",
    isFollowed: false
  },
  {
    profileImage: 'https://firebasestorage.googleapis.com/v0/b/jukebox-cfda4.appspot.com/o/dryBlood.jpg?alt=media&token=30ebeb71-9eea-496e-92f4-18a4f229bca1',
    username: "Test Account 5",
    followerCount: "5",
    isFollowed: true
  },
  {
    profileImage: 'https://firebasestorage.googleapis.com/v0/b/jukebox-cfda4.appspot.com/o/finalCall.jpg?alt=media&token=bfcf46df-80f2-41f8-8050-99b00e0931a7',
    username: "Test Account 6",
    followerCount: "6",
    isFollowed: true
  },
  {
    profileImage: 'https://firebasestorage.googleapis.com/v0/b/jukebox-cfda4.appspot.com/o/halfwayDown.jpg?alt=media&token=ddf2cadd-3edd-4e3e-9d0e-c1a6793e47bf',
    username: "Test Account 7",
    followerCount: "7",
    isFollowed: false
  },
  {
    profileImage: 'https://firebasestorage.googleapis.com/v0/b/jukebox-cfda4.appspot.com/o/ifILoseItAll.jpg?alt=media&token=36465d8a-69e7-45b2-96b3-b92763856b08',
    username: "Test Account 8",
    followerCount: "8",
    isFollowed: false
  },
  {
    profileImage: 'https://firebasestorage.googleapis.com/v0/b/jukebox-cfda4.appspot.com/o/runWithMe.jpg?alt=media&token=8ca6fd79-e293-4eb3-9974-13cdcabb6122',
    username: "Test Account 9",
    followerCount: "9",
    isFollowed: true
  },
  {
    profileImage: 'https://firebasestorage.googleapis.com/v0/b/jukebox-cfda4.appspot.com/o/dryBlood.jpg?alt=media&token=30ebeb71-9eea-496e-92f4-18a4f229bca1',
    username: "Test Account 5",
    followerCount: "5",
    isFollowed: true
  },
  {
    profileImage: 'https://firebasestorage.googleapis.com/v0/b/jukebox-cfda4.appspot.com/o/finalCall.jpg?alt=media&token=bfcf46df-80f2-41f8-8050-99b00e0931a7',
    username: "Test Account 6",
    followerCount: "6",
    isFollowed: true
  },
  {
    profileImage: 'https://firebasestorage.googleapis.com/v0/b/jukebox-cfda4.appspot.com/o/halfwayDown.jpg?alt=media&token=ddf2cadd-3edd-4e3e-9d0e-c1a6793e47bf',
    username: "Test Account 7",
    followerCount: "7",
    isFollowed: false
  },
  {
    profileImage: 'https://firebasestorage.googleapis.com/v0/b/jukebox-cfda4.appspot.com/o/ifILoseItAll.jpg?alt=media&token=36465d8a-69e7-45b2-96b3-b92763856b08',
    username: "Test Account 8",
    followerCount: "8",
    isFollowed: false
  },
  {
    profileImage: 'https://firebasestorage.googleapis.com/v0/b/jukebox-cfda4.appspot.com/o/runWithMe.jpg?alt=media&token=8ca6fd79-e293-4eb3-9974-13cdcabb6122',
    username: "Test Account 9",
    followerCount: "9",
    isFollowed: true
  },
]

export default function Connect() {
  const [userList, setUserList] = useState(userListData)

  return (
    <div className='connectView'>
      <SearchBar searchList={userListData} setUserList= {setUserList} />
      <UserList userList={userList}/>
    </div>
  )
}
