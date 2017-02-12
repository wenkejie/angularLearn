var myServiceApp = angular.module("MyServiceApp", []);
// 个人服务定义，Server Provider Factory 本质都是Proivder(供应者模式)
myServiceApp.factory('userListService', ['$http',
    function($http) {
        var doRequest = function(username, path) {
            return $http({
                method: 'GET',
                url: 'users.json'
            });
        }
        return {
            userList: function(username) {
                return doRequest(username, 'userList');
            }
        };
    }
]);

//优先注入ng自带的服务，自定义服务放在最后，不需要new,ng注射器会自动实例化
myServiceApp.controller('ServiceController', ['$scope', '$timeout', 'userListService',
    function($scope, $timeout, userListService) {
        var timeout;
        $scope.$watch('username', function(newUserName) {
            if (newUserName) {
                if (timeout) {
                    $timeout.cancel(timeout);
                }
                // 防抖动机制
                timeout = $timeout(function() {
                    userListService.userList(newUserName)
                        .success(function(data, status) {
                            $scope.users = data;
                        });
                }, 350);
            }
        });
    }
]);

//...