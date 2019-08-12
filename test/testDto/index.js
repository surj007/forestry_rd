const authDto = require('./authDto.js');
const basicDto = require('./basicDto.js');

module.exports = {
  ...authDto,
  ...basicDto
}