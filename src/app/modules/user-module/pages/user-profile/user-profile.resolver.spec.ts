import { TestBed } from '@angular/core/testing';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { firstValueFrom, of, throwError } from 'rxjs';
import { UserFacade } from '@user-module/services/user.facade';
import { UserProfileResolve } from './user-profile.resolver';

describe('UserProfileResolve', () => {
  let userFacade: jest.Mocked<Pick<UserFacade, 'getUserByEmail'>>;
  let router: jest.Mocked<Pick<Router, 'navigate'>>;

  const mockUser = {
    userId: 1,
    userName: 'john',
    emailId: 'john@mail.com',
    fullName: 'John',
  };

  beforeEach(() => {
    userFacade = { getUserByEmail: jest.fn() };
    router = { navigate: jest.fn() };

    TestBed.configureTestingModule({
      providers: [
        { provide: UserFacade, useValue: userFacade },
        { provide: Router, useValue: router },
      ],
    });
  });

  it('returns user when email param exists and facade returns user', async () => {
    (userFacade.getUserByEmail as jest.Mock).mockReturnValue(of(mockUser));

    const route = {
      paramMap: { get: (key: string) => (key === 'email' ? 'john@mail.com' : null) },
    } as unknown as ActivatedRouteSnapshot;

    const state = {} as RouterStateSnapshot;
    const result = await TestBed.runInInjectionContext(async () =>
      firstValueFrom(UserProfileResolve(route, state) as import('rxjs').Observable<typeof mockUser | null>),
    );

    expect(userFacade.getUserByEmail).toHaveBeenCalledWith('john@mail.com');
    expect(result).toEqual(mockUser);
    expect(router.navigate).not.toHaveBeenCalled();
  });

  it('navigates to /users and returns null when email param is missing', async () => {
    const route = {
      paramMap: { get: () => null },
    } as unknown as ActivatedRouteSnapshot;
    const state = {} as RouterStateSnapshot;

    const result = await TestBed.runInInjectionContext(async () =>
      firstValueFrom(UserProfileResolve(route, state) as import('rxjs').Observable<null>),
    );

    expect(router.navigate).toHaveBeenCalledWith(['/users']);
    expect(result).toBeNull();
    expect(userFacade.getUserByEmail).not.toHaveBeenCalled();
  });

  it('navigates to /users on facade error', async () => {
    (userFacade.getUserByEmail as jest.Mock).mockReturnValue(
      throwError(() => new Error('fail')),
    );

    const route = {
      paramMap: { get: (key: string) => (key === 'email' ? 'a@b.com' : null) },
    } as unknown as ActivatedRouteSnapshot;

    const state = {} as RouterStateSnapshot;
    const result = await TestBed.runInInjectionContext(async () =>
      firstValueFrom(UserProfileResolve(route, state) as import('rxjs').Observable<null>),
    );

    expect(router.navigate).toHaveBeenCalledWith(['/users']);
    expect(result).toBeNull();
  });
});
