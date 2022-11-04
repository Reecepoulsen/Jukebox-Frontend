import fetch from "node-fetch";
import User from "../models/user.js";
import Profile from "../models/profile.js";
import UserLite from "../models/userLite.js";
import { getSpotifyData } from "../helpers/spotifyComHelpers.js";

const gatherData = async (token, accumulator, url) => {
  console.log("Getting", url);
  await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then(async (result) => {
      accumulator.push(result.items);
      if (result.next) {
        await gatherData(token, accumulator, result.next);
      }
    })
    .catch((err) => {
      throw err;
    });
  return accumulator;
};

const getAllPlaylists = async (spotifyToken, spotifyUserId) => {
  const data = await getSpotifyData(spotifyToken, `https://api.spotify.com/v1/me/playlists`);
  return data.items;
};

export function getProfile(req, res, next) {
  User.findOne({ _id: req.userId }).then((user) => {
    console.log("Get profile for", user.name)
    const token = user.spotifyAccessToken;
    Profile.findOne({ userId: req.userId })
      .then(async (existingProfile) => {
        let message = "";
        let profile = "";

        if (!existingProfile) {
          const newProfile = new Profile({
            userId: req.userId,
            displayName: user.name,
            playlists: [],
            widgetList: [],
          });
          profile = newProfile;
          message = "Built Profile!";
        } else {
          profile = existingProfile;
          message = "Profile already exists";
        }
        // Need to build the widgetlist
        profile.playlists = await getAllPlaylists(token, user.spotifyUserId);
        profile.save();
        res.status(200).json({ message: message, data: profile });
      })
      .catch((err) => {
        next(err);
      });
  });
}

export function getUser(req, res, next) {
  const userId = req.userId;

  User.findOne({_id: userId})
  .then(user => {
    if (!user) {
      const err = new Error("A user with this id doesn't exist");
      err.statusCode = 401;
      throw err;
    }

    res.status(200).json({ message: "Found user", user: user})
  })
  .catch((err) => {
    next(err);
  });
}

export function getAllUserLites(req, res, next) {
  UserLite.find({_: true})
  .then(users => {
    if (!users) {
      const err = new Error("Get all users was unsuccessful");
      err.statusCode = 401;
      throw err;
    }

    console.log("All users", users)
    res.status(200).json({message: "Successfully got all users", users: users});
  })
  .catch(err => {
    next(err);
  })

}