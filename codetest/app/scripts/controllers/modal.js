'use strict';

app.controller('ModalCtrl', [
    '$scope', '$element', 'close',
    function($scope, $element, close) {
        //store model posts in postContent and return as promise
        $scope.postContent = null;
        //  This close function doesn't need to use jQuery or bootstrap, because
        //  the button has the 'data-dismiss' attribute.
        $scope.close = function() {
            $element.modal('hide');
            close({
                postContent: $scope.postContent,
            }, 500); // close, but give 500ms for bootstrap to animate
        };
    }
]);
