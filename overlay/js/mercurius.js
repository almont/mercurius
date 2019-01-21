/**

    Why?
    https://pt.wikipedia.org/wiki/Merc%C3%BArio_(mitologia)


    Devs:
    Andre Monteiro <andre.monteiro@rappbrasil.com.br>
    Walter Neto <walter.neto@rappbrasil.com.br>


    TO-DO:
    - Clean code
    - Implement dynamic campaigns
    - Black background opacity
    - Find how hide iframe source
    - 

*/


"use strict";

var merx = {
    
    //frame: "http://www.clientstorage.com.br/rapp/mercurius/iframe_td.html",
    frame: "http://www.clientstorage.com.br/rapp/mercurius/iframe_mo.html",
    depth: 999999999,
    
    init: function () {
        
        console.log("Mercurius is running...");
        console.log("Campaign name: " + m_campaignName);
        console.log("Campaign ID: " + m_campaignID);
        
        // Create Overlay
        merx.createOverlay();
        
        // Create event
        merx.postMessage();
    },
    
    createOverlay: function () {
        
        if (!document.getElementById("m_blackground")) {
            
            var blackground = document.createElement("div");
            blackground.id = "m_blackground";
            blackground.style.display = "none";
            blackground.style.position = "fixed";
            blackground.style.backgroundColor = "#000";
            //blackground.style.opacity = 0.9;
            blackground.style.width = "100%";
            blackground.style.height = document.body.scrollHeight + 'px';
            blackground.style.top = "0px";
            blackground.style.left = "0px";
            blackground.style.zIndex = merx.depth++;
            document.body.appendChild(blackground);
        }
        
        if (!document.getElementById("m_iframe")) {
            
            var iframe = document.createElement("iframe");
            iframe.id = "m_iframe";
            iframe.src = "about:blank";
            //iframe.src = merx.frame;
            iframe.style.border = "none";
            iframe.style.position = "fixed";
            iframe.style.overflow = "hidden";
            iframe.style.width = "600px";
            iframe.style.height = "300px";
            iframe.style.left = "50%";
            iframe.style.top = "50%";
            iframe.style.marginLeft = "-300px";
            iframe.style.marginTop = "-150px";
            iframe.style.zIndex = merx.depth++;
            iframe.setAttribute("src", merx.frame);
            document.getElementById("m_blackground").appendChild(iframe);
        }
        
        if (!document.getElementById("m_bt_close")) {
            
            var img = document.createElement("img"); 
            img.id = "m_bt_close";
            img.src = "http://www.clientstorage.com.br/rapp/mercurius/bt_close.png";
            img.style.position = "fixed";
            img.style.width = "38px";
            img.style.height = "38px";
            img.style.left = "50%";
            img.style.top = "50%";
            img.style.marginLeft = "284px";
            img.style.marginTop = "-174px";
            img.style.cursor = "pointer";
            img.onclick = function () { merx.hideOverlay() };
            img.style.zIndex = merx.depth++;
            document.getElementById("m_blackground").appendChild(img);
        }
    },
    
    showOverlay: function () {
        if (document.getElementById("m_blackground")) {
            document.getElementById("m_blackground").style.display = "block";
        }
    },
    
    hideOverlay: function () {
        if (document.getElementById("m_blackground")) {
            document.getElementById("m_blackground").style.display = "none";
        } 
    },
    
    constructURL: function (params) {
        
        var campaign = params[0];
        var redirURL = params[1] || window.location.href;
        
        
        if (!RegExp("\\?", "g").test(redirURL)) {
            
            redirURL = redirURL + "?utm_source=mercurius&utm_medium=overlay&utm_campaign=" + campaign;
        } else {
            
            // utm_source
            if (RegExp("utm_source=.*?(&|$)", "ig").test(redirURL)) {
                
                redirURL = redirURL.replace(RegExp("utm_source=.*?(&|$)", "ig"), "utm_source=mercurius$1");
            } else {
                
                redirURL = redirURL + "&utm_source=mercurius";
            }
            
            // utm_medium
            if (RegExp("utm_medium=.*?(&|$)", "ig").test(redirURL)) {
                
                redirURL = redirURL.replace(RegExp("utm_medium=.*?(&|$)", "ig"), "utm_medium=overlay$1");
            } else {
                
                redirURL = redirURL + "&utm_medium=overlay";
            }
            
            // utm_campaign
            if (RegExp("utm_campaign=.*?(&|$)", "ig").test(redirURL)) {
                
                redirURL = redirURL.replace(RegExp("utm_campaign=.*?(&|$)", "ig"), "utm_campaign=" + campaign + "$1");
            } else {
                
                redirURL = redirURL + "&utm_campaign=" + campaign;
            }
        }
        
        
        return redirURL;
    },
    
    callbackOverlay: function (params) {
        
        console.log("redirect to: " + merx.constructURL(params));
        
        window.location.href = merx.constructURL(params);
    },
    
    postMessage: function () {
        
        if (window.addEventListener) {
            
            window.addEventListener("message", listener);
        } else {
            // IE8
            window.attachEvent("onmessage", listener);
        }
        
        function listener(e) {
            
            // Need to implement security, create a list of trusted domain
            //data.origin
            
            console.log("postMessage");
            console.log(e);
            merx.callbackOverlay(e.data);
        }
        
    }
    
};


(function(){
    
    window.onload = function () {
        
        // Building Mercurius
        merx.init();
        
        
        // 
        var show = false;
        
        // http://stackoverflow.com/questions/923299/how-can-i-detect-when-the-mouse-leaves-the-window
        // Detect on mouse out
        setTimeout(function () {
            document.onmouseout = function() {
                //console.log("mouse out - show overlay");
                if (!show) merx.showOverlay(); show = true;
            }
        }, 5000);
        //}, 0);
    }
})();