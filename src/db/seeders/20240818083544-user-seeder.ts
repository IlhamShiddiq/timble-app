import axios, { AxiosResponse } from 'axios';
import crypto from 'crypto';
import bcrypt from 'bcrypt';
import { QueryInterface } from 'sequelize';

type UserDummyJson = {
  id: string
  firstName: string
  lastName: string
  username: string
  password: string
  gender: string
}

type UserModel = {
  id: string
  name: string
  username: string
  password: string
  gender: string
  is_premium: boolean
}

const hashPassword = async (password: string)=>  {
  return await bcrypt
    .genSalt(8)
    .then(salt => {
      return bcrypt.hash(password, salt);
    })
    .then(hash => {
      return hash
    })
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface: QueryInterface, Sequelize: any) {
    const mainUser: UserModel = {
      id: crypto.randomUUID(),
      name: `User Test`,
      username: 'user_test',
      gender: 'male',
      is_premium: false,
      password: await hashPassword('user_test'),
    }

    const response: AxiosResponse = await axios.get('https://dummyjson.com/users?limit=30')
    let users: UserModel[] = await Promise.all(response.data.users.map(async (user: UserDummyJson) => {
      const { firstName, lastName, username, password, gender } = user;
      const hashedPassword: string = await hashPassword(password)
      const container: UserModel = {
        id: crypto.randomUUID(),
        name: `${firstName} ${lastName}`,
        username: username,
        gender: gender,
        is_premium: false,
        password: hashedPassword || '',
      }

      return container
    }))

    await queryInterface.bulkInsert('users', users)
    await queryInterface.bulkInsert('users', [mainUser])
  },

  async down (queryInterface: QueryInterface, Sequelize: any) {
    //
  }
};
