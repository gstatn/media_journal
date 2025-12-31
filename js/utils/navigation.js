// Navigation between sections
function showSection(sectionName) {
  // Hide all sections
  const allSections = document.querySelectorAll('.view-section');
  allSections.forEach(section => {
    section.classList.remove('active');
  });
  
  // Show the selected section
  const targetSection = document.getElementById(`${sectionName}-section`);
  if (targetSection) {
    targetSection.classList.add('active');
  }
}
