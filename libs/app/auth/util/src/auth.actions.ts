import { User } from '@angular/fire/auth';

export class SubscribeToAuthState {
  static readonly type = '[Auth] SubscribeToAuthState';
}

export class SetUser {
  static readonly type = '[Auth] SetUser';
  constructor(public readonly user: User | null) {}
}

export class Login {
  static readonly type = '[Auth] Login';
  constructor(
    public readonly email: string,
    public readonly password: string
  ) {}
}

export class Register {
  static readonly type = '[Auth] Register';
  constructor(
    public readonly gender: string,
    public readonly age: string,
    public readonly firstname: string,
    public readonly lastname: string,
    public readonly email: string,
    public readonly password: string
  ) {}
}

export class ResetPassword {
  static readonly type = '[Auth] ResetPassword';
  constructor(
    public readonly email: string,
    public readonly password: string,
    public readonly newPassword: string
  ) {}
}

export class ForgotPassword {
  static readonly type = '[Auth] ForgotPassword';
  constructor(
    public readonly email: string,
  ) {}
}

export class ContinueWithGoogle {
  static readonly type = '[Auth] ContinueWithGoogle';
}


export class RemoveAuth {
  static readonly type = '[Auth] RemoveAut';
}

export class Logout {
  static readonly type = '[Auth] Logout';
}
