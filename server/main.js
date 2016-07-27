import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  // code to run on server at startup
});

Meteor.methods({
    'addAdminRole'(userId){
        Roles.addUsersToRoles( userId, [ 'admin' ] );
    },
    'addSellerRole'(userId){
        Roles.addUsersToRoles( userId, [ 'seller' ] );
    }
});
