// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
// eslint-disable-next-line no-use-before-define
const MainController = require('../controllers/MainController')
/// MAIN INDEX
new MainController().init()
