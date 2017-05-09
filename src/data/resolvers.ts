import {Project, User} from './connectors';

export const Resolvers = {

  Query: {
    user(_, args) {
      return User.find({where: args});
    },

    users(_, args) {
      return User.findAll({where: args});
    },

    project(_, args) {
      return Project.find({where: args});
    },

    projects(_, args) {
      return Project.findAll({where: args});
    }
  },

  Mutation: {
    createUser(_, {firstName, lastName, email}) {
      return User.create({
        firstName,
        lastName,
        email
      })
    },
  },

  User: {
    project(user) {
      return user.getProject();
    },
  },

  Project: {
    users(project) {
      return project.getUsers();
    },
  },

};
