var myModule = angular.module("MyModule", []);
myModule.directive("superman", function() {
    return {
        scope: {},//独立作用域
        restrict: 'AE',//元素+属性的匹配模式
        //暴露public方法用于外部调用
        controller: function($scope) {
            $scope.abilities = [];
            this.addStrength = function() {
                $scope.abilities.push("strength");
            };
            this.addSpeed = function() {
                $scope.abilities.push("speed");
            };
            this.addLight = function() {
                $scope.abilities.push("light");
            };
        },
        // 处理指令内部事务
        link: function(scope, element, attrs) {
            element.addClass('btn btn-primary');
            //内置jquerylight语法
            element.bind("mouseenter", function() {
                console.log(scope.abilities);
            });
        }
    }
});
myModule.directive("strength", function() {
    return {
        require: '^superman',//意思是strength指令依赖于superman指令
        link: function(scope, element, attrs, supermanCtrl) {
            supermanCtrl.addStrength();
        }
    }
});
myModule.directive("speed", function() {
    return {
        require: '^superman',
        //supermanCtrl是superman指令暴露的公共方法的注入
        link: function(scope, element, attrs, supermanCtrl) {
            supermanCtrl.addSpeed();
        }
    }
});
myModule.directive("light", function() {
    return {
        require: '^superman',
        link: function(scope, element, attrs, supermanCtrl) {
            supermanCtrl.addLight();
        }
    }
});