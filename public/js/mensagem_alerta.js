

// Inject minimal CSS
const css = `
    .visu-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
    opacity: 0;
    transition: opacity 200ms ease;
    pointer-events: none;
    }
    .visu-overlay.visible { opacity: 1; pointer-events: auto; }

    .visu-alert {
    background: #fff;
    color: #111;
    min-width: 280px;
    max-width: 90%;
    border-radius: 8px;
    box-shadow: 0 8px 30px rgba(0,0,0,0.35);
    transform: translateY(-8px);
    transition: transform 220ms ease, opacity 220ms ease;
    opacity: 0;
    padding: 16px 16px 12px 16px;
    display: flex;
    gap: 12px;
    align-items: flex-start;
    }
    .visu-overlay.visible .visu-alert {
    transform: translateY(0);
    opacity: 1;
    }

    .visu-alert .icon {
    font-size: 20px;
    line-height: 1;
    color: #b91c1c; /* red */
    margin-top: 2px;
    flex: 0 0 auto;
    }
    .visu-alert .content {
    flex: 1 1 auto;
    font-size: 14px;
    }
    .visu-alert .title {
    font-weight: 600;
    margin-bottom: 4px;
    }
    .visu-alert .close-btn {
    background: transparent;
    border: none;
    color: #6b7280;
    font-size: 18px;
    cursor: pointer;
    padding: 4px;
    margin-left: 8px;
    flex: 0 0 auto;
    }
    @media (prefers-reduced-motion: reduce) {
    .visu-overlay, .visu-alert { transition: none; transform: none; }
    }
`;
const style = document.createElement('style');
style.textContent = css;
document.head.appendChild(style);

// Create overlay + alert elements
const overlay = document.createElement('div');
overlay.className = 'visu-overlay';
overlay.setAttribute('role', 'presentation');

const alertBox = document.createElement('div');
alertBox.className = 'visu-alert';
alertBox.setAttribute('role', 'alertdialog');
alertBox.setAttribute('aria-live', 'assertive');
alertBox.setAttribute('aria-hidden', 'true');

alertBox.innerHTML = `
    <div class="icon" aria-hidden="true">⚠️</div>
    <div class="content">
    <div class="title">Error</div>
    <div class="message">An error occurred.</div>
    </div>
    <button class="close-btn" aria-label="Close alert">&times;</button>
`;

overlay.appendChild(alertBox);
document.body.appendChild(overlay);

const messageNode = alertBox.querySelector('.message');
const titleNode = alertBox.querySelector('.title');
const closeBtn = alertBox.querySelector('.close-btn');

let hideTimer = null;

function mostrarErro(message, opts) {
    opts = opts || {};
    const title = opts.title || 'Error';
    const timeout = typeof opts.timeout === 'number' ? opts.timeout : (opts.autoHide === false ? 0 : 5000);

    titleNode.textContent = title;
    messageNode.textContent = message || '';

    overlay.classList.add('visible');
    alertBox.setAttribute('aria-hidden', 'false');

    closeBtn.focus();

    if (hideTimer) {
        clearTimeout(hideTimer);
        hideTimer = null;
    }
    if (timeout > 0) {
        hideTimer = setTimeout(ocultarErro, timeout);
    }
}

function ocultarErro() {
    overlay.classList.remove('visible');
    alertBox.setAttribute('aria-hidden', 'true');
    if (hideTimer) {
        clearTimeout(hideTimer);
        hideTimer = null;
    }
}

overlay.addEventListener('click', function (e) {
    if (e.target === overlay) ocultarErro();
});

closeBtn.addEventListener('click', ocultarErro);

window.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' || e.key === 'Esc') {
        if (overlay.classList.contains('visible')) {
            ocultarErro();
        }
    }
});

window.mostrarErro = mostrarErro;
window.ocultarErro = ocultarErro;