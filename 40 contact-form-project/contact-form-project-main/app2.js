class ContactForm {
  constructor(nameInput, emailInput, messageInput) {
    this.nameInput = nameInput;
    this.emailInput = emailInput;
    this.messageInput = messageInput;
  }

  sendMessage() {
    let message = [
      {
        titleName: this.nameInput.value,
        email: this.emailInput.value,
        message: this.messageInput.value,
      },
    ];

    let localStorageItems = JSON.parse(localStorage.getItem('Message')) || '';

    if (localStorageItems) {
      localStorageItems.push(message);
      localStorageItems = JSON.stringify(localStorageItems);

      localStorage.setItem('Message', localStorageItems);
      console.log('si habia algo');
    } else {
      message = JSON.stringify(message);
      localStorage.setItem('Message', message);
      console.log('no habia nada, primer registro');
    }
    alert('Message sent');
    this.handleReset();
  }

  clearError() {
    setTimeout(() => {
      if (this.nameInput.value.includes('fill')) this.nameInput.value = '';
      if (this.emailInput.value.includes('fill')) this.emailInput.value = '';
      if (this.messageInput.value.includes('fill'))
        this.messageInput.value = '';
    }, 1000);
  }

  displayError() {
    if (!this.nameInput.value) this.nameInput.value = 'Please, fill this input';
    if (!this.emailInput.value)
      this.emailInput.value = 'Please, fill this input';
    if (!this.messageInput.value)
      this.messageInput.value = 'Please, fill this input';

    this.clearError();
  }

  handleSend() {
    if (
      this.nameInput.value &&
      this.emailInput.value &&
      this.messageInput.value
    ) {
      this.sendMessage();
    } else {
      this.displayError();
    }
  }

  handleReset() {
    this.nameInput.value = '';
    this.emailInput.value = '';
    this.messageInput.value = '';
  }
}

const nameInput = document.querySelector('#name');
const emailInput = document.querySelector('#email');
const messageInput = document.querySelector('#message');

const sendBtn = document.querySelector('#send');
const resetBtn = document.querySelector('#reset');

const newMessage = new ContactForm(nameInput, emailInput, messageInput);

resetBtn.addEventListener('click', (e) => {
  e.preventDefault();
  newMessage.handleReset();
});

sendBtn.addEventListener('click', (e) => {
  e.preventDefault();
  newMessage.handleSend();
});
