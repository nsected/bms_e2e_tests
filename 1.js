
var options = {
    access_token: xuoomSuf9oOyt5qc5uq2e2lLZdT80OUK,
    theme : {
        foreground: "green",
        background: "light"
    },
    target_element: "#XS-pay2play-widget"
};
var s = document.createElement("script");
s.type = "text/javascript";
s.async = true;
s.src = "//static.xsolla.com/embed/pay2play/2.1.2/widget.min.js";
s.addEventListener("load", function (e) {
    var widgetInstance = XPay2PlayWidget.create(options);
}, false);
var head = document.getElementsByTagName("head")[0];
head.appendChild(s);