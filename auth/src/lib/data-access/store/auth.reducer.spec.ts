// import * as AuthActions from '@auth-module';
// import { AuthReducer, initialAuthState, LoginRequest, LoginStoreResponse } from '@auth-module';

// describe('AuthReducer', () => {

//   it('should set loading true on loginUser', () => {
//     const payload: LoginRequest = { emailId: 'keti@gmail.com', password: '12345678' };
//     const action = AuthActions.loginUser({ payload });

//     const state = AuthReducer(initialAuthState, action);

//     expect(state.loading).toBe(true);
//     expect(state.isLoggedIn).toBe(false);
//   });

//   it('should update state on loginUserSuccess', () => {
//     const response: LoginStoreResponse = {
//         message: 'Success',
//         result: true,
//         data: {
//             userId: 1,
//             emailId: 'keti@gmail.com',
//         }
//     };

//     const action = AuthActions.loginUserSuccess({ data: response });

//     const state = AuthReducer(initialAuthState, action);

//     expect(state.loading).toBe(false);
//     expect(state.isLoggedIn).toBe(true);
//     expect(state.isSuccess).toBe(true);
//     expect(state.message).toBe('Success');
//     expect(state.user).toEqual({
//       emailId: 'keti@gmail.com',
//       userId: 1
//     });
//   });

//   it('should set error state on loginUserFailure', () => {
//     const action = AuthActions.loginUserFailure({ error: 'Invalid credentials' });

//     const state = AuthReducer(initialAuthState, action);

//     expect(state.loading).toBe(false);
//     expect(state.isLoggedIn).toBe(false);
//     expect(state.isSuccess).toBe(false);
//     expect(state.message).toBe('Invalid credentials');
//   });

// });
