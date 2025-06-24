/**
 * Initial database schema migration for Musician Gear Tracker
 */
exports.up = function(knex) {
  return knex.schema
    // Users table
    .createTable('users', (table) => {
      table.string('id').primary().notNullable(); // Firebase UID
      table.string('email').unique().notNullable();
      table.string('display_name');
      table.string('photo_url');
      table.string('role').defaultTo('user'); // user, admin, band_manager
      table.timestamps(true, true);
    })
    
    // Bands/Ensembles table
    .createTable('bands', (table) => {
      table.increments('id').primary();
      table.string('name').notNullable();
      table.text('description');
      table.string('photo_url');
      table.string('owner_id').references('id').inTable('users').onDelete('CASCADE');
      table.timestamps(true, true);
    })
    
    // Band Members join table
    .createTable('band_members', (table) => {
      table.increments('id').primary();
      table.integer('band_id').references('id').inTable('bands').onDelete('CASCADE');
      table.string('user_id').references('id').inTable('users').onDelete('CASCADE');
      table.string('role').defaultTo('member'); // owner, admin, member
      table.timestamps(true, true);
      table.unique(['band_id', 'user_id']);
    })
    
    // Instruments/Gear table
    .createTable('instruments', (table) => {
      table.increments('id').primary();
      table.string('name').notNullable();
      table.string('type').notNullable(); // guitar, bass, drums, keyboard, etc.
      table.string('make');
      table.string('model');
      table.string('serial_number');
      table.date('purchase_date');
      table.decimal('purchase_price', 10, 2);
      table.decimal('current_value', 10, 2);
      table.text('description');
      table.string('condition'); // excellent, good, fair, poor
      table.boolean('insured').defaultTo(false);
      table.string('insurance_policy');
      table.text('notes');
      table.string('owner_id').references('id').inTable('users').onDelete('CASCADE');
      table.integer('band_id').references('id').inTable('bands').onDelete('SET NULL');
      table.string('storage_location');
      table.boolean('is_active').defaultTo(true);
      table.timestamps(true, true);
    })
    
    // Instrument Images table
    .createTable('instrument_images', (table) => {
      table.increments('id').primary();
      table.integer('instrument_id').references('id').inTable('instruments').onDelete('CASCADE');
      table.string('image_url').notNullable();
      table.string('thumbnail_url');
      table.string('caption');
      table.integer('display_order').defaultTo(0);
      table.timestamps(true, true);
    })
    
    // Maintenance Records table
    .createTable('maintenance_records', (table) => {
      table.increments('id').primary();
      table.integer('instrument_id').references('id').inTable('instruments').onDelete('CASCADE');
      table.string('type').notNullable(); // repair, setup, string change, etc.
      table.string('title').notNullable();
      table.text('description');
      table.date('date').notNullable();
      table.decimal('cost', 10, 2);
      table.string('performed_by'); // technician or self
      table.string('location'); // store or home
      table.text('notes');
      table.string('user_id').references('id').inTable('users').onDelete('CASCADE');
      table.timestamps(true, true);
    })
    
    // Maintenance Schedule table
    .createTable('maintenance_schedule', (table) => {
      table.increments('id').primary();
      table.integer('instrument_id').references('id').inTable('instruments').onDelete('CASCADE');
      table.string('type').notNullable(); // string change, setup, etc.
      table.string('title').notNullable();
      table.text('description');
      table.date('due_date').notNullable();
      table.string('recurrence_type'); // none, daily, weekly, monthly, yearly
      table.integer('recurrence_interval');
      table.boolean('reminder_enabled').defaultTo(true);
      table.integer('reminder_days_before').defaultTo(7);
      table.string('user_id').references('id').inTable('users').onDelete('CASCADE');
      table.timestamps(true, true);
    })
    
    // Gigs table
    .createTable('gigs', (table) => {
      table.increments('id').primary();
      table.string('title').notNullable();
      table.text('description');
      table.timestamp('start_time').notNullable();
      table.timestamp('end_time');
      table.string('venue');
      table.string('address');
      table.string('city');
      table.string('state');
      table.string('country');
      table.string('postal_code');
      table.text('notes');
      table.integer('band_id').references('id').inTable('bands').onDelete('CASCADE');
      table.string('created_by').references('id').inTable('users').onDelete('CASCADE');
      table.timestamps(true, true);
    })
    
    // Gig Gear table (which instruments are needed for which gigs)
    .createTable('gig_gear', (table) => {
      table.increments('id').primary();
      table.integer('gig_id').references('id').inTable('gigs').onDelete('CASCADE');
      table.integer('instrument_id').references('id').inTable('instruments').onDelete('CASCADE');
      table.string('notes');
      table.boolean('is_packed').defaultTo(false);
      table.timestamps(true, true);
      table.unique(['gig_id', 'instrument_id']);
    })
    
    // Value History table
    .createTable('value_history', (table) => {
      table.increments('id').primary();
      table.integer('instrument_id').references('id').inTable('instruments').onDelete('CASCADE');
      table.decimal('value', 10, 2).notNullable();
      table.date('date').notNullable();
      table.string('source'); // manual, appraisal, market lookup
      table.text('notes');
      table.timestamps(true, true);
    });
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('value_history')
    .dropTableIfExists('gig_gear')
    .dropTableIfExists('gigs')
    .dropTableIfExists('maintenance_schedule')
    .dropTableIfExists('maintenance_records')
    .dropTableIfExists('instrument_images')
    .dropTableIfExists('instruments')
    .dropTableIfExists('band_members')
    .dropTableIfExists('bands')
    .dropTableIfExists('users');
};