/*
 * jQuery specifieke code omgezet naar vanilla javascript zodat de jQuery
 * library niet in hoeft geladen te worden. Dit scheelt een stuk in laadtijd.
**/
document.addEventListener('DOMContentLoaded', function() {
    var products = document.querySelectorAll('.product');

    products[0].classList.add('product-active');

    var firstIndicator = document.querySelector('.product-indicator[data-uuid="' + products[0].dataset.uuid + '"]');

    firstIndicator.classList.add('product-indicator-active');

    var indicators = document.querySelectorAll('.product-indicator');

    [].forEach.call(indicators, function(indicator) {
        indicator.addEventListener('click', function(event) {
            var id = event.target.dataset.uuid;

            var currentIndicatorActive = document.querySelector('.product-indicator-active');
            currentIndicatorActive.classList.remove('product-indicator-active');

            var newIndicatorActive = event.target;
            newIndicatorActive.classList.add('product-indicator-active');

            var currentActive = document.querySelector('.product-active');
            currentActive.classList.remove('product-active');

            var newActive = document.querySelector('.product[data-uuid="' + id + '"]');
            newActive.classList.add('product-active');
        });
    });
}, false);
