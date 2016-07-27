/**
 * Created by Ivan on 7/26/2016.
 */

//GENERAL ROUTES
FlowRouter.route( '/', {
    action: function() {
        BlazeLayout.render( 'applicationLayout', {
            header: 'headerTemplate',
            main: 'loginTemplate',
            footer: 'footerTemplate'
        });
    },
    name: 'home'
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


admin.route( '/inventory', {
    action: function() {
        BlazeLayout.render( 'applicationLayout', {
            header: 'headerTemplate',
            main: 'inventoryTemplate',
            footer: 'footerTemplate'
        });
    },
    name: 'adminIventory'
});

admin.route( '/new-product', {
    action: function() {
        BlazeLayout.render( 'applicationLayout', {
            header: 'headerTemplate',
            main: 'newProductForm',
            footer: 'footerTemplate'
        });
    },
    name: 'newProduct'
});

//SELLER ROUTES
var seller = FlowRouter.group({
    prefix: '/seller'
});