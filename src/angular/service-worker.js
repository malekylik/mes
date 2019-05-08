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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/angular/service-worker/service-worker.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/idb/build/esm/async-iterators.js":
/*!*******************************************************!*\
  !*** ./node_modules/idb/build/esm/async-iterators.js ***!
  \*******************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _chunk_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./chunk.js */ "./node_modules/idb/build/esm/chunk.js");


const advanceMethodProps = ['continue', 'continuePrimaryKey', 'advance'];
const methodMap = {};
const advanceResults = new WeakMap();
const ittrProxiedCursorToOriginalProxy = new WeakMap();
const cursorIteratorTraps = {
    get(target, prop) {
        if (!advanceMethodProps.includes(prop))
            return target[prop];
        let cachedFunc = methodMap[prop];
        if (!cachedFunc) {
            cachedFunc = methodMap[prop] = function (...args) {
                advanceResults.set(this, ittrProxiedCursorToOriginalProxy.get(this)[prop](...args));
            };
        }
        return cachedFunc;
    },
};
async function* iterate(...args) {
    // tslint:disable-next-line:no-this-assignment
    let cursor = this;
    if (!(cursor instanceof IDBCursor)) {
        cursor = await cursor.openCursor(...args);
    }
    if (!cursor)
        return;
    cursor = cursor;
    const proxiedCursor = new Proxy(cursor, cursorIteratorTraps);
    ittrProxiedCursorToOriginalProxy.set(proxiedCursor, cursor);
    // Map this double-proxy back to the original, so other cursor methods work.
    _chunk_js__WEBPACK_IMPORTED_MODULE_0__["d"].set(proxiedCursor, Object(_chunk_js__WEBPACK_IMPORTED_MODULE_0__["e"])(cursor));
    while (cursor) {
        yield proxiedCursor;
        // If one of the advancing methods was not called, call continue().
        cursor = await (advanceResults.get(proxiedCursor) || cursor.continue());
        advanceResults.delete(proxiedCursor);
    }
}
function isIteratorProp(target, prop) {
    return (prop === Symbol.asyncIterator &&
        Object(_chunk_js__WEBPACK_IMPORTED_MODULE_0__["c"])(target, [IDBIndex, IDBObjectStore, IDBCursor])) || (prop === 'iterate' &&
        Object(_chunk_js__WEBPACK_IMPORTED_MODULE_0__["c"])(target, [IDBIndex, IDBObjectStore]));
}
Object(_chunk_js__WEBPACK_IMPORTED_MODULE_0__["b"])(oldTraps => ({
    get(target, prop, receiver) {
        if (isIteratorProp(target, prop))
            return iterate;
        return oldTraps.get(target, prop, receiver);
    },
    has(target, prop) {
        return isIteratorProp(target, prop) || oldTraps.has(target, prop);
    },
}));


/***/ }),

/***/ "./node_modules/idb/build/esm/chunk.js":
/*!*********************************************!*\
  !*** ./node_modules/idb/build/esm/chunk.js ***!
  \*********************************************/
/*! exports provided: a, b, c, d, e */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return wrap; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return addTraps; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return instanceOfAny; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return reverseTransformCache; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return unwrap; });
const instanceOfAny = (object, constructors) => constructors.some(c => object instanceof c);

let idbProxyableTypes;
let cursorAdvanceMethods;
// This is a function to prevent it throwing up in node environments.
function getIdbProxyableTypes() {
    return idbProxyableTypes ||
        (idbProxyableTypes = [IDBDatabase, IDBObjectStore, IDBIndex, IDBCursor, IDBTransaction]);
}
// This is a function to prevent it throwing up in node environments.
function getCursorAdvanceMethods() {
    return cursorAdvanceMethods || (cursorAdvanceMethods = [
        IDBCursor.prototype.advance,
        IDBCursor.prototype.continue,
        IDBCursor.prototype.continuePrimaryKey,
    ]);
}
const cursorRequestMap = new WeakMap();
const transactionDoneMap = new WeakMap();
const transactionStoreNamesMap = new WeakMap();
const transformCache = new WeakMap();
const reverseTransformCache = new WeakMap();
function promisifyRequest(request) {
    const promise = new Promise((resolve, reject) => {
        const unlisten = () => {
            request.removeEventListener('success', success);
            request.removeEventListener('error', error);
        };
        const success = () => {
            resolve(wrap(request.result));
            unlisten();
        };
        const error = () => {
            reject(request.error);
            unlisten();
        };
        request.addEventListener('success', success);
        request.addEventListener('error', error);
    });
    promise.then((value) => {
        // Since cursoring reuses the IDBRequest (*sigh*), we cache it for later retrieval
        // (see wrapFunction).
        if (value instanceof IDBCursor) {
            cursorRequestMap.set(value, request);
        }
    });
    // This mapping exists in reverseTransformCache but doesn't doesn't exist in transformCache. This
    // is because we create many promises from a single IDBRequest.
    reverseTransformCache.set(promise, request);
    return promise;
}
function cacheDonePromiseForTransaction(tx) {
    // Early bail if we've already created a done promise for this transaction.
    if (transactionDoneMap.has(tx))
        return;
    const done = new Promise((resolve, reject) => {
        const unlisten = () => {
            tx.removeEventListener('complete', complete);
            tx.removeEventListener('error', error);
            tx.removeEventListener('abort', error);
        };
        const complete = () => {
            resolve();
            unlisten();
        };
        const error = () => {
            reject(tx.error);
            unlisten();
        };
        tx.addEventListener('complete', complete);
        tx.addEventListener('error', error);
        tx.addEventListener('abort', error);
    });
    // Cache it for later retrieval.
    transactionDoneMap.set(tx, done);
}
let idbProxyTraps = {
    get(target, prop, receiver) {
        if (target instanceof IDBTransaction) {
            // Special handling for transaction.done.
            if (prop === 'done')
                return transactionDoneMap.get(target);
            // Polyfill for objectStoreNames because of Edge.
            if (prop === 'objectStoreNames') {
                return target.objectStoreNames || transactionStoreNamesMap.get(target);
            }
            // Make tx.store return the only store in the transaction, or undefined if there are many.
            if (prop === 'store') {
                return receiver.objectStoreNames[1] ?
                    undefined : receiver.objectStore(receiver.objectStoreNames[0]);
            }
        }
        // Else transform whatever we get back.
        return wrap(target[prop]);
    },
    has(target, prop) {
        if (target instanceof IDBTransaction && (prop === 'done' || prop === 'store'))
            return true;
        return prop in target;
    },
};
function addTraps(callback) {
    idbProxyTraps = callback(idbProxyTraps);
}
function wrapFunction(func) {
    // Due to expected object equality (which is enforced by the caching in `wrap`), we
    // only create one new func per func.
    // Edge doesn't support objectStoreNames (booo), so we polyfill it here.
    if (func === IDBDatabase.prototype.transaction &&
        !('objectStoreNames' in IDBTransaction.prototype)) {
        return function (storeNames, ...args) {
            const tx = func.call(unwrap(this), storeNames, ...args);
            transactionStoreNamesMap.set(tx, storeNames.sort ? storeNames.sort() : [storeNames]);
            return wrap(tx);
        };
    }
    // Cursor methods are special, as the behaviour is a little more different to standard IDB. In
    // IDB, you advance the cursor and wait for a new 'success' on the IDBRequest that gave you the
    // cursor. It's kinda like a promise that can resolve with many values. That doesn't make sense
    // with real promises, so each advance methods returns a new promise for the cursor object, or
    // undefined if the end of the cursor has been reached.
    if (getCursorAdvanceMethods().includes(func)) {
        return function (...args) {
            // Calling the original function with the proxy as 'this' causes ILLEGAL INVOCATION, so we use
            // the original object.
            func.apply(unwrap(this), args);
            return wrap(cursorRequestMap.get(this));
        };
    }
    return function (...args) {
        // Calling the original function with the proxy as 'this' causes ILLEGAL INVOCATION, so we use
        // the original object.
        return wrap(func.apply(unwrap(this), args));
    };
}
function transformCachableValue(value) {
    if (typeof value === 'function')
        return wrapFunction(value);
    // This doesn't return, it just creates a 'done' promise for the transaction,
    // which is later returned for transaction.done (see idbObjectHandler).
    if (value instanceof IDBTransaction)
        cacheDonePromiseForTransaction(value);
    if (instanceOfAny(value, getIdbProxyableTypes()))
        return new Proxy(value, idbProxyTraps);
    // Return the same value back if we're not going to transform it.
    return value;
}
function wrap(value) {
    // We sometimes generate multiple promises from a single IDBRequest (eg when cursoring), because
    // IDB is weird and a single IDBRequest can yield many responses, so these can't be cached.
    if (value instanceof IDBRequest)
        return promisifyRequest(value);
    // If we've already transformed this value before, reuse the transformed value.
    // This is faster, but it also provides object equality.
    if (transformCache.has(value))
        return transformCache.get(value);
    const newValue = transformCachableValue(value);
    // Not all types are transformed.
    // These may be primitive types, so they can't be WeakMap keys.
    if (newValue !== value) {
        transformCache.set(value, newValue);
        reverseTransformCache.set(newValue, value);
    }
    return newValue;
}
const unwrap = (value) => reverseTransformCache.get(value);




/***/ }),

/***/ "./node_modules/idb/build/esm/index.js":
/*!*********************************************!*\
  !*** ./node_modules/idb/build/esm/index.js ***!
  \*********************************************/
/*! exports provided: unwrap, wrap, openDB, deleteDB */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "openDB", function() { return openDB; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "deleteDB", function() { return deleteDB; });
/* harmony import */ var _chunk_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./chunk.js */ "./node_modules/idb/build/esm/chunk.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "unwrap", function() { return _chunk_js__WEBPACK_IMPORTED_MODULE_0__["e"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "wrap", function() { return _chunk_js__WEBPACK_IMPORTED_MODULE_0__["a"]; });




/**
 * Open a database.
 *
 * @param name Name of the database.
 * @param version Schema version.
 * @param callbacks Additional callbacks.
 */
function openDB(name, version, { blocked, upgrade, blocking } = {}) {
    const request = indexedDB.open(name, version);
    const openPromise = Object(_chunk_js__WEBPACK_IMPORTED_MODULE_0__["a"])(request);
    if (upgrade) {
        request.addEventListener('upgradeneeded', (event) => {
            upgrade(Object(_chunk_js__WEBPACK_IMPORTED_MODULE_0__["a"])(request.result), event.oldVersion, event.newVersion, Object(_chunk_js__WEBPACK_IMPORTED_MODULE_0__["a"])(request.transaction));
        });
    }
    if (blocked)
        request.addEventListener('blocked', () => blocked());
    if (blocking)
        openPromise.then(db => db.addEventListener('versionchange', blocking));
    return openPromise;
}
/**
 * Delete a database.
 *
 * @param name Name of the database.
 */
function deleteDB(name, { blocked } = {}) {
    const request = indexedDB.deleteDatabase(name);
    if (blocked)
        request.addEventListener('blocked', () => blocked());
    return Object(_chunk_js__WEBPACK_IMPORTED_MODULE_0__["a"])(request).then(() => undefined);
}

const readMethods = ['get', 'getKey', 'getAll', 'getAllKeys', 'count'];
const writeMethods = ['put', 'add', 'delete', 'clear'];
const cachedMethods = new Map();
function getMethod(target, prop) {
    if (!(target instanceof IDBDatabase &&
        !(prop in target) &&
        typeof prop === 'string'))
        return;
    if (cachedMethods.get(prop))
        return cachedMethods.get(prop);
    const targetFuncName = prop.replace(/FromIndex$/, '');
    const useIndex = prop !== targetFuncName;
    const isWrite = writeMethods.includes(targetFuncName);
    if (
    // Bail if the target doesn't exist on the target. Eg, getAll isn't in Edge.
    !(targetFuncName in (useIndex ? IDBIndex : IDBObjectStore).prototype) ||
        !(isWrite || readMethods.includes(targetFuncName)))
        return;
    const method = async function (storeName, ...args) {
        const tx = this.transaction(storeName, isWrite ? 'readwrite' : 'readonly');
        let target = tx.store;
        if (useIndex)
            target = target.index(args.shift());
        const returnVal = target[targetFuncName](...args);
        if (isWrite)
            await tx.done;
        return returnVal;
    };
    cachedMethods.set(prop, method);
    return method;
}
Object(_chunk_js__WEBPACK_IMPORTED_MODULE_0__["b"])(oldTraps => ({
    get: (target, prop, receiver) => getMethod(target, prop) || oldTraps.get(target, prop, receiver),
    has: (target, prop) => !!getMethod(target, prop) || oldTraps.has(target, prop),
}));




/***/ }),

/***/ "./node_modules/idb/with-async-ittr.js":
/*!*********************************************!*\
  !*** ./node_modules/idb/with-async-ittr.js ***!
  \*********************************************/
/*! exports provided: unwrap, wrap, openDB, deleteDB */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _build_esm_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./build/esm/index.js */ "./node_modules/idb/build/esm/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "unwrap", function() { return _build_esm_index_js__WEBPACK_IMPORTED_MODULE_0__["unwrap"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "wrap", function() { return _build_esm_index_js__WEBPACK_IMPORTED_MODULE_0__["wrap"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "openDB", function() { return _build_esm_index_js__WEBPACK_IMPORTED_MODULE_0__["openDB"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "deleteDB", function() { return _build_esm_index_js__WEBPACK_IMPORTED_MODULE_0__["deleteDB"]; });

/* harmony import */ var _build_esm_async_iterators_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./build/esm/async-iterators.js */ "./node_modules/idb/build/esm/async-iterators.js");




/***/ }),

/***/ "./src/angular/service-worker/constants/events-type.ts":
/*!*************************************************************!*\
  !*** ./src/angular/service-worker/constants/events-type.ts ***!
  \*************************************************************/
/*! exports provided: SeriveWorkerEvents */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SeriveWorkerEvents", function() { return SeriveWorkerEvents; });
var SeriveWorkerEvents;
(function (SeriveWorkerEvents) {
    SeriveWorkerEvents["isLogged"] = "isLogged";
    SeriveWorkerEvents["isAccountCreated"] = "isAccountCreated";
    SeriveWorkerEvents["checkLogin"] = "checkLogin";
    SeriveWorkerEvents["checkPassword"] = "checkPassword";
    SeriveWorkerEvents["createAccount"] = "createAccount";
    SeriveWorkerEvents["login"] = "login";
})(SeriveWorkerEvents || (SeriveWorkerEvents = {}));


/***/ }),

/***/ "./src/angular/service-worker/constants/index.ts":
/*!*******************************************************!*\
  !*** ./src/angular/service-worker/constants/index.ts ***!
  \*******************************************************/
/*! exports provided: CHANNEL_NAME, LOGIN_STORE_NAME, IS_LOGGED_STORE_NAME, LOGIN_DB_SETTINGS, isLoggedDBKeys */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CHANNEL_NAME", function() { return CHANNEL_NAME; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LOGIN_STORE_NAME", function() { return LOGIN_STORE_NAME; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "IS_LOGGED_STORE_NAME", function() { return IS_LOGGED_STORE_NAME; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LOGIN_DB_SETTINGS", function() { return LOGIN_DB_SETTINGS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isLoggedDBKeys", function() { return isLoggedDBKeys; });
var CHANNEL_NAME = 'sw-messages';
var LOGIN_STORE_NAME = 'login-store';
var IS_LOGGED_STORE_NAME = 'logged-store';
var LOGIN_DB_SETTINGS = {
    name: 'login',
    version: 4,
};
var isLoggedDBKeys;
(function (isLoggedDBKeys) {
    isLoggedDBKeys["isLogged"] = "isLogged";
    isLoggedDBKeys["account"] = "account";
})(isLoggedDBKeys || (isLoggedDBKeys = {}));


/***/ }),

/***/ "./src/angular/service-worker/events/checkLogin.ts":
/*!*********************************************************!*\
  !*** ./src/angular/service-worker/events/checkLogin.ts ***!
  \*********************************************************/
/*! exports provided: checkLogin */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "checkLogin", function() { return checkLogin; });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../constants */ "./src/angular/service-worker/constants/index.ts");
/* harmony import */ var _constants_events_type__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../constants/events-type */ "./src/angular/service-worker/constants/events-type.ts");
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


function checkLogin(channel, db, login) {
    return __awaiter(this, void 0, void 0, function () {
        var account, _isLoginValid;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, db.get(_constants__WEBPACK_IMPORTED_MODULE_0__["LOGIN_STORE_NAME"], _constants__WEBPACK_IMPORTED_MODULE_0__["isLoggedDBKeys"].account)];
                case 1:
                    account = _a.sent();
                    _isLoginValid = login === account.login;
                    channel.postMessage({ type: _constants_events_type__WEBPACK_IMPORTED_MODULE_1__["SeriveWorkerEvents"].checkLogin, data: _isLoginValid });
                    return [2 /*return*/];
            }
        });
    });
}


/***/ }),

/***/ "./src/angular/service-worker/events/checkPassword.ts":
/*!************************************************************!*\
  !*** ./src/angular/service-worker/events/checkPassword.ts ***!
  \************************************************************/
/*! exports provided: checkPassword */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "checkPassword", function() { return checkPassword; });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../constants */ "./src/angular/service-worker/constants/index.ts");
/* harmony import */ var _constants_events_type__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../constants/events-type */ "./src/angular/service-worker/constants/events-type.ts");
/* harmony import */ var _utils_crypto__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/crypto */ "./src/angular/service-worker/utils/crypto.ts");
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



function checkPassword(channel, db, password) {
    return __awaiter(this, void 0, void 0, function () {
        var account, passwordHash, _isPasswordValid;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, db.get(_constants__WEBPACK_IMPORTED_MODULE_0__["LOGIN_STORE_NAME"], _constants__WEBPACK_IMPORTED_MODULE_0__["isLoggedDBKeys"].account)];
                case 1:
                    account = _a.sent();
                    passwordHash = Object(_utils_crypto__WEBPACK_IMPORTED_MODULE_2__["generateHash"])(password + account.salt);
                    _isPasswordValid = passwordHash === account.password;
                    channel.postMessage({ type: _constants_events_type__WEBPACK_IMPORTED_MODULE_1__["SeriveWorkerEvents"].checkPassword, data: _isPasswordValid });
                    return [2 /*return*/];
            }
        });
    });
}


/***/ }),

/***/ "./src/angular/service-worker/events/createAccount.ts":
/*!************************************************************!*\
  !*** ./src/angular/service-worker/events/createAccount.ts ***!
  \************************************************************/
/*! exports provided: createAccount */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createAccount", function() { return createAccount; });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../constants */ "./src/angular/service-worker/constants/index.ts");
/* harmony import */ var _constants_events_type__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../constants/events-type */ "./src/angular/service-worker/constants/events-type.ts");
/* harmony import */ var _utils_crypto__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/crypto */ "./src/angular/service-worker/utils/crypto.ts");
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



function createAccount(channel, db, account) {
    return __awaiter(this, void 0, void 0, function () {
        var salt, passwordHash, date, newAccount;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    salt = Object(_utils_crypto__WEBPACK_IMPORTED_MODULE_2__["generateSalt"])();
                    passwordHash = Object(_utils_crypto__WEBPACK_IMPORTED_MODULE_2__["generateHash"])(account.password + salt);
                    date = Date.now();
                    newAccount = {
                        salt: salt,
                        login: account.login,
                        password: passwordHash,
                        creationTime: date,
                        lastUpdateTime: date,
                    };
                    return [4 /*yield*/, db.put(_constants__WEBPACK_IMPORTED_MODULE_0__["LOGIN_STORE_NAME"], newAccount, _constants__WEBPACK_IMPORTED_MODULE_0__["isLoggedDBKeys"].account)];
                case 1:
                    _a.sent();
                    channel.postMessage({ type: _constants_events_type__WEBPACK_IMPORTED_MODULE_1__["SeriveWorkerEvents"].createAccount, data: true });
                    return [2 /*return*/];
            }
        });
    });
}


/***/ }),

/***/ "./src/angular/service-worker/events/index.ts":
/*!****************************************************!*\
  !*** ./src/angular/service-worker/events/index.ts ***!
  \****************************************************/
/*! exports provided: isLogged, isAccountCreated, checkLogin, checkPassword, createAccount, login */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _isLogged__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./isLogged */ "./src/angular/service-worker/events/isLogged.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "isLogged", function() { return _isLogged__WEBPACK_IMPORTED_MODULE_0__["isLogged"]; });

/* harmony import */ var _isAccountCreated__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./isAccountCreated */ "./src/angular/service-worker/events/isAccountCreated.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "isAccountCreated", function() { return _isAccountCreated__WEBPACK_IMPORTED_MODULE_1__["isAccountCreated"]; });

/* harmony import */ var _checkLogin__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./checkLogin */ "./src/angular/service-worker/events/checkLogin.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "checkLogin", function() { return _checkLogin__WEBPACK_IMPORTED_MODULE_2__["checkLogin"]; });

/* harmony import */ var _checkPassword__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./checkPassword */ "./src/angular/service-worker/events/checkPassword.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "checkPassword", function() { return _checkPassword__WEBPACK_IMPORTED_MODULE_3__["checkPassword"]; });

/* harmony import */ var _createAccount__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./createAccount */ "./src/angular/service-worker/events/createAccount.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "createAccount", function() { return _createAccount__WEBPACK_IMPORTED_MODULE_4__["createAccount"]; });

/* harmony import */ var _login__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./login */ "./src/angular/service-worker/events/login.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "login", function() { return _login__WEBPACK_IMPORTED_MODULE_5__["login"]; });









/***/ }),

/***/ "./src/angular/service-worker/events/isAccountCreated.ts":
/*!***************************************************************!*\
  !*** ./src/angular/service-worker/events/isAccountCreated.ts ***!
  \***************************************************************/
/*! exports provided: isAccountCreated */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isAccountCreated", function() { return isAccountCreated; });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../constants */ "./src/angular/service-worker/constants/index.ts");
/* harmony import */ var _constants_events_type__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../constants/events-type */ "./src/angular/service-worker/constants/events-type.ts");
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


function isAccountCreated(channel, db) {
    return __awaiter(this, void 0, void 0, function () {
        var count, _isAccountCreated;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, db.count(_constants__WEBPACK_IMPORTED_MODULE_0__["LOGIN_STORE_NAME"], _constants__WEBPACK_IMPORTED_MODULE_0__["isLoggedDBKeys"].account)];
                case 1:
                    count = _a.sent();
                    _isAccountCreated = Boolean(count);
                    channel.postMessage({ type: _constants_events_type__WEBPACK_IMPORTED_MODULE_1__["SeriveWorkerEvents"].isAccountCreated, data: _isAccountCreated });
                    return [2 /*return*/];
            }
        });
    });
}


/***/ }),

/***/ "./src/angular/service-worker/events/isLogged.ts":
/*!*******************************************************!*\
  !*** ./src/angular/service-worker/events/isLogged.ts ***!
  \*******************************************************/
/*! exports provided: isLogged */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isLogged", function() { return isLogged; });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../constants */ "./src/angular/service-worker/constants/index.ts");
/* harmony import */ var _constants_events_type__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../constants/events-type */ "./src/angular/service-worker/constants/events-type.ts");
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


function isLogged(channel, db) {
    return __awaiter(this, void 0, void 0, function () {
        var _isLogged;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, db.get(_constants__WEBPACK_IMPORTED_MODULE_0__["IS_LOGGED_STORE_NAME"], _constants__WEBPACK_IMPORTED_MODULE_0__["isLoggedDBKeys"].isLogged)];
                case 1:
                    _isLogged = _a.sent();
                    channel.postMessage({ type: _constants_events_type__WEBPACK_IMPORTED_MODULE_1__["SeriveWorkerEvents"].isLogged, data: _isLogged });
                    return [2 /*return*/];
            }
        });
    });
}


/***/ }),

/***/ "./src/angular/service-worker/events/login.ts":
/*!****************************************************!*\
  !*** ./src/angular/service-worker/events/login.ts ***!
  \****************************************************/
/*! exports provided: login */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "login", function() { return login; });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../constants */ "./src/angular/service-worker/constants/index.ts");
/* harmony import */ var _constants_events_type__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../constants/events-type */ "./src/angular/service-worker/constants/events-type.ts");
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


function login(channel, db) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, db.put(_constants__WEBPACK_IMPORTED_MODULE_0__["IS_LOGGED_STORE_NAME"], true, _constants__WEBPACK_IMPORTED_MODULE_0__["isLoggedDBKeys"].isLogged)];
                case 1:
                    _a.sent();
                    channel.postMessage({ type: _constants_events_type__WEBPACK_IMPORTED_MODULE_1__["SeriveWorkerEvents"].login, data: true });
                    return [2 /*return*/];
            }
        });
    });
}


/***/ }),

/***/ "./src/angular/service-worker/service-worker.ts":
/*!******************************************************!*\
  !*** ./src/angular/service-worker/service-worker.ts ***!
  \******************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var idb_with_async_ittr_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! idb/with-async-ittr.js */ "./node_modules/idb/with-async-ittr.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./constants */ "./src/angular/service-worker/constants/index.ts");
/* harmony import */ var _constants_events_type__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./constants/events-type */ "./src/angular/service-worker/constants/events-type.ts");
/* harmony import */ var _events__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./events */ "./src/angular/service-worker/events/index.ts");
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




var worker = self;
var loginDb = null;
function upgradeDB(upgradeDB) {
    var accountStore = upgradeDB.createObjectStore(_constants__WEBPACK_IMPORTED_MODULE_1__["LOGIN_STORE_NAME"]);
    var store = upgradeDB.createObjectStore(_constants__WEBPACK_IMPORTED_MODULE_1__["IS_LOGGED_STORE_NAME"]);
    store.put(false, _constants__WEBPACK_IMPORTED_MODULE_1__["isLoggedDBKeys"].isLogged);
}
function createDB() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, Object(idb_with_async_ittr_js__WEBPACK_IMPORTED_MODULE_0__["openDB"])(_constants__WEBPACK_IMPORTED_MODULE_1__["LOGIN_DB_SETTINGS"].name, _constants__WEBPACK_IMPORTED_MODULE_1__["LOGIN_DB_SETTINGS"].version, { upgrade: upgradeDB })];
                case 1:
                    loginDb = _a.sent();
                    return [4 /*yield*/, loginDb.put(_constants__WEBPACK_IMPORTED_MODULE_1__["IS_LOGGED_STORE_NAME"], false, _constants__WEBPACK_IMPORTED_MODULE_1__["isLoggedDBKeys"].isLogged)];
                case 2:
                    _a.sent();
                    return [2 /*return*/, null];
            }
        });
    });
}
function createChannel() {
    return __awaiter(this, void 0, void 0, function () {
        var channel;
        return __generator(this, function (_a) {
            channel = new BroadcastChannel(_constants__WEBPACK_IMPORTED_MODULE_1__["CHANNEL_NAME"]);
            channel.addEventListener('message', function (_a) {
                var _b = _a.data, type = _b.type, data = _b.data;
                switch (type) {
                    case _constants_events_type__WEBPACK_IMPORTED_MODULE_2__["SeriveWorkerEvents"].isLogged:
                        Object(_events__WEBPACK_IMPORTED_MODULE_3__["isLogged"])(channel, loginDb);
                        break;
                    case _constants_events_type__WEBPACK_IMPORTED_MODULE_2__["SeriveWorkerEvents"].isAccountCreated:
                        Object(_events__WEBPACK_IMPORTED_MODULE_3__["isAccountCreated"])(channel, loginDb);
                        break;
                    case _constants_events_type__WEBPACK_IMPORTED_MODULE_2__["SeriveWorkerEvents"].checkLogin:
                        Object(_events__WEBPACK_IMPORTED_MODULE_3__["checkLogin"])(channel, loginDb, data);
                        break;
                    case _constants_events_type__WEBPACK_IMPORTED_MODULE_2__["SeriveWorkerEvents"].checkPassword:
                        Object(_events__WEBPACK_IMPORTED_MODULE_3__["checkPassword"])(channel, loginDb, data);
                        break;
                    case _constants_events_type__WEBPACK_IMPORTED_MODULE_2__["SeriveWorkerEvents"].createAccount:
                        Object(_events__WEBPACK_IMPORTED_MODULE_3__["createAccount"])(channel, loginDb, data);
                        break;
                    case _constants_events_type__WEBPACK_IMPORTED_MODULE_2__["SeriveWorkerEvents"].login:
                        Object(_events__WEBPACK_IMPORTED_MODULE_3__["login"])(channel, loginDb);
                        break;
                }
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


/***/ }),

/***/ "./src/angular/service-worker/utils/crypto.ts":
/*!****************************************************!*\
  !*** ./src/angular/service-worker/utils/crypto.ts ***!
  \****************************************************/
/*! exports provided: generateSalt, generateHash */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "generateSalt", function() { return generateSalt; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "generateHash", function() { return generateHash; });
var worker = self;
var crypto = worker.require('crypto');
function generateSalt() {
    return crypto.randomBytes(16).toString('hex');
}
function generateHash(s) {
    return crypto.createHash('sha256').update(s).digest('hex');
}


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2lkYi9idWlsZC9lc20vYXN5bmMtaXRlcmF0b3JzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9pZGIvYnVpbGQvZXNtL2NodW5rLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9pZGIvYnVpbGQvZXNtL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9pZGIvd2l0aC1hc3luYy1pdHRyLmpzIiwid2VicGFjazovLy8uL3NyYy9hbmd1bGFyL3NlcnZpY2Utd29ya2VyL2NvbnN0YW50cy9ldmVudHMtdHlwZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvYW5ndWxhci9zZXJ2aWNlLXdvcmtlci9jb25zdGFudHMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FuZ3VsYXIvc2VydmljZS13b3JrZXIvZXZlbnRzL2NoZWNrTG9naW4udHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FuZ3VsYXIvc2VydmljZS13b3JrZXIvZXZlbnRzL2NoZWNrUGFzc3dvcmQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FuZ3VsYXIvc2VydmljZS13b3JrZXIvZXZlbnRzL2NyZWF0ZUFjY291bnQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FuZ3VsYXIvc2VydmljZS13b3JrZXIvZXZlbnRzL2luZGV4LnRzIiwid2VicGFjazovLy8uL3NyYy9hbmd1bGFyL3NlcnZpY2Utd29ya2VyL2V2ZW50cy9pc0FjY291bnRDcmVhdGVkLnRzIiwid2VicGFjazovLy8uL3NyYy9hbmd1bGFyL3NlcnZpY2Utd29ya2VyL2V2ZW50cy9pc0xvZ2dlZC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvYW5ndWxhci9zZXJ2aWNlLXdvcmtlci9ldmVudHMvbG9naW4udHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FuZ3VsYXIvc2VydmljZS13b3JrZXIvc2VydmljZS13b3JrZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FuZ3VsYXIvc2VydmljZS13b3JrZXIvdXRpbHMvY3J5cHRvLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGtEQUEwQyxnQ0FBZ0M7QUFDMUU7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxnRUFBd0Qsa0JBQWtCO0FBQzFFO0FBQ0EseURBQWlELGNBQWM7QUFDL0Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlEQUF5QyxpQ0FBaUM7QUFDMUUsd0hBQWdILG1CQUFtQixFQUFFO0FBQ3JJO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7OztBQUdBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNsRkE7QUFBQTtBQUF3Rzs7QUFFeEc7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSSwyQ0FBcUIsb0JBQW9CLG1EQUFNO0FBQ25EO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVEsbURBQWE7QUFDckIsUUFBUSxtREFBYTtBQUNyQjtBQUNBLG1EQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUs7QUFDTCxDQUFDOzs7Ozs7Ozs7Ozs7O0FDckREO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVpRzs7Ozs7Ozs7Ozs7OztBQ3ZLakc7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFzRDtBQUNGOztBQUVwRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdDQUFnQyw2QkFBNkIsS0FBSztBQUNsRTtBQUNBLHdCQUF3QixtREFBSTtBQUM1QjtBQUNBO0FBQ0Esb0JBQW9CLG1EQUFJLHNEQUFzRCxtREFBSTtBQUNsRixTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUJBQXlCLFVBQVUsS0FBSztBQUN4QztBQUNBO0FBQ0E7QUFDQSxXQUFXLG1EQUFJO0FBQ2Y7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtREFBUTtBQUNSO0FBQ0E7QUFDQSxDQUFDOztBQUUyQjs7Ozs7Ozs7Ozs7OztBQ3hFNUI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFxQztBQUNHOzs7Ozs7Ozs7Ozs7O0FDRHhDO0FBQUE7QUFBQSxJQUFZLGtCQU9YO0FBUEQsV0FBWSxrQkFBa0I7SUFDMUIsMkNBQXFCO0lBQ3JCLDJEQUFxQztJQUNyQywrQ0FBeUI7SUFDekIscURBQStCO0lBQy9CLHFEQUErQjtJQUMvQixxQ0FBZTtBQUNuQixDQUFDLEVBUFcsa0JBQWtCLEtBQWxCLGtCQUFrQixRQU83Qjs7Ozs7Ozs7Ozs7OztBQ0xEO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFPLElBQU0sWUFBWSxHQUFXLGFBQWEsQ0FBQztBQUUzQyxJQUFNLGdCQUFnQixHQUFrQixhQUFhLENBQUM7QUFDdEQsSUFBTSxvQkFBb0IsR0FBbUIsY0FBYyxDQUFDO0FBRTVELElBQU0saUJBQWlCLEdBQWU7SUFDekMsSUFBSSxFQUFFLE9BQU87SUFDYixPQUFPLEVBQUUsQ0FBQztDQUNiO0FBR0QsSUFBWSxjQUdYO0FBSEQsV0FBWSxjQUFjO0lBQ3RCLHVDQUFxQjtJQUNyQixxQ0FBbUI7QUFDdkIsQ0FBQyxFQUhXLGNBQWMsS0FBZCxjQUFjLFFBR3pCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDaEIrRDtBQUVGO0FBRXZELFNBQWUsVUFBVSxDQUFDLE9BQXlCLEVBQUUsRUFBRSxFQUFFLEtBQWE7Ozs7O3dCQUNoRCxxQkFBTSxFQUFFLENBQUMsR0FBRyxDQUFDLDJEQUFnQixFQUFFLHlEQUFjLENBQUMsT0FBTyxDQUFDOztvQkFBekUsT0FBTyxHQUFZLFNBQXNEO29CQUN6RSxhQUFhLEdBQVksS0FBSyxLQUFLLE9BQU8sQ0FBQyxLQUFLLENBQUM7b0JBRXZELE9BQU8sQ0FBQyxXQUFXLENBQUMsRUFBRSxJQUFJLEVBQUUseUVBQWtCLENBQUMsVUFBVSxFQUFFLElBQUksRUFBRSxhQUFhLEVBQUUsQ0FBQyxDQUFDOzs7OztDQUNyRjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNUK0Q7QUFFRjtBQUNmO0FBRXhDLFNBQWUsYUFBYSxDQUFDLE9BQXlCLEVBQUUsRUFBRSxFQUFFLFFBQWdCOzs7Ozt3QkFDdEQscUJBQU0sRUFBRSxDQUFDLEdBQUcsQ0FBQywyREFBZ0IsRUFBRSx5REFBYyxDQUFDLE9BQU8sQ0FBQzs7b0JBQXpFLE9BQU8sR0FBWSxTQUFzRDtvQkFDekUsWUFBWSxHQUFXLGtFQUFZLENBQUMsUUFBUSxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztvQkFDN0QsZ0JBQWdCLEdBQVksWUFBWSxLQUFLLE9BQU8sQ0FBQyxRQUFRLENBQUM7b0JBRXBFLE9BQU8sQ0FBQyxXQUFXLENBQUMsRUFBRSxJQUFJLEVBQUUseUVBQWtCLENBQUMsYUFBYSxFQUFFLElBQUksRUFBRSxnQkFBZ0IsRUFBRSxDQUFDLENBQUM7Ozs7O0NBQzNGOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ1grRDtBQUdGO0FBQ0Q7QUFFdEQsU0FBZSxhQUFhLENBQUMsT0FBeUIsRUFBRSxFQUFFLEVBQUUsT0FBb0I7Ozs7OztvQkFDN0UsSUFBSSxHQUFXLGtFQUFZLEVBQUUsQ0FBQztvQkFDOUIsWUFBWSxHQUFXLGtFQUFZLENBQUMsT0FBTyxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsQ0FBQztvQkFDN0QsSUFBSSxHQUFXLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQztvQkFFMUIsVUFBVSxHQUFZO3dCQUN4QixJQUFJO3dCQUNKLEtBQUssRUFBRSxPQUFPLENBQUMsS0FBSzt3QkFDcEIsUUFBUSxFQUFFLFlBQVk7d0JBQ3RCLFlBQVksRUFBRSxJQUFJO3dCQUNsQixjQUFjLEVBQUUsSUFBSTtxQkFDdkIsQ0FBQztvQkFFRixxQkFBTSxFQUFFLENBQUMsR0FBRyxDQUFDLDJEQUFnQixFQUFFLFVBQVUsRUFBRSx5REFBYyxDQUFDLE9BQU8sQ0FBQzs7b0JBQWxFLFNBQWtFLENBQUM7b0JBRW5FLE9BQU8sQ0FBQyxXQUFXLENBQUMsRUFBRSxJQUFJLEVBQUUseUVBQWtCLENBQUMsYUFBYSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDOzs7OztDQUMvRTs7Ozs7Ozs7Ozs7OztBQ3RCRDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFzQztBQUNnQjtBQUNaO0FBQ007QUFDQTtBQUNoQjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ0xnQztBQUNGO0FBRXZELFNBQWUsZ0JBQWdCLENBQUMsT0FBeUIsRUFBRSxFQUFFOzs7Ozt3QkFDbEQscUJBQU0sRUFBRSxDQUFDLEtBQUssQ0FBQywyREFBZ0IsRUFBRSx5REFBYyxDQUFDLE9BQU8sQ0FBQzs7b0JBQWhFLEtBQUssR0FBRyxTQUF3RDtvQkFDaEUsaUJBQWlCLEdBQVksT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO29CQUVsRCxPQUFPLENBQUMsV0FBVyxDQUFDLEVBQUUsSUFBSSxFQUFFLHlFQUFrQixDQUFDLGdCQUFnQixFQUFFLElBQUksRUFBRSxpQkFBaUIsRUFBRSxDQUFDLENBQUM7Ozs7O0NBQy9GOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDUm1FO0FBQ047QUFFdkQsU0FBZSxRQUFRLENBQUMsT0FBeUIsRUFBRSxFQUFFOzs7Ozt3QkFDN0IscUJBQU0sRUFBRSxDQUFDLEdBQUcsQ0FBQywrREFBb0IsRUFBRSx5REFBYyxDQUFDLFFBQVEsQ0FBQzs7b0JBQWhGLFNBQVMsR0FBWSxTQUEyRDtvQkFFdEYsT0FBTyxDQUFDLFdBQVcsQ0FBQyxFQUFFLElBQUksRUFBRSx5RUFBa0IsQ0FBQyxRQUFRLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxDQUFDLENBQUM7Ozs7O0NBQy9FOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDUG1FO0FBQ047QUFFdkQsU0FBZSxLQUFLLENBQUMsT0FBeUIsRUFBRSxFQUFFOzs7O3dCQUNyRCxxQkFBTSxFQUFFLENBQUMsR0FBRyxDQUFDLCtEQUFvQixFQUFFLElBQUksRUFBRSx5REFBYyxDQUFDLFFBQVEsQ0FBQzs7b0JBQWpFLFNBQWlFLENBQUM7b0JBRWxFLE9BQU8sQ0FBQyxXQUFXLENBQUMsRUFBRSxJQUFJLEVBQUUseUVBQWtCLENBQUMsS0FBSyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDOzs7OztDQUN2RTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNQK0M7QUFRM0I7QUFDd0M7QUFFMEM7QUFFdkcsSUFBTSxNQUFNLEdBQVEsSUFBSSxDQUFDO0FBQ3pCLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQztBQUVuQixTQUFTLFNBQVMsQ0FBQyxTQUFTO0lBQ3hCLElBQU0sWUFBWSxHQUFHLFNBQVMsQ0FBQyxpQkFBaUIsQ0FBQywyREFBZ0IsQ0FBQyxDQUFDO0lBQ25FLElBQU0sS0FBSyxHQUFHLFNBQVMsQ0FBQyxpQkFBaUIsQ0FBQywrREFBb0IsQ0FBQyxDQUFDO0lBRWhFLEtBQUssQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFFLHlEQUFjLENBQUMsUUFBUSxDQUFDLENBQUM7QUFDOUMsQ0FBQztBQUVELFNBQWUsUUFBUTs7Ozt3QkFDVCxxQkFBTSxxRUFBTSxDQUNsQiw0REFBaUIsQ0FBQyxJQUFJLEVBQ3RCLDREQUFpQixDQUFDLE9BQU8sRUFDekIsRUFBRSxPQUFPLEVBQUUsU0FBUyxFQUFFLENBQ3pCOztvQkFKRCxPQUFPLEdBQUcsU0FJVCxDQUFDO29CQUVGLHFCQUFNLE9BQU8sQ0FBQyxHQUFHLENBQUMsK0RBQW9CLEVBQUUsS0FBSyxFQUFFLHlEQUFjLENBQUMsUUFBUSxDQUFDOztvQkFBdkUsU0FBdUUsQ0FBQztvQkFFeEUsc0JBQU8sSUFBSSxFQUFDOzs7O0NBQ2Y7QUFFRCxTQUFlLGFBQWE7Ozs7WUFDbEIsT0FBTyxHQUFxQixJQUFJLGdCQUFnQixDQUFDLHVEQUFZLENBQUMsQ0FBQztZQUVyRSxPQUFPLENBQUMsZ0JBQWdCLENBQUMsU0FBUyxFQUFFLFVBQUMsRUFBd0I7b0JBQXRCLFlBQW9CLEVBQVosY0FBSSxFQUFFLGNBQUk7Z0JBQ3JELFFBQVEsSUFBSSxFQUFFO29CQUNWLEtBQUsseUVBQWtCLENBQUMsUUFBUTt3QkFBRSx3REFBUSxDQUFDLE9BQU8sRUFBRSxPQUFPLENBQUMsQ0FBQzt3QkFBQyxNQUFNO29CQUNwRSxLQUFLLHlFQUFrQixDQUFDLGdCQUFnQjt3QkFBRSxnRUFBZ0IsQ0FBQyxPQUFPLEVBQUUsT0FBTyxDQUFDLENBQUM7d0JBQUMsTUFBTTtvQkFDcEYsS0FBSyx5RUFBa0IsQ0FBQyxVQUFVO3dCQUFFLDBEQUFVLENBQUMsT0FBTyxFQUFFLE9BQU8sRUFBRSxJQUFJLENBQUMsQ0FBQzt3QkFBQyxNQUFNO29CQUM5RSxLQUFLLHlFQUFrQixDQUFDLGFBQWE7d0JBQUUsNkRBQWEsQ0FBQyxPQUFPLEVBQUUsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFDO3dCQUFDLE1BQU07b0JBQ3BGLEtBQUsseUVBQWtCLENBQUMsYUFBYTt3QkFBRSw2REFBYSxDQUFDLE9BQU8sRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUM7d0JBQUMsTUFBTTtvQkFDcEYsS0FBSyx5RUFBa0IsQ0FBQyxLQUFLO3dCQUFFLHFEQUFLLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxDQUFDO3dCQUFDLE1BQU07aUJBQ2pFO1lBQ0wsQ0FBQyxDQUFDLENBQUM7WUFFSCxzQkFBTyxJQUFJLEVBQUM7OztDQUNmO0FBRUQsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFNBQVMsRUFBRSxVQUFTLEtBQVU7SUFDaEQsS0FBSyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQztBQUMxQyxDQUFDLENBQUMsQ0FBQztBQUVILElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxVQUFVLEVBQUUsVUFBUyxLQUFVO0lBQ2pELEtBQUssQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQztRQUN4QixRQUFRLEVBQUU7UUFDVixhQUFhLEVBQUU7S0FDbEIsQ0FBQyxFQUNGLE1BQU0sQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLENBQ3JCLENBQUM7QUFDTixDQUFDLENBQUMsQ0FBQzs7Ozs7Ozs7Ozs7OztBQy9ESDtBQUFBO0FBQUE7QUFBQSxJQUFNLE1BQU0sR0FBUSxJQUFJLENBQUM7QUFDekIsSUFBTSxNQUFNLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQztBQUVqQyxTQUFTLFlBQVk7SUFDeEIsT0FBTyxNQUFNLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUNsRCxDQUFDO0FBRU0sU0FBUyxZQUFZLENBQUMsQ0FBUztJQUNsQyxPQUFPLE1BQU0sQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUMvRCxDQUFDIiwiZmlsZSI6InNlcnZpY2Utd29ya2VyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvYW5ndWxhci9zZXJ2aWNlLXdvcmtlci9zZXJ2aWNlLXdvcmtlci50c1wiKTtcbiIsImltcG9ydCB7IGIgYXMgYWRkVHJhcHMsIGMgYXMgaW5zdGFuY2VPZkFueSwgZCBhcyByZXZlcnNlVHJhbnNmb3JtQ2FjaGUsIGUgYXMgdW53cmFwIH0gZnJvbSAnLi9jaHVuay5qcyc7XG5cbmNvbnN0IGFkdmFuY2VNZXRob2RQcm9wcyA9IFsnY29udGludWUnLCAnY29udGludWVQcmltYXJ5S2V5JywgJ2FkdmFuY2UnXTtcclxuY29uc3QgbWV0aG9kTWFwID0ge307XHJcbmNvbnN0IGFkdmFuY2VSZXN1bHRzID0gbmV3IFdlYWtNYXAoKTtcclxuY29uc3QgaXR0clByb3hpZWRDdXJzb3JUb09yaWdpbmFsUHJveHkgPSBuZXcgV2Vha01hcCgpO1xyXG5jb25zdCBjdXJzb3JJdGVyYXRvclRyYXBzID0ge1xyXG4gICAgZ2V0KHRhcmdldCwgcHJvcCkge1xyXG4gICAgICAgIGlmICghYWR2YW5jZU1ldGhvZFByb3BzLmluY2x1ZGVzKHByb3ApKVxyXG4gICAgICAgICAgICByZXR1cm4gdGFyZ2V0W3Byb3BdO1xyXG4gICAgICAgIGxldCBjYWNoZWRGdW5jID0gbWV0aG9kTWFwW3Byb3BdO1xyXG4gICAgICAgIGlmICghY2FjaGVkRnVuYykge1xyXG4gICAgICAgICAgICBjYWNoZWRGdW5jID0gbWV0aG9kTWFwW3Byb3BdID0gZnVuY3Rpb24gKC4uLmFyZ3MpIHtcclxuICAgICAgICAgICAgICAgIGFkdmFuY2VSZXN1bHRzLnNldCh0aGlzLCBpdHRyUHJveGllZEN1cnNvclRvT3JpZ2luYWxQcm94eS5nZXQodGhpcylbcHJvcF0oLi4uYXJncykpO1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gY2FjaGVkRnVuYztcclxuICAgIH0sXHJcbn07XHJcbmFzeW5jIGZ1bmN0aW9uKiBpdGVyYXRlKC4uLmFyZ3MpIHtcclxuICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby10aGlzLWFzc2lnbm1lbnRcclxuICAgIGxldCBjdXJzb3IgPSB0aGlzO1xyXG4gICAgaWYgKCEoY3Vyc29yIGluc3RhbmNlb2YgSURCQ3Vyc29yKSkge1xyXG4gICAgICAgIGN1cnNvciA9IGF3YWl0IGN1cnNvci5vcGVuQ3Vyc29yKC4uLmFyZ3MpO1xyXG4gICAgfVxyXG4gICAgaWYgKCFjdXJzb3IpXHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgY3Vyc29yID0gY3Vyc29yO1xyXG4gICAgY29uc3QgcHJveGllZEN1cnNvciA9IG5ldyBQcm94eShjdXJzb3IsIGN1cnNvckl0ZXJhdG9yVHJhcHMpO1xyXG4gICAgaXR0clByb3hpZWRDdXJzb3JUb09yaWdpbmFsUHJveHkuc2V0KHByb3hpZWRDdXJzb3IsIGN1cnNvcik7XHJcbiAgICAvLyBNYXAgdGhpcyBkb3VibGUtcHJveHkgYmFjayB0byB0aGUgb3JpZ2luYWwsIHNvIG90aGVyIGN1cnNvciBtZXRob2RzIHdvcmsuXHJcbiAgICByZXZlcnNlVHJhbnNmb3JtQ2FjaGUuc2V0KHByb3hpZWRDdXJzb3IsIHVud3JhcChjdXJzb3IpKTtcclxuICAgIHdoaWxlIChjdXJzb3IpIHtcclxuICAgICAgICB5aWVsZCBwcm94aWVkQ3Vyc29yO1xyXG4gICAgICAgIC8vIElmIG9uZSBvZiB0aGUgYWR2YW5jaW5nIG1ldGhvZHMgd2FzIG5vdCBjYWxsZWQsIGNhbGwgY29udGludWUoKS5cclxuICAgICAgICBjdXJzb3IgPSBhd2FpdCAoYWR2YW5jZVJlc3VsdHMuZ2V0KHByb3hpZWRDdXJzb3IpIHx8IGN1cnNvci5jb250aW51ZSgpKTtcclxuICAgICAgICBhZHZhbmNlUmVzdWx0cy5kZWxldGUocHJveGllZEN1cnNvcik7XHJcbiAgICB9XHJcbn1cclxuZnVuY3Rpb24gaXNJdGVyYXRvclByb3AodGFyZ2V0LCBwcm9wKSB7XHJcbiAgICByZXR1cm4gKHByb3AgPT09IFN5bWJvbC5hc3luY0l0ZXJhdG9yICYmXHJcbiAgICAgICAgaW5zdGFuY2VPZkFueSh0YXJnZXQsIFtJREJJbmRleCwgSURCT2JqZWN0U3RvcmUsIElEQkN1cnNvcl0pKSB8fCAocHJvcCA9PT0gJ2l0ZXJhdGUnICYmXHJcbiAgICAgICAgaW5zdGFuY2VPZkFueSh0YXJnZXQsIFtJREJJbmRleCwgSURCT2JqZWN0U3RvcmVdKSk7XHJcbn1cclxuYWRkVHJhcHMob2xkVHJhcHMgPT4gKHtcclxuICAgIGdldCh0YXJnZXQsIHByb3AsIHJlY2VpdmVyKSB7XHJcbiAgICAgICAgaWYgKGlzSXRlcmF0b3JQcm9wKHRhcmdldCwgcHJvcCkpXHJcbiAgICAgICAgICAgIHJldHVybiBpdGVyYXRlO1xyXG4gICAgICAgIHJldHVybiBvbGRUcmFwcy5nZXQodGFyZ2V0LCBwcm9wLCByZWNlaXZlcik7XHJcbiAgICB9LFxyXG4gICAgaGFzKHRhcmdldCwgcHJvcCkge1xyXG4gICAgICAgIHJldHVybiBpc0l0ZXJhdG9yUHJvcCh0YXJnZXQsIHByb3ApIHx8IG9sZFRyYXBzLmhhcyh0YXJnZXQsIHByb3ApO1xyXG4gICAgfSxcclxufSkpO1xuIiwiY29uc3QgaW5zdGFuY2VPZkFueSA9IChvYmplY3QsIGNvbnN0cnVjdG9ycykgPT4gY29uc3RydWN0b3JzLnNvbWUoYyA9PiBvYmplY3QgaW5zdGFuY2VvZiBjKTtcblxubGV0IGlkYlByb3h5YWJsZVR5cGVzO1xyXG5sZXQgY3Vyc29yQWR2YW5jZU1ldGhvZHM7XHJcbi8vIFRoaXMgaXMgYSBmdW5jdGlvbiB0byBwcmV2ZW50IGl0IHRocm93aW5nIHVwIGluIG5vZGUgZW52aXJvbm1lbnRzLlxyXG5mdW5jdGlvbiBnZXRJZGJQcm94eWFibGVUeXBlcygpIHtcclxuICAgIHJldHVybiBpZGJQcm94eWFibGVUeXBlcyB8fFxyXG4gICAgICAgIChpZGJQcm94eWFibGVUeXBlcyA9IFtJREJEYXRhYmFzZSwgSURCT2JqZWN0U3RvcmUsIElEQkluZGV4LCBJREJDdXJzb3IsIElEQlRyYW5zYWN0aW9uXSk7XHJcbn1cclxuLy8gVGhpcyBpcyBhIGZ1bmN0aW9uIHRvIHByZXZlbnQgaXQgdGhyb3dpbmcgdXAgaW4gbm9kZSBlbnZpcm9ubWVudHMuXHJcbmZ1bmN0aW9uIGdldEN1cnNvckFkdmFuY2VNZXRob2RzKCkge1xyXG4gICAgcmV0dXJuIGN1cnNvckFkdmFuY2VNZXRob2RzIHx8IChjdXJzb3JBZHZhbmNlTWV0aG9kcyA9IFtcclxuICAgICAgICBJREJDdXJzb3IucHJvdG90eXBlLmFkdmFuY2UsXHJcbiAgICAgICAgSURCQ3Vyc29yLnByb3RvdHlwZS5jb250aW51ZSxcclxuICAgICAgICBJREJDdXJzb3IucHJvdG90eXBlLmNvbnRpbnVlUHJpbWFyeUtleSxcclxuICAgIF0pO1xyXG59XHJcbmNvbnN0IGN1cnNvclJlcXVlc3RNYXAgPSBuZXcgV2Vha01hcCgpO1xyXG5jb25zdCB0cmFuc2FjdGlvbkRvbmVNYXAgPSBuZXcgV2Vha01hcCgpO1xyXG5jb25zdCB0cmFuc2FjdGlvblN0b3JlTmFtZXNNYXAgPSBuZXcgV2Vha01hcCgpO1xyXG5jb25zdCB0cmFuc2Zvcm1DYWNoZSA9IG5ldyBXZWFrTWFwKCk7XHJcbmNvbnN0IHJldmVyc2VUcmFuc2Zvcm1DYWNoZSA9IG5ldyBXZWFrTWFwKCk7XHJcbmZ1bmN0aW9uIHByb21pc2lmeVJlcXVlc3QocmVxdWVzdCkge1xyXG4gICAgY29uc3QgcHJvbWlzZSA9IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICBjb25zdCB1bmxpc3RlbiA9ICgpID0+IHtcclxuICAgICAgICAgICAgcmVxdWVzdC5yZW1vdmVFdmVudExpc3RlbmVyKCdzdWNjZXNzJywgc3VjY2Vzcyk7XHJcbiAgICAgICAgICAgIHJlcXVlc3QucmVtb3ZlRXZlbnRMaXN0ZW5lcignZXJyb3InLCBlcnJvcik7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBjb25zdCBzdWNjZXNzID0gKCkgPT4ge1xyXG4gICAgICAgICAgICByZXNvbHZlKHdyYXAocmVxdWVzdC5yZXN1bHQpKTtcclxuICAgICAgICAgICAgdW5saXN0ZW4oKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIGNvbnN0IGVycm9yID0gKCkgPT4ge1xyXG4gICAgICAgICAgICByZWplY3QocmVxdWVzdC5lcnJvcik7XHJcbiAgICAgICAgICAgIHVubGlzdGVuKCk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICByZXF1ZXN0LmFkZEV2ZW50TGlzdGVuZXIoJ3N1Y2Nlc3MnLCBzdWNjZXNzKTtcclxuICAgICAgICByZXF1ZXN0LmFkZEV2ZW50TGlzdGVuZXIoJ2Vycm9yJywgZXJyb3IpO1xyXG4gICAgfSk7XHJcbiAgICBwcm9taXNlLnRoZW4oKHZhbHVlKSA9PiB7XHJcbiAgICAgICAgLy8gU2luY2UgY3Vyc29yaW5nIHJldXNlcyB0aGUgSURCUmVxdWVzdCAoKnNpZ2gqKSwgd2UgY2FjaGUgaXQgZm9yIGxhdGVyIHJldHJpZXZhbFxyXG4gICAgICAgIC8vIChzZWUgd3JhcEZ1bmN0aW9uKS5cclxuICAgICAgICBpZiAodmFsdWUgaW5zdGFuY2VvZiBJREJDdXJzb3IpIHtcclxuICAgICAgICAgICAgY3Vyc29yUmVxdWVzdE1hcC5zZXQodmFsdWUsIHJlcXVlc3QpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgLy8gVGhpcyBtYXBwaW5nIGV4aXN0cyBpbiByZXZlcnNlVHJhbnNmb3JtQ2FjaGUgYnV0IGRvZXNuJ3QgZG9lc24ndCBleGlzdCBpbiB0cmFuc2Zvcm1DYWNoZS4gVGhpc1xyXG4gICAgLy8gaXMgYmVjYXVzZSB3ZSBjcmVhdGUgbWFueSBwcm9taXNlcyBmcm9tIGEgc2luZ2xlIElEQlJlcXVlc3QuXHJcbiAgICByZXZlcnNlVHJhbnNmb3JtQ2FjaGUuc2V0KHByb21pc2UsIHJlcXVlc3QpO1xyXG4gICAgcmV0dXJuIHByb21pc2U7XHJcbn1cclxuZnVuY3Rpb24gY2FjaGVEb25lUHJvbWlzZUZvclRyYW5zYWN0aW9uKHR4KSB7XHJcbiAgICAvLyBFYXJseSBiYWlsIGlmIHdlJ3ZlIGFscmVhZHkgY3JlYXRlZCBhIGRvbmUgcHJvbWlzZSBmb3IgdGhpcyB0cmFuc2FjdGlvbi5cclxuICAgIGlmICh0cmFuc2FjdGlvbkRvbmVNYXAuaGFzKHR4KSlcclxuICAgICAgICByZXR1cm47XHJcbiAgICBjb25zdCBkb25lID0gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IHVubGlzdGVuID0gKCkgPT4ge1xyXG4gICAgICAgICAgICB0eC5yZW1vdmVFdmVudExpc3RlbmVyKCdjb21wbGV0ZScsIGNvbXBsZXRlKTtcclxuICAgICAgICAgICAgdHgucmVtb3ZlRXZlbnRMaXN0ZW5lcignZXJyb3InLCBlcnJvcik7XHJcbiAgICAgICAgICAgIHR4LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2Fib3J0JywgZXJyb3IpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgY29uc3QgY29tcGxldGUgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgIHJlc29sdmUoKTtcclxuICAgICAgICAgICAgdW5saXN0ZW4oKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIGNvbnN0IGVycm9yID0gKCkgPT4ge1xyXG4gICAgICAgICAgICByZWplY3QodHguZXJyb3IpO1xyXG4gICAgICAgICAgICB1bmxpc3RlbigpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgdHguYWRkRXZlbnRMaXN0ZW5lcignY29tcGxldGUnLCBjb21wbGV0ZSk7XHJcbiAgICAgICAgdHguYWRkRXZlbnRMaXN0ZW5lcignZXJyb3InLCBlcnJvcik7XHJcbiAgICAgICAgdHguYWRkRXZlbnRMaXN0ZW5lcignYWJvcnQnLCBlcnJvcik7XHJcbiAgICB9KTtcclxuICAgIC8vIENhY2hlIGl0IGZvciBsYXRlciByZXRyaWV2YWwuXHJcbiAgICB0cmFuc2FjdGlvbkRvbmVNYXAuc2V0KHR4LCBkb25lKTtcclxufVxyXG5sZXQgaWRiUHJveHlUcmFwcyA9IHtcclxuICAgIGdldCh0YXJnZXQsIHByb3AsIHJlY2VpdmVyKSB7XHJcbiAgICAgICAgaWYgKHRhcmdldCBpbnN0YW5jZW9mIElEQlRyYW5zYWN0aW9uKSB7XHJcbiAgICAgICAgICAgIC8vIFNwZWNpYWwgaGFuZGxpbmcgZm9yIHRyYW5zYWN0aW9uLmRvbmUuXHJcbiAgICAgICAgICAgIGlmIChwcm9wID09PSAnZG9uZScpXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJhbnNhY3Rpb25Eb25lTWFwLmdldCh0YXJnZXQpO1xyXG4gICAgICAgICAgICAvLyBQb2x5ZmlsbCBmb3Igb2JqZWN0U3RvcmVOYW1lcyBiZWNhdXNlIG9mIEVkZ2UuXHJcbiAgICAgICAgICAgIGlmIChwcm9wID09PSAnb2JqZWN0U3RvcmVOYW1lcycpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0YXJnZXQub2JqZWN0U3RvcmVOYW1lcyB8fCB0cmFuc2FjdGlvblN0b3JlTmFtZXNNYXAuZ2V0KHRhcmdldCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gTWFrZSB0eC5zdG9yZSByZXR1cm4gdGhlIG9ubHkgc3RvcmUgaW4gdGhlIHRyYW5zYWN0aW9uLCBvciB1bmRlZmluZWQgaWYgdGhlcmUgYXJlIG1hbnkuXHJcbiAgICAgICAgICAgIGlmIChwcm9wID09PSAnc3RvcmUnKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVjZWl2ZXIub2JqZWN0U3RvcmVOYW1lc1sxXSA/XHJcbiAgICAgICAgICAgICAgICAgICAgdW5kZWZpbmVkIDogcmVjZWl2ZXIub2JqZWN0U3RvcmUocmVjZWl2ZXIub2JqZWN0U3RvcmVOYW1lc1swXSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gRWxzZSB0cmFuc2Zvcm0gd2hhdGV2ZXIgd2UgZ2V0IGJhY2suXHJcbiAgICAgICAgcmV0dXJuIHdyYXAodGFyZ2V0W3Byb3BdKTtcclxuICAgIH0sXHJcbiAgICBoYXModGFyZ2V0LCBwcm9wKSB7XHJcbiAgICAgICAgaWYgKHRhcmdldCBpbnN0YW5jZW9mIElEQlRyYW5zYWN0aW9uICYmIChwcm9wID09PSAnZG9uZScgfHwgcHJvcCA9PT0gJ3N0b3JlJykpXHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIHJldHVybiBwcm9wIGluIHRhcmdldDtcclxuICAgIH0sXHJcbn07XHJcbmZ1bmN0aW9uIGFkZFRyYXBzKGNhbGxiYWNrKSB7XHJcbiAgICBpZGJQcm94eVRyYXBzID0gY2FsbGJhY2soaWRiUHJveHlUcmFwcyk7XHJcbn1cclxuZnVuY3Rpb24gd3JhcEZ1bmN0aW9uKGZ1bmMpIHtcclxuICAgIC8vIER1ZSB0byBleHBlY3RlZCBvYmplY3QgZXF1YWxpdHkgKHdoaWNoIGlzIGVuZm9yY2VkIGJ5IHRoZSBjYWNoaW5nIGluIGB3cmFwYCksIHdlXHJcbiAgICAvLyBvbmx5IGNyZWF0ZSBvbmUgbmV3IGZ1bmMgcGVyIGZ1bmMuXHJcbiAgICAvLyBFZGdlIGRvZXNuJ3Qgc3VwcG9ydCBvYmplY3RTdG9yZU5hbWVzIChib29vKSwgc28gd2UgcG9seWZpbGwgaXQgaGVyZS5cclxuICAgIGlmIChmdW5jID09PSBJREJEYXRhYmFzZS5wcm90b3R5cGUudHJhbnNhY3Rpb24gJiZcclxuICAgICAgICAhKCdvYmplY3RTdG9yZU5hbWVzJyBpbiBJREJUcmFuc2FjdGlvbi5wcm90b3R5cGUpKSB7XHJcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChzdG9yZU5hbWVzLCAuLi5hcmdzKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHR4ID0gZnVuYy5jYWxsKHVud3JhcCh0aGlzKSwgc3RvcmVOYW1lcywgLi4uYXJncyk7XHJcbiAgICAgICAgICAgIHRyYW5zYWN0aW9uU3RvcmVOYW1lc01hcC5zZXQodHgsIHN0b3JlTmFtZXMuc29ydCA/IHN0b3JlTmFtZXMuc29ydCgpIDogW3N0b3JlTmFtZXNdKTtcclxuICAgICAgICAgICAgcmV0dXJuIHdyYXAodHgpO1xyXG4gICAgICAgIH07XHJcbiAgICB9XHJcbiAgICAvLyBDdXJzb3IgbWV0aG9kcyBhcmUgc3BlY2lhbCwgYXMgdGhlIGJlaGF2aW91ciBpcyBhIGxpdHRsZSBtb3JlIGRpZmZlcmVudCB0byBzdGFuZGFyZCBJREIuIEluXHJcbiAgICAvLyBJREIsIHlvdSBhZHZhbmNlIHRoZSBjdXJzb3IgYW5kIHdhaXQgZm9yIGEgbmV3ICdzdWNjZXNzJyBvbiB0aGUgSURCUmVxdWVzdCB0aGF0IGdhdmUgeW91IHRoZVxyXG4gICAgLy8gY3Vyc29yLiBJdCdzIGtpbmRhIGxpa2UgYSBwcm9taXNlIHRoYXQgY2FuIHJlc29sdmUgd2l0aCBtYW55IHZhbHVlcy4gVGhhdCBkb2Vzbid0IG1ha2Ugc2Vuc2VcclxuICAgIC8vIHdpdGggcmVhbCBwcm9taXNlcywgc28gZWFjaCBhZHZhbmNlIG1ldGhvZHMgcmV0dXJucyBhIG5ldyBwcm9taXNlIGZvciB0aGUgY3Vyc29yIG9iamVjdCwgb3JcclxuICAgIC8vIHVuZGVmaW5lZCBpZiB0aGUgZW5kIG9mIHRoZSBjdXJzb3IgaGFzIGJlZW4gcmVhY2hlZC5cclxuICAgIGlmIChnZXRDdXJzb3JBZHZhbmNlTWV0aG9kcygpLmluY2x1ZGVzKGZ1bmMpKSB7XHJcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICguLi5hcmdzKSB7XHJcbiAgICAgICAgICAgIC8vIENhbGxpbmcgdGhlIG9yaWdpbmFsIGZ1bmN0aW9uIHdpdGggdGhlIHByb3h5IGFzICd0aGlzJyBjYXVzZXMgSUxMRUdBTCBJTlZPQ0FUSU9OLCBzbyB3ZSB1c2VcclxuICAgICAgICAgICAgLy8gdGhlIG9yaWdpbmFsIG9iamVjdC5cclxuICAgICAgICAgICAgZnVuYy5hcHBseSh1bndyYXAodGhpcyksIGFyZ3MpO1xyXG4gICAgICAgICAgICByZXR1cm4gd3JhcChjdXJzb3JSZXF1ZXN0TWFwLmdldCh0aGlzKSk7XHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuICAgIHJldHVybiBmdW5jdGlvbiAoLi4uYXJncykge1xyXG4gICAgICAgIC8vIENhbGxpbmcgdGhlIG9yaWdpbmFsIGZ1bmN0aW9uIHdpdGggdGhlIHByb3h5IGFzICd0aGlzJyBjYXVzZXMgSUxMRUdBTCBJTlZPQ0FUSU9OLCBzbyB3ZSB1c2VcclxuICAgICAgICAvLyB0aGUgb3JpZ2luYWwgb2JqZWN0LlxyXG4gICAgICAgIHJldHVybiB3cmFwKGZ1bmMuYXBwbHkodW53cmFwKHRoaXMpLCBhcmdzKSk7XHJcbiAgICB9O1xyXG59XHJcbmZ1bmN0aW9uIHRyYW5zZm9ybUNhY2hhYmxlVmFsdWUodmFsdWUpIHtcclxuICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdmdW5jdGlvbicpXHJcbiAgICAgICAgcmV0dXJuIHdyYXBGdW5jdGlvbih2YWx1ZSk7XHJcbiAgICAvLyBUaGlzIGRvZXNuJ3QgcmV0dXJuLCBpdCBqdXN0IGNyZWF0ZXMgYSAnZG9uZScgcHJvbWlzZSBmb3IgdGhlIHRyYW5zYWN0aW9uLFxyXG4gICAgLy8gd2hpY2ggaXMgbGF0ZXIgcmV0dXJuZWQgZm9yIHRyYW5zYWN0aW9uLmRvbmUgKHNlZSBpZGJPYmplY3RIYW5kbGVyKS5cclxuICAgIGlmICh2YWx1ZSBpbnN0YW5jZW9mIElEQlRyYW5zYWN0aW9uKVxyXG4gICAgICAgIGNhY2hlRG9uZVByb21pc2VGb3JUcmFuc2FjdGlvbih2YWx1ZSk7XHJcbiAgICBpZiAoaW5zdGFuY2VPZkFueSh2YWx1ZSwgZ2V0SWRiUHJveHlhYmxlVHlwZXMoKSkpXHJcbiAgICAgICAgcmV0dXJuIG5ldyBQcm94eSh2YWx1ZSwgaWRiUHJveHlUcmFwcyk7XHJcbiAgICAvLyBSZXR1cm4gdGhlIHNhbWUgdmFsdWUgYmFjayBpZiB3ZSdyZSBub3QgZ29pbmcgdG8gdHJhbnNmb3JtIGl0LlxyXG4gICAgcmV0dXJuIHZhbHVlO1xyXG59XHJcbmZ1bmN0aW9uIHdyYXAodmFsdWUpIHtcclxuICAgIC8vIFdlIHNvbWV0aW1lcyBnZW5lcmF0ZSBtdWx0aXBsZSBwcm9taXNlcyBmcm9tIGEgc2luZ2xlIElEQlJlcXVlc3QgKGVnIHdoZW4gY3Vyc29yaW5nKSwgYmVjYXVzZVxyXG4gICAgLy8gSURCIGlzIHdlaXJkIGFuZCBhIHNpbmdsZSBJREJSZXF1ZXN0IGNhbiB5aWVsZCBtYW55IHJlc3BvbnNlcywgc28gdGhlc2UgY2FuJ3QgYmUgY2FjaGVkLlxyXG4gICAgaWYgKHZhbHVlIGluc3RhbmNlb2YgSURCUmVxdWVzdClcclxuICAgICAgICByZXR1cm4gcHJvbWlzaWZ5UmVxdWVzdCh2YWx1ZSk7XHJcbiAgICAvLyBJZiB3ZSd2ZSBhbHJlYWR5IHRyYW5zZm9ybWVkIHRoaXMgdmFsdWUgYmVmb3JlLCByZXVzZSB0aGUgdHJhbnNmb3JtZWQgdmFsdWUuXHJcbiAgICAvLyBUaGlzIGlzIGZhc3RlciwgYnV0IGl0IGFsc28gcHJvdmlkZXMgb2JqZWN0IGVxdWFsaXR5LlxyXG4gICAgaWYgKHRyYW5zZm9ybUNhY2hlLmhhcyh2YWx1ZSkpXHJcbiAgICAgICAgcmV0dXJuIHRyYW5zZm9ybUNhY2hlLmdldCh2YWx1ZSk7XHJcbiAgICBjb25zdCBuZXdWYWx1ZSA9IHRyYW5zZm9ybUNhY2hhYmxlVmFsdWUodmFsdWUpO1xyXG4gICAgLy8gTm90IGFsbCB0eXBlcyBhcmUgdHJhbnNmb3JtZWQuXHJcbiAgICAvLyBUaGVzZSBtYXkgYmUgcHJpbWl0aXZlIHR5cGVzLCBzbyB0aGV5IGNhbid0IGJlIFdlYWtNYXAga2V5cy5cclxuICAgIGlmIChuZXdWYWx1ZSAhPT0gdmFsdWUpIHtcclxuICAgICAgICB0cmFuc2Zvcm1DYWNoZS5zZXQodmFsdWUsIG5ld1ZhbHVlKTtcclxuICAgICAgICByZXZlcnNlVHJhbnNmb3JtQ2FjaGUuc2V0KG5ld1ZhbHVlLCB2YWx1ZSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbmV3VmFsdWU7XHJcbn1cclxuY29uc3QgdW53cmFwID0gKHZhbHVlKSA9PiByZXZlcnNlVHJhbnNmb3JtQ2FjaGUuZ2V0KHZhbHVlKTtcblxuZXhwb3J0IHsgd3JhcCBhcyBhLCBhZGRUcmFwcyBhcyBiLCBpbnN0YW5jZU9mQW55IGFzIGMsIHJldmVyc2VUcmFuc2Zvcm1DYWNoZSBhcyBkLCB1bndyYXAgYXMgZSB9O1xuIiwiaW1wb3J0IHsgYSBhcyB3cmFwLCBiIGFzIGFkZFRyYXBzIH0gZnJvbSAnLi9jaHVuay5qcyc7XG5leHBvcnQgeyBlIGFzIHVud3JhcCwgYSBhcyB3cmFwIH0gZnJvbSAnLi9jaHVuay5qcyc7XG5cbi8qKlxyXG4gKiBPcGVuIGEgZGF0YWJhc2UuXHJcbiAqXHJcbiAqIEBwYXJhbSBuYW1lIE5hbWUgb2YgdGhlIGRhdGFiYXNlLlxyXG4gKiBAcGFyYW0gdmVyc2lvbiBTY2hlbWEgdmVyc2lvbi5cclxuICogQHBhcmFtIGNhbGxiYWNrcyBBZGRpdGlvbmFsIGNhbGxiYWNrcy5cclxuICovXHJcbmZ1bmN0aW9uIG9wZW5EQihuYW1lLCB2ZXJzaW9uLCB7IGJsb2NrZWQsIHVwZ3JhZGUsIGJsb2NraW5nIH0gPSB7fSkge1xyXG4gICAgY29uc3QgcmVxdWVzdCA9IGluZGV4ZWREQi5vcGVuKG5hbWUsIHZlcnNpb24pO1xyXG4gICAgY29uc3Qgb3BlblByb21pc2UgPSB3cmFwKHJlcXVlc3QpO1xyXG4gICAgaWYgKHVwZ3JhZGUpIHtcclxuICAgICAgICByZXF1ZXN0LmFkZEV2ZW50TGlzdGVuZXIoJ3VwZ3JhZGVuZWVkZWQnLCAoZXZlbnQpID0+IHtcclxuICAgICAgICAgICAgdXBncmFkZSh3cmFwKHJlcXVlc3QucmVzdWx0KSwgZXZlbnQub2xkVmVyc2lvbiwgZXZlbnQubmV3VmVyc2lvbiwgd3JhcChyZXF1ZXN0LnRyYW5zYWN0aW9uKSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBpZiAoYmxvY2tlZClcclxuICAgICAgICByZXF1ZXN0LmFkZEV2ZW50TGlzdGVuZXIoJ2Jsb2NrZWQnLCAoKSA9PiBibG9ja2VkKCkpO1xyXG4gICAgaWYgKGJsb2NraW5nKVxyXG4gICAgICAgIG9wZW5Qcm9taXNlLnRoZW4oZGIgPT4gZGIuYWRkRXZlbnRMaXN0ZW5lcigndmVyc2lvbmNoYW5nZScsIGJsb2NraW5nKSk7XHJcbiAgICByZXR1cm4gb3BlblByb21pc2U7XHJcbn1cclxuLyoqXHJcbiAqIERlbGV0ZSBhIGRhdGFiYXNlLlxyXG4gKlxyXG4gKiBAcGFyYW0gbmFtZSBOYW1lIG9mIHRoZSBkYXRhYmFzZS5cclxuICovXHJcbmZ1bmN0aW9uIGRlbGV0ZURCKG5hbWUsIHsgYmxvY2tlZCB9ID0ge30pIHtcclxuICAgIGNvbnN0IHJlcXVlc3QgPSBpbmRleGVkREIuZGVsZXRlRGF0YWJhc2UobmFtZSk7XHJcbiAgICBpZiAoYmxvY2tlZClcclxuICAgICAgICByZXF1ZXN0LmFkZEV2ZW50TGlzdGVuZXIoJ2Jsb2NrZWQnLCAoKSA9PiBibG9ja2VkKCkpO1xyXG4gICAgcmV0dXJuIHdyYXAocmVxdWVzdCkudGhlbigoKSA9PiB1bmRlZmluZWQpO1xyXG59XG5cbmNvbnN0IHJlYWRNZXRob2RzID0gWydnZXQnLCAnZ2V0S2V5JywgJ2dldEFsbCcsICdnZXRBbGxLZXlzJywgJ2NvdW50J107XHJcbmNvbnN0IHdyaXRlTWV0aG9kcyA9IFsncHV0JywgJ2FkZCcsICdkZWxldGUnLCAnY2xlYXInXTtcclxuY29uc3QgY2FjaGVkTWV0aG9kcyA9IG5ldyBNYXAoKTtcclxuZnVuY3Rpb24gZ2V0TWV0aG9kKHRhcmdldCwgcHJvcCkge1xyXG4gICAgaWYgKCEodGFyZ2V0IGluc3RhbmNlb2YgSURCRGF0YWJhc2UgJiZcclxuICAgICAgICAhKHByb3AgaW4gdGFyZ2V0KSAmJlxyXG4gICAgICAgIHR5cGVvZiBwcm9wID09PSAnc3RyaW5nJykpXHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgaWYgKGNhY2hlZE1ldGhvZHMuZ2V0KHByb3ApKVxyXG4gICAgICAgIHJldHVybiBjYWNoZWRNZXRob2RzLmdldChwcm9wKTtcclxuICAgIGNvbnN0IHRhcmdldEZ1bmNOYW1lID0gcHJvcC5yZXBsYWNlKC9Gcm9tSW5kZXgkLywgJycpO1xyXG4gICAgY29uc3QgdXNlSW5kZXggPSBwcm9wICE9PSB0YXJnZXRGdW5jTmFtZTtcclxuICAgIGNvbnN0IGlzV3JpdGUgPSB3cml0ZU1ldGhvZHMuaW5jbHVkZXModGFyZ2V0RnVuY05hbWUpO1xyXG4gICAgaWYgKFxyXG4gICAgLy8gQmFpbCBpZiB0aGUgdGFyZ2V0IGRvZXNuJ3QgZXhpc3Qgb24gdGhlIHRhcmdldC4gRWcsIGdldEFsbCBpc24ndCBpbiBFZGdlLlxyXG4gICAgISh0YXJnZXRGdW5jTmFtZSBpbiAodXNlSW5kZXggPyBJREJJbmRleCA6IElEQk9iamVjdFN0b3JlKS5wcm90b3R5cGUpIHx8XHJcbiAgICAgICAgIShpc1dyaXRlIHx8IHJlYWRNZXRob2RzLmluY2x1ZGVzKHRhcmdldEZ1bmNOYW1lKSkpXHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgY29uc3QgbWV0aG9kID0gYXN5bmMgZnVuY3Rpb24gKHN0b3JlTmFtZSwgLi4uYXJncykge1xyXG4gICAgICAgIGNvbnN0IHR4ID0gdGhpcy50cmFuc2FjdGlvbihzdG9yZU5hbWUsIGlzV3JpdGUgPyAncmVhZHdyaXRlJyA6ICdyZWFkb25seScpO1xyXG4gICAgICAgIGxldCB0YXJnZXQgPSB0eC5zdG9yZTtcclxuICAgICAgICBpZiAodXNlSW5kZXgpXHJcbiAgICAgICAgICAgIHRhcmdldCA9IHRhcmdldC5pbmRleChhcmdzLnNoaWZ0KCkpO1xyXG4gICAgICAgIGNvbnN0IHJldHVyblZhbCA9IHRhcmdldFt0YXJnZXRGdW5jTmFtZV0oLi4uYXJncyk7XHJcbiAgICAgICAgaWYgKGlzV3JpdGUpXHJcbiAgICAgICAgICAgIGF3YWl0IHR4LmRvbmU7XHJcbiAgICAgICAgcmV0dXJuIHJldHVyblZhbDtcclxuICAgIH07XHJcbiAgICBjYWNoZWRNZXRob2RzLnNldChwcm9wLCBtZXRob2QpO1xyXG4gICAgcmV0dXJuIG1ldGhvZDtcclxufVxyXG5hZGRUcmFwcyhvbGRUcmFwcyA9PiAoe1xyXG4gICAgZ2V0OiAodGFyZ2V0LCBwcm9wLCByZWNlaXZlcikgPT4gZ2V0TWV0aG9kKHRhcmdldCwgcHJvcCkgfHwgb2xkVHJhcHMuZ2V0KHRhcmdldCwgcHJvcCwgcmVjZWl2ZXIpLFxyXG4gICAgaGFzOiAodGFyZ2V0LCBwcm9wKSA9PiAhIWdldE1ldGhvZCh0YXJnZXQsIHByb3ApIHx8IG9sZFRyYXBzLmhhcyh0YXJnZXQsIHByb3ApLFxyXG59KSk7XG5cbmV4cG9ydCB7IG9wZW5EQiwgZGVsZXRlREIgfTtcbiIsImV4cG9ydCAqIGZyb20gJy4vYnVpbGQvZXNtL2luZGV4LmpzJztcbmltcG9ydCAnLi9idWlsZC9lc20vYXN5bmMtaXRlcmF0b3JzLmpzJztcbiIsImV4cG9ydCBlbnVtIFNlcml2ZVdvcmtlckV2ZW50cyB7XHJcbiAgICBpc0xvZ2dlZCA9ICdpc0xvZ2dlZCcsXHJcbiAgICBpc0FjY291bnRDcmVhdGVkID0gJ2lzQWNjb3VudENyZWF0ZWQnLFxyXG4gICAgY2hlY2tMb2dpbiA9ICdjaGVja0xvZ2luJyxcclxuICAgIGNoZWNrUGFzc3dvcmQgPSAnY2hlY2tQYXNzd29yZCcsXHJcbiAgICBjcmVhdGVBY2NvdW50ID0gJ2NyZWF0ZUFjY291bnQnLFxyXG4gICAgbG9naW4gPSAnbG9naW4nLFxyXG59XHJcbiIsImltcG9ydCB7IERCU2V0dGluZ3MgfSBmcm9tICcuLi9pbnRlcmZhY2VzJztcclxuXHJcbmV4cG9ydCBjb25zdCBDSEFOTkVMX05BTUU6IHN0cmluZyA9ICdzdy1tZXNzYWdlcyc7XHJcblxyXG5leHBvcnQgY29uc3QgTE9HSU5fU1RPUkVfTkFNRTogJ2xvZ2luLXN0b3JlJyA9ICdsb2dpbi1zdG9yZSc7XHJcbmV4cG9ydCBjb25zdCBJU19MT0dHRURfU1RPUkVfTkFNRTogJ2xvZ2dlZC1zdG9yZScgPSAnbG9nZ2VkLXN0b3JlJztcclxuXHJcbmV4cG9ydCBjb25zdCBMT0dJTl9EQl9TRVRUSU5HUzogREJTZXR0aW5ncyA9IHtcclxuICAgIG5hbWU6ICdsb2dpbicsXHJcbiAgICB2ZXJzaW9uOiA0LFxyXG59XHJcblxyXG5cclxuZXhwb3J0IGVudW0gaXNMb2dnZWREQktleXMge1xyXG4gICAgaXNMb2dnZWQgPSAnaXNMb2dnZWQnLFxyXG4gICAgYWNjb3VudCA9ICdhY2NvdW50JyxcclxufVxyXG4iLCJpbXBvcnQgeyBMT0dJTl9TVE9SRV9OQU1FLCBpc0xvZ2dlZERCS2V5cyB9IGZyb20gJy4uL2NvbnN0YW50cyc7XHJcbmltcG9ydCB7IEFjY291bnQgfSBmcm9tICcuLi9pbnRlcmZhY2VzJztcclxuaW1wb3J0IHsgU2VyaXZlV29ya2VyRXZlbnRzIH0gZnJvbSAnLi4vY29uc3RhbnRzL2V2ZW50cy10eXBlJztcclxuXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBjaGVja0xvZ2luKGNoYW5uZWw6IEJyb2FkY2FzdENoYW5uZWwsIGRiLCBsb2dpbjogc3RyaW5nKSB7XHJcbiAgICBjb25zdCBhY2NvdW50OiBBY2NvdW50ID0gYXdhaXQgZGIuZ2V0KExPR0lOX1NUT1JFX05BTUUsIGlzTG9nZ2VkREJLZXlzLmFjY291bnQpO1xyXG4gICAgY29uc3QgX2lzTG9naW5WYWxpZDogYm9vbGVhbiA9IGxvZ2luID09PSBhY2NvdW50LmxvZ2luO1xyXG5cclxuICAgIGNoYW5uZWwucG9zdE1lc3NhZ2UoeyB0eXBlOiBTZXJpdmVXb3JrZXJFdmVudHMuY2hlY2tMb2dpbiwgZGF0YTogX2lzTG9naW5WYWxpZCB9KTtcclxufVxyXG4iLCJpbXBvcnQgeyBMT0dJTl9TVE9SRV9OQU1FLCBpc0xvZ2dlZERCS2V5cyB9IGZyb20gJy4uL2NvbnN0YW50cyc7XHJcbmltcG9ydCB7IEFjY291bnQgfSBmcm9tICcuLi9pbnRlcmZhY2VzJztcclxuaW1wb3J0IHsgU2VyaXZlV29ya2VyRXZlbnRzIH0gZnJvbSAnLi4vY29uc3RhbnRzL2V2ZW50cy10eXBlJztcclxuaW1wb3J0IHsgZ2VuZXJhdGVIYXNoIH0gZnJvbSAnLi4vdXRpbHMvY3J5cHRvJztcclxuXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBjaGVja1Bhc3N3b3JkKGNoYW5uZWw6IEJyb2FkY2FzdENoYW5uZWwsIGRiLCBwYXNzd29yZDogc3RyaW5nKSB7XHJcbiAgICBjb25zdCBhY2NvdW50OiBBY2NvdW50ID0gYXdhaXQgZGIuZ2V0KExPR0lOX1NUT1JFX05BTUUsIGlzTG9nZ2VkREJLZXlzLmFjY291bnQpO1xyXG4gICAgY29uc3QgcGFzc3dvcmRIYXNoOiBzdHJpbmcgPSBnZW5lcmF0ZUhhc2gocGFzc3dvcmQgKyBhY2NvdW50LnNhbHQpO1xyXG4gICAgY29uc3QgX2lzUGFzc3dvcmRWYWxpZDogYm9vbGVhbiA9IHBhc3N3b3JkSGFzaCA9PT0gYWNjb3VudC5wYXNzd29yZDtcclxuXHJcbiAgICBjaGFubmVsLnBvc3RNZXNzYWdlKHsgdHlwZTogU2VyaXZlV29ya2VyRXZlbnRzLmNoZWNrUGFzc3dvcmQsIGRhdGE6IF9pc1Bhc3N3b3JkVmFsaWQgfSk7XHJcbn1cclxuIiwiaW1wb3J0IHsgTE9HSU5fU1RPUkVfTkFNRSwgaXNMb2dnZWREQktleXMgfSBmcm9tICcuLi9jb25zdGFudHMnO1xyXG5pbXBvcnQgeyBBY2NvdW50IH0gZnJvbSAnLi4vaW50ZXJmYWNlcyc7XHJcbmltcG9ydCB7IEFjY291bnQgYXMgQXV0aEFjY291bnQgfSBmcm9tICdzcmMvYW5ndWxhci9hcHAvbW9kdWxlcy9hdXRob3JpemF0aW9uL2ludGVmcmFjZXMnO1xyXG5pbXBvcnQgeyBTZXJpdmVXb3JrZXJFdmVudHMgfSBmcm9tICcuLi9jb25zdGFudHMvZXZlbnRzLXR5cGUnO1xyXG5pbXBvcnQgeyBnZW5lcmF0ZVNhbHQsIGdlbmVyYXRlSGFzaCB9IGZyb20gJy4uL3V0aWxzL2NyeXB0byc7XHJcblxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gY3JlYXRlQWNjb3VudChjaGFubmVsOiBCcm9hZGNhc3RDaGFubmVsLCBkYiwgYWNjb3VudDogQXV0aEFjY291bnQpIHtcclxuICAgIGNvbnN0IHNhbHQ6IHN0cmluZyA9IGdlbmVyYXRlU2FsdCgpO1xyXG4gICAgY29uc3QgcGFzc3dvcmRIYXNoOiBzdHJpbmcgPSBnZW5lcmF0ZUhhc2goYWNjb3VudC5wYXNzd29yZCArIHNhbHQpO1xyXG4gICAgY29uc3QgZGF0ZTogbnVtYmVyID0gRGF0ZS5ub3coKTtcclxuXHJcbiAgICBjb25zdCBuZXdBY2NvdW50OiBBY2NvdW50ID0ge1xyXG4gICAgICAgIHNhbHQsXHJcbiAgICAgICAgbG9naW46IGFjY291bnQubG9naW4sXHJcbiAgICAgICAgcGFzc3dvcmQ6IHBhc3N3b3JkSGFzaCxcclxuICAgICAgICBjcmVhdGlvblRpbWU6IGRhdGUsXHJcbiAgICAgICAgbGFzdFVwZGF0ZVRpbWU6IGRhdGUsXHJcbiAgICB9O1xyXG5cclxuICAgIGF3YWl0IGRiLnB1dChMT0dJTl9TVE9SRV9OQU1FLCBuZXdBY2NvdW50LCBpc0xvZ2dlZERCS2V5cy5hY2NvdW50KTtcclxuXHJcbiAgICBjaGFubmVsLnBvc3RNZXNzYWdlKHsgdHlwZTogU2VyaXZlV29ya2VyRXZlbnRzLmNyZWF0ZUFjY291bnQsIGRhdGE6IHRydWUgfSk7XHJcbn1cclxuIiwiZXhwb3J0IHsgaXNMb2dnZWQgfSBmcm9tICcuL2lzTG9nZ2VkJztcclxuZXhwb3J0IHsgaXNBY2NvdW50Q3JlYXRlZCB9IGZyb20gJy4vaXNBY2NvdW50Q3JlYXRlZCc7XHJcbmV4cG9ydCB7IGNoZWNrTG9naW4gfSBmcm9tICcuL2NoZWNrTG9naW4nO1xyXG5leHBvcnQgeyBjaGVja1Bhc3N3b3JkIH0gZnJvbSAnLi9jaGVja1Bhc3N3b3JkJztcclxuZXhwb3J0IHsgY3JlYXRlQWNjb3VudCB9IGZyb20gJy4vY3JlYXRlQWNjb3VudCc7XHJcbmV4cG9ydCB7IGxvZ2luIH0gZnJvbSAnLi9sb2dpbic7XHJcbiIsImltcG9ydCB7IExPR0lOX1NUT1JFX05BTUUsIGlzTG9nZ2VkREJLZXlzIH0gZnJvbSAnLi4vY29uc3RhbnRzJztcclxuaW1wb3J0IHsgU2VyaXZlV29ya2VyRXZlbnRzIH0gZnJvbSAnLi4vY29uc3RhbnRzL2V2ZW50cy10eXBlJztcclxuXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBpc0FjY291bnRDcmVhdGVkKGNoYW5uZWw6IEJyb2FkY2FzdENoYW5uZWwsIGRiKSB7XHJcbiAgICBjb25zdCBjb3VudCA9IGF3YWl0IGRiLmNvdW50KExPR0lOX1NUT1JFX05BTUUsIGlzTG9nZ2VkREJLZXlzLmFjY291bnQpO1xyXG4gICAgY29uc3QgX2lzQWNjb3VudENyZWF0ZWQ6IGJvb2xlYW4gPSBCb29sZWFuKGNvdW50KTtcclxuXHJcbiAgICBjaGFubmVsLnBvc3RNZXNzYWdlKHsgdHlwZTogU2VyaXZlV29ya2VyRXZlbnRzLmlzQWNjb3VudENyZWF0ZWQsIGRhdGE6IF9pc0FjY291bnRDcmVhdGVkIH0pO1xyXG59XHJcblxyXG4iLCJpbXBvcnQgeyBJU19MT0dHRURfU1RPUkVfTkFNRSwgaXNMb2dnZWREQktleXMgfSBmcm9tICcuLi9jb25zdGFudHMnO1xyXG5pbXBvcnQgeyBTZXJpdmVXb3JrZXJFdmVudHMgfSBmcm9tICcuLi9jb25zdGFudHMvZXZlbnRzLXR5cGUnO1xyXG5cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGlzTG9nZ2VkKGNoYW5uZWw6IEJyb2FkY2FzdENoYW5uZWwsIGRiKSB7XHJcbiAgICBjb25zdCBfaXNMb2dnZWQ6IGJvb2xlYW4gPSBhd2FpdCBkYi5nZXQoSVNfTE9HR0VEX1NUT1JFX05BTUUsIGlzTG9nZ2VkREJLZXlzLmlzTG9nZ2VkKTtcclxuXHJcbiAgICBjaGFubmVsLnBvc3RNZXNzYWdlKHsgdHlwZTogU2VyaXZlV29ya2VyRXZlbnRzLmlzTG9nZ2VkLCBkYXRhOiBfaXNMb2dnZWQgfSk7XHJcbn1cclxuIiwiaW1wb3J0IHsgSVNfTE9HR0VEX1NUT1JFX05BTUUsIGlzTG9nZ2VkREJLZXlzIH0gZnJvbSAnLi4vY29uc3RhbnRzJztcclxuaW1wb3J0IHsgU2VyaXZlV29ya2VyRXZlbnRzIH0gZnJvbSAnLi4vY29uc3RhbnRzL2V2ZW50cy10eXBlJztcclxuXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBsb2dpbihjaGFubmVsOiBCcm9hZGNhc3RDaGFubmVsLCBkYikge1xyXG4gICAgYXdhaXQgZGIucHV0KElTX0xPR0dFRF9TVE9SRV9OQU1FLCB0cnVlLCBpc0xvZ2dlZERCS2V5cy5pc0xvZ2dlZCk7XHJcblxyXG4gICAgY2hhbm5lbC5wb3N0TWVzc2FnZSh7IHR5cGU6IFNlcml2ZVdvcmtlckV2ZW50cy5sb2dpbiwgZGF0YTogdHJ1ZSB9KTtcclxufVxyXG4iLCJpbXBvcnQgeyBvcGVuREIgfSBmcm9tICdpZGIvd2l0aC1hc3luYy1pdHRyLmpzJztcclxuXHJcbmltcG9ydCB7IFxyXG4gICAgQ0hBTk5FTF9OQU1FLFxyXG4gICAgTE9HSU5fU1RPUkVfTkFNRSxcclxuICAgIElTX0xPR0dFRF9TVE9SRV9OQU1FLFxyXG4gICAgTE9HSU5fREJfU0VUVElOR1MsXHJcbiAgICBpc0xvZ2dlZERCS2V5cyxcclxufSBmcm9tICcuL2NvbnN0YW50cyc7XHJcbmltcG9ydCB7IFNlcml2ZVdvcmtlckV2ZW50cyB9IGZyb20gJy4vY29uc3RhbnRzL2V2ZW50cy10eXBlJztcclxuaW1wb3J0IHsgTXlEQiB9IGZyb20gJy4vaW50ZXJmYWNlcyc7XHJcbmltcG9ydCB7IGlzTG9nZ2VkLCBpc0FjY291bnRDcmVhdGVkLCBjaGVja0xvZ2luLCBjaGVja1Bhc3N3b3JkLCBjcmVhdGVBY2NvdW50LCBsb2dpbiB9IGZyb20gJy4vZXZlbnRzJztcclxuXHJcbmNvbnN0IHdvcmtlcjogYW55ID0gc2VsZjtcclxubGV0IGxvZ2luRGIgPSBudWxsO1xyXG5cclxuZnVuY3Rpb24gdXBncmFkZURCKHVwZ3JhZGVEQik6IHZvaWQge1xyXG4gICAgY29uc3QgYWNjb3VudFN0b3JlID0gdXBncmFkZURCLmNyZWF0ZU9iamVjdFN0b3JlKExPR0lOX1NUT1JFX05BTUUpO1xyXG4gICAgY29uc3Qgc3RvcmUgPSB1cGdyYWRlREIuY3JlYXRlT2JqZWN0U3RvcmUoSVNfTE9HR0VEX1NUT1JFX05BTUUpO1xyXG5cclxuICAgIHN0b3JlLnB1dChmYWxzZSwgaXNMb2dnZWREQktleXMuaXNMb2dnZWQpO1xyXG59XHJcblxyXG5hc3luYyBmdW5jdGlvbiBjcmVhdGVEQigpIHtcclxuICAgIGxvZ2luRGIgPSBhd2FpdCBvcGVuREI8TXlEQj4oXHJcbiAgICAgICAgTE9HSU5fREJfU0VUVElOR1MubmFtZSxcclxuICAgICAgICBMT0dJTl9EQl9TRVRUSU5HUy52ZXJzaW9uLFxyXG4gICAgICAgIHsgdXBncmFkZTogdXBncmFkZURCIH1cclxuICAgICk7XHJcblxyXG4gICAgYXdhaXQgbG9naW5EYi5wdXQoSVNfTE9HR0VEX1NUT1JFX05BTUUsIGZhbHNlLCBpc0xvZ2dlZERCS2V5cy5pc0xvZ2dlZCk7XHJcblxyXG4gICAgcmV0dXJuIG51bGw7XHJcbn1cclxuXHJcbmFzeW5jIGZ1bmN0aW9uIGNyZWF0ZUNoYW5uZWwoKSB7XHJcbiAgICBjb25zdCBjaGFubmVsOiBCcm9hZGNhc3RDaGFubmVsID0gbmV3IEJyb2FkY2FzdENoYW5uZWwoQ0hBTk5FTF9OQU1FKTtcclxuXHJcbiAgICBjaGFubmVsLmFkZEV2ZW50TGlzdGVuZXIoJ21lc3NhZ2UnLCAoeyBkYXRhOiB7IHR5cGUsIGRhdGEgfSB9KSA9PiB7XHJcbiAgICAgICAgc3dpdGNoICh0eXBlKSB7XHJcbiAgICAgICAgICAgIGNhc2UgU2VyaXZlV29ya2VyRXZlbnRzLmlzTG9nZ2VkOiBpc0xvZ2dlZChjaGFubmVsLCBsb2dpbkRiKTsgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgU2VyaXZlV29ya2VyRXZlbnRzLmlzQWNjb3VudENyZWF0ZWQ6IGlzQWNjb3VudENyZWF0ZWQoY2hhbm5lbCwgbG9naW5EYik7IGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFNlcml2ZVdvcmtlckV2ZW50cy5jaGVja0xvZ2luOiBjaGVja0xvZ2luKGNoYW5uZWwsIGxvZ2luRGIsIGRhdGEpOyBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBTZXJpdmVXb3JrZXJFdmVudHMuY2hlY2tQYXNzd29yZDogY2hlY2tQYXNzd29yZChjaGFubmVsLCBsb2dpbkRiLCBkYXRhKTsgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgU2VyaXZlV29ya2VyRXZlbnRzLmNyZWF0ZUFjY291bnQ6IGNyZWF0ZUFjY291bnQoY2hhbm5lbCwgbG9naW5EYiwgZGF0YSk7IGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFNlcml2ZVdvcmtlckV2ZW50cy5sb2dpbjogbG9naW4oY2hhbm5lbCwgbG9naW5EYik7IGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIHJldHVybiBudWxsO1xyXG59XHJcblxyXG5zZWxmLmFkZEV2ZW50TGlzdGVuZXIoJ2luc3RhbGwnLCBmdW5jdGlvbihldmVudDogYW55KSB7XHJcbiAgICBldmVudC53YWl0VW50aWwod29ya2VyLnNraXBXYWl0aW5nKCkpO1xyXG59KTtcclxuXHJcbnNlbGYuYWRkRXZlbnRMaXN0ZW5lcignYWN0aXZhdGUnLCBmdW5jdGlvbihldmVudDogYW55KSB7XHJcbiAgICBldmVudC53YWl0VW50aWwoUHJvbWlzZS5hbGwoW1xyXG4gICAgICAgIGNyZWF0ZURCKCksIFxyXG4gICAgICAgIGNyZWF0ZUNoYW5uZWwoKSxcclxuICAgIF0pLFxyXG4gICAgd29ya2VyLmNsaWVudHMuY2xhaW0oKSxcclxuICAgICk7XHJcbn0pO1xyXG4iLCJjb25zdCB3b3JrZXI6IGFueSA9IHNlbGY7XHJcbmNvbnN0IGNyeXB0byA9IHdvcmtlci5yZXF1aXJlKCdjcnlwdG8nKTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBnZW5lcmF0ZVNhbHQoKTogc3RyaW5nIHtcclxuICAgIHJldHVybiBjcnlwdG8ucmFuZG9tQnl0ZXMoMTYpLnRvU3RyaW5nKCdoZXgnKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGdlbmVyYXRlSGFzaChzOiBzdHJpbmcpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIGNyeXB0by5jcmVhdGVIYXNoKCdzaGEyNTYnKS51cGRhdGUocykuZGlnZXN0KCdoZXgnKTtcclxufVxyXG4iXSwic291cmNlUm9vdCI6IiJ9