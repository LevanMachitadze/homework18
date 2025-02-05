import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getAllUsers() {
    return this.usersService.getAllUseers();
  }
  @Get(':id')
  getUserById(@Param('id') id) {
    return this.usersService.getUserById(Number(id));
  }

  @Post()
  createUser(@Body() createUserDto: CreateUserDto) {
    console.log(createUserDto);
    return this.usersService.createUser(createUserDto);
  }

  @Delete(':id')
  deleteUser(@Param(':id') id) {
    return this.usersService.deleteUser(Number(id));
  }
  @Put(':id')
  updateUser(@Param('id') id, @Body() updateUser: CreateUserDto) {
    return this.usersService.updateUser(Number(id), updateUser);
  }
}
