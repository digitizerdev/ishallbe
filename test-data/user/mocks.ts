import { User } from './model';
export const mockUser1: User ={ 
  uid: '1',
  name: 'Stratton', 
  email: 'ajct@cti.com',
  password: 'pass',
  blocked: false,
  photo: 'https://https://www.square1bank.com/wp-content/uploads/2016/06/silhouette.png',
  role: 'contributor' 
};
export const mockUser2: User = { 
  uid: '2', 
  name: 'Ashanti', 
  email: 'scct@cti.com',
  password: 'pass',
  blocked: false,
  photo: 'https://www.square1bank.com/wp-content/uploads/2016/06/silhouette.png?x76759',
  role: 'editor'
};
export const mockUsers: User[] = [ mockUser1, mockUser2 ];