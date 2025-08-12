export function reloadPage() {
  if (typeof window !== 'undefined' && window.location && typeof window.location.reload === 'function') {
    window.location.reload();
  }
}

const reloadUtils = { reloadPage };
export default reloadUtils; 