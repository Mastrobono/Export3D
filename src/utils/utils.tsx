// Smooth scroll Navbar
export const scrollToFn = (e: React.MouseEvent, id: string) => {
  e.preventDefault();
  const element = document.querySelector(`[data-section="${id}"]`);
  if (element) {
    const offset = 80; // Ajuste para el navbar fijo
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth"
    });
    if (id.includes("caso-")) {
      setTimeout(() => {
        element.click();
      }, 500); // Adjust the delay as needed
    }
  }
};
