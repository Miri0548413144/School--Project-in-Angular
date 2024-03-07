export class Lecturer {
  id: number;
  name: string;
  address: string;
  email: string;
  password: string;

  constructor(id: number, name: string, address: string, email: string, password: string) {
    this.id = id;
    this.name = name;
    this.address = address;
    this.email = email;
    this.password = password;
  }
}