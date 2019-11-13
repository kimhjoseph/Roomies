const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const User = require('../models/User');

const router = express.Router();

passport.use(new GoogleStrategy({
	clientID: global.gConfig.GOOGLE_APP_ID,
	clientSecret: global.gConfig.GOOGLE_APP_SECRET,
	callbackURL: 'https://localhost:'+global.gConfig.port+'/auth/google/callback',
	profileFields: ['id', 'name', 'email'],
	},
	(accessToken, refreshToken, profile, done) => {
		let user_info = {
			first_name: profile.name.givenName,
			last_name: profile.name.familyName,
			email: profile.emails[0].value,
			google_login: profile.id
		}
		let user;
		try { user = await User.findOne({ google_login : user_info.google_login }).exec(); }
		catch(err) { return done(err); }
		if (!user) {
			try { user = await User.create(user_info); } 
			catch(err) { return done(null, false); }
			return done(null, user);
		}
		else { return done(null, user); }
	}
))

router.get('/', passport.authenticate('google', { scope: ['email', 'profile'] }));

router.get('/callback', (req, res, next) => {
	passport.authenticate('google', (err, user, is_new) => {
		if (!user) { res.status(400).send("Error creating account. Email registered with Google already has an account"); }
		else if (user) {
			req.logIn(user, function(err) {
				if (err) { return next(err); }
				if (is_new == 1) { res.status(200).redirect('/user/add_info'); }
				else { res.status(200).send("Successfully logged in existing user"); }
			});
		}
		else { res.status(400).send("Error logging in."); }
	})
});

module.exports = router;