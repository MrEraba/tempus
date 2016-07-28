import { Template } from 'meteor/templating';
import {Products} from '../lib/api/products.js';
import {Session} from 'meteor/session';
import {ReactiveVar} from 'meteor/reactive-var';
import './main.html';

//  HEADER TEMPLATE
Template.headerTemplate.onRendered(function () {
    $('.button-collapse').sideNav({
            menuWidth: 300,
            edge: 'right',
            closeOnClick: true
        }
    );
});
//  /HEADER TEMPLATE

//  LOGIN TEMPLATE
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
//  /LOGIN TEMPLATE

//  REGISTER TEMPLATE
Template.registerTemplate.events({
    'submit #js-register-form'(event){
        event.preventDefault();
        const target = event.target;

        var email = target["user_email"].value;
        var username = target["user_username"].value;
        var password = target["user_password"].value;

        Accounts.createUser({
            email: email,
            username: username,
            password: password
        });

        target["user_email"].value = '';
        target["user_username"].value = '';
        target["user_password"].value = '';

        console.log("Usuario creado XD");
    }
});
//  /REGISTER TEMPLATE

//  HEADER TEMPLATE
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
//  /HEADER TEMPLATE

//  INVENTORY TEMPLATE
Template.inventoryTemplate.onRendered(function () {
    $('.collapsible').collapsible({
        accordion : true
    });
});

Template.inventoryTemplate.onCreated(function () {
    Meteor.subscribe('products');
    this.searchQuery = new ReactiveVar( '' );
});

Template.inventoryTemplate.helpers({
    'products'(){
        if (Template.instance().searchQuery.get() !== ''){
            return Products.find({name: {'$regex': Template.instance().searchQuery.get()}});
        } else {
            return Products.find({});
        }
    }
});

Template.inventoryTemplate.events({
    'keyup #search-query'(){
        if ($('#search-query').val() === ''){
            Template.instance().searchQuery.set('');
        } else {
            Template.instance().searchQuery.set($('#search-query').val());
        }
    }
});
//  /INVENTORY TEMPLATE

//  PRODUCT TEMPLATE
Template.productTemplate.helpers({
    'isAvilable'(){
        return this.available;
    }
});

Template.productTemplate.events({
    'click #js-delete-product'(){
        Meteor.call('products.remove', this._id);
    },
    'click #js-available-product'(){
        Meteor.call('products.setAvailable', this._id, this.available)
    },
    'click #js-edit-product'(){
        Session.set("productForEdit", this._id);
        FlowRouter.go('/admin/product/edit');
    }
});
//  PRODUCT TEMPLATE

// NEW PRODUCT TEMPLATE
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

        //FlowRouter.go('/admin/products');
    }
});
//  /NEW PRODUCT TEMPLATE

//  EDIT PRODUCT FORM TEMPLATE
Template.editProductForm.onCreated(function () {
    Meteor.subscribe('products');
});

Template.editProductForm.helpers({
    'product'(){
        return Products.findOne({_id: Session.get("productForEdit")});
    }
});

Template.editProductForm.events({
    'submit #js-edit-product-form' (event){
        event.preventDefault();
        const target = event.target;

        const product = {
            name: target["product_name"].value,
            code: target["product_code"].value,
            image: target["product_image"].value,
            amount: target["product_amount"].value,
            description: target["product_description"].value,
            price: target["product_price"].value
        };
        Meteor.call('products.update', Session.get("productForEdit") ,product);
        Session.set("productForEdit", "");
        FlowRouter.go('/admin/products');
    },
    'click #js-cancel-edit-product'(){
        $('#product_name').val('');
        $('#product_code').val('');
        $('#product_image').val('');
        $('#product_amount').val('');
        $('#product_description').val('');
        $('#product_price').val('');

        FlowRouter.go('/admin/products');
    }
});
//  /EDIT PRODUCT TEMPLATE

//  SELLER LIST TEMPLATE
Template.sellersListTemplate.onCreated(function () {
    Meteor.subscribe('users');
});

Template.sellersListTemplate.onRendered(function () {
});

Template.sellersListTemplate.helpers({
    'sellers'(){
        return Meteor.users.find({roles: ['seller']});
    }
});

//  /SELLER LIST TEMPLATE

Template.sellerTemplate.helpers({
    'email'(){
        return this.emails[0].address;
    }
});