import {IUser} from "@mp/api/users/util";

export interface IGetUserProfileResponse {
  status: number;
  status_name: string;
  content: IUser | { error_message: string}
}
