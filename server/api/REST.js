/**
 * Created by thuatdoan on 4/1/17.
 */
Router.route('/api',
            {where: 'server'})
    .get(function () {
        writeHeaders(this); //write header
        this.response.end('GET is not supported.');   //send response
    })
    .post(function () {
        writeHeaders(this);
        var useremail = this.request.body.email;
        if (!useremail){
            this.response.end('No user email specified');
            return;
        }
        var user = Meteor.users.findOne({
            emails:{
                $elemMatch : {
                    address: useremail
                }
            }
        });

        if(!user){
            this.response.end('user not found');
            return;
        }

        var records = Snippets.find({owner: user._id}).fetch();
        this.response.end(JSON.stringify(records));
    })
    .put(function () {
        writeHeaders(this);
        var record = this.request.body.update;
        if (!record){
            this.response.end('No thing requested');
            return;
        }
        var update = Snippets.upsert({
            _id: record.id
        },{
            $set: record.changes
        });
        console.log(update);
        this.response.end('Snippet uploaded')

    })
    .delete(function () {
        writeHeaders(this);
        var recID = this.request.body.snippetID;
        if (!recID){
            this.response.end('No ID submitted');
            return;
        }
        var del = Snippets.remove({_id:recID});
        console.log(del);
        this.response.end('Snippet deleted');
    });
function writeHeaders(self) {
    self.response.statusCode = 200;
    self.response.setHeader("Content-Type", "application/json");
    self.response.setHeader("Access-Control-Allow-Origin", "*");
    self.response.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
}