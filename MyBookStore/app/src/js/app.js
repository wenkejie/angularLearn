var routerApp = angular.module('routerApp', [
        //依赖第三方ng-ui模块，表格和路由
        'ui.router',
        'ngGrid',
        //自定义图书列表模块和详情模块
        'LoginModule',
        'BookListModule',
        'BookDetailModule'

    ]);

/**
 * 由于整个应用都会和路由打交道，所以这里把$state和$stateParams这两个对象放到$rootScope上，方便其它地方引用和注入。
 * 这里的run方法只会在angular启动的时候运行一次。
 * @param  {[type]} $rootScope
 * @param  {[type]} $state
 * @param  {[type]} $stateParams
 * @return {[type]}
 */
routerApp.run( function ($rootScope,$state,$stateParams) {
   // 分别把ngrouter的$state和$stateParams参数传给根作用域
   $rootScope.$state = $state;
   $rootScope.$stateParams  = $stateParams;
});


/**
 * 配置路由。
 * 注意这里采用的是ui-router这个路由，而不是ng原生的路由。
 * ng原生的路由不能支持嵌套视图，所以这里必须使用ui-router。
 * @param  {[type]} $stateProvider
 * @param  {[type]} $urlRouterProvider
 * @return {[type]}
 */

routerApp.config(function ($stateProvider,$urlRouterProvider) {
    // 监控url上的路径默认都跳转到首页
    $urlRouterProvider.otherwise('/index');
    $stateProvider
        .state('index', {
            url:'/index',
            views:{
                '':{
                    templateUrl : 'tpls/home.html'
                },
                'main@index':{
                    templateUrl : 'tpls/loginForm.html'
                }
            }

        })
        .state('booklist',{
            url: '/{bookType:[0-9]{1,4}}',
            views: {//注意这里的写法，当一个页面上带有多个ui-view的时候如何进行命名和视图模板的加载动作
                '': {
                    templateUrl: 'tpls/bookList.html'
                },
                'booktype@booklist':{
                    templateUrl: 'tpls/bookType.html'
                },
                'bookgrid@booklist':{
                    templateUrl: 'tpls/bookGrid.html'
                }
            }
            
        })
        .state('addbook',{
            url:'/addbook',
            templateUrl : 'tpls/addBookForm.html'
        })
        .state('bookdetail',{
            url:'/bookdetail/:bookId', //注意这里在路由中传参数的方式
            templateUrl:'tpls/bookDetail.html'
        });
});