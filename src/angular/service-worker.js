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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/angular/service-worker.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/angular/app/constants/service-worker.ts":
/*!*****************************************************!*\
  !*** ./src/angular/app/constants/service-worker.ts ***!
  \*****************************************************/
/*! exports provided: CHANNEL_NAME */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CHANNEL_NAME", function() { return CHANNEL_NAME; });
var CHANNEL_NAME = 'sw-messages';


/***/ }),

/***/ "./src/angular/service-worker.ts":
/*!***************************************!*\
  !*** ./src/angular/service-worker.ts ***!
  \***************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _app_constants_service_worker__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app/constants/service-worker */ "./src/angular/app/constants/service-worker.ts");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};

var LOGIN_DB_SETTINGS = {
    name: 'login',
    version: 1,
};
var LOGIN_SUCCESS_DB_SETTINGS = {
    name: 'loginSuccess',
    version: 1,
};
var loginDb = null;
var loginSuccessDb = null;
var worker = self;
function createIndexDB(name, version, upgradeneeded) {
    var dbOpenRequest = indexedDB.open(name, version);
    dbOpenRequest.onupgradeneeded = upgradeneeded;
    return new Promise(function (resolve, reject) {
        dbOpenRequest.onsuccess = function (_) { return resolve(dbOpenRequest.result); };
        dbOpenRequest.onerror = function (error) { return reject(error); };
    });
}
function createDB() {
    return __awaiter(this, void 0, void 0, function () {
        var _loginDb;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, Promise.all([createIndexDB(LOGIN_DB_SETTINGS.name, LOGIN_DB_SETTINGS.version)])];
                case 1:
                    _loginDb = (_a.sent())[0];
                    loginDb = _loginDb;
                    return [2 /*return*/, null];
            }
        });
    });
}
function createChannel() {
    return __awaiter(this, void 0, void 0, function () {
        var channel;
        return __generator(this, function (_a) {
            channel = new BroadcastChannel(_app_constants_service_worker__WEBPACK_IMPORTED_MODULE_0__["CHANNEL_NAME"]);
            channel.addEventListener('message', function (_a) {
                var data = _a.data;
                channel.postMessage({ type: 'ok', value: true });
            });
            return [2 /*return*/, null];
        });
    });
}
self.addEventListener('install', function (event) {
    event.waitUntil(worker.skipWaiting());
});
self.addEventListener('activate', function (event) {
    event.waitUntil(Promise.all([
        createDB(),
        createChannel(),
    ]), worker.clients.claim());
});


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FuZ3VsYXIvYXBwL2NvbnN0YW50cy9zZXJ2aWNlLXdvcmtlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvYW5ndWxhci9zZXJ2aWNlLXdvcmtlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxrREFBMEMsZ0NBQWdDO0FBQzFFO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZ0VBQXdELGtCQUFrQjtBQUMxRTtBQUNBLHlEQUFpRCxjQUFjO0FBQy9EOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpREFBeUMsaUNBQWlDO0FBQzFFLHdIQUFnSCxtQkFBbUIsRUFBRTtBQUNySTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOzs7QUFHQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDbEZBO0FBQUE7QUFBTyxJQUFNLFlBQVksR0FBVyxhQUFhLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDQ1k7QUFFOUQsSUFBTSxpQkFBaUIsR0FBZTtJQUNsQyxJQUFJLEVBQUUsT0FBTztJQUNiLE9BQU8sRUFBRSxDQUFDO0NBQ2I7QUFFRCxJQUFNLHlCQUF5QixHQUFlO0lBQzFDLElBQUksRUFBRSxjQUFjO0lBQ3BCLE9BQU8sRUFBRSxDQUFDO0NBQ2I7QUFFRCxJQUFJLE9BQU8sR0FBZ0IsSUFBSSxDQUFDO0FBQ2hDLElBQUksY0FBYyxHQUFnQixJQUFJLENBQUM7QUFDdkMsSUFBTSxNQUFNLEdBQVEsSUFBSSxDQUFDO0FBRXpCLFNBQVMsYUFBYSxDQUFDLElBQVksRUFBRSxPQUFlLEVBQUUsYUFBc0M7SUFDeEYsSUFBTSxhQUFhLEdBQXFCLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBRXRFLGFBQWEsQ0FBQyxlQUFlLEdBQUcsYUFBYSxDQUFDO0lBRTlDLE9BQU8sSUFBSSxPQUFPLENBQUMsVUFBQyxPQUFPLEVBQUUsTUFBTTtRQUMvQixhQUFhLENBQUMsU0FBUyxHQUFHLFdBQUMsSUFBSSxjQUFPLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxFQUE3QixDQUE2QixDQUFDO1FBQzdELGFBQWEsQ0FBQyxPQUFPLEdBQUcsZUFBSyxJQUFJLGFBQU0sQ0FBQyxLQUFLLENBQUMsRUFBYixDQUFhLENBQUM7SUFDbkQsQ0FBQyxDQUFDLENBQUM7QUFDUCxDQUFDO0FBRUQsU0FBZSxRQUFROzs7Ozt3QkFDQSxxQkFBTSxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsYUFBYSxDQUFDLGlCQUFpQixDQUFDLElBQUksRUFBRSxpQkFBaUIsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDOztvQkFBakcsUUFBUSxHQUFJLFVBQXFGLElBQXpGO29CQUVmLE9BQU8sR0FBRyxRQUFRLENBQUM7b0JBRW5CLHNCQUFPLElBQUksRUFBQzs7OztDQUNmO0FBRUQsU0FBZSxhQUFhOzs7O1lBQ2xCLE9BQU8sR0FBcUIsSUFBSSxnQkFBZ0IsQ0FBQywwRUFBWSxDQUFDLENBQUM7WUFFckUsT0FBTyxDQUFDLGdCQUFnQixDQUFDLFNBQVMsRUFBRSxVQUFDLEVBQVE7b0JBQU4sY0FBSTtnQkFDdkMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7WUFDckQsQ0FBQyxDQUFDLENBQUM7WUFFSCxzQkFBTyxJQUFJLEVBQUM7OztDQUNmO0FBRUQsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFNBQVMsRUFBRSxVQUFTLEtBQVU7SUFDaEQsS0FBSyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQztBQUMxQyxDQUFDLENBQUMsQ0FBQztBQUVILElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxVQUFVLEVBQUUsVUFBUyxLQUFVO0lBQ2pELEtBQUssQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQztRQUN4QixRQUFRLEVBQUU7UUFDVixhQUFhLEVBQUU7S0FDbEIsQ0FBQyxFQUNGLE1BQU0sQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLENBQ3JCLENBQUM7QUFDTixDQUFDLENBQUMsQ0FBQyIsImZpbGUiOiIuL3NyYy9hbmd1bGFyL3NlcnZpY2Utd29ya2VyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvYW5ndWxhci9zZXJ2aWNlLXdvcmtlci50c1wiKTtcbiIsImV4cG9ydCBjb25zdCBDSEFOTkVMX05BTUU6IHN0cmluZyA9ICdzdy1tZXNzYWdlcyc7XHJcbiIsImltcG9ydCB7IERCU2V0dGluZ3MgfSBmcm9tICcuL2FwcC9pbnRlcmZhY2VzL2RiLXNldHRpbmdzJztcclxuaW1wb3J0IHsgQ0hBTk5FTF9OQU1FIH0gZnJvbSAnLi9hcHAvY29uc3RhbnRzL3NlcnZpY2Utd29ya2VyJztcclxuXHJcbmNvbnN0IExPR0lOX0RCX1NFVFRJTkdTOiBEQlNldHRpbmdzID0ge1xyXG4gICAgbmFtZTogJ2xvZ2luJyxcclxuICAgIHZlcnNpb246IDEsXHJcbn1cclxuXHJcbmNvbnN0IExPR0lOX1NVQ0NFU1NfREJfU0VUVElOR1M6IERCU2V0dGluZ3MgPSB7XHJcbiAgICBuYW1lOiAnbG9naW5TdWNjZXNzJyxcclxuICAgIHZlcnNpb246IDEsXHJcbn1cclxuXHJcbmxldCBsb2dpbkRiOiBJREJEYXRhYmFzZSA9IG51bGw7XHJcbmxldCBsb2dpblN1Y2Nlc3NEYjogSURCRGF0YWJhc2UgPSBudWxsO1xyXG5jb25zdCB3b3JrZXI6IGFueSA9IHNlbGY7XHJcblxyXG5mdW5jdGlvbiBjcmVhdGVJbmRleERCKG5hbWU6IHN0cmluZywgdmVyc2lvbjogbnVtYmVyLCB1cGdyYWRlbmVlZGVkPzogKGV2ZW50OiBFdmVudCkgPT4gdm9pZCk6IFByb21pc2U8SURCRGF0YWJhc2U+IHtcclxuICAgIGNvbnN0IGRiT3BlblJlcXVlc3Q6IElEQk9wZW5EQlJlcXVlc3QgPSBpbmRleGVkREIub3BlbihuYW1lLCB2ZXJzaW9uKTtcclxuXHJcbiAgICBkYk9wZW5SZXF1ZXN0Lm9udXBncmFkZW5lZWRlZCA9IHVwZ3JhZGVuZWVkZWQ7XHJcblxyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICBkYk9wZW5SZXF1ZXN0Lm9uc3VjY2VzcyA9IF8gPT4gcmVzb2x2ZShkYk9wZW5SZXF1ZXN0LnJlc3VsdCk7XHJcbiAgICAgICAgZGJPcGVuUmVxdWVzdC5vbmVycm9yID0gZXJyb3IgPT4gcmVqZWN0KGVycm9yKTtcclxuICAgIH0pO1xyXG59XHJcblxyXG5hc3luYyBmdW5jdGlvbiBjcmVhdGVEQigpIHtcclxuICAgIGNvbnN0IFtfbG9naW5EYl0gPSBhd2FpdCBQcm9taXNlLmFsbChbY3JlYXRlSW5kZXhEQihMT0dJTl9EQl9TRVRUSU5HUy5uYW1lLCBMT0dJTl9EQl9TRVRUSU5HUy52ZXJzaW9uKV0pO1xyXG5cclxuICAgIGxvZ2luRGIgPSBfbG9naW5EYjtcclxuXHJcbiAgICByZXR1cm4gbnVsbDtcclxufVxyXG5cclxuYXN5bmMgZnVuY3Rpb24gY3JlYXRlQ2hhbm5lbCgpIHtcclxuICAgIGNvbnN0IGNoYW5uZWw6IEJyb2FkY2FzdENoYW5uZWwgPSBuZXcgQnJvYWRjYXN0Q2hhbm5lbChDSEFOTkVMX05BTUUpO1xyXG5cclxuICAgIGNoYW5uZWwuYWRkRXZlbnRMaXN0ZW5lcignbWVzc2FnZScsICh7IGRhdGEgfSkgPT4ge1xyXG4gICAgICAgIGNoYW5uZWwucG9zdE1lc3NhZ2UoeyB0eXBlOiAnb2snLCB2YWx1ZTogdHJ1ZSB9KTtcclxuICAgIH0pO1xyXG5cclxuICAgIHJldHVybiBudWxsO1xyXG59XHJcblxyXG5zZWxmLmFkZEV2ZW50TGlzdGVuZXIoJ2luc3RhbGwnLCBmdW5jdGlvbihldmVudDogYW55KSB7XHJcbiAgICBldmVudC53YWl0VW50aWwod29ya2VyLnNraXBXYWl0aW5nKCkpO1xyXG59KTtcclxuXHJcbnNlbGYuYWRkRXZlbnRMaXN0ZW5lcignYWN0aXZhdGUnLCBmdW5jdGlvbihldmVudDogYW55KSB7XHJcbiAgICBldmVudC53YWl0VW50aWwoUHJvbWlzZS5hbGwoW1xyXG4gICAgICAgIGNyZWF0ZURCKCksIFxyXG4gICAgICAgIGNyZWF0ZUNoYW5uZWwoKSxcclxuICAgIF0pLFxyXG4gICAgd29ya2VyLmNsaWVudHMuY2xhaW0oKSxcclxuICAgICk7XHJcbn0pO1xyXG4iXSwic291cmNlUm9vdCI6IiJ9