export const copyToClipBoard = async (copyText: string) => {
  if (navigator.clipboard) {
    try {
      await navigator.clipboard.writeText(copyText);
      return true;
    } catch (err) {
      throw err;
    }
  }
  // Legacy fallback
  else {
    try {
      const textArea = document.createElement('textarea');
      textArea.value = copyText;

      // Avoid scrolling to bottom
      textArea.style.top = '0';
      textArea.style.left = '0';
      textArea.style.position = 'fixed';

      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();

      const copy = document.execCommand('copy');

      document.body.removeChild(textArea);

      return copy;
    } catch (err) {
      throw err;
    }
  }
};
