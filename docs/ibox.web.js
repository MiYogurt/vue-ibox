var Ibox = (function (Vue) {
    'use strict';

    Vue = Vue && Vue.hasOwnProperty('default') ? Vue['default'] : Vue;

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */
    /* global Reflect, Promise */

    var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };

    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

    function __decorate(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    }

    function unwrapExports (x) {
    	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x.default : x;
    }

    function createCommonjsModule(fn, module) {
    	return module = { exports: {} }, fn(module, module.exports), module.exports;
    }

    var vueClassComponent_common = createCommonjsModule(function (module, exports) {

    Object.defineProperty(exports, '__esModule', { value: true });

    function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

    var Vue$$1 = _interopDefault(Vue);

    var reflectionIsSupported = typeof Reflect !== 'undefined' && Reflect.defineMetadata;
    function copyReflectionMetadata(to, from) {
        forwardMetadata(to, from);
        Object.getOwnPropertyNames(from.prototype).forEach(function (key) {
            forwardMetadata(to.prototype, from.prototype, key);
        });
        Object.getOwnPropertyNames(from).forEach(function (key) {
            forwardMetadata(to, from, key);
        });
    }
    function forwardMetadata(to, from, propertyKey) {
        var metaKeys = propertyKey
            ? Reflect.getOwnMetadataKeys(from, propertyKey)
            : Reflect.getOwnMetadataKeys(from);
        metaKeys.forEach(function (metaKey) {
            var metadata = propertyKey
                ? Reflect.getOwnMetadata(metaKey, from, propertyKey)
                : Reflect.getOwnMetadata(metaKey, from);
            if (propertyKey) {
                Reflect.defineMetadata(metaKey, metadata, to, propertyKey);
            }
            else {
                Reflect.defineMetadata(metaKey, metadata, to);
            }
        });
    }

    var fakeArray = { __proto__: [] };
    var hasProto = fakeArray instanceof Array;
    function createDecorator(factory) {
        return function (target, key, index) {
            var Ctor = typeof target === 'function'
                ? target
                : target.constructor;
            if (!Ctor.__decorators__) {
                Ctor.__decorators__ = [];
            }
            if (typeof index !== 'number') {
                index = undefined;
            }
            Ctor.__decorators__.push(function (options) { return factory(options, key, index); });
        };
    }
    function mixins() {
        var Ctors = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            Ctors[_i] = arguments[_i];
        }
        return Vue$$1.extend({ mixins: Ctors });
    }
    function isPrimitive(value) {
        var type = typeof value;
        return value == null || (type !== 'object' && type !== 'function');
    }

    function collectDataFromConstructor(vm, Component) {
        // override _init to prevent to init as Vue instance
        var originalInit = Component.prototype._init;
        Component.prototype._init = function () {
            var _this = this;
            // proxy to actual vm
            var keys = Object.getOwnPropertyNames(vm);
            // 2.2.0 compat (props are no longer exposed as self properties)
            if (vm.$options.props) {
                for (var key in vm.$options.props) {
                    if (!vm.hasOwnProperty(key)) {
                        keys.push(key);
                    }
                }
            }
            keys.forEach(function (key) {
                if (key.charAt(0) !== '_') {
                    Object.defineProperty(_this, key, {
                        get: function () { return vm[key]; },
                        set: function (value) { vm[key] = value; },
                        configurable: true
                    });
                }
            });
        };
        // should be acquired class property values
        var data = new Component();
        // restore original _init to avoid memory leak (#209)
        Component.prototype._init = originalInit;
        // create plain data object
        var plainData = {};
        Object.keys(data).forEach(function (key) {
            if (data[key] !== undefined) {
                plainData[key] = data[key];
            }
        });
        return plainData;
    }

    var $internalHooks = [
        'data',
        'beforeCreate',
        'created',
        'beforeMount',
        'mounted',
        'beforeDestroy',
        'destroyed',
        'beforeUpdate',
        'updated',
        'activated',
        'deactivated',
        'render',
        'errorCaptured' // 2.5
    ];
    function componentFactory(Component, options) {
        if (options === void 0) { options = {}; }
        options.name = options.name || Component._componentTag || Component.name;
        // prototype props.
        var proto = Component.prototype;
        Object.getOwnPropertyNames(proto).forEach(function (key) {
            if (key === 'constructor') {
                return;
            }
            // hooks
            if ($internalHooks.indexOf(key) > -1) {
                options[key] = proto[key];
                return;
            }
            var descriptor = Object.getOwnPropertyDescriptor(proto, key);
            if (descriptor.value !== void 0) {
                // methods
                if (typeof descriptor.value === 'function') {
                    (options.methods || (options.methods = {}))[key] = descriptor.value;
                }
                else {
                    // typescript decorated data
                    (options.mixins || (options.mixins = [])).push({
                        data: function () {
                            var _a;
                            return _a = {}, _a[key] = descriptor.value, _a;
                        }
                    });
                }
            }
            else if (descriptor.get || descriptor.set) {
                // computed properties
                (options.computed || (options.computed = {}))[key] = {
                    get: descriptor.get,
                    set: descriptor.set
                };
            }
        });
        (options.mixins || (options.mixins = [])).push({
            data: function () {
                return collectDataFromConstructor(this, Component);
            }
        });
        // decorate options
        var decorators = Component.__decorators__;
        if (decorators) {
            decorators.forEach(function (fn) { return fn(options); });
            delete Component.__decorators__;
        }
        // find super
        var superProto = Object.getPrototypeOf(Component.prototype);
        var Super = superProto instanceof Vue$$1
            ? superProto.constructor
            : Vue$$1;
        var Extended = Super.extend(options);
        forwardStaticMembers(Extended, Component, Super);
        if (reflectionIsSupported) {
            copyReflectionMetadata(Extended, Component);
        }
        return Extended;
    }
    function forwardStaticMembers(Extended, Original, Super) {
        // We have to use getOwnPropertyNames since Babel registers methods as non-enumerable
        Object.getOwnPropertyNames(Original).forEach(function (key) {
            // `prototype` should not be overwritten
            if (key === 'prototype') {
                return;
            }
            // Some browsers does not allow reconfigure built-in properties
            var extendedDescriptor = Object.getOwnPropertyDescriptor(Extended, key);
            if (extendedDescriptor && !extendedDescriptor.configurable) {
                return;
            }
            var descriptor = Object.getOwnPropertyDescriptor(Original, key);
            // If the user agent does not support `__proto__` or its family (IE <= 10),
            // the sub class properties may be inherited properties from the super class in TypeScript.
            // We need to exclude such properties to prevent to overwrite
            // the component options object which stored on the extended constructor (See #192).
            // If the value is a referenced value (object or function),
            // we can check equality of them and exclude it if they have the same reference.
            // If it is a primitive value, it will be forwarded for safety.
            if (!hasProto) {
                // Only `cid` is explicitly exluded from property forwarding
                // because we cannot detect whether it is a inherited property or not
                // on the no `__proto__` environment even though the property is reserved.
                if (key === 'cid') {
                    return;
                }
                var superDescriptor = Object.getOwnPropertyDescriptor(Super, key);
                if (!isPrimitive(descriptor.value) &&
                    superDescriptor &&
                    superDescriptor.value === descriptor.value) {
                    return;
                }
            }
            Object.defineProperty(Extended, key, descriptor);
        });
    }

    function Component(options) {
        if (typeof options === 'function') {
            return componentFactory(options);
        }
        return function (Component) {
            return componentFactory(Component, options);
        };
    }
    Component.registerHooks = function registerHooks(keys) {
        $internalHooks.push.apply($internalHooks, keys);
    };

    exports.default = Component;
    exports.createDecorator = createDecorator;
    exports.mixins = mixins;
    });

    var Component = unwrapExports(vueClassComponent_common);
    var vueClassComponent_common_1 = vueClassComponent_common.createDecorator;
    var vueClassComponent_common_2 = vueClassComponent_common.mixins;

    /** vue-property-decorator verson 7.2.0 MIT LICENSE copyright 2018 kaorun343 */
    /**
     * decorator of a prop
     * @param  options the options for the prop
     * @return PropertyDecorator | void
     */
    function Prop(options) {
        if (options === void 0) { options = {}; }
        return vueClassComponent_common_1(function (componentOptions, k) {
            (componentOptions.props || (componentOptions.props = {}))[k] = options;
        });
    }

    var Loading = /** @class */ (function (_super) {
        __extends(Loading, _super);
        function Loading() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Loading = __decorate([
            Component
        ], Loading);
        return Loading;
    }(Vue));

    /* script */
                const __vue_script__ = Loading;
    /* template */
    var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{attrs:{"viewBox":"0 0 120 120","version":"1.1","xmlns":"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink"}},[_c('g',{staticClass:"g-circles g-circles--v1",attrs:{"id":"circle"}},[_c('circle',{attrs:{"id":"12","transform":"translate(35, 16.698730) rotate(-30) translate(-35, -16.698730) ","cx":"35","cy":"16.6987298","r":"10"}}),_vm._v(" "),_c('circle',{attrs:{"id":"11","transform":"translate(16.698730, 35) rotate(-60) translate(-16.698730, -35) ","cx":"16.6987298","cy":"35","r":"10"}}),_vm._v(" "),_c('circle',{attrs:{"id":"10","transform":"translate(10, 60) rotate(-90) translate(-10, -60) ","cx":"10","cy":"60","r":"10"}}),_vm._v(" "),_c('circle',{attrs:{"id":"9","transform":"translate(16.698730, 85) rotate(-120) translate(-16.698730, -85) ","cx":"16.6987298","cy":"85","r":"10"}}),_vm._v(" "),_c('circle',{attrs:{"id":"8","transform":"translate(35, 103.301270) rotate(-150) translate(-35, -103.301270) ","cx":"35","cy":"103.30127","r":"10"}}),_vm._v(" "),_c('circle',{attrs:{"id":"7","cx":"60","cy":"110","r":"10"}}),_vm._v(" "),_c('circle',{attrs:{"id":"6","transform":"translate(85, 103.301270) rotate(-30) translate(-85, -103.301270) ","cx":"85","cy":"103.30127","r":"10"}}),_vm._v(" "),_c('circle',{attrs:{"id":"5","transform":"translate(103.301270, 85) rotate(-60) translate(-103.301270, -85) ","cx":"103.30127","cy":"85","r":"10"}}),_vm._v(" "),_c('circle',{attrs:{"id":"4","transform":"translate(110, 60) rotate(-90) translate(-110, -60) ","cx":"110","cy":"60","r":"10"}}),_vm._v(" "),_c('circle',{attrs:{"id":"3","transform":"translate(103.301270, 35) rotate(-120) translate(-103.301270, -35) ","cx":"103.30127","cy":"35","r":"10"}}),_vm._v(" "),_c('circle',{attrs:{"id":"2","transform":"translate(85, 16.698730) rotate(-150) translate(-85, -16.698730) ","cx":"85","cy":"16.6987298","r":"10"}}),_vm._v(" "),_c('circle',{attrs:{"id":"1","cx":"60","cy":"10","r":"10"}})]),_vm._v(" "),_c('use',{staticClass:"use",attrs:{"xlink:href":"#circle"}})])};
    var __vue_staticRenderFns__ = [];

      /* style */
      const __vue_inject_styles__ = undefined;
      /* scoped */
      const __vue_scope_id__ = "data-v-0c32a694";
      /* module identifier */
      const __vue_module_identifier__ = undefined;
      /* functional template */
      const __vue_is_functional_template__ = false;
      /* component normalizer */
      function __vue_normalize__(
        template, style, script,
        scope, functional, moduleIdentifier,
        createInjector, createInjectorSSR
      ) {
        const component = (typeof script === 'function' ? script.options : script) || {};

        // For security concerns, we use only base name in production mode.
        component.__file = "loading.vue";

        if (!component.render) {
          component.render = template.render;
          component.staticRenderFns = template.staticRenderFns;
          component._compiled = true;

          if (functional) component.functional = true;
        }

        component._scopeId = scope;

        return component
      }
      /* style inject */
      
      /* style inject SSR */
      

      
      var loading = __vue_normalize__(
        { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
        __vue_inject_styles__,
        __vue_script__,
        __vue_scope_id__,
        __vue_is_functional_template__,
        __vue_module_identifier__,
        undefined,
        undefined
      );

    var Redo = /** @class */ (function (_super) {
        __extends(Redo, _super);
        function Redo() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Redo = __decorate([
            Component
        ], Redo);
        return Redo;
    }(Vue));

    /* script */
                const __vue_script__$1 = Redo;
    /* template */
    var __vue_render__$1 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{attrs:{"xmlns":"http://www.w3.org/2000/svg","viewBox":"0 0 53 50"}},[_c('path',{staticStyle:{"fill":"#000","stroke":"#fff","stroke-linecap":"round","stroke-miterlimit":"10","stroke-width":"4px"},attrs:{"d":"M436.5,275.5a21,21,0,1,0,21-21","transform":"translate(-429 -250)"}}),_vm._v(" "),_c('polygon',{staticStyle:{"stroke":"#fff","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"4px"},attrs:{"points":"3 24 7.5 18 12 24 3 24"}})])};
    var __vue_staticRenderFns__$1 = [];

      /* style */
      const __vue_inject_styles__$1 = undefined;
      /* scoped */
      const __vue_scope_id__$1 = "data-v-7d236257";
      /* module identifier */
      const __vue_module_identifier__$1 = undefined;
      /* functional template */
      const __vue_is_functional_template__$1 = false;
      /* component normalizer */
      function __vue_normalize__$1(
        template, style, script,
        scope, functional, moduleIdentifier,
        createInjector, createInjectorSSR
      ) {
        const component = (typeof script === 'function' ? script.options : script) || {};

        // For security concerns, we use only base name in production mode.
        component.__file = "redo.vue";

        if (!component.render) {
          component.render = template.render;
          component.staticRenderFns = template.staticRenderFns;
          component._compiled = true;

          if (functional) component.functional = true;
        }

        component._scopeId = scope;

        return component
      }
      /* style inject */
      
      /* style inject SSR */
      

      
      var redo = __vue_normalize__$1(
        { render: __vue_render__$1, staticRenderFns: __vue_staticRenderFns__$1 },
        __vue_inject_styles__$1,
        __vue_script__$1,
        __vue_scope_id__$1,
        __vue_is_functional_template__$1,
        __vue_module_identifier__$1,
        undefined,
        undefined
      );

    var Close = /** @class */ (function (_super) {
        __extends(Close, _super);
        function Close() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Close = __decorate([
            Component
        ], Close);
        return Close;
    }(Vue));

    /* script */
                const __vue_script__$2 = Close;
    /* template */
    var __vue_render__$2 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{attrs:{"xmlns":"http://www.w3.org/2000/svg","viewBox":"0 0 46 46"}},[_c('circle',{staticStyle:{"fill":"none","stroke":"#fff","stroke-linecap":"round","stroke-miterlimit":"10","stroke-width":"4px"},attrs:{"cx":"23","cy":"23","r":"21"}}),_vm._v(" "),_c('line',{staticStyle:{"fill":"none","stroke":"#fff","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"4px"},attrs:{"x1":"17","y1":"29","x2":"29","y2":"17"}}),_vm._v(" "),_c('line',{staticStyle:{"fill":"none","stroke":"#fff","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"4px"},attrs:{"x1":"29","y1":"29","x2":"17","y2":"17"}})])};
    var __vue_staticRenderFns__$2 = [];

      /* style */
      const __vue_inject_styles__$2 = undefined;
      /* scoped */
      const __vue_scope_id__$2 = "data-v-8f111946";
      /* module identifier */
      const __vue_module_identifier__$2 = undefined;
      /* functional template */
      const __vue_is_functional_template__$2 = false;
      /* component normalizer */
      function __vue_normalize__$2(
        template, style, script,
        scope, functional, moduleIdentifier,
        createInjector, createInjectorSSR
      ) {
        const component = (typeof script === 'function' ? script.options : script) || {};

        // For security concerns, we use only base name in production mode.
        component.__file = "close.vue";

        if (!component.render) {
          component.render = template.render;
          component.staticRenderFns = template.staticRenderFns;
          component._compiled = true;

          if (functional) component.functional = true;
        }

        component._scopeId = scope;

        return component
      }
      /* style inject */
      
      /* style inject SSR */
      

      
      var IconClose = __vue_normalize__$2(
        { render: __vue_render__$2, staticRenderFns: __vue_staticRenderFns__$2 },
        __vue_inject_styles__$2,
        __vue_script__$2,
        __vue_scope_id__$2,
        __vue_is_functional_template__$2,
        __vue_module_identifier__$2,
        undefined,
        undefined
      );

    var Small = /** @class */ (function (_super) {
        __extends(Small, _super);
        function Small() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Small = __decorate([
            Component
        ], Small);
        return Small;
    }(Vue));

    /* script */
                const __vue_script__$3 = Small;
    /* template */
    var __vue_render__$3 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{attrs:{"xmlns":"http://www.w3.org/2000/svg","viewBox":"0 0 47.61 48.5"}},[_c('ellipse',{staticStyle:{"fill":"none","stroke":"#fff","stroke-linecap":"round","stroke-miterlimit":"10","stroke-width":"4px"},attrs:{"cx":"16.15","cy":"16","rx":"14.15","ry":"14"}}),_vm._v(" "),_c('path',{staticStyle:{"fill":"#fff","stroke":"#fff","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"6px"},attrs:{"d":"M26.76,27.7,44.61,45.5Z"}}),_vm._v(" "),_c('line',{staticStyle:{"fill":"none","stroke":"#fff","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2px"},attrs:{"x1":"10.15","y1":"16","x2":"22.15","y2":"16"}})])};
    var __vue_staticRenderFns__$3 = [];

      /* style */
      const __vue_inject_styles__$3 = undefined;
      /* scoped */
      const __vue_scope_id__$3 = "data-v-24ee367f";
      /* module identifier */
      const __vue_module_identifier__$3 = undefined;
      /* functional template */
      const __vue_is_functional_template__$3 = false;
      /* component normalizer */
      function __vue_normalize__$3(
        template, style, script,
        scope, functional, moduleIdentifier,
        createInjector, createInjectorSSR
      ) {
        const component = (typeof script === 'function' ? script.options : script) || {};

        // For security concerns, we use only base name in production mode.
        component.__file = "small.vue";

        if (!component.render) {
          component.render = template.render;
          component.staticRenderFns = template.staticRenderFns;
          component._compiled = true;

          if (functional) component.functional = true;
        }

        component._scopeId = scope;

        return component
      }
      /* style inject */
      
      /* style inject SSR */
      

      
      var IconSmall = __vue_normalize__$3(
        { render: __vue_render__$3, staticRenderFns: __vue_staticRenderFns__$3 },
        __vue_inject_styles__$3,
        __vue_script__$3,
        __vue_scope_id__$3,
        __vue_is_functional_template__$3,
        __vue_module_identifier__$3,
        undefined,
        undefined
      );

    var Large = /** @class */ (function (_super) {
        __extends(Large, _super);
        function Large() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Large = __decorate([
            Component
        ], Large);
        return Large;
    }(Vue));

    /* script */
                const __vue_script__$4 = Large;
    /* template */
    var __vue_render__$4 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{attrs:{"xmlns":"http://www.w3.org/2000/svg","viewBox":"0 0 47.74 48.5"}},[_c('ellipse',{staticStyle:{"fill":"none","stroke":"#fff","stroke-linecap":"round","stroke-miterlimit":"10","stroke-width":"4px"},attrs:{"cx":"16.15","cy":"16","rx":"14.15","ry":"14"}}),_vm._v(" "),_c('path',{staticStyle:{"fill":"#fff","stroke":"#fff","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"6px"},attrs:{"d":"M26.89,27.7,44.74,45.5Z"}}),_vm._v(" "),_c('line',{staticStyle:{"fill":"none","stroke":"#fff","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2px"},attrs:{"x1":"11.15","y1":"16","x2":"21.15","y2":"16"}}),_vm._v(" "),_c('line',{staticStyle:{"fill":"none","stroke":"#fff","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2px"},attrs:{"x1":"16.15","y1":"21","x2":"16.15","y2":"11"}})])};
    var __vue_staticRenderFns__$4 = [];

      /* style */
      const __vue_inject_styles__$4 = undefined;
      /* scoped */
      const __vue_scope_id__$4 = "data-v-178ac528";
      /* module identifier */
      const __vue_module_identifier__$4 = undefined;
      /* functional template */
      const __vue_is_functional_template__$4 = false;
      /* component normalizer */
      function __vue_normalize__$4(
        template, style, script,
        scope, functional, moduleIdentifier,
        createInjector, createInjectorSSR
      ) {
        const component = (typeof script === 'function' ? script.options : script) || {};

        // For security concerns, we use only base name in production mode.
        component.__file = "large.vue";

        if (!component.render) {
          component.render = template.render;
          component.staticRenderFns = template.staticRenderFns;
          component._compiled = true;

          if (functional) component.functional = true;
        }

        component._scopeId = scope;

        return component
      }
      /* style inject */
      
      /* style inject SSR */
      

      
      var large = __vue_normalize__$4(
        { render: __vue_render__$4, staticRenderFns: __vue_staticRenderFns__$4 },
        __vue_inject_styles__$4,
        __vue_script__$4,
        __vue_scope_id__$4,
        __vue_is_functional_template__$4,
        __vue_module_identifier__$4,
        undefined,
        undefined
      );

    var Link = /** @class */ (function (_super) {
        __extends(Link, _super);
        function Link() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Link = __decorate([
            Component
        ], Link);
        return Link;
    }(Vue));

    /* script */
                const __vue_script__$5 = Link;
    /* template */
    var __vue_render__$5 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{attrs:{"xmlns":"http://www.w3.org/2000/svg","viewBox":"0 0 66 39"}},[_c('path',{staticStyle:{"fill":"none","stroke":"#fff","stroke-linecap":"round","stroke-miterlimit":"10","stroke-width":"4px"},attrs:{"d":"M22.39,37H14A12,12,0,0,1,2,25V14A12,12,0,0,1,14,2h8.39"}}),_vm._v(" "),_c('path',{staticStyle:{"fill":"none","stroke":"#fff","stroke-linecap":"round","stroke-miterlimit":"10","stroke-width":"4px"},attrs:{"d":"M42.54,2H52A12,12,0,0,1,64,14V25A12,12,0,0,1,52,37H42.54"}}),_vm._v(" "),_c('line',{staticStyle:{"fill":"none","stroke":"#fff","stroke-linecap":"round","stroke-miterlimit":"10","stroke-width":"4px"},attrs:{"x1":"18","y1":"19","x2":"47","y2":"19"}})])};
    var __vue_staticRenderFns__$5 = [];

      /* style */
      const __vue_inject_styles__$5 = undefined;
      /* scoped */
      const __vue_scope_id__$5 = "data-v-20132ad8";
      /* module identifier */
      const __vue_module_identifier__$5 = undefined;
      /* functional template */
      const __vue_is_functional_template__$5 = false;
      /* component normalizer */
      function __vue_normalize__$5(
        template, style, script,
        scope, functional, moduleIdentifier,
        createInjector, createInjectorSSR
      ) {
        const component = (typeof script === 'function' ? script.options : script) || {};

        // For security concerns, we use only base name in production mode.
        component.__file = "link.vue";

        if (!component.render) {
          component.render = template.render;
          component.staticRenderFns = template.staticRenderFns;
          component._compiled = true;

          if (functional) component.functional = true;
        }

        component._scopeId = scope;

        return component
      }
      /* style inject */
      
      /* style inject SSR */
      

      
      var IconLink = __vue_normalize__$5(
        { render: __vue_render__$5, staticRenderFns: __vue_staticRenderFns__$5 },
        __vue_inject_styles__$5,
        __vue_script__$5,
        __vue_scope_id__$5,
        __vue_is_functional_template__$5,
        __vue_module_identifier__$5,
        undefined,
        undefined
      );

    var defaultLabel = function () { return ({
        reset: "重置",
        link: "跳转",
        large: "放大",
        small: "缩小",
        close: "关闭"
    }); };
    var iBox = /** @class */ (function (_super) {
        __extends(iBox, _super);
        function iBox() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.scale = 1;
            _this.firstClickPosition = {
                x: 0,
                y: 0
            };
            _this.firstClickDomPosition = {
                x: 0,
                y: 0
            };
            _this.domPosotin = {
                x: 0,
                y: 0
            };
            _this.imgLoaded = false;
            _this.canMove = false;
            return _this;
        }
        iBox.prototype.openLink = function () {
            window.open(this.link);
        };
        iBox.prototype.close = function () {
            this.scale = 1;
            this.imgLoaded = false;
            this.$emit("close");
        };
        iBox.prototype.loaded = function () {
            this.imgLoaded = true;
        };
        iBox.prototype.noop = function () { };
        iBox.prototype.wheel = function (e) {
            e.preventDefault();
            var delta = e.deltaY | e.detail;
            if (delta < 0) {
                this.resize("small");
            }
            else {
                this.resize("large");
            }
        };
        iBox.prototype.resize = function (type, step) {
            if (step === void 0) { step = 0.1; }
            switch (type) {
                case "large":
                    this.scale += step;
                    if (this.scale > 2) {
                        this.scale = 2;
                    }
                    break;
                case "small":
                    this.scale -= step;
                    if (this.scale < 0.1) {
                        this.scale = 0.1;
                    }
                    break;
                case "reset":
                    this.domPosotin = {
                        x: 0,
                        y: 0
                    };
                    this.scale = 1;
                    break;
            }
        };
        iBox.prototype.down = function (e) {
            var img = this.$refs.img;
            if (e.touches) {
                e = e.touches[0];
            }
            this.firstClickPosition = {
                x: e.clientX,
                y: e.clientY
            };
            this.firstClickDomPosition = Object.assign({}, this.domPosotin);
            this.canMove = true;
        };
        iBox.prototype.move = function (e) {
            if (!this.canMove) {
                return;
            }
            if (e.touches) {
                e.preventDefault();
                e = e.touches[0];
            }
            var distanceX = e.clientX - this.firstClickPosition.x;
            var distanceY = e.clientY - this.firstClickPosition.y;
            this.domPosotin.x = this.firstClickDomPosition.x + distanceX;
            this.domPosotin.y = this.firstClickDomPosition.y + distanceY;
        };
        iBox.prototype.up = function (e) {
            this.canMove = false;
        };
        Object.defineProperty(iBox.prototype, "PositionStyle", {
            get: function () {
                return {
                    transform: "scale(" + this.scale + ")",
                    left: this.domPosotin.x + "px",
                    top: this.domPosotin.y + "px"
                };
            },
            enumerable: true,
            configurable: true
        });
        __decorate([
            Prop()
        ], iBox.prototype, "img", void 0);
        __decorate([
            Prop()
        ], iBox.prototype, "link", void 0);
        __decorate([
            Prop({ default: defaultLabel })
        ], iBox.prototype, "label", void 0);
        iBox = __decorate([
            Component({
                components: {
                    loading: loading,
                    redo: redo,
                    IconClose: IconClose,
                    IconSmall: IconSmall,
                    large: large,
                    IconLink: IconLink
                }
            })
        ], iBox);
        return iBox;
    }(Vue));

    /* script */
                const __vue_script__$6 = iBox;
    /* template */
    var __vue_render__$6 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.img),expression:"img"}],staticClass:"photo-box",on:{"mouseup":_vm.up,"touchend":_vm.up,"touchstart":_vm.down,"mousedown":_vm.down,"mousemove":_vm.move,"touchmove":_vm.move,"dragstart":function($event){$event.preventDefault();return _vm.noop($event)},"mousewheel":_vm.wheel}},[_c('div',{staticClass:"controll-bar"},[_c('div',{staticClass:"large",on:{"click":function($event){_vm.resize('reset');}}},[_c('redo'),_vm._v(" "),_c('span',[_vm._v(_vm._s(_vm.label.reset))])],1),_vm._v(" "),_c('div',{staticClass:"large",on:{"click":function($event){_vm.resize('large');}}},[_c('large'),_vm._v(" "),_c('span',[_vm._v(_vm._s(_vm.label.large))])],1),_vm._v(" "),_c('div',{staticClass:"small",on:{"click":function($event){_vm.resize('small');}}},[_c('icon-small'),_vm._v(" "),_c('span',[_vm._v(_vm._s(_vm.label.small))])],1),_vm._v(" "),_c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.link),expression:"link"}],staticClass:"link",on:{"click":_vm.openLink}},[_c('icon-link'),_vm._v(" "),_c('span',[_vm._v(_vm._s(_vm.label.link))])],1),_vm._v(" "),_c('div',{staticClass:"close",on:{"click":_vm.close}},[_c('icon-close'),_vm._v(" "),_c('span',[_vm._v(_vm._s(_vm.label.close))])],1)]),_vm._v(" "),_c('img',{directives:[{name:"show",rawName:"v-show",value:(_vm.imgLoaded),expression:"imgLoaded"}],style:(_vm.PositionStyle),attrs:{"src":_vm.img},on:{"load":_vm.loaded}}),_vm._v(" "),(!_vm.imgLoaded)?_c('div',{staticClass:"loading"},[_c('loading')],1):_vm._e()])};
    var __vue_staticRenderFns__$6 = [];

      /* style */
      const __vue_inject_styles__$6 = undefined;
      /* scoped */
      const __vue_scope_id__$6 = "data-v-261db7f4";
      /* module identifier */
      const __vue_module_identifier__$6 = undefined;
      /* functional template */
      const __vue_is_functional_template__$6 = false;
      /* component normalizer */
      function __vue_normalize__$6(
        template, style, script,
        scope, functional, moduleIdentifier,
        createInjector, createInjectorSSR
      ) {
        const component = (typeof script === 'function' ? script.options : script) || {};

        // For security concerns, we use only base name in production mode.
        component.__file = "iBox.vue";

        if (!component.render) {
          component.render = template.render;
          component.staticRenderFns = template.staticRenderFns;
          component._compiled = true;

          if (functional) component.functional = true;
        }

        component._scopeId = scope;

        return component
      }
      /* style inject */
      
      /* style inject SSR */
      

      
      var IBox = __vue_normalize__$6(
        { render: __vue_render__$6, staticRenderFns: __vue_staticRenderFns__$6 },
        __vue_inject_styles__$6,
        __vue_script__$6,
        __vue_scope_id__$6,
        __vue_is_functional_template__$6,
        __vue_module_identifier__$6,
        undefined,
        undefined
      );

    return IBox;

}(Vue));
//# sourceMappingURL=ibox.web.js.map
