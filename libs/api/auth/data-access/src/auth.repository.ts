import { IAuth } from '@mp/api/auth/util';
import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';

@Injectable()
export class AuthRepository {
  async updateProfile(auth: IAuth) {
    await admin.auth().updateUser(auth.id, {
      displayName: auth.displayName,
      email: auth.email ? auth.email : undefined,
      photoURL: auth.photoURL,
      phoneNumber: auth.phoneNumber,
      password: auth.password ? auth.password : undefined,
    });
  }

  async removeUser(auth: IAuth) {
    await admin.auth().
    deleteUser(auth.id)
    .then(() => {
      console.log('Successfully deleted user');
    })
    .catch((error) => {
      console.log('Error deleting user:', error);
    });
  
  }
}
