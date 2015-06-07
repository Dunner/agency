'use strict';

/**
 * @ngdoc directive
 * @name agencyApp.ngBlocks
 * @description
 * # ngBlocks
 * Service in the agencyApp.
 */

angular.module('agencyApp')
  .directive('ngBlocksTwo', function($timeout, $q, $interval) {
    function getPosition(element) {
      var xPosition = 0;
      var yPosition = 0;
    
      while(element) {
          xPosition += (element.offsetLeft - element.scrollLeft + element.clientLeft);
          yPosition += (element.offsetTop - element.scrollTop + element.clientTop);
          element = element.offsetParent;
      }
      return { x: xPosition, y: yPosition };
    }
    var ctrl = function($scope, $element) {
      $scope.blocks = [
        {
          'id': 0,
          'maxwidth': 1,
          'maxheight': 1,
          'priority': 1,
        }, {
          'id': 1,
          'maxwidth': 2,
          'maxheight': 1,
          'priority': 2,
        }, {
          'id': 2,
          'maxwidth': 1,
          'maxheight': 3,
          'priority': 3,
        }, {
          'id': 3,
          'maxwidth': 5,
          'maxheight': 1,
          'priority': 4,
        }, {
          'id': 4,
          'maxwidth': 4,
          'maxheight': 1,
          'priority': 5,
        }, {
          'id': 5,
          'maxwidth': 1,
          'maxheight': 1,
          'priority': 6,
        }, {
          'id': 6,
          'maxwidth': 1,
          'maxheight': 1,
          'priority': 7,
        }, {
          'id': 7,
          'maxwidth': 1,
          'maxheight': 1,
          'priority': 8,
        }, {
          'id': 8,
          'maxwidth': 1,
          'maxheight': 1,
          'priority': 9,
        }, {
          'id': 9,
          'maxwidth': 1,
          'maxheight': 1,
          'priority': 10,
        }, {
          'id': 10,
          'maxwidth': 1,
          'maxheight': 1,
          'priority': 11,
        }, {
          'id': 11,
          'maxwidth': 1,
          'maxheight': 1,
          'priority': 12,
        }, {
          'id': 12,
          'maxwidth': 1,
          'maxheight': 1,
          'priority': 13,
        }, {
          'id': 13,
          'maxwidth': 1,
          'maxheight': 1,
          'priority': 14,
        }
      ];
      var grid = [];
      var prioritylist = [];
      $scope.gridwidth = 8;

      // Functions
      function prioritizeBlocks(array){
        var deferred = $q.defer();
        prioritylist = [];
        for (var i = 0; i < array.length; i++) {
          prioritylist.push(array[i].id);
        }
        prioritylist = prioritylist.sort(function (a, b) {
            return array[blockObjectId(b)].priority - array[blockObjectId(a)].priority;
        });
        deferred.resolve();
        return deferred.promise;
      }
      function container() {
        return angular.element($element[0])[0];
      }
      function cleanGrid() {
        var deferred = $q.defer();
        grid = [];
        addGridRow();
        deferred.resolve();
        return deferred.promise;
      }
      function addGridRow() {
        var deferred = $q.defer();
        var length = grid.length;
        if (typeof grid[length] === 'undefined') {
          grid.push([]);
        }
        for (var ci = 0; ci < $scope.gridwidth; ci++) {
          grid[length][ci] = null;
        }
        deferred.resolve();
        return deferred.promise;
      }
      function findEmptyGrid(block) {
        for (var ri = 0; ri < grid.length; ri++) {
          for (var ci = 0; ci < $scope.gridwidth; ci++) {
            if (grid[ri][ci] === null) { //Found a free slot
              //Can we fit the blocks tempwidth or should we keep looking?
              if ((ci + block.tempwidth - 1) < $scope.gridwidth){
                //Are any of the tempwidth spaces we need occupied?
                for (var nyi = ri; (nyi <= ri + block.tempheight -1) && (nyi < grid.length); nyi++) {
                  for (var nxi = ci; nxi <= ci + block.tempwidth - 1; nxi++) {
                    if (isEmpty(nyi,nxi)) {
                      if ((ci + block.tempwidth - 1 === nxi) && (ri + block.tempheight - 1 === nyi)) {
                        return {'ri': ri, 'ci': ci};
                      }
                    }
                  }
                }
              }
            }
            if (ri === grid.length - 1 && ci === $scope.gridwidth - 1){
              //We couldnt fit our block in the grid, make it taller
              addGridRow();
              ri = 0;
              ci = -1;
            }
          }
        }
        return false;
      }
      function isEmpty(ri, ci) {
        if (grid[ri][ci] === null) {
          return true;
        } else {
          return false;
        }
      }
      // function removeElementFromGrid(id) {
      //   var deferred = $q.defer();
      //   for (var ri = 0; ri < grid.length; ri++) {
      //     for (var ci = 0; ci < grid[ri].length; ci++) {
      //       if (grid[ri][ci] === id) {
      //         grid[ri][ci] = null;
      //       }
      //     }
      //   }
      //   deferred.resolve();
      //   return deferred.promise;
      // }
      function blockElementId(id) {
        for (var i = $element.children().length - 1; i >= 0; i--) {
          var obj = angular.element($element.children()[i]);
          if (obj[0].attributes['data-id'].value === JSON.stringify(id)) {
            return obj;
          }
        }
        return false;
      }
      function blockObjectId(id) {
        for (var i = 0; i < $scope.blocks.length; i++) {
          var obj = $scope.blocks[i];
          if (obj.id === parseInt(id)) {
            return i;
          }
        }
        return false;
      }

      function updateBlocks(array) {
        if (!array) {
          array = $scope.blocks;
        }
        prioritizeBlocks(array)
        .then(function(){cleanGrid();})
        .then(function(){
          var deferred = $q.defer(),
              containerwidth = container().offsetWidth,
              cellwidth = Math.round(containerwidth / $scope.gridwidth),
              cellheight = 240;
          for (var i = 0; i < prioritylist.length; i++) {
            var block = array[blockObjectId(prioritylist[i])];
            block.tempwidth = block.maxwidth;
            block.tempheight = block.maxheight;
            if (block.maxwidth > $scope.gridwidth) {
              block.tempwidth = $scope.gridwidth;
              block.tempheight += (block.maxwidth - block.tempwidth);
            }

            var gridinfo = findEmptyGrid(block);
            if (gridinfo) {
              //Yes
              for (var ri = gridinfo.ri; ri < gridinfo.ri + block.tempheight; ri++) {
                //Add our block id to the verical grids we need
                grid[ri][gridinfo.ci] = block.id;
                //console.log(block.id, 'occupied', (emptyystart + fyi) + ':'+ emptyxstart);
                for (var ci = gridinfo.ci; ci < gridinfo.ci + block.tempwidth; ci++) {
                  //Add our block id to the maxwidth grids we need
                  grid[ri][ci] = block.id;
                  //console.log(block.id, 'occupied', emptyystart + fyi + ':'+ (emptyxstart + fxi));
                }
              }
              block.css = {
                'width': cellwidth * block.tempwidth + 'px',
                'height': cellheight * block.tempheight + 'px',
                'left': cellwidth * gridinfo.ci + 'px',
                'top': cellheight * gridinfo.ri + 'px',
                'z-index': i
              };
            }
          }
          $timeout(function(){ //Skiphack
            //Position and size the blocks
            angular.element($element[0]).css({
              'height': cellheight * grid.length + 'px'
            });
            drawBlocks(array);
            deferred.resolve();
            return deferred.promise;
          });
        });
      } //End updateBlocks

      function drawBlocks(array){
        for (var i = 0; i < array.length; i++) {
          var block = $scope.blocks[i];
          var id = $scope.blocks[i].id;
          blockElementId(id).css(block.css);
        }
      }
      updateBlocks($scope.blocks);

      function updatePrio(from, to, id) {
        console.log(from, to);
        for (var i = $scope.blocks.length - 1; i >= 0; i--) {
          var block = $scope.blocks[i];
          if (block.priority === to) {
            block.priority = from;
            $scope.blocks[blockObjectId(id)].priority = to;
          }
        }
      }

      $scope.update = function() {
        updateBlocks();
      };
      $scope.moveUp = function(id) {
        updatePrio($scope.blocks[blockObjectId(id)].priority, ($scope.blocks[blockObjectId(id)].priority)+1, id);
        updateBlocks($scope.blocks);
      };
      $scope.moveDown = function(id) {
        updatePrio($scope.blocks[blockObjectId(id)].priority, ($scope.blocks[blockObjectId(id)].priority)-1, id);
        updateBlocks($scope.blocks);
      };
      var liftblock = null,
          liftblockOffset = null;
      $scope.moveBlock = function(id) {
        // blockElementId(id)[0].className = 'tblock ng-scope';
        liftblock = id;
        liftblockOffset = {
          'x': getPosition($element[0]).x,
          'y': getPosition($element[0]).y
        };
        console.log(liftblockOffset);
      };
      $scope.dropBlock = function(id) {
        if (liftblock !== null) {
          if (liftblock !== id) {
            updatePrio($scope.blocks[blockObjectId(liftblock)].priority, $scope.blocks[blockObjectId(id)].priority, liftblock);
            liftblock = null;
          }
        }
      };
      document.body.addEventListener('mouseup', function(){
        liftblock = null;
      });
      var promise;
      var startMx,
          startMy,
          resizeId;
      $scope.changeSize = function(id, bool) {
        startMx = mx;
        startMy = my;
        resizeId = id;
        var twidth = parseInt(blockElementId(id).css('width'));
        var theight = parseInt(blockElementId(id).css('height'));
        if (bool) {
          promise = $interval(function () {
            var diffX = Math.abs( startMx - mx ),
                diffY = Math.abs( startMy - my );
        // var obj = $scope.blocks[blockObjectId(id)];
            var stringwidth, stringheight;
            if (startMx < mx) {
              stringwidth = twidth + diffX;
            }else{
              stringwidth = twidth - diffX;
            }
            if (startMy < my) {
              stringheight = theight + diffY;
            }else{
              stringheight = theight - diffY;
            }
            angular.element(blockElementId(id)).css({
              'width': stringwidth + 'px',
              'height': stringheight + 'px'
            });

            if ( diffX > Math.round(container().offsetWidth / $scope.gridwidth) ) {
              if (startMx < mx) {
                $scope.blocks[blockObjectId(resizeId)].maxwidth ++;
              }else{
                if($scope.blocks[blockObjectId(resizeId)].maxwidth !== 1) {
                  $scope.blocks[blockObjectId(resizeId)].maxwidth --;
                }
              }
              updateBlocks($scope.blocks);
              $interval.cancel(promise);
            }
            if ( diffY > 240 ) {
              if (startMy < my) {
                $scope.blocks[blockObjectId(resizeId)].maxheight ++;
              }else{
                if($scope.blocks[blockObjectId(resizeId)].maxheight !== 1) {
                  $scope.blocks[blockObjectId(resizeId)].maxheight --;
                }
              }
              updateBlocks($scope.blocks);
              $interval.cancel(promise);
            }
          }, 1);
        }else{
        }
        //updateBlocks($scope.blocks);
      };
      var mx, my,
          newhoverid = true,
          oldhoverid = false;
      $scope.mouse = function(event) {
        if (liftblock !== null) {
          blockElementId(liftblock).css({
            'left': parseInt(event.clientX) - liftblockOffset.x + 'px',
            'top': parseInt(event.clientY) - liftblockOffset.y + 'px',
          });
        }
        if (event.target.hasAttribute('data-id')) {
          oldhoverid = newhoverid;
          newhoverid = event.target.attributes['data-id'].value;
          if(newhoverid !== oldhoverid) {
            $scope.hoverelement = $scope.blocks[blockObjectId(newhoverid)];
            $scope.lasthoverelement = $scope.blocks[blockObjectId(oldhoverid)];
          }
        }
        if ($scope.hoverelement !== 'undefined') {
          mx = parseInt(event.clientX);
          my = parseInt(event.clientY);
        }
      };
      $scope.release = function() {
        $interval.cancel(promise);
        updateBlocks($scope.blocks);
      };

    };
    return {
      restrict: 'EA',
      replace: true,
      transclude: true,
      link: ctrl,
      template: '<div class="blockgroup" ng-transclude ng-mousemove="mouse($event)" ng-mousedown="hold()" ng-mouseup="release()"></div>'
    };
  });