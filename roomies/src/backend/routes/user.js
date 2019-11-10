const express = require('express');
const router = express.Router();
var request = require('request');

const mongoose = require('mongoose');
const User = require('../models/User');
const Apartment = require('.../models/Apartment');

//
	// create_user (post) - set name, email
	// create_apartment (post) - creates new apartment, wtth creator in [users], generates code
	// join_apartment (post) - add user to [users] of apartment whose code matches
	// update_status (post) - set status
	// get_statuses (get) - gets all statuses from [statuses]

