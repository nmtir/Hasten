const steps = [
  {
    id: "intro",
    attachTo: { element: "#logo-tour", on: "bottom" },
    buttons: [
      {
        text: "Skip",
        classes: "btn btn-warning",
        action() {
          return this.complete();
        },
      },
      {
        classes: "btn btn-success",
        text: "Next",
        action() {
          return this.next();
        },
      },
    ],
    title: "Welcome Back !",
    text: ["This is Step 1"],
  },

  {
    id: "intro1",
    attachTo: { element: "#register-tour", on: "left" },

    buttons: [
      {
        text: "Back",
        classes: "btn btn-light",
        action() {
          return this.back();
        },
      },
      {
        text: "Skip",
        classes: "btn btn-warning",
        action() {
          return this.complete();
        },
      },
      {
        text: "Next",
        classes: "btn btn-success",
        action() {
          return this.next();
        },
      },
    ],
    title: "Register your account",
    text: "Get your Free Hasten account now.",
  },
  {
    id: "intro2",
    attachTo: { element: "#login-tour", on: "bottom" },
    buttons: [
      {
        text: "Back",
        classes: "btn btn-light",
        action() {
          return this.back();
        },
      },
      {
        text: "Skip",
        classes: "btn btn-warning",
        action() {
          return this.complete();
        },
      },
      {
        text: "Next",
        classes: "btn btn-success",
        action() {
          return this.next();
        },
      },
    ],
    title: "Login your account",
    text: "Sign in to continue",
  },
  {
    id: "intro3",
    attachTo: { element: "#getproduct-tour", on: "bottom" },
    buttons: [
      {
        text: "Back",
        classes: "btn btn-light",
        action() {
          return this.back();
        },
      },
      {
        text: "Skip",
        classes: "btn btn-warning",
        action() {
          return this.complete();
        },
      },
      {
        text: "Next",
        classes: "btn btn-success",
        action() {
          return this.next();
        },
      },
    ],
    title: "Get yout Product",
    text: "Sign in to continue",
  },
  {
    id: "intro4",
    attachTo: { element: "#thankyou-tour", on: "top" },
    buttons: [
      {
        text: "Back",
        classes: "btn btn-light",
        action() {
          return this.back();
        },
      },
      {
        text: "Thank you !",
        classes: "btn btn-primary",
        action() {
          return this.complete();
        },
      },
    ],
    title: "Thank you !",
    text: "Sign in to continue",
  },
];

export default steps;
