import { NextApiResponse } from "next";
import nookies from "nookies";

type ResConfig = {
  res: NextApiResponse;
};
interface ParamCookie {
  key: string;
  value: object | string | number | boolean;
  serverConfig?: ResConfig;
}

export const cookies = {
  setCookie({ key, value, serverConfig }: ParamCookie) {
    let encodeSID = value;
    const now = new Date();
    const time = now.getTime();
    const expireTime = time + 1000 * 36000;

    encodeSID = window?.btoa(JSON.stringify(value));

    // if serverConfig was null/undefined/not set, cookies automatically in client side mode
    nookies.set(serverConfig, key, String(encodeSID), {
      maxAge: expireTime,
      path: "/",
      domain:
        process.env.NODE_ENV === "development" ? "localhost" : ".renos.id",
      // httpOnly: true,
    });
  },
  getCookie(key: string): string | undefined {
    return nookies.get(null)[key];
  },
  // if serverConfig was null/undefined/not set, cookies automatically in client side mode
  deleteCookie(key: string, serverConfig?: ResConfig) {
    nookies.destroy(serverConfig, key);
  },
  removeAllCookies() {
    const allCookies = nookies.get();
    Object.keys(allCookies).forEach((key) => {
      nookies.destroy(null, key);
    });
  },
};
