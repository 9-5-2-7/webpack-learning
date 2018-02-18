import notify from './Notification';

notify('Here is my message');


// css-loader, style-loader(for inject inline stylesheet)
// require('./main.css');


// sass-loader, node-sass
require('./app.sass')


// es2015
// babel-loader, babel-core, babel-preset-2015
// create .babelrc file, and set
// {
//      "presets": ["es2015"]
// }
class Form {
    constructor() {
        alert('Yay Form classes are great no matter what JS developers say.')
    }
}