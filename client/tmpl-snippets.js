/**
 * Created by thuatdoan on 4/1/17.
 */
Template.snippets.helpers({
    snippets: function () {
        return Snippets.find().fetch();
    }
});
Template.snippet.helpers({
    isLink: function () {
        return (this.URL != undefined)
    },
    editing: function () {
        return Session.equals('currentEdit',this._id);
    }
});
Template.snippet.events({
   'click .desc' : function (e) {
       Session.set('currentEdit',this._id);
   },
    'keyup .editing':function (e) {
        if (e.keyCode==27){
            Session.set('currentEdit',null);
            return;
        }
        if (e.keyCode!=13||!e.shiftKey) return;
        Snippets.update({_id:this._id},{$set:{desc: e.currentTarget.value}});
        Session.set('currentEdit',null);
    }
});