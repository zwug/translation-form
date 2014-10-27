var app = angular.module('app', []);

locales = [
		 'de', 'it', 'en', 'fr'
	];

translations = [
	{
		locale : 'en',
		name: 'English club'
	},
	{
		locale : 'fr',
		workTime: '10:00 - 18:00'
	}
	];





app.controller('formController', ['$scope', function($scope){
	$scope.locale = 'en';//current loc
	$scope.locales = locales;
	$scope.translations = translations;

	$scope.$watch('locale', function(newValue, oldValue) {
		if(oldValue != 'new')
  			$scope.locales.push(oldValue);
  			indexDel = $scope.locales.indexOf(newValue);
	    		if(indexDel > -1){
	    			$scope.locales.splice(indexDel, 1);
	    		}
	});

	$scope.changeLocale = function(translation){
		$scope.locale = translation.locale;
	}

	$scope.updateTranslation = function(translation){
		//insert_to_database
	}

	$scope.createTranslation = function(){
		if($scope.locales[0]){
			$scope.translations.push({
				locale: $scope.locales[0]
			});
		}
	}

}]);

app.directive('translationForm', function(){
	return{
		contoller: 'formController',
		templateUrl: 'form-template.html'
		};
});

app.filter('freelocale', function(){ 
	    return function() {  
	    	var result = locales;
	    	var tr = translations;
	    	var existLocales = [];

	    	function logArrayElements(element, index, array) {
	    		var indexDel = result.indexOf(element.locale);
	    		if(indexDel > -1){
	    			result.splice(indexDel, 1);
	    		}
			}

			tr.forEach(logArrayElements);
    		return result;
	  };
  });