const PermissionAuthService = require('../service/permissionAuthService.class');
const AuthDto = require('../dto/authDto.class');

const permissionAuthService = new PermissionAuthService();
const authDto = new AuthDto();

let ignoreModule = ['menu', 'oss', 'test'];
let ignorePath = [
  '/system/basic/getBasicInfo', 
  '/system/file/getFileInfo',
  '/auth/login',
  '/auth/logout'
];
let ignoreRole = ['root'];

exports.permissionAuth = async function(req, res, next) {
  let module = req.path.split('/')[1];

  if(ignoreModule.indexOf(module) != -1 || ignorePath.indexOf(req.path) != -1) {
    next();
  }
  else if(!req.session.userInfo) {
    res.json(authDto.authInvalidRespond());
  }
  else {
    for(let i of req.session.userInfo.role) {
      if(ignoreRole.indexOf(i.name) != -1) {
        next();
        return;
      }
    }

    let hasPermission = await permissionAuthService.permissionAuth(req.session.userInfo.role, module);
    if(hasPermission) {
      next();
    }
    else {
      res.status(403).json(authDto.authForbiddenRespond());
    }
  }
};