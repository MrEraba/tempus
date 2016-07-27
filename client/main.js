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

