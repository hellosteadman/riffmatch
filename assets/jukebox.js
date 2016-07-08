JukeBoxController = function() {
    var callbacks = {};
    var self = {
        songs: function(songlist) {
            self.fire('songs', songlist);
            return self;
        },
        song: function(song) {
            self.fire('song', song);
        },
        on: function(eventName, callback) {
            if(typeof(callbacks[eventName]) == 'undefined') {
                callbacks[eventName] = [];
            }

            if(!(callback in callbacks[eventName])) {
                callbacks[eventName].push(callback);
            }

            return self;
        },
        off: function(eventName, callback) {
            if(typeof(callbacks[eventName]) != 'undefined') {
                var newCallbacks = [];

                for(var i = 0; i < callbacks[eventName].length; i ++) {
                    if(callbacks[eventName][i] != callback) {
                        newCallbacks.push(callbacks[eventName][i]);
                    }
                }

                callbacks[eventName] = newCallbacks;
            }

            return self;
        },
        fire: function(eventName, data) {
            if(typeof(callbacks[eventName]) != 'undefined') {
                for(var i = 0; i < callbacks[eventName].length; i ++) {
                    callbacks[eventName][i].apply(self, [data]);
                }
            }
        }
    };

    return self;
};
