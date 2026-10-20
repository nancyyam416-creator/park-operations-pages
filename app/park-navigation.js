// 独立园区发布的导航边界；沿用原业务构建产物。
(() => {
  const home = '/park-operations-pages/';
  const url = new URL(location.href);
  for (const [key, value] of Object.entries({role:'project_admin',projectType:'park',projectId:'project-hq-1',tenantId:'tenant-hq'})) url.searchParams.set(key,value);
  url.searchParams.delete('aiPlatformPreview');
  url.searchParams.delete('aiPreview');
  history.replaceState({}, '', url);
  const apply = () => {
    document.querySelectorAll('button').forEach(button => {
      if (/切换视角/.test(button.getAttribute('aria-label') || '')) button.hidden = true;
      if (button.getAttribute('aria-label') === '返回统一应用入口') {
        button.setAttribute('title','返回园区应用入口');
        if (button.textContent.trim() === '应用入口') button.lastChild.textContent = '园区入口';
      }
    });
    for (const label of ['当前租户','当前项目']) {
      const select = document.querySelector(`select[aria-label="${label}"]`);
      if (!select) continue;
      const allowed = label === '当前租户' ? 'tenant-hq' : 'project-hq-1';
      for (const option of select.options) {option.hidden = option.value !== allowed; option.disabled = option.value !== allowed;}
      if (label === '当前租户') select.disabled = true;
    }
  };
  document.addEventListener('click', event => {
    const button = event.target.closest?.('button');
    if (!button) return;
    const label = button.getAttribute('aria-label') || '';
    if (/切换视角/.test(label)) {event.preventDefault();event.stopImmediatePropagation();}
    if (label === '返回统一应用入口') {event.preventDefault();event.stopImmediatePropagation();location.assign(home);}
  },true);
  document.addEventListener('DOMContentLoaded', () => {
    const style = document.createElement('style');
    style.textContent = 'button[hidden]{display:none!important}';
    document.head.appendChild(style);
    new MutationObserver(apply).observe(document.getElementById('root'), {childList:true,subtree:true});
    apply();
  });
})();
