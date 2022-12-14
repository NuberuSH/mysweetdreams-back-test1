import { filterUserModel } from '../helpers/filterModels';
import { filterUser } from '../helpers/filterUser';
import { generateJWT } from '../helpers/generateJWT';
import { PasswordHelper } from '../helpers/PasswordHelper';
import { UserRepository } from '../repository/userRepository';


export const authenticateUser = async (user: any, repository: UserRepository, passwordHelper: PasswordHelper) => {

  const registeredUser = await repository.findUserByEmail(user.email);

  if (!registeredUser){
    return false;
  }

  if (passwordHelper.compare(user.password, registeredUser.password)){
    const authenticatedUser = filterUser(registeredUser, filterUserModel);
    
    const token = await generateJWT(registeredUser._id);
    return {
      authenticatedUser,
      token
    };
  }

  return false;
};