// Helper functions for development mode only
export function installPackage(packageName: string): void {
  const command = `npm install ${packageName}`;
  
  // Copy to clipboard
  navigator.clipboard.writeText(command)
    .then(() => {
      alert(`Command copied to clipboard: ${command}`);
    })
    .catch(err => {
      console.error('Failed to copy command:', err);
      alert(`Run this command in your terminal: ${command}`);
    });
}

export function analyzeComponents(): Record<string, number> {
  const components: Record<string, number> = {};
  
  document.querySelectorAll('[data-component-name]').forEach(element => {
    const name = element.getAttribute('data-component-name');
    if (name) {
      components[name] = (components[name] || 0) + 1;
    }
  });
  
  return components;
}