// Exemplo de include no GTm

<script type="text/javascript">
    var _acc = 37;
    var cv_data = {
        'order_id': 0,      /* Id da compra */
        'valor': 0         /* Valor da conversão */
    };
    (function () {
        var ss = document.createElement('script');
        ss.type = 'text/javascript';
        ss.async = true;
        ss.src = '//app.shopconvert.com.br/js/conversion/v1.js';
        var sc = document.getElementsByTagName('script')[0];
        sc.parentNode.insertBefore(ss, sc);
    })();               
</script>