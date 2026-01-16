const Toast = {
  container: null,

  init() {
    this.container = document.getElementById('toastContainer');
  },

  show({ type = 'info', title, message, duration = 5000 }) {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;

    const icons = {
      success:
        '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>',
      error:
        '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>',
      warning:
        '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>',
      info: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>',
    };

    toast.innerHTML = `
      <span class="toast-icon">${icons[type]}</span>
      <div class="toast-content">
        <div class="toast-title">${title}</div>
        ${message ? `<div class="toast-message">${message}</div>` : ''}
      </div>
      <button class="toast-close">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="18" y1="6" x2="6" y2="18"/>
          <line x1="6" y1="6" x2="18" y2="18"/>
        </svg>
      </button>
    `;

    const closeBtn = toast.querySelector('.toast-close');
    closeBtn.addEventListener('click', () => this.remove(toast));

    this.container.appendChild(toast);

    if (duration > 0) {
      setTimeout(() => this.remove(toast), duration);
    }

    return toast;
  },

  remove(toast) {
    if (!toast || !toast.parentElement) return;
    toast.classList.add('removing');
    setTimeout(() => toast.remove(), 200);
  },

  success(title, message) {
    return this.show({ type: 'success', title, message });
  },

  error(title, message) {
    return this.show({ type: 'error', title, message });
  },

  warning(title, message) {
    return this.show({ type: 'warning', title, message });
  },

  info(title, message) {
    return this.show({ type: 'info', title, message });
  },
};

const Modal = {
  open(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  },

  close(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }
  },

  init() {
    document.querySelectorAll('.modal-overlay').forEach((overlay) => {
      overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
          this.close(overlay.id);
        }
      });
    });

    document.querySelectorAll('[data-modal]').forEach((btn) => {
      btn.addEventListener('click', () => {
        this.close(btn.dataset.modal);
      });
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        document.querySelectorAll('.modal-overlay.active').forEach((modal) => {
          this.close(modal.id);
        });
      }
    });
  },
};

const Loading = {
  overlay: null,

  init() {
    this.overlay = document.getElementById('loadingOverlay');
  },

  show() {
    if (this.overlay) {
      this.overlay.classList.add('active');
    }
  },

  hide() {
    if (this.overlay) {
      this.overlay.classList.remove('active');
    }
  },
};

function createProductCard(product) {
  const discountedPrice = product.discount
    ? (product.price * (1 - product.discount / 100)).toFixed(2)
    : null;

  const imageUrl =
    product.images && product.images.length > 0 ? product.images[0] : null;

  return `
    <div class="product-card" data-id="${product.id}">
      <div class="product-card-image">
        ${imageUrl
      ? `<img src="${imageUrl}" alt="${product.name}" onerror="this.parentElement.innerHTML='<svg xmlns=\\'http://www.w3.org/2000/svg\\' width=\\'48\\' height=\\'48\\' viewBox=\\'0 0 24 24\\' fill=\\'none\\' stroke=\\'currentColor\\' stroke-width=\\'1\\' stroke-linecap=\\'round\\' stroke-linejoin=\\'round\\'><rect x=\\'3\\' y=\\'3\\' width=\\'18\\' height=\\'18\\' rx=\\'2\\' ry=\\'2\\'/><circle cx=\\'8.5\\' cy=\\'8.5\\' r=\\'1.5\\'/><polyline points=\\'21 15 16 10 5 21\\'/></svg>'">`
      : `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
              <circle cx="8.5" cy="8.5" r="1.5"/>
              <polyline points="21 15 16 10 5 21"/>
            </svg>`
    }
        ${product.discount
      ? `<span class="product-badge discount">${product.discount}% OFF</span>`
      : ''
    }
        <span class="product-badge ${product.available ? 'available' : 'unavailable'
    }">
          ${product.available ? 'Available' : 'Unavailable'}
        </span>
      </div>
      <div class="product-card-content">
        <h4 class="product-card-name">${escapeHtml(product.name)}</h4>
        <p class="product-card-description">${escapeHtml(
      product.description
    )}</p>
        <div class="product-card-footer">
          <div class="product-card-price">
            ${discountedPrice
      ? `<span class="original">$${product.price.toFixed(2)}</span>
                 <span class="current">$${discountedPrice}</span>`
      : `<span class="current">$${product.price.toFixed(2)}</span>`
    }
          </div>
          <div class="product-card-actions">
            <button class="delete" title="Delete" data-action="deleteProduct" data-id="${product.id
    }">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="3 6 5 6 21 6"/>
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                <line x1="10" y1="11" x2="10" y2="17"/>
                <line x1="14" y1="11" x2="14" y2="17"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  `;
}

function createProductListItem(product) {
  const discountedPrice = product.discount
    ? (product.price * (1 - product.discount / 100)).toFixed(2)
    : null;

  const imageUrl =
    product.images && product.images.length > 0 ? product.images[0] : null;

  return `
    <div class="product-item">
      <div class="product-thumb">
        ${imageUrl
      ? `<img src="${imageUrl}" alt="${product.name}" onerror="this.style.display='none'">`
      : `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
              <line x1="3" y1="6" x2="21" y2="6"/>
              <path d="M16 10a4 4 0 0 1-8 0"/>
            </svg>`
    }
      </div>
      <div class="product-info">
        <div class="product-name">${escapeHtml(product.name)}</div>
        <div class="product-price">
          ${discountedPrice
      ? `<span class="original">$${product.price.toFixed(2)}</span>
               <span class="discounted">$${discountedPrice}</span>`
      : `$${product.price.toFixed(2)}`
    }
        </div>
      </div>
    </div>
  `;
}

function createAddressCard(address) {
  return `
    <div class="address-card" data-id="${address.id}">
      <div class="address-card-header">
        <div class="address-label">
          <div class="address-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
              <circle cx="12" cy="10" r="3"/>
            </svg>
          </div>
          <span class="address-name">${escapeHtml(address.name)}</span>
        </div>
        <div class="address-card-actions">
          <button title="Edit" data-action="editAddress" data-id="${address.id
    }">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
            </svg>
          </button>
          <button class="delete" title="Delete" data-action="deleteAddress" data-id="${address.id
    }">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="3 6 5 6 21 6"/>
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
              <line x1="10" y1="11" x2="10" y2="17"/>
              <line x1="14" y1="11" x2="14" y2="17"/>
            </svg>
          </button>
        </div>
      </div>
      <div class="address-details">
        <span class="address-line primary">${escapeHtml(address.address)}</span>
        ${address.address2
      ? `<span class="address-line">${escapeHtml(
        address.address2
      )}</span>`
      : ''
    }
        <span class="address-line">
          ${escapeHtml(address.city)}${address.state ? `, ${escapeHtml(address.state)}` : ''
    } ${escapeHtml(address.postalCode)}
        </span>
        ${address.district
      ? `<span class="address-line">${escapeHtml(
        address.district
      )}</span>`
      : ''
    }
      </div>
    </div>
  `;
}

function escapeHtml(text) {
  if (!text) return '';
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

function formatDate(dateString) {
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  } catch {
    return dateString;
  }
}

function formatDateShort(dateString) {
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
    });
  } catch {
    return dateString;
  }
}

function getInitials(firstName, lastName) {
  const first = firstName ? firstName.charAt(0).toUpperCase() : '';
  const last = lastName ? lastName.charAt(0).toUpperCase() : '';
  return first + last || '??';
}

function initComponents() {
  Toast.init();
  Modal.init();
  Loading.init();

  document.querySelectorAll('.toggle-password').forEach((btn) => {
    btn.addEventListener('click', () => {
      const targetId = btn.dataset.target;
      const input = document.getElementById(targetId);
      if (input) {
        const type = input.type === 'password' ? 'text' : 'password';
        input.type = type;
        btn.classList.toggle('active', type === 'text');
      }
    });
  });
}

window.Toast = Toast;
window.Modal = Modal;
window.Loading = Loading;
window.createProductCard = createProductCard;
window.createProductListItem = createProductListItem;
window.createAddressCard = createAddressCard;
window.escapeHtml = escapeHtml;
window.formatDate = formatDate;
window.formatDateShort = formatDateShort;
window.getInitials = getInitials;
window.initComponents = initComponents;
