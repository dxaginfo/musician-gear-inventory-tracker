import express from 'express';
import { body, param, validationResult } from 'express-validator';
import db from '../config/db';
import logger from '../utils/logger';

const router = express.Router();

/**
 * GET /api/instruments
 * Get all instruments for the current user
 */
router.get('/', async (req, res) => {
  try {
    const instruments = await db('instruments')
      .select('*')
      .where({ owner_id: req.user?.uid })
      .orderBy('name', 'asc');
    
    return res.status(200).json(instruments);
  } catch (error) {
    logger.error('Error fetching instruments:', error);
    return res.status(500).json({ message: 'Failed to fetch instruments' });
  }
});

/**
 * GET /api/instruments/:id
 * Get a specific instrument by ID
 */
router.get('/:id', 
  param('id').isInt().withMessage('Instrument ID must be an integer'),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const instrument = await db('instruments')
        .select('*')
        .where({ 
          id: req.params.id,
          owner_id: req.user?.uid
        })
        .first();
      
      if (!instrument) {
        return res.status(404).json({ message: 'Instrument not found' });
      }

      // Get images for the instrument
      const images = await db('instrument_images')
        .select('*')
        .where({ instrument_id: req.params.id })
        .orderBy('display_order', 'asc');

      // Get maintenance records for the instrument
      const maintenanceRecords = await db('maintenance_records')
        .select('*')
        .where({ instrument_id: req.params.id })
        .orderBy('date', 'desc');

      // Get maintenance schedule for the instrument
      const maintenanceSchedule = await db('maintenance_schedule')
        .select('*')
        .where({ instrument_id: req.params.id })
        .orderBy('due_date', 'asc');

      // Get value history for the instrument
      const valueHistory = await db('value_history')
        .select('*')
        .where({ instrument_id: req.params.id })
        .orderBy('date', 'desc');

      return res.status(200).json({
        ...instrument,
        images,
        maintenanceRecords,
        maintenanceSchedule,
        valueHistory
      });
    } catch (error) {
      logger.error('Error fetching instrument details:', error);
      return res.status(500).json({ message: 'Failed to fetch instrument details' });
    }
  }
);

/**
 * POST /api/instruments
 * Create a new instrument
 */
router.post('/',
  [
    body('name').notEmpty().withMessage('Name is required'),
    body('type').notEmpty().withMessage('Type is required'),
    body('make').optional(),
    body('model').optional(),
    body('serial_number').optional(),
    body('purchase_date').optional().isDate().withMessage('Invalid purchase date'),
    body('purchase_price').optional().isNumeric().withMessage('Purchase price must be a number'),
    body('current_value').optional().isNumeric().withMessage('Current value must be a number'),
    body('description').optional(),
    body('condition').optional(),
    body('insured').optional().isBoolean().withMessage('Insured must be a boolean'),
    body('insurance_policy').optional(),
    body('notes').optional(),
    body('band_id').optional().isInt().withMessage('Band ID must be an integer'),
    body('storage_location').optional(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      // Add owner_id to the instrument data
      const instrumentData = {
        ...req.body,
        owner_id: req.user?.uid
      };

      // Insert the instrument
      const [instrumentId] = await db('instruments').insert(instrumentData).returning('id');

      // If current_value is provided, add to value history
      if (req.body.current_value) {
        await db('value_history').insert({
          instrument_id: instrumentId,
          value: req.body.current_value,
          date: new Date(),
          source: 'manual',
          notes: 'Initial value set during creation'
        });
      }

      return res.status(201).json({ 
        id: instrumentId,
        message: 'Instrument created successfully' 
      });
    } catch (error) {
      logger.error('Error creating instrument:', error);
      return res.status(500).json({ message: 'Failed to create instrument' });
    }
  }
);

/**
 * PUT /api/instruments/:id
 * Update an existing instrument
 */
router.put('/:id',
  [
    param('id').isInt().withMessage('Instrument ID must be an integer'),
    body('name').optional().notEmpty().withMessage('Name cannot be empty'),
    body('type').optional().notEmpty().withMessage('Type cannot be empty'),
    body('make').optional(),
    body('model').optional(),
    body('serial_number').optional(),
    body('purchase_date').optional().isDate().withMessage('Invalid purchase date'),
    body('purchase_price').optional().isNumeric().withMessage('Purchase price must be a number'),
    body('current_value').optional().isNumeric().withMessage('Current value must be a number'),
    body('description').optional(),
    body('condition').optional(),
    body('insured').optional().isBoolean().withMessage('Insured must be a boolean'),
    body('insurance_policy').optional(),
    body('notes').optional(),
    body('band_id').optional().isInt().withMessage('Band ID must be an integer'),
    body('storage_location').optional(),
    body('is_active').optional().isBoolean().withMessage('Is active must be a boolean'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      // Check if the instrument exists and belongs to the user
      const instrument = await db('instruments')
        .select('id', 'current_value')
        .where({ 
          id: req.params.id,
          owner_id: req.user?.uid
        })
        .first();
      
      if (!instrument) {
        return res.status(404).json({ message: 'Instrument not found or you do not have permission to update it' });
      }

      // Update the instrument
      await db('instruments')
        .where({ id: req.params.id })
        .update(req.body);

      // If current_value is updated, add to value history
      if (req.body.current_value && req.body.current_value !== instrument.current_value) {
        await db('value_history').insert({
          instrument_id: req.params.id,
          value: req.body.current_value,
          date: new Date(),
          source: 'manual',
          notes: 'Value updated'
        });
      }

      return res.status(200).json({ message: 'Instrument updated successfully' });
    } catch (error) {
      logger.error('Error updating instrument:', error);
      return res.status(500).json({ message: 'Failed to update instrument' });
    }
  }
);

/**
 * DELETE /api/instruments/:id
 * Delete an instrument
 */
router.delete('/:id',
  param('id').isInt().withMessage('Instrument ID must be an integer'),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      // Check if the instrument exists and belongs to the user
      const instrument = await db('instruments')
        .select('id')
        .where({ 
          id: req.params.id,
          owner_id: req.user?.uid
        })
        .first();
      
      if (!instrument) {
        return res.status(404).json({ message: 'Instrument not found or you do not have permission to delete it' });
      }

      // Delete the instrument (cascade will handle related records)
      await db('instruments')
        .where({ id: req.params.id })
        .del();

      return res.status(200).json({ message: 'Instrument deleted successfully' });
    } catch (error) {
      logger.error('Error deleting instrument:', error);
      return res.status(500).json({ message: 'Failed to delete instrument' });
    }
  }
);

export default router;