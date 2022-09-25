import { compare, genSalt, hash } from "bcryptjs";

const hashPassword = async function (rawPw: string): Promise<string> {
  const salt = await genSalt();
  const hashedPw = await hash(rawPw, salt);

  return hashedPw;
};

const checkPassword = async function (
  rawPw: string,
  hashedPw: string
): Promise<boolean> {
  return await compare(rawPw, hashedPw);
};

export { hashPassword, checkPassword };
