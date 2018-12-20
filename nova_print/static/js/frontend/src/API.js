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
    const url = `/api/nested-documents`;
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
    const images = document.images.map(i => i.pk);
    document = {
      ...document,
      images,
    };
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

  async createFigure(token, file, title = "") {
    const url = `/api/figures/`;
    const body = {
      image: file,
      title: title,
    };
    const formData = new FormData();
    formData.append("image", file);
    formData.append("file", file);
    formData.append("title", title);

    const options = {
      method: "POST",
      headers: {
        authorization: `Token ${token}`,
        X_FILENAME: file.name,
      },
      body: formData,
    };

    try {
      await fetch(url, options);
    } catch (e) {
      console.log(e);
    }
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

  async compileDocument(org, filename, figures) {
    const data = {
      org,
      filename,
      figures,
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
