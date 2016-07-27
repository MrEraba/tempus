import { Template } from 'meteor/templating';

import './main.html';

Template.headerTemplate.onRendered(function () {
    $('.button-collapse').sideNav({
            menuWidth: 300, // Default is 240
            edge: 'right', // Choose the horizontal origin
            closeOnClick: true // Closes side-nav on <a> clicks, useful for Angular/Meteor
        }
    );
});

Template.inventoryTemplate.onRendered(function () {
    $('.collapsible').collapsible({
        accordion : true // A setting that changes the collapsible behavior to expandable instead of the default accordion style
    });
});


Template.loginTemplate.events({
    'submit #js-login-form' (event){
        event.preventDefault();
        const target = event.target;

        var email = target["user_email"].value;
        var password = target["user_password"].value;

        Meteor.loginWithPassword(email, password, function (error) {
            if(error){
                console.log(error.reason);
            } else {
                FlowRouter.go("/admin");
            }
        });
    }
});

Template.headerTemplate.events({
    'click #js-user-logout'(event){
        event.preventDefault();
        Meteor.logout();
        FlowRouter.go('/');
    },
    'click #js-be-admin'(event){
        event.preventDefault();
        var userId = Meteor.userId();

        Meteor.call('addAdminRole',userId);
        console.log('now you are an admin');
    },
    'click #js-be-seller'(event){
        event.preventDefault();
        var userId = Meteor.userId();

        Meteor.call('addSellerRole',userId);
        console.log('now you are a seller');
    },
});

Template.registerTemplate.events({
    'submit #js-register-form'(event){
        event.preventDefault();
        const target = event.target;

        var email = target["user_email"].value;
        var password = target["user_password"].value;

        Accounts.createUser({
            email: email,
            password: password
        });

        target["user_email"].value = '';
        target["user_password"].value = '';

        console.log("Usuario creado XD");
    }
});

