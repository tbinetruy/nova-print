function button(props) {
  return `<button id="${props.id}">${props.title}</button>`;
}

function textarea(props) {
  return `
<textarea id="${props.id}">
    ${props.value}
</textarea>
`;
}

function column(props) {
  return `
<div class='col'>
    ${props.children.join("")}
</div>
`;
}

function row(props) {
  return `
<div class='row' id='${props.id}'>
    ${props.children.join("")}
</div>
`;
}

function iframe(props) {
  return `
<iframe src="${props.url}">
</iframe>
`;
}

function appDumb(props) {
  const b = button({title: "Submit", id: props.submitId});
  const t = textarea({
    id: props.textareaId,
    value: props.textareaValue,
  });
  const i = iframe({
    url: "/static/output.pdf",
  });
  const r = row({
    children: [t, i],
    id: "main-panel",
  });
  const children = [r, b];

  return `
<div>
    <h1>${props.title}</h1>
    ${column({children})}
</div>
`;
}

function readCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}

class App {
  constructor(props) {
    this.props = props;
    this.mp = document.getElementById("mountpoint");
    this.state = {
      textareaValue: "Enter orgmode here",
    };

    this.render();
  }
  getSubmitButton() {
    return document.getElementById(this.props.submitId);
  }
  getTextarea() {
    return document.getElementById(this.props.textareaId);
  }
  bindSubmitButton() {
    this.getSubmitButton().onclick = this.submit.bind(this);
  }
  async submit() {
    const org = this.getTextarea().value;
    const data = {
      org,
    };
    const options = {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": readCookie("csrftoken"),
      },
    };
    const resp = await fetch("/submit", options);
    this.state.textareaValue = org;

    this.render();
  }
  render() {
    const html = appDumb({
      title: "Nova Print",
      submitId: this.props.submitId,
      textareaId: this.props.textareaId,
      textareaValue: this.state.textareaValue,
    });

    this.mp.innerHTML = html;

    this.bindSubmitButton();
  }
}

const a = new App({
  submitId: "hello",
  textareaId: "ttt",
});
