import * as Sequelize from 'sequelize';
import * as faker from 'faker';
import * as _ from 'lodash';

// initialize our database
const db = new Sequelize('graphql', 'sw', 'sw', {
  dialect: 'postgres',
  host: 'localhost'
});

// define the models
const UserModel = db.define('user', {
  firstName: { type: Sequelize.STRING },
  lastName: { type: Sequelize.STRING },
  email: { type: Sequelize.STRING },
});

const ProjectModel = db.define('project', {
  name: { type: Sequelize.STRING },
  active: { type: Sequelize.BOOLEAN },
});

ProjectModel.hasMany(UserModel);
UserModel.belongsTo(ProjectModel);

faker.seed(123); // get consistent data every time we reload app


db.sync({ force: true }).then(() => {
  _.times(10, () => {
    return ProjectModel.create({
      name: faker.lorem.words(1),
      active: faker.random.boolean(),
    }).then((project) => {
      _.times(30, () => {
        return project.createUser({
          firstName: faker.name.firstName(),
          lastName: faker.name.lastName(),
          email: faker.internet.email(),
        });
      });
    });
  });
});

// export User, Project
const User = db.models.user;
const Project = db.models.project;

export { User, Project };
