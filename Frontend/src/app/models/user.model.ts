export type UserRole = 'turista' | 'proveedor' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  // Puedes agregar más propiedades según lo necesites
}
