const clientId = "F9pKxCwq8n9mr41YwLjFjAoaXOL7FOs7rEvzirTA";
const clientSecret =
  "8sfNsRo5wfSYmD0hzqPesPWCcTnoU7SyYsbgpdvypj2riZSTFzPs01mnlOb6m9MVbVhIgp7jfmMNAAqC5EeyWk08QiDJDxyQqttwEFkav13ZygCU71HsCbDb7GhYaoJ4";

class API {
  async login(username, password) {
    const url = `/authenticate/?client_id=${clientId}&client_secret=${clientSecret}&grant_type=password`;

    const body = JSON.stringify({
      username,
      password,
    });
    const headers = {
      "Content-Type": "application/json",
    };
    const options = {method: "POST", body, headers};

    const resp = await fetch(url, options);
    const user = await resp.json();

    return user;
  }

  async fetchDocuments(token) {
    const url = `/api/documents`;
    const options = {
      headers: {
        Authorization: `Token ${token}`,
      },
    };

    let json = {};
    try {
      const r = await fetch(url, options);
      json = await r.json();

      return json;
    } catch (e) {
      console.log(e);
    }

    return json;
  }

  async saveDocument(token, document) {
    const url = `/api/documents/${document.pk}/`;
    const options = {
      method: "PUT",
      headers: {
        authorization: `Token ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(document),
    };

    let json = {};
    try {
      const r = await fetch(url, options);
      const json = await r.json();
      console.log(json);
    } catch (e) {
      console.log(e);
    }

    return json;
  }

  async createDocument(user) {
    const defaultDocument = {
      title: "Title",
      subtitle: "Subtitle",
      author: user.id,
      org: "Org mode goes here",
      toc: false,
      theme_color: "119fd4",
    };
    const url = `/api/documents/`;
    const options = {
      method: "POST",
      headers: {
        authorization: `Token ${user.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(defaultDocument),
    };

    try {
      await fetch(url, options);
    } catch (e) {
      console.log(e);
    }
  }

  async compileDocument(org, filename) {
    const data = {
      org,
      filename,
    };
    const options = {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    };
    await fetch("/submit", options);
  }
}

export default API;
