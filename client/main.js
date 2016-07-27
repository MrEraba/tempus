import { Template } from 'meteor/templating';
import {Products} from '../lib/api/products.js';
import './main.html';

Template.headerTemplate.onRendered(function () {
    $('.button-collapse').sideNav({
            menuWidth: 300,
            edge: 'right',
            closeOnClick: true
        }
    );
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

Template.newProductForm.events({
    'submit #js-new-product-form'(event){
        event.preventDefault();
        const target = event.target;
        var available = false;
        if((target["product_amount"].value <= 0 )|| (target["product_amount"].value !== false)){
            available = true;
        }

        const newProduct ={
            name: target["product_name"].value,
            code: target["product_code"].value,
            amount: target["product_amount"].value,
            price: target["product_price"].value,
            available: available,
            description: target["product_description"].value,
            image: target["product_image"].value
        }

        Meteor.call('products.insert', newProduct);
        target["product_name"].value = '';
        target["product_code"].value = '';
        target["product_amount"].value = '';
        target["product_price"].value = '';
        target["product_description"].value = '';
        target["product_image"].value = '';

        FlowRouter.go('/admin/inventory');
    }
});

Template.inventoryTemplate.onRendered(function () {
    $('.collapsible').collapsible({
        accordion : true
    });
});

Template.inventoryTemplate.onCreated(function () {
    Meteor.subscribe('products');
});

Template.inventoryTemplate.helpers({
    'products'(){
        return Products.find({});
    }
});