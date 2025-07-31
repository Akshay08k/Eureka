import { UpdateUserReq } from "../../../types";
import axios from "../lib/axios";

export async function updateUser(user: UpdateUserReq) {
  const res = await axios.put("/api/user/update", user);

  if (res.data === 200) {
    return res.data;
  }
  
  return false;
}
