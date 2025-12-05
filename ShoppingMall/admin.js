// ==========================================
// Admin Dashboard JavaScript
// ==========================================

// Data Store (simulating a database)
let products = [
    { id: 1, name: 'Keychron K2 Pro', category: 'keyboard', price: 89.99, stock: 25, image: 'https://images.unsplash.com/photo-1601445638532-3c6f6c3aa1d6?w=400', desc: '무선 기계식 키보드' },
    { id: 2, name: 'Sony WH-1000XM5', category: 'audio', price: 349.99, stock: 15, image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=400', desc: '노이즈 캔슬링 헤드폰' },
    { id: 3, name: 'Logitech MX Master 3', category: 'accessories', price: 99.99, stock: 40, image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400', desc: '무선 마우스' },
    { id: 4, name: 'HHKB Professional', category: 'keyboard', price: 299.99, stock: 10, image: 'https://images.unsplash.com/photo-1595225476474-87563907a212?w=400', desc: '정전용량 키보드' },
    { id: 5, name: 'AirPods Pro', category: 'audio', price: 249.99, stock: 30, image: 'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=400', desc: '무선 이어폰' },
];

let members = [
    { id: 1, name: '김민수', email: 'minsu@email.com', joinDate: '2024-01-15', status: 'active', note: '' },
    { id: 2, name: '이영희', email: 'younghee@email.com', joinDate: '2024-02-20', status: 'active', note: 'VIP 고객' },
    { id: 3, name: '박철수', email: 'chulsoo@email.com', joinDate: '2024-03-10', status: 'inactive', note: '' },
    { id: 4, name: '최지연', email: 'jiyeon@email.com', joinDate: '2024-04-05', status: 'active', note: '' },
    { id: 5, name: '정대호', email: 'daeho@email.com', joinDate: '2024-05-12', status: 'banned', note: '스팸 활동' },
];

let orders = [
    { id: 'ORD-001', customer: '김민수', product: 'Keychron K2 Pro', amount: 89.99, status: 'completed', date: '2024-11-20' },
    { id: 'ORD-002', customer: '이영희', product: 'Sony WH-1000XM5', amount: 349.99, status: 'pending', date: '2024-11-22' },
    { id: 'ORD-003', customer: '최지연', product: 'AirPods Pro', amount: 249.99, status: 'completed', date: '2024-11-24' },
    { id: 'ORD-004', customer: '김민수', product: 'Logitech MX Master 3', amount: 99.99, status: 'pending', date: '2024-11-25' },
];

// State
let currentDeleteType = null;
let currentDeleteId = null;

// DOM Elements
const navItems = document.querySelectorAll('.nav-item[data-section]');
const contentSections = document.querySelectorAll('.content-section');
const pageTitle = document.getElementById('page-title');

// Modals
const productModal = document.getElementById('product-modal');
const memberModal = document.getElementById('member-modal');
const deleteModal = document.getElementById('delete-modal');

// ==========================================
// Navigation
// ==========================================
navItems.forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault();
        const section = item.dataset.section;
        
        // Update nav active state
        navItems.forEach(nav => nav.classList.remove('active'));
        item.classList.add('active');
        
        // Show corresponding section
        contentSections.forEach(sec => sec.classList.remove('active'));
        document.getElementById(`${section}-section`).classList.add('active');
        
        // Update page title
        const titles = {
            dashboard: '대시보드',
            products: '상품 관리',
            members: '회원 관리',
            orders: '주문 내역'
        };
        pageTitle.textContent = titles[section];
    });
});

// ==========================================
// Dashboard Stats
// ==========================================
function updateDashboard() {
    document.getElementById('total-products').textContent = products.length;
    document.getElementById('total-members').textContent = members.length;
    document.getElementById('total-orders').textContent = orders.length;
    
    const totalRevenue = orders
        .filter(o => o.status === 'completed')
        .reduce((sum, o) => sum + o.amount, 0);
    document.getElementById('total-revenue').textContent = `$${totalRevenue.toFixed(2)}`;
    
    // Recent Orders
    const recentOrdersEl = document.getElementById('recent-orders');
    if (orders.length > 0) {
        recentOrdersEl.innerHTML = orders.slice(0, 5).map(order => `
            <div class="recent-item">
                <div>
                    <strong>${order.id}</strong>
                    <span style="color: var(--text-secondary); margin-left: 0.5rem;">${order.customer}</span>
                </div>
                <span class="status-badge ${order.status}">${getStatusText(order.status)}</span>
            </div>
        `).join('');
    }
    
    // Recent Members
    const recentMembersEl = document.getElementById('recent-members');
    if (members.length > 0) {
        recentMembersEl.innerHTML = members.slice(0, 5).map(member => `
            <div class="recent-item">
                <div>
                    <strong>${member.name}</strong>
                    <span style="color: var(--text-secondary); margin-left: 0.5rem;">${member.email}</span>
                </div>
                <span class="status-badge ${member.status}">${getStatusText(member.status)}</span>
            </div>
        `).join('');
    }
}

function getStatusText(status) {
    const statusMap = {
        active: '활성',
        inactive: '비활성',
        banned: '차단',
        pending: '대기중',
        completed: '완료',
        cancelled: '취소'
    };
    return statusMap[status] || status;
}

// ==========================================
// Products CRUD
// ==========================================
function renderProducts(filter = '') {
    const tbody = document.getElementById('products-table-body');
    const filtered = products.filter(p => 
        p.name.toLowerCase().includes(filter.toLowerCase()) ||
        p.category.toLowerCase().includes(filter.toLowerCase())
    );
    
    if (filtered.length === 0) {
        tbody.innerHTML = `<tr><td colspan="7" style="text-align: center; color: var(--text-secondary); padding: 2rem;">상품이 없습니다.</td></tr>`;
        return;
    }
    
    tbody.innerHTML = filtered.map(product => `
        <tr>
            <td>${product.id}</td>
            <td><img src="${product.image}" alt="${product.name}" class="table-img"></td>
            <td>${product.name}</td>
            <td>${getCategoryName(product.category)}</td>
            <td>$${product.price.toFixed(2)}</td>
            <td>${product.stock}</td>
            <td>
                <div class="table-actions">
                    <button class="action-btn edit" onclick="editProduct(${product.id})" title="수정">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                    </button>
                    <button class="action-btn delete" onclick="confirmDelete('product', ${product.id})" title="삭제">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                    </button>
                </div>
            </td>
        </tr>
    `).join('');
}

function getCategoryName(category) {
    const names = {
        keyboard: 'Keyboards',
        audio: 'Audio',
        accessories: 'Accessories'
    };
    return names[category] || category;
}

// Add Product
document.getElementById('add-product-btn').addEventListener('click', () => {
    document.getElementById('product-modal-title').textContent = '상품 추가';
    document.getElementById('product-form').reset();
    document.getElementById('product-id').value = '';
    openModal(productModal);
});

// Edit Product
function editProduct(id) {
    const product = products.find(p => p.id === id);
    if (!product) return;
    
    document.getElementById('product-modal-title').textContent = '상품 수정';
    document.getElementById('product-id').value = product.id;
    document.getElementById('product-name').value = product.name;
    document.getElementById('product-category').value = product.category;
    document.getElementById('product-price').value = product.price;
    document.getElementById('product-stock').value = product.stock;
    document.getElementById('product-image').value = product.image;
    document.getElementById('product-desc').value = product.desc;
    
    openModal(productModal);
}

// Save Product
document.getElementById('product-form').addEventListener('submit', (e) => {
    e.preventDefault();
    
    const id = document.getElementById('product-id').value;
    const productData = {
        name: document.getElementById('product-name').value,
        category: document.getElementById('product-category').value,
        price: parseFloat(document.getElementById('product-price').value),
        stock: parseInt(document.getElementById('product-stock').value),
        image: document.getElementById('product-image').value || 'https://via.placeholder.com/400',
        desc: document.getElementById('product-desc').value
    };
    
    if (id) {
        // Update existing
        const index = products.findIndex(p => p.id === parseInt(id));
        if (index !== -1) {
            products[index] = { ...products[index], ...productData };
            showToast('상품이 수정되었습니다.');
        }
    } else {
        // Create new
        const newId = Math.max(...products.map(p => p.id), 0) + 1;
        products.push({ id: newId, ...productData });
        showToast('상품이 추가되었습니다.');
    }
    
    closeModal(productModal);
    renderProducts();
    updateDashboard();
});

// ==========================================
// Members CRUD
// ==========================================
function renderMembers(filter = '') {
    const tbody = document.getElementById('members-table-body');
    const filtered = members.filter(m => 
        m.name.toLowerCase().includes(filter.toLowerCase()) ||
        m.email.toLowerCase().includes(filter.toLowerCase())
    );
    
    if (filtered.length === 0) {
        tbody.innerHTML = `<tr><td colspan="6" style="text-align: center; color: var(--text-secondary); padding: 2rem;">회원이 없습니다.</td></tr>`;
        return;
    }
    
    tbody.innerHTML = filtered.map(member => `
        <tr>
            <td>${member.id}</td>
            <td>${member.name}</td>
            <td>${member.email}</td>
            <td>${member.joinDate}</td>
            <td><span class="status-badge ${member.status}">${getStatusText(member.status)}</span></td>
            <td>
                <div class="table-actions">
                    <button class="action-btn edit" onclick="editMember(${member.id})" title="수정">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                    </button>
                    <button class="action-btn delete" onclick="confirmDelete('member', ${member.id})" title="삭제">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                    </button>
                </div>
            </td>
        </tr>
    `).join('');
}

// Add Member
document.getElementById('add-member-btn').addEventListener('click', () => {
    document.getElementById('member-modal-title').textContent = '회원 추가';
    document.getElementById('member-form').reset();
    document.getElementById('member-id').value = '';
    document.getElementById('member-password').required = true;
    openModal(memberModal);
});

// Edit Member
function editMember(id) {
    const member = members.find(m => m.id === id);
    if (!member) return;
    
    document.getElementById('member-modal-title').textContent = '회원 수정';
    document.getElementById('member-id').value = member.id;
    document.getElementById('member-name').value = member.name;
    document.getElementById('member-email').value = member.email;
    document.getElementById('member-password').value = '';
    document.getElementById('member-password').required = false;
    document.getElementById('member-status').value = member.status;
    document.getElementById('member-note').value = member.note;
    
    openModal(memberModal);
}

// Save Member
document.getElementById('member-form').addEventListener('submit', (e) => {
    e.preventDefault();
    
    const id = document.getElementById('member-id').value;
    const memberData = {
        name: document.getElementById('member-name').value,
        email: document.getElementById('member-email').value,
        status: document.getElementById('member-status').value,
        note: document.getElementById('member-note').value
    };
    
    if (id) {
        // Update existing
        const index = members.findIndex(m => m.id === parseInt(id));
        if (index !== -1) {
            members[index] = { ...members[index], ...memberData };
            showToast('회원 정보가 수정되었습니다.');
        }
    } else {
        // Create new
        const newId = Math.max(...members.map(m => m.id), 0) + 1;
        const today = new Date().toISOString().split('T')[0];
        members.push({ id: newId, joinDate: today, ...memberData });
        showToast('회원이 추가되었습니다.');
    }
    
    closeModal(memberModal);
    renderMembers();
    updateDashboard();
});

// ==========================================
// Orders
// ==========================================
function renderOrders(filter = '') {
    const tbody = document.getElementById('orders-table-body');
    const filtered = orders.filter(o => 
        o.id.toLowerCase().includes(filter.toLowerCase()) ||
        o.customer.toLowerCase().includes(filter.toLowerCase()) ||
        o.product.toLowerCase().includes(filter.toLowerCase())
    );
    
    if (filtered.length === 0) {
        tbody.innerHTML = `<tr><td colspan="7" style="text-align: center; color: var(--text-secondary); padding: 2rem;">주문이 없습니다.</td></tr>`;
        return;
    }
    
    tbody.innerHTML = filtered.map(order => `
        <tr>
            <td><strong>${order.id}</strong></td>
            <td>${order.customer}</td>
            <td>${order.product}</td>
            <td>$${order.amount.toFixed(2)}</td>
            <td><span class="status-badge ${order.status}">${getStatusText(order.status)}</span></td>
            <td>${order.date}</td>
            <td>
                <div class="table-actions">
                    <button class="action-btn edit" onclick="changeOrderStatus('${order.id}')" title="상태 변경">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 11 12 14 22 4"></polyline><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path></svg>
                    </button>
                </div>
            </td>
        </tr>
    `).join('');
}

function changeOrderStatus(orderId) {
    const order = orders.find(o => o.id === orderId);
    if (!order) return;
    
    const statuses = ['pending', 'completed', 'cancelled'];
    const currentIndex = statuses.indexOf(order.status);
    const nextIndex = (currentIndex + 1) % statuses.length;
    order.status = statuses[nextIndex];
    
    renderOrders();
    updateDashboard();
    showToast(`주문 상태가 "${getStatusText(order.status)}"(으)로 변경되었습니다.`);
}

// ==========================================
// Delete Confirmation
// ==========================================
function confirmDelete(type, id) {
    currentDeleteType = type;
    currentDeleteId = id;
    
    const messages = {
        product: '이 상품을 삭제하시겠습니까?',
        member: '이 회원을 삭제하시겠습니까?'
    };
    
    document.getElementById('delete-message').textContent = messages[type];
    openModal(deleteModal);
}

document.getElementById('confirm-delete-btn').addEventListener('click', () => {
    if (currentDeleteType === 'product') {
        products = products.filter(p => p.id !== currentDeleteId);
        renderProducts();
        showToast('상품이 삭제되었습니다.');
    } else if (currentDeleteType === 'member') {
        members = members.filter(m => m.id !== currentDeleteId);
        renderMembers();
        showToast('회원이 삭제되었습니다.');
    }
    
    closeModal(deleteModal);
    updateDashboard();
    currentDeleteType = null;
    currentDeleteId = null;
});

// ==========================================
// Modal Functions
// ==========================================
function openModal(modal) {
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}

function closeModal(modal) {
    modal.classList.add('hidden');
    document.body.style.overflow = '';
}

// Close modal events
document.querySelectorAll('.modal-overlay, .close-modal-btn, .cancel-btn').forEach(el => {
    el.addEventListener('click', (e) => {
        const modal = e.target.closest('.modal');
        if (modal) closeModal(modal);
    });
});

// Close on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        document.querySelectorAll('.modal:not(.hidden)').forEach(modal => {
            closeModal(modal);
        });
    }
});

// ==========================================
// Search
// ==========================================
document.getElementById('product-search').addEventListener('input', (e) => {
    renderProducts(e.target.value);
});

document.getElementById('member-search').addEventListener('input', (e) => {
    renderMembers(e.target.value);
});

document.getElementById('order-search').addEventListener('input', (e) => {
    renderOrders(e.target.value);
});

// ==========================================
// Toast
// ==========================================
function showToast(message) {
    const toast = document.getElementById('admin-toast');
    toast.textContent = message;
    toast.classList.remove('hidden');
    
    setTimeout(() => {
        toast.classList.add('hidden');
    }, 3000);
}

// ==========================================
// Initialize
// ==========================================
function init() {
    updateDashboard();
    renderProducts();
    renderMembers();
    renderOrders();
}

init();

