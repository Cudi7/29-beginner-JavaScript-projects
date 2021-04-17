class Course {
  constructor(form, customerList) {
    this.form = form;
    this.customerList = customerList;
    this.imgNumber = 1;
  }

  displayCourse() {
    document.querySelector('.loading').style.display = 'block';

    console.log(this.imgNumber);

    setTimeout(() => {
      document.querySelector('.loading').style.display = 'none';
      this.customerList.innerHTML += `<div class="col-11 mx-auto col-md-6 col-lg-4 my-3">
      <div class="card text-left">
        <img src="./img/cust-${this.imgNumber}.jpg" class="card-img-top" alt="" />
        <div class="card-body">
          <!-- customer name -->
          <h6 class="text-capitalize">
            <span class="badge badge-warning mr-2">name :</span
            ><span id="customer-name"> ${this.name}</span>
          </h6>
          <!-- end of customer name -->
          <!-- customer name -->
          <h6 class="text-capitalize my-3">
            <span class="badge badge-success mr-2">course :</span
            ><span id="customer-course"> ${this.course} </span>
          </h6>
          <!-- end of customer name -->
          <!-- customer name -->
          <h6 class="text-capitalize">
            <span class="badge badge-danger mr-2">author :</span
            ><span id="course-author"> ${this.author}</span>
          </h6>
          <!-- end of customer name -->
        </div>
      </div>

      <!-- single customer -->
    </div>`;
      this.imgNumber++;
      if (this.imgNumber > 5) this.imgNumber = 0;
    }, 600);
  }

  handleInput(input) {
    this.input = input.target;
    let id = input.target.id;
    let value = input.target.value.trim();
    if (id === 'name') {
      this.name = value;
      this.checkedName = true;
    }
    if (id === 'course') {
      this.course = value;
      this.checkedCourse = true;
    }
    if (id === 'author') {
      this.author = value;
      this.checkedAuthor = true;
    }
  }

  handleSubmit() {
    const inputElements = [...form.querySelectorAll('.form-control')];
    const validationInput = /^[a-zA-Z0-9_.-\s]*$/;
    const { name, course, author } = this;

    if (
      name.match(validationInput) &&
      course.match(validationInput) &&
      author.match(validationInput)
    ) {
      inputElements.forEach((element) => {
        const el = element.previousElementSibling.querySelector(
          '.input-group-text'
        );
        el.classList.remove('fail');
        el.classList.add('complete');
      });
      inputElements.forEach((value) => (value.value = ''));

      this.displayCourse();
    } else {
      inputElements.forEach((element) => {
        const el = element.previousElementSibling.querySelector(
          '.input-group-text'
        );

        if (!element.value.match(validationInput)) {
          el.classList.remove('complete');
          el.classList.add('fail');
        } else {
          el.classList.remove('fail');
          el.classList.add('complete');
        }
      });
    }
  }
}

const form = document.querySelector('#customer-form');
const customerList = document.querySelector('.customer-list');
const inputForm = [...document.querySelectorAll('.form-control')];
const newCourse = new Course(form, customerList);

form.addEventListener('submit', (e) => {
  e.preventDefault();
  newCourse.handleSubmit();
});

inputForm.forEach((input) => {
  input.addEventListener('keyup', (e) => {
    newCourse.handleInput(e);
  });
});
