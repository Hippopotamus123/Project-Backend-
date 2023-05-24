var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var PermissionSchema = new Schema(
{
  role: {
    type: String,
    required: true,
   
  },
  permissions: {
    type: [String],
    required: true
  }
});
module.exports = mongoose.model('Permission', PermissionSchema);
