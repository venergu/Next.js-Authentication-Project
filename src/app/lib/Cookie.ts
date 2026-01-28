import { cookies } from "next/headers";

export class Cookie {
  static options = {
    path: "/",
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    maxAge: 60 * 60 * 24 * 7,
  } as const;

  static get = async (name: string) =>
    cookies().then((store) => store.get(name)?.value ?? null);

  static make = (name: string, value: string) => ({
    ...Cookie.options,
    name,
    value,
  });
}
