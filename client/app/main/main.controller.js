(function() {
  'use strict';
  angular.module('candyGramApp')
    .controller('MainController', MainController);

MainController.$inject = ['$http', '$log', 'socket'];

  function MainController($http, $log, socket) {
    var vm = this;
    vm.awesomeThings = [];

    $http.get('/api/things')
      .then(function(response) {
        vm.data = response.data;
        $log.debug('Data:', vm.data);



        surface();







      });

      function linePolt3d() {
        var trace3 = {
          x: vm.data[0].x,
          y: vm.data[0].y,
          z: vm.data[0].z,
          mode: 'lines',
          marker: {
            color: '#bcbd22',
            size: 12,
            symbol: 'circle',
            line: {
              color: 'rgb(0,0,0)',
              width: 0
            }
          },
          line: {
            color: '#bcbd22',
            width: 1
          },
          type: 'scatter3d'
        };
        var data = [trace3];
        var layout = {
          autosize: false,
          width: 500,
          height: 500,
          margin: {
            l: 0,
            r: 0,
            b: 0,
            t: 65
          }
        };
        Plotly.newPlot('myDiv', data, layout);
      }

      function surface() {
                var data = [
          {
            x: vm.data[0].x,
            y: vm.data[0].y,
            z: vm.data[0].z,
            type: 'surface'
          }
        ];
        var layout = {
          title: 'Mt Bruno Elevation',
          autosize: false,
          width: 500,
          height: 500,
          margin: {
            l: 65,
            r: 50,
            b: 65,
            t: 90
          }
        };
        Plotly.newPlot('myDiv', data, layout);
      }

      function hist2d() {
        var data = [
          {
            x: vm.data[0].x,
            y: vm.data[0].y,
            z: vm.data[0].z,
            histnorm: 'probability',
            autobinx: true,
            autobiny: true,
            type: 'histogram2d'
          }
        ];
        Plotly.newPlot('myDiv', data);
      }


      function scatter3d() {
        var trace1 = {
          x: vm.data[0].x,
          y: vm.data[0].y,
          z: vm.data[0].z,
          marker: {
            size: 12,
            line: {
              color: 'rgba(217, 217, 217, 0.14)',
              width: 0.5
            },
            opacity: 0.8
          },
          type: 'scatter3d'
        };

        var data = [trace1];
        var layout = {margin: {
            l: 0,
            r: 0,
            b: 0,
            t: 0
          }};
        Plotly.newPlot('myDiv', data, layout);
      }
  }



    // var data = response.data;
    // socket.syncUpdates('thing', vm.awesomeThings);

//
// });
//


//   this.addThing = function() {
//     if (self.newThing === '') {
//       return;
//     }
//     $http.post('/api/things', { name: self.newThing });
//     self.newThing = '';
//   };
//
//   this.deleteThing = function(thing) {
//     $http.delete('/api/things/' + thing._id);
//   };
//
//   $scope.$on('$destroy', function() {
//     socket.unsyncUpdates('thing');
//   });
// }



})();
