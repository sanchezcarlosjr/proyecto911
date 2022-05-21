/**
 * Prevent user from typing non-numeric values in number input
 * IMPORTANT: This is only a client-side solution, you should still be 
 * performing back-end validation!
 */
document.getElementById('number-input').addEventListener(event => {
  // Allow keyboard shortcuts
  if (
    event.getModifierState('Meta') ||
    event.getModifierState('Control') ||
    event.getModifierState('Alt')
  ) {
    return
  }

  // Allow non-printable keys
  if (key.length !== 1 || key === '\x00') {
    return
  }

  // Prevent any non-numeric keys, but allow . for decimals 
  // and - for negative values
  if ((key < '0' || key > '9') && key !== '.' && key !== '-') {
    event.preventDefault()
  }
})
