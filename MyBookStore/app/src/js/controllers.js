/**
 * 这里是登录模块
 * @type {[type]}
 */

var loginModule = angular.module('LoginModule', []);
loginModule.controller('loginCtrl', function ($scope) {
    console.log(1);
    $scope.userdata = {

    };
    $scope.submitForm = function() {
        console.log($scope.userdata);
    };
}).directive('compare', function () {
    var o ={};
    o.strict = 'AE';
    o.scope = {
        orgText : '=compare'
    };
    o.require = 'ngModel';
    //四个参数分别为域，元素，属性，ngModuleCtrl
    o.link = function(sco,ele,att,con) {
       con.$validators.compare = function(v) {
           return v == sco.orgText;
       };
       sco.$watch('orgText',function() {
           con.$validate();
       });
    };

    return o;
});

/**
 * 这里是书籍列表模块
 * @type {[type]}
 */


var bookListModule = angular.module('BookListModule', []);

bookListModule.controller('BookListCtrl', function ($scope,$http,$state,$stateParams) {
    // $scope参数内插入一些ngGrid引用的数据如页数，页码等
    // 这些参数用于ngGrid引用
    $scope.filterOptions = {
        filterText: "",
        useExternalFilter: true
    };
    $scope.totalServerItems = 0;
    $scope.pagingOptions = {
        pageSizes: [5, 10, 20],
        pageSize: 5,
        currentPage: 1,
    };
    // 自定义一个分页函数，计算数据量并分页
    $scope.setPagingData = function (data,page,pageSize) {
        var pagedData = data.slice((page - 1) * pageSize, page * pageSize);
        $scope.books = pagedData;
        $scope.totalServerItems = data.length;
        // $$phase是ng内部使用的状态标识位，用于标识是否处于digest状态
        // !$scope.$$phase是表示作用域内某个阶段是否有变化，有就进行脏检查
        if (!$scope.$$phase) {
            //手动执行脏检查，验证当前作用域内的数据变化
            $scope.$apply();
        }
    };
    // 自定义一个页面跳转函数
    $scope.getPagedDataAsync = function (pageSize, page, searchText) {
        setTimeout(function() {
            var data;
            if (searchText) {
                console.log(1111);
                // 字符串小写
                var ft = searchText.toLowerCase();
                $http.get('../data/books' + $stateParams.bookType + '.json')
                    .success(function(largeLoad) {
                        alert(0);
                        data = largeLoad.filter(function(item) {
                            //判断json中字符串是否出现
                            return JSON.stringify(item).toLowerCase().indexOf(ft) != -1;
                        });
                        $scope.setPagingData(data, page, pageSize);
                    });
            } else {
                $http.get('../data/books' + $stateParams.bookType + '.json')
                    .success(function(largeLoad) {
                        $scope.setPagingData(largeLoad, page, pageSize);
                    });
            }
        }, 100);
    };

    $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage);

    $scope.$watch('pagingOptions', function(newVal, oldVal) {
        if (newVal !== oldVal && newVal.currentPage !== oldVal.currentPage) {
            $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage, $scope.filterOptions.filterText);
        }
    }, true);
    $scope.$watch('filterOptions', function(newVal, oldVal) {
        if (newVal !== oldVal) {
            $scope.getPagedDataAsync($scope.pagingOptions.pageSize, $scope.pagingOptions.currentPage, $scope.filterOptions.filterText);
        }
    }, true);

    $scope.gridOptions = {
        data: 'books',
        rowTemplate: '<div style="height: 100%"><div ng-style="{ \'cursor\': row.cursor }" ng-repeat="col in renderedColumns" ng-class="col.colIndex()" class="ngCell ">' +
            '<div class="ngVerticalBar" ng-style="{height: rowHeight}" ng-class="{ ngVerticalBarVisible: !$last }"> </div>' +
            '<div ng-cell></div>' +
            '</div></div>',
        multiSelect: false,
        enableCellSelection: true,
        enableRowSelection: false,
        enableCellEdit: true,
        enablePinning: true,
        columnDefs: [{
            field: 'index',
            displayName: '序号',
            width: 60,
            pinnable: false,
            sortable: false
        }, {
            field: 'name',
            displayName: '书名',
            enableCellEdit: true
        }, {
            field: 'author',
            displayName: '作者',
            enableCellEdit: true,
            width: 220
        }, {
            field: 'pubTime',
            displayName: '出版日期',
            enableCellEdit: true,
            width: 120
        }, {
            field: 'price',
            displayName: '定价',
            enableCellEdit: true,
            width: 120,
            cellFilter: 'currency:"￥"'
        }, {
            field: 'bookId',
            displayName: '操作',
            enableCellEdit: false,
            sortable: false,
            pinnable: false,
            cellTemplate: '<div><a ui-sref="bookdetail({bookId:row.getProperty(col.field)})" id="{{row.getProperty(col.field)}}">详情</a></div>'
        }],
        enablePaging: true,
        showFooter: true,
        totalServerItems: 'totalServerItems',
        pagingOptions: $scope.pagingOptions,
        filterOptions: $scope.filterOptions
    };
});


/**
 * 这里是书籍详情模块
 * @type {[type]}
 */
var bookDetailModule = angular.module("BookDetailModule", []);
bookDetailModule.controller('BookDetailCtrl', function($scope, $http, $state, $stateParams) {
    console.log($stateParams);
    //请模仿上面的代码，用$http到后台获取数据，把这里的例子实现完整
    
});
    


/**
 * 这里是书籍详情模块
 * @type {[type]}
 */
