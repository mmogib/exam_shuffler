/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("electron");

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
// eslint-disable-next-line no-use-before-define
var MainController = __webpack_require__(2);
/// MAIN INDEX
new MainController().init();

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _require = __webpack_require__(0),
    ipcRenderer = _require.ipcRenderer;

var _require2 = __webpack_require__(3),
    saveJasonLocally = _require2.saveJasonLocally,
    loadConfigs = _require2.loadConfigs,
    loadSetting = _require2.loadSetting,
    saveSettingLocally = _require2.saveSettingLocally;

var MainView = __webpack_require__(8);
module.exports = function () {
	function MainController() {
		_classCallCheck(this, MainController);

		this.varTerm = '';
		this.varCourseCode = '';
		this.varExamTitle = '';
		this.varDate = '';
		this.varNumOfQuestions = '';
		this.varNumOfVersions = '';
		this.varNumAnswers = '';
		this.varTimeAllowed = '';
		this.varNumGroups = '';
		this.gvarUniversity = '';
		this.gvarDepartment = '';
		this.varGroups = [];
		this.changeGroupgs = '';
		this.examPath = '';
		this.myconfig = '';
		this.setting = loadSetting();
		this.init();
	}

	_createClass(MainController, [{
		key: 'loadConfig',
		value: function loadConfig() {
			this.myconfig = loadConfigs();
		}
	}, {
		key: 'validateField',
		value: function validateField(key) {
			var valid = true,
			    errorStr = '';
			switch (key) {
				case 'varTerm':
					{
						if (!/^(\d){3}$/.test(this.myconfig[key])) {
							errorStr = 'must be three digit integer';
							valid = false;
						}
						break;
					}
				case 'varCourseCode':
				case 'varExamTitle':
				case 'varDate':
				case 'varTimeAllowed':
					{
						if (!/\w+/.test(this.myconfig[key])) {
							errorStr = 'cannot be empty';
							valid = false;
						}
						break;
					}
				case 'varNumOfQuestions':
				case 'varNumOfVersions':
				case 'varNumAnswers':
					{
						if (!/\w+/.test(this.myconfig[key]) || parseInt(this.myconfig[key]) <= 0) {
							errorStr = 'must be a number';
							valid = false;
						}
						break;
					}
			}
			return { isValid: valid, errorStr: errorStr };
		}
	}, {
		key: 'validate',
		value: function validate() {
			var _this2 = this;

			var valid = true;

			var configs = Object.keys(this.myconfig);
			configs.forEach(function (key) {
				if (key !== 'varNumGroups' && key !== 'varGroups' && key !== 'gvarUniversity' && key !== 'gvarDepartment') {
					var temp = document.getElementById(key + '_error');
					temp.innerHTML = '';
					temp.style.display = 'none';
					var validate = _this2.validateField(key);
					if (!validate.isValid) {
						valid = false;
						temp.innerHTML = validate.errorStr;
						temp.style.display = 'block';
					}
				}
			});

			return valid;
		}
	}, {
		key: 'setConfigs',
		value: function setConfigs() {
			this.varTerm.value = this.myconfig.varTerm;
			this.varCourseCode.value = this.myconfig.varCourseCode;
			this.varExamTitle.value = this.myconfig.varExamTitle;
			this.varDate.value = this.myconfig.varDate;
			this.varNumOfQuestions.value = this.myconfig.varNumOfQuestions;
			this.varNumOfVersions.value = this.myconfig.varNumOfVersions;
			this.varNumAnswers.value = this.myconfig.varNumAnswers;
			this.varTimeAllowed.value = this.myconfig.varTimeAllowed;
			this.varNumGroups.innerHTML = this.myconfig.varNumGroups;
			this.gvarUniversity.innerHTML = this.setting.gvarUniversity;
			this.gvarDepartment.innerHTML = this.setting.gvarDepartment;
			this.varGroups = this.myconfig.varGroups;
		}
	}, {
		key: 'init',
		value: function init() {
			var mainV = new MainView();
			document.querySelector('.container').innerHTML = mainV.html();
			this.varTerm = document.getElementById('varTerm');
			this.varCourseCode = document.getElementById('varCourseCode');
			this.varExamTitle = document.getElementById('varExamTitle');
			this.varDate = document.getElementById('varDate');
			this.varNumOfQuestions = document.getElementById('varNumOfQuestions');
			this.varNumOfVersions = document.getElementById('varNumOfVersions');
			this.varNumAnswers = document.getElementById('varNumAnswers');
			this.varTimeAllowed = document.getElementById('varTimeAllowed');
			this.varNumGroups = document.getElementById('varNumGroups');
			this.changeGroupgs = document.getElementById('changeGroupgs');
			this.gvarUniversity = document.getElementById('gvarUniversity');
			this.gvarDepartment = document.getElementById('gvarDepartment');
			this.setUpListeners();
			this.loadConfig();
			this.setConfigs();
			this.displayGroups();
		}
	}, {
		key: 'displayGroups',
		value: function displayGroups() {
			var mainV = new MainView();
			document.getElementById('groups').innerHTML = mainV.groupHtml(this.varGroups);
		}
	}, {
		key: 'saveSetting',
		value: function saveSetting() {
			this.setting.gvarUniversity = this.gvarUniversity.innerHTML;
			this.setting.gvarDepartment = this.gvarDepartment.innerHTML;
			this.myconfig.gvarUniversity = this.setting.gvarUniversity;
			this.myconfig.gvarDepartment = this.setting.gvarDepartment;
			saveSettingLocally(this.setting);
		}
	}, {
		key: 'setUpListeners',
		value: function setUpListeners() {
			var _this3 = this;

			var _this = this;

			this.changeGroupgs.addEventListener('click', function () {
				return _this.openGroupsWindow();
			}, _this);
			this.gvarUniversity.addEventListener('blur', function () {
				return _this3.saveSetting();
			});
			this.gvarDepartment.addEventListener('blur', function () {
				return _this3.saveSetting();
			});
			/// download template
			var downLoadBtn = document.getElementById('download-template');
			downLoadBtn.addEventListener('click', function () {
				if (_this.save()) {
					ipcRenderer.send('download-template', _this.myconfig);
				} else {
					ipcRenderer.send('open-error-dialog', 'Please make sure that you fill the form correctly');
				}
			}, _this);
			ipcRenderer.on('update-groups', function () {
				_this3.loadConfig();
				_this3.setConfigs();
				_this3.displayGroups();
				_this3.varGroups = _this3.myconfig.varGroups;
				_this3.varNumGroups.innerHTML = _this3.myconfig.varNumGroups;
			});
			ipcRenderer.on('template-downloaded', function (event, path) {
				document.getElementById('downloaded-template').innerHTML = 'Your template has been saved as  <strong> ' + path + '</strong>';
			});
			//// end of download template
			var uploadExamBtn = document.getElementById('upload-exam');
			uploadExamBtn.addEventListener('click', function () {
				ipcRenderer.send('upload-exam'); // eslint-disable-line
			});
			ipcRenderer.on('exam-uploaded', function (event, path) {
				_this3.setPath(path);
				_this3.examPath = path;
				document.getElementById('exam-uploaded').innerHTML = 'Your exam <strong>' + path + '</strong> has been uploaded.';
			});
			///////////

			//// start processing
			var saveExamBtn = document.getElementById('saveConfig');
			var downloadExamBtn = document.getElementById('downloadFile');

			saveExamBtn.addEventListener('click', function () {
				if (_this.save()) {
					var box = document.getElementById('success-save');
					box.innerHTML = '';
					var div = document.createElement('div');
					div.innerHTML = 'Saved Successfully\n\t\t\t\t\t<span class="closebtn" onclick="this.parentElement.style.display=\'none\';">&times;</span>\n\t\t\t\t\t';
					box.appendChild(div);
					box.classList.remove('hide');
					div.classList.add('alert-success');

					setTimeout(function () {
						box.classList.add('hide');
						box.innerHTML = '';
					}, 3000);
				}
			}, _this);
			downloadExamBtn.addEventListener('click', function () {
				if (_this.save()) {
					if (!_this.examPath) {
						ipcRenderer.send('open-error-dialog', 'Please first upload your file');
					} else {
						ipcRenderer.send('process-exam', _this.examPath, _this.myconfig); // eslint-disable-line
					}
				} else {
					ipcRenderer.send('open-error-dialog', 'Please make sure that you fill the form correctly');
				}
			}, _this);
			ipcRenderer.on('exam-processed', function (event, path) {
				document.getElementById('exam-processed').innerHTML = 'Your exam has been processed and saved in <strong>' + path + '</strong>';
			});

			var container = document.querySelector('.container');
			container.addEventListener('change', function (e) {
				var temp = {};
				temp[e.target.id] = e.target.value;
				var temp3 = Object.assign({}, _this3.myconfig, temp);
				_this3.myconfig = {};
				_this3.myconfig = temp3;
			});
		}
	}, {
		key: 'save',
		value: function save() {
			var totalQ = this.myconfig.varGroups.reduce(function (total, value) {
				return total + value;
			}, 0);
			var diff = this.myconfig.varNumOfQuestions - totalQ;
			if (diff !== 0) {
				this.varGroups = [this.myconfig.varNumOfQuestions];
				this.varNumGroups.innerHTML = 1;
				this.myconfig.varGroups = [this.myconfig.varNumOfQuestions];
				this.myconfig.varNumGroups = 1;
				this.displayGroups();
			}
			if (this.validate()) {
				saveJasonLocally(this.myconfig);
				saveSettingLocally(this.setting);
				return true;
			}
			return false;
		}
	}, {
		key: 'setPath',
		value: function setPath(path) {
			this.examPath = path;
		}
	}, {
		key: 'openGroupsWindow',
		value: function openGroupsWindow() {
			ipcRenderer.send('open-groups-window');
		}
	}]);

	return MainController;
}();

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var electron = __webpack_require__(0);
// Module to control application life.
var BrowserWindow = electron.BrowserWindow;
var dialog = electron.dialog;

var url = __webpack_require__(4);
var fs = __webpack_require__(5);
module.exports = {
	loadFile: function loadFile(file) {
		return new Promise(function (resolve, reject) {
			fs.readFile(file, 'utf8', function (error, data) {
				if (error) {
					reject(error);
				} else {
					resolve(data);
				}
			});
		});
	},
	loadFileSync: function loadFileSync(file) {
		return fs.readFileSync(file, 'utf8');
	},
	shuffle: function shuffle(array) {
		var temp = [];
		var i = array.length,
		    j = void 0,
		    swap = void 0,
		    correctIndex = 0;
		array.forEach(function (value) {
			return temp.push(value);
		});
		while (--i) {
			j = Math.random() * (i + 1) | 0;
			correctIndex = j === correctIndex ? i : correctIndex;
			swap = temp[i];
			temp[i] = temp[j];
			temp[j] = swap;
		}
		return { options: temp, correctAnswer: correctIndex };
	},
	createWindow: function createWindow(file) {
		var width = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 900;
		var height = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1000;
		var frame = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
		var modal = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
		var parent = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : null;
		var show = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : true;

		// Create the browser window.
		var window = new BrowserWindow({ width: width, height: height, frame: frame, modal: modal, parent: parent, show: show });
		// and load the index.html of the app.
		window.loadURL(url.format({
			pathname: file,
			protocol: 'file:',
			slashes: true
		}));

		// Open the DevTools.
		// mainWindow.webContents.openDevTools()

		// Emitted when the window is closed.
		window.on('closed', function () {
			// Dereference the window object, usually you would store windows
			// in an array if your app supports multi windows, this is the time
			// when you should delete the corresponding element.
			window = null;
		});
		return window;
	},
	loadConfigs: function loadConfigs() {
		if (localStorage.length === 0) {
			return __webpack_require__(6);
		}
		var configs = Object.keys(localStorage);
		var tempObj = {};

		configs.forEach(function (key) {
			if (key === 'varGroups') {
				var groups = localStorage.getItem(key).split(',');
				var tempGrps = [];
				groups.forEach(function (group) {
					tempGrps.push(parseInt(group));
				});
				tempObj[key] = tempGrps;
			} else {
				tempObj[key] = localStorage.getItem(key);
			}
		});
		return tempObj;
	},
	loadSetting: function loadSetting() {
		if (!localStorage.gvarUniversity || !localStorage.gvarDepartment) {
			var temp = __webpack_require__(7);
			return {
				gvarUniversity: temp.gvarUniversity,
				gvarDepartment: temp.gvarDepartment
			};
		}

		return {
			gvarUniversity: localStorage.getItem('gvarUniversity'),
			gvarDepartment: localStorage.getItem('gvarDepartment')
		};
	},
	saveSettingLocally: function saveSettingLocally(obj) {
		var keys = Object.keys(obj);
		keys.forEach(function (key) {
			localStorage.setItem(key, obj[key]);
		});
	},
	saveJasonLocally: function saveJasonLocally(obj) {
		var keys = Object.keys(obj);
		keys.forEach(function (key) {
			localStorage.setItem(key, obj[key]);
		});
	},
	saveJson: function saveJson(filename, json) {
		fs.writeFileSync(filename, JSON.stringify(json));
	},
	saveFile: function saveFile(text) {
		var options = {
			title: 'Save LaTeX File',
			filters: [{ name: 'LaTeX', extensions: ['tex'] }]
		};
		return new Promise(function (resolve) {
			dialog.showSaveDialog(options, function (filename) {
				if (filename) {
					fs.writeFileSync(filename, text);
					resolve(filename);
				} else {
					resolve(false);
				}
			});
		});
	}
};

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("url");

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
	varCourseCode: 'MATH 101',
	varDate: 'Monday 25/12/2018',
	varExamTitle: 'EXAM I',
	varGroups: [5, 5, 5, 5],
	varNumAnswers: 5,
	varNumGroups: 4,
	varNumOfQuestions: '20',
	varNumOfVersions: '4',
	varTerm: '171',
	varTimeAllowed: '120 minutes'
};

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var settings = {
	gvarUniversity: 'King Fahd University of Petroleum and Minerals',
	gvarDepartment: 'Department of Mathematics and Statistics',
	gvarBeginQuestionTag: '%%BEGIN_QUESTIONS%%',
	gvarEndQuestionTag: '%%END_QUESTIONS%%',
	gvarQUESTIONSPLACEHOLDER: '%%QUESTIONS%%',
	gvarBeginQuestionBodyTag: '%%BEGIN_QUESTION_BODY%%',
	gvarEndQuestionBodyTag: '%%END_QUESTION_BODY%%',
	gvarNextQuestion: '%%NEXT_QUESTION%%',
	gvarAfterOddQuestion: '\\vspace{0.8in}\n',
	gvarAfterEvenQuestion: '\\newpage\n',
	gvarBeginOptions: '%%BEGIN_OPTIONS%%',
	gvarEndOptions: '%%END_OPTIONS%%',
	gvarOPTIONITEM: '\\item',
	gvarQUESTIONITEM: '\\item\n',
	gvarAFTERQUESTIONBODY: '\\sc\n',
	gvarBEGINOPTION: '\\be',
	gvarENDOPTION: '\\ee',
	gvarOddQuestionDel: '\\v2\n',
	gvarEvenQuestionDel: '\\newpage\n',
	gvarAnswerKey: '%%ANSWER_KEYS%%'
};
module.exports = settings;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

module.exports = function () {
    function MainView() {
        _classCallCheck(this, MainView);
    }

    _createClass(MainView, [{
        key: 'html',
        value: function html() {
            return '\n            <h2>Exam Shuffler</h2>\n        <hr/>\n        <div class="row">\n            <div class="two columns" ><strong>University:</strong></div>\n            <div class="ten columns" id="gvarUniversity" contenteditable></div>\n        </div>\n        \n        <div class="row">\n            <div class="two columns" ><strong>Department:</strong></div>\n            <div class="ten columns" id="gvarDepartment" contenteditable></div>\n        </div>\n        <hr/>\n        <ol>\n        <div class="row">\n            <li>First fill in the following form and click save to start preparing your exam.</li>\n        </div>\n        \n        <div class="row">\n\n            <div class="four columns">\n            <label for="varTerm">Semester</label>\n            <input autofocus class="u-full-width" type="number" placeholder="for example: 171" id="varTerm">\n            <p class="input-error" id="varTerm_error"></p>\n            </div>\n            <div class="four columns">\n            <label for="varCourseCode">Course</label>\n            <input class="u-full-width" type="text" placeholder="for example: MATH101" id="varCourseCode">\n            <p class="input-error" id="varCourseCode_error"></p>\n            </div>\n            <div class="four columns">\n            <label for="varExamTitle">Exam Name</label>\n            <input class="u-full-width" type="text" placeholder="for example: EXAM I" id="varExamTitle">\n            <p class="input-error" id="varExamTitle_error"></p>\n            </div>\n            \n        </div>\n        <div class="row">\n            <div class="six columns">\n            <label for="varDate">Date </label>\n            <input  class="u-full-width" type="text" placeholder="for example: Monday 21/12/2017" id="varDate">\n            <p class="input-error" id="varDate_error"></p>\n            </div>\n            <div class="six columns">\n            <label for="varTimeAllowed">Time Allowed</label>\n            <input class="u-full-width" type="text" placeholder="for example: 120 minutes" id="varTimeAllowed">\n            <p class="input-error" id="varTimeAllowed_error"></p>\n            </div>\n            \n        </div>\n        <div class="row">\n            <div class="four columns">\n            <label for="varNumOfQuestions">Number of Questions</label>\n            <input class="u-full-width" type="number" placeholder="for example: 20" id="varNumOfQuestions">\n            <p class="input-error" id="varNumOfQuestions_error"></p>\n            </div>\n            <div class="four columns">\n            <label for="varNumOfVersions">Number of Versions</label>\n            <input class="u-full-width" type="number" placeholder="for example: 4" id="varNumOfVersions">\n            <p class="input-error" id="varNumOfVersions_error"></p>\n            </div>\n            <div class="four columns">\n            <label for="varNumAnswers">Number of Answers</label>\n            <input class="u-full-width" type="number" placeholder="for example: 5" id="varNumAnswers">\n            <p class="input-error" id="varNumAnswers_error"></p>\n            </div>\n        </div>\n        <div class="row" >\n            <div class="twelve columns">\n                <div><strong>Number of Group</strong> \n                    <span id="varNumGroups"></span>\n                    <span id="groups"></span>\n                    <i href="#" id="changeGroupgs" class="fa fa-edit icon-add"></i>\n                </div>\n            </div>\n            \n        </div>\n        <div class="row" > \n            <div class="twelve columns">\n            <div class="hide" id="success-save">\n                \n                \n            </div>\n            <input class="button-default u-full-width" type="button" id="saveConfig" value="Save">\n            <div>\n         </div>\n        \n        <div class="row">\n        <p id="exam-processed"></p>\n        </div>\n        <div class="row">\n            <li> Second download this\n            <a id="download-template" href="#" class="button-primary">\n                Template\n            </a> and use it to write your exam. Please make sure not to alter its structure.\n            <p id="downloaded-template"></p>\n            </li>\n\n        </div>\n        <div class="row">\n            <li> Click\n            <a id="upload-exam" href="#" class="button-primary">here </a>\n            to upload your exam.\n            <p id="exam-uploaded"></p>\n            </li>\n        </div>\n        <div class="row" >\n            \n            <input class="button-primary u-full-width" type="button" id="downloadFile" value="Download Exam">\n        </div>\n        </ol>\n    </div>\n    \n        ';
        }
    }, {
        key: 'groupHtml',
        value: function groupHtml(groups) {
            if (!groups || groups.length === 0) {
                return 'Your questions are all in one group';
            }
            return '(' + groups.join(', ') + ')';
        }
    }]);

    return MainView;
}();

/***/ })
/******/ ]);