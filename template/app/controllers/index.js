const requireDirectory = require('require-directory')
function check (path){
  if(/(Application|Base)Controller\.js$/i.test(path)){
    return false; // don't include
  } else {
    return true; // go ahead and include
  }
}
module.exports = requireDirectory(module, {include: check, extensions: ['js']});