const path = require('path')
const yeoman = require('yeoman-generator')
const utils = require('../src/utils')
const chalk = require('chalk');

const dependencies = [
  'weex-html5',
]

const devDependencies = [
  'eslint',
  'eslint-config-weex',
  'serve',
  'webpack',
  'weex-loader',
]

module.exports = yeoman.Base.extend({

  constructor: function () {
    yeoman.Base.apply(this, arguments)

    // compose with Android and iOS generator
    const args = { args: arguments[0], options: this.options }
    // WEEX_HOOK_START
    // this.composeWith('weex:android', args, {
    //   local: require.resolve(path.resolve(__dirname, 'android'))
    // })
    // this.composeWith('weex:ios', args, {
    //   local: require.resolve(path.resolve(__dirname, 'ios'))
    // })
    // WEEX_HOOK_END
    this.composeWith('weex:platforms', args, {
      local: require.resolve(path.resolve(__dirname, 'platforms'))
    })
  },

  configuring: function() {
  },

  writing: function() {
    // this.fs.copy(this.templatePath('**/*'), this.destinationPath())

    const copy = (file, dist) => {
      this.fs.copy(this.templatePath(file), this.destinationPath(file))
    }

    copy('README.md')
    copy('webpack.config.js')
    copy('src');
    copy('web/index.html')
    copy('android.config.json')
    copy('ios.config.json')
    copy('assets')
    copy('build')
    copy('app.js')
    copy('src/index.we')
    copy('web/')  // new directory to platforms/web
    copy('tools/')
    copy('android.config.json')
    copy('ios.config.json')
    copy('config.xml')
    copy('hooks/')
    copy('plugins/')
    utils.copyAndReplace(
      this.templatePath('package.json'),
      this.destinationPath('package.json'),
      {
        // replace project name
        '\\"name\\"\\:\\s*\\"\\w+\\"' : `"name": "${this.options.projectName}"`,
      }
     
    );
    console.log(chalk.grey('you could run') + ' " cd ' + this.options.projectName + ' && npm install"');
    console.log('then you could run the commands:');
    console.log('npm run build : ' + chalk.grey('build your project'));
    console.log('npm run serve : ' + chalk.grey('start a local server'));
  },

  install: function() {
    // this.npmInstall(dependencies, { save: true })
    // this.npmInstall(devDependencies, { saveDev: true })
  },

  end: function() {
  }
})
