(function () {
    'use strict'

    angular.module('NarrowItDownApp', [])
        .controller('NarrowItDownController', NarrowItDownController)
        .service('MenuSearchService', MenuSearchService)
        .directive('foundItems', foundItemsDirective)

    NarrowItDownController.$inject = ['MenuSearchService', '$scope'];
    
    /***************Directive*****************/
    function foundItemsDirective() {
        var ddo = {
            templateUrl: 'foundItems.html',
            scope: {
                list: "<",
                items: '<',
                title: "@title",
                result: "@result",
                onRemove: "&"
            },
            // controller: NarrowItDownController,
            // controllerAs: 'list',
            // bindToController: true
        };
        
        return ddo;   
    }

    function NarrowItDownController(MenuSearchService, $scope) {
        // $scope.value = null
        var menu = this;
        menu.searchFor = "";
        menu.searchResult = "";

        var found = MenuSearchService.getMatchedMenuItems();
         found.then(function (response) {
            console.log(response);    
            menu.menu_items = response.data;        
         })
        .catch(function (error) {
          console.log("Nothing Found");            
        })

        menu.menu_lists = function () {

            console.log($scope.value)
            var i = 0;
            var l = [];
            while (i < 100) {
                
                if ((menu.menu_items.menu_items[i].description).includes($scope.value)) {
                    l.push(menu.menu_items.menu_items[i])
                }
                i++
            }
            console.log(l);
            // l =[]
            menu.searchResult = l
            return l          
        };

        menu.onRemove = function (index) {
            console.log("Index: ", index);
            menu.searchResult.splice(index, 1)
        };
    }
    
    /*************Service************/

    MenuSearchService.$inject = ['$http']
    function MenuSearchService($http) {
        var service = this;
        service.getMatchedMenuItems = function () {
            var response = $http({
                method: "GET",
                url: ("https://davids-restaurant.herokuapp.com/menu_items.json"),               
            });
            console.log(response);
            return response            
        }
    }

})()