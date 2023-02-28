// import { startServer } from './infrastructure/http';

// startServer();

import { createUserUseCase } from './domain/users/useCases';

createUserUseCase
  .execute({
    name: 'aa',
    username: 'a',
    password: 'pwd'
  })
  .then((res) => {
    if (res.isSuccess()) {
      console.log(res.result.getValue());
    }
    if (res.isFailed()) {
      console.log(res.result.getError());
    }
  });

// import { User } from './domain/users/entity/user';

// const userResult = User.create({
//   name: '',
//   username: ''
// });

// if (userResult.isSuccess) {
//   console.log(userResult.getValue());
// }
// if (userResult.isFailed) {
//   console.log(userResult.getError());
// }
