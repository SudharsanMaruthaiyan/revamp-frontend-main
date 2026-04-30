import { axiosInstance } from "@/lib/axios-instance";

const USER_BASE = "/user";

export interface UserDetails {
  user_id: string;
  name: string;
  email: string;
  phone_number: string;
  profile_image_url?: string | null;
}

export interface UpdateProfilePayload {
  name?: string;
  email?: string;
  profile_image_url?: string | null;
}

export interface BaseApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export async function getUserApi(userId: string): Promise<BaseApiResponse<UserDetails>> {
  const res = await axiosInstance.get<BaseApiResponse<UserDetails>>(`${USER_BASE}/${userId}`);
  return res.data;
}

export async function updateProfileApi(
  userId: string,
  payload: UpdateProfilePayload
): Promise<BaseApiResponse<UserDetails>> {
  const res = await axiosInstance.put<BaseApiResponse<UserDetails>>(
    `${USER_BASE}/profile/${userId}`,
    payload
  );
  return res.data;
}
