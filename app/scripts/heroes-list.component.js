(function(angular){
"use strict";
	function controller($scope,$element,$attrs,$state,HeroesApiFactory){
		var ctrl = this;
			ctrl.heroes = [];
			ctrl.selectedHero = null;
			ctrl.heroName = '';
			$scope.newHero = {
				id: null,
				name: ''
			};
			function getHeroes(){
				HeroesApiFactory.getHeroes().then(function(data){
					ctrl.heroes = data;
				})
			}

			ctrl.onSelect = function(hero){
				ctrl.selectedHero = hero;
			}
			ctrl.delete = function(hero){
				console.log("delete hero: ", hero);
				HeroesApiFactory.delete(hero.id).then(function(heroes){
					ctrl.heroes = heroes;
				},
				function(error){
					console.warn("delete error:",error);
				});
			}

			ctrl.gotoDetail = function(){
				$state.go('hero-details', { id: ctrl.selectedHero.id });
			}

			ctrl.search = function(searchTerm){
				ctrl.selectedHero = null;
				if(searchTerm.trim() === ""){
					getHeroes();
				}
				else{
					HeroesApiFactory.search(searchTerm)
					.then(function(response){
						ctrl.heroes = response;
					})
				}
			}

			this.$onInit = function(){
				getHeroes();
			};
		}


	angular.module('tourOfHeroesApp')
	.component('heroesList',{
		templateUrl: 'templates/heroes-list.html',
		controller: ['$scope','$element','$attrs','$state','HeroesApiFactory',controller]
	});
	

})(window.angular);