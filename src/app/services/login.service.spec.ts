import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { LoginService } from './login.service';
describe('LoginService', () => {
  let service: LoginService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(LoginService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add and remove a token from localStorage', () => {
    const mockToken = 'mockToken';

    service.addToken(mockToken);
    expect(localStorage.getItem('token')).toEqual(mockToken);

    service.removeToken();
    expect(localStorage.getItem('token')).toBeNull();
  });

  it('should retrieve a token from localStorage', () => {
    const mockToken = 'mockToken';
    localStorage.setItem('token', mockToken);

    const retrievedToken = service.getToken();
    expect(retrievedToken).toEqual(mockToken);
  });

  it('should check if user has ADMIN permission', () => {
    const adminRole = 'ADMIN';
    const nonAdminRole = 'USER';

    expect(service.hasPermission(adminRole)).toBe(true);
    expect(service.hasPermission(nonAdminRole)).toBe(false);
  });
});
