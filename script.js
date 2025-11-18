const defaultConfig = {
      background_color: "#f8f9fa",
      surface_color: "#ffffff",
      text_color: "#1f2937",
      primary_action_color: "#3b82f6",
      secondary_action_color: "#8b5cf6",
      navbar_background: "#ffffff",
      hero_background: "#f0f9ff",
      site_title: "Denz.store",
      hero_title: "Top Up Game Termurah & Tercepat",
      hero_subtitle: "Dapatkan diamond favoritmu dengan proses instan!",
      games_heading: "Pilih Game Favoritmu",
      payment_heading: "Metode Pembayaran",
      footer_text: "© 2024 Denz.store. All rights reserved.",
      font_family: "Inter",
      font_size: 16
    };

    let selectedPackage = null;
    let selectedPayment = null;
    let currentGame = null;
    let isUserIdValid = false;
    let isZoneIdValid = false;

    const gameIdValidation = {
      freefire: {
        pattern: /^\d{8,12}$/,
        helper: "Contoh: 123456789 (8-12 digit angka)",
        description: "User ID Free Fire terdiri dari 8-12 digit angka"
      },
      mobilelegends: {
        pattern: /^\d{6,10}$/,
        helper: "Contoh: 12345678 (6-10 digit angka)",
        description: "User ID Mobile Legends terdiri dari 6-10 digit angka",
        zonePattern: /^\d{4}$/,
        zoneHelper: "Zone ID terdiri dari 4 digit angka"
      },
      pubg: {
        pattern: /^\d{10,12}$/,
        helper: "Contoh: 5123456789 (10-12 digit angka)",
        description: "User ID PUBG Mobile terdiri dari 10-12 digit angka"
      }
    };

    const gamePackages = {
      freefire: [
        { diamonds: "50", price: 5000 },
        { diamonds: "100", price: 10000 },
        { diamonds: "210", price: 20000 },
        { diamonds: "355", price: 35000 },
        { diamonds: "720", price: 70000 },
        { diamonds: "1450", price: 140000 }
      ],
      mobilelegends: [
        { diamonds: "86", price: 20000 },
        { diamonds: "172", price: 40000 },
        { diamonds: "257", price: 60000 },
        { diamonds: "344", price: 80000 },
        { diamonds: "429", price: 100000 },
        { diamonds: "706", price: 165000 }
      ],
      pubg: [
        { diamonds: "60 UC", price: 15000 },
        { diamonds: "325 UC", price: 80000 },
        { diamonds: "660 UC", price: 160000 },
        { diamonds: "1800 UC", price: 420000 },
        { diamonds: "3850 UC", price: 900000 },
        { diamonds: "8100 UC", price: 1900000 }
      ]
    };

    function validateUserId() {
      const userId = document.getElementById('userId').value.trim();
      const validation = gameIdValidation[currentGame];
      
      const userIdInput = document.getElementById('userId');
      const helperText = document.getElementById('userIdHelper');
      const errorText = document.getElementById('userIdError');
      const successText = document.getElementById('userIdSuccess');
      
      helperText.style.display = 'none';
      errorText.style.display = 'none';
      successText.style.display = 'none';
      
      if (!userId) {
        helperText.style.display = 'block';
        userIdInput.style.borderColor = '#e5e7eb';
        isUserIdValid = false;
        checkFormValid();
        return;
      }
      
      if (validation.pattern.test(userId)) {
        successText.style.display = 'block';
        userIdInput.style.borderColor = '#10b981';
        isUserIdValid = true;
      } else {
        errorText.style.display = 'block';
        errorText.textContent = '❌ ' + validation.description;
        userIdInput.style.borderColor = '#ef4444';
        isUserIdValid = false;
      }
      
      checkFormValid();
    }

    function validateZoneId() {
      const zoneId = document.getElementById('zoneId').value.trim();
      const validation = gameIdValidation[currentGame];
      
      const zoneIdInput = document.getElementById('zoneId');
      const helperText = document.getElementById('zoneIdHelper');
      const errorText = document.getElementById('zoneIdError');
      const successText = document.getElementById('zoneIdSuccess');
      
      helperText.style.display = 'none';
      errorText.style.display = 'none';
      successText.style.display = 'none';
      
      if (!zoneId) {
        helperText.style.display = 'block';
        zoneIdInput.style.borderColor = '#e5e7eb';
        isZoneIdValid = false;
        checkFormValid();
        return;
      }
      
      if (validation.zonePattern.test(zoneId)) {
        successText.style.display = 'block';
        zoneIdInput.style.borderColor = '#10b981';
        isZoneIdValid = true;
      } else {
        errorText.style.display = 'block';
        errorText.textContent = '❌ ' + validation.zoneHelper;
        zoneIdInput.style.borderColor = '#ef4444';
        isZoneIdValid = false;
      }
      
      checkFormValid();
    }

    function openGameModal(gameName, gameKey) {
      currentGame = gameKey;
      document.getElementById('modalGameTitle').textContent = gameName;
      document.getElementById('gameModal').classList.add('active');
      
      const validation = gameIdValidation[gameKey];
      document.getElementById('userIdHelper').textContent = validation.helper;
      document.getElementById('userIdHelper').style.display = 'block';
      
      if (gameKey === 'mobilelegends') {
        document.getElementById('zoneIdContainer').style.display = 'block';
      } else {
        document.getElementById('zoneIdContainer').style.display = 'none';
      }
      
      renderPackages(gameKey);
      resetForm();
    }

    function closeGameModal() {
      document.getElementById('gameModal').classList.remove('active');
      resetForm();
    }

    function renderPackages(gameKey) {
      const packageList = document.getElementById('packageList');
      packageList.innerHTML = '';
      
      gamePackages[gameKey].forEach((pkg, index) => {
        const pkgDiv = document.createElement('div');
        pkgDiv.className = 'diamond-package';
        pkgDiv.setAttribute('data-index', index);
        pkgDiv.style.cssText = `
          padding: 16px;
          border: 2px solid #e5e7eb;
          border-radius: 12px;
          text-align: center;
          cursor: pointer;
        `;
        
        pkgDiv.innerHTML = `
          <div style="font-size: 28px; margin-bottom: 8px;">💎</div>
          <div style="font-weight: bold; margin-bottom: 4px;">${pkg.diamonds}</div>
          <div style="font-size: 14px; font-weight: 600;">Rp ${pkg.price.toLocaleString('id-ID')}</div>
        `;
        
        pkgDiv.onclick = () => selectPackage(index, gameKey);
        packageList.appendChild(pkgDiv);
      });
    }

    function selectPackage(index, gameKey) {
      document.querySelectorAll('.diamond-package').forEach(el => {
        el.classList.remove('selected');
        el.style.borderColor = '#e5e7eb';
      });
      
      const selected = document.querySelector(`.diamond-package[data-index="${index}"]`);
      selected.classList.add('selected');
      
      selectedPackage = gamePackages[gameKey][index];
      updateOrderSummary();
      checkFormValid();
    }

    function selectPayment(method) {
      document.querySelectorAll('.payment-btn').forEach(btn => {
        btn.style.borderColor = '#e5e7eb';
        btn.style.backgroundColor = 'white';
      });
      
      const selected = document.querySelector(`[data-payment="${method}"]`);
      selected.style.borderColor = window.elementSdk?.config?.primary_action_color || defaultConfig.primary_action_color;
      selected.style.backgroundColor = (window.elementSdk?.config?.primary_action_color || defaultConfig.primary_action_color) + '15';
      
      selectedPayment = method;
      updateOrderSummary();
      checkFormValid();
    }

    function updateOrderSummary() {
      if (selectedPackage && selectedPayment) {
        document.getElementById('orderSummary').style.display = 'block';
        document.getElementById('summaryPackage').textContent = selectedPackage.diamonds;
        document.getElementById('summaryPayment').textContent = selectedPayment;
        document.getElementById('summaryTotal').textContent = `Rp ${selectedPackage.price.toLocaleString('id-ID')}`;
        
        const summaryBg = window.elementSdk?.config?.hero_background || defaultConfig.hero_background;
        document.getElementById('orderSummary').style.backgroundColor = summaryBg;
      } else {
        document.getElementById('orderSummary').style.display = 'none';
      }
    }

    function checkFormValid() {
      const needsZoneId = currentGame === 'mobilelegends';
      
      const isValid = isUserIdValid && selectedPackage && selectedPayment && (!needsZoneId || isZoneIdValid);
      
      const submitBtn = document.getElementById('submitOrderBtn');
      if (isValid) {
        submitBtn.disabled = false;
        submitBtn.style.opacity = '1';
        submitBtn.style.cursor = 'pointer';
        submitBtn.style.backgroundColor = window.elementSdk?.config?.primary_action_color || defaultConfig.primary_action_color;
      } else {
        submitBtn.disabled = true;
        submitBtn.style.opacity = '0.5';
        submitBtn.style.cursor = 'not-allowed';
        submitBtn.style.backgroundColor = window.elementSdk?.config?.text_color || defaultConfig.text_color;
      }
    }

    function submitOrder() {
      if (document.getElementById('submitOrderBtn').disabled) return;
      
      closeGameModal();
      document.getElementById('successModal').classList.add('active');
    }

    function closeSuccessModal() {
      document.getElementById('successModal').classList.remove('active');
    }

    function resetForm() {
      document.getElementById('userId').value = '';
      document.getElementById('zoneId').value = '';
      selectedPackage = null;
      selectedPayment = null;
      isUserIdValid = false;
      isZoneIdValid = false;
      
      document.getElementById('userId').style.borderColor = '#e5e7eb';
      document.getElementById('zoneId').style.borderColor = '#e5e7eb';
      
      document.getElementById('userIdHelper').style.display = 'none';
      document.getElementById('userIdError').style.display = 'none';
      document.getElementById('userIdSuccess').style.display = 'none';
      document.getElementById('zoneIdHelper').style.display = 'none';
      document.getElementById('zoneIdError').style.display = 'none';
      document.getElementById('zoneIdSuccess').style.display = 'none';
      
      document.querySelectorAll('.diamond-package').forEach(el => {
        el.classList.remove('selected');
        el.style.borderColor = '#e5e7eb';
      });
      
      document.querySelectorAll('.payment-btn').forEach(btn => {
        btn.style.borderColor = '#e5e7eb';
        btn.style.backgroundColor = 'white';
      });
      
      document.getElementById('orderSummary').style.display = 'none';
      checkFormValid();
    }

    document.getElementById('userId').addEventListener('input', validateUserId);
    document.getElementById('zoneId').addEventListener('input', validateZoneId);

    async function onConfigChange(config) {
      const baseSize = config.font_size || defaultConfig.font_size;
      const customFont = config.font_family || defaultConfig.font_family;
      const baseFontStack = 'system-ui, -apple-system, sans-serif';
      const fontFamily = `${customFont}, ${baseFontStack}`;

      document.body.style.fontFamily = fontFamily;
      document.body.style.backgroundColor = config.background_color || defaultConfig.background_color;
      document.body.style.color = config.text_color || defaultConfig.text_color;
      
      const navbar = document.getElementById('navbar');
      navbar.style.backgroundColor = config.navbar_background || defaultConfig.navbar_background;
      navbar.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.05)';
      
      const navLinks = navbar.querySelectorAll('a');
      navLinks.forEach(link => {
        link.style.color = config.text_color || defaultConfig.text_color;
        link.style.fontSize = `${baseSize}px`;
      });

      document.getElementById('site-title').textContent = config.site_title || defaultConfig.site_title;
      document.getElementById('site-title').style.color = config.text_color || defaultConfig.text_color;
      document.getElementById('site-title').style.fontSize = `${baseSize * 1.5}px`;

      const heroSection = document.querySelector('section');
      heroSection.style.backgroundColor = config.hero_background || defaultConfig.hero_background;
      
      document.getElementById('hero-title').textContent = config.hero_title || defaultConfig.hero_title;
      document.getElementById('hero-title').style.color = config.text_color || defaultConfig.text_color;
      document.getElementById('hero-title').style.fontFamily = fontFamily;
      document.getElementById('hero-title').style.fontSize = `${baseSize * 3}px`;
      
      document.getElementById('hero-subtitle').textContent = config.hero_subtitle || defaultConfig.hero_subtitle;
      document.getElementById('hero-subtitle').style.color = config.text_color || defaultConfig.text_color;
      document.getElementById('hero-subtitle').style.fontSize = `${baseSize * 1.25}px`;

      const featureBadges = heroSection.querySelectorAll('div[style*="border-radius: 8px"]');
      featureBadges.forEach(badge => {
        badge.style.backgroundColor = config.surface_color || defaultConfig.surface_color;
        badge.style.color = config.text_color || defaultConfig.text_color;
      });

      document.getElementById('games-heading').textContent = config.games_heading || defaultConfig.games_heading;
      document.getElementById('games-heading').style.color = config.text_color || defaultConfig.text_color;
      document.getElementById('games-heading').style.fontFamily = fontFamily;
      document.getElementById('games-heading').style.fontSize = `${baseSize * 2.25}px`;

      const gameCards = document.querySelectorAll('.game-card');
      gameCards.forEach(card => {
        card.style.backgroundColor = config.surface_color || defaultConfig.surface_color;
        const cardPadding = card.querySelector('div[style*="padding: 24px"]');
        if (cardPadding) {
          const h4 = cardPadding.querySelector('h4');
          const p = cardPadding.querySelector('p');
          const span = cardPadding.querySelector('span[style*="font-weight: bold"]');
          const button = cardPadding.querySelector('button');
          
          if (h4) {
            h4.style.color = config.text_color || defaultConfig.text_color;
            h4.style.fontSize = `${baseSize * 1.5}px`;
          }
          if (p) {
            p.style.color = config.text_color || defaultConfig.text_color;
            p.style.fontSize = `${baseSize}px`;
          }
          if (span) {
            span.style.color = config.text_color || defaultConfig.text_color;
            span.style.fontSize = `${baseSize * 1.125}px`;
          }
          if (button) {
            button.style.backgroundColor = config.primary_action_color || defaultConfig.primary_action_color;
            button.style.color = config.surface_color || defaultConfig.surface_color;
            button.style.fontSize = `${baseSize}px`;
          }
        }
      });

      document.getElementById('payment-heading').textContent = config.payment_heading || defaultConfig.payment_heading;
      document.getElementById('payment-heading').style.color = config.text_color || defaultConfig.text_color;
      document.getElementById('payment-heading').style.fontFamily = fontFamily;
      document.getElementById('payment-heading').style.fontSize = `${baseSize * 2.25}px`;

      const paymentCards = document.querySelectorAll('.payment-card');
      paymentCards.forEach(card => {
        card.style.backgroundColor = config.surface_color || defaultConfig.surface_color;
        const h4 = card.querySelector('h4');
        const p = card.querySelector('p');
        if (h4) {
          h4.style.color = config.text_color || defaultConfig.text_color;
          h4.style.fontSize = `${baseSize * 1.25}px`;
        }
        if (p) {
          p.style.color = config.text_color || defaultConfig.text_color;
          p.style.fontSize = `${baseSize * 0.875}px`;
        }
      });

      const processSection = document.getElementById('process');
      const processHeading = processSection.querySelector('h3');
      if (processHeading) {
        processHeading.style.color = config.text_color || defaultConfig.text_color;
        processHeading.style.fontFamily = fontFamily;
        processHeading.style.fontSize = `${baseSize * 2.25}px`;
      }

      const processSteps = document.querySelectorAll('.process-step');
      processSteps.forEach(step => {
        const circle = step.querySelector('div[style*="border-radius: 50%"]');
        const h4 = step.querySelector('h4');
        const p = step.querySelector('p');
        
        if (circle) {
          circle.style.backgroundColor = config.surface_color || defaultConfig.surface_color;
        }
        if (h4) {
          h4.style.color = config.text_color || defaultConfig.text_color;
          h4.style.fontSize = `${baseSize * 1.125}px`;
        }
        if (p) {
          p.style.color = config.text_color || defaultConfig.text_color;
          p.style.fontSize = `${baseSize * 0.875}px`;
        }
      });

      const footer = document.querySelector('footer');
      footer.style.backgroundColor = config.surface_color || defaultConfig.surface_color;
      
      document.getElementById('footer-text').textContent = config.footer_text || defaultConfig.footer_text;
      document.getElementById('footer-text').style.color = config.text_color || defaultConfig.text_color;
      document.getElementById('footer-text').style.fontSize = `${baseSize}px`;

      const footerLinks = footer.querySelectorAll('a');
      footerLinks.forEach(link => {
        link.style.color = config.text_color || defaultConfig.text_color;
        link.style.fontSize = `${baseSize}px`;
      });

      const modalContent = document.querySelectorAll('.modal-content');
      modalContent.forEach(modal => {
        modal.style.backgroundColor = config.surface_color || defaultConfig.surface_color;
        modal.style.color = config.text_color || defaultConfig.text_color;
      });

      const closeButtons = document.querySelectorAll('.modal-content button');
      closeButtons.forEach(btn => {
        if (btn.textContent === '✕') {
          btn.style.backgroundColor = config.hero_background || defaultConfig.hero_background;
          btn.style.color = config.text_color || defaultConfig.text_color;
        } else if (btn.textContent === 'Tutup') {
          btn.style.backgroundColor = config.primary_action_color || defaultConfig.primary_action_color;
          btn.style.color = config.surface_color || defaultConfig.surface_color;
        }
      });
    }

    if (window.elementSdk) {
      window.elementSdk.init({
        defaultConfig,
        onConfigChange,
        mapToCapabilities: (config) => ({
          recolorables: [
            {
              get: () => config.background_color || defaultConfig.background_color,
              set: (value) => {
                config.background_color = value;
                window.elementSdk.setConfig({ background_color: value });
              }
            },
            {
              get: () => config.surface_color || defaultConfig.surface_color,
              set: (value) => {
                config.surface_color = value;
                window.elementSdk.setConfig({ surface_color: value });
              }
            },
            {
              get: () => config.text_color || defaultConfig.text_color,
              set: (value) => {
                config.text_color = value;
                window.elementSdk.setConfig({ text_color: value });
              }
            },
            {
              get: () => config.primary_action_color || defaultConfig.primary_action_color,
              set: (value) => {
                config.primary_action_color = value;
                window.elementSdk.setConfig({ primary_action_color: value });
              }
            }
          ],
          borderables: [],
          fontEditable: {
            get: () => config.font_family || defaultConfig.font_family,
            set: (value) => {
              config.font_family = value;
              window.elementSdk.setConfig({ font_family: value });
            }
          },
          fontSizeable: {
            get: () => config.font_size || defaultConfig.font_size,
            set: (value) => {
              config.font_size = value;
              window.elementSdk.setConfig({ font_size: value });
            }
          }
        }),
        mapToEditPanelValues: (config) => new Map([
          ["site_title", config.site_title || defaultConfig.site_title],
          ["hero_title", config.hero_title || defaultConfig.hero_title],
          ["hero_subtitle", config.hero_subtitle || defaultConfig.hero_subtitle],
          ["games_heading", config.games_heading || defaultConfig.games_heading],
          ["payment_heading", config.payment_heading || defaultConfig.payment_heading],
          ["footer_text", config.footer_text || defaultConfig.footer_text]
        ])
      });

      onConfigChange(window.elementSdk.config);
    } else {
      onConfigChange(defaultConfig);
    }
