import axios, { AxiosResponse } from 'axios';
import { QueryInterface } from 'sequelize';
import { generateUuid, hashPassword } from '../../utils/general.util'

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

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface: QueryInterface) {
    const response: AxiosResponse = await axios.get('https://dummyjson.com/users?limit=30')
    const users: UserModel[] = await Promise.all(response.data.users.map(async (user: UserDummyJson) => {
      const { firstName, lastName, username, password, gender } = user;
      const hashedPassword: string = await hashPassword(password)
      const container: UserModel = {
        id: generateUuid(),
        name: `${firstName} ${lastName}`,
        username: username,
        gender: gender,
        is_premium: false,
        password: hashedPassword || '',
      }

      return container
    }))

    await queryInterface.bulkInsert('users', users)
  },

  async down () {
    //
  }
};
