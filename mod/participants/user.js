(function() {

    $("#page-user").live('pageshow',function() {

        MM.setupPage();
        MM.logInfo("Page show fired");

        var currentUser = MM.requiredParam("current_user");

        var users = MM.getCacheElements('users');
        $.each(users, function(index, user){
            if(user.id+"" == currentUser){
                // TODO - Replace when bug related with cookies fixed
                user.profileimageurl = "http://demo.moodle.net/theme/image.php?theme=standard&image=u%2Ff1";

                $("#userfullname").html(user.fullname);
                $("#userimage").attr('src', user.profileimageurl);
                $("#descripcion").html(user.descripcion);
                $("#email").html(user.email);
                $("#country").html(user.country);
                $("#city").html(user.city);
                // This is a break
                currentUser = user;
                return false;
            }
        });

        $("#baddcontact").click(function(){
            MM.logInfo("Adding a contact");

            var myContact = navigator.contacts.create();
            myContact.displayName = currentUser.fullname;
            myContact.nickname = currentUser.fullname;

            var name = new ContactName();
            name.givenName = currentUser.firstname;
            name.familyName = currentUser.lastname;
            myContact.name = name;

            var emails = [1];
            emails[0] = new ContactField('work', currentUser.email, true);
            myContact.emails = emails;

            var photos = [1];
            photos[0] = new ContactField('url', currentUser.profileimageurl, true);
            myContact.photos = photos;

            MM.logInfo("Saving contact ("+myContact.displayName+"  "+myContact.nickname+"), calling phonegap");
            myContact.save(
                function(contact){ popMessage('Contact added'); },
                function(contactError){ popErrorMessage('Unexpected error. Contact not added: '+contactError); }
            );
            MM.logInfo("End of saving contact, phonegap called");

        });

    });

})();