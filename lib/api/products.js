/**
 * Created by Ivan on 7/26/2016.
 */
import {Mongo} from 'meteor/mongo';
import {check} from 'meteor/check';

export const Products = new Mongo.Collection("products");

if (Meteor.isServer) {
    Meteor.publish( 'products', function() {
        if ( Roles.userIsInRole( this.userId, 'admin') ) {
            return Products.find();
        } else {
            this.stop();
            return
        }
    });
}

Meteor.methods({

    'products.insert'(newProduct){
        var defaultImage = 'https://themeteorchef.com/assets/slack-logo.svg';

        if(Roles.userIsInRole( Meteor.userId(), 'admin') ){
            Products.insert({
                name: newProduct.name,
                code: newProduct.code,
                image: (newProduct.image ? newProduct.image: defaultImage  ),
                amount: newProduct.amount,
                description: newProduct.description,
                price: newProduct.price,
                available: newProduct.available,
                createdAt: new Date()
            });
        } else {
            throw new Meteor.Error('not-authorized');
        }

    },
    'products.remove'(id){
        check(id, String);
        if(Roles.userIsInRole( Meteor.userId(), 'admin')){
            if(id !== ''){
                Products.remove(id);
            }
        }else {
            throw new Meteor.Error('not-authorized');
        }
    },
    'products.setAvailable'(id){
        check(id, String);
        if(Roles.userIsInRole( Meteor.userId(), 'admin')){
            if(id !== ''){
                Products.update(id, {
                    $set:{
                        available: !this.available
                    }
                });
            }
        } else {
            throw new Meteor.Error('not-authorized');
        }
    }
});