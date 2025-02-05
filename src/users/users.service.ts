import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  private users = [
    {
      id: 1,
      firstName: 'jondi',
      lastName: 'bagaturia',
      phoneNumber: 123123123,
      gender: 'female',
    },
    {
      id: 2,
      firstName: 'gio',
      lastName: 'maladoi',
      phoneNumber: 332233221,
      gender: 'srednirod',
    },
    {
      id: 3,
      firstName: 'alucha',
      lastName: 'gvkekelauriin',
      phoneNumber: 1233211,
      gender: 'female',
    },
  ];

  getAllUseers() {
    return this.users;
  }
  getUserById(id: number) {
    const user = this.users.find((el) => el.id === id);
    if (!user)
      throw new HttpException('user nottn found', HttpStatus.NOT_FOUND);
    return user;
  }
  createUser(createUserDto: CreateUserDto) {
    console.log('rec dto', createUserDto);
    const { firstName, lastName, phoneNumber, gender } = createUserDto;

    if (!firstName || !lastName || !phoneNumber || !gender)
      throw new HttpException(
        'firstName, lastName , phoneNumber and gender is required',
        HttpStatus.BAD_REQUEST,
      );

    const lastId = this.users[this.users.length - 1]?.id || 0;

    const newUser = {
      id: lastId + 1,
      firstName,
      lastName,
      phoneNumber,
      gender,
    };
    this.users.push(newUser);
    return newUser;
  }
  deleteUser(id: number) {
    const index = this.users.findIndex((el) => el.id === id);
    if (index === -1)
      throw new HttpException('user not found', HttpStatus.NOT_FOUND);
    const deletedUser = this.users.splice(index, 1);
    return deletedUser;
  }

  updateUser(id: Number, updateUserDto: CreateUserDto) {
    console.log(updateUserDto);
    console.log(id, 'id');
    const Index = this.users.findIndex((el) => el.id === +id);
    console.log(Index, 'inde');
    if (Index === -1)
      throw new HttpException('user not found', HttpStatus.NOT_FOUND);

    this.users[Index] = {
      ...this.users[Index],
      ...updateUserDto,
    };
    return this.users[Index];
  }
}
