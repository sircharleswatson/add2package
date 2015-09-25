/*
*
* Add2Package
*
*/

var path = Npm.require('path');
var Glob = Npm.require('glob');

var packageFolderName = '';
var packageApi;

addFiles = function(glob, target) {
  dirExists();

  target = parseTarget(target);
  var files = getFiles(glob);

  packageApi.addFiles(files, target);
}

addAssets = function(glob, target) {
  dirExists();

  target = parseTarget(target);

}

packageFolder = function(name, api) {
  packageFolderName = name;
  packageApi = api;
}

function dirExists() {
  if (packageFolderName == '') {
    throw new Error();
  }


}

function getFiles(glob) {
  var options = {};
  options.cwd = path.join(process.cwd(), '/packages/', packageFolderName);

  var globResults = Glob.sync(glob, options);

  return globResults;
}

function parseTarget(target) {

  if (target === "both") {
    target = ['client', 'server'];
  } else {
    target = [target];
  }

  return target;
}


Package.describe({
  name: 'scw:add2package',
  version: '0.0.1',
  summary: 'Easily add files and assets to your packages - with Globs!',
  git: 'https://github.com/sircharleswatson/add2package',
  documentation: 'README.md'
})

Package.onUse(function(api) {
  api.versionsFrom('1.2.0.1')
})
