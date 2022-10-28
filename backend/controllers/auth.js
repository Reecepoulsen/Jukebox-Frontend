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
  let token = null;
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
            password: hashedPass,
          });

          token = sign(
            {
              // Bundle the email and userId into the JWT
              email: user.email,
              userId: user._id.toString(),
            },
            process.env.ACCESS_TOKEN_SECRET
          );

          user.loginToken = token;
          newUser = user;
          return user.save();
        })
        .then((result) => {
          return res.status(201).json({
            message: "User Created",
            data: { user: newUser, token: token },
          });
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

      return res.status(200).json({
        message: "Login Successful",
        data: { user: loadedUser, token: loadedUser.loginToken },
      });
    })
    .catch((err) => {
      next(err);
    });
}

export async function authorizeSpotify(req, res, next) {
  console.log("authorizespotify");
  User.findById(req.userId)
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

      // if (req.query.error) {
      //   const err = new Error("Access to spotify was denied by user");
      //   throw err;
      // }

      // if (!req.query.code) {
      //   const err = new Error("Spotify Access code not provided");
      //   throw err;
      // }
      const data = req.body;
      console.log("Data from code exchange with spotify", data);

      user.spotifyAccessToken = data.access_token;
      user.spotifyRefreshToken = data.refresh_token;
      user.spotifyTokenTimer = data.expires_in;
      user.lastRefresh = new Date();
      user.save();

      console.log("Updated Spotify token for.", user);

      res.status(200).json({
        message: "Successfully connected Spotify account",
        tokenData: {
          token: user.spotifyAccessToken,
          refreshToken: user.spotifyRefreshToken,
          tokenLifeTimeSec: user.spotifyTokenTimer,
        },
      });
    })
    .catch((err) => {
      err.statusCode = 401;
      next(err);
    });
}
