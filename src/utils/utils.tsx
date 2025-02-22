// Smooth scroll Navbar
export const scrollToFn = (e, id) => {
  e.preventDefault();
  const element = document.getElementById(id);
  if (element) {
    const rect = element.getBoundingClientRect();
    window.scrollTo({
      top: rect.top + window.scrollY - 80, // Adjust the offset as needed
      behavior: "smooth",
    });
    if (id.includes("caso-")) {
      setTimeout(() => {
        element.click();
      }, 500); // Adjust the delay as needed
    }
  }
};
