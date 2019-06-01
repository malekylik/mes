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
    SeriveWorkerEvents["init"] = "init";
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




var loginDb = null;
function init() {
    return __awaiter(this, void 0, void 0, function () {
        var channel, _1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, createChannel()];
                case 1:
                    channel = _a.sent();
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 4, , 5]);
                    return [4 /*yield*/, createDB()];
                case 3:
                    _a.sent();
                    channel.postMessage({ type: _constants_events_type__WEBPACK_IMPORTED_MODULE_2__["SeriveWorkerEvents"].init, isInit: true });
                    console.log('worker work');
                    return [3 /*break*/, 5];
                case 4:
                    _1 = _a.sent();
                    channel.postMessage({ type: _constants_events_type__WEBPACK_IMPORTED_MODULE_2__["SeriveWorkerEvents"].init, isInit: false });
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    });
}
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
            return [2 /*return*/, channel];
        });
    });
}
init();


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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2lkYi9idWlsZC9lc20vYXN5bmMtaXRlcmF0b3JzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9pZGIvYnVpbGQvZXNtL2NodW5rLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9pZGIvYnVpbGQvZXNtL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9pZGIvd2l0aC1hc3luYy1pdHRyLmpzIiwid2VicGFjazovLy8uL3NyYy9hbmd1bGFyL3NlcnZpY2Utd29ya2VyL2NvbnN0YW50cy9ldmVudHMtdHlwZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvYW5ndWxhci9zZXJ2aWNlLXdvcmtlci9jb25zdGFudHMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FuZ3VsYXIvc2VydmljZS13b3JrZXIvZXZlbnRzL2NoZWNrTG9naW4udHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FuZ3VsYXIvc2VydmljZS13b3JrZXIvZXZlbnRzL2NoZWNrUGFzc3dvcmQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FuZ3VsYXIvc2VydmljZS13b3JrZXIvZXZlbnRzL2NyZWF0ZUFjY291bnQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FuZ3VsYXIvc2VydmljZS13b3JrZXIvZXZlbnRzL2luZGV4LnRzIiwid2VicGFjazovLy8uL3NyYy9hbmd1bGFyL3NlcnZpY2Utd29ya2VyL2V2ZW50cy9pc0FjY291bnRDcmVhdGVkLnRzIiwid2VicGFjazovLy8uL3NyYy9hbmd1bGFyL3NlcnZpY2Utd29ya2VyL2V2ZW50cy9pc0xvZ2dlZC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvYW5ndWxhci9zZXJ2aWNlLXdvcmtlci9ldmVudHMvbG9naW4udHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FuZ3VsYXIvc2VydmljZS13b3JrZXIvc2VydmljZS13b3JrZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FuZ3VsYXIvc2VydmljZS13b3JrZXIvdXRpbHMvY3J5cHRvLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGtEQUEwQyxnQ0FBZ0M7QUFDMUU7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxnRUFBd0Qsa0JBQWtCO0FBQzFFO0FBQ0EseURBQWlELGNBQWM7QUFDL0Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlEQUF5QyxpQ0FBaUM7QUFDMUUsd0hBQWdILG1CQUFtQixFQUFFO0FBQ3JJO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7OztBQUdBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNsRkE7QUFBQTtBQUF3Rzs7QUFFeEc7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSSwyQ0FBcUIsb0JBQW9CLG1EQUFNO0FBQ25EO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVEsbURBQWE7QUFDckIsUUFBUSxtREFBYTtBQUNyQjtBQUNBLG1EQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUs7QUFDTCxDQUFDOzs7Ozs7Ozs7Ozs7O0FDckREO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtB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QVEsQ0FBQyxDQUFDO0FBRWpDLFNBQVMsWUFBWTtJQUN4QixPQUFPLE1BQU0sQ0FBQyxXQUFXLENBQUMsRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQ2xELENBQUM7QUFFTSxTQUFTLFlBQVksQ0FBQyxDQUFTO0lBQ2xDLE9BQU8sTUFBTSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQy9ELENBQUMiLCJmaWxlIjoic2VydmljZS13b3JrZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9hbmd1bGFyL3NlcnZpY2Utd29ya2VyL3NlcnZpY2Utd29ya2VyLnRzXCIpO1xuIiwiaW1wb3J0IHsgYiBhcyBhZGRUcmFwcywgYyBhcyBpbnN0YW5jZU9mQW55LCBkIGFzIHJldmVyc2VUcmFuc2Zvcm1DYWNoZSwgZSBhcyB1bndyYXAgfSBmcm9tICcuL2NodW5rLmpzJztcblxuY29uc3QgYWR2YW5jZU1ldGhvZFByb3BzID0gWydjb250aW51ZScsICdjb250aW51ZVByaW1hcnlLZXknLCAnYWR2YW5jZSddO1xyXG5jb25zdCBtZXRob2RNYXAgPSB7fTtcclxuY29uc3QgYWR2YW5jZVJlc3VsdHMgPSBuZXcgV2Vha01hcCgpO1xyXG5jb25zdCBpdHRyUHJveGllZEN1cnNvclRvT3JpZ2luYWxQcm94eSA9IG5ldyBXZWFrTWFwKCk7XHJcbmNvbnN0IGN1cnNvckl0ZXJhdG9yVHJhcHMgPSB7XHJcbiAgICBnZXQodGFyZ2V0LCBwcm9wKSB7XHJcbiAgICAgICAgaWYgKCFhZHZhbmNlTWV0aG9kUHJvcHMuaW5jbHVkZXMocHJvcCkpXHJcbiAgICAgICAgICAgIHJldHVybiB0YXJnZXRbcHJvcF07XHJcbiAgICAgICAgbGV0IGNhY2hlZEZ1bmMgPSBtZXRob2RNYXBbcHJvcF07XHJcbiAgICAgICAgaWYgKCFjYWNoZWRGdW5jKSB7XHJcbiAgICAgICAgICAgIGNhY2hlZEZ1bmMgPSBtZXRob2RNYXBbcHJvcF0gPSBmdW5jdGlvbiAoLi4uYXJncykge1xyXG4gICAgICAgICAgICAgICAgYWR2YW5jZVJlc3VsdHMuc2V0KHRoaXMsIGl0dHJQcm94aWVkQ3Vyc29yVG9PcmlnaW5hbFByb3h5LmdldCh0aGlzKVtwcm9wXSguLi5hcmdzKSk7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBjYWNoZWRGdW5jO1xyXG4gICAgfSxcclxufTtcclxuYXN5bmMgZnVuY3Rpb24qIGl0ZXJhdGUoLi4uYXJncykge1xyXG4gICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLXRoaXMtYXNzaWdubWVudFxyXG4gICAgbGV0IGN1cnNvciA9IHRoaXM7XHJcbiAgICBpZiAoIShjdXJzb3IgaW5zdGFuY2VvZiBJREJDdXJzb3IpKSB7XHJcbiAgICAgICAgY3Vyc29yID0gYXdhaXQgY3Vyc29yLm9wZW5DdXJzb3IoLi4uYXJncyk7XHJcbiAgICB9XHJcbiAgICBpZiAoIWN1cnNvcilcclxuICAgICAgICByZXR1cm47XHJcbiAgICBjdXJzb3IgPSBjdXJzb3I7XHJcbiAgICBjb25zdCBwcm94aWVkQ3Vyc29yID0gbmV3IFByb3h5KGN1cnNvciwgY3Vyc29ySXRlcmF0b3JUcmFwcyk7XHJcbiAgICBpdHRyUHJveGllZEN1cnNvclRvT3JpZ2luYWxQcm94eS5zZXQocHJveGllZEN1cnNvciwgY3Vyc29yKTtcclxuICAgIC8vIE1hcCB0aGlzIGRvdWJsZS1wcm94eSBiYWNrIHRvIHRoZSBvcmlnaW5hbCwgc28gb3RoZXIgY3Vyc29yIG1ldGhvZHMgd29yay5cclxuICAgIHJldmVyc2VUcmFuc2Zvcm1DYWNoZS5zZXQocHJveGllZEN1cnNvciwgdW53cmFwKGN1cnNvcikpO1xyXG4gICAgd2hpbGUgKGN1cnNvcikge1xyXG4gICAgICAgIHlpZWxkIHByb3hpZWRDdXJzb3I7XHJcbiAgICAgICAgLy8gSWYgb25lIG9mIHRoZSBhZHZhbmNpbmcgbWV0aG9kcyB3YXMgbm90IGNhbGxlZCwgY2FsbCBjb250aW51ZSgpLlxyXG4gICAgICAgIGN1cnNvciA9IGF3YWl0IChhZHZhbmNlUmVzdWx0cy5nZXQocHJveGllZEN1cnNvcikgfHwgY3Vyc29yLmNvbnRpbnVlKCkpO1xyXG4gICAgICAgIGFkdmFuY2VSZXN1bHRzLmRlbGV0ZShwcm94aWVkQ3Vyc29yKTtcclxuICAgIH1cclxufVxyXG5mdW5jdGlvbiBpc0l0ZXJhdG9yUHJvcCh0YXJnZXQsIHByb3ApIHtcclxuICAgIHJldHVybiAocHJvcCA9PT0gU3ltYm9sLmFzeW5jSXRlcmF0b3IgJiZcclxuICAgICAgICBpbnN0YW5jZU9mQW55KHRhcmdldCwgW0lEQkluZGV4LCBJREJPYmplY3RTdG9yZSwgSURCQ3Vyc29yXSkpIHx8IChwcm9wID09PSAnaXRlcmF0ZScgJiZcclxuICAgICAgICBpbnN0YW5jZU9mQW55KHRhcmdldCwgW0lEQkluZGV4LCBJREJPYmplY3RTdG9yZV0pKTtcclxufVxyXG5hZGRUcmFwcyhvbGRUcmFwcyA9PiAoe1xyXG4gICAgZ2V0KHRhcmdldCwgcHJvcCwgcmVjZWl2ZXIpIHtcclxuICAgICAgICBpZiAoaXNJdGVyYXRvclByb3AodGFyZ2V0LCBwcm9wKSlcclxuICAgICAgICAgICAgcmV0dXJuIGl0ZXJhdGU7XHJcbiAgICAgICAgcmV0dXJuIG9sZFRyYXBzLmdldCh0YXJnZXQsIHByb3AsIHJlY2VpdmVyKTtcclxuICAgIH0sXHJcbiAgICBoYXModGFyZ2V0LCBwcm9wKSB7XHJcbiAgICAgICAgcmV0dXJuIGlzSXRlcmF0b3JQcm9wKHRhcmdldCwgcHJvcCkgfHwgb2xkVHJhcHMuaGFzKHRhcmdldCwgcHJvcCk7XHJcbiAgICB9LFxyXG59KSk7XG4iLCJjb25zdCBpbnN0YW5jZU9mQW55ID0gKG9iamVjdCwgY29uc3RydWN0b3JzKSA9PiBjb25zdHJ1Y3RvcnMuc29tZShjID0+IG9iamVjdCBpbnN0YW5jZW9mIGMpO1xuXG5sZXQgaWRiUHJveHlhYmxlVHlwZXM7XHJcbmxldCBjdXJzb3JBZHZhbmNlTWV0aG9kcztcclxuLy8gVGhpcyBpcyBhIGZ1bmN0aW9uIHRvIHByZXZlbnQgaXQgdGhyb3dpbmcgdXAgaW4gbm9kZSBlbnZpcm9ubWVudHMuXHJcbmZ1bmN0aW9uIGdldElkYlByb3h5YWJsZVR5cGVzKCkge1xyXG4gICAgcmV0dXJuIGlkYlByb3h5YWJsZVR5cGVzIHx8XHJcbiAgICAgICAgKGlkYlByb3h5YWJsZVR5cGVzID0gW0lEQkRhdGFiYXNlLCBJREJPYmplY3RTdG9yZSwgSURCSW5kZXgsIElEQkN1cnNvciwgSURCVHJhbnNhY3Rpb25dKTtcclxufVxyXG4vLyBUaGlzIGlzIGEgZnVuY3Rpb24gdG8gcHJldmVudCBpdCB0aHJvd2luZyB1cCBpbiBub2RlIGVudmlyb25tZW50cy5cclxuZnVuY3Rpb24gZ2V0Q3Vyc29yQWR2YW5jZU1ldGhvZHMoKSB7XHJcbiAgICByZXR1cm4gY3Vyc29yQWR2YW5jZU1ldGhvZHMgfHwgKGN1cnNvckFkdmFuY2VNZXRob2RzID0gW1xyXG4gICAgICAgIElEQkN1cnNvci5wcm90b3R5cGUuYWR2YW5jZSxcclxuICAgICAgICBJREJDdXJzb3IucHJvdG90eXBlLmNvbnRpbnVlLFxyXG4gICAgICAgIElEQkN1cnNvci5wcm90b3R5cGUuY29udGludWVQcmltYXJ5S2V5LFxyXG4gICAgXSk7XHJcbn1cclxuY29uc3QgY3Vyc29yUmVxdWVzdE1hcCA9IG5ldyBXZWFrTWFwKCk7XHJcbmNvbnN0IHRyYW5zYWN0aW9uRG9uZU1hcCA9IG5ldyBXZWFrTWFwKCk7XHJcbmNvbnN0IHRyYW5zYWN0aW9uU3RvcmVOYW1lc01hcCA9IG5ldyBXZWFrTWFwKCk7XHJcbmNvbnN0IHRyYW5zZm9ybUNhY2hlID0gbmV3IFdlYWtNYXAoKTtcclxuY29uc3QgcmV2ZXJzZVRyYW5zZm9ybUNhY2hlID0gbmV3IFdlYWtNYXAoKTtcclxuZnVuY3Rpb24gcHJvbWlzaWZ5UmVxdWVzdChyZXF1ZXN0KSB7XHJcbiAgICBjb25zdCBwcm9taXNlID0gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IHVubGlzdGVuID0gKCkgPT4ge1xyXG4gICAgICAgICAgICByZXF1ZXN0LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3N1Y2Nlc3MnLCBzdWNjZXNzKTtcclxuICAgICAgICAgICAgcmVxdWVzdC5yZW1vdmVFdmVudExpc3RlbmVyKCdlcnJvcicsIGVycm9yKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIGNvbnN0IHN1Y2Nlc3MgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgIHJlc29sdmUod3JhcChyZXF1ZXN0LnJlc3VsdCkpO1xyXG4gICAgICAgICAgICB1bmxpc3RlbigpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgY29uc3QgZXJyb3IgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgIHJlamVjdChyZXF1ZXN0LmVycm9yKTtcclxuICAgICAgICAgICAgdW5saXN0ZW4oKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIHJlcXVlc3QuYWRkRXZlbnRMaXN0ZW5lcignc3VjY2VzcycsIHN1Y2Nlc3MpO1xyXG4gICAgICAgIHJlcXVlc3QuYWRkRXZlbnRMaXN0ZW5lcignZXJyb3InLCBlcnJvcik7XHJcbiAgICB9KTtcclxuICAgIHByb21pc2UudGhlbigodmFsdWUpID0+IHtcclxuICAgICAgICAvLyBTaW5jZSBjdXJzb3JpbmcgcmV1c2VzIHRoZSBJREJSZXF1ZXN0ICgqc2lnaCopLCB3ZSBjYWNoZSBpdCBmb3IgbGF0ZXIgcmV0cmlldmFsXHJcbiAgICAgICAgLy8gKHNlZSB3cmFwRnVuY3Rpb24pLlxyXG4gICAgICAgIGlmICh2YWx1ZSBpbnN0YW5jZW9mIElEQkN1cnNvcikge1xyXG4gICAgICAgICAgICBjdXJzb3JSZXF1ZXN0TWFwLnNldCh2YWx1ZSwgcmVxdWVzdCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICAvLyBUaGlzIG1hcHBpbmcgZXhpc3RzIGluIHJldmVyc2VUcmFuc2Zvcm1DYWNoZSBidXQgZG9lc24ndCBkb2Vzbid0IGV4aXN0IGluIHRyYW5zZm9ybUNhY2hlLiBUaGlzXHJcbiAgICAvLyBpcyBiZWNhdXNlIHdlIGNyZWF0ZSBtYW55IHByb21pc2VzIGZyb20gYSBzaW5nbGUgSURCUmVxdWVzdC5cclxuICAgIHJldmVyc2VUcmFuc2Zvcm1DYWNoZS5zZXQocHJvbWlzZSwgcmVxdWVzdCk7XHJcbiAgICByZXR1cm4gcHJvbWlzZTtcclxufVxyXG5mdW5jdGlvbiBjYWNoZURvbmVQcm9taXNlRm9yVHJhbnNhY3Rpb24odHgpIHtcclxuICAgIC8vIEVhcmx5IGJhaWwgaWYgd2UndmUgYWxyZWFkeSBjcmVhdGVkIGEgZG9uZSBwcm9taXNlIGZvciB0aGlzIHRyYW5zYWN0aW9uLlxyXG4gICAgaWYgKHRyYW5zYWN0aW9uRG9uZU1hcC5oYXModHgpKVxyXG4gICAgICAgIHJldHVybjtcclxuICAgIGNvbnN0IGRvbmUgPSBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgY29uc3QgdW5saXN0ZW4gPSAoKSA9PiB7XHJcbiAgICAgICAgICAgIHR4LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NvbXBsZXRlJywgY29tcGxldGUpO1xyXG4gICAgICAgICAgICB0eC5yZW1vdmVFdmVudExpc3RlbmVyKCdlcnJvcicsIGVycm9yKTtcclxuICAgICAgICAgICAgdHgucmVtb3ZlRXZlbnRMaXN0ZW5lcignYWJvcnQnLCBlcnJvcik7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBjb25zdCBjb21wbGV0ZSA9ICgpID0+IHtcclxuICAgICAgICAgICAgcmVzb2x2ZSgpO1xyXG4gICAgICAgICAgICB1bmxpc3RlbigpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgY29uc3QgZXJyb3IgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgIHJlamVjdCh0eC5lcnJvcik7XHJcbiAgICAgICAgICAgIHVubGlzdGVuKCk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICB0eC5hZGRFdmVudExpc3RlbmVyKCdjb21wbGV0ZScsIGNvbXBsZXRlKTtcclxuICAgICAgICB0eC5hZGRFdmVudExpc3RlbmVyKCdlcnJvcicsIGVycm9yKTtcclxuICAgICAgICB0eC5hZGRFdmVudExpc3RlbmVyKCdhYm9ydCcsIGVycm9yKTtcclxuICAgIH0pO1xyXG4gICAgLy8gQ2FjaGUgaXQgZm9yIGxhdGVyIHJldHJpZXZhbC5cclxuICAgIHRyYW5zYWN0aW9uRG9uZU1hcC5zZXQodHgsIGRvbmUpO1xyXG59XHJcbmxldCBpZGJQcm94eVRyYXBzID0ge1xyXG4gICAgZ2V0KHRhcmdldCwgcHJvcCwgcmVjZWl2ZXIpIHtcclxuICAgICAgICBpZiAodGFyZ2V0IGluc3RhbmNlb2YgSURCVHJhbnNhY3Rpb24pIHtcclxuICAgICAgICAgICAgLy8gU3BlY2lhbCBoYW5kbGluZyBmb3IgdHJhbnNhY3Rpb24uZG9uZS5cclxuICAgICAgICAgICAgaWYgKHByb3AgPT09ICdkb25lJylcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cmFuc2FjdGlvbkRvbmVNYXAuZ2V0KHRhcmdldCk7XHJcbiAgICAgICAgICAgIC8vIFBvbHlmaWxsIGZvciBvYmplY3RTdG9yZU5hbWVzIGJlY2F1c2Ugb2YgRWRnZS5cclxuICAgICAgICAgICAgaWYgKHByb3AgPT09ICdvYmplY3RTdG9yZU5hbWVzJykge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRhcmdldC5vYmplY3RTdG9yZU5hbWVzIHx8IHRyYW5zYWN0aW9uU3RvcmVOYW1lc01hcC5nZXQodGFyZ2V0KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyBNYWtlIHR4LnN0b3JlIHJldHVybiB0aGUgb25seSBzdG9yZSBpbiB0aGUgdHJhbnNhY3Rpb24sIG9yIHVuZGVmaW5lZCBpZiB0aGVyZSBhcmUgbWFueS5cclxuICAgICAgICAgICAgaWYgKHByb3AgPT09ICdzdG9yZScpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiByZWNlaXZlci5vYmplY3RTdG9yZU5hbWVzWzFdID9cclxuICAgICAgICAgICAgICAgICAgICB1bmRlZmluZWQgOiByZWNlaXZlci5vYmplY3RTdG9yZShyZWNlaXZlci5vYmplY3RTdG9yZU5hbWVzWzBdKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBFbHNlIHRyYW5zZm9ybSB3aGF0ZXZlciB3ZSBnZXQgYmFjay5cclxuICAgICAgICByZXR1cm4gd3JhcCh0YXJnZXRbcHJvcF0pO1xyXG4gICAgfSxcclxuICAgIGhhcyh0YXJnZXQsIHByb3ApIHtcclxuICAgICAgICBpZiAodGFyZ2V0IGluc3RhbmNlb2YgSURCVHJhbnNhY3Rpb24gJiYgKHByb3AgPT09ICdkb25lJyB8fCBwcm9wID09PSAnc3RvcmUnKSlcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgcmV0dXJuIHByb3AgaW4gdGFyZ2V0O1xyXG4gICAgfSxcclxufTtcclxuZnVuY3Rpb24gYWRkVHJhcHMoY2FsbGJhY2spIHtcclxuICAgIGlkYlByb3h5VHJhcHMgPSBjYWxsYmFjayhpZGJQcm94eVRyYXBzKTtcclxufVxyXG5mdW5jdGlvbiB3cmFwRnVuY3Rpb24oZnVuYykge1xyXG4gICAgLy8gRHVlIHRvIGV4cGVjdGVkIG9iamVjdCBlcXVhbGl0eSAod2hpY2ggaXMgZW5mb3JjZWQgYnkgdGhlIGNhY2hpbmcgaW4gYHdyYXBgKSwgd2VcclxuICAgIC8vIG9ubHkgY3JlYXRlIG9uZSBuZXcgZnVuYyBwZXIgZnVuYy5cclxuICAgIC8vIEVkZ2UgZG9lc24ndCBzdXBwb3J0IG9iamVjdFN0b3JlTmFtZXMgKGJvb28pLCBzbyB3ZSBwb2x5ZmlsbCBpdCBoZXJlLlxyXG4gICAgaWYgKGZ1bmMgPT09IElEQkRhdGFiYXNlLnByb3RvdHlwZS50cmFuc2FjdGlvbiAmJlxyXG4gICAgICAgICEoJ29iamVjdFN0b3JlTmFtZXMnIGluIElEQlRyYW5zYWN0aW9uLnByb3RvdHlwZSkpIHtcclxuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKHN0b3JlTmFtZXMsIC4uLmFyZ3MpIHtcclxuICAgICAgICAgICAgY29uc3QgdHggPSBmdW5jLmNhbGwodW53cmFwKHRoaXMpLCBzdG9yZU5hbWVzLCAuLi5hcmdzKTtcclxuICAgICAgICAgICAgdHJhbnNhY3Rpb25TdG9yZU5hbWVzTWFwLnNldCh0eCwgc3RvcmVOYW1lcy5zb3J0ID8gc3RvcmVOYW1lcy5zb3J0KCkgOiBbc3RvcmVOYW1lc10pO1xyXG4gICAgICAgICAgICByZXR1cm4gd3JhcCh0eCk7XHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuICAgIC8vIEN1cnNvciBtZXRob2RzIGFyZSBzcGVjaWFsLCBhcyB0aGUgYmVoYXZpb3VyIGlzIGEgbGl0dGxlIG1vcmUgZGlmZmVyZW50IHRvIHN0YW5kYXJkIElEQi4gSW5cclxuICAgIC8vIElEQiwgeW91IGFkdmFuY2UgdGhlIGN1cnNvciBhbmQgd2FpdCBmb3IgYSBuZXcgJ3N1Y2Nlc3MnIG9uIHRoZSBJREJSZXF1ZXN0IHRoYXQgZ2F2ZSB5b3UgdGhlXHJcbiAgICAvLyBjdXJzb3IuIEl0J3Mga2luZGEgbGlrZSBhIHByb21pc2UgdGhhdCBjYW4gcmVzb2x2ZSB3aXRoIG1hbnkgdmFsdWVzLiBUaGF0IGRvZXNuJ3QgbWFrZSBzZW5zZVxyXG4gICAgLy8gd2l0aCByZWFsIHByb21pc2VzLCBzbyBlYWNoIGFkdmFuY2UgbWV0aG9kcyByZXR1cm5zIGEgbmV3IHByb21pc2UgZm9yIHRoZSBjdXJzb3Igb2JqZWN0LCBvclxyXG4gICAgLy8gdW5kZWZpbmVkIGlmIHRoZSBlbmQgb2YgdGhlIGN1cnNvciBoYXMgYmVlbiByZWFjaGVkLlxyXG4gICAgaWYgKGdldEN1cnNvckFkdmFuY2VNZXRob2RzKCkuaW5jbHVkZXMoZnVuYykpIHtcclxuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKC4uLmFyZ3MpIHtcclxuICAgICAgICAgICAgLy8gQ2FsbGluZyB0aGUgb3JpZ2luYWwgZnVuY3Rpb24gd2l0aCB0aGUgcHJveHkgYXMgJ3RoaXMnIGNhdXNlcyBJTExFR0FMIElOVk9DQVRJT04sIHNvIHdlIHVzZVxyXG4gICAgICAgICAgICAvLyB0aGUgb3JpZ2luYWwgb2JqZWN0LlxyXG4gICAgICAgICAgICBmdW5jLmFwcGx5KHVud3JhcCh0aGlzKSwgYXJncyk7XHJcbiAgICAgICAgICAgIHJldHVybiB3cmFwKGN1cnNvclJlcXVlc3RNYXAuZ2V0KHRoaXMpKTtcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGZ1bmN0aW9uICguLi5hcmdzKSB7XHJcbiAgICAgICAgLy8gQ2FsbGluZyB0aGUgb3JpZ2luYWwgZnVuY3Rpb24gd2l0aCB0aGUgcHJveHkgYXMgJ3RoaXMnIGNhdXNlcyBJTExFR0FMIElOVk9DQVRJT04sIHNvIHdlIHVzZVxyXG4gICAgICAgIC8vIHRoZSBvcmlnaW5hbCBvYmplY3QuXHJcbiAgICAgICAgcmV0dXJuIHdyYXAoZnVuYy5hcHBseSh1bndyYXAodGhpcyksIGFyZ3MpKTtcclxuICAgIH07XHJcbn1cclxuZnVuY3Rpb24gdHJhbnNmb3JtQ2FjaGFibGVWYWx1ZSh2YWx1ZSkge1xyXG4gICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ2Z1bmN0aW9uJylcclxuICAgICAgICByZXR1cm4gd3JhcEZ1bmN0aW9uKHZhbHVlKTtcclxuICAgIC8vIFRoaXMgZG9lc24ndCByZXR1cm4sIGl0IGp1c3QgY3JlYXRlcyBhICdkb25lJyBwcm9taXNlIGZvciB0aGUgdHJhbnNhY3Rpb24sXHJcbiAgICAvLyB3aGljaCBpcyBsYXRlciByZXR1cm5lZCBmb3IgdHJhbnNhY3Rpb24uZG9uZSAoc2VlIGlkYk9iamVjdEhhbmRsZXIpLlxyXG4gICAgaWYgKHZhbHVlIGluc3RhbmNlb2YgSURCVHJhbnNhY3Rpb24pXHJcbiAgICAgICAgY2FjaGVEb25lUHJvbWlzZUZvclRyYW5zYWN0aW9uKHZhbHVlKTtcclxuICAgIGlmIChpbnN0YW5jZU9mQW55KHZhbHVlLCBnZXRJZGJQcm94eWFibGVUeXBlcygpKSlcclxuICAgICAgICByZXR1cm4gbmV3IFByb3h5KHZhbHVlLCBpZGJQcm94eVRyYXBzKTtcclxuICAgIC8vIFJldHVybiB0aGUgc2FtZSB2YWx1ZSBiYWNrIGlmIHdlJ3JlIG5vdCBnb2luZyB0byB0cmFuc2Zvcm0gaXQuXHJcbiAgICByZXR1cm4gdmFsdWU7XHJcbn1cclxuZnVuY3Rpb24gd3JhcCh2YWx1ZSkge1xyXG4gICAgLy8gV2Ugc29tZXRpbWVzIGdlbmVyYXRlIG11bHRpcGxlIHByb21pc2VzIGZyb20gYSBzaW5nbGUgSURCUmVxdWVzdCAoZWcgd2hlbiBjdXJzb3JpbmcpLCBiZWNhdXNlXHJcbiAgICAvLyBJREIgaXMgd2VpcmQgYW5kIGEgc2luZ2xlIElEQlJlcXVlc3QgY2FuIHlpZWxkIG1hbnkgcmVzcG9uc2VzLCBzbyB0aGVzZSBjYW4ndCBiZSBjYWNoZWQuXHJcbiAgICBpZiAodmFsdWUgaW5zdGFuY2VvZiBJREJSZXF1ZXN0KVxyXG4gICAgICAgIHJldHVybiBwcm9taXNpZnlSZXF1ZXN0KHZhbHVlKTtcclxuICAgIC8vIElmIHdlJ3ZlIGFscmVhZHkgdHJhbnNmb3JtZWQgdGhpcyB2YWx1ZSBiZWZvcmUsIHJldXNlIHRoZSB0cmFuc2Zvcm1lZCB2YWx1ZS5cclxuICAgIC8vIFRoaXMgaXMgZmFzdGVyLCBidXQgaXQgYWxzbyBwcm92aWRlcyBvYmplY3QgZXF1YWxpdHkuXHJcbiAgICBpZiAodHJhbnNmb3JtQ2FjaGUuaGFzKHZhbHVlKSlcclxuICAgICAgICByZXR1cm4gdHJhbnNmb3JtQ2FjaGUuZ2V0KHZhbHVlKTtcclxuICAgIGNvbnN0IG5ld1ZhbHVlID0gdHJhbnNmb3JtQ2FjaGFibGVWYWx1ZSh2YWx1ZSk7XHJcbiAgICAvLyBOb3QgYWxsIHR5cGVzIGFyZSB0cmFuc2Zvcm1lZC5cclxuICAgIC8vIFRoZXNlIG1heSBiZSBwcmltaXRpdmUgdHlwZXMsIHNvIHRoZXkgY2FuJ3QgYmUgV2Vha01hcCBrZXlzLlxyXG4gICAgaWYgKG5ld1ZhbHVlICE9PSB2YWx1ZSkge1xyXG4gICAgICAgIHRyYW5zZm9ybUNhY2hlLnNldCh2YWx1ZSwgbmV3VmFsdWUpO1xyXG4gICAgICAgIHJldmVyc2VUcmFuc2Zvcm1DYWNoZS5zZXQobmV3VmFsdWUsIHZhbHVlKTtcclxuICAgIH1cclxuICAgIHJldHVybiBuZXdWYWx1ZTtcclxufVxyXG5jb25zdCB1bndyYXAgPSAodmFsdWUpID0+IHJldmVyc2VUcmFuc2Zvcm1DYWNoZS5nZXQodmFsdWUpO1xuXG5leHBvcnQgeyB3cmFwIGFzIGEsIGFkZFRyYXBzIGFzIGIsIGluc3RhbmNlT2ZBbnkgYXMgYywgcmV2ZXJzZVRyYW5zZm9ybUNhY2hlIGFzIGQsIHVud3JhcCBhcyBlIH07XG4iLCJpbXBvcnQgeyBhIGFzIHdyYXAsIGIgYXMgYWRkVHJhcHMgfSBmcm9tICcuL2NodW5rLmpzJztcbmV4cG9ydCB7IGUgYXMgdW53cmFwLCBhIGFzIHdyYXAgfSBmcm9tICcuL2NodW5rLmpzJztcblxuLyoqXHJcbiAqIE9wZW4gYSBkYXRhYmFzZS5cclxuICpcclxuICogQHBhcmFtIG5hbWUgTmFtZSBvZiB0aGUgZGF0YWJhc2UuXHJcbiAqIEBwYXJhbSB2ZXJzaW9uIFNjaGVtYSB2ZXJzaW9uLlxyXG4gKiBAcGFyYW0gY2FsbGJhY2tzIEFkZGl0aW9uYWwgY2FsbGJhY2tzLlxyXG4gKi9cclxuZnVuY3Rpb24gb3BlbkRCKG5hbWUsIHZlcnNpb24sIHsgYmxvY2tlZCwgdXBncmFkZSwgYmxvY2tpbmcgfSA9IHt9KSB7XHJcbiAgICBjb25zdCByZXF1ZXN0ID0gaW5kZXhlZERCLm9wZW4obmFtZSwgdmVyc2lvbik7XHJcbiAgICBjb25zdCBvcGVuUHJvbWlzZSA9IHdyYXAocmVxdWVzdCk7XHJcbiAgICBpZiAodXBncmFkZSkge1xyXG4gICAgICAgIHJlcXVlc3QuYWRkRXZlbnRMaXN0ZW5lcigndXBncmFkZW5lZWRlZCcsIChldmVudCkgPT4ge1xyXG4gICAgICAgICAgICB1cGdyYWRlKHdyYXAocmVxdWVzdC5yZXN1bHQpLCBldmVudC5vbGRWZXJzaW9uLCBldmVudC5uZXdWZXJzaW9uLCB3cmFwKHJlcXVlc3QudHJhbnNhY3Rpb24pKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIGlmIChibG9ja2VkKVxyXG4gICAgICAgIHJlcXVlc3QuYWRkRXZlbnRMaXN0ZW5lcignYmxvY2tlZCcsICgpID0+IGJsb2NrZWQoKSk7XHJcbiAgICBpZiAoYmxvY2tpbmcpXHJcbiAgICAgICAgb3BlblByb21pc2UudGhlbihkYiA9PiBkYi5hZGRFdmVudExpc3RlbmVyKCd2ZXJzaW9uY2hhbmdlJywgYmxvY2tpbmcpKTtcclxuICAgIHJldHVybiBvcGVuUHJvbWlzZTtcclxufVxyXG4vKipcclxuICogRGVsZXRlIGEgZGF0YWJhc2UuXHJcbiAqXHJcbiAqIEBwYXJhbSBuYW1lIE5hbWUgb2YgdGhlIGRhdGFiYXNlLlxyXG4gKi9cclxuZnVuY3Rpb24gZGVsZXRlREIobmFtZSwgeyBibG9ja2VkIH0gPSB7fSkge1xyXG4gICAgY29uc3QgcmVxdWVzdCA9IGluZGV4ZWREQi5kZWxldGVEYXRhYmFzZShuYW1lKTtcclxuICAgIGlmIChibG9ja2VkKVxyXG4gICAgICAgIHJlcXVlc3QuYWRkRXZlbnRMaXN0ZW5lcignYmxvY2tlZCcsICgpID0+IGJsb2NrZWQoKSk7XHJcbiAgICByZXR1cm4gd3JhcChyZXF1ZXN0KS50aGVuKCgpID0+IHVuZGVmaW5lZCk7XHJcbn1cblxuY29uc3QgcmVhZE1ldGhvZHMgPSBbJ2dldCcsICdnZXRLZXknLCAnZ2V0QWxsJywgJ2dldEFsbEtleXMnLCAnY291bnQnXTtcclxuY29uc3Qgd3JpdGVNZXRob2RzID0gWydwdXQnLCAnYWRkJywgJ2RlbGV0ZScsICdjbGVhciddO1xyXG5jb25zdCBjYWNoZWRNZXRob2RzID0gbmV3IE1hcCgpO1xyXG5mdW5jdGlvbiBnZXRNZXRob2QodGFyZ2V0LCBwcm9wKSB7XHJcbiAgICBpZiAoISh0YXJnZXQgaW5zdGFuY2VvZiBJREJEYXRhYmFzZSAmJlxyXG4gICAgICAgICEocHJvcCBpbiB0YXJnZXQpICYmXHJcbiAgICAgICAgdHlwZW9mIHByb3AgPT09ICdzdHJpbmcnKSlcclxuICAgICAgICByZXR1cm47XHJcbiAgICBpZiAoY2FjaGVkTWV0aG9kcy5nZXQocHJvcCkpXHJcbiAgICAgICAgcmV0dXJuIGNhY2hlZE1ldGhvZHMuZ2V0KHByb3ApO1xyXG4gICAgY29uc3QgdGFyZ2V0RnVuY05hbWUgPSBwcm9wLnJlcGxhY2UoL0Zyb21JbmRleCQvLCAnJyk7XHJcbiAgICBjb25zdCB1c2VJbmRleCA9IHByb3AgIT09IHRhcmdldEZ1bmNOYW1lO1xyXG4gICAgY29uc3QgaXNXcml0ZSA9IHdyaXRlTWV0aG9kcy5pbmNsdWRlcyh0YXJnZXRGdW5jTmFtZSk7XHJcbiAgICBpZiAoXHJcbiAgICAvLyBCYWlsIGlmIHRoZSB0YXJnZXQgZG9lc24ndCBleGlzdCBvbiB0aGUgdGFyZ2V0LiBFZywgZ2V0QWxsIGlzbid0IGluIEVkZ2UuXHJcbiAgICAhKHRhcmdldEZ1bmNOYW1lIGluICh1c2VJbmRleCA/IElEQkluZGV4IDogSURCT2JqZWN0U3RvcmUpLnByb3RvdHlwZSkgfHxcclxuICAgICAgICAhKGlzV3JpdGUgfHwgcmVhZE1ldGhvZHMuaW5jbHVkZXModGFyZ2V0RnVuY05hbWUpKSlcclxuICAgICAgICByZXR1cm47XHJcbiAgICBjb25zdCBtZXRob2QgPSBhc3luYyBmdW5jdGlvbiAoc3RvcmVOYW1lLCAuLi5hcmdzKSB7XHJcbiAgICAgICAgY29uc3QgdHggPSB0aGlzLnRyYW5zYWN0aW9uKHN0b3JlTmFtZSwgaXNXcml0ZSA/ICdyZWFkd3JpdGUnIDogJ3JlYWRvbmx5Jyk7XHJcbiAgICAgICAgbGV0IHRhcmdldCA9IHR4LnN0b3JlO1xyXG4gICAgICAgIGlmICh1c2VJbmRleClcclxuICAgICAgICAgICAgdGFyZ2V0ID0gdGFyZ2V0LmluZGV4KGFyZ3Muc2hpZnQoKSk7XHJcbiAgICAgICAgY29uc3QgcmV0dXJuVmFsID0gdGFyZ2V0W3RhcmdldEZ1bmNOYW1lXSguLi5hcmdzKTtcclxuICAgICAgICBpZiAoaXNXcml0ZSlcclxuICAgICAgICAgICAgYXdhaXQgdHguZG9uZTtcclxuICAgICAgICByZXR1cm4gcmV0dXJuVmFsO1xyXG4gICAgfTtcclxuICAgIGNhY2hlZE1ldGhvZHMuc2V0KHByb3AsIG1ldGhvZCk7XHJcbiAgICByZXR1cm4gbWV0aG9kO1xyXG59XHJcbmFkZFRyYXBzKG9sZFRyYXBzID0+ICh7XHJcbiAgICBnZXQ6ICh0YXJnZXQsIHByb3AsIHJlY2VpdmVyKSA9PiBnZXRNZXRob2QodGFyZ2V0LCBwcm9wKSB8fCBvbGRUcmFwcy5nZXQodGFyZ2V0LCBwcm9wLCByZWNlaXZlciksXHJcbiAgICBoYXM6ICh0YXJnZXQsIHByb3ApID0+ICEhZ2V0TWV0aG9kKHRhcmdldCwgcHJvcCkgfHwgb2xkVHJhcHMuaGFzKHRhcmdldCwgcHJvcCksXHJcbn0pKTtcblxuZXhwb3J0IHsgb3BlbkRCLCBkZWxldGVEQiB9O1xuIiwiZXhwb3J0ICogZnJvbSAnLi9idWlsZC9lc20vaW5kZXguanMnO1xuaW1wb3J0ICcuL2J1aWxkL2VzbS9hc3luYy1pdGVyYXRvcnMuanMnO1xuIiwiZXhwb3J0IGVudW0gU2VyaXZlV29ya2VyRXZlbnRzIHtcclxuICAgIGluaXQgPSAnaW5pdCcsXHJcbiAgICBpc0xvZ2dlZCA9ICdpc0xvZ2dlZCcsXHJcbiAgICBpc0FjY291bnRDcmVhdGVkID0gJ2lzQWNjb3VudENyZWF0ZWQnLFxyXG4gICAgY2hlY2tMb2dpbiA9ICdjaGVja0xvZ2luJyxcclxuICAgIGNoZWNrUGFzc3dvcmQgPSAnY2hlY2tQYXNzd29yZCcsXHJcbiAgICBjcmVhdGVBY2NvdW50ID0gJ2NyZWF0ZUFjY291bnQnLFxyXG4gICAgbG9naW4gPSAnbG9naW4nLFxyXG59XHJcbiIsImltcG9ydCB7IERCU2V0dGluZ3MgfSBmcm9tICcuLi9pbnRlcmZhY2VzJztcclxuXHJcbmV4cG9ydCBjb25zdCBDSEFOTkVMX05BTUU6IHN0cmluZyA9ICdzdy1tZXNzYWdlcyc7XHJcblxyXG5leHBvcnQgY29uc3QgTE9HSU5fU1RPUkVfTkFNRTogJ2xvZ2luLXN0b3JlJyA9ICdsb2dpbi1zdG9yZSc7XHJcbmV4cG9ydCBjb25zdCBJU19MT0dHRURfU1RPUkVfTkFNRTogJ2xvZ2dlZC1zdG9yZScgPSAnbG9nZ2VkLXN0b3JlJztcclxuXHJcbmV4cG9ydCBjb25zdCBMT0dJTl9EQl9TRVRUSU5HUzogREJTZXR0aW5ncyA9IHtcclxuICAgIG5hbWU6ICdsb2dpbicsXHJcbiAgICB2ZXJzaW9uOiA0LFxyXG59XHJcblxyXG5cclxuZXhwb3J0IGVudW0gaXNMb2dnZWREQktleXMge1xyXG4gICAgaXNMb2dnZWQgPSAnaXNMb2dnZWQnLFxyXG4gICAgYWNjb3VudCA9ICdhY2NvdW50JyxcclxufVxyXG4iLCJpbXBvcnQgeyBMT0dJTl9TVE9SRV9OQU1FLCBpc0xvZ2dlZERCS2V5cyB9IGZyb20gJy4uL2NvbnN0YW50cyc7XHJcbmltcG9ydCB7IEFjY291bnQgfSBmcm9tICcuLi9pbnRlcmZhY2VzJztcclxuaW1wb3J0IHsgU2VyaXZlV29ya2VyRXZlbnRzIH0gZnJvbSAnLi4vY29uc3RhbnRzL2V2ZW50cy10eXBlJztcclxuXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBjaGVja0xvZ2luKGNoYW5uZWw6IEJyb2FkY2FzdENoYW5uZWwsIGRiLCBsb2dpbjogc3RyaW5nKSB7XHJcbiAgICBjb25zdCBhY2NvdW50OiBBY2NvdW50ID0gYXdhaXQgZGIuZ2V0KExPR0lOX1NUT1JFX05BTUUsIGlzTG9nZ2VkREJLZXlzLmFjY291bnQpO1xyXG4gICAgY29uc3QgX2lzTG9naW5WYWxpZDogYm9vbGVhbiA9IGxvZ2luID09PSBhY2NvdW50LmxvZ2luO1xyXG5cclxuICAgIGNoYW5uZWwucG9zdE1lc3NhZ2UoeyB0eXBlOiBTZXJpdmVXb3JrZXJFdmVudHMuY2hlY2tMb2dpbiwgZGF0YTogX2lzTG9naW5WYWxpZCB9KTtcclxufVxyXG4iLCJpbXBvcnQgeyBMT0dJTl9TVE9SRV9OQU1FLCBpc0xvZ2dlZERCS2V5cyB9IGZyb20gJy4uL2NvbnN0YW50cyc7XHJcbmltcG9ydCB7IEFjY291bnQgfSBmcm9tICcuLi9pbnRlcmZhY2VzJztcclxuaW1wb3J0IHsgU2VyaXZlV29ya2VyRXZlbnRzIH0gZnJvbSAnLi4vY29uc3RhbnRzL2V2ZW50cy10eXBlJztcclxuaW1wb3J0IHsgZ2VuZXJhdGVIYXNoIH0gZnJvbSAnLi4vdXRpbHMvY3J5cHRvJztcclxuXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBjaGVja1Bhc3N3b3JkKGNoYW5uZWw6IEJyb2FkY2FzdENoYW5uZWwsIGRiLCBwYXNzd29yZDogc3RyaW5nKSB7XHJcbiAgICBjb25zdCBhY2NvdW50OiBBY2NvdW50ID0gYXdhaXQgZGIuZ2V0KExPR0lOX1NUT1JFX05BTUUsIGlzTG9nZ2VkREJLZXlzLmFjY291bnQpO1xyXG4gICAgY29uc3QgcGFzc3dvcmRIYXNoOiBzdHJpbmcgPSBnZW5lcmF0ZUhhc2gocGFzc3dvcmQgKyBhY2NvdW50LnNhbHQpO1xyXG4gICAgY29uc3QgX2lzUGFzc3dvcmRWYWxpZDogYm9vbGVhbiA9IHBhc3N3b3JkSGFzaCA9PT0gYWNjb3VudC5wYXNzd29yZDtcclxuXHJcbiAgICBjaGFubmVsLnBvc3RNZXNzYWdlKHsgdHlwZTogU2VyaXZlV29ya2VyRXZlbnRzLmNoZWNrUGFzc3dvcmQsIGRhdGE6IF9pc1Bhc3N3b3JkVmFsaWQgfSk7XHJcbn1cclxuIiwiaW1wb3J0IHsgTE9HSU5fU1RPUkVfTkFNRSwgaXNMb2dnZWREQktleXMgfSBmcm9tICcuLi9jb25zdGFudHMnO1xyXG5pbXBvcnQgeyBBY2NvdW50IH0gZnJvbSAnLi4vaW50ZXJmYWNlcyc7XHJcbmltcG9ydCB7IEFjY291bnQgYXMgQXV0aEFjY291bnQgfSBmcm9tICdzcmMvYW5ndWxhci9hcHAvbW9kdWxlcy9hdXRob3JpemF0aW9uL2ludGVmcmFjZXMnO1xyXG5pbXBvcnQgeyBTZXJpdmVXb3JrZXJFdmVudHMgfSBmcm9tICcuLi9jb25zdGFudHMvZXZlbnRzLXR5cGUnO1xyXG5pbXBvcnQgeyBnZW5lcmF0ZVNhbHQsIGdlbmVyYXRlSGFzaCB9IGZyb20gJy4uL3V0aWxzL2NyeXB0byc7XHJcblxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gY3JlYXRlQWNjb3VudChjaGFubmVsOiBCcm9hZGNhc3RDaGFubmVsLCBkYiwgYWNjb3VudDogQXV0aEFjY291bnQpIHtcclxuICAgIGNvbnN0IHNhbHQ6IHN0cmluZyA9IGdlbmVyYXRlU2FsdCgpO1xyXG4gICAgY29uc3QgcGFzc3dvcmRIYXNoOiBzdHJpbmcgPSBnZW5lcmF0ZUhhc2goYWNjb3VudC5wYXNzd29yZCArIHNhbHQpO1xyXG4gICAgY29uc3QgZGF0ZTogbnVtYmVyID0gRGF0ZS5ub3coKTtcclxuXHJcbiAgICBjb25zdCBuZXdBY2NvdW50OiBBY2NvdW50ID0ge1xyXG4gICAgICAgIHNhbHQsXHJcbiAgICAgICAgbG9naW46IGFjY291bnQubG9naW4sXHJcbiAgICAgICAgcGFzc3dvcmQ6IHBhc3N3b3JkSGFzaCxcclxuICAgICAgICBjcmVhdGlvblRpbWU6IGRhdGUsXHJcbiAgICAgICAgbGFzdFVwZGF0ZVRpbWU6IGRhdGUsXHJcbiAgICB9O1xyXG5cclxuICAgIGF3YWl0IGRiLnB1dChMT0dJTl9TVE9SRV9OQU1FLCBuZXdBY2NvdW50LCBpc0xvZ2dlZERCS2V5cy5hY2NvdW50KTtcclxuXHJcbiAgICBjaGFubmVsLnBvc3RNZXNzYWdlKHsgdHlwZTogU2VyaXZlV29ya2VyRXZlbnRzLmNyZWF0ZUFjY291bnQsIGRhdGE6IHRydWUgfSk7XHJcbn1cclxuIiwiZXhwb3J0IHsgaXNMb2dnZWQgfSBmcm9tICcuL2lzTG9nZ2VkJztcclxuZXhwb3J0IHsgaXNBY2NvdW50Q3JlYXRlZCB9IGZyb20gJy4vaXNBY2NvdW50Q3JlYXRlZCc7XHJcbmV4cG9ydCB7IGNoZWNrTG9naW4gfSBmcm9tICcuL2NoZWNrTG9naW4nO1xyXG5leHBvcnQgeyBjaGVja1Bhc3N3b3JkIH0gZnJvbSAnLi9jaGVja1Bhc3N3b3JkJztcclxuZXhwb3J0IHsgY3JlYXRlQWNjb3VudCB9IGZyb20gJy4vY3JlYXRlQWNjb3VudCc7XHJcbmV4cG9ydCB7IGxvZ2luIH0gZnJvbSAnLi9sb2dpbic7XHJcbiIsImltcG9ydCB7IExPR0lOX1NUT1JFX05BTUUsIGlzTG9nZ2VkREJLZXlzIH0gZnJvbSAnLi4vY29uc3RhbnRzJztcclxuaW1wb3J0IHsgU2VyaXZlV29ya2VyRXZlbnRzIH0gZnJvbSAnLi4vY29uc3RhbnRzL2V2ZW50cy10eXBlJztcclxuXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBpc0FjY291bnRDcmVhdGVkKGNoYW5uZWw6IEJyb2FkY2FzdENoYW5uZWwsIGRiKSB7XHJcbiAgICBjb25zdCBjb3VudCA9IGF3YWl0IGRiLmNvdW50KExPR0lOX1NUT1JFX05BTUUsIGlzTG9nZ2VkREJLZXlzLmFjY291bnQpO1xyXG4gICAgY29uc3QgX2lzQWNjb3VudENyZWF0ZWQ6IGJvb2xlYW4gPSBCb29sZWFuKGNvdW50KTtcclxuXHJcbiAgICBjaGFubmVsLnBvc3RNZXNzYWdlKHsgdHlwZTogU2VyaXZlV29ya2VyRXZlbnRzLmlzQWNjb3VudENyZWF0ZWQsIGRhdGE6IF9pc0FjY291bnRDcmVhdGVkIH0pO1xyXG59XHJcblxyXG4iLCJpbXBvcnQgeyBJU19MT0dHRURfU1RPUkVfTkFNRSwgaXNMb2dnZWREQktleXMgfSBmcm9tICcuLi9jb25zdGFudHMnO1xyXG5pbXBvcnQgeyBTZXJpdmVXb3JrZXJFdmVudHMgfSBmcm9tICcuLi9jb25zdGFudHMvZXZlbnRzLXR5cGUnO1xyXG5cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGlzTG9nZ2VkKGNoYW5uZWw6IEJyb2FkY2FzdENoYW5uZWwsIGRiKSB7XHJcbiAgICBjb25zdCBfaXNMb2dnZWQ6IGJvb2xlYW4gPSBhd2FpdCBkYi5nZXQoSVNfTE9HR0VEX1NUT1JFX05BTUUsIGlzTG9nZ2VkREJLZXlzLmlzTG9nZ2VkKTtcclxuXHJcbiAgICBjaGFubmVsLnBvc3RNZXNzYWdlKHsgdHlwZTogU2VyaXZlV29ya2VyRXZlbnRzLmlzTG9nZ2VkLCBkYXRhOiBfaXNMb2dnZWQgfSk7XHJcbn1cclxuIiwiaW1wb3J0IHsgSVNfTE9HR0VEX1NUT1JFX05BTUUsIGlzTG9nZ2VkREJLZXlzIH0gZnJvbSAnLi4vY29uc3RhbnRzJztcclxuaW1wb3J0IHsgU2VyaXZlV29ya2VyRXZlbnRzIH0gZnJvbSAnLi4vY29uc3RhbnRzL2V2ZW50cy10eXBlJztcclxuXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBsb2dpbihjaGFubmVsOiBCcm9hZGNhc3RDaGFubmVsLCBkYikge1xyXG4gICAgYXdhaXQgZGIucHV0KElTX0xPR0dFRF9TVE9SRV9OQU1FLCB0cnVlLCBpc0xvZ2dlZERCS2V5cy5pc0xvZ2dlZCk7XHJcblxyXG4gICAgY2hhbm5lbC5wb3N0TWVzc2FnZSh7IHR5cGU6IFNlcml2ZVdvcmtlckV2ZW50cy5sb2dpbiwgZGF0YTogdHJ1ZSB9KTtcclxufVxyXG4iLCJpbXBvcnQgeyBvcGVuREIgfSBmcm9tICdpZGIvd2l0aC1hc3luYy1pdHRyLmpzJztcclxuXHJcbmltcG9ydCB7IFxyXG4gICAgQ0hBTk5FTF9OQU1FLFxyXG4gICAgTE9HSU5fU1RPUkVfTkFNRSxcclxuICAgIElTX0xPR0dFRF9TVE9SRV9OQU1FLFxyXG4gICAgTE9HSU5fREJfU0VUVElOR1MsXHJcbiAgICBpc0xvZ2dlZERCS2V5cyxcclxufSBmcm9tICcuL2NvbnN0YW50cyc7XHJcbmltcG9ydCB7IFNlcml2ZVdvcmtlckV2ZW50cyB9IGZyb20gJy4vY29uc3RhbnRzL2V2ZW50cy10eXBlJztcclxuaW1wb3J0IHsgTXlEQiB9IGZyb20gJy4vaW50ZXJmYWNlcyc7XHJcbmltcG9ydCB7XHJcbiAgICBpc0xvZ2dlZCxcclxuICAgIGlzQWNjb3VudENyZWF0ZWQsXHJcbiAgICBjaGVja0xvZ2luLFxyXG4gICAgY2hlY2tQYXNzd29yZCxcclxuICAgIGNyZWF0ZUFjY291bnQsXHJcbiAgICBsb2dpbixcclxufSBmcm9tICcuL2V2ZW50cyc7XHJcblxyXG5sZXQgbG9naW5EYiA9IG51bGw7XHJcblxyXG5hc3luYyBmdW5jdGlvbiBpbml0KCkge1xyXG4gICAgY29uc3QgY2hhbm5lbDogQnJvYWRjYXN0Q2hhbm5lbCA9IGF3YWl0IGNyZWF0ZUNoYW5uZWwoKTtcclxuXHJcbiAgICB0cnkge1xyXG4gICAgICAgIGF3YWl0IGNyZWF0ZURCKCk7XHJcbiAgICAgICAgY2hhbm5lbC5wb3N0TWVzc2FnZSh7IHR5cGU6IFNlcml2ZVdvcmtlckV2ZW50cy5pbml0LCBpc0luaXQ6IHRydWUgfSk7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ3dvcmtlciB3b3JrJyk7XHJcbiAgICB9IGNhdGNoKF8pIHtcclxuICAgICAgICBjaGFubmVsLnBvc3RNZXNzYWdlKHsgdHlwZTogU2VyaXZlV29ya2VyRXZlbnRzLmluaXQsIGlzSW5pdDogZmFsc2UgfSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHVwZ3JhZGVEQih1cGdyYWRlREIpOiB2b2lkIHtcclxuICAgIGNvbnN0IGFjY291bnRTdG9yZSA9IHVwZ3JhZGVEQi5jcmVhdGVPYmplY3RTdG9yZShMT0dJTl9TVE9SRV9OQU1FKTtcclxuICAgIGNvbnN0IHN0b3JlID0gdXBncmFkZURCLmNyZWF0ZU9iamVjdFN0b3JlKElTX0xPR0dFRF9TVE9SRV9OQU1FKTtcclxuXHJcbiAgICBzdG9yZS5wdXQoZmFsc2UsIGlzTG9nZ2VkREJLZXlzLmlzTG9nZ2VkKTtcclxufVxyXG5cclxuYXN5bmMgZnVuY3Rpb24gY3JlYXRlREIoKSB7XHJcbiAgICBsb2dpbkRiID0gYXdhaXQgb3BlbkRCPE15REI+KFxyXG4gICAgICAgIExPR0lOX0RCX1NFVFRJTkdTLm5hbWUsXHJcbiAgICAgICAgTE9HSU5fREJfU0VUVElOR1MudmVyc2lvbixcclxuICAgICAgICB7IHVwZ3JhZGU6IHVwZ3JhZGVEQiB9XHJcbiAgICApO1xyXG5cclxuICAgIGF3YWl0IGxvZ2luRGIucHV0KElTX0xPR0dFRF9TVE9SRV9OQU1FLCBmYWxzZSwgaXNMb2dnZWREQktleXMuaXNMb2dnZWQpO1xyXG5cclxuICAgIHJldHVybiBudWxsO1xyXG59XHJcblxyXG5hc3luYyBmdW5jdGlvbiBjcmVhdGVDaGFubmVsKCk6IFByb21pc2U8QnJvYWRjYXN0Q2hhbm5lbD4ge1xyXG4gICAgY29uc3QgY2hhbm5lbDogQnJvYWRjYXN0Q2hhbm5lbCA9IG5ldyBCcm9hZGNhc3RDaGFubmVsKENIQU5ORUxfTkFNRSk7XHJcblxyXG4gICAgY2hhbm5lbC5hZGRFdmVudExpc3RlbmVyKCdtZXNzYWdlJywgKHsgZGF0YTogeyB0eXBlLCBkYXRhIH0gfSkgPT4ge1xyXG4gICAgICAgIHN3aXRjaCAodHlwZSkge1xyXG4gICAgICAgICAgICBjYXNlIFNlcml2ZVdvcmtlckV2ZW50cy5pc0xvZ2dlZDogaXNMb2dnZWQoY2hhbm5lbCwgbG9naW5EYik7IGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFNlcml2ZVdvcmtlckV2ZW50cy5pc0FjY291bnRDcmVhdGVkOiBpc0FjY291bnRDcmVhdGVkKGNoYW5uZWwsIGxvZ2luRGIpOyBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBTZXJpdmVXb3JrZXJFdmVudHMuY2hlY2tMb2dpbjogY2hlY2tMb2dpbihjaGFubmVsLCBsb2dpbkRiLCBkYXRhKTsgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgU2VyaXZlV29ya2VyRXZlbnRzLmNoZWNrUGFzc3dvcmQ6IGNoZWNrUGFzc3dvcmQoY2hhbm5lbCwgbG9naW5EYiwgZGF0YSk7IGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIFNlcml2ZVdvcmtlckV2ZW50cy5jcmVhdGVBY2NvdW50OiBjcmVhdGVBY2NvdW50KGNoYW5uZWwsIGxvZ2luRGIsIGRhdGEpOyBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBTZXJpdmVXb3JrZXJFdmVudHMubG9naW46IGxvZ2luKGNoYW5uZWwsIGxvZ2luRGIpOyBicmVhaztcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICByZXR1cm4gY2hhbm5lbDtcclxufVxyXG5cclxuaW5pdCgpO1xyXG4iLCJjb25zdCB3b3JrZXI6IGFueSA9IHNlbGY7XHJcbmNvbnN0IGNyeXB0byA9IHdvcmtlci5yZXF1aXJlKCdjcnlwdG8nKTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBnZW5lcmF0ZVNhbHQoKTogc3RyaW5nIHtcclxuICAgIHJldHVybiBjcnlwdG8ucmFuZG9tQnl0ZXMoMTYpLnRvU3RyaW5nKCdoZXgnKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGdlbmVyYXRlSGFzaChzOiBzdHJpbmcpOiBzdHJpbmcge1xyXG4gICAgcmV0dXJuIGNyeXB0by5jcmVhdGVIYXNoKCdzaGEyNTYnKS51cGRhdGUocykuZGlnZXN0KCdoZXgnKTtcclxufVxyXG4iXSwic291cmNlUm9vdCI6IiJ9