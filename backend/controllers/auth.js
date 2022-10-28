import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import fetch from "node-fetch";
const { hash, compare } = bcrypt;
const { sign } = jwt;

import User from "../models/user.js";

export function signup(req, res, next) {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;

  let newUser = null;
  User.findOne({ email: email })
    .then((user) => {
      if (user) {
        const err = new Error("A user with that email already exists");
        err.statusCode = 401;
        throw err;
      }

      hash(password, 12)
        .then((hashedPass) => {
          
          const user = new User({
            name: name,
            email: email,
            password: hashedPass
          });

          const token = sign(
            {
              // Bundle the email and userId into the JWT
              email: user.email,
              userId: user._id.toString(),
            },
            process.env.ACCESS_TOKEN_SECRET
            // { expiresIn: "1h" }
          );

          user.loginToken = token;
          newUser = user;
          return user.save();
        })
        .then((result) => {
          return res.status(201).json({ message: "User Created", user: newUser});
        });
    })
    .catch((err) => {
      next(err);
    });
}

export function login(req, res, next) {
  const email = req.body.email;
  const password = req.body.password;

  console.log(`Login request for ${email}, ${password}`);

  let loadedUser;
  User.findOne({ email: email })
    .then((user) => {
      if (!user) {
        const err = new Error("A user with this email does not exist");
        err.statusCode = 401;
        throw err;
      }
      loadedUser = user;
      return compare(password, user.password);
    })
    .then((isEqual) => {
      if (!isEqual) {
        const err = new Error("Incorrect Password");
        err.statusCode = 401;
        throw err;
      }
      console.log("Valid Login");

      return res.status(200).json({ user: loadedUser });
    })
    .catch((err) => {
      next(err);
    });
}

export function connectSpotify(req, res, next) {
  console.log("Got a request to connectSpotify")
  const scopes = [
    "user-read-private",
    "user-read-email",
    "user-library-read",
    "user-top-read",
    "user-read-playback-state",
    "user-read-currently-playing",
    "user-read-recently-played",
    "playlist-read-private",
    "playlist-read-collaborative",
    "streaming",
  ];
  const queryString = `response_type=code&client_id=${
    process.env.SPOTIFY_CLIENT_ID
  }&scope=${scopes.join(
    " "
  )}&redirect_uri=http://localhost:8080/auth/authorizeSpotify`;
  // res.set('Access-Control-Allow-Origin', '*');
  // res.set('Access-Control-Allow-Method', '*');
  res.redirect("https://accounts.spotify.com/authorize?" + queryString);
}

// Helper for spotify token requests
// code from https://ahmetomer.net/spotify-api-authorization-in-nodejs/
const encodeFormData = (data) => {
  return Object.keys(data)
    .map((key) => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&");
};

export async function authorizeSpotify(req, res, next) {
  // hardcoded for now, will be dynamic when is-auth middleware is added
  const userId = "6359bc8eaf286ccc1da2867c";
  console.log("authorizespotify")
  User.findById(userId)
    .then(async (user) => {
      if (!user) {
        const err = new Error(
          "Error finding user to add spotify access token to"
        );
        throw err;
      }

      // Don't know if this check is necessary
      // if (user.spotifyAccessToken != "No token") {
      //   const err = new Error("This user has already given access to spotify");
      //   throw err;
      // }

      if (req.query.error) {
        const err = new Error("Access to spotify was denied by user");
        throw err;
      }

      if (!req.query.code) {
        const err = new Error("Spotify Access code not provided");
        throw err;
      }
      const spotifyAccessCode = req.query.code;

      const body = {
        grant_type: "authorization_code",
        code: spotifyAccessCode,
        redirect_uri: "http://localhost:8080/auth/authorizeSpotify",
        client_id: process.env.SPOTIFY_CLIENT_ID,
        client_secret: process.env.SPOTIFY_CLIENT_SECRET,
      };

      await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Accept: "application/json",
        },
        body: encodeFormData(body),
      })
        .then((response) => response.json())
        .then((data) => {
          user.spotifyAccessToken = data.access_token;
          user.spotifyRefreshToken = data.refresh_token;
          user.spotifyTokenTimer = data.expires_in;
          user.lastRefresh = new Date();
          user.save();

          console.log("Updated Spotify token for.", user)

          // res.status(200).json({
          //   message: "Successfully connected Spotify account",
          //   tokenData: {
          //     token: user.spotifyAccessToken,
          //     refreshToken: user.spotifyRefreshToken,
          //     tokenLifeTimeSec: user.spotifyTokenTimer,
          //   },
          // });
          res.redirect("http://localhost:3000")
        });
    })
    .catch((err) => {
      err.statusCode = 401;
      next(err);
    });
}

export function logout(req, res) {
  const token = sign(
    {
      email: "",
      userId: "",
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "1" }
  );
  return res.status(200).json({ token: token });
}
