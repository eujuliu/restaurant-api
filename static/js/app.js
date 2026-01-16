const API_BASE_URL = '/api/v1';

const AppState = {
  isAuthenticated: false,
  user: null,
  products: [],
  addresses: [],
  currentPage: 'dashboard',
  editingAddressId: null,
};

const API = {
  async request(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      credentials: 'include',
      ...options,
    };

    try {
      const response = await fetch(url, config);

      const contentType = response.headers.get('content-type');
      let data = null;

      if (contentType && contentType.includes('application/json')) {
        data = await response.json();
      }

      if (!response.ok) {
        throw {
          status: response.status,
          message: data?.message || 'An error occurred',
          action: data?.action || 'Please try again',
        };
      }

      return { success: true, data, status: response.status };
    } catch (error) {
      if (error.status) {
        throw error;
      }
      throw {
        status: 500,
        message: error.message || 'Network error',
        action: 'Please check your connection',
      };
    }
  },

  async login(email, password) {
    return this.request('/user', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  },

  async register(userData) {
    return this.request('/users', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  },

  async changePassword(currentPassword, newPassword) {
    return this.request('/user/security', {
      method: 'PUT',
      body: JSON.stringify({ currentPassword, newPassword }),
    });
  },

  async getProducts() {
    return this.request('/products', { method: 'GET' });
  },

  async createProduct(productData) {
    return this.request('/products', {
      method: 'POST',
      body: JSON.stringify(productData),
    });
  },

  async deleteProduct(productId) {
    return this.request('/product', {
      method: 'DELETE',
      body: JSON.stringify({ id: productId }),
    });
  },

  async getAddresses() {
    return this.request('/addresses', { method: 'GET' });
  },

  async createAddress(addressData) {
    return this.request('/addresses', {
      method: 'POST',
      body: JSON.stringify(addressData),
    });
  },

  async updateAddress(addressData) {
    return this.request('/address', {
      method: 'PUT',
      body: JSON.stringify(addressData),
    });
  },

  async deleteAddress(addressId) {
    return this.request('/address', {
      method: 'DELETE',
      body: JSON.stringify({ id: addressId }),
    });
  },
};

const UI = {
  elements: {},

  init() {
    this.cacheElements();
    this.bindEvents();
    this.checkAuthState();
  },

  cacheElements() {
    this.elements.sidebar = document.getElementById('sidebar');
    this.elements.menuToggle = document.getElementById('menuToggle');
    this.elements.navItems = document.querySelectorAll('.nav-item');
    this.elements.logoutBtn = document.getElementById('logoutBtn');

    this.elements.pageTitle = document.getElementById('pageTitle');
    this.elements.pageSubtitle = document.getElementById('pageSubtitle');
    this.elements.authButtons = document.getElementById('authButtons');
    this.elements.loginBtn = document.getElementById('loginBtn');
    this.elements.registerBtn = document.getElementById('registerBtn');
    this.elements.userMenu = document.getElementById('userMenu');
    this.elements.userAvatar = document.getElementById('userAvatar');
    this.elements.userName = document.getElementById('userName');

    this.elements.pages = document.querySelectorAll('.page');
    this.elements.dashboardPage = document.getElementById('dashboardPage');
    this.elements.productsPage = document.getElementById('productsPage');
    this.elements.addressesPage = document.getElementById('addressesPage');
    this.elements.profilePage = document.getElementById('profilePage');
    this.elements.securityPage = document.getElementById('securityPage');

    this.elements.totalProducts = document.getElementById('totalProducts');
    this.elements.totalAddresses = document.getElementById('totalAddresses');
    this.elements.availableProducts =
      document.getElementById('availableProducts');
    this.elements.unavailableProducts = document.getElementById(
      'unavailableProducts'
    );
    this.elements.recentProductsList =
      document.getElementById('recentProductsList');

    this.elements.productsGrid = document.getElementById('productsGrid');
    this.elements.addressesGrid = document.getElementById('addressesGrid');

    this.elements.productSearch = document.getElementById('productSearch');
    this.elements.addressSearch = document.getElementById('addressSearch');

    this.elements.authModal = document.getElementById('authModal');
    this.elements.productModal = document.getElementById('productModal');
    this.elements.addressModal = document.getElementById('addressModal');

    this.elements.loginForm = document.getElementById('loginForm');
    this.elements.registerForm = document.getElementById('registerForm');
    this.elements.productForm = document.getElementById('productForm');
    this.elements.addressForm = document.getElementById('addressForm');
    this.elements.changePasswordForm =
      document.getElementById('changePasswordForm');

    this.elements.authTitle = document.getElementById('authTitle');
    this.elements.authSubtitle = document.getElementById('authSubtitle');
    this.elements.authToggleText = document.getElementById('authToggleText');
    this.elements.authToggleBtn = document.getElementById('authToggleBtn');

    this.elements.profileAvatar = document.getElementById('profileAvatar');
    this.elements.profileName = document.getElementById('profileName');
    this.elements.profileEmail = document.getElementById('profileEmail');
    this.elements.profilePhone = document.getElementById('profilePhone');
    this.elements.profileCreated = document.getElementById('profileCreated');
    this.elements.profileVerified = document.getElementById('profileVerified');

    this.elements.addProductBtn = document.getElementById('addProductBtn');
    this.elements.emptyAddProductBtn =
      document.getElementById('emptyAddProductBtn');
    this.elements.addAddressBtn = document.getElementById('addAddressBtn');
    this.elements.emptyAddAddressBtn =
      document.getElementById('emptyAddAddressBtn');
  },

  bindEvents() {
    this.elements.menuToggle?.addEventListener('click', () =>
      this.toggleSidebar()
    );

    this.elements.navItems.forEach((item) => {
      item.addEventListener('click', (e) => {
        e.preventDefault();
        const page = item.dataset.page;
        if (page) this.navigateTo(page);
      });
    });

    document.querySelectorAll('[data-action]').forEach((btn) => {
      btn.addEventListener('click', () =>
        this.handleAction(btn.dataset.action, btn.dataset.id)
      );
    });

    document.querySelectorAll('[data-page]').forEach((btn) => {
      if (btn.classList.contains('nav-item')) return;
      btn.addEventListener('click', () => this.navigateTo(btn.dataset.page));
    });

    this.elements.logoutBtn?.addEventListener('click', () => this.logout());

    this.elements.loginBtn?.addEventListener('click', () => {
      this.showAuthModal();
      this.showLoginForm();
    });

    this.elements.registerBtn?.addEventListener('click', () => {
      this.showAuthModal();
      this.showRegisterForm();
    });

    this.elements.authToggleBtn?.addEventListener('click', () =>
      this.toggleAuthForm()
    );

    this.elements.loginForm?.addEventListener('submit', (e) =>
      this.handleLogin(e)
    );
    this.elements.registerForm?.addEventListener('submit', (e) =>
      this.handleRegister(e)
    );
    this.elements.productForm?.addEventListener('submit', (e) =>
      this.handleProductSubmit(e)
    );
    this.elements.addressForm?.addEventListener('submit', (e) =>
      this.handleAddressSubmit(e)
    );
    this.elements.changePasswordForm?.addEventListener('submit', (e) =>
      this.handlePasswordChange(e)
    );

    this.elements.addProductBtn?.addEventListener('click', () =>
      this.openProductModal()
    );
    this.elements.emptyAddProductBtn?.addEventListener('click', () =>
      this.openProductModal()
    );
    this.elements.addAddressBtn?.addEventListener('click', () =>
      this.openAddressModal()
    );
    this.elements.emptyAddAddressBtn?.addEventListener('click', () =>
      this.openAddressModal()
    );

    this.elements.productSearch?.addEventListener('input', (e) =>
      this.filterProducts(e.target.value)
    );
    this.elements.addressSearch?.addEventListener('input', (e) =>
      this.filterAddresses(e.target.value)
    );

    document.addEventListener('click', (e) => {
      if (
        window.innerWidth <= 768 &&
        this.elements.sidebar?.classList.contains('open') &&
        !this.elements.sidebar.contains(e.target) &&
        !this.elements.menuToggle.contains(e.target)
      ) {
        this.elements.sidebar.classList.remove('open');
      }
    });

    document.addEventListener('click', (e) => {
      const actionBtn = e.target.closest('[data-action]');
      if (actionBtn) {
        this.handleAction(actionBtn.dataset.action, actionBtn.dataset.id);
      }
    });
  },

  checkAuthState() {
    const storedUser = localStorage.getItem('flavorhub_user');
    if (storedUser) {
      try {
        AppState.user = JSON.parse(storedUser);
        AppState.isAuthenticated = true;
        this.updateAuthUI();
        this.onAuthSuccess();
      } catch {
        AppState.isAuthenticated = false;
        this.updateAuthUI();
        this.showAuthModal();
      }
    } else {
      AppState.isAuthenticated = false;
      this.updateAuthUI();
      this.showAuthModal();
    }
  },

  showAuthModal() {
    Modal.open('authModal');
  },

  showLoginForm() {
    this.elements.registerForm.classList.add('hidden');
    this.elements.loginForm.classList.remove('hidden');
    this.elements.authTitle.textContent = 'Welcome Back';
    this.elements.authSubtitle.textContent = 'Sign in to your account';
    this.elements.authToggleText.textContent = "Don't have an account?";
    this.elements.authToggleBtn.textContent = 'Sign Up';

  },

  showRegisterForm() {
    this.elements.loginForm.classList.add('hidden');
    this.elements.registerForm.classList.remove('hidden');
    this.elements.authTitle.textContent = 'Create Account';
    this.elements.authSubtitle.textContent = 'Start managing your restaurant';
    this.elements.authToggleText.textContent = 'Already have an account?';
    this.elements.authToggleBtn.textContent = 'Sign In';

  },

  toggleAuthForm() {
    const isLogin = !this.elements.loginForm.classList.contains('hidden');

    if (isLogin) {
      this.showRegisterForm();
    } else {
      this.showLoginForm();
    }
  },

  async handleLogin(e) {
    e.preventDefault();

    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    Loading.show();

    try {
      await API.login(email, password);

      AppState.user = {
        email,
        firstName: email.split('@')[0],
        lastName: '',
        phone: '',
        created_at: new Date().toISOString(),
        emailIsVerified: false,
      };
      AppState.isAuthenticated = true;

      localStorage.setItem('flavorhub_user', JSON.stringify(AppState.user));

      Toast.success('Welcome back!', 'You have successfully signed in.');
      Modal.close('authModal');
      this.onAuthSuccess();
    } catch (error) {
      Toast.error('Login Failed', error.message);
    } finally {
      Loading.hide();
    }
  },

  async handleRegister(e) {
    e.preventDefault();

    const userData = {
      firstName: document.getElementById('registerFirstName').value,
      lastName: document.getElementById('registerLastName').value,
      email: document.getElementById('registerEmail').value,
      phone: document.getElementById('registerPhone').value,
      password: document.getElementById('registerPassword').value,
    };

    Loading.show();

    try {
      await API.register(userData);

      Toast.success(
        'Account Created!',
        'Please sign in with your credentials.'
      );
      this.toggleAuthForm();

      document.getElementById('loginEmail').value = userData.email;
    } catch (error) {
      Toast.error('Registration Failed', error.message);
    } finally {
      Loading.hide();
    }
  },

  logout() {
    AppState.isAuthenticated = false;
    AppState.user = null;
    AppState.products = [];
    AppState.addresses = [];

    localStorage.removeItem('flavorhub_user');

    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';

    this.updateAuthUI();
    Toast.info('Logged Out', 'You have been signed out.');
    this.showAuthModal();
    this.navigateTo('dashboard');
  },

  onAuthSuccess() {
    this.updateAuthUI();
    this.updateUserUI();
    this.loadDashboardData();
  },

  toggleSidebar() {
    this.elements.sidebar?.classList.toggle('open');
  },

  navigateTo(page) {
    AppState.currentPage = page;

    this.elements.navItems.forEach((item) => {
      item.classList.toggle('active', item.dataset.page === page);
    });

    this.elements.pages.forEach((p) => {
      p.classList.toggle('active', p.id === `${page}Page`);
    });

    const titles = {
      dashboard: {
        title: 'Dashboard',
        subtitle: "Welcome back! Here's what's happening.",
      },
      products: {
        title: 'Products',
        subtitle: 'Manage your restaurant menu items.',
      },
      addresses: { title: 'Addresses', subtitle: 'Manage delivery addresses.' },
      profile: {
        title: 'Profile',
        subtitle: 'View and manage your account details.',
      },
    };

    const pageInfo = titles[page] || titles.dashboard;
    this.elements.pageTitle.textContent = pageInfo.title;
    this.elements.pageSubtitle.textContent = pageInfo.subtitle;

    if (page === 'products') this.loadProducts();
    if (page === 'addresses') this.loadAddresses();

    if (window.innerWidth <= 768) {
      this.elements.sidebar?.classList.remove('open');
    }
  },

  async loadDashboardData() {
    try {
      await Promise.all([this.loadProducts(), this.loadAddresses()]);
      this.updateDashboardStats();
      this.updateRecentProducts();
    } catch (error) {
      console.error('Failed to load dashboard data:', error);
    }
  },

  async loadProducts() {
    try {
      const response = await API.getProducts();
      AppState.products = response.data || [];
      this.renderProducts();
      this.updateDashboardStats();
    } catch (error) {
      if (error.status === 401) {
        AppState.products = [];
      } else {
        console.error('Failed to load products:', error);
      }
      this.renderProducts();
    }
  },

  async loadAddresses() {
    try {
      const response = await API.getAddresses();
      AppState.addresses = response.data || [];
      this.renderAddresses();
      this.updateDashboardStats();
    } catch (error) {
      if (error.status === 401) {
        AppState.addresses = [];
      } else {
        console.error('Failed to load addresses:', error);
      }
      this.renderAddresses();
    }
  },

  updateAuthUI() {
    const isAuthenticated = AppState.isAuthenticated;

    if (this.elements.authButtons) {
      this.elements.authButtons.style.display = isAuthenticated
        ? 'none'
        : 'flex';
    }
    if (this.elements.userMenu) {
      this.elements.userMenu.style.display = isAuthenticated ? 'flex' : 'none';
    }
    if (this.elements.logoutBtn) {
      this.elements.logoutBtn.style.display = isAuthenticated ? 'flex' : 'none';
    }
  },

  updateUserUI() {
    if (!AppState.user) return;

    const initials = getInitials(
      AppState.user.firstName,
      AppState.user.lastName
    );
    const fullName =
      `${AppState.user.firstName} ${AppState.user.lastName}`.trim() ||
      AppState.user.email;

    this.elements.userAvatar.textContent = initials;
    this.elements.userName.textContent = fullName;

    this.elements.profileAvatar.textContent = initials;
    this.elements.profileName.textContent = fullName;
    this.elements.profileEmail.textContent = AppState.user.email;
    this.elements.profilePhone.textContent = AppState.user.phone || 'Not set';
    this.elements.profileCreated.textContent = formatDateShort(
      AppState.user.created_at
    );

    const verifiedBadge = AppState.user.emailIsVerified
      ? '<span class="badge badge-success">Verified</span>'
      : '<span class="badge badge-warning">Not Verified</span>';
    this.elements.profileVerified.innerHTML = verifiedBadge;
  },

  updateDashboardStats() {
    const available = AppState.products.filter((p) => p.available).length;
    const unavailable = AppState.products.filter((p) => !p.available).length;

    this.elements.totalProducts.textContent = AppState.products.length;
    this.elements.totalAddresses.textContent = AppState.addresses.length;
    this.elements.availableProducts.textContent = available;
    this.elements.unavailableProducts.textContent = unavailable;
  },

  updateRecentProducts() {
    const recent = AppState.products.slice(0, 5);

    if (recent.length === 0) {
      this.elements.recentProductsList.innerHTML = `
        <div class="empty-state">
          <p>No products yet</p>
        </div>
      `;
      return;
    }

    this.elements.recentProductsList.innerHTML = recent
      .map(createProductListItem)
      .join('');
  },

  renderProducts(products = AppState.products) {
    if (products.length === 0) {
      this.elements.productsGrid.innerHTML = `
        <div class="empty-state">
          <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round">
            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
            <line x1="3" y1="6" x2="21" y2="6"/>
            <path d="M16 10a4 4 0 0 1-8 0"/>
          </svg>
          <h3>No Products Yet</h3>
          <p>Start by adding your first product</p>
          <button class="btn btn-primary" id="emptyAddProductBtn">Add Product</button>
        </div>
      `;

      document
        .getElementById('emptyAddProductBtn')
        ?.addEventListener('click', () => this.openProductModal());
      return;
    }

    this.elements.productsGrid.innerHTML = products
      .map(createProductCard)
      .join('');
  },

  renderAddresses(addresses = AppState.addresses) {
    if (addresses.length === 0) {
      this.elements.addressesGrid.innerHTML = `
        <div class="empty-state">
          <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
            <circle cx="12" cy="10" r="3"/>
          </svg>
          <h3>No Addresses Yet</h3>
          <p>Add your first delivery address</p>
          <button class="btn btn-primary" id="emptyAddAddressBtn">Add Address</button>
        </div>
      `;

      document
        .getElementById('emptyAddAddressBtn')
        ?.addEventListener('click', () => this.openAddressModal());
      return;
    }

    this.elements.addressesGrid.innerHTML = addresses
      .map(createAddressCard)
      .join('');
  },

  filterProducts(query) {
    const q = query.toLowerCase().trim();
    if (!q) {
      this.renderProducts();
      return;
    }

    const filtered = AppState.products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
    );
    this.renderProducts(filtered);
  },

  filterAddresses(query) {
    const q = query.toLowerCase().trim();
    if (!q) {
      this.renderAddresses();
      return;
    }

    const filtered = AppState.addresses.filter(
      (a) =>
        a.name.toLowerCase().includes(q) ||
        a.address.toLowerCase().includes(q) ||
        a.city.toLowerCase().includes(q)
    );
    this.renderAddresses(filtered);
  },

  handleAction(action, id) {
    switch (action) {
      case 'addProduct':
        this.openProductModal();
        break;
      case 'addAddress':
        this.openAddressModal();
        break;
      case 'changePassword':
        this.navigateTo('profile');
        break;
      case 'editAddress':
        this.editAddress(id);
        break;
      case 'deleteProduct':
        this.deleteProduct(id);
        break;
      case 'deleteAddress':
        this.deleteAddress(id);
        break;
    }
  },

  openProductModal() {
    document.getElementById('productModalTitle').textContent = 'Add Product';
    this.elements.productForm.reset();
    document.getElementById('productAvailable').checked = true;
    Modal.open('productModal');
  },

  async handleProductSubmit(e) {
    e.preventDefault();

    const imagesInput = document.getElementById('productImages').value;
    const images = imagesInput
      ? imagesInput
        .split(',')
        .map((url) => url.trim())
        .filter((url) => url)
      : [];

    const productData = {
      name: document.getElementById('productName').value,
      price: parseFloat(document.getElementById('productPrice').value),
      discount:
        parseFloat(document.getElementById('productDiscount').value) || null,
      description: document.getElementById('productDescription').value,
      images,
      available: document.getElementById('productAvailable').checked,
    };

    Loading.show();

    try {
      await API.createProduct(productData);
      Toast.success(
        'Product Created',
        `${productData.name} has been added successfully.`
      );
      Modal.close('productModal');
      await this.loadProducts();
      this.updateRecentProducts();
    } catch (error) {
      Toast.error('Failed to Create Product', error.message);
    } finally {
      Loading.hide();
    }
  },

  async deleteProduct(id) {
    const product = AppState.products.find((p) => p.id === id);
    if (!product) return;

    if (!confirm(`Are you sure you want to delete "${product.name}"?`)) return;

    Loading.show();

    try {
      await API.deleteProduct(id);
      Toast.success('Product Deleted', `${product.name} has been removed.`);
      await this.loadProducts();
      this.updateRecentProducts();
    } catch (error) {
      Toast.error('Failed to Delete Product', error.message);
    } finally {
      Loading.hide();
    }
  },

  openAddressModal(address = null) {
    if (address) {
      document.getElementById('addressModalTitle').textContent = 'Edit Address';
      document.getElementById('addressId').value = address.id;
      document.getElementById('addressName').value = address.name;
      document.getElementById('addressStreet').value = address.address;
      document.getElementById('addressStreet2').value = address.address2 || '';
      document.getElementById('addressCity').value = address.city;
      document.getElementById('addressState').value = address.state || '';
      document.getElementById('addressDistrict').value = address.district || '';
      document.getElementById('addressPostalCode').value = address.postalCode;
      AppState.editingAddressId = address.id;
    } else {
      document.getElementById('addressModalTitle').textContent = 'Add Address';
      this.elements.addressForm.reset();
      AppState.editingAddressId = null;
    }
    Modal.open('addressModal');
  },

  editAddress(id) {
    const address = AppState.addresses.find((a) => a.id === id);
    if (address) {
      this.openAddressModal(address);
    }
  },

  async handleAddressSubmit(e) {
    e.preventDefault();

    const addressData = {
      name: document.getElementById('addressName').value,
      address: document.getElementById('addressStreet').value,
      address2: document.getElementById('addressStreet2').value || null,
      city: document.getElementById('addressCity').value,
      state: document.getElementById('addressState').value || null,
      district: document.getElementById('addressDistrict').value || null,
      postalCode: document.getElementById('addressPostalCode').value,
    };

    Loading.show();

    try {
      if (AppState.editingAddressId) {
        addressData.id = AppState.editingAddressId;
        await API.updateAddress(addressData);
        Toast.success(
          'Address Updated',
          'Your address has been updated successfully.'
        );
      } else {
        await API.createAddress(addressData);
        Toast.success('Address Created', 'Your new address has been added.');
      }

      Modal.close('addressModal');
      await this.loadAddresses();
    } catch (error) {
      Toast.error('Failed to Save Address', error.message);
    } finally {
      Loading.hide();
      AppState.editingAddressId = null;
    }
  },

  async deleteAddress(id) {
    const address = AppState.addresses.find((a) => a.id === id);
    if (!address) return;

    if (!confirm(`Are you sure you want to delete "${address.name}"?`)) return;

    Loading.show();

    try {
      await API.deleteAddress(id);
      Toast.success('Address Deleted', `${address.name} has been removed.`);
      await this.loadAddresses();
    } catch (error) {
      Toast.error('Failed to Delete Address', error.message);
    } finally {
      Loading.hide();
    }
  },

  async handlePasswordChange(e) {
    e.preventDefault();

    const currentPassword = document.getElementById('currentPassword').value;
    const newPassword = document.getElementById('newPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    if (newPassword !== confirmPassword) {
      Toast.error(
        'Password Mismatch',
        'New password and confirmation do not match.'
      );
      return;
    }

    if (newPassword.length < 8) {
      Toast.error(
        'Weak Password',
        'Password must be at least 8 characters long.'
      );
      return;
    }

    Loading.show();

    try {
      await API.changePassword(currentPassword, newPassword);
      Toast.success(
        'Password Updated',
        'Your password has been changed successfully.'
      );
      this.elements.changePasswordForm.reset();
    } catch (error) {
      Toast.error('Failed to Change Password', error.message);
    } finally {
      Loading.hide();
    }
  },
};

document.addEventListener('DOMContentLoaded', () => {
  initComponents();
  UI.init();
});
