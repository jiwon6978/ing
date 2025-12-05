// API Base URL - 백엔드 서버 주소
const API_BASE_URL = 'http://localhost:8090/api';

document.addEventListener('DOMContentLoaded', () => {
    initAuthTabs();
    initLoginForm();
    initRegisterForm();
    checkLoginStatus();
});

// 탭 전환 기능
function initAuthTabs() {
    const tabs = document.querySelectorAll('.auth-tab');
    const forms = document.querySelectorAll('.auth-form');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const targetTab = tab.dataset.tab;

            // 탭 활성화
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            // 폼 전환
            forms.forEach(form => {
                form.classList.remove('active');
                if (form.id === `${targetTab}-form`) {
                    form.classList.add('active');
                }
            });
        });
    });
}

// 로그인 폼 처리
function initLoginForm() {
    const loginForm = document.getElementById('login-form');
    if (!loginForm) return;

    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const username = document.getElementById('login-username').value;
        const password = document.getElementById('login-password').value;
        const messageEl = document.getElementById('login-message');

        try {
            const response = await fetch(`${API_BASE_URL}/users/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            const data = await response.json();

            if (data.success) {
                messageEl.textContent = '로그인 성공!';
                messageEl.className = 'auth-message success';

                // 사용자 정보 저장
                localStorage.setItem('user', JSON.stringify(data.user));
                localStorage.setItem('isLoggedIn', 'true');

                // 홈으로 이동
                setTimeout(() => {
                    window.location.href = '/';
                }, 1000);
            } else {
                messageEl.textContent = data.message || '로그인 실패';
                messageEl.className = 'auth-message error';
            }
        } catch (error) {
            messageEl.textContent = '서버 연결에 실패했습니다. 백엔드 서버가 실행 중인지 확인해주세요.';
            messageEl.className = 'auth-message error';
            console.error('Login error:', error);
        }
    });
}

// 회원가입 폼 처리
function initRegisterForm() {
    const registerForm = document.getElementById('register-form');
    if (!registerForm) return;

    registerForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = {
            username: document.getElementById('reg-username').value,
            email: document.getElementById('reg-email').value,
            password: document.getElementById('reg-password').value,
            name: document.getElementById('reg-name').value || null,
            phone: document.getElementById('reg-phone').value || null,
            address: document.getElementById('reg-address').value || null,
        };

        const messageEl = document.getElementById('register-message');

        try {
            const response = await fetch(`${API_BASE_URL}/users/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (data.success) {
                messageEl.textContent = '회원가입 성공! 로그인해주세요.';
                messageEl.className = 'auth-message success';

                // 로그인 탭으로 전환
                setTimeout(() => {
                    document.querySelector('[data-tab="login"]').click();
                    registerForm.reset();
                }, 1500);
            } else {
                messageEl.textContent = data.message || '회원가입 실패';
                messageEl.className = 'auth-message error';
            }
        } catch (error) {
            messageEl.textContent = '서버 연결에 실패했습니다. 백엔드 서버가 실행 중인지 확인해주세요.';
            messageEl.className = 'auth-message error';
            console.error('Register error:', error);
        }
    });
}

// 로그인 상태 확인
function checkLoginStatus() {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const user = JSON.parse(localStorage.getItem('user') || 'null');

    if (isLoggedIn && user) {
        updateNavForLoggedInUser(user);
    }
}

// 로그인된 사용자 UI 업데이트
function updateNavForLoggedInUser(user) {
    // 네비게이션이 로드된 후 업데이트
    setTimeout(() => {
        const navMenu = document.getElementById('nav-menu');
        if (navMenu) {
            const loginLink = navMenu.querySelector('a[href="/login.html"]');
            if (loginLink) {
                loginLink.parentElement.innerHTML = `
                    <span class="user-info">
                        <span class="user-name">${user.name || user.username}님</span>
                        <button class="btn-logout" onclick="logout()">로그아웃</button>
                    </span>
                `;
            }
        }
    }, 100);
}

// 로그아웃
function logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('isLoggedIn');
    window.location.href = '/';
}

// 전역으로 logout 함수 노출
window.logout = logout;

