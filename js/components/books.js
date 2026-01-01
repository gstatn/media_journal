// js/components/books.js

function initBookFilters() {
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      document.querySelectorAll('.filter-btn').forEach(b => {
        b.classList.remove('active');
      });
      this.classList.add('active');
      
      // You can add filtering logic here later
      const filterType = this.dataset.filter;
      console.log('Filtering by:', filterType);
    });
  });
}

// Call it when page loads
initBookFilters();
