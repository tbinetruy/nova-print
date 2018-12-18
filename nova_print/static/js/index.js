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

function textbox(props) {
  return `
<label>${props.label}: </label><input id="${props.id}" />
`;
}

function dropdown(props) {
  return `
<select>
    ${props.options.map(e => `<option value="${e}">${e}</option>`).join("")}
</select>
`;
}

const colorList = [
  "002684",
  "0060c1",
  "0069aa",
  "0aaac7",
  "119fd4",
  "11d43f",
  "123456",
  "19cba9",
  "3163c3",
  "359db3",
  "492b4c",
  "4b5e85",
  "4b7985",
  "4e57a3",
  "4f897d",
  "53df5a",
  "55a8e4",
  "5b254e",
  "5b4a84",
  "5e6983",
  "6b5c3c",
  "707f9c",
  "713975",
  "7e5141",
  "854c4b",
  "874c6d",
  "9e0000",
  "a5435f",
  "bd171f",
  "ff1d52",
  "ff2458",
  "ff2d59",
  "jb5c3c",
  "pi7654",
];

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

  const title = textbox({label: "Title", id: "title"});
  const subtitle = textbox({label: "Subtitle", id: "subtitle"});
  const colors = dropdown({options: colorList});
  const doctype = dropdown({options: ["memo"]});
  const headerInfo = column({children: [title, subtitle, colors, doctype]});
  const children = [headerInfo, r, b];

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
