import { getToken } from "./token";

const port = 8000;
const api = `http://localhost:${port}/`;

interface RequestOptions {
  method: string;
  headers?: Record<string, string>;
  body: any;
}

const post = (endpoint: string, body: any, json: boolean = true) => {
  let requestOptions: RequestOptions = {
    method: "POST",
    body,
  };
  if (json) {
    requestOptions = {
      ...requestOptions,
      headers: {
        "Content-Type": "application/json",
      },
    };
  }
  return fetch(endpoint, requestOptions);
};

const put = (endpoint: string, body: string) => {
  return fetch(endpoint, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body,
  });
};

const get = (endpoint: string) => {
  return fetch(endpoint);
};

export interface apiRegisterProps {
  username: string;
  password: string;
  email: string;
}
const apiRegister = async (body: apiRegisterProps) => {
  const endpoint = `${api}registerUser`;
  return post(endpoint, JSON.stringify(body));
};

export interface apiLoginProps {
  username: string;
  password: string;
}

const apiLogin = async (body: apiLoginProps) => {
  const endpoint = `${api}login`;
  return put(endpoint, JSON.stringify(body));
};

const apiLogout = async () => {
  const username = getToken("username");
  if (!username) {
    return new Promise<null>((resolve) => resolve(null));
  }
  const endpoint = `${api}logout/${username}`;
  return put(endpoint, JSON.stringify({ username }));
};

const apiPublishTag = async (body: FormData) => {
  const username = getToken("username");
  if (!username) {
    return new Promise<null>((resolve) => resolve(null));
  }
  const endpoint = `${api}publishTag/${username}`;
  return post(endpoint, body, false);
};

const apiMyTags = async () => {
  const username = getToken("username");
  if (!username) {
    return new Promise<null>((resolve) => resolve(null));
  }
  const endpoint = `${api}myTags/${username}`;
  return get(endpoint);
};

const apiViewTags = async () => {
  const endpoint = `${api}viewTags`;
  return get(endpoint);
};

export {
  api,
  apiRegister,
  apiLogin,
  apiLogout,
  apiPublishTag,
  apiMyTags,
  apiViewTags,
};
