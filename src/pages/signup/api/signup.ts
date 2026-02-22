import { http } from "../../../lib/http";

export type SignUpRequest = {
  email: string;
  password: string;
};

export async function signupApi(body: SignUpRequest) {
  await http.post("/auth/register", body);
}
