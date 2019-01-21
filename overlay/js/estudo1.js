var spl = {
    base_url: '//front.shopconvert.com.br',
    acc: false,
    cid: false,
    cid_views: false,
    cid_recommendation: false,
    cid_stock: false,
    cid_social: false,
    active: false,
    timer: false,
    sleep_time: 5,
    mouse_position: 0,
    exit_position: 10,
    exit_count: 0,
    exit_limit: 1,
    close_time: 720,
    cid_redirect: {},
    events: {},
    blockeds: [],
    spt_acc: false,
    spt_ref: false,
    rmd_times: 0,
    rmd_limit: 3,
    scroll_up_pos: 0,
    scroll_down_pos: 0,
    last_scroll: 0,
    init: function(data) {
        if (data.length == 0) {
            return false
        }
        if (typeof _st_app == 'undefined' && spl.acc == 94) {
            if (typeof cv_data !== 'undefined') {
                window._cv_data = cv_data
            }
            window._st_account = 34;
            var ss = document.createElement('script');
            ss.type = 'text/javascript';
            ss.async = true;
            ss.src = '//app.shoptarget.com.br/js/tracking.js';
            var sc = document.getElementsByTagName('script')[0];
            sc.parentNode.insertBefore(ss, sc)
        }
        setTimeout(function() {
            if (typeof _st_app.acc !== 'undefined' && typeof _st_app.ref !== 'undefined') {
                spl.spt_acc = _st_app.acc;
                spl.spt_ref = _st_app.ref
            }
        }, 1500);
        spl.events = data;
        for (var key in data) {
            var event = data[key];
            if (event.type == 'overlay' || event.type == 'views') {
                if (event.social == "sim" && spl.get_cookie('_spl_overlay_social') == "disabled") {} else {
                    if (event.redirect == 1) {
                        spl.cid_redirect[event.cid] = 1
                    }
                    if (event.social == "sim") {
                        spl.cid_social = event.cid
                    }
                    spl.create_backdrop();
                    spl.create_iframe(event)
                }
            } else if (event.type == 'stock') {
                spl.create_stock(event)
            }
        }
        if (spl.events.mouse_exit) {
            window.onmousemove = spl.mousemove
        }
        if (spl.events.idle_time) {
            spl.sleep_time = parseInt(spl.events.idle_time.value);
            spl.sleep();
            window.onkeypress = spl.keypress
        }
        if (spl.events.scroll_down || spl.events.scroll_up) {
            window.onscroll = spl.scroll;
            if (spl.events.scroll_down) {
                spl.scroll_down_pos = window.scrollY + parseInt(spl.events.scroll_down.value)
            }
            if (spl.events.scroll_up) {
                spl.scroll_up_pos = window.scrollY - parseInt(spl.events.scroll_up.value)
            }
        }
        if (spl.get_cookie('_spl_coupon')) {
            var coupon_params = spl.get_cookie('_spl_coupon').split("*|*");
            if (coupon_params.length >= 4) {
                if (String(top.location.href).search(coupon_params[0]) > -1) {
                    spl.addCoupon(coupon_params[1], coupon_params[2], coupon_params[3])
                }
            }
        }
    },
    create_backdrop: function() {
        if (!document.getElementById("m-backdrop")) {
            var backdrop = document.createElement("div");
            backdrop.id = "m-backdrop";
            backdrop.style.display = "none";
            backdrop.style.position = "fixed";
            backdrop.style.backgroundColor = "#000";
            backdrop.style.width = "100%";
            backdrop.style.height = document.body.scrollHeight + 'px';
            backdrop.style.left = "0px";
            backdrop.style.top = "0px";
            backdrop.style.zIndex = 2147483646;
            document.body.appendChild(backdrop)
        }
    },
    create_iframe: function(event) {
        if (!document.getElementById('f-content-' + event.cid)) {
            var iframe = document.createElement('iframe');
            iframe.id = 'f-content-' + event.cid;
            iframe.className = 'ifr-convert-box';
            iframe.style.border = 'none';
            iframe.style.position = 'fixed';
            iframe.style.display = "none";
            iframe.src = 'about:blank';
            iframe.style.zIndex = 2147483647;
            if (event.type == 'overlay') {
                iframe.style.left = '0px';
                iframe.style.top = '0px';
                iframe.style.width = '100%';
                iframe.style.height = window.innerHeight + 'px'
            } else if (event.type == 'views') {
                if (event.recommendation != "sim") {
                    iframe.style.right = '5px';
                    iframe.style.bottom = '5px';
                    iframe.style.width = '500px';
                    iframe.style.height = '100px';
                    spl.cid_views = event.cid
                } else {
                    iframe.style.left = '0px';
                    iframe.style.bottom = '0px';
                    iframe.style.width = '100%';
                    iframe.style.height = '265px';
                    spl.cid_recommendation = event.cid
                }
            }
            document.body.appendChild(iframe);
            var ref = spl.b64(location.href);
            spl.ajax(spl.base_url + '/tr/fc/' + spl.acc + '/' + event.cid + '/' + ref, spl.set_iframe)
        }
    },
    set_iframe: function(data) {
        var frame = document.getElementById('f-content-' + data.cid);
        frame.contentWindow.document.open();
        frame.contentWindow.document.write(data.html);
        frame.contentWindow.document.close()
    },
    sleep: function() {
        spl.timer = setTimeout(function() {
            if (spl.events.idle_time) {
                spl.show_overlay(spl.events.idle_time)
            }
        }, spl.sleep_time * 1000)
    },
    mousemove: function(event) {
        clearTimeout(spl.timer);
        if (event.clientY <= spl.exit_position && spl.mouse_position > spl.exit_position) {
            spl.exit_count++;
            if (spl.events.mouse_exit) {
                if (spl.exit_count === parseInt(spl.events.mouse_exit.value)) {
                    spl.show_overlay(spl.events.mouse_exit)
                }
            }
        }
        spl.sleep();
        spl.mouse_position = event.clientY
    },
    keypress: function(event) {
        clearTimeout(spl.timer);
        spl.sleep()
    },
    scroll: function() {
        var st = window.scrollY;
        if (st > spl.last_scroll) {
            var is_down = true
        } else {
            var is_down = false
        }
        var bodyHeight = document.body.scrollHeight;
        var offset = (window.innerHeight + window.scrollY);
        if (spl.events.scroll_up) {
            if (window.scrollY <= spl.scroll_up_pos && !is_down) {
                spl.show_overlay(spl.events.scroll_up);
                spl.scroll_up_pos = window.scrollY - parseInt(spl.events.scroll_up.value)
            } else if (is_down) {
                spl.scroll_up_pos = window.scrollY - parseInt(spl.events.scroll_up.value)
            }
        }
        if (spl.events.scroll_down) {
            if (offset >= spl.scroll_down_pos && is_down) {
                spl.show_overlay(spl.events.scroll_down);
                spl.scroll_down_pos = window.scrollY + parseInt(spl.events.scroll_down.value)
            } else if (!is_down) {
                spl.scroll_down_pos = window.scrollY + parseInt(spl.events.scroll_down.value)
            }
        }
        spl.last_scroll = st
    },
    show_overlay: function(data) {
        if (spl.blockeds.indexOf(data.cid) > -1) {
            return false
        } else {
            var close = spl.get_cookie('spl_close_' + data.cid);
            var pv = parseInt(spl.get_cookie('_spl_pv'));
            var data_pv = parseInt(data.page_views);
            if (spl.active === false && close === false && pv >= data_pv) {
                document.getElementById("f-content-" + data.cid).style.display = "block";
                try {
                    document.getElementById("f-content-" + data.cid).style.setProperty('display', 'block', 'important')
                } catch (e) {}
                var backdrop = document.getElementById("m-backdrop");
                if (data.opacity != "0.0" && data.opacity != "0.1") {
                    backdrop.style.opacity = data.opacity;
                    backdrop.style.display = 'block'
                } else {
                    backdrop.style.display = 'none'
                }
                spl.cid = data.cid;
                spl.close_time = (data.close_time / 60);
                spl.active = true;
                spl.view(data.cid);
                setTimeout(function() {
                    spl.set_cookie('spl_close_' + spl.cid, true, spl.close_time)
                }, 2500)
            }
        }
    },
    show_recommendation: function() {
        if (spl.get_cookie('_spl_close_rmd_' + spl.cid_recommendation) != "2") {
            document.getElementById("f-content-" + spl.cid_recommendation).style.display = "block";
            spl.view(spl.cid_recommendation)
        }
    },
    show_views: function() {
        if (spl.blockeds.indexOf(spl.cid_views) > -1) {
            return false
        } else {
            try {
                document.getElementById("f-content-" + spl.cid_views).style.display = "block"
            } catch (e) {}
            spl.view(spl.cid_views)
        }
    },
    close_views: function() {
        document.getElementById("f-content-" + spl.cid_views).outerHTML = ""
    },
    close: function() {
        if (spl.active || false !== true) {
            try {
                document.getElementById("f-content-" + spl.cid).style.setProperty('display', 'none', 'important')
            } catch (e) {}
            document.getElementById("m-backdrop").style.display = "none";
            document.getElementById("f-content-" + spl.cid).style.display = "none";
            spl.active = false;
            spl.set_cookie('spl_close_' + spl.cid, true, spl.close_time)
        } else {
            console.log("nao entrou")
        }
    },
    redirect: function() {
        if (spl.cid_redirect[spl.cid]) {
            if (/utm_/.test(location.search)) {
                var redirect = location.href.replace(/utm_source=.*?(&|$)/, "utm_source=ShopBack$1");
                if (location.href.indexOf('utm_medium') === -1) {
                    redirect = redirect + "&utm_medium=ShopConvert"
                } else {
                    redirect = redirect.replace(/utm_medium=.*?(&|$)/, "utm_medium=ShopConvert$1")
                }
            } else if (location.href.indexOf('?') === -1) {
                var redirect = location.href + '?utm_source=ShopBack&utm_medium=ShopConvert'
            } else {
                var redirect = location.href + '&utm_source=ShopBack&utm_medium=ShopConvert'
            }
            spl.set_cookie('_spl_tr', spl.cid, 720);
            location.href = redirect.split("#/cart").join("")
        }
    },
    link_transform: function(url) {
        if (/utm_/.test(url)) {
            var redirect = url.replace(/utm_source=.*?(&|$)/, "utm_source=ShopBack$1");
            if (url.indexOf('utm_medium') === -1) {
                redirect = redirect + "&utm_medium=ShopConvert_Recommendation"
            } else {
                redirect = redirect.replace(/utm_medium=.*?(&|$)/, "utm_medium=ShopConvert_Recommendation$1")
            }
        } else if (url.indexOf('?') === -1) {
            var redirect = url + '?utm_source=ShopBack&utm_medium=ShopConvert_Recommendation'
        } else {
            var redirect = url + '&utm_source=ShopBack&utm_medium=ShopConvert_Recommendation'
        }
        return redirect
    },
    is_mobile: function() {
        var a = navigator.userAgent || navigator.vendor || window.opera;
        if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) {
            return true
        } else {
            return false
        }
    },
    set_cookie: function(name, value, hours) {
        var date = new Date();
        var now = date.getTime();
        date.setTime(now + hours * 36e5);
        var expire = date.toUTCString();
        var dominio = location.host.replace(/^www\.|^m\.|^checkout\.|^loja\.|^cart\.|^carrinho\.|^seguro\.|^secure\.|^ssl\./, ".");
        document.cookie = name + "=" + value + "; expires=" + expire + "; domain=" + dominio + "; path=/"
    },
    get_cookie: function(name) {
        var c_value = document.cookie;
        var c_start = c_value.indexOf(name + "=");
        if (c_start === -1) {
            c_value = false
        } else {
            c_start = c_value.indexOf("=", c_start) + 1;
            var c_end = c_value.indexOf(";", c_start);
            if (c_end === -1) {
                c_end = c_value.length
            }
            c_value = unescape(c_value.substring(c_start, c_end))
        }
        return c_value
    },
    ajax: function(url, callback) {
        var cn = new window.XMLHttpRequest() || new window.ActiveXObject("Microsoft.XMLHTTP");
        cn.open('GET', url, true);
        cn.onreadystatechange = function() {
            if (cn.readyState === 4 && cn.status === 200) {
                if (callback) {
                    callback(JSON.parse(cn.response))
                }
            }
        };
        cn.send()
    },
    b64: function(data) {
        var b64 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
        var o1, o2, o3, h1, h2, h3, h4, bits, i = 0,
            ac = 0,
            enc = '',
            tmp_arr = [];
        if (!data) {
            return data
        }
        do {
            o1 = data.charCodeAt(i++);
            o2 = data.charCodeAt(i++);
            o3 = data.charCodeAt(i++);
            bits = o1 << 16 | o2 << 8 | o3;
            h1 = bits >> 18 & 0x3f;
            h2 = bits >> 12 & 0x3f;
            h3 = bits >> 6 & 0x3f;
            h4 = bits & 0x3f;
            tmp_arr[ac++] = b64.charAt(h1) + b64.charAt(h2) + b64.charAt(h3) + b64.charAt(h4)
        } while (i < data.length);
        enc = tmp_arr.join('');
        var r = data.length % 3;
        var str = (r ? enc.slice(0, r - 3) : enc) + '==='.slice(r || 3);
        return str.replace('/', '_')
    },
    view: function(cid) {
        var url = spl.base_url + '/tr/tv/' + spl.acc + '/' + cid;
        spl.ajax(url, false)
    },
    click: function(link) {
        var link = spl.b64(link);
        var url = spl.base_url + '/tr/tc/' + spl.acc + '/' + spl.cid + '/' + link;
        spl.ajax(url, false);
        spl.redirect()
    },
    click_only: function(link) {
        var link = spl.b64(link);
        var url = spl.base_url + '/tr/tc/' + spl.acc + '/' + spl.cid + '/' + link;
        spl.ajax(url, false)
    },
    create_stock: function(event) {
        if (!document.getElementById("spl-stock-code")) {
            var stock_code = document.createElement("div");
            stock_code.id = "spl-stock-code";
            document.body.appendChild(stock_code);
            spl.cid_stock = event.cid;
            var ref = spl.b64(location.href);
            spl.ajax(spl.base_url + '/tr/fc/' + spl.acc + '/' + event.cid + '/' + ref, spl.stock_data)
        }
    },
    stock_data: function(data) {
        var stock_code = document.getElementById("spl-stock-code");
        stock_code.innerHTML = data.html;
        eval(stock_code.firstChild.innerHTML)
    },
    set_stock: function(e, m, s) {
        var propCss = "";
        var arrowBg = "#FF7E00";
        var contentPadding = "10px 14px";
        for (var prop in s) {
            if (s.hasOwnProperty(prop)) {
                if (prop == "padding") {
                    contentPadding = s[prop]
                } else {
                    propCss += prop + ":" + s[prop] + ";";
                    if (prop == "background-color") {
                        arrowBg = s[prop]
                    }
                }
            }
        }
        if (document.getElementById("spl-popover")) {
            document.getElementsByClassName('popover-content')[0].innerHTML = m
        } else {
            var css = '#popover.bottom.show,#popover.right.show{opacity:1;visibility:visible}#popover.bottom.show{margin-top:10px}#popover.bottom.show .arrow{top:0}#popover{z-index:1060;display:block;opacity:0;visibility:hidden;max-width:300px;padding:1px;font-family:"Helvetica Neue",Helvetica,Arial,sans-serif;font-size:14px;font-style:normal;font-weight:700;line-height:1.42857143;background-color:#FF7E00;color:#FFF;border-radius:6px;box-shadow:0 2px 10px rgba(0,0,0,.2);transition:all .15s linear;' + propCss + '}#popover.bottom{margin-top:0}.popover-content{padding:' + contentPadding + '}.popover-content p{margin:0}#popover>.arrow,#popover>.arrow:after{position:absolute;display:block;width:0;height:0;border-color:transparent;border-style:solid}#popover>.arrow{border-width:11px}#popover>.arrow:after{content:"";border-width:10px}#popover.bottom>.arrow{top:-10px;left:50%;margin-left:-11px;border-top-width:0;transition:all .15s linear}#popover.bottom>.arrow:after{top:1px;margin-left:-10px;content:" ";border-top-width:0;border-bottom-color:' + arrowBg + '}#popover.right>.arrow{top:9px;left:-10px;margin-left:-11px;border-top-width:0}#popover.right>.arrow:after{left:1px;content:" ";border-right-color:' + arrowBg + ';border-left-width:0}';
            head = document.head || document.getElementsByTagName("head")[0], style = document.createElement("style");
            style.type = "text/css";
            if (style.styleSheet) {
                style.styleSheet.cssText = css
            } else {
                style.appendChild(document.createTextNode(css))
            }
            head.appendChild(style);
            e.onmouseover = spl.stock_onmouseover;
            e.onmouseout = spl.stock_onmouseout;
            var bodyRect = document.body.getBoundingClientRect(),
                elemRect = e.getBoundingClientRect(),
                offset_top = elemRect.top - bodyRect.top,
                offset_left = elemRect.left - bodyRect.left;
            var popover = document.createElement("div");
            popover.id = "spl-popover";
            popover.style.position = "absolute";
            popover.style.top = elemRect.top + e.offsetHeight + window.scrollY + "px";
            popover.style.left = elemRect.left + "px";
            document.body.insertBefore(popover, document.body.lastChild);
            document.getElementById("spl-popover").innerHTML = '<div id="popover" class="bottom">' + '<div class="arrow"></div>' + '<div class="popover-content">' + m + '</div>' + '</div>';
            var popover_width = document.getElementById("popover").offsetWidth;
            popover_width = (elemRect.left - (popover_width / 2)) + (e.offsetWidth / 2);
            document.getElementById("spl-popover").style.left = popover_width + "px"
        }
    },
    stock_onmouseover: function() {
        document.getElementById("popover").className = "bottom show";
        spl.view(spl.cid_stock)
    },
    stock_onmouseout: function() {
        document.getElementById("popover").className = "bottom"
    },
    simulateClick: function(elId) {
        var evt;
        if (elId.search(".") <= -1) {
            var el = document.getElementById(elId)
        } else {
            var el = document.getElementsByClassName(String(elId).split(".").join(""))
        }
        if (document.createEvent) {
            evt = document.createEvent("MouseEvents");
            evt.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null)
        }(evt) ? el.dispatchEvent(evt): (el.click && el.click())
    },
    addCoupon: function(v, i, b) {
        if (i.search(".") <= -1) {
            document.getElementById(i).value = v
        } else {
            document.getElementsByClassName(String(i).split(".").join("")).value = v
        }
        spl.simulateClick(b)
    },
    call_recommendation: function(div, limit) {
        if (String(top.location.href).indexOf("webmotors") <= -1) {
            return false
        }
        spl.rmd_limit = limit;
        var iframe = document.createElement('iframe');
        iframe.id = 'rcmd-dinamica';
        iframe.style.border = 'none';
        iframe.style.width = '100%';
        iframe.style.height = '412px';
        if (document.getElementById(div)) {
            document.getElementById(div).innerHTML = "";
            document.getElementById(div).appendChild(iframe)
        } else if (document.getElementsByClassName(div)[0]) {
            document.getElementsByClassName(div)[0].innerHTML = "";
            document.getElementsByClassName(div)[0].appendChild(iframe)
        } else {
            console.log("Erro ao encontrar elemento para renderizar recomendaÃ§Ã£o");
            return false
        }
        if (spl.is_mobile()) {
            var img_loader = '//i.imgur.com/sa56hsb.gif?1'
        } else {
            var img_loader = '//i.imgur.com/DRHxu3Y.gif'
        }
        var html = '<!DOCTYPE html><html lang="pt-br"><head><meta charset="UTF-8"><title>RecomendaÃ§Ã£o</title><link href="https://fonts.googleapis.com/css?family=Open+Sans:700,400"rel="stylesheet"type="text/css"><link rel="stylesheet" type="text/css" href="//app.shopconvert.com.br/assets/css/recomendacao.css?v=3.0"></head><body><section class="wrap" id="wrap" style="display:none;"><script>setTimeout(function(){ document.getElementById("wrap").style.display = "block"; }, 500);</script><span class="offers-icon"></span><span class="offers-messsage">Mensagem <strong>enviada</strong></span><strong class="offers-heading" align="center">Veja tambÃ©m essas ofertas!</strong><ul class="list-offers" id="list-offers"><center><img src="' + img_loader + '" style="margin:30px; width:64px;"></center></ul></section></body></html>';
        ifr_new = document.getElementById("rcmd-dinamica");
        setTimeout(function() {
            ifr_new.contentWindow.document.open();
            ifr_new.contentWindow.document.write(html);
            ifr_new.contentWindow.document.close();
            if (String(top.location.href).indexOf("webmotors") > -1) {
                window._st_account = 70
            }
            if (String(top.location.href).indexOf("meucarango") > -1) {
                window._st_account = 824
            }
            if (String(top.location.href).indexOf("compreauto") > -1) {
                window._st_account = 825
            }
            if (typeof _st_account !== 'undefined') {
                if (spl.is_mobile()) {
                    var product_id = typeof _idAnuncio != "undefined" ? _idAnuncio : null;
                    var product_title = _model + ' ' + _year + ' ' + _price
                } else {
                    var product_id = typeof dataLayer != "undefined" ? dataLayer[0].codAnuncio : null;
                    var product_title = String(document.getElementsByClassName("dis-tc")[0].innerHTML).replace(/<[^>]*>/g, '').replace(/(\r\n|\n|\r)/gm, "").replace(/\s+/g, " ").trim()
                }
                window.wbm_div = div;
                window.wbm_limit = limit;
                spl.ajax('https://api.sback.tech/v1/clients/56d484398a20ed6d221e935d/products/' + product_id + '/lookalike?limit=3&passback=' + encodeURIComponent(product_title), spl.callback_recommendation)
            } else {
                if (spl.rmd_times < 5) {
                    spl.rmd_times++;
                    console.log("Erro ao carregar recomendaÃ§Ã£o, tentando novamente em 3 segundos (" + spl.rmd_times + ")");
                    setTimeout(function() {
                        spl.call_recommendation(div, limit)
                    }, 3000)
                } else {
                    console.log("Erro ao carregar recomendaÃ§Ã£o, limite de tentativas esgotados.")
                }
            }
        }, 500)
    },
    callback_recommendation: function(response) {
        if (response.data == false) {
            return false
        }
        var data = response.data;
        var car_brands = ['CHEVROLET', 'FIAT', 'FORD', 'HONDA', 'HYUNDAI', 'MITSUBISHI', 'PEUGEOT', 'RENAULT', 'TOYOTA', 'VOLKSWAGEN', 'ACURA', 'ADAMO', 'AGRALE', 'ALFA ROMEO', 'AMERICAR', 'ASIA', 'ASTON MARTIN', 'AUDI', 'AUSTIN-HEALEY', 'AVALLONE', 'BAJA', 'BEACH', 'BENTLEY', 'BMW', 'BRM', 'BUGRE', 'BUGWAY', 'BUICK', 'CADILLAC', 'CAUYPE', 'CBT', 'CHAMONIX', 'CHANA', 'CHANGAN', 'CHERY', 'CHEVROLET', 'CHRYSLER', 'CITROÃ‹N', 'DACON', 'DAEWOO', 'DAIHATSU', 'DE SOTO', 'DE TOMASO', 'DKW-VEMAG', 'DODGE', 'EFFA', 'EMIS', 'ENGESA', 'ENVEMO', 'FARGO', 'FERCAR BUGGY', 'FERRARI', 'FIAT', 'FORD', 'FOTON', 'FYBER', 'GEELY', 'GEO', 'GMC', 'GURGEL', 'HAFEI', 'HONDA', 'HUMMER', 'HYUNDAI', 'INFINITI', 'INTERNATIONAL', 'IVECO', 'JAC', 'JAGUAR', 'JEEP', 'JINBEI', 'JPX', 'KIA', 'LADA', 'LAMBORGHINI', 'LAND ROVER', 'LANDWIND', 'LEXUS', 'LIFAN', 'LINCOLN', 'LOBINI', 'LOTUS', 'MAHINDRA', 'MARCOPOLO', 'MASERATI', 'MATRA', 'MAZDA', 'MCLAREN', 'MERCEDES-BENZ', 'MERCURY', 'MG', 'MINI', 'MITSUBISHI', 'MIURA', 'MORRIS', 'MP LAFER', 'NISSAN', 'OLDSMOBILE', 'OPEL', 'PAG', 'PEUGEOT', 'PLYMOUTH', 'PONTIAC', 'PORSCHE', 'PUMA', 'RELY', 'RENAULT', 'REVA-I', 'ROLLS-ROYCE', 'SAAB', 'SANTA MATILDE', 'SATURN', 'SEAT', 'SHELBY', 'SHINERAY', 'SMART', 'SSANGYONG', 'STUDEBAKER', 'SUBARU', 'SUZUKI', 'TAC', 'TOYOTA', 'TRIUMPH', 'TROLLER', 'VOLKSWAGEN', 'VOLVO', 'WAY BRASIL', 'WHIPPET', 'WILLYS', 'WILLYS OVERLAND'];
        var iframe = document.getElementById('rcmd-dinamica');
        var list = iframe.contentWindow.document.getElementById("list-offers");
        var html = "";
        for (var key = 0; key < spl.rmd_limit; key++) {
            var obj = data[key];
            for (var i = 0; i < car_brands.length; i++) {
                obj.title = String(obj.title).split(car_brands[i]).join('')
            }
            var max_length = 14;
            var trimmed_name = obj.title.substr(0, max_length);
            trimmed_name = trimmed_name.substr(0, Math.min(trimmed_name.length, trimmed_name.lastIndexOf(" ")));
            if (spl.is_mobile()) {
                html = html + '<li><a href="' + obj.link + '?utm_source=ShopBack&utm_medium=ShopRecommend&utm_campaign=Recomendacao_Pos_Lead_Mobile" onclick="javascript: top.spl.click_recommendation(\'' + obj.link + '?utm_source=ShopBack&utm_medium=ShopRecommend&utm_campaign=Recomendacao_Pos_Lead\', \'883\', false);" style="cursor:pointer;" target="_top"><img src="' + obj.images[0].replace("http://", "//") + '" class="offers-image" alt="' + obj.title + '"><span class="offers-name">' + trimmed_name + '</span><strong class="offers-price">R$ ' + spl.converterFloatReal(obj.price).split(",")[0] + '</strong></a></li>'
            } else {
                html = html + '<li><a href="' + obj.link + '?utm_source=ShopBack&utm_medium=ShopRecommend&utm_campaign=Recomendacao_Pos_Lead" onclick="javascript: top.spl.click_recommendation(\'' + obj.link + '?utm_source=ShopBack&utm_medium=ShopRecommend&utm_campaign=Recomendacao_Pos_Lead\', \'883\', false);" style="cursor:pointer;" target="_top"><img src="' + obj.images[0].replace("http://", "//") + '" class="offers-image" alt="' + obj.title + '"><span class="offers-name">' + trimmed_name + '</span><strong class="offers-price">R$ ' + spl.converterFloatReal(obj.price).split(",")[0] + '</strong></a></li>'
            }
        }
        try {
            list.innerHTML = html
        } catch (e) {
            spl.callback_recommendation(response);
            return false
        }
        spl.view(883)
    },
    click_recommendation: function(page, cid, redirect) {
        var link = spl.b64(page);
        var url = spl.base_url + '/tr/tc/' + spl.acc + '/' + cid + '/' + link;
        spl.ajax(url, false);
        spl.set_cookie('_spl_tr', spl.cid, 720);
        if (redirect) {
            setTimeout(function() {
                top.location.href = page
            }, 500)
        }
    },
    converterFloatReal: function(valor) {
        var inteiro = null,
            decimal = null,
            c = null,
            j = null;
        var aux = new Array();
        valor = "" + valor;
        c = valor.indexOf(".", 0);
        if (c > 0) {
            inteiro = valor.substring(0, c);
            decimal = valor.substring(c + 1, valor.length);
            if (decimal.length === 1) {
                decimal += "0"
            }
        } else {
            inteiro = valor
        }
        for (j = inteiro.length, c = 0; j > 0; j -= 3, c++) {
            aux[c] = inteiro.substring(j - 3, j)
        }
        inteiro = "";
        for (c = aux.length - 1; c >= 0; c--) {
            inteiro += aux[c] + '.'
        }
        inteiro = inteiro.substring(0, inteiro.length - 1);
        decimal = parseInt(decimal);
        if (isNaN(decimal)) {
            decimal = "00"
        } else {
            decimal = "" + decimal;
            if (decimal.length === 1) {
                decimal = "0" + decimal
            }
        }
        valor = inteiro + "," + decimal;
        return valor
    }
};
(function() {
    if (spl.is_mobile()) {
        return false
    }
    var pv = spl.get_cookie('_spl_pv');
    if (pv >= 1) {
        pv++;
        spl.set_cookie('_spl_pv', pv, 720)
    } else {
        spl.set_cookie('_spl_pv', 1, 720)
    }
    spl.acc = _acc || false;
    if (spl.acc) {
        if (spl.get_cookie('_spl_debug') == "yes") {
            var ref = spl.b64(location.href + "?debug_teste")
        } else {
            try {
                if (String(top.location.href).indexOf("?debug_teste") > -1) {
                    spl.set_cookie('_spl_debug', "yes", 720)
                }
            } catch (e) {}
            var ref = spl.b64(location.href)
        }
        var url = spl.base_url + '/tr/rc/' + spl.acc + '/' + ref;
        spl.ajax(url, spl.init)
    }
})();
(function() {
    var e = document.createElement("script");
    e.type = "text/javascript";
    e.async = true;
    e.src = "//poscompra.shopconvert.com.br/js/cm.js";
    var t = document.getElementsByTagName("script")[0];
    t.parentNode.insertBefore(e, t)
})();