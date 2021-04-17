function budgedTemplate(item) {
  return `<div class="expense-item d-flex justify-content-between align-items-baseline">
    <h6 class="expense-title mb-0 text-uppercase list-item">${item.text}</h6>
    <h5 class="expense-amount mb-0 list-item">${item.value}</h5>
    <div class="expense-icons list-item">
      <a href="#" class="edit-icon mx-2" data-id="${item.id}">
        <i class="fas fa-edit"></i>
      </a>
      <a href="#" class="delete-icon" data-id="${item.id}">
        <i class="fas fa-trash"></i>
      </a>
    </div>
</div>`;
}

export { budgedTemplate };
