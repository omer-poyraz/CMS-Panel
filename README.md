Example Page/Create

{
  "translations": [
    {
      "lang": "tr",
      "title": "Ana Sayfa",
      "slug": "ana-sayfa",
      "seoTitle": "Ana Sayfa - Şirket",
      "seoDescription": "Şirket ana sayfa açıklaması"
    },
    {
      "lang": "en",
      "title": "Home",
      "slug": "home",
      "seoTitle": "Home - Company",
      "seoDescription": "Company homepage description"
    }
  ],
  "sections": [
    {
      "type": "hero",
      "sort": 1,
      "fields": [
        { "lang": "tr", "key": "title", "value": "Hoşgeldiniz" },
        { "lang": "en", "key": "title", "value": "Welcome" },

        { "lang": "tr", "key": "subtitle", "value": "Bizimle büyüyün" },
        { "lang": "en", "key": "subtitle", "value": "Grow with us" },

        { "lang": "tr", "key": "buttonText", "value": "İletişime Geç" },
        { "lang": "en", "key": "buttonText", "value": "Contact Us" },

        { "lang": "tr", "key": "image", "value": "/img/hero.jpg" }
      ]
    },
    {
      "type": "features",
      "sort": 2,
      "items": [
        {
          "sort": 1,
          "fields": [
            { "lang": "tr", "key": "title", "value": "Hızlı" },
            { "lang": "en", "key": "title", "value": "Fast" },
            { "lang": "tr", "key": "description", "value": "Çok hızlıyız" },
            { "lang": "en", "key": "description", "value": "We are very fast" },
            { "lang": "tr", "key": "icon", "value": "rocket" }
          ]
        },
        {
          "sort": 2,
          "fields": [
            { "lang": "tr", "key": "title", "value": "Güvenli" },
            { "lang": "en", "key": "title", "value": "Secure" },
            { "lang": "tr", "key": "description", "value": "Verileriniz güvende" },
            { "lang": "en", "key": "description", "value": "Your data is safe" },
            { "lang": "tr", "key": "icon", "value": "shield" }
          ]
        }
      ]
    },
    {
      "type": "slider",
      "sort": 3,
      "items": [
        {
          "sort": 1,
          "fields": [
            { "lang": "tr", "key": "title", "value": "Proje 1" },
            { "lang": "en", "key": "title", "value": "Project 1" },
            { "lang": "tr", "key": "image", "value": "/img/slide1.jpg" }
          ]
        },
        {
          "sort": 2,
          "fields": [
            { "lang": "tr", "key": "title", "value": "Proje 2" },
            { "lang": "en", "key": "title", "value": "Project 2" },
            { "lang": "tr", "key": "image", "value": "/img/slide2.jpg" }
          ]
        }
      ]
    },
    {
      "type": "about",
      "sort": 4,
      "fields": [
        { "lang": "tr", "key": "title", "value": "Hakkımızda" },
        { "lang": "en", "key": "title", "value": "About Us" },

        { "lang": "tr", "key": "content", "value": "<p>Biz güçlü bir ekibiz</p>" },
        { "lang": "en", "key": "content", "value": "<p>We are a strong team</p>" },

        { "lang": "tr", "key": "image", "value": "/img/about.jpg" }
      ]
    },
    {
      "type": "testimonials",
      "sort": 5,
      "items": [
        {
          "sort": 1,
          "fields": [
            { "lang": "tr", "key": "name", "value": "Ahmet Yılmaz" },
            { "lang": "en", "key": "name", "value": "John Doe" },
            { "lang": "tr", "key": "comment", "value": "Harika hizmet!" },
            { "lang": "en", "key": "comment", "value": "Great service!" },
            { "lang": "tr", "key": "avatar", "value": "/img/user1.jpg" }
          ]
        }
      ]
    },
    {
      "type": "cta",
      "sort": 6,
      "fields": [
        { "lang": "tr", "key": "title", "value": "Hemen Başla" },
        { "lang": "en", "key": "title", "value": "Get Started" },

        { "lang": "tr", "key": "buttonText", "value": "Kayıt Ol" },
        { "lang": "en", "key": "buttonText", "value": "Sign Up" },

        { "lang": "tr", "key": "buttonLink", "value": "/register" }
      ]
    },
    {
      "type": "footer",
      "sort": 7,
      "fields": [
        { "lang": "tr", "key": "copyright", "value": "© 2026 Tüm hakları saklıdır" },
        { "lang": "en", "key": "copyright", "value": "© 2026 All rights reserved" },

        { "lang": "tr", "key": "address", "value": "İstanbul" },
        { "lang": "en", "key": "address", "value": "Istanbul" },

        { "lang": "tr", "key": "email", "value": "info@site.com" }
      ]
    }
  ]
}