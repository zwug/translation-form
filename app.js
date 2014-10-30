var app = angular.module('app', []);

app.controller('init', function ($scope){
	$scope.translations = [
		{
			locale : 'en',
			name: 'English club'
		},
		{
			locale : 'lt',
			workTime: '10:00 - 18:00'
		}
	];

	$scope.locales = [
		 'de', 'it', 'en', 'lt', 'fr'
	];
});

app.directive('translationForm', function(){
	return{
		restrict: 'E',
		scope: {
			'translations': '=ngModel',
			'locales' : '=locales'
		},
		templateUrl: 'form-template.html',
		controller: function($scope){
			$scope.locale = 'en';
			$scope.freeLocales = $scope.locales;
			
			var freeLocs = function(){
				var arrLocales = $scope.locales;								
				for (var i = $scope.translations.length - 1; i >= 0; i--) {
					var indexVal = arrLocales.indexOf($scope.translations[i].locale);
					if ((indexVal > -1)&&($scope.locale != $scope.translations[i].locale)) 
					{
						arrLocales.splice(indexVal, 1);
					}
				}
				$scope.freeLocales = arrLocales;
			}

			$scope.$watch('locale', function(newValue, oldValue) {
		  			indexDel = $scope.freeLocales.indexOf(newValue);
			    		if((indexDel > -1)&&($scope.locale != newValue)){
			    			$scope.freeLocales.splice(indexDel, 1, oldValue);
			    		}
			    	freeLocs();
			});

			$scope.changeLocale = function(translation){
				$scope.locale = translation.locale;
				if($scope.freeLocales.indexOf($scope.locale) == -1){
					$scope.freeLocales.push($scope.locale);
				}
			}

			$scope.updateTranslation = function(translation){
				//insert_to_database
			}

			$scope.createTranslation = function(){
				if($scope.freeLocales[0]){
				var i = 0;
					if($scope.freeLocales[0] == $scope.locale){
						var i = 1;
					}
					if($scope.freeLocales[1]){
						$scope.translations.push({
							locale: $scope.freeLocales[i]
						});
						freeLocs();
					}
				}
			}
		}
	};
});