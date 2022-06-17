const renderLogBtn = () => {
    const btnLog = document.querySelector('#btn-log');
    const username = localStorage.getItem('username');
    if (username) {
        btnLog.classList.add('btn-logout');
        btnLog.setAttribute('href', "#");
        btnLog.prepend('Logout');
    } else {
        btnLog.prepend('Login');
    }
}
renderLogBtn();
console.log('테스트')

const btnLogout = document.querySelector('.btn-logout');
btnLogout.addEventListener('click', (e) => {
    e.preventDefault();
    localStorage.removeItem('username');
    window.location.href = '/';
})