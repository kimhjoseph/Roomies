const express = require('express');
const passport = require('passport');
const FacebookTokenStrategy = require('passport-facebook-token')
const User = require('../models/User');

const router = express.Router();

// For Facebook authentication
passport.use('facebook-token', new FacebookTokenStrategy({
	clientID: global.gConfig.FB_APP_ID,
	clientSecret: global.gConfig.FB_APP_SECRET,
	},
	(accessToken, refreshToken, profile, done) => {
		let user_info = {
			first_name: profile.name.givenName,
			last_name: profile.name.familyName,
			email: profile.emails[0].value,
			facebook_login: profile.id,
		}

		let user;
		try { user = await User.findOne({ facebook_login : user_info.facebook_login }).exec(); }
		catch(err) { return done(err); }
		if (!user) {
			try { user = await User.create(user_info); } 
			catch(err) { return done(null, false); }
			return done(null, user);
		}
		else { return done(null, user); }
	}
))

router.get('/:access_token', 
	passport.authenticate(['facebook-token']),
	(req, res) => {
		if (req.user) { res.send(200); }
		else { res.send(400); }
	}
);

module.exports = router;