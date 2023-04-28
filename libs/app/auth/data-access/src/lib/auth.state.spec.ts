import { NotImplementedException } from '@nestjs/common';
import { AuthApi } from '../auth.api'
import {
  Auth, authState, createUserWithEmailAndPassword,
  GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup,
  updatePassword, sendPasswordResetEmail
} from '@angular/fire/auth';
import { mock, when } from 'ts-mockito';
import { Functions } from '@angular/fire/functions';


describe('AuthApi', () => {
  let authapi : AuthApi
  const auth = mock(Auth);
  const functions = mock(Functions);

  when(createUserWithEmailAndPassword).thenReturn(jest.fn());
  

  beforeEach(() => {
     authapi = new AuthApi(auth, functions);
  });

  describe('ResetAuth', () => {
    it('should work', async () => {

      
      expect(await authapi.register('Male', '20', 'Test', 'Jest', 'example@gmail.com', '1234password')).toEqual(NotImplementedException);
    });
  });
});
  