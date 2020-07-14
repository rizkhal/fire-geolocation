(function(window) {

    "use strict";

    function Firebase() {

        var _firebaseObject = {};

        /**
         * Database reference
         * 
         * @type {object}
         */
        const db = firebase.database().ref();

        /**
         * Get last item from firebase
         * 
         * @param  {Function} callback
         * @return {mixed}
         */
        _firebaseObject.getLastItem = (callback) => {
            db.limitToLast(1).on('value', (snapshot) => {
                snapshot.forEach(data => {
                    callback(data.val());
                });
            });
        };

        return _firebaseObject;
    }

    if (typeof(window.Firebase) === 'undefined') {
        window.Firebase = Firebase();
    }

})(window);
