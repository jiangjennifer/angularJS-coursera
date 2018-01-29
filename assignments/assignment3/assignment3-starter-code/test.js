(function() {
	'use strict';
	angular.module('app', [])
	.controller('MenuChoiceController', MenuChoiceController)
	.factory('FilterService', FilterService)
	.directive('listMenu', ListMenu);

	function ListMenu() {
		var ddo = {
			templateUrl: "listMenu.html",
			scope: {
				items: "<",
				removeItem: "&",
				title:"@",
			}, 
			controller: () => {},
			controllerAs: "listMenu",
			bindToController: true,
			restrict:"E",
			link: menuLink,
			transclude: true,
		}
		return ddo;
	}

	function menuLink(scope, element, attrs, controller, transclude) {
		console.log("transclude: ", transclude);
		scope.$watch(() => controller.title, (newValue) => {
			if (newValue !== 'Nothing found!') {
				element.find("h3").css('display', 'block');
			}
			
		})
	}

	MenuChoiceController.$inject=['$http', 'FilterService'];
	function MenuChoiceController($http, FilterService) {
		var choice = this;
		choice.keyword = "";
		var service = FilterService();
		choice.filteredList = [];
		choice.list = service.list;
		choice.title = "Nothing found!";
		$http({
			url: "https://davids-restaurant.herokuapp.com/menu_items.json"
		}).then((response) => {
			choice.data = response.data.menu_items;
		}, () => {
			console.log("load failure!");
		});
		choice.filter = function() {
			choice.filteredList = [];
			service.filter(choice.filteredList, choice.data, choice.keyword);
			choice.title = choice.filteredList.length === 0 ? "Nothing is Found!" : "total found items is " + choice.filteredList.length;
		}
		choice.remove = function(index) {
			choice.filteredList.splice(index, 1);
			choice.title = "total found items is " + choice.filteredList.length;
		}

	}

	function FilterService() {
		return function() {
			return new filter();
		}
	}

	function filter(data) {
		var service = this;
		service.list = [];
		service.filter = function(list, data, keyword) {
			if (keyword.length === 0 || !keyword) {
				return;
			}
			for (let item of data) {
				if (item.description.toLowerCase().indexOf(keyword) !== -1) {
					list.push(item);
				}
			}
		}
	}
})();