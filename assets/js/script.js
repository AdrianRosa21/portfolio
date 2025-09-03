'use strict';

// Helper
const $ = (s, ctx = document) => ctx.querySelector(s);
const $$ = (s, ctx = document) => Array.from(ctx.querySelectorAll(s));
const toggle = el => el && el.classList.toggle('active');

/* === Sidebar (mobile) === */
const sidebar = $('[data-sidebar]');
$('[data-sidebar-btn]')?.addEventListener('click', () => toggle(sidebar));

/* === Navegación entre páginas ===
   Coincide el texto del botón con data-page (en minúsculas):
   "Acerca" -> data-page="acerca", etc.  */
const links = $$('[data-nav-link]');
const pages = $$('[data-page]');

links.forEach(link => {
  link.addEventListener('click', () => {
    const target = link.textContent.trim().toLowerCase();

    pages.forEach(p => p.classList.toggle('active', p.dataset.page === target));
    links.forEach(l => l.classList.toggle('active', l === link));

    window.scrollTo(0, 0);
  });
});

/* === Formulario: habilitar botón solo si es válido === */
const form = $('[data-form]');
const formBtn = $('[data-form-btn]');
const inputs = $$('[data-form-input]');

const updateBtn = () => {
  if (!form || !formBtn) return;
  form.checkValidity()
    ? formBtn.removeAttribute('disabled')
    : formBtn.setAttribute('disabled', '');
};

// Estado inicial + escucha de cambios
updateBtn();
inputs.forEach(i => i.addEventListener('input', updateBtn));
