document.addEventListener('DOMContentLoaded', function() {
    var D = SITE_DATA;

    // ===== Fill site data from data.js =====
    function setText(id, text) {
        var el = document.getElementById(id);
        if (el) el.textContent = text;
    }
    function setHtml(id, html) {
        var el = document.getElementById(id);
        if (el) el.innerHTML = html;
    }
    function setHref(id, href) {
        var el = document.getElementById(id);
        if (el) el.href = href;
    }

    // Hero
    setText('hero-name', D.restaurantName);
    setText('hero-tagline', 'ก๋วยเตี๋ยว ข้าวหมูแดง หมูกรอบ ข้าวมันไก่ อาหารตามสั่ง');
    setText('hero-lunchbox', 'รับทำข้าวกล่อง ราคาเป็นกันเอง');
    setText('hero-since', D.since);
    if (D.mapUrl) {
        setHtml('hero-location', '<a href="' + D.mapUrl + '" target="_blank" style="color:inherit;text-decoration:underline">📍 ' + D.location + ' (ดูแผนที่)</a>');
    } else {
        setText('hero-location', '📍 ' + D.location);
    }
    var phoneBtn = document.getElementById('hero-phone');
    if (phoneBtn) {
        phoneBtn.textContent = '📞 โทรสั่ง ' + D.phone;
        phoneBtn.href = 'tel:' + D.phone.replace(/-/g, '');
    }

    // Header
    setText('header-name', D.restaurantName);
    setText('header-since', D.since);

    // About
    setText('about-title', D.aboutTitle);
    setText('about-text1', D.aboutText1);
    setText('about-text2', D.aboutText2);

    // Order
    var orderPhone = document.getElementById('order-phone');
    if (orderPhone) orderPhone.href = 'tel:' + D.phone.replace(/-/g, '');
    setText('order-phone-number', D.phone);
    var searchText = 'ค้นหา "' + D.deliverySearch + '"';
    setText('order-grab', searchText);
    setText('order-robinhood', searchText);
    setText('order-foodpanda', searchText);

    // Contact
    if (D.mapUrl) {
        setHtml('contact-address', '<a href="' + D.mapUrl + '" target="_blank">' + D.address + ' (ดูแผนที่)</a>');
    } else {
        setText('contact-address', D.address);
    }
    setText('contact-hours', D.openHours);
    var contactPhone = document.getElementById('contact-phone');
    if (contactPhone) {
        contactPhone.textContent = D.phone;
        contactPhone.href = 'tel:' + D.phone.replace(/-/g, '');
    }

    // Social links
    var socialGrid = document.getElementById('social-grid');
    if (socialGrid) {
        var socials = '';
        if (D.facebookUrl) {
            socials += '<a href="' + D.facebookUrl + '" target="_blank" class="social-card facebook">'
                + '<span class="social-icon">f</span><span>Facebook</span></a>';
        }
        if (D.wongnaiUrl) {
            socials += '<a href="' + D.wongnaiUrl + '" target="_blank" class="social-card wongnai">'
                + '<span class="social-icon">W</span><span>Wongnai</span></a>';
        }
        if (D.lineOaUrl) {
            socials += '<a href="' + D.lineOaUrl + '" target="_blank" class="social-card line">'
                + '<span class="social-icon">L</span><span>LINE OA</span></a>';
        }
        socialGrid.innerHTML = socials;
    }

    // Footer
    setText('footer-name', D.restaurantName);
    setText('footer-tagline', D.tagline);
    setText('footer-location', '📍 ' + D.location);
    var footerPhone = document.getElementById('footer-phone');
    if (footerPhone) {
        footerPhone.textContent = D.phone;
        footerPhone.href = 'tel:' + D.phone.replace(/-/g, '');
    }

    // ===== Build Menu from data.js =====
    var menuGrid = document.getElementById('menu-grid');
    if (menuGrid && D.menu) {
        var html = '';
        for (var i = 0; i < D.menu.length; i++) {
            var item = D.menu[i];
            html += '<div class="menu-card" data-category="' + item.category + '">'
                + '<div class="menu-card-img">' + item.emoji + '</div>'
                + '<div class="menu-card-info">'
                + '<h3>' + item.name + '</h3>'
                + '<p>' + item.desc + '</p>'
                + '<span class="price">' + item.price + '</span>'
                + (item.popular ? '<span class="badge popular">ยอดนิยม</span>' : '')
                + '</div></div>';
        }
        menuGrid.innerHTML = html;
    }

    // ===== Menu Filter =====
    var filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(function(btn) {
        btn.addEventListener('click', function() {
            var filter = this.getAttribute('data-filter');
            filterBtns.forEach(function(b) { b.classList.remove('active'); });
            this.classList.add('active');

            var filters = filter.split(',');
            var cards = document.querySelectorAll('.menu-card');
            cards.forEach(function(card) {
                if (filter === 'all' || filters.indexOf(card.getAttribute('data-category')) !== -1) {
                    card.style.display = 'flex';
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(10px)';
                    setTimeout(function() {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                        card.style.transition = 'all 0.3s ease';
                    }, 50);
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // ===== Mobile Menu =====
    var menuToggle = document.querySelector('.menu-toggle');
    var nav = document.querySelector('.nav');
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            nav.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });
    }
    document.querySelectorAll('.nav a').forEach(function(link) {
        link.addEventListener('click', function() {
            nav.classList.remove('active');
            if (menuToggle) menuToggle.classList.remove('active');
        });
    });

    // ===== Smooth Scroll =====
    var header = document.querySelector('.header');
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
        anchor.addEventListener('click', function(e) {
            var href = this.getAttribute('href');
            if (href === '#') return;
            e.preventDefault();
            var target = document.querySelector(href);
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - header.offsetHeight,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ===== Header Shadow on Scroll =====
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.style.boxShadow = '0 2px 20px rgba(0,0,0,0.15)';
        } else {
            header.style.boxShadow = '0 2px 12px rgba(0,0,0,0.1)';
        }
    });

    // ===== Scroll Animation =====
    var observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    setTimeout(function() {
        document.querySelectorAll('.menu-card, .order-card, .contact-item, .social-card').forEach(function(el) {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'all 0.5s ease';
            observer.observe(el);
        });
    }, 100);
});
