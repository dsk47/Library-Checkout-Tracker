const borrowForm = document.getElementById('borrowForm');
const borrowList = document.getElementById('borrowList');

// Fetch and display borrowed books
async function loadBorrows() {
  const res = await fetch('/api/borrows');
  const borrows = await res.json();
  borrowList.innerHTML = '';

  borrows.forEach(borrow => {
    const li = document.createElement('li');
    li.textContent = `${borrow.bookTitle} - ${borrow.borrowerName}`;

    const btn = document.createElement('button');
    btn.textContent = 'Returned';
    btn.classList.add('return');
    btn.onclick = () => returnBook(borrow._id);

    li.appendChild(btn);
    borrowList.appendChild(li);
  });
}

// Add borrow record
borrowForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const bookTitle = document.getElementById('bookTitle').value;
  const borrowerName = document.getElementById('borrowerName').value;

  await fetch('/api/borrows', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ bookTitle, borrowerName })
  });

  borrowForm.reset();
  loadBorrows();
});

// Mark book as returned (delete)
async function returnBook(id) {
  await fetch(`/api/borrows/${id}`, { method: 'DELETE' });
  loadBorrows();
}

// Initial load
loadBorrows();
