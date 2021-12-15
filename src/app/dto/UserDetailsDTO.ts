export class UserDetailsDTO {
  private _username: string;
  private _firstName: string;
  private _lastName: string;
  private _password: string;
  private _highestScore: number;
  private _rank: number;

  constructor(username: string, firstName: string, lastName: string, password: string, highestScore: number,
              rank: number) {
    this._username = username;
    this._firstName = firstName;
    this._lastName = lastName;
    this._password = password;
    this._highestScore = highestScore;
    this._rank = rank;
  }


  get username(): string {
    return this._username;
  }

  set username(value: string) {
    this._username = value;
  }

  get firstName(): string {
    return this._firstName;
  }

  set firstName(value: string) {
    this._firstName = value;
  }

  get lastName(): string {
    return this._lastName;
  }

  set lastName(value: string) {
    this._lastName = value;
  }

  get password(): string {
    return this._password;
  }

  set password(value: string) {
    this._password = value;
  }

  get highestScore(): number {
    return this._highestScore;
  }

  set highestScore(value: number) {
    this._highestScore = value;
  }

  get rank(): number {
    return this._rank;
  }

  set rank(value: number) {
    this._rank = value;
  }
}
