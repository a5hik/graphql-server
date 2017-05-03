import * as sequelize from 'sequelize';

const userSchema = new sequelize.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },
});

module.exports = sequelize.model('User', userSchema);
