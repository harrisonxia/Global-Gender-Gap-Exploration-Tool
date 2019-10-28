/******/ (function(modules) { // webpackBootstrap
/******/ 	function hotDisposeChunk(chunkId) {
/******/ 		delete installedChunks[chunkId];
/******/ 	}
/******/ 	var parentHotUpdateCallback = window["webpackHotUpdate"];
/******/ 	window["webpackHotUpdate"] = // eslint-disable-next-line no-unused-vars
/******/ 	function webpackHotUpdateCallback(chunkId, moreModules) {
/******/ 		hotAddUpdateChunk(chunkId, moreModules);
/******/ 		if (parentHotUpdateCallback) parentHotUpdateCallback(chunkId, moreModules);
/******/ 	} ;
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadUpdateChunk(chunkId) {
/******/ 		var script = document.createElement("script");
/******/ 		script.charset = "utf-8";
/******/ 		script.src = __webpack_require__.p + "" + chunkId + "." + hotCurrentHash + ".hot-update.js";
/******/ 		if (null) script.crossOrigin = null;
/******/ 		document.head.appendChild(script);
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadManifest(requestTimeout) {
/******/ 		requestTimeout = requestTimeout || 10000;
/******/ 		return new Promise(function(resolve, reject) {
/******/ 			if (typeof XMLHttpRequest === "undefined") {
/******/ 				return reject(new Error("No browser support"));
/******/ 			}
/******/ 			try {
/******/ 				var request = new XMLHttpRequest();
/******/ 				var requestPath = __webpack_require__.p + "" + hotCurrentHash + ".hot-update.json";
/******/ 				request.open("GET", requestPath, true);
/******/ 				request.timeout = requestTimeout;
/******/ 				request.send(null);
/******/ 			} catch (err) {
/******/ 				return reject(err);
/******/ 			}
/******/ 			request.onreadystatechange = function() {
/******/ 				if (request.readyState !== 4) return;
/******/ 				if (request.status === 0) {
/******/ 					// timeout
/******/ 					reject(
/******/ 						new Error("Manifest request to " + requestPath + " timed out.")
/******/ 					);
/******/ 				} else if (request.status === 404) {
/******/ 					// no update available
/******/ 					resolve();
/******/ 				} else if (request.status !== 200 && request.status !== 304) {
/******/ 					// other failure
/******/ 					reject(new Error("Manifest request to " + requestPath + " failed."));
/******/ 				} else {
/******/ 					// success
/******/ 					try {
/******/ 						var update = JSON.parse(request.responseText);
/******/ 					} catch (e) {
/******/ 						reject(e);
/******/ 						return;
/******/ 					}
/******/ 					resolve(update);
/******/ 				}
/******/ 			};
/******/ 		});
/******/ 	}
/******/
/******/ 	var hotApplyOnUpdate = true;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentHash = "5ad9f750ebb797b67bcb";
/******/ 	var hotRequestTimeout = 10000;
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotCurrentChildModule;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParents = [];
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParentsTemp = [];
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateRequire(moduleId) {
/******/ 		var me = installedModules[moduleId];
/******/ 		if (!me) return __webpack_require__;
/******/ 		var fn = function(request) {
/******/ 			if (me.hot.active) {
/******/ 				if (installedModules[request]) {
/******/ 					if (installedModules[request].parents.indexOf(moduleId) === -1) {
/******/ 						installedModules[request].parents.push(moduleId);
/******/ 					}
/******/ 				} else {
/******/ 					hotCurrentParents = [moduleId];
/******/ 					hotCurrentChildModule = request;
/******/ 				}
/******/ 				if (me.children.indexOf(request) === -1) {
/******/ 					me.children.push(request);
/******/ 				}
/******/ 			} else {
/******/ 				console.warn(
/******/ 					"[HMR] unexpected require(" +
/******/ 						request +
/******/ 						") from disposed module " +
/******/ 						moduleId
/******/ 				);
/******/ 				hotCurrentParents = [];
/******/ 			}
/******/ 			return __webpack_require__(request);
/******/ 		};
/******/ 		var ObjectFactory = function ObjectFactory(name) {
/******/ 			return {
/******/ 				configurable: true,
/******/ 				enumerable: true,
/******/ 				get: function() {
/******/ 					return __webpack_require__[name];
/******/ 				},
/******/ 				set: function(value) {
/******/ 					__webpack_require__[name] = value;
/******/ 				}
/******/ 			};
/******/ 		};
/******/ 		for (var name in __webpack_require__) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(__webpack_require__, name) &&
/******/ 				name !== "e" &&
/******/ 				name !== "t"
/******/ 			) {
/******/ 				Object.defineProperty(fn, name, ObjectFactory(name));
/******/ 			}
/******/ 		}
/******/ 		fn.e = function(chunkId) {
/******/ 			if (hotStatus === "ready") hotSetStatus("prepare");
/******/ 			hotChunksLoading++;
/******/ 			return __webpack_require__.e(chunkId).then(finishChunkLoading, function(err) {
/******/ 				finishChunkLoading();
/******/ 				throw err;
/******/ 			});
/******/
/******/ 			function finishChunkLoading() {
/******/ 				hotChunksLoading--;
/******/ 				if (hotStatus === "prepare") {
/******/ 					if (!hotWaitingFilesMap[chunkId]) {
/******/ 						hotEnsureUpdateChunk(chunkId);
/******/ 					}
/******/ 					if (hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 						hotUpdateDownloaded();
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 		fn.t = function(value, mode) {
/******/ 			if (mode & 1) value = fn(value);
/******/ 			return __webpack_require__.t(value, mode & ~1);
/******/ 		};
/******/ 		return fn;
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateModule(moduleId) {
/******/ 		var hot = {
/******/ 			// private stuff
/******/ 			_acceptedDependencies: {},
/******/ 			_declinedDependencies: {},
/******/ 			_selfAccepted: false,
/******/ 			_selfDeclined: false,
/******/ 			_disposeHandlers: [],
/******/ 			_main: hotCurrentChildModule !== moduleId,
/******/
/******/ 			// Module API
/******/ 			active: true,
/******/ 			accept: function(dep, callback) {
/******/ 				if (dep === undefined) hot._selfAccepted = true;
/******/ 				else if (typeof dep === "function") hot._selfAccepted = dep;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._acceptedDependencies[dep[i]] = callback || function() {};
/******/ 				else hot._acceptedDependencies[dep] = callback || function() {};
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if (dep === undefined) hot._selfDeclined = true;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._declinedDependencies[dep[i]] = true;
/******/ 				else hot._declinedDependencies[dep] = true;
/******/ 			},
/******/ 			dispose: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			addDisposeHandler: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			removeDisposeHandler: function(callback) {
/******/ 				var idx = hot._disposeHandlers.indexOf(callback);
/******/ 				if (idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			// Management API
/******/ 			check: hotCheck,
/******/ 			apply: hotApply,
/******/ 			status: function(l) {
/******/ 				if (!l) return hotStatus;
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			addStatusHandler: function(l) {
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			removeStatusHandler: function(l) {
/******/ 				var idx = hotStatusHandlers.indexOf(l);
/******/ 				if (idx >= 0) hotStatusHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			//inherit from previous dispose call
/******/ 			data: hotCurrentModuleData[moduleId]
/******/ 		};
/******/ 		hotCurrentChildModule = undefined;
/******/ 		return hot;
/******/ 	}
/******/
/******/ 	var hotStatusHandlers = [];
/******/ 	var hotStatus = "idle";
/******/
/******/ 	function hotSetStatus(newStatus) {
/******/ 		hotStatus = newStatus;
/******/ 		for (var i = 0; i < hotStatusHandlers.length; i++)
/******/ 			hotStatusHandlers[i].call(null, newStatus);
/******/ 	}
/******/
/******/ 	// while downloading
/******/ 	var hotWaitingFiles = 0;
/******/ 	var hotChunksLoading = 0;
/******/ 	var hotWaitingFilesMap = {};
/******/ 	var hotRequestedFilesMap = {};
/******/ 	var hotAvailableFilesMap = {};
/******/ 	var hotDeferred;
/******/
/******/ 	// The update info
/******/ 	var hotUpdate, hotUpdateNewHash;
/******/
/******/ 	function toModuleId(id) {
/******/ 		var isNumber = +id + "" === id;
/******/ 		return isNumber ? +id : id;
/******/ 	}
/******/
/******/ 	function hotCheck(apply) {
/******/ 		if (hotStatus !== "idle") {
/******/ 			throw new Error("check() is only allowed in idle status");
/******/ 		}
/******/ 		hotApplyOnUpdate = apply;
/******/ 		hotSetStatus("check");
/******/ 		return hotDownloadManifest(hotRequestTimeout).then(function(update) {
/******/ 			if (!update) {
/******/ 				hotSetStatus("idle");
/******/ 				return null;
/******/ 			}
/******/ 			hotRequestedFilesMap = {};
/******/ 			hotWaitingFilesMap = {};
/******/ 			hotAvailableFilesMap = update.c;
/******/ 			hotUpdateNewHash = update.h;
/******/
/******/ 			hotSetStatus("prepare");
/******/ 			var promise = new Promise(function(resolve, reject) {
/******/ 				hotDeferred = {
/******/ 					resolve: resolve,
/******/ 					reject: reject
/******/ 				};
/******/ 			});
/******/ 			hotUpdate = {};
/******/ 			var chunkId = 0;
/******/ 			// eslint-disable-next-line no-lone-blocks
/******/ 			{
/******/ 				/*globals chunkId */
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if (
/******/ 				hotStatus === "prepare" &&
/******/ 				hotChunksLoading === 0 &&
/******/ 				hotWaitingFiles === 0
/******/ 			) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 			return promise;
/******/ 		});
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotAddUpdateChunk(chunkId, moreModules) {
/******/ 		if (!hotAvailableFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
/******/ 			return;
/******/ 		hotRequestedFilesMap[chunkId] = false;
/******/ 		for (var moduleId in moreModules) {
/******/ 			if (Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				hotUpdate[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if (--hotWaitingFiles === 0 && hotChunksLoading === 0) {
/******/ 			hotUpdateDownloaded();
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if (!hotAvailableFilesMap[chunkId]) {
/******/ 			hotWaitingFilesMap[chunkId] = true;
/******/ 		} else {
/******/ 			hotRequestedFilesMap[chunkId] = true;
/******/ 			hotWaitingFiles++;
/******/ 			hotDownloadUpdateChunk(chunkId);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotUpdateDownloaded() {
/******/ 		hotSetStatus("ready");
/******/ 		var deferred = hotDeferred;
/******/ 		hotDeferred = null;
/******/ 		if (!deferred) return;
/******/ 		if (hotApplyOnUpdate) {
/******/ 			// Wrap deferred object in Promise to mark it as a well-handled Promise to
/******/ 			// avoid triggering uncaught exception warning in Chrome.
/******/ 			// See https://bugs.chromium.org/p/chromium/issues/detail?id=465666
/******/ 			Promise.resolve()
/******/ 				.then(function() {
/******/ 					return hotApply(hotApplyOnUpdate);
/******/ 				})
/******/ 				.then(
/******/ 					function(result) {
/******/ 						deferred.resolve(result);
/******/ 					},
/******/ 					function(err) {
/******/ 						deferred.reject(err);
/******/ 					}
/******/ 				);
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for (var id in hotUpdate) {
/******/ 				if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 					outdatedModules.push(toModuleId(id));
/******/ 				}
/******/ 			}
/******/ 			deferred.resolve(outdatedModules);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotApply(options) {
/******/ 		if (hotStatus !== "ready")
/******/ 			throw new Error("apply() is only allowed in ready status");
/******/ 		options = options || {};
/******/
/******/ 		var cb;
/******/ 		var i;
/******/ 		var j;
/******/ 		var module;
/******/ 		var moduleId;
/******/
/******/ 		function getAffectedStuff(updateModuleId) {
/******/ 			var outdatedModules = [updateModuleId];
/******/ 			var outdatedDependencies = {};
/******/
/******/ 			var queue = outdatedModules.map(function(id) {
/******/ 				return {
/******/ 					chain: [id],
/******/ 					id: id
/******/ 				};
/******/ 			});
/******/ 			while (queue.length > 0) {
/******/ 				var queueItem = queue.pop();
/******/ 				var moduleId = queueItem.id;
/******/ 				var chain = queueItem.chain;
/******/ 				module = installedModules[moduleId];
/******/ 				if (!module || module.hot._selfAccepted) continue;
/******/ 				if (module.hot._selfDeclined) {
/******/ 					return {
/******/ 						type: "self-declined",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				if (module.hot._main) {
/******/ 					return {
/******/ 						type: "unaccepted",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				for (var i = 0; i < module.parents.length; i++) {
/******/ 					var parentId = module.parents[i];
/******/ 					var parent = installedModules[parentId];
/******/ 					if (!parent) continue;
/******/ 					if (parent.hot._declinedDependencies[moduleId]) {
/******/ 						return {
/******/ 							type: "declined",
/******/ 							chain: chain.concat([parentId]),
/******/ 							moduleId: moduleId,
/******/ 							parentId: parentId
/******/ 						};
/******/ 					}
/******/ 					if (outdatedModules.indexOf(parentId) !== -1) continue;
/******/ 					if (parent.hot._acceptedDependencies[moduleId]) {
/******/ 						if (!outdatedDependencies[parentId])
/******/ 							outdatedDependencies[parentId] = [];
/******/ 						addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 						continue;
/******/ 					}
/******/ 					delete outdatedDependencies[parentId];
/******/ 					outdatedModules.push(parentId);
/******/ 					queue.push({
/******/ 						chain: chain.concat([parentId]),
/******/ 						id: parentId
/******/ 					});
/******/ 				}
/******/ 			}
/******/
/******/ 			return {
/******/ 				type: "accepted",
/******/ 				moduleId: updateModuleId,
/******/ 				outdatedModules: outdatedModules,
/******/ 				outdatedDependencies: outdatedDependencies
/******/ 			};
/******/ 		}
/******/
/******/ 		function addAllToSet(a, b) {
/******/ 			for (var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if (a.indexOf(item) === -1) a.push(item);
/******/ 			}
/******/ 		}
/******/
/******/ 		// at begin all updates modules are outdated
/******/ 		// the "outdated" status can propagate to parents if they don't accept the children
/******/ 		var outdatedDependencies = {};
/******/ 		var outdatedModules = [];
/******/ 		var appliedUpdate = {};
/******/
/******/ 		var warnUnexpectedRequire = function warnUnexpectedRequire() {
/******/ 			console.warn(
/******/ 				"[HMR] unexpected require(" + result.moduleId + ") to disposed module"
/******/ 			);
/******/ 		};
/******/
/******/ 		for (var id in hotUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 				moduleId = toModuleId(id);
/******/ 				/** @type {TODO} */
/******/ 				var result;
/******/ 				if (hotUpdate[id]) {
/******/ 					result = getAffectedStuff(moduleId);
/******/ 				} else {
/******/ 					result = {
/******/ 						type: "disposed",
/******/ 						moduleId: id
/******/ 					};
/******/ 				}
/******/ 				/** @type {Error|false} */
/******/ 				var abortError = false;
/******/ 				var doApply = false;
/******/ 				var doDispose = false;
/******/ 				var chainInfo = "";
/******/ 				if (result.chain) {
/******/ 					chainInfo = "\nUpdate propagation: " + result.chain.join(" -> ");
/******/ 				}
/******/ 				switch (result.type) {
/******/ 					case "self-declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of self decline: " +
/******/ 									result.moduleId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of declined dependency: " +
/******/ 									result.moduleId +
/******/ 									" in " +
/******/ 									result.parentId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "unaccepted":
/******/ 						if (options.onUnaccepted) options.onUnaccepted(result);
/******/ 						if (!options.ignoreUnaccepted)
/******/ 							abortError = new Error(
/******/ 								"Aborted because " + moduleId + " is not accepted" + chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "accepted":
/******/ 						if (options.onAccepted) options.onAccepted(result);
/******/ 						doApply = true;
/******/ 						break;
/******/ 					case "disposed":
/******/ 						if (options.onDisposed) options.onDisposed(result);
/******/ 						doDispose = true;
/******/ 						break;
/******/ 					default:
/******/ 						throw new Error("Unexception type " + result.type);
/******/ 				}
/******/ 				if (abortError) {
/******/ 					hotSetStatus("abort");
/******/ 					return Promise.reject(abortError);
/******/ 				}
/******/ 				if (doApply) {
/******/ 					appliedUpdate[moduleId] = hotUpdate[moduleId];
/******/ 					addAllToSet(outdatedModules, result.outdatedModules);
/******/ 					for (moduleId in result.outdatedDependencies) {
/******/ 						if (
/******/ 							Object.prototype.hasOwnProperty.call(
/******/ 								result.outdatedDependencies,
/******/ 								moduleId
/******/ 							)
/******/ 						) {
/******/ 							if (!outdatedDependencies[moduleId])
/******/ 								outdatedDependencies[moduleId] = [];
/******/ 							addAllToSet(
/******/ 								outdatedDependencies[moduleId],
/******/ 								result.outdatedDependencies[moduleId]
/******/ 							);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 				if (doDispose) {
/******/ 					addAllToSet(outdatedModules, [result.moduleId]);
/******/ 					appliedUpdate[moduleId] = warnUnexpectedRequire;
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for (i = 0; i < outdatedModules.length; i++) {
/******/ 			moduleId = outdatedModules[i];
/******/ 			if (
/******/ 				installedModules[moduleId] &&
/******/ 				installedModules[moduleId].hot._selfAccepted &&
/******/ 				// removed self-accepted modules should not be required
/******/ 				appliedUpdate[moduleId] !== warnUnexpectedRequire
/******/ 			) {
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 			}
/******/ 		}
/******/
/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		Object.keys(hotAvailableFilesMap).forEach(function(chunkId) {
/******/ 			if (hotAvailableFilesMap[chunkId] === false) {
/******/ 				hotDisposeChunk(chunkId);
/******/ 			}
/******/ 		});
/******/
/******/ 		var idx;
/******/ 		var queue = outdatedModules.slice();
/******/ 		while (queue.length > 0) {
/******/ 			moduleId = queue.pop();
/******/ 			module = installedModules[moduleId];
/******/ 			if (!module) continue;
/******/
/******/ 			var data = {};
/******/
/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for (j = 0; j < disposeHandlers.length; j++) {
/******/ 				cb = disposeHandlers[j];
/******/ 				cb(data);
/******/ 			}
/******/ 			hotCurrentModuleData[moduleId] = data;
/******/
/******/ 			// disable module (this disables requires from this module)
/******/ 			module.hot.active = false;
/******/
/******/ 			// remove module from cache
/******/ 			delete installedModules[moduleId];
/******/
/******/ 			// when disposing there is no need to call dispose handler
/******/ 			delete outdatedDependencies[moduleId];
/******/
/******/ 			// remove "parents" references from all children
/******/ 			for (j = 0; j < module.children.length; j++) {
/******/ 				var child = installedModules[module.children[j]];
/******/ 				if (!child) continue;
/******/ 				idx = child.parents.indexOf(moduleId);
/******/ 				if (idx >= 0) {
/******/ 					child.parents.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// remove outdated dependency from module children
/******/ 		var dependency;
/******/ 		var moduleOutdatedDependencies;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					for (j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 						dependency = moduleOutdatedDependencies[j];
/******/ 						idx = module.children.indexOf(dependency);
/******/ 						if (idx >= 0) module.children.splice(idx, 1);
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Now in "apply" phase
/******/ 		hotSetStatus("apply");
/******/
/******/ 		hotCurrentHash = hotUpdateNewHash;
/******/
/******/ 		// insert new code
/******/ 		for (moduleId in appliedUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}
/******/
/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					var callbacks = [];
/******/ 					for (i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 						dependency = moduleOutdatedDependencies[i];
/******/ 						cb = module.hot._acceptedDependencies[dependency];
/******/ 						if (cb) {
/******/ 							if (callbacks.indexOf(cb) !== -1) continue;
/******/ 							callbacks.push(cb);
/******/ 						}
/******/ 					}
/******/ 					for (i = 0; i < callbacks.length; i++) {
/******/ 						cb = callbacks[i];
/******/ 						try {
/******/ 							cb(moduleOutdatedDependencies);
/******/ 						} catch (err) {
/******/ 							if (options.onErrored) {
/******/ 								options.onErrored({
/******/ 									type: "accept-errored",
/******/ 									moduleId: moduleId,
/******/ 									dependencyId: moduleOutdatedDependencies[i],
/******/ 									error: err
/******/ 								});
/******/ 							}
/******/ 							if (!options.ignoreErrored) {
/******/ 								if (!error) error = err;
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Load self accepted modules
/******/ 		for (i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var item = outdatedSelfAcceptedModules[i];
/******/ 			moduleId = item.module;
/******/ 			hotCurrentParents = [moduleId];
/******/ 			try {
/******/ 				__webpack_require__(moduleId);
/******/ 			} catch (err) {
/******/ 				if (typeof item.errorHandler === "function") {
/******/ 					try {
/******/ 						item.errorHandler(err);
/******/ 					} catch (err2) {
/******/ 						if (options.onErrored) {
/******/ 							options.onErrored({
/******/ 								type: "self-accept-error-handler-errored",
/******/ 								moduleId: moduleId,
/******/ 								error: err2,
/******/ 								originalError: err
/******/ 							});
/******/ 						}
/******/ 						if (!options.ignoreErrored) {
/******/ 							if (!error) error = err2;
/******/ 						}
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				} else {
/******/ 					if (options.onErrored) {
/******/ 						options.onErrored({
/******/ 							type: "self-accept-errored",
/******/ 							moduleId: moduleId,
/******/ 							error: err
/******/ 						});
/******/ 					}
/******/ 					if (!options.ignoreErrored) {
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if (error) {
/******/ 			hotSetStatus("fail");
/******/ 			return Promise.reject(error);
/******/ 		}
/******/
/******/ 		hotSetStatus("idle");
/******/ 		return new Promise(function(resolve) {
/******/ 			resolve(outdatedModules);
/******/ 		});
/******/ 	}
/******/
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
/******/ 			exports: {},
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: (hotCurrentParentsTemp = hotCurrentParents, hotCurrentParents = [], hotCurrentParentsTemp),
/******/ 			children: []
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));
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
/******/ 	__webpack_require__.p = "/CMPT767/";
/******/
/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return hotCreateRequire(56)(__webpack_require__.s = 56);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


if (true) {
  module.exports = __webpack_require__(35);
} else {}


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

if (true) {
  module.exports = __webpack_require__(43);
} else {}


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

if (false) { var throwOnDirectAccess, ReactIs; } else {
  // By explicitly using `prop-types` you are opting into new production behavior.
  // http://fb.me/prop-types-in-prod
  module.exports = __webpack_require__(39)();
}


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(process) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createGlobalStyle", function() { return createGlobalStyle; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "css", function() { return css; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isStyledComponent", function() { return isStyledComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "keyframes", function() { return keyframes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ServerStyleSheet", function() { return ServerStyleSheet; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StyleSheetConsumer", function() { return StyleSheetConsumer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StyleSheetContext", function() { return StyleSheetContext; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StyleSheetManager", function() { return StyleSheetManager; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ThemeConsumer", function() { return ThemeConsumer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ThemeContext", function() { return ThemeContext; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ThemeProvider", function() { return ThemeProvider; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "withTheme", function() { return withTheme; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__DO_NOT_USE_OR_YOU_WILL_BE_HAUNTED_BY_SPOOKY_GHOSTS", function() { return __DO_NOT_USE_OR_YOU_WILL_BE_HAUNTED_BY_SPOOKY_GHOSTS; });
/* harmony import */ var stylis_stylis_min__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(20);
/* harmony import */ var stylis_stylis_min__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(stylis_stylis_min__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var stylis_rule_sheet__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(30);
/* harmony import */ var stylis_rule_sheet__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(stylis_rule_sheet__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _emotion_unitless__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(31);
/* harmony import */ var react_is__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(6);
/* harmony import */ var react_is__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_is__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var memoize_one__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(21);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(2);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _emotion_is_prop_valid__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(33);
/* harmony import */ var merge_anything__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(34);










// 

var interleave = (function (strings, interpolations) {
  var result = [strings[0]];

  for (var i = 0, len = interpolations.length; i < len; i += 1) {
    result.push(interpolations[i], strings[i + 1]);
  }

  return result;
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};

var objectWithoutProperties = function (obj, keys) {
  var target = {};

  for (var i in obj) {
    if (keys.indexOf(i) >= 0) continue;
    if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
    target[i] = obj[i];
  }

  return target;
};

var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

// 
var isPlainObject = (function (x) {
  return (typeof x === 'undefined' ? 'undefined' : _typeof(x)) === 'object' && x.constructor === Object;
});

// 
var EMPTY_ARRAY = Object.freeze([]);
var EMPTY_OBJECT = Object.freeze({});

// 
function isFunction(test) {
  return typeof test === 'function';
}

// 

function getComponentName(target) {
  return ( false) || target.displayName || target.name || 'Component';
}

// 
function isStatelessFunction(test) {
  return typeof test === 'function' && !(test.prototype && test.prototype.isReactComponent);
}

// 
function isStyledComponent(target) {
  return target && typeof target.styledComponentId === 'string';
}

// 

var SC_ATTR = typeof process !== 'undefined' && (process.env.REACT_APP_SC_ATTR || process.env.SC_ATTR) || 'data-styled';

var SC_VERSION_ATTR = 'data-styled-version';

var SC_STREAM_ATTR = 'data-styled-streamed';

var IS_BROWSER = typeof window !== 'undefined' && 'HTMLElement' in window;

var DISABLE_SPEEDY = typeof SC_DISABLE_SPEEDY === 'boolean' && SC_DISABLE_SPEEDY || typeof process !== 'undefined' && (process.env.REACT_APP_SC_DISABLE_SPEEDY || process.env.SC_DISABLE_SPEEDY) || "production" !== 'production';

// Shared empty execution context when generating static styles
var STATIC_EXECUTION_CONTEXT = {};

// 


/**
 * Parse errors.md and turn it into a simple hash of code: message
 */
var ERRORS =  false ? undefined : {};

/**
 * super basic version of sprintf
 */
function format() {
  var a = arguments.length <= 0 ? undefined : arguments[0];
  var b = [];

  for (var c = 1, len = arguments.length; c < len; c += 1) {
    b.push(arguments.length <= c ? undefined : arguments[c]);
  }

  b.forEach(function (d) {
    a = a.replace(/%[a-z]/, d);
  });

  return a;
}

/**
 * Create an error file out of errors.md for development and a simple web link to the full errors
 * in production mode.
 */

var StyledComponentsError = function (_Error) {
  inherits(StyledComponentsError, _Error);

  function StyledComponentsError(code) {
    classCallCheck(this, StyledComponentsError);

    for (var _len = arguments.length, interpolations = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      interpolations[_key - 1] = arguments[_key];
    }

    if (true) {
      var _this = possibleConstructorReturn(this, _Error.call(this, 'An error occurred. See https://github.com/styled-components/styled-components/blob/master/packages/styled-components/src/utils/errors.md#' + code + ' for more information.' + (interpolations.length > 0 ? ' Additional arguments: ' + interpolations.join(', ') : '')));
    } else { var _this; }
    return possibleConstructorReturn(_this);
  }

  return StyledComponentsError;
}(Error);

// 
var SC_COMPONENT_ID = /^[^\S\n]*?\/\* sc-component-id:\s*(\S+)\s+\*\//gm;

var extractComps = (function (maybeCSS) {
  var css = '' + (maybeCSS || ''); // Definitely a string, and a clone
  var existingComponents = [];
  css.replace(SC_COMPONENT_ID, function (match, componentId, matchIndex) {
    existingComponents.push({ componentId: componentId, matchIndex: matchIndex });
    return match;
  });
  return existingComponents.map(function (_ref, i) {
    var componentId = _ref.componentId,
        matchIndex = _ref.matchIndex;

    var nextComp = existingComponents[i + 1];
    var cssFromDOM = nextComp ? css.slice(matchIndex, nextComp.matchIndex) : css.slice(matchIndex);
    return { componentId: componentId, cssFromDOM: cssFromDOM };
  });
});

// 

var COMMENT_REGEX = /^\s*\/\/.*$/gm;

// NOTE: This stylis instance is only used to split rules from SSR'd style tags
var stylisSplitter = new stylis_stylis_min__WEBPACK_IMPORTED_MODULE_0___default.a({
  global: false,
  cascade: true,
  keyframe: false,
  prefix: false,
  compress: false,
  semicolon: true
});

var stylis = new stylis_stylis_min__WEBPACK_IMPORTED_MODULE_0___default.a({
  global: false,
  cascade: true,
  keyframe: false,
  prefix: true,
  compress: false,
  semicolon: false // NOTE: This means "autocomplete missing semicolons"
});

// Wrap `insertRulePlugin to build a list of rules,
// and then make our own plugin to return the rules. This
// makes it easier to hook into the existing SSR architecture

var parsingRules = [];

// eslint-disable-next-line consistent-return
var returnRulesPlugin = function returnRulesPlugin(context) {
  if (context === -2) {
    var parsedRules = parsingRules;
    parsingRules = [];
    return parsedRules;
  }
};

var parseRulesPlugin = stylis_rule_sheet__WEBPACK_IMPORTED_MODULE_1___default()(function (rule) {
  parsingRules.push(rule);
});

var _componentId = void 0;
var _selector = void 0;
var _selectorRegexp = void 0;

var selfReferenceReplacer = function selfReferenceReplacer(match, offset, string) {
  if (
  // the first self-ref is always untouched
  offset > 0 &&
  // there should be at least two self-refs to do a replacement (.b > .b)
  string.slice(0, offset).indexOf(_selector) !== -1 &&
  // no consecutive self refs (.b.b); that is a precedence boost and treated differently
  string.slice(offset - _selector.length, offset) !== _selector) {
    return '.' + _componentId;
  }

  return match;
};

/**
 * When writing a style like
 *
 * & + & {
 *   color: red;
 * }
 *
 * The second ampersand should be a reference to the static component class. stylis
 * has no knowledge of static class so we have to intelligently replace the base selector.
 */
var selfReferenceReplacementPlugin = function selfReferenceReplacementPlugin(context, _, selectors) {
  if (context === 2 && selectors.length && selectors[0].lastIndexOf(_selector) > 0) {
    // eslint-disable-next-line no-param-reassign
    selectors[0] = selectors[0].replace(_selectorRegexp, selfReferenceReplacer);
  }
};

stylis.use([selfReferenceReplacementPlugin, parseRulesPlugin, returnRulesPlugin]);
stylisSplitter.use([parseRulesPlugin, returnRulesPlugin]);

var splitByRules = function splitByRules(css) {
  return stylisSplitter('', css);
};

function stringifyRules(rules, selector, prefix) {
  var componentId = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '&';

  var flatCSS = rules.join('').replace(COMMENT_REGEX, ''); // replace JS comments

  var cssStr = selector && prefix ? prefix + ' ' + selector + ' { ' + flatCSS + ' }' : flatCSS;

  // stylis has no concept of state to be passed to plugins
  // but since JS is single=threaded, we can rely on that to ensure
  // these properties stay in sync with the current stylis run
  _componentId = componentId;
  _selector = selector;
  _selectorRegexp = new RegExp('\\' + _selector + '\\b', 'g');

  return stylis(prefix || !selector ? '' : selector, cssStr);
}

// 
/* eslint-disable camelcase, no-undef */

var getNonce = (function () {
  return  true ? __webpack_require__.nc : undefined;
});

// 
/* These are helpers for the StyleTags to keep track of the injected
 * rule names for each (component) ID that they're keeping track of.
 * They're crucial for detecting whether a name has already been
 * injected.
 * (This excludes rehydrated names) */

/* adds a new ID:name pairing to a names dictionary */
var addNameForId = function addNameForId(names, id, name) {
  if (name) {
    // eslint-disable-next-line no-param-reassign
    var namesForId = names[id] || (names[id] = Object.create(null));
    namesForId[name] = true;
  }
};

/* resets an ID entirely by overwriting it in the dictionary */
var resetIdNames = function resetIdNames(names, id) {
  // eslint-disable-next-line no-param-reassign
  names[id] = Object.create(null);
};

/* factory for a names dictionary checking the existance of an ID:name pairing */
var hasNameForId = function hasNameForId(names) {
  return function (id, name) {
    return names[id] !== undefined && names[id][name];
  };
};

/* stringifies names for the html/element output */
var stringifyNames = function stringifyNames(names) {
  var str = '';
  // eslint-disable-next-line guard-for-in
  for (var id in names) {
    str += Object.keys(names[id]).join(' ') + ' ';
  }
  return str.trim();
};

/* clones the nested names dictionary */
var cloneNames = function cloneNames(names) {
  var clone = Object.create(null);
  // eslint-disable-next-line guard-for-in
  for (var id in names) {
    clone[id] = _extends({}, names[id]);
  }
  return clone;
};

// 

/* These are helpers that deal with the insertRule (aka speedy) API
 * They are used in the StyleTags and specifically the speedy tag
 */

/* retrieve a sheet for a given style tag */
var sheetForTag = function sheetForTag(tag) {
  // $FlowFixMe
  if (tag.sheet) return tag.sheet;

  /* Firefox quirk requires us to step through all stylesheets to find one owned by the given tag */
  var size = tag.ownerDocument.styleSheets.length;
  for (var i = 0; i < size; i += 1) {
    var sheet = tag.ownerDocument.styleSheets[i];
    // $FlowFixMe
    if (sheet.ownerNode === tag) return sheet;
  }

  /* we should always be able to find a tag */
  throw new StyledComponentsError(10);
};

/* insert a rule safely and return whether it was actually injected */
var safeInsertRule = function safeInsertRule(sheet, cssRule, index) {
  /* abort early if cssRule string is falsy */
  if (!cssRule) return false;

  var maxIndex = sheet.cssRules.length;

  try {
    /* use insertRule and cap passed index with maxIndex (no of cssRules) */
    sheet.insertRule(cssRule, index <= maxIndex ? index : maxIndex);
  } catch (err) {
    /* any error indicates an invalid rule */
    return false;
  }

  return true;
};

/* deletes `size` rules starting from `removalIndex` */
var deleteRules = function deleteRules(sheet, removalIndex, size) {
  var lowerBound = removalIndex - size;
  for (var i = removalIndex; i > lowerBound; i -= 1) {
    sheet.deleteRule(i);
  }
};

// 

/* this marker separates component styles and is important for rehydration */
var makeTextMarker = function makeTextMarker(id) {
  return '\n/* sc-component-id: ' + id + ' */\n';
};

/* add up all numbers in array up until and including the index */
var addUpUntilIndex = function addUpUntilIndex(sizes, index) {
  var totalUpToIndex = 0;
  for (var i = 0; i <= index; i += 1) {
    totalUpToIndex += sizes[i];
  }

  return totalUpToIndex;
};

/* create a new style tag after lastEl */
var makeStyleTag = function makeStyleTag(target, tagEl, insertBefore) {
  var targetDocument = document;
  if (target) targetDocument = target.ownerDocument;else if (tagEl) targetDocument = tagEl.ownerDocument;

  var el = targetDocument.createElement('style');
  el.setAttribute(SC_ATTR, '');
  el.setAttribute(SC_VERSION_ATTR, "4.4.0");

  var nonce = getNonce();
  if (nonce) {
    el.setAttribute('nonce', nonce);
  }

  /* Work around insertRule quirk in EdgeHTML */
  el.appendChild(targetDocument.createTextNode(''));

  if (target && !tagEl) {
    /* Append to target when no previous element was passed */
    target.appendChild(el);
  } else {
    if (!tagEl || !target || !tagEl.parentNode) {
      throw new StyledComponentsError(6);
    }

    /* Insert new style tag after the previous one */
    tagEl.parentNode.insertBefore(el, insertBefore ? tagEl : tagEl.nextSibling);
  }

  return el;
};

/* takes a css factory function and outputs an html styled tag factory */
var wrapAsHtmlTag = function wrapAsHtmlTag(css, names) {
  return function (additionalAttrs) {
    var nonce = getNonce();
    var attrs = [nonce && 'nonce="' + nonce + '"', SC_ATTR + '="' + stringifyNames(names) + '"', SC_VERSION_ATTR + '="' + "4.4.0" + '"', additionalAttrs];

    var htmlAttr = attrs.filter(Boolean).join(' ');
    return '<style ' + htmlAttr + '>' + css() + '</style>';
  };
};

/* takes a css factory function and outputs an element factory */
var wrapAsElement = function wrapAsElement(css, names) {
  return function () {
    var _props;

    var props = (_props = {}, _props[SC_ATTR] = stringifyNames(names), _props[SC_VERSION_ATTR] = "4.4.0", _props);

    var nonce = getNonce();
    if (nonce) {
      // $FlowFixMe
      props.nonce = nonce;
    }

    // eslint-disable-next-line react/no-danger
    return react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement('style', _extends({}, props, { dangerouslySetInnerHTML: { __html: css() } }));
  };
};

var getIdsFromMarkersFactory = function getIdsFromMarkersFactory(markers) {
  return function () {
    return Object.keys(markers);
  };
};

/* speedy tags utilise insertRule */
var makeSpeedyTag = function makeSpeedyTag(el, getImportRuleTag) {
  var names = Object.create(null);
  var markers = Object.create(null);
  var sizes = [];

  var extractImport = getImportRuleTag !== undefined;
  /* indicates whether getImportRuleTag was called */
  var usedImportRuleTag = false;

  var insertMarker = function insertMarker(id) {
    var prev = markers[id];
    if (prev !== undefined) {
      return prev;
    }

    markers[id] = sizes.length;
    sizes.push(0);
    resetIdNames(names, id);

    return markers[id];
  };

  var insertRules = function insertRules(id, cssRules, name) {
    var marker = insertMarker(id);
    var sheet = sheetForTag(el);
    var insertIndex = addUpUntilIndex(sizes, marker);

    var injectedRules = 0;
    var importRules = [];
    var cssRulesSize = cssRules.length;

    for (var i = 0; i < cssRulesSize; i += 1) {
      var cssRule = cssRules[i];
      var mayHaveImport = extractImport; /* @import rules are reordered to appear first */
      if (mayHaveImport && cssRule.indexOf('@import') !== -1) {
        importRules.push(cssRule);
      } else if (safeInsertRule(sheet, cssRule, insertIndex + injectedRules)) {
        mayHaveImport = false;
        injectedRules += 1;
      }
    }

    if (extractImport && importRules.length > 0) {
      usedImportRuleTag = true;
      // $FlowFixMe
      getImportRuleTag().insertRules(id + '-import', importRules);
    }

    sizes[marker] += injectedRules; /* add up no of injected rules */
    addNameForId(names, id, name);
  };

  var removeRules = function removeRules(id) {
    var marker = markers[id];
    if (marker === undefined) return;
    // $FlowFixMe
    if (el.isConnected === false) return;

    var size = sizes[marker];
    var sheet = sheetForTag(el);
    var removalIndex = addUpUntilIndex(sizes, marker) - 1;
    deleteRules(sheet, removalIndex, size);
    sizes[marker] = 0;
    resetIdNames(names, id);

    if (extractImport && usedImportRuleTag) {
      // $FlowFixMe
      getImportRuleTag().removeRules(id + '-import');
    }
  };

  var css = function css() {
    var _sheetForTag = sheetForTag(el),
        cssRules = _sheetForTag.cssRules;

    var str = '';

    // eslint-disable-next-line guard-for-in
    for (var id in markers) {
      str += makeTextMarker(id);
      var marker = markers[id];
      var end = addUpUntilIndex(sizes, marker);
      var size = sizes[marker];
      for (var i = end - size; i < end; i += 1) {
        var rule = cssRules[i];
        if (rule !== undefined) {
          str += rule.cssText;
        }
      }
    }

    return str;
  };

  return {
    clone: function clone() {
      throw new StyledComponentsError(5);
    },

    css: css,
    getIds: getIdsFromMarkersFactory(markers),
    hasNameForId: hasNameForId(names),
    insertMarker: insertMarker,
    insertRules: insertRules,
    removeRules: removeRules,
    sealed: false,
    styleTag: el,
    toElement: wrapAsElement(css, names),
    toHTML: wrapAsHtmlTag(css, names)
  };
};

var makeTextNode = function makeTextNode(targetDocument, id) {
  return targetDocument.createTextNode(makeTextMarker(id));
};

var makeBrowserTag = function makeBrowserTag(el, getImportRuleTag) {
  var names = Object.create(null);
  var markers = Object.create(null);

  var extractImport = getImportRuleTag !== undefined;

  /* indicates whether getImportRuleTag was called */
  var usedImportRuleTag = false;

  var insertMarker = function insertMarker(id) {
    var prev = markers[id];
    if (prev !== undefined) {
      return prev;
    }

    markers[id] = makeTextNode(el.ownerDocument, id);
    el.appendChild(markers[id]);
    names[id] = Object.create(null);

    return markers[id];
  };

  var insertRules = function insertRules(id, cssRules, name) {
    var marker = insertMarker(id);
    var importRules = [];
    var cssRulesSize = cssRules.length;

    for (var i = 0; i < cssRulesSize; i += 1) {
      var rule = cssRules[i];
      var mayHaveImport = extractImport;
      if (mayHaveImport && rule.indexOf('@import') !== -1) {
        importRules.push(rule);
      } else {
        mayHaveImport = false;
        var separator = i === cssRulesSize - 1 ? '' : ' ';
        marker.appendData('' + rule + separator);
      }
    }

    addNameForId(names, id, name);

    if (extractImport && importRules.length > 0) {
      usedImportRuleTag = true;
      // $FlowFixMe
      getImportRuleTag().insertRules(id + '-import', importRules);
    }
  };

  var removeRules = function removeRules(id) {
    var marker = markers[id];
    if (marker === undefined) return;

    /* create new empty text node and replace the current one */
    var newMarker = makeTextNode(el.ownerDocument, id);
    el.replaceChild(newMarker, marker);
    markers[id] = newMarker;
    resetIdNames(names, id);

    if (extractImport && usedImportRuleTag) {
      // $FlowFixMe
      getImportRuleTag().removeRules(id + '-import');
    }
  };

  var css = function css() {
    var str = '';

    // eslint-disable-next-line guard-for-in
    for (var id in markers) {
      str += markers[id].data;
    }

    return str;
  };

  return {
    clone: function clone() {
      throw new StyledComponentsError(5);
    },

    css: css,
    getIds: getIdsFromMarkersFactory(markers),
    hasNameForId: hasNameForId(names),
    insertMarker: insertMarker,
    insertRules: insertRules,
    removeRules: removeRules,
    sealed: false,
    styleTag: el,
    toElement: wrapAsElement(css, names),
    toHTML: wrapAsHtmlTag(css, names)
  };
};

var makeServerTag = function makeServerTag(namesArg, markersArg) {
  var names = namesArg === undefined ? Object.create(null) : namesArg;
  var markers = markersArg === undefined ? Object.create(null) : markersArg;

  var insertMarker = function insertMarker(id) {
    var prev = markers[id];
    if (prev !== undefined) {
      return prev;
    }

    return markers[id] = [''];
  };

  var insertRules = function insertRules(id, cssRules, name) {
    var marker = insertMarker(id);
    marker[0] += cssRules.join(' ');
    addNameForId(names, id, name);
  };

  var removeRules = function removeRules(id) {
    var marker = markers[id];
    if (marker === undefined) return;
    marker[0] = '';
    resetIdNames(names, id);
  };

  var css = function css() {
    var str = '';
    // eslint-disable-next-line guard-for-in
    for (var id in markers) {
      var cssForId = markers[id][0];
      if (cssForId) {
        str += makeTextMarker(id) + cssForId;
      }
    }
    return str;
  };

  var clone = function clone() {
    var namesClone = cloneNames(names);
    var markersClone = Object.create(null);

    // eslint-disable-next-line guard-for-in
    for (var id in markers) {
      markersClone[id] = [markers[id][0]];
    }

    return makeServerTag(namesClone, markersClone);
  };

  var tag = {
    clone: clone,
    css: css,
    getIds: getIdsFromMarkersFactory(markers),
    hasNameForId: hasNameForId(names),
    insertMarker: insertMarker,
    insertRules: insertRules,
    removeRules: removeRules,
    sealed: false,
    styleTag: null,
    toElement: wrapAsElement(css, names),
    toHTML: wrapAsHtmlTag(css, names)
  };

  return tag;
};

var makeTag = function makeTag(target, tagEl, forceServer, insertBefore, getImportRuleTag) {
  if (IS_BROWSER && !forceServer) {
    var el = makeStyleTag(target, tagEl, insertBefore);

    if (DISABLE_SPEEDY) {
      return makeBrowserTag(el, getImportRuleTag);
    } else {
      return makeSpeedyTag(el, getImportRuleTag);
    }
  }

  return makeServerTag();
};

var rehydrate = function rehydrate(tag, els, extracted) {
  /* add all extracted components to the new tag */
  for (var i = 0, len = extracted.length; i < len; i += 1) {
    var _extracted$i = extracted[i],
        componentId = _extracted$i.componentId,
        cssFromDOM = _extracted$i.cssFromDOM;

    var cssRules = splitByRules(cssFromDOM);
    tag.insertRules(componentId, cssRules);
  }

  /* remove old HTMLStyleElements, since they have been rehydrated */
  for (var _i = 0, _len = els.length; _i < _len; _i += 1) {
    var el = els[_i];
    if (el.parentNode) {
      el.parentNode.removeChild(el);
    }
  }
};

// 

var SPLIT_REGEX = /\s+/;

/* determine the maximum number of components before tags are sharded */
var MAX_SIZE = void 0;
if (IS_BROWSER) {
  /* in speedy mode we can keep a lot more rules in a sheet before a slowdown can be expected */
  MAX_SIZE = DISABLE_SPEEDY ? 40 : 1000;
} else {
  /* for servers we do not need to shard at all */
  MAX_SIZE = -1;
}

var sheetRunningId = 0;
var master = void 0;

var StyleSheet = function () {

  /* a map from ids to tags */

  /* deferred rules for a given id */

  /* this is used for not reinjecting rules via hasNameForId() */

  /* when rules for an id are removed using remove() we have to ignore rehydratedNames for it */

  /* a list of tags belonging to this StyleSheet */

  /* a tag for import rules */

  /* current capacity until a new tag must be created */

  /* children (aka clones) of this StyleSheet inheriting all and future injections */

  function StyleSheet() {
    var _this = this;

    var target = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : IS_BROWSER ? document.head : null;
    var forceServer = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    classCallCheck(this, StyleSheet);

    this.getImportRuleTag = function () {
      var importRuleTag = _this.importRuleTag;

      if (importRuleTag !== undefined) {
        return importRuleTag;
      }

      var firstTag = _this.tags[0];
      var insertBefore = true;

      return _this.importRuleTag = makeTag(_this.target, firstTag ? firstTag.styleTag : null, _this.forceServer, insertBefore);
    };

    sheetRunningId += 1;
    this.id = sheetRunningId;
    this.forceServer = forceServer;
    this.target = forceServer ? null : target;
    this.tagMap = {};
    this.deferred = {};
    this.rehydratedNames = {};
    this.ignoreRehydratedNames = {};
    this.tags = [];
    this.capacity = 1;
    this.clones = [];
  }

  /* rehydrate all SSR'd style tags */


  StyleSheet.prototype.rehydrate = function rehydrate$$1() {
    if (!IS_BROWSER || this.forceServer) return this;

    var els = [];
    var extracted = [];
    var isStreamed = false;

    /* retrieve all of our SSR style elements from the DOM */
    var nodes = document.querySelectorAll('style[' + SC_ATTR + '][' + SC_VERSION_ATTR + '="' + "4.4.0" + '"]');

    var nodesSize = nodes.length;

    /* abort rehydration if no previous style tags were found */
    if (!nodesSize) return this;

    for (var i = 0; i < nodesSize; i += 1) {
      var el = nodes[i];

      /* check if style tag is a streamed tag */
      if (!isStreamed) isStreamed = !!el.getAttribute(SC_STREAM_ATTR);

      /* retrieve all component names */
      var elNames = (el.getAttribute(SC_ATTR) || '').trim().split(SPLIT_REGEX);
      var elNamesSize = elNames.length;
      for (var j = 0, name; j < elNamesSize; j += 1) {
        name = elNames[j];
        /* add rehydrated name to sheet to avoid re-adding styles */
        this.rehydratedNames[name] = true;
      }

      /* extract all components and their CSS */
      extracted.push.apply(extracted, extractComps(el.textContent));

      /* store original HTMLStyleElement */
      els.push(el);
    }

    /* abort rehydration if nothing was extracted */
    var extractedSize = extracted.length;
    if (!extractedSize) return this;

    /* create a tag to be used for rehydration */
    var tag = this.makeTag(null);

    rehydrate(tag, els, extracted);

    /* reset capacity and adjust MAX_SIZE by the initial size of the rehydration */
    this.capacity = Math.max(1, MAX_SIZE - extractedSize);
    this.tags.push(tag);

    /* retrieve all component ids */
    for (var _j = 0; _j < extractedSize; _j += 1) {
      this.tagMap[extracted[_j].componentId] = tag;
    }

    return this;
  };

  /* retrieve a "master" instance of StyleSheet which is typically used when no other is available
   * The master StyleSheet is targeted by createGlobalStyle, keyframes, and components outside of any
    * StyleSheetManager's context */


  /* reset the internal "master" instance */
  StyleSheet.reset = function reset() {
    var forceServer = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

    master = new StyleSheet(undefined, forceServer).rehydrate();
  };

  /* adds "children" to the StyleSheet that inherit all of the parents' rules
   * while their own rules do not affect the parent */


  StyleSheet.prototype.clone = function clone() {
    var sheet = new StyleSheet(this.target, this.forceServer);

    /* add to clone array */
    this.clones.push(sheet);

    /* clone all tags */
    sheet.tags = this.tags.map(function (tag) {
      var ids = tag.getIds();
      var newTag = tag.clone();

      /* reconstruct tagMap */
      for (var i = 0; i < ids.length; i += 1) {
        sheet.tagMap[ids[i]] = newTag;
      }

      return newTag;
    });

    /* clone other maps */
    sheet.rehydratedNames = _extends({}, this.rehydratedNames);
    sheet.deferred = _extends({}, this.deferred);

    return sheet;
  };

  /* force StyleSheet to create a new tag on the next injection */


  StyleSheet.prototype.sealAllTags = function sealAllTags() {
    this.capacity = 1;

    this.tags.forEach(function (tag) {
      // eslint-disable-next-line no-param-reassign
      tag.sealed = true;
    });
  };

  StyleSheet.prototype.makeTag = function makeTag$$1(tag) {
    var lastEl = tag ? tag.styleTag : null;
    var insertBefore = false;

    return makeTag(this.target, lastEl, this.forceServer, insertBefore, this.getImportRuleTag);
  };

  /* get a tag for a given componentId, assign the componentId to one, or shard */
  StyleSheet.prototype.getTagForId = function getTagForId(id) {
    /* simply return a tag, when the componentId was already assigned one */
    var prev = this.tagMap[id];
    if (prev !== undefined && !prev.sealed) {
      return prev;
    }

    var tag = this.tags[this.tags.length - 1];

    /* shard (create a new tag) if the tag is exhausted (See MAX_SIZE) */
    this.capacity -= 1;

    if (this.capacity === 0) {
      this.capacity = MAX_SIZE;
      tag = this.makeTag(tag);
      this.tags.push(tag);
    }

    return this.tagMap[id] = tag;
  };

  /* mainly for createGlobalStyle to check for its id */


  StyleSheet.prototype.hasId = function hasId(id) {
    return this.tagMap[id] !== undefined;
  };

  /* caching layer checking id+name to already have a corresponding tag and injected rules */


  StyleSheet.prototype.hasNameForId = function hasNameForId(id, name) {
    /* exception for rehydrated names which are checked separately */
    if (this.ignoreRehydratedNames[id] === undefined && this.rehydratedNames[name]) {
      return true;
    }

    var tag = this.tagMap[id];
    return tag !== undefined && tag.hasNameForId(id, name);
  };

  /* registers a componentId and registers it on its tag */


  StyleSheet.prototype.deferredInject = function deferredInject(id, cssRules) {
    /* don't inject when the id is already registered */
    if (this.tagMap[id] !== undefined) return;

    var clones = this.clones;

    for (var i = 0; i < clones.length; i += 1) {
      clones[i].deferredInject(id, cssRules);
    }

    this.getTagForId(id).insertMarker(id);
    this.deferred[id] = cssRules;
  };

  /* injects rules for a given id with a name that will need to be cached */


  StyleSheet.prototype.inject = function inject(id, cssRules, name) {
    var clones = this.clones;


    for (var i = 0; i < clones.length; i += 1) {
      clones[i].inject(id, cssRules, name);
    }

    var tag = this.getTagForId(id);

    /* add deferred rules for component */
    if (this.deferred[id] !== undefined) {
      // Combine passed cssRules with previously deferred CSS rules
      // NOTE: We cannot mutate the deferred array itself as all clones
      // do the same (see clones[i].inject)
      var rules = this.deferred[id].concat(cssRules);
      tag.insertRules(id, rules, name);

      this.deferred[id] = undefined;
    } else {
      tag.insertRules(id, cssRules, name);
    }
  };

  /* removes all rules for a given id, which doesn't remove its marker but resets it */


  StyleSheet.prototype.remove = function remove(id) {
    var tag = this.tagMap[id];
    if (tag === undefined) return;

    var clones = this.clones;

    for (var i = 0; i < clones.length; i += 1) {
      clones[i].remove(id);
    }

    /* remove all rules from the tag */
    tag.removeRules(id);

    /* ignore possible rehydrated names */
    this.ignoreRehydratedNames[id] = true;

    /* delete possible deferred rules */
    this.deferred[id] = undefined;
  };

  StyleSheet.prototype.toHTML = function toHTML() {
    return this.tags.map(function (tag) {
      return tag.toHTML();
    }).join('');
  };

  StyleSheet.prototype.toReactElements = function toReactElements() {
    var id = this.id;


    return this.tags.map(function (tag, i) {
      var key = 'sc-' + id + '-' + i;
      return Object(react__WEBPACK_IMPORTED_MODULE_2__["cloneElement"])(tag.toElement(), { key: key });
    });
  };

  createClass(StyleSheet, null, [{
    key: 'master',
    get: function get$$1() {
      return master || (master = new StyleSheet().rehydrate());
    }

    /* NOTE: This is just for backwards-compatibility with jest-styled-components */

  }, {
    key: 'instance',
    get: function get$$1() {
      return StyleSheet.master;
    }
  }]);
  return StyleSheet;
}();

// 

var Keyframes = function () {
  function Keyframes(name, rules) {
    var _this = this;

    classCallCheck(this, Keyframes);

    this.inject = function (styleSheet) {
      if (!styleSheet.hasNameForId(_this.id, _this.name)) {
        styleSheet.inject(_this.id, _this.rules, _this.name);
      }
    };

    this.toString = function () {
      throw new StyledComponentsError(12, String(_this.name));
    };

    this.name = name;
    this.rules = rules;

    this.id = 'sc-keyframes-' + name;
  }

  Keyframes.prototype.getName = function getName() {
    return this.name;
  };

  return Keyframes;
}();

// 

/**
 * inlined version of
 * https://github.com/facebook/fbjs/blob/master/packages/fbjs/src/core/hyphenateStyleName.js
 */

var uppercasePattern = /([A-Z])/g;
var msPattern = /^ms-/;

/**
 * Hyphenates a camelcased CSS property name, for example:
 *
 *   > hyphenateStyleName('backgroundColor')
 *   < "background-color"
 *   > hyphenateStyleName('MozTransition')
 *   < "-moz-transition"
 *   > hyphenateStyleName('msTransition')
 *   < "-ms-transition"
 *
 * As Modernizr suggests (http://modernizr.com/docs/#prefixed), an `ms` prefix
 * is converted to `-ms-`.
 *
 * @param {string} string
 * @return {string}
 */
function hyphenateStyleName(string) {
  return string.replace(uppercasePattern, '-$1').toLowerCase().replace(msPattern, '-ms-');
}

// 

// Taken from https://github.com/facebook/react/blob/b87aabdfe1b7461e7331abb3601d9e6bb27544bc/packages/react-dom/src/shared/dangerousStyleValue.js
function addUnitIfNeeded(name, value) {
  // https://github.com/amilajack/eslint-plugin-flowtype-errors/issues/133
  // $FlowFixMe
  if (value == null || typeof value === 'boolean' || value === '') {
    return '';
  }

  if (typeof value === 'number' && value !== 0 && !(name in _emotion_unitless__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"])) {
    return value + 'px'; // Presumes implicit 'px' suffix for unitless numbers
  }

  return String(value).trim();
}

// 

/**
 * It's falsish not falsy because 0 is allowed.
 */
var isFalsish = function isFalsish(chunk) {
  return chunk === undefined || chunk === null || chunk === false || chunk === '';
};

var objToCssArray = function objToCssArray(obj, prevKey) {
  var rules = [];
  var keys = Object.keys(obj);

  keys.forEach(function (key) {
    if (!isFalsish(obj[key])) {
      if (isPlainObject(obj[key])) {
        rules.push.apply(rules, objToCssArray(obj[key], key));

        return rules;
      } else if (isFunction(obj[key])) {
        rules.push(hyphenateStyleName(key) + ':', obj[key], ';');

        return rules;
      }
      rules.push(hyphenateStyleName(key) + ': ' + addUnitIfNeeded(key, obj[key]) + ';');
    }
    return rules;
  });

  return prevKey ? [prevKey + ' {'].concat(rules, ['}']) : rules;
};

function flatten(chunk, executionContext, styleSheet) {
  if (Array.isArray(chunk)) {
    var ruleSet = [];

    for (var i = 0, len = chunk.length, result; i < len; i += 1) {
      result = flatten(chunk[i], executionContext, styleSheet);

      if (result === null) continue;else if (Array.isArray(result)) ruleSet.push.apply(ruleSet, result);else ruleSet.push(result);
    }

    return ruleSet;
  }

  if (isFalsish(chunk)) {
    return null;
  }

  /* Handle other components */
  if (isStyledComponent(chunk)) {
    return '.' + chunk.styledComponentId;
  }

  /* Either execute or defer the function */
  if (isFunction(chunk)) {
    if (isStatelessFunction(chunk) && executionContext) {
      var _result = chunk(executionContext);

      if (false) {}

      return flatten(_result, executionContext, styleSheet);
    } else return chunk;
  }

  if (chunk instanceof Keyframes) {
    if (styleSheet) {
      chunk.inject(styleSheet);
      return chunk.getName();
    } else return chunk;
  }

  /* Handle objects */
  return isPlainObject(chunk) ? objToCssArray(chunk) : chunk.toString();
}

// 

function css(styles) {
  for (var _len = arguments.length, interpolations = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    interpolations[_key - 1] = arguments[_key];
  }

  if (isFunction(styles) || isPlainObject(styles)) {
    // $FlowFixMe
    return flatten(interleave(EMPTY_ARRAY, [styles].concat(interpolations)));
  }

  // $FlowFixMe
  return flatten(interleave(styles, interpolations));
}

// 

function constructWithOptions(componentConstructor, tag) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : EMPTY_OBJECT;

  if (!Object(react_is__WEBPACK_IMPORTED_MODULE_4__["isValidElementType"])(tag)) {
    throw new StyledComponentsError(1, String(tag));
  }

  /* This is callable directly as a template function */
  // $FlowFixMe: Not typed to avoid destructuring arguments
  var templateFunction = function templateFunction() {
    return componentConstructor(tag, options, css.apply(undefined, arguments));
  };

  /* If config methods are called, wrap up a new template function and merge options */
  templateFunction.withConfig = function (config) {
    return constructWithOptions(componentConstructor, tag, _extends({}, options, config));
  };

  /* Modify/inject new props at runtime */
  templateFunction.attrs = function (attrs) {
    return constructWithOptions(componentConstructor, tag, _extends({}, options, {
      attrs: Array.prototype.concat(options.attrs, attrs).filter(Boolean)
    }));
  };

  return templateFunction;
}

// 
// Source: https://github.com/garycourt/murmurhash-js/blob/master/murmurhash2_gc.js
function murmurhash(c) {
  for (var e = c.length | 0, a = e | 0, d = 0, b; e >= 4;) {
    b = c.charCodeAt(d) & 255 | (c.charCodeAt(++d) & 255) << 8 | (c.charCodeAt(++d) & 255) << 16 | (c.charCodeAt(++d) & 255) << 24, b = 1540483477 * (b & 65535) + ((1540483477 * (b >>> 16) & 65535) << 16), b ^= b >>> 24, b = 1540483477 * (b & 65535) + ((1540483477 * (b >>> 16) & 65535) << 16), a = 1540483477 * (a & 65535) + ((1540483477 * (a >>> 16) & 65535) << 16) ^ b, e -= 4, ++d;
  }
  switch (e) {
    case 3:
      a ^= (c.charCodeAt(d + 2) & 255) << 16;
    case 2:
      a ^= (c.charCodeAt(d + 1) & 255) << 8;
    case 1:
      a ^= c.charCodeAt(d) & 255, a = 1540483477 * (a & 65535) + ((1540483477 * (a >>> 16) & 65535) << 16);
  }
  a ^= a >>> 13;
  a = 1540483477 * (a & 65535) + ((1540483477 * (a >>> 16) & 65535) << 16);
  return (a ^ a >>> 15) >>> 0;
}

// 
/* eslint-disable no-bitwise */

/* This is the "capacity" of our alphabet i.e. 2x26 for all letters plus their capitalised
 * counterparts */
var charsLength = 52;

/* start at 75 for 'a' until 'z' (25) and then start at 65 for capitalised letters */
var getAlphabeticChar = function getAlphabeticChar(code) {
  return String.fromCharCode(code + (code > 25 ? 39 : 97));
};

/* input a number, usually a hash and convert it to base-52 */
function generateAlphabeticName(code) {
  var name = '';
  var x = void 0;

  /* get a char and divide by alphabet-length */
  for (x = code; x > charsLength; x = Math.floor(x / charsLength)) {
    name = getAlphabeticChar(x % charsLength) + name;
  }

  return getAlphabeticChar(x % charsLength) + name;
}

// 

function hasFunctionObjectKey(obj) {
  // eslint-disable-next-line guard-for-in, no-restricted-syntax
  for (var key in obj) {
    if (isFunction(obj[key])) {
      return true;
    }
  }

  return false;
}

function isStaticRules(rules, attrs) {
  for (var i = 0; i < rules.length; i += 1) {
    var rule = rules[i];

    // recursive case
    if (Array.isArray(rule) && !isStaticRules(rule, attrs)) {
      return false;
    } else if (isFunction(rule) && !isStyledComponent(rule)) {
      // functions are allowed to be static if they're just being
      // used to get the classname of a nested styled component
      return false;
    }
  }

  if (attrs.some(function (x) {
    return isFunction(x) || hasFunctionObjectKey(x);
  })) return false;

  return true;
}

// 

/* combines hashStr (murmurhash) and nameGenerator for convenience */
var hasher = function hasher(str) {
  return generateAlphabeticName(murmurhash(str));
};

/*
 ComponentStyle is all the CSS-specific stuff, not
 the React-specific stuff.
 */

var ComponentStyle = function () {
  function ComponentStyle(rules, attrs, componentId) {
    classCallCheck(this, ComponentStyle);

    this.rules = rules;
    this.isStatic =  true && isStaticRules(rules, attrs);
    this.componentId = componentId;

    if (!StyleSheet.master.hasId(componentId)) {
      StyleSheet.master.deferredInject(componentId, []);
    }
  }

  /*
   * Flattens a rule set into valid CSS
   * Hashes it, wraps the whole chunk in a .hash1234 {}
   * Returns the hash to be injected on render()
   * */


  ComponentStyle.prototype.generateAndInjectStyles = function generateAndInjectStyles(executionContext, styleSheet) {
    var isStatic = this.isStatic,
        componentId = this.componentId,
        lastClassName = this.lastClassName;

    if (IS_BROWSER && isStatic && typeof lastClassName === 'string' && styleSheet.hasNameForId(componentId, lastClassName)) {
      return lastClassName;
    }

    var flatCSS = flatten(this.rules, executionContext, styleSheet);
    var name = hasher(this.componentId + flatCSS.join(''));
    if (!styleSheet.hasNameForId(componentId, name)) {
      styleSheet.inject(this.componentId, stringifyRules(flatCSS, '.' + name, undefined, componentId), name);
    }

    this.lastClassName = name;
    return name;
  };

  ComponentStyle.generateName = function generateName(str) {
    return hasher(str);
  };

  return ComponentStyle;
}();

// 

var LIMIT = 200;

var createWarnTooManyClasses = (function (displayName) {
  var generatedClasses = {};
  var warningSeen = false;

  return function (className) {
    if (!warningSeen) {
      generatedClasses[className] = true;
      if (Object.keys(generatedClasses).length >= LIMIT) {
        // Unable to find latestRule in test environment.
        /* eslint-disable no-console, prefer-template */
        console.warn('Over ' + LIMIT + ' classes were generated for component ' + displayName + '. \n' + 'Consider using the attrs method, together with a style object for frequently changed styles.\n' + 'Example:\n' + '  const Component = styled.div.attrs(props => ({\n' + '    style: {\n' + '      background: props.background,\n' + '    },\n' + '  }))`width: 100%;`\n\n' + '  <Component />');
        warningSeen = true;
        generatedClasses = {};
      }
    }
  };
});

// 

var determineTheme = (function (props, fallbackTheme) {
  var defaultProps = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : EMPTY_OBJECT;

  // Props should take precedence over ThemeProvider, which should take precedence over
  // defaultProps, but React automatically puts defaultProps on props.

  /* eslint-disable react/prop-types, flowtype-errors/show-errors */
  var isDefaultTheme = defaultProps ? props.theme === defaultProps.theme : false;
  var theme = props.theme && !isDefaultTheme ? props.theme : fallbackTheme || defaultProps.theme;
  /* eslint-enable */

  return theme;
});

// 
var escapeRegex = /[[\].#*$><+~=|^:(),"'`-]+/g;
var dashesAtEnds = /(^-|-$)/g;

/**
 * TODO: Explore using CSS.escape when it becomes more available
 * in evergreen browsers.
 */
function escape(str) {
  return str
  // Replace all possible CSS selectors
  .replace(escapeRegex, '-')

  // Remove extraneous hyphens at the start and end
  .replace(dashesAtEnds, '');
}

// 

function isTag(target) {
  return typeof target === 'string' && ( false ? undefined : true);
}

// 

function generateDisplayName(target) {
  // $FlowFixMe
  return isTag(target) ? 'styled.' + target : 'Styled(' + getComponentName(target) + ')';
}

var _TYPE_STATICS;

var REACT_STATICS = {
  childContextTypes: true,
  contextTypes: true,
  defaultProps: true,
  displayName: true,
  getDerivedStateFromProps: true,
  propTypes: true,
  type: true
};

var KNOWN_STATICS = {
  name: true,
  length: true,
  prototype: true,
  caller: true,
  callee: true,
  arguments: true,
  arity: true
};

var TYPE_STATICS = (_TYPE_STATICS = {}, _TYPE_STATICS[react_is__WEBPACK_IMPORTED_MODULE_4__["ForwardRef"]] = {
  $$typeof: true,
  render: true
}, _TYPE_STATICS);

var defineProperty$1 = Object.defineProperty,
    getOwnPropertyNames = Object.getOwnPropertyNames,
    _Object$getOwnPropert = Object.getOwnPropertySymbols,
    getOwnPropertySymbols = _Object$getOwnPropert === undefined ? function () {
  return [];
} : _Object$getOwnPropert,
    getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor,
    getPrototypeOf = Object.getPrototypeOf,
    objectPrototype = Object.prototype;
var arrayPrototype = Array.prototype;


function hoistNonReactStatics(targetComponent, sourceComponent, blacklist) {
  if (typeof sourceComponent !== 'string') {
    // don't hoist over string (html) components

    var inheritedComponent = getPrototypeOf(sourceComponent);

    if (inheritedComponent && inheritedComponent !== objectPrototype) {
      hoistNonReactStatics(targetComponent, inheritedComponent, blacklist);
    }

    var keys = arrayPrototype.concat(getOwnPropertyNames(sourceComponent),
    // $FlowFixMe
    getOwnPropertySymbols(sourceComponent));

    var targetStatics = TYPE_STATICS[targetComponent.$$typeof] || REACT_STATICS;

    var sourceStatics = TYPE_STATICS[sourceComponent.$$typeof] || REACT_STATICS;

    var i = keys.length;
    var descriptor = void 0;
    var key = void 0;

    // eslint-disable-next-line no-plusplus
    while (i--) {
      key = keys[i];

      if (
      // $FlowFixMe
      !KNOWN_STATICS[key] && !(blacklist && blacklist[key]) && !(sourceStatics && sourceStatics[key]) &&
      // $FlowFixMe
      !(targetStatics && targetStatics[key])) {
        descriptor = getOwnPropertyDescriptor(sourceComponent, key);

        if (descriptor) {
          try {
            // Avoid failures from read-only properties
            defineProperty$1(targetComponent, key, descriptor);
          } catch (e) {
            /* fail silently */
          }
        }
      }
    }

    return targetComponent;
  }

  return targetComponent;
}

// 
function isDerivedReactComponent(fn) {
  return !!(fn && fn.prototype && fn.prototype.isReactComponent);
}

// 
// Helper to call a given function, only once
var once = (function (cb) {
  var called = false;

  return function () {
    if (!called) {
      called = true;
      cb.apply(undefined, arguments);
    }
  };
});

// 

var ThemeContext = Object(react__WEBPACK_IMPORTED_MODULE_2__["createContext"])();

var ThemeConsumer = ThemeContext.Consumer;

/**
 * Provide a theme to an entire react component tree via context
 */

var ThemeProvider = function (_Component) {
  inherits(ThemeProvider, _Component);

  function ThemeProvider(props) {
    classCallCheck(this, ThemeProvider);

    var _this = possibleConstructorReturn(this, _Component.call(this, props));

    _this.getContext = Object(memoize_one__WEBPACK_IMPORTED_MODULE_5__[/* default */ "a"])(_this.getContext.bind(_this));
    _this.renderInner = _this.renderInner.bind(_this);
    return _this;
  }

  ThemeProvider.prototype.render = function render() {
    if (!this.props.children) return null;

    return react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(
      ThemeContext.Consumer,
      null,
      this.renderInner
    );
  };

  ThemeProvider.prototype.renderInner = function renderInner(outerTheme) {
    var context = this.getContext(this.props.theme, outerTheme);

    return react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(
      ThemeContext.Provider,
      { value: context },
      this.props.children
    );
  };

  /**
   * Get the theme from the props, supporting both (outerTheme) => {}
   * as well as object notation
   */


  ThemeProvider.prototype.getTheme = function getTheme(theme, outerTheme) {
    if (isFunction(theme)) {
      var mergedTheme = theme(outerTheme);

      if (false) {}

      return mergedTheme;
    }

    if (theme === null || Array.isArray(theme) || (typeof theme === 'undefined' ? 'undefined' : _typeof(theme)) !== 'object') {
      throw new StyledComponentsError(8);
    }

    return _extends({}, outerTheme, theme);
  };

  ThemeProvider.prototype.getContext = function getContext(theme, outerTheme) {
    return this.getTheme(theme, outerTheme);
  };

  return ThemeProvider;
}(react__WEBPACK_IMPORTED_MODULE_2__["Component"]);

// 

var CLOSING_TAG_R = /^\s*<\/[a-z]/i;

var ServerStyleSheet = function () {
  function ServerStyleSheet() {
    classCallCheck(this, ServerStyleSheet);

    /* The master sheet might be reset, so keep a reference here */
    this.masterSheet = StyleSheet.master;
    this.instance = this.masterSheet.clone();
    this.sealed = false;
  }

  /**
   * Mark the ServerStyleSheet as being fully emitted and manually GC it from the
   * StyleSheet singleton.
   */


  ServerStyleSheet.prototype.seal = function seal() {
    if (!this.sealed) {
      /* Remove sealed StyleSheets from the master sheet */
      var index = this.masterSheet.clones.indexOf(this.instance);
      this.masterSheet.clones.splice(index, 1);
      this.sealed = true;
    }
  };

  ServerStyleSheet.prototype.collectStyles = function collectStyles(children) {
    if (this.sealed) {
      throw new StyledComponentsError(2);
    }

    return react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(
      StyleSheetManager,
      { sheet: this.instance },
      children
    );
  };

  ServerStyleSheet.prototype.getStyleTags = function getStyleTags() {
    this.seal();
    return this.instance.toHTML();
  };

  ServerStyleSheet.prototype.getStyleElement = function getStyleElement() {
    this.seal();
    return this.instance.toReactElements();
  };

  ServerStyleSheet.prototype.interleaveWithNodeStream = function interleaveWithNodeStream(readableStream) {
    var _this = this;

    {
      throw new StyledComponentsError(3);
    }

    /* the tag index keeps track of which tags have already been emitted */
    var instance = this.instance;

    var instanceTagIndex = 0;

    var streamAttr = SC_STREAM_ATTR + '="true"';

    var transformer = new stream.Transform({
      transform: function appendStyleChunks(chunk, /* encoding */_, callback) {
        var tags = instance.tags;

        var html = '';

        /* retrieve html for each new style tag */
        for (; instanceTagIndex < tags.length; instanceTagIndex += 1) {
          var tag = tags[instanceTagIndex];
          html += tag.toHTML(streamAttr);
        }

        /* force our StyleSheets to emit entirely new tags */
        instance.sealAllTags();

        var renderedHtml = chunk.toString();

        /* prepend style html to chunk, unless the start of the chunk is a closing tag in which case append right after that */
        if (CLOSING_TAG_R.test(renderedHtml)) {
          var endOfClosingTag = renderedHtml.indexOf('>');

          this.push(renderedHtml.slice(0, endOfClosingTag + 1) + html + renderedHtml.slice(endOfClosingTag + 1));
        } else this.push(html + renderedHtml);

        callback();
      }
    });

    readableStream.on('end', function () {
      return _this.seal();
    });

    readableStream.on('error', function (err) {
      _this.seal();

      // forward the error to the transform stream
      transformer.emit('error', err);
    });

    return readableStream.pipe(transformer);
  };

  return ServerStyleSheet;
}();

// 

var StyleSheetContext = Object(react__WEBPACK_IMPORTED_MODULE_2__["createContext"])();
var StyleSheetConsumer = StyleSheetContext.Consumer;

var StyleSheetManager = function (_Component) {
  inherits(StyleSheetManager, _Component);

  function StyleSheetManager(props) {
    classCallCheck(this, StyleSheetManager);

    var _this = possibleConstructorReturn(this, _Component.call(this, props));

    _this.getContext = Object(memoize_one__WEBPACK_IMPORTED_MODULE_5__[/* default */ "a"])(_this.getContext);
    return _this;
  }

  StyleSheetManager.prototype.getContext = function getContext(sheet, target) {
    if (sheet) {
      return sheet;
    } else if (target) {
      return new StyleSheet(target);
    } else {
      throw new StyledComponentsError(4);
    }
  };

  StyleSheetManager.prototype.render = function render() {
    var _props = this.props,
        children = _props.children,
        sheet = _props.sheet,
        target = _props.target;


    return react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(
      StyleSheetContext.Provider,
      { value: this.getContext(sheet, target) },
       false ? undefined : children
    );
  };

  return StyleSheetManager;
}(react__WEBPACK_IMPORTED_MODULE_2__["Component"]);
 false ? undefined : void 0;

// 

var THEME_PROP_REGEX = /\.theme[.[]/;
var identifiers = {};

/* We depend on components having unique IDs */
function generateId(_ComponentStyle, _displayName, parentComponentId) {
  var displayName = typeof _displayName !== 'string' ? 'sc' : escape(_displayName);

  /**
   * This ensures uniqueness if two components happen to share
   * the same displayName.
   */
  var nr = (identifiers[displayName] || 0) + 1;
  identifiers[displayName] = nr;

  var componentId = displayName + '-' + _ComponentStyle.generateName(displayName + nr);

  return parentComponentId ? parentComponentId + '-' + componentId : componentId;
}

// $FlowFixMe

var StyledComponent = function (_Component) {
  inherits(StyledComponent, _Component);

  function StyledComponent() {
    classCallCheck(this, StyledComponent);

    var _this = possibleConstructorReturn(this, _Component.call(this));

    _this.attrs = {};

    _this.renderOuter = _this.renderOuter.bind(_this);
    _this.renderInner = _this.renderInner.bind(_this);

    if (false) {}
    return _this;
  }

  StyledComponent.prototype.render = function render() {
    return react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(
      StyleSheetConsumer,
      null,
      this.renderOuter
    );
  };

  StyledComponent.prototype.renderOuter = function renderOuter() {
    var styleSheet = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : StyleSheet.master;

    this.styleSheet = styleSheet;

    // No need to subscribe a static component to theme changes, it won't change anything
    if (this.props.forwardedComponent.componentStyle.isStatic) return this.renderInner();

    return react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(
      ThemeConsumer,
      null,
      this.renderInner
    );
  };

  StyledComponent.prototype.renderInner = function renderInner(theme) {
    var _props$forwardedCompo = this.props.forwardedComponent,
        componentStyle = _props$forwardedCompo.componentStyle,
        defaultProps = _props$forwardedCompo.defaultProps,
        displayName = _props$forwardedCompo.displayName,
        foldedComponentIds = _props$forwardedCompo.foldedComponentIds,
        styledComponentId = _props$forwardedCompo.styledComponentId,
        target = _props$forwardedCompo.target,
        usesTheme = _props$forwardedCompo.usesTheme;


    var generatedClassName = void 0;
    var rawTheme = void 0;

    if (componentStyle.isStatic) {
      generatedClassName = this.generateAndInjectStyles(EMPTY_OBJECT, this.props);
    } else {
      rawTheme = determineTheme(this.props, theme, defaultProps);
      generatedClassName = this.generateAndInjectStyles(rawTheme || EMPTY_OBJECT, this.props);

      if (false) {}
    }

    var elementToBeCreated = this.props.as || this.attrs.as || target;
    var isTargetTag = isTag(elementToBeCreated);

    var propsForElement = {};
    var computedProps = _extends({}, this.props, this.attrs);

    var key = void 0;
    // eslint-disable-next-line guard-for-in
    for (key in computedProps) {
      if (false) {}

      if (key === 'forwardedComponent' || key === 'as') {
        continue;
      } else if (key === 'forwardedRef') propsForElement.ref = computedProps[key];else if (key === 'forwardedAs') propsForElement.as = computedProps[key];else if (!isTargetTag || Object(_emotion_is_prop_valid__WEBPACK_IMPORTED_MODULE_7__[/* default */ "a"])(key)) {
        // Don't pass through non HTML tags through to HTML elements
        propsForElement[key] = computedProps[key];
      }
    }

    if (this.props.style && this.attrs.style) {
      propsForElement.style = _extends({}, this.attrs.style, this.props.style);
    }

    propsForElement.className = Array.prototype.concat(foldedComponentIds, styledComponentId, generatedClassName !== styledComponentId ? generatedClassName : null, this.props.className, this.attrs.className).filter(Boolean).join(' ');

    return Object(react__WEBPACK_IMPORTED_MODULE_2__["createElement"])(elementToBeCreated, propsForElement);
  };

  StyledComponent.prototype.buildExecutionContext = function buildExecutionContext(theme, props, attrs) {
    var _this2 = this;

    var context = _extends({}, props, { theme: theme });

    if (!attrs.length) return context;

    this.attrs = {};

    attrs.forEach(function (attrDef) {
      var resolvedAttrDef = attrDef;
      var attrDefWasFn = false;
      var attr = void 0;
      var key = void 0;

      if (isFunction(resolvedAttrDef)) {
        // $FlowFixMe
        resolvedAttrDef = resolvedAttrDef(context);
        attrDefWasFn = true;
      }

      /* eslint-disable guard-for-in */
      // $FlowFixMe
      for (key in resolvedAttrDef) {
        attr = resolvedAttrDef[key];

        if (!attrDefWasFn) {
          if (isFunction(attr) && !isDerivedReactComponent(attr) && !isStyledComponent(attr)) {
            if (false) {}

            attr = attr(context);

            if (false) {}
          }
        }

        _this2.attrs[key] = attr;
        context[key] = attr;
      }
      /* eslint-enable */
    });

    return context;
  };

  StyledComponent.prototype.generateAndInjectStyles = function generateAndInjectStyles(theme, props) {
    var _props$forwardedCompo2 = props.forwardedComponent,
        attrs = _props$forwardedCompo2.attrs,
        componentStyle = _props$forwardedCompo2.componentStyle,
        warnTooManyClasses = _props$forwardedCompo2.warnTooManyClasses;

    // statically styled-components don't need to build an execution context object,
    // and shouldn't be increasing the number of class names

    if (componentStyle.isStatic && !attrs.length) {
      return componentStyle.generateAndInjectStyles(EMPTY_OBJECT, this.styleSheet);
    }

    var className = componentStyle.generateAndInjectStyles(this.buildExecutionContext(theme, props, attrs), this.styleSheet);

    if (false) {}

    return className;
  };

  return StyledComponent;
}(react__WEBPACK_IMPORTED_MODULE_2__["Component"]);

function createStyledComponent(target, options, rules) {
  var isTargetStyledComp = isStyledComponent(target);
  var isClass = !isTag(target);

  var _options$displayName = options.displayName,
      displayName = _options$displayName === undefined ? generateDisplayName(target) : _options$displayName,
      _options$componentId = options.componentId,
      componentId = _options$componentId === undefined ? generateId(ComponentStyle, options.displayName, options.parentComponentId) : _options$componentId,
      _options$ParentCompon = options.ParentComponent,
      ParentComponent = _options$ParentCompon === undefined ? StyledComponent : _options$ParentCompon,
      _options$attrs = options.attrs,
      attrs = _options$attrs === undefined ? EMPTY_ARRAY : _options$attrs;


  var styledComponentId = options.displayName && options.componentId ? escape(options.displayName) + '-' + options.componentId : options.componentId || componentId;

  // fold the underlying StyledComponent attrs up (implicit extend)
  var finalAttrs =
  // $FlowFixMe
  isTargetStyledComp && target.attrs ? Array.prototype.concat(target.attrs, attrs).filter(Boolean) : attrs;

  var componentStyle = new ComponentStyle(isTargetStyledComp ? // fold the underlying StyledComponent rules up (implicit extend)
  // $FlowFixMe
  target.componentStyle.rules.concat(rules) : rules, finalAttrs, styledComponentId);

  /**
   * forwardRef creates a new interim component, which we'll take advantage of
   * instead of extending ParentComponent to create _another_ interim class
   */
  var WrappedStyledComponent = void 0;
  var forwardRef = function forwardRef(props, ref) {
    return react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(ParentComponent, _extends({}, props, { forwardedComponent: WrappedStyledComponent, forwardedRef: ref }));
  };
  forwardRef.displayName = displayName;
  WrappedStyledComponent = react__WEBPACK_IMPORTED_MODULE_2___default.a.forwardRef(forwardRef);
  WrappedStyledComponent.displayName = displayName;

  // $FlowFixMe
  WrappedStyledComponent.attrs = finalAttrs;
  // $FlowFixMe
  WrappedStyledComponent.componentStyle = componentStyle;

  // $FlowFixMe
  WrappedStyledComponent.foldedComponentIds = isTargetStyledComp ? // $FlowFixMe
  Array.prototype.concat(target.foldedComponentIds, target.styledComponentId) : EMPTY_ARRAY;

  // $FlowFixMe
  WrappedStyledComponent.styledComponentId = styledComponentId;

  // fold the underlying StyledComponent target up since we folded the styles
  // $FlowFixMe
  WrappedStyledComponent.target = isTargetStyledComp ? target.target : target;

  // $FlowFixMe
  WrappedStyledComponent.withComponent = function withComponent(tag) {
    var previousComponentId = options.componentId,
        optionsToCopy = objectWithoutProperties(options, ['componentId']);


    var newComponentId = previousComponentId && previousComponentId + '-' + (isTag(tag) ? tag : escape(getComponentName(tag)));

    var newOptions = _extends({}, optionsToCopy, {
      attrs: finalAttrs,
      componentId: newComponentId,
      ParentComponent: ParentComponent
    });

    return createStyledComponent(tag, newOptions, rules);
  };

  // $FlowFixMe
  Object.defineProperty(WrappedStyledComponent, 'defaultProps', {
    get: function get$$1() {
      return this._foldedDefaultProps;
    },
    set: function set$$1(obj) {
      // $FlowFixMe
      this._foldedDefaultProps = isTargetStyledComp ? Object(merge_anything__WEBPACK_IMPORTED_MODULE_8__[/* default */ "a"])(target.defaultProps, obj) : obj;
    }
  });

  if (false) {}

  // $FlowFixMe
  WrappedStyledComponent.toString = function () {
    return '.' + WrappedStyledComponent.styledComponentId;
  };

  if (isClass) {
    hoistNonReactStatics(WrappedStyledComponent, target, {
      // all SC-specific things should not be hoisted
      attrs: true,
      componentStyle: true,
      displayName: true,
      foldedComponentIds: true,
      styledComponentId: true,
      target: true,
      withComponent: true
    });
  }

  return WrappedStyledComponent;
}

// 
// Thanks to ReactDOMFactories for this handy list!

var domElements = ['a', 'abbr', 'address', 'area', 'article', 'aside', 'audio', 'b', 'base', 'bdi', 'bdo', 'big', 'blockquote', 'body', 'br', 'button', 'canvas', 'caption', 'cite', 'code', 'col', 'colgroup', 'data', 'datalist', 'dd', 'del', 'details', 'dfn', 'dialog', 'div', 'dl', 'dt', 'em', 'embed', 'fieldset', 'figcaption', 'figure', 'footer', 'form', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'head', 'header', 'hgroup', 'hr', 'html', 'i', 'iframe', 'img', 'input', 'ins', 'kbd', 'keygen', 'label', 'legend', 'li', 'link', 'main', 'map', 'mark', 'marquee', 'menu', 'menuitem', 'meta', 'meter', 'nav', 'noscript', 'object', 'ol', 'optgroup', 'option', 'output', 'p', 'param', 'picture', 'pre', 'progress', 'q', 'rp', 'rt', 'ruby', 's', 'samp', 'script', 'section', 'select', 'small', 'source', 'span', 'strong', 'style', 'sub', 'summary', 'sup', 'table', 'tbody', 'td', 'textarea', 'tfoot', 'th', 'thead', 'time', 'title', 'tr', 'track', 'u', 'ul', 'var', 'video', 'wbr',

// SVG
'circle', 'clipPath', 'defs', 'ellipse', 'foreignObject', 'g', 'image', 'line', 'linearGradient', 'marker', 'mask', 'path', 'pattern', 'polygon', 'polyline', 'radialGradient', 'rect', 'stop', 'svg', 'text', 'tspan'];

// 

var styled = function styled(tag) {
  return constructWithOptions(createStyledComponent, tag);
};

// Shorthands for all valid HTML Elements
domElements.forEach(function (domElement) {
  styled[domElement] = styled(domElement);
});

// 

var GlobalStyle = function () {
  function GlobalStyle(rules, componentId) {
    classCallCheck(this, GlobalStyle);

    this.rules = rules;
    this.componentId = componentId;
    this.isStatic = isStaticRules(rules, EMPTY_ARRAY);

    if (!StyleSheet.master.hasId(componentId)) {
      StyleSheet.master.deferredInject(componentId, []);
    }
  }

  GlobalStyle.prototype.createStyles = function createStyles(executionContext, styleSheet) {
    var flatCSS = flatten(this.rules, executionContext, styleSheet);
    var css = stringifyRules(flatCSS, '');

    styleSheet.inject(this.componentId, css);
  };

  GlobalStyle.prototype.removeStyles = function removeStyles(styleSheet) {
    var componentId = this.componentId;

    if (styleSheet.hasId(componentId)) {
      styleSheet.remove(componentId);
    }
  };

  // TODO: overwrite in-place instead of remove+create?


  GlobalStyle.prototype.renderStyles = function renderStyles(executionContext, styleSheet) {
    this.removeStyles(styleSheet);
    this.createStyles(executionContext, styleSheet);
  };

  return GlobalStyle;
}();

// 

// place our cache into shared context so it'll persist between HMRs
if (IS_BROWSER) {
  window.scCGSHMRCache = {};
}

function createGlobalStyle(strings) {
  for (var _len = arguments.length, interpolations = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    interpolations[_key - 1] = arguments[_key];
  }

  var rules = css.apply(undefined, [strings].concat(interpolations));
  var id = 'sc-global-' + murmurhash(JSON.stringify(rules));
  var style = new GlobalStyle(rules, id);

  var GlobalStyleComponent = function (_React$Component) {
    inherits(GlobalStyleComponent, _React$Component);

    function GlobalStyleComponent(props) {
      classCallCheck(this, GlobalStyleComponent);

      var _this = possibleConstructorReturn(this, _React$Component.call(this, props));

      var _this$constructor = _this.constructor,
          globalStyle = _this$constructor.globalStyle,
          styledComponentId = _this$constructor.styledComponentId;


      if (IS_BROWSER) {
        window.scCGSHMRCache[styledComponentId] = (window.scCGSHMRCache[styledComponentId] || 0) + 1;
      }

      /**
       * This fixes HMR compatibility. Don't ask me why, but this combination of
       * caching the closure variables via statics and then persisting the statics in
       * state works across HMR where no other combination did. ¯\_(ツ)_/¯
       */
      _this.state = {
        globalStyle: globalStyle,
        styledComponentId: styledComponentId
      };
      return _this;
    }

    GlobalStyleComponent.prototype.componentWillUnmount = function componentWillUnmount() {
      if (window.scCGSHMRCache[this.state.styledComponentId]) {
        window.scCGSHMRCache[this.state.styledComponentId] -= 1;
      }
      /**
       * Depending on the order "render" is called this can cause the styles to be lost
       * until the next render pass of the remaining instance, which may
       * not be immediate.
       */
      if (window.scCGSHMRCache[this.state.styledComponentId] === 0) {
        this.state.globalStyle.removeStyles(this.styleSheet);
      }
    };

    GlobalStyleComponent.prototype.render = function render() {
      var _this2 = this;

      if (false) {}

      return react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(
        StyleSheetConsumer,
        null,
        function (styleSheet) {
          _this2.styleSheet = styleSheet || StyleSheet.master;

          var globalStyle = _this2.state.globalStyle;


          if (globalStyle.isStatic) {
            globalStyle.renderStyles(STATIC_EXECUTION_CONTEXT, _this2.styleSheet);

            return null;
          } else {
            return react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(
              ThemeConsumer,
              null,
              function (theme) {
                // $FlowFixMe
                var defaultProps = _this2.constructor.defaultProps;


                var context = _extends({}, _this2.props);

                if (typeof theme !== 'undefined') {
                  context.theme = determineTheme(_this2.props, theme, defaultProps);
                }

                globalStyle.renderStyles(context, _this2.styleSheet);

                return null;
              }
            );
          }
        }
      );
    };

    return GlobalStyleComponent;
  }(react__WEBPACK_IMPORTED_MODULE_2___default.a.Component);

  GlobalStyleComponent.globalStyle = style;
  GlobalStyleComponent.styledComponentId = id;


  return GlobalStyleComponent;
}

// 

var replaceWhitespace = function replaceWhitespace(str) {
  return str.replace(/\s|\\n/g, '');
};

function keyframes(strings) {
  /* Warning if you've used keyframes on React Native */
  if (false) {}

  for (var _len = arguments.length, interpolations = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    interpolations[_key - 1] = arguments[_key];
  }

  var rules = css.apply(undefined, [strings].concat(interpolations));

  var name = generateAlphabeticName(murmurhash(replaceWhitespace(JSON.stringify(rules))));

  return new Keyframes(name, stringifyRules(rules, name, '@keyframes'));
}

// 

var withTheme = (function (Component$$1) {
  var WithTheme = react__WEBPACK_IMPORTED_MODULE_2___default.a.forwardRef(function (props, ref) {
    return react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(
      ThemeConsumer,
      null,
      function (theme) {
        // $FlowFixMe
        var defaultProps = Component$$1.defaultProps;

        var themeProp = determineTheme(props, theme, defaultProps);

        if (false) {}

        return react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(Component$$1, _extends({}, props, { theme: themeProp, ref: ref }));
      }
    );
  });

  hoistNonReactStatics(WithTheme, Component$$1);

  WithTheme.displayName = 'WithTheme(' + getComponentName(Component$$1) + ')';

  return WithTheme;
});

// 

/* eslint-disable */
var __DO_NOT_USE_OR_YOU_WILL_BE_HAUNTED_BY_SPOOKY_GHOSTS = {
  StyleSheet: StyleSheet
};

// 

/* Warning if you've imported this file on React Native */
if (false) {}

/* Warning if there are several instances of styled-components */
if (false) {}

//

/* harmony default export */ __webpack_exports__["default"] = (styled);

//# sourceMappingURL=styled-components.browser.esm.js.map

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(44)))

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Helpers = exports.ScrollElement = exports.ScrollLink = exports.animateScroll = exports.scrollSpy = exports.Events = exports.scroller = exports.Element = exports.Button = exports.Link = undefined;

var _Link = __webpack_require__(46);

var _Link2 = _interopRequireDefault(_Link);

var _Button = __webpack_require__(50);

var _Button2 = _interopRequireDefault(_Button);

var _Element = __webpack_require__(51);

var _Element2 = _interopRequireDefault(_Element);

var _scroller = __webpack_require__(10);

var _scroller2 = _interopRequireDefault(_scroller);

var _scrollEvents = __webpack_require__(17);

var _scrollEvents2 = _interopRequireDefault(_scrollEvents);

var _scrollSpy = __webpack_require__(15);

var _scrollSpy2 = _interopRequireDefault(_scrollSpy);

var _animateScroll = __webpack_require__(26);

var _animateScroll2 = _interopRequireDefault(_animateScroll);

var _scrollLink = __webpack_require__(14);

var _scrollLink2 = _interopRequireDefault(_scrollLink);

var _scrollElement = __webpack_require__(28);

var _scrollElement2 = _interopRequireDefault(_scrollElement);

var _Helpers = __webpack_require__(52);

var _Helpers2 = _interopRequireDefault(_Helpers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.Link = _Link2.default;
exports.Button = _Button2.default;
exports.Element = _Element2.default;
exports.scroller = _scroller2.default;
exports.Events = _scrollEvents2.default;
exports.scrollSpy = _scrollSpy2.default;
exports.animateScroll = _animateScroll2.default;
exports.ScrollLink = _scrollLink2.default;
exports.ScrollElement = _scrollElement2.default;
exports.Helpers = _Helpers2.default;
exports.default = { Link: _Link2.default, Button: _Button2.default, Element: _Element2.default, scroller: _scroller2.default, Events: _scrollEvents2.default, scrollSpy: _scrollSpy2.default, animateScroll: _animateScroll2.default, ScrollLink: _scrollLink2.default, ScrollElement: _scrollElement2.default, Helpers: _Helpers2.default };

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



/**
 * Use invariant() to assert state which your program assumes to be true.
 *
 * Provide sprintf-style format (only %s is supported) and arguments
 * to provide information about what broke and what you were
 * expecting.
 *
 * The invariant message will be stripped in production, but the invariant
 * will remain to ensure logic does not differ in production.
 */

var invariant = function(condition, format, a, b, c, d, e, f) {
  if (false) {}

  if (!condition) {
    var error;
    if (format === undefined) {
      error = new Error(
        'Minified exception occurred; use the non-minified dev environment ' +
        'for the full error message and additional helpful warnings.'
      );
    } else {
      var args = [a, b, c, d, e, f];
      var argIndex = 0;
      error = new Error(
        format.replace(/%s/g, function() { return args[argIndex++]; })
      );
      error.name = 'Invariant Violation';
    }

    error.framesToPop = 1; // we don't care about invariant's own frame
    throw error;
  }
};

module.exports = invariant;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


if (true) {
  module.exports = __webpack_require__(41);
} else {}


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
module.exports = {"radioProcess":"Window__radioProcess___3qLk-","windowDivLayer":"Window__windowDivLayer___2EUHe","projectUrl":"Window__projectUrl___2rjKO","textProcess":"Window__textProcess___3tam5","eduText":"Window__eduText___1aajQ","eduTextLong":"Window__eduTextLong___1r9jk","buttonGroup":"Window__buttonGroup___MeDln","nameInline":"Window__nameInline___3Df47","listText":"Window__listText___2t1MZ","itemText":"Window__itemText___1fCCV","windowSpacing":"Window__windowSpacing___2BkR5","windowHeader":"Window__windowHeader___2rbcn","techStack":"Window__techStack___3NFTF","tableCenter":"Window__tableCenter___1OeFt","processCell":"Window__processCell___3-vZV"};

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function checkDCE() {
  /* global __REACT_DEVTOOLS_GLOBAL_HOOK__ */
  if (
    typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ === 'undefined' ||
    typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE !== 'function'
  ) {
    return;
  }
  if (false) {}
  try {
    // Verify that the code above has been dead code eliminated (DCE'd).
    __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(checkDCE);
  } catch (err) {
    // DevTools shouldn't crash React, no matter what.
    // We should still report in case we break this code.
    console.error(err);
  }
}

if (true) {
  // DCE check should happen before ReactDOM bundle executes so that
  // DevTools can report bad minification during injection.
  checkDCE();
  module.exports = __webpack_require__(36);
} else {}


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
var ReactIs = __webpack_require__(6);
var REACT_STATICS = {
    childContextTypes: true,
    contextType: true,
    contextTypes: true,
    defaultProps: true,
    displayName: true,
    getDefaultProps: true,
    getDerivedStateFromError: true,
    getDerivedStateFromProps: true,
    mixins: true,
    propTypes: true,
    type: true
};

var KNOWN_STATICS = {
    name: true,
    length: true,
    prototype: true,
    caller: true,
    callee: true,
    arguments: true,
    arity: true
};

var FORWARD_REF_STATICS = {
    '$$typeof': true,
    render: true,
    defaultProps: true,
    displayName: true,
    propTypes: true
};

var MEMO_STATICS = {
    '$$typeof': true,
    compare: true,
    defaultProps: true,
    displayName: true,
    propTypes: true,
    type: true
};

var TYPE_STATICS = {};
TYPE_STATICS[ReactIs.ForwardRef] = FORWARD_REF_STATICS;

function getStatics(component) {
    if (ReactIs.isMemo(component)) {
        return MEMO_STATICS;
    }
    return TYPE_STATICS[component['$$typeof']] || REACT_STATICS;
}

var defineProperty = Object.defineProperty;
var getOwnPropertyNames = Object.getOwnPropertyNames;
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
var getPrototypeOf = Object.getPrototypeOf;
var objectPrototype = Object.prototype;

function hoistNonReactStatics(targetComponent, sourceComponent, blacklist) {
    if (typeof sourceComponent !== 'string') {
        // don't hoist over string (html) components

        if (objectPrototype) {
            var inheritedComponent = getPrototypeOf(sourceComponent);
            if (inheritedComponent && inheritedComponent !== objectPrototype) {
                hoistNonReactStatics(targetComponent, inheritedComponent, blacklist);
            }
        }

        var keys = getOwnPropertyNames(sourceComponent);

        if (getOwnPropertySymbols) {
            keys = keys.concat(getOwnPropertySymbols(sourceComponent));
        }

        var targetStatics = getStatics(targetComponent);
        var sourceStatics = getStatics(sourceComponent);

        for (var i = 0; i < keys.length; ++i) {
            var key = keys[i];
            if (!KNOWN_STATICS[key] && !(blacklist && blacklist[key]) && !(sourceStatics && sourceStatics[key]) && !(targetStatics && targetStatics[key])) {
                var descriptor = getOwnPropertyDescriptor(sourceComponent, key);
                try {
                    // Avoid failures from read-only properties
                    defineProperty(targetComponent, key, descriptor);
                } catch (e) {}
            }
        }

        return targetComponent;
    }

    return targetComponent;
}

module.exports = hoistNonReactStatics;


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _utils = __webpack_require__(11);

var _utils2 = _interopRequireDefault(_utils);

var _animateScroll = __webpack_require__(26);

var _animateScroll2 = _interopRequireDefault(_animateScroll);

var _scrollEvents = __webpack_require__(17);

var _scrollEvents2 = _interopRequireDefault(_scrollEvents);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var __mapped = {};
var __activeLink = void 0;

exports.default = {

  unmount: function unmount() {
    __mapped = {};
  },

  register: function register(name, element) {
    __mapped[name] = element;
  },

  unregister: function unregister(name) {
    delete __mapped[name];
  },

  get: function get(name) {
    return __mapped[name] || document.getElementById(name) || document.getElementsByName(name)[0] || document.getElementsByClassName(name)[0];
  },

  setActiveLink: function setActiveLink(link) {
    return __activeLink = link;
  },

  getActiveLink: function getActiveLink() {
    return __activeLink;
  },

  scrollTo: function scrollTo(to, props) {

    var target = this.get(to);

    if (!target) {
      console.warn("target Element not found");
      return;
    }

    props = _extends({}, props, { absolute: false });

    var containerId = props.containerId;
    var container = props.container;

    var containerElement = void 0;
    if (containerId) {
      containerElement = document.getElementById(containerId);
    } else if (container && container.nodeType) {
      containerElement = container;
    } else {
      containerElement = document;
    }

    props.absolute = true;

    var scrollOffset = _utils2.default.scrollOffset(containerElement, target) + (props.offset || 0);

    /*
     * if animate is not provided just scroll into the view
     */
    if (!props.smooth) {
      if (_scrollEvents2.default.registered['begin']) {
        _scrollEvents2.default.registered['begin'](to, target);
      }

      if (containerElement === document) {
        window.scrollTo(0, scrollOffset);
      } else {
        containerElement.scrollTop = scrollOffset;
      }

      if (_scrollEvents2.default.registered['end']) {
        _scrollEvents2.default.registered['end'](to, target);
      }

      return;
    }

    /*
     * Animate scrolling
     */

    _animateScroll2.default.animateTopScroll(scrollOffset, props, to, target);
  }
};

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var pushHash = function pushHash(hash) {
  hash = hash ? hash.indexOf('#') === 0 ? hash : '#' + hash : '';

  if (history.pushState) {
    var loc = window.location;
    history.pushState(null, null, hash ? loc.pathname + loc.search + hash
    // remove hash
    : loc.pathname + loc.search);
  } else {
    location.hash = hash;
  }
};

var getHash = function getHash() {
  return window.location.hash.replace(/^#/, '');
};

var filterElementInContainer = function filterElementInContainer(container) {
  return function (element) {
    return container.contains ? container != element && container.contains(element) : !!(container.compareDocumentPosition(element) & 16);
  };
};

var scrollOffset = function scrollOffset(c, t) {
  return c === document ? t.getBoundingClientRect().top + (window.scrollY || window.pageYOffset) : getComputedStyle(c).position !== "static" ? t.offsetTop : t.getBoundingClientRect().top + c.scrollTop;
};

exports.default = {
  pushHash: pushHash,
  getHash: getHash,
  filterElementInContainer: filterElementInContainer,
  scrollOffset: scrollOffset
};

/***/ }),
/* 12 */,
/* 13 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _scrollSpy = __webpack_require__(15);

var _scrollSpy2 = _interopRequireDefault(_scrollSpy);

var _scroller = __webpack_require__(10);

var _scroller2 = _interopRequireDefault(_scroller);

var _propTypes = __webpack_require__(2);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _scrollHash = __webpack_require__(27);

var _scrollHash2 = _interopRequireDefault(_scrollHash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var protoTypes = {
  to: _propTypes2.default.string.isRequired,
  containerId: _propTypes2.default.string,
  container: _propTypes2.default.object,
  activeClass: _propTypes2.default.string,
  spy: _propTypes2.default.bool,
  smooth: _propTypes2.default.oneOfType([_propTypes2.default.bool, _propTypes2.default.string]),
  offset: _propTypes2.default.number,
  delay: _propTypes2.default.number,
  isDynamic: _propTypes2.default.bool,
  onClick: _propTypes2.default.func,
  duration: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.func]),
  absolute: _propTypes2.default.bool,
  onSetActive: _propTypes2.default.func,
  onSetInactive: _propTypes2.default.func,
  ignoreCancelEvents: _propTypes2.default.bool,
  hashSpy: _propTypes2.default.bool
};

exports.default = function (Component, customScroller) {

  var scroller = customScroller || _scroller2.default;

  var Link = function (_React$PureComponent) {
    _inherits(Link, _React$PureComponent);

    function Link(props) {
      _classCallCheck(this, Link);

      var _this = _possibleConstructorReturn(this, (Link.__proto__ || Object.getPrototypeOf(Link)).call(this, props));

      _initialiseProps.call(_this);

      _this.state = {
        active: false
      };
      return _this;
    }

    _createClass(Link, [{
      key: 'getScrollSpyContainer',
      value: function getScrollSpyContainer() {
        var containerId = this.props.containerId;
        var container = this.props.container;

        if (containerId && !container) {
          return document.getElementById(containerId);
        }

        if (container && container.nodeType) {
          return container;
        }

        return document;
      }
    }, {
      key: 'componentDidMount',
      value: function componentDidMount() {
        if (this.props.spy || this.props.hashSpy) {
          var scrollSpyContainer = this.getScrollSpyContainer();

          if (!_scrollSpy2.default.isMounted(scrollSpyContainer)) {
            _scrollSpy2.default.mount(scrollSpyContainer);
          }

          if (this.props.hashSpy) {
            if (!_scrollHash2.default.isMounted()) {
              _scrollHash2.default.mount(scroller);
            }
            _scrollHash2.default.mapContainer(this.props.to, scrollSpyContainer);
          }

          _scrollSpy2.default.addSpyHandler(this.spyHandler, scrollSpyContainer);

          this.setState({
            container: scrollSpyContainer
          });
        }
      }
    }, {
      key: 'componentWillUnmount',
      value: function componentWillUnmount() {
        _scrollSpy2.default.unmount(this.stateHandler, this.spyHandler);
      }
    }, {
      key: 'render',
      value: function render() {
        var className = "";

        if (this.state && this.state.active) {
          className = ((this.props.className || "") + " " + (this.props.activeClass || "active")).trim();
        } else {
          className = this.props.className;
        }

        var props = _extends({}, this.props);

        for (var prop in protoTypes) {
          if (props.hasOwnProperty(prop)) {
            delete props[prop];
          }
        }

        props.className = className;
        props.onClick = this.handleClick;

        return _react2.default.createElement(Component, props);
      }
    }]);

    return Link;
  }(_react2.default.PureComponent);

  var _initialiseProps = function _initialiseProps() {
    var _this2 = this;

    this.scrollTo = function (to, props) {
      scroller.scrollTo(to, _extends({}, _this2.state, props));
    };

    this.handleClick = function (event) {

      /*
       * give the posibility to override onClick
       */

      if (_this2.props.onClick) {
        _this2.props.onClick(event);
      }

      /*
       * dont bubble the navigation
       */

      if (event.stopPropagation) event.stopPropagation();
      if (event.preventDefault) event.preventDefault();

      /*
       * do the magic!
       */
      _this2.scrollTo(_this2.props.to, _this2.props);
    };

    this.spyHandler = function (y) {

      var scrollSpyContainer = _this2.getScrollSpyContainer();

      if (_scrollHash2.default.isMounted() && !_scrollHash2.default.isInitialized()) {
        return;
      }

      var to = _this2.props.to;
      var element = null;
      var elemTopBound = 0;
      var elemBottomBound = 0;
      var containerTop = 0;

      if (scrollSpyContainer.getBoundingClientRect) {
        var containerCords = scrollSpyContainer.getBoundingClientRect();
        containerTop = containerCords.top;
      }

      if (!element || _this2.props.isDynamic) {
        element = scroller.get(to);
        if (!element) {
          return;
        }

        var cords = element.getBoundingClientRect();
        elemTopBound = cords.top - containerTop + y;
        elemBottomBound = elemTopBound + cords.height;
      }

      var offsetY = y - _this2.props.offset;
      var isInside = offsetY >= Math.floor(elemTopBound) && offsetY < Math.floor(elemBottomBound);
      var isOutside = offsetY < Math.floor(elemTopBound) || offsetY >= Math.floor(elemBottomBound);
      var activeLink = scroller.getActiveLink();

      if (isOutside) {
        if (to === activeLink) {
          scroller.setActiveLink(void 0);
        }

        if (_this2.props.hashSpy && _scrollHash2.default.getHash() === to) {
          _scrollHash2.default.changeHash();
        }

        if (_this2.props.spy && _this2.state.active) {
          _this2.setState({ active: false });
          _this2.props.onSetInactive && _this2.props.onSetInactive(to, element);
        }
      }

      if (isInside && (activeLink !== to || _this2.state.active === false)) {
        scroller.setActiveLink(to);

        _this2.props.hashSpy && _scrollHash2.default.changeHash(to);

        if (_this2.props.spy) {
          _this2.setState({ active: true });
          _this2.props.onSetActive && _this2.props.onSetActive(to, element);
        }
      }
    };
  };

  ;

  Link.propTypes = protoTypes;

  Link.defaultProps = { offset: 0 };

  return Link;
};

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodash = __webpack_require__(47);

var _lodash2 = _interopRequireDefault(_lodash);

var _passiveEventListeners = __webpack_require__(16);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// The eventHandler will execute at a rate of 15fps
var eventThrottler = function eventThrottler(eventHandler) {
  return (0, _lodash2.default)(eventHandler, 66);
};

var scrollSpy = {

  spyCallbacks: [],
  spySetState: [],
  scrollSpyContainers: [],

  mount: function mount(scrollSpyContainer) {
    if (scrollSpyContainer) {
      var eventHandler = eventThrottler(function (event) {
        scrollSpy.scrollHandler(scrollSpyContainer);
      });
      scrollSpy.scrollSpyContainers.push(scrollSpyContainer);
      (0, _passiveEventListeners.addPassiveEventListener)(scrollSpyContainer, 'scroll', eventHandler);
    }
  },
  isMounted: function isMounted(scrollSpyContainer) {
    return scrollSpy.scrollSpyContainers.indexOf(scrollSpyContainer) !== -1;
  },
  currentPositionY: function currentPositionY(scrollSpyContainer) {
    if (scrollSpyContainer === document) {
      var supportPageOffset = window.pageXOffset !== undefined;
      var isCSS1Compat = (document.compatMode || "") === "CSS1Compat";
      return supportPageOffset ? window.pageYOffset : isCSS1Compat ? document.documentElement.scrollTop : document.body.scrollTop;
    } else {
      return scrollSpyContainer.scrollTop;
    }
  },
  scrollHandler: function scrollHandler(scrollSpyContainer) {
    var callbacks = scrollSpy.scrollSpyContainers[scrollSpy.scrollSpyContainers.indexOf(scrollSpyContainer)].spyCallbacks || [];
    callbacks.forEach(function (c) {
      return c(scrollSpy.currentPositionY(scrollSpyContainer));
    });
  },
  addStateHandler: function addStateHandler(handler) {
    scrollSpy.spySetState.push(handler);
  },
  addSpyHandler: function addSpyHandler(handler, scrollSpyContainer) {
    var container = scrollSpy.scrollSpyContainers[scrollSpy.scrollSpyContainers.indexOf(scrollSpyContainer)];

    if (!container.spyCallbacks) {
      container.spyCallbacks = [];
    }

    container.spyCallbacks.push(handler);

    handler(scrollSpy.currentPositionY(scrollSpyContainer));
  },
  updateStates: function updateStates() {
    scrollSpy.spySetState.forEach(function (s) {
      return s();
    });
  },
  unmount: function unmount(stateHandler, spyHandler) {
    scrollSpy.scrollSpyContainers.forEach(function (c) {
      return c.spyCallbacks && c.spyCallbacks.length && c.spyCallbacks.splice(c.spyCallbacks.indexOf(spyHandler), 1);
    });

    if (scrollSpy.spySetState && scrollSpy.spySetState.length) {
      scrollSpy.spySetState.splice(scrollSpy.spySetState.indexOf(stateHandler), 1);
    }

    document.removeEventListener('scroll', scrollSpy.scrollHandler);
  },


  update: function update() {
    return scrollSpy.scrollSpyContainers.forEach(function (c) {
      return scrollSpy.scrollHandler(c);
    });
  }
};

exports.default = scrollSpy;

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
/*
 * Tell the browser that the event listener won't prevent a scroll.
 * Allowing the browser to continue scrolling without having to
 * to wait for the listener to return.
 */
var addPassiveEventListener = exports.addPassiveEventListener = function addPassiveEventListener(target, eventName, listener) {
  var supportsPassiveOption = function () {
    var supportsPassiveOption = false;
    try {
      var opts = Object.defineProperty({}, 'passive', {
        get: function get() {
          supportsPassiveOption = true;
        }
      });
      window.addEventListener('test', null, opts);
    } catch (e) {}
    return supportsPassiveOption;
  }();
  target.addEventListener(eventName, listener, supportsPassiveOption ? { passive: true } : false);
};

var removePassiveEventListener = exports.removePassiveEventListener = function removePassiveEventListener(target, eventName, listener) {
  target.removeEventListener(eventName, listener);
};

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var Events = {
	registered: {},
	scrollEvent: {
		register: function register(evtName, callback) {
			Events.registered[evtName] = callback;
		},
		remove: function remove(evtName) {
			Events.registered[evtName] = null;
		}
	}
};

exports.default = Events;

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;(function () {function Oc(a){return a&&a.__esModule?{d:a.default}:{d:a}}var Zc={};function Ge(){}var Gc=function($){return null==$?Ge:function(){return this.querySelector($)}};var tf=function(e){"function"!=typeof e&&(e=Gc(e));for(var r=this._groups,t=r.length,a=new Array(t),l=0;l<t;++l)for(var $,_,o=r[l],n=o.length,i=a[l]=new Array(n),p=0;p<n;++p)($=o[p])&&(_=e.call($,$.__data__,p,o))&&("__data__"in $&&(_.__data__=$.__data__),i[p]=_);return new m(a,this._parents)};function Kd(){return[]}var Nd=function(t){return null==t?Kd:function(){return this.querySelectorAll(t)}};var Od=function(e){"function"!=typeof e&&(e=Nd(e));for(var r=this._groups,t=r.length,$=[],l=[],o=0;o<t;++o)for(var a,p=r[o],u=p.length,n=0;n<u;++n)(a=p[n])&&($.push(e.call(a,a.__data__,n,p)),l.push(a));return new m($,l)};var Wd=function(r){return function(){return this.matches(r)}};var De=function(r){"function"!=typeof r&&(r=Wd(r));for(var e=this._groups,a=e.length,t=new Array(a),$=0;$<a;++$)for(var S,o=e[$],n=o.length,p=t[$]=[],i=0;i<n;++i)(S=o[i])&&r.call(S,S.__data__,i,o)&&p.push(S);return new m(t,this._parents)};var Qb=function(e){return new Array(e.length)};var He=function(){return new m(this._enter||this._groups.map(Qb),this._parents)};function na(e,t){this.ownerDocument=e.ownerDocument,this.namespaceURI=e.namespaceURI,this._next=null,this._parent=e,this.__data__=t}na.prototype={constructor:na,appendChild:function(e){return this._parent.insertBefore(e,this._next)},insertBefore:function(e,t){return this._parent.insertBefore(e,t)},querySelector:function(e){return this._parent.querySelector(e)},querySelectorAll:function(e){return this._parent.querySelectorAll(e)}};var Ke=function(r){return function(){return r}};var Pb="$";function If(r,e,n,$,t,a){for(var i,o=0,l=e.length,f=a.length;o<f;++o)(i=e[o])?(i.__data__=a[o],$[o]=i):n[o]=new na(r,a[o]);for(;o<l;++o)(i=e[o])&&(t[o]=i)}function Mf(r,e,n,$,t,a,i){var o,l,f,q={},_=e.length,O=a.length,d=new Array(_);for(o=0;o<_;++o)(l=e[o])&&(d[o]=f=Pb+i.call(l,l.__data__,o,e),f in q?t[o]=l:q[f]=l);for(o=0;o<O;++o)(l=q[f=Pb+i.call(r,a[o],o,a)])?($[o]=l,l.__data__=a[o],q[f]=null):n[o]=new na(r,a[o]);for(o=0;o<_;++o)(l=e[o])&&q[d[o]]===l&&(t[o]=l)}var $f=function(r,e){if(!r)return d=new Array(this.size()),f=-1,this.each(function(r){d[++f]=r}),d;var n=e?Mf:If,$=this._parents,t=this._groups;"function"!=typeof r&&(r=Ke(r));for(var a=t.length,i=new Array(a),o=new Array(a),l=new Array(a),f=0;f<a;++f){var q=$[f],_=t[f],O=_.length,d=r.call(q,q&&q.__data__,f,$),u=d.length,v=o[f]=new Array(u),c=i[f]=new Array(u);n(q,_,v,c,l[f]=new Array(O),d,e);for(var p,y,h=0,x=0;h<u;++h)if(p=v[h]){for(h>=x&&(x=h+1);!(y=c[x])&&++x<u;);p._next=y||null}}return(i=new m(i,$))._enter=o,i._exit=l,i};var fg=function(){return new m(this._exit||this._groups.map(Qb),this._parents)};var mg=function(e,t,r){var $=this.enter(),n=this,o=this.exit();return $="function"==typeof e?e($):$.append(e+""),null!=t&&(n=t(n)),null==r?o.remove():r(o),$&&n?$.merge(n).order():n};var qg=function(r){for(var e=this._groups,t=r._groups,$=e.length,n=t.length,a=Math.min($,n),o=new Array($),x=0;x<a;++x)for(var p,i=e[x],l=t[x],u=i.length,f=o[x]=new Array(u),s=0;s<u;++s)(p=i[s]||l[s])&&(f[s]=p);for(;x<$;++x)o[x]=e[x];return new m(o,this._parents)};var Sg=function(){for(var e=this._groups,t=-1,r=e.length;++t<r;)for(var o,$=e[t],n=$.length-1,a=$[n];--n>=0;)(o=$[n])&&(a&&4^o.compareDocumentPosition(a)&&a.parentNode.insertBefore(o,a),a=o);return this};var Vg=function(r){function e(e,t){return e&&t?r(e.__data__,t.__data__):!e-!t}r||(r=Yg);for(var t=this._groups,n=t.length,$=new Array(n),a=0;a<n;++a){for(var w,o=t[a],i=o.length,u=$[a]=new Array(i),_=0;_<i;++_)(w=o[_])&&(u[_]=w);u.sort(e)}return new m($,this._parents).order()};function Yg(r,e){return r<e?-1:r>e?1:r>=e?0:NaN}var uh=function(){var t=arguments[0];return arguments[0]=this,t.apply(null,arguments),this};var Hh=function(){var t=new Array(this.size()),a=-1;return this.each(function(){t[++a]=this}),t};var kd=function(){for(var r=this._groups,t=0,e=r.length;t<e;++t)for(var $=r[t],o=0,u=$.length;o<u;++o){var a=$[o];if(a)return a}return null};var pd=function(){var e=0;return this.each(function(){++e}),e};var rd=function(){return!this.node()};var sd=function(t){for(var r=this._groups,e=0,$=r.length;e<$;++e)for(var a,n=r[e],p=0,o=n.length;p<o;++p)(a=n[p])&&t.call(a,a.__data__,p,n);return this};function xd(t){return function(){this.removeAttribute(t)}}function yd(t){return function(){this.removeAttributeNS(t.space,t.local)}}function zd(t,r){return function(){this.setAttribute(t,r)}}function Cd(t,r){return function(){this.setAttributeNS(t.space,t.local,r)}}function Ed(t,r){return function(){var e=r.apply(this,arguments);null==e?this.removeAttribute(t):this.setAttribute(t,e)}}function Jd(t,r){return function(){var e=r.apply(this,arguments);null==e?this.removeAttributeNS(t.space,t.local):this.setAttributeNS(t.space,t.local,e)}}var Sa="http://www.w3.org/1999/xhtml";var Rb={svg:"http://www.w3.org/2000/svg",xhtml:Sa,xlink:"http://www.w3.org/1999/xlink",xml:"http://www.w3.org/XML/1998/namespace",xmlns:"http://www.w3.org/2000/xmlns/"};var Sb=function(e){var $=e+="",a=$.indexOf(":");return a>=0&&"xmlns"!==($=e.slice(0,a))&&(e=e.slice(a+1)),Rb.hasOwnProperty($)?{space:Rb[$],local:e}:e};var Pd=function(t,r){var e=Sb(t);if(arguments.length<2){var a=this.node();return e.local?a.getAttributeNS(e.space,e.local):a.getAttribute(e)}return this.each((null==r?e.local?yd:xd:"function"==typeof r?e.local?Jd:Ed:e.local?Cd:zd)(e,r))};function Td(e){return function(){this.style.removeProperty(e)}}function Ud(e,t,r){return function(){this.style.setProperty(e,t,r)}}function Vd(e,t,r){return function(){var $=t.apply(this,arguments);null==$?this.style.removeProperty(e):this.style.setProperty(e,$,r)}}var sc=function(e){return e.ownerDocument&&e.ownerDocument.defaultView||e.document&&e||e.defaultView};var ve=function(e,t,r){return arguments.length>1?this.each((null==t?Td:"function"==typeof t?Vd:Ud)(e,t,null==r?"":r)):we(this.node(),e)};function we(e,t){return e.style.getPropertyValue(t)||sc(e).getComputedStyle(e,null).getPropertyValue(t)}function ye(r){return function(){delete this[r]}}function ze(r,t){return function(){this[r]=t}}function Ae(r,t){return function(){var n=t.apply(this,arguments);null==n?delete this[r]:this[r]=n}}var Be=function(r,t){return arguments.length>1?this.each((null==t?ye:"function"==typeof t?Ae:ze)(r,t)):this.node()[r]};function Hc(s){return s.trim().split(/^|\s+/)}function gb(s){return s.classList||new Rc(s)}function Rc(s){this._node=s,this._names=Hc(s.getAttribute("class")||"")}function Yc(s,t){for(var a=gb(s),$=-1,e=t.length;++$<e;)a.add(t[$])}function Ab(s,t){for(var a=gb(s),$=-1,e=t.length;++$<e;)a.remove(t[$])}function Le(s){return function(){Yc(this,s)}}function Me(s){return function(){Ab(this,s)}}function Ne(s,t){return function(){(t.apply(this,arguments)?Yc:Ab)(this,s)}}Rc.prototype={add:function(s){this._names.indexOf(s)<0&&(this._names.push(s),this._node.setAttribute("class",this._names.join(" ")))},remove:function(s){var t=this._names.indexOf(s);t>=0&&(this._names.splice(t,1),this._node.setAttribute("class",this._names.join(" ")))},contains:function(s){return this._names.indexOf(s)>=0}};var Oe=function(s,t){var a=Hc(s+"");if(arguments.length<2){for(var $=gb(this.node()),e=-1,n=a.length;++e<n;)if(!$.contains(a[e]))return!1;return!0}return this.each(("function"==typeof t?Ne:t?Le:Me)(a,t))};function Pe(){this.textContent=""}function Qe(t){return function(){this.textContent=t}}function Se(t){return function(){var n=t.apply(this,arguments);this.textContent=null==n?"":n}}var $e=function(t){return arguments.length?this.each(null==t?Pe:("function"==typeof t?Se:Qe)(t)):this.node().textContent};function _e(){this.innerHTML=""}function af(n){return function(){this.innerHTML=n}}function bf(n){return function(){var t=n.apply(this,arguments);this.innerHTML=null==t?"":t}}var df=function(n){return arguments.length?this.each(null==n?_e:("function"==typeof n?bf:af)(n)):this.node().innerHTML};function ef(){this.nextSibling&&this.parentNode.appendChild(this)}var gf=function(){return this.each(ef)};function kf(){this.previousSibling&&this.parentNode.insertBefore(this,this.parentNode.firstChild)}var pf=function(){return this.each(kf)};function rf(e){return function(){var r=this.ownerDocument,t=this.namespaceURI;return t===Sa&&r.documentElement.namespaceURI===Sa?r.createElement(e):r.createElementNS(t,e)}}function sf(e){return function(){return this.ownerDocument.createElementNS(e.space,e.local)}}var Hb=function(e){var r=Sb(e);return(r.local?sf:rf)(r)};var vf=function(t){var r="function"==typeof t?t:Hb(t);return this.select(function(){return this.appendChild(r.apply(this,arguments))})};function wf(){return null}var zf=function(t,r){var e="function"==typeof t?t:Hb(t),$=null==r?wf:"function"==typeof r?r:Gc(r);return this.select(function(){return this.insertBefore(e.apply(this,arguments),$.apply(this,arguments)||null)})};function Af(){var e=this.parentNode;e&&e.removeChild(this)}var Bf=function(){return this.each(Af)};function Cf(){return this.parentNode.insertBefore(this.cloneNode(!1),this.nextSibling)}function Ef(){return this.parentNode.insertBefore(this.cloneNode(!0),this.nextSibling)}var Ff=function(e){return this.select(e?Ef:Cf)};var Gf=function(t){return arguments.length?this.property("__data__",t):this.node().__data__};var Hf={},Ib=null;if("undefined"!=typeof document){var Jf=document.documentElement;"onmouseenter"in Jf||(Hf={mouseenter:"mouseover",mouseleave:"mouseout"})}function Kf(e,t,n){return e=Jb(e,t,n),function(t){var n=t.relatedTarget;n&&(n===this||8&n.compareDocumentPosition(this))||e.call(this,t)}}function Jb(e,t,n){return function(r){var $=Ib;Ib=r;try{e.call(this,this.__data__,t,n)}finally{Ib=$}}}function Nf(e){return e.trim().split(/^|\s+/).map(function(e){var t="",n=e.indexOf(".");return n>=0&&(t=e.slice(n+1),e=e.slice(0,n)),{type:e,name:t}})}function Pf(e){return function(){var t=this.__on;if(t){for(var n,r=0,$=-1,i=t.length;r<i;++r)n=t[r],e.type&&n.type!==e.type||n.name!==e.name?t[++$]=n:this.removeEventListener(n.type,n.listener,n.capture);++$?t.length=$:delete this.__on}}}function Sf(e,t,n){var r=Hf.hasOwnProperty(e.type)?Kf:Jb;return function($,i,p){var o,a=this.__on,v=r(t,i,p);if(a)for(var s=0,u=a.length;s<u;++s)if((o=a[s]).type===e.type&&o.name===e.name)return this.removeEventListener(o.type,o.listener,o.capture),this.addEventListener(o.type,o.listener=v,o.capture=n),void(o.value=t);this.addEventListener(e.type,v,n),o={type:e.type,name:e.name,value:t,listener:v,capture:n},a?a.push(o):this.__on=[o]}}var Wf=function(e,t,n){var r,$,i=Nf(e+""),p=i.length;if(!(arguments.length<2)){for(o=t?Sf:Pf,null==n&&(n=!1),r=0;r<p;++r)this.each(o(i[r],t,n));return this}var o=this.node().__on;if(o)for(var a,v=0,s=o.length;v<s;++v)for(r=0,a=o[v];r<p;++r)if(($=i[r]).type===a.type&&$.name===a.name)return a.value};function Kb(t,n,e){var $=sc(t),a=$.CustomEvent;"function"==typeof a?a=new a(n,e):(a=$.document.createEvent("Event"),e?(a.initEvent(n,e.bubbles,e.cancelable),a.detail=e.detail):a.initEvent(n,!1,!1)),t.dispatchEvent(a)}function _f(t,n){return function(){return Kb(this,t,n)}}function dg(t,n){return function(){return Kb(this,t,n.apply(this,arguments))}}var eg=function(t,n){return this.each(("function"==typeof n?dg:_f)(t,n))};var Lb=[null];function m(e,$){this._groups=e,this._parents=$}function pg(){return new m([[document.documentElement]],Lb)}m.prototype=pg.prototype={constructor:m,select:tf,selectAll:Od,filter:De,data:$f,enter:He,exit:fg,join:mg,merge:qg,order:Sg,sort:Vg,call:uh,nodes:Hh,node:kd,size:pd,empty:rd,each:sd,attr:Pd,style:ve,property:Be,classed:Oe,text:$e,html:df,raise:gf,lower:pf,append:vf,insert:zf,remove:Bf,clone:Ff,datum:Gf,on:Wf,dispatch:eg};var j=function(e){return"string"==typeof e?new m([[document.querySelector(e)]],[document.documentElement]):new m([[e]],Lb)};var Og=function(){for(var e,r=Ib;e=r.sourceEvent;)r=e;return r};var Rg=function(e,t){var n=e.ownerSVGElement||e;if(n.createSVGPoint){var r=n.createSVGPoint();return r.x=t.clientX,r.y=t.clientY,[(r=r.matrixTransform(e.getScreenCTM().inverse())).x,r.y]}var i=e.getBoundingClientRect();return[t.clientX-i.left-e.clientLeft,t.clientY-i.top-e.clientTop]};var A=function(e){var $=Og();return $.changedTouches&&($=$.changedTouches[0]),Rg(e,$)};function jb(){var n,r,t=Gb().unknown(void 0),e=t.domain,i=t.range,u=0,a=1,o=!1,$=0,l=0,g=.5;function d(){var t=e().length,d=a<u,p=d?a:u,c=d?u:a;n=(c-p)/Math.max(1,t-$+2*l),o&&(n=Math.floor(n)),p+=(c-p-n*(t-$))*g,r=n*(1-$),o&&(p=Math.round(p),r=Math.round(r));var f=od(t).map(function(r){return p+n*r});return i(d?f.reverse():f)}return delete t.unknown,t.domain=function(n){return arguments.length?(e(n),d()):e()},t.range=function(n){return arguments.length?([u,a]=n,u=+u,a=+a,d()):[u,a]},t.rangeRound=function(n){return[u,a]=n,u=+u,a=+a,o=!0,d()},t.bandwidth=function(){return r},t.step=function(){return n},t.round=function(n){return arguments.length?(o=!!n,d()):o},t.padding=function(n){return arguments.length?($=Math.min(1,l=+n),d()):$},t.paddingInner=function(n){return arguments.length?($=Math.min(1,n),d()):$},t.paddingOuter=function(n){return arguments.length?(l=+n,d()):l},t.align=function(n){return arguments.length?(g=Math.max(0,Math.min(1,n)),d()):g},t.copy=function(){return jb(e(),[u,a]).round(o).paddingInner($).paddingOuter(l).align(g)},Ca.apply(d(),arguments)}function ac(n){var r=n.copy;return n.padding=n.paddingOuter,delete n.paddingInner,delete n.paddingOuter,n.copy=function(){return ac(r())},n}function qh(){return ac(jb.apply(null,arguments).paddingInner(1))}var jc=function($,t){return $<t?-1:$>t?1:$>=t?0:NaN};var kc=function(r){return 1===r.length&&(r=jd(r)),{left:function(n,t,e,$){for(null==e&&(e=0),null==$&&($=n.length);e<$;){var a=e+$>>>1;r(n[a],t)<0?e=a+1:$=a}return e},right:function(n,t,e,$){for(null==e&&(e=0),null==$&&($=n.length);e<$;){var a=e+$>>>1;r(n[a],t)>0?$=a:e=a+1}return e}}};function jd(r){return function(n,t){return jc(r(n),t)}}var nc=kc(jc),ld=nc.right;var yi=nc.left;var od=function(t,e,r){t=+t,e=+e,r=(a=arguments.length)<2?(e=t,t=0,1):a<3?1:+r;for(var $=-1,a=0|Math.max(0,Math.ceil((e-t)/r)),c=new Array(a);++$<a;)c[$]=t+$*r;return c};var nb=Math.sqrt(50),pb=Math.sqrt(10),tb=Math.sqrt(2),wd=function($,t,r){var e,a,o,z,E=-1;if(r=+r,($=+$)===(t=+t)&&r>0)return[$];if((e=t<$)&&(a=$,$=t,t=a),0===(z=Da($,t,r))||!isFinite(z))return[];if(z>0)for($=Math.ceil($/z),t=Math.floor(t/z),o=new Array(a=Math.ceil(t-$+1));++E<a;)o[E]=($+E)*z;else for($=Math.floor($*z),t=Math.ceil(t*z),o=new Array(a=Math.ceil($-t+1));++E<a;)o[E]=($-E)/z;return e&&o.reverse(),o};function Da($,t,r){var e=(t-$)/Math.max(0,r),a=Math.floor(Math.log(e)/Math.LN10),o=e/Math.pow(10,a);return a>=0?(o>=nb?10:o>=pb?5:o>=tb?2:1)*Math.pow(10,a):-Math.pow(10,-a)/(o>=nb?10:o>=pb?5:o>=tb?2:1)}function Pa($,t,r){var e=Math.abs(t-$)/Math.max(0,r),a=Math.pow(10,Math.floor(Math.log(e)/Math.LN10)),o=e/a;return o>=nb?a*=10:o>=pb?a*=5:o>=tb&&(a*=2),t<$?-a:a}function Ca(t,e){switch(arguments.length){case 0:break;case 1:this.range(t);break;default:this.range(e).domain(t);}return this}const Fb=Symbol("implicit");function Gb(){var t=new Map,n=[],e=[],r=Fb;function i(i){var $=i+"",o=t.get($);if(!o){if(r!==Fb)return r;t.set($,o=n.push(i))}return e[(o-1)%e.length]}return i.domain=function(e){if(!arguments.length)return n.slice();n=[],t=new Map;for(const r of e){const e=r+"";t.has(e)||t.set(e,n.push(r))}return i},i.range=function(t){return arguments.length?(e=Array.from(t),i):e.slice()},i.unknown=function(t){return arguments.length?(r=t,i):r},i.copy=function(){return Gb(n,e).unknown(r)},Ca.apply(i,arguments),i}function Fd(t){var r=t.domain;return t.ticks=function(t){var $=r();return wd($[0],$[$.length-1],null==t?10:t)},t.tickFormat=function(t,$){var e=r();return _d(e[0],e[e.length-1],null==t?10:t,$)},t.nice=function($){null==$&&($=10);var e,i=r(),n=0,o=i.length-1,a=i[n],c=i[o];return c<a&&(e=a,a=c,c=e,e=n,n=o,o=e),(e=Da(a,c,$))>0?(a=Math.floor(a/e)*e,c=Math.ceil(c/e)*e,e=Da(a,c,$)):e<0&&(a=Math.ceil(a*e)/e,c=Math.floor(c*e)/e,e=Da(a,c,$)),e>0?(i[n]=Math.floor(a/e)*e,i[o]=Math.ceil(c/e)*e,r(i)):e<0&&(i[n]=Math.ceil(a*e)/e,i[o]=Math.floor(c*e)/e,r(i)),t},t}function K(){var t=Vc(w,w);return t.copy=function(){return Uc(t,K())},Ca.apply(t,arguments),Fd(t)}function x(){}var J=function(t,e,r){t.prototype=e.prototype=r,r.constructor=t};function $(t,e){var r=Object.create(t.prototype);for(var o in e)r[o]=e[o];return r}var C=.7;var I=1/C;var H="\\s*([+-]?\\d+)\\s*",T="\\s*([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)\\s*",e="\\s*([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)%\\s*",ae=/^#([0-9a-f]{3})$/,ce=/^#([0-9a-f]{6})$/,de=new RegExp("^rgb\\("+[H,H,H]+"\\)$"),ee=new RegExp("^rgb\\("+[e,e,e]+"\\)$"),fe=new RegExp("^rgba\\("+[H,H,H,T]+"\\)$"),ge=new RegExp("^rgba\\("+[e,e,e,T]+"\\)$"),me=new RegExp("^hsl\\("+[T,e,e]+"\\)$"),re=new RegExp("^hsla\\("+[T,e,e,T]+"\\)$"),Wb={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074};function Xb(){return this.rgb().formatHex()}function xe(){return Fc(this).formatHsl()}function _b(){return this.rgb().formatRgb()}function ba(r){var e;return r=(r+"").trim().toLowerCase(),(e=ae.exec(r))?new g((e=parseInt(e[1],16))>>8&15|e>>4&240,e>>4&15|240&e,(15&e)<<4|15&e,1):(e=ce.exec(r))?bc(parseInt(e[1],16)):(e=de.exec(r))?new g(e[1],e[2],e[3],1):(e=ee.exec(r))?new g(255*e[1]/100,255*e[2]/100,255*e[3]/100,1):(e=fe.exec(r))?fc(e[1],e[2],e[3],e[4]):(e=ge.exec(r))?fc(255*e[1]/100,255*e[2]/100,255*e[3]/100,e[4]):(e=me.exec(r))?uc(e[1],e[2]/100,e[3]/100,1):(e=re.exec(r))?uc(e[1],e[2]/100,e[3]/100,e[4]):Wb.hasOwnProperty(r)?bc(Wb[r]):"transparent"===r?new g(NaN,NaN,NaN,0):null}function bc(r){return new g(r>>16&255,r>>8&255,255&r,1)}function fc(r,e,$,t){return t<=0&&(r=e=$=NaN),new g(r,e,$,t)}function lb(r){return r instanceof x||(r=ba(r)),r?new g((r=r.rgb()).r,r.g,r.b,r.opacity):new g}function Ba(r,e,$,t){return 1===arguments.length?lb(r):new g(r,e,$,null==t?1:t)}function g(r,e,$,t){this.r=+r,this.g=+e,this.b=+$,this.opacity=+t}function oc(){return"#"+qb(this.r)+qb(this.g)+qb(this.b)}function qc(){var r=this.opacity;return(1===(r=isNaN(r)?1:Math.max(0,Math.min(1,r)))?"rgb(":"rgba(")+Math.max(0,Math.min(255,Math.round(this.r)||0))+", "+Math.max(0,Math.min(255,Math.round(this.g)||0))+", "+Math.max(0,Math.min(255,Math.round(this.b)||0))+(1===r?")":", "+r+")")}function qb(r){return((r=Math.max(0,Math.min(255,Math.round(r)||0)))<16?"0":"")+r.toString(16)}function uc(r,e,$,t){return t<=0?r=e=$=NaN:$<=0||$>=1?r=e=NaN:e<=0&&(r=NaN),new s(r,e,$,t)}function Fc(r){if(r instanceof s)return new s(r.h,r.s,r.l,r.opacity);if(r instanceof x||(r=ba(r)),!r)return new s;if(r instanceof s)return r;var e=(r=r.rgb()).r/255,$=r.g/255,t=r.b/255,a=Math.min(e,$,t),o=Math.max(e,$,t),n=NaN,i=o-a,l=(o+a)/2;return i?(n=e===o?($-t)/i+6*($<t):$===o?(t-e)/i+2:(e-$)/i+4,i/=l<.5?o+a:2-o-a,n*=60):i=l>0&&l<1?0:n,new s(n,i,l,r.opacity)}function rb(r,e,$,t){return 1===arguments.length?Fc(r):new s(r,e,$,null==t?1:t)}function s(r,e,$,t){this.h=+r,this.s=+e,this.l=+$,this.opacity=+t}function Ha(r,e,$){return 255*(r<60?e+($-e)*r/60:r<180?$:r<240?e+($-e)*(240-r)/60:e)}J(x,ba,{copy:function(r){return Object.assign(new this.constructor,this,r)},displayable:function(){return this.rgb().displayable()},hex:Xb,formatHex:Xb,formatHsl:xe,formatRgb:_b,toString:_b}),J(g,Ba,$(x,{brighter:function(r){return r=null==r?I:Math.pow(I,r),new g(this.r*r,this.g*r,this.b*r,this.opacity)},darker:function(r){return r=null==r?C:Math.pow(C,r),new g(this.r*r,this.g*r,this.b*r,this.opacity)},rgb:function(){return this},displayable:function(){return-.5<=this.r&&this.r<255.5&&-.5<=this.g&&this.g<255.5&&-.5<=this.b&&this.b<255.5&&0<=this.opacity&&this.opacity<=1},hex:oc,formatHex:oc,formatRgb:qc,toString:qc})),J(s,rb,$(x,{brighter:function(r){return r=null==r?I:Math.pow(I,r),new s(this.h,this.s,this.l*r,this.opacity)},darker:function(r){return r=null==r?C:Math.pow(C,r),new s(this.h,this.s,this.l*r,this.opacity)},rgb:function(){var r=this.h%360+360*(this.h<0),e=isNaN(r)||isNaN(this.s)?0:this.s,$=this.l,t=$+($<.5?$:1-$)*e,a=2*$-t;return new g(Ha(r>=240?r-240:r+120,a,t),Ha(r,a,t),Ha(r<120?r+240:r-120,a,t),this.opacity)},displayable:function(){return(0<=this.s&&this.s<=1||isNaN(this.s))&&0<=this.l&&this.l<=1&&0<=this.opacity&&this.opacity<=1},formatHsl:function(){var r=this.opacity;return(1===(r=isNaN(r)?1:Math.max(0,Math.min(1,r)))?"hsl(":"hsla(")+(this.h||0)+", "+100*(this.s||0)+"%, "+100*(this.l||0)+"%"+(1===r?")":", "+r+")")}}));var Wc=Math.PI/180;var Xc=180/Math.PI;var za=18,_c=.96422,ad=1,yb=.82521,zb=4/29,G=6/29,Bb=3*G*G,of=G*G*G;function Cb($){if($ instanceof i)return new i($.l,$.a,$.b,$.opacity);if($ instanceof o)return Mb($);$ instanceof g||($=lb($));var r,t,a=$a($.r),f=$a($.g),e=$a($.b),n=Xa((.2225045*a+.7168786*f+.0606169*e)/ad);return a===f&&f===e?r=t=n:(r=Xa((.4360747*a+.3850649*f+.1430804*e)/_c),t=Xa((.0139322*a+.0971045*f+.7141733*e)/yb)),new i(116*n-16,500*(r-n),200*(n-t),$.opacity)}function qf($,r,t,a){return 1===arguments.length?Cb($):new i($,r,t,null==a?1:a)}function i($,r,t,a){this.l=+$,this.a=+r,this.b=+t,this.opacity=+a}function Xa($){return $>of?Math.pow($,1/3):$/Bb+zb}function Ya($){return $>G?$*$*$:Bb*($-zb)}function Za($){return 255*($<=.0031308?12.92*$:1.055*Math.pow($,1/2.4)-.055)}function $a($){return($/=255)<=.04045?$/12.92:Math.pow(($+.055)/1.055,2.4)}function xf($){if($ instanceof o)return new o($.h,$.c,$.l,$.opacity);if($ instanceof i||($=Cb($)),0===$.a&&0===$.b)return new o(NaN,0<$.l&&$.l<100?0:NaN,$.l,$.opacity);var r=Math.atan2($.b,$.a)*Xc;return new o(r<0?r+360:r,Math.sqrt($.a*$.a+$.b*$.b),$.l,$.opacity)}function fb($,r,t,a){return 1===arguments.length?xf($):new o($,r,t,null==a?1:a)}function o($,r,t,a){this.h=+$,this.c=+r,this.l=+t,this.opacity=+a}function Mb($){if(isNaN($.h))return new i($.l,0,0,$.opacity);var r=$.h*Wc;return new i($.l,Math.cos(r)*$.c,Math.sin(r)*$.c,$.opacity)}J(i,qf,$(x,{brighter:function($){return new i(this.l+za*(null==$?1:$),this.a,this.b,this.opacity)},darker:function($){return new i(this.l-za*(null==$?1:$),this.a,this.b,this.opacity)},rgb:function(){var $=(this.l+16)/116,r=isNaN(this.a)?$:$+this.a/500,t=isNaN(this.b)?$:$-this.b/200;return r=_c*Ya(r),$=ad*Ya($),t=yb*Ya(t),new g(Za(3.1338561*r-1.6168667*$-.4906146*t),Za(-.9787684*r+1.9161415*$+.033454*t),Za(.0719453*r-.2289914*$+1.4052427*t),this.opacity)}})),J(o,fb,$(x,{brighter:function($){return new o(this.h,this.c,this.l+za*(null==$?1:$),this.opacity)},darker:function($){return new o(this.h,this.c,this.l-za*(null==$?1:$),this.opacity)},rgb:function(){return Mb(this).rgb()}}));var Nb=-.14861,hb=1.78277,ib=-.29227,ya=-.90649,R=1.97294,Tb=R*ya,Ub=R*hb,Vb=hb*ib-ya*Nb;function Lf($){if($ instanceof y)return new y($.h,$.s,$.l,$.opacity);$ instanceof g||($=lb($));var r=$.r/255,t=$.g/255,e=$.b/255,C=(Vb*e+Tb*r-Ub*t)/(Vb+Tb-Ub),a=e-C,M=(R*(t-C)-ib*a)/ya,i=Math.sqrt(M*M+a*a)/(R*C*(1-C)),X=i?Math.atan2(M,a)*Xc-120:NaN;return new y(X<0?X+360:X,i,C,$.opacity)}function mb($,r,t,e){return 1===arguments.length?Lf($):new y($,r,t,null==e?1:e)}function y($,r,t,e){this.h=+$,this.s=+r,this.l=+t,this.opacity=+e}J(y,mb,$(x,{brighter:function($){return $=null==$?I:Math.pow(I,$),new y(this.h,this.s,this.l*$,this.opacity)},darker:function($){return $=null==$?C:Math.pow(C,$),new y(this.h,this.s,this.l*$,this.opacity)},rgb:function(){var $=isNaN(this.h)?0:(this.h+120)*Wc,r=+this.l,t=isNaN(this.s)?0:this.s*r*(1-r),e=Math.cos($),C=Math.sin($);return new g(255*(r+t*(Nb*e+hb*C)),255*(r+t*(ib*e+ya*C)),255*(r+t*(R*e)),this.opacity)}}));function Zb($,r,t,e,a){var l=$*$,o=l*$;return((1-3*$+3*l-o)*r+(4-6*l+3*o)*t+(1+3*$+3*l-3*o)*e+o*a)/6}var Qf=function($){var r=$.length-1;return function(t){var e=t<=0?t=0:t>=1?(t=1,r-1):Math.floor(t*r),a=$[e],l=$[e+1],o=e>0?$[e-1]:2*a-l,s=e<r-1?$[e+2]:2*l-a;return Zb((t-e/r)*r,o,a,l,s)}};var Rf=function(r){var $=r.length;return function(t){var e=Math.floor(((t%=1)<0?++t:t)*$),n=r[(e+$-1)%$],a=r[e%$],o=r[(e+1)%$],h=r[(e+2)%$];return Zb((t-e/$)*$,n,a,o,h)}};function $b($,t){return function(r){return $+r*t}}function Tf($,t,r){return $=Math.pow($,r),t=Math.pow(t,r)-$,r=1/r,function(n){return Math.pow($+n*t,r)}}function ob($,t){var r=t-$;return r?$b($,r>180||r<-180?r-360*Math.round(r/360):r):va(isNaN($)?t:$)}function Zf($){return 1==($=+$)?h:function(t,r){return r-t?Tf(t,r,$):va(isNaN(t)?r:t)}}function h($,t){var r=t-$;return r?$b($,r):va(isNaN($)?t:$)}var va=function(t){return function(){return t}};var cc=function r($){var o=Zf($);function e(r,$){var e=o((r=Ba(r)).r,($=Ba($)).r),a=o(r.g,$.g),t=o(r.b,$.b),i=h(r.opacity,$.opacity);return function($){return r.r=e($),r.g=a($),r.b=t($),r.opacity=i($),r+""}}return e.gamma=r,e}(1);function dc(r){return function($){var o,e,a=$.length,t=new Array(a),i=new Array(a),v=new Array(a);for(o=0;o<a;++o)e=Ba($[o]),t[o]=e.r||0,i[o]=e.g||0,v[o]=e.b||0;return t=r(t),i=r(i),v=r(v),e.opacity=1,function(r){return e.r=t(r),e.g=i(r),e.b=v(r),e+""}}}var xi=dc(Qf);var wi=dc(Rf);var hg=function(r,e){var t,$=e?e.length:0,a=r?Math.min($,r.length):0,n=new Array(a),o=new Array($);for(t=0;t<a;++t)n[t]=Ga(r[t],e[t]);for(;t<$;++t)o[t]=e[t];return function(r){for(t=0;t<a;++t)o[t]=n[t](r);return o}};var jg=function(e,t){var r=new Date;return t-=e=+e,function($){return r.setTime(e+t*$),r}};var v=function(t,$){return $-=t=+t,function(e){return t+$*e}};var og=function(e,r){var t,$={},i={};for(t in null!==e&&"object"==typeof e||(e={}),null!==r&&"object"==typeof r||(r={}),r)t in e?$[t]=Ga(e[t],r[t]):i[t]=r[t];return function(e){for(t in $)i[t]=$[t](e);return i}};var ub=/[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g,Fa=new RegExp(ub.source,"g");function tg(r){return function(){return r}}function Fg(r){return function($){return r($)+""}}var Hg=function(r,$){var n,e,t,a=ub.lastIndex=Fa.lastIndex=0,u=-1,E=[],o=[];for(r+="",$+="";(n=ub.exec(r))&&(e=Fa.exec($));)(t=e.index)>a&&(t=$.slice(a,t),E[u]?E[u]+=t:E[++u]=t),(n=n[0])===(e=e[0])?E[u]?E[u]+=e:E[++u]=e:(E[++u]=null,o.push({i:u,x:v(n,e)})),a=Fa.lastIndex;return a<$.length&&(t=$.slice(a),E[u]?E[u]+=t:E[++u]=t),E.length<2?o[0]?Fg(o[0].x):tg($):($=o.length,function(r){for(var n,e=0;e<$;++e)E[(n=o[e]).i]=n.x(r);return E.join("")})};var Ga=function(r,$){var e,c=typeof $;return null==$||"boolean"===c?va($):("number"===c?v:"string"===c?(e=ba($))?($=e,cc):Hg:$ instanceof ba?cc:$ instanceof Date?jg:Array.isArray($)?hg:"function"!=typeof $.valueOf&&"function"!=typeof $.toString||isNaN($)?og:v)(r,$)};var Pg=function(t,n){return n-=t=+t,function(r){return Math.round(t+n*r)}};function pc(r,e,t,n){function a(r){return r.length?r.pop()+" ":""}return function($,s){var o=[],p=[];return $=r($),s=r(s),function(r,n,a,$,s,o){if(r!==a||n!==$){var p=s.push("translate(",null,e,null,t);o.push({i:p-4,x:v(r,a)},{i:p-2,x:v(n,$)})}else(a||$)&&s.push("translate("+a+e+$+t)}($.translateX,$.translateY,s.translateX,s.translateY,o,p),function(r,e,t,$){r!==e?(r-e>180?e+=360:e-r>180&&(r+=360),$.push({i:t.push(a(t)+"rotate(",null,n)-2,x:v(r,e)})):e&&t.push(a(t)+"rotate("+e+n)}($.rotate,s.rotate,o,p),function(r,e,t,$){r!==e?$.push({i:t.push(a(t)+"skewX(",null,n)-2,x:v(r,e)}):e&&t.push(a(t)+"skewX("+e+n)}($.skewX,s.skewX,o,p),function(r,e,t,n,$,s){if(r!==t||e!==n){var o=$.push(a($)+"scale(",null,",",null,")");s.push({i:o-4,x:v(r,t)},{i:o-2,x:v(e,n)})}else 1===t&&1===n||$.push(a($)+"scale("+t+","+n+")")}($.scaleX,$.scaleY,s.scaleX,s.scaleY,o,p),$=s=null,function(r){for(var e,t=-1,n=p.length;++t<n;)o[(e=p[t]).i]=e.x(r);return o.join("")}}}var ta,rc,Xg,Ia;function gh($){return"none"===$?Ja:(ta||(ta=document.createElement("DIV"),rc=document.documentElement,Xg=document.defaultView),ta.style.transform=$,$=Xg.getComputedStyle(rc.appendChild(ta),null).getPropertyValue("transform"),rc.removeChild(ta),$=$.slice(7,-1).split(","),yc(+$[0],+$[1],+$[2],+$[3],+$[4],+$[5]))}function ih($){return null==$?Ja:(Ia||(Ia=document.createElementNS("http://www.w3.org/2000/svg","g")),Ia.setAttribute("transform",$),($=Ia.transform.baseVal.consolidate())?($=$.matrix,yc($.a,$.b,$.c,$.d,$.e,$.f)):Ja)}var tc=180/Math.PI,Ja={translateX:0,translateY:0,rotate:0,skewX:0,scaleX:1,scaleY:1};var yc=function(t,e,a,$,r,s){var X,n,w;return(X=Math.sqrt(t*t+e*e))&&(t/=X,e/=X),(w=t*a+e*$)&&(a-=t*w,$-=e*w),(n=Math.sqrt(a*a+$*$))&&(a/=n,$/=n,w/=n),t*$<e*a&&(t=-t,e=-e,w=-w,X=-X),{translateX:r,translateY:s,rotate:Math.atan2(e,t)*tc,skewX:Math.atan(w)*tc,scaleX:X,scaleY:n}};var vi=pc(gh,"px, ","px)","deg)");var ui=pc(ih,", ",")",")");var ti=Math.SQRT2;function Ec($){return function(r,e){var o=$((r=rb(r)).h,(e=rb(e)).h),t=h(r.s,e.s),l=h(r.l,e.l),d=h(r.opacity,e.opacity);return function($){return r.h=o($),r.s=t($),r.l=l($),r.opacity=d($),r+""}}}var si=Ec(ob);var ri=Ec(h);function vb($){return function(r,o){var c=$((r=fb(r)).h,(o=fb(o)).h),t=h(r.c,o.c),x=h(r.l,o.l),l=h(r.opacity,o.opacity);return function($){return r.h=c($),r.c=t($),r.l=x($),r.opacity=l($),r+""}}}var qi=vb(ob);var pi=vb(h);function Ic($){return function r(o){function V(r,V){var e=$((r=mb(r)).h,(V=mb(V)).h),t=h(r.s,V.s),i=h(r.l,V.l),l=h(r.opacity,V.opacity);return function($){return r.h=e($),r.s=t($),r.l=i(Math.pow($,o)),r.opacity=l($),r+""}}return o=+o,V.gamma=r,V}(1)}var oi=Ic(ob);var ni=Ic(h);var ud=function(t){return function(){return t}};var vd=function($){return+$};var Kc=[0,1];function w(r){return r}function Ta(r,n){return(n-=r=+r)?function(t){return(t-r)/n}:ud(isNaN(n)?NaN:.5)}function Sc(r){var n,t=r[0],e=r[r.length-1];return t>e&&(n=t,t=e,e=n),function(r){return Math.max(t,Math.min(e,r))}}function Ad(r,n,t){var e=r[0],$=r[1],a=n[0],o=n[1];return $<e?(e=Ta($,e),a=t(o,a)):(e=Ta(e,$),a=t(a,o)),function(r){return a(e(r))}}function Bd(r,n,t){var e=Math.min(r.length,n.length)-1,$=new Array(e),a=new Array(e),o=-1;for(r[e]<r[0]&&(r=r.slice().reverse(),n=n.slice().reverse());++o<e;)$[o]=Ta(r[o],r[o+1]),a[o]=t(n[o],n[o+1]);return function(n){var t=ld(r,n,1,e)-1;return a[t]($[t](n))}}function Uc(r,n){return n.domain(r.domain()).range(r.range()).interpolate(r.interpolate()).clamp(r.clamp()).unknown(r.unknown())}function Dd(){var r,n,t,e,$,a,o=Kc,i=Kc,u=Ga,p=w;function l(){return e=Math.min(o.length,i.length)>2?Bd:Ad,$=a=null,c}function c(n){return isNaN(n=+n)?t:($||($=e(o.map(r),i,u)))(r(p(n)))}return c.invert=function(t){return p(n((a||(a=e(i,o.map(r),v)))(t)))},c.domain=function(r){return arguments.length?(o=Array.from(r,vd),p===w||(p=Sc(o)),l()):o.slice()},c.range=function(r){return arguments.length?(i=Array.from(r),l()):i.slice()},c.rangeRound=function(r){return i=Array.from(r),u=Pg,l()},c.clamp=function(r){return arguments.length?(p=r?Sc(o):w,c):p!==w},c.interpolate=function(r){return arguments.length?(u=r,l()):u},c.unknown=function(r){return arguments.length?(t=r,c):t},function(t,e){return r=t,n=e,l()}}function Vc(r,n){return Dd()(r,n)}var Wa,Gd,Hd;function Id($){return Wa=Xd($),Gd=Wa.format,Hd=Wa.formatPrefix,Wa}var Ea=function(e,t){if((l=(e=t?e.toExponential(t-1):e.toExponential()).indexOf("e"))<0)return null;var l,n=e.slice(0,l);return[n.length>1?n[0]+n.slice(2):n,+e.slice(l+1)]};var F=function(t){return(t=Ea(Math.abs(t)))?t[1]:NaN};var Ld=function(r,t){return function(e,n){for(var $=e.length,u=[],o=0,a=r[0],f=0;$>0&&a>0&&(f+a+1>n&&(a=Math.max(1,n-f)),u.push(e.substring($-=a,$+a)),!((f+=a+1)>n));)a=r[o=(o+1)%r.length];return u.reverse().join(t)}};var Md=function(t){return function(e){return e.replace(/[0-9]/g,function(e){return t[+e]})}};var Mh=/^(?:(.)?([<>=^]))?([+\-( ])?([$#])?(0)?(\d+)?(,)?(\.\d+)?(~)?([a-z%])?$/i;function oa(i){return new Ma(i)}function Ma(i){if(!(t=Mh.exec(i)))throw new Error("invalid format: "+i);var t;this.fill=t[1]||" ",this.align=t[2]||">",this.sign=t[3]||"-",this.symbol=t[4]||"",this.zero=!!t[5],this.width=t[6]&&+t[6],this.comma=!!t[7],this.precision=t[8]&&+t[8].slice(1),this.trim=!!t[9],this.type=t[10]||""}oa.prototype=Ma.prototype,Ma.prototype.toString=function(){return this.fill+this.align+this.sign+this.symbol+(this.zero?"0":"")+(null==this.width?"":Math.max(1,0|this.width))+(this.comma?",":"")+(null==this.precision?"":"."+Math.max(0,0|this.precision))+(this.trim?"~":"")+this.type};var Qd=function(e){e:for(var r,t=e.length,a=1,$=-1;a<t;++a)switch(e[a]){case".":$=r=a;break;case"0":0===$&&($=a),r=a;break;default:if($>0){if(!+e[a])break e;$=0}}return $>0?e.slice(0,$)+e.slice(r+1):e};var Rd;var Sd=function(e,p){var r,$=Ea(e,p);if(!$)return e+"";var t=$[0],f=$[1],o=f-(r=Rd=3*Math.max(-8,Math.min(8,Math.floor(f/3))),r)+1,x=t.length;return o===x?t:o>x?t+new Array(o-x+1).join("0"):o>0?t.slice(0,o)+"."+t.slice(o):"0."+new Array(1-o).join("0")+Ea(e,Math.max(0,p+o-1))[0]};var bd=function(r,e){var t=Ea(r,e);if(!t)return r+"";var $=t[0],a=t[1];return a<0?"0."+new Array(-a).join("0")+$:$.length>a+1?$.slice(0,a+1)+"."+$.slice(a+1):$+new Array(a-$.length+2).join("0")};var cd={"%":function(t,r){return(100*t).toFixed(r)},b:function(t){return Math.round(t).toString(2)},c:function(t){return t+""},d:function(t){return Math.round(t).toString(10)},e:function(t,r){return t.toExponential(r)},f:function(t,r){return t.toFixed(r)},g:function(t,r){return t.toPrecision(r)},o:function(t){return Math.round(t).toString(8)},p:function(t,r){return bd(100*t,r)},r:bd,s:Sd,X:function(t){return Math.round(t).toString(16).toUpperCase()},x:function(t){return Math.round(t).toString(16)}};var wb=function(t){return t};var xb=["y","z","a","f","p","n","\xB5","m","","k","M","G","T","P","E","Z","Y"],Xd=function(r){var e=r.grouping&&r.thousands?Ld(r.grouping,r.thousands):wb,t=r.currency,a=r.decimal,m=r.numerals?Md(r.numerals):wb,$=r.percent||"%";function i(r){var i=(r=oa(r)).fill,o=r.align,n=r.sign,p=r.symbol,f=r.zero,l=r.width,s=r.comma,u=r.precision,M=r.trim,c=r.type;"n"===c?(s=!0,c="g"):cd[c]||(null==u&&(u=12),M=!0,c="g"),(f||"0"===i&&"="===o)&&(f=!0,i="0",o="=");var I="$"===p?t[0]:"#"===p&&/[boxX]/.test(c)?"0"+c.toLowerCase():"",V="$"===p?t[1]:/[%p]/.test(c)?$:"",h=cd[c],g=/[defgprs%]/.test(c);function x(r){var t,$,p,x=I,d=V;if("c"===c)d=h(r)+d,r="";else{var v=(r=+r)<0;if(r=h(Math.abs(r),u),M&&(r=Qd(r)),v&&0==+r&&(v=!1),x=(v?"("===n?n:"-":"-"===n||"("===n?"":n)+x,d=("s"===c?xb[8+Rd/3]:"")+d+(v&&"("===n?")":""),g)for(t=-1,$=r.length;++t<$;)if(48>(p=r.charCodeAt(t))||p>57){d=(46===p?a+r.slice(t+1):r.slice(t))+d,r=r.slice(0,t);break}}s&&!f&&(r=e(r,1/0));var y=x.length+r.length+d.length,q=y<l?new Array(l-y+1).join(i):"";switch(s&&f&&(r=e(q+r,q.length?l-d.length:1/0),q=""),o){case"<":r=x+r+d+q;break;case"=":r=x+q+r+d;break;case"^":r=q.slice(0,y=q.length>>1)+x+r+d+q.slice(y);break;default:r=q+x+r+d;}return m(r)}return u=null==u?6:/[gprs]/.test(c)?Math.max(1,Math.min(21,u)):Math.max(0,Math.min(20,u)),x.toString=function(){return r+""},x}return{format:i,formatPrefix:function(r,e){var t=i(((r=oa(r)).type="f",r)),a=3*Math.max(-8,Math.min(8,Math.floor(F(e)/3))),m=Math.pow(10,-a),$=xb[8+a/3];return function(r){return t(m*r)+$}}}};Id({decimal:".",thousands:",",grouping:[3],currency:["$",""]});var Yd=function(e){return Math.max(0,-F(Math.abs(e)))};var Zd=function(t,$){return Math.max(0,3*Math.max(-8,Math.min(8,Math.floor(F($)/3)))-F(Math.abs(t)))};var $d=function($,e){return $=Math.abs($),e=Math.abs(e)-$,Math.max(0,F(e)-F($))+1};var _d=function(a,r,e,i){var $,t=Pa(a,r,e);switch((i=oa(null==i?",f":i)).type){case"s":var p=Math.max(Math.abs(a),Math.abs(r));return null!=i.precision||isNaN($=Zd(t,p))||(i.precision=$),Hd(i,p);case"":case"e":case"g":case"p":case"r":null!=i.precision||isNaN($=$d(t,Math.max(Math.abs(a),Math.abs(r))))||(i.precision=$-("e"===i.type));break;case"f":case"%":null!=i.precision||isNaN($=Yd(t))||(i.precision=$-2*("%"===i.type));}return Gd(i)};var ab=Array.prototype.slice;var be=function(x){return x};var bb=1,cb=2,eb=3,aa=4,Db=1e-6;function he(t){return"translate("+(t+.5)+",0)"}function ie(t){return"translate(0,"+(t+.5)+")"}function je(t){return function(r){return+t(r)}}function ke(t){var r=Math.max(0,t.bandwidth()-1)/2;return t.round()&&(r=Math.round(r)),function($){return+t($)+r}}function le(){return!this.__axis}function Eb(t,r){var $=[],n=null,e=null,a=6,i=6,c=3,o=t===bb||t===aa?-1:1,l=t===aa||t===cb?"x":"y",s=t===bb||t===eb?he:ie;function u(u){var f=null==n?r.ticks?r.ticks.apply(r,$):r.domain():n,p=null==e?r.tickFormat?r.tickFormat.apply(r,$):be:e,v=Math.max(a,0)+c,x=r.range(),m=+x[0]+.5,h=+x[x.length-1]+.5,g=(r.bandwidth?ke:je)(r.copy()),d=u.selection?u.selection():u,k=d.selectAll(".domain").data([null]),y=d.selectAll(".tick").data(f,r).order(),b=y.exit(),M=y.enter().append("g").attr("class","tick"),_=y.select("line"),F=y.select("text");k=k.merge(k.enter().insert("path",".tick").attr("class","domain").attr("stroke","currentColor")),y=y.merge(M),_=_.merge(M.append("line").attr("stroke","currentColor").attr(l+"2",o*a)),F=F.merge(M.append("text").attr("fill","currentColor").attr(l,o*v).attr("dy",t===bb?"0em":t===eb?"0.71em":"0.32em")),u!==d&&(k=k.transition(u),y=y.transition(u),_=_.transition(u),F=F.transition(u),b=b.transition(u).attr("opacity",Db).attr("transform",function(t){return isFinite(t=g(t))?s(t):this.getAttribute("transform")}),M.attr("opacity",Db).attr("transform",function(t){var r=this.parentNode.__axis;return s(r&&isFinite(r=r(t))?r:g(t))})),b.remove(),k.attr("d",t===aa||t==cb?i?"M"+o*i+","+m+"H0.5V"+h+"H"+o*i:"M0.5,"+m+"V"+h:i?"M"+m+","+o*i+"V0.5H"+h+"V"+o*i:"M"+m+",0.5H"+h),y.attr("opacity",1).attr("transform",function(t){return s(g(t))}),_.attr(l+"2",o*a),F.attr(l,o*v).text(p),d.filter(le).attr("fill","none").attr("font-size",10).attr("font-family","sans-serif").attr("text-anchor",t===cb?"start":t===aa?"end":"middle"),d.each(function(){this.__axis=g})}return u.scale=function(t){return arguments.length?(r=t,u):r},u.ticks=function(){return $=ab.call(arguments),u},u.tickArguments=function(t){return arguments.length?($=null==t?[]:ab.call(t),u):$.slice()},u.tickValues=function(t){return arguments.length?(n=null==t?null:ab.call(t),u):n&&n.slice()},u.tickFormat=function(t){return arguments.length?(e=t,u):e},u.tickSize=function(t){return arguments.length?(a=i=+t,u):a},u.tickSizeInner=function(t){return arguments.length?(a=+t,u):a},u.tickSizeOuter=function(t){return arguments.length?(i=+t,u):i},u.tickPadding=function(t){return arguments.length?(c=+t,u):c},u}function ne(t){return Eb(eb,t)}function oe(t){return Eb(aa,t)}const pe=(t,{yScale:l,tickCount:e,fontFamily:i,unxkcdify:a})=>{t.append("g").call(oe(l).tickSize(1).tickPadding(10).ticks(e,"s")),t.selectAll(".domain").attr("filter",a?null:"url(#xkcdify)").style("stroke","black"),t.selectAll(".tick > text").style("font-family",i).style("font-size","16")},qe=(t,{xScale:l,tickCount:e,moveDown:i,fontFamily:a,unxkcdify:s})=>{t.append("g").attr("transform",`translate(0,${i})`).call(ne(l).tickSize(0).tickPadding(6).ticks(e)),t.selectAll(".domain").attr("filter",s?null:"url(#xkcdify)").style("stroke","black"),t.selectAll(".tick > text").style("font-family",a).style("font-size","16")};var E={xAxis:qe,yAxis:pe};const se=(t,e)=>{t.append("text").style("font-size","20").style("font-weight","bold").attr("x","50%").attr("y",30).attr("text-anchor","middle").text(e)},te=(t,e)=>{t.append("text").style("font-size",17).attr("x","50%").attr("y",t.attr("height")-10).attr("text-anchor","middle").text(e)},ue=(t,e)=>{t.append("text").attr("text-anchor","end").attr("dy",".75em").attr("transform","rotate(-90)").style("font-size",17).text(e).attr("y",6).call(e=>{const a=e.node().getComputedTextLength();e.attr("x",0-t.attr("height")/2+a/2)})};var u={title:se,xLabel:te,yLabel:ue};const b={positionType:{upLeft:1,upRight:2,downLeft:3,downRight:4}};class L{constructor({parent:t,title:i,items:e,position:s,unxkcdify:r}){this.title=i,this.items=e,this.position=s,this.filter=r?null:"url(#xkcdify)",this.svg=t.append("svg").attr("x",this._getUpLeftX()).attr("y",this._getUpLeftY()).style("visibility","hidden"),this.tipBackground=this.svg.append("rect").style("fill","white").attr("fill-opacity",.85).attr("stroke","#aaa").attr("stroke-width",2).attr("rx",5).attr("ry",5).attr("filter",this.filter).attr("width",this._getBackgroundWidth()).attr("height",this._getBackgroundHeight()).attr("x",5).attr("y",5),this.tipTitle=this.svg.append("text").style("font-size",15).style("font-weight","bold").attr("x",15).attr("y",25).text(i),this.tipItems=e.map((t,i)=>{return this._generateTipItem(t,i)})}show(){this.svg.style("visibility","visible")}hide(){this.svg.style("visibility","hidden")}update({title:t,items:i,position:e}){t&&t!==this.title&&(this.title=t,this.tipTitle.text(t)),i&&JSON.stringify(i)!==JSON.stringify(this.items)&&(this.items=i,this.tipItems.forEach(t=>t.remove()),this.tipItems=this.items.map((t,i)=>{return this._generateTipItem(t,i)}),this.tipBackground.attr("width",this._getBackgroundWidth()).attr("height",this._getBackgroundHeight())),e&&(this.position=e,this.svg.attr("x",this._getUpLeftX()),this.svg.attr("y",this._getUpLeftY()))}_generateTipItem(t,i){const e=this.svg.append("g");return e.append("rect").style("fill",t.color).attr("width",8).attr("height",8).attr("rx",2).attr("ry",2).attr("filter",this.filter).attr("x",15).attr("y",37+20*i),e.append("text").style("font-size","15").attr("x",27).attr("y",37+20*i+8).text(t.text),e}_getBackgroundWidth(){const t=this.items.reduce((t,i)=>t>i.text.length?t:i.text.length,0);return 7.4*Math.max(t,this.title.length)+25}_getBackgroundHeight(){return 20*(this.items.length+1)+10}_getUpLeftX(){return this.position.type===b.positionType.upRight||this.position.type===b.positionType.downRight?this.position.x:this.position.x-this._getBackgroundWidth()-20}_getUpLeftY(){return this.position.type===b.positionType.downLeft||this.position.type===b.positionType.downRight?this.position.y:this.position.y-this._getBackgroundHeight()-20}}function M(A){A.append("defs").append("style").attr("type","text/css").text("@font-face {\n      font-family: \"xkcd\";\n      src: url(data:application/font-woff;charset=utf-8;base64,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) format('woff');\n    }")}function N(t){t.append("filter").attr("id","xkcdify").attr("filterUnits","userSpaceOnUse").attr("x",-5).attr("y",-5).attr("width","100%").attr("height","100%").call(t=>t.append("feTurbulence").attr("type","fractalNoise").attr("baseFrequency","0.05").attr("result","noise")).call(t=>t.append("feDisplacementMap").attr("scale","5").attr("xChannelSelector","R").attr("yChannelSelector","G").attr("in","SourceGraphic").attr("in2","noise")),t.append("filter").attr("id","xkcdify-pie").call(t=>t.append("feTurbulence").attr("type","fractalNoise").attr("baseFrequency","0.05").attr("result","noise")).call(t=>t.append("feDisplacementMap").attr("scale","5").attr("xChannelSelector","R").attr("yChannelSelector","G").attr("in","SourceGraphic").attr("in2","noise"))}var k=["#dd4528","#28a3dd","#f3db52","#ed84b5","#4ab74e","#9179c0","#8e6d5a","#f19839","#949494"];const l={top:50,right:30,bottom:50,left:50};class Ce{constructor(t,{title:i,xLabel:e,yLabel:a,data:{labels:s,datasets:o},options:r={unxkcdify:!1,yTickCount:3,dataColors:[],fontFamily:"xkcd"}}){i&&(this.title=i,l.top=60),e&&(this.xLabel=e,l.bottom=50),a&&(this.yLabel=a,l.left=70),this.data={labels:s,datasets:o},this.options=r,this.filter="url(#xkcdify)",this.fontFamily=this.options.fontFamily||"xkcd",r.unxkcdify&&(this.filter=null,this.fontFamily="-apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif"),this.svgEl=j(t).style("stroke-width","3").style("font-family",this.fontFamily).attr("width",t.parentElement.clientWidth).attr("height",Math.min(2*t.parentElement.clientWidth/3,window.innerHeight)),this.svgEl.selectAll("*").remove(),this.chart=this.svgEl.append("g").attr("transform",`translate(${l.left},${l.top})`),this.width=this.svgEl.attr("width")-l.left-l.right,this.height=this.svgEl.attr("height")-l.top-l.bottom,M(this.svgEl),N(this.svgEl),this.render()}render(){this.title&&u.title(this.svgEl,this.title),this.xLabel&&u.xLabel(this.svgEl,this.xLabel),this.yLabel&&u.yLabel(this.svgEl,this.yLabel);const t=new L({parent:this.svgEl,title:"tooltip",items:[{color:"red",text:"weweyang: 12"},{color:"blue",text:"timqian: 13"}],position:{x:30,y:30,type:b.positionType.upRight},unxkcdify:this.options.unxkcdify}),i=jb().range([0,this.width]).domain(this.data.labels).padding(.4),e=this.data.datasets.reduce((t,i)=>t.concat(i.data),[]),a=K().domain([0,Math.max(...e)]).range([this.height,0]),s=this.chart.append("g");E.xAxis(s,{xScale:i,tickCount:3,moveDown:this.height,fontFamily:this.fontFamily,unxkcdify:this.options.unxkcdify}),E.yAxis(s,{yScale:a,tickCount:this.options.yTickCount||3,fontFamily:this.fontFamily,unxkcdify:this.options.unxkcdify}),s.selectAll(".xkcd-chart-bar").data(this.data.datasets[0].data).enter().append("rect").attr("class","xkcd-chart-bar").attr("x",(t,e)=>i(this.data.labels[e])).attr("width",i.bandwidth()).attr("y",t=>a(t)).attr("height",t=>this.height-a(t)).attr("fill","none").attr("pointer-events","all").attr("stroke","black").attr("stroke-width",3).attr("rx",2).attr("filter",this.filter).on("mouseover",(i,e,a)=>{j(a[e]).attr("fill",this.options.dataColors?this.options.dataColors[e]:k[e]),t.show()}).on("mouseout",(i,e,a)=>{j(a[e]).attr("fill","none"),t.hide()}).on("mousemove",(i,e,a)=>{const s=A(a[e])[0]+l.left+10,o=A(a[e])[1]+l.top+10;let r=b.positionType.downRight;s>this.width/2&&o<this.height/2?r=b.positionType.downLeft:s>this.width/2&&o>this.height/2?r=b.positionType.upLeft:s<this.width/2&&o>this.height/2&&(r=b.positionType.upRight),t.update({title:this.data.labels[e],items:[{color:this.options.dataColors?this.options.dataColors[e]:k[e],text:`${this.data.datasets[0].label||""}: ${i}`}],position:{x:s,y:o,type:r}})})}update(){}}var c=function(e){return function(){return e}};var Ee=function($,t){return t<$?-1:t>$?1:t>=$?0:NaN};var Fe=function($){return $};var Ob=Math.abs;var Q=Math.atan2;var W=Math.cos;var Je=Math.max;var sb=Math.min;var V=Math.sin;var X=Math.sqrt;var U=1e-12;var _=Math.PI;var ka=_/2;var ha=2*_;function Re($){return $>1?0:$<-1?_:Math.acos($)}function Yb($){return $>=1?ka:$<=-1?-ka:Math.asin($)}var Te=function(){var t=Fe,n=Ee,r=null,e=c(0),$=c(ha),o=c(0);function a(a){var i,u,l,p,c,A=a.length,f=0,s=new Array(A),b=new Array(A),U=+e.apply(this,arguments),Z=Math.min(ha,Math.max(-ha,$.apply(this,arguments)-U)),m=Math.min(Math.abs(Z)/A,o.apply(this,arguments)),d=m*(Z<0?-1:1);for(i=0;i<A;++i)(c=b[s[i]=i]=+t(a[i],i,a))>0&&(f+=c);for(null!=n?s.sort(function(t,r){return n(b[t],b[r])}):null!=r&&s.sort(function(t,n){return r(a[t],a[n])}),i=0,l=f?(Z-A*d)/f:0;i<A;++i,U=p)u=s[i],p=U+((c=b[u])>0?c*l:0)+d,b[u]={data:a[u],index:i,value:c,startAngle:U,endAngle:p,padAngle:m};return b}return a.value=function(n){return arguments.length?(t="function"==typeof n?n:c(+n),a):t},a.sortValues=function(t){return arguments.length?(n=t,r=null,a):n},a.sort=function(t){return arguments.length?(r=t,n=null,a):r},a.startAngle=function(t){return arguments.length?(e="function"==typeof t?t:c(+t),a):e},a.endAngle=function(t){return arguments.length?($="function"==typeof t?t:c(+t),a):$},a.padAngle=function(t){return arguments.length?(o="function"==typeof t?t:c(+t),a):o},a};function Ue($){return $.innerRadius}function Ve($){return $.outerRadius}function We($){return $.startAngle}function Xe($){return $.endAngle}function Ye($){return $&&$.padAngle}function Ze($,t,r,n,i,o,a,p){var e=r-$,c=n-t,I=a-i,B=p-o,L=B*e-I*c;if(!(L*L<U))return[$+(L=(I*(t-o)-B*($-i))/L)*e,t+L*c]}function ga($,t,r,n,i,o,a){var p=$-r,e=t-n,c=(a?o:-o)/X(p*p+e*e),I=c*e,B=-c*p,L=$+I,m=t+B,s=r+I,l=n+B,u=(L+s)/2,y=(m+l)/2,f=s-L,x=l-m,v=f*f+x*x,g=i-o,h=L*l-s*m,d=(x<0?-1:1)*X(Je(0,g*g*v-h*h)),T=(h*x-f*d)/v,A=(-h*f-x*d)/v,R=(h*x+f*d)/v,q=(-h*f+x*d)/v,P=T-u,b=A-y,E=R-u,O=q-y;return P*P+b*b>E*E+O*O&&(T=R,A=q),{cx:T,cy:A,x01:-I,y01:-B,x11:T*(i/g-1),y11:A*(i/g-1)}}var Ka=Math.PI,La=2*Ka,B=1e-6,cf=La-B;function Na(){this._x0=this._y0=this._x1=this._y1=null,this._=""}function Oa(){return new Na}Na.prototype=Oa.prototype={constructor:Na,moveTo:function(t,h){this._+="M"+(this._x0=this._x1=+t)+","+(this._y0=this._y1=+h)},closePath:function(){null!==this._x1&&(this._x1=this._x0,this._y1=this._y0,this._+="Z")},lineTo:function(t,h){this._+="L"+(this._x1=+t)+","+(this._y1=+h)},quadraticCurveTo:function(t,h,i,s){this._+="Q"+ +t+","+ +h+","+(this._x1=+i)+","+(this._y1=+s)},bezierCurveTo:function(t,h,i,s,$,o){this._+="C"+ +t+","+ +h+","+ +i+","+ +s+","+(this._x1=+$)+","+(this._y1=+o)},arcTo:function(t,h,i,s,$){t=+t,h=+h,i=+i,s=+s,$=+$;var o=this._x1,a=this._y1,r=i-t,_=s-h,n=o-t,M=a-h,e=n*n+M*M;if($<0)throw new Error("negative radius: "+$);if(null===this._x1)this._+="M"+(this._x1=t)+","+(this._y1=h);else if(e>B){if(Math.abs(M*r-_*n)>B&&$){var u=i-o,b=s-a,v=r*r+_*_,l=u*u+b*b,x=Math.sqrt(v),p=Math.sqrt(e),c=$*Math.tan((Ka-Math.acos((v+e-l)/(2*x*p)))/2),f=c/p,y=c/x;Math.abs(f-1)>B&&(this._+="L"+(t+f*n)+","+(h+f*M)),this._+="A"+$+","+$+",0,0,"+ +(M*u>n*b)+","+(this._x1=t+y*r)+","+(this._y1=h+y*_)}else this._+="L"+(this._x1=t)+","+(this._y1=h);}else;},arc:function(t,h,i,s,$,o){t=+t,h=+h,o=!!o;var a=(i=+i)*Math.cos(s),r=i*Math.sin(s),_=t+a,n=h+r,M=1^o,e=o?s-$:$-s;if(i<0)throw new Error("negative radius: "+i);null===this._x1?this._+="M"+_+","+n:(Math.abs(this._x1-_)>B||Math.abs(this._y1-n)>B)&&(this._+="L"+_+","+n),i&&(e<0&&(e=e%La+La),e>cf?this._+="A"+i+","+i+",0,1,"+M+","+(t-a)+","+(h-r)+"A"+i+","+i+",0,1,"+M+","+(this._x1=_)+","+(this._y1=n):e>B&&(this._+="A"+i+","+i+",0,"+ +(e>=Ka)+","+M+","+(this._x1=t+i*Math.cos($))+","+(this._y1=h+i*Math.sin($))))},rect:function(t,h,i,s){this._+="M"+(this._x0=this._x1=+t)+","+(this._y0=this._y1=+h)+"h"+ +i+"v"+ +s+"h"+-i+"Z"},toString:function(){return this._}};var ff=function(){var $=Ue,t=Ve,r=c(0),n=null,i=We,o=Xe,a=Ye,p=null;function e(){var e,c,I=+$.apply(this,arguments),B=+t.apply(this,arguments),L=i.apply(this,arguments)-ka,m=o.apply(this,arguments)-ka,s=Ob(m-L),l=m>L;if(p||(p=e=Oa()),B<I&&(c=B,B=I,I=c),B>U){if(s>ha-U)p.moveTo(B*W(L),B*V(L)),p.arc(0,0,B,L,m,!l),I>U&&(p.moveTo(I*W(m),I*V(m)),p.arc(0,0,I,m,L,l));else{var u,y,f=L,x=m,v=L,g=m,h=s,d=s,T=a.apply(this,arguments)/2,A=T>U&&(n?+n.apply(this,arguments):X(I*I+B*B)),R=sb(Ob(B-I)/2,+r.apply(this,arguments)),q=R,P=R;if(A>U){var b=Yb(A/I*V(T)),E=Yb(A/B*V(T));(h-=2*b)>U?(v+=b*=l?1:-1,g-=b):(h=0,v=g=(L+m)/2),(d-=2*E)>U?(f+=E*=l?1:-1,x-=E):(d=0,f=x=(L+m)/2)}var O=B*W(f),S=B*V(f),j=I*W(g),k=I*V(g);if(R>U){var w,z=B*W(x),C=B*V(x),D=I*W(v),F=I*V(v);if(s<_&&(w=Ze(O,S,D,F,z,C,j,k))){var G=O-w[0],H=S-w[1],J=z-w[0],K=C-w[1],M=1/V(Re((G*J+H*K)/(X(G*G+H*H)*X(J*J+K*K)))/2),N=X(w[0]*w[0]+w[1]*w[1]);q=sb(R,(I-N)/(M-1)),P=sb(R,(B-N)/(M+1))}}d>U?P>U?(u=ga(D,F,O,S,B,P,l),y=ga(z,C,j,k,B,P,l),p.moveTo(u.cx+u.x01,u.cy+u.y01),P<R?p.arc(u.cx,u.cy,P,Q(u.y01,u.x01),Q(y.y01,y.x01),!l):(p.arc(u.cx,u.cy,P,Q(u.y01,u.x01),Q(u.y11,u.x11),!l),p.arc(0,0,B,Q(u.cy+u.y11,u.cx+u.x11),Q(y.cy+y.y11,y.cx+y.x11),!l),p.arc(y.cx,y.cy,P,Q(y.y11,y.x11),Q(y.y01,y.x01),!l))):(p.moveTo(O,S),p.arc(0,0,B,f,x,!l)):p.moveTo(O,S),I>U&&h>U?q>U?(u=ga(j,k,z,C,I,-q,l),y=ga(O,S,D,F,I,-q,l),p.lineTo(u.cx+u.x01,u.cy+u.y01),q<R?p.arc(u.cx,u.cy,q,Q(u.y01,u.x01),Q(y.y01,y.x01),!l):(p.arc(u.cx,u.cy,q,Q(u.y01,u.x01),Q(u.y11,u.x11),!l),p.arc(0,0,I,Q(u.cy+u.y11,u.cx+u.x11),Q(y.cy+y.y11,y.cx+y.x11),l),p.arc(y.cx,y.cy,q,Q(y.y11,y.x11),Q(y.y01,y.x01),!l))):p.arc(0,0,I,g,v,l):p.lineTo(j,k)}}else p.moveTo(0,0);if(p.closePath(),e)return p=null,e+""||null}return e.centroid=function(){var r=(+$.apply(this,arguments)+ +t.apply(this,arguments))/2,n=(+i.apply(this,arguments)+ +o.apply(this,arguments))/2-_/2;return[W(n)*r,V(n)*r]},e.innerRadius=function(t){return arguments.length?($="function"==typeof t?t:c(+t),e):$},e.outerRadius=function($){return arguments.length?(t="function"==typeof $?$:c(+$),e):t},e.cornerRadius=function($){return arguments.length?(r="function"==typeof $?$:c(+$),e):r},e.padRadius=function($){return arguments.length?(n=null==$?null:"function"==typeof $?$:c(+$),e):n},e.startAngle=function($){return arguments.length?(i="function"==typeof $?$:c(+$),e):i},e.endAngle=function($){return arguments.length?(o="function"==typeof $?$:c(+$),e):o},e.padAngle=function($){return arguments.length?(a="function"==typeof $?$:c(+$),e):a},e.context=function($){return arguments.length?(p=null==$?null:$,e):p},e};function fa(t,{items:r,position:e,unxkcdify:i,parentWidth:o,parentHeight:a}){const p=7.5*r.reduce((t,r)=>t>r.text.length?t:r.text.length,0)+30,n=20*r.length+10,l=i?null:"url(#xkcdify)";let $=0,c=0;e!==b.positionType.downLeft&&e!==b.positionType.downRight||(c=a-n-13),e!==b.positionType.upRight&&e!==b.positionType.downRight||($=o-p-13);const f=t.append("svg").attr("x",$).attr("y",c);f.append("rect").style("fill","white").attr("fill-opacity",.85).attr("stroke","black").attr("stroke-width",2).attr("rx",5).attr("ry",5).attr("filter",l).attr("width",p).attr("height",n).attr("x",8).attr("y",5),r.forEach((t,r)=>{const e=f.append("g");e.append("rect").style("fill",t.color).attr("width",8).attr("height",8).attr("rx",2).attr("ry",2).attr("filter",l).attr("x",15).attr("y",17+20*r),e.append("text").style("font-size","15").attr("x",27).attr("y",17+20*r+8).text(t.text)})}const hf=50;class jf{constructor(t,{title:i,data:{labels:e,datasets:s},options:a={unxkcdify:!1,innerRadius:.5,legendPosition:b.positionType.upLeft,dataColors:[],fontFamily:"xkcd"}}){this.title=i,this.data={labels:e,datasets:s},this.options=a,this.filter="url(#xkcdify-pie)",this.fontFamily=this.options.fontFamily||"xkcd",a.unxkcdify&&(this.filter=null,this.fontFamily="-apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif"),this.svgEl=j(t).style("stroke-width","3").style("font-family",this.fontFamily).attr("width",t.parentElement.clientWidth).attr("height",Math.min(2*t.parentElement.clientWidth/3,window.innerHeight)),this.svgEl.selectAll("*").remove(),this.width=this.svgEl.attr("width"),this.height=this.svgEl.attr("height"),this.chart=this.svgEl.append("g").attr("transform",`translate(${this.width/2},${this.height/2})`),M(this.svgEl),N(this.svgEl),this.render()}render(){this.title&&u.title(this.svgEl,this.title);const t=new L({parent:this.svgEl,title:"tooltip",items:[{color:"red",text:"weweyang: 12"},{color:"blue",text:"timqian: 13"}],position:{x:30,y:30,type:b.positionType.upRight},unxkcdify:this.options.unxkcdify}),i=Math.min(this.width,this.height)/2-hf,e=Te()(this.data.datasets[0].data),s=ff().innerRadius(i*(void 0===this.options.innerRadius?.5:this.options.innerRadius)).outerRadius(i);this.chart.selectAll(".xkcd-chart-arc").data(e).enter().append("path").attr("class",".xkcd-chart-arc").attr("d",s).attr("fill","none").attr("stroke","black").attr("stroke-width",2).attr("fill",(t,i)=>k[i]).attr("filter",this.filter).on("mouseover",(i,e,s)=>{j(s[e]).attr("fill-opacity",.6),t.show()}).on("mouseout",(i,e,s)=>{j(s[e]).attr("fill-opacity",1),t.hide()}).on("mousemove",(i,e,s)=>{const a=A(s[e])[0]+this.width/2+10,o=A(s[e])[1]+this.height/2+10;t.update({title:this.data.labels[e],items:[{color:this.options.dataColors?this.options.dataColors[e]:k[e],text:`${this.data.datasets[0].label||""}: ${i.data}`}],position:{x:a,y:o,type:b.positionType.downRight}})});const a=this.data.datasets[0].data.map((t,i)=>({color:k[i],text:this.data.labels[i]})),o=this.svgEl.append("g").attr("transform","translate(0, 30)");fa(o,{items:a,position:this.options.legendPosition,unxkcdify:this.options.unxkcdify,parentWidth:this.width,parentHeight:this.height})}update(){}}function ec(t){this._context=t}ec.prototype={areaStart:function(){this._line=0},areaEnd:function(){this._line=NaN},lineStart:function(){this._point=0},lineEnd:function(){(this._line||0!==this._line&&1===this._point)&&this._context.closePath(),this._line=1-this._line},point:function(t,i){switch(t=+t,i=+i,this._point){case 0:this._point=1,this._line?this._context.lineTo(t,i):this._context.moveTo(t,i);break;case 1:this._point=2;default:this._context.lineTo(t,i);}}};var lf=function(t){return new ec(t)};function mf($){return $[0]}function nf($){return $[1]}var Qa=function(){var n=mf,t=nf,r=c(!0),e=null,$=lf,o=null;function u(u){var i,l,p,h=u.length,c=!1;for(null==e&&(o=$(p=Oa())),i=0;i<=h;++i)!(i<h&&r(l=u[i],i,u))===c&&((c=!c)?o.lineStart():o.lineEnd()),c&&o.point(+n(l,i,u),+t(l,i,u));if(p)return o=null,p+""||null}return u.x=function(t){return arguments.length?(n="function"==typeof t?t:c(+t),u):n},u.y=function(n){return arguments.length?(t="function"==typeof n?n:c(+n),u):t},u.defined=function(n){return arguments.length?(r="function"==typeof n?n:c(!!n),u):r},u.curve=function(n){return arguments.length?($=n,null!=e&&(o=$(e)),u):$},u.context=function(n){return arguments.length?(null==n?e=o=null:o=$(e=n),u):e},u};function gc(t){return t<0?-1:1}function hc(t,o,n){var i=t._x1-t._x0,e=o-t._x1,$=(t._y1-t._y0)/(i||e<0&&-0),s=(n-t._y1)/(e||i<0&&-0),x=($*e+s*i)/(i+e);return(gc($)+gc(s))*Math.min(Math.abs($),Math.abs(s),.5*Math.abs(x))||0}function ic(t,o){var n=t._x1-t._x0;return n?(3*(t._y1-t._y0)/n-o)/2:o}function Ra(t,o,n){var i=t._x0,e=t._y0,$=t._x1,s=t._y1,x=($-i)/3;t._context.bezierCurveTo(i+x,e+x*o,$-x,s-x*n,$,s)}function ra(t){this._context=t}function uf(t){this._context=new lc(t)}function lc(t){this._context=t}function mc(t){return new ra(t)}ra.prototype={areaStart:function(){this._line=0},areaEnd:function(){this._line=NaN},lineStart:function(){this._x0=this._x1=this._y0=this._y1=this._t0=NaN,this._point=0},lineEnd:function(){switch(this._point){case 2:this._context.lineTo(this._x1,this._y1);break;case 3:Ra(this,this._t0,ic(this,this._t0));}(this._line||0!==this._line&&1===this._point)&&this._context.closePath(),this._line=1-this._line},point:function(t,o){var n=NaN;if(o=+o,(t=+t)!==this._x1||o!==this._y1){switch(this._point){case 0:this._point=1,this._line?this._context.lineTo(t,o):this._context.moveTo(t,o);break;case 1:this._point=2;break;case 2:this._point=3,Ra(this,ic(this,n=hc(this,t,o)),n);break;default:Ra(this,this._t0,n=hc(this,t,o));}this._x0=this._x1,this._x1=t,this._y0=this._y1,this._y1=o,this._t0=n}}},(uf.prototype=Object.create(ra.prototype)).point=function(t,o){ra.prototype.point.call(this,o,t)},lc.prototype={moveTo:function(t,o){this._context.moveTo(o,t)},closePath:function(){this._context.closePath()},lineTo:function(t,o){this._context.lineTo(o,t)},bezierCurveTo:function(t,o,n,i,e,$){this._context.bezierCurveTo(o,t,i,n,$,e)}};const q={top:50,right:30,bottom:50,left:50};class yf{constructor(t,{title:i,xLabel:o,yLabel:a,data:{labels:e,datasets:s},options:r={unxkcdify:!1,yTickCount:3,legendPosition:b.positionType.upLeft,dataColors:[],fontFamily:"xkcd"}}){i&&(this.title=i,q.top=60),o&&(this.xLabel=o,q.bottom=50),a&&(this.yLabel=a,q.left=70),this.data={labels:e,datasets:s},this.options=r,this.filter="url(#xkcdify)",this.fontFamily=this.options.fontFamily||"xkcd",r.unxkcdify&&(this.filter=null,this.fontFamily="-apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif"),this.svgEl=j(t).style("stroke-width","3").style("font-family",this.fontFamily).attr("width",t.parentElement.clientWidth).attr("height",Math.min(2*t.parentElement.clientWidth/3,window.innerHeight)),this.svgEl.selectAll("*").remove(),this.chart=this.svgEl.append("g").attr("transform",`translate(${q.left},${q.top})`),this.width=this.svgEl.attr("width")-q.left-q.right,this.height=this.svgEl.attr("height")-q.top-q.bottom,M(this.svgEl),N(this.svgEl),this.render()}render(){this.title&&u.title(this.svgEl,this.title),this.xLabel&&u.xLabel(this.svgEl,this.xLabel),this.yLabel&&u.yLabel(this.svgEl,this.yLabel);const t=new L({parent:this.svgEl,title:"",items:[{color:"red",text:"weweyang"},{color:"blue",text:"timqian"}],position:{x:60,y:60,type:b.positionType.downRight},unxkcdify:this.options.unxkcdify}),i=qh().domain(this.data.labels).range([0,this.width]),o=this.data.datasets.reduce((t,i)=>t.concat(i.data),[]),a=K().domain([Math.min(...o),Math.max(...o)]).range([this.height,0]),e=this.chart.append("g").attr("pointer-events","all");E.xAxis(e,{xScale:i,tickCount:3,moveDown:this.height,fontFamily:this.fontFamily,unxkcdify:this.options.unxkcdify}),E.yAxis(e,{yScale:a,tickCount:this.options.yTickCount||3,fontFamily:this.fontFamily,unxkcdify:this.options.unxkcdify}),this.svgEl.selectAll(".domain").attr("filter",this.filter);const s=Qa().x((t,o)=>i(this.data.labels[o])).y(t=>a(t)).curve(mc);e.selectAll(".xkcd-chart-line").data(this.data.datasets).enter().append("path").attr("class","xkcd-chart-line").attr("d",t=>s(t.data)).attr("fill","none").attr("stroke",(t,i)=>this.options.dataColors?this.options.dataColors[i]:k[i]).attr("filter",this.filter);const r=e.append("line").attr("x1",30).attr("y1",0).attr("x2",30).attr("y2",this.height).attr("stroke","#aaa").attr("stroke-width",1.5).attr("stroke-dasharray","7,7").style("visibility","hidden"),l=this.data.datasets.map((t,i)=>e.append("circle").style("stroke",this.options.dataColors?this.options.dataColors[i]:k[i]).style("fill",this.options.dataColors?this.options.dataColors[i]:k[i]).attr("r",3.5).style("visibility","hidden"));e.append("rect").attr("width",this.width).attr("height",this.height).attr("fill","none").on("mouseover",()=>{l.forEach(t=>t.style("visibility","visible")),r.style("visibility","visible"),t.show()}).on("mouseout",()=>{l.forEach(t=>t.style("visibility","hidden")),r.style("visibility","hidden"),t.hide()}).on("mousemove",(o,e,s)=>{const $=A(s[e])[0]+q.left+10,n=A(s[e])[1]+q.top+10,h=this.data.labels.map(t=>i(t)+q.left).map(t=>Math.abs(t-A(s[e])[0]-q.left)),m=h.indexOf(Math.min(...h));r.attr("x1",i(this.data.labels[m])).attr("x2",i(this.data.labels[m])),this.data.datasets.forEach((t,o)=>{l[o].style("visibility","visible").attr("cx",i(this.data.labels[m])).attr("cy",a(t.data[m]))});const d=this.data.datasets.map((t,i)=>({color:this.options.dataColors?this.options.dataColors[i]:k[i],text:`${this.data.datasets[i].label||""}: ${this.data.datasets[i].data[m]}`}));let p=b.positionType.downRight;$>this.width/2&&n<this.height/2?p=b.positionType.downLeft:$>this.width/2&&n>this.height/2?p=b.positionType.upLeft:$<this.width/2&&n>this.height/2&&(p=b.positionType.upRight),t.update({title:this.data.labels[m],items:d,position:{x:$,y:n,type:p}})});const $=this.data.datasets.map((t,i)=>({color:this.options.dataColors?this.options.dataColors[i]:k[i],text:t.label}));fa(e,{items:$,position:this.options.legendPosition,unxkcdify:this.options.unxkcdify,parentWidth:this.width,parentHeight:this.height})}update(){}}var Ua=new Date,Va=new Date;function d(t,r,e,n){function o(r){return t(r=new Date(+r)),r}return o.floor=o,o.ceil=function(e){return t(e=new Date(e-1)),r(e,1),t(e),e},o.round=function(t){var r=o(t),e=o.ceil(t);return t-r<e-t?r:e},o.offset=function(t,e){return r(t=new Date(+t),null==e?1:Math.floor(e)),t},o.range=function(e,n,$){var u,f=[];if(e=o.ceil(e),$=null==$?1:Math.floor($),!(e<n&&$>0))return f;do{f.push(u=new Date(+e)),r(e,$),t(e)}while(u<e&&e<n);return f},o.filter=function(e){return d(function(r){if(r>=r)for(;t(r),!e(r);)r.setTime(r-1)},function(t,n){if(t>=t)if(n<0)for(;++n<=0;)for(;r(t,-1),!e(t););else for(;--n>=0;)for(;r(t,1),!e(t););})},e&&(o.count=function(r,n){return Ua.setTime(+r),Va.setTime(+n),t(Ua),t(Va),Math.floor(e(Ua,Va))},o.every=function(t){return t=Math.floor(t),isFinite(t)&&t>0?t>1?o.filter(n?function(r){return n(r)%t==0}:function(r){return o.count(0,r)%t==0}):o:null}),o}var ia=d(function(){},function(e,t){e.setTime(+e+t)},function(e,t){return t-e});ia.every=function(e){return e=Math.floor(e),isFinite(e)&&e>0?e>1?d(function(t){t.setTime(Math.floor(t/e)*e)},function(t,$){t.setTime(+t+$*e)},function(t,$){return($-t)/e}):ia:null};var mi=ia.range;var ja=1e3;var z=6e4;var la=36e5;var vc=864e5;var wc=6048e5;var xc=d(function(e){e.setTime(e-e.getMilliseconds())},function(e,$){e.setTime(+e+$*ja)},function(e,$){return($-e)/ja},function(e){return e.getUTCSeconds()});var li=xc.range;var zc=d(function(e){e.setTime(e-e.getMilliseconds()-e.getSeconds()*ja)},function(e,t){e.setTime(+e+t*z)},function(e,t){return(t-e)/z},function(e){return e.getMinutes()});var ki=zc.range;var Bc=d(function(r){r.setTime(r-r.getMilliseconds()-r.getSeconds()*ja-r.getMinutes()*z)},function(r,$){r.setTime(+r+$*la)},function(r,$){return($-r)/la},function(r){return r.getHours()});var ji=Bc.range;var ma=d(function(r){r.setHours(0,0,0,0)},function(r,e){r.setDate(r.getDate()+e)},function(r,e){return(e-r-(e.getTimezoneOffset()-r.getTimezoneOffset())*z)/vc},function(r){return r.getDate()-1});var ii=ma.range;function r(e){return d(function($){$.setDate($.getDate()-($.getDay()+7-e)%7),$.setHours(0,0,0,0)},function(e,$){e.setDate(e.getDate()+7*$)},function(e,$){return($-e-($.getTimezoneOffset()-e.getTimezoneOffset())*z)/wc})}var db=r(0);var pa=r(1);var Uf=r(2);var Vf=r(3);var qa=r(4);var Xf=r(5);var Yf=r(6);var hi=db.range;var gi=pa.range;var zi=Uf.range;var ei=Vf.range;var ci=qa.range;var ai=Xf.range;var _h=Yf.range;var Mc=d(function(t){t.setDate(1),t.setHours(0,0,0,0)},function(t,e){t.setMonth(t.getMonth()+e)},function(t,e){return e.getMonth()-t.getMonth()+12*(e.getFullYear()-t.getFullYear())},function(t){return t.getMonth()});var $h=Mc.range;var n=d(function(e){e.setMonth(0,1),e.setHours(0,0,0,0)},function(e,t){e.setFullYear(e.getFullYear()+t)},function(e,t){return t.getFullYear()-e.getFullYear()},function(e){return e.getFullYear()});n.every=function(e){return isFinite(e=Math.floor(e))&&e>0?d(function(t){t.setFullYear(Math.floor(t.getFullYear()/e)*e),t.setMonth(0,1),t.setHours(0,0,0,0)},function(t,r){t.setFullYear(t.getFullYear()+r*e)}):null};var Zh=n.range;var ig=d(function(t){t.setUTCSeconds(0,0)},function(t,e){t.setTime(+t+e*z)},function(t,e){return(e-t)/z},function(t){return t.getUTCMinutes()});var Yh=ig.range;var kg=d(function(r){r.setUTCMinutes(0,0,0)},function(r,$){r.setTime(+r+$*la)},function(r,$){return($-r)/la},function(r){return r.getUTCHours()});var Xh=kg.range;var kb=d(function(t){t.setUTCHours(0,0,0,0)},function(t,$){t.setUTCDate(t.getUTCDate()+$)},function(t,$){return($-t)/vc},function(t){return t.getUTCDate()-1});var Wh=kb.range;function t($){return d(function(t){t.setUTCDate(t.getUTCDate()-(t.getUTCDay()+7-$)%7),t.setUTCHours(0,0,0,0)},function($,t){$.setUTCDate($.getUTCDate()+7*t)},function($,t){return(t-$)/wc})}var Tc=t(0);var wa=t(1);var rg=t(2);var sg=t(3);var xa=t(4);var ug=t(5);var vg=t(6);var Vh=Tc.range;var Uh=wa.range;var Th=rg.range;var Sh=sg.range;var Rh=xa.range;var Qh=ug.range;var Ph=vg.range;var Dg=d(function(t){t.setUTCDate(1),t.setUTCHours(0,0,0,0)},function(t,e){t.setUTCMonth(t.getUTCMonth()+e)},function(t,e){return e.getUTCMonth()-t.getUTCMonth()+12*(e.getUTCFullYear()-t.getUTCFullYear())},function(t){return t.getUTCMonth()});var Oh=Dg.range;var D=d(function(e){e.setUTCMonth(0,1),e.setUTCHours(0,0,0,0)},function(e,t){e.setUTCFullYear(e.getUTCFullYear()+t)},function(e,t){return t.getUTCFullYear()-e.getUTCFullYear()},function(e){return e.getUTCFullYear()});D.every=function(e){return isFinite(e=Math.floor(e))&&e>0?d(function(t){t.setUTCFullYear(Math.floor(t.getUTCFullYear()/e)*e),t.setUTCMonth(0,1),t.setUTCHours(0,0,0,0)},function(t,r){t.setUTCFullYear(t.getUTCFullYear()+r*e)}):null};var fi=D.range;var Y,Ig,Nh,Kg,Lg;function Mg($){return Y=Qg($),Ig=Y.format,Nh=Y.parse,Kg=Y.utcFormat,Lg=Y.utcParse,Y}function Ng(r){if(0<=r.y&&r.y<100){var $=new Date(-1,r.m,r.d,r.H,r.M,r.S,r.L);return $.setFullYear(r.y),$}return new Date(r.y,r.m,r.d,r.H,r.M,r.S,r.L)}function Aa(r){if(0<=r.y&&r.y<100){var $=new Date(Date.UTC(-1,r.m,r.d,r.H,r.M,r.S,r.L));return $.setUTCFullYear(r.y),$}return new Date(Date.UTC(r.y,r.m,r.d,r.H,r.M,r.S,r.L))}function ca(r){return{y:r,m:0,d:1,H:0,M:0,S:0,L:0}}function Qg(r){var $=r.dateTime,e=r.date,a=r.time,t=r.periods,U=r.days,n=r.shortDays,o=r.months,u=r.shortMonths,b=ea(t),i=O(t),H=ea(U),v=O(U),c=ea(n),f=O(n),m=ea(o),s=O(o),l=ea(u),d=O(u),p={a:function(r){return n[r.getDay()]},A:function(r){return U[r.getDay()]},b:function(r){return u[r.getMonth()]},B:function(r){return o[r.getMonth()]},c:null,d:fd,e:fd,f:vh,H:rh,I:sh,j:th,L:gd,m:wh,M:xh,p:function(r){return t[+(r.getHours()>=12)]},Q:Pc,s:Nc,S:yh,u:zh,U:Ah,V:Bh,w:Ch,W:Dh,x:null,X:null,y:Eh,Y:Fh,Z:Gh,"%":Qc},y={a:function(r){return n[r.getUTCDay()]},A:function(r){return U[r.getUTCDay()]},b:function(r){return u[r.getUTCMonth()]},B:function(r){return o[r.getUTCMonth()]},c:null,d:hd,e:hd,f:Jg,H:Ih,I:Jh,j:Kh,L:id,m:Gg,M:Eg,p:function(r){return t[+(r.getUTCHours()>=12)]},Q:Pc,s:Nc,S:Cg,u:Bg,U:Ag,V:zg,w:yg,W:xg,x:null,X:null,y:wg,Y:ng,Z:lg,"%":Qc},g={a:function(r,$,e){var a=c.exec($.slice(e));return a?(r.w=f[a[0].toLowerCase()],e+a[0].length):-1},A:function(r,$,e){var a=H.exec($.slice(e));return a?(r.w=v[a[0].toLowerCase()],e+a[0].length):-1},b:function(r,$,e){var a=l.exec($.slice(e));return a?(r.m=d[a[0].toLowerCase()],e+a[0].length):-1},B:function(r,$,e){var a=m.exec($.slice(e));return a?(r.m=s[a[0].toLowerCase()],e+a[0].length):-1},c:function(r,e,a){return h(r,$,e,a)},d:dd,e:dd,f:mh,H:ed,I:ed,j:hh,L:lh,m:fh,M:jh,p:function(r,$,e){var a=b.exec($.slice(e));return a?(r.p=i[a[0].toLowerCase()],e+a[0].length):-1},Q:oh,s:ph,S:kh,u:$g,U:_g,V:ah,w:Zg,W:bh,x:function(r,$,a){return h(r,e,$,a)},X:function(r,$,e){return h(r,a,$,e)},y:dh,Y:ch,Z:eh,"%":nh};function T(r,$){return function(e){var a,t,U,n=[],o=-1,u=0,b=r.length;for(e instanceof Date||(e=new Date(+e));++o<b;)37===r.charCodeAt(o)&&(n.push(r.slice(u,o)),null!=(t=$c[a=r.charAt(++o)])?a=r.charAt(++o):t="e"===a?" ":"0",(U=$[a])&&(a=U(e,t)),n.push(a),u=o+1);return n.push(r.slice(u,o)),n.join("")}}function M(r,$){return function(e){var a,t,U=ca(1900);if(h(U,r,e+="",0)!=e.length)return null;if("Q"in U)return new Date(U.Q);if("p"in U&&(U.H=U.H%12+12*U.p),"V"in U){if(U.V<1||U.V>53)return null;"w"in U||(U.w=1),"Z"in U?(t=(a=Aa(ca(U.y))).getUTCDay(),a=t>4||0===t?wa.ceil(a):wa(a),a=kb.offset(a,7*(U.V-1)),U.y=a.getUTCFullYear(),U.m=a.getUTCMonth(),U.d=a.getUTCDate()+(U.w+6)%7):(t=(a=$(ca(U.y))).getDay(),a=t>4||0===t?pa.ceil(a):pa(a),a=ma.offset(a,7*(U.V-1)),U.y=a.getFullYear(),U.m=a.getMonth(),U.d=a.getDate()+(U.w+6)%7)}else("W"in U||"U"in U)&&("w"in U||(U.w="u"in U?U.u%7:"W"in U?1:0),t="Z"in U?Aa(ca(U.y)).getUTCDay():$(ca(U.y)).getDay(),U.m=0,U.d="W"in U?(U.w+6)%7+7*U.W-(t+5)%7:U.w+7*U.U-(t+6)%7);return"Z"in U?(U.H+=U.Z/100|0,U.M+=U.Z%100,Aa(U)):$(U)}}function h(r,$,e,a){for(var t,U,n=0,o=$.length,u=e.length;n<o;){if(a>=u)return-1;if(37===(t=$.charCodeAt(n++))){if(t=$.charAt(n++),!(U=g[t in $c?$.charAt(n++):t])||(a=U(r,e,a))<0)return-1}else if(t!=e.charCodeAt(a++))return-1}return a}return p.x=T(e,p),p.X=T(a,p),p.c=T($,p),y.x=T(e,y),y.X=T(a,y),y.c=T($,y),{format:function(r){var $=T(r+="",p);return $.toString=function(){return r},$},parse:function(r){var $=M(r+="",Ng);return $.toString=function(){return r},$},utcFormat:function(r){var $=T(r+="",y);return $.toString=function(){return r},$},utcParse:function(r){var $=M(r,Aa);return $.toString=function(){return r},$}}}var $c={"-":"",_:" ",0:"0"},f=/^\s*\d+/,Tg=/^%/,Ug=/[\\^$*+?|[\]().{}]/g;function a(r,$,e){var a=r<0?"-":"",t=(a?-r:r)+"",U=t.length;return a+(U<e?new Array(e-U+1).join($)+t:t)}function Wg(r){return r.replace(Ug,"\\$&")}function ea(r){return new RegExp("^(?:"+r.map(Wg).join("|")+")","i")}function O(r){for(var $={},e=-1,a=r.length;++e<a;)$[r[e].toLowerCase()]=e;return $}function Zg(r,$,e){var a=f.exec($.slice(e,e+1));return a?(r.w=+a[0],e+a[0].length):-1}function $g(r,$,e){var a=f.exec($.slice(e,e+1));return a?(r.u=+a[0],e+a[0].length):-1}function _g(r,$,e){var a=f.exec($.slice(e,e+2));return a?(r.U=+a[0],e+a[0].length):-1}function ah(r,$,e){var a=f.exec($.slice(e,e+2));return a?(r.V=+a[0],e+a[0].length):-1}function bh(r,$,e){var a=f.exec($.slice(e,e+2));return a?(r.W=+a[0],e+a[0].length):-1}function ch(r,$,e){var a=f.exec($.slice(e,e+4));return a?(r.y=+a[0],e+a[0].length):-1}function dh(r,$,e){var a=f.exec($.slice(e,e+2));return a?(r.y=+a[0]+(+a[0]>68?1900:2e3),e+a[0].length):-1}function eh(r,$,e){var a=/^(Z)|([+-]\d\d)(?::?(\d\d))?/.exec($.slice(e,e+6));return a?(r.Z=a[1]?0:-(a[2]+(a[3]||"00")),e+a[0].length):-1}function fh(r,$,e){var a=f.exec($.slice(e,e+2));return a?(r.m=a[0]-1,e+a[0].length):-1}function dd(r,$,e){var a=f.exec($.slice(e,e+2));return a?(r.d=+a[0],e+a[0].length):-1}function hh(r,$,e){var a=f.exec($.slice(e,e+3));return a?(r.m=0,r.d=+a[0],e+a[0].length):-1}function ed(r,$,e){var a=f.exec($.slice(e,e+2));return a?(r.H=+a[0],e+a[0].length):-1}function jh(r,$,e){var a=f.exec($.slice(e,e+2));return a?(r.M=+a[0],e+a[0].length):-1}function kh(r,$,e){var a=f.exec($.slice(e,e+2));return a?(r.S=+a[0],e+a[0].length):-1}function lh(r,$,e){var a=f.exec($.slice(e,e+3));return a?(r.L=+a[0],e+a[0].length):-1}function mh(r,$,e){var a=f.exec($.slice(e,e+6));return a?(r.L=Math.floor(a[0]/1e3),e+a[0].length):-1}function nh(r,$,e){var a=Tg.exec($.slice(e,e+1));return a?e+a[0].length:-1}function oh(r,$,e){var a=f.exec($.slice(e));return a?(r.Q=+a[0],e+a[0].length):-1}function ph(r,$,e){var a=f.exec($.slice(e));return a?(r.Q=1e3*+a[0],e+a[0].length):-1}function fd(r,$){return a(r.getDate(),$,2)}function rh(r,$){return a(r.getHours(),$,2)}function sh(r,$){return a(r.getHours()%12||12,$,2)}function th(r,$){return a(1+ma.count(n(r),r),$,3)}function gd(r,$){return a(r.getMilliseconds(),$,3)}function vh(r,$){return gd(r,$)+"000"}function wh(r,$){return a(r.getMonth()+1,$,2)}function xh(r,$){return a(r.getMinutes(),$,2)}function yh(r,$){return a(r.getSeconds(),$,2)}function zh(r){var $=r.getDay();return 0===$?7:$}function Ah(r,$){return a(db.count(n(r),r),$,2)}function Bh(r,$){var e=r.getDay();return r=e>=4||0===e?qa(r):qa.ceil(r),a(qa.count(n(r),r)+(4===n(r).getDay()),$,2)}function Ch(r){return r.getDay()}function Dh(r,$){return a(pa.count(n(r),r),$,2)}function Eh(r,$){return a(r.getFullYear()%100,$,2)}function Fh(r,$){return a(r.getFullYear()%1e4,$,4)}function Gh(r){var $=r.getTimezoneOffset();return($>0?"-":($*=-1,"+"))+a($/60|0,"0",2)+a($%60,"0",2)}function hd(r,$){return a(r.getUTCDate(),$,2)}function Ih(r,$){return a(r.getUTCHours(),$,2)}function Jh(r,$){return a(r.getUTCHours()%12||12,$,2)}function Kh(r,$){return a(1+kb.count(D(r),r),$,3)}function id(r,$){return a(r.getUTCMilliseconds(),$,3)}function Jg(r,$){return id(r,$)+"000"}function Gg(r,$){return a(r.getUTCMonth()+1,$,2)}function Eg(r,$){return a(r.getUTCMinutes(),$,2)}function Cg(r,$){return a(r.getUTCSeconds(),$,2)}function Bg(r){var $=r.getUTCDay();return 0===$?7:$}function Ag(r,$){return a(Tc.count(D(r),r),$,2)}function zg(r,$){var e=r.getUTCDay();return r=e>=4||0===e?xa(r):xa.ceil(r),a(xa.count(D(r),r)+(4===D(r).getUTCDay()),$,2)}function yg(r){return r.getUTCDay()}function xg(r,$){return a(wa.count(D(r),r),$,2)}function wg(r,$){return a(r.getUTCFullYear()%100,$,2)}function ng(r,$){return a(r.getUTCFullYear()%1e4,$,4)}function lg(){return"+0000"}function Qc(){return"%"}function Pc(r){return+r}function Nc(r){return Math.floor(+r/1e3)}Mg({dateTime:"%x, %X",date:"%-m/%-d/%Y",time:"%-I:%M:%S %p",periods:["AM","PM"],days:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],shortDays:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],months:["January","February","March","April","May","June","July","August","September","October","November","December"],shortMonths:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]});var Lc="%Y-%m-%dT%H:%M:%S.%LZ";function cg($){return $.toISOString()}var bi=Date.prototype.toISOString?cg:Kg(Lc);function bg(e){var $=new Date(e);return isNaN($)?null:$}var di=+new Date("2000-01-01T00:00:00.000Z")?bg:Lg(Lc);var ag=function(e,t){var $,r=0,M=(e=e.slice()).length-1,l=e[r],o=e[M];return o<l&&($=r,r=M,M=$,$=l,l=o,o=$),e[r]=t.floor(l),e[M]=t.ceil(o),e};var da=1e3,P=60*da,S=60*P,Z=24*S,Of=7*Z,Ac=30*Z,_a=365*Z;function Df(t){return new Date(t)}function td(t){return t instanceof Date?+t:+new Date(+t)}function Jc(t,$,r,a,n,e,i,o,u){var k=Vc(w,w),V=k.invert,X=k.domain,d=u(".%L"),v=u(":%S"),c=u("%I:%M"),p=u("%I %p"),m=u("%a %d"),l=u("%b %d"),f=u("%B"),y=u("%Y"),M=[[i,1,da],[i,5,5*da],[i,15,15*da],[i,30,30*da],[e,1,P],[e,5,5*P],[e,15,15*P],[e,30,30*P],[n,1,S],[n,3,3*S],[n,6,6*S],[n,12,12*S],[a,1,Z],[a,2,2*Z],[r,1,Of],[$,1,Ac],[$,3,3*Ac],[t,1,_a]];function D(o){return(i(o)<o?d:e(o)<o?v:n(o)<o?c:a(o)<o?p:$(o)<o?r(o)<o?m:l:t(o)<o?f:y)(o)}function h($,r,a){if(null==$&&($=10),"number"==typeof $){var n,e=Math.abs(a-r)/$,i=kc(function(t){return t[2]}).right(M,e);return i===M.length?(n=Pa(r/_a,a/_a,$),$=t):i?(n=(i=M[e/M[i-1][2]<M[i][2]/e?i-1:i])[1],$=i[0]):(n=Math.max(Pa(r,a,$),1),$=o),$.every(n)}return $}return k.invert=function(t){return new Date(V(t))},k.domain=function(t){return arguments.length?X(Array.from(t,td)):X().map(Df)},k.ticks=function(t){var $,r=X(),a=r[0],n=r[r.length-1],e=n<a;return e&&($=a,a=n,n=$),$=($=h(t,a,n))?$.range(a,n+1):[],e?$.reverse():$},k.tickFormat=function(t,$){return null==$?D:u($)},k.nice=function(t){var $=X();return(t=h(t,$[0],$[$.length-1]))?X(ag($,t)):k},k.copy=function(){return Uc(k,Jc(t,$,r,a,n,e,i,o,u))},k}var qd=function(){return Ca.apply(Jc(n,Mc,db,ma,Bc,zc,xc,ia,Ig).domain([new Date(2e3,0,1),new Date(2e3,0,2)]),arguments)};var sa={};!function(t,n){"object"==typeof sa?sa=n(): true?!(__WEBPACK_AMD_DEFINE_FACTORY__ = (n),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) :
				__WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)):undefined}(sa,function(){var t="millisecond",n="second",e="minute",r="hour",i="day",s="week",u="month",a="quarter",o="year",h=/^(\d{4})-?(\d{1,2})-?(\d{0,2})[^0-9]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?.?(\d{1,3})?$/,f=/\[([^\]]+)]|Y{2,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,c=function(t,n,e){var r=String(t);return!r||r.length>=n?t:""+Array(n+1-r.length).join(e)+t},d={s:c,z:function(t){var n=-t.utcOffset(),e=Math.abs(n),r=Math.floor(e/60),i=e%60;return(n<=0?"+":"-")+c(r,2,"0")+":"+c(i,2,"0")},m:function(t,n){var e=12*(n.year()-t.year())+(n.month()-t.month()),r=t.clone().add(e,u),i=n-r<0,s=t.clone().add(e+(i?-1:1),u);return Number(-(e+(n-r)/(i?r-s:s-r))||0)},a:function(t){return t<0?Math.ceil(t)||0:Math.floor(t)},p:function(h){return{M:u,y:o,w:s,d:i,h:r,m:e,s:n,ms:t,Q:a}[h]||String(h||"").toLowerCase().replace(/s$/,"")},u:function(t){return void 0===t}},$={name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_")},l="en",m={};m[l]=$;var y=function(t){return t instanceof v},M=function(t,n,e){var r;if(!t)return l;if("string"==typeof t)m[t]&&(r=t),n&&(m[t]=n,r=t);else{var i=t.name;m[i]=t,r=i}return e||(l=r),r},g=function(t,n,e){if(y(t))return t.clone();var r=n?"string"==typeof n?{format:n,pl:e}:n:{};return r.date=t,new v(r)},D=d;D.l=M,D.i=y,D.w=function(t,n){return g(t,{locale:n.$L,utc:n.$u})};var v=function(){function c(t){this.$L=this.$L||M(t.locale,null,!0),this.parse(t)}var d=c.prototype;return d.parse=function(t){this.$d=function(t){var n=t.date,e=t.utc;if(null===n)return new Date(NaN);if(D.u(n))return new Date;if(n instanceof Date)return new Date(n);if("string"==typeof n&&!/Z$/i.test(n)){var r=n.match(h);if(r)return e?new Date(Date.UTC(r[1],r[2]-1,r[3]||1,r[4]||0,r[5]||0,r[6]||0,r[7]||0)):new Date(r[1],r[2]-1,r[3]||1,r[4]||0,r[5]||0,r[6]||0,r[7]||0)}return new Date(n)}(t),this.init()},d.init=function(){var t=this.$d;this.$y=t.getFullYear(),this.$M=t.getMonth(),this.$D=t.getDate(),this.$W=t.getDay(),this.$H=t.getHours(),this.$m=t.getMinutes(),this.$s=t.getSeconds(),this.$ms=t.getMilliseconds()},d.$utils=function(){return D},d.isValid=function(){return!("Invalid Date"===this.$d.toString())},d.isSame=function(t,n){var e=g(t);return this.startOf(n)<=e&&e<=this.endOf(n)},d.isAfter=function(t,n){return g(t)<this.startOf(n)},d.isBefore=function(t,n){return this.endOf(n)<g(t)},d.$g=function(t,n,e){return D.u(t)?this[n]:this.set(e,t)},d.year=function(t){return this.$g(t,"$y",o)},d.month=function(t){return this.$g(t,"$M",u)},d.day=function(t){return this.$g(t,"$W",i)},d.date=function(t){return this.$g(t,"$D","date")},d.hour=function(t){return this.$g(t,"$H",r)},d.minute=function(t){return this.$g(t,"$m",e)},d.second=function(t){return this.$g(t,"$s",n)},d.millisecond=function(n){return this.$g(n,"$ms",t)},d.unix=function(){return Math.floor(this.valueOf()/1e3)},d.valueOf=function(){return this.$d.getTime()},d.startOf=function(t,a){var h=this,f=!!D.u(a)||a,c=D.p(t),d=function(t,n){var e=D.w(h.$u?Date.UTC(h.$y,n,t):new Date(h.$y,n,t),h);return f?e:e.endOf(i)},$=function(t,n){return D.w(h.toDate()[t].apply(h.toDate(),(f?[0,0,0,0]:[23,59,59,999]).slice(n)),h)},l=this.$W,m=this.$M,y=this.$D,M="set"+(this.$u?"UTC":"");switch(c){case o:return f?d(1,0):d(31,11);case u:return f?d(1,m):d(0,m+1);case s:var g=this.$locale().weekStart||0,v=(l<g?l+7:l)-g;return d(f?y-v:y+(6-v),m);case i:case"date":return $(M+"Hours",0);case r:return $(M+"Minutes",1);case e:return $(M+"Seconds",2);case n:return $(M+"Milliseconds",3);default:return this.clone();}},d.endOf=function(t){return this.startOf(t,!1)},d.$set=function(s,a){var h,f=D.p(s),c="set"+(this.$u?"UTC":""),d=(h={},h[i]=c+"Date",h.date=c+"Date",h[u]=c+"Month",h[o]=c+"FullYear",h[r]=c+"Hours",h[e]=c+"Minutes",h[n]=c+"Seconds",h[t]=c+"Milliseconds",h)[f],$=f===i?this.$D+(a-this.$W):a;if(f===u||f===o){var l=this.clone().set("date",1);l.$d[d]($),l.init(),this.$d=l.set("date",Math.min(this.$D,l.daysInMonth())).toDate()}else d&&this.$d[d]($);return this.init(),this},d.set=function(t,n){return this.clone().$set(t,n)},d.get=function(t){return this[D.p(t)]()},d.add=function(t,a){var h,f=this;t=Number(t);var c=D.p(a),d=function(n){var e=g(f);return D.w(e.date(e.date()+Math.round(n*t)),f)};if(c===u)return this.set(u,this.$M+t);if(c===o)return this.set(o,this.$y+t);if(c===i)return d(1);if(c===s)return d(7);var $=(h={},h[e]=6e4,h[r]=36e5,h[n]=1e3,h)[c]||1,l=this.valueOf()+t*$;return D.w(l,this)},d.subtract=function(t,n){return this.add(-1*t,n)},d.format=function(t){var n=this;if(!this.isValid())return"Invalid Date";var e=t||"YYYY-MM-DDTHH:mm:ssZ",r=D.z(this),i=this.$locale(),s=this.$H,u=this.$m,a=this.$M,o=i.weekdays,h=i.months,c=function(t,r,i,s){return t&&(t[r]||t(n,e))||i[r].substr(0,s)},d=function(t){return D.s(s%12||12,t,"0")},$=i.meridiem||function(t,n,e){var r=t<12?"AM":"PM";return e?r.toLowerCase():r},l={YY:String(this.$y).slice(-2),YYYY:this.$y,M:a+1,MM:D.s(a+1,2,"0"),MMM:c(i.monthsShort,a,h,3),MMMM:h[a]||h(this,e),D:this.$D,DD:D.s(this.$D,2,"0"),d:String(this.$W),dd:c(i.weekdaysMin,this.$W,o,2),ddd:c(i.weekdaysShort,this.$W,o,3),dddd:o[this.$W],H:String(s),HH:D.s(s,2,"0"),h:d(1),hh:d(2),a:$(s,u,!0),A:$(s,u,!1),m:String(u),mm:D.s(u,2,"0"),s:String(this.$s),ss:D.s(this.$s,2,"0"),SSS:D.s(this.$ms,3,"0"),Z:r};return e.replace(f,function(t,n){return n||l[t]||r.replace(":","")})},d.utcOffset=function(){return 15*-Math.round(this.$d.getTimezoneOffset()/15)},d.diff=function(t,h,f){var c,d=D.p(h),$=g(t),l=6e4*($.utcOffset()-this.utcOffset()),m=this-$,y=D.m(this,$);return y=(c={},c[o]=y/12,c[u]=y,c[a]=y/3,c[s]=(m-l)/6048e5,c[i]=(m-l)/864e5,c[r]=m/36e5,c[e]=m/6e4,c[n]=m/1e3,c)[d]||m,f?y:D.a(y)},d.daysInMonth=function(){return this.endOf(u).$D},d.$locale=function(){return m[this.$L]},d.locale=function(t,n){if(!t)return this.$L;var e=this.clone();return e.$L=M(t,n,!0),e},d.clone=function(){return D.w(this.toDate(),this)},d.toDate=function(){return new Date(this.$d)},d.toJSON=function(){return this.toISOString()},d.toISOString=function(){return this.$d.toISOString()},d.toString=function(){return this.$d.toUTCString()},c}();return g.prototype=v.prototype,g.extend=function(t,n){return t(n,v,g),g},g.locale=M,g.isDayjs=y,g.unix=function(t){return g(1e3*t)},g.en=m[l],g.Ls=m,g});const p={top:50,right:30,bottom:50,left:50};class md{constructor(t,{title:i,xLabel:o,yLabel:e,data:{datasets:a},options:s={unxkcdify:!1,dotSize:1,showLine:!1,timeFormat:"",xTickCount:3,yTickCount:3,legendPosition:b.positionType.upLeft,dataColors:[],fontFamily:"xkcd"}}){i&&(this.title=i,p.top=60),o&&(this.xLabel=o,p.bottom=50),e&&(this.yLabel=e,p.left=70),this.data={datasets:a},this.options=s,this.filter="url(#xkcdify)",this.fontFamily=this.options.fontFamily||"xkcd",s.unxkcdify&&(this.filter=null,this.fontFamily="-apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif"),this.svgEl=j(t).style("stroke-width",3).style("font-family",this.fontFamily).attr("width",t.parentElement.clientWidth).attr("height",Math.min(2*t.parentElement.clientWidth/3,window.innerHeight)),this.svgEl.selectAll("*").remove(),this.chart=this.svgEl.append("g").attr("transform",`translate(${p.left},${p.top})`),this.width=this.svgEl.attr("width")-p.left-p.right,this.height=this.svgEl.attr("height")-p.top-p.bottom,M(this.svgEl),N(this.svgEl),this.render()}render(){this.title&&u.title(this.svgEl,this.title),this.xLabel&&u.xLabel(this.svgEl,this.xLabel),this.yLabel&&u.yLabel(this.svgEl,this.yLabel);const t=new L({parent:this.svgEl,title:"",items:[{color:"red",text:"weweyang"},{color:"blue",text:"timqian"}],position:{x:60,y:60,type:b.positionType.dowfnRight},unxkcdify:this.options.unxkcdify});this.options.timeFormat&&this.data.datasets.forEach(t=>{t.data.forEach(t=>{var $dZY$$interop$default=Oc(sa);t.x=$dZY$$interop$default.d(t.x)})});const i=this.data.datasets.reduce((t,i)=>t.concat(i.data),[]),o=i.map(t=>t.x),e=i.map(t=>t.y);let a=K().domain([Math.min(...o),Math.max(...o)]).range([0,this.width]);this.options.timeFormat&&(a=qd().domain([Math.min(...o),Math.max(...o)]).range([0,this.width]));const s=K().domain([Math.min(...e),Math.max(...e)]).range([this.height,0]),r=this.chart.append("g").attr("pointer-events","all");if(E.xAxis(r,{xScale:a,tickCount:void 0===this.options.xTickCount?3:this.options.xTickCount,moveDown:this.height,fontFamily:this.fontFamily,unxkcdify:this.options.unxkcdify}),E.yAxis(r,{yScale:s,tickCount:void 0===this.options.yTickCount?3:this.options.yTickCount,fontFamily:this.fontFamily,unxkcdify:this.options.unxkcdify}),this.options.showLine){const t=Qa().x(t=>a(t.x)).y(t=>s(t.y)).curve(mc);r.selectAll(".xkcd-chart-xyline").data(this.data.datasets).enter().append("path").attr("class","xkcd-chart-xyline").attr("d",i=>t(i.data)).attr("fill","none").attr("stroke",(t,i)=>this.options.dataColors?this.options.dataColors[i]:k[i]).attr("filter",this.filter)}const n=3.5*(void 0===this.options.dotSize?1:this.options.dotSize),$=6*(void 0===this.options.dotSize?1:this.options.dotSize);r.selectAll(".xkcd-chart-xycircle-group").data(this.data.datasets).enter().append("g").attr("class",".xkcd-chart-xycircle-group").attr("filter",this.filter).attr("xy-group-index",(t,i)=>i).selectAll(".xkcd-chart-xycircle-circle").data(t=>t.data).enter().append("circle").style("stroke",(t,i,o)=>{const e=Number(j(o[i].parentElement).attr("xy-group-index"));return this.options.dataColors?this.options.dataColors[e]:k[e]}).style("fill",(t,i,o)=>{const e=Number(j(o[i].parentElement).attr("xy-group-index"));return this.options.dataColors?this.options.dataColors[e]:k[e]}).attr("r",n).attr("cx",t=>a(t.x)).attr("cy",t=>s(t.y)).attr("pointer-events","all").on("mouseover",(i,o,e)=>{const r=Number(j(e[o].parentElement).attr("xy-group-index"));j(e[o]).attr("r",$);const n=a(i.x)+p.left+5,l=s(i.y)+p.top+5;let h=b.positionType.downRight;var $dZY$$interop$default=Oc(sa);n>this.width/2&&l<this.height/2?h=b.positionType.downLeft:n>this.width/2&&l>this.height/2?h=b.positionType.upLeft:n<this.width/2&&l>this.height/2&&(h=b.positionType.upRight),t.update({title:this.options.timeFormat?$dZY$$interop$default.d(this.data.datasets[r].data[o].x).format(this.options.timeFormat):`${this.data.datasets[r].data[o].x}`,items:[{color:this.options.dataColors?this.options.dataColors[r]:k[r],text:`${this.data.datasets[r].label||""}: ${i.y}`}],position:{x:n,y:l,type:h}}),t.show()}).on("mouseout",(i,o,e)=>{j(e[o]).attr("r",n),t.hide()});const l=this.data.datasets.map((t,i)=>({color:this.options.dataColors?this.options.dataColors[i]:k[i],text:t.label}));fa(r,{items:l,position:this.options.legendPosition,unxkcdify:this.options.unxkcdify,parentWidth:this.width,parentHeight:this.height})}update(){}}function Dc(t){this._context=t}var Cc=function(){};Dc.prototype={areaStart:Cc,areaEnd:Cc,lineStart:function(){this._point=0},lineEnd:function(){this._point&&this._context.closePath()},point:function(t,o){t=+t,o=+o,this._point?this._context.lineTo(t,o):(this._point=1,this._context.moveTo(t,o))}};var Lh=function(t){return new Dc(t)};const gg=50,ua=-Math.PI/2,nd=.2;class Ie{constructor(t,{title:a,data:{labels:e,datasets:i},options:r={showLabels:!1,ticksCount:3,showLegend:!1,legendPosition:b.positionType.upLeft,dataColors:[],fontFamily:"xkcd",dotSize:1}}){this.title=a,this.data={labels:e,datasets:i},this.directionsCount=i[0].data.length,this.options=r,this.filter="url(#xkcdify-pie)",this.fontFamily=this.options.fontFamily||"xkcd",r.unxkcdify&&(this.filter=null,this.fontFamily="-apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif"),this.svgEl=j(t).style("stroke-width","3").style("font-family",this.fontFamily).attr("width",t.parentElement.clientWidth).attr("height",Math.min(2*t.parentElement.clientWidth/3,window.innerHeight)),this.svgEl.selectAll("*").remove(),this.width=this.svgEl.attr("width"),this.height=this.svgEl.attr("height"),this.chart=this.svgEl.append("g").attr("transform",`translate(${this.width/2},${this.height/2})`),M(this.svgEl),N(this.svgEl),this.render()}render(){this.title&&u.title(this.svgEl,this.title);const t=new L({parent:this.svgEl,title:"",items:[],position:{x:0,y:0,type:b.positionType.downRight},unxkcdify:this.options.unxkcdify}),a=3.5*(this.options.dotSize||1),e=6*(this.options.dotSize||1),i=this.options.dataColors||k,r=Math.min(this.width,this.height)/2-gg,s=2*Math.PI/this.directionsCount,n=this.data.datasets.reduce((t,a)=>t.concat(a.data),[]),l=Math.max(...n),o=Array(this.directionsCount).fill(l),d=K().domain([0,l]).range([0,r]),h=(t,a)=>d(t)*Math.cos(s*a+ua),c=(t,a)=>d(t)*Math.sin(s*a+ua),$=Qa().x(h).y(c).curve(Lh),p=d.ticks(this.options.ticksCount||3),g=this.chart.append("g").attr("class","xkcd-chart-radar-grid").attr("stroke-width","1").attr("filter",this.filter);g.selectAll(".xkcd-chart-radar-level").data(p).enter().append("path").attr("class","xkcd-chart-radar-level").attr("d",t=>$(Array(this.directionsCount).fill(t))).style("fill","none").attr("stroke","#aaa").attr("stroke-dasharray","7,7"),g.selectAll(".xkcd-chart-radar-line").data(o).enter().append("line").attr("class",".xkcd-chart-radar-line").attr("stroke","black").attr("x1",0).attr("y1",0).attr("x2",h).attr("y2",c),g.selectAll(".xkcd-chart-radar-tick").data(p).enter().append("text").attr("class","xkcd-chart-radar-tick").attr("x",t=>h(t,0)).attr("y",t=>c(t,0)).style("font-size","16").attr("text-anchor","end").attr("dx","-.125em").attr("dy",".35em").text(t=>t),this.options.showLabels&&g.selectAll(".xkcd-chart-radar-label").data(o.map(t=>1.15*t)).enter().append("text").attr("class","xkcd-chart-radar-label").style("font-size","16").attr("x",(t,a)=>(r+10)*Math.cos(s*a+ua)).attr("y",(t,a)=>(r+10)*Math.sin(s*a+ua)).attr("dy",".35em").attr("text-anchor",(t,a,e)=>{let i="start";return j(e[a]).attr("x")<0&&(i="end"),i}).text((t,a)=>this.data.labels[a]);const f=this.chart.selectAll(".xkcd-chart-radar-group").data(this.data.datasets).enter().append("g").attr("class","xkcd-chart-radar-group").attr("filter",this.filter).attr("stroke",(t,a)=>i[a]).attr("fill",(t,a)=>i[a]);if(f.selectAll("circle").data(t=>t.data).enter().append("circle").attr("r",a).attr("cx",h).attr("cy",c).attr("pointer-events","all").on("mouseover",(a,r,s)=>{j(s[r]).attr("r",e);const n=h(a,r)+this.width/2,l=c(a,r)+this.height/2;let o=b.positionType.downRight;n>this.width/2&&l<this.height/2?o=b.positionType.downLeft:n>this.width/2&&l>this.height/2?o=b.positionType.upLeft:n<this.width/2&&l>this.height/2&&(o=b.positionType.upRight),t.update({title:this.data.labels[r],items:this.data.datasets.map((t,a)=>({color:i[a],text:`${t.label||""}: ${t.data[r]}`})),position:{x:n,y:l,type:o}}),t.show()}).on("mouseout",(e,i,r)=>{j(r[i]).attr("r",a),t.hide()}),f.selectAll("path").data(t=>[t.data]).enter().append("path").attr("d",$).attr("pointer-events","none").style("fill-opacity",nd),this.options.showLegend){const t=this.data.datasets.map((t,a)=>({color:i[a],text:t.label||""})),a=this.svgEl.append("g").attr("transform","translate(0, 30)");fa(a,{items:t,position:this.options.legendPosition,unxkcdify:this.options.unxkcdify,parentWidth:this.width,parentHeight:this.height})}}update(){}}Zc={config:b,Bar:Ce,Pie:jf,Line:yf,XY:md,Radar:Ie};if(true){module.exports=Zc}else {}})();

/***/ }),
/* 19 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global, module) {/* harmony import */ var _ponyfill_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(29);
/* global window */


var root;

if (typeof self !== 'undefined') {
  root = self;
} else if (typeof window !== 'undefined') {
  root = window;
} else if (typeof global !== 'undefined') {
  root = global;
} else if (true) {
  root = module;
} else {}

var result = Object(_ponyfill_js__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(root);
/* harmony default export */ __webpack_exports__["a"] = (result);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(13), __webpack_require__(42)(module)))

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

!function(e){ true?module.exports=e(null):undefined}(function e(a){"use strict";var r=/^\0+/g,c=/[\0\r\f]/g,s=/: */g,t=/zoo|gra/,i=/([,: ])(transform)/g,f=/,+\s*(?![^(]*[)])/g,n=/ +\s*(?![^(]*[)])/g,l=/ *[\0] */g,o=/,\r+?/g,h=/([\t\r\n ])*\f?&/g,u=/:global\(((?:[^\(\)\[\]]*|\[.*\]|\([^\(\)]*\))*)\)/g,d=/\W+/g,b=/@(k\w+)\s*(\S*)\s*/,p=/::(place)/g,k=/:(read-only)/g,g=/\s+(?=[{\];=:>])/g,A=/([[}=:>])\s+/g,C=/(\{[^{]+?);(?=\})/g,w=/\s{2,}/g,v=/([^\(])(:+) */g,m=/[svh]\w+-[tblr]{2}/,x=/\(\s*(.*)\s*\)/g,$=/([\s\S]*?);/g,y=/-self|flex-/g,O=/[^]*?(:[rp][el]a[\w-]+)[^]*/,j=/stretch|:\s*\w+\-(?:conte|avail)/,z=/([^-])(image-set\()/,N="-webkit-",S="-moz-",F="-ms-",W=59,q=125,B=123,D=40,E=41,G=91,H=93,I=10,J=13,K=9,L=64,M=32,P=38,Q=45,R=95,T=42,U=44,V=58,X=39,Y=34,Z=47,_=62,ee=43,ae=126,re=0,ce=12,se=11,te=107,ie=109,fe=115,ne=112,le=111,oe=105,he=99,ue=100,de=112,be=1,pe=1,ke=0,ge=1,Ae=1,Ce=1,we=0,ve=0,me=0,xe=[],$e=[],ye=0,Oe=null,je=-2,ze=-1,Ne=0,Se=1,Fe=2,We=3,qe=0,Be=1,De="",Ee="",Ge="";function He(e,a,s,t,i){for(var f,n,o=0,h=0,u=0,d=0,g=0,A=0,C=0,w=0,m=0,$=0,y=0,O=0,j=0,z=0,R=0,we=0,$e=0,Oe=0,je=0,ze=s.length,Je=ze-1,Re="",Te="",Ue="",Ve="",Xe="",Ye="";R<ze;){if(C=s.charCodeAt(R),R===Je)if(h+d+u+o!==0){if(0!==h)C=h===Z?I:Z;d=u=o=0,ze++,Je++}if(h+d+u+o===0){if(R===Je){if(we>0)Te=Te.replace(c,"");if(Te.trim().length>0){switch(C){case M:case K:case W:case J:case I:break;default:Te+=s.charAt(R)}C=W}}if(1===$e)switch(C){case B:case q:case W:case Y:case X:case D:case E:case U:$e=0;case K:case J:case I:case M:break;default:for($e=0,je=R,g=C,R--,C=W;je<ze;)switch(s.charCodeAt(je++)){case I:case J:case W:++R,C=g,je=ze;break;case V:if(we>0)++R,C=g;case B:je=ze}}switch(C){case B:for(g=(Te=Te.trim()).charCodeAt(0),y=1,je=++R;R<ze;){switch(C=s.charCodeAt(R)){case B:y++;break;case q:y--;break;case Z:switch(A=s.charCodeAt(R+1)){case T:case Z:R=Qe(A,R,Je,s)}break;case G:C++;case D:C++;case Y:case X:for(;R++<Je&&s.charCodeAt(R)!==C;);}if(0===y)break;R++}if(Ue=s.substring(je,R),g===re)g=(Te=Te.replace(r,"").trim()).charCodeAt(0);switch(g){case L:if(we>0)Te=Te.replace(c,"");switch(A=Te.charCodeAt(1)){case ue:case ie:case fe:case Q:f=a;break;default:f=xe}if(je=(Ue=He(a,f,Ue,A,i+1)).length,me>0&&0===je)je=Te.length;if(ye>0)if(f=Ie(xe,Te,Oe),n=Pe(We,Ue,f,a,pe,be,je,A,i,t),Te=f.join(""),void 0!==n)if(0===(je=(Ue=n.trim()).length))A=0,Ue="";if(je>0)switch(A){case fe:Te=Te.replace(x,Me);case ue:case ie:case Q:Ue=Te+"{"+Ue+"}";break;case te:if(Ue=(Te=Te.replace(b,"$1 $2"+(Be>0?De:"")))+"{"+Ue+"}",1===Ae||2===Ae&&Le("@"+Ue,3))Ue="@"+N+Ue+"@"+Ue;else Ue="@"+Ue;break;default:if(Ue=Te+Ue,t===de)Ve+=Ue,Ue=""}else Ue="";break;default:Ue=He(a,Ie(a,Te,Oe),Ue,t,i+1)}Xe+=Ue,O=0,$e=0,z=0,we=0,Oe=0,j=0,Te="",Ue="",C=s.charCodeAt(++R);break;case q:case W:if((je=(Te=(we>0?Te.replace(c,""):Te).trim()).length)>1){if(0===z)if((g=Te.charCodeAt(0))===Q||g>96&&g<123)je=(Te=Te.replace(" ",":")).length;if(ye>0)if(void 0!==(n=Pe(Se,Te,a,e,pe,be,Ve.length,t,i,t)))if(0===(je=(Te=n.trim()).length))Te="\0\0";switch(g=Te.charCodeAt(0),A=Te.charCodeAt(1),g){case re:break;case L:if(A===oe||A===he){Ye+=Te+s.charAt(R);break}default:if(Te.charCodeAt(je-1)===V)break;Ve+=Ke(Te,g,A,Te.charCodeAt(2))}}O=0,$e=0,z=0,we=0,Oe=0,Te="",C=s.charCodeAt(++R)}}switch(C){case J:case I:if(h+d+u+o+ve===0)switch($){case E:case X:case Y:case L:case ae:case _:case T:case ee:case Z:case Q:case V:case U:case W:case B:case q:break;default:if(z>0)$e=1}if(h===Z)h=0;else if(ge+O===0&&t!==te&&Te.length>0)we=1,Te+="\0";if(ye*qe>0)Pe(Ne,Te,a,e,pe,be,Ve.length,t,i,t);be=1,pe++;break;case W:case q:if(h+d+u+o===0){be++;break}default:switch(be++,Re=s.charAt(R),C){case K:case M:if(d+o+h===0)switch(w){case U:case V:case K:case M:Re="";break;default:if(C!==M)Re=" "}break;case re:Re="\\0";break;case ce:Re="\\f";break;case se:Re="\\v";break;case P:if(d+h+o===0&&ge>0)Oe=1,we=1,Re="\f"+Re;break;case 108:if(d+h+o+ke===0&&z>0)switch(R-z){case 2:if(w===ne&&s.charCodeAt(R-3)===V)ke=w;case 8:if(m===le)ke=m}break;case V:if(d+h+o===0)z=R;break;case U:if(h+u+d+o===0)we=1,Re+="\r";break;case Y:case X:if(0===h)d=d===C?0:0===d?C:d;break;case G:if(d+h+u===0)o++;break;case H:if(d+h+u===0)o--;break;case E:if(d+h+o===0)u--;break;case D:if(d+h+o===0){if(0===O)switch(2*w+3*m){case 533:break;default:y=0,O=1}u++}break;case L:if(h+u+d+o+z+j===0)j=1;break;case T:case Z:if(d+o+u>0)break;switch(h){case 0:switch(2*C+3*s.charCodeAt(R+1)){case 235:h=Z;break;case 220:je=R,h=T}break;case T:if(C===Z&&w===T&&je+2!==R){if(33===s.charCodeAt(je+2))Ve+=s.substring(je,R+1);Re="",h=0}}}if(0===h){if(ge+d+o+j===0&&t!==te&&C!==W)switch(C){case U:case ae:case _:case ee:case E:case D:if(0===O){switch(w){case K:case M:case I:case J:Re+="\0";break;default:Re="\0"+Re+(C===U?"":"\0")}we=1}else switch(C){case D:if(z+7===R&&108===w)z=0;O=++y;break;case E:if(0==(O=--y))we=1,Re+="\0"}break;case K:case M:switch(w){case re:case B:case q:case W:case U:case ce:case K:case M:case I:case J:break;default:if(0===O)we=1,Re+="\0"}}if(Te+=Re,C!==M&&C!==K)$=C}}m=w,w=C,R++}if(je=Ve.length,me>0)if(0===je&&0===Xe.length&&0===a[0].length==false)if(t!==ie||1===a.length&&(ge>0?Ee:Ge)===a[0])je=a.join(",").length+2;if(je>0){if(f=0===ge&&t!==te?function(e){for(var a,r,s=0,t=e.length,i=Array(t);s<t;++s){for(var f=e[s].split(l),n="",o=0,h=0,u=0,d=0,b=f.length;o<b;++o){if(0===(h=(r=f[o]).length)&&b>1)continue;if(u=n.charCodeAt(n.length-1),d=r.charCodeAt(0),a="",0!==o)switch(u){case T:case ae:case _:case ee:case M:case D:break;default:a=" "}switch(d){case P:r=a+Ee;case ae:case _:case ee:case M:case E:case D:break;case G:r=a+r+Ee;break;case V:switch(2*r.charCodeAt(1)+3*r.charCodeAt(2)){case 530:if(Ce>0){r=a+r.substring(8,h-1);break}default:if(o<1||f[o-1].length<1)r=a+Ee+r}break;case U:a="";default:if(h>1&&r.indexOf(":")>0)r=a+r.replace(v,"$1"+Ee+"$2");else r=a+r+Ee}n+=r}i[s]=n.replace(c,"").trim()}return i}(a):a,ye>0)if(void 0!==(n=Pe(Fe,Ve,f,e,pe,be,je,t,i,t))&&0===(Ve=n).length)return Ye+Ve+Xe;if(Ve=f.join(",")+"{"+Ve+"}",Ae*ke!=0){if(2===Ae&&!Le(Ve,2))ke=0;switch(ke){case le:Ve=Ve.replace(k,":"+S+"$1")+Ve;break;case ne:Ve=Ve.replace(p,"::"+N+"input-$1")+Ve.replace(p,"::"+S+"$1")+Ve.replace(p,":"+F+"input-$1")+Ve}ke=0}}return Ye+Ve+Xe}function Ie(e,a,r){var c=a.trim().split(o),s=c,t=c.length,i=e.length;switch(i){case 0:case 1:for(var f=0,n=0===i?"":e[0]+" ";f<t;++f)s[f]=Je(n,s[f],r,i).trim();break;default:f=0;var l=0;for(s=[];f<t;++f)for(var h=0;h<i;++h)s[l++]=Je(e[h]+" ",c[f],r,i).trim()}return s}function Je(e,a,r,c){var s=a,t=s.charCodeAt(0);if(t<33)t=(s=s.trim()).charCodeAt(0);switch(t){case P:switch(ge+c){case 0:case 1:if(0===e.trim().length)break;default:return s.replace(h,"$1"+e.trim())}break;case V:switch(s.charCodeAt(1)){case 103:if(Ce>0&&ge>0)return s.replace(u,"$1").replace(h,"$1"+Ge);break;default:return e.trim()+s.replace(h,"$1"+e.trim())}default:if(r*ge>0&&s.indexOf("\f")>0)return s.replace(h,(e.charCodeAt(0)===V?"":"$1")+e.trim())}return e+s}function Ke(e,a,r,c){var l,o=0,h=e+";",u=2*a+3*r+4*c;if(944===u)return function(e){var a=e.length,r=e.indexOf(":",9)+1,c=e.substring(0,r).trim(),s=e.substring(r,a-1).trim();switch(e.charCodeAt(9)*Be){case 0:break;case Q:if(110!==e.charCodeAt(10))break;default:for(var t=s.split((s="",f)),i=0,r=0,a=t.length;i<a;r=0,++i){for(var l=t[i],o=l.split(n);l=o[r];){var h=l.charCodeAt(0);if(1===Be&&(h>L&&h<90||h>96&&h<123||h===R||h===Q&&l.charCodeAt(1)!==Q))switch(isNaN(parseFloat(l))+(-1!==l.indexOf("("))){case 1:switch(l){case"infinite":case"alternate":case"backwards":case"running":case"normal":case"forwards":case"both":case"none":case"linear":case"ease":case"ease-in":case"ease-out":case"ease-in-out":case"paused":case"reverse":case"alternate-reverse":case"inherit":case"initial":case"unset":case"step-start":case"step-end":break;default:l+=De}}o[r++]=l}s+=(0===i?"":",")+o.join(" ")}}if(s=c+s+";",1===Ae||2===Ae&&Le(s,1))return N+s+s;return s}(h);else if(0===Ae||2===Ae&&!Le(h,1))return h;switch(u){case 1015:return 97===h.charCodeAt(10)?N+h+h:h;case 951:return 116===h.charCodeAt(3)?N+h+h:h;case 963:return 110===h.charCodeAt(5)?N+h+h:h;case 1009:if(100!==h.charCodeAt(4))break;case 969:case 942:return N+h+h;case 978:return N+h+S+h+h;case 1019:case 983:return N+h+S+h+F+h+h;case 883:if(h.charCodeAt(8)===Q)return N+h+h;if(h.indexOf("image-set(",11)>0)return h.replace(z,"$1"+N+"$2")+h;return h;case 932:if(h.charCodeAt(4)===Q)switch(h.charCodeAt(5)){case 103:return N+"box-"+h.replace("-grow","")+N+h+F+h.replace("grow","positive")+h;case 115:return N+h+F+h.replace("shrink","negative")+h;case 98:return N+h+F+h.replace("basis","preferred-size")+h}return N+h+F+h+h;case 964:return N+h+F+"flex-"+h+h;case 1023:if(99!==h.charCodeAt(8))break;return l=h.substring(h.indexOf(":",15)).replace("flex-","").replace("space-between","justify"),N+"box-pack"+l+N+h+F+"flex-pack"+l+h;case 1005:return t.test(h)?h.replace(s,":"+N)+h.replace(s,":"+S)+h:h;case 1e3:switch(o=(l=h.substring(13).trim()).indexOf("-")+1,l.charCodeAt(0)+l.charCodeAt(o)){case 226:l=h.replace(m,"tb");break;case 232:l=h.replace(m,"tb-rl");break;case 220:l=h.replace(m,"lr");break;default:return h}return N+h+F+l+h;case 1017:if(-1===h.indexOf("sticky",9))return h;case 975:switch(o=(h=e).length-10,u=(l=(33===h.charCodeAt(o)?h.substring(0,o):h).substring(e.indexOf(":",7)+1).trim()).charCodeAt(0)+(0|l.charCodeAt(7))){case 203:if(l.charCodeAt(8)<111)break;case 115:h=h.replace(l,N+l)+";"+h;break;case 207:case 102:h=h.replace(l,N+(u>102?"inline-":"")+"box")+";"+h.replace(l,N+l)+";"+h.replace(l,F+l+"box")+";"+h}return h+";";case 938:if(h.charCodeAt(5)===Q)switch(h.charCodeAt(6)){case 105:return l=h.replace("-items",""),N+h+N+"box-"+l+F+"flex-"+l+h;case 115:return N+h+F+"flex-item-"+h.replace(y,"")+h;default:return N+h+F+"flex-line-pack"+h.replace("align-content","").replace(y,"")+h}break;case 973:case 989:if(h.charCodeAt(3)!==Q||122===h.charCodeAt(4))break;case 931:case 953:if(true===j.test(e))if(115===(l=e.substring(e.indexOf(":")+1)).charCodeAt(0))return Ke(e.replace("stretch","fill-available"),a,r,c).replace(":fill-available",":stretch");else return h.replace(l,N+l)+h.replace(l,S+l.replace("fill-",""))+h;break;case 962:if(h=N+h+(102===h.charCodeAt(5)?F+h:"")+h,r+c===211&&105===h.charCodeAt(13)&&h.indexOf("transform",10)>0)return h.substring(0,h.indexOf(";",27)+1).replace(i,"$1"+N+"$2")+h}return h}function Le(e,a){var r=e.indexOf(1===a?":":"{"),c=e.substring(0,3!==a?r:10),s=e.substring(r+1,e.length-1);return Oe(2!==a?c:c.replace(O,"$1"),s,a)}function Me(e,a){var r=Ke(a,a.charCodeAt(0),a.charCodeAt(1),a.charCodeAt(2));return r!==a+";"?r.replace($," or ($1)").substring(4):"("+a+")"}function Pe(e,a,r,c,s,t,i,f,n,l){for(var o,h=0,u=a;h<ye;++h)switch(o=$e[h].call(Te,e,u,r,c,s,t,i,f,n,l)){case void 0:case false:case true:case null:break;default:u=o}if(u!==a)return u}function Qe(e,a,r,c){for(var s=a+1;s<r;++s)switch(c.charCodeAt(s)){case Z:if(e===T)if(c.charCodeAt(s-1)===T&&a+2!==s)return s+1;break;case I:if(e===Z)return s+1}return s}function Re(e){for(var a in e){var r=e[a];switch(a){case"keyframe":Be=0|r;break;case"global":Ce=0|r;break;case"cascade":ge=0|r;break;case"compress":we=0|r;break;case"semicolon":ve=0|r;break;case"preserve":me=0|r;break;case"prefix":if(Oe=null,!r)Ae=0;else if("function"!=typeof r)Ae=1;else Ae=2,Oe=r}}return Re}function Te(a,r){if(void 0!==this&&this.constructor===Te)return e(a);var s=a,t=s.charCodeAt(0);if(t<33)t=(s=s.trim()).charCodeAt(0);if(Be>0)De=s.replace(d,t===G?"":"-");if(t=1,1===ge)Ge=s;else Ee=s;var i,f=[Ge];if(ye>0)if(void 0!==(i=Pe(ze,r,f,f,pe,be,0,0,0,0))&&"string"==typeof i)r=i;var n=He(xe,f,r,0,0);if(ye>0)if(void 0!==(i=Pe(je,n,f,f,pe,be,n.length,0,0,0))&&"string"!=typeof(n=i))t=0;return De="",Ge="",Ee="",ke=0,pe=1,be=1,we*t==0?n:n.replace(c,"").replace(g,"").replace(A,"$1").replace(C,"$1").replace(w," ")}if(Te.use=function e(a){switch(a){case void 0:case null:ye=$e.length=0;break;default:if("function"==typeof a)$e[ye++]=a;else if("object"==typeof a)for(var r=0,c=a.length;r<c;++r)e(a[r]);else qe=0|!!a}return e},Te.set=Re,void 0!==a)Re(a);return Te});
//# sourceMappingURL=stylis.min.js.map

/***/ }),
/* 21 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
function areInputsEqual(newInputs, lastInputs) {
    if (newInputs.length !== lastInputs.length) {
        return false;
    }
    for (var i = 0; i < newInputs.length; i++) {
        if (newInputs[i] !== lastInputs[i]) {
            return false;
        }
    }
    return true;
}

function memoizeOne(resultFn, isEqual) {
    if (isEqual === void 0) { isEqual = areInputsEqual; }
    var lastThis;
    var lastArgs = [];
    var lastResult;
    var calledOnce = false;
    function memoized() {
        var newArgs = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            newArgs[_i] = arguments[_i];
        }
        if (calledOnce && lastThis === this && isEqual(newArgs, lastArgs)) {
            return lastResult;
        }
        lastResult = resultFn.apply(this, newArgs);
        calledOnce = true;
        lastThis = this;
        lastArgs = newArgs;
        return lastResult;
    }
    return memoized;
}

/* harmony default export */ __webpack_exports__["a"] = (memoizeOne);


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

!function(e,t){if(true)module.exports=t(__webpack_require__(0),__webpack_require__(18));else { var n, r; }}(window,function(e,t){return function(e){var t={};function r(n){if(t[n])return t[n].exports;var c=t[n]={i:n,l:!1,exports:{}};return e[n].call(c.exports,c,c.exports,r),c.l=!0,c.exports}return r.m=e,r.c=t,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var c in e)r.d(n,c,function(t){return e[t]}.bind(null,c));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="/obiwankenoobi/chart.xkcd-react/",r(r.s=2)}([function(t,r){t.exports=e},function(e,r){e.exports=t},function(e,t,r){e.exports=r(3)},function(e,t,r){"use strict";r.r(t);var n=r(1),c=r.n(n),u=r(0),o=r.n(u),f=function(e){var t=e.config,r=Object(u.useRef)();return Object(u.useEffect)(function(){r.current&&new c.a.Bar(r.current,t)}),o.a.createElement("svg",{ref:r})},i=function(e){var t=e.config,r=Object(u.useRef)();return Object(u.useEffect)(function(){r.current&&new c.a.Pie(r.current,t)}),o.a.createElement("svg",{ref:r})},a=function(e){var t=e.config,r=Object(u.useRef)();return Object(u.useEffect)(function(){r.current&&new c.a.Line(r.current,t)}),o.a.createElement("svg",{ref:r})},s=function(e){var t=e.config,r=Object(u.useRef)();return Object(u.useEffect)(function(){r.current&&new c.a.XY(r.current,t)}),o.a.createElement("svg",{ref:r})},d=function(e){var t=e.config,r=Object(u.useRef)();return Object(u.useEffect)(function(){r.current&&new c.a.Radar(r.current,t)}),o.a.createElement("svg",{ref:r})};r.d(t,"Bar",function(){return f}),r.d(t,"Pie",function(){return i}),r.d(t,"Line",function(){return a}),r.d(t,"XY",function(){return s}),r.d(t,"Radar",function(){return d})}])});
//# sourceMappingURL=index.js.map

/***/ }),
/* 23 */
/***/ (function(module, exports) {

function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;
  subClass.__proto__ = superClass;
}

module.exports = _inheritsLoose;

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

var isarray = __webpack_require__(54)

/**
 * Expose `pathToRegexp`.
 */
module.exports = pathToRegexp
module.exports.parse = parse
module.exports.compile = compile
module.exports.tokensToFunction = tokensToFunction
module.exports.tokensToRegExp = tokensToRegExp

/**
 * The main path matching regexp utility.
 *
 * @type {RegExp}
 */
var PATH_REGEXP = new RegExp([
  // Match escaped characters that would otherwise appear in future matches.
  // This allows the user to escape special characters that won't transform.
  '(\\\\.)',
  // Match Express-style parameters and un-named parameters with a prefix
  // and optional suffixes. Matches appear as:
  //
  // "/:test(\\d+)?" => ["/", "test", "\d+", undefined, "?", undefined]
  // "/route(\\d+)"  => [undefined, undefined, undefined, "\d+", undefined, undefined]
  // "/*"            => ["/", undefined, undefined, undefined, undefined, "*"]
  '([\\/.])?(?:(?:\\:(\\w+)(?:\\(((?:\\\\.|[^\\\\()])+)\\))?|\\(((?:\\\\.|[^\\\\()])+)\\))([+*?])?|(\\*))'
].join('|'), 'g')

/**
 * Parse a string for the raw tokens.
 *
 * @param  {string}  str
 * @param  {Object=} options
 * @return {!Array}
 */
function parse (str, options) {
  var tokens = []
  var key = 0
  var index = 0
  var path = ''
  var defaultDelimiter = options && options.delimiter || '/'
  var res

  while ((res = PATH_REGEXP.exec(str)) != null) {
    var m = res[0]
    var escaped = res[1]
    var offset = res.index
    path += str.slice(index, offset)
    index = offset + m.length

    // Ignore already escaped sequences.
    if (escaped) {
      path += escaped[1]
      continue
    }

    var next = str[index]
    var prefix = res[2]
    var name = res[3]
    var capture = res[4]
    var group = res[5]
    var modifier = res[6]
    var asterisk = res[7]

    // Push the current path onto the tokens.
    if (path) {
      tokens.push(path)
      path = ''
    }

    var partial = prefix != null && next != null && next !== prefix
    var repeat = modifier === '+' || modifier === '*'
    var optional = modifier === '?' || modifier === '*'
    var delimiter = res[2] || defaultDelimiter
    var pattern = capture || group

    tokens.push({
      name: name || key++,
      prefix: prefix || '',
      delimiter: delimiter,
      optional: optional,
      repeat: repeat,
      partial: partial,
      asterisk: !!asterisk,
      pattern: pattern ? escapeGroup(pattern) : (asterisk ? '.*' : '[^' + escapeString(delimiter) + ']+?')
    })
  }

  // Match any characters still remaining.
  if (index < str.length) {
    path += str.substr(index)
  }

  // If the path exists, push it onto the end.
  if (path) {
    tokens.push(path)
  }

  return tokens
}

/**
 * Compile a string to a template function for the path.
 *
 * @param  {string}             str
 * @param  {Object=}            options
 * @return {!function(Object=, Object=)}
 */
function compile (str, options) {
  return tokensToFunction(parse(str, options))
}

/**
 * Prettier encoding of URI path segments.
 *
 * @param  {string}
 * @return {string}
 */
function encodeURIComponentPretty (str) {
  return encodeURI(str).replace(/[\/?#]/g, function (c) {
    return '%' + c.charCodeAt(0).toString(16).toUpperCase()
  })
}

/**
 * Encode the asterisk parameter. Similar to `pretty`, but allows slashes.
 *
 * @param  {string}
 * @return {string}
 */
function encodeAsterisk (str) {
  return encodeURI(str).replace(/[?#]/g, function (c) {
    return '%' + c.charCodeAt(0).toString(16).toUpperCase()
  })
}

/**
 * Expose a method for transforming tokens into the path function.
 */
function tokensToFunction (tokens) {
  // Compile all the tokens into regexps.
  var matches = new Array(tokens.length)

  // Compile all the patterns before compilation.
  for (var i = 0; i < tokens.length; i++) {
    if (typeof tokens[i] === 'object') {
      matches[i] = new RegExp('^(?:' + tokens[i].pattern + ')$')
    }
  }

  return function (obj, opts) {
    var path = ''
    var data = obj || {}
    var options = opts || {}
    var encode = options.pretty ? encodeURIComponentPretty : encodeURIComponent

    for (var i = 0; i < tokens.length; i++) {
      var token = tokens[i]

      if (typeof token === 'string') {
        path += token

        continue
      }

      var value = data[token.name]
      var segment

      if (value == null) {
        if (token.optional) {
          // Prepend partial segment prefixes.
          if (token.partial) {
            path += token.prefix
          }

          continue
        } else {
          throw new TypeError('Expected "' + token.name + '" to be defined')
        }
      }

      if (isarray(value)) {
        if (!token.repeat) {
          throw new TypeError('Expected "' + token.name + '" to not repeat, but received `' + JSON.stringify(value) + '`')
        }

        if (value.length === 0) {
          if (token.optional) {
            continue
          } else {
            throw new TypeError('Expected "' + token.name + '" to not be empty')
          }
        }

        for (var j = 0; j < value.length; j++) {
          segment = encode(value[j])

          if (!matches[i].test(segment)) {
            throw new TypeError('Expected all "' + token.name + '" to match "' + token.pattern + '", but received `' + JSON.stringify(segment) + '`')
          }

          path += (j === 0 ? token.prefix : token.delimiter) + segment
        }

        continue
      }

      segment = token.asterisk ? encodeAsterisk(value) : encode(value)

      if (!matches[i].test(segment)) {
        throw new TypeError('Expected "' + token.name + '" to match "' + token.pattern + '", but received "' + segment + '"')
      }

      path += token.prefix + segment
    }

    return path
  }
}

/**
 * Escape a regular expression string.
 *
 * @param  {string} str
 * @return {string}
 */
function escapeString (str) {
  return str.replace(/([.+*?=^!:${}()[\]|\/\\])/g, '\\$1')
}

/**
 * Escape the capturing group by escaping special characters and meaning.
 *
 * @param  {string} group
 * @return {string}
 */
function escapeGroup (group) {
  return group.replace(/([=!:$\/()])/g, '\\$1')
}

/**
 * Attach the keys as a property of the regexp.
 *
 * @param  {!RegExp} re
 * @param  {Array}   keys
 * @return {!RegExp}
 */
function attachKeys (re, keys) {
  re.keys = keys
  return re
}

/**
 * Get the flags for a regexp from the options.
 *
 * @param  {Object} options
 * @return {string}
 */
function flags (options) {
  return options.sensitive ? '' : 'i'
}

/**
 * Pull out keys from a regexp.
 *
 * @param  {!RegExp} path
 * @param  {!Array}  keys
 * @return {!RegExp}
 */
function regexpToRegexp (path, keys) {
  // Use a negative lookahead to match only capturing groups.
  var groups = path.source.match(/\((?!\?)/g)

  if (groups) {
    for (var i = 0; i < groups.length; i++) {
      keys.push({
        name: i,
        prefix: null,
        delimiter: null,
        optional: false,
        repeat: false,
        partial: false,
        asterisk: false,
        pattern: null
      })
    }
  }

  return attachKeys(path, keys)
}

/**
 * Transform an array into a regexp.
 *
 * @param  {!Array}  path
 * @param  {Array}   keys
 * @param  {!Object} options
 * @return {!RegExp}
 */
function arrayToRegexp (path, keys, options) {
  var parts = []

  for (var i = 0; i < path.length; i++) {
    parts.push(pathToRegexp(path[i], keys, options).source)
  }

  var regexp = new RegExp('(?:' + parts.join('|') + ')', flags(options))

  return attachKeys(regexp, keys)
}

/**
 * Create a path regexp from string input.
 *
 * @param  {string}  path
 * @param  {!Array}  keys
 * @param  {!Object} options
 * @return {!RegExp}
 */
function stringToRegexp (path, keys, options) {
  return tokensToRegExp(parse(path, options), keys, options)
}

/**
 * Expose a function for taking tokens and returning a RegExp.
 *
 * @param  {!Array}          tokens
 * @param  {(Array|Object)=} keys
 * @param  {Object=}         options
 * @return {!RegExp}
 */
function tokensToRegExp (tokens, keys, options) {
  if (!isarray(keys)) {
    options = /** @type {!Object} */ (keys || options)
    keys = []
  }

  options = options || {}

  var strict = options.strict
  var end = options.end !== false
  var route = ''

  // Iterate over the tokens and create our regexp string.
  for (var i = 0; i < tokens.length; i++) {
    var token = tokens[i]

    if (typeof token === 'string') {
      route += escapeString(token)
    } else {
      var prefix = escapeString(token.prefix)
      var capture = '(?:' + token.pattern + ')'

      keys.push(token)

      if (token.repeat) {
        capture += '(?:' + prefix + capture + ')*'
      }

      if (token.optional) {
        if (!token.partial) {
          capture = '(?:' + prefix + '(' + capture + '))?'
        } else {
          capture = prefix + '(' + capture + ')?'
        }
      } else {
        capture = prefix + '(' + capture + ')'
      }

      route += capture
    }
  }

  var delimiter = escapeString(options.delimiter || '/')
  var endsWithDelimiter = route.slice(-delimiter.length) === delimiter

  // In non-strict mode we allow a slash at the end of match. If the path to
  // match already ends with a slash, we remove it for consistency. The slash
  // is valid at the end of a path match, not in the middle. This is important
  // in non-ending mode, where "/test/" shouldn't match "/test//route".
  if (!strict) {
    route = (endsWithDelimiter ? route.slice(0, -delimiter.length) : route) + '(?:' + delimiter + '(?=$))?'
  }

  if (end) {
    route += '$'
  } else {
    // In non-ending mode, we need the capturing groups to match as much as
    // possible by using a positive lookahead to the end or next path segment.
    route += strict && endsWithDelimiter ? '' : '(?=' + delimiter + '|$)'
  }

  return attachKeys(new RegExp('^' + route, flags(options)), keys)
}

/**
 * Normalize the given path string, returning a regular expression.
 *
 * An empty array can be passed in for the keys, which will hold the
 * placeholder key descriptions. For example, using `/user/:id`, `keys` will
 * contain `[{ name: 'id', delimiter: '/', optional: false, repeat: false }]`.
 *
 * @param  {(string|RegExp|Array)} path
 * @param  {(Array|Object)=}       keys
 * @param  {Object=}               options
 * @return {!RegExp}
 */
function pathToRegexp (path, keys, options) {
  if (!isarray(keys)) {
    options = /** @type {!Object} */ (keys || options)
    keys = []
  }

  options = options || {}

  if (path instanceof RegExp) {
    return regexpToRegexp(path, /** @type {!Array} */ (keys))
  }

  if (isarray(path)) {
    return arrayToRegexp(/** @type {!Array} */ (path), /** @type {!Array} */ (keys), options)
  }

  return stringToRegexp(/** @type {string} */ (path), /** @type {!Array} */ (keys), options)
}


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/


/* eslint-disable no-unused-vars */
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function toObject(val) {
	if (val === null || val === undefined) {
		throw new TypeError('Object.assign cannot be called with null or undefined');
	}

	return Object(val);
}

function shouldUseNative() {
	try {
		if (!Object.assign) {
			return false;
		}

		// Detect buggy property enumeration order in older V8 versions.

		// https://bugs.chromium.org/p/v8/issues/detail?id=4118
		var test1 = new String('abc');  // eslint-disable-line no-new-wrappers
		test1[5] = 'de';
		if (Object.getOwnPropertyNames(test1)[0] === '5') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test2 = {};
		for (var i = 0; i < 10; i++) {
			test2['_' + String.fromCharCode(i)] = i;
		}
		var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
			return test2[n];
		});
		if (order2.join('') !== '0123456789') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test3 = {};
		'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
			test3[letter] = letter;
		});
		if (Object.keys(Object.assign({}, test3)).join('') !==
				'abcdefghijklmnopqrst') {
			return false;
		}

		return true;
	} catch (err) {
		// We don't expect any of the above to throw, but better to be safe.
		return false;
	}
}

module.exports = shouldUseNative() ? Object.assign : function (target, source) {
	var from;
	var to = toObject(target);
	var symbols;

	for (var s = 1; s < arguments.length; s++) {
		from = Object(arguments[s]);

		for (var key in from) {
			if (hasOwnProperty.call(from, key)) {
				to[key] = from[key];
			}
		}

		if (getOwnPropertySymbols) {
			symbols = getOwnPropertySymbols(from);
			for (var i = 0; i < symbols.length; i++) {
				if (propIsEnumerable.call(from, symbols[i])) {
					to[symbols[i]] = from[symbols[i]];
				}
			}
		}
	}

	return to;
};


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _utils = __webpack_require__(11);

var _utils2 = _interopRequireDefault(_utils);

var _smooth = __webpack_require__(48);

var _smooth2 = _interopRequireDefault(_smooth);

var _cancelEvents = __webpack_require__(49);

var _cancelEvents2 = _interopRequireDefault(_cancelEvents);

var _scrollEvents = __webpack_require__(17);

var _scrollEvents2 = _interopRequireDefault(_scrollEvents);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Gets the easing type from the smooth prop within options.
 */
var getAnimationType = function getAnimationType(options) {
  return _smooth2.default[options.smooth] || _smooth2.default.defaultEasing;
};
/*
 * Function helper
 */
var functionWrapper = function functionWrapper(value) {
  return typeof value === 'function' ? value : function () {
    return value;
  };
};
/*
 * Wraps window properties to allow server side rendering
 */
var currentWindowProperties = function currentWindowProperties() {
  if (typeof window !== 'undefined') {
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame;
  }
};

/*
 * Helper function to never extend 60fps on the webpage.
 */
var requestAnimationFrameHelper = function () {
  return currentWindowProperties() || function (callback, element, delay) {
    window.setTimeout(callback, delay || 1000 / 60, new Date().getTime());
  };
}();

var makeData = function makeData() {
  return {
    currentPositionY: 0,
    startPositionY: 0,
    targetPositionY: 0,
    progress: 0,
    duration: 0,
    cancel: false,

    target: null,
    containerElement: null,
    to: null,
    start: null,
    deltaTop: null,
    percent: null,
    delayTimeout: null
  };
};

var currentPositionY = function currentPositionY(options) {
  var containerElement = options.data.containerElement;
  if (containerElement && containerElement !== document && containerElement !== document.body) {
    return containerElement.scrollTop;
  } else {
    var supportPageOffset = window.pageXOffset !== undefined;
    var isCSS1Compat = (document.compatMode || "") === "CSS1Compat";
    return supportPageOffset ? window.pageYOffset : isCSS1Compat ? document.documentElement.scrollTop : document.body.scrollTop;
  }
};

var scrollContainerHeight = function scrollContainerHeight(options) {
  var containerElement = options.data.containerElement;
  if (containerElement && containerElement !== document && containerElement !== document.body) {
    return containerElement.scrollHeight - containerElement.offsetHeight;
  } else {
    var body = document.body;
    var html = document.documentElement;

    return Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
  }
};

var animateScroll = function animateScroll(easing, options, timestamp) {
  var data = options.data;

  // Cancel on specific events
  if (!options.ignoreCancelEvents && data.cancel) {
    if (_scrollEvents2.default.registered['end']) {
      _scrollEvents2.default.registered['end'](data.to, data.target, data.currentPositionY);
    }
    return;
  };

  data.deltaTop = Math.round(data.targetPositionY - data.startPositionY);

  if (data.start === null) {
    data.start = timestamp;
  }

  data.progress = timestamp - data.start;

  data.percent = data.progress >= data.duration ? 1 : easing(data.progress / data.duration);

  data.currentPositionY = data.startPositionY + Math.ceil(data.deltaTop * data.percent);

  if (data.containerElement && data.containerElement !== document && data.containerElement !== document.body) {
    data.containerElement.scrollTop = data.currentPositionY;
  } else {
    window.scrollTo(0, data.currentPositionY);
  }

  if (data.percent < 1) {
    var easedAnimate = animateScroll.bind(null, easing, options);
    requestAnimationFrameHelper.call(window, easedAnimate);
    return;
  }

  if (_scrollEvents2.default.registered['end']) {
    _scrollEvents2.default.registered['end'](data.to, data.target, data.currentPositionY);
  }
};

var setContainer = function setContainer(options) {
  options.data.containerElement = !options ? null : options.containerId ? document.getElementById(options.containerId) : options.container && options.container.nodeType ? options.container : document;
};

var animateTopScroll = function animateTopScroll(y, options, to, target) {
  options.data = options.data || makeData();

  window.clearTimeout(options.data.delayTimeout);

  _cancelEvents2.default.subscribe(function () {
    options.data.cancel = true;
  });

  setContainer(options);

  options.data.start = null;
  options.data.cancel = false;
  options.data.startPositionY = currentPositionY(options);
  options.data.targetPositionY = options.absolute ? y : y + options.data.startPositionY;

  if (options.data.startPositionY === options.data.targetPositionY) {
    if (_scrollEvents2.default.registered['end']) {
      _scrollEvents2.default.registered['end'](options.data.to, options.data.target, options.data.currentPositionY);
    }
    return;
  }

  options.data.deltaTop = Math.round(options.data.targetPositionY - options.data.startPositionY);

  options.data.duration = functionWrapper(options.duration)(options.data.deltaTop);
  options.data.duration = isNaN(parseFloat(options.data.duration)) ? 1000 : parseFloat(options.data.duration);
  options.data.to = to;
  options.data.target = target;

  var easing = getAnimationType(options);
  var easedAnimate = animateScroll.bind(null, easing, options);

  if (options && options.delay > 0) {
    options.data.delayTimeout = window.setTimeout(function () {
      if (_scrollEvents2.default.registered['begin']) {
        _scrollEvents2.default.registered['begin'](options.data.to, options.data.target);
      }
      requestAnimationFrameHelper.call(window, easedAnimate);
    }, options.delay);
    return;
  }

  if (_scrollEvents2.default.registered['begin']) {
    _scrollEvents2.default.registered['begin'](options.data.to, options.data.target);
  }
  requestAnimationFrameHelper.call(window, easedAnimate);
};

var proceedOptions = function proceedOptions(options) {
  options = _extends({}, options);
  options.data = options.data || makeData();
  options.absolute = true;
  return options;
};

var scrollToTop = function scrollToTop(options) {
  animateTopScroll(0, proceedOptions(options));
};

var scrollTo = function scrollTo(toY, options) {
  animateTopScroll(toY, proceedOptions(options));
};

var scrollToBottom = function scrollToBottom(options) {
  options = proceedOptions(options);
  setContainer(options);
  animateTopScroll(scrollContainerHeight(options), options);
};

var scrollMore = function scrollMore(toY, options) {
  options = proceedOptions(options);
  setContainer(options);
  animateTopScroll(currentPositionY(options) + toY, options);
};

exports.default = {
  animateTopScroll: animateTopScroll,
  getAnimationType: getAnimationType,
  scrollToTop: scrollToTop,
  scrollToBottom: scrollToBottom,
  scrollTo: scrollTo,
  scrollMore: scrollMore
};

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _passiveEventListeners = __webpack_require__(16);

var _utils = __webpack_require__(11);

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var scrollHash = {
  mountFlag: false,
  initialized: false,
  scroller: null,
  containers: {},

  mount: function mount(scroller) {
    this.scroller = scroller;

    this.handleHashChange = this.handleHashChange.bind(this);
    window.addEventListener('hashchange', this.handleHashChange);

    this.initStateFromHash();
    this.mountFlag = true;
  },
  mapContainer: function mapContainer(to, container) {
    this.containers[to] = container;
  },
  isMounted: function isMounted() {
    return this.mountFlag;
  },
  isInitialized: function isInitialized() {
    return this.initialized;
  },
  initStateFromHash: function initStateFromHash() {
    var _this = this;

    var hash = this.getHash();
    if (hash) {
      window.setTimeout(function () {
        _this.scrollTo(hash, true);
        _this.initialized = true;
      }, 10);
    } else {
      this.initialized = true;
    }
  },
  scrollTo: function scrollTo(to, isInit) {
    var scroller = this.scroller;
    var element = scroller.get(to);
    if (element && (isInit || to !== scroller.getActiveLink())) {
      var container = this.containers[to] || document;
      scroller.scrollTo(to, { container: container });
    }
  },
  getHash: function getHash() {
    return _utils2.default.getHash();
  },
  changeHash: function changeHash(to) {
    if (this.isInitialized() && _utils2.default.getHash() !== to) {
      _utils2.default.pushHash(to);
    }
  },
  handleHashChange: function handleHashChange() {
    this.scrollTo(this.getHash());
  },
  unmount: function unmount() {
    this.scroller = null;
    this.containers = null;
    window.removeEventListener('hashchange', this.handleHashChange);
  }
};

exports.default = scrollHash;

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(8);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _scroller = __webpack_require__(10);

var _scroller2 = _interopRequireDefault(_scroller);

var _propTypes = __webpack_require__(2);

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

exports.default = function (Component) {
  var Element = function (_React$Component) {
    _inherits(Element, _React$Component);

    function Element(props) {
      _classCallCheck(this, Element);

      var _this = _possibleConstructorReturn(this, (Element.__proto__ || Object.getPrototypeOf(Element)).call(this, props));

      _this.childBindings = {
        domNode: null
      };
      return _this;
    }

    _createClass(Element, [{
      key: 'componentDidMount',
      value: function componentDidMount() {
        if (typeof window === 'undefined') {
          return false;
        }
        this.registerElems(this.props.name);
      }
    }, {
      key: 'componentDidUpdate',
      value: function componentDidUpdate(prevProps) {
        if (this.props.name !== prevProps.name) {
          this.registerElems(this.props.name);
        }
      }
    }, {
      key: 'componentWillUnmount',
      value: function componentWillUnmount() {
        if (typeof window === 'undefined') {
          return false;
        }
        _scroller2.default.unregister(this.props.name);
      }
    }, {
      key: 'registerElems',
      value: function registerElems(name) {
        _scroller2.default.register(name, this.childBindings.domNode);
      }
    }, {
      key: 'render',
      value: function render() {
        return _react2.default.createElement(Component, _extends({}, this.props, { parentBindings: this.childBindings }));
      }
    }]);

    return Element;
  }(_react2.default.Component);

  ;

  Element.propTypes = {
    name: _propTypes2.default.string,
    id: _propTypes2.default.string
  };

  return Element;
};

/***/ }),
/* 29 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return symbolObservablePonyfill; });
function symbolObservablePonyfill(root) {
	var result;
	var Symbol = root.Symbol;

	if (typeof Symbol === 'function') {
		if (Symbol.observable) {
			result = Symbol.observable;
		} else {
			result = Symbol('observable');
			Symbol.observable = result;
		}
	} else {
		result = '@@observable';
	}

	return result;
};


/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

(function (factory) {
	 true ? (module['exports'] = factory()) :
		undefined
}(function () {

	'use strict'

	return function (insertRule) {
		var delimiter = '/*|*/'
		var needle = delimiter+'}'

		function toSheet (block) {
			if (block)
				try {
					insertRule(block + '}')
				} catch (e) {}
		}

		return function ruleSheet (context, content, selectors, parents, line, column, length, ns, depth, at) {
			switch (context) {
				// property
				case 1:
					// @import
					if (depth === 0 && content.charCodeAt(0) === 64)
						return insertRule(content+';'), ''
					break
				// selector
				case 2:
					if (ns === 0)
						return content + delimiter
					break
				// at-rule
				case 3:
					switch (ns) {
						// @font-face, @page
						case 102:
						case 112:
							return insertRule(selectors[0]+content), ''
						default:
							return content + (at === 0 ? delimiter : '')
					}
				case -2:
					content.split(needle).forEach(toSheet)
			}
		}
	}
}))


/***/ }),
/* 31 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var unitlessKeys = {
  animationIterationCount: 1,
  borderImageOutset: 1,
  borderImageSlice: 1,
  borderImageWidth: 1,
  boxFlex: 1,
  boxFlexGroup: 1,
  boxOrdinalGroup: 1,
  columnCount: 1,
  columns: 1,
  flex: 1,
  flexGrow: 1,
  flexPositive: 1,
  flexShrink: 1,
  flexNegative: 1,
  flexOrder: 1,
  gridRow: 1,
  gridRowEnd: 1,
  gridRowSpan: 1,
  gridRowStart: 1,
  gridColumn: 1,
  gridColumnEnd: 1,
  gridColumnSpan: 1,
  gridColumnStart: 1,
  msGridRow: 1,
  msGridRowSpan: 1,
  msGridColumn: 1,
  msGridColumnSpan: 1,
  fontWeight: 1,
  lineHeight: 1,
  opacity: 1,
  order: 1,
  orphans: 1,
  tabSize: 1,
  widows: 1,
  zIndex: 1,
  zoom: 1,
  WebkitLineClamp: 1,
  // SVG-related properties
  fillOpacity: 1,
  floodOpacity: 1,
  stopOpacity: 1,
  strokeDasharray: 1,
  strokeDashoffset: 1,
  strokeMiterlimit: 1,
  strokeOpacity: 1,
  strokeWidth: 1
};

/* harmony default export */ __webpack_exports__["a"] = (unitlessKeys);


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {// @flow


var key = '__global_unique_id__';

module.exports = function() {
  return global[key] = (global[key] || 0) + 1;
};

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(13)))

/***/ }),
/* 33 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// CONCATENATED MODULE: ./node_modules/@emotion/memoize/dist/memoize.browser.esm.js
function memoize(fn) {
  var cache = {};
  return function (arg) {
    if (cache[arg] === undefined) cache[arg] = fn(arg);
    return cache[arg];
  };
}

/* harmony default export */ var memoize_browser_esm = (memoize);

// CONCATENATED MODULE: ./node_modules/@emotion/is-prop-valid/dist/is-prop-valid.browser.esm.js


var reactPropsRegex = /^((children|dangerouslySetInnerHTML|key|ref|autoFocus|defaultValue|defaultChecked|innerHTML|suppressContentEditableWarning|suppressHydrationWarning|valueLink|accept|acceptCharset|accessKey|action|allow|allowUserMedia|allowPaymentRequest|allowFullScreen|allowTransparency|alt|async|autoComplete|autoPlay|capture|cellPadding|cellSpacing|challenge|charSet|checked|cite|classID|className|cols|colSpan|content|contentEditable|contextMenu|controls|controlsList|coords|crossOrigin|data|dateTime|decoding|default|defer|dir|disabled|download|draggable|encType|form|formAction|formEncType|formMethod|formNoValidate|formTarget|frameBorder|headers|height|hidden|high|href|hrefLang|htmlFor|httpEquiv|id|inputMode|integrity|is|keyParams|keyType|kind|label|lang|list|loading|loop|low|marginHeight|marginWidth|max|maxLength|media|mediaGroup|method|min|minLength|multiple|muted|name|nonce|noValidate|open|optimum|pattern|placeholder|playsInline|poster|preload|profile|radioGroup|readOnly|referrerPolicy|rel|required|reversed|role|rows|rowSpan|sandbox|scope|scoped|scrolling|seamless|selected|shape|size|sizes|slot|span|spellCheck|src|srcDoc|srcLang|srcSet|start|step|style|summary|tabIndex|target|title|type|useMap|value|width|wmode|wrap|about|datatype|inlist|prefix|property|resource|typeof|vocab|autoCapitalize|autoCorrect|autoSave|color|itemProp|itemScope|itemType|itemID|itemRef|results|security|unselectable|accentHeight|accumulate|additive|alignmentBaseline|allowReorder|alphabetic|amplitude|arabicForm|ascent|attributeName|attributeType|autoReverse|azimuth|baseFrequency|baselineShift|baseProfile|bbox|begin|bias|by|calcMode|capHeight|clip|clipPathUnits|clipPath|clipRule|colorInterpolation|colorInterpolationFilters|colorProfile|colorRendering|contentScriptType|contentStyleType|cursor|cx|cy|d|decelerate|descent|diffuseConstant|direction|display|divisor|dominantBaseline|dur|dx|dy|edgeMode|elevation|enableBackground|end|exponent|externalResourcesRequired|fill|fillOpacity|fillRule|filter|filterRes|filterUnits|floodColor|floodOpacity|focusable|fontFamily|fontSize|fontSizeAdjust|fontStretch|fontStyle|fontVariant|fontWeight|format|from|fr|fx|fy|g1|g2|glyphName|glyphOrientationHorizontal|glyphOrientationVertical|glyphRef|gradientTransform|gradientUnits|hanging|horizAdvX|horizOriginX|ideographic|imageRendering|in|in2|intercept|k|k1|k2|k3|k4|kernelMatrix|kernelUnitLength|kerning|keyPoints|keySplines|keyTimes|lengthAdjust|letterSpacing|lightingColor|limitingConeAngle|local|markerEnd|markerMid|markerStart|markerHeight|markerUnits|markerWidth|mask|maskContentUnits|maskUnits|mathematical|mode|numOctaves|offset|opacity|operator|order|orient|orientation|origin|overflow|overlinePosition|overlineThickness|panose1|paintOrder|pathLength|patternContentUnits|patternTransform|patternUnits|pointerEvents|points|pointsAtX|pointsAtY|pointsAtZ|preserveAlpha|preserveAspectRatio|primitiveUnits|r|radius|refX|refY|renderingIntent|repeatCount|repeatDur|requiredExtensions|requiredFeatures|restart|result|rotate|rx|ry|scale|seed|shapeRendering|slope|spacing|specularConstant|specularExponent|speed|spreadMethod|startOffset|stdDeviation|stemh|stemv|stitchTiles|stopColor|stopOpacity|strikethroughPosition|strikethroughThickness|string|stroke|strokeDasharray|strokeDashoffset|strokeLinecap|strokeLinejoin|strokeMiterlimit|strokeOpacity|strokeWidth|surfaceScale|systemLanguage|tableValues|targetX|targetY|textAnchor|textDecoration|textRendering|textLength|to|transform|u1|u2|underlinePosition|underlineThickness|unicode|unicodeBidi|unicodeRange|unitsPerEm|vAlphabetic|vHanging|vIdeographic|vMathematical|values|vectorEffect|version|vertAdvY|vertOriginX|vertOriginY|viewBox|viewTarget|visibility|widths|wordSpacing|writingMode|x|xHeight|x1|x2|xChannelSelector|xlinkActuate|xlinkArcrole|xlinkHref|xlinkRole|xlinkShow|xlinkTitle|xlinkType|xmlBase|xmlns|xmlnsXlink|xmlLang|xmlSpace|y|y1|y2|yChannelSelector|z|zoomAndPan|for|class|autofocus)|(([Dd][Aa][Tt][Aa]|[Aa][Rr][Ii][Aa]|x)-.*))$/; // https://esbench.com/bench/5bfee68a4cd7e6009ef61d23

var index = memoize_browser_esm(function (prop) {
  return reactPropsRegex.test(prop) || prop.charCodeAt(0) === 111
  /* o */
  && prop.charCodeAt(1) === 110
  /* n */
  && prop.charCodeAt(2) < 91;
}
/* Z+1 */
);

/* harmony default export */ var is_prop_valid_browser_esm = __webpack_exports__["a"] = (index);


/***/ }),
/* 34 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// CONCATENATED MODULE: ./node_modules/is-what/dist/index.esm.js
/**
 * Returns the object type of the given payload
 *
 * @param {*} payload
 * @returns {string}
 */
function getType(payload) {
    return Object.prototype.toString.call(payload).slice(8, -1);
}
/**
 * Returns whether the payload is undefined
 *
 * @param {*} payload
 * @returns {payload is undefined}
 */
function isUndefined(payload) {
    return getType(payload) === 'Undefined';
}
/**
 * Returns whether the payload is null
 *
 * @param {*} payload
 * @returns {payload is null}
 */
function isNull(payload) {
    return getType(payload) === 'Null';
}
/**
 * Returns whether the payload is a plain JavaScript object (excluding special classes or objects with other prototypes)
 *
 * @param {*} payload
 * @returns {payload is {[key: string]: any}}
 */
function isPlainObject(payload) {
    if (getType(payload) !== 'Object')
        return false;
    return (payload.constructor === Object && Object.getPrototypeOf(payload) === Object.prototype);
}
/**
 * Returns whether the payload is a plain JavaScript object (excluding special classes or objects with other prototypes)
 *
 * @param {*} payload
 * @returns {payload is {[key: string]: any}}
 */
function isObject(payload) {
    return isPlainObject(payload);
}
/**
 * Returns whether the payload is an any kind of object (including special classes or objects with different prototypes)
 *
 * @param {*} payload
 * @returns {payload is {[key: string]: any}}
 */
function isAnyObject(payload) {
    return getType(payload) === 'Object';
}
/**
 * Returns whether the payload is an object like a type passed in < >
 *
 * Usage: isObjectLike<{id: any}>(payload) // will make sure it's an object and has an `id` prop.
 *
 * @template T this must be passed in < >
 * @param {*} payload
 * @returns {payload is T}
 */
function isObjectLike(payload) {
    return isAnyObject(payload);
}
/**
 * Returns whether the payload is a function
 *
 * @param {*} payload
 * @returns {payload is Function}
 */
function isFunction(payload) {
    return getType(payload) === 'Function';
}
/**
 * Returns whether the payload is an array
 *
 * @param {*} payload
 * @returns {payload is undefined}
 */
function isArray(payload) {
    return getType(payload) === 'Array';
}
/**
 * Returns whether the payload is a string
 *
 * @param {*} payload
 * @returns {payload is string}
 */
function isString(payload) {
    return getType(payload) === 'String';
}
/**
 * Returns whether the payload is a string, BUT returns false for ''
 *
 * @param {*} payload
 * @returns {payload is string}
 */
function isFullString(payload) {
    return isString(payload) && payload !== '';
}
/**
 * Returns whether the payload is ''
 *
 * @param {*} payload
 * @returns {payload is string}
 */
function isEmptyString(payload) {
    return payload === '';
}
/**
 * Returns whether the payload is a number
 *
 * This will return false for NaN
 *
 * @param {*} payload
 * @returns {payload is number}
 */
function isNumber(payload) {
    return (getType(payload) === 'Number' && !isNaN(payload));
}
/**
 * Returns whether the payload is a boolean
 *
 * @param {*} payload
 * @returns {payload is boolean}
 */
function isBoolean(payload) {
    return getType(payload) === 'Boolean';
}
/**
 * Returns whether the payload is a regular expression
 *
 * @param {*} payload
 * @returns {payload is RegExp}
 */
function isRegExp(payload) {
    return getType(payload) === 'RegExp';
}
/**
 * Returns whether the payload is a date, and that the date is Valid
 *
 * @param {*} payload
 * @returns {payload is Date}
 */
function isDate(payload) {
    return (getType(payload) === 'Date' && !isNaN(payload));
}
/**
 * Returns whether the payload is a Symbol
 *
 * @param {*} payload
 * @returns {payload is symbol}
 */
function isSymbol(payload) {
    return (getType(payload) === 'Symbol');
}
/**
 * Returns whether the payload is a primitive type (eg. Boolean | Null | Undefined | Number | String | Symbol)
 *
 * @param {*} payload
 * @returns {(payload is boolean | null | undefined | number | string | symbol)}
 */
function isPrimitive(payload) {
    return (isBoolean(payload) ||
        isNull(payload) ||
        isUndefined(payload) ||
        isNumber(payload) ||
        isString(payload) ||
        isSymbol(payload));
}
/**
 * Does a generic check to check that the given payload is of a given type.
 * In cases like Number, it will return true for NaN as NaN is a Number (thanks javascript!);
 * It will, however, differentiate between object and null
 *
 * @template T
 * @param {*} payload
 * @param {T} type
 * @throws {TypeError} Will throw type error if type is an invalid type
 * @returns {payload is T}
 */
function isType(payload, type) {
    if (!(type instanceof Function)) {
        throw new TypeError('Type must be a function');
    }
    if (!type.hasOwnProperty('prototype')) {
        throw new TypeError('Type is not a class');
    }
    // Classes usually have names (as functions usually have names)
    var name = type.name;
    return (getType(payload) === name) || Boolean(payload && (payload.constructor === type));
}



// CONCATENATED MODULE: ./node_modules/merge-anything/dist/index.esm.js
/* unused harmony export merge */
/* unused harmony export concatArrays */


function assignProp(carry, key, newVal, originalObject) {
    var propType = originalObject.propertyIsEnumerable(key)
        ? 'enumerable'
        : 'nonenumerable';
    if (propType === 'enumerable')
        carry[key] = newVal;
    if (propType === 'nonenumerable') {
        Object.defineProperty(carry, key, {
            value: newVal,
            enumerable: false,
            writable: true,
            configurable: true
        });
    }
}
function mergeRecursively(origin, newComer, extensions) {
    // work directly on newComer if its not an object
    if (!isPlainObject(newComer)) {
        // extend merge rules
        if (extensions && isArray(extensions)) {
            extensions.forEach(function (extend) {
                newComer = extend(origin, newComer);
            });
        }
        return newComer;
    }
    // define newObject to merge all values upon
    var newObject = {};
    if (isPlainObject(origin)) {
        var props_1 = Object.getOwnPropertyNames(origin);
        var symbols_1 = Object.getOwnPropertySymbols(origin);
        newObject = props_1.concat(symbols_1).reduce(function (carry, key) {
            // @ts-ignore
            var targetVal = origin[key];
            if ((!isSymbol(key) && !Object.getOwnPropertyNames(newComer).includes(key)) ||
                (isSymbol(key) && !Object.getOwnPropertySymbols(newComer).includes(key))) {
                assignProp(carry, key, targetVal, origin);
            }
            return carry;
        }, {});
    }
    var props = Object.getOwnPropertyNames(newComer);
    var symbols = Object.getOwnPropertySymbols(newComer);
    var result = props.concat(symbols).reduce(function (carry, key) {
        // re-define the origin and newComer as targetVal and newVal
        var newVal = newComer[key];
        var targetVal = (isPlainObject(origin))
            // @ts-ignore
            ? origin[key]
            : undefined;
        // extend merge rules
        if (extensions && isArray(extensions)) {
            extensions.forEach(function (extend) {
                newVal = extend(targetVal, newVal);
            });
        }
        // When newVal is an object do the merge recursively
        if (targetVal !== undefined && isPlainObject(newVal)) {
            newVal = mergeRecursively(targetVal, newVal, extensions);
        }
        assignProp(carry, key, newVal, newComer);
        return carry;
    }, newObject);
    return result;
}
/**
 * Merge anything recursively.
 * Objects get merged, special objects (classes etc.) are re-assigned "as is".
 * Basic types overwrite objects or other basic types.
 *
 * @param {(IConfig | any)} origin
 * @param {...any[]} newComers
 * @returns the result
 */
function merge(origin) {
    var newComers = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        newComers[_i - 1] = arguments[_i];
    }
    var extensions = null;
    var base = origin;
    if (isPlainObject(origin) && origin.extensions && Object.keys(origin).length === 1) {
        base = {};
        extensions = origin.extensions;
    }
    return newComers.reduce(function (result, newComer) {
        return mergeRecursively(result, newComer, extensions);
    }, base);
}

function concatArrays(originVal, newVal) {
    if (isArray(originVal) && isArray(newVal)) {
        // concat logic
        return originVal.concat(newVal);
    }
    return newVal; // always return newVal as fallback!!
}

/* harmony default export */ var index_esm = __webpack_exports__["a"] = (merge);



/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/** @license React v16.11.0
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var h=__webpack_require__(25),n="function"===typeof Symbol&&Symbol.for,p=n?Symbol.for("react.element"):60103,q=n?Symbol.for("react.portal"):60106,r=n?Symbol.for("react.fragment"):60107,t=n?Symbol.for("react.strict_mode"):60108,u=n?Symbol.for("react.profiler"):60114,v=n?Symbol.for("react.provider"):60109,w=n?Symbol.for("react.context"):60110,x=n?Symbol.for("react.forward_ref"):60112,y=n?Symbol.for("react.suspense"):60113;n&&Symbol.for("react.suspense_list");
var z=n?Symbol.for("react.memo"):60115,aa=n?Symbol.for("react.lazy"):60116;n&&Symbol.for("react.fundamental");n&&Symbol.for("react.responder");n&&Symbol.for("react.scope");var A="function"===typeof Symbol&&Symbol.iterator;
function B(a){for(var b="https://reactjs.org/docs/error-decoder.html?invariant="+a,c=1;c<arguments.length;c++)b+="&args[]="+encodeURIComponent(arguments[c]);return"Minified React error #"+a+"; visit "+b+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var C={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},D={};
function E(a,b,c){this.props=a;this.context=b;this.refs=D;this.updater=c||C}E.prototype.isReactComponent={};E.prototype.setState=function(a,b){if("object"!==typeof a&&"function"!==typeof a&&null!=a)throw Error(B(85));this.updater.enqueueSetState(this,a,b,"setState")};E.prototype.forceUpdate=function(a){this.updater.enqueueForceUpdate(this,a,"forceUpdate")};function F(){}F.prototype=E.prototype;function G(a,b,c){this.props=a;this.context=b;this.refs=D;this.updater=c||C}var H=G.prototype=new F;
H.constructor=G;h(H,E.prototype);H.isPureReactComponent=!0;var I={current:null},J={current:null},K=Object.prototype.hasOwnProperty,L={key:!0,ref:!0,__self:!0,__source:!0};
function M(a,b,c){var e,d={},g=null,l=null;if(null!=b)for(e in void 0!==b.ref&&(l=b.ref),void 0!==b.key&&(g=""+b.key),b)K.call(b,e)&&!L.hasOwnProperty(e)&&(d[e]=b[e]);var f=arguments.length-2;if(1===f)d.children=c;else if(1<f){for(var k=Array(f),m=0;m<f;m++)k[m]=arguments[m+2];d.children=k}if(a&&a.defaultProps)for(e in f=a.defaultProps,f)void 0===d[e]&&(d[e]=f[e]);return{$$typeof:p,type:a,key:g,ref:l,props:d,_owner:J.current}}
function ba(a,b){return{$$typeof:p,type:a.type,key:b,ref:a.ref,props:a.props,_owner:a._owner}}function N(a){return"object"===typeof a&&null!==a&&a.$$typeof===p}function escape(a){var b={"=":"=0",":":"=2"};return"$"+(""+a).replace(/[=:]/g,function(a){return b[a]})}var O=/\/+/g,P=[];function Q(a,b,c,e){if(P.length){var d=P.pop();d.result=a;d.keyPrefix=b;d.func=c;d.context=e;d.count=0;return d}return{result:a,keyPrefix:b,func:c,context:e,count:0}}
function R(a){a.result=null;a.keyPrefix=null;a.func=null;a.context=null;a.count=0;10>P.length&&P.push(a)}
function S(a,b,c,e){var d=typeof a;if("undefined"===d||"boolean"===d)a=null;var g=!1;if(null===a)g=!0;else switch(d){case "string":case "number":g=!0;break;case "object":switch(a.$$typeof){case p:case q:g=!0}}if(g)return c(e,a,""===b?"."+T(a,0):b),1;g=0;b=""===b?".":b+":";if(Array.isArray(a))for(var l=0;l<a.length;l++){d=a[l];var f=b+T(d,l);g+=S(d,f,c,e)}else if(null===a||"object"!==typeof a?f=null:(f=A&&a[A]||a["@@iterator"],f="function"===typeof f?f:null),"function"===typeof f)for(a=f.call(a),l=
0;!(d=a.next()).done;)d=d.value,f=b+T(d,l++),g+=S(d,f,c,e);else if("object"===d)throw c=""+a,Error(B(31,"[object Object]"===c?"object with keys {"+Object.keys(a).join(", ")+"}":c,""));return g}function U(a,b,c){return null==a?0:S(a,"",b,c)}function T(a,b){return"object"===typeof a&&null!==a&&null!=a.key?escape(a.key):b.toString(36)}function ca(a,b){a.func.call(a.context,b,a.count++)}
function da(a,b,c){var e=a.result,d=a.keyPrefix;a=a.func.call(a.context,b,a.count++);Array.isArray(a)?V(a,e,c,function(a){return a}):null!=a&&(N(a)&&(a=ba(a,d+(!a.key||b&&b.key===a.key?"":(""+a.key).replace(O,"$&/")+"/")+c)),e.push(a))}function V(a,b,c,e,d){var g="";null!=c&&(g=(""+c).replace(O,"$&/")+"/");b=Q(b,g,e,d);U(a,da,b);R(b)}function W(){var a=I.current;if(null===a)throw Error(B(321));return a}
var X={Children:{map:function(a,b,c){if(null==a)return a;var e=[];V(a,e,null,b,c);return e},forEach:function(a,b,c){if(null==a)return a;b=Q(null,null,b,c);U(a,ca,b);R(b)},count:function(a){return U(a,function(){return null},null)},toArray:function(a){var b=[];V(a,b,null,function(a){return a});return b},only:function(a){if(!N(a))throw Error(B(143));return a}},createRef:function(){return{current:null}},Component:E,PureComponent:G,createContext:function(a,b){void 0===b&&(b=null);a={$$typeof:w,_calculateChangedBits:b,
_currentValue:a,_currentValue2:a,_threadCount:0,Provider:null,Consumer:null};a.Provider={$$typeof:v,_context:a};return a.Consumer=a},forwardRef:function(a){return{$$typeof:x,render:a}},lazy:function(a){return{$$typeof:aa,_ctor:a,_status:-1,_result:null}},memo:function(a,b){return{$$typeof:z,type:a,compare:void 0===b?null:b}},useCallback:function(a,b){return W().useCallback(a,b)},useContext:function(a,b){return W().useContext(a,b)},useEffect:function(a,b){return W().useEffect(a,b)},useImperativeHandle:function(a,
b,c){return W().useImperativeHandle(a,b,c)},useDebugValue:function(){},useLayoutEffect:function(a,b){return W().useLayoutEffect(a,b)},useMemo:function(a,b){return W().useMemo(a,b)},useReducer:function(a,b,c){return W().useReducer(a,b,c)},useRef:function(a){return W().useRef(a)},useState:function(a){return W().useState(a)},Fragment:r,Profiler:u,StrictMode:t,Suspense:y,createElement:M,cloneElement:function(a,b,c){if(null===a||void 0===a)throw Error(B(267,a));var e=h({},a.props),d=a.key,g=a.ref,l=a._owner;
if(null!=b){void 0!==b.ref&&(g=b.ref,l=J.current);void 0!==b.key&&(d=""+b.key);if(a.type&&a.type.defaultProps)var f=a.type.defaultProps;for(k in b)K.call(b,k)&&!L.hasOwnProperty(k)&&(e[k]=void 0===b[k]&&void 0!==f?f[k]:b[k])}var k=arguments.length-2;if(1===k)e.children=c;else if(1<k){f=Array(k);for(var m=0;m<k;m++)f[m]=arguments[m+2];e.children=f}return{$$typeof:p,type:a.type,key:d,ref:g,props:e,_owner:l}},createFactory:function(a){var b=M.bind(null,a);b.type=a;return b},isValidElement:N,version:"16.11.0",
__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED:{ReactCurrentDispatcher:I,ReactCurrentBatchConfig:{suspense:null},ReactCurrentOwner:J,IsSomeRendererActing:{current:!1},assign:h}},Y={default:X},Z=Y&&X||Y;module.exports=Z.default||Z;


/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/** @license React v16.11.0
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/*
 Modernizr 3.0.0pre (Custom Build) | MIT
*/
var aa=__webpack_require__(0),n=__webpack_require__(25),q=__webpack_require__(37);function u(a){for(var b="https://reactjs.org/docs/error-decoder.html?invariant="+a,c=1;c<arguments.length;c++)b+="&args[]="+encodeURIComponent(arguments[c]);return"Minified React error #"+a+"; visit "+b+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}if(!aa)throw Error(u(227));var ba=null,ca={};
function da(){if(ba)for(var a in ca){var b=ca[a],c=ba.indexOf(a);if(!(-1<c))throw Error(u(96,a));if(!ea[c]){if(!b.extractEvents)throw Error(u(97,a));ea[c]=b;c=b.eventTypes;for(var d in c){var e=void 0;var f=c[d],g=b,h=d;if(fa.hasOwnProperty(h))throw Error(u(99,h));fa[h]=f;var k=f.phasedRegistrationNames;if(k){for(e in k)k.hasOwnProperty(e)&&ha(k[e],g,h);e=!0}else f.registrationName?(ha(f.registrationName,g,h),e=!0):e=!1;if(!e)throw Error(u(98,d,a));}}}}
function ha(a,b,c){if(ia[a])throw Error(u(100,a));ia[a]=b;ja[a]=b.eventTypes[c].dependencies}var ea=[],fa={},ia={},ja={};function ka(a,b,c,d,e,f,g,h,k){var l=Array.prototype.slice.call(arguments,3);try{b.apply(c,l)}catch(m){this.onError(m)}}var la=!1,ma=null,na=!1,oa=null,pa={onError:function(a){la=!0;ma=a}};function qa(a,b,c,d,e,f,g,h,k){la=!1;ma=null;ka.apply(pa,arguments)}
function ra(a,b,c,d,e,f,g,h,k){qa.apply(this,arguments);if(la){if(la){var l=ma;la=!1;ma=null}else throw Error(u(198));na||(na=!0,oa=l)}}var sa=null,ua=null,va=null;function wa(a,b,c){var d=a.type||"unknown-event";a.currentTarget=va(c);ra(d,b,void 0,a);a.currentTarget=null}function xa(a,b){if(null==b)throw Error(u(30));if(null==a)return b;if(Array.isArray(a)){if(Array.isArray(b))return a.push.apply(a,b),a;a.push(b);return a}return Array.isArray(b)?[a].concat(b):[a,b]}
function ya(a,b,c){Array.isArray(a)?a.forEach(b,c):a&&b.call(c,a)}var za=null;function Aa(a){if(a){var b=a._dispatchListeners,c=a._dispatchInstances;if(Array.isArray(b))for(var d=0;d<b.length&&!a.isPropagationStopped();d++)wa(a,b[d],c[d]);else b&&wa(a,b,c);a._dispatchListeners=null;a._dispatchInstances=null;a.isPersistent()||a.constructor.release(a)}}function Ba(a){null!==a&&(za=xa(za,a));a=za;za=null;if(a){ya(a,Aa);if(za)throw Error(u(95));if(na)throw a=oa,na=!1,oa=null,a;}}
var Ca={injectEventPluginOrder:function(a){if(ba)throw Error(u(101));ba=Array.prototype.slice.call(a);da()},injectEventPluginsByName:function(a){var b=!1,c;for(c in a)if(a.hasOwnProperty(c)){var d=a[c];if(!ca.hasOwnProperty(c)||ca[c]!==d){if(ca[c])throw Error(u(102,c));ca[c]=d;b=!0}}b&&da()}};
function Da(a,b){var c=a.stateNode;if(!c)return null;var d=sa(c);if(!d)return null;c=d[b];a:switch(b){case "onClick":case "onClickCapture":case "onDoubleClick":case "onDoubleClickCapture":case "onMouseDown":case "onMouseDownCapture":case "onMouseMove":case "onMouseMoveCapture":case "onMouseUp":case "onMouseUpCapture":(d=!d.disabled)||(a=a.type,d=!("button"===a||"input"===a||"select"===a||"textarea"===a));a=!d;break a;default:a=!1}if(a)return null;if(c&&"function"!==typeof c)throw Error(u(231,b,typeof c));
return c}var Ea=aa.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;Ea.hasOwnProperty("ReactCurrentDispatcher")||(Ea.ReactCurrentDispatcher={current:null});Ea.hasOwnProperty("ReactCurrentBatchConfig")||(Ea.ReactCurrentBatchConfig={suspense:null});
var Fa=/^(.*)[\\\/]/,w="function"===typeof Symbol&&Symbol.for,Ga=w?Symbol.for("react.element"):60103,Ha=w?Symbol.for("react.portal"):60106,Ia=w?Symbol.for("react.fragment"):60107,Ja=w?Symbol.for("react.strict_mode"):60108,Ka=w?Symbol.for("react.profiler"):60114,La=w?Symbol.for("react.provider"):60109,Ma=w?Symbol.for("react.context"):60110,Na=w?Symbol.for("react.concurrent_mode"):60111,Oa=w?Symbol.for("react.forward_ref"):60112,Pa=w?Symbol.for("react.suspense"):60113,Qa=w?Symbol.for("react.suspense_list"):
60120,Ra=w?Symbol.for("react.memo"):60115,Sa=w?Symbol.for("react.lazy"):60116;w&&Symbol.for("react.fundamental");w&&Symbol.for("react.responder");w&&Symbol.for("react.scope");var Ta="function"===typeof Symbol&&Symbol.iterator;function Ua(a){if(null===a||"object"!==typeof a)return null;a=Ta&&a[Ta]||a["@@iterator"];return"function"===typeof a?a:null}
function Va(a){if(-1===a._status){a._status=0;var b=a._ctor;b=b();a._result=b;b.then(function(b){0===a._status&&(b=b.default,a._status=1,a._result=b)},function(b){0===a._status&&(a._status=2,a._result=b)})}}
function Wa(a){if(null==a)return null;if("function"===typeof a)return a.displayName||a.name||null;if("string"===typeof a)return a;switch(a){case Ia:return"Fragment";case Ha:return"Portal";case Ka:return"Profiler";case Ja:return"StrictMode";case Pa:return"Suspense";case Qa:return"SuspenseList"}if("object"===typeof a)switch(a.$$typeof){case Ma:return"Context.Consumer";case La:return"Context.Provider";case Oa:var b=a.render;b=b.displayName||b.name||"";return a.displayName||(""!==b?"ForwardRef("+b+")":
"ForwardRef");case Ra:return Wa(a.type);case Sa:if(a=1===a._status?a._result:null)return Wa(a)}return null}function Xa(a){var b="";do{a:switch(a.tag){case 3:case 4:case 6:case 7:case 10:case 9:var c="";break a;default:var d=a._debugOwner,e=a._debugSource,f=Wa(a.type);c=null;d&&(c=Wa(d.type));d=f;f="";e?f=" (at "+e.fileName.replace(Fa,"")+":"+e.lineNumber+")":c&&(f=" (created by "+c+")");c="\n    in "+(d||"Unknown")+f}b+=c;a=a.return}while(a);return b}
var Ya=!("undefined"===typeof window||"undefined"===typeof window.document||"undefined"===typeof window.document.createElement),Za=null,$a=null,ab=null;function bb(a){if(a=ua(a)){if("function"!==typeof Za)throw Error(u(280));var b=sa(a.stateNode);Za(a.stateNode,a.type,b)}}function cb(a){$a?ab?ab.push(a):ab=[a]:$a=a}function db(){if($a){var a=$a,b=ab;ab=$a=null;bb(a);if(b)for(a=0;a<b.length;a++)bb(b[a])}}function eb(a,b){return a(b)}function fb(a,b,c,d){return a(b,c,d)}function gb(){}
var hb=eb,ib=!1,jb=!1;function kb(){if(null!==$a||null!==ab)gb(),db()}new Map;var lb=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,mb=Object.prototype.hasOwnProperty,nb={},ob={};
function pb(a){if(mb.call(ob,a))return!0;if(mb.call(nb,a))return!1;if(lb.test(a))return ob[a]=!0;nb[a]=!0;return!1}function qb(a,b,c,d){if(null!==c&&0===c.type)return!1;switch(typeof b){case "function":case "symbol":return!0;case "boolean":if(d)return!1;if(null!==c)return!c.acceptsBooleans;a=a.toLowerCase().slice(0,5);return"data-"!==a&&"aria-"!==a;default:return!1}}
function rb(a,b,c,d){if(null===b||"undefined"===typeof b||qb(a,b,c,d))return!0;if(d)return!1;if(null!==c)switch(c.type){case 3:return!b;case 4:return!1===b;case 5:return isNaN(b);case 6:return isNaN(b)||1>b}return!1}function B(a,b,c,d,e,f){this.acceptsBooleans=2===b||3===b||4===b;this.attributeName=d;this.attributeNamespace=e;this.mustUseProperty=c;this.propertyName=a;this.type=b;this.sanitizeURL=f}var D={};
"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(a){D[a]=new B(a,0,!1,a,null,!1)});[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(a){var b=a[0];D[b]=new B(b,1,!1,a[1],null,!1)});["contentEditable","draggable","spellCheck","value"].forEach(function(a){D[a]=new B(a,2,!1,a.toLowerCase(),null,!1)});
["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(a){D[a]=new B(a,2,!1,a,null,!1)});"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(a){D[a]=new B(a,3,!1,a.toLowerCase(),null,!1)});
["checked","multiple","muted","selected"].forEach(function(a){D[a]=new B(a,3,!0,a,null,!1)});["capture","download"].forEach(function(a){D[a]=new B(a,4,!1,a,null,!1)});["cols","rows","size","span"].forEach(function(a){D[a]=new B(a,6,!1,a,null,!1)});["rowSpan","start"].forEach(function(a){D[a]=new B(a,5,!1,a.toLowerCase(),null,!1)});var sb=/[\-:]([a-z])/g;function tb(a){return a[1].toUpperCase()}
"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(a){var b=a.replace(sb,
tb);D[b]=new B(b,1,!1,a,null,!1)});"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(a){var b=a.replace(sb,tb);D[b]=new B(b,1,!1,a,"http://www.w3.org/1999/xlink",!1)});["xml:base","xml:lang","xml:space"].forEach(function(a){var b=a.replace(sb,tb);D[b]=new B(b,1,!1,a,"http://www.w3.org/XML/1998/namespace",!1)});["tabIndex","crossOrigin"].forEach(function(a){D[a]=new B(a,1,!1,a.toLowerCase(),null,!1)});
D.xlinkHref=new B("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0);["src","href","action","formAction"].forEach(function(a){D[a]=new B(a,1,!1,a.toLowerCase(),null,!0)});function ub(a){switch(typeof a){case "boolean":case "number":case "object":case "string":case "undefined":return a;default:return""}}
function vb(a,b,c,d){var e=D.hasOwnProperty(b)?D[b]:null;var f=null!==e?0===e.type:d?!1:!(2<b.length)||"o"!==b[0]&&"O"!==b[0]||"n"!==b[1]&&"N"!==b[1]?!1:!0;f||(rb(b,c,e,d)&&(c=null),d||null===e?pb(b)&&(null===c?a.removeAttribute(b):a.setAttribute(b,""+c)):e.mustUseProperty?a[e.propertyName]=null===c?3===e.type?!1:"":c:(b=e.attributeName,d=e.attributeNamespace,null===c?a.removeAttribute(b):(e=e.type,c=3===e||4===e&&!0===c?"":""+c,d?a.setAttributeNS(d,b,c):a.setAttribute(b,c))))}
function wb(a){var b=a.type;return(a=a.nodeName)&&"input"===a.toLowerCase()&&("checkbox"===b||"radio"===b)}
function xb(a){var b=wb(a)?"checked":"value",c=Object.getOwnPropertyDescriptor(a.constructor.prototype,b),d=""+a[b];if(!a.hasOwnProperty(b)&&"undefined"!==typeof c&&"function"===typeof c.get&&"function"===typeof c.set){var e=c.get,f=c.set;Object.defineProperty(a,b,{configurable:!0,get:function(){return e.call(this)},set:function(a){d=""+a;f.call(this,a)}});Object.defineProperty(a,b,{enumerable:c.enumerable});return{getValue:function(){return d},setValue:function(a){d=""+a},stopTracking:function(){a._valueTracker=
null;delete a[b]}}}}function yb(a){a._valueTracker||(a._valueTracker=xb(a))}function zb(a){if(!a)return!1;var b=a._valueTracker;if(!b)return!0;var c=b.getValue();var d="";a&&(d=wb(a)?a.checked?"true":"false":a.value);a=d;return a!==c?(b.setValue(a),!0):!1}function Ab(a,b){var c=b.checked;return n({},b,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:null!=c?c:a._wrapperState.initialChecked})}
function Bb(a,b){var c=null==b.defaultValue?"":b.defaultValue,d=null!=b.checked?b.checked:b.defaultChecked;c=ub(null!=b.value?b.value:c);a._wrapperState={initialChecked:d,initialValue:c,controlled:"checkbox"===b.type||"radio"===b.type?null!=b.checked:null!=b.value}}function Cb(a,b){b=b.checked;null!=b&&vb(a,"checked",b,!1)}
function Eb(a,b){Cb(a,b);var c=ub(b.value),d=b.type;if(null!=c)if("number"===d){if(0===c&&""===a.value||a.value!=c)a.value=""+c}else a.value!==""+c&&(a.value=""+c);else if("submit"===d||"reset"===d){a.removeAttribute("value");return}b.hasOwnProperty("value")?Fb(a,b.type,c):b.hasOwnProperty("defaultValue")&&Fb(a,b.type,ub(b.defaultValue));null==b.checked&&null!=b.defaultChecked&&(a.defaultChecked=!!b.defaultChecked)}
function Gb(a,b,c){if(b.hasOwnProperty("value")||b.hasOwnProperty("defaultValue")){var d=b.type;if(!("submit"!==d&&"reset"!==d||void 0!==b.value&&null!==b.value))return;b=""+a._wrapperState.initialValue;c||b===a.value||(a.value=b);a.defaultValue=b}c=a.name;""!==c&&(a.name="");a.defaultChecked=!a.defaultChecked;a.defaultChecked=!!a._wrapperState.initialChecked;""!==c&&(a.name=c)}
function Fb(a,b,c){if("number"!==b||a.ownerDocument.activeElement!==a)null==c?a.defaultValue=""+a._wrapperState.initialValue:a.defaultValue!==""+c&&(a.defaultValue=""+c)}function Hb(a){var b="";aa.Children.forEach(a,function(a){null!=a&&(b+=a)});return b}function Ib(a,b){a=n({children:void 0},b);if(b=Hb(b.children))a.children=b;return a}
function Jb(a,b,c,d){a=a.options;if(b){b={};for(var e=0;e<c.length;e++)b["$"+c[e]]=!0;for(c=0;c<a.length;c++)e=b.hasOwnProperty("$"+a[c].value),a[c].selected!==e&&(a[c].selected=e),e&&d&&(a[c].defaultSelected=!0)}else{c=""+ub(c);b=null;for(e=0;e<a.length;e++){if(a[e].value===c){a[e].selected=!0;d&&(a[e].defaultSelected=!0);return}null!==b||a[e].disabled||(b=a[e])}null!==b&&(b.selected=!0)}}
function Kb(a,b){if(null!=b.dangerouslySetInnerHTML)throw Error(u(91));return n({},b,{value:void 0,defaultValue:void 0,children:""+a._wrapperState.initialValue})}function Lb(a,b){var c=b.value;if(null==c){c=b.defaultValue;b=b.children;if(null!=b){if(null!=c)throw Error(u(92));if(Array.isArray(b)){if(!(1>=b.length))throw Error(u(93));b=b[0]}c=b}null==c&&(c="")}a._wrapperState={initialValue:ub(c)}}
function Mb(a,b){var c=ub(b.value),d=ub(b.defaultValue);null!=c&&(c=""+c,c!==a.value&&(a.value=c),null==b.defaultValue&&a.defaultValue!==c&&(a.defaultValue=c));null!=d&&(a.defaultValue=""+d)}function Nb(a){var b=a.textContent;b===a._wrapperState.initialValue&&""!==b&&null!==b&&(a.value=b)}var Ob={html:"http://www.w3.org/1999/xhtml",mathml:"http://www.w3.org/1998/Math/MathML",svg:"http://www.w3.org/2000/svg"};
function Pb(a){switch(a){case "svg":return"http://www.w3.org/2000/svg";case "math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function Qb(a,b){return null==a||"http://www.w3.org/1999/xhtml"===a?Pb(b):"http://www.w3.org/2000/svg"===a&&"foreignObject"===b?"http://www.w3.org/1999/xhtml":a}
var Rb,Sb=function(a){return"undefined"!==typeof MSApp&&MSApp.execUnsafeLocalFunction?function(b,c,d,e){MSApp.execUnsafeLocalFunction(function(){return a(b,c,d,e)})}:a}(function(a,b){if(a.namespaceURI!==Ob.svg||"innerHTML"in a)a.innerHTML=b;else{Rb=Rb||document.createElement("div");Rb.innerHTML="<svg>"+b.valueOf().toString()+"</svg>";for(b=Rb.firstChild;a.firstChild;)a.removeChild(a.firstChild);for(;b.firstChild;)a.appendChild(b.firstChild)}});
function Tb(a,b){if(b){var c=a.firstChild;if(c&&c===a.lastChild&&3===c.nodeType){c.nodeValue=b;return}}a.textContent=b}function Ub(a,b){var c={};c[a.toLowerCase()]=b.toLowerCase();c["Webkit"+a]="webkit"+b;c["Moz"+a]="moz"+b;return c}var Vb={animationend:Ub("Animation","AnimationEnd"),animationiteration:Ub("Animation","AnimationIteration"),animationstart:Ub("Animation","AnimationStart"),transitionend:Ub("Transition","TransitionEnd")},Wb={},Xb={};
Ya&&(Xb=document.createElement("div").style,"AnimationEvent"in window||(delete Vb.animationend.animation,delete Vb.animationiteration.animation,delete Vb.animationstart.animation),"TransitionEvent"in window||delete Vb.transitionend.transition);function Yb(a){if(Wb[a])return Wb[a];if(!Vb[a])return a;var b=Vb[a],c;for(c in b)if(b.hasOwnProperty(c)&&c in Xb)return Wb[a]=b[c];return a}var Zb=Yb("animationend"),$b=Yb("animationiteration"),ac=Yb("animationstart"),bc=Yb("transitionend"),dc="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange seeked seeking stalled suspend timeupdate volumechange waiting".split(" ");
function ec(a){var b=a,c=a;if(a.alternate)for(;b.return;)b=b.return;else{a=b;do b=a,0!==(b.effectTag&1026)&&(c=b.return),a=b.return;while(a)}return 3===b.tag?c:null}function fc(a){if(13===a.tag){var b=a.memoizedState;null===b&&(a=a.alternate,null!==a&&(b=a.memoizedState));if(null!==b)return b.dehydrated}return null}function gc(a){if(ec(a)!==a)throw Error(u(188));}
function hc(a){var b=a.alternate;if(!b){b=ec(a);if(null===b)throw Error(u(188));return b!==a?null:a}for(var c=a,d=b;;){var e=c.return;if(null===e)break;var f=e.alternate;if(null===f){d=e.return;if(null!==d){c=d;continue}break}if(e.child===f.child){for(f=e.child;f;){if(f===c)return gc(e),a;if(f===d)return gc(e),b;f=f.sibling}throw Error(u(188));}if(c.return!==d.return)c=e,d=f;else{for(var g=!1,h=e.child;h;){if(h===c){g=!0;c=e;d=f;break}if(h===d){g=!0;d=e;c=f;break}h=h.sibling}if(!g){for(h=f.child;h;){if(h===
c){g=!0;c=f;d=e;break}if(h===d){g=!0;d=f;c=e;break}h=h.sibling}if(!g)throw Error(u(189));}}if(c.alternate!==d)throw Error(u(190));}if(3!==c.tag)throw Error(u(188));return c.stateNode.current===c?a:b}function ic(a){a=hc(a);if(!a)return null;for(var b=a;;){if(5===b.tag||6===b.tag)return b;if(b.child)b.child.return=b,b=b.child;else{if(b===a)break;for(;!b.sibling;){if(!b.return||b.return===a)return null;b=b.return}b.sibling.return=b.return;b=b.sibling}}return null}
var jc,kc,lc,mc=!1,nc=[],oc=null,pc=null,qc=null,rc=new Map,sc=new Map,tc=[],uc="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput close cancel copy cut paste click change contextmenu reset submit".split(" "),vc="focus blur dragenter dragleave mouseover mouseout pointerover pointerout gotpointercapture lostpointercapture".split(" ");
function wc(a){var b=xc(a);uc.forEach(function(c){yc(c,a,b)});vc.forEach(function(c){yc(c,a,b)})}function zc(a,b,c,d){return{blockedOn:a,topLevelType:b,eventSystemFlags:c|32,nativeEvent:d}}function Ac(a,b){switch(a){case "focus":case "blur":oc=null;break;case "dragenter":case "dragleave":pc=null;break;case "mouseover":case "mouseout":qc=null;break;case "pointerover":case "pointerout":rc.delete(b.pointerId);break;case "gotpointercapture":case "lostpointercapture":sc.delete(b.pointerId)}}
function Bc(a,b,c,d,e){if(null===a||a.nativeEvent!==e)return a=zc(b,c,d,e),null!==b&&(b=Cc(b),null!==b&&kc(b)),a;a.eventSystemFlags|=d;return a}function Dc(a,b,c,d){switch(b){case "focus":return oc=Bc(oc,a,b,c,d),!0;case "dragenter":return pc=Bc(pc,a,b,c,d),!0;case "mouseover":return qc=Bc(qc,a,b,c,d),!0;case "pointerover":var e=d.pointerId;rc.set(e,Bc(rc.get(e)||null,a,b,c,d));return!0;case "gotpointercapture":return e=d.pointerId,sc.set(e,Bc(sc.get(e)||null,a,b,c,d)),!0}return!1}
function Ec(a){var b=Fc(a.target);if(null!==b){var c=ec(b);if(null!==c)if(b=c.tag,13===b){if(b=fc(c),null!==b){a.blockedOn=b;q.unstable_runWithPriority(a.priority,function(){lc(c)});return}}else if(3===b&&c.stateNode.hydrate){a.blockedOn=3===c.tag?c.stateNode.containerInfo:null;return}}a.blockedOn=null}function Gc(a){if(null!==a.blockedOn)return!1;var b=Hc(a.topLevelType,a.eventSystemFlags,a.nativeEvent);if(null!==b){var c=Cc(b);null!==c&&kc(c);a.blockedOn=b;return!1}return!0}
function Ic(a,b,c){Gc(a)&&c.delete(b)}function Jc(){for(mc=!1;0<nc.length;){var a=nc[0];if(null!==a.blockedOn){a=Cc(a.blockedOn);null!==a&&jc(a);break}var b=Hc(a.topLevelType,a.eventSystemFlags,a.nativeEvent);null!==b?a.blockedOn=b:nc.shift()}null!==oc&&Gc(oc)&&(oc=null);null!==pc&&Gc(pc)&&(pc=null);null!==qc&&Gc(qc)&&(qc=null);rc.forEach(Ic);sc.forEach(Ic)}function Kc(a,b){a.blockedOn===b&&(a.blockedOn=null,mc||(mc=!0,q.unstable_scheduleCallback(q.unstable_NormalPriority,Jc)))}
function Lc(a){function b(b){return Kc(b,a)}if(0<nc.length){Kc(nc[0],a);for(var c=1;c<nc.length;c++){var d=nc[c];d.blockedOn===a&&(d.blockedOn=null)}}null!==oc&&Kc(oc,a);null!==pc&&Kc(pc,a);null!==qc&&Kc(qc,a);rc.forEach(b);sc.forEach(b);for(c=0;c<tc.length;c++)d=tc[c],d.blockedOn===a&&(d.blockedOn=null);for(;0<tc.length&&(c=tc[0],null===c.blockedOn);)Ec(c),null===c.blockedOn&&tc.shift()}
function Mc(a){a=a.target||a.srcElement||window;a.correspondingUseElement&&(a=a.correspondingUseElement);return 3===a.nodeType?a.parentNode:a}function Nc(a){do a=a.return;while(a&&5!==a.tag);return a?a:null}function Oc(a,b,c){if(b=Da(a,c.dispatchConfig.phasedRegistrationNames[b]))c._dispatchListeners=xa(c._dispatchListeners,b),c._dispatchInstances=xa(c._dispatchInstances,a)}
function Pc(a){if(a&&a.dispatchConfig.phasedRegistrationNames){for(var b=a._targetInst,c=[];b;)c.push(b),b=Nc(b);for(b=c.length;0<b--;)Oc(c[b],"captured",a);for(b=0;b<c.length;b++)Oc(c[b],"bubbled",a)}}function Qc(a,b,c){a&&c&&c.dispatchConfig.registrationName&&(b=Da(a,c.dispatchConfig.registrationName))&&(c._dispatchListeners=xa(c._dispatchListeners,b),c._dispatchInstances=xa(c._dispatchInstances,a))}function Rc(a){a&&a.dispatchConfig.registrationName&&Qc(a._targetInst,null,a)}
function Sc(a){ya(a,Pc)}function Tc(){return!0}function Uc(){return!1}function E(a,b,c,d){this.dispatchConfig=a;this._targetInst=b;this.nativeEvent=c;a=this.constructor.Interface;for(var e in a)a.hasOwnProperty(e)&&((b=a[e])?this[e]=b(c):"target"===e?this.target=d:this[e]=c[e]);this.isDefaultPrevented=(null!=c.defaultPrevented?c.defaultPrevented:!1===c.returnValue)?Tc:Uc;this.isPropagationStopped=Uc;return this}
n(E.prototype,{preventDefault:function(){this.defaultPrevented=!0;var a=this.nativeEvent;a&&(a.preventDefault?a.preventDefault():"unknown"!==typeof a.returnValue&&(a.returnValue=!1),this.isDefaultPrevented=Tc)},stopPropagation:function(){var a=this.nativeEvent;a&&(a.stopPropagation?a.stopPropagation():"unknown"!==typeof a.cancelBubble&&(a.cancelBubble=!0),this.isPropagationStopped=Tc)},persist:function(){this.isPersistent=Tc},isPersistent:Uc,destructor:function(){var a=this.constructor.Interface,
b;for(b in a)this[b]=null;this.nativeEvent=this._targetInst=this.dispatchConfig=null;this.isPropagationStopped=this.isDefaultPrevented=Uc;this._dispatchInstances=this._dispatchListeners=null}});E.Interface={type:null,target:null,currentTarget:function(){return null},eventPhase:null,bubbles:null,cancelable:null,timeStamp:function(a){return a.timeStamp||Date.now()},defaultPrevented:null,isTrusted:null};
E.extend=function(a){function b(){}function c(){return d.apply(this,arguments)}var d=this;b.prototype=d.prototype;var e=new b;n(e,c.prototype);c.prototype=e;c.prototype.constructor=c;c.Interface=n({},d.Interface,a);c.extend=d.extend;Vc(c);return c};Vc(E);function Wc(a,b,c,d){if(this.eventPool.length){var e=this.eventPool.pop();this.call(e,a,b,c,d);return e}return new this(a,b,c,d)}
function Xc(a){if(!(a instanceof this))throw Error(u(279));a.destructor();10>this.eventPool.length&&this.eventPool.push(a)}function Vc(a){a.eventPool=[];a.getPooled=Wc;a.release=Xc}var Yc=E.extend({animationName:null,elapsedTime:null,pseudoElement:null}),Zc=E.extend({clipboardData:function(a){return"clipboardData"in a?a.clipboardData:window.clipboardData}}),$c=E.extend({view:null,detail:null}),ad=$c.extend({relatedTarget:null});
function bd(a){var b=a.keyCode;"charCode"in a?(a=a.charCode,0===a&&13===b&&(a=13)):a=b;10===a&&(a=13);return 32<=a||13===a?a:0}
var cd={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},ed={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",
116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},fd={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function gd(a){var b=this.nativeEvent;return b.getModifierState?b.getModifierState(a):(a=fd[a])?!!b[a]:!1}function hd(){return gd}
var id=$c.extend({key:function(a){if(a.key){var b=cd[a.key]||a.key;if("Unidentified"!==b)return b}return"keypress"===a.type?(a=bd(a),13===a?"Enter":String.fromCharCode(a)):"keydown"===a.type||"keyup"===a.type?ed[a.keyCode]||"Unidentified":""},location:null,ctrlKey:null,shiftKey:null,altKey:null,metaKey:null,repeat:null,locale:null,getModifierState:hd,charCode:function(a){return"keypress"===a.type?bd(a):0},keyCode:function(a){return"keydown"===a.type||"keyup"===a.type?a.keyCode:0},which:function(a){return"keypress"===
a.type?bd(a):"keydown"===a.type||"keyup"===a.type?a.keyCode:0}}),jd=0,kd=0,ld=!1,md=!1,nd=$c.extend({screenX:null,screenY:null,clientX:null,clientY:null,pageX:null,pageY:null,ctrlKey:null,shiftKey:null,altKey:null,metaKey:null,getModifierState:hd,button:null,buttons:null,relatedTarget:function(a){return a.relatedTarget||(a.fromElement===a.srcElement?a.toElement:a.fromElement)},movementX:function(a){if("movementX"in a)return a.movementX;var b=jd;jd=a.screenX;return ld?"mousemove"===a.type?a.screenX-
b:0:(ld=!0,0)},movementY:function(a){if("movementY"in a)return a.movementY;var b=kd;kd=a.screenY;return md?"mousemove"===a.type?a.screenY-b:0:(md=!0,0)}}),od=nd.extend({pointerId:null,width:null,height:null,pressure:null,tangentialPressure:null,tiltX:null,tiltY:null,twist:null,pointerType:null,isPrimary:null}),pd=nd.extend({dataTransfer:null}),qd=$c.extend({touches:null,targetTouches:null,changedTouches:null,altKey:null,metaKey:null,ctrlKey:null,shiftKey:null,getModifierState:hd}),rd=E.extend({propertyName:null,
elapsedTime:null,pseudoElement:null}),sd=nd.extend({deltaX:function(a){return"deltaX"in a?a.deltaX:"wheelDeltaX"in a?-a.wheelDeltaX:0},deltaY:function(a){return"deltaY"in a?a.deltaY:"wheelDeltaY"in a?-a.wheelDeltaY:"wheelDelta"in a?-a.wheelDelta:0},deltaZ:null,deltaMode:null}),td=[["blur","blur",0],["cancel","cancel",0],["click","click",0],["close","close",0],["contextmenu","contextMenu",0],["copy","copy",0],["cut","cut",0],["auxclick","auxClick",0],["dblclick","doubleClick",0],["dragend","dragEnd",
0],["dragstart","dragStart",0],["drop","drop",0],["focus","focus",0],["input","input",0],["invalid","invalid",0],["keydown","keyDown",0],["keypress","keyPress",0],["keyup","keyUp",0],["mousedown","mouseDown",0],["mouseup","mouseUp",0],["paste","paste",0],["pause","pause",0],["play","play",0],["pointercancel","pointerCancel",0],["pointerdown","pointerDown",0],["pointerup","pointerUp",0],["ratechange","rateChange",0],["reset","reset",0],["seeked","seeked",0],["submit","submit",0],["touchcancel","touchCancel",
0],["touchend","touchEnd",0],["touchstart","touchStart",0],["volumechange","volumeChange",0],["drag","drag",1],["dragenter","dragEnter",1],["dragexit","dragExit",1],["dragleave","dragLeave",1],["dragover","dragOver",1],["mousemove","mouseMove",1],["mouseout","mouseOut",1],["mouseover","mouseOver",1],["pointermove","pointerMove",1],["pointerout","pointerOut",1],["pointerover","pointerOver",1],["scroll","scroll",1],["toggle","toggle",1],["touchmove","touchMove",1],["wheel","wheel",1],["abort","abort",
2],[Zb,"animationEnd",2],[$b,"animationIteration",2],[ac,"animationStart",2],["canplay","canPlay",2],["canplaythrough","canPlayThrough",2],["durationchange","durationChange",2],["emptied","emptied",2],["encrypted","encrypted",2],["ended","ended",2],["error","error",2],["gotpointercapture","gotPointerCapture",2],["load","load",2],["loadeddata","loadedData",2],["loadedmetadata","loadedMetadata",2],["loadstart","loadStart",2],["lostpointercapture","lostPointerCapture",2],["playing","playing",2],["progress",
"progress",2],["seeking","seeking",2],["stalled","stalled",2],["suspend","suspend",2],["timeupdate","timeUpdate",2],[bc,"transitionEnd",2],["waiting","waiting",2]],ud={},vd={},xd=0;for(;xd<td.length;xd++){var yd=td[xd],zd=yd[0],Ad=yd[1],Bd=yd[2],Cd="on"+(Ad[0].toUpperCase()+Ad.slice(1)),Dd={phasedRegistrationNames:{bubbled:Cd,captured:Cd+"Capture"},dependencies:[zd],eventPriority:Bd};ud[Ad]=Dd;vd[zd]=Dd}
var Ed={eventTypes:ud,getEventPriority:function(a){a=vd[a];return void 0!==a?a.eventPriority:2},extractEvents:function(a,b,c,d){var e=vd[a];if(!e)return null;switch(a){case "keypress":if(0===bd(c))return null;case "keydown":case "keyup":a=id;break;case "blur":case "focus":a=ad;break;case "click":if(2===c.button)return null;case "auxclick":case "dblclick":case "mousedown":case "mousemove":case "mouseup":case "mouseout":case "mouseover":case "contextmenu":a=nd;break;case "drag":case "dragend":case "dragenter":case "dragexit":case "dragleave":case "dragover":case "dragstart":case "drop":a=
pd;break;case "touchcancel":case "touchend":case "touchmove":case "touchstart":a=qd;break;case Zb:case $b:case ac:a=Yc;break;case bc:a=rd;break;case "scroll":a=$c;break;case "wheel":a=sd;break;case "copy":case "cut":case "paste":a=Zc;break;case "gotpointercapture":case "lostpointercapture":case "pointercancel":case "pointerdown":case "pointermove":case "pointerout":case "pointerover":case "pointerup":a=od;break;default:a=E}b=a.getPooled(e,b,c,d);Sc(b);return b}},Fd=q.unstable_UserBlockingPriority,
Gd=q.unstable_runWithPriority,Hd=Ed.getEventPriority,Id=10,Jd=[];
function Kd(a){var b=a.targetInst,c=b;do{if(!c){a.ancestors.push(c);break}var d=c;if(3===d.tag)d=d.stateNode.containerInfo;else{for(;d.return;)d=d.return;d=3!==d.tag?null:d.stateNode.containerInfo}if(!d)break;b=c.tag;5!==b&&6!==b||a.ancestors.push(c);c=Fc(d)}while(c);for(c=0;c<a.ancestors.length;c++){b=a.ancestors[c];var e=Mc(a.nativeEvent);d=a.topLevelType;for(var f=a.nativeEvent,g=a.eventSystemFlags,h=null,k=0;k<ea.length;k++){var l=ea[k];l&&(l=l.extractEvents(d,b,f,e,g))&&(h=xa(h,l))}Ba(h)}}
var Ld=!0;function F(a,b){Md(b,a,!1)}function Md(a,b,c){switch(Hd(b)){case 0:var d=Nd.bind(null,b,1);break;case 1:d=Od.bind(null,b,1);break;default:d=Pd.bind(null,b,1)}c?a.addEventListener(b,d,!0):a.addEventListener(b,d,!1)}function Nd(a,b,c){ib||gb();var d=Pd,e=ib;ib=!0;try{fb(d,a,b,c)}finally{(ib=e)||kb()}}function Od(a,b,c){Gd(Fd,Pd.bind(null,a,b,c))}
function Qd(a,b,c,d){if(Jd.length){var e=Jd.pop();e.topLevelType=a;e.eventSystemFlags=b;e.nativeEvent=c;e.targetInst=d;a=e}else a={topLevelType:a,eventSystemFlags:b,nativeEvent:c,targetInst:d,ancestors:[]};try{if(b=Kd,c=a,jb)b(c,void 0);else{jb=!0;try{hb(b,c,void 0)}finally{jb=!1,kb()}}}finally{a.topLevelType=null,a.nativeEvent=null,a.targetInst=null,a.ancestors.length=0,Jd.length<Id&&Jd.push(a)}}
function Pd(a,b,c){if(Ld)if(0<nc.length&&-1<uc.indexOf(a))a=zc(null,a,b,c),nc.push(a);else{var d=Hc(a,b,c);null===d?Ac(a,c):-1<uc.indexOf(a)?(a=zc(d,a,b,c),nc.push(a)):Dc(d,a,b,c)||(Ac(a,c),Qd(a,b,c,null))}}function Hc(a,b,c){var d=Mc(c);d=Fc(d);if(null!==d){var e=ec(d);if(null===e)d=null;else{var f=e.tag;if(13===f){d=fc(e);if(null!==d)return d;d=null}else if(3===f){if(e.stateNode.hydrate)return 3===e.tag?e.stateNode.containerInfo:null;d=null}else e!==d&&(d=null)}}Qd(a,b,c,d);return null}
function Rd(a){if(!Ya)return!1;a="on"+a;var b=a in document;b||(b=document.createElement("div"),b.setAttribute(a,"return;"),b="function"===typeof b[a]);return b}var Sd=new ("function"===typeof WeakMap?WeakMap:Map);function xc(a){var b=Sd.get(a);void 0===b&&(b=new Set,Sd.set(a,b));return b}
function yc(a,b,c){if(!c.has(a)){switch(a){case "scroll":Md(b,"scroll",!0);break;case "focus":case "blur":Md(b,"focus",!0);Md(b,"blur",!0);c.add("blur");c.add("focus");break;case "cancel":case "close":Rd(a)&&Md(b,a,!0);break;case "invalid":case "submit":case "reset":break;default:-1===dc.indexOf(a)&&F(a,b)}c.add(a)}}
var Td={animationIterationCount:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,
floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},Ud=["Webkit","ms","Moz","O"];Object.keys(Td).forEach(function(a){Ud.forEach(function(b){b=b+a.charAt(0).toUpperCase()+a.substring(1);Td[b]=Td[a]})});function Vd(a,b,c){return null==b||"boolean"===typeof b||""===b?"":c||"number"!==typeof b||0===b||Td.hasOwnProperty(a)&&Td[a]?(""+b).trim():b+"px"}
function Wd(a,b){a=a.style;for(var c in b)if(b.hasOwnProperty(c)){var d=0===c.indexOf("--"),e=Vd(c,b[c],d);"float"===c&&(c="cssFloat");d?a.setProperty(c,e):a[c]=e}}var Xd=n({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});
function Yd(a,b){if(b){if(Xd[a]&&(null!=b.children||null!=b.dangerouslySetInnerHTML))throw Error(u(137,a,""));if(null!=b.dangerouslySetInnerHTML){if(null!=b.children)throw Error(u(60));if(!("object"===typeof b.dangerouslySetInnerHTML&&"__html"in b.dangerouslySetInnerHTML))throw Error(u(61));}if(null!=b.style&&"object"!==typeof b.style)throw Error(u(62,""));}}
function Zd(a,b){if(-1===a.indexOf("-"))return"string"===typeof b.is;switch(a){case "annotation-xml":case "color-profile":case "font-face":case "font-face-src":case "font-face-uri":case "font-face-format":case "font-face-name":case "missing-glyph":return!1;default:return!0}}function $d(a,b){a=9===a.nodeType||11===a.nodeType?a:a.ownerDocument;var c=xc(a);b=ja[b];for(var d=0;d<b.length;d++)yc(b[d],a,c)}function ae(){}
function be(a){a=a||("undefined"!==typeof document?document:void 0);if("undefined"===typeof a)return null;try{return a.activeElement||a.body}catch(b){return a.body}}function ce(a){for(;a&&a.firstChild;)a=a.firstChild;return a}function de(a,b){var c=ce(a);a=0;for(var d;c;){if(3===c.nodeType){d=a+c.textContent.length;if(a<=b&&d>=b)return{node:c,offset:b-a};a=d}a:{for(;c;){if(c.nextSibling){c=c.nextSibling;break a}c=c.parentNode}c=void 0}c=ce(c)}}
function ee(a,b){return a&&b?a===b?!0:a&&3===a.nodeType?!1:b&&3===b.nodeType?ee(a,b.parentNode):"contains"in a?a.contains(b):a.compareDocumentPosition?!!(a.compareDocumentPosition(b)&16):!1:!1}function fe(){for(var a=window,b=be();b instanceof a.HTMLIFrameElement;){try{var c="string"===typeof b.contentWindow.location.href}catch(d){c=!1}if(c)a=b.contentWindow;else break;b=be(a.document)}return b}
function ge(a){var b=a&&a.nodeName&&a.nodeName.toLowerCase();return b&&("input"===b&&("text"===a.type||"search"===a.type||"tel"===a.type||"url"===a.type||"password"===a.type)||"textarea"===b||"true"===a.contentEditable)}var he="$",ie="/$",je="$?",ke="$!",le=null,me=null;function ne(a,b){switch(a){case "button":case "input":case "select":case "textarea":return!!b.autoFocus}return!1}
function oe(a,b){return"textarea"===a||"option"===a||"noscript"===a||"string"===typeof b.children||"number"===typeof b.children||"object"===typeof b.dangerouslySetInnerHTML&&null!==b.dangerouslySetInnerHTML&&null!=b.dangerouslySetInnerHTML.__html}var pe="function"===typeof setTimeout?setTimeout:void 0,qe="function"===typeof clearTimeout?clearTimeout:void 0;function re(a){for(;null!=a;a=a.nextSibling){var b=a.nodeType;if(1===b||3===b)break}return a}
function se(a){a=a.previousSibling;for(var b=0;a;){if(8===a.nodeType){var c=a.data;if(c===he||c===ke||c===je){if(0===b)return a;b--}else c===ie&&b++}a=a.previousSibling}return null}var te=Math.random().toString(36).slice(2),ue="__reactInternalInstance$"+te,ve="__reactEventHandlers$"+te,we="__reactContainere$"+te;
function Fc(a){var b=a[ue];if(b)return b;for(var c=a.parentNode;c;){if(b=c[we]||c[ue]){c=b.alternate;if(null!==b.child||null!==c&&null!==c.child)for(a=se(a);null!==a;){if(c=a[ue])return c;a=se(a)}return b}a=c;c=a.parentNode}return null}function Cc(a){a=a[ue]||a[we];return!a||5!==a.tag&&6!==a.tag&&13!==a.tag&&3!==a.tag?null:a}function xe(a){if(5===a.tag||6===a.tag)return a.stateNode;throw Error(u(33));}function ye(a){return a[ve]||null}var ze=null,Ae=null,Be=null;
function Ce(){if(Be)return Be;var a,b=Ae,c=b.length,d,e="value"in ze?ze.value:ze.textContent,f=e.length;for(a=0;a<c&&b[a]===e[a];a++);var g=c-a;for(d=1;d<=g&&b[c-d]===e[f-d];d++);return Be=e.slice(a,1<d?1-d:void 0)}var De=E.extend({data:null}),Ee=E.extend({data:null}),Fe=[9,13,27,32],Ge=Ya&&"CompositionEvent"in window,He=null;Ya&&"documentMode"in document&&(He=document.documentMode);
var Ie=Ya&&"TextEvent"in window&&!He,Je=Ya&&(!Ge||He&&8<He&&11>=He),Ke=String.fromCharCode(32),Le={beforeInput:{phasedRegistrationNames:{bubbled:"onBeforeInput",captured:"onBeforeInputCapture"},dependencies:["compositionend","keypress","textInput","paste"]},compositionEnd:{phasedRegistrationNames:{bubbled:"onCompositionEnd",captured:"onCompositionEndCapture"},dependencies:"blur compositionend keydown keypress keyup mousedown".split(" ")},compositionStart:{phasedRegistrationNames:{bubbled:"onCompositionStart",
captured:"onCompositionStartCapture"},dependencies:"blur compositionstart keydown keypress keyup mousedown".split(" ")},compositionUpdate:{phasedRegistrationNames:{bubbled:"onCompositionUpdate",captured:"onCompositionUpdateCapture"},dependencies:"blur compositionupdate keydown keypress keyup mousedown".split(" ")}},Me=!1;
function Ne(a,b){switch(a){case "keyup":return-1!==Fe.indexOf(b.keyCode);case "keydown":return 229!==b.keyCode;case "keypress":case "mousedown":case "blur":return!0;default:return!1}}function Oe(a){a=a.detail;return"object"===typeof a&&"data"in a?a.data:null}var Pe=!1;function Qe(a,b){switch(a){case "compositionend":return Oe(b);case "keypress":if(32!==b.which)return null;Me=!0;return Ke;case "textInput":return a=b.data,a===Ke&&Me?null:a;default:return null}}
function Re(a,b){if(Pe)return"compositionend"===a||!Ge&&Ne(a,b)?(a=Ce(),Be=Ae=ze=null,Pe=!1,a):null;switch(a){case "paste":return null;case "keypress":if(!(b.ctrlKey||b.altKey||b.metaKey)||b.ctrlKey&&b.altKey){if(b.char&&1<b.char.length)return b.char;if(b.which)return String.fromCharCode(b.which)}return null;case "compositionend":return Je&&"ko"!==b.locale?null:b.data;default:return null}}
var Se={eventTypes:Le,extractEvents:function(a,b,c,d){var e;if(Ge)b:{switch(a){case "compositionstart":var f=Le.compositionStart;break b;case "compositionend":f=Le.compositionEnd;break b;case "compositionupdate":f=Le.compositionUpdate;break b}f=void 0}else Pe?Ne(a,c)&&(f=Le.compositionEnd):"keydown"===a&&229===c.keyCode&&(f=Le.compositionStart);f?(Je&&"ko"!==c.locale&&(Pe||f!==Le.compositionStart?f===Le.compositionEnd&&Pe&&(e=Ce()):(ze=d,Ae="value"in ze?ze.value:ze.textContent,Pe=!0)),f=De.getPooled(f,
b,c,d),e?f.data=e:(e=Oe(c),null!==e&&(f.data=e)),Sc(f),e=f):e=null;(a=Ie?Qe(a,c):Re(a,c))?(b=Ee.getPooled(Le.beforeInput,b,c,d),b.data=a,Sc(b)):b=null;return null===e?b:null===b?e:[e,b]}},Te={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function Ue(a){var b=a&&a.nodeName&&a.nodeName.toLowerCase();return"input"===b?!!Te[a.type]:"textarea"===b?!0:!1}
var Ve={change:{phasedRegistrationNames:{bubbled:"onChange",captured:"onChangeCapture"},dependencies:"blur change click focus input keydown keyup selectionchange".split(" ")}};function We(a,b,c){a=E.getPooled(Ve.change,a,b,c);a.type="change";cb(c);Sc(a);return a}var Xe=null,Ye=null;function Ze(a){Ba(a)}function $e(a){var b=xe(a);if(zb(b))return a}function af(a,b){if("change"===a)return b}var bf=!1;Ya&&(bf=Rd("input")&&(!document.documentMode||9<document.documentMode));
function cf(){Xe&&(Xe.detachEvent("onpropertychange",df),Ye=Xe=null)}function df(a){if("value"===a.propertyName&&$e(Ye))if(a=We(Ye,a,Mc(a)),ib)Ba(a);else{ib=!0;try{eb(Ze,a)}finally{ib=!1,kb()}}}function ef(a,b,c){"focus"===a?(cf(),Xe=b,Ye=c,Xe.attachEvent("onpropertychange",df)):"blur"===a&&cf()}function ff(a){if("selectionchange"===a||"keyup"===a||"keydown"===a)return $e(Ye)}function gf(a,b){if("click"===a)return $e(b)}function hf(a,b){if("input"===a||"change"===a)return $e(b)}
var jf={eventTypes:Ve,_isInputEventSupported:bf,extractEvents:function(a,b,c,d){var e=b?xe(b):window,f=e.nodeName&&e.nodeName.toLowerCase();if("select"===f||"input"===f&&"file"===e.type)var g=af;else if(Ue(e))if(bf)g=hf;else{g=ff;var h=ef}else(f=e.nodeName)&&"input"===f.toLowerCase()&&("checkbox"===e.type||"radio"===e.type)&&(g=gf);if(g&&(g=g(a,b)))return We(g,c,d);h&&h(a,e,b);"blur"===a&&(a=e._wrapperState)&&a.controlled&&"number"===e.type&&Fb(e,"number",e.value)}},kf={mouseEnter:{registrationName:"onMouseEnter",
dependencies:["mouseout","mouseover"]},mouseLeave:{registrationName:"onMouseLeave",dependencies:["mouseout","mouseover"]},pointerEnter:{registrationName:"onPointerEnter",dependencies:["pointerout","pointerover"]},pointerLeave:{registrationName:"onPointerLeave",dependencies:["pointerout","pointerover"]}},lf,mf={eventTypes:kf,extractEvents:function(a,b,c,d,e){var f="mouseover"===a||"pointerover"===a,g="mouseout"===a||"pointerout"===a;if(f&&0===(e&32)&&(c.relatedTarget||c.fromElement)||!g&&!f)return null;
e=d.window===d?d:(e=d.ownerDocument)?e.defaultView||e.parentWindow:window;if(g){if(g=b,b=(b=c.relatedTarget||c.toElement)?Fc(b):null,null!==b&&(f=ec(b),b!==f||5!==b.tag&&6!==b.tag))b=null}else g=null;if(g===b)return null;if("mouseout"===a||"mouseover"===a){var h=nd;var k=kf.mouseLeave;var l=kf.mouseEnter;var m="mouse"}else if("pointerout"===a||"pointerover"===a)h=od,k=kf.pointerLeave,l=kf.pointerEnter,m="pointer";a=null==g?e:xe(g);e=null==b?e:xe(b);k=h.getPooled(k,g,c,d);k.type=m+"leave";k.target=
a;k.relatedTarget=e;d=h.getPooled(l,b,c,d);d.type=m+"enter";d.target=e;d.relatedTarget=a;h=g;m=b;if(h&&m)a:{l=h;a=m;g=0;for(b=l;b;b=Nc(b))g++;b=0;for(e=a;e;e=Nc(e))b++;for(;0<g-b;)l=Nc(l),g--;for(;0<b-g;)a=Nc(a),b--;for(;g--;){if(l===a||l===a.alternate)break a;l=Nc(l);a=Nc(a)}l=null}else l=null;a=l;for(l=[];h&&h!==a;){g=h.alternate;if(null!==g&&g===a)break;l.push(h);h=Nc(h)}for(h=[];m&&m!==a;){g=m.alternate;if(null!==g&&g===a)break;h.push(m);m=Nc(m)}for(m=0;m<l.length;m++)Qc(l[m],"bubbled",k);for(m=
h.length;0<m--;)Qc(h[m],"captured",d);if(c===lf)return lf=null,[k];lf=c;return[k,d]}};function nf(a,b){return a===b&&(0!==a||1/a===1/b)||a!==a&&b!==b}var of="function"===typeof Object.is?Object.is:nf,pf=Object.prototype.hasOwnProperty;function qf(a,b){if(of(a,b))return!0;if("object"!==typeof a||null===a||"object"!==typeof b||null===b)return!1;var c=Object.keys(a),d=Object.keys(b);if(c.length!==d.length)return!1;for(d=0;d<c.length;d++)if(!pf.call(b,c[d])||!of(a[c[d]],b[c[d]]))return!1;return!0}
var rf=Ya&&"documentMode"in document&&11>=document.documentMode,sf={select:{phasedRegistrationNames:{bubbled:"onSelect",captured:"onSelectCapture"},dependencies:"blur contextmenu dragend focus keydown keyup mousedown mouseup selectionchange".split(" ")}},tf=null,uf=null,vf=null,wf=!1;
function xf(a,b){var c=b.window===b?b.document:9===b.nodeType?b:b.ownerDocument;if(wf||null==tf||tf!==be(c))return null;c=tf;"selectionStart"in c&&ge(c)?c={start:c.selectionStart,end:c.selectionEnd}:(c=(c.ownerDocument&&c.ownerDocument.defaultView||window).getSelection(),c={anchorNode:c.anchorNode,anchorOffset:c.anchorOffset,focusNode:c.focusNode,focusOffset:c.focusOffset});return vf&&qf(vf,c)?null:(vf=c,a=E.getPooled(sf.select,uf,a,b),a.type="select",a.target=tf,Sc(a),a)}
var yf={eventTypes:sf,extractEvents:function(a,b,c,d){var e=d.window===d?d.document:9===d.nodeType?d:d.ownerDocument,f;if(!(f=!e)){a:{e=xc(e);f=ja.onSelect;for(var g=0;g<f.length;g++)if(!e.has(f[g])){e=!1;break a}e=!0}f=!e}if(f)return null;e=b?xe(b):window;switch(a){case "focus":if(Ue(e)||"true"===e.contentEditable)tf=e,uf=b,vf=null;break;case "blur":vf=uf=tf=null;break;case "mousedown":wf=!0;break;case "contextmenu":case "mouseup":case "dragend":return wf=!1,xf(c,d);case "selectionchange":if(rf)break;
case "keydown":case "keyup":return xf(c,d)}return null}};Ca.injectEventPluginOrder("ResponderEventPlugin SimpleEventPlugin EnterLeaveEventPlugin ChangeEventPlugin SelectEventPlugin BeforeInputEventPlugin".split(" "));var zf=Cc;sa=ye;ua=zf;va=xe;Ca.injectEventPluginsByName({SimpleEventPlugin:Ed,EnterLeaveEventPlugin:mf,ChangeEventPlugin:jf,SelectEventPlugin:yf,BeforeInputEventPlugin:Se});new Set;var Af=[],Bf=-1;function G(a){0>Bf||(a.current=Af[Bf],Af[Bf]=null,Bf--)}
function I(a,b){Bf++;Af[Bf]=a.current;a.current=b}var Cf={},J={current:Cf},K={current:!1},Df=Cf;function Ef(a,b){var c=a.type.contextTypes;if(!c)return Cf;var d=a.stateNode;if(d&&d.__reactInternalMemoizedUnmaskedChildContext===b)return d.__reactInternalMemoizedMaskedChildContext;var e={},f;for(f in c)e[f]=b[f];d&&(a=a.stateNode,a.__reactInternalMemoizedUnmaskedChildContext=b,a.__reactInternalMemoizedMaskedChildContext=e);return e}function L(a){a=a.childContextTypes;return null!==a&&void 0!==a}
function Ff(a){G(K,a);G(J,a)}function Gf(a){G(K,a);G(J,a)}function Hf(a,b,c){if(J.current!==Cf)throw Error(u(168));I(J,b,a);I(K,c,a)}function If(a,b,c){var d=a.stateNode;a=b.childContextTypes;if("function"!==typeof d.getChildContext)return c;d=d.getChildContext();for(var e in d)if(!(e in a))throw Error(u(108,Wa(b)||"Unknown",e));return n({},c,{},d)}function Jf(a){var b=a.stateNode;b=b&&b.__reactInternalMemoizedMergedChildContext||Cf;Df=J.current;I(J,b,a);I(K,K.current,a);return!0}
function Kf(a,b,c){var d=a.stateNode;if(!d)throw Error(u(169));c?(b=If(a,b,Df),d.__reactInternalMemoizedMergedChildContext=b,G(K,a),G(J,a),I(J,b,a)):G(K,a);I(K,c,a)}
var Lf=q.unstable_runWithPriority,Mf=q.unstable_scheduleCallback,Nf=q.unstable_cancelCallback,Of=q.unstable_shouldYield,Pf=q.unstable_requestPaint,Qf=q.unstable_now,Rf=q.unstable_getCurrentPriorityLevel,Sf=q.unstable_ImmediatePriority,Tf=q.unstable_UserBlockingPriority,Uf=q.unstable_NormalPriority,Vf=q.unstable_LowPriority,Wf=q.unstable_IdlePriority,Xf={},Yf=void 0!==Pf?Pf:function(){},Zf=null,$f=null,ag=!1,bg=Qf(),cg=1E4>bg?Qf:function(){return Qf()-bg};
function dg(){switch(Rf()){case Sf:return 99;case Tf:return 98;case Uf:return 97;case Vf:return 96;case Wf:return 95;default:throw Error(u(332));}}function eg(a){switch(a){case 99:return Sf;case 98:return Tf;case 97:return Uf;case 96:return Vf;case 95:return Wf;default:throw Error(u(332));}}function fg(a,b){a=eg(a);return Lf(a,b)}function gg(a,b,c){a=eg(a);return Mf(a,b,c)}function hg(a){null===Zf?(Zf=[a],$f=Mf(Sf,ig)):Zf.push(a);return Xf}function jg(){if(null!==$f){var a=$f;$f=null;Nf(a)}ig()}
function ig(){if(!ag&&null!==Zf){ag=!0;var a=0;try{var b=Zf;fg(99,function(){for(;a<b.length;a++){var c=b[a];do c=c(!0);while(null!==c)}});Zf=null}catch(c){throw null!==Zf&&(Zf=Zf.slice(a+1)),Mf(Sf,jg),c;}finally{ag=!1}}}var kg=3;function lg(a,b,c){c/=10;return 1073741821-(((1073741821-a+b/10)/c|0)+1)*c}function mg(a,b){if(a&&a.defaultProps){b=n({},b);a=a.defaultProps;for(var c in a)void 0===b[c]&&(b[c]=a[c])}return b}var ng={current:null},og=null,pg=null,qg=null;function rg(){qg=pg=og=null}
function sg(a,b){var c=a.type._context;I(ng,c._currentValue,a);c._currentValue=b}function tg(a){var b=ng.current;G(ng,a);a.type._context._currentValue=b}function ug(a,b){for(;null!==a;){var c=a.alternate;if(a.childExpirationTime<b)a.childExpirationTime=b,null!==c&&c.childExpirationTime<b&&(c.childExpirationTime=b);else if(null!==c&&c.childExpirationTime<b)c.childExpirationTime=b;else break;a=a.return}}
function vg(a,b){og=a;qg=pg=null;a=a.dependencies;null!==a&&null!==a.firstContext&&(a.expirationTime>=b&&(wg=!0),a.firstContext=null)}function xg(a,b){if(qg!==a&&!1!==b&&0!==b){if("number"!==typeof b||1073741823===b)qg=a,b=1073741823;b={context:a,observedBits:b,next:null};if(null===pg){if(null===og)throw Error(u(308));pg=b;og.dependencies={expirationTime:0,firstContext:b,responders:null}}else pg=pg.next=b}return a._currentValue}var yg=!1;
function zg(a){return{baseState:a,firstUpdate:null,lastUpdate:null,firstCapturedUpdate:null,lastCapturedUpdate:null,firstEffect:null,lastEffect:null,firstCapturedEffect:null,lastCapturedEffect:null}}function Ag(a){return{baseState:a.baseState,firstUpdate:a.firstUpdate,lastUpdate:a.lastUpdate,firstCapturedUpdate:null,lastCapturedUpdate:null,firstEffect:null,lastEffect:null,firstCapturedEffect:null,lastCapturedEffect:null}}
function Bg(a,b){return{expirationTime:a,suspenseConfig:b,tag:0,payload:null,callback:null,next:null,nextEffect:null}}function Cg(a,b){null===a.lastUpdate?a.firstUpdate=a.lastUpdate=b:(a.lastUpdate.next=b,a.lastUpdate=b)}
function Dg(a,b){var c=a.alternate;if(null===c){var d=a.updateQueue;var e=null;null===d&&(d=a.updateQueue=zg(a.memoizedState))}else d=a.updateQueue,e=c.updateQueue,null===d?null===e?(d=a.updateQueue=zg(a.memoizedState),e=c.updateQueue=zg(c.memoizedState)):d=a.updateQueue=Ag(e):null===e&&(e=c.updateQueue=Ag(d));null===e||d===e?Cg(d,b):null===d.lastUpdate||null===e.lastUpdate?(Cg(d,b),Cg(e,b)):(Cg(d,b),e.lastUpdate=b)}
function Eg(a,b){var c=a.updateQueue;c=null===c?a.updateQueue=zg(a.memoizedState):Fg(a,c);null===c.lastCapturedUpdate?c.firstCapturedUpdate=c.lastCapturedUpdate=b:(c.lastCapturedUpdate.next=b,c.lastCapturedUpdate=b)}function Fg(a,b){var c=a.alternate;null!==c&&b===c.updateQueue&&(b=a.updateQueue=Ag(b));return b}
function Gg(a,b,c,d,e,f){switch(c.tag){case 1:return a=c.payload,"function"===typeof a?a.call(f,d,e):a;case 3:a.effectTag=a.effectTag&-4097|64;case 0:a=c.payload;e="function"===typeof a?a.call(f,d,e):a;if(null===e||void 0===e)break;return n({},d,e);case 2:yg=!0}return d}
function Hg(a,b,c,d,e){yg=!1;b=Fg(a,b);for(var f=b.baseState,g=null,h=0,k=b.firstUpdate,l=f;null!==k;){var m=k.expirationTime;m<e?(null===g&&(g=k,f=l),h<m&&(h=m)):(Ig(m,k.suspenseConfig),l=Gg(a,b,k,l,c,d),null!==k.callback&&(a.effectTag|=32,k.nextEffect=null,null===b.lastEffect?b.firstEffect=b.lastEffect=k:(b.lastEffect.nextEffect=k,b.lastEffect=k)));k=k.next}m=null;for(k=b.firstCapturedUpdate;null!==k;){var C=k.expirationTime;C<e?(null===m&&(m=k,null===g&&(f=l)),h<C&&(h=C)):(l=Gg(a,b,k,l,c,d),null!==
k.callback&&(a.effectTag|=32,k.nextEffect=null,null===b.lastCapturedEffect?b.firstCapturedEffect=b.lastCapturedEffect=k:(b.lastCapturedEffect.nextEffect=k,b.lastCapturedEffect=k)));k=k.next}null===g&&(b.lastUpdate=null);null===m?b.lastCapturedUpdate=null:a.effectTag|=32;null===g&&null===m&&(f=l);b.baseState=f;b.firstUpdate=g;b.firstCapturedUpdate=m;Jg(h);a.expirationTime=h;a.memoizedState=l}
function Kg(a,b,c){null!==b.firstCapturedUpdate&&(null!==b.lastUpdate&&(b.lastUpdate.next=b.firstCapturedUpdate,b.lastUpdate=b.lastCapturedUpdate),b.firstCapturedUpdate=b.lastCapturedUpdate=null);Lg(b.firstEffect,c);b.firstEffect=b.lastEffect=null;Lg(b.firstCapturedEffect,c);b.firstCapturedEffect=b.lastCapturedEffect=null}function Lg(a,b){for(;null!==a;){var c=a.callback;if(null!==c){a.callback=null;var d=b;if("function"!==typeof c)throw Error(u(191,c));c.call(d)}a=a.nextEffect}}
var Mg=Ea.ReactCurrentBatchConfig,Ng=(new aa.Component).refs;function Og(a,b,c,d){b=a.memoizedState;c=c(d,b);c=null===c||void 0===c?b:n({},b,c);a.memoizedState=c;d=a.updateQueue;null!==d&&0===a.expirationTime&&(d.baseState=c)}
var Sg={isMounted:function(a){return(a=a._reactInternalFiber)?ec(a)===a:!1},enqueueSetState:function(a,b,c){a=a._reactInternalFiber;var d=Pg(),e=Mg.suspense;d=Qg(d,a,e);e=Bg(d,e);e.payload=b;void 0!==c&&null!==c&&(e.callback=c);Dg(a,e);Rg(a,d)},enqueueReplaceState:function(a,b,c){a=a._reactInternalFiber;var d=Pg(),e=Mg.suspense;d=Qg(d,a,e);e=Bg(d,e);e.tag=1;e.payload=b;void 0!==c&&null!==c&&(e.callback=c);Dg(a,e);Rg(a,d)},enqueueForceUpdate:function(a,b){a=a._reactInternalFiber;var c=Pg(),d=Mg.suspense;
c=Qg(c,a,d);d=Bg(c,d);d.tag=2;void 0!==b&&null!==b&&(d.callback=b);Dg(a,d);Rg(a,c)}};function Tg(a,b,c,d,e,f,g){a=a.stateNode;return"function"===typeof a.shouldComponentUpdate?a.shouldComponentUpdate(d,f,g):b.prototype&&b.prototype.isPureReactComponent?!qf(c,d)||!qf(e,f):!0}
function Ug(a,b,c){var d=!1,e=Cf;var f=b.contextType;"object"===typeof f&&null!==f?f=xg(f):(e=L(b)?Df:J.current,d=b.contextTypes,f=(d=null!==d&&void 0!==d)?Ef(a,e):Cf);b=new b(c,f);a.memoizedState=null!==b.state&&void 0!==b.state?b.state:null;b.updater=Sg;a.stateNode=b;b._reactInternalFiber=a;d&&(a=a.stateNode,a.__reactInternalMemoizedUnmaskedChildContext=e,a.__reactInternalMemoizedMaskedChildContext=f);return b}
function Vg(a,b,c,d){a=b.state;"function"===typeof b.componentWillReceiveProps&&b.componentWillReceiveProps(c,d);"function"===typeof b.UNSAFE_componentWillReceiveProps&&b.UNSAFE_componentWillReceiveProps(c,d);b.state!==a&&Sg.enqueueReplaceState(b,b.state,null)}
function Wg(a,b,c,d){var e=a.stateNode;e.props=c;e.state=a.memoizedState;e.refs=Ng;var f=b.contextType;"object"===typeof f&&null!==f?e.context=xg(f):(f=L(b)?Df:J.current,e.context=Ef(a,f));f=a.updateQueue;null!==f&&(Hg(a,f,c,e,d),e.state=a.memoizedState);f=b.getDerivedStateFromProps;"function"===typeof f&&(Og(a,b,f,c),e.state=a.memoizedState);"function"===typeof b.getDerivedStateFromProps||"function"===typeof e.getSnapshotBeforeUpdate||"function"!==typeof e.UNSAFE_componentWillMount&&"function"!==
typeof e.componentWillMount||(b=e.state,"function"===typeof e.componentWillMount&&e.componentWillMount(),"function"===typeof e.UNSAFE_componentWillMount&&e.UNSAFE_componentWillMount(),b!==e.state&&Sg.enqueueReplaceState(e,e.state,null),f=a.updateQueue,null!==f&&(Hg(a,f,c,e,d),e.state=a.memoizedState));"function"===typeof e.componentDidMount&&(a.effectTag|=4)}var Xg=Array.isArray;
function Yg(a,b,c){a=c.ref;if(null!==a&&"function"!==typeof a&&"object"!==typeof a){if(c._owner){c=c._owner;if(c){if(1!==c.tag)throw Error(u(309));var d=c.stateNode}if(!d)throw Error(u(147,a));var e=""+a;if(null!==b&&null!==b.ref&&"function"===typeof b.ref&&b.ref._stringRef===e)return b.ref;b=function(a){var b=d.refs;b===Ng&&(b=d.refs={});null===a?delete b[e]:b[e]=a};b._stringRef=e;return b}if("string"!==typeof a)throw Error(u(284));if(!c._owner)throw Error(u(290,a));}return a}
function Zg(a,b){if("textarea"!==a.type)throw Error(u(31,"[object Object]"===Object.prototype.toString.call(b)?"object with keys {"+Object.keys(b).join(", ")+"}":b,""));}
function $g(a){function b(b,c){if(a){var d=b.lastEffect;null!==d?(d.nextEffect=c,b.lastEffect=c):b.firstEffect=b.lastEffect=c;c.nextEffect=null;c.effectTag=8}}function c(c,d){if(!a)return null;for(;null!==d;)b(c,d),d=d.sibling;return null}function d(a,b){for(a=new Map;null!==b;)null!==b.key?a.set(b.key,b):a.set(b.index,b),b=b.sibling;return a}function e(a,b,c){a=ah(a,b,c);a.index=0;a.sibling=null;return a}function f(b,c,d){b.index=d;if(!a)return c;d=b.alternate;if(null!==d)return d=d.index,d<c?(b.effectTag=
2,c):d;b.effectTag=2;return c}function g(b){a&&null===b.alternate&&(b.effectTag=2);return b}function h(a,b,c,d){if(null===b||6!==b.tag)return b=bh(c,a.mode,d),b.return=a,b;b=e(b,c,d);b.return=a;return b}function k(a,b,c,d){if(null!==b&&b.elementType===c.type)return d=e(b,c.props,d),d.ref=Yg(a,b,c),d.return=a,d;d=ch(c.type,c.key,c.props,null,a.mode,d);d.ref=Yg(a,b,c);d.return=a;return d}function l(a,b,c,d){if(null===b||4!==b.tag||b.stateNode.containerInfo!==c.containerInfo||b.stateNode.implementation!==
c.implementation)return b=dh(c,a.mode,d),b.return=a,b;b=e(b,c.children||[],d);b.return=a;return b}function m(a,b,c,d,f){if(null===b||7!==b.tag)return b=eh(c,a.mode,d,f),b.return=a,b;b=e(b,c,d);b.return=a;return b}function C(a,b,c){if("string"===typeof b||"number"===typeof b)return b=bh(""+b,a.mode,c),b.return=a,b;if("object"===typeof b&&null!==b){switch(b.$$typeof){case Ga:return c=ch(b.type,b.key,b.props,null,a.mode,c),c.ref=Yg(a,null,b),c.return=a,c;case Ha:return b=dh(b,a.mode,c),b.return=a,b}if(Xg(b)||
Ua(b))return b=eh(b,a.mode,c,null),b.return=a,b;Zg(a,b)}return null}function y(a,b,c,d){var e=null!==b?b.key:null;if("string"===typeof c||"number"===typeof c)return null!==e?null:h(a,b,""+c,d);if("object"===typeof c&&null!==c){switch(c.$$typeof){case Ga:return c.key===e?c.type===Ia?m(a,b,c.props.children,d,e):k(a,b,c,d):null;case Ha:return c.key===e?l(a,b,c,d):null}if(Xg(c)||Ua(c))return null!==e?null:m(a,b,c,d,null);Zg(a,c)}return null}function H(a,b,c,d,e){if("string"===typeof d||"number"===typeof d)return a=
a.get(c)||null,h(b,a,""+d,e);if("object"===typeof d&&null!==d){switch(d.$$typeof){case Ga:return a=a.get(null===d.key?c:d.key)||null,d.type===Ia?m(b,a,d.props.children,e,d.key):k(b,a,d,e);case Ha:return a=a.get(null===d.key?c:d.key)||null,l(b,a,d,e)}if(Xg(d)||Ua(d))return a=a.get(c)||null,m(b,a,d,e,null);Zg(b,d)}return null}function z(e,g,h,k){for(var l=null,m=null,r=g,x=g=0,A=null;null!==r&&x<h.length;x++){r.index>x?(A=r,r=null):A=r.sibling;var p=y(e,r,h[x],k);if(null===p){null===r&&(r=A);break}a&&
r&&null===p.alternate&&b(e,r);g=f(p,g,x);null===m?l=p:m.sibling=p;m=p;r=A}if(x===h.length)return c(e,r),l;if(null===r){for(;x<h.length;x++)r=C(e,h[x],k),null!==r&&(g=f(r,g,x),null===m?l=r:m.sibling=r,m=r);return l}for(r=d(e,r);x<h.length;x++)A=H(r,e,x,h[x],k),null!==A&&(a&&null!==A.alternate&&r.delete(null===A.key?x:A.key),g=f(A,g,x),null===m?l=A:m.sibling=A,m=A);a&&r.forEach(function(a){return b(e,a)});return l}function ta(e,g,h,k){var l=Ua(h);if("function"!==typeof l)throw Error(u(150));h=l.call(h);
if(null==h)throw Error(u(151));for(var m=l=null,r=g,x=g=0,A=null,p=h.next();null!==r&&!p.done;x++,p=h.next()){r.index>x?(A=r,r=null):A=r.sibling;var z=y(e,r,p.value,k);if(null===z){null===r&&(r=A);break}a&&r&&null===z.alternate&&b(e,r);g=f(z,g,x);null===m?l=z:m.sibling=z;m=z;r=A}if(p.done)return c(e,r),l;if(null===r){for(;!p.done;x++,p=h.next())p=C(e,p.value,k),null!==p&&(g=f(p,g,x),null===m?l=p:m.sibling=p,m=p);return l}for(r=d(e,r);!p.done;x++,p=h.next())p=H(r,e,x,p.value,k),null!==p&&(a&&null!==
p.alternate&&r.delete(null===p.key?x:p.key),g=f(p,g,x),null===m?l=p:m.sibling=p,m=p);a&&r.forEach(function(a){return b(e,a)});return l}return function(a,d,f,h){var k="object"===typeof f&&null!==f&&f.type===Ia&&null===f.key;k&&(f=f.props.children);var l="object"===typeof f&&null!==f;if(l)switch(f.$$typeof){case Ga:a:{l=f.key;for(k=d;null!==k;){if(k.key===l)if(7===k.tag?f.type===Ia:k.elementType===f.type){c(a,k.sibling);d=e(k,f.type===Ia?f.props.children:f.props,h);d.ref=Yg(a,k,f);d.return=a;a=d;break a}else{c(a,
k);break}else b(a,k);k=k.sibling}f.type===Ia?(d=eh(f.props.children,a.mode,h,f.key),d.return=a,a=d):(h=ch(f.type,f.key,f.props,null,a.mode,h),h.ref=Yg(a,d,f),h.return=a,a=h)}return g(a);case Ha:a:{for(k=f.key;null!==d;){if(d.key===k)if(4===d.tag&&d.stateNode.containerInfo===f.containerInfo&&d.stateNode.implementation===f.implementation){c(a,d.sibling);d=e(d,f.children||[],h);d.return=a;a=d;break a}else{c(a,d);break}else b(a,d);d=d.sibling}d=dh(f,a.mode,h);d.return=a;a=d}return g(a)}if("string"===
typeof f||"number"===typeof f)return f=""+f,null!==d&&6===d.tag?(c(a,d.sibling),d=e(d,f,h),d.return=a,a=d):(c(a,d),d=bh(f,a.mode,h),d.return=a,a=d),g(a);if(Xg(f))return z(a,d,f,h);if(Ua(f))return ta(a,d,f,h);l&&Zg(a,f);if("undefined"===typeof f&&!k)switch(a.tag){case 1:case 0:throw a=a.type,Error(u(152,a.displayName||a.name||"Component"));}return c(a,d)}}var fh=$g(!0),gh=$g(!1),hh={},ih={current:hh},jh={current:hh},kh={current:hh};function lh(a){if(a===hh)throw Error(u(174));return a}
function mh(a,b){I(kh,b,a);I(jh,a,a);I(ih,hh,a);var c=b.nodeType;switch(c){case 9:case 11:b=(b=b.documentElement)?b.namespaceURI:Qb(null,"");break;default:c=8===c?b.parentNode:b,b=c.namespaceURI||null,c=c.tagName,b=Qb(b,c)}G(ih,a);I(ih,b,a)}function nh(a){G(ih,a);G(jh,a);G(kh,a)}function oh(a){lh(kh.current);var b=lh(ih.current);var c=Qb(b,a.type);b!==c&&(I(jh,a,a),I(ih,c,a))}function ph(a){jh.current===a&&(G(ih,a),G(jh,a))}var M={current:0};
function qh(a){for(var b=a;null!==b;){if(13===b.tag){var c=b.memoizedState;if(null!==c&&(c=c.dehydrated,null===c||c.data===je||c.data===ke))return b}else if(19===b.tag&&void 0!==b.memoizedProps.revealOrder){if(0!==(b.effectTag&64))return b}else if(null!==b.child){b.child.return=b;b=b.child;continue}if(b===a)break;for(;null===b.sibling;){if(null===b.return||b.return===a)return null;b=b.return}b.sibling.return=b.return;b=b.sibling}return null}function rh(a,b){return{responder:a,props:b}}
var sh=Ea.ReactCurrentDispatcher,N=Ea.ReactCurrentBatchConfig,th=0,uh=null,O=null,vh=null,wh=null,P=null,xh=null,yh=0,zh=null,Ah=0,Bh=!1,Ch=null,Gh=0;function Q(){throw Error(u(321));}function Hh(a,b){if(null===b)return!1;for(var c=0;c<b.length&&c<a.length;c++)if(!of(a[c],b[c]))return!1;return!0}
function Ih(a,b,c,d,e,f){th=f;uh=b;vh=null!==a?a.memoizedState:null;sh.current=null===vh?Jh:Kh;b=c(d,e);if(Bh){do Bh=!1,Gh+=1,vh=null!==a?a.memoizedState:null,xh=wh,zh=P=O=null,sh.current=Kh,b=c(d,e);while(Bh);Ch=null;Gh=0}sh.current=Lh;a=uh;a.memoizedState=wh;a.expirationTime=yh;a.updateQueue=zh;a.effectTag|=Ah;a=null!==O&&null!==O.next;th=0;xh=P=wh=vh=O=uh=null;yh=0;zh=null;Ah=0;if(a)throw Error(u(300));return b}
function Mh(){sh.current=Lh;th=0;xh=P=wh=vh=O=uh=null;yh=0;zh=null;Ah=0;Bh=!1;Ch=null;Gh=0}function Nh(){var a={memoizedState:null,baseState:null,queue:null,baseUpdate:null,next:null};null===P?wh=P=a:P=P.next=a;return P}function Oh(){if(null!==xh)P=xh,xh=P.next,O=vh,vh=null!==O?O.next:null;else{if(null===vh)throw Error(u(310));O=vh;var a={memoizedState:O.memoizedState,baseState:O.baseState,queue:O.queue,baseUpdate:O.baseUpdate,next:null};P=null===P?wh=a:P.next=a;vh=O.next}return P}
function Ph(a,b){return"function"===typeof b?b(a):b}
function Qh(a){var b=Oh(),c=b.queue;if(null===c)throw Error(u(311));c.lastRenderedReducer=a;if(0<Gh){var d=c.dispatch;if(null!==Ch){var e=Ch.get(c);if(void 0!==e){Ch.delete(c);var f=b.memoizedState;do f=a(f,e.action),e=e.next;while(null!==e);of(f,b.memoizedState)||(wg=!0);b.memoizedState=f;b.baseUpdate===c.last&&(b.baseState=f);c.lastRenderedState=f;return[f,d]}}return[b.memoizedState,d]}d=c.last;var g=b.baseUpdate;f=b.baseState;null!==g?(null!==d&&(d.next=null),d=g.next):d=null!==d?d.next:null;if(null!==
d){var h=e=null,k=d,l=!1;do{var m=k.expirationTime;m<th?(l||(l=!0,h=g,e=f),m>yh&&(yh=m,Jg(yh))):(Ig(m,k.suspenseConfig),f=k.eagerReducer===a?k.eagerState:a(f,k.action));g=k;k=k.next}while(null!==k&&k!==d);l||(h=g,e=f);of(f,b.memoizedState)||(wg=!0);b.memoizedState=f;b.baseUpdate=h;b.baseState=e;c.lastRenderedState=f}return[b.memoizedState,c.dispatch]}
function Rh(a){var b=Nh();"function"===typeof a&&(a=a());b.memoizedState=b.baseState=a;a=b.queue={last:null,dispatch:null,lastRenderedReducer:Ph,lastRenderedState:a};a=a.dispatch=Sh.bind(null,uh,a);return[b.memoizedState,a]}function Th(a){return Qh(Ph,a)}function Uh(a,b,c,d){a={tag:a,create:b,destroy:c,deps:d,next:null};null===zh?(zh={lastEffect:null},zh.lastEffect=a.next=a):(b=zh.lastEffect,null===b?zh.lastEffect=a.next=a:(c=b.next,b.next=a,a.next=c,zh.lastEffect=a));return a}
function Vh(a,b,c,d){var e=Nh();Ah|=a;e.memoizedState=Uh(b,c,void 0,void 0===d?null:d)}function Wh(a,b,c,d){var e=Oh();d=void 0===d?null:d;var f=void 0;if(null!==O){var g=O.memoizedState;f=g.destroy;if(null!==d&&Hh(d,g.deps)){Uh(0,c,f,d);return}}Ah|=a;e.memoizedState=Uh(b,c,f,d)}function Xh(a,b){return Vh(516,192,a,b)}function Yh(a,b){return Wh(516,192,a,b)}
function Zh(a,b){if("function"===typeof b)return a=a(),b(a),function(){b(null)};if(null!==b&&void 0!==b)return a=a(),b.current=a,function(){b.current=null}}function $h(){}function ai(a,b){Nh().memoizedState=[a,void 0===b?null:b];return a}function bi(a,b){var c=Oh();b=void 0===b?null:b;var d=c.memoizedState;if(null!==d&&null!==b&&Hh(b,d[1]))return d[0];c.memoizedState=[a,b];return a}
function Sh(a,b,c){if(!(25>Gh))throw Error(u(301));var d=a.alternate;if(a===uh||null!==d&&d===uh)if(Bh=!0,a={expirationTime:th,suspenseConfig:null,action:c,eagerReducer:null,eagerState:null,next:null},null===Ch&&(Ch=new Map),c=Ch.get(b),void 0===c)Ch.set(b,a);else{for(b=c;null!==b.next;)b=b.next;b.next=a}else{var e=Pg(),f=Mg.suspense;e=Qg(e,a,f);f={expirationTime:e,suspenseConfig:f,action:c,eagerReducer:null,eagerState:null,next:null};var g=b.last;if(null===g)f.next=f;else{var h=g.next;null!==h&&
(f.next=h);g.next=f}b.last=f;if(0===a.expirationTime&&(null===d||0===d.expirationTime)&&(d=b.lastRenderedReducer,null!==d))try{var k=b.lastRenderedState,l=d(k,c);f.eagerReducer=d;f.eagerState=l;if(of(l,k))return}catch(m){}finally{}Rg(a,e)}}
var Lh={readContext:xg,useCallback:Q,useContext:Q,useEffect:Q,useImperativeHandle:Q,useLayoutEffect:Q,useMemo:Q,useReducer:Q,useRef:Q,useState:Q,useDebugValue:Q,useResponder:Q,useDeferredValue:Q,useTransition:Q},Jh={readContext:xg,useCallback:ai,useContext:xg,useEffect:Xh,useImperativeHandle:function(a,b,c){c=null!==c&&void 0!==c?c.concat([a]):null;return Vh(4,36,Zh.bind(null,b,a),c)},useLayoutEffect:function(a,b){return Vh(4,36,a,b)},useMemo:function(a,b){var c=Nh();b=void 0===b?null:b;a=a();c.memoizedState=
[a,b];return a},useReducer:function(a,b,c){var d=Nh();b=void 0!==c?c(b):b;d.memoizedState=d.baseState=b;a=d.queue={last:null,dispatch:null,lastRenderedReducer:a,lastRenderedState:b};a=a.dispatch=Sh.bind(null,uh,a);return[d.memoizedState,a]},useRef:function(a){var b=Nh();a={current:a};return b.memoizedState=a},useState:Rh,useDebugValue:$h,useResponder:rh,useDeferredValue:function(a,b){var c=Rh(a),d=c[0],e=c[1];Xh(function(){q.unstable_next(function(){var c=N.suspense;N.suspense=void 0===b?null:b;try{e(a)}finally{N.suspense=
c}})},[a,b]);return d},useTransition:function(a){var b=Rh(!1),c=b[0],d=b[1];return[ai(function(b){d(!0);q.unstable_next(function(){var c=N.suspense;N.suspense=void 0===a?null:a;try{d(!1),b()}finally{N.suspense=c}})},[a,c]),c]}},Kh={readContext:xg,useCallback:bi,useContext:xg,useEffect:Yh,useImperativeHandle:function(a,b,c){c=null!==c&&void 0!==c?c.concat([a]):null;return Wh(4,36,Zh.bind(null,b,a),c)},useLayoutEffect:function(a,b){return Wh(4,36,a,b)},useMemo:function(a,b){var c=Oh();b=void 0===b?
null:b;var d=c.memoizedState;if(null!==d&&null!==b&&Hh(b,d[1]))return d[0];a=a();c.memoizedState=[a,b];return a},useReducer:Qh,useRef:function(){return Oh().memoizedState},useState:Th,useDebugValue:$h,useResponder:rh,useDeferredValue:function(a,b){var c=Th(a),d=c[0],e=c[1];Yh(function(){q.unstable_next(function(){var c=N.suspense;N.suspense=void 0===b?null:b;try{e(a)}finally{N.suspense=c}})},[a,b]);return d},useTransition:function(a){var b=Th(!1),c=b[0],d=b[1];return[bi(function(b){d(!0);q.unstable_next(function(){var c=
N.suspense;N.suspense=void 0===a?null:a;try{d(!1),b()}finally{N.suspense=c}})},[a,c]),c]}},ci=null,di=null,ei=!1;function fi(a,b){var c=gi(5,null,null,0);c.elementType="DELETED";c.type="DELETED";c.stateNode=b;c.return=a;c.effectTag=8;null!==a.lastEffect?(a.lastEffect.nextEffect=c,a.lastEffect=c):a.firstEffect=a.lastEffect=c}
function hi(a,b){switch(a.tag){case 5:var c=a.type;b=1!==b.nodeType||c.toLowerCase()!==b.nodeName.toLowerCase()?null:b;return null!==b?(a.stateNode=b,!0):!1;case 6:return b=""===a.pendingProps||3!==b.nodeType?null:b,null!==b?(a.stateNode=b,!0):!1;case 13:return!1;default:return!1}}
function ii(a){if(ei){var b=di;if(b){var c=b;if(!hi(a,b)){b=re(c.nextSibling);if(!b||!hi(a,b)){a.effectTag=a.effectTag&-1025|2;ei=!1;ci=a;return}fi(ci,c)}ci=a;di=re(b.firstChild)}else a.effectTag=a.effectTag&-1025|2,ei=!1,ci=a}}function ji(a){for(a=a.return;null!==a&&5!==a.tag&&3!==a.tag&&13!==a.tag;)a=a.return;ci=a}
function ki(a){if(a!==ci)return!1;if(!ei)return ji(a),ei=!0,!1;var b=a.type;if(5!==a.tag||"head"!==b&&"body"!==b&&!oe(b,a.memoizedProps))for(b=di;b;)fi(a,b),b=re(b.nextSibling);ji(a);if(13===a.tag){a=a.memoizedState;a=null!==a?a.dehydrated:null;if(!a)throw Error(u(317));a:{a=a.nextSibling;for(b=0;a;){if(8===a.nodeType){var c=a.data;if(c===ie){if(0===b){di=re(a.nextSibling);break a}b--}else c!==he&&c!==ke&&c!==je||b++}a=a.nextSibling}di=null}}else di=ci?re(a.stateNode.nextSibling):null;return!0}
function li(){di=ci=null;ei=!1}var mi=Ea.ReactCurrentOwner,wg=!1;function R(a,b,c,d){b.child=null===a?gh(b,null,c,d):fh(b,a.child,c,d)}function ni(a,b,c,d,e){c=c.render;var f=b.ref;vg(b,e);d=Ih(a,b,c,d,f,e);if(null!==a&&!wg)return b.updateQueue=a.updateQueue,b.effectTag&=-517,a.expirationTime<=e&&(a.expirationTime=0),oi(a,b,e);b.effectTag|=1;R(a,b,d,e);return b.child}
function pi(a,b,c,d,e,f){if(null===a){var g=c.type;if("function"===typeof g&&!qi(g)&&void 0===g.defaultProps&&null===c.compare&&void 0===c.defaultProps)return b.tag=15,b.type=g,ri(a,b,g,d,e,f);a=ch(c.type,null,d,null,b.mode,f);a.ref=b.ref;a.return=b;return b.child=a}g=a.child;if(e<f&&(e=g.memoizedProps,c=c.compare,c=null!==c?c:qf,c(e,d)&&a.ref===b.ref))return oi(a,b,f);b.effectTag|=1;a=ah(g,d,f);a.ref=b.ref;a.return=b;return b.child=a}
function ri(a,b,c,d,e,f){return null!==a&&qf(a.memoizedProps,d)&&a.ref===b.ref&&(wg=!1,e<f)?oi(a,b,f):si(a,b,c,d,f)}function ti(a,b){var c=b.ref;if(null===a&&null!==c||null!==a&&a.ref!==c)b.effectTag|=128}function si(a,b,c,d,e){var f=L(c)?Df:J.current;f=Ef(b,f);vg(b,e);c=Ih(a,b,c,d,f,e);if(null!==a&&!wg)return b.updateQueue=a.updateQueue,b.effectTag&=-517,a.expirationTime<=e&&(a.expirationTime=0),oi(a,b,e);b.effectTag|=1;R(a,b,c,e);return b.child}
function ui(a,b,c,d,e){if(L(c)){var f=!0;Jf(b)}else f=!1;vg(b,e);if(null===b.stateNode)null!==a&&(a.alternate=null,b.alternate=null,b.effectTag|=2),Ug(b,c,d,e),Wg(b,c,d,e),d=!0;else if(null===a){var g=b.stateNode,h=b.memoizedProps;g.props=h;var k=g.context,l=c.contextType;"object"===typeof l&&null!==l?l=xg(l):(l=L(c)?Df:J.current,l=Ef(b,l));var m=c.getDerivedStateFromProps,C="function"===typeof m||"function"===typeof g.getSnapshotBeforeUpdate;C||"function"!==typeof g.UNSAFE_componentWillReceiveProps&&
"function"!==typeof g.componentWillReceiveProps||(h!==d||k!==l)&&Vg(b,g,d,l);yg=!1;var y=b.memoizedState;k=g.state=y;var H=b.updateQueue;null!==H&&(Hg(b,H,d,g,e),k=b.memoizedState);h!==d||y!==k||K.current||yg?("function"===typeof m&&(Og(b,c,m,d),k=b.memoizedState),(h=yg||Tg(b,c,h,d,y,k,l))?(C||"function"!==typeof g.UNSAFE_componentWillMount&&"function"!==typeof g.componentWillMount||("function"===typeof g.componentWillMount&&g.componentWillMount(),"function"===typeof g.UNSAFE_componentWillMount&&
g.UNSAFE_componentWillMount()),"function"===typeof g.componentDidMount&&(b.effectTag|=4)):("function"===typeof g.componentDidMount&&(b.effectTag|=4),b.memoizedProps=d,b.memoizedState=k),g.props=d,g.state=k,g.context=l,d=h):("function"===typeof g.componentDidMount&&(b.effectTag|=4),d=!1)}else g=b.stateNode,h=b.memoizedProps,g.props=b.type===b.elementType?h:mg(b.type,h),k=g.context,l=c.contextType,"object"===typeof l&&null!==l?l=xg(l):(l=L(c)?Df:J.current,l=Ef(b,l)),m=c.getDerivedStateFromProps,(C=
"function"===typeof m||"function"===typeof g.getSnapshotBeforeUpdate)||"function"!==typeof g.UNSAFE_componentWillReceiveProps&&"function"!==typeof g.componentWillReceiveProps||(h!==d||k!==l)&&Vg(b,g,d,l),yg=!1,k=b.memoizedState,y=g.state=k,H=b.updateQueue,null!==H&&(Hg(b,H,d,g,e),y=b.memoizedState),h!==d||k!==y||K.current||yg?("function"===typeof m&&(Og(b,c,m,d),y=b.memoizedState),(m=yg||Tg(b,c,h,d,k,y,l))?(C||"function"!==typeof g.UNSAFE_componentWillUpdate&&"function"!==typeof g.componentWillUpdate||
("function"===typeof g.componentWillUpdate&&g.componentWillUpdate(d,y,l),"function"===typeof g.UNSAFE_componentWillUpdate&&g.UNSAFE_componentWillUpdate(d,y,l)),"function"===typeof g.componentDidUpdate&&(b.effectTag|=4),"function"===typeof g.getSnapshotBeforeUpdate&&(b.effectTag|=256)):("function"!==typeof g.componentDidUpdate||h===a.memoizedProps&&k===a.memoizedState||(b.effectTag|=4),"function"!==typeof g.getSnapshotBeforeUpdate||h===a.memoizedProps&&k===a.memoizedState||(b.effectTag|=256),b.memoizedProps=
d,b.memoizedState=y),g.props=d,g.state=y,g.context=l,d=m):("function"!==typeof g.componentDidUpdate||h===a.memoizedProps&&k===a.memoizedState||(b.effectTag|=4),"function"!==typeof g.getSnapshotBeforeUpdate||h===a.memoizedProps&&k===a.memoizedState||(b.effectTag|=256),d=!1);return vi(a,b,c,d,f,e)}
function vi(a,b,c,d,e,f){ti(a,b);var g=0!==(b.effectTag&64);if(!d&&!g)return e&&Kf(b,c,!1),oi(a,b,f);d=b.stateNode;mi.current=b;var h=g&&"function"!==typeof c.getDerivedStateFromError?null:d.render();b.effectTag|=1;null!==a&&g?(b.child=fh(b,a.child,null,f),b.child=fh(b,null,h,f)):R(a,b,h,f);b.memoizedState=d.state;e&&Kf(b,c,!0);return b.child}function wi(a){var b=a.stateNode;b.pendingContext?Hf(a,b.pendingContext,b.pendingContext!==b.context):b.context&&Hf(a,b.context,!1);mh(a,b.containerInfo)}
var xi={dehydrated:null,retryTime:0};
function yi(a,b,c){var d=b.mode,e=b.pendingProps,f=M.current,g=!1,h;(h=0!==(b.effectTag&64))||(h=0!==(f&2)&&(null===a||null!==a.memoizedState));h?(g=!0,b.effectTag&=-65):null!==a&&null===a.memoizedState||void 0===e.fallback||!0===e.unstable_avoidThisFallback||(f|=1);I(M,f&1,b);if(null===a){void 0!==e.fallback&&ii(b);if(g){g=e.fallback;e=eh(null,d,0,null);e.return=b;if(0===(b.mode&2))for(a=null!==b.memoizedState?b.child.child:b.child,e.child=a;null!==a;)a.return=e,a=a.sibling;c=eh(g,d,c,null);c.return=
b;e.sibling=c;b.memoizedState=xi;b.child=e;return c}d=e.children;b.memoizedState=null;return b.child=gh(b,null,d,c)}if(null!==a.memoizedState){a=a.child;d=a.sibling;if(g){e=e.fallback;c=ah(a,a.pendingProps,0);c.return=b;if(0===(b.mode&2)&&(g=null!==b.memoizedState?b.child.child:b.child,g!==a.child))for(c.child=g;null!==g;)g.return=c,g=g.sibling;d=ah(d,e,d.expirationTime);d.return=b;c.sibling=d;c.childExpirationTime=0;b.memoizedState=xi;b.child=c;return d}c=fh(b,a.child,e.children,c);b.memoizedState=
null;return b.child=c}a=a.child;if(g){g=e.fallback;e=eh(null,d,0,null);e.return=b;e.child=a;null!==a&&(a.return=e);if(0===(b.mode&2))for(a=null!==b.memoizedState?b.child.child:b.child,e.child=a;null!==a;)a.return=e,a=a.sibling;c=eh(g,d,c,null);c.return=b;e.sibling=c;c.effectTag|=2;e.childExpirationTime=0;b.memoizedState=xi;b.child=e;return c}b.memoizedState=null;return b.child=fh(b,a,e.children,c)}
function zi(a,b){a.expirationTime<b&&(a.expirationTime=b);var c=a.alternate;null!==c&&c.expirationTime<b&&(c.expirationTime=b);ug(a.return,b)}function Ai(a,b,c,d,e,f){var g=a.memoizedState;null===g?a.memoizedState={isBackwards:b,rendering:null,last:d,tail:c,tailExpiration:0,tailMode:e,lastEffect:f}:(g.isBackwards=b,g.rendering=null,g.last=d,g.tail=c,g.tailExpiration=0,g.tailMode=e,g.lastEffect=f)}
function Bi(a,b,c){var d=b.pendingProps,e=d.revealOrder,f=d.tail;R(a,b,d.children,c);d=M.current;if(0!==(d&2))d=d&1|2,b.effectTag|=64;else{if(null!==a&&0!==(a.effectTag&64))a:for(a=b.child;null!==a;){if(13===a.tag)null!==a.memoizedState&&zi(a,c);else if(19===a.tag)zi(a,c);else if(null!==a.child){a.child.return=a;a=a.child;continue}if(a===b)break a;for(;null===a.sibling;){if(null===a.return||a.return===b)break a;a=a.return}a.sibling.return=a.return;a=a.sibling}d&=1}I(M,d,b);if(0===(b.mode&2))b.memoizedState=
null;else switch(e){case "forwards":c=b.child;for(e=null;null!==c;)a=c.alternate,null!==a&&null===qh(a)&&(e=c),c=c.sibling;c=e;null===c?(e=b.child,b.child=null):(e=c.sibling,c.sibling=null);Ai(b,!1,e,c,f,b.lastEffect);break;case "backwards":c=null;e=b.child;for(b.child=null;null!==e;){a=e.alternate;if(null!==a&&null===qh(a)){b.child=e;break}a=e.sibling;e.sibling=c;c=e;e=a}Ai(b,!0,c,null,f,b.lastEffect);break;case "together":Ai(b,!1,null,null,void 0,b.lastEffect);break;default:b.memoizedState=null}return b.child}
function oi(a,b,c){null!==a&&(b.dependencies=a.dependencies);var d=b.expirationTime;0!==d&&Jg(d);if(b.childExpirationTime<c)return null;if(null!==a&&b.child!==a.child)throw Error(u(153));if(null!==b.child){a=b.child;c=ah(a,a.pendingProps,a.expirationTime);b.child=c;for(c.return=b;null!==a.sibling;)a=a.sibling,c=c.sibling=ah(a,a.pendingProps,a.expirationTime),c.return=b;c.sibling=null}return b.child}function Ci(a){a.effectTag|=4}var Hi,Ii,Ji,Ki;
Hi=function(a,b){for(var c=b.child;null!==c;){if(5===c.tag||6===c.tag)a.appendChild(c.stateNode);else if(4!==c.tag&&null!==c.child){c.child.return=c;c=c.child;continue}if(c===b)break;for(;null===c.sibling;){if(null===c.return||c.return===b)return;c=c.return}c.sibling.return=c.return;c=c.sibling}};Ii=function(){};
Ji=function(a,b,c,d,e){var f=a.memoizedProps;if(f!==d){var g=b.stateNode;lh(ih.current);a=null;switch(c){case "input":f=Ab(g,f);d=Ab(g,d);a=[];break;case "option":f=Ib(g,f);d=Ib(g,d);a=[];break;case "select":f=n({},f,{value:void 0});d=n({},d,{value:void 0});a=[];break;case "textarea":f=Kb(g,f);d=Kb(g,d);a=[];break;default:"function"!==typeof f.onClick&&"function"===typeof d.onClick&&(g.onclick=ae)}Yd(c,d);var h,k;c=null;for(h in f)if(!d.hasOwnProperty(h)&&f.hasOwnProperty(h)&&null!=f[h])if("style"===
h)for(k in g=f[h],g)g.hasOwnProperty(k)&&(c||(c={}),c[k]="");else"dangerouslySetInnerHTML"!==h&&"children"!==h&&"suppressContentEditableWarning"!==h&&"suppressHydrationWarning"!==h&&"autoFocus"!==h&&(ia.hasOwnProperty(h)?a||(a=[]):(a=a||[]).push(h,null));for(h in d){var l=d[h];g=null!=f?f[h]:void 0;if(d.hasOwnProperty(h)&&l!==g&&(null!=l||null!=g))if("style"===h)if(g){for(k in g)!g.hasOwnProperty(k)||l&&l.hasOwnProperty(k)||(c||(c={}),c[k]="");for(k in l)l.hasOwnProperty(k)&&g[k]!==l[k]&&(c||(c={}),
c[k]=l[k])}else c||(a||(a=[]),a.push(h,c)),c=l;else"dangerouslySetInnerHTML"===h?(l=l?l.__html:void 0,g=g?g.__html:void 0,null!=l&&g!==l&&(a=a||[]).push(h,""+l)):"children"===h?g===l||"string"!==typeof l&&"number"!==typeof l||(a=a||[]).push(h,""+l):"suppressContentEditableWarning"!==h&&"suppressHydrationWarning"!==h&&(ia.hasOwnProperty(h)?(null!=l&&$d(e,h),a||g===l||(a=[])):(a=a||[]).push(h,l))}c&&(a=a||[]).push("style",c);e=a;(b.updateQueue=e)&&Ci(b)}};Ki=function(a,b,c,d){c!==d&&Ci(b)};
function Li(a,b){switch(a.tailMode){case "hidden":b=a.tail;for(var c=null;null!==b;)null!==b.alternate&&(c=b),b=b.sibling;null===c?a.tail=null:c.sibling=null;break;case "collapsed":c=a.tail;for(var d=null;null!==c;)null!==c.alternate&&(d=c),c=c.sibling;null===d?b||null===a.tail?a.tail=null:a.tail.sibling=null:d.sibling=null}}
function Mi(a){switch(a.tag){case 1:L(a.type)&&Ff(a);var b=a.effectTag;return b&4096?(a.effectTag=b&-4097|64,a):null;case 3:nh(a);Gf(a);b=a.effectTag;if(0!==(b&64))throw Error(u(285));a.effectTag=b&-4097|64;return a;case 5:return ph(a),null;case 13:return G(M,a),b=a.effectTag,b&4096?(a.effectTag=b&-4097|64,a):null;case 19:return G(M,a),null;case 4:return nh(a),null;case 10:return tg(a),null;default:return null}}function Ni(a,b){return{value:a,source:b,stack:Xa(b)}}
var Oi="function"===typeof WeakSet?WeakSet:Set;function Pi(a,b){var c=b.source,d=b.stack;null===d&&null!==c&&(d=Xa(c));null!==c&&Wa(c.type);b=b.value;null!==a&&1===a.tag&&Wa(a.type);try{console.error(b)}catch(e){setTimeout(function(){throw e;})}}function Qi(a,b){try{b.props=a.memoizedProps,b.state=a.memoizedState,b.componentWillUnmount()}catch(c){Ri(a,c)}}function Si(a){var b=a.ref;if(null!==b)if("function"===typeof b)try{b(null)}catch(c){Ri(a,c)}else b.current=null}
function Ti(a,b){switch(b.tag){case 0:case 11:case 15:Ui(2,0,b);break;case 1:if(b.effectTag&256&&null!==a){var c=a.memoizedProps,d=a.memoizedState;a=b.stateNode;b=a.getSnapshotBeforeUpdate(b.elementType===b.type?c:mg(b.type,c),d);a.__reactInternalSnapshotBeforeUpdate=b}break;case 3:case 5:case 6:case 4:case 17:break;default:throw Error(u(163));}}
function Ui(a,b,c){c=c.updateQueue;c=null!==c?c.lastEffect:null;if(null!==c){var d=c=c.next;do{if(0!==(d.tag&a)){var e=d.destroy;d.destroy=void 0;void 0!==e&&e()}0!==(d.tag&b)&&(e=d.create,d.destroy=e());d=d.next}while(d!==c)}}
function Vi(a,b,c){"function"===typeof Wi&&Wi(b);switch(b.tag){case 0:case 11:case 14:case 15:a=b.updateQueue;if(null!==a&&(a=a.lastEffect,null!==a)){var d=a.next;fg(97<c?97:c,function(){var a=d;do{var c=a.destroy;if(void 0!==c){var g=b;try{c()}catch(h){Ri(g,h)}}a=a.next}while(a!==d)})}break;case 1:Si(b);c=b.stateNode;"function"===typeof c.componentWillUnmount&&Qi(b,c);break;case 5:Si(b);break;case 4:Xi(a,b,c)}}
function Yi(a){var b=a.alternate;a.return=null;a.child=null;a.memoizedState=null;a.updateQueue=null;a.dependencies=null;a.alternate=null;a.firstEffect=null;a.lastEffect=null;a.pendingProps=null;a.memoizedProps=null;null!==b&&Yi(b)}function Zi(a){return 5===a.tag||3===a.tag||4===a.tag}
function $i(a){a:{for(var b=a.return;null!==b;){if(Zi(b)){var c=b;break a}b=b.return}throw Error(u(160));}b=c.stateNode;switch(c.tag){case 5:var d=!1;break;case 3:b=b.containerInfo;d=!0;break;case 4:b=b.containerInfo;d=!0;break;default:throw Error(u(161));}c.effectTag&16&&(Tb(b,""),c.effectTag&=-17);a:b:for(c=a;;){for(;null===c.sibling;){if(null===c.return||Zi(c.return)){c=null;break a}c=c.return}c.sibling.return=c.return;for(c=c.sibling;5!==c.tag&&6!==c.tag&&18!==c.tag;){if(c.effectTag&2)continue b;
if(null===c.child||4===c.tag)continue b;else c.child.return=c,c=c.child}if(!(c.effectTag&2)){c=c.stateNode;break a}}for(var e=a;;){var f=5===e.tag||6===e.tag;if(f){var g=f?e.stateNode:e.stateNode.instance;if(c)if(d){f=b;var h=g;g=c;8===f.nodeType?f.parentNode.insertBefore(h,g):f.insertBefore(h,g)}else b.insertBefore(g,c);else d?(h=b,8===h.nodeType?(f=h.parentNode,f.insertBefore(g,h)):(f=h,f.appendChild(g)),h=h._reactRootContainer,null!==h&&void 0!==h||null!==f.onclick||(f.onclick=ae)):b.appendChild(g)}else if(4!==
e.tag&&null!==e.child){e.child.return=e;e=e.child;continue}if(e===a)break;for(;null===e.sibling;){if(null===e.return||e.return===a)return;e=e.return}e.sibling.return=e.return;e=e.sibling}}
function Xi(a,b,c){for(var d=b,e=!1,f,g;;){if(!e){e=d.return;a:for(;;){if(null===e)throw Error(u(160));f=e.stateNode;switch(e.tag){case 5:g=!1;break a;case 3:f=f.containerInfo;g=!0;break a;case 4:f=f.containerInfo;g=!0;break a}e=e.return}e=!0}if(5===d.tag||6===d.tag){a:for(var h=a,k=d,l=c,m=k;;)if(Vi(h,m,l),null!==m.child&&4!==m.tag)m.child.return=m,m=m.child;else{if(m===k)break;for(;null===m.sibling;){if(null===m.return||m.return===k)break a;m=m.return}m.sibling.return=m.return;m=m.sibling}g?(h=
f,k=d.stateNode,8===h.nodeType?h.parentNode.removeChild(k):h.removeChild(k)):f.removeChild(d.stateNode)}else if(4===d.tag){if(null!==d.child){f=d.stateNode.containerInfo;g=!0;d.child.return=d;d=d.child;continue}}else if(Vi(a,d,c),null!==d.child){d.child.return=d;d=d.child;continue}if(d===b)break;for(;null===d.sibling;){if(null===d.return||d.return===b)return;d=d.return;4===d.tag&&(e=!1)}d.sibling.return=d.return;d=d.sibling}}
function aj(a,b){switch(b.tag){case 0:case 11:case 14:case 15:Ui(4,8,b);break;case 1:break;case 5:var c=b.stateNode;if(null!=c){var d=b.memoizedProps,e=null!==a?a.memoizedProps:d;a=b.type;var f=b.updateQueue;b.updateQueue=null;if(null!==f){c[ve]=d;"input"===a&&"radio"===d.type&&null!=d.name&&Cb(c,d);Zd(a,e);b=Zd(a,d);for(e=0;e<f.length;e+=2){var g=f[e],h=f[e+1];"style"===g?Wd(c,h):"dangerouslySetInnerHTML"===g?Sb(c,h):"children"===g?Tb(c,h):vb(c,g,h,b)}switch(a){case "input":Eb(c,d);break;case "textarea":Mb(c,
d);break;case "select":b=c._wrapperState.wasMultiple,c._wrapperState.wasMultiple=!!d.multiple,a=d.value,null!=a?Jb(c,!!d.multiple,a,!1):b!==!!d.multiple&&(null!=d.defaultValue?Jb(c,!!d.multiple,d.defaultValue,!0):Jb(c,!!d.multiple,d.multiple?[]:"",!1))}}}break;case 6:if(null===b.stateNode)throw Error(u(162));b.stateNode.nodeValue=b.memoizedProps;break;case 3:b=b.stateNode;b.hydrate&&(b.hydrate=!1,Lc(b.containerInfo));break;case 12:break;case 13:c=b;null===b.memoizedState?d=!1:(d=!0,c=b.child,bj=cg());
if(null!==c)a:for(a=c;;){if(5===a.tag)f=a.stateNode,d?(f=f.style,"function"===typeof f.setProperty?f.setProperty("display","none","important"):f.display="none"):(f=a.stateNode,e=a.memoizedProps.style,e=void 0!==e&&null!==e&&e.hasOwnProperty("display")?e.display:null,f.style.display=Vd("display",e));else if(6===a.tag)a.stateNode.nodeValue=d?"":a.memoizedProps;else if(13===a.tag&&null!==a.memoizedState&&null===a.memoizedState.dehydrated){f=a.child.sibling;f.return=a;a=f;continue}else if(null!==a.child){a.child.return=
a;a=a.child;continue}if(a===c)break a;for(;null===a.sibling;){if(null===a.return||a.return===c)break a;a=a.return}a.sibling.return=a.return;a=a.sibling}cj(b);break;case 19:cj(b);break;case 17:break;case 20:break;case 21:break;default:throw Error(u(163));}}function cj(a){var b=a.updateQueue;if(null!==b){a.updateQueue=null;var c=a.stateNode;null===c&&(c=a.stateNode=new Oi);b.forEach(function(b){var d=dj.bind(null,a,b);c.has(b)||(c.add(b),b.then(d,d))})}}var ej="function"===typeof WeakMap?WeakMap:Map;
function fj(a,b,c){c=Bg(c,null);c.tag=3;c.payload={element:null};var d=b.value;c.callback=function(){gj||(gj=!0,hj=d);Pi(a,b)};return c}
function ij(a,b,c){c=Bg(c,null);c.tag=3;var d=a.type.getDerivedStateFromError;if("function"===typeof d){var e=b.value;c.payload=function(){Pi(a,b);return d(e)}}var f=a.stateNode;null!==f&&"function"===typeof f.componentDidCatch&&(c.callback=function(){"function"!==typeof d&&(null===jj?jj=new Set([this]):jj.add(this),Pi(a,b));var c=b.stack;this.componentDidCatch(b.value,{componentStack:null!==c?c:""})});return c}
var kj=Math.ceil,lj=Ea.ReactCurrentDispatcher,mj=Ea.ReactCurrentOwner,S=0,nj=8,oj=16,pj=32,qj=0,rj=1,sj=2,tj=3,uj=4,vj=5,T=S,U=null,V=null,W=0,X=qj,wj=null,xj=1073741823,yj=1073741823,zj=null,Aj=0,Bj=!1,bj=0,Cj=500,Y=null,gj=!1,hj=null,jj=null,Dj=!1,Ej=null,Fj=90,Gj=null,Hj=0,Ij=null,Jj=0;function Pg(){return(T&(oj|pj))!==S?1073741821-(cg()/10|0):0!==Jj?Jj:Jj=1073741821-(cg()/10|0)}
function Qg(a,b,c){b=b.mode;if(0===(b&2))return 1073741823;var d=dg();if(0===(b&4))return 99===d?1073741823:1073741822;if((T&oj)!==S)return W;if(null!==c)a=lg(a,c.timeoutMs|0||5E3,250);else switch(d){case 99:a=1073741823;break;case 98:a=lg(a,150,100);break;case 97:case 96:a=lg(a,5E3,250);break;case 95:a=2;break;default:throw Error(u(326));}null!==U&&a===W&&--a;return a}
function Rg(a,b){if(50<Hj)throw Hj=0,Ij=null,Error(u(185));a=Kj(a,b);if(null!==a){var c=dg();1073741823===b?(T&nj)!==S&&(T&(oj|pj))===S?Lj(a):(Z(a),T===S&&jg()):Z(a);(T&4)===S||98!==c&&99!==c||(null===Gj?Gj=new Map([[a,b]]):(c=Gj.get(a),(void 0===c||c>b)&&Gj.set(a,b)))}}
function Kj(a,b){a.expirationTime<b&&(a.expirationTime=b);var c=a.alternate;null!==c&&c.expirationTime<b&&(c.expirationTime=b);var d=a.return,e=null;if(null===d&&3===a.tag)e=a.stateNode;else for(;null!==d;){c=d.alternate;d.childExpirationTime<b&&(d.childExpirationTime=b);null!==c&&c.childExpirationTime<b&&(c.childExpirationTime=b);if(null===d.return&&3===d.tag){e=d.stateNode;break}d=d.return}null!==e&&(U===e&&(Jg(b),X===uj&&Mj(e,W)),Nj(e,b));return e}
function Oj(a){var b=a.lastExpiredTime;if(0!==b)return b;b=a.firstPendingTime;if(!Pj(a,b))return b;b=a.lastPingedTime;a=a.nextKnownPendingLevel;return b>a?b:a}
function Z(a){if(0!==a.lastExpiredTime)a.callbackExpirationTime=1073741823,a.callbackPriority=99,a.callbackNode=hg(Lj.bind(null,a));else{var b=Oj(a),c=a.callbackNode;if(0===b)null!==c&&(a.callbackNode=null,a.callbackExpirationTime=0,a.callbackPriority=90);else{var d=Pg();1073741823===b?d=99:1===b||2===b?d=95:(d=10*(1073741821-b)-10*(1073741821-d),d=0>=d?99:250>=d?98:5250>=d?97:95);if(null!==c){var e=a.callbackPriority;if(a.callbackExpirationTime===b&&e>=d)return;c!==Xf&&Nf(c)}a.callbackExpirationTime=
b;a.callbackPriority=d;b=1073741823===b?hg(Lj.bind(null,a)):gg(d,Qj.bind(null,a),{timeout:10*(1073741821-b)-cg()});a.callbackNode=b}}}
function Qj(a,b){Jj=0;if(b)return b=Pg(),Rj(a,b),Z(a),null;var c=Oj(a);if(0!==c){b=a.callbackNode;if((T&(oj|pj))!==S)throw Error(u(327));Sj();a===U&&c===W||Tj(a,c);if(null!==V){var d=T;T|=oj;var e=Uj(a);do try{Vj();break}catch(h){Wj(a,h)}while(1);rg();T=d;lj.current=e;if(X===rj)throw b=wj,Tj(a,c),Mj(a,c),Z(a),b;if(null===V)switch(e=a.finishedWork=a.current.alternate,a.finishedExpirationTime=c,d=X,U=null,d){case qj:case rj:throw Error(u(345));case sj:Rj(a,2<c?2:c);break;case tj:Mj(a,c);d=a.lastSuspendedTime;
c===d&&(a.nextKnownPendingLevel=Xj(e));if(1073741823===xj&&(e=bj+Cj-cg(),10<e)){if(Bj){var f=a.lastPingedTime;if(0===f||f>=c){a.lastPingedTime=c;Tj(a,c);break}}f=Oj(a);if(0!==f&&f!==c)break;if(0!==d&&d!==c){a.lastPingedTime=d;break}a.timeoutHandle=pe(Yj.bind(null,a),e);break}Yj(a);break;case uj:Mj(a,c);d=a.lastSuspendedTime;c===d&&(a.nextKnownPendingLevel=Xj(e));if(Bj&&(e=a.lastPingedTime,0===e||e>=c)){a.lastPingedTime=c;Tj(a,c);break}e=Oj(a);if(0!==e&&e!==c)break;if(0!==d&&d!==c){a.lastPingedTime=
d;break}1073741823!==yj?d=10*(1073741821-yj)-cg():1073741823===xj?d=0:(d=10*(1073741821-xj)-5E3,e=cg(),c=10*(1073741821-c)-e,d=e-d,0>d&&(d=0),d=(120>d?120:480>d?480:1080>d?1080:1920>d?1920:3E3>d?3E3:4320>d?4320:1960*kj(d/1960))-d,c<d&&(d=c));if(10<d){a.timeoutHandle=pe(Yj.bind(null,a),d);break}Yj(a);break;case vj:if(1073741823!==xj&&null!==zj){f=xj;var g=zj;d=g.busyMinDurationMs|0;0>=d?d=0:(e=g.busyDelayMs|0,f=cg()-(10*(1073741821-f)-(g.timeoutMs|0||5E3)),d=f<=e?0:e+d-f);if(10<d){Mj(a,c);a.timeoutHandle=
pe(Yj.bind(null,a),d);break}}Yj(a);break;default:throw Error(u(329));}Z(a);if(a.callbackNode===b)return Qj.bind(null,a)}}return null}
function Lj(a){var b=a.lastExpiredTime;b=0!==b?b:1073741823;if(a.finishedExpirationTime===b)Yj(a);else{if((T&(oj|pj))!==S)throw Error(u(327));Sj();a===U&&b===W||Tj(a,b);if(null!==V){var c=T;T|=oj;var d=Uj(a);do try{Zj();break}catch(e){Wj(a,e)}while(1);rg();T=c;lj.current=d;if(X===rj)throw c=wj,Tj(a,b),Mj(a,b),Z(a),c;if(null!==V)throw Error(u(261));a.finishedWork=a.current.alternate;a.finishedExpirationTime=b;U=null;Yj(a);Z(a)}}return null}
function ak(){if(null!==Gj){var a=Gj;Gj=null;a.forEach(function(a,c){Rj(c,a);Z(c)});jg()}}function bk(a,b){var c=T;T|=1;try{return a(b)}finally{T=c,T===S&&jg()}}function ck(a,b){var c=T;T&=-2;T|=nj;try{return a(b)}finally{T=c,T===S&&jg()}}
function Tj(a,b){a.finishedWork=null;a.finishedExpirationTime=0;var c=a.timeoutHandle;-1!==c&&(a.timeoutHandle=-1,qe(c));if(null!==V)for(c=V.return;null!==c;){var d=c;switch(d.tag){case 1:var e=d.type.childContextTypes;null!==e&&void 0!==e&&Ff(d);break;case 3:nh(d);Gf(d);break;case 5:ph(d);break;case 4:nh(d);break;case 13:G(M,d);break;case 19:G(M,d);break;case 10:tg(d)}c=c.return}U=a;V=ah(a.current,null,b);W=b;X=qj;wj=null;yj=xj=1073741823;zj=null;Aj=0;Bj=!1}
function Wj(a,b){do{try{rg();Mh();if(null===V||null===V.return)return X=rj,wj=b,null;a:{var c=a,d=V.return,e=V,f=b;b=W;e.effectTag|=2048;e.firstEffect=e.lastEffect=null;if(null!==f&&"object"===typeof f&&"function"===typeof f.then){var g=f,h=0!==(M.current&1),k=d;do{var l;if(l=13===k.tag){var m=k.memoizedState;if(null!==m)l=null!==m.dehydrated?!0:!1;else{var C=k.memoizedProps;l=void 0===C.fallback?!1:!0!==C.unstable_avoidThisFallback?!0:h?!1:!0}}if(l){var y=k.updateQueue;if(null===y){var H=new Set;
H.add(g);k.updateQueue=H}else y.add(g);if(0===(k.mode&2)){k.effectTag|=64;e.effectTag&=-2981;if(1===e.tag)if(null===e.alternate)e.tag=17;else{var z=Bg(1073741823,null);z.tag=2;Dg(e,z)}e.expirationTime=1073741823;break a}f=void 0;e=b;var ta=c.pingCache;null===ta?(ta=c.pingCache=new ej,f=new Set,ta.set(g,f)):(f=ta.get(g),void 0===f&&(f=new Set,ta.set(g,f)));if(!f.has(e)){f.add(e);var r=dk.bind(null,c,g,e);g.then(r,r)}k.effectTag|=4096;k.expirationTime=b;break a}k=k.return}while(null!==k);f=Error((Wa(e.type)||
"A React component")+" suspended while rendering, but no fallback UI was specified.\n\nAdd a <Suspense fallback=...> component higher in the tree to provide a loading indicator or placeholder to display."+Xa(e))}X!==vj&&(X=sj);f=Ni(f,e);k=d;do{switch(k.tag){case 3:g=f;k.effectTag|=4096;k.expirationTime=b;var x=fj(k,g,b);Eg(k,x);break a;case 1:g=f;var A=k.type,p=k.stateNode;if(0===(k.effectTag&64)&&("function"===typeof A.getDerivedStateFromError||null!==p&&"function"===typeof p.componentDidCatch&&
(null===jj||!jj.has(p)))){k.effectTag|=4096;k.expirationTime=b;var t=ij(k,g,b);Eg(k,t);break a}}k=k.return}while(null!==k)}V=ek(V)}catch(v){b=v;continue}break}while(1)}function Uj(){var a=lj.current;lj.current=Lh;return null===a?Lh:a}function Ig(a,b){a<xj&&2<a&&(xj=a);null!==b&&a<yj&&2<a&&(yj=a,zj=b)}function Jg(a){a>Aj&&(Aj=a)}function Zj(){for(;null!==V;)V=fk(V)}function Vj(){for(;null!==V&&!Of();)V=fk(V)}
function fk(a){var b=gk(a.alternate,a,W);a.memoizedProps=a.pendingProps;null===b&&(b=ek(a));mj.current=null;return b}
function ek(a){V=a;do{var b=V.alternate;a=V.return;if(0===(V.effectTag&2048)){a:{var c=b;b=V;var d=W;var e=b.pendingProps;switch(b.tag){case 2:break;case 16:break;case 15:case 0:break;case 1:L(b.type)&&Ff(b);break;case 3:nh(b);Gf(b);e=b.stateNode;e.pendingContext&&(e.context=e.pendingContext,e.pendingContext=null);(null===c||null===c.child)&&ki(b)&&Ci(b);Ii(b);break;case 5:ph(b);d=lh(kh.current);var f=b.type;if(null!==c&&null!=b.stateNode)Ji(c,b,f,e,d),c.ref!==b.ref&&(b.effectTag|=128);else if(e){var g=
lh(ih.current);if(ki(b)){e=b;var h=e.stateNode;c=e.type;var k=e.memoizedProps,l=d;h[ue]=e;h[ve]=k;f=void 0;d=h;switch(c){case "iframe":case "object":case "embed":F("load",d);break;case "video":case "audio":for(h=0;h<dc.length;h++)F(dc[h],d);break;case "source":F("error",d);break;case "img":case "image":case "link":F("error",d);F("load",d);break;case "form":F("reset",d);F("submit",d);break;case "details":F("toggle",d);break;case "input":Bb(d,k);F("invalid",d);$d(l,"onChange");break;case "select":d._wrapperState=
{wasMultiple:!!k.multiple};F("invalid",d);$d(l,"onChange");break;case "textarea":Lb(d,k),F("invalid",d),$d(l,"onChange")}Yd(c,k);h=null;for(f in k)k.hasOwnProperty(f)&&(g=k[f],"children"===f?"string"===typeof g?d.textContent!==g&&(h=["children",g]):"number"===typeof g&&d.textContent!==""+g&&(h=["children",""+g]):ia.hasOwnProperty(f)&&null!=g&&$d(l,f));switch(c){case "input":yb(d);Gb(d,k,!0);break;case "textarea":yb(d);Nb(d,k);break;case "select":case "option":break;default:"function"===typeof k.onClick&&
(d.onclick=ae)}f=h;e.updateQueue=f;e=null!==f?!0:!1;e&&Ci(b)}else{c=b;l=f;k=e;h=9===d.nodeType?d:d.ownerDocument;g===Ob.html&&(g=Pb(l));g===Ob.html?"script"===l?(k=h.createElement("div"),k.innerHTML="<script>\x3c/script>",h=k.removeChild(k.firstChild)):"string"===typeof k.is?h=h.createElement(l,{is:k.is}):(h=h.createElement(l),"select"===l&&(l=h,k.multiple?l.multiple=!0:k.size&&(l.size=k.size))):h=h.createElementNS(g,l);k=h;k[ue]=c;k[ve]=e;Hi(k,b,!1,!1);b.stateNode=k;l=f;c=e;var m=d,C=Zd(l,c);switch(l){case "iframe":case "object":case "embed":F("load",
k);d=c;break;case "video":case "audio":for(d=0;d<dc.length;d++)F(dc[d],k);d=c;break;case "source":F("error",k);d=c;break;case "img":case "image":case "link":F("error",k);F("load",k);d=c;break;case "form":F("reset",k);F("submit",k);d=c;break;case "details":F("toggle",k);d=c;break;case "input":Bb(k,c);d=Ab(k,c);F("invalid",k);$d(m,"onChange");break;case "option":d=Ib(k,c);break;case "select":k._wrapperState={wasMultiple:!!c.multiple};d=n({},c,{value:void 0});F("invalid",k);$d(m,"onChange");break;case "textarea":Lb(k,
c);d=Kb(k,c);F("invalid",k);$d(m,"onChange");break;default:d=c}Yd(l,d);h=void 0;g=l;var y=k,H=d;for(h in H)if(H.hasOwnProperty(h)){var z=H[h];"style"===h?Wd(y,z):"dangerouslySetInnerHTML"===h?(z=z?z.__html:void 0,null!=z&&Sb(y,z)):"children"===h?"string"===typeof z?("textarea"!==g||""!==z)&&Tb(y,z):"number"===typeof z&&Tb(y,""+z):"suppressContentEditableWarning"!==h&&"suppressHydrationWarning"!==h&&"autoFocus"!==h&&(ia.hasOwnProperty(h)?null!=z&&$d(m,h):null!=z&&vb(y,h,z,C))}switch(l){case "input":yb(k);
Gb(k,c,!1);break;case "textarea":yb(k);Nb(k,c);break;case "option":null!=c.value&&k.setAttribute("value",""+ub(c.value));break;case "select":d=k;d.multiple=!!c.multiple;k=c.value;null!=k?Jb(d,!!c.multiple,k,!1):null!=c.defaultValue&&Jb(d,!!c.multiple,c.defaultValue,!0);break;default:"function"===typeof d.onClick&&(k.onclick=ae)}(e=ne(f,e))&&Ci(b)}null!==b.ref&&(b.effectTag|=128)}else if(null===b.stateNode)throw Error(u(166));break;case 6:if(c&&null!=b.stateNode)Ki(c,b,c.memoizedProps,e);else{if("string"!==
typeof e&&null===b.stateNode)throw Error(u(166));d=lh(kh.current);lh(ih.current);ki(b)?(e=b,f=e.stateNode,d=e.memoizedProps,f[ue]=e,(e=f.nodeValue!==d)&&Ci(b)):(f=b,e=(9===d.nodeType?d:d.ownerDocument).createTextNode(e),e[ue]=f,b.stateNode=e)}break;case 11:break;case 13:G(M,b);e=b.memoizedState;if(0!==(b.effectTag&64)){b.expirationTime=d;break a}e=null!==e;f=!1;null===c?void 0!==b.memoizedProps.fallback&&ki(b):(d=c.memoizedState,f=null!==d,e||null===d||(d=c.child.sibling,null!==d&&(k=b.firstEffect,
null!==k?(b.firstEffect=d,d.nextEffect=k):(b.firstEffect=b.lastEffect=d,d.nextEffect=null),d.effectTag=8)));if(e&&!f&&0!==(b.mode&2))if(null===c&&!0!==b.memoizedProps.unstable_avoidThisFallback||0!==(M.current&1))X===qj&&(X=tj);else{if(X===qj||X===tj)X=uj;0!==Aj&&null!==U&&(Mj(U,W),Nj(U,Aj))}if(e||f)b.effectTag|=4;break;case 7:break;case 8:break;case 12:break;case 4:nh(b);Ii(b);break;case 10:tg(b);break;case 9:break;case 14:break;case 17:L(b.type)&&Ff(b);break;case 19:G(M,b);e=b.memoizedState;if(null===
e)break;f=0!==(b.effectTag&64);k=e.rendering;if(null===k)if(f)Li(e,!1);else{if(X!==qj||null!==c&&0!==(c.effectTag&64))for(c=b.child;null!==c;){k=qh(c);if(null!==k){b.effectTag|=64;Li(e,!1);f=k.updateQueue;null!==f&&(b.updateQueue=f,b.effectTag|=4);null===e.lastEffect&&(b.firstEffect=null);b.lastEffect=e.lastEffect;e=d;for(f=b.child;null!==f;)d=f,c=e,d.effectTag&=2,d.nextEffect=null,d.firstEffect=null,d.lastEffect=null,k=d.alternate,null===k?(d.childExpirationTime=0,d.expirationTime=c,d.child=null,
d.memoizedProps=null,d.memoizedState=null,d.updateQueue=null,d.dependencies=null):(d.childExpirationTime=k.childExpirationTime,d.expirationTime=k.expirationTime,d.child=k.child,d.memoizedProps=k.memoizedProps,d.memoizedState=k.memoizedState,d.updateQueue=k.updateQueue,c=k.dependencies,d.dependencies=null===c?null:{expirationTime:c.expirationTime,firstContext:c.firstContext,responders:c.responders}),f=f.sibling;I(M,M.current&1|2,b);b=b.child;break a}c=c.sibling}}else{if(!f)if(c=qh(k),null!==c){if(b.effectTag|=
64,f=!0,d=c.updateQueue,null!==d&&(b.updateQueue=d,b.effectTag|=4),Li(e,!0),null===e.tail&&"hidden"===e.tailMode){b=b.lastEffect=e.lastEffect;null!==b&&(b.nextEffect=null);break}}else cg()>e.tailExpiration&&1<d&&(b.effectTag|=64,f=!0,Li(e,!1),b.expirationTime=b.childExpirationTime=d-1);e.isBackwards?(k.sibling=b.child,b.child=k):(d=e.last,null!==d?d.sibling=k:b.child=k,e.last=k)}if(null!==e.tail){0===e.tailExpiration&&(e.tailExpiration=cg()+500);d=e.tail;e.rendering=d;e.tail=d.sibling;e.lastEffect=
b.lastEffect;d.sibling=null;e=M.current;e=f?e&1|2:e&1;I(M,e,b);b=d;break a}break;case 20:break;case 21:break;default:throw Error(u(156,b.tag));}b=null}e=V;if(1===W||1!==e.childExpirationTime){f=0;for(d=e.child;null!==d;)c=d.expirationTime,k=d.childExpirationTime,c>f&&(f=c),k>f&&(f=k),d=d.sibling;e.childExpirationTime=f}if(null!==b)return b;null!==a&&0===(a.effectTag&2048)&&(null===a.firstEffect&&(a.firstEffect=V.firstEffect),null!==V.lastEffect&&(null!==a.lastEffect&&(a.lastEffect.nextEffect=V.firstEffect),
a.lastEffect=V.lastEffect),1<V.effectTag&&(null!==a.lastEffect?a.lastEffect.nextEffect=V:a.firstEffect=V,a.lastEffect=V))}else{b=Mi(V,W);if(null!==b)return b.effectTag&=2047,b;null!==a&&(a.firstEffect=a.lastEffect=null,a.effectTag|=2048)}b=V.sibling;if(null!==b)return b;V=a}while(null!==V);X===qj&&(X=vj);return null}function Xj(a){var b=a.expirationTime;a=a.childExpirationTime;return b>a?b:a}function Yj(a){var b=dg();fg(99,ik.bind(null,a,b));return null}
function ik(a,b){Sj();if((T&(oj|pj))!==S)throw Error(u(327));var c=a.finishedWork,d=a.finishedExpirationTime;if(null===c)return null;a.finishedWork=null;a.finishedExpirationTime=0;if(c===a.current)throw Error(u(177));a.callbackNode=null;a.callbackExpirationTime=0;a.callbackPriority=90;a.nextKnownPendingLevel=0;var e=Xj(c);a.firstPendingTime=e;d<=a.lastSuspendedTime?a.firstSuspendedTime=a.lastSuspendedTime=a.nextKnownPendingLevel=0:d<=a.firstSuspendedTime&&(a.firstSuspendedTime=d-1);d<=a.lastPingedTime&&
(a.lastPingedTime=0);d<=a.lastExpiredTime&&(a.lastExpiredTime=0);a===U&&(V=U=null,W=0);1<c.effectTag?null!==c.lastEffect?(c.lastEffect.nextEffect=c,e=c.firstEffect):e=c:e=c.firstEffect;if(null!==e){var f=T;T|=pj;mj.current=null;le=Ld;var g=fe();if(ge(g)){if("selectionStart"in g)var h={start:g.selectionStart,end:g.selectionEnd};else a:{h=(h=g.ownerDocument)&&h.defaultView||window;var k=h.getSelection&&h.getSelection();if(k&&0!==k.rangeCount){h=k.anchorNode;var l=k.anchorOffset,m=k.focusNode;k=k.focusOffset;
try{h.nodeType,m.nodeType}catch(Db){h=null;break a}var C=0,y=-1,H=-1,z=0,ta=0,r=g,x=null;b:for(;;){for(var A;;){r!==h||0!==l&&3!==r.nodeType||(y=C+l);r!==m||0!==k&&3!==r.nodeType||(H=C+k);3===r.nodeType&&(C+=r.nodeValue.length);if(null===(A=r.firstChild))break;x=r;r=A}for(;;){if(r===g)break b;x===h&&++z===l&&(y=C);x===m&&++ta===k&&(H=C);if(null!==(A=r.nextSibling))break;r=x;x=r.parentNode}r=A}h=-1===y||-1===H?null:{start:y,end:H}}else h=null}h=h||{start:0,end:0}}else h=null;me={focusedElem:g,selectionRange:h};
Ld=!1;Y=e;do try{jk()}catch(Db){if(null===Y)throw Error(u(330));Ri(Y,Db);Y=Y.nextEffect}while(null!==Y);Y=e;do try{for(g=a,h=b;null!==Y;){var p=Y.effectTag;p&16&&Tb(Y.stateNode,"");if(p&128){var t=Y.alternate;if(null!==t){var v=t.ref;null!==v&&("function"===typeof v?v(null):v.current=null)}}switch(p&1038){case 2:$i(Y);Y.effectTag&=-3;break;case 6:$i(Y);Y.effectTag&=-3;aj(Y.alternate,Y);break;case 1024:Y.effectTag&=-1025;break;case 1028:Y.effectTag&=-1025;aj(Y.alternate,Y);break;case 4:aj(Y.alternate,
Y);break;case 8:l=Y,Xi(g,l,h),Yi(l)}Y=Y.nextEffect}}catch(Db){if(null===Y)throw Error(u(330));Ri(Y,Db);Y=Y.nextEffect}while(null!==Y);v=me;t=fe();p=v.focusedElem;h=v.selectionRange;if(t!==p&&p&&p.ownerDocument&&ee(p.ownerDocument.documentElement,p)){null!==h&&ge(p)&&(t=h.start,v=h.end,void 0===v&&(v=t),"selectionStart"in p?(p.selectionStart=t,p.selectionEnd=Math.min(v,p.value.length)):(v=(t=p.ownerDocument||document)&&t.defaultView||window,v.getSelection&&(v=v.getSelection(),l=p.textContent.length,
g=Math.min(h.start,l),h=void 0===h.end?g:Math.min(h.end,l),!v.extend&&g>h&&(l=h,h=g,g=l),l=de(p,g),m=de(p,h),l&&m&&(1!==v.rangeCount||v.anchorNode!==l.node||v.anchorOffset!==l.offset||v.focusNode!==m.node||v.focusOffset!==m.offset)&&(t=t.createRange(),t.setStart(l.node,l.offset),v.removeAllRanges(),g>h?(v.addRange(t),v.extend(m.node,m.offset)):(t.setEnd(m.node,m.offset),v.addRange(t))))));t=[];for(v=p;v=v.parentNode;)1===v.nodeType&&t.push({element:v,left:v.scrollLeft,top:v.scrollTop});"function"===
typeof p.focus&&p.focus();for(p=0;p<t.length;p++)v=t[p],v.element.scrollLeft=v.left,v.element.scrollTop=v.top}me=null;Ld=!!le;le=null;a.current=c;Y=e;do try{for(p=d;null!==Y;){var Dh=Y.effectTag;if(Dh&36){var cc=Y.alternate;t=Y;v=p;switch(t.tag){case 0:case 11:case 15:Ui(16,32,t);break;case 1:var dd=t.stateNode;if(t.effectTag&4)if(null===cc)dd.componentDidMount();else{var hk=t.elementType===t.type?cc.memoizedProps:mg(t.type,cc.memoizedProps);dd.componentDidUpdate(hk,cc.memoizedState,dd.__reactInternalSnapshotBeforeUpdate)}var Eh=
t.updateQueue;null!==Eh&&Kg(t,Eh,dd,v);break;case 3:var Fh=t.updateQueue;if(null!==Fh){g=null;if(null!==t.child)switch(t.child.tag){case 5:g=t.child.stateNode;break;case 1:g=t.child.stateNode}Kg(t,Fh,g,v)}break;case 5:var xk=t.stateNode;null===cc&&t.effectTag&4&&ne(t.type,t.memoizedProps)&&xk.focus();break;case 6:break;case 4:break;case 12:break;case 13:if(null===t.memoizedState){var Di=t.alternate;if(null!==Di){var Ei=Di.memoizedState;if(null!==Ei){var Fi=Ei.dehydrated;null!==Fi&&Lc(Fi)}}}break;
case 19:case 17:case 20:case 21:break;default:throw Error(u(163));}}if(Dh&128){t=void 0;var wd=Y.ref;if(null!==wd){var Gi=Y.stateNode;switch(Y.tag){case 5:t=Gi;break;default:t=Gi}"function"===typeof wd?wd(t):wd.current=t}}Y=Y.nextEffect}}catch(Db){if(null===Y)throw Error(u(330));Ri(Y,Db);Y=Y.nextEffect}while(null!==Y);Y=null;Yf();T=f}else a.current=c;if(Dj)Dj=!1,Ej=a,Fj=b;else for(Y=e;null!==Y;)b=Y.nextEffect,Y.nextEffect=null,Y=b;b=a.firstPendingTime;0===b&&(jj=null);1073741823===b?a===Ij?Hj++:(Hj=
0,Ij=a):Hj=0;"function"===typeof kk&&kk(c.stateNode,d);Z(a);if(gj)throw gj=!1,a=hj,hj=null,a;if((T&nj)!==S)return null;jg();return null}function jk(){for(;null!==Y;){var a=Y.effectTag;0!==(a&256)&&Ti(Y.alternate,Y);0===(a&512)||Dj||(Dj=!0,gg(97,function(){Sj();return null}));Y=Y.nextEffect}}function Sj(){if(90!==Fj){var a=97<Fj?97:Fj;Fj=90;return fg(a,lk)}}
function lk(){if(null===Ej)return!1;var a=Ej;Ej=null;if((T&(oj|pj))!==S)throw Error(u(331));var b=T;T|=pj;for(a=a.current.firstEffect;null!==a;){try{var c=a;if(0!==(c.effectTag&512))switch(c.tag){case 0:case 11:case 15:Ui(128,0,c),Ui(0,64,c)}}catch(d){if(null===a)throw Error(u(330));Ri(a,d)}c=a.nextEffect;a.nextEffect=null;a=c}T=b;jg();return!0}function mk(a,b,c){b=Ni(c,b);b=fj(a,b,1073741823);Dg(a,b);a=Kj(a,1073741823);null!==a&&Z(a)}
function Ri(a,b){if(3===a.tag)mk(a,a,b);else for(var c=a.return;null!==c;){if(3===c.tag){mk(c,a,b);break}else if(1===c.tag){var d=c.stateNode;if("function"===typeof c.type.getDerivedStateFromError||"function"===typeof d.componentDidCatch&&(null===jj||!jj.has(d))){a=Ni(b,a);a=ij(c,a,1073741823);Dg(c,a);c=Kj(c,1073741823);null!==c&&Z(c);break}}c=c.return}}
function dk(a,b,c){var d=a.pingCache;null!==d&&d.delete(b);U===a&&W===c?X===uj||X===tj&&1073741823===xj&&cg()-bj<Cj?Tj(a,W):Bj=!0:Pj(a,c)&&(b=a.lastPingedTime,0!==b&&b<c||(a.lastPingedTime=c,a.finishedExpirationTime===c&&(a.finishedExpirationTime=0,a.finishedWork=null),Z(a)))}function dj(a,b){var c=a.stateNode;null!==c&&c.delete(b);b=0;0===b&&(b=Pg(),b=Qg(b,a,null));a=Kj(a,b);null!==a&&Z(a)}var gk;
gk=function(a,b,c){var d=b.expirationTime;if(null!==a){var e=b.pendingProps;if(a.memoizedProps!==e||K.current)wg=!0;else{if(d<c){wg=!1;switch(b.tag){case 3:wi(b);li();break;case 5:oh(b);if(b.mode&4&&1!==c&&e.hidden)return b.expirationTime=b.childExpirationTime=1,null;break;case 1:L(b.type)&&Jf(b);break;case 4:mh(b,b.stateNode.containerInfo);break;case 10:sg(b,b.memoizedProps.value);break;case 13:if(null!==b.memoizedState){d=b.child.childExpirationTime;if(0!==d&&d>=c)return yi(a,b,c);I(M,M.current&
1,b);b=oi(a,b,c);return null!==b?b.sibling:null}I(M,M.current&1,b);break;case 19:d=b.childExpirationTime>=c;if(0!==(a.effectTag&64)){if(d)return Bi(a,b,c);b.effectTag|=64}e=b.memoizedState;null!==e&&(e.rendering=null,e.tail=null);I(M,M.current,b);if(!d)return null}return oi(a,b,c)}wg=!1}}else wg=!1;b.expirationTime=0;switch(b.tag){case 2:d=b.type;null!==a&&(a.alternate=null,b.alternate=null,b.effectTag|=2);a=b.pendingProps;e=Ef(b,J.current);vg(b,c);e=Ih(null,b,d,a,e,c);b.effectTag|=1;if("object"===
typeof e&&null!==e&&"function"===typeof e.render&&void 0===e.$$typeof){b.tag=1;Mh();if(L(d)){var f=!0;Jf(b)}else f=!1;b.memoizedState=null!==e.state&&void 0!==e.state?e.state:null;var g=d.getDerivedStateFromProps;"function"===typeof g&&Og(b,d,g,a);e.updater=Sg;b.stateNode=e;e._reactInternalFiber=b;Wg(b,d,a,c);b=vi(null,b,d,!0,f,c)}else b.tag=0,R(null,b,e,c),b=b.child;return b;case 16:e=b.elementType;null!==a&&(a.alternate=null,b.alternate=null,b.effectTag|=2);a=b.pendingProps;Va(e);if(1!==e._status)throw e._result;
e=e._result;b.type=e;f=b.tag=nk(e);a=mg(e,a);switch(f){case 0:b=si(null,b,e,a,c);break;case 1:b=ui(null,b,e,a,c);break;case 11:b=ni(null,b,e,a,c);break;case 14:b=pi(null,b,e,mg(e.type,a),d,c);break;default:throw Error(u(306,e,""));}return b;case 0:return d=b.type,e=b.pendingProps,e=b.elementType===d?e:mg(d,e),si(a,b,d,e,c);case 1:return d=b.type,e=b.pendingProps,e=b.elementType===d?e:mg(d,e),ui(a,b,d,e,c);case 3:wi(b);d=b.updateQueue;if(null===d)throw Error(u(282));e=b.memoizedState;e=null!==e?e.element:
null;Hg(b,d,b.pendingProps,null,c);d=b.memoizedState.element;if(d===e)li(),b=oi(a,b,c);else{if(e=b.stateNode.hydrate)di=re(b.stateNode.containerInfo.firstChild),ci=b,e=ei=!0;if(e)for(c=gh(b,null,d,c),b.child=c;c;)c.effectTag=c.effectTag&-3|1024,c=c.sibling;else R(a,b,d,c),li();b=b.child}return b;case 5:return oh(b),null===a&&ii(b),d=b.type,e=b.pendingProps,f=null!==a?a.memoizedProps:null,g=e.children,oe(d,e)?g=null:null!==f&&oe(d,f)&&(b.effectTag|=16),ti(a,b),b.mode&4&&1!==c&&e.hidden?(b.expirationTime=
b.childExpirationTime=1,b=null):(R(a,b,g,c),b=b.child),b;case 6:return null===a&&ii(b),null;case 13:return yi(a,b,c);case 4:return mh(b,b.stateNode.containerInfo),d=b.pendingProps,null===a?b.child=fh(b,null,d,c):R(a,b,d,c),b.child;case 11:return d=b.type,e=b.pendingProps,e=b.elementType===d?e:mg(d,e),ni(a,b,d,e,c);case 7:return R(a,b,b.pendingProps,c),b.child;case 8:return R(a,b,b.pendingProps.children,c),b.child;case 12:return R(a,b,b.pendingProps.children,c),b.child;case 10:a:{d=b.type._context;
e=b.pendingProps;g=b.memoizedProps;f=e.value;sg(b,f);if(null!==g){var h=g.value;f=of(h,f)?0:("function"===typeof d._calculateChangedBits?d._calculateChangedBits(h,f):1073741823)|0;if(0===f){if(g.children===e.children&&!K.current){b=oi(a,b,c);break a}}else for(h=b.child,null!==h&&(h.return=b);null!==h;){var k=h.dependencies;if(null!==k){g=h.child;for(var l=k.firstContext;null!==l;){if(l.context===d&&0!==(l.observedBits&f)){1===h.tag&&(l=Bg(c,null),l.tag=2,Dg(h,l));h.expirationTime<c&&(h.expirationTime=
c);l=h.alternate;null!==l&&l.expirationTime<c&&(l.expirationTime=c);ug(h.return,c);k.expirationTime<c&&(k.expirationTime=c);break}l=l.next}}else g=10===h.tag?h.type===b.type?null:h.child:h.child;if(null!==g)g.return=h;else for(g=h;null!==g;){if(g===b){g=null;break}h=g.sibling;if(null!==h){h.return=g.return;g=h;break}g=g.return}h=g}}R(a,b,e.children,c);b=b.child}return b;case 9:return e=b.type,f=b.pendingProps,d=f.children,vg(b,c),e=xg(e,f.unstable_observedBits),d=d(e),b.effectTag|=1,R(a,b,d,c),b.child;
case 14:return e=b.type,f=mg(e,b.pendingProps),f=mg(e.type,f),pi(a,b,e,f,d,c);case 15:return ri(a,b,b.type,b.pendingProps,d,c);case 17:return d=b.type,e=b.pendingProps,e=b.elementType===d?e:mg(d,e),null!==a&&(a.alternate=null,b.alternate=null,b.effectTag|=2),b.tag=1,L(d)?(a=!0,Jf(b)):a=!1,vg(b,c),Ug(b,d,e,c),Wg(b,d,e,c),vi(null,b,d,!0,a,c);case 19:return Bi(a,b,c)}throw Error(u(156,b.tag));};var kk=null,Wi=null;
function ok(a){if("undefined"===typeof __REACT_DEVTOOLS_GLOBAL_HOOK__)return!1;var b=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(b.isDisabled||!b.supportsFiber)return!0;try{var c=b.inject(a);kk=function(a){try{b.onCommitFiberRoot(c,a,void 0,64===(a.current.effectTag&64))}catch(e){}};Wi=function(a){try{b.onCommitFiberUnmount(c,a)}catch(e){}}}catch(d){}return!0}
function pk(a,b,c,d){this.tag=a;this.key=c;this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null;this.index=0;this.ref=null;this.pendingProps=b;this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null;this.mode=d;this.effectTag=0;this.lastEffect=this.firstEffect=this.nextEffect=null;this.childExpirationTime=this.expirationTime=0;this.alternate=null}function gi(a,b,c,d){return new pk(a,b,c,d)}
function qi(a){a=a.prototype;return!(!a||!a.isReactComponent)}function nk(a){if("function"===typeof a)return qi(a)?1:0;if(void 0!==a&&null!==a){a=a.$$typeof;if(a===Oa)return 11;if(a===Ra)return 14}return 2}
function ah(a,b){var c=a.alternate;null===c?(c=gi(a.tag,b,a.key,a.mode),c.elementType=a.elementType,c.type=a.type,c.stateNode=a.stateNode,c.alternate=a,a.alternate=c):(c.pendingProps=b,c.effectTag=0,c.nextEffect=null,c.firstEffect=null,c.lastEffect=null);c.childExpirationTime=a.childExpirationTime;c.expirationTime=a.expirationTime;c.child=a.child;c.memoizedProps=a.memoizedProps;c.memoizedState=a.memoizedState;c.updateQueue=a.updateQueue;b=a.dependencies;c.dependencies=null===b?null:{expirationTime:b.expirationTime,
firstContext:b.firstContext,responders:b.responders};c.sibling=a.sibling;c.index=a.index;c.ref=a.ref;return c}
function ch(a,b,c,d,e,f){var g=2;d=a;if("function"===typeof a)qi(a)&&(g=1);else if("string"===typeof a)g=5;else a:switch(a){case Ia:return eh(c.children,e,f,b);case Na:g=8;e|=7;break;case Ja:g=8;e|=1;break;case Ka:return a=gi(12,c,b,e|8),a.elementType=Ka,a.type=Ka,a.expirationTime=f,a;case Pa:return a=gi(13,c,b,e),a.type=Pa,a.elementType=Pa,a.expirationTime=f,a;case Qa:return a=gi(19,c,b,e),a.elementType=Qa,a.expirationTime=f,a;default:if("object"===typeof a&&null!==a)switch(a.$$typeof){case La:g=
10;break a;case Ma:g=9;break a;case Oa:g=11;break a;case Ra:g=14;break a;case Sa:g=16;d=null;break a}throw Error(u(130,null==a?a:typeof a,""));}b=gi(g,c,b,e);b.elementType=a;b.type=d;b.expirationTime=f;return b}function eh(a,b,c,d){a=gi(7,a,d,b);a.expirationTime=c;return a}function bh(a,b,c){a=gi(6,a,null,b);a.expirationTime=c;return a}
function dh(a,b,c){b=gi(4,null!==a.children?a.children:[],a.key,b);b.expirationTime=c;b.stateNode={containerInfo:a.containerInfo,pendingChildren:null,implementation:a.implementation};return b}
function qk(a,b,c){this.tag=b;this.current=null;this.containerInfo=a;this.pingCache=this.pendingChildren=null;this.finishedExpirationTime=0;this.finishedWork=null;this.timeoutHandle=-1;this.pendingContext=this.context=null;this.hydrate=c;this.callbackNode=null;this.callbackPriority=90;this.lastExpiredTime=this.lastPingedTime=this.nextKnownPendingLevel=this.lastSuspendedTime=this.firstSuspendedTime=this.firstPendingTime=0}
function Pj(a,b){var c=a.firstSuspendedTime;a=a.lastSuspendedTime;return 0!==c&&c>=b&&a<=b}function Mj(a,b){var c=a.firstSuspendedTime,d=a.lastSuspendedTime;c<b&&(a.firstSuspendedTime=b);if(d>b||0===c)a.lastSuspendedTime=b;b<=a.lastPingedTime&&(a.lastPingedTime=0);b<=a.lastExpiredTime&&(a.lastExpiredTime=0)}
function Nj(a,b){b>a.firstPendingTime&&(a.firstPendingTime=b);var c=a.firstSuspendedTime;0!==c&&(b>=c?a.firstSuspendedTime=a.lastSuspendedTime=a.nextKnownPendingLevel=0:b>=a.lastSuspendedTime&&(a.lastSuspendedTime=b+1),b>a.nextKnownPendingLevel&&(a.nextKnownPendingLevel=b))}function Rj(a,b){var c=a.lastExpiredTime;if(0===c||c>b)a.lastExpiredTime=b}
function rk(a,b,c,d){var e=b.current,f=Pg(),g=Mg.suspense;f=Qg(f,e,g);a:if(c){c=c._reactInternalFiber;b:{if(ec(c)!==c||1!==c.tag)throw Error(u(170));var h=c;do{switch(h.tag){case 3:h=h.stateNode.context;break b;case 1:if(L(h.type)){h=h.stateNode.__reactInternalMemoizedMergedChildContext;break b}}h=h.return}while(null!==h);throw Error(u(171));}if(1===c.tag){var k=c.type;if(L(k)){c=If(c,k,h);break a}}c=h}else c=Cf;null===b.context?b.context=c:b.pendingContext=c;b=Bg(f,g);b.payload={element:a};d=void 0===
d?null:d;null!==d&&(b.callback=d);Dg(e,b);Rg(e,f);return f}function sk(a){a=a.current;if(!a.child)return null;switch(a.child.tag){case 5:return a.child.stateNode;default:return a.child.stateNode}}function tk(a,b){a=a.memoizedState;null!==a&&null!==a.dehydrated&&a.retryTime<b&&(a.retryTime=b)}function uk(a,b){tk(a,b);(a=a.alternate)&&tk(a,b)}
function vk(a,b,c){var d=3<arguments.length&&void 0!==arguments[3]?arguments[3]:null;return{$$typeof:Ha,key:null==d?null:""+d,children:a,containerInfo:b,implementation:c}}jc=function(a){if(13===a.tag){var b=lg(Pg(),150,100);Rg(a,b);uk(a,b)}};kc=function(a){if(13===a.tag){Pg();var b=kg++;Rg(a,b);uk(a,b)}};lc=function(a){if(13===a.tag){var b=Pg();b=Qg(b,a,null);Rg(a,b);uk(a,b)}};
Za=function(a,b,c){switch(b){case "input":Eb(a,c);b=c.name;if("radio"===c.type&&null!=b){for(c=a;c.parentNode;)c=c.parentNode;c=c.querySelectorAll("input[name="+JSON.stringify(""+b)+'][type="radio"]');for(b=0;b<c.length;b++){var d=c[b];if(d!==a&&d.form===a.form){var e=ye(d);if(!e)throw Error(u(90));zb(d);Eb(d,e)}}}break;case "textarea":Mb(a,c);break;case "select":b=c.value,null!=b&&Jb(a,!!c.multiple,b,!1)}};
function wk(a,b,c){c=null!=c&&!0===c.hydrate;var d=new qk(a,b,c),e=gi(3,null,null,2===b?7:1===b?3:0);d.current=e;e.stateNode=d;a[we]=d.current;c&&0!==b&&wc(9===a.nodeType?a:a.ownerDocument);this._internalRoot=d}wk.prototype.render=function(a,b){var c=this._internalRoot;rk(a,c,null,void 0===b?null:b)};wk.prototype.unmount=function(a){var b=this._internalRoot;rk(null,b,null,void 0===a?null:a)};
function yk(a){return!(!a||1!==a.nodeType&&9!==a.nodeType&&11!==a.nodeType&&(8!==a.nodeType||" react-mount-point-unstable "!==a.nodeValue))}eb=bk;fb=function(a,b,c,d){var e=T;T|=4;try{return fg(98,a.bind(null,b,c,d))}finally{T=e,T===S&&jg()}};gb=function(){(T&(1|oj|pj))===S&&(ak(),Sj())};hb=function(a,b){var c=T;T|=2;try{return a(b)}finally{T=c,T===S&&jg()}};
function zk(a,b){b||(b=a?9===a.nodeType?a.documentElement:a.firstChild:null,b=!(!b||1!==b.nodeType||!b.hasAttribute("data-reactroot")));if(!b)for(var c;c=a.lastChild;)a.removeChild(c);return new wk(a,0,b?{hydrate:!0}:void 0)}
function Ak(a,b,c,d,e){var f=c._reactRootContainer;if(f){var g=f._internalRoot;if("function"===typeof e){var h=e;e=function(){var a=sk(g);h.call(a)}}rk(b,g,a,e)}else{f=c._reactRootContainer=zk(c,d);g=f._internalRoot;if("function"===typeof e){var k=e;e=function(){var a=sk(g);k.call(a)}}ck(function(){rk(b,g,a,e)})}return sk(g)}function Bk(a,b){var c=2<arguments.length&&void 0!==arguments[2]?arguments[2]:null;if(!yk(b))throw Error(u(200));return vk(a,b,null,c)}
var Ck={createPortal:Bk,findDOMNode:function(a){if(null==a)return null;if(1===a.nodeType)return a;var b=a._reactInternalFiber;if(void 0===b){if("function"===typeof a.render)throw Error(u(188));throw Error(u(268,Object.keys(a)));}a=ic(b);a=null===a?null:a.stateNode;return a},hydrate:function(a,b,c){if(!yk(b))throw Error(u(200));return Ak(null,a,b,!0,c)},render:function(a,b,c){if(!yk(b))throw Error(u(200));return Ak(null,a,b,!1,c)},unstable_renderSubtreeIntoContainer:function(a,b,c,d){if(!yk(c))throw Error(u(200));
if(null==a||void 0===a._reactInternalFiber)throw Error(u(38));return Ak(a,b,c,!1,d)},unmountComponentAtNode:function(a){if(!yk(a))throw Error(u(40));return a._reactRootContainer?(ck(function(){Ak(null,null,a,!1,function(){a._reactRootContainer=null})}),!0):!1},unstable_createPortal:function(){return Bk.apply(void 0,arguments)},unstable_batchedUpdates:bk,flushSync:function(a,b){if((T&(oj|pj))!==S)throw Error(u(187));var c=T;T|=1;try{return fg(99,a.bind(null,b))}finally{T=c,jg()}},__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED:{Events:[Cc,
xe,ye,Ca.injectEventPluginsByName,fa,Sc,function(a){ya(a,Rc)},cb,db,Pd,Ba,Sj,{current:!1}]}};
(function(a){var b=a.findFiberByHostInstance;return ok(n({},a,{overrideHookState:null,overrideProps:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:Ea.ReactCurrentDispatcher,findHostInstanceByFiber:function(a){a=ic(a);return null===a?null:a.stateNode},findFiberByHostInstance:function(a){return b?b(a):null},findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null}))})({findFiberByHostInstance:Fc,bundleType:0,version:"16.11.0",
rendererPackageName:"react-dom"});var Dk={default:Ck},Ek=Dk&&Ck||Dk;module.exports=Ek.default||Ek;


/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


if (true) {
  module.exports = __webpack_require__(38);
} else {}


/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/** @license React v0.17.0
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

Object.defineProperty(exports,"__esModule",{value:!0});var f,g,h,k,l;
if("undefined"===typeof window||"function"!==typeof MessageChannel){var p=null,q=null,t=function(){if(null!==p)try{var a=exports.unstable_now();p(!0,a);p=null}catch(b){throw setTimeout(t,0),b;}},u=Date.now();exports.unstable_now=function(){return Date.now()-u};f=function(a){null!==p?setTimeout(f,0,a):(p=a,setTimeout(t,0))};g=function(a,b){q=setTimeout(a,b)};h=function(){clearTimeout(q)};k=function(){return!1};l=exports.unstable_forceFrameRate=function(){}}else{var w=window.performance,x=window.Date,
y=window.setTimeout,z=window.clearTimeout,A=window.requestAnimationFrame,B=window.cancelAnimationFrame;"undefined"!==typeof console&&("function"!==typeof A&&console.error("This browser doesn't support requestAnimationFrame. Make sure that you load a polyfill in older browsers. https://fb.me/react-polyfills"),"function"!==typeof B&&console.error("This browser doesn't support cancelAnimationFrame. Make sure that you load a polyfill in older browsers. https://fb.me/react-polyfills"));if("object"===typeof w&&
"function"===typeof w.now)exports.unstable_now=function(){return w.now()};else{var C=x.now();exports.unstable_now=function(){return x.now()-C}}var D=!1,E=null,F=-1,G=5,H=0;k=function(){return exports.unstable_now()>=H};l=function(){};exports.unstable_forceFrameRate=function(a){0>a||125<a?console.error("forceFrameRate takes a positive int between 0 and 125, forcing framerates higher than 125 fps is not unsupported"):G=0<a?Math.floor(1E3/a):33.33};var I=new MessageChannel,J=I.port2;I.port1.onmessage=
function(){if(null!==E){var a=exports.unstable_now();H=a+G;try{E(!0,a)?J.postMessage(null):(D=!1,E=null)}catch(b){throw J.postMessage(null),b;}}else D=!1};f=function(a){E=a;D||(D=!0,J.postMessage(null))};g=function(a,b){F=y(function(){a(exports.unstable_now())},b)};h=function(){z(F);F=-1}}function K(a,b){var c=a.length;a.push(b);a:for(;;){var d=Math.floor((c-1)/2),e=a[d];if(void 0!==e&&0<L(e,b))a[d]=b,a[c]=e,c=d;else break a}}function M(a){a=a[0];return void 0===a?null:a}
function N(a){var b=a[0];if(void 0!==b){var c=a.pop();if(c!==b){a[0]=c;a:for(var d=0,e=a.length;d<e;){var m=2*(d+1)-1,n=a[m],v=m+1,r=a[v];if(void 0!==n&&0>L(n,c))void 0!==r&&0>L(r,n)?(a[d]=r,a[v]=c,d=v):(a[d]=n,a[m]=c,d=m);else if(void 0!==r&&0>L(r,c))a[d]=r,a[v]=c,d=v;else break a}}return b}return null}function L(a,b){var c=a.sortIndex-b.sortIndex;return 0!==c?c:a.id-b.id}var O=[],P=[],Q=1,R=null,S=3,T=!1,U=!1,V=!1;
function W(a){for(var b=M(P);null!==b;){if(null===b.callback)N(P);else if(b.startTime<=a)N(P),b.sortIndex=b.expirationTime,K(O,b);else break;b=M(P)}}function X(a){V=!1;W(a);if(!U)if(null!==M(O))U=!0,f(Y);else{var b=M(P);null!==b&&g(X,b.startTime-a)}}
function Y(a,b){U=!1;V&&(V=!1,h());T=!0;var c=S;try{W(b);for(R=M(O);null!==R&&(!(R.expirationTime>b)||a&&!k());){var d=R.callback;if(null!==d){R.callback=null;S=R.priorityLevel;var e=d(R.expirationTime<=b);b=exports.unstable_now();"function"===typeof e?R.callback=e:R===M(O)&&N(O);W(b)}else N(O);R=M(O)}if(null!==R)var m=!0;else{var n=M(P);null!==n&&g(X,n.startTime-b);m=!1}return m}finally{R=null,S=c,T=!1}}
function Z(a){switch(a){case 1:return-1;case 2:return 250;case 5:return 1073741823;case 4:return 1E4;default:return 5E3}}var aa=l;exports.unstable_ImmediatePriority=1;exports.unstable_UserBlockingPriority=2;exports.unstable_NormalPriority=3;exports.unstable_IdlePriority=5;exports.unstable_LowPriority=4;exports.unstable_runWithPriority=function(a,b){switch(a){case 1:case 2:case 3:case 4:case 5:break;default:a=3}var c=S;S=a;try{return b()}finally{S=c}};
exports.unstable_next=function(a){switch(S){case 1:case 2:case 3:var b=3;break;default:b=S}var c=S;S=b;try{return a()}finally{S=c}};
exports.unstable_scheduleCallback=function(a,b,c){var d=exports.unstable_now();if("object"===typeof c&&null!==c){var e=c.delay;e="number"===typeof e&&0<e?d+e:d;c="number"===typeof c.timeout?c.timeout:Z(a)}else c=Z(a),e=d;c=e+c;a={id:Q++,callback:b,priorityLevel:a,startTime:e,expirationTime:c,sortIndex:-1};e>d?(a.sortIndex=e,K(P,a),null===M(O)&&a===M(P)&&(V?h():V=!0,g(X,e-d))):(a.sortIndex=c,K(O,a),U||T||(U=!0,f(Y)));return a};exports.unstable_cancelCallback=function(a){a.callback=null};
exports.unstable_wrapCallback=function(a){var b=S;return function(){var c=S;S=b;try{return a.apply(this,arguments)}finally{S=c}}};exports.unstable_getCurrentPriorityLevel=function(){return S};exports.unstable_shouldYield=function(){var a=exports.unstable_now();W(a);var b=M(O);return b!==R&&null!==R&&null!==b&&null!==b.callback&&b.startTime<=a&&b.expirationTime<R.expirationTime||k()};exports.unstable_requestPaint=aa;exports.unstable_continueExecution=function(){U||T||(U=!0,f(Y))};
exports.unstable_pauseExecution=function(){};exports.unstable_getFirstCallbackNode=function(){return M(O)};exports.unstable_Profiling=null;


/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var ReactPropTypesSecret = __webpack_require__(40);

function emptyFunction() {}
function emptyFunctionWithReset() {}
emptyFunctionWithReset.resetWarningCache = emptyFunction;

module.exports = function() {
  function shim(props, propName, componentName, location, propFullName, secret) {
    if (secret === ReactPropTypesSecret) {
      // It is still safe when called from React.
      return;
    }
    var err = new Error(
      'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
      'Use PropTypes.checkPropTypes() to call them. ' +
      'Read more at http://fb.me/use-check-prop-types'
    );
    err.name = 'Invariant Violation';
    throw err;
  };
  shim.isRequired = shim;
  function getShim() {
    return shim;
  };
  // Important!
  // Keep this list in sync with production version in `./factoryWithTypeCheckers.js`.
  var ReactPropTypes = {
    array: shim,
    bool: shim,
    func: shim,
    number: shim,
    object: shim,
    string: shim,
    symbol: shim,

    any: shim,
    arrayOf: getShim,
    element: shim,
    elementType: shim,
    instanceOf: getShim,
    node: shim,
    objectOf: getShim,
    oneOf: getShim,
    oneOfType: getShim,
    shape: getShim,
    exact: getShim,

    checkPropTypes: emptyFunctionWithReset,
    resetWarningCache: emptyFunction
  };

  ReactPropTypes.PropTypes = ReactPropTypes;

  return ReactPropTypes;
};


/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

module.exports = ReactPropTypesSecret;


/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/** @license React v16.11.0
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

Object.defineProperty(exports,"__esModule",{value:!0});
var b="function"===typeof Symbol&&Symbol.for,c=b?Symbol.for("react.element"):60103,d=b?Symbol.for("react.portal"):60106,e=b?Symbol.for("react.fragment"):60107,f=b?Symbol.for("react.strict_mode"):60108,g=b?Symbol.for("react.profiler"):60114,h=b?Symbol.for("react.provider"):60109,k=b?Symbol.for("react.context"):60110,l=b?Symbol.for("react.async_mode"):60111,m=b?Symbol.for("react.concurrent_mode"):60111,n=b?Symbol.for("react.forward_ref"):60112,p=b?Symbol.for("react.suspense"):60113,q=b?Symbol.for("react.suspense_list"):
60120,r=b?Symbol.for("react.memo"):60115,t=b?Symbol.for("react.lazy"):60116,v=b?Symbol.for("react.fundamental"):60117,w=b?Symbol.for("react.responder"):60118,x=b?Symbol.for("react.scope"):60119;function y(a){if("object"===typeof a&&null!==a){var u=a.$$typeof;switch(u){case c:switch(a=a.type,a){case l:case m:case e:case g:case f:case p:return a;default:switch(a=a&&a.$$typeof,a){case k:case n:case h:return a;default:return u}}case t:case r:case d:return u}}}function z(a){return y(a)===m}
exports.typeOf=y;exports.AsyncMode=l;exports.ConcurrentMode=m;exports.ContextConsumer=k;exports.ContextProvider=h;exports.Element=c;exports.ForwardRef=n;exports.Fragment=e;exports.Lazy=t;exports.Memo=r;exports.Portal=d;exports.Profiler=g;exports.StrictMode=f;exports.Suspense=p;
exports.isValidElementType=function(a){return"string"===typeof a||"function"===typeof a||a===e||a===m||a===g||a===f||a===p||a===q||"object"===typeof a&&null!==a&&(a.$$typeof===t||a.$$typeof===r||a.$$typeof===h||a.$$typeof===k||a.$$typeof===n||a.$$typeof===v||a.$$typeof===w||a.$$typeof===x)};exports.isAsyncMode=function(a){return z(a)||y(a)===l};exports.isConcurrentMode=z;exports.isContextConsumer=function(a){return y(a)===k};exports.isContextProvider=function(a){return y(a)===h};
exports.isElement=function(a){return"object"===typeof a&&null!==a&&a.$$typeof===c};exports.isForwardRef=function(a){return y(a)===n};exports.isFragment=function(a){return y(a)===e};exports.isLazy=function(a){return y(a)===t};exports.isMemo=function(a){return y(a)===r};exports.isPortal=function(a){return y(a)===d};exports.isProfiler=function(a){return y(a)===g};exports.isStrictMode=function(a){return y(a)===f};exports.isSuspense=function(a){return y(a)===p};


/***/ }),
/* 42 */
/***/ (function(module, exports) {

module.exports = function(originalModule) {
	if (!originalModule.webpackPolyfill) {
		var module = Object.create(originalModule);
		// module.parent = undefined by default
		if (!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		Object.defineProperty(module, "exports", {
			enumerable: true
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = __webpack_require__(0);
var React__default = _interopDefault(React);
var styled = __webpack_require__(3);
var styled__default = _interopDefault(styled);

var themes = {};
themes["default"] = {
  hatchedBackground: "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAYAAACp8Z5+AAAAIElEQVQYV2P8////fwYGBgZGRkZGMI0hABIFAbgEugAAQFQP/QfjEPcAAAAASUVORK5CYII=)",
  canvas: "#ffffff",
  material: "#ced0cf",
  materialDark: "#9a9e9c",
  borderDarkest: "#050608",
  borderLightest: "#ffffff",
  borderDark: "#888c8f",
  borderLight: "#dfe0e3",
  headerMaterialDark: "#000080",
  headerMaterialLight: "#1034a6",
  headerText: "#ffffff",
  text: "#050608",
  textInvert: "#ffffff",
  textDisabled: "#888c8f",
  textDisabledShadow: "#ffffff",
  inputText: "#050608",
  inputTextInvert: "#ffffff",
  inputTextDisabled: "#888c8f",
  inputTextDisabledShadow: "#ffffff",
  tooltip: "#fefbcc",
  anchor: "#1034a6",
  anchorVisited: "#440381",
  hoverBackground: "#000080",
  checkmark: "#050608",
  progress: "#000080",
  flatLight: "#d8d8d8",
  flatDark: "#9e9e9e"
};
themes.water = {
  hatchedBackground: "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAYAAACp8Z5+AAAAIElEQVQYV2P8////fwYGBgZGRkZGMI0hABIFAbgEugAAQFQP/QfjEPcAAAAASUVORK5CYII=)",
  canvas: "#ffffff",
  material: "#ced0cf",
  materialDark: "#9a9e9c",
  borderDarkest: "#050608",
  borderLightest: "#ffffff",
  borderDark: "#888c8f",
  borderLight: "#dfe0e3",
  headerMaterialDark: "#72b3b4",
  headerMaterialLight: "#72b3b4",
  headerText: "#ffffff",
  text: "#050608",
  textInvert: "#ffffff",
  textDisabled: "#888c8f",
  textDisabledShadow: "#ffffff",
  inputText: "#050608",
  inputTextInvert: "#ffffff",
  inputTextDisabled: "#888c8f",
  inputTextDisabledShadow: "#ffffff",
  tooltip: "#fefbcc",
  anchor: "#72b3b4",
  anchorVisited: "#440381",
  hoverBackground: "#72b3b4",
  checkmark: "#050608",
  progress: "#72b3b4",
  flatLight: "#d8d8d8",
  flatDark: "#9e9e9e"
};
themes.coldGray = {
  hatchedBackground: "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAYAAACp8Z5+AAAAIElEQVQYV2P8////fwYGBgZGRkZGMI0hABIFAbgEugAAQFQP/QfjEPcAAAAASUVORK5CYII=)",
  // background: "#CCF5AC",
  // background: "#416165",
  background: "#4C6663",
  canvas: "#c7c7df",
  material: "#a1a3ca",
  materialDark: "#6063a5",
  borderDarkest: "#010601",
  borderLightest: "#c7c7df",
  borderDark: "#5b57a1",
  borderLight: "#a4a7c8",
  headerMaterialDark: "#3B3D64",
  headerMaterialLight: "#8d88c2",
  headerText: "#010601",
  text: "#010601",
  textInvert: "#c7c7df",
  textDisabled: "#5b57a1",
  textDisabledShadow: "#c7c7df",
  inputText: "#050608",
  inputTextInvert: "#ffffff",
  inputTextDisabled: "#888c8f",
  inputTextDisabledShadow: "#ffffff",
  tooltip: "#fefbcc",
  anchor: "#8d88c2",
  anchorVisited: "#440381",
  hoverBackground: "#8d88c2",
  checkmark: "#010601",
  progress: "#8d88c2",
  flatLight: "#a4a7c8",
  flatDark: "#5b57a1"
};
themes.lilacRoseDark = {
  hatchedBackground: "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAYAAACp8Z5+AAAAIElEQVQYV2P8////fwYGBgZGRkZGMI0hABIFAbgEugAAQFQP/QfjEPcAAAAASUVORK5CYII=)",
  background: "#3B3B58",
  canvas: "#dab1c7",
  material: "#b26496",
  materialDark: "#763a60",
  borderDarkest: "#190000",
  borderLightest: "#FFCAFC",
  borderDark: "#7F3163",
  borderLight: "#E597C9",
  headerMaterialDark: "#4C0030",
  headerMaterialLight: "#8d88c2",
  headerText: "#010601",
  text: "#000000",
  textInvert: "#ecbfe3",
  textDisabled: "#82416d",
  textDisabledShadow: "#ecbfe3",
  inputText: "#000000",
  inputTextInvert: "#ecbfe3",
  inputTextDisabled: "#000000",
  inputTextDisabledShadow: "#000000",
  tooltip: "#fefbcc",
  anchor: "#a65387",
  anchorVisited: "#440381",
  hoverBackground: "#713259",
  checkmark: "#010601",
  progress: "#713259",
  flatLight: "#E597C9",
  flatDark: "#7F3163"
};
themes.violetDark = {
  hatchedBackground: "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAYAAACp8Z5+AAAAIElEQVQYV2P8////fwYGBgZGRkZGMI0hABIFAbgEugAAQFQP/QfjEPcAAAAASUVORK5CYII=)",
  canvas: "#c47bcc",
  material: "#652a6d",
  materialDark: "#210e23",
  borderDarkest: "#18051a",
  borderLightest: "#c47bcc",
  borderDark: "#3c1f3e",
  borderLight: "#945b9b",
  headerMaterialDark: "#1034a6",
  headerMaterialLight: "#512155",
  text: "#c57ece",
  textInvert: "#c47bcc",
  textDisabled: "#3c1f3e",
  textDisabledShadow: "#c47bcc",
  inputText: "#18051a",
  inputTextInvert: "#c57ece",
  inputTextDisabled: "#000000",
  inputTextDisabledShadow: "#000000",
  tooltip: "#fefbcc",
  anchor: "#1034a6",
  anchorVisited: "#440381",
  hoverBackground: "#512155",
  checkmark: "#000000",
  progress: "#000080",
  flatLight: "#945b9b",
  flatDark: "#3c1f3e"
};

var reset = "\n  html,\nbody,\ndiv,\nspan,\napplet,\nobject,\niframe,\nh1,\nh2,\nh3,\nh4,\nh5,\nh6,\np,\nblockquote,\npre,\na,\nabbr,\nacronym,\naddress,\nbig,\ncite,\ncode,\ndel,\ndfn,\nem,\nimg,\nins,\nkbd,\nq,\ns,\nsamp,\nsmall,\nstrike,\nstrong,\nsub,\nsup,\ntt,\nvar,\nb,\nu,\ni,\ncenter,\ndl,\ndt,\ndd,\nol,\nul,\nli,\nfieldset,\nform,\nlabel,\nlegend,\ntable,\ncaption,\ntbody,\ntfoot,\nthead,\ntr,\nth,\ntd,\narticle,\naside,\ncanvas,\ndetails,\nembed,\nfigure,\nfigcaption,\nfooter,\nheader,\nhgroup,\nmenu,\nnav,\noutput,\nruby,\nsection,\nsummary,\ntime,\nmark,\naudio,\nvideo {\n  margin: 0;\n  padding: 0;\n  border: 0;\n  font-size: 100%;\n  font: inherit;\n  vertical-align: baseline;\n}\n/* HTML5 display-role reset for older browsers */\narticle,\naside,\ndetails,\nfigcaption,\nfigure,\nfooter,\nheader,\nhgroup,\nmenu,\nnav,\nsection {\n  display: block;\n}\nbody {\n  line-height: 1;\n}\nol,\nul {\n  list-style: none;\n}\nblockquote,\nq {\n  quotes: none;\n}\nblockquote:before,\nblockquote:after,\nq:before,\nq:after {\n  content: \"\";\n  content: none;\n}\ntable {\n  border-collapse: collapse;\n  border-spacing: 0;\n}\na {\n  color: inherit;\n  text-decoration: none;\n}\nul,\nli {\n  list-style-type: none;\n}\nbutton {\n  outline: none;\n  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);\n}\nbody {\n  margin: 0;\n  padding: 0;\n  font-family: sans-serif;\n  color: black;\n}\n\ncode {\n  font-family: source-code-pro, Menlo, Monaco, Consolas, \"Courier New\",\n    monospace;\n}\n\ninput[type=\"number\"]::-webkit-outer-spin-button,\ninput[type=\"number\"]::-webkit-inner-spin-button {\n  -webkit-appearance: none;\n  margin: 0;\n}\n\ninput[type=\"number\"] {\n  -moz-appearance: textfield;\n}\n\n";

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    var ownKeys = Object.keys(source);

    if (typeof Object.getOwnPropertySymbols === 'function') {
      ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
        return Object.getOwnPropertyDescriptor(source, sym).enumerable;
      }));
    }

    ownKeys.forEach(function (key) {
      _defineProperty(target, key, source[key]);
    });
  }

  return target;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};

  var target = _objectWithoutPropertiesLoose(source, excluded);

  var key, i;

  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }

  return target;
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _possibleConstructorReturn(self, call) {
  if (call && (typeof call === "object" || typeof call === "function")) {
    return call;
  }

  return _assertThisInitialized(self);
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest();
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArrayLimit(arr, i) {
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance");
}

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

var ReactPropTypesSecret_1 = ReactPropTypesSecret;

function emptyFunction() {}
function emptyFunctionWithReset() {}
emptyFunctionWithReset.resetWarningCache = emptyFunction;

var factoryWithThrowingShims = function() {
  function shim(props, propName, componentName, location, propFullName, secret) {
    if (secret === ReactPropTypesSecret_1) {
      // It is still safe when called from React.
      return;
    }
    var err = new Error(
      'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
      'Use PropTypes.checkPropTypes() to call them. ' +
      'Read more at http://fb.me/use-check-prop-types'
    );
    err.name = 'Invariant Violation';
    throw err;
  }  shim.isRequired = shim;
  function getShim() {
    return shim;
  }  // Important!
  // Keep this list in sync with production version in `./factoryWithTypeCheckers.js`.
  var ReactPropTypes = {
    array: shim,
    bool: shim,
    func: shim,
    number: shim,
    object: shim,
    string: shim,
    symbol: shim,

    any: shim,
    arrayOf: getShim,
    element: shim,
    elementType: shim,
    instanceOf: getShim,
    node: shim,
    objectOf: getShim,
    oneOf: getShim,
    oneOfType: getShim,
    shape: getShim,
    exact: getShim,

    checkPropTypes: emptyFunctionWithReset,
    resetWarningCache: emptyFunction
  };

  ReactPropTypes.PropTypes = ReactPropTypes;

  return ReactPropTypes;
};

var propTypes = createCommonjsModule(function (module) {
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

{
  // By explicitly using `prop-types` you are opting into new production behavior.
  // http://fb.me/prop-types-in-prod
  module.exports = factoryWithThrowingShims();
}
});

// TODO - implement styled-system
var fontSizes = {
  sm: "15px",
  md: "16px",
  lg: "17px"
};
var blockSizes = {
  sm: "27px",
  md: "35px",
  lg: "43px"
};
var padding = {
  sm: "0.5rem",
  md: "1rem",
  lg: "1.25rem"
};
var fontFamily = "sans-serif";

var StyledAnchor = styled__default.a.withConfig({
  displayName: "Anchor__StyledAnchor",
  componentId: "vm2byl-0"
})(["color:", ";font-size:", ";text-decoration:underline;&:visited{color:", ";}"], function (_ref) {
  var theme = _ref.theme;
  return theme.anchor;
}, function (_ref2) {
  var size = _ref2.size;
  return size ? fontSizes[size] : "inherit";
}, function (_ref3) {
  var theme = _ref3.theme;
  return theme.anchorVisited;
});

var Anchor = function Anchor(_ref4) {
  var className = _ref4.className,
      style = _ref4.style,
      href = _ref4.href,
      children = _ref4.children,
      otherProps = _objectWithoutProperties(_ref4, ["className", "style", "href", "children"]);

  return React__default.createElement(StyledAnchor, _extends({
    href: href,
    className: className,
    style: style
  }, otherProps), children);
};

Anchor.defaultProps = {};
Anchor.propTypes = {
  className: propTypes.string,
  href: propTypes.string.isRequired,
  style: propTypes.object,
  children: propTypes.node.isRequired
};

var shadow = "4px 4px 10px 0 rgba(0, 0, 0, 0.35)";
var insetShadow = "inset 3px 3px 10px rgba(0, 0, 0, 0.2)";
var createDisabledTextStyles = function createDisabledTextStyles() {
  return styled.css(["color:", ";text-shadow:1px 1px ", ";"], function (_ref) {
    var theme = _ref.theme;
    return theme.textDisabled;
  }, function (_ref2) {
    var theme = _ref2.theme;
    return theme.textDisabledShadow;
  });
};
var createBoxStyles = function createBoxStyles() {
  return styled.css(["box-sizing:border-box;display:inline-block;background-color:", ";color:", ";"], function (_ref3) {
    var theme = _ref3.theme;
    return theme.material;
  }, function (_ref4) {
    var theme = _ref4.theme;
    return theme.text;
  });
}; // TODO for flat box styles add checkered background when disabled (not solid color)

var createFlatBoxStyles = function createFlatBoxStyles() {
  return styled.css(["position:relative;box-sizing:border-box;display:inline-block;color:", ";background:", ";border:2px solid ", ";outline:2px solid ", ";outline-offset:-4px;"], function (_ref5) {
    var theme = _ref5.theme;
    return theme.text;
  }, function (_ref6) {
    var theme = _ref6.theme,
        isDisabled = _ref6.isDisabled;
    return isDisabled ? theme.flatLight : theme.canvas;
  }, function (_ref7) {
    var theme = _ref7.theme;
    return theme.canvas;
  }, function (_ref8) {
    var theme = _ref8.theme;
    return theme.flatDark;
  });
};
var createBorderStyles = function createBorderStyles() {
  var invert = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
  return invert ? styled.css(["border-style:solid;border-width:2px;border-left-color:", ";border-top-color:", ";border-right-color:", ";border-bottom-color:", ";box-shadow:", " inset 1px 1px 0px 1px ", ",inset -1px -1px 0 1px ", ";"], function (_ref9) {
    var theme = _ref9.theme;
    return theme.borderDarkest;
  }, function (_ref10) {
    var theme = _ref10.theme;
    return theme.borderDarkest;
  }, function (_ref11) {
    var theme = _ref11.theme;
    return theme.borderLightest;
  }, function (_ref12) {
    var theme = _ref12.theme;
    return theme.borderLightest;
  }, function (props) {
    return props.shadow && shadow + ", ";
  }, function (_ref13) {
    var theme = _ref13.theme;
    return theme.borderDark;
  }, function (_ref14) {
    var theme = _ref14.theme;
    return theme.borderLight;
  }) : styled.css(["border-style:solid;border-width:2px;border-left-color:", ";border-top-color:", ";border-right-color:", ";border-bottom-color:", ";box-shadow:", " inset 1px 1px 0px 1px ", ",inset -1px -1px 0 1px ", ";"], function (_ref15) {
    var theme = _ref15.theme;
    return theme.borderLightest;
  }, function (_ref16) {
    var theme = _ref16.theme;
    return theme.borderLightest;
  }, function (_ref17) {
    var theme = _ref17.theme;
    return theme.borderDarkest;
  }, function (_ref18) {
    var theme = _ref18.theme;
    return theme.borderDarkest;
  }, function (props) {
    return props.shadow && shadow + ", ";
  }, function (_ref19) {
    var theme = _ref19.theme;
    return theme.borderLight;
  }, function (_ref20) {
    var theme = _ref20.theme;
    return theme.borderDark;
  });
};
var createWellBorderStyles = function createWellBorderStyles() {
  var invert = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
  return invert ? styled.css(["border-style:solid;border-width:2px;border-left-color:", ";border-top-color:", ";border-right-color:", ";border-bottom-color:", ";"], function (_ref21) {
    var theme = _ref21.theme;
    return theme.borderDark;
  }, function (_ref22) {
    var theme = _ref22.theme;
    return theme.borderDark;
  }, function (_ref23) {
    var theme = _ref23.theme;
    return theme.borderLightest;
  }, function (_ref24) {
    var theme = _ref24.theme;
    return theme.borderLightest;
  }) : styled.css(["border-style:solid;border-width:2px;border-left-color:", ";border-top-color:", ";border-right-color:", ";border-bottom-color:", ";"], function (_ref25) {
    var theme = _ref25.theme;
    return theme.borderLightest;
  }, function (_ref26) {
    var theme = _ref26.theme;
    return theme.borderLightest;
  }, function (_ref27) {
    var theme = _ref27.theme;
    return theme.borderDark;
  }, function (_ref28) {
    var theme = _ref28.theme;
    return theme.borderDark;
  });
};

var StyledAppBar = styled__default.header.withConfig({
  displayName: "AppBar__StyledAppBar",
  componentId: "sc-1w4lbfy-0"
})(["", ";", ";position:", ";top:0;right:0;left:auto;display:flex;flex-direction:column;width:100%;"], createBorderStyles(), createBoxStyles(), function (props) {
  return props.fixed ? "fixed" : "absolute";
});

var AppBar = function AppBar(_ref) {
  var fixed = _ref.fixed,
      children = _ref.children,
      className = _ref.className,
      style = _ref.style,
      shadow = _ref.shadow,
      otherProps = _objectWithoutProperties(_ref, ["fixed", "children", "className", "style", "shadow"]);

  return React__default.createElement(StyledAppBar, _extends({
    fixed: fixed,
    style: style,
    className: className,
    shadow: shadow
  }, otherProps), children);
};

AppBar.defaultProps = {
  shadow: true,
  fixed: true
};
AppBar.propTypes = {
  style: propTypes.object,
  shadow: propTypes.bool,
  className: propTypes.string,
  children: propTypes.node.isRequired,
  fixed: propTypes.bool
};

var StyledAvatar = styled__default.div.withConfig({
  displayName: "Avatar__StyledAvatar",
  componentId: "nkqiax-0"
})(["display:inline-block;box-sizing:border-box;object-fit:contain;height:calc(", " - 2px);width:calc(", " - 2px);border-radius:", ";overflow:hidden;", " ", ""], function (props) {
  return blockSizes.md;
}, function (props) {
  return blockSizes.md;
}, function (_ref) {
  var square = _ref.square;
  return square ? 0 : "50%";
}, function (_ref2) {
  var noBorder = _ref2.noBorder,
      theme = _ref2.theme;
  return !noBorder && "\n    border-top: 2px solid ".concat(theme.borderDark, ";\n    border-left: 2px solid ").concat(theme.borderDark, ";\n    border-bottom: 2px solid ").concat(theme.borderLightest, ";\n    border-right: 2px solid ").concat(theme.borderLightest, ";\n    background: ").concat(theme.material, ";\n  ");
}, function (_ref3) {
  var src = _ref3.src;
  return !src && "\n    display: flex;\n    align-items: center;\n    justify-content: space-around;\n    font-weight: bold;\n    font-size: 1rem;\n  ";
});
var SlyledAvatarIMG = styled__default.img.withConfig({
  displayName: "Avatar__SlyledAvatarIMG",
  componentId: "nkqiax-1"
})(["display:block;object-fit:contain;width:100%;height:100%;"]); // src takes priority over children

var Avatar = function Avatar(_ref4) {
  var children = _ref4.children,
      noBorder = _ref4.noBorder,
      square = _ref4.square,
      src = _ref4.src,
      alt = _ref4.alt,
      otherProps = _objectWithoutProperties(_ref4, ["children", "noBorder", "square", "src", "alt"]);

  return React__default.createElement(StyledAvatar, _extends({
    noBorder: noBorder,
    square: square
  }, otherProps), src ? React__default.createElement(SlyledAvatarIMG, {
    src: src,
    alt: alt
  }) : children);
};

Avatar.defaultProps = {
  square: false,
  noBorder: false,
  src: undefined,
  children: null,
  alt: ""
};
Avatar.propTypes = {
  square: propTypes.bool,
  noBorder: propTypes.bool,
  children: propTypes.node,
  src: propTypes.string,
  alt: propTypes.string
};

var StyledBar = styled__default.div.withConfig({
  displayName: "Bar__StyledBar",
  componentId: "sc-1m14zj1-0"
})(["display:inline-block;box-sizing:border-box;height:", ";width:5px;border-top:2px solid ", ";border-left:2px solid ", ";border-bottom:2px solid ", ";border-right:2px solid ", ";background:", ";"], function (props) {
  return blockSizes[props.size];
}, function (_ref) {
  var theme = _ref.theme;
  return theme.borderLightest;
}, function (_ref2) {
  var theme = _ref2.theme;
  return theme.borderLightest;
}, function (_ref3) {
  var theme = _ref3.theme;
  return theme.borderDark;
}, function (_ref4) {
  var theme = _ref4.theme;
  return theme.borderDark;
}, function (_ref5) {
  var theme = _ref5.theme;
  return theme.material;
});

var Bar = function Bar(_ref6) {
  var size = _ref6.size,
      className = _ref6.className,
      style = _ref6.style,
      otherProps = _objectWithoutProperties(_ref6, ["size", "className", "style"]);

  return React__default.createElement(StyledBar, _extends({
    size: size,
    className: className,
    style: style
  }, otherProps));
};

Bar.defaultProps = {
  size: "md"
};
Bar.propTypes = {
  className: propTypes.string,
  style: propTypes.object,
  size: propTypes.oneOf(["sm", "md", "lg"])
};

var commonButtonStyles = styled.css(["position:relative;display:inline-flex;align-items:center;justify-content:center;height:", ";width:", ";padding:", ";font-size:", ";&:active{padding-top:", ";}padding-top:", ";"], function (_ref) {
  var size = _ref.size;
  return blockSizes[size];
}, function (_ref2) {
  var fullWidth = _ref2.fullWidth,
      square = _ref2.square,
      size = _ref2.size;
  return fullWidth ? "100%" : square ? blockSizes[size] : "auto";
}, function (_ref3) {
  var square = _ref3.square;
  return square ? 0 : "0 " + padding.sm;
}, fontSizes.md, function (_ref4) {
  var isDisabled = _ref4.isDisabled;
  return !isDisabled && "2px";
}, function (_ref5) {
  var active = _ref5.active,
      isDisabled = _ref5.isDisabled;
  return active && !isDisabled && "2px";
});
var StyledButton = styled__default.button.withConfig({
  displayName: "Button__StyledButton",
  componentId: "aeh8v3-0"
})(["", " ", ""], function (_ref6) {
  var variant = _ref6.variant;
  return variant === "flat" ? styled.css(["", " "], createFlatBoxStyles()) : variant === "menu" ? styled.css(["", ";border:2px solid transparent;&:hover{", "}&:active{", "}", " ", ""], createBoxStyles(), function (_ref7) {
    var isDisabled = _ref7.isDisabled,
        active = _ref7.active;
    return !isDisabled && !active && createWellBorderStyles(false);
  }, function (_ref8) {
    var isDisabled = _ref8.isDisabled;
    return !isDisabled && createWellBorderStyles(true);
  }, function (_ref9) {
    var active = _ref9.active;
    return active && createWellBorderStyles(true);
  }, function (_ref10) {
    var isDisabled = _ref10.isDisabled;
    return isDisabled && createDisabledTextStyles();
  }) : styled.css(["", ";", " ", " &:active{", "}", ""], createBoxStyles(), function (_ref11) {
    var active = _ref11.active;
    return active ? createBorderStyles(true) : createBorderStyles(false);
  }, function (_ref12) {
    var active = _ref12.active,
        theme = _ref12.theme;
    return active && "background-image: ".concat(theme.hatchedBackground, ";");
  }, function (_ref13) {
    var isDisabled = _ref13.isDisabled;
    return !isDisabled && createBorderStyles(true);
  }, function (_ref14) {
    var isDisabled = _ref14.isDisabled;
    return isDisabled && createDisabledTextStyles();
  });
}, commonButtonStyles);

var Button = function Button(_ref15) {
  var _extends2;

  var type = _ref15.type,
      onClick = _ref15.onClick,
      style = _ref15.style,
      disabled = _ref15.disabled,
      fullWidth = _ref15.fullWidth,
      size = _ref15.size,
      square = _ref15.square,
      active = _ref15.active,
      variant = _ref15.variant,
      className = _ref15.className,
      children = _ref15.children,
      otherProps = _objectWithoutProperties(_ref15, ["type", "onClick", "style", "disabled", "fullWidth", "size", "square", "active", "variant", "className", "children"]);

  return React__default.createElement(StyledButton, _extends((_extends2 = {
    type: type,
    variant: variant,
    onClick: disabled ? undefined : onClick,
    style: style,
    isDisabled: disabled,
    fullWidth: fullWidth,
    size: size,
    square: square,
    active: active,
    className: className
  }, _defineProperty(_extends2, "style", style), _defineProperty(_extends2, "onTouchStart", function onTouchStart() {
    return "";
  }), _extends2), otherProps), children);
};

Button.defaultProps = {
  type: "button",
  onClick: null,
  style: {},
  disabled: false,
  fullWidth: false,
  size: "md",
  square: false,
  active: false,
  variant: "default"
};
Button.propTypes = {
  type: propTypes.string,
  onClick: propTypes.func,
  style: propTypes.object,
  disabled: propTypes.bool,
  fullWidth: propTypes.bool,
  size: propTypes.oneOf(["sm", "md", "lg"]),
  square: propTypes.bool,
  active: propTypes.bool,
  variant: propTypes.oneOf(["default", "menu", "flat"]),
  className: propTypes.string,
  children: propTypes.node.isRequired
};

var StyledCutout = styled__default.div.withConfig({
  displayName: "Cutout__StyledCutout",
  componentId: "sc-14364r1-0"
})(["position:relative;box-sizing:border-box;padding:2px;border-style:solid;border-width:2px;border-left-color:", ";border-top-color:", ";border-right-color:", ";border-bottom-color:", ";&:before{position:absolute;left:0;top:0;z-index:1;content:\"\";width:calc(100% - 4px);height:calc(100% - 4px);border-style:solid;border-width:2px;border-left-color:", ";border-top-color:", ";border-right-color:", ";border-bottom-color:", ";pointer-events:none;", "}"], function (_ref) {
  var theme = _ref.theme;
  return theme.borderDark;
}, function (_ref2) {
  var theme = _ref2.theme;
  return theme.borderDark;
}, function (_ref3) {
  var theme = _ref3.theme;
  return theme.borderLightest;
}, function (_ref4) {
  var theme = _ref4.theme;
  return theme.borderLightest;
}, function (_ref5) {
  var theme = _ref5.theme;
  return theme.borderDarkest;
}, function (_ref6) {
  var theme = _ref6.theme;
  return theme.borderDarkest;
}, function (_ref7) {
  var theme = _ref7.theme;
  return theme.borderLight;
}, function (_ref8) {
  var theme = _ref8.theme;
  return theme.borderLight;
}, function (props) {
  return props.shadow && "box-shadow:" + insetShadow + ";";
}); // add padding prop ?

var Cutout = function Cutout(_ref9) {
  var className = _ref9.className,
      style = _ref9.style,
      children = _ref9.children,
      shadow = _ref9.shadow,
      otherProps = _objectWithoutProperties(_ref9, ["className", "style", "children", "shadow"]);

  return React__default.createElement(StyledCutout, _extends({
    shadow: shadow,
    className: className,
    style: style
  }, otherProps), children);
};

Cutout.defaultProps = {
  shadow: true
};
Cutout.propTypes = {
  className: propTypes.string,
  shadow: propTypes.bool,
  children: propTypes.node,
  style: propTypes.object
};

var checkboxSize = "20px";
var StyledLabel = styled__default.label.withConfig({
  displayName: "Checkbox__StyledLabel",
  componentId: "oa7up1-0"
})(["display:inline-block;position:relative;padding-left:calc(", " + ", ");margin:", " 0;cursor:pointer;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;font-size:", ";", ""], checkboxSize, padding.sm, padding.sm, fontSizes.md, function (props) {
  return props.isDisabled && createDisabledTextStyles();
});
var StyledInput = styled__default.input.withConfig({
  displayName: "Checkbox__StyledInput",
  componentId: "oa7up1-1"
})(["position:absolute;opacity:0;z-index:-99;"]);

var createCheckmarkSymbol = function createCheckmarkSymbol(_ref) {
  var checked = _ref.checked;
  return checked && styled.css(["&:after{content:\"\";display:block;position:absolute;left:50%;top:calc(50% - 1px);width:3px;height:7px;border:solid ", ";border-width:0 3px 3px 0;transform:translate(-50%,-50%) rotate(45deg);}"], function (_ref2) {
    var theme = _ref2.theme;
    return theme.checkmark;
  });
};

var sharedCheckmarkStyles = styled.css(["position:absolute;top:50%;left:0;transform:translateY(-50%);width:", ";height:", ";", ""], checkboxSize, checkboxSize, function (props) {
  return createCheckmarkSymbol(props);
});
var StyledCheckmark = styled__default(Cutout).withConfig({
  displayName: "Checkbox__StyledCheckmark",
  componentId: "oa7up1-2"
})(["", " background:", ";box-shadow:", ";&:before{box-shadow:none;}"], sharedCheckmarkStyles, function (_ref3) {
  var theme = _ref3.theme,
      isDisabled = _ref3.isDisabled;
  return isDisabled ? theme.material : theme.canvas;
}, function (_ref4) {
  var shadow = _ref4.shadow;
  return shadow ? "inset 3px 3px 10px rgba(0, 0, 0, 0.1)" : "none";
});
var StyledFlatCheckmark = styled__default.div.withConfig({
  displayName: "Checkbox__StyledFlatCheckmark",
  componentId: "oa7up1-3"
})(["", " ", " background:", ";"], createFlatBoxStyles(), sharedCheckmarkStyles, function (_ref5) {
  var theme = _ref5.theme,
      isDisabled = _ref5.isDisabled;
  return isDisabled ? theme.flatLight : theme.canvas;
});

var Checkbox = function Checkbox(_ref6) {
  var onChange = _ref6.onChange,
      label = _ref6.label,
      disabled = _ref6.disabled,
      variant = _ref6.variant,
      value = _ref6.value,
      checked = _ref6.checked,
      defaultChecked = _ref6.defaultChecked,
      name = _ref6.name,
      className = _ref6.className,
      style = _ref6.style,
      shadow = _ref6.shadow,
      otherProps = _objectWithoutProperties(_ref6, ["onChange", "label", "disabled", "variant", "value", "checked", "defaultChecked", "name", "className", "style", "shadow"]);

  var Input;
  var Checkmark = variant === "flat" ? StyledFlatCheckmark : StyledCheckmark;

  if (defaultChecked || checked === undefined) {
    var _useState = React.useState(defaultChecked || false),
        _useState2 = _slicedToArray(_useState, 2),
        state = _useState2[0],
        setState = _useState2[1];

    var handleChange = function handleChange(e) {
      var newState = e.target.checked;
      setState(newState);
      onChange && onChange(e);
    };

    Input = React__default.createElement(React__default.Fragment, null, React__default.createElement(StyledInput, _extends({
      onChange: disabled ? undefined : handleChange,
      readOnly: disabled,
      type: "checkbox",
      value: value,
      checked: state,
      name: name
    }, otherProps)), React__default.createElement(Checkmark, {
      checked: state,
      isDisabled: disabled,
      shadow: shadow
    }));
  } else {
    Input = React__default.createElement(React__default.Fragment, null, React__default.createElement(StyledInput, _extends({
      onChange: disabled ? undefined : onChange,
      readOnly: disabled,
      type: "checkbox",
      value: value,
      checked: checked,
      name: name
    }, otherProps)), React__default.createElement(Checkmark, {
      checked: checked,
      isDisabled: disabled,
      shadow: shadow
    }));
  }

  return React__default.createElement(StyledLabel, {
    isDisabled: disabled,
    className: className,
    style: style
  }, label, Input);
};

Checkbox.defaultProps = {
  name: "",
  value: null,
  label: "",
  disabled: false,
  variant: "default",
  shadow: true
};
Checkbox.propTypes = {
  onChange: propTypes.func,
  name: propTypes.string.isRequired,
  value: propTypes.oneOfType([propTypes.string, propTypes.number, propTypes.bool]).isRequired,
  label: propTypes.oneOfType([propTypes.string, propTypes.number]),
  checked: propTypes.bool,
  disabled: propTypes.bool,
  variant: propTypes.oneOf(["default", "flat"]),
  shadow: propTypes.bool,
  style: propTypes.object
};

var StyledWindow = styled__default.div.withConfig({
  displayName: "Window__StyledWindow",
  componentId: "sc-183z2c8-0"
})(["position:relative;padding:2px;", " ", ""], createBorderStyles(), createBoxStyles());

var Window = function Window(_ref) {
  var shadow = _ref.shadow,
      className = _ref.className,
      children = _ref.children,
      otherProps = _objectWithoutProperties(_ref, ["shadow", "className", "children"]);

  return React__default.createElement(StyledWindow, _extends({
    shadow: shadow,
    className: className
  }, otherProps, {
    swag: true
  }), children);
};

Window.defaultProps = {
  shadow: true
};
Window.propTypes = {
  shadow: propTypes.bool,
  className: propTypes.string,
  children: propTypes.node
};

var SlyledWindowHeader = styled__default.div.withConfig({
  displayName: "WindowHeader__SlyledWindowHeader",
  componentId: "fk6jm7-0"
})(["height:33px;line-height:33px;padding:0 ", ";margin-right:2px;margin-bottom:4px;font-weight:bold;color:", ";background:linear-gradient( to right,", ",", " );"], padding.sm, function (_ref) {
  var theme = _ref.theme;
  return theme.textInvert;
}, function (_ref2) {
  var theme = _ref2.theme;
  return theme.headerMaterialDark;
}, function (_ref3) {
  var theme = _ref3.theme;
  return theme.headerMaterialLight;
});

var WindowHeader = function WindowHeader(_ref4) {
  var className = _ref4.className,
      style = _ref4.style,
      children = _ref4.children,
      otherProps = _objectWithoutProperties(_ref4, ["className", "style", "children"]);

  return React__default.createElement(SlyledWindowHeader, _extends({
    className: className,
    style: style
  }, otherProps), children);
};

WindowHeader.propTypes = {
  className: propTypes.string,
  style: propTypes.object,
  children: propTypes.node
};

var StyledWindowContent = styled__default.div.withConfig({
  displayName: "WindowContent__StyledWindowContent",
  componentId: "xyx3xs-0"
})(["padding:", ";margin-right:2px;"], padding.md);

var WindowContent = function WindowContent(_ref) {
  var className = _ref.className,
      children = _ref.children,
      style = _ref.style,
      otherProps = _objectWithoutProperties(_ref, ["className", "children", "style"]);

  return React__default.createElement(StyledWindowContent, _extends({
    className: className,
    style: style
  }, otherProps), children);
};

WindowContent.defaultProps = {};
WindowContent.propTypes = {
  className: propTypes.string,
  style: propTypes.object,
  children: propTypes.node
};

var sharedWrapperStyles = styled.css(["height:", ";display:flex;align-items:center;justify-content:space-between;background:", ";color:", ";font-size:", ";"], blockSizes.md, function (_ref) {
  var theme = _ref.theme;
  return theme.canvas;
}, function (_ref2) {
  var theme = _ref2.theme;
  return theme.inputText;
}, fontSizes.md);
var StyledSelectWrapper = styled__default(Cutout).withConfig({
  displayName: "Select__StyledSelectWrapper",
  componentId: "x1tonx-0"
})(["", ""], sharedWrapperStyles);
var StyledFlatSelectWrapper = styled__default.div.withConfig({
  displayName: "Select__StyledFlatSelectWrapper",
  componentId: "x1tonx-1"
})(["", " ", ""], createFlatBoxStyles(), sharedWrapperStyles);
var StyledSelectContent = styled__default.div.withConfig({
  displayName: "Select__StyledSelectContent",
  componentId: "x1tonx-2"
})(["width:100%;padding-left:", ";overflow:hidden;white-space:nowrap;"], padding.sm);
var StyledDropdownButton = styled__default(Button).withConfig({
  displayName: "Select__StyledDropdownButton",
  componentId: "x1tonx-3"
})(["width:30px;padding:0;z-index:1;flex-shrink:0;", ""], function (_ref3) {
  var variant = _ref3.variant;
  return variant === "flat" ? styled.css(["height:calc(100% - 4px);margin-right:2px;"]) : styled.css(["height:100%;border-left-color:", ";border-top-color:", ";box-shadow:inset 1px 1px 0px 1px ", ",inset -1px -1px 0 1px ", ";"], function (_ref4) {
    var theme = _ref4.theme;
    return theme.borderLight;
  }, function (_ref5) {
    var theme = _ref5.theme;
    return theme.borderLight;
  }, function (_ref6) {
    var theme = _ref6.theme;
    return theme.borderLightest;
  }, function (_ref7) {
    var theme = _ref7.theme;
    return theme.borderDark;
  });
});
var StyledDropdownIcon = styled__default.span.withConfig({
  displayName: "Select__StyledDropdownIcon",
  componentId: "x1tonx-4"
})(["position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);width:0px;height:0px;border-left:6px solid transparent;border-right:6px solid transparent;display:inline-block;border-top:6px solid ", ";", ":active &{margin-top:2px;}"], function (_ref8) {
  var theme = _ref8.theme;
  return theme.text;
}, StyledDropdownButton);
var StyledDropdownList = styled__default.ul.withConfig({
  displayName: "Select__StyledDropdownList",
  componentId: "x1tonx-5"
})(["box-sizing:border-box;font-size:", ";position:absolute;transform:translateY(100%);left:0px;background:", ";padding:2px;border-top:none;cursor:default;z-index:99;", ""], fontSizes.md, function (_ref9) {
  var theme = _ref9.theme;
  return theme.canvas;
}, function (_ref10) {
  var variant = _ref10.variant;
  return variant === "flat" ? styled.css(["bottom:2px;width:100%;border:2px solid ", ";"], function (_ref11) {
    var theme = _ref11.theme;
    return theme.flatDark;
  }) : styled.css(["box-shadow:", ";bottom:-2px;width:calc(100% - 2px);border:2px solid ", ";"], function (props) {
    return props.shadow ? shadow : "none";
  }, function (_ref12) {
    var theme = _ref12.theme;
    return theme.borderDarkest;
  });
});
var StyledDropdownListItem = styled__default.li.withConfig({
  displayName: "Select__StyledDropdownListItem",
  componentId: "x1tonx-6"
})(["box-sizing:border-box;width:100%;padding-left:", ";height:calc(", " - 4px);line-height:calc(", " - 4px);font-size:", ";white-space:nowrap;color:", ";&:hover{background:", ";color:", ";}"], padding.sm, blockSizes.md, blockSizes.md, fontSizes.md, function (_ref13) {
  var theme = _ref13.theme;
  return theme.inputText;
}, function (_ref14) {
  var theme = _ref14.theme;
  return theme.hoverBackground;
}, function (_ref15) {
  var theme = _ref15.theme;
  return theme.inputTextInvert;
});

var Select = function Select(_ref16) {
  var items = _ref16.items,
      selectedIndex = _ref16.selectedIndex,
      shadow = _ref16.shadow,
      variant = _ref16.variant,
      width = _ref16.width,
      height = _ref16.height,
      otherProps = _ref16.otherProps,
      className = _ref16.className,
      onChange = _ref16.onChange,
      style = _ref16.style;

  var _useState = React.useState(selectedIndex),
      _useState2 = _slicedToArray(_useState, 2),
      index = _useState2[0],
      setIndex = _useState2[1];

  var _useState3 = React.useState(false),
      _useState4 = _slicedToArray(_useState3, 2),
      open = _useState4[0],
      setOpen = _useState4[1];

  var handleSelect = function handleSelect(i) {
    if (onChange) onChange(items[i].value);
    setIndex(i);
  };

  var Wrapper = variant === "flat" ? StyledFlatSelectWrapper : StyledSelectWrapper;
  return React__default.createElement(Wrapper, _extends({
    className: className,
    onClick: function onClick() {
      return setOpen(!open);
    },
    style: _objectSpread({}, style, {
      width: width
    }),
    shadow: shadow
  }, otherProps), React__default.createElement(StyledSelectContent, null, items.length ? items[index].label : ""), React__default.createElement(StyledDropdownButton, {
    variant: variant
  }, React__default.createElement(StyledDropdownIcon, null)), open && React__default.createElement(StyledDropdownList, {
    shadow: shadow,
    variant: variant,
    style: height && {
      overflowY: "scroll",
      height: height
    }
  }, items.map(function (item, i) {
    return React__default.createElement(StyledDropdownListItem, {
      key: i,
      onClick: function onClick(e) {
        handleSelect(i);
      }
    }, item.label);
  })));
};

Select.propTypes = {
  items: propTypes.arrayOf(propTypes.object).isRequired,
  className: propTypes.string,
  width: propTypes.number,
  height: propTypes.number,
  selectedIndex: propTypes.number,
  shadow: propTypes.bool,
  variant: propTypes.oneOf(["default", "flat"]),
  style: propTypes.object,
  onChange: propTypes.func
};
Select.defaultProps = {
  style: {},
  shadow: true,
  variant: "default",
  selectedIndex: 0
};

var StyledWrapper = styled__default(Cutout).withConfig({
  displayName: "TextField__StyledWrapper",
  componentId: "sc-1gedb62-0"
})(["height:", ";background:", ";"], blockSizes.md, function (_ref) {
  var theme = _ref.theme,
      isDisabled = _ref.isDisabled;
  return isDisabled ? theme.material : theme.canvas;
});
var StyledFlatWrapper = styled__default.div.withConfig({
  displayName: "TextField__StyledFlatWrapper",
  componentId: "sc-1gedb62-1"
})(["position:relative;height:", ";", ""], blockSizes.md, createFlatBoxStyles());
var StyledTextInput = styled__default.input.withConfig({
  displayName: "TextField__StyledTextInput",
  componentId: "sc-1gedb62-2"
})(["box-sizing:border-box;width:100%;height:100%;padding:0 ", ";outline:none;border:none;background:none;font-size:", ";font-family:", ";", ""], padding.sm, fontSizes.md, fontFamily, function (_ref2) {
  var disabled = _ref2.disabled,
      variant = _ref2.variant;
  return variant !== "flat" && disabled && createDisabledTextStyles();
});

var TextField = function TextField(_ref3) {
  var onChange = _ref3.onChange,
      disabled = _ref3.disabled,
      variant = _ref3.variant,
      type = _ref3.type,
      style = _ref3.style,
      shadow = _ref3.shadow,
      className = _ref3.className,
      width = _ref3.width,
      otherProps = _objectWithoutProperties(_ref3, ["onChange", "disabled", "variant", "type", "style", "shadow", "className", "width"]);

  var Wrapper = variant === "flat" ? StyledFlatWrapper : StyledWrapper;
  return React__default.createElement(Wrapper, {
    width: width,
    shadow: shadow,
    isDisabled: disabled,
    style: _objectSpread({}, style, {
      width: width ? width : "auto"
    }),
    className: className
  }, React__default.createElement(StyledTextInput, _extends({
    onChange: disabled ? undefined : onChange,
    readOnly: disabled,
    disabled: disabled,
    variant: variant,
    type: type
  }, otherProps)));
};

TextField.defaultProps = {
  disabled: false,
  type: "text",
  shadow: true,
  variant: "default"
};
TextField.propTypes = {
  width: propTypes.oneOfType([propTypes.string, propTypes.number]),
  onChange: propTypes.func,
  disabled: propTypes.bool,
  variant: propTypes.oneOf(["default", "flat"]),
  shadow: propTypes.bool,
  type: propTypes.string,
  className: propTypes.string
};

var StyledNumberFieldWrapper = styled__default.div.withConfig({
  displayName: "NumberField__StyledNumberFieldWrapper",
  componentId: "sc-4z4nbn-0"
})(["display:inline-flex;align-items:center;"]);
var StyledButtonWrapper = styled__default.div.withConfig({
  displayName: "NumberField__StyledButtonWrapper",
  componentId: "sc-4z4nbn-1"
})(["height:", ";display:flex;flex-direction:column;flex-wrap:nowrap;margin-left:2px;margin-top:", ";"], blockSizes.md, function (_ref) {
  var variant = _ref.variant;
  return variant === "default" ? "-2px" : "0";
});
var StyledButton$1 = styled__default(Button).withConfig({
  displayName: "NumberField__StyledButton",
  componentId: "sc-4z4nbn-2"
})(["height:50%;width:30px;padding:0;flex-shrink:0;", ""], function (_ref2) {
  var theme = _ref2.theme,
      isFlat = _ref2.isFlat;
  return !isFlat && styled.css(["border-left-color:", ";border-top-color:", ";box-shadow:inset 1px 1px 0px 1px ", ",inset -1px -1px 0 1px ", ";"], function (_ref3) {
    var theme = _ref3.theme;
    return theme.borderLight;
  }, function (_ref4) {
    var theme = _ref4.theme;
    return theme.borderLight;
  }, function (_ref5) {
    var theme = _ref5.theme;
    return theme.borderLightest;
  }, function (_ref6) {
    var theme = _ref6.theme;
    return theme.borderDark;
  });
});
var StyledFlatButton = styled__default(Button).withConfig({
  displayName: "NumberField__StyledFlatButton",
  componentId: "sc-4z4nbn-3"
})(["height:50%;width:30px;padding:0;flex-shrink:0;"]);
var StyledButtonIcon = styled__default.span.withConfig({
  displayName: "NumberField__StyledButtonIcon",
  componentId: "sc-4z4nbn-4"
})(["position:absolute;left:50%;top:50%;transform:translate(-50%,-50%) ", ";width:0px;height:0px;border-left:4px solid transparent;border-right:4px solid transparent;display:inline-block;border-top:4px solid ", ";", ":active &{margin-top:2px;}"], function (props) {
  return props.invert && "rotateZ(180deg)";
}, function (_ref7) {
  var theme = _ref7.theme;
  return theme.text;
}, StyledButton$1);

var NumberField =
/*#__PURE__*/
function (_React$Component) {
  _inherits(NumberField, _React$Component);

  function NumberField() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, NumberField);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(NumberField)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "state", {
      value: parseInt(_this.props.value) || 0
    });

    _defineProperty(_assertThisInitialized(_this), "add", function (value) {
      var newValue = _this.normalize(_this.state.value + value);

      _this.props.onChange(newValue);

      _this.setState({
        value: newValue
      });
    });

    _defineProperty(_assertThisInitialized(_this), "handleChange", function (e) {
      var newValue = e.target.value === "-" ? "-" : _this.normalize(e.target.value);
      newValue = newValue ? newValue : newValue === 0 ? 0 : "";

      if (e.target.validity.valid) {
        _this.setState({
          value: newValue
        });

        _this.props.onChange(newValue);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "normalize", function (value) {
      var _this$props = _this.props,
          min = _this$props.min,
          max = _this$props.max;
      if (min !== undefined && value < min) return min;
      if (max !== undefined && value > max) return max;
      return parseInt(value);
    });

    return _this;
  }

  _createClass(NumberField, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props2 = this.props,
          disabled = _this$props2.disabled,
          disableKeyboardInput = _this$props2.disableKeyboardInput,
          className = _this$props2.className,
          variant = _this$props2.variant,
          width = _this$props2.width,
          style = _this$props2.style,
          shadow = _this$props2.shadow;
      var value = this.state.value;
      return React__default.createElement(StyledNumberFieldWrapper, {
        className: className,
        style: _objectSpread({}, style, {
          width: width ? width : "auto"
        })
      }, React__default.createElement(TextField, {
        value: value,
        variant: variant,
        onChange: disabled || disableKeyboardInput ? undefined : this.handleChange,
        readOnly: disabled || disableKeyboardInput,
        disabled: disabled,
        shadow: shadow,
        type: "tel",
        pattern: "^-?[0-9]\\d*\\.?\\d*$",
        width: "100%"
      }), React__default.createElement(StyledButtonWrapper, null, React__default.createElement(StyledButton$1, {
        isFlat: variant === "flat",
        variant: variant,
        disabled: disabled,
        onClick: function onClick() {
          return _this2.add(1);
        }
      }, React__default.createElement(StyledButtonIcon, {
        invert: true
      })), React__default.createElement(StyledButton$1, {
        isFlat: variant === "flat",
        variant: variant,
        disabled: disabled,
        onClick: function onClick() {
          return _this2.add(-1);
        }
      }, React__default.createElement(StyledButtonIcon, null))));
    }
  }]);

  return NumberField;
}(React__default.Component);

_defineProperty(NumberField, "defaultProps", {
  variant: "default",
  value: 0,
  disabled: false
});

_defineProperty(NumberField, "propTypes", {
  variant: propTypes.oneOf(["default", "flat"]),
  onChange: propTypes.func.isRequired,
  value: propTypes.number.isRequired,
  min: propTypes.number,
  max: propTypes.number,
  width: propTypes.oneOfType([propTypes.string, propTypes.number]),
  disabled: propTypes.bool,
  disableKeyboardInput: propTypes.bool,
  fullWidth: propTypes.bool,
  shadow: propTypes.bool,
  className: propTypes.string
});

var StyledToolbar = styled__default.div.withConfig({
  displayName: "Toolbar__StyledToolbar",
  componentId: "sy5udo-0"
})(["position:relative;display:flex;align-items:center;padding:", ";"], function (props) {
  return props.noPadding ? "0px" : "4px";
});

var Toolbar = function Toolbar(_ref) {
  var children = _ref.children,
      className = _ref.className,
      style = _ref.style,
      noPadding = _ref.noPadding,
      otherProps = _objectWithoutProperties(_ref, ["children", "className", "style", "noPadding"]);

  return React__default.createElement(StyledToolbar, _extends({
    noPadding: noPadding,
    className: className,
    style: style
  }, otherProps), children);
};

Toolbar.defaultProps = {
  noPadding: false
};
Toolbar.propTypes = {
  style: propTypes.object,
  className: propTypes.string,
  children: propTypes.node.isRequired,
  noPadding: propTypes.bool
};

var Calendar = styled__default(Cutout).withConfig({
  displayName: "DatePicker__Calendar",
  componentId: "sc-401e8-0"
})(["width:234px;margin:1rem 0;background:", ";"], function (_ref) {
  var theme = _ref.theme;
  return theme.canvas;
});
var WeekDays = styled__default.div.withConfig({
  displayName: "DatePicker__WeekDays",
  componentId: "sc-401e8-1"
})(["display:flex;background:", ";color:#dfe0e3;"], function (_ref2) {
  var theme = _ref2.theme;
  return theme.materialDark;
});
var Dates = styled__default.div.withConfig({
  displayName: "DatePicker__Dates",
  componentId: "sc-401e8-2"
})(["display:flex;flex-wrap:wrap;"]);
var DateItem = styled__default.div.withConfig({
  displayName: "DatePicker__DateItem",
  componentId: "sc-401e8-3"
})(["text-align:center;height:1.5em;line-height:1.5em;width:14.28%;"]);
var DateItemContent = styled__default.span.withConfig({
  displayName: "DatePicker__DateItemContent",
  componentId: "sc-401e8-4"
})(["cursor:pointer;background:", ";color:", ";&:hover{border:2px dashed ", ";}"], function (_ref3) {
  var active = _ref3.active,
      theme = _ref3.theme;
  return active ? theme.hoverBackground : "transparent";
}, function (_ref4) {
  var active = _ref4.active,
      theme = _ref4.theme;
  return active ? theme.textInvert : "initial";
}, function (_ref5) {
  var theme = _ref5.theme,
      active = _ref5.active;
  return active ? "none" : theme.materialDark;
});

function daysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}

function dayIndex(year, month, day) {
  return new Date(year, month, day).getDay();
}

var DatePicker =
/*#__PURE__*/
function (_Component) {
  _inherits(DatePicker, _Component);

  function DatePicker(props) {
    var _this;

    _classCallCheck(this, DatePicker);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(DatePicker).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "convertDateToState", function (date) {
      var day = date.getDate();
      var month = date.getMonth();
      var year = date.getFullYear();
      return {
        day: day,
        month: month,
        year: year
      };
    });

    _defineProperty(_assertThisInitialized(_this), "handleMonthSelect", function (month) {
      return _this.setState({
        month: month
      });
    });

    _defineProperty(_assertThisInitialized(_this), "handleYearSelect", function (year) {
      return _this.setState({
        year: year
      });
    });

    _defineProperty(_assertThisInitialized(_this), "handleDaySelect", function (day) {
      return _this.setState({
        day: day
      });
    });

    _defineProperty(_assertThisInitialized(_this), "handleAccept", function () {
      var _this$state = _this.state,
          year = _this$state.year,
          month = _this$state.month,
          day = _this$state.day;
      var date = new Date(year, month, day);

      _this.props.onAccept(date);
    });

    var initialDate = _this.convertDateToState(props.date || new Date());

    _this.state = initialDate;
    return _this;
  }

  _createClass(DatePicker, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$state2 = this.state,
          day = _this$state2.day,
          month = _this$state2.month,
          year = _this$state2.year;
      var _this$props = this.props,
          shadow = _this$props.shadow,
          className = _this$props.className,
          onAccept = _this$props.onAccept,
          onCancel = _this$props.onCancel;
      var months = [{
        value: 0,
        label: "January"
      }, {
        value: 1,
        label: "February"
      }, {
        value: 2,
        label: "March"
      }, {
        value: 3,
        label: "April"
      }, {
        value: 4,
        label: "May"
      }, {
        value: 5,
        label: "June"
      }, {
        value: 6,
        label: "July"
      }, {
        value: 7,
        label: "August"
      }, {
        value: 8,
        label: "September"
      }, {
        value: 9,
        label: "October"
      }, {
        value: 10,
        label: "November"
      }, {
        value: 11,
        label: "December"
      }];
      var dayPickerItems = Array.apply(null, {
        length: 35
      });
      var firstDayIndex = dayIndex(year, month, 1);
      var daysNumber = daysInMonth(year, month);
      day = day < daysNumber ? day : daysNumber;
      dayPickerItems.forEach(function (item, i) {
        if (i >= firstDayIndex && i < daysNumber + firstDayIndex) {
          var dayNumber = i - firstDayIndex + 1;
          dayPickerItems[i] = React__default.createElement(DateItem, {
            key: i,
            onClick: function onClick() {
              _this2.handleDaySelect(dayNumber);
            }
          }, React__default.createElement(DateItemContent, {
            active: dayNumber === day
          }, dayNumber));
        } else {
          dayPickerItems[i] = React__default.createElement(DateItem, {
            key: i
          });
        }
      });
      return React__default.createElement(Window, {
        style: {
          margin: 20
        },
        className: className,
        shadow: shadow
      }, React__default.createElement(WindowHeader, null, "\uD83D\uDCC6 Date"), React__default.createElement(WindowContent, null, React__default.createElement(Toolbar, {
        noPadding: true,
        style: {
          justifyContent: "space-between"
        }
      }, React__default.createElement(Select, {
        items: months,
        selectedIndex: month,
        onChange: this.handleMonthSelect,
        width: 128,
        height: 200
      }), React__default.createElement(NumberField, {
        value: year,
        disableKeyboardInput: true,
        onChange: this.handleYearSelect,
        width: 100
      })), React__default.createElement(Calendar, null, React__default.createElement(WeekDays, null, React__default.createElement(DateItem, null, "S"), React__default.createElement(DateItem, null, "M"), React__default.createElement(DateItem, null, "T"), React__default.createElement(DateItem, null, "W"), React__default.createElement(DateItem, null, "T"), React__default.createElement(DateItem, null, "F"), React__default.createElement(DateItem, null, "S")), React__default.createElement(Dates, null, dayPickerItems)), React__default.createElement(Toolbar, {
        noPadding: true,
        style: {
          justifyContent: "space-between"
        }
      }, React__default.createElement(Button, {
        fullWidth: true,
        onClick: onCancel ? onCancel : undefined,
        disabled: !onCancel
      }, "Cancel"), React__default.createElement(Button, {
        fullWidth: true,
        onClick: onAccept ? this.handleAccept : undefined,
        disabled: !onAccept
      }, "OK"))));
    }
  }]);

  return DatePicker;
}(React.Component);

_defineProperty(DatePicker, "propTypes", {
  className: propTypes.string,
  shadow: propTypes.bool,
  onAccept: propTypes.func,
  onCancel: propTypes.func,
  date: propTypes.instanceOf(Date)
});

_defineProperty(DatePicker, "defaultProps", {
  shadow: true,
  style: {}
});

var StyledDivider = styled__default.hr.withConfig({
  displayName: "Divider__StyledDivider",
  componentId: "ihk56-0"
})(["", ""], function (_ref) {
  var vertical = _ref.vertical,
      theme = _ref.theme,
      size = _ref.size;
  return vertical ? "\n    height: ".concat(blockSizes[size], ";\n    border-left: 2px solid ").concat(theme.borderDark, ";\n    border-right: 2px solid ").concat(theme.borderLightest, ";\n    margin: 0;\n    ") : "\n    width: 100%;\n    border-bottom: 2px solid ".concat(theme.borderLightest, ";\n    border-top: 2px solid ").concat(theme.borderDark, ";\n    margin: 0;\n    ");
});

var Divider = function Divider(_ref2) {
  var vertical = _ref2.vertical,
      className = _ref2.className,
      style = _ref2.style,
      otherProps = _objectWithoutProperties(_ref2, ["vertical", "className", "style"]);

  return React__default.createElement(StyledDivider, _extends({
    vertical: vertical,
    as: vertical ? "div" : "hr",
    className: className,
    style: style
  }, otherProps));
};

Divider.defaultProps = {
  size: "md",
  vertical: false
};
Divider.propTypes = {
  vertical: propTypes.bool,
  size: propTypes.oneOf(["sm", "md", "lg"]),
  className: propTypes.string,
  style: propTypes.object
};

var StyledFieldset = styled__default.fieldset.withConfig({
  displayName: "Fieldset__StyledFieldset",
  componentId: "sc-1js25js-0"
})(["position:relative;border:2px solid ", ";padding:", ";margin-top:", ";font-size:", ";color:", ";", ""], function (_ref) {
  var theme = _ref.theme,
      variant = _ref.variant;
  return variant === "flat" ? theme.flatDark : theme.borderLightest;
}, padding.md, padding.sm, fontSizes.md, function (_ref2) {
  var theme = _ref2.theme;
  return theme.text;
}, function (_ref3) {
  var variant = _ref3.variant;
  return variant !== "flat" && styled.css(["box-shadow:-1px -1px 0 1px ", ",inset -1px -1px 0 1px ", ";"], function (_ref4) {
    var theme = _ref4.theme;
    return theme.borderDark;
  }, function (_ref5) {
    var theme = _ref5.theme;
    return theme.borderDark;
  });
});
var StyledLegend = styled__default.legend.withConfig({
  displayName: "Fieldset__StyledLegend",
  componentId: "sc-1js25js-1"
})(["position:absolute;top:0;left:", ";transform:translateY(calc(-50% - 2px));padding:0 ", ";font-size:", ";background:", ";"], padding.sm, padding.sm, fontSizes.md, function (_ref6) {
  var theme = _ref6.theme,
      variant = _ref6.variant;
  return variant === "flat" ? theme.canvas : theme.material;
});
var StyledFieldsetContent = styled__default.div.withConfig({
  displayName: "Fieldset__StyledFieldsetContent",
  componentId: "sc-1js25js-2"
})(["", ""], function (props) {
  return props.isDisabled && createDisabledTextStyles();
});

var Fieldset = function Fieldset(_ref7) {
  var label = _ref7.label,
      disabled = _ref7.disabled,
      variant = _ref7.variant,
      children = _ref7.children,
      className = _ref7.className,
      style = _ref7.style,
      otherProps = _objectWithoutProperties(_ref7, ["label", "disabled", "variant", "children", "className", "style"]);

  return React__default.createElement(StyledFieldset, _extends({
    isDisabled: disabled,
    variant: variant,
    style: style,
    className: className
  }, otherProps), label && React__default.createElement(StyledLegend, {
    variant: variant
  }, label), React__default.createElement(StyledFieldsetContent, {
    isDisabled: disabled
  }, children));
};

Fieldset.defaultProps = {
  disabled: false,
  variant: "default"
};
Fieldset.propTypes = {
  label: propTypes.oneOfType([propTypes.string, propTypes.number, propTypes.node]),
  className: propTypes.string,
  style: propTypes.object,
  children: propTypes.node,
  disabled: propTypes.bool,
  variant: propTypes.oneOf(["default", "flat"])
};

var base64hourglass = "url('data:image/gif;base64,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')";

var StyledContainer = styled__default.span.withConfig({
  displayName: "Hourglass__StyledContainer",
  componentId: "ra07b9-0"
})(["display:inline-block;"]);
var StyledHourglass = styled__default.span.withConfig({
  displayName: "Hourglass__StyledHourglass",
  componentId: "ra07b9-1"
})(["display:block;background:", ";background-size:cover;width:100%;height:100%;"], base64hourglass);

var Hourglass = function Hourglass(_ref) {
  var size = _ref.size,
      className = _ref.className,
      style = _ref.style,
      otherProps = _objectWithoutProperties(_ref, ["size", "className", "style"]);

  return React__default.createElement(StyledContainer, _extends({
    className: className,
    style: _objectSpread({}, style, {
      width: size ? size : "30px",
      height: size ? size : "30px"
    })
  }, otherProps), React__default.createElement(StyledHourglass, null));
};

Hourglass.defaultProps = {
  size: "30px"
};
Hourglass.propTypes = {
  size: propTypes.oneOfType([propTypes.string, propTypes.number]),
  className: propTypes.string,
  style: propTypes.object
};

var createListPositionStyles = function createListPositionStyles(_ref) {
  var _ref$verticalAlign = _ref.verticalAlign,
      verticalAlign = _ref$verticalAlign === void 0 ? "bottom" : _ref$verticalAlign,
      _ref$horizontalAlign = _ref.horizontalAlign,
      horizontalAlign = _ref$horizontalAlign === void 0 ? "left" : _ref$horizontalAlign;
  return "\n    position: absolute;\n    ".concat(verticalAlign === "bottom" ? "bottom: 0;" : "top: 0;", "\n    ").concat(horizontalAlign === "left" ? "left: 0;" : "right: 0;", "\n\n    transform: translate(0, ").concat(verticalAlign === "top" ? "-100%" : "100%", ")\n  ");
};

var StyledList = styled__default.ul.withConfig({
  displayName: "List__StyledList",
  componentId: "sc-1gc3eq-0"
})(["box-sizing:border-box;width:", ";padding:2px 4px 4px 2px;", " ", " ", " list-style:none;position:relative;", ""], function (props) {
  return props.fullWidth ? "100%" : "auto";
}, createBorderStyles(), createBoxStyles(), function (props) {
  return props.inline && "\n    align-items: center;\n    display: inline-flex;\n  ";
}, function (props) {
  return (props.horizontalAlign || props.verticalAlign) && createListPositionStyles;
});

var List = function List(_ref2) {
  var inline = _ref2.inline,
      shadow = _ref2.shadow,
      className = _ref2.className,
      style = _ref2.style,
      children = _ref2.children,
      fullWidth = _ref2.fullWidth,
      verticalAlign = _ref2.verticalAlign,
      horizontalAlign = _ref2.horizontalAlign,
      otherProps = _objectWithoutProperties(_ref2, ["inline", "shadow", "className", "style", "children", "fullWidth", "verticalAlign", "horizontalAlign"]);

  return React__default.createElement(StyledList, _extends({
    inline: inline,
    verticalAlign: verticalAlign,
    horizontalAlign: horizontalAlign,
    shadow: shadow,
    fullWidth: fullWidth,
    className: className,
    style: style
  }, otherProps), children);
};

List.defaultProps = {
  style: {},
  fullWidth: false,
  shadow: true,
  inline: false
};
List.propTypes = {
  className: propTypes.string,
  style: propTypes.object,
  fullWidth: propTypes.bool,
  inline: propTypes.bool,
  shadow: propTypes.bool,
  children: propTypes.node,
  verticalAlign: propTypes.oneOf(["top", "bottom"]),
  horizontalAlign: propTypes.oneOf(["left", "right"])
};

var StyledListItem = styled__default.li.withConfig({
  displayName: "ListItem__StyledListItem",
  componentId: "sc-754ppf-0"
})(["box-sizing:border-box;display:block;position:relative;height:", ";width:", ";padding:0 ", ";white-space:nowrap;text-align:", ";line-height:", ";color:", ";&:hover{", " cursor:default;}", ""], function (props) {
  return blockSizes[props.size];
}, function (props) {
  return props.square ? blockSizes[props.size] : "auto";
}, padding.sm, function (props) {
  return props.square ? "center" : "left";
}, function (props) {
  return blockSizes[props.size];
}, function (_ref) {
  var theme = _ref.theme;
  return theme.text;
}, function (_ref2) {
  var theme = _ref2.theme,
      isDisabled = _ref2.isDisabled;
  return !isDisabled && "\n        color: ".concat(theme.textInvert, ";\n        background: ").concat(theme.hoverBackground, ";\n      ");
}, function (props) {
  return props.isDisabled && createDisabledTextStyles();
});

var ListItem = function ListItem(_ref3) {
  var size = _ref3.size,
      disabled = _ref3.disabled,
      square = _ref3.square,
      className = _ref3.className,
      style = _ref3.style,
      children = _ref3.children,
      onClick = _ref3.onClick,
      otherProps = _objectWithoutProperties(_ref3, ["size", "disabled", "square", "className", "style", "children", "onClick"]);

  return React__default.createElement(StyledListItem, _extends({
    size: size,
    isDisabled: disabled,
    square: square,
    className: className,
    style: style,
    onClick: disabled ? undefined : onClick
  }, otherProps), children);
};

ListItem.defaultProps = {
  style: {},
  disabled: false,
  size: "lg",
  square: false,
  onClick: null
};
ListItem.propTypes = {
  className: propTypes.string,
  href: propTypes.string,
  style: propTypes.object,
  size: propTypes.oneOf(["sm", "md", "lg"]),
  disabled: propTypes.bool,
  fullWidth: propTypes.bool,
  square: propTypes.bool,
  children: propTypes.node,
  onClick: propTypes.func
};

var Wrapper = styled__default(Cutout).withConfig({
  displayName: "Progress__Wrapper",
  componentId: "sc-1ewq2xm-0"
})(["display:inline-block;width:", "px;height:", ";position:relative;text-align:center;padding:0;overflow:hidden;"], function (props) {
  return props.width;
}, blockSizes.md);
var WhiteBar = styled__default.div.withConfig({
  displayName: "Progress__WhiteBar",
  componentId: "sc-1ewq2xm-1"
})(["width:calc(100% - 4px);line-height:", ";background:", ";color:#000;margin-left:2px;margin-top:-2px;color:", ";"], blockSizes.md, function (_ref) {
  var theme = _ref.theme;
  return theme.canvas;
}, function (_ref2) {
  var theme = _ref2.theme;
  return theme.text;
});
var BlueBarContainer = styled__default.div.withConfig({
  displayName: "Progress__BlueBarContainer",
  componentId: "sc-1ewq2xm-2"
})(["width:", "%;position:absolute;top:0;left:0;margin-left:2px;margin-top:-2px;overflow:hidden;background:", ";"], function (props) {
  return props.percent;
}, function (_ref3) {
  var theme = _ref3.theme;
  return theme.progress;
});
var BlueBar = styled__default.div.withConfig({
  displayName: "Progress__BlueBar",
  componentId: "sc-1ewq2xm-3"
})(["width:", "px;height:100%;line-height:", ";color:", ";"], function (props) {
  return props.width - 8;
}, blockSizes.md, function (_ref4) {
  var theme = _ref4.theme;
  return theme.textInvert;
});

var ProgressBar = function ProgressBar(_ref5) {
  var width = _ref5.width,
      percent = _ref5.percent,
      shadow = _ref5.shadow;
  return React__default.createElement(Wrapper, {
    width: width,
    shadow: shadow
  }, React__default.createElement(WhiteBar, {
    width: width
  }, percent, "%"), React__default.createElement(BlueBarContainer, {
    percent: percent
  }, React__default.createElement(BlueBar, {
    width: width
  }, percent, "%")));
};

ProgressBar.defaultProps = {
  width: 250,
  percent: 0,
  shadow: true
};
ProgressBar.propTypes = {
  width: propTypes.number,
  percent: propTypes.number,
  shadow: propTypes.bool
};

var radioSize = "20px";
var StyledLabel$1 = styled__default.label.withConfig({
  displayName: "Radio__StyledLabel",
  componentId: "sc-12bsm0-0"
})(["display:inline-block;position:relative;padding-left:calc(", " + ", ");margin:", " 0;cursor:pointer;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;font-size:", ";", ""], radioSize, padding.sm, padding.sm, fontSizes.md, function (props) {
  return props.isDisabled && createDisabledTextStyles();
});
var StyledInput$1 = styled__default.input.withConfig({
  displayName: "Radio__StyledInput",
  componentId: "sc-12bsm0-1"
})(["position:absolute;opacity:0;"]);

var createCheckmarkSymbol$1 = function createCheckmarkSymbol(_ref) {
  var checked = _ref.checked;
  return checked && styled.css(["&:after{position:absolute;content:\"\";display:inline-block;top:50%;left:50%;width:6px;height:6px;transform:translate(-50%,-50%);border-radius:50%;background:", ";}"], function (_ref2) {
    var theme = _ref2.theme;
    return theme.checkmark;
  });
};

var sharedCheckmarkStyles$1 = styled.css(["position:absolute;top:50%;left:0;transform:translateY(-50%);width:", ";height:", ";border-radius:50%;", ""], radioSize, radioSize, function (props) {
  return createCheckmarkSymbol$1(props);
}); // had to overwrite box-shadow for StyledCheckmark since the default made checkbox too dark

var StyledCheckmark$1 = styled__default(Cutout).withConfig({
  displayName: "Radio__StyledCheckmark",
  componentId: "sc-12bsm0-2"
})(["", " background:", ";box-shadow:", ";&:before{content:\"\";position:absolute;left:0px;top:0px;width:calc(100% - 4px);height:calc(100% - 4px);border-radius:50%;box-shadow:none;}"], sharedCheckmarkStyles$1, function (_ref3) {
  var theme = _ref3.theme,
      isDisabled = _ref3.isDisabled;
  return isDisabled ? theme.material : theme.canvas;
}, function (_ref4) {
  var shadow = _ref4.shadow;
  return shadow ? "inset 3px 3px 10px rgba(0, 0, 0, 0.1)" : "none";
});
var StyledFlatCheckmark$1 = styled__default.div.withConfig({
  displayName: "Radio__StyledFlatCheckmark",
  componentId: "sc-12bsm0-3"
})(["", " ", " outline:none;background:", ";&:before{content:\"\";display:inline-block;position:absolute;top:0;left:0;width:calc(100% - 4px);height:calc(100% - 4px);border:2px solid ", ";border-radius:50%;}"], createFlatBoxStyles(), sharedCheckmarkStyles$1, function (_ref5) {
  var theme = _ref5.theme,
      isDisabled = _ref5.isDisabled;
  return isDisabled ? theme.flatLight : theme.canvas;
}, function (_ref6) {
  var theme = _ref6.theme;
  return theme.flatDark;
});

var Radio = function Radio(_ref7) {
  var onChange = _ref7.onChange,
      label = _ref7.label,
      disabled = _ref7.disabled,
      variant = _ref7.variant,
      value = _ref7.value,
      checked = _ref7.checked,
      name = _ref7.name,
      className = _ref7.className,
      style = _ref7.style,
      shadow = _ref7.shadow,
      otherProps = _objectWithoutProperties(_ref7, ["onChange", "label", "disabled", "variant", "value", "checked", "name", "className", "style", "shadow"]);

  var Checkmark = variant === "flat" ? StyledFlatCheckmark$1 : StyledCheckmark$1;
  return React__default.createElement(StyledLabel$1, {
    isDisabled: disabled,
    className: className,
    style: style
  }, label, React__default.createElement(StyledInput$1, _extends({
    onChange: disabled ? undefined : onChange,
    readOnly: disabled,
    type: "radio",
    value: value,
    checked: checked,
    name: name
  }, otherProps)), React__default.createElement(Checkmark, {
    checked: checked,
    isDisabled: disabled,
    shadow: shadow
  }));
};

Radio.defaultProps = {
  checked: false,
  name: "",
  value: null,
  label: "",
  disabled: false,
  variant: "default",
  shadow: true
};
Radio.propTypes = {
  onChange: propTypes.func.isRequired,
  name: propTypes.string.isRequired,
  value: propTypes.oneOfType([propTypes.string, propTypes.number, propTypes.bool]).isRequired,
  label: propTypes.oneOfType([propTypes.string, propTypes.number]),
  checked: propTypes.bool,
  disabled: propTypes.bool,
  shadow: propTypes.bool,
  variant: propTypes.oneOf(["default", "flat"]),
  style: propTypes.object
};

var StyledTab = styled__default.div.withConfig({
  displayName: "Tab__StyledTab",
  componentId: "l07vtw-0"
})(["", " ", " position:relative;height:", ";line-height:", ";padding:0 ", ";border-bottom:none;border-top-left-radius:5px;border-top-right-radius:5px;margin-bottom:-2px;cursor:default;color:", ";", " &:after{content:\"\";position:absolute;width:calc(100% - 4px);height:4px;background:", ";bottom:-2px;left:2px;}"], createBoxStyles(), createBorderStyles(), blockSizes.md, blockSizes.md, padding.sm, function (_ref) {
  var theme = _ref.theme;
  return theme.text;
}, function (props) {
  return props.active && "\n    z-index: 1;\n    height: calc(".concat(blockSizes.md, " + 4px);\n    top: -4px;\n    margin-bottom: -6px;\n    padding: 0 calc(").concat(padding.sm, " + 8px);\n    margin-left: -8px;\n    margin-right: -8px;\n  ");
}, function (_ref2) {
  var theme = _ref2.theme;
  return theme.material;
});

var Tab = function Tab(_ref3) {
  var value = _ref3.value,
      _onClick = _ref3.onClick,
      active = _ref3.active,
      children = _ref3.children,
      className = _ref3.className,
      style = _ref3.style,
      otherProps = _objectWithoutProperties(_ref3, ["value", "onClick", "active", "children", "className", "style"]);

  return React__default.createElement(StyledTab, _extends({
    className: className,
    active: active,
    style: style
  }, otherProps, {
    onClick: function onClick() {
      return _onClick(value);
    }
  }), children);
};

Tab.defaultProps = {};
Tab.propTypes = {
  value: propTypes.number,
  onClick: propTypes.func,
  active: propTypes.bool,
  children: propTypes.node,
  className: propTypes.string,
  style: propTypes.object
};

var StyledTabs = styled__default.nav.withConfig({
  displayName: "Tabs__StyledTabs",
  componentId: "sc-11btqu5-0"
})(["position:relative;left:8px;text-align:left;"]);

var Tabs = function Tabs(_ref) {
  var value = _ref.value,
      onChange = _ref.onChange,
      children = _ref.children,
      className = _ref.className,
      style = _ref.style,
      otherProps = _objectWithoutProperties(_ref, ["value", "onChange", "children", "className", "style"]);

  var childrenWithProps = React__default.Children.map(children, function (child) {
    var tabProps = {
      active: child.props.value === value,
      onClick: onChange
    };
    return React__default.cloneElement(child, tabProps);
  });
  return React__default.createElement(StyledTabs, _extends({
    className: className,
    style: style
  }, otherProps), childrenWithProps);
};

Tabs.defaultProps = {
  value: 0
};
Tabs.propTypes = {
  value: propTypes.number,
  onChange: propTypes.func,
  children: propTypes.node,
  className: propTypes.string,
  style: propTypes.object
};

var StyledTabBody = styled__default.div.withConfig({
  displayName: "TabBody__StyledTabBody",
  componentId: "sc-1nj9ylo-0"
})(["", " ", " position:relative;display:block;height:100%;padding:", ";padding-top:calc(1.5 * ", ");"], createBoxStyles(), createBorderStyles(), padding.md, padding.md);

var TabBody = function TabBody(_ref) {
  var children = _ref.children,
      className = _ref.className,
      style = _ref.style,
      otherProps = _objectWithoutProperties(_ref, ["children", "className", "style"]);

  return React__default.createElement(StyledTabBody, _extends({
    className: className,
    style: style
  }, otherProps), children);
};

TabBody.defaultProps = {};
TabBody.propTypes = {
  children: propTypes.node,
  className: propTypes.string,
  style: propTypes.object
};

var StyledTable = styled__default.table.withConfig({
  displayName: "Table__StyledTable",
  componentId: "sc-4crw6k-0"
})(["display:table;width:100%;border-collapse:collapse;border-spacing:0;"]);
var StyledCutout$1 = styled__default(Cutout).withConfig({
  displayName: "Table__StyledCutout",
  componentId: "sc-4crw6k-1"
})(["&:before{box-shadow:none;}"]);

var Table = function Table(_ref) {
  var className = _ref.className,
      children = _ref.children,
      style = _ref.style,
      otherProps = _objectWithoutProperties(_ref, ["className", "children", "style"]);

  return React__default.createElement(StyledCutout$1, null, React__default.createElement(StyledTable, _extends({
    className: className,
    style: style
  }, otherProps), children));
};

Table.defaultProps = {};
Table.propTypes = {
  children: propTypes.node,
  className: propTypes.string,
  style: propTypes.object
};

var StyledTableBody = styled__default.tbody.withConfig({
  displayName: "TableBody__StyledTableBody",
  componentId: "n44fge-0"
})(["background:", ";display:table-row-group;box-shadow:", ";"], function (_ref) {
  var theme = _ref.theme;
  return theme.canvas;
}, insetShadow);

var TableBody = function TableBody(_ref2) {
  var className = _ref2.className,
      children = _ref2.children,
      style = _ref2.style,
      otherProps = _objectWithoutProperties(_ref2, ["className", "children", "style"]);

  return React__default.createElement(StyledTableBody, _extends({
    className: className,
    style: style
  }, otherProps), children);
};

TableBody.defaultProps = {};
TableBody.propTypes = {
  children: propTypes.node,
  className: propTypes.string,
  style: propTypes.object
};

var StyledTd = styled__default.td.withConfig({
  displayName: "TableDataCell__StyledTd",
  componentId: "sc-1h0hlh4-0"
})(["padding:0 ", ";"], padding.sm);

var TableDataCell = function TableDataCell(_ref) {
  var className = _ref.className,
      children = _ref.children,
      style = _ref.style,
      otherProps = _objectWithoutProperties(_ref, ["className", "children", "style"]);

  return React__default.createElement(StyledTd, _extends({
    className: className,
    style: style
  }, otherProps), children);
};

TableDataCell.defaultProps = {};
TableDataCell.propTypes = {
  children: propTypes.node,
  className: propTypes.string,
  style: propTypes.object
};

var StyledTableHead = styled__default.thead.withConfig({
  displayName: "TableHead__StyledTableHead",
  componentId: "sc-1y8qzyj-0"
})(["display:table-header-group;"]);

var TableHead = function TableHead(_ref) {
  var className = _ref.className,
      children = _ref.children,
      style = _ref.style,
      otherProps = _objectWithoutProperties(_ref, ["className", "children", "style"]);

  return React__default.createElement(StyledTableHead, _extends({
    className: className,
    style: style
  }, otherProps), children);
};

TableHead.defaultProps = {};
TableHead.propTypes = {
  children: propTypes.node,
  className: propTypes.string,
  style: propTypes.object
};

var StyledHeadCell = styled__default.th.withConfig({
  displayName: "TableHeadCell__StyledHeadCell",
  componentId: "stcil-0"
})(["", " padding:0 ", ";display:table-cell;vertical-align:inherit;background:", ";&:active{", " border-left:none;border-top:none;}border-left:none;border-top:none;cursor:default;"], createBorderStyles(), padding.sm, function (_ref) {
  var theme = _ref.theme;
  return theme.material;
}, createBorderStyles(true));

var TableHeadCell = function TableHeadCell(_ref2) {
  var className = _ref2.className,
      children = _ref2.children,
      style = _ref2.style,
      onClick = _ref2.onClick,
      otherProps = _objectWithoutProperties(_ref2, ["className", "children", "style", "onClick"]);

  return React__default.createElement(StyledHeadCell, _extends({
    className: className,
    style: style
  }, otherProps, {
    onClick: onClick,
    onTouchStart: function onTouchStart() {
      return "";
    }
  }), children);
};

TableHeadCell.defaultProps = {};
TableHeadCell.propTypes = {
  onClick: propTypes.func,
  children: propTypes.node,
  className: propTypes.string,
  style: propTypes.object
};

var StyledTr = styled__default.tr.withConfig({
  displayName: "TableRow__StyledTr",
  componentId: "sc-1pmkict-0"
})(["color:inherit;display:table-row;height:calc(", " - 2px);line-height:calc(", " - 2px);vertical-align:middle;outline:none;color:", ";", ""], blockSizes.md, blockSizes.md, function (_ref) {
  var theme = _ref.theme;
  return theme.text;
}, function (_ref2) {
  var theme = _ref2.theme,
      head = _ref2.head;
  return !head && "&:hover {\n      background: ".concat(theme.hoverBackground, ";\n      color: ").concat(theme.textInvert, "\n    }");
});

var TableRow = function TableRow(_ref3) {
  var className = _ref3.className,
      children = _ref3.children,
      style = _ref3.style,
      head = _ref3.head,
      otherProps = _objectWithoutProperties(_ref3, ["className", "children", "style", "head"]);

  return React__default.createElement(StyledTr, _extends({
    head: head,
    className: className,
    style: style
  }, otherProps), children);
};

TableRow.defaultProps = {
  head: false
};
TableRow.propTypes = {
  children: propTypes.node,
  className: propTypes.string,
  style: propTypes.object,
  head: propTypes.bool
};

var StyledTextAreaWrapper = styled__default(Cutout).withConfig({
  displayName: "TextArea__StyledTextAreaWrapper",
  componentId: "hged13-0"
})(["display:inline-block;min-height:", ";padding:0;background:", ";"], blockSizes.md, function (_ref) {
  var theme = _ref.theme,
      isDisabled = _ref.isDisabled;
  return isDisabled ? theme.material : theme.canvas;
});
var StyledFlatTextAreaWrapper = styled__default.div.withConfig({
  displayName: "TextArea__StyledFlatTextAreaWrapper",
  componentId: "hged13-1"
})(["position:relative;min-height:", ";", ""], blockSizes.md, createFlatBoxStyles());
var StyledTextArea = styled__default.textarea.withConfig({
  displayName: "TextArea__StyledTextArea",
  componentId: "hged13-2"
})(["width:100%;height:100%;box-sizing:border-box;padding:", ";outline:none;border:none;background:none;resize:none;font-size:", ";font-family:", ";", ""], padding.sm, fontSizes.md, fontFamily, function (_ref2) {
  var disabled = _ref2.disabled,
      variant = _ref2.variant;
  return variant !== "flat" && disabled && createDisabledTextStyles();
});

var TextArea = function TextArea(_ref3) {
  var onChange = _ref3.onChange,
      disabled = _ref3.disabled,
      variant = _ref3.variant,
      width = _ref3.width,
      height = _ref3.height,
      style = _ref3.style,
      className = _ref3.className,
      shadow = _ref3.shadow,
      otherProps = _objectWithoutProperties(_ref3, ["onChange", "disabled", "variant", "width", "height", "style", "className", "shadow"]);

  var Wrapper = variant === "flat" ? StyledFlatTextAreaWrapper : StyledTextAreaWrapper;
  return React__default.createElement(Wrapper, {
    style: _objectSpread({}, style, {
      width: width ? width : "100%",
      height: height ? height : "auto"
    }),
    className: className,
    isDisabled: disabled,
    shadow: shadow
  }, React__default.createElement(StyledTextArea, _extends({
    width: width,
    height: height,
    readOnly: disabled,
    onChange: disabled ? undefined : onChange,
    disabled: disabled,
    variant: variant
  }, otherProps)));
};

TextArea.defaultProps = {
  shadow: true,
  variant: "default"
};
TextArea.propTypes = {
  width: propTypes.oneOfType([propTypes.string, propTypes.number]),
  height: propTypes.oneOfType([propTypes.string, propTypes.number]),
  onChange: propTypes.func,
  disabled: propTypes.bool,
  variant: propTypes.oneOf(["default", "flat"]),
  className: propTypes.string,
  shadow: propTypes.bool
};

var Tip = styled__default.span.withConfig({
  displayName: "Tooltip__Tip",
  componentId: "crqm6i-0"
})(["position:absolute;bottom:-4px;left:50%;z-index:10;transform:translate(-50%,100%);display:", ";padding:4px;border:1px solid ", ";background:", ";box-shadow:", ";text-align:center;"], function (props) {
  return props.show ? "block" : "none";
}, function (_ref) {
  var theme = _ref.theme;
  return theme.borderDarkest;
}, function (_ref2) {
  var theme = _ref2.theme;
  return theme.tooltip;
}, shadow);
var Wrapper$1 = styled__default.div.withConfig({
  displayName: "Tooltip__Wrapper",
  componentId: "crqm6i-1"
})(["position:relative;display:inline-block;white-space:nowrap;"]);

var Tooltip = function Tooltip(_ref3) {
  var children = _ref3.children,
      text = _ref3.text,
      delay = _ref3.delay,
      className = _ref3.className,
      style = _ref3.style,
      otherProps = _objectWithoutProperties(_ref3, ["children", "text", "delay", "className", "style"]);

  var _useState = React.useState(false),
      _useState2 = _slicedToArray(_useState, 2),
      show = _useState2[0],
      setShow = _useState2[1];

  var _useState3 = React.useState(null),
      _useState4 = _slicedToArray(_useState3, 2),
      delayTimer = _useState4[0],
      setDelayTimer = _useState4[1];

  var handleEnter = function handleEnter() {
    var timer = setTimeout(function () {
      setShow(true);
    }, delay);
    setDelayTimer(timer);
  };

  var handleLeave = function handleLeave() {
    clearTimeout(delayTimer);
    setShow(false);
  };

  return React__default.createElement(Wrapper$1, {
    onMouseEnter: handleEnter,
    onMouseLeave: handleLeave
  }, React__default.createElement(Tip, _extends({
    show: show,
    className: className,
    style: style
  }, otherProps), text), children);
};

Tooltip.propTypes = {
  children: propTypes.node.isRequired,
  text: propTypes.string.isRequired,
  className: propTypes.string,
  style: propTypes.object,
  delay: propTypes.number
};
Tooltip.defaultProps = {
  delay: 1000
};

exports.Anchor = Anchor;
exports.AppBar = AppBar;
exports.Avatar = Avatar;
exports.Bar = Bar;
exports.Button = Button;
exports.Checkbox = Checkbox;
exports.Cutout = Cutout;
exports.DatePicker = DatePicker;
exports.Divider = Divider;
exports.Fieldset = Fieldset;
exports.Hourglass = Hourglass;
exports.List = List;
exports.ListItem = ListItem;
exports.NumberField = NumberField;
exports.Progress = ProgressBar;
exports.Radio = Radio;
exports.Select = Select;
exports.Tab = Tab;
exports.TabBody = TabBody;
exports.Table = Table;
exports.TableBody = TableBody;
exports.TableDataCell = TableDataCell;
exports.TableHead = TableHead;
exports.TableHeadCell = TableHeadCell;
exports.TableRow = TableRow;
exports.Tabs = Tabs;
exports.TextArea = TextArea;
exports.TextField = TextField;
exports.Toolbar = Toolbar;
exports.Tooltip = Tooltip;
exports.Window = Window;
exports.WindowContent = WindowContent;
exports.WindowHeader = WindowHeader;
exports.reset = reset;
exports.themes = themes;


/***/ }),
/* 44 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
module.exports = {"headerBar":"HeadBar__headerBar___2IUyo","toolBar":"HeadBar__toolBar___ly3Mj","headerButtonGroup":"HeadBar__headerButtonGroup___ofJq1","startButton":"HeadBar__startButton___3wCK4","buttonText":"HeadBar__buttonText___EqsDe","verticalLine":"HeadBar__verticalLine___3DJZv","toolTipOverflow":"HeadBar__toolTipOverflow___2m55u"};

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _scrollLink = __webpack_require__(14);

var _scrollLink2 = _interopRequireDefault(_scrollLink);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var LinkElement = function (_React$Component) {
  _inherits(LinkElement, _React$Component);

  function LinkElement() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, LinkElement);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = LinkElement.__proto__ || Object.getPrototypeOf(LinkElement)).call.apply(_ref, [this].concat(args))), _this), _this.render = function () {
      return _react2.default.createElement(
        'a',
        _this.props,
        _this.props.children
      );
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  return LinkElement;
}(_react2.default.Component);

;

exports.default = (0, _scrollLink2.default)(LinkElement);

/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {/**
 * lodash (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */

/** Used as the `TypeError` message for "Functions" methods. */
var FUNC_ERROR_TEXT = 'Expected a function';

/** Used as references for various `Number` constants. */
var NAN = 0 / 0;

/** `Object#toString` result references. */
var symbolTag = '[object Symbol]';

/** Used to match leading and trailing whitespace. */
var reTrim = /^\s+|\s+$/g;

/** Used to detect bad signed hexadecimal string values. */
var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;

/** Used to detect binary string values. */
var reIsBinary = /^0b[01]+$/i;

/** Used to detect octal string values. */
var reIsOctal = /^0o[0-7]+$/i;

/** Built-in method references without a dependency on `root`. */
var freeParseInt = parseInt;

/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString = objectProto.toString;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max,
    nativeMin = Math.min;

/**
 * Gets the timestamp of the number of milliseconds that have elapsed since
 * the Unix epoch (1 January 1970 00:00:00 UTC).
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Date
 * @returns {number} Returns the timestamp.
 * @example
 *
 * _.defer(function(stamp) {
 *   console.log(_.now() - stamp);
 * }, _.now());
 * // => Logs the number of milliseconds it took for the deferred invocation.
 */
var now = function() {
  return root.Date.now();
};

/**
 * Creates a debounced function that delays invoking `func` until after `wait`
 * milliseconds have elapsed since the last time the debounced function was
 * invoked. The debounced function comes with a `cancel` method to cancel
 * delayed `func` invocations and a `flush` method to immediately invoke them.
 * Provide `options` to indicate whether `func` should be invoked on the
 * leading and/or trailing edge of the `wait` timeout. The `func` is invoked
 * with the last arguments provided to the debounced function. Subsequent
 * calls to the debounced function return the result of the last `func`
 * invocation.
 *
 * **Note:** If `leading` and `trailing` options are `true`, `func` is
 * invoked on the trailing edge of the timeout only if the debounced function
 * is invoked more than once during the `wait` timeout.
 *
 * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
 * until to the next tick, similar to `setTimeout` with a timeout of `0`.
 *
 * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
 * for details over the differences between `_.debounce` and `_.throttle`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to debounce.
 * @param {number} [wait=0] The number of milliseconds to delay.
 * @param {Object} [options={}] The options object.
 * @param {boolean} [options.leading=false]
 *  Specify invoking on the leading edge of the timeout.
 * @param {number} [options.maxWait]
 *  The maximum time `func` is allowed to be delayed before it's invoked.
 * @param {boolean} [options.trailing=true]
 *  Specify invoking on the trailing edge of the timeout.
 * @returns {Function} Returns the new debounced function.
 * @example
 *
 * // Avoid costly calculations while the window size is in flux.
 * jQuery(window).on('resize', _.debounce(calculateLayout, 150));
 *
 * // Invoke `sendMail` when clicked, debouncing subsequent calls.
 * jQuery(element).on('click', _.debounce(sendMail, 300, {
 *   'leading': true,
 *   'trailing': false
 * }));
 *
 * // Ensure `batchLog` is invoked once after 1 second of debounced calls.
 * var debounced = _.debounce(batchLog, 250, { 'maxWait': 1000 });
 * var source = new EventSource('/stream');
 * jQuery(source).on('message', debounced);
 *
 * // Cancel the trailing debounced invocation.
 * jQuery(window).on('popstate', debounced.cancel);
 */
function debounce(func, wait, options) {
  var lastArgs,
      lastThis,
      maxWait,
      result,
      timerId,
      lastCallTime,
      lastInvokeTime = 0,
      leading = false,
      maxing = false,
      trailing = true;

  if (typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  wait = toNumber(wait) || 0;
  if (isObject(options)) {
    leading = !!options.leading;
    maxing = 'maxWait' in options;
    maxWait = maxing ? nativeMax(toNumber(options.maxWait) || 0, wait) : maxWait;
    trailing = 'trailing' in options ? !!options.trailing : trailing;
  }

  function invokeFunc(time) {
    var args = lastArgs,
        thisArg = lastThis;

    lastArgs = lastThis = undefined;
    lastInvokeTime = time;
    result = func.apply(thisArg, args);
    return result;
  }

  function leadingEdge(time) {
    // Reset any `maxWait` timer.
    lastInvokeTime = time;
    // Start the timer for the trailing edge.
    timerId = setTimeout(timerExpired, wait);
    // Invoke the leading edge.
    return leading ? invokeFunc(time) : result;
  }

  function remainingWait(time) {
    var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime,
        result = wait - timeSinceLastCall;

    return maxing ? nativeMin(result, maxWait - timeSinceLastInvoke) : result;
  }

  function shouldInvoke(time) {
    var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime;

    // Either this is the first call, activity has stopped and we're at the
    // trailing edge, the system time has gone backwards and we're treating
    // it as the trailing edge, or we've hit the `maxWait` limit.
    return (lastCallTime === undefined || (timeSinceLastCall >= wait) ||
      (timeSinceLastCall < 0) || (maxing && timeSinceLastInvoke >= maxWait));
  }

  function timerExpired() {
    var time = now();
    if (shouldInvoke(time)) {
      return trailingEdge(time);
    }
    // Restart the timer.
    timerId = setTimeout(timerExpired, remainingWait(time));
  }

  function trailingEdge(time) {
    timerId = undefined;

    // Only invoke if we have `lastArgs` which means `func` has been
    // debounced at least once.
    if (trailing && lastArgs) {
      return invokeFunc(time);
    }
    lastArgs = lastThis = undefined;
    return result;
  }

  function cancel() {
    if (timerId !== undefined) {
      clearTimeout(timerId);
    }
    lastInvokeTime = 0;
    lastArgs = lastCallTime = lastThis = timerId = undefined;
  }

  function flush() {
    return timerId === undefined ? result : trailingEdge(now());
  }

  function debounced() {
    var time = now(),
        isInvoking = shouldInvoke(time);

    lastArgs = arguments;
    lastThis = this;
    lastCallTime = time;

    if (isInvoking) {
      if (timerId === undefined) {
        return leadingEdge(lastCallTime);
      }
      if (maxing) {
        // Handle invocations in a tight loop.
        timerId = setTimeout(timerExpired, wait);
        return invokeFunc(lastCallTime);
      }
    }
    if (timerId === undefined) {
      timerId = setTimeout(timerExpired, wait);
    }
    return result;
  }
  debounced.cancel = cancel;
  debounced.flush = flush;
  return debounced;
}

/**
 * Creates a throttled function that only invokes `func` at most once per
 * every `wait` milliseconds. The throttled function comes with a `cancel`
 * method to cancel delayed `func` invocations and a `flush` method to
 * immediately invoke them. Provide `options` to indicate whether `func`
 * should be invoked on the leading and/or trailing edge of the `wait`
 * timeout. The `func` is invoked with the last arguments provided to the
 * throttled function. Subsequent calls to the throttled function return the
 * result of the last `func` invocation.
 *
 * **Note:** If `leading` and `trailing` options are `true`, `func` is
 * invoked on the trailing edge of the timeout only if the throttled function
 * is invoked more than once during the `wait` timeout.
 *
 * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
 * until to the next tick, similar to `setTimeout` with a timeout of `0`.
 *
 * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
 * for details over the differences between `_.throttle` and `_.debounce`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to throttle.
 * @param {number} [wait=0] The number of milliseconds to throttle invocations to.
 * @param {Object} [options={}] The options object.
 * @param {boolean} [options.leading=true]
 *  Specify invoking on the leading edge of the timeout.
 * @param {boolean} [options.trailing=true]
 *  Specify invoking on the trailing edge of the timeout.
 * @returns {Function} Returns the new throttled function.
 * @example
 *
 * // Avoid excessively updating the position while scrolling.
 * jQuery(window).on('scroll', _.throttle(updatePosition, 100));
 *
 * // Invoke `renewToken` when the click event is fired, but not more than once every 5 minutes.
 * var throttled = _.throttle(renewToken, 300000, { 'trailing': false });
 * jQuery(element).on('click', throttled);
 *
 * // Cancel the trailing throttled invocation.
 * jQuery(window).on('popstate', throttled.cancel);
 */
function throttle(func, wait, options) {
  var leading = true,
      trailing = true;

  if (typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  if (isObject(options)) {
    leading = 'leading' in options ? !!options.leading : leading;
    trailing = 'trailing' in options ? !!options.trailing : trailing;
  }
  return debounce(func, wait, {
    'leading': leading,
    'maxWait': wait,
    'trailing': trailing
  });
}

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return !!value && (type == 'object' || type == 'function');
}

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return !!value && typeof value == 'object';
}

/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */
function isSymbol(value) {
  return typeof value == 'symbol' ||
    (isObjectLike(value) && objectToString.call(value) == symbolTag);
}

/**
 * Converts `value` to a number.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to process.
 * @returns {number} Returns the number.
 * @example
 *
 * _.toNumber(3.2);
 * // => 3.2
 *
 * _.toNumber(Number.MIN_VALUE);
 * // => 5e-324
 *
 * _.toNumber(Infinity);
 * // => Infinity
 *
 * _.toNumber('3.2');
 * // => 3.2
 */
function toNumber(value) {
  if (typeof value == 'number') {
    return value;
  }
  if (isSymbol(value)) {
    return NAN;
  }
  if (isObject(value)) {
    var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
    value = isObject(other) ? (other + '') : other;
  }
  if (typeof value != 'string') {
    return value === 0 ? value : +value;
  }
  value = value.replace(reTrim, '');
  var isBinary = reIsBinary.test(value);
  return (isBinary || reIsOctal.test(value))
    ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
    : (reIsBadHex.test(value) ? NAN : +value);
}

module.exports = throttle;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(13)))

/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  /*
   * https://github.com/oblador/angular-scroll (duScrollDefaultEasing)
   */
  defaultEasing: function defaultEasing(x) {
    if (x < 0.5) {
      return Math.pow(x * 2, 2) / 2;
    }
    return 1 - Math.pow((1 - x) * 2, 2) / 2;
  },
  /*
   * https://gist.github.com/gre/1650294
   */
  // no easing, no acceleration
  linear: function linear(x) {
    return x;
  },
  // accelerating from zero velocity
  easeInQuad: function easeInQuad(x) {
    return x * x;
  },
  // decelerating to zero velocity
  easeOutQuad: function easeOutQuad(x) {
    return x * (2 - x);
  },
  // acceleration until halfway, then deceleration
  easeInOutQuad: function easeInOutQuad(x) {
    return x < .5 ? 2 * x * x : -1 + (4 - 2 * x) * x;
  },
  // accelerating from zero velocity 
  easeInCubic: function easeInCubic(x) {
    return x * x * x;
  },
  // decelerating to zero velocity π
  easeOutCubic: function easeOutCubic(x) {
    return --x * x * x + 1;
  },
  // acceleration until halfway, then deceleration 
  easeInOutCubic: function easeInOutCubic(x) {
    return x < .5 ? 4 * x * x * x : (x - 1) * (2 * x - 2) * (2 * x - 2) + 1;
  },
  // accelerating from zero velocity 
  easeInQuart: function easeInQuart(x) {
    return x * x * x * x;
  },
  // decelerating to zero velocity 
  easeOutQuart: function easeOutQuart(x) {
    return 1 - --x * x * x * x;
  },
  // acceleration until halfway, then deceleration
  easeInOutQuart: function easeInOutQuart(x) {
    return x < .5 ? 8 * x * x * x * x : 1 - 8 * --x * x * x * x;
  },
  // accelerating from zero velocity
  easeInQuint: function easeInQuint(x) {
    return x * x * x * x * x;
  },
  // decelerating to zero velocity
  easeOutQuint: function easeOutQuint(x) {
    return 1 + --x * x * x * x * x;
  },
  // acceleration until halfway, then deceleration 
  easeInOutQuint: function easeInOutQuint(x) {
    return x < .5 ? 16 * x * x * x * x * x : 1 + 16 * --x * x * x * x * x;
  }
};

/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _passiveEventListeners = __webpack_require__(16);

var events = ['mousedown', 'mousewheel', 'touchmove', 'keydown'];

exports.default = {
  subscribe: function subscribe(cancelEvent) {
    return typeof document !== 'undefined' && events.forEach(function (event) {
      return (0, _passiveEventListeners.addPassiveEventListener)(document, event, cancelEvent);
    });
  }
};

/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _scrollLink = __webpack_require__(14);

var _scrollLink2 = _interopRequireDefault(_scrollLink);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ButtonElement = function (_React$Component) {
  _inherits(ButtonElement, _React$Component);

  function ButtonElement() {
    _classCallCheck(this, ButtonElement);

    return _possibleConstructorReturn(this, (ButtonElement.__proto__ || Object.getPrototypeOf(ButtonElement)).apply(this, arguments));
  }

  _createClass(ButtonElement, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'input',
        this.props,
        this.props.children
      );
    }
  }]);

  return ButtonElement;
}(_react2.default.Component);

;

exports.default = (0, _scrollLink2.default)(ButtonElement);

/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _scrollElement = __webpack_require__(28);

var _scrollElement2 = _interopRequireDefault(_scrollElement);

var _propTypes = __webpack_require__(2);

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ElementWrapper = function (_React$Component) {
  _inherits(ElementWrapper, _React$Component);

  function ElementWrapper() {
    _classCallCheck(this, ElementWrapper);

    return _possibleConstructorReturn(this, (ElementWrapper.__proto__ || Object.getPrototypeOf(ElementWrapper)).apply(this, arguments));
  }

  _createClass(ElementWrapper, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      // Remove `parentBindings` from props
      var newProps = _extends({}, this.props);
      if (newProps.parentBindings) {
        delete newProps.parentBindings;
      }

      return _react2.default.createElement(
        'div',
        _extends({}, newProps, { ref: function ref(el) {
            _this2.props.parentBindings.domNode = el;
          } }),
        this.props.children
      );
    }
  }]);

  return ElementWrapper;
}(_react2.default.Component);

;

ElementWrapper.propTypes = {
  name: _propTypes2.default.string,
  id: _propTypes2.default.string
};

exports.default = (0, _scrollElement2.default)(ElementWrapper);

/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/* DEPRECATED */

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = __webpack_require__(0);
var ReactDOM = __webpack_require__(8);

var utils = __webpack_require__(11);
var scrollSpy = __webpack_require__(15);
var defaultScroller = __webpack_require__(10);
var PropTypes = __webpack_require__(2);
var scrollHash = __webpack_require__(27);

var protoTypes = {
  to: PropTypes.string.isRequired,
  containerId: PropTypes.string,
  container: PropTypes.object,
  activeClass: PropTypes.string,
  spy: PropTypes.bool,
  smooth: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  offset: PropTypes.number,
  delay: PropTypes.number,
  isDynamic: PropTypes.bool,
  onClick: PropTypes.func,
  duration: PropTypes.oneOfType([PropTypes.number, PropTypes.func]),
  absolute: PropTypes.bool,
  onSetActive: PropTypes.func,
  onSetInactive: PropTypes.func,
  ignoreCancelEvents: PropTypes.bool,
  hashSpy: PropTypes.bool
};

var Helpers = {
  Scroll: function Scroll(Component, customScroller) {

    console.warn("Helpers.Scroll is deprecated since v1.7.0");

    var scroller = customScroller || defaultScroller;

    var Scroll = function (_React$Component) {
      _inherits(Scroll, _React$Component);

      function Scroll(props) {
        _classCallCheck(this, Scroll);

        var _this = _possibleConstructorReturn(this, (Scroll.__proto__ || Object.getPrototypeOf(Scroll)).call(this, props));

        _initialiseProps.call(_this);

        _this.state = {
          active: false
        };
        return _this;
      }

      _createClass(Scroll, [{
        key: 'getScrollSpyContainer',
        value: function getScrollSpyContainer() {
          var containerId = this.props.containerId;
          var container = this.props.container;

          if (containerId) {
            return document.getElementById(containerId);
          }

          if (container && container.nodeType) {
            return container;
          }

          return document;
        }
      }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
          if (this.props.spy || this.props.hashSpy) {
            var scrollSpyContainer = this.getScrollSpyContainer();

            if (!scrollSpy.isMounted(scrollSpyContainer)) {
              scrollSpy.mount(scrollSpyContainer);
            }

            if (this.props.hashSpy) {
              if (!scrollHash.isMounted()) {
                scrollHash.mount(scroller);
              }
              scrollHash.mapContainer(this.props.to, scrollSpyContainer);
            }

            if (this.props.spy) {
              scrollSpy.addStateHandler(this.stateHandler);
            }

            scrollSpy.addSpyHandler(this.spyHandler, scrollSpyContainer);

            this.setState({
              container: scrollSpyContainer
            });
          }
        }
      }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
          scrollSpy.unmount(this.stateHandler, this.spyHandler);
        }
      }, {
        key: 'render',
        value: function render() {
          var className = "";

          if (this.state && this.state.active) {
            className = ((this.props.className || "") + " " + (this.props.activeClass || "active")).trim();
          } else {
            className = this.props.className;
          }

          var props = _extends({}, this.props);

          for (var prop in protoTypes) {
            if (props.hasOwnProperty(prop)) {
              delete props[prop];
            }
          }

          props.className = className;
          props.onClick = this.handleClick;

          return React.createElement(Component, props);
        }
      }]);

      return Scroll;
    }(React.Component);

    var _initialiseProps = function _initialiseProps() {
      var _this2 = this;

      this.scrollTo = function (to, props) {
        scroller.scrollTo(to, _extends({}, _this2.state, props));
      };

      this.handleClick = function (event) {

        /*
         * give the posibility to override onClick
         */

        if (_this2.props.onClick) {
          _this2.props.onClick(event);
        }

        /*
         * dont bubble the navigation
         */

        if (event.stopPropagation) event.stopPropagation();
        if (event.preventDefault) event.preventDefault();

        /*
         * do the magic!
         */
        _this2.scrollTo(_this2.props.to, _this2.props);
      };

      this.stateHandler = function () {
        if (scroller.getActiveLink() !== _this2.props.to) {
          if (_this2.state !== null && _this2.state.active && _this2.props.onSetInactive) {
            _this2.props.onSetInactive();
          }
          _this2.setState({ active: false });
        }
      };

      this.spyHandler = function (y) {

        var scrollSpyContainer = _this2.getScrollSpyContainer();

        if (scrollHash.isMounted() && !scrollHash.isInitialized()) {
          return;
        }

        var to = _this2.props.to;
        var element = null;
        var elemTopBound = 0;
        var elemBottomBound = 0;
        var containerTop = 0;

        if (scrollSpyContainer.getBoundingClientRect) {
          var containerCords = scrollSpyContainer.getBoundingClientRect();
          containerTop = containerCords.top;
        }

        if (!element || _this2.props.isDynamic) {
          element = scroller.get(to);
          if (!element) {
            return;
          }

          var cords = element.getBoundingClientRect();
          elemTopBound = cords.top - containerTop + y;
          elemBottomBound = elemTopBound + cords.height;
        }

        var offsetY = y - _this2.props.offset;
        var isInside = offsetY >= Math.floor(elemTopBound) && offsetY < Math.floor(elemBottomBound);
        var isOutside = offsetY < Math.floor(elemTopBound) || offsetY >= Math.floor(elemBottomBound);
        var activeLink = scroller.getActiveLink();

        if (isOutside) {
          if (to === activeLink) {
            scroller.setActiveLink(void 0);
          }

          if (_this2.props.hashSpy && scrollHash.getHash() === to) {
            scrollHash.changeHash();
          }

          if (_this2.props.spy && _this2.state.active) {
            _this2.setState({ active: false });
            _this2.props.onSetInactive && _this2.props.onSetInactive();
          }

          return scrollSpy.updateStates();
        }

        if (isInside && activeLink !== to) {
          scroller.setActiveLink(to);

          _this2.props.hashSpy && scrollHash.changeHash(to);

          if (_this2.props.spy) {
            _this2.setState({ active: true });
            _this2.props.onSetActive && _this2.props.onSetActive(to);
          }
          return scrollSpy.updateStates();
        }
      };
    };

    ;

    Scroll.propTypes = protoTypes;

    Scroll.defaultProps = { offset: 0 };

    return Scroll;
  },
  Element: function Element(Component) {

    console.warn("Helpers.Element is deprecated since v1.7.0");

    var Element = function (_React$Component2) {
      _inherits(Element, _React$Component2);

      function Element(props) {
        _classCallCheck(this, Element);

        var _this3 = _possibleConstructorReturn(this, (Element.__proto__ || Object.getPrototypeOf(Element)).call(this, props));

        _this3.childBindings = {
          domNode: null
        };
        return _this3;
      }

      _createClass(Element, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
          if (typeof window === 'undefined') {
            return false;
          }
          this.registerElems(this.props.name);
        }
      }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate(prevProps) {
          if (this.props.name !== prevProps.name) {
            this.registerElems(this.props.name);
          }
        }
      }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
          if (typeof window === 'undefined') {
            return false;
          }
          defaultScroller.unregister(this.props.name);
        }
      }, {
        key: 'registerElems',
        value: function registerElems(name) {
          defaultScroller.register(name, this.childBindings.domNode);
        }
      }, {
        key: 'render',
        value: function render() {
          return React.createElement(Component, _extends({}, this.props, { parentBindings: this.childBindings }));
        }
      }]);

      return Element;
    }(React.Component);

    ;

    Element.propTypes = {
      name: PropTypes.string,
      id: PropTypes.string
    };

    return Element;
  }
};

module.exports = Helpers;

/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
module.exports = {"mainDiv":"App__mainDiv___ddp8T","mainContainer":"App__mainContainer___2fwYT","windowContainer":"App__windowContainer___uRFp4"};

/***/ }),
/* 54 */
/***/ (function(module, exports) {

module.exports = Array.isArray || function (arr) {
  return Object.prototype.toString.call(arr) == '[object Array]';
};


/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),
/* 56 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: ./node_modules/react/index.js
var react = __webpack_require__(0);
var react_default = /*#__PURE__*/__webpack_require__.n(react);

// EXTERNAL MODULE: ./node_modules/react-dom/index.js
var react_dom = __webpack_require__(8);

// EXTERNAL MODULE: ./node_modules/prop-types/index.js
var prop_types = __webpack_require__(2);
var prop_types_default = /*#__PURE__*/__webpack_require__.n(prop_types);

// CONCATENATED MODULE: ./node_modules/react-redux/es/components/Context.js

var ReactReduxContext = react_default.a.createContext(null);
/* harmony default export */ var components_Context = (ReactReduxContext);
// CONCATENATED MODULE: ./node_modules/react-redux/es/utils/batch.js
// Default to a dummy "batch" implementation that just runs the callback
function defaultNoopBatch(callback) {
  callback();
}

var batch_batch = defaultNoopBatch; // Allow injecting another batching function later

var setBatch = function setBatch(newBatch) {
  return batch_batch = newBatch;
}; // Supply a getter just to skip dealing with ESM bindings

var getBatch = function getBatch() {
  return batch_batch;
};
// CONCATENATED MODULE: ./node_modules/react-redux/es/utils/Subscription.js
 // encapsulates the subscription logic for connecting a component to the redux store, as
// well as nesting subscriptions of descendant components, so that we can ensure the
// ancestor components re-render before descendants

var CLEARED = null;
var nullListeners = {
  notify: function notify() {}
};

function createListenerCollection() {
  var batch = getBatch(); // the current/next pattern is copied from redux's createStore code.
  // TODO: refactor+expose that code to be reusable here?

  var current = [];
  var next = [];
  return {
    clear: function clear() {
      next = CLEARED;
      current = CLEARED;
    },
    notify: function notify() {
      var listeners = current = next;
      batch(function () {
        for (var i = 0; i < listeners.length; i++) {
          listeners[i]();
        }
      });
    },
    get: function get() {
      return next;
    },
    subscribe: function subscribe(listener) {
      var isSubscribed = true;
      if (next === current) next = current.slice();
      next.push(listener);
      return function unsubscribe() {
        if (!isSubscribed || current === CLEARED) return;
        isSubscribed = false;
        if (next === current) next = current.slice();
        next.splice(next.indexOf(listener), 1);
      };
    }
  };
}

var Subscription =
/*#__PURE__*/
function () {
  function Subscription(store, parentSub) {
    this.store = store;
    this.parentSub = parentSub;
    this.unsubscribe = null;
    this.listeners = nullListeners;
    this.handleChangeWrapper = this.handleChangeWrapper.bind(this);
  }

  var _proto = Subscription.prototype;

  _proto.addNestedSub = function addNestedSub(listener) {
    this.trySubscribe();
    return this.listeners.subscribe(listener);
  };

  _proto.notifyNestedSubs = function notifyNestedSubs() {
    this.listeners.notify();
  };

  _proto.handleChangeWrapper = function handleChangeWrapper() {
    if (this.onStateChange) {
      this.onStateChange();
    }
  };

  _proto.isSubscribed = function isSubscribed() {
    return Boolean(this.unsubscribe);
  };

  _proto.trySubscribe = function trySubscribe() {
    if (!this.unsubscribe) {
      this.unsubscribe = this.parentSub ? this.parentSub.addNestedSub(this.handleChangeWrapper) : this.store.subscribe(this.handleChangeWrapper);
      this.listeners = createListenerCollection();
    }
  };

  _proto.tryUnsubscribe = function tryUnsubscribe() {
    if (this.unsubscribe) {
      this.unsubscribe();
      this.unsubscribe = null;
      this.listeners.clear();
      this.listeners = nullListeners;
    }
  };

  return Subscription;
}();


// CONCATENATED MODULE: ./node_modules/react-redux/es/components/Provider.js





function Provider_Provider(_ref) {
  var store = _ref.store,
      context = _ref.context,
      children = _ref.children;
  var contextValue = Object(react["useMemo"])(function () {
    var subscription = new Subscription(store);
    subscription.onStateChange = subscription.notifyNestedSubs;
    return {
      store: store,
      subscription: subscription
    };
  }, [store]);
  var previousState = Object(react["useMemo"])(function () {
    return store.getState();
  }, [store]);
  Object(react["useEffect"])(function () {
    var subscription = contextValue.subscription;
    subscription.trySubscribe();

    if (previousState !== store.getState()) {
      subscription.notifyNestedSubs();
    }

    return function () {
      subscription.tryUnsubscribe();
      subscription.onStateChange = null;
    };
  }, [contextValue, previousState]);
  var Context = context || ReactReduxContext;
  return react_default.a.createElement(Context.Provider, {
    value: contextValue
  }, children);
}

Provider_Provider.propTypes = {
  store: prop_types_default.a.shape({
    subscribe: prop_types_default.a.func.isRequired,
    dispatch: prop_types_default.a.func.isRequired,
    getState: prop_types_default.a.func.isRequired
  }),
  context: prop_types_default.a.object,
  children: prop_types_default.a.any
};
/* harmony default export */ var components_Provider = (Provider_Provider);
// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/extends.js
function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}
// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js
function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}
// EXTERNAL MODULE: ./node_modules/hoist-non-react-statics/dist/hoist-non-react-statics.cjs.js
var hoist_non_react_statics_cjs = __webpack_require__(9);
var hoist_non_react_statics_cjs_default = /*#__PURE__*/__webpack_require__.n(hoist_non_react_statics_cjs);

// EXTERNAL MODULE: ./node_modules/invariant/browser.js
var browser = __webpack_require__(5);
var browser_default = /*#__PURE__*/__webpack_require__.n(browser);

// EXTERNAL MODULE: ./node_modules/react-is/index.js
var react_is = __webpack_require__(6);

// CONCATENATED MODULE: ./node_modules/react-redux/es/components/connectAdvanced.js







 // Define some constant arrays just to avoid re-creating these

var EMPTY_ARRAY = [];
var NO_SUBSCRIPTION_ARRAY = [null, null];

var stringifyComponent = function stringifyComponent(Comp) {
  try {
    return JSON.stringify(Comp);
  } catch (err) {
    return String(Comp);
  }
};

function storeStateUpdatesReducer(state, action) {
  var updateCount = state[1];
  return [action.payload, updateCount + 1];
}

var initStateUpdates = function initStateUpdates() {
  return [null, 0];
}; // React currently throws a warning when using useLayoutEffect on the server.
// To get around it, we can conditionally useEffect on the server (no-op) and
// useLayoutEffect in the browser. We need useLayoutEffect because we want
// `connect` to perform sync updates to a ref to save the latest props after
// a render is actually committed to the DOM.


var useIsomorphicLayoutEffect = typeof window !== 'undefined' && typeof window.document !== 'undefined' && typeof window.document.createElement !== 'undefined' ? react["useLayoutEffect"] : react["useEffect"];
function connectAdvanced(
/*
  selectorFactory is a func that is responsible for returning the selector function used to
  compute new props from state, props, and dispatch. For example:
     export default connectAdvanced((dispatch, options) => (state, props) => ({
      thing: state.things[props.thingId],
      saveThing: fields => dispatch(actionCreators.saveThing(props.thingId, fields)),
    }))(YourComponent)
   Access to dispatch is provided to the factory so selectorFactories can bind actionCreators
  outside of their selector as an optimization. Options passed to connectAdvanced are passed to
  the selectorFactory, along with displayName and WrappedComponent, as the second argument.
   Note that selectorFactory is responsible for all caching/memoization of inbound and outbound
  props. Do not use connectAdvanced directly without memoizing results between calls to your
  selector, otherwise the Connect component will re-render on every state or props change.
*/
selectorFactory, // options object:
_ref) {
  if (_ref === void 0) {
    _ref = {};
  }

  var _ref2 = _ref,
      _ref2$getDisplayName = _ref2.getDisplayName,
      getDisplayName = _ref2$getDisplayName === void 0 ? function (name) {
    return "ConnectAdvanced(" + name + ")";
  } : _ref2$getDisplayName,
      _ref2$methodName = _ref2.methodName,
      methodName = _ref2$methodName === void 0 ? 'connectAdvanced' : _ref2$methodName,
      _ref2$renderCountProp = _ref2.renderCountProp,
      renderCountProp = _ref2$renderCountProp === void 0 ? undefined : _ref2$renderCountProp,
      _ref2$shouldHandleSta = _ref2.shouldHandleStateChanges,
      shouldHandleStateChanges = _ref2$shouldHandleSta === void 0 ? true : _ref2$shouldHandleSta,
      _ref2$storeKey = _ref2.storeKey,
      storeKey = _ref2$storeKey === void 0 ? 'store' : _ref2$storeKey,
      _ref2$withRef = _ref2.withRef,
      withRef = _ref2$withRef === void 0 ? false : _ref2$withRef,
      _ref2$forwardRef = _ref2.forwardRef,
      forwardRef = _ref2$forwardRef === void 0 ? false : _ref2$forwardRef,
      _ref2$context = _ref2.context,
      context = _ref2$context === void 0 ? ReactReduxContext : _ref2$context,
      connectOptions = _objectWithoutPropertiesLoose(_ref2, ["getDisplayName", "methodName", "renderCountProp", "shouldHandleStateChanges", "storeKey", "withRef", "forwardRef", "context"]);

  browser_default()(renderCountProp === undefined, "renderCountProp is removed. render counting is built into the latest React Dev Tools profiling extension");
  browser_default()(!withRef, 'withRef is removed. To access the wrapped instance, use a ref on the connected component');
  var customStoreWarningMessage = 'To use a custom Redux store for specific components, create a custom React context with ' + "React.createContext(), and pass the context object to React Redux's Provider and specific components" + ' like: <Provider context={MyContext}><ConnectedComponent context={MyContext} /></Provider>. ' + 'You may also pass a {context : MyContext} option to connect';
  browser_default()(storeKey === 'store', 'storeKey has been removed and does not do anything. ' + customStoreWarningMessage);
  var Context = context;
  return function wrapWithConnect(WrappedComponent) {
    if (false) {}

    var wrappedComponentName = WrappedComponent.displayName || WrappedComponent.name || 'Component';
    var displayName = getDisplayName(wrappedComponentName);

    var selectorFactoryOptions = _extends({}, connectOptions, {
      getDisplayName: getDisplayName,
      methodName: methodName,
      renderCountProp: renderCountProp,
      shouldHandleStateChanges: shouldHandleStateChanges,
      storeKey: storeKey,
      displayName: displayName,
      wrappedComponentName: wrappedComponentName,
      WrappedComponent: WrappedComponent
    });

    var pure = connectOptions.pure;

    function createChildSelector(store) {
      return selectorFactory(store.dispatch, selectorFactoryOptions);
    } // If we aren't running in "pure" mode, we don't want to memoize values.
    // To avoid conditionally calling hooks, we fall back to a tiny wrapper
    // that just executes the given callback immediately.


    var usePureOnlyMemo = pure ? react["useMemo"] : function (callback) {
      return callback();
    };

    function ConnectFunction(props) {
      var _useMemo = Object(react["useMemo"])(function () {
        // Distinguish between actual "data" props that were passed to the wrapper component,
        // and values needed to control behavior (forwarded refs, alternate context instances).
        // To maintain the wrapperProps object reference, memoize this destructuring.
        var forwardedRef = props.forwardedRef,
            wrapperProps = _objectWithoutPropertiesLoose(props, ["forwardedRef"]);

        return [props.context, forwardedRef, wrapperProps];
      }, [props]),
          propsContext = _useMemo[0],
          forwardedRef = _useMemo[1],
          wrapperProps = _useMemo[2];

      var ContextToUse = Object(react["useMemo"])(function () {
        // Users may optionally pass in a custom context instance to use instead of our ReactReduxContext.
        // Memoize the check that determines which context instance we should use.
        return propsContext && propsContext.Consumer && Object(react_is["isContextConsumer"])(react_default.a.createElement(propsContext.Consumer, null)) ? propsContext : Context;
      }, [propsContext, Context]); // Retrieve the store and ancestor subscription via context, if available

      var contextValue = Object(react["useContext"])(ContextToUse); // The store _must_ exist as either a prop or in context

      var didStoreComeFromProps = Boolean(props.store);
      var didStoreComeFromContext = Boolean(contextValue) && Boolean(contextValue.store);
      browser_default()(didStoreComeFromProps || didStoreComeFromContext, "Could not find \"store\" in the context of " + ("\"" + displayName + "\". Either wrap the root component in a <Provider>, ") + "or pass a custom React context provider to <Provider> and the corresponding " + ("React context consumer to " + displayName + " in connect options."));
      var store = props.store || contextValue.store;
      var childPropsSelector = Object(react["useMemo"])(function () {
        // The child props selector needs the store reference as an input.
        // Re-create this selector whenever the store changes.
        return createChildSelector(store);
      }, [store]);

      var _useMemo2 = Object(react["useMemo"])(function () {
        if (!shouldHandleStateChanges) return NO_SUBSCRIPTION_ARRAY; // This Subscription's source should match where store came from: props vs. context. A component
        // connected to the store via props shouldn't use subscription from context, or vice versa.

        var subscription = new Subscription(store, didStoreComeFromProps ? null : contextValue.subscription); // `notifyNestedSubs` is duplicated to handle the case where the component is unmounted in
        // the middle of the notification loop, where `subscription` will then be null. This can
        // probably be avoided if Subscription's listeners logic is changed to not call listeners
        // that have been unsubscribed in the  middle of the notification loop.

        var notifyNestedSubs = subscription.notifyNestedSubs.bind(subscription);
        return [subscription, notifyNestedSubs];
      }, [store, didStoreComeFromProps, contextValue]),
          subscription = _useMemo2[0],
          notifyNestedSubs = _useMemo2[1]; // Determine what {store, subscription} value should be put into nested context, if necessary,
      // and memoize that value to avoid unnecessary context updates.


      var overriddenContextValue = Object(react["useMemo"])(function () {
        if (didStoreComeFromProps) {
          // This component is directly subscribed to a store from props.
          // We don't want descendants reading from this store - pass down whatever
          // the existing context value is from the nearest connected ancestor.
          return contextValue;
        } // Otherwise, put this component's subscription instance into context, so that
        // connected descendants won't update until after this component is done


        return _extends({}, contextValue, {
          subscription: subscription
        });
      }, [didStoreComeFromProps, contextValue, subscription]); // We need to force this wrapper component to re-render whenever a Redux store update
      // causes a change to the calculated child component props (or we caught an error in mapState)

      var _useReducer = Object(react["useReducer"])(storeStateUpdatesReducer, EMPTY_ARRAY, initStateUpdates),
          _useReducer$ = _useReducer[0],
          previousStateUpdateResult = _useReducer$[0],
          forceComponentUpdateDispatch = _useReducer[1]; // Propagate any mapState/mapDispatch errors upwards


      if (previousStateUpdateResult && previousStateUpdateResult.error) {
        throw previousStateUpdateResult.error;
      } // Set up refs to coordinate values between the subscription effect and the render logic


      var lastChildProps = Object(react["useRef"])();
      var lastWrapperProps = Object(react["useRef"])(wrapperProps);
      var childPropsFromStoreUpdate = Object(react["useRef"])();
      var renderIsScheduled = Object(react["useRef"])(false);
      var actualChildProps = usePureOnlyMemo(function () {
        // Tricky logic here:
        // - This render may have been triggered by a Redux store update that produced new child props
        // - However, we may have gotten new wrapper props after that
        // If we have new child props, and the same wrapper props, we know we should use the new child props as-is.
        // But, if we have new wrapper props, those might change the child props, so we have to recalculate things.
        // So, we'll use the child props from store update only if the wrapper props are the same as last time.
        if (childPropsFromStoreUpdate.current && wrapperProps === lastWrapperProps.current) {
          return childPropsFromStoreUpdate.current;
        } // TODO We're reading the store directly in render() here. Bad idea?
        // This will likely cause Bad Things (TM) to happen in Concurrent Mode.
        // Note that we do this because on renders _not_ caused by store updates, we need the latest store state
        // to determine what the child props should be.


        return childPropsSelector(store.getState(), wrapperProps);
      }, [store, previousStateUpdateResult, wrapperProps]); // We need this to execute synchronously every time we re-render. However, React warns
      // about useLayoutEffect in SSR, so we try to detect environment and fall back to
      // just useEffect instead to avoid the warning, since neither will run anyway.

      useIsomorphicLayoutEffect(function () {
        // We want to capture the wrapper props and child props we used for later comparisons
        lastWrapperProps.current = wrapperProps;
        lastChildProps.current = actualChildProps;
        renderIsScheduled.current = false; // If the render was from a store update, clear out that reference and cascade the subscriber update

        if (childPropsFromStoreUpdate.current) {
          childPropsFromStoreUpdate.current = null;
          notifyNestedSubs();
        }
      }); // Our re-subscribe logic only runs when the store/subscription setup changes

      useIsomorphicLayoutEffect(function () {
        // If we're not subscribed to the store, nothing to do here
        if (!shouldHandleStateChanges) return; // Capture values for checking if and when this component unmounts

        var didUnsubscribe = false;
        var lastThrownError = null; // We'll run this callback every time a store subscription update propagates to this component

        var checkForUpdates = function checkForUpdates() {
          if (didUnsubscribe) {
            // Don't run stale listeners.
            // Redux doesn't guarantee unsubscriptions happen until next dispatch.
            return;
          }

          var latestStoreState = store.getState();
          var newChildProps, error;

          try {
            // Actually run the selector with the most recent store state and wrapper props
            // to determine what the child props should be
            newChildProps = childPropsSelector(latestStoreState, lastWrapperProps.current);
          } catch (e) {
            error = e;
            lastThrownError = e;
          }

          if (!error) {
            lastThrownError = null;
          } // If the child props haven't changed, nothing to do here - cascade the subscription update


          if (newChildProps === lastChildProps.current) {
            if (!renderIsScheduled.current) {
              notifyNestedSubs();
            }
          } else {
            // Save references to the new child props.  Note that we track the "child props from store update"
            // as a ref instead of a useState/useReducer because we need a way to determine if that value has
            // been processed.  If this went into useState/useReducer, we couldn't clear out the value without
            // forcing another re-render, which we don't want.
            lastChildProps.current = newChildProps;
            childPropsFromStoreUpdate.current = newChildProps;
            renderIsScheduled.current = true; // If the child props _did_ change (or we caught an error), this wrapper component needs to re-render

            forceComponentUpdateDispatch({
              type: 'STORE_UPDATED',
              payload: {
                latestStoreState: latestStoreState,
                error: error
              }
            });
          }
        }; // Actually subscribe to the nearest connected ancestor (or store)


        subscription.onStateChange = checkForUpdates;
        subscription.trySubscribe(); // Pull data from the store after first render in case the store has
        // changed since we began.

        checkForUpdates();

        var unsubscribeWrapper = function unsubscribeWrapper() {
          didUnsubscribe = true;
          subscription.tryUnsubscribe();
          subscription.onStateChange = null;

          if (lastThrownError) {
            // It's possible that we caught an error due to a bad mapState function, but the
            // parent re-rendered without this component and we're about to unmount.
            // This shouldn't happen as long as we do top-down subscriptions correctly, but
            // if we ever do those wrong, this throw will surface the error in our tests.
            // In that case, throw the error from here so it doesn't get lost.
            throw lastThrownError;
          }
        };

        return unsubscribeWrapper;
      }, [store, subscription, childPropsSelector]); // Now that all that's done, we can finally try to actually render the child component.
      // We memoize the elements for the rendered child component as an optimization.

      var renderedWrappedComponent = Object(react["useMemo"])(function () {
        return react_default.a.createElement(WrappedComponent, _extends({}, actualChildProps, {
          ref: forwardedRef
        }));
      }, [forwardedRef, WrappedComponent, actualChildProps]); // If React sees the exact same element reference as last time, it bails out of re-rendering
      // that child, same as if it was wrapped in React.memo() or returned false from shouldComponentUpdate.

      var renderedChild = Object(react["useMemo"])(function () {
        if (shouldHandleStateChanges) {
          // If this component is subscribed to store updates, we need to pass its own
          // subscription instance down to our descendants. That means rendering the same
          // Context instance, and putting a different value into the context.
          return react_default.a.createElement(ContextToUse.Provider, {
            value: overriddenContextValue
          }, renderedWrappedComponent);
        }

        return renderedWrappedComponent;
      }, [ContextToUse, renderedWrappedComponent, overriddenContextValue]);
      return renderedChild;
    } // If we're in "pure" mode, ensure our wrapper component only re-renders when incoming props have changed.


    var Connect = pure ? react_default.a.memo(ConnectFunction) : ConnectFunction;
    Connect.WrappedComponent = WrappedComponent;
    Connect.displayName = displayName;

    if (forwardRef) {
      var forwarded = react_default.a.forwardRef(function forwardConnectRef(props, ref) {
        return react_default.a.createElement(Connect, _extends({}, props, {
          forwardedRef: ref
        }));
      });
      forwarded.displayName = displayName;
      forwarded.WrappedComponent = WrappedComponent;
      return hoist_non_react_statics_cjs_default()(forwarded, WrappedComponent);
    }

    return hoist_non_react_statics_cjs_default()(Connect, WrappedComponent);
  };
}
// CONCATENATED MODULE: ./node_modules/react-redux/es/utils/shallowEqual.js
var hasOwn = Object.prototype.hasOwnProperty;

function is(x, y) {
  if (x === y) {
    return x !== 0 || y !== 0 || 1 / x === 1 / y;
  } else {
    return x !== x && y !== y;
  }
}

function shallowEqual(objA, objB) {
  if (is(objA, objB)) return true;

  if (typeof objA !== 'object' || objA === null || typeof objB !== 'object' || objB === null) {
    return false;
  }

  var keysA = Object.keys(objA);
  var keysB = Object.keys(objB);
  if (keysA.length !== keysB.length) return false;

  for (var i = 0; i < keysA.length; i++) {
    if (!hasOwn.call(objB, keysA[i]) || !is(objA[keysA[i]], objB[keysA[i]])) {
      return false;
    }
  }

  return true;
}
// EXTERNAL MODULE: ./node_modules/symbol-observable/es/index.js
var es = __webpack_require__(19);

// CONCATENATED MODULE: ./node_modules/redux/es/redux.js


/**
 * These are private action types reserved by Redux.
 * For any unknown actions, you must return the current state.
 * If the current state is undefined, you must return the initial state.
 * Do not reference these action types directly in your code.
 */
var randomString = function randomString() {
  return Math.random().toString(36).substring(7).split('').join('.');
};

var ActionTypes = {
  INIT: "@@redux/INIT" + randomString(),
  REPLACE: "@@redux/REPLACE" + randomString(),
  PROBE_UNKNOWN_ACTION: function PROBE_UNKNOWN_ACTION() {
    return "@@redux/PROBE_UNKNOWN_ACTION" + randomString();
  }
};

/**
 * @param {any} obj The object to inspect.
 * @returns {boolean} True if the argument appears to be a plain object.
 */
function isPlainObject(obj) {
  if (typeof obj !== 'object' || obj === null) return false;
  var proto = obj;

  while (Object.getPrototypeOf(proto) !== null) {
    proto = Object.getPrototypeOf(proto);
  }

  return Object.getPrototypeOf(obj) === proto;
}

/**
 * Creates a Redux store that holds the state tree.
 * The only way to change the data in the store is to call `dispatch()` on it.
 *
 * There should only be a single store in your app. To specify how different
 * parts of the state tree respond to actions, you may combine several reducers
 * into a single reducer function by using `combineReducers`.
 *
 * @param {Function} reducer A function that returns the next state tree, given
 * the current state tree and the action to handle.
 *
 * @param {any} [preloadedState] The initial state. You may optionally specify it
 * to hydrate the state from the server in universal apps, or to restore a
 * previously serialized user session.
 * If you use `combineReducers` to produce the root reducer function, this must be
 * an object with the same shape as `combineReducers` keys.
 *
 * @param {Function} [enhancer] The store enhancer. You may optionally specify it
 * to enhance the store with third-party capabilities such as middleware,
 * time travel, persistence, etc. The only store enhancer that ships with Redux
 * is `applyMiddleware()`.
 *
 * @returns {Store} A Redux store that lets you read the state, dispatch actions
 * and subscribe to changes.
 */

function createStore(reducer, preloadedState, enhancer) {
  var _ref2;

  if (typeof preloadedState === 'function' && typeof enhancer === 'function' || typeof enhancer === 'function' && typeof arguments[3] === 'function') {
    throw new Error('It looks like you are passing several store enhancers to ' + 'createStore(). This is not supported. Instead, compose them ' + 'together to a single function.');
  }

  if (typeof preloadedState === 'function' && typeof enhancer === 'undefined') {
    enhancer = preloadedState;
    preloadedState = undefined;
  }

  if (typeof enhancer !== 'undefined') {
    if (typeof enhancer !== 'function') {
      throw new Error('Expected the enhancer to be a function.');
    }

    return enhancer(createStore)(reducer, preloadedState);
  }

  if (typeof reducer !== 'function') {
    throw new Error('Expected the reducer to be a function.');
  }

  var currentReducer = reducer;
  var currentState = preloadedState;
  var currentListeners = [];
  var nextListeners = currentListeners;
  var isDispatching = false;
  /**
   * This makes a shallow copy of currentListeners so we can use
   * nextListeners as a temporary list while dispatching.
   *
   * This prevents any bugs around consumers calling
   * subscribe/unsubscribe in the middle of a dispatch.
   */

  function ensureCanMutateNextListeners() {
    if (nextListeners === currentListeners) {
      nextListeners = currentListeners.slice();
    }
  }
  /**
   * Reads the state tree managed by the store.
   *
   * @returns {any} The current state tree of your application.
   */


  function getState() {
    if (isDispatching) {
      throw new Error('You may not call store.getState() while the reducer is executing. ' + 'The reducer has already received the state as an argument. ' + 'Pass it down from the top reducer instead of reading it from the store.');
    }

    return currentState;
  }
  /**
   * Adds a change listener. It will be called any time an action is dispatched,
   * and some part of the state tree may potentially have changed. You may then
   * call `getState()` to read the current state tree inside the callback.
   *
   * You may call `dispatch()` from a change listener, with the following
   * caveats:
   *
   * 1. The subscriptions are snapshotted just before every `dispatch()` call.
   * If you subscribe or unsubscribe while the listeners are being invoked, this
   * will not have any effect on the `dispatch()` that is currently in progress.
   * However, the next `dispatch()` call, whether nested or not, will use a more
   * recent snapshot of the subscription list.
   *
   * 2. The listener should not expect to see all state changes, as the state
   * might have been updated multiple times during a nested `dispatch()` before
   * the listener is called. It is, however, guaranteed that all subscribers
   * registered before the `dispatch()` started will be called with the latest
   * state by the time it exits.
   *
   * @param {Function} listener A callback to be invoked on every dispatch.
   * @returns {Function} A function to remove this change listener.
   */


  function subscribe(listener) {
    if (typeof listener !== 'function') {
      throw new Error('Expected the listener to be a function.');
    }

    if (isDispatching) {
      throw new Error('You may not call store.subscribe() while the reducer is executing. ' + 'If you would like to be notified after the store has been updated, subscribe from a ' + 'component and invoke store.getState() in the callback to access the latest state. ' + 'See https://redux.js.org/api-reference/store#subscribe(listener) for more details.');
    }

    var isSubscribed = true;
    ensureCanMutateNextListeners();
    nextListeners.push(listener);
    return function unsubscribe() {
      if (!isSubscribed) {
        return;
      }

      if (isDispatching) {
        throw new Error('You may not unsubscribe from a store listener while the reducer is executing. ' + 'See https://redux.js.org/api-reference/store#subscribe(listener) for more details.');
      }

      isSubscribed = false;
      ensureCanMutateNextListeners();
      var index = nextListeners.indexOf(listener);
      nextListeners.splice(index, 1);
    };
  }
  /**
   * Dispatches an action. It is the only way to trigger a state change.
   *
   * The `reducer` function, used to create the store, will be called with the
   * current state tree and the given `action`. Its return value will
   * be considered the **next** state of the tree, and the change listeners
   * will be notified.
   *
   * The base implementation only supports plain object actions. If you want to
   * dispatch a Promise, an Observable, a thunk, or something else, you need to
   * wrap your store creating function into the corresponding middleware. For
   * example, see the documentation for the `redux-thunk` package. Even the
   * middleware will eventually dispatch plain object actions using this method.
   *
   * @param {Object} action A plain object representing “what changed”. It is
   * a good idea to keep actions serializable so you can record and replay user
   * sessions, or use the time travelling `redux-devtools`. An action must have
   * a `type` property which may not be `undefined`. It is a good idea to use
   * string constants for action types.
   *
   * @returns {Object} For convenience, the same action object you dispatched.
   *
   * Note that, if you use a custom middleware, it may wrap `dispatch()` to
   * return something else (for example, a Promise you can await).
   */


  function dispatch(action) {
    if (!isPlainObject(action)) {
      throw new Error('Actions must be plain objects. ' + 'Use custom middleware for async actions.');
    }

    if (typeof action.type === 'undefined') {
      throw new Error('Actions may not have an undefined "type" property. ' + 'Have you misspelled a constant?');
    }

    if (isDispatching) {
      throw new Error('Reducers may not dispatch actions.');
    }

    try {
      isDispatching = true;
      currentState = currentReducer(currentState, action);
    } finally {
      isDispatching = false;
    }

    var listeners = currentListeners = nextListeners;

    for (var i = 0; i < listeners.length; i++) {
      var listener = listeners[i];
      listener();
    }

    return action;
  }
  /**
   * Replaces the reducer currently used by the store to calculate the state.
   *
   * You might need this if your app implements code splitting and you want to
   * load some of the reducers dynamically. You might also need this if you
   * implement a hot reloading mechanism for Redux.
   *
   * @param {Function} nextReducer The reducer for the store to use instead.
   * @returns {void}
   */


  function replaceReducer(nextReducer) {
    if (typeof nextReducer !== 'function') {
      throw new Error('Expected the nextReducer to be a function.');
    }

    currentReducer = nextReducer; // This action has a similiar effect to ActionTypes.INIT.
    // Any reducers that existed in both the new and old rootReducer
    // will receive the previous state. This effectively populates
    // the new state tree with any relevant data from the old one.

    dispatch({
      type: ActionTypes.REPLACE
    });
  }
  /**
   * Interoperability point for observable/reactive libraries.
   * @returns {observable} A minimal observable of state changes.
   * For more information, see the observable proposal:
   * https://github.com/tc39/proposal-observable
   */


  function observable() {
    var _ref;

    var outerSubscribe = subscribe;
    return _ref = {
      /**
       * The minimal observable subscription method.
       * @param {Object} observer Any object that can be used as an observer.
       * The observer object should have a `next` method.
       * @returns {subscription} An object with an `unsubscribe` method that can
       * be used to unsubscribe the observable from the store, and prevent further
       * emission of values from the observable.
       */
      subscribe: function subscribe(observer) {
        if (typeof observer !== 'object' || observer === null) {
          throw new TypeError('Expected the observer to be an object.');
        }

        function observeState() {
          if (observer.next) {
            observer.next(getState());
          }
        }

        observeState();
        var unsubscribe = outerSubscribe(observeState);
        return {
          unsubscribe: unsubscribe
        };
      }
    }, _ref[es["a" /* default */]] = function () {
      return this;
    }, _ref;
  } // When a store is created, an "INIT" action is dispatched so that every
  // reducer returns their initial state. This effectively populates
  // the initial state tree.


  dispatch({
    type: ActionTypes.INIT
  });
  return _ref2 = {
    dispatch: dispatch,
    subscribe: subscribe,
    getState: getState,
    replaceReducer: replaceReducer
  }, _ref2[es["a" /* default */]] = observable, _ref2;
}

/**
 * Prints a warning in the console if it exists.
 *
 * @param {String} message The warning message.
 * @returns {void}
 */
function warning(message) {
  /* eslint-disable no-console */
  if (typeof console !== 'undefined' && typeof console.error === 'function') {
    console.error(message);
  }
  /* eslint-enable no-console */


  try {
    // This error was thrown as a convenience so that if you enable
    // "break on all exceptions" in your console,
    // it would pause the execution at this line.
    throw new Error(message);
  } catch (e) {} // eslint-disable-line no-empty

}

function getUndefinedStateErrorMessage(key, action) {
  var actionType = action && action.type;
  var actionDescription = actionType && "action \"" + String(actionType) + "\"" || 'an action';
  return "Given " + actionDescription + ", reducer \"" + key + "\" returned undefined. " + "To ignore an action, you must explicitly return the previous state. " + "If you want this reducer to hold no value, you can return null instead of undefined.";
}

function getUnexpectedStateShapeWarningMessage(inputState, reducers, action, unexpectedKeyCache) {
  var reducerKeys = Object.keys(reducers);
  var argumentName = action && action.type === ActionTypes.INIT ? 'preloadedState argument passed to createStore' : 'previous state received by the reducer';

  if (reducerKeys.length === 0) {
    return 'Store does not have a valid reducer. Make sure the argument passed ' + 'to combineReducers is an object whose values are reducers.';
  }

  if (!isPlainObject(inputState)) {
    return "The " + argumentName + " has unexpected type of \"" + {}.toString.call(inputState).match(/\s([a-z|A-Z]+)/)[1] + "\". Expected argument to be an object with the following " + ("keys: \"" + reducerKeys.join('", "') + "\"");
  }

  var unexpectedKeys = Object.keys(inputState).filter(function (key) {
    return !reducers.hasOwnProperty(key) && !unexpectedKeyCache[key];
  });
  unexpectedKeys.forEach(function (key) {
    unexpectedKeyCache[key] = true;
  });
  if (action && action.type === ActionTypes.REPLACE) return;

  if (unexpectedKeys.length > 0) {
    return "Unexpected " + (unexpectedKeys.length > 1 ? 'keys' : 'key') + " " + ("\"" + unexpectedKeys.join('", "') + "\" found in " + argumentName + ". ") + "Expected to find one of the known reducer keys instead: " + ("\"" + reducerKeys.join('", "') + "\". Unexpected keys will be ignored.");
  }
}

function assertReducerShape(reducers) {
  Object.keys(reducers).forEach(function (key) {
    var reducer = reducers[key];
    var initialState = reducer(undefined, {
      type: ActionTypes.INIT
    });

    if (typeof initialState === 'undefined') {
      throw new Error("Reducer \"" + key + "\" returned undefined during initialization. " + "If the state passed to the reducer is undefined, you must " + "explicitly return the initial state. The initial state may " + "not be undefined. If you don't want to set a value for this reducer, " + "you can use null instead of undefined.");
    }

    if (typeof reducer(undefined, {
      type: ActionTypes.PROBE_UNKNOWN_ACTION()
    }) === 'undefined') {
      throw new Error("Reducer \"" + key + "\" returned undefined when probed with a random type. " + ("Don't try to handle " + ActionTypes.INIT + " or other actions in \"redux/*\" ") + "namespace. They are considered private. Instead, you must return the " + "current state for any unknown actions, unless it is undefined, " + "in which case you must return the initial state, regardless of the " + "action type. The initial state may not be undefined, but can be null.");
    }
  });
}
/**
 * Turns an object whose values are different reducer functions, into a single
 * reducer function. It will call every child reducer, and gather their results
 * into a single state object, whose keys correspond to the keys of the passed
 * reducer functions.
 *
 * @param {Object} reducers An object whose values correspond to different
 * reducer functions that need to be combined into one. One handy way to obtain
 * it is to use ES6 `import * as reducers` syntax. The reducers may never return
 * undefined for any action. Instead, they should return their initial state
 * if the state passed to them was undefined, and the current state for any
 * unrecognized action.
 *
 * @returns {Function} A reducer function that invokes every reducer inside the
 * passed object, and builds a state object with the same shape.
 */


function combineReducers(reducers) {
  var reducerKeys = Object.keys(reducers);
  var finalReducers = {};

  for (var i = 0; i < reducerKeys.length; i++) {
    var key = reducerKeys[i];

    if (false) {}

    if (typeof reducers[key] === 'function') {
      finalReducers[key] = reducers[key];
    }
  }

  var finalReducerKeys = Object.keys(finalReducers); // This is used to make sure we don't warn about the same
  // keys multiple times.

  var unexpectedKeyCache;

  if (false) {}

  var shapeAssertionError;

  try {
    assertReducerShape(finalReducers);
  } catch (e) {
    shapeAssertionError = e;
  }

  return function combination(state, action) {
    if (state === void 0) {
      state = {};
    }

    if (shapeAssertionError) {
      throw shapeAssertionError;
    }

    if (false) { var warningMessage; }

    var hasChanged = false;
    var nextState = {};

    for (var _i = 0; _i < finalReducerKeys.length; _i++) {
      var _key = finalReducerKeys[_i];
      var reducer = finalReducers[_key];
      var previousStateForKey = state[_key];
      var nextStateForKey = reducer(previousStateForKey, action);

      if (typeof nextStateForKey === 'undefined') {
        var errorMessage = getUndefinedStateErrorMessage(_key, action);
        throw new Error(errorMessage);
      }

      nextState[_key] = nextStateForKey;
      hasChanged = hasChanged || nextStateForKey !== previousStateForKey;
    }

    return hasChanged ? nextState : state;
  };
}

function bindActionCreator(actionCreator, dispatch) {
  return function () {
    return dispatch(actionCreator.apply(this, arguments));
  };
}
/**
 * Turns an object whose values are action creators, into an object with the
 * same keys, but with every function wrapped into a `dispatch` call so they
 * may be invoked directly. This is just a convenience method, as you can call
 * `store.dispatch(MyActionCreators.doSomething())` yourself just fine.
 *
 * For convenience, you can also pass an action creator as the first argument,
 * and get a dispatch wrapped function in return.
 *
 * @param {Function|Object} actionCreators An object whose values are action
 * creator functions. One handy way to obtain it is to use ES6 `import * as`
 * syntax. You may also pass a single function.
 *
 * @param {Function} dispatch The `dispatch` function available on your Redux
 * store.
 *
 * @returns {Function|Object} The object mimicking the original object, but with
 * every action creator wrapped into the `dispatch` call. If you passed a
 * function as `actionCreators`, the return value will also be a single
 * function.
 */


function bindActionCreators(actionCreators, dispatch) {
  if (typeof actionCreators === 'function') {
    return bindActionCreator(actionCreators, dispatch);
  }

  if (typeof actionCreators !== 'object' || actionCreators === null) {
    throw new Error("bindActionCreators expected an object or a function, instead received " + (actionCreators === null ? 'null' : typeof actionCreators) + ". " + "Did you write \"import ActionCreators from\" instead of \"import * as ActionCreators from\"?");
  }

  var boundActionCreators = {};

  for (var key in actionCreators) {
    var actionCreator = actionCreators[key];

    if (typeof actionCreator === 'function') {
      boundActionCreators[key] = bindActionCreator(actionCreator, dispatch);
    }
  }

  return boundActionCreators;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    keys.push.apply(keys, Object.getOwnPropertySymbols(object));
  }

  if (enumerableOnly) keys = keys.filter(function (sym) {
    return Object.getOwnPropertyDescriptor(object, sym).enumerable;
  });
  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(source, true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(source).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

/**
 * Composes single-argument functions from right to left. The rightmost
 * function can take multiple arguments as it provides the signature for
 * the resulting composite function.
 *
 * @param {...Function} funcs The functions to compose.
 * @returns {Function} A function obtained by composing the argument functions
 * from right to left. For example, compose(f, g, h) is identical to doing
 * (...args) => f(g(h(...args))).
 */
function compose() {
  for (var _len = arguments.length, funcs = new Array(_len), _key = 0; _key < _len; _key++) {
    funcs[_key] = arguments[_key];
  }

  if (funcs.length === 0) {
    return function (arg) {
      return arg;
    };
  }

  if (funcs.length === 1) {
    return funcs[0];
  }

  return funcs.reduce(function (a, b) {
    return function () {
      return a(b.apply(void 0, arguments));
    };
  });
}

/**
 * Creates a store enhancer that applies middleware to the dispatch method
 * of the Redux store. This is handy for a variety of tasks, such as expressing
 * asynchronous actions in a concise manner, or logging every action payload.
 *
 * See `redux-thunk` package as an example of the Redux middleware.
 *
 * Because middleware is potentially asynchronous, this should be the first
 * store enhancer in the composition chain.
 *
 * Note that each middleware will be given the `dispatch` and `getState` functions
 * as named arguments.
 *
 * @param {...Function} middlewares The middleware chain to be applied.
 * @returns {Function} A store enhancer applying the middleware.
 */

function applyMiddleware() {
  for (var _len = arguments.length, middlewares = new Array(_len), _key = 0; _key < _len; _key++) {
    middlewares[_key] = arguments[_key];
  }

  return function (createStore) {
    return function () {
      var store = createStore.apply(void 0, arguments);

      var _dispatch = function dispatch() {
        throw new Error('Dispatching while constructing your middleware is not allowed. ' + 'Other middleware would not be applied to this dispatch.');
      };

      var middlewareAPI = {
        getState: store.getState,
        dispatch: function dispatch() {
          return _dispatch.apply(void 0, arguments);
        }
      };
      var chain = middlewares.map(function (middleware) {
        return middleware(middlewareAPI);
      });
      _dispatch = compose.apply(void 0, chain)(store.dispatch);
      return _objectSpread2({}, store, {
        dispatch: _dispatch
      });
    };
  };
}

/*
 * This is a dummy function to check if the function name has been altered by minification.
 * If the function has been minified and NODE_ENV !== 'production', warn the user.
 */

function isCrushed() {}

if (false) {}



// CONCATENATED MODULE: ./node_modules/react-redux/es/utils/isPlainObject.js
/**
 * @param {any} obj The object to inspect.
 * @returns {boolean} True if the argument appears to be a plain object.
 */
function isPlainObject_isPlainObject(obj) {
  if (typeof obj !== 'object' || obj === null) return false;
  var proto = Object.getPrototypeOf(obj);
  if (proto === null) return true;
  var baseProto = proto;

  while (Object.getPrototypeOf(baseProto) !== null) {
    baseProto = Object.getPrototypeOf(baseProto);
  }

  return proto === baseProto;
}
// CONCATENATED MODULE: ./node_modules/react-redux/es/utils/warning.js
/**
 * Prints a warning in the console if it exists.
 *
 * @param {String} message The warning message.
 * @returns {void}
 */
function warning_warning(message) {
  /* eslint-disable no-console */
  if (typeof console !== 'undefined' && typeof console.error === 'function') {
    console.error(message);
  }
  /* eslint-enable no-console */


  try {
    // This error was thrown as a convenience so that if you enable
    // "break on all exceptions" in your console,
    // it would pause the execution at this line.
    throw new Error(message);
    /* eslint-disable no-empty */
  } catch (e) {}
  /* eslint-enable no-empty */

}
// CONCATENATED MODULE: ./node_modules/react-redux/es/utils/verifyPlainObject.js


function verifyPlainObject(value, displayName, methodName) {
  if (!isPlainObject_isPlainObject(value)) {
    warning_warning(methodName + "() in " + displayName + " must return a plain object. Instead received " + value + ".");
  }
}
// CONCATENATED MODULE: ./node_modules/react-redux/es/connect/wrapMapToProps.js

function wrapMapToPropsConstant(getConstant) {
  return function initConstantSelector(dispatch, options) {
    var constant = getConstant(dispatch, options);

    function constantSelector() {
      return constant;
    }

    constantSelector.dependsOnOwnProps = false;
    return constantSelector;
  };
} // dependsOnOwnProps is used by createMapToPropsProxy to determine whether to pass props as args
// to the mapToProps function being wrapped. It is also used by makePurePropsSelector to determine
// whether mapToProps needs to be invoked when props have changed.
//
// A length of one signals that mapToProps does not depend on props from the parent component.
// A length of zero is assumed to mean mapToProps is getting args via arguments or ...args and
// therefore not reporting its length accurately..

function getDependsOnOwnProps(mapToProps) {
  return mapToProps.dependsOnOwnProps !== null && mapToProps.dependsOnOwnProps !== undefined ? Boolean(mapToProps.dependsOnOwnProps) : mapToProps.length !== 1;
} // Used by whenMapStateToPropsIsFunction and whenMapDispatchToPropsIsFunction,
// this function wraps mapToProps in a proxy function which does several things:
//
//  * Detects whether the mapToProps function being called depends on props, which
//    is used by selectorFactory to decide if it should reinvoke on props changes.
//
//  * On first call, handles mapToProps if returns another function, and treats that
//    new function as the true mapToProps for subsequent calls.
//
//  * On first call, verifies the first result is a plain object, in order to warn
//    the developer that their mapToProps function is not returning a valid result.
//

function wrapMapToPropsFunc(mapToProps, methodName) {
  return function initProxySelector(dispatch, _ref) {
    var displayName = _ref.displayName;

    var proxy = function mapToPropsProxy(stateOrDispatch, ownProps) {
      return proxy.dependsOnOwnProps ? proxy.mapToProps(stateOrDispatch, ownProps) : proxy.mapToProps(stateOrDispatch);
    }; // allow detectFactoryAndVerify to get ownProps


    proxy.dependsOnOwnProps = true;

    proxy.mapToProps = function detectFactoryAndVerify(stateOrDispatch, ownProps) {
      proxy.mapToProps = mapToProps;
      proxy.dependsOnOwnProps = getDependsOnOwnProps(mapToProps);
      var props = proxy(stateOrDispatch, ownProps);

      if (typeof props === 'function') {
        proxy.mapToProps = props;
        proxy.dependsOnOwnProps = getDependsOnOwnProps(props);
        props = proxy(stateOrDispatch, ownProps);
      }

      if (false) {}
      return props;
    };

    return proxy;
  };
}
// CONCATENATED MODULE: ./node_modules/react-redux/es/connect/mapDispatchToProps.js


function whenMapDispatchToPropsIsFunction(mapDispatchToProps) {
  return typeof mapDispatchToProps === 'function' ? wrapMapToPropsFunc(mapDispatchToProps, 'mapDispatchToProps') : undefined;
}
function whenMapDispatchToPropsIsMissing(mapDispatchToProps) {
  return !mapDispatchToProps ? wrapMapToPropsConstant(function (dispatch) {
    return {
      dispatch: dispatch
    };
  }) : undefined;
}
function whenMapDispatchToPropsIsObject(mapDispatchToProps) {
  return mapDispatchToProps && typeof mapDispatchToProps === 'object' ? wrapMapToPropsConstant(function (dispatch) {
    return bindActionCreators(mapDispatchToProps, dispatch);
  }) : undefined;
}
/* harmony default export */ var connect_mapDispatchToProps = ([whenMapDispatchToPropsIsFunction, whenMapDispatchToPropsIsMissing, whenMapDispatchToPropsIsObject]);
// CONCATENATED MODULE: ./node_modules/react-redux/es/connect/mapStateToProps.js

function whenMapStateToPropsIsFunction(mapStateToProps) {
  return typeof mapStateToProps === 'function' ? wrapMapToPropsFunc(mapStateToProps, 'mapStateToProps') : undefined;
}
function whenMapStateToPropsIsMissing(mapStateToProps) {
  return !mapStateToProps ? wrapMapToPropsConstant(function () {
    return {};
  }) : undefined;
}
/* harmony default export */ var connect_mapStateToProps = ([whenMapStateToPropsIsFunction, whenMapStateToPropsIsMissing]);
// CONCATENATED MODULE: ./node_modules/react-redux/es/connect/mergeProps.js


function defaultMergeProps(stateProps, dispatchProps, ownProps) {
  return _extends({}, ownProps, {}, stateProps, {}, dispatchProps);
}
function wrapMergePropsFunc(mergeProps) {
  return function initMergePropsProxy(dispatch, _ref) {
    var displayName = _ref.displayName,
        pure = _ref.pure,
        areMergedPropsEqual = _ref.areMergedPropsEqual;
    var hasRunOnce = false;
    var mergedProps;
    return function mergePropsProxy(stateProps, dispatchProps, ownProps) {
      var nextMergedProps = mergeProps(stateProps, dispatchProps, ownProps);

      if (hasRunOnce) {
        if (!pure || !areMergedPropsEqual(nextMergedProps, mergedProps)) mergedProps = nextMergedProps;
      } else {
        hasRunOnce = true;
        mergedProps = nextMergedProps;
        if (false) {}
      }

      return mergedProps;
    };
  };
}
function whenMergePropsIsFunction(mergeProps) {
  return typeof mergeProps === 'function' ? wrapMergePropsFunc(mergeProps) : undefined;
}
function whenMergePropsIsOmitted(mergeProps) {
  return !mergeProps ? function () {
    return defaultMergeProps;
  } : undefined;
}
/* harmony default export */ var connect_mergeProps = ([whenMergePropsIsFunction, whenMergePropsIsOmitted]);
// CONCATENATED MODULE: ./node_modules/react-redux/es/connect/verifySubselectors.js


function verify(selector, methodName, displayName) {
  if (!selector) {
    throw new Error("Unexpected value for " + methodName + " in " + displayName + ".");
  } else if (methodName === 'mapStateToProps' || methodName === 'mapDispatchToProps') {
    if (!Object.prototype.hasOwnProperty.call(selector, 'dependsOnOwnProps')) {
      warning_warning("The selector for " + methodName + " of " + displayName + " did not specify a value for dependsOnOwnProps.");
    }
  }
}

function verifySubselectors(mapStateToProps, mapDispatchToProps, mergeProps, displayName) {
  verify(mapStateToProps, 'mapStateToProps', displayName);
  verify(mapDispatchToProps, 'mapDispatchToProps', displayName);
  verify(mergeProps, 'mergeProps', displayName);
}
// CONCATENATED MODULE: ./node_modules/react-redux/es/connect/selectorFactory.js


function impureFinalPropsSelectorFactory(mapStateToProps, mapDispatchToProps, mergeProps, dispatch) {
  return function impureFinalPropsSelector(state, ownProps) {
    return mergeProps(mapStateToProps(state, ownProps), mapDispatchToProps(dispatch, ownProps), ownProps);
  };
}
function pureFinalPropsSelectorFactory(mapStateToProps, mapDispatchToProps, mergeProps, dispatch, _ref) {
  var areStatesEqual = _ref.areStatesEqual,
      areOwnPropsEqual = _ref.areOwnPropsEqual,
      areStatePropsEqual = _ref.areStatePropsEqual;
  var hasRunAtLeastOnce = false;
  var state;
  var ownProps;
  var stateProps;
  var dispatchProps;
  var mergedProps;

  function handleFirstCall(firstState, firstOwnProps) {
    state = firstState;
    ownProps = firstOwnProps;
    stateProps = mapStateToProps(state, ownProps);
    dispatchProps = mapDispatchToProps(dispatch, ownProps);
    mergedProps = mergeProps(stateProps, dispatchProps, ownProps);
    hasRunAtLeastOnce = true;
    return mergedProps;
  }

  function handleNewPropsAndNewState() {
    stateProps = mapStateToProps(state, ownProps);
    if (mapDispatchToProps.dependsOnOwnProps) dispatchProps = mapDispatchToProps(dispatch, ownProps);
    mergedProps = mergeProps(stateProps, dispatchProps, ownProps);
    return mergedProps;
  }

  function handleNewProps() {
    if (mapStateToProps.dependsOnOwnProps) stateProps = mapStateToProps(state, ownProps);
    if (mapDispatchToProps.dependsOnOwnProps) dispatchProps = mapDispatchToProps(dispatch, ownProps);
    mergedProps = mergeProps(stateProps, dispatchProps, ownProps);
    return mergedProps;
  }

  function handleNewState() {
    var nextStateProps = mapStateToProps(state, ownProps);
    var statePropsChanged = !areStatePropsEqual(nextStateProps, stateProps);
    stateProps = nextStateProps;
    if (statePropsChanged) mergedProps = mergeProps(stateProps, dispatchProps, ownProps);
    return mergedProps;
  }

  function handleSubsequentCalls(nextState, nextOwnProps) {
    var propsChanged = !areOwnPropsEqual(nextOwnProps, ownProps);
    var stateChanged = !areStatesEqual(nextState, state);
    state = nextState;
    ownProps = nextOwnProps;
    if (propsChanged && stateChanged) return handleNewPropsAndNewState();
    if (propsChanged) return handleNewProps();
    if (stateChanged) return handleNewState();
    return mergedProps;
  }

  return function pureFinalPropsSelector(nextState, nextOwnProps) {
    return hasRunAtLeastOnce ? handleSubsequentCalls(nextState, nextOwnProps) : handleFirstCall(nextState, nextOwnProps);
  };
} // TODO: Add more comments
// If pure is true, the selector returned by selectorFactory will memoize its results,
// allowing connectAdvanced's shouldComponentUpdate to return false if final
// props have not changed. If false, the selector will always return a new
// object and shouldComponentUpdate will always return true.

function finalPropsSelectorFactory(dispatch, _ref2) {
  var initMapStateToProps = _ref2.initMapStateToProps,
      initMapDispatchToProps = _ref2.initMapDispatchToProps,
      initMergeProps = _ref2.initMergeProps,
      options = _objectWithoutPropertiesLoose(_ref2, ["initMapStateToProps", "initMapDispatchToProps", "initMergeProps"]);

  var mapStateToProps = initMapStateToProps(dispatch, options);
  var mapDispatchToProps = initMapDispatchToProps(dispatch, options);
  var mergeProps = initMergeProps(dispatch, options);

  if (false) {}

  var selectorFactory = options.pure ? pureFinalPropsSelectorFactory : impureFinalPropsSelectorFactory;
  return selectorFactory(mapStateToProps, mapDispatchToProps, mergeProps, dispatch, options);
}
// CONCATENATED MODULE: ./node_modules/react-redux/es/connect/connect.js








/*
  connect is a facade over connectAdvanced. It turns its args into a compatible
  selectorFactory, which has the signature:

    (dispatch, options) => (nextState, nextOwnProps) => nextFinalProps
  
  connect passes its args to connectAdvanced as options, which will in turn pass them to
  selectorFactory each time a Connect component instance is instantiated or hot reloaded.

  selectorFactory returns a final props selector from its mapStateToProps,
  mapStateToPropsFactories, mapDispatchToProps, mapDispatchToPropsFactories, mergeProps,
  mergePropsFactories, and pure args.

  The resulting final props selector is called by the Connect component instance whenever
  it receives new props or store state.
 */

function connect_match(arg, factories, name) {
  for (var i = factories.length - 1; i >= 0; i--) {
    var result = factories[i](arg);
    if (result) return result;
  }

  return function (dispatch, options) {
    throw new Error("Invalid value of type " + typeof arg + " for " + name + " argument when connecting component " + options.wrappedComponentName + ".");
  };
}

function strictEqual(a, b) {
  return a === b;
} // createConnect with default args builds the 'official' connect behavior. Calling it with
// different options opens up some testing and extensibility scenarios


function createConnect(_temp) {
  var _ref = _temp === void 0 ? {} : _temp,
      _ref$connectHOC = _ref.connectHOC,
      connectHOC = _ref$connectHOC === void 0 ? connectAdvanced : _ref$connectHOC,
      _ref$mapStateToPropsF = _ref.mapStateToPropsFactories,
      mapStateToPropsFactories = _ref$mapStateToPropsF === void 0 ? connect_mapStateToProps : _ref$mapStateToPropsF,
      _ref$mapDispatchToPro = _ref.mapDispatchToPropsFactories,
      mapDispatchToPropsFactories = _ref$mapDispatchToPro === void 0 ? connect_mapDispatchToProps : _ref$mapDispatchToPro,
      _ref$mergePropsFactor = _ref.mergePropsFactories,
      mergePropsFactories = _ref$mergePropsFactor === void 0 ? connect_mergeProps : _ref$mergePropsFactor,
      _ref$selectorFactory = _ref.selectorFactory,
      selectorFactory = _ref$selectorFactory === void 0 ? finalPropsSelectorFactory : _ref$selectorFactory;

  return function connect(mapStateToProps, mapDispatchToProps, mergeProps, _ref2) {
    if (_ref2 === void 0) {
      _ref2 = {};
    }

    var _ref3 = _ref2,
        _ref3$pure = _ref3.pure,
        pure = _ref3$pure === void 0 ? true : _ref3$pure,
        _ref3$areStatesEqual = _ref3.areStatesEqual,
        areStatesEqual = _ref3$areStatesEqual === void 0 ? strictEqual : _ref3$areStatesEqual,
        _ref3$areOwnPropsEqua = _ref3.areOwnPropsEqual,
        areOwnPropsEqual = _ref3$areOwnPropsEqua === void 0 ? shallowEqual : _ref3$areOwnPropsEqua,
        _ref3$areStatePropsEq = _ref3.areStatePropsEqual,
        areStatePropsEqual = _ref3$areStatePropsEq === void 0 ? shallowEqual : _ref3$areStatePropsEq,
        _ref3$areMergedPropsE = _ref3.areMergedPropsEqual,
        areMergedPropsEqual = _ref3$areMergedPropsE === void 0 ? shallowEqual : _ref3$areMergedPropsE,
        extraOptions = _objectWithoutPropertiesLoose(_ref3, ["pure", "areStatesEqual", "areOwnPropsEqual", "areStatePropsEqual", "areMergedPropsEqual"]);

    var initMapStateToProps = connect_match(mapStateToProps, mapStateToPropsFactories, 'mapStateToProps');
    var initMapDispatchToProps = connect_match(mapDispatchToProps, mapDispatchToPropsFactories, 'mapDispatchToProps');
    var initMergeProps = connect_match(mergeProps, mergePropsFactories, 'mergeProps');
    return connectHOC(selectorFactory, _extends({
      // used in error messages
      methodName: 'connect',
      // used to compute Connect's displayName from the wrapped component's displayName.
      getDisplayName: function getDisplayName(name) {
        return "Connect(" + name + ")";
      },
      // if mapStateToProps is falsy, the Connect component doesn't subscribe to store state changes
      shouldHandleStateChanges: Boolean(mapStateToProps),
      // passed through to selectorFactory
      initMapStateToProps: initMapStateToProps,
      initMapDispatchToProps: initMapDispatchToProps,
      initMergeProps: initMergeProps,
      pure: pure,
      areStatesEqual: areStatesEqual,
      areOwnPropsEqual: areOwnPropsEqual,
      areStatePropsEqual: areStatePropsEqual,
      areMergedPropsEqual: areMergedPropsEqual
    }, extraOptions));
  };
}
/* harmony default export */ var connect_connect = (createConnect());
// CONCATENATED MODULE: ./node_modules/react-redux/es/hooks/useReduxContext.js



/**
 * A hook to access the value of the `ReactReduxContext`. This is a low-level
 * hook that you should usually not need to call directly.
 *
 * @returns {any} the value of the `ReactReduxContext`
 *
 * @example
 *
 * import React from 'react'
 * import { useReduxContext } from 'react-redux'
 *
 * export const CounterComponent = ({ value }) => {
 *   const { store } = useReduxContext()
 *   return <div>{store.getState()}</div>
 * }
 */

function useReduxContext_useReduxContext() {
  var contextValue = Object(react["useContext"])(ReactReduxContext);
  browser_default()(contextValue, 'could not find react-redux context value; please ensure the component is wrapped in a <Provider>');
  return contextValue;
}
// CONCATENATED MODULE: ./node_modules/react-redux/es/hooks/useStore.js



/**
 * Hook factory, which creates a `useStore` hook bound to a given context.
 *
 * @param {Function} [context=ReactReduxContext] Context passed to your `<Provider>`.
 * @returns {Function} A `useStore` hook bound to the specified context.
 */

function createStoreHook(context) {
  if (context === void 0) {
    context = ReactReduxContext;
  }

  var useReduxContext = context === ReactReduxContext ? useReduxContext_useReduxContext : function () {
    return Object(react["useContext"])(context);
  };
  return function useStore() {
    var _useReduxContext = useReduxContext(),
        store = _useReduxContext.store;

    return store;
  };
}
/**
 * A hook to access the redux store.
 *
 * @returns {any} the redux store
 *
 * @example
 *
 * import React from 'react'
 * import { useStore } from 'react-redux'
 *
 * export const ExampleComponent = () => {
 *   const store = useStore()
 *   return <div>{store.getState()}</div>
 * }
 */

var useStore_useStore = createStoreHook();
// CONCATENATED MODULE: ./node_modules/react-redux/es/hooks/useDispatch.js


/**
 * Hook factory, which creates a `useDispatch` hook bound to a given context.
 *
 * @param {Function} [context=ReactReduxContext] Context passed to your `<Provider>`.
 * @returns {Function} A `useDispatch` hook bound to the specified context.
 */

function createDispatchHook(context) {
  if (context === void 0) {
    context = ReactReduxContext;
  }

  var useStore = context === ReactReduxContext ? useStore_useStore : createStoreHook(context);
  return function useDispatch() {
    var store = useStore();
    return store.dispatch;
  };
}
/**
 * A hook to access the redux `dispatch` function.
 *
 * @returns {any|function} redux store's `dispatch` function
 *
 * @example
 *
 * import React, { useCallback } from 'react'
 * import { useDispatch } from 'react-redux'
 *
 * export const CounterComponent = ({ value }) => {
 *   const dispatch = useDispatch()
 *   const increaseCounter = useCallback(() => dispatch({ type: 'increase-counter' }), [])
 *   return (
 *     <div>
 *       <span>{value}</span>
 *       <button onClick={increaseCounter}>Increase counter</button>
 *     </div>
 *   )
 * }
 */

var useDispatch = createDispatchHook();
// CONCATENATED MODULE: ./node_modules/react-redux/es/hooks/useSelector.js




 // React currently throws a warning when using useLayoutEffect on the server.
// To get around it, we can conditionally useEffect on the server (no-op) and
// useLayoutEffect in the browser. We need useLayoutEffect to ensure the store
// subscription callback always has the selector from the latest render commit
// available, otherwise a store update may happen between render and the effect,
// which may cause missed updates; we also must ensure the store subscription
// is created synchronously, otherwise a store update may occur before the
// subscription is created and an inconsistent state may be observed

var useSelector_useIsomorphicLayoutEffect = typeof window !== 'undefined' ? react["useLayoutEffect"] : react["useEffect"];

var refEquality = function refEquality(a, b) {
  return a === b;
};

function useSelectorWithStoreAndSubscription(selector, equalityFn, store, contextSub) {
  var _useReducer = Object(react["useReducer"])(function (s) {
    return s + 1;
  }, 0),
      forceRender = _useReducer[1];

  var subscription = Object(react["useMemo"])(function () {
    return new Subscription(store, contextSub);
  }, [store, contextSub]);
  var latestSubscriptionCallbackError = Object(react["useRef"])();
  var latestSelector = Object(react["useRef"])();
  var latestSelectedState = Object(react["useRef"])();
  var selectedState;

  try {
    if (selector !== latestSelector.current || latestSubscriptionCallbackError.current) {
      selectedState = selector(store.getState());
    } else {
      selectedState = latestSelectedState.current;
    }
  } catch (err) {
    var errorMessage = "An error occured while selecting the store state: " + err.message + ".";

    if (latestSubscriptionCallbackError.current) {
      errorMessage += "\nThe error may be correlated with this previous error:\n" + latestSubscriptionCallbackError.current.stack + "\n\nOriginal stack trace:";
    }

    throw new Error(errorMessage);
  }

  useSelector_useIsomorphicLayoutEffect(function () {
    latestSelector.current = selector;
    latestSelectedState.current = selectedState;
    latestSubscriptionCallbackError.current = undefined;
  });
  useSelector_useIsomorphicLayoutEffect(function () {
    function checkForUpdates() {
      try {
        var newSelectedState = latestSelector.current(store.getState());

        if (equalityFn(newSelectedState, latestSelectedState.current)) {
          return;
        }

        latestSelectedState.current = newSelectedState;
      } catch (err) {
        // we ignore all errors here, since when the component
        // is re-rendered, the selectors are called again, and
        // will throw again, if neither props nor store state
        // changed
        latestSubscriptionCallbackError.current = err;
      }

      forceRender({});
    }

    subscription.onStateChange = checkForUpdates;
    subscription.trySubscribe();
    checkForUpdates();
    return function () {
      return subscription.tryUnsubscribe();
    };
  }, [store, subscription]);
  return selectedState;
}
/**
 * Hook factory, which creates a `useSelector` hook bound to a given context.
 *
 * @param {Function} [context=ReactReduxContext] Context passed to your `<Provider>`.
 * @returns {Function} A `useSelector` hook bound to the specified context.
 */


function createSelectorHook(context) {
  if (context === void 0) {
    context = ReactReduxContext;
  }

  var useReduxContext = context === ReactReduxContext ? useReduxContext_useReduxContext : function () {
    return Object(react["useContext"])(context);
  };
  return function useSelector(selector, equalityFn) {
    if (equalityFn === void 0) {
      equalityFn = refEquality;
    }

    browser_default()(selector, "You must pass a selector to useSelectors");

    var _useReduxContext = useReduxContext(),
        store = _useReduxContext.store,
        contextSub = _useReduxContext.subscription;

    return useSelectorWithStoreAndSubscription(selector, equalityFn, store, contextSub);
  };
}
/**
 * A hook to access the redux store's state. This hook takes a selector function
 * as an argument. The selector is called with the store state.
 *
 * This hook takes an optional equality comparison function as the second parameter
 * that allows you to customize the way the selected state is compared to determine
 * whether the component needs to be re-rendered.
 *
 * @param {Function} selector the selector function
 * @param {Function=} equalityFn the function that will be used to determine equality
 *
 * @returns {any} the selected state
 *
 * @example
 *
 * import React from 'react'
 * import { useSelector } from 'react-redux'
 *
 * export const CounterComponent = () => {
 *   const counter = useSelector(state => state.counter)
 *   return <div>{counter}</div>
 * }
 */

var useSelector_useSelector = createSelectorHook();
// CONCATENATED MODULE: ./node_modules/react-redux/es/utils/reactBatchedUpdates.js
/* eslint-disable import/no-unresolved */

// CONCATENATED MODULE: ./node_modules/react-redux/es/index.js










setBatch(react_dom["unstable_batchedUpdates"]);

// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js
function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;
  subClass.__proto__ = superClass;
}
// CONCATENATED MODULE: ./node_modules/resolve-pathname/esm/resolve-pathname.js
function isAbsolute(pathname) {
  return pathname.charAt(0) === '/';
}

// About 1.5x faster than the two-arg version of Array#splice()
function spliceOne(list, index) {
  for (var i = index, k = i + 1, n = list.length; k < n; i += 1, k += 1) {
    list[i] = list[k];
  }

  list.pop();
}

// This implementation is based heavily on node's url.parse
function resolvePathname(to, from) {
  if (from === undefined) from = '';

  var toParts = (to && to.split('/')) || [];
  var fromParts = (from && from.split('/')) || [];

  var isToAbs = to && isAbsolute(to);
  var isFromAbs = from && isAbsolute(from);
  var mustEndAbs = isToAbs || isFromAbs;

  if (to && isAbsolute(to)) {
    // to is absolute
    fromParts = toParts;
  } else if (toParts.length) {
    // to is relative, drop the filename
    fromParts.pop();
    fromParts = fromParts.concat(toParts);
  }

  if (!fromParts.length) return '/';

  var hasTrailingSlash;
  if (fromParts.length) {
    var last = fromParts[fromParts.length - 1];
    hasTrailingSlash = last === '.' || last === '..' || last === '';
  } else {
    hasTrailingSlash = false;
  }

  var up = 0;
  for (var i = fromParts.length; i >= 0; i--) {
    var part = fromParts[i];

    if (part === '.') {
      spliceOne(fromParts, i);
    } else if (part === '..') {
      spliceOne(fromParts, i);
      up++;
    } else if (up) {
      spliceOne(fromParts, i);
      up--;
    }
  }

  if (!mustEndAbs) for (; up--; up) fromParts.unshift('..');

  if (
    mustEndAbs &&
    fromParts[0] !== '' &&
    (!fromParts[0] || !isAbsolute(fromParts[0]))
  )
    fromParts.unshift('');

  var result = fromParts.join('/');

  if (hasTrailingSlash && result.substr(-1) !== '/') result += '/';

  return result;
}

/* harmony default export */ var resolve_pathname = (resolvePathname);

// CONCATENATED MODULE: ./node_modules/value-equal/esm/value-equal.js
function value_equal_valueOf(obj) {
  return obj.valueOf ? obj.valueOf() : Object.prototype.valueOf.call(obj);
}

function valueEqual(a, b) {
  // Test for strict equality first.
  if (a === b) return true;

  // Otherwise, if either of them == null they are not equal.
  if (a == null || b == null) return false;

  if (Array.isArray(a)) {
    return (
      Array.isArray(b) &&
      a.length === b.length &&
      a.every(function(item, index) {
        return valueEqual(item, b[index]);
      })
    );
  }

  if (typeof a === 'object' || typeof b === 'object') {
    var aValue = value_equal_valueOf(a);
    var bValue = value_equal_valueOf(b);

    if (aValue !== a || bValue !== b) return valueEqual(aValue, bValue);

    return Object.keys(Object.assign({}, a, b)).every(function(key) {
      return valueEqual(a[key], b[key]);
    });
  }

  return false;
}

/* harmony default export */ var value_equal = (valueEqual);

// CONCATENATED MODULE: ./node_modules/tiny-invariant/dist/tiny-invariant.esm.js
var isProduction = "production" === 'production';
var prefix = 'Invariant failed';
function invariant(condition, message) {
  if (condition) {
    return;
  }

  if (isProduction) {
    throw new Error(prefix);
  } else {
    throw new Error(prefix + ": " + (message || ''));
  }
}

/* harmony default export */ var tiny_invariant_esm = (invariant);

// CONCATENATED MODULE: ./node_modules/history/esm/history.js






function addLeadingSlash(path) {
  return path.charAt(0) === '/' ? path : '/' + path;
}
function stripLeadingSlash(path) {
  return path.charAt(0) === '/' ? path.substr(1) : path;
}
function hasBasename(path, prefix) {
  return path.toLowerCase().indexOf(prefix.toLowerCase()) === 0 && '/?#'.indexOf(path.charAt(prefix.length)) !== -1;
}
function stripBasename(path, prefix) {
  return hasBasename(path, prefix) ? path.substr(prefix.length) : path;
}
function stripTrailingSlash(path) {
  return path.charAt(path.length - 1) === '/' ? path.slice(0, -1) : path;
}
function parsePath(path) {
  var pathname = path || '/';
  var search = '';
  var hash = '';
  var hashIndex = pathname.indexOf('#');

  if (hashIndex !== -1) {
    hash = pathname.substr(hashIndex);
    pathname = pathname.substr(0, hashIndex);
  }

  var searchIndex = pathname.indexOf('?');

  if (searchIndex !== -1) {
    search = pathname.substr(searchIndex);
    pathname = pathname.substr(0, searchIndex);
  }

  return {
    pathname: pathname,
    search: search === '?' ? '' : search,
    hash: hash === '#' ? '' : hash
  };
}
function createPath(location) {
  var pathname = location.pathname,
      search = location.search,
      hash = location.hash;
  var path = pathname || '/';
  if (search && search !== '?') path += search.charAt(0) === '?' ? search : "?" + search;
  if (hash && hash !== '#') path += hash.charAt(0) === '#' ? hash : "#" + hash;
  return path;
}

function createLocation(path, state, key, currentLocation) {
  var location;

  if (typeof path === 'string') {
    // Two-arg form: push(path, state)
    location = parsePath(path);
    location.state = state;
  } else {
    // One-arg form: push(location)
    location = _extends({}, path);
    if (location.pathname === undefined) location.pathname = '';

    if (location.search) {
      if (location.search.charAt(0) !== '?') location.search = '?' + location.search;
    } else {
      location.search = '';
    }

    if (location.hash) {
      if (location.hash.charAt(0) !== '#') location.hash = '#' + location.hash;
    } else {
      location.hash = '';
    }

    if (state !== undefined && location.state === undefined) location.state = state;
  }

  try {
    location.pathname = decodeURI(location.pathname);
  } catch (e) {
    if (e instanceof URIError) {
      throw new URIError('Pathname "' + location.pathname + '" could not be decoded. ' + 'This is likely caused by an invalid percent-encoding.');
    } else {
      throw e;
    }
  }

  if (key) location.key = key;

  if (currentLocation) {
    // Resolve incomplete/relative pathname relative to current location.
    if (!location.pathname) {
      location.pathname = currentLocation.pathname;
    } else if (location.pathname.charAt(0) !== '/') {
      location.pathname = resolve_pathname(location.pathname, currentLocation.pathname);
    }
  } else {
    // When there is no prior location and pathname is empty, set it to /
    if (!location.pathname) {
      location.pathname = '/';
    }
  }

  return location;
}
function locationsAreEqual(a, b) {
  return a.pathname === b.pathname && a.search === b.search && a.hash === b.hash && a.key === b.key && value_equal(a.state, b.state);
}

function createTransitionManager() {
  var prompt = null;

  function setPrompt(nextPrompt) {
     false ? undefined : void 0;
    prompt = nextPrompt;
    return function () {
      if (prompt === nextPrompt) prompt = null;
    };
  }

  function confirmTransitionTo(location, action, getUserConfirmation, callback) {
    // TODO: If another transition starts while we're still confirming
    // the previous one, we may end up in a weird state. Figure out the
    // best way to handle this.
    if (prompt != null) {
      var result = typeof prompt === 'function' ? prompt(location, action) : prompt;

      if (typeof result === 'string') {
        if (typeof getUserConfirmation === 'function') {
          getUserConfirmation(result, callback);
        } else {
           false ? undefined : void 0;
          callback(true);
        }
      } else {
        // Return false from a transition hook to cancel the transition.
        callback(result !== false);
      }
    } else {
      callback(true);
    }
  }

  var listeners = [];

  function appendListener(fn) {
    var isActive = true;

    function listener() {
      if (isActive) fn.apply(void 0, arguments);
    }

    listeners.push(listener);
    return function () {
      isActive = false;
      listeners = listeners.filter(function (item) {
        return item !== listener;
      });
    };
  }

  function notifyListeners() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    listeners.forEach(function (listener) {
      return listener.apply(void 0, args);
    });
  }

  return {
    setPrompt: setPrompt,
    confirmTransitionTo: confirmTransitionTo,
    appendListener: appendListener,
    notifyListeners: notifyListeners
  };
}

var canUseDOM = !!(typeof window !== 'undefined' && window.document && window.document.createElement);
function getConfirmation(message, callback) {
  callback(window.confirm(message)); // eslint-disable-line no-alert
}
/**
 * Returns true if the HTML5 history API is supported. Taken from Modernizr.
 *
 * https://github.com/Modernizr/Modernizr/blob/master/LICENSE
 * https://github.com/Modernizr/Modernizr/blob/master/feature-detects/history.js
 * changed to avoid false negatives for Windows Phones: https://github.com/reactjs/react-router/issues/586
 */

function supportsHistory() {
  var ua = window.navigator.userAgent;
  if ((ua.indexOf('Android 2.') !== -1 || ua.indexOf('Android 4.0') !== -1) && ua.indexOf('Mobile Safari') !== -1 && ua.indexOf('Chrome') === -1 && ua.indexOf('Windows Phone') === -1) return false;
  return window.history && 'pushState' in window.history;
}
/**
 * Returns true if browser fires popstate on hash change.
 * IE10 and IE11 do not.
 */

function supportsPopStateOnHashChange() {
  return window.navigator.userAgent.indexOf('Trident') === -1;
}
/**
 * Returns false if using go(n) with hash history causes a full page reload.
 */

function supportsGoWithoutReloadUsingHash() {
  return window.navigator.userAgent.indexOf('Firefox') === -1;
}
/**
 * Returns true if a given popstate event is an extraneous WebKit event.
 * Accounts for the fact that Chrome on iOS fires real popstate events
 * containing undefined state when pressing the back button.
 */

function isExtraneousPopstateEvent(event) {
  return event.state === undefined && navigator.userAgent.indexOf('CriOS') === -1;
}

var PopStateEvent = 'popstate';
var HashChangeEvent = 'hashchange';

function getHistoryState() {
  try {
    return window.history.state || {};
  } catch (e) {
    // IE 11 sometimes throws when accessing window.history.state
    // See https://github.com/ReactTraining/history/pull/289
    return {};
  }
}
/**
 * Creates a history object that uses the HTML5 history API including
 * pushState, replaceState, and the popstate event.
 */


function createBrowserHistory(props) {
  if (props === void 0) {
    props = {};
  }

  !canUseDOM ?  false ? undefined : tiny_invariant_esm(false) : void 0;
  var globalHistory = window.history;
  var canUseHistory = supportsHistory();
  var needsHashChangeListener = !supportsPopStateOnHashChange();
  var _props = props,
      _props$forceRefresh = _props.forceRefresh,
      forceRefresh = _props$forceRefresh === void 0 ? false : _props$forceRefresh,
      _props$getUserConfirm = _props.getUserConfirmation,
      getUserConfirmation = _props$getUserConfirm === void 0 ? getConfirmation : _props$getUserConfirm,
      _props$keyLength = _props.keyLength,
      keyLength = _props$keyLength === void 0 ? 6 : _props$keyLength;
  var basename = props.basename ? stripTrailingSlash(addLeadingSlash(props.basename)) : '';

  function getDOMLocation(historyState) {
    var _ref = historyState || {},
        key = _ref.key,
        state = _ref.state;

    var _window$location = window.location,
        pathname = _window$location.pathname,
        search = _window$location.search,
        hash = _window$location.hash;
    var path = pathname + search + hash;
     false ? undefined : void 0;
    if (basename) path = stripBasename(path, basename);
    return createLocation(path, state, key);
  }

  function createKey() {
    return Math.random().toString(36).substr(2, keyLength);
  }

  var transitionManager = createTransitionManager();

  function setState(nextState) {
    _extends(history, nextState);

    history.length = globalHistory.length;
    transitionManager.notifyListeners(history.location, history.action);
  }

  function handlePopState(event) {
    // Ignore extraneous popstate events in WebKit.
    if (isExtraneousPopstateEvent(event)) return;
    handlePop(getDOMLocation(event.state));
  }

  function handleHashChange() {
    handlePop(getDOMLocation(getHistoryState()));
  }

  var forceNextPop = false;

  function handlePop(location) {
    if (forceNextPop) {
      forceNextPop = false;
      setState();
    } else {
      var action = 'POP';
      transitionManager.confirmTransitionTo(location, action, getUserConfirmation, function (ok) {
        if (ok) {
          setState({
            action: action,
            location: location
          });
        } else {
          revertPop(location);
        }
      });
    }
  }

  function revertPop(fromLocation) {
    var toLocation = history.location; // TODO: We could probably make this more reliable by
    // keeping a list of keys we've seen in sessionStorage.
    // Instead, we just default to 0 for keys we don't know.

    var toIndex = allKeys.indexOf(toLocation.key);
    if (toIndex === -1) toIndex = 0;
    var fromIndex = allKeys.indexOf(fromLocation.key);
    if (fromIndex === -1) fromIndex = 0;
    var delta = toIndex - fromIndex;

    if (delta) {
      forceNextPop = true;
      go(delta);
    }
  }

  var initialLocation = getDOMLocation(getHistoryState());
  var allKeys = [initialLocation.key]; // Public interface

  function createHref(location) {
    return basename + createPath(location);
  }

  function push(path, state) {
     false ? undefined : void 0;
    var action = 'PUSH';
    var location = createLocation(path, state, createKey(), history.location);
    transitionManager.confirmTransitionTo(location, action, getUserConfirmation, function (ok) {
      if (!ok) return;
      var href = createHref(location);
      var key = location.key,
          state = location.state;

      if (canUseHistory) {
        globalHistory.pushState({
          key: key,
          state: state
        }, null, href);

        if (forceRefresh) {
          window.location.href = href;
        } else {
          var prevIndex = allKeys.indexOf(history.location.key);
          var nextKeys = allKeys.slice(0, prevIndex + 1);
          nextKeys.push(location.key);
          allKeys = nextKeys;
          setState({
            action: action,
            location: location
          });
        }
      } else {
         false ? undefined : void 0;
        window.location.href = href;
      }
    });
  }

  function replace(path, state) {
     false ? undefined : void 0;
    var action = 'REPLACE';
    var location = createLocation(path, state, createKey(), history.location);
    transitionManager.confirmTransitionTo(location, action, getUserConfirmation, function (ok) {
      if (!ok) return;
      var href = createHref(location);
      var key = location.key,
          state = location.state;

      if (canUseHistory) {
        globalHistory.replaceState({
          key: key,
          state: state
        }, null, href);

        if (forceRefresh) {
          window.location.replace(href);
        } else {
          var prevIndex = allKeys.indexOf(history.location.key);
          if (prevIndex !== -1) allKeys[prevIndex] = location.key;
          setState({
            action: action,
            location: location
          });
        }
      } else {
         false ? undefined : void 0;
        window.location.replace(href);
      }
    });
  }

  function go(n) {
    globalHistory.go(n);
  }

  function goBack() {
    go(-1);
  }

  function goForward() {
    go(1);
  }

  var listenerCount = 0;

  function checkDOMListeners(delta) {
    listenerCount += delta;

    if (listenerCount === 1 && delta === 1) {
      window.addEventListener(PopStateEvent, handlePopState);
      if (needsHashChangeListener) window.addEventListener(HashChangeEvent, handleHashChange);
    } else if (listenerCount === 0) {
      window.removeEventListener(PopStateEvent, handlePopState);
      if (needsHashChangeListener) window.removeEventListener(HashChangeEvent, handleHashChange);
    }
  }

  var isBlocked = false;

  function block(prompt) {
    if (prompt === void 0) {
      prompt = false;
    }

    var unblock = transitionManager.setPrompt(prompt);

    if (!isBlocked) {
      checkDOMListeners(1);
      isBlocked = true;
    }

    return function () {
      if (isBlocked) {
        isBlocked = false;
        checkDOMListeners(-1);
      }

      return unblock();
    };
  }

  function listen(listener) {
    var unlisten = transitionManager.appendListener(listener);
    checkDOMListeners(1);
    return function () {
      checkDOMListeners(-1);
      unlisten();
    };
  }

  var history = {
    length: globalHistory.length,
    action: 'POP',
    location: initialLocation,
    createHref: createHref,
    push: push,
    replace: replace,
    go: go,
    goBack: goBack,
    goForward: goForward,
    block: block,
    listen: listen
  };
  return history;
}

var HashChangeEvent$1 = 'hashchange';
var HashPathCoders = {
  hashbang: {
    encodePath: function encodePath(path) {
      return path.charAt(0) === '!' ? path : '!/' + stripLeadingSlash(path);
    },
    decodePath: function decodePath(path) {
      return path.charAt(0) === '!' ? path.substr(1) : path;
    }
  },
  noslash: {
    encodePath: stripLeadingSlash,
    decodePath: addLeadingSlash
  },
  slash: {
    encodePath: addLeadingSlash,
    decodePath: addLeadingSlash
  }
};

function stripHash(url) {
  var hashIndex = url.indexOf('#');
  return hashIndex === -1 ? url : url.slice(0, hashIndex);
}

function getHashPath() {
  // We can't use window.location.hash here because it's not
  // consistent across browsers - Firefox will pre-decode it!
  var href = window.location.href;
  var hashIndex = href.indexOf('#');
  return hashIndex === -1 ? '' : href.substring(hashIndex + 1);
}

function pushHashPath(path) {
  window.location.hash = path;
}

function replaceHashPath(path) {
  window.location.replace(stripHash(window.location.href) + '#' + path);
}

function createHashHistory(props) {
  if (props === void 0) {
    props = {};
  }

  !canUseDOM ?  false ? undefined : tiny_invariant_esm(false) : void 0;
  var globalHistory = window.history;
  var canGoWithoutReload = supportsGoWithoutReloadUsingHash();
  var _props = props,
      _props$getUserConfirm = _props.getUserConfirmation,
      getUserConfirmation = _props$getUserConfirm === void 0 ? getConfirmation : _props$getUserConfirm,
      _props$hashType = _props.hashType,
      hashType = _props$hashType === void 0 ? 'slash' : _props$hashType;
  var basename = props.basename ? stripTrailingSlash(addLeadingSlash(props.basename)) : '';
  var _HashPathCoders$hashT = HashPathCoders[hashType],
      encodePath = _HashPathCoders$hashT.encodePath,
      decodePath = _HashPathCoders$hashT.decodePath;

  function getDOMLocation() {
    var path = decodePath(getHashPath());
     false ? undefined : void 0;
    if (basename) path = stripBasename(path, basename);
    return createLocation(path);
  }

  var transitionManager = createTransitionManager();

  function setState(nextState) {
    _extends(history, nextState);

    history.length = globalHistory.length;
    transitionManager.notifyListeners(history.location, history.action);
  }

  var forceNextPop = false;
  var ignorePath = null;

  function locationsAreEqual$$1(a, b) {
    return a.pathname === b.pathname && a.search === b.search && a.hash === b.hash;
  }

  function handleHashChange() {
    var path = getHashPath();
    var encodedPath = encodePath(path);

    if (path !== encodedPath) {
      // Ensure we always have a properly-encoded hash.
      replaceHashPath(encodedPath);
    } else {
      var location = getDOMLocation();
      var prevLocation = history.location;
      if (!forceNextPop && locationsAreEqual$$1(prevLocation, location)) return; // A hashchange doesn't always == location change.

      if (ignorePath === createPath(location)) return; // Ignore this change; we already setState in push/replace.

      ignorePath = null;
      handlePop(location);
    }
  }

  function handlePop(location) {
    if (forceNextPop) {
      forceNextPop = false;
      setState();
    } else {
      var action = 'POP';
      transitionManager.confirmTransitionTo(location, action, getUserConfirmation, function (ok) {
        if (ok) {
          setState({
            action: action,
            location: location
          });
        } else {
          revertPop(location);
        }
      });
    }
  }

  function revertPop(fromLocation) {
    var toLocation = history.location; // TODO: We could probably make this more reliable by
    // keeping a list of paths we've seen in sessionStorage.
    // Instead, we just default to 0 for paths we don't know.

    var toIndex = allPaths.lastIndexOf(createPath(toLocation));
    if (toIndex === -1) toIndex = 0;
    var fromIndex = allPaths.lastIndexOf(createPath(fromLocation));
    if (fromIndex === -1) fromIndex = 0;
    var delta = toIndex - fromIndex;

    if (delta) {
      forceNextPop = true;
      go(delta);
    }
  } // Ensure the hash is encoded properly before doing anything else.


  var path = getHashPath();
  var encodedPath = encodePath(path);
  if (path !== encodedPath) replaceHashPath(encodedPath);
  var initialLocation = getDOMLocation();
  var allPaths = [createPath(initialLocation)]; // Public interface

  function createHref(location) {
    var baseTag = document.querySelector('base');
    var href = '';

    if (baseTag && baseTag.getAttribute('href')) {
      href = stripHash(window.location.href);
    }

    return href + '#' + encodePath(basename + createPath(location));
  }

  function push(path, state) {
     false ? undefined : void 0;
    var action = 'PUSH';
    var location = createLocation(path, undefined, undefined, history.location);
    transitionManager.confirmTransitionTo(location, action, getUserConfirmation, function (ok) {
      if (!ok) return;
      var path = createPath(location);
      var encodedPath = encodePath(basename + path);
      var hashChanged = getHashPath() !== encodedPath;

      if (hashChanged) {
        // We cannot tell if a hashchange was caused by a PUSH, so we'd
        // rather setState here and ignore the hashchange. The caveat here
        // is that other hash histories in the page will consider it a POP.
        ignorePath = path;
        pushHashPath(encodedPath);
        var prevIndex = allPaths.lastIndexOf(createPath(history.location));
        var nextPaths = allPaths.slice(0, prevIndex + 1);
        nextPaths.push(path);
        allPaths = nextPaths;
        setState({
          action: action,
          location: location
        });
      } else {
         false ? undefined : void 0;
        setState();
      }
    });
  }

  function replace(path, state) {
     false ? undefined : void 0;
    var action = 'REPLACE';
    var location = createLocation(path, undefined, undefined, history.location);
    transitionManager.confirmTransitionTo(location, action, getUserConfirmation, function (ok) {
      if (!ok) return;
      var path = createPath(location);
      var encodedPath = encodePath(basename + path);
      var hashChanged = getHashPath() !== encodedPath;

      if (hashChanged) {
        // We cannot tell if a hashchange was caused by a REPLACE, so we'd
        // rather setState here and ignore the hashchange. The caveat here
        // is that other hash histories in the page will consider it a POP.
        ignorePath = path;
        replaceHashPath(encodedPath);
      }

      var prevIndex = allPaths.indexOf(createPath(history.location));
      if (prevIndex !== -1) allPaths[prevIndex] = path;
      setState({
        action: action,
        location: location
      });
    });
  }

  function go(n) {
     false ? undefined : void 0;
    globalHistory.go(n);
  }

  function goBack() {
    go(-1);
  }

  function goForward() {
    go(1);
  }

  var listenerCount = 0;

  function checkDOMListeners(delta) {
    listenerCount += delta;

    if (listenerCount === 1 && delta === 1) {
      window.addEventListener(HashChangeEvent$1, handleHashChange);
    } else if (listenerCount === 0) {
      window.removeEventListener(HashChangeEvent$1, handleHashChange);
    }
  }

  var isBlocked = false;

  function block(prompt) {
    if (prompt === void 0) {
      prompt = false;
    }

    var unblock = transitionManager.setPrompt(prompt);

    if (!isBlocked) {
      checkDOMListeners(1);
      isBlocked = true;
    }

    return function () {
      if (isBlocked) {
        isBlocked = false;
        checkDOMListeners(-1);
      }

      return unblock();
    };
  }

  function listen(listener) {
    var unlisten = transitionManager.appendListener(listener);
    checkDOMListeners(1);
    return function () {
      checkDOMListeners(-1);
      unlisten();
    };
  }

  var history = {
    length: globalHistory.length,
    action: 'POP',
    location: initialLocation,
    createHref: createHref,
    push: push,
    replace: replace,
    go: go,
    goBack: goBack,
    goForward: goForward,
    block: block,
    listen: listen
  };
  return history;
}

function clamp(n, lowerBound, upperBound) {
  return Math.min(Math.max(n, lowerBound), upperBound);
}
/**
 * Creates a history object that stores locations in memory.
 */


function createMemoryHistory(props) {
  if (props === void 0) {
    props = {};
  }

  var _props = props,
      getUserConfirmation = _props.getUserConfirmation,
      _props$initialEntries = _props.initialEntries,
      initialEntries = _props$initialEntries === void 0 ? ['/'] : _props$initialEntries,
      _props$initialIndex = _props.initialIndex,
      initialIndex = _props$initialIndex === void 0 ? 0 : _props$initialIndex,
      _props$keyLength = _props.keyLength,
      keyLength = _props$keyLength === void 0 ? 6 : _props$keyLength;
  var transitionManager = createTransitionManager();

  function setState(nextState) {
    _extends(history, nextState);

    history.length = history.entries.length;
    transitionManager.notifyListeners(history.location, history.action);
  }

  function createKey() {
    return Math.random().toString(36).substr(2, keyLength);
  }

  var index = clamp(initialIndex, 0, initialEntries.length - 1);
  var entries = initialEntries.map(function (entry) {
    return typeof entry === 'string' ? createLocation(entry, undefined, createKey()) : createLocation(entry, undefined, entry.key || createKey());
  }); // Public interface

  var createHref = createPath;

  function push(path, state) {
     false ? undefined : void 0;
    var action = 'PUSH';
    var location = createLocation(path, state, createKey(), history.location);
    transitionManager.confirmTransitionTo(location, action, getUserConfirmation, function (ok) {
      if (!ok) return;
      var prevIndex = history.index;
      var nextIndex = prevIndex + 1;
      var nextEntries = history.entries.slice(0);

      if (nextEntries.length > nextIndex) {
        nextEntries.splice(nextIndex, nextEntries.length - nextIndex, location);
      } else {
        nextEntries.push(location);
      }

      setState({
        action: action,
        location: location,
        index: nextIndex,
        entries: nextEntries
      });
    });
  }

  function replace(path, state) {
     false ? undefined : void 0;
    var action = 'REPLACE';
    var location = createLocation(path, state, createKey(), history.location);
    transitionManager.confirmTransitionTo(location, action, getUserConfirmation, function (ok) {
      if (!ok) return;
      history.entries[history.index] = location;
      setState({
        action: action,
        location: location
      });
    });
  }

  function go(n) {
    var nextIndex = clamp(history.index + n, 0, history.entries.length - 1);
    var action = 'POP';
    var location = history.entries[nextIndex];
    transitionManager.confirmTransitionTo(location, action, getUserConfirmation, function (ok) {
      if (ok) {
        setState({
          action: action,
          location: location,
          index: nextIndex
        });
      } else {
        // Mimic the behavior of DOM histories by
        // causing a render after a cancelled POP.
        setState();
      }
    });
  }

  function goBack() {
    go(-1);
  }

  function goForward() {
    go(1);
  }

  function canGo(n) {
    var nextIndex = history.index + n;
    return nextIndex >= 0 && nextIndex < history.entries.length;
  }

  function block(prompt) {
    if (prompt === void 0) {
      prompt = false;
    }

    return transitionManager.setPrompt(prompt);
  }

  function listen(listener) {
    return transitionManager.appendListener(listener);
  }

  var history = {
    length: entries.length,
    action: 'POP',
    location: entries[index],
    index: index,
    entries: entries,
    createHref: createHref,
    push: push,
    replace: replace,
    go: go,
    goBack: goBack,
    goForward: goForward,
    canGo: canGo,
    block: block,
    listen: listen
  };
  return history;
}



// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/inheritsLoose.js
var inheritsLoose = __webpack_require__(23);
var inheritsLoose_default = /*#__PURE__*/__webpack_require__.n(inheritsLoose);

// EXTERNAL MODULE: ./node_modules/gud/index.js
var gud = __webpack_require__(32);
var gud_default = /*#__PURE__*/__webpack_require__.n(gud);

// CONCATENATED MODULE: ./node_modules/mini-create-react-context/dist/esm/index.js






var MAX_SIGNED_31_BIT_INT = 1073741823;

function objectIs(x, y) {
  if (x === y) {
    return x !== 0 || 1 / x === 1 / y;
  } else {
    return x !== x && y !== y;
  }
}

function createEventEmitter(value) {
  var handlers = [];
  return {
    on: function on(handler) {
      handlers.push(handler);
    },
    off: function off(handler) {
      handlers = handlers.filter(function (h) {
        return h !== handler;
      });
    },
    get: function get() {
      return value;
    },
    set: function set(newValue, changedBits) {
      value = newValue;
      handlers.forEach(function (handler) {
        return handler(value, changedBits);
      });
    }
  };
}

function onlyChild(children) {
  return Array.isArray(children) ? children[0] : children;
}

function createReactContext(defaultValue, calculateChangedBits) {
  var _Provider$childContex, _Consumer$contextType;

  var contextProp = '__create-react-context-' + gud_default()() + '__';

  var Provider =
  /*#__PURE__*/
  function (_Component) {
    inheritsLoose_default()(Provider, _Component);

    function Provider() {
      var _this;

      _this = _Component.apply(this, arguments) || this;
      _this.emitter = createEventEmitter(_this.props.value);
      return _this;
    }

    var _proto = Provider.prototype;

    _proto.getChildContext = function getChildContext() {
      var _ref;

      return _ref = {}, _ref[contextProp] = this.emitter, _ref;
    };

    _proto.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
      if (this.props.value !== nextProps.value) {
        var oldValue = this.props.value;
        var newValue = nextProps.value;
        var changedBits;

        if (objectIs(oldValue, newValue)) {
          changedBits = 0;
        } else {
          changedBits = typeof calculateChangedBits === 'function' ? calculateChangedBits(oldValue, newValue) : MAX_SIGNED_31_BIT_INT;

          if (false) {}

          changedBits |= 0;

          if (changedBits !== 0) {
            this.emitter.set(nextProps.value, changedBits);
          }
        }
      }
    };

    _proto.render = function render() {
      return this.props.children;
    };

    return Provider;
  }(react["Component"]);

  Provider.childContextTypes = (_Provider$childContex = {}, _Provider$childContex[contextProp] = prop_types_default.a.object.isRequired, _Provider$childContex);

  var Consumer =
  /*#__PURE__*/
  function (_Component2) {
    inheritsLoose_default()(Consumer, _Component2);

    function Consumer() {
      var _this2;

      _this2 = _Component2.apply(this, arguments) || this;
      _this2.state = {
        value: _this2.getValue()
      };

      _this2.onUpdate = function (newValue, changedBits) {
        var observedBits = _this2.observedBits | 0;

        if ((observedBits & changedBits) !== 0) {
          _this2.setState({
            value: _this2.getValue()
          });
        }
      };

      return _this2;
    }

    var _proto2 = Consumer.prototype;

    _proto2.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
      var observedBits = nextProps.observedBits;
      this.observedBits = observedBits === undefined || observedBits === null ? MAX_SIGNED_31_BIT_INT : observedBits;
    };

    _proto2.componentDidMount = function componentDidMount() {
      if (this.context[contextProp]) {
        this.context[contextProp].on(this.onUpdate);
      }

      var observedBits = this.props.observedBits;
      this.observedBits = observedBits === undefined || observedBits === null ? MAX_SIGNED_31_BIT_INT : observedBits;
    };

    _proto2.componentWillUnmount = function componentWillUnmount() {
      if (this.context[contextProp]) {
        this.context[contextProp].off(this.onUpdate);
      }
    };

    _proto2.getValue = function getValue() {
      if (this.context[contextProp]) {
        return this.context[contextProp].get();
      } else {
        return defaultValue;
      }
    };

    _proto2.render = function render() {
      return onlyChild(this.props.children)(this.state.value);
    };

    return Consumer;
  }(react["Component"]);

  Consumer.contextTypes = (_Consumer$contextType = {}, _Consumer$contextType[contextProp] = prop_types_default.a.object, _Consumer$contextType);
  return {
    Provider: Provider,
    Consumer: Consumer
  };
}

var esm_index = react_default.a.createContext || createReactContext;

/* harmony default export */ var esm = (esm_index);

// EXTERNAL MODULE: ./node_modules/react-router/node_modules/path-to-regexp/index.js
var path_to_regexp = __webpack_require__(24);
var path_to_regexp_default = /*#__PURE__*/__webpack_require__.n(path_to_regexp);

// CONCATENATED MODULE: ./node_modules/react-router/esm/react-router.js













// TODO: Replace with React.createContext once we can assume React 16+

var react_router_createNamedContext = function createNamedContext(name) {
  var context = esm();
  context.displayName = name;
  return context;
};

var react_router_context =
/*#__PURE__*/
react_router_createNamedContext("Router");

/**
 * The public API for putting history on context.
 */

var react_router_Router =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(Router, _React$Component);

  Router.computeRootMatch = function computeRootMatch(pathname) {
    return {
      path: "/",
      url: "/",
      params: {},
      isExact: pathname === "/"
    };
  };

  function Router(props) {
    var _this;

    _this = _React$Component.call(this, props) || this;
    _this.state = {
      location: props.history.location
    }; // This is a bit of a hack. We have to start listening for location
    // changes here in the constructor in case there are any <Redirect>s
    // on the initial render. If there are, they will replace/push when
    // they mount and since cDM fires in children before parents, we may
    // get a new location before the <Router> is mounted.

    _this._isMounted = false;
    _this._pendingLocation = null;

    if (!props.staticContext) {
      _this.unlisten = props.history.listen(function (location) {
        if (_this._isMounted) {
          _this.setState({
            location: location
          });
        } else {
          _this._pendingLocation = location;
        }
      });
    }

    return _this;
  }

  var _proto = Router.prototype;

  _proto.componentDidMount = function componentDidMount() {
    this._isMounted = true;

    if (this._pendingLocation) {
      this.setState({
        location: this._pendingLocation
      });
    }
  };

  _proto.componentWillUnmount = function componentWillUnmount() {
    if (this.unlisten) this.unlisten();
  };

  _proto.render = function render() {
    return react_default.a.createElement(react_router_context.Provider, {
      children: this.props.children || null,
      value: {
        history: this.props.history,
        location: this.state.location,
        match: Router.computeRootMatch(this.state.location.pathname),
        staticContext: this.props.staticContext
      }
    });
  };

  return Router;
}(react_default.a.Component);

if (false) {}

/**
 * The public API for a <Router> that stores location in memory.
 */

var react_router_MemoryRouter =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(MemoryRouter, _React$Component);

  function MemoryRouter() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;
    _this.history = createMemoryHistory(_this.props);
    return _this;
  }

  var _proto = MemoryRouter.prototype;

  _proto.render = function render() {
    return react_default.a.createElement(react_router_Router, {
      history: this.history,
      children: this.props.children
    });
  };

  return MemoryRouter;
}(react_default.a.Component);

if (false) {}

var react_router_Lifecycle =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(Lifecycle, _React$Component);

  function Lifecycle() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = Lifecycle.prototype;

  _proto.componentDidMount = function componentDidMount() {
    if (this.props.onMount) this.props.onMount.call(this, this);
  };

  _proto.componentDidUpdate = function componentDidUpdate(prevProps) {
    if (this.props.onUpdate) this.props.onUpdate.call(this, this, prevProps);
  };

  _proto.componentWillUnmount = function componentWillUnmount() {
    if (this.props.onUnmount) this.props.onUnmount.call(this, this);
  };

  _proto.render = function render() {
    return null;
  };

  return Lifecycle;
}(react_default.a.Component);

/**
 * The public API for prompting the user before navigating away from a screen.
 */

function Prompt(_ref) {
  var message = _ref.message,
      _ref$when = _ref.when,
      when = _ref$when === void 0 ? true : _ref$when;
  return react_default.a.createElement(react_router_context.Consumer, null, function (context) {
    !context ?  false ? undefined : tiny_invariant_esm(false) : void 0;
    if (!when || context.staticContext) return null;
    var method = context.history.block;
    return react_default.a.createElement(react_router_Lifecycle, {
      onMount: function onMount(self) {
        self.release = method(message);
      },
      onUpdate: function onUpdate(self, prevProps) {
        if (prevProps.message !== message) {
          self.release();
          self.release = method(message);
        }
      },
      onUnmount: function onUnmount(self) {
        self.release();
      },
      message: message
    });
  });
}

if (false) { var messageType; }

var cache = {};
var cacheLimit = 10000;
var cacheCount = 0;

function compilePath(path) {
  if (cache[path]) return cache[path];
  var generator = path_to_regexp_default.a.compile(path);

  if (cacheCount < cacheLimit) {
    cache[path] = generator;
    cacheCount++;
  }

  return generator;
}
/**
 * Public API for generating a URL pathname from a path and parameters.
 */


function generatePath(path, params) {
  if (path === void 0) {
    path = "/";
  }

  if (params === void 0) {
    params = {};
  }

  return path === "/" ? path : compilePath(path)(params, {
    pretty: true
  });
}

/**
 * The public API for navigating programmatically with a component.
 */

function Redirect(_ref) {
  var computedMatch = _ref.computedMatch,
      to = _ref.to,
      _ref$push = _ref.push,
      push = _ref$push === void 0 ? false : _ref$push;
  return react_default.a.createElement(react_router_context.Consumer, null, function (context) {
    !context ?  false ? undefined : tiny_invariant_esm(false) : void 0;
    var history = context.history,
        staticContext = context.staticContext;
    var method = push ? history.push : history.replace;
    var location = createLocation(computedMatch ? typeof to === "string" ? generatePath(to, computedMatch.params) : _extends({}, to, {
      pathname: generatePath(to.pathname, computedMatch.params)
    }) : to); // When rendering in a static context,
    // set the new location immediately.

    if (staticContext) {
      method(location);
      return null;
    }

    return react_default.a.createElement(react_router_Lifecycle, {
      onMount: function onMount() {
        method(location);
      },
      onUpdate: function onUpdate(self, prevProps) {
        var prevLocation = createLocation(prevProps.to);

        if (!locationsAreEqual(prevLocation, _extends({}, location, {
          key: prevLocation.key
        }))) {
          method(location);
        }
      },
      to: to
    });
  });
}

if (false) {}

var cache$1 = {};
var cacheLimit$1 = 10000;
var cacheCount$1 = 0;

function compilePath$1(path, options) {
  var cacheKey = "" + options.end + options.strict + options.sensitive;
  var pathCache = cache$1[cacheKey] || (cache$1[cacheKey] = {});
  if (pathCache[path]) return pathCache[path];
  var keys = [];
  var regexp = path_to_regexp_default()(path, keys, options);
  var result = {
    regexp: regexp,
    keys: keys
  };

  if (cacheCount$1 < cacheLimit$1) {
    pathCache[path] = result;
    cacheCount$1++;
  }

  return result;
}
/**
 * Public API for matching a URL pathname to a path.
 */


function matchPath(pathname, options) {
  if (options === void 0) {
    options = {};
  }

  if (typeof options === "string" || Array.isArray(options)) {
    options = {
      path: options
    };
  }

  var _options = options,
      path = _options.path,
      _options$exact = _options.exact,
      exact = _options$exact === void 0 ? false : _options$exact,
      _options$strict = _options.strict,
      strict = _options$strict === void 0 ? false : _options$strict,
      _options$sensitive = _options.sensitive,
      sensitive = _options$sensitive === void 0 ? false : _options$sensitive;
  var paths = [].concat(path);
  return paths.reduce(function (matched, path) {
    if (!path && path !== "") return null;
    if (matched) return matched;

    var _compilePath = compilePath$1(path, {
      end: exact,
      strict: strict,
      sensitive: sensitive
    }),
        regexp = _compilePath.regexp,
        keys = _compilePath.keys;

    var match = regexp.exec(pathname);
    if (!match) return null;
    var url = match[0],
        values = match.slice(1);
    var isExact = pathname === url;
    if (exact && !isExact) return null;
    return {
      path: path,
      // the path used to match
      url: path === "/" && url === "" ? "/" : url,
      // the matched portion of the URL
      isExact: isExact,
      // whether or not we matched exactly
      params: keys.reduce(function (memo, key, index) {
        memo[key.name] = values[index];
        return memo;
      }, {})
    };
  }, null);
}

function isEmptyChildren(children) {
  return react_default.a.Children.count(children) === 0;
}

function evalChildrenDev(children, props, path) {
  var value = children(props);
   false ? undefined : void 0;
  return value || null;
}
/**
 * The public API for matching a single path and rendering.
 */


var react_router_Route =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(Route, _React$Component);

  function Route() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = Route.prototype;

  _proto.render = function render() {
    var _this = this;

    return react_default.a.createElement(react_router_context.Consumer, null, function (context$1) {
      !context$1 ?  false ? undefined : tiny_invariant_esm(false) : void 0;
      var location = _this.props.location || context$1.location;
      var match = _this.props.computedMatch ? _this.props.computedMatch // <Switch> already computed the match for us
      : _this.props.path ? matchPath(location.pathname, _this.props) : context$1.match;

      var props = _extends({}, context$1, {
        location: location,
        match: match
      });

      var _this$props = _this.props,
          children = _this$props.children,
          component = _this$props.component,
          render = _this$props.render; // Preact uses an empty array as children by
      // default, so use null if that's the case.

      if (Array.isArray(children) && children.length === 0) {
        children = null;
      }

      return react_default.a.createElement(react_router_context.Provider, {
        value: props
      }, props.match ? children ? typeof children === "function" ?  false ? undefined : children(props) : children : component ? react_default.a.createElement(component, props) : render ? render(props) : null : typeof children === "function" ?  false ? undefined : children(props) : null);
    });
  };

  return Route;
}(react_default.a.Component);

if (false) {}

function react_router_addLeadingSlash(path) {
  return path.charAt(0) === "/" ? path : "/" + path;
}

function addBasename(basename, location) {
  if (!basename) return location;
  return _extends({}, location, {
    pathname: react_router_addLeadingSlash(basename) + location.pathname
  });
}

function react_router_stripBasename(basename, location) {
  if (!basename) return location;
  var base = react_router_addLeadingSlash(basename);
  if (location.pathname.indexOf(base) !== 0) return location;
  return _extends({}, location, {
    pathname: location.pathname.substr(base.length)
  });
}

function createURL(location) {
  return typeof location === "string" ? location : createPath(location);
}

function staticHandler(methodName) {
  return function () {
      false ? undefined : tiny_invariant_esm(false) ;
  };
}

function noop() {}
/**
 * The public top-level API for a "static" <Router>, so-called because it
 * can't actually change the current location. Instead, it just records
 * location changes in a context object. Useful mainly in testing and
 * server-rendering scenarios.
 */


var react_router_StaticRouter =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(StaticRouter, _React$Component);

  function StaticRouter() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;

    _this.handlePush = function (location) {
      return _this.navigateTo(location, "PUSH");
    };

    _this.handleReplace = function (location) {
      return _this.navigateTo(location, "REPLACE");
    };

    _this.handleListen = function () {
      return noop;
    };

    _this.handleBlock = function () {
      return noop;
    };

    return _this;
  }

  var _proto = StaticRouter.prototype;

  _proto.navigateTo = function navigateTo(location, action) {
    var _this$props = this.props,
        _this$props$basename = _this$props.basename,
        basename = _this$props$basename === void 0 ? "" : _this$props$basename,
        _this$props$context = _this$props.context,
        context = _this$props$context === void 0 ? {} : _this$props$context;
    context.action = action;
    context.location = addBasename(basename, createLocation(location));
    context.url = createURL(context.location);
  };

  _proto.render = function render() {
    var _this$props2 = this.props,
        _this$props2$basename = _this$props2.basename,
        basename = _this$props2$basename === void 0 ? "" : _this$props2$basename,
        _this$props2$context = _this$props2.context,
        context = _this$props2$context === void 0 ? {} : _this$props2$context,
        _this$props2$location = _this$props2.location,
        location = _this$props2$location === void 0 ? "/" : _this$props2$location,
        rest = _objectWithoutPropertiesLoose(_this$props2, ["basename", "context", "location"]);

    var history = {
      createHref: function createHref(path) {
        return react_router_addLeadingSlash(basename + createURL(path));
      },
      action: "POP",
      location: react_router_stripBasename(basename, createLocation(location)),
      push: this.handlePush,
      replace: this.handleReplace,
      go: staticHandler("go"),
      goBack: staticHandler("goBack"),
      goForward: staticHandler("goForward"),
      listen: this.handleListen,
      block: this.handleBlock
    };
    return react_default.a.createElement(react_router_Router, _extends({}, rest, {
      history: history,
      staticContext: context
    }));
  };

  return StaticRouter;
}(react_default.a.Component);

if (false) {}

/**
 * The public API for rendering the first <Route> that matches.
 */

var react_router_Switch =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(Switch, _React$Component);

  function Switch() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = Switch.prototype;

  _proto.render = function render() {
    var _this = this;

    return react_default.a.createElement(react_router_context.Consumer, null, function (context) {
      !context ?  false ? undefined : tiny_invariant_esm(false) : void 0;
      var location = _this.props.location || context.location;
      var element, match; // We use React.Children.forEach instead of React.Children.toArray().find()
      // here because toArray adds keys to all child elements and we do not want
      // to trigger an unmount/remount for two <Route>s that render the same
      // component at different URLs.

      react_default.a.Children.forEach(_this.props.children, function (child) {
        if (match == null && react_default.a.isValidElement(child)) {
          element = child;
          var path = child.props.path || child.props.from;
          match = path ? matchPath(location.pathname, _extends({}, child.props, {
            path: path
          })) : context.match;
        }
      });
      return match ? react_default.a.cloneElement(element, {
        location: location,
        computedMatch: match
      }) : null;
    });
  };

  return Switch;
}(react_default.a.Component);

if (false) {}

/**
 * A public higher-order component to access the imperative API
 */

function withRouter(Component) {
  var displayName = "withRouter(" + (Component.displayName || Component.name) + ")";

  var C = function C(props) {
    var wrappedComponentRef = props.wrappedComponentRef,
        remainingProps = _objectWithoutPropertiesLoose(props, ["wrappedComponentRef"]);

    return react_default.a.createElement(react_router_context.Consumer, null, function (context) {
      !context ?  false ? undefined : tiny_invariant_esm(false) : void 0;
      return react_default.a.createElement(Component, _extends({}, remainingProps, context, {
        ref: wrappedComponentRef
      }));
    });
  };

  C.displayName = displayName;
  C.WrappedComponent = Component;

  if (false) {}

  return hoist_non_react_statics_cjs_default()(C, Component);
}

var useContext = react_default.a.useContext;
function useHistory() {
  if (false) {}

  return useContext(react_router_context).history;
}
function useLocation() {
  if (false) {}

  return useContext(react_router_context).location;
}
function useParams() {
  if (false) {}

  var match = useContext(react_router_context).match;
  return match ? match.params : {};
}
function useRouteMatch(path) {
  if (false) {}

  return path ? matchPath(useLocation().pathname, path) : useContext(react_router_context).match;
}

if (false) { var secondaryBuildName, initialBuildName, buildNames, react_router_key, global; }


//# sourceMappingURL=react-router.js.map

// CONCATENATED MODULE: ./node_modules/react-router-dom/esm/react-router-dom.js











/**
 * The public API for a <Router> that uses HTML5 history.
 */

var react_router_dom_BrowserRouter =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(BrowserRouter, _React$Component);

  function BrowserRouter() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;
    _this.history = createBrowserHistory(_this.props);
    return _this;
  }

  var _proto = BrowserRouter.prototype;

  _proto.render = function render() {
    return react_default.a.createElement(react_router_Router, {
      history: this.history,
      children: this.props.children
    });
  };

  return BrowserRouter;
}(react_default.a.Component);

if (false) {}

/**
 * The public API for a <Router> that uses window.location.hash.
 */

var react_router_dom_HashRouter =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(HashRouter, _React$Component);

  function HashRouter() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;
    _this.history = createHashHistory(_this.props);
    return _this;
  }

  var _proto = HashRouter.prototype;

  _proto.render = function render() {
    return react_default.a.createElement(react_router_Router, {
      history: this.history,
      children: this.props.children
    });
  };

  return HashRouter;
}(react_default.a.Component);

if (false) {}

var resolveToLocation = function resolveToLocation(to, currentLocation) {
  return typeof to === "function" ? to(currentLocation) : to;
};
var react_router_dom_normalizeToLocation = function normalizeToLocation(to, currentLocation) {
  return typeof to === "string" ? createLocation(to, null, null, currentLocation) : to;
};

var forwardRefShim = function forwardRefShim(C) {
  return C;
};

var react_router_dom_forwardRef = react_default.a.forwardRef;

if (typeof react_router_dom_forwardRef === "undefined") {
  react_router_dom_forwardRef = forwardRefShim;
}

function isModifiedEvent(event) {
  return !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);
}

var LinkAnchor = react_router_dom_forwardRef(function (_ref, forwardedRef) {
  var innerRef = _ref.innerRef,
      navigate = _ref.navigate,
      _onClick = _ref.onClick,
      rest = _objectWithoutPropertiesLoose(_ref, ["innerRef", "navigate", "onClick"]);

  var target = rest.target;

  var props = _extends({}, rest, {
    onClick: function onClick(event) {
      try {
        if (_onClick) _onClick(event);
      } catch (ex) {
        event.preventDefault();
        throw ex;
      }

      if (!event.defaultPrevented && // onClick prevented default
      event.button === 0 && ( // ignore everything but left clicks
      !target || target === "_self") && // let browser handle "target=_blank" etc.
      !isModifiedEvent(event) // ignore clicks with modifier keys
      ) {
          event.preventDefault();
          navigate();
        }
    }
  }); // React 15 compat


  if (forwardRefShim !== react_router_dom_forwardRef) {
    props.ref = forwardedRef || innerRef;
  } else {
    props.ref = innerRef;
  }

  return react_default.a.createElement("a", props);
});

if (false) {}
/**
 * The public API for rendering a history-aware <a>.
 */


var Link = react_router_dom_forwardRef(function (_ref2, forwardedRef) {
  var _ref2$component = _ref2.component,
      component = _ref2$component === void 0 ? LinkAnchor : _ref2$component,
      replace = _ref2.replace,
      to = _ref2.to,
      innerRef = _ref2.innerRef,
      rest = _objectWithoutPropertiesLoose(_ref2, ["component", "replace", "to", "innerRef"]);

  return react_default.a.createElement(react_router_context.Consumer, null, function (context) {
    !context ?  false ? undefined : tiny_invariant_esm(false) : void 0;
    var history = context.history;
    var location = react_router_dom_normalizeToLocation(resolveToLocation(to, context.location), context.location);
    var href = location ? history.createHref(location) : "";

    var props = _extends({}, rest, {
      href: href,
      navigate: function navigate() {
        var location = resolveToLocation(to, context.location);
        var method = replace ? history.replace : history.push;
        method(location);
      }
    }); // React 15 compat


    if (forwardRefShim !== react_router_dom_forwardRef) {
      props.ref = forwardedRef || innerRef;
    } else {
      props.innerRef = innerRef;
    }

    return react_default.a.createElement(component, props);
  });
});

if (false) { var refType, toType; }

var forwardRefShim$1 = function forwardRefShim(C) {
  return C;
};

var forwardRef$1 = react_default.a.forwardRef;

if (typeof forwardRef$1 === "undefined") {
  forwardRef$1 = forwardRefShim$1;
}

function joinClassnames() {
  for (var _len = arguments.length, classnames = new Array(_len), _key = 0; _key < _len; _key++) {
    classnames[_key] = arguments[_key];
  }

  return classnames.filter(function (i) {
    return i;
  }).join(" ");
}
/**
 * A <Link> wrapper that knows if it's "active" or not.
 */


var NavLink = forwardRef$1(function (_ref, forwardedRef) {
  var _ref$ariaCurrent = _ref["aria-current"],
      ariaCurrent = _ref$ariaCurrent === void 0 ? "page" : _ref$ariaCurrent,
      _ref$activeClassName = _ref.activeClassName,
      activeClassName = _ref$activeClassName === void 0 ? "active" : _ref$activeClassName,
      activeStyle = _ref.activeStyle,
      classNameProp = _ref.className,
      exact = _ref.exact,
      isActiveProp = _ref.isActive,
      locationProp = _ref.location,
      strict = _ref.strict,
      styleProp = _ref.style,
      to = _ref.to,
      innerRef = _ref.innerRef,
      rest = _objectWithoutPropertiesLoose(_ref, ["aria-current", "activeClassName", "activeStyle", "className", "exact", "isActive", "location", "strict", "style", "to", "innerRef"]);

  return react_default.a.createElement(react_router_context.Consumer, null, function (context) {
    !context ?  false ? undefined : tiny_invariant_esm(false) : void 0;
    var currentLocation = locationProp || context.location;
    var toLocation = react_router_dom_normalizeToLocation(resolveToLocation(to, currentLocation), currentLocation);
    var path = toLocation.pathname; // Regex taken from: https://github.com/pillarjs/path-to-regexp/blob/master/index.js#L202

    var escapedPath = path && path.replace(/([.+*?=^!:${}()[\]|/\\])/g, "\\$1");
    var match = escapedPath ? matchPath(currentLocation.pathname, {
      path: escapedPath,
      exact: exact,
      strict: strict
    }) : null;
    var isActive = !!(isActiveProp ? isActiveProp(match, currentLocation) : match);
    var className = isActive ? joinClassnames(classNameProp, activeClassName) : classNameProp;
    var style = isActive ? _extends({}, styleProp, {}, activeStyle) : styleProp;

    var props = _extends({
      "aria-current": isActive && ariaCurrent || null,
      className: className,
      style: style,
      to: toLocation
    }, rest); // React 15 compat


    if (forwardRefShim$1 !== forwardRef$1) {
      props.ref = forwardedRef || innerRef;
    } else {
      props.innerRef = innerRef;
    }

    return react_default.a.createElement(Link, props);
  });
});

if (false) { var ariaCurrentType; }


//# sourceMappingURL=react-router-dom.js.map

// CONCATENATED MODULE: ./src/js/constants/action-types.js
// src/js/constants/action-types.js
var ADD_ARTICLE = 'ADD_ARTICLE';
var ADD_USER_PROFILE = 'ADD_USER_PROFILE';
var DATA_LOADED = 'DATA_LOADED';
// CONCATENATED MODULE: ./src/js/reducers/index.js
// src/js/reducers/index.js

var initialState = {
  articles: [],
  remoteArticles: []
};

function rootReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case ADD_ARTICLE:
      return Object.assign({}, state, {
        articles: state.articles.concat(action.payload)
      });

    case DATA_LOADED:
      return Object.assign({}, state, {
        remoteArticles: state.remoteArticles.concat(action.payload)
      });

    default:
      return state;
  }
}

/* harmony default export */ var reducers = (rootReducer);
// CONCATENATED MODULE: ./src/js/middleware/index.js

var forbiddenWords = ['spam', 'money']; // Example of middleware

function forbiddenWordsMiddleware(_ref) {
  var dispatch = _ref.dispatch;
  return function (next) {
    return function (action) {
      if (action.type === ADD_ARTICLE) {
        var foundWord = forbiddenWords.filter(function (word) {
          return action.payload.title.includes(word);
        });

        if (foundWord.length) {
          return dispatch({
            type: 'FOUND_BAD_WORD'
          });
        }
      } // should always return next(action) in your middlewares.


      return next(action);
    };
  };
}
// CONCATENATED MODULE: ./node_modules/redux-thunk/es/index.js
function createThunkMiddleware(extraArgument) {
  return function (_ref) {
    var dispatch = _ref.dispatch,
        getState = _ref.getState;
    return function (next) {
      return function (action) {
        if (typeof action === 'function') {
          return action(dispatch, getState, extraArgument);
        }

        return next(action);
      };
    };
  };
}

var thunk = createThunkMiddleware();
thunk.withExtraArgument = createThunkMiddleware;

/* harmony default export */ var redux_thunk_es = (thunk);
// CONCATENATED MODULE: ./src/js/store/index.js
// src/js/store/index.js



 // For Redux dev tool

var storeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
var store_store = createStore(reducers, storeEnhancers(applyMiddleware(forbiddenWordsMiddleware, redux_thunk_es)));
/* harmony default export */ var js_store = (store_store);
// EXTERNAL MODULE: ./node_modules/styled-components/dist/styled-components.browser.esm.js
var styled_components_browser_esm = __webpack_require__(3);

// EXTERNAL MODULE: ./node_modules/react95/dist/index.js
var dist = __webpack_require__(1);

// EXTERNAL MODULE: ./src/css/HeadBar.css
var HeadBar = __webpack_require__(45);

// EXTERNAL MODULE: ./node_modules/react-scroll/modules/index.js
var modules = __webpack_require__(4);

// EXTERNAL MODULE: ./src/css/Window.css
var Window = __webpack_require__(7);

// CONCATENATED MODULE: ./src/js/components/Window.jsx
function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  ", "\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }






var ResetStyles = Object(styled_components_browser_esm["createGlobalStyle"])(_templateObject(), dist["reset"]);

var dummy = function dummy() {};

var Window_scrollNext = function scrollNext(elementName, offsetNum) {
  modules["scroller"].scrollTo(elementName, {
    duration: 3000,
    smooth: 'easeInOutQuint',
    offset: offsetNum ? offsetNum : null
  });
};
var openExternal = function openExternal(link) {
  window.open(link, '_blank' // <- This is what makes it open in a new window.
  );
};

var Window_Intro = function Intro() {
  return react["createElement"]("div", {
    stylename: "styles.windowDivLayer}"
  }, react["createElement"](dist["Window"], {
    className: "Window__windowSpacing___2BkR5"
  }, react["createElement"](dist["WindowHeader"], {
    className: "Window__windowHeader___2rbcn"
  }, "\uD83D\uDE0E Hello.exe"), react["createElement"](dist["WindowContent"], null, react["createElement"](dist["Fieldset"], null, "Hello"), react["createElement"]("br", null), react["createElement"](dist["Fieldset"], {
    label: "Education"
  })), react["createElement"]("div", {
    className: "Window__buttonGroup___MeDln"
  }, react["createElement"](dist["Button"], {
    onClick: function onClick() {
      return Window_scrollNext('techStack', -150);
    }
  }, react["createElement"]("span", null, "Next \u21D3")))));
};

/* harmony default export */ var components_Window = (Window_Intro);
// CONCATENATED MODULE: ./src/js/components/HeadBar.jsx
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }





 // const ResetStyles = createGlobalStyle`
//   ${reset}
// `

function Menu() {
  var _React$useState = react["useState"](false),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      open = _React$useState2[0],
      setOpen = _React$useState2[1];

  function handleClick() {
    setOpen(!open);
  }

  function handleClose() {
    setOpen(false);
  }

  return react["createElement"]("div", null, open && react["createElement"](dist["List"], {
    horizontalAlign: "left",
    verticalAlign: "bottom",
    open: open,
    onClick: handleClose
  }, react["createElement"](dist["ListItem"], {
    onClick: function onClick() {
      return Window_scrollNext('intro', -150);
    }
  }, "\uD83D\uDC68\u200D\uD83D\uDCBB Profile"), react["createElement"](dist["ListItem"], {
    onClick: function onClick() {
      return Window_scrollNext('techStack', -150);
    }
  }, "\uD83D\uDCBD Tech Stack"), react["createElement"](dist["ListItem"], {
    onClick: function onClick() {
      return Window_scrollNext('experience', -150);
    }
  }, "\uD83D\uDCBC Experience"), react["createElement"](dist["ListItem"], {
    onClick: function onClick() {
      return Window_scrollNext('project', -150);
    }
  }, "\u2328\uFE0F Projects"), react["createElement"](dist["Divider"], null), react["createElement"](dist["ListItem"], {
    onClick: function onClick() {
      return Window_scrollNext('projectUrls', -150);
    }
  }, "\uD83D\uDD17 Project Links")), react["createElement"](dist["Button"], {
    onClick: handleClick,
    active: open,
    className: "HeadBar__startButton___3wCK4"
  }, react["createElement"](dist["Tooltip"], {
    className: "HeadBar__toolTipOverflow___2m55u",
    text: "No, this will never finish loading \uD83E\uDD37\u200D"
  }, react["createElement"](dist["Hourglass"], {
    size: 16
  }), "Start")));
}

var HeadBar_Header = function Header() {
  return react["createElement"]("div", {
    className: "HeadBar__headerBar___2IUyo"
  }, react["createElement"](styled_components_browser_esm["ThemeProvider"], {
    theme: dist["themes"].coldGray
  }, react["createElement"](dist["AppBar"], null, react["createElement"](dist["Toolbar"], {
    className: "HeadBar__toolBar___ly3Mj"
  }, react["createElement"](Menu, null), react["createElement"](dist["Divider"], {
    vertical: true,
    size: "lg",
    className: "HeadBar__verticalLine___3DJZv"
  }), react["createElement"]("div", {
    className: "HeadBar__headerButtonGroup___ofJq1"
  }, react["createElement"](dist["Button"], {
    onClick: function onClick() {
      return openExternal('https://github.com/harrisonxia');
    }
  }, react["createElement"]("span", {
    className: "HeadBar__buttonText___EqsDe"
  }, "Temp")), react["createElement"](dist["Button"], {
    onClick: function onClick() {
      return Window_scrollNext('experience', -150);
    }
  }, react["createElement"]("span", {
    className: "HeadBar__buttonText___EqsDe"
  }, "Temp")), react["createElement"](dist["Button"], {
    onClick: function onClick() {
      return Window_scrollNext('project', -150);
    }
  }, react["createElement"]("span", {
    className: "HeadBar__buttonText___EqsDe"
  }, "Temp")), react["createElement"](dist["Button"], {
    onClick: function onClick() {
      return openExternal('mailto:engcxia+website@gmail.com?Subject=Hello');
    }
  }, react["createElement"]("span", {
    className: "HeadBar__buttonText___EqsDe"
  }, "Contact")))))));
};

/* harmony default export */ var components_HeadBar = (HeadBar_Header);
// CONCATENATED MODULE: ./src/js/components/WindowWithTab.jsx
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function WindowWithTab_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function WindowWithTab_templateObject() {
  var data = WindowWithTab_taggedTemplateLiteral(["\n  ", "\n"]);

  WindowWithTab_templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function WindowWithTab_taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }






var WindowWithTab_ResetStyles = Object(styled_components_browser_esm["createGlobalStyle"])(WindowWithTab_templateObject(), dist["reset"]);

var WindowWithTab_Experience =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Experience, _React$Component);

  function Experience() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, Experience);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Experience)).call.apply(_getPrototypeOf2, [this].concat(args)));

    WindowWithTab_defineProperty(_assertThisInitialized(_this), "state", {
      activeTab: 0,
      tabTitles: ['Statistics Canada', 'Northwest Evaluation Association', 'Becton Dickinson']
    });

    WindowWithTab_defineProperty(_assertThisInitialized(_this), "handleChange", function (value) {
      _this.setState({
        activeTab: value
      });

      switch (value) {
        case 0:
          _this.setState({
            tabTitles: ['Statistics Canada', 'NWEA', 'Becton Dickinson']
          });

          break;

        case 1:
          _this.setState({
            tabTitles: ['Statistics Canada', 'Northwest Evaluation Association', 'Becton Dickinson']
          });

          break;

        case 2:
          _this.setState({
            tabTitles: ['Statistics Canada', 'NWEA', 'Becton Dickinson']
          });

          break;
      }
    });

    return _this;
  }

  _createClass(Experience, [{
    key: "render",
    value: function render() {
      var activeTab = this.state.activeTab;
      return react["createElement"]("div", null, react["createElement"](WindowWithTab_ResetStyles, null), react["createElement"](styled_components_browser_esm["ThemeProvider"], {
        theme: dist["themes"].water
      }, react["createElement"](dist["Window"], {
        className: "Window__windowSpacing___2BkR5"
      }, react["createElement"](dist["WindowHeader"], {
        className: "Window__windowHeader___2rbcn"
      }, "\uD83D\uDCBB Experience.exe"), react["createElement"](dist["WindowContent"], null, react["createElement"](dist["Tabs"], {
        value: activeTab,
        onChange: this.handleChange
      }, react["createElement"](dist["Tab"], {
        value: 0
      }, this.state.tabTitles[0]), react["createElement"](dist["Tab"], {
        value: 1
      }, this.state.tabTitles[1]), react["createElement"](dist["Tab"], {
        value: 2
      }, this.state.tabTitles[2])), react["createElement"]("div", null, activeTab === 0 && react["createElement"](dist["TabBody"], null, react["createElement"](dist["Fieldset"], {
        label: "Data Science coop"
      }, "May 2019 \u2013 Present", react["createElement"]("ul", {
        className: "Window__listText___2t1MZ"
      }, react["createElement"]("li", {
        className: "Window__itemText___1fCCV"
      }, " Developed an automated data verification and validation solution using Python and pandas."), react["createElement"]("li", {
        className: "Window__itemText___1fCCV"
      }, " Implemented a Python program for parsing user-specified input and configuration from Excel."), react["createElement"]("li", {
        className: "Window__itemText___1fCCV"
      }, " Designed Power BI dashboards that are being used by all survey managers within the division."), react["createElement"]("li", {
        className: "Window__itemText___1fCCV"
      }, " Technology: Python, Power BI, pandas, numpy, SAS")), react["createElement"]("br", null))), activeTab === 1 && react["createElement"](dist["TabBody"], null, react["createElement"](dist["Fieldset"], {
        label: "Software Engineer"
      }, "Apr 2017 \u2013 Aug 2018", react["createElement"]("ul", {
        className: "Window__listText___2t1MZ"
      }, react["createElement"]("li", {
        className: "Window__itemText___1fCCV"
      }, " Implemented Assessment Proctoring using React and Redux, improving performance by 45%."), react["createElement"]("li", {
        className: "Window__itemText___1fCCV"
      }, " Led the Workstation Diagnostics project that checks users\u2019 local setup.", react["createElement"](dist["Button"], {
        onClick: function onClick() {
          return openExternal('https://check.nwea.org');
        }
      }, react["createElement"]("span", null, "Check it out!"))), react["createElement"]("li", {
        className: "Window__itemText___1fCCV"
      }, " Designed automated acceptance tests using NightWatch.js and Cucumber.js"), react["createElement"]("li", {
        className: "Window__itemText___1fCCV"
      }, " Technology: React, Redux, JavaScript ES6, NightWatch, Cucumber, Webpack, Java")), react["createElement"]("br", null))), activeTab === 2 && react["createElement"](dist["TabBody"], null, react["createElement"](dist["Fieldset"], {
        label: "Software Engineer Intern"
      }, "Apr 2016 \u2013 Mar 2017", react["createElement"]("ul", {
        className: "Window__listText___2t1MZ"
      }, react["createElement"]("li", {
        className: "Window__itemText___1fCCV"
      }, " Implemented a software watchdog using C++, which defended 90% of signal interrupt."), react["createElement"]("li", {
        className: "Window__itemText___1fCCV"
      }, " Technology: C++, Assembly, Python")), react["createElement"]("br", null))))), react["createElement"]("div", {
        className: "Window__buttonGroup___MeDln"
      }, react["createElement"](dist["Button"], {
        onClick: function onClick() {
          return Window_scrollNext('techStack', -150);
        }
      }, react["createElement"]("span", null, "Back \u21D1")), react["createElement"](dist["Button"], {
        onClick: function onClick() {
          return Window_scrollNext('project', -150);
        }
      }, react["createElement"]("span", null, "Next \u21D3"))))));
    }
  }]);

  return Experience;
}(react["Component"]);

/* harmony default export */ var WindowWithTab = (WindowWithTab_Experience);
// CONCATENATED MODULE: ./src/js/components/Project.jsx
function Project_typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { Project_typeof = function _typeof(obj) { return typeof obj; }; } else { Project_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return Project_typeof(obj); }

function Project_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function Project_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function Project_createClass(Constructor, protoProps, staticProps) { if (protoProps) Project_defineProperties(Constructor.prototype, protoProps); if (staticProps) Project_defineProperties(Constructor, staticProps); return Constructor; }

function Project_possibleConstructorReturn(self, call) { if (call && (Project_typeof(call) === "object" || typeof call === "function")) { return call; } return Project_assertThisInitialized(self); }

function Project_getPrototypeOf(o) { Project_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return Project_getPrototypeOf(o); }

function Project_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function Project_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) Project_setPrototypeOf(subClass, superClass); }

function Project_setPrototypeOf(o, p) { Project_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return Project_setPrototypeOf(o, p); }

function Project_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function Project_templateObject() {
  var data = Project_taggedTemplateLiteral(["\n  ", "\n"]);

  Project_templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function Project_taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }






var Project_ResetStyles = Object(styled_components_browser_esm["createGlobalStyle"])(Project_templateObject(), dist["reset"]);

var Project_Project =
/*#__PURE__*/
function (_React$Component) {
  Project_inherits(Project, _React$Component);

  function Project() {
    var _getPrototypeOf2;

    var _this;

    Project_classCallCheck(this, Project);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = Project_possibleConstructorReturn(this, (_getPrototypeOf2 = Project_getPrototypeOf(Project)).call.apply(_getPrototypeOf2, [this].concat(args)));

    Project_defineProperty(Project_assertThisInitialized(_this), "state", {
      activeTab: 0,
      tabTitles: ['Predictive Maintenance', 'Gaming Analysis', 'AI Fashion Designer', 'Hackathon']
    });

    Project_defineProperty(Project_assertThisInitialized(_this), "handleChange", function (value) {
      _this.setState({
        activeTab: value
      });

      switch (value) {
        case 0:
          _this.setState({
            tabTitles: ['IoT devices Predictive Maintenance and Management', 'Gaming Analysis', 'AI Fashion Designer', 'Hackathon']
          });

          break;

        case 1:
          _this.setState({
            tabTitles: ['Predictive Maintenance', 'Gaming and Streaming Industry Analysis', 'AI Designer', 'Hackathon']
          });

          break;

        case 2:
          _this.setState({
            tabTitles: ['Predictive Maintenance', 'Gaming Analysis', 'AI Fashion Designer', 'Hackathon']
          });

          break;

        case 3:
          _this.setState({
            tabTitles: ['Predictive Maintenance', 'Gaming Analysis', 'AI Designer', 'Hackathon']
          });

          break;
      }
    });

    return _this;
  }

  Project_createClass(Project, [{
    key: "render",
    value: function render() {
      var activeTab = this.state.activeTab;
      return react["createElement"]("div", null, react["createElement"](Project_ResetStyles, null), react["createElement"](styled_components_browser_esm["ThemeProvider"], {
        theme: dist["themes"].water
      }, react["createElement"](dist["Window"], {
        className: "Window__windowSpacing___2BkR5"
      }, react["createElement"](dist["WindowHeader"], {
        className: "Window__windowHeader___2rbcn"
      }, "\uD83E\uDD29 Projects.exe"), react["createElement"](dist["WindowContent"], null, react["createElement"](dist["Tabs"], {
        value: activeTab,
        onChange: this.handleChange
      }, react["createElement"](dist["Tab"], {
        value: 0
      }, this.state.tabTitles[0]), react["createElement"](dist["Tab"], {
        value: 1
      }, this.state.tabTitles[1]), react["createElement"](dist["Tab"], {
        value: 2
      }, this.state.tabTitles[2]), react["createElement"](dist["Tab"], {
        value: 3
      }, this.state.tabTitles[3])), react["createElement"]("div", null, activeTab === 0 && react["createElement"](dist["TabBody"], null, react["createElement"](dist["Fieldset"], null, "Jan 2019 \u2013 Apr 2019", react["createElement"]("ul", {
        className: "Window__listText___2t1MZ"
      }, react["createElement"]("li", {
        className: "Window__itemText___1fCCV"
      }, "Performed ETL, EDA as well as data preparation."), react["createElement"]("li", {
        className: "Window__itemText___1fCCV"
      }, "Built and leveraged numerous machine learning models."), react["createElement"]("li", {
        className: "Window__itemText___1fCCV"
      }, "Developed the proof-of-concept web frontend dashboard for monitoring IoT device heartbeat via Node.js server running on AWS and detecting machine failure via tensorflow model serving on Google Cloud Platform [both servers are inactive]."), react["createElement"]("li", {
        className: "Window__itemText___1fCCV"
      }, " Applied Spark ML to predict future games and channels growth."), react["createElement"]("li", {
        className: "Window__itemText___1fCCV"
      }, " Technology: Spark, Python, Hadoop, JavaScript, ReactJS, ReChartsJS")), react["createElement"](dist["List"], {
        inline: true,
        horizontalAlign: "left",
        verticalAlign: "bottom",
        open: true
      }, react["createElement"](dist["ListItem"], {
        as: "a",
        href: "https://www.devxia.com/crouching_tigers",
        target: "_blank"
      }, "\uD83D\uDC68\u200D\uD83D\uDCBB Check it out! [servers off]"), react["createElement"](dist["Divider"], null), react["createElement"](dist["ListItem"], {
        as: "a",
        href: "https://github.com/harrisonxia/Predictive-Maintenance",
        target: "_blank"
      }, "\uD83D\uDCC1 Github")))), activeTab === 1 && react["createElement"](dist["TabBody"], null, react["createElement"](dist["Fieldset"], null, "Apr 2017 \u2013 Aug 2018", react["createElement"]("ul", {
        className: "Window__listText___2t1MZ"
      }, react["createElement"]("li", {
        className: "Window__itemText___1fCCV"
      }, " Analyzed the growth and trends in the gaming industry fetching data from various APIs."), react["createElement"]("li", {
        className: "Window__itemText___1fCCV"
      }, " Implemented a web crawler and performed ETL on over 50GB of raw data using PySpark."), react["createElement"]("li", {
        className: "Window__itemText___1fCCV"
      }, " Developed the web frontend for visualizing analysis using JavaScript [devxia.com/Lil-Data]"), react["createElement"]("li", {
        className: "Window__itemText___1fCCV"
      }, " Applied Spark ML to predict future games and channels growth."), react["createElement"]("li", {
        className: "Window__itemText___1fCCV"
      }, " Technology: Spark, Python, Hadoop, JavaScript, ReactJS, ReChartsJS")), react["createElement"](dist["List"], {
        inline: true,
        horizontalAlign: "left",
        verticalAlign: "bottom",
        open: true
      }, react["createElement"](dist["ListItem"], {
        as: "a",
        href: "https://www.devxia.com/Lil-Data/",
        target: "_blank"
      }, "\uD83D\uDC68\u200D\uD83D\uDCBB Check out this project live!"), react["createElement"](dist["Divider"], null), react["createElement"](dist["ListItem"], {
        as: "a",
        href: "https://github.com/harrisonxia/Lil-Data",
        target: "_blank"
      }, "\uD83D\uDCC1 And it's on Github!")))), activeTab === 2 && react["createElement"](dist["TabBody"], null, react["createElement"](dist["Fieldset"], null, "Oct 2018 \u2013 Dec 2018", react["createElement"]("ul", {
        className: "Window__listText___2t1MZ"
      }, react["createElement"]("li", {
        className: "Window__itemText___1fCCV"
      }, " Applied and trained DCGAN model to generate original and innovative fashion patterns."), react["createElement"]("li", {
        className: "Window__itemText___1fCCV"
      }, " Achieved real time object detection and virtual try-on with Mask R-CNN."), react["createElement"]("li", {
        className: "Window__itemText___1fCCV"
      }, " Fine-tuned existing models to enhance object detection accuracy and broaden real time usage."), react["createElement"]("li", {
        className: "Window__itemText___1fCCV"
      }, " Technology: PyTorch, Python, CUDA, GoogleColab")), react["createElement"](dist["List"], {
        inline: true,
        horizontalAlign: "left",
        verticalAlign: "bottom",
        open: true
      }, react["createElement"](dist["ListItem"], {
        as: "a",
        href: "https://github.com/harrisonxia/AI-Fashion-Designer",
        target: "_blank"
      }, "\uD83D\uDCC1 On Github!")))), activeTab === 3 && react["createElement"](dist["TabBody"], null, react["createElement"](dist["Fieldset"], null, react["createElement"]("ul", {
        className: "Window__listText___2t1MZ"
      }, react["createElement"]("li", {
        className: "Window__itemText___1fCCV"
      }, " Open Government Partnership Global Summit Hackathon, Ottawa May 2019", react["createElement"]("br", null), "o Analyzed and created transport, safety, economy indicators for 9 cities in Canada.", react["createElement"]("br", null), "o Implemented web frontend and visualization", react["createElement"](dist["Button"], {
        onClick: function onClick() {
          return openExternal('https://www.devxia.com/Stats-In-A-Can/');
        }
      }, react["createElement"]("span", null, "Check out this project live!")), react["createElement"](dist["Button"], {
        onClick: function onClick() {
          return openExternal('https://github.com/ogp-summit-hackathon-sommet-pgo/Stats-In-A-Can');
        }
      }, react["createElement"]("span", null, "Check on Github!"))), react["createElement"]("li", {
        className: "Window__itemText___1fCCV"
      }, " DeloitteAIHacks, Vancouver Sep 2019", react["createElement"]("br", null), "o Prepared the data and built data model to make suggestions for K-12inBC.")), react["createElement"]("br", null))))), react["createElement"]("div", {
        className: "Window__buttonGroup___MeDln"
      }, react["createElement"](dist["Button"], {
        onClick: function onClick() {
          return Window_scrollNext('experience', -150);
        }
      }, react["createElement"]("span", null, "Back \u21D1")), react["createElement"](dist["Button"], {
        onClick: function onClick() {
          return Window_scrollNext('projectUrls');
        }
      }, react["createElement"]("span", null, "Next \u21D3"))))));
    }
  }]);

  return Project;
}(react["Component"]);

/* harmony default export */ var components_Project = (Project_Project);
// CONCATENATED MODULE: ./src/js/components/UrlList.jsx






var items = [{
  value: 'https://www.devxia.com/Lil-Data/',
  label: 'Gaming and Streaming Industry Analysis'
}, {
  value: 'https://www.devxia.com/crouching_tigers',
  label: 'IoT devices Predictive Maintenance and Management'
}, {
  value: 'https://www.devxia.com/Stats-In-A-Can/',
  label: 'Hackathon: \n Public Transportation Analysis'
}];

var UrlList_UrlList = function UrlList() {
  return react["createElement"]("div", null, react["createElement"](styled_components_browser_esm["ThemeProvider"], {
    theme: dist["themes"].water
  }, react["createElement"](dist["Window"], {
    className: "Window__windowSpacing___2BkR5"
  }, react["createElement"](dist["WindowHeader"], {
    className: "Window__windowHeader___2rbcn"
  }, "\uD83D\uDD17 ProjectLinks.exe"), react["createElement"](dist["WindowContent"], null, react["createElement"](dist["Fieldset"], null, react["createElement"]("div", {
    className: "Window__radioProcess___3qLk-"
  }, "Projects details and Github links are listed above.")), react["createElement"]("br", null), react["createElement"](dist["Fieldset"], {
    label: "Direct link to all projects live."
  }, react["createElement"]("div", {
    className: "Window__radioProcess___3qLk-"
  }, react["createElement"](dist["Select"], {
    items: items,
    onChange: function onChange(value) {
      return openExternal(value);
    },
    className: "Window__projectUrl___2rjKO"
  }), react["createElement"]("br", null)))), react["createElement"]("div", {
    className: "Window__buttonGroup___MeDln"
  }, react["createElement"](dist["Button"], {
    onClick: function onClick() {
      return Window_scrollNext('project', -150);
    }
  }, react["createElement"]("span", null, "Back \u21D1")), react["createElement"](dist["Button"], {
    onClick: function onClick() {
      return Window_scrollNext('intro', -150);
    }
  }, react["createElement"]("span", null, "Top \u21D1\u21D1"))))));
};

/* harmony default export */ var components_UrlList = (UrlList_UrlList);
// CONCATENATED MODULE: ./src/js/components/TechStack.jsx




var fullStar = react["createElement"]("img", {
  src: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBkPSJNMTIgLjI4OGwyLjgzMyA4LjcxOGg5LjE2N2wtNy40MTcgNS4zODkgMi44MzMgOC43MTgtNy40MTYtNS4zODgtNy40MTcgNS4zODggMi44MzMtOC43MTgtNy40MTYtNS4zODloOS4xNjd6Ii8+PC9zdmc+",
  alt: "fullStar"
});
var emptyStar = react["createElement"]("img", {
  alt: "emptyStar",
  src: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBkPSJNMTIgNS4xNzNsMi4zMzUgNC44MTcgNS4zMDUuNzMyLTMuODYxIDMuNzEuOTQyIDUuMjctNC43MjEtMi41MjQtNC43MjEgMi41MjUuOTQyLTUuMjctMy44NjEtMy43MSA1LjMwNS0uNzMzIDIuMzM1LTQuODE3em0wLTQuNTg2bC0zLjY2OCA3LjU2OC04LjMzMiAxLjE1MSA2LjA2NCA1LjgyOC0xLjQ4IDguMjc5IDcuNDE2LTMuOTY3IDcuNDE2IDMuOTY2LTEuNDgtOC4yNzkgNi4wNjQtNS44MjctOC4zMzItMS4xNS0zLjY2OC03LjU2OXoiLz48L3N2Zz4="
});
var halfStar = react["createElement"]("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  width: "24",
  height: "24",
  viewBox: "0 0 24 24"
}, react["createElement"]("path", {
  d: "M12 5.173l2.335 4.817 5.305.732-3.861 3.71.942 5.27-4.721-2.524v-12.005zm0-4.586l-3.668 7.568-8.332 1.151 6.064 5.828-1.48 8.279 7.416-3.967 7.416 3.966-1.48-8.279 6.064-5.827-8.332-1.15-3.668-7.569z"
}));
var tech = [{
  name: 'Java',
  level: 9
}, {
  name: 'JavaScript ES6, ReactJS',
  level: 9
}, {
  name: 'Python',
  level: 8
}, {
  name: 'Spark',
  level: 8
}, {
  name: 'pandas',
  level: 8
}, {
  name: 'SQL',
  level: 9
}];

var TechStack_getStars = function getStars(level) {
  switch (level) {
    case 9:
      return react["createElement"]("span", null, fullStar, fullStar, fullStar, fullStar, halfStar);

    case 8:
      return react["createElement"]("span", null, fullStar, fullStar, fullStar, fullStar, emptyStar);

    case 7:
      return react["createElement"]("span", null, fullStar, fullStar, fullStar, halfStar, emptyStar);

    default:
      return react["createElement"]("span", null, fullStar, fullStar, fullStar, fullStar, fullStar);
  }
};

var TechStack_TechStack = function TechStack() {
  return react["createElement"]("div", {
    stylename: "styles.windowDivLayer"
  }, react["createElement"](dist["Window"], {
    className: "Window__windowSpacing___2BkR5"
  }, react["createElement"](dist["WindowHeader"], {
    className: "Window__windowHeader___2rbcn"
  }, "\uD83D\uDCBD TechStack.exe"), react["createElement"](dist["WindowContent"], {
    className: "Window__techStack___3NFTF"
  }, react["createElement"](dist["Table"], {
    className: "Window__tableCenter___1OeFt"
  }, react["createElement"](dist["TableHead"], null, react["createElement"](dist["TableRow"], {
    head: true
  }, react["createElement"](dist["TableHeadCell"], null, "Name"), react["createElement"](dist["TableHeadCell"], null, "Lvl."))), react["createElement"](dist["TableBody"], null, tech.map(function (item, i) {
    return react["createElement"](dist["TableRow"], {
      key: i
    }, react["createElement"](dist["TableDataCell"], {
      className: "Window__processCell___3-vZV"
    }, item.name), react["createElement"](dist["TableDataCell"], {
      className: "Window__processCell___3-vZV"
    }, TechStack_getStars(item.level)));
  })))), react["createElement"]("div", {
    className: "Window__buttonGroup___MeDln"
  }, react["createElement"](dist["Button"], {
    onClick: function onClick() {
      return Window_scrollNext('intro', -150);
    }
  }, react["createElement"]("span", null, "Back \u21D1")), react["createElement"](dist["Button"], {
    onClick: function onClick() {
      return Window_scrollNext('experience', -150);
    }
  }, react["createElement"]("span", null, "Next \u21D3")))));
};

/* harmony default export */ var components_TechStack = (TechStack_TechStack);
// EXTERNAL MODULE: ./src/css/App.css
var css_App = __webpack_require__(53);

// EXTERNAL MODULE: ./node_modules/chart.xkcd/dist/index.js
var chart_xkcd_dist = __webpack_require__(18);
var chart_xkcd_dist_default = /*#__PURE__*/__webpack_require__.n(chart_xkcd_dist);

// EXTERNAL MODULE: ./node_modules/chart.xkcd-react/build/index.js
var build = __webpack_require__(22);

// CONCATENATED MODULE: ./src/assets/data/data.js
var expectedSchooling = {
  "year": [1990, 1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999, 2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 9999],
  "data": [{
    "label": "AFG",
    "data": [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.6, 1.2, 1.8, 4.7, 4.4, 4.9, 5.4, 5.8, 6.3, 6.8, 7.2, 7.4, 7.5, 7.6, 7.7, 7.8, 7.9, 8.0, 8.0]
  }, {
    "label": "ALB",
    "data": [11.3, 11.5, 10.8, 10.3, 10.1, 10.1, 10.2, 10.4, 10.5, 10.7, 10.6, 10.8, 10.8, 10.9, 10.9, 11.4, 11.6, 12.2, 12.4, 12.8, 13.6, 14.4, 14.6, 14.7, 14.8, 14.8, 14.9, 15.0, 15.0]
  }, {
    "label": "DZA",
    "data": [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 11.0, 11.2, 11.5, 11.7, 12.0, 12.4, 12.5, 12.8, 13.2, 13.7, 14.2, 14.6, 14.6, 14.6, 14.6, 14.6, 14.6, 14.6, 14.6]
  }, {
    "label": "AGO",
    "data": [0.0, 0.0, 0.0, 0.0, 0.0, 3.5, 3.6, 3.7, 3.8, 4.1, 4.5, 4.9, 5.2, 5.6, 6.0, 6.4, 6.7, 7.1, 7.5, 7.8, 7.5, 7.2, 8.7, 8.7, 8.7, 8.7, 11.0, 11.0, 11.0]
  }, {
    "label": "ATG",
    "data": [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 13.8, 13.8, 13.8, 13.5, 13.2, 13.0, 13.2, 13.4, 13.6, 13.5, 13.8, 13.9, 13.9, 13.9]
  }, {
    "label": "ARG",
    "data": [0.0, 0.0, 0.0, 0.0, 0.0, 14.0, 14.2, 14.5, 14.7, 15.8, 16.3, 17.0, 17.2, 16.9, 17.0, 16.9, 17.3, 17.3, 17.5, 17.8, 18.1, 18.4, 18.4, 18.4, 18.4, 18.4, 18.5, 18.7, 18.7]
  }, {
    "label": "ARM",
    "data": [0.0, 0.0, 0.0, 0.0, 0.0, 10.6, 10.4, 10.8, 11.5, 11.7, 11.5, 11.8, 12.0, 12.3, 12.6, 12.9, 13.1, 13.0, 12.7, 13.2, 13.2, 13.3, 13.3, 13.3, 13.3, 13.4, 13.4, 13.4, 13.4]
  }, {
    "label": "AUS",
    "data": [17.3, 17.3, 17.3, 17.3, 17.3, 18.8, 19.4, 20.5, 20.4, 20.8, 21.0, 20.5, 20.8, 21.0, 20.6, 20.6, 19.4, 19.6, 19.7, 20.0, 20.3, 20.7, 20.9, 20.9, 20.9, 20.9, 20.9, 23.3, 23.3]
  }, {
    "label": "AUT",
    "data": [13.5, 13.7, 14.0, 14.0, 14.4, 14.5, 14.6, 14.8, 15.7, 15.3, 15.5, 16.2, 14.8, 14.8, 15.1, 15.2, 15.4, 15.3, 15.4, 15.6, 15.9, 15.9, 16.0, 16.2, 16.2, 16.3, 16.3, 16.4, 16.4]
  }]
};
// CONCATENATED MODULE: ./src/js/components/WindowContainer.jsx








var WindowContainer_dummy = function dummy() {};

var WindowContainer_WindowContainer = function WindowContainer() {
  return react["createElement"]("div", {
    stylename: "styles.windowDivLayer}"
  }, react["createElement"](dist["Window"], {
    className: "Window__windowSpacing___2BkR5"
  }, react["createElement"](dist["WindowHeader"], {
    className: "Window__windowHeader___2rbcn"
  }, "\uD83D\uDE0E Hello.exe"), react["createElement"](dist["WindowContent"], null, react["createElement"](dist["Fieldset"], null, react["createElement"](build["Line"], {
    config: {
      title: 'Expected years of schooling, female (years)',
      // optional
      xLabel: 'Year',
      // optional
      yLabel: 'y',
      // optional
      data: {
        labels: expectedSchooling.year,
        datasets: expectedSchooling.data
      },
      options: {
        // optional
        yTickCount: 3,
        legendPosition: chart_xkcd_dist_default.a.config.positionType.upLeft
      }
    }
  })), react["createElement"]("br", null), react["createElement"](dist["Fieldset"], {
    label: "Education"
  }, react["createElement"](build["Radar"], {
    config: {
      title: 'Fake Data',
      data: {
        labels: ['a', 'b', 'c', 'd', 'e'],
        datasets: [{
          label: 'aaaa',
          data: [1, 2, 3, 4, 5]
        }, {
          label: 'bbb',
          data: [3, 4, 5, 6, 7]
        }, {
          label: 'ccc',
          data: [5, 4, 1, 6, 8]
        }, {
          label: 'ddd',
          data: [5, 8, 10, 3, 1]
        }]
      },
      dataColors: ['#dd4528', '#28a3dd', '#f3db52', '#ed84b5', '#4ab74e', '#9179c0', '#8e6d5a', '#f19839', '#949494']
    }
  }, " "))), react["createElement"]("div", {
    className: "Window__buttonGroup___MeDln"
  }, react["createElement"](dist["Button"], {
    onClick: function onClick() {
      return scrollNext('techStack', -150);
    }
  }, react["createElement"]("span", null, "Next \u21D3")))));
};

/* harmony default export */ var components_WindowContainer = (WindowContainer_WindowContainer);
// CONCATENATED MODULE: ./src/js/components/App.jsx
function App_templateObject() {
  var data = App_taggedTemplateLiteral(["\n  ", "\n"]);

  App_templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function App_taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }













var App_ResetStyles = Object(styled_components_browser_esm["createGlobalStyle"])(App_templateObject(), dist["reset"]);

var App_App = function App() {
  return react["createElement"]("div", {
    className: "App__mainDiv___ddp8T"
  }, react["createElement"](App_ResetStyles, null), react["createElement"](styled_components_browser_esm["ThemeProvider"], {
    theme: dist["themes"].coldGray
  }, react["createElement"](components_HeadBar, null), react["createElement"]("div", {
    className: "App__mainContainer___2fwYT"
  }, react["createElement"]("div", {
    className: "App__windowContainer___uRFp4"
  }, react["createElement"](modules["Element"], {
    name: "intro"
  }, react["createElement"](components_WindowContainer, null))), react["createElement"]("div", {
    className: "App__windowContainer___uRFp4"
  }, react["createElement"](modules["Element"], {
    name: "techStack"
  }, react["createElement"](components_TechStack, null))), react["createElement"]("div", {
    className: "App__windowContainer___uRFp4"
  }, react["createElement"](modules["Element"], {
    name: "experience"
  })), react["createElement"]("div", {
    className: "App__windowContainer___uRFp4"
  }, react["createElement"](modules["Element"], {
    name: "project"
  })), react["createElement"]("div", {
    className: "App__windowContainer___uRFp4"
  }, react["createElement"](modules["Element"], {
    name: "projectUrls"
  })))));
};

/* harmony default export */ var components_App = (App_App);
// CONCATENATED MODULE: ./src/js/index.js






var baseName = '/';

if (true) {
  baseName = '/CMPT767';
}

var defaultPath = '/';
Object(react_dom["render"])(react_default.a.createElement(components_Provider, {
  store: js_store
}, react_default.a.createElement(react_router_dom_BrowserRouter, {
  basename: baseName
}, react_default.a.createElement(react_router_Switch, null, react_default.a.createElement(react_router_Route, {
  exact: true,
  path: defaultPath,
  component: components_App
}), react_default.a.createElement(react_router_Route, {
  path: "".concat(defaultPath, "example"),
  component: components_App
}), react_default.a.createElement(Redirect, {
  exact: true,
  from: "*",
  to: defaultPath
})))), document.getElementById('root'));
// EXTERNAL MODULE: ./src/index.css
var src = __webpack_require__(55);

// CONCATENATED MODULE: ./src/index.js

 // this is the default entry point for webpack 4

/***/ })
/******/ ]);