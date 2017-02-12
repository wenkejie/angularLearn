// 测试案例列表路由配置
var MyAppRoute = angular.module("MyAppRoute", ['ui.router']);

MyAppRoute.config(function($stateProvider, $urlRouterProvider) {
    
    $urlRouterProvider.otherwise('/index');
	$stateProvider

	// HOME STATES AND NESTED VIEWS ========================================
		.state('index', {
		url: '/index',
		templateUrl: 'index.html'

		.state('Accordion-ngui',{
			url: '/Accordion-ngui',
			templateUrl: 'Accordion-ngui.html'
		}).state('Accordion',{
			url: '/Accordion',
			templateUrl: 'Accordion.html'
		}).state('Directive&Controller',{
			url: '/Directive&Controller',
			templateUrl: 'Directive&Controller.html'
		}).state('Directive&Directive',{
			url: '/Directive&Directive',
			templateUrl: 'Directive&Directive.html'
		}).state('Directive&Directive2',{
			url: '/Directive&Directive2',
			templateUrl: 'Directive&Directive2.html'
		}).state('ExpanderSimple',{
			url: '/ExpanderSimple',
			templateUrl: 'ExpanderSimple.html'
		}).state('FormAdv1',{
			url: '/FormAdv1',
			templateUrl: 'FormAdv1.html'
		}).state('FormBasic',{
			url: '/FormBasic',
			templateUrl: 'FormBasic.html'
		}).state('FormCustom',{
			url: '/FormCustom',
			templateUrl: 'FormCustom.html'
		}).state('FormValidation',{
			url: '/FormValidation',
			templateUrl: 'FormValidation.html'
		}).state('HelloAngular_Directive',{
			url: '/HelloAngular_Directive',
			templateUrl: 'HelloAngular_Directive.html'
		}).state('IsolateScope',{
			url: '/IsolateScope',
			templateUrl: 'IsolateScope.html'
		}).state('link1',{
			url: '/link1',
			templateUrl: 'link1.html'
		}).state('link2',{
			url: '/link2',
			templateUrl: 'link2.html'
		}).state('my-pane',{
			url: '/my-pane',
			templateUrl: 'my-pane.html'
		}).state('my-tabs',{
			url: '/my-tabs',
			templateUrl: 'my-tabs.html'
		}).state('replace',{
			url: '/replace',
			templateUrl: 'replace.html'
		}).state('ScopeAnd',{
			url: '/ScopeAnd',
			templateUrl: 'ScopeAnd.html'
		}).state('ScopeAt',{
			url: '/ScopeAt',
			templateUrl: 'ScopeAt.html'
		}).state('ScopeEqual',{
			url: '/ScopeEqual',
			templateUrl: 'ScopeEqual.html'
		}).state('templateUrl',{
			url: '/templateUrl',
			templateUrl: 'templateUrl.html'
		}).state('transclude',{
			url: '/transclude',
			templateUrl: 'transclude.html'
		})
	});

});