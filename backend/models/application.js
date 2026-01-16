const pool = require('../config/database');

// Model for application database operations
const Application = {
  // Get all applications with optional filtering and sorting
  async findAll(filters = {}) {
    const { status, sortBy = 'date_applied', sortOrder = 'DESC' } = filters;
    
    let query = 'SELECT * FROM applications';
    const params = [];
    
    // Add status filter if provided
    if (status) {
      query += ' WHERE status = $1';
      params.push(status);
    }
    
    // Add sorting
    const validSortFields = ['date_applied', 'created_at', 'company', 'role'];
    const validSortOrders = ['ASC', 'DESC'];
    
    const sortField = validSortFields.includes(sortBy) ? sortBy : 'date_applied';
    const order = validSortOrders.includes(sortOrder.toUpperCase()) ? sortOrder.toUpperCase() : 'DESC';
    
    query += ` ORDER BY ${sortField} ${order}`;
    
    const result = await pool.query(query, params);
    return result.rows;
  },

  // Get a single application by ID
  async findById(id) {
    const query = 'SELECT * FROM applications WHERE id = $1';
    const result = await pool.query(query, [id]);
    return result.rows[0];
  },

  // Create a new application
  async create(applicationData) {
    const {
      company,
      role,
      location,
      status,
      dateApplied,
      linkToPosting,
      notes
    } = applicationData;

    const query = `
      INSERT INTO applications (company, role, location, status, date_applied, link_to_posting, notes)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *
    `;

    const values = [company, role, location, status, dateApplied, linkToPosting, notes];
    const result = await pool.query(query, values);
    return result.rows[0];
  },

  // Update an existing application
  async update(id, applicationData) {
    const {
      company,
      role,
      location,
      status,
      dateApplied,
      linkToPosting,
      notes
    } = applicationData;

    const query = `
      UPDATE applications
      SET company = COALESCE($1, company),
          role = COALESCE($2, role),
          location = COALESCE($3, location),
          status = COALESCE($4, status),
          date_applied = COALESCE($5, date_applied),
          link_to_posting = COALESCE($6, link_to_posting),
          notes = COALESCE($7, notes)
      WHERE id = $8
      RETURNING *
    `;

    const values = [company, role, location, status, dateApplied, linkToPosting, notes, id];
    const result = await pool.query(query, values);
    return result.rows[0];
  },

  // Delete an application
  async delete(id) {
    const query = 'DELETE FROM applications WHERE id = $1 RETURNING id';
    const result = await pool.query(query, [id]);
    return result.rows[0];
  }
};

module.exports = Application;
