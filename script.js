/* ==========================================
   HILAL MODA — JavaScript
   Kadın Tesettür Moda Sitesi
   ========================================== */

// ===== STATE =====
let cart = [];
let cartOpen = false;
let currentSlide = 0;
let slideTimer = null;

// ===== PRODUCT DATA =====
const products = [
    {
        name: "Süleymaniye Altın Nakışlı Ceket & Palazzo Takım",
        mosque: "Süleymaniye Koleksiyonu (İstanbul)",
        price: 1299,
        oldPrice: 1799,
        desc: "Süleymaniye Camii'nin tarihi mermer avlusundan ve klasik taş oymalarından ilham alan, el işlemeli altın sırma nakışlı lacivert kısa ceket ve dökümlü geniş paça palazzo pantolon takımı. 24 ayar altın sarısı varak işlemeleriyle zarif ve asil tesettür kombini.",
        img: "images/suleymaniye_takim_front.jpg",
        backImg: "images/suleymaniye_takim_back.jpg",
        detailImg: "images/suleymaniye_ceket_detay.jpg",
        colors: ["Lacivert", "Bordo", "Zümrüt"],
        sizes: ["XS", "S", "M", "L", "XL"],
        badge: "Yeni Sezon"
    },
    {
        name: "Topkapı Sarayı Gece Asaleti Kruvaze Takım",
        mosque: "Topkapı Sarayı (İstanbul)",
        price: 1699,
        oldPrice: 2199,
        desc: "Topkapı Sarayı'nın divan ihtişamından esinlenen, gece laciverti dökümlü kruvaze blazer ceket, palazzo pantolon ve desenli saray fuları kombini. Kusursuz duruş ve asil kumaş dokusu.",
        img: "images/koleksiyon/urun_2.jpg",
        backImg: "images/koleksiyon/detay_2.jpg",
        detailImg: "images/koleksiyon/detay_2.jpg",
        colors: ["Gece Laciverti", "Siyah", "Bordo"],
        sizes: ["S", "M", "L", "XL", "2XL"],
        badge: "En Çok Satan"
    },
    {
        name: "Sultanahmet İpek Varaklı Saray Takımı",
        mosque: "Sultanahmet Koleksiyonu (İstanbul)",
        price: 1499,
        oldPrice: null,
        desc: "Sultanahmet mimarisinin sıcak taş tonlarından ilham alan, zarif kemer detaylı ceket ve akıcı palazzo pantolon kombinasyonu. Işıltılı ve ferah Osmanlı tesettür zarafeti.",
        img: "images/koleksiyon/urun_1.jpg",
        backImg: "images/koleksiyon/detay_1.jpg",
        detailImg: "images/koleksiyon/detay_1.jpg",
        colors: ["Krem Bej", "Kahve", "Gece Mavisi"],
        sizes: ["S", "M", "L", "XL", "2XL"],
        badge: "Yeni Sezon"
    },
    {
        name: "Selimiye Kum Beji İpek Kaftan Takım",
        mosque: "Selimiye Camii (Edirne)",
        price: 1399,
        oldPrice: 1899,
        desc: "Mimar Sinan'ın başyapıtı Selimiye'nin mermer kubbelerinden esinlenen duru krem ve kum beji tonlarında lüks ipek kaftan takım. Dökümlü ve akıcı zarafet.",
        img: "images/koleksiyon/urun_3.jpg",
        backImg: "images/koleksiyon/detay_3.jpg",
        detailImg: "images/koleksiyon/detay_3.jpg",
        colors: ["Kum Beji", "Siyah", "Altın"],
        sizes: ["XS", "S", "M", "L", "XL"],
        badge: "%25 İndirim"
    },
    {
        name: "Bursa Yeşil Türbe Kehribar & Altın Takım",
        mosque: "Yeşil Türbe (Bursa)",
        price: 1599,
        oldPrice: null,
        desc: "Bursa ipekçilik mirasının altın varak ve sıcak kehribar tonlarıyla harmanlandığı, özel dokuma asil tesettür takım. Her adımda zarafet sunar.",
        img: "images/koleksiyon/urun_4.jpg",
        backImg: "images/koleksiyon/detay_4.jpg",
        detailImg: "images/koleksiyon/detay_4.jpg",
        colors: ["Kehribar", "Krem", "Lacivert"],
        sizes: ["XS", "S", "M", "L", "XL", "2XL"],
        badge: null
    },
    {
        name: "Konya Mevlana Zümrüt & Yakut Dökümlü Abaya",
        mosque: "Mevlana Türbesi (Konya)",
        price: 1749,
        oldPrice: 2299,
        desc: "Mevlevi tezhip sanatının derin tonlarını taşıyan, akıcı kumaş yapısı ve saray nakışlarıyla sınırlı üretim saray abayası.",
        img: "images/koleksiyon/urun_5.jpg",
        backImg: "images/koleksiyon/detay_5.jpg",
        detailImg: "images/koleksiyon/detay_5.jpg",
        colors: ["Gece Mavisi", "Kiremit Yakut", "Altın"],
        sizes: ["S", "M", "L", "XL"],
        badge: "Sınırlı Üretim"
    }
];

// ===== DOM READY =====
document.addEventListener('DOMContentLoaded', () => {
    initNavbar();
    initHamburger();
    initSearch();
    initFilterTabs();
    initScrollReveal();
    initWishlistButtons();
    initSizeButtons();
    initSlideshow();
    initColorDots();
    updateCartUI();
});

// ===== HERO SLIDESHOW =====
function initSlideshow() {
    const slides = document.querySelectorAll('.hero-slide');
    const thumbs = document.querySelectorAll('.hero-thumb-btn');
    if (!slides.length) return;

    function activateSlide(index) {
        slides.forEach(s => s.classList.remove('active'));
        thumbs.forEach(t => t.classList.remove('active'));
        slides[index].classList.add('active');
        if (thumbs[index]) thumbs[index].classList.add('active');
        currentSlide = index;
    }

    function nextSlide() {
        const next = (currentSlide + 1) % slides.length;
        activateSlide(next);
    }

    slideTimer = setInterval(nextSlide, 5000);

    const showcase = document.querySelector('.hero-showcase');
    if (showcase) {
        showcase.addEventListener('mouseenter', () => clearInterval(slideTimer));
        showcase.addEventListener('mouseleave', () => {
            slideTimer = setInterval(nextSlide, 5000);
        });
    }
}

function goSlide(index) {
    clearInterval(slideTimer);
    const slides = document.querySelectorAll('.hero-slide');
    const thumbs = document.querySelectorAll('.hero-thumb-btn');
    slides.forEach(s => s.classList.remove('active'));
    thumbs.forEach(t => t.classList.remove('active'));
    if (slides[index]) slides[index].classList.add('active');
    if (thumbs[index]) thumbs[index].classList.add('active');
    currentSlide = index;
    slideTimer = setInterval(() => {
        goSlide((currentSlide + 1) % slides.length);
    }, 5000);
}

// ===== COLOR DOTS =====
function initColorDots() {
    document.querySelectorAll('.product-colors').forEach(group => {
        group.querySelectorAll('.color-dot').forEach(dot => {
            dot.addEventListener('click', () => {
                group.querySelectorAll('.color-dot').forEach(d => d.classList.remove('color-active'));
                dot.classList.add('color-active');
            });
        });
    });
}

// ===== NAVBAR SCROLL =====
function initNavbar() {
    const navbar = document.getElementById('navbar');
    const annBar = document.getElementById('announcementBar');
    
    function handleScroll() {
        const scrollY = window.scrollY;
        if (scrollY > 60) {
            navbar.classList.add('scrolled');
            navbar.style.top = '0';
        } else {
            navbar.classList.remove('scrolled');
            if (annBar && annBar.style.display !== 'none') {
                navbar.style.top = (annBar.offsetHeight) + 'px';
            }
        }
    }

    // Initial offset for announcement bar
    if (annBar) {
        navbar.style.top = annBar.offsetHeight + 'px';
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
}

// ===== HAMBURGER MENU =====
function initHamburger() {
    const hamburger = document.getElementById('hamburger');
    const navLinks  = document.getElementById('navLinks');

    hamburger.addEventListener('click', () => {
        const isOpen = navLinks.classList.toggle('open');
        hamburger.setAttribute('aria-expanded', isOpen);
        
        // Animate hamburger
        const spans = hamburger.querySelectorAll('span');
        if (isOpen) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity   = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
        } else {
            spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
        }
    });

    // Close on nav link click
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('open');
            hamburger.querySelectorAll('span').forEach(s => {
                s.style.transform = '';
                s.style.opacity   = '';
            });
        });
    });
}

// ===== SEARCH =====
function initSearch() {
    const searchBtn     = document.getElementById('searchBtn');
    const searchOverlay = document.getElementById('searchOverlay');
    const searchInput   = document.getElementById('searchInput');

    searchBtn.addEventListener('click', () => {
        searchOverlay.classList.toggle('active');
        if (searchOverlay.classList.contains('active')) {
            setTimeout(() => searchInput.focus(), 100);
        }
    });
}

function closeSearch() {
    document.getElementById('searchOverlay').classList.remove('active');
}

// ===== FILTER TABS =====
function initFilterTabs() {
    const tabs  = document.querySelectorAll('.filter-tab');
    const cards = document.querySelectorAll('.product-card');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            const filter = tab.dataset.filter;

            cards.forEach(card => {
                const cat = card.dataset.category;
                if (filter === 'all' || cat === filter) {
                    card.style.display = '';
                    setTimeout(() => { card.style.opacity = '1'; card.style.transform = ''; }, 10);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.95)';
                    setTimeout(() => { card.style.display = 'none'; }, 300);
                }
            });
        });
    });
}

// ===== SCROLL REVEAL =====
function initScrollReveal() {
    const els = document.querySelectorAll(
        '.collection-card, .product-card, .why-card, .testimonial-card, .section-header'
    );

    els.forEach((el, i) => {
        el.classList.add('reveal');
        el.style.transitionDelay = (i % 4 * 0.1) + 's';
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    els.forEach(el => observer.observe(el));
}

// ===== WISHLIST BUTTONS =====
function initWishlistButtons() {
    document.querySelectorAll('.product-wishlist').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const svg  = btn.querySelector('svg');
            const fill = btn.getAttribute('data-active') === 'true';

            if (!fill) {
                svg.setAttribute('fill', '#c9a84c');
                svg.setAttribute('stroke', '#c9a84c');
                btn.setAttribute('data-active', 'true');
                showToast('❤️ Favorilere eklendi!');
            } else {
                svg.setAttribute('fill', 'none');
                svg.setAttribute('stroke', 'currentColor');
                btn.setAttribute('data-active', 'false');
                showToast('💔 Favorilerden çıkarıldı');
            }
        });
    });
}

// ===== SIZE BUTTONS =====
function initSizeButtons() {
    document.querySelectorAll('.size-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const siblings = btn.closest('.size-grid').querySelectorAll('.size-btn');
            siblings.forEach(s => s.classList.remove('active'));
            btn.classList.add('active');
        });
    });
}

// ===== MODAL =====
function openModal(index) {
    const p       = products[index];
    const overlay = document.getElementById('modalOverlay');
    const content = document.getElementById('modalContent');

    const priceHTML = p.oldPrice
        ? `<span class="price-old" style="display:block;margin-bottom:4px">${p.oldPrice.toLocaleString('tr-TR')}₺</span>
           <span class="price-new">${p.price.toLocaleString('tr-TR')}₺</span>`
        : `<span class="price-new">${p.price.toLocaleString('tr-TR')}₺</span>`;

    const sizesHTML = p.sizes.map(s =>
        `<button class="size-btn" onclick="this.closest('.size-grid').querySelectorAll('.size-btn').forEach(b=>b.classList.remove('active'));this.classList.add('active')">${s}</button>`
    ).join('');

    let thumbsHTML = `
        <div class="modal-thumbs" style="display:flex;gap:8px;margin-top:12px;">
            <img src="${p.img}" alt="Ön" class="modal-thumb active" style="width:60px;height:75px;object-fit:cover;border-radius:6px;cursor:pointer;border:2px solid var(--gold-main)" onclick="changeModalImg(this, '${p.img}')">
            ${p.backImg ? `<img src="${p.backImg}" alt="Arka" class="modal-thumb" style="width:60px;height:75px;object-fit:cover;border-radius:6px;cursor:pointer;border:2px solid rgba(255,255,255,0.2)" onclick="changeModalImg(this, '${p.backImg}')">` : ''}
            ${p.detailImg ? `<img src="${p.detailImg}" alt="Detay" class="modal-thumb" style="width:60px;height:75px;object-fit:cover;border-radius:6px;cursor:pointer;border:2px solid rgba(255,255,255,0.2)" onclick="changeModalImg(this, '${p.detailImg}')">` : ''}
        </div>
    `;

    content.innerHTML = `
        <div class="modal-gallery">
            <img id="modalMainImg" src="${p.img}" alt="${p.name}" class="modal-img"
                 onerror="this.style.background='linear-gradient(135deg,#1a1a2a,#2d2d4a)';this.removeAttribute('src')">
            ${thumbsHTML}
        </div>
        <div class="modal-info">
            <div class="product-mosque"><span class="mosque-icon">🕌</span> ${p.mosque}</div>
            <h2>${p.name}</h2>
            <div class="modal-price-area">${priceHTML}</div>
            <p>${p.desc}</p>
            <div class="modal-sizes">
                <label>Beden Seçin</label>
                <div class="size-grid">${sizesHTML}</div>
            </div>
            <button class="modal-add-btn" onclick="addToCart('${p.name}', ${p.price}); closeModal()">
                🛍️ Sepete Ekle
            </button>
        </div>
    `;

    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function changeModalImg(thumb, src) {
    const mainImg = document.getElementById('modalMainImg');
    if (mainImg) mainImg.src = src;
    thumb.closest('.modal-thumbs').querySelectorAll('.modal-thumb').forEach(t => {
        t.style.borderColor = 'rgba(255,255,255,0.2)';
    });
    thumb.style.borderColor = 'var(--gold-main)';
}

function closeModal(e) {
    if (e && e.target !== document.getElementById('modalOverlay')) return;
    document.getElementById('modalOverlay').classList.remove('active');
    document.body.style.overflow = '';
}

// Escape key closes modal
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        document.getElementById('modalOverlay').classList.remove('active');
        document.body.style.overflow = '';
    }
});

// ===== CART =====
function addToCart(name, price) {
    const existing = cart.find(item => item.name === name);
    if (existing) {
        existing.qty++;
    } else {
        cart.push({ name, price, qty: 1 });
    }
    updateCartUI();
    showToast(`✓ "${name.split(' ').slice(0,3).join(' ')}..." sepete eklendi!`);
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartUI();
    renderCartItems();
}

function updateCartUI() {
    const totalQty = cart.reduce((s, i) => s + i.qty, 0);
    const count    = document.getElementById('cartCount');
    
    if (totalQty > 0) {
        count.textContent = totalQty;
        count.classList.add('active');
    } else {
        count.classList.remove('active');
    }

    document.getElementById('cartItemCount').textContent = `(${totalQty} Ürün)`;
    renderCartItems();
}

function renderCartItems() {
    const container = document.getElementById('cartItems');
    const footer    = document.getElementById('cartFooter');

    if (cart.length === 0) {
        container.innerHTML = `
            <div class="cart-empty">
                <div class="cart-empty-icon">🛍️</div>
                <p>Sepetiniz boş</p>
                <a href="#urunler" onclick="toggleCart()">Alışverişe Başla →</a>
            </div>`;
        footer.style.display = 'none';
        return;
    }

    const total = cart.reduce((s, i) => s + i.price * i.qty, 0);

    container.innerHTML = cart.map((item, i) => `
        <div class="cart-item">
            <div class="cart-item-img" style="background:linear-gradient(135deg,#1a1a2a,#2d2d3a);display:flex;align-items:center;justify-content:center;font-size:1.5rem">
                🕌
            </div>
            <div>
                <div class="cart-item-name">${item.name}</div>
                <div class="cart-item-price">${(item.price * item.qty).toLocaleString('tr-TR')}₺</div>
                ${item.qty > 1 ? `<div style="font-size:0.72rem;color:#666">${item.qty} adet</div>` : ''}
            </div>
            <button class="cart-item-remove" onclick="removeFromCart(${i})" aria-label="Kaldır">✕</button>
        </div>
    `).join('');

    document.getElementById('cartTotal').textContent = total.toLocaleString('tr-TR') + '₺';
    footer.style.display = 'block';
}

function toggleCart() {
    cartOpen = !cartOpen;
    const sidebar  = document.getElementById('cartSidebar');
    const backdrop = document.getElementById('cartBackdrop');

    sidebar.classList.toggle('open', cartOpen);
    backdrop.classList.toggle('active', cartOpen);
    document.body.style.overflow = cartOpen ? 'hidden' : '';
}

document.getElementById('cartBtn').addEventListener('click', toggleCart);

// ===== TOAST =====
function showToast(message) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.classList.add('active');
    clearTimeout(toast._timer);
    toast._timer = setTimeout(() => toast.classList.remove('active'), 3000);
}

// ===== NEWSLETTER =====
function handleNewsletter(e) {
    e.preventDefault();
    const email = document.getElementById('newsletterEmail').value;
    showToast(`✓ "${email}" başarıyla abone oldu!`);
    e.target.reset();
}

// ===== SMOOTH HERO PARALLAX =====
window.addEventListener('scroll', () => {
    const heroImg = document.querySelector('.hero-img');
    if (!heroImg) return;
    const scrollY = window.scrollY;
    if (scrollY < window.innerHeight) {
        heroImg.style.transform = `scale(1.08) translateY(${scrollY * 0.2}px)`;
    }
}, { passive: true });

// ===== CURSOR GLOW EFFECT (desktop) =====
if (window.innerWidth > 1024) {
    const glow = document.createElement('div');
    glow.style.cssText = `
        position: fixed; pointer-events: none; z-index: 9999;
        width: 300px; height: 300px; border-radius: 50%;
        background: radial-gradient(circle, rgba(201,168,76,0.04) 0%, transparent 70%);
        transform: translate(-50%, -50%);
        transition: left 0.15s ease, top 0.15s ease;
    `;
    document.body.appendChild(glow);

    document.addEventListener('mousemove', (e) => {
        glow.style.left = e.clientX + 'px';
        glow.style.top  = e.clientY + 'px';
    }, { passive: true });
}

// ===== PRODUCT CARD HOVER TILT =====
document.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect   = card.getBoundingClientRect();
        const x      = (e.clientX - rect.left) / rect.width  - 0.5;
        const y      = (e.clientY - rect.top)  / rect.height - 0.5;
        card.style.transform = `
            translateY(-6px)
            rotateX(${-y * 4}deg)
            rotateY(${x * 4}deg)
        `;
        card.style.perspective = '1000px';
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform   = '';
        card.style.perspective = '';
    });
});

// ===== COUNTER ANIMATION =====
function animateCounter(el, target, suffix = '') {
    let current = 0;
    const step  = target / 60;
    const timer = setInterval(() => {
        current += step;
        if (current >= target) {
            el.textContent = target.toLocaleString('tr-TR') + suffix;
            clearInterval(timer);
        } else {
            el.textContent = Math.floor(current).toLocaleString('tr-TR') + suffix;
        }
    }, 16);
}

const statsObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const stats = entry.target.querySelectorAll('.stat-num');
        stats.forEach(stat => {
            const text = stat.textContent;
            const num  = parseInt(text.replace(/[^0-9]/g, ''));
            const suf  = text.replace(/[0-9.,]/g, '');
            if (!isNaN(num)) animateCounter(stat, num, suf);
        });
        statsObs.unobserve(entry.target);
    });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) statsObs.observe(heroStats);

console.log('%c☽ Hilal Moda %c— Osmanlı Zarafeti, Modern Tesettür', 
    'color:#c9a84c;font-size:1.2rem;font-weight:bold',
    'color:#f0e8d0;font-size:0.9rem'
);
