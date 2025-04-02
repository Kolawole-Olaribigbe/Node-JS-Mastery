const lodash = require('lodash');

const names = ['sangam', 'kola', 'terry', 'alex', 'mia'];
const capitalize = lodash.map(names, lodash.capitalize);

console.log(capitalize);

