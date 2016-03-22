/*
 * jQuery specifieke code omgezet naar vanilla javascript zodat de jQuery
 * library niet in hoeft geladen te worden. Dit scheelt een stuk in laadtijd.
**/
(function() {
    function init() {
        var links = document.querySelectorAll('a[data-url]');

        [].forEach.call(links, function(link) {
            link.addEventListener('click', function(event) {
                event.preventDefault();

                var url = event.currentTarget.getAttribute('data-url');
                var href = event.currentTarget.href;

                history.pushState(null, null, href);

                loadPage(url);
            });
        });

        window.addEventListener('popstate', function(event) {
            var url = '/api' + window.location.pathname;

            if (url === '/api/') {
                url = '/api/feed';
            }

            loadPage(url)
        });
    }

    function loadPage(url, href) {
        var wrapper = document.querySelector('.inner-wrapper');

        fetch(url)
            .then(function(response) {
              return response.text();
            })
            .then(function(text) {
                wrapper.innerHTML = text;
                ready();
            });
    }

    function feed() {
        var blazy = new Blazy();
    }

    function appearance() {
        // Appearance page
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
    }

    function ready() {
        init();

        if (window.location.pathname === '/') {
            feed();
        }

        // Credit: Robert van Steen
        if (/appearance/.test(window.location.href)) {
            appearance();
        }
    }

    document.addEventListener('DOMContentLoaded', function() {
        ready();
    }, false);
}());
