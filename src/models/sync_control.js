'use strict'

module.exports = (sequelize, DataTypes) => {
  const Sync = sequelize.define(
    'sync_control',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      file: DataTypes.STRING,
      last_sync_product: DataTypes.INTEGER,
      sequence_cron: DataTypes.INTEGER,
      start_imported_t: DataTypes.DATE,
      end_imported_t: DataTypes.DATE,
    },
    {
      timestamps: false,
      freezeTableName: true,
    },
  )

  return Sync
}
