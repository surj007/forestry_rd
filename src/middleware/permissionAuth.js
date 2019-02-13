const PermissionAuthService = require('../service/permissionAuthService.class');
const AuthDto = require('../dto/authDto.class');

const permissionAuthService = new PermissionAuthService();
const authDto = new AuthDto();

exports.permissionAuth = async function(req, res, next) {
  let module = req.path.split('/')[1];
  if(module == 'auth' || module == 'oss' || (req.session.userInfo && req.session.userInfo.role.indexOf('root') != -1)) {
    next();
  }
  else if(!req.session.userInfo) {
    res.json(authDto.authInvalidRespond());
  }
  else {
    let hasPermission = await permissionAuthService.permissionAuth(req.session.userInfo.role, module);
    if(hasPermission) {
      next();
    }
    else {
      res.status(403).json(authDto.authForbiddenRespond());
    }
  }
};