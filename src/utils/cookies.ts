import { NextApiResponse } from "next";
import nookies from "nookies";
import * as cookiesNext from "cookies-next";

type ResConfig = {
  res: NextApiResponse;
};
interface ParamCookie {
  key: string;
  value: object | string | number | boolean;
}

export const cookies = {
  setCookie({ key, value }: ParamCookie) {
    cookiesNext.setCookie(key, value);
  },
  getCookie(key: string): string | undefined {
    return cookiesNext.getCookie(key);
  },
  deleteCookie(key: string) {
    cookiesNext.deleteCookie(key);
  },
  removeAllCookies() {
    const allCookies = nookies.get();
    Object.keys(allCookies).forEach((key) => {
      nookies.destroy(null, key);
    });
  },
};
