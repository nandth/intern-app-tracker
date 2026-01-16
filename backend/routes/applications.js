const express = require('express');
const router = express.Router();
const applicationController = require('../controllers/applicationController');

// GET /api/applications - Get all applications with optional filters
router.get('/', applicationController.getAllApplications);

// GET /api/applications/:id - Get a single application by ID
router.get('/:id', applicationController.getApplicationById);

// POST /api/applications - Create a new application
router.post('/', applicationController.createApplication);

// PUT /api/applications/:id - Update an existing application
router.put('/:id', applicationController.updateApplication);

// DELETE /api/applications/:id - Delete an application
router.delete('/:id', applicationController.deleteApplication);

module.exports = router;
