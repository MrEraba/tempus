import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  // code to run on server at startup
});

Meteor.publish( 'users', function() {
    if ( Roles.userIsInRole( this.userId, 'admin') ) {
        return Meteor.users.find({roles: ['seller']});
        //return Meteor.users.find({});

    } else {
        this.stop();
        return
    }
});

Meteor.methods({
    'addAdminRole'(userId){
        Roles.addUsersToRoles( userId, [ 'admin' ] );
    },
    'addSellerRole'(userId){
        Roles.addUsersToRoles( userId, [ 'seller' ] );
    }
});
