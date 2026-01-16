const Application = require('../models/application');

// Controller for handling application business logic
const applicationController = {
  // Get all applications
  async getAllApplications(req, res, next) {
    try {
      const { status, sortBy, sortOrder } = req.query;
      
      const filters = {
        status,
        sortBy,
        sortOrder
      };

      const applications = await Application.findAll(filters);
      res.json(applications);
    } catch (error) {
      next(error);
    }
  },

  // Get a single application by ID
  async getApplicationById(req, res, next) {
    try {
      const { id } = req.params;
      const application = await Application.findById(id);

      if (!application) {
        return res.status(404).json({ error: 'Application not found' });
      }

      res.json(application);
    } catch (error) {
      next(error);
    }
  },

  // Create a new application
  async createApplication(req, res, next) {
    try {
      const { company, role, status, dateApplied } = req.body;

      // Validate required fields
      if (!company || !role || !status || !dateApplied) {
        return res.status(400).json({
          error: 'Missing required fields: company, role, status, and dateApplied are required'
        });
      }

      // Validate status value
      const validStatuses = ['Applied', 'Interview', 'Rejected', 'Offer'];
      if (!validStatuses.includes(status)) {
        return res.status(400).json({
          error: `Invalid status. Must be one of: ${validStatuses.join(', ')}`
        });
      }

      const newApplication = await Application.create(req.body);
      res.status(201).json(newApplication);
    } catch (error) {
      next(error);
    }
  },

  // Update an existing application
  async updateApplication(req, res, next) {
    try {
      const { id } = req.params;
      const { status } = req.body;

      // Validate status if provided
      if (status) {
        const validStatuses = ['Applied', 'Interview', 'Rejected', 'Offer'];
        if (!validStatuses.includes(status)) {
          return res.status(400).json({
            error: `Invalid status. Must be one of: ${validStatuses.join(', ')}`
          });
        }
      }

      // Check if application exists
      const existingApplication = await Application.findById(id);
      if (!existingApplication) {
        return res.status(404).json({ error: 'Application not found' });
      }

      const updatedApplication = await Application.update(id, req.body);
      res.json(updatedApplication);
    } catch (error) {
      next(error);
    }
  },

  // Delete an application
  async deleteApplication(req, res, next) {
    try {
      const { id } = req.params;

      const deletedApplication = await Application.delete(id);

      if (!deletedApplication) {
        return res.status(404).json({ error: 'Application not found' });
      }

      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
};

module.exports = applicationController;
