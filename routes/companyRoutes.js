const express = require('express');
const router = express.Router();
const { getCompanyById, getAllCompanies } = require('../controllers/companyController');

// Get all companies
router.get('/', getAllCompanies);

// Get single company by ID
router.get('/:id', getCompanyById);

module.exports = router;
