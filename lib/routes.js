/**
 * Created by Ivan on 7/26/2016.
 */

//GENERAL ROUTES
//login route
FlowRouter.route( '/', {
    action: function() {
        BlazeLayout.render( 'applicationLayout', {
            header: 'headerTemplate',
            main: 'loginTemplate',
            footer: 'footerTemplate'
        });
    },
    name: 'login'
});
// register user
FlowRouter.route( '/register', {
    action: function() {
        BlazeLayout.render( 'applicationLayout', {
            header: 'headerTemplate',
            main: 'registerTemplate',
            footer: 'footerTemplate'
        });
    },
    name: 'register'
});

//ADMIN ROUTES
var admin = FlowRouter.group({
    prefix: '/admin'
});

// ADMIN ROUTES
admin.route( '/', {
    action: function() {
        BlazeLayout.render( 'applicationLayout', {
            header: 'headerTemplate',
            main: 'contentTemplate',
            footer: 'footerTemplate'
        });
    },
    name: 'adminHome'
});


admin.route( '/products', {
    action: function() {
        BlazeLayout.render( 'applicationLayout', {
            header: 'headerTemplate',
            main: 'inventoryTemplate',
            footer: 'footerTemplate'
        });
    },
    name: 'adminIventory'
});

admin.route( '/product/new', {
    action: function() {
        BlazeLayout.render( 'applicationLayout', {
            header: 'headerTemplate',
            main: 'newProductForm',
            footer: 'footerTemplate'
        });
    },
    name: 'newProduct'
});

admin.route( '/product/edit', {
    action: function() {
        BlazeLayout.render( 'applicationLayout', {
            header: 'headerTemplate',
            main: 'editProductForm',
            footer: 'footerTemplate'
        });
    },
    name: 'newProduct'
});

admin.route( '/sellers', {
    action: function() {
        BlazeLayout.render( 'applicationLayout', {
            header: 'headerTemplate',
            main: 'sellersListTemplate',
            footer: 'footerTemplate'
        });
    },
    name: 'sellersList'
});

//SELLER ROUTES
var seller = FlowRouter.group({
    prefix: '/seller'
});

