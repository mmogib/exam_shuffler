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


var _GroupsController = __webpack_require__(2);

var _GroupsController2 = _interopRequireDefault(_GroupsController);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var groupsCtrl = new _GroupsController2.default();
groupsCtrl.init();

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _GroupsView = __webpack_require__(3);

var _GroupsView2 = _interopRequireDefault(_GroupsView);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _require = __webpack_require__(0),
    ipcRenderer = _require.ipcRenderer;

var _require2 = __webpack_require__(4),
    saveJasonLocally = _require2.saveJasonLocally,
    loadConfigs = _require2.loadConfigs;

var GroupsController = function () {
	function GroupsController() {
		_classCallCheck(this, GroupsController);

		this.groupsDiv = null;
		this.varNumGroups = null;
		this.configs = loadConfigs();
		this.varNumQuestions = null;
		this.view = new _GroupsView2.default();
	}

	_createClass(GroupsController, [{
		key: 'init',
		value: function init() {
			var _this2 = this;

			var _this = this;
			document.getElementById('groupsDiv').innerHTML = this.view.html();
			this.varNumGroups = this.configs.varNumGroups;
			this.varNumQuestions = this.configs.varNumOfQuestions;
			this.groupsDiv = document.getElementById('groups');
			this.groupsDiv.innerHTML = this.listAllGroups(this.configs.varGroups);

			this.groupsDiv.addEventListener('click', function (e) {
				return _this2.deleteGroup(e);
			});

			document.querySelector('.container p').innerHTML = 'Number of Groups: ' + this.configs.varNumGroups;
			document.getElementById('addNewGroup').addEventListener('click', function () {
				return _this2.addNewGroup();
			});

			document.getElementById('cancelWindow').addEventListener('click', function () {
				return _this2.cancelWindow();
			});

			document.getElementById('saveWindow').addEventListener('click', function () {
				return _this2.saveWindow();
			});
		}
	}, {
		key: 'listAllGroups',
		value: function listAllGroups(groups) {
			var html = '';
			var varGroups = groups.length;
			for (var i = 0; i < varGroups; i++) {
				html += this.view.groupField(groups[i], i);
			}

			return html;
		}
	}, {
		key: 'addNewGroup',
		value: function addNewGroup() {
			var groupsDivs = document.querySelectorAll('.group');
			var groups = [];
			for (var i = 0; i < groupsDivs.length; i++) {
				groups.push(groupsDivs[i].value);
			}

			groups.push(0);
			this.groupsDiv.innerHTML = this.listAllGroups(groups);
			groups = null;
		}
	}, {
		key: 'saveWindow',
		value: function saveWindow() {
			var groupsDivs = document.querySelectorAll('.group');
			var groups = [];
			var runningTotal = 0;
			for (var i = 0; i < groupsDivs.length; i++) {
				var value = Math.min(groupsDivs[i].value, this.varNumQuestions - runningTotal);
				if (value > 0) {
					runningTotal += value;
					groups.push(value);
				}
			}
			var difference = this.varNumQuestions - runningTotal;
			if (difference > 0) {
				groups[groups.length - 1] += difference;
			}
			this.varNumGroups = groups.length === 0 ? 1 : groups.length;
			this.configs.varNumGroups = this.varNumGroups;
			this.configs.varGroups = this.varNumGroups === 1 ? [this.varNumQuestions] : groups;
			saveJasonLocally(this.configs);
			//ipcRenderer.send('save-configs', configs)
			ipcRenderer.send('update-groups');
			ipcRenderer.send('close-groups-window');
		}
	}, {
		key: 'cancelWindow',
		value: function cancelWindow() {
			ipcRenderer.send('close-groups-window');
		}
	}, {
		key: 'deleteGroup',
		value: function deleteGroup(e) {
			e.preventDefault();
			e.stopPropagation();
			console.log(e);

			var _e$target$id$split = e.target.id.split('_'),
			    _e$target$id$split2 = _slicedToArray(_e$target$id$split, 2),
			    id = _e$target$id$split2[0],
			    i = _e$target$id$split2[1];

			if (id === 'deletegroup') {
				var groups = this.configs.varGroups;
				groups.splice(i, 1);
				this.configs.varGroups = groups;
				this.varNumGroups = groups.length;
				this.groupsDiv.innerHTML = this.listAllGroups(this.configs.varGroups);
			}
		}
	}]);

	return GroupsController;
}();

exports.default = GroupsController;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var GroupView = function () {
    function GroupView() {
        _classCallCheck(this, GroupView);
    }

    _createClass(GroupView, [{
        key: "html",
        value: function html() {
            return " \n        <div class=\"container\">\n        <h2>Groups</h2>\n        <p></p>\n        <div class=\"alert hide\" id=\"error-message\">\n            <span class=\"closebtn\" onclick=\"this.parentElement.style.display='none';\">&times;</span>\n        </div>\n        <div class=\"row\" id=\"groups\">\n\n        </div>\n        <div class=\"row\">\n            <div class=\"twelve columns\">\n                <button href=\"#\" class=\"button button-default u-full-width\" id=\"addNewGroup\">New Group</button>\n            </div>\n            <div class=\"twelve columns\">\n                <button id=\"cancelWindow\" class=\"button button-default u-full-width\">Cancel</button>\n            </div>\n            <div class=\"twelve columns\">\n                <button id=\"saveWindow\" class=\"button button-primary u-full-width\">Save & Close</button>\n            </div>\n        </div>\n    </div>\n    \n        ";
        }
    }, {
        key: "groupField",
        value: function groupField(group, index) {
            return "\n            <div class=\"twelve columns\">\n                <label for=\"group_" + index + "\">Group " + (index + 1) + "</label>\n                <input class=\"group\" type=\"text\" value=\"" + group + "\" >\n                 <a href=\"#\" >\n                 <i id=\"deletegroup_" + index + "\" class=\"fa fa-close icon\"></i>\n                 </a>\n            </div>\n        ";
        }
    }]);

    return GroupView;
}();

exports.default = GroupView;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var electron = __webpack_require__(0);
// Module to control application life.
var BrowserWindow = electron.BrowserWindow;
var dialog = electron.dialog;

var url = __webpack_require__(5);
var fs = __webpack_require__(6);
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
			return __webpack_require__(7);
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
			var temp = __webpack_require__(8);
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
/* 5 */
/***/ (function(module, exports) {

module.exports = require("url");

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),
/* 7 */
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
/* 8 */
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

/***/ })
/******/ ]);