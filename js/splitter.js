angular.module('bgDirectives', [])
    .directive('bgSplitter', function () {
        return {
            restrict: 'E',
            replace: true,
            transclude: true,
            scope: {
                orientation: '@'
            },

            template: '<div class="split-panes-{{orientation}}" ng-transclude></div>',

            controller: ['$scope', function ($scope) {
                $scope.panes = [];

                this.addPane = function (pane) {
                    if ($scope.panes.length > 1)
                        throw 'bgSplitter can only have two panes';
                    $scope.panes.push(pane);
                    return $scope.panes.length;
                };

            }],

            link: function (scope, element, attrs) {

                scope.panes[0].minSize = (typeof scope.panes[0].minSize !== "undefined" && scope.panes[0].minSize > 40) ? scope.panes[0].minSize : 40;
                scope.panes[1].minSize = (typeof scope.panes[1].minSize !== "undefined" && scope.panes[1].minSize > 40) ? scope.panes[1].minSize : 40;

                var splitHandlerClassName = 'split-handler';

                var handler = angular.element('<div class="' + splitHandlerClassName + '"><i class="down arrowIcon fa fa-chevron-down"></i><i class="up arrowIcon fa fa-chevron-up"></i></div>');
                if (scope.orientation === 'vertical') {
                    handler = angular.element('<div class="' + splitHandlerClassName + '"><i class="right arrowIcon fa fa-chevron-right"></i><i class="left arrowIcon fa fa-chevron-left"></i></div>');
                }

                scope.panes[0].elem.after(handler);
                var drag = false;

                scope.setTitle = function (oldPane, newPane) {
                    oldPane.minimized = false;
                    newPane.minimized = true;
                    scope.$apply();
                };

                scope.hideTitle = function (pane1st, pane2nd) {
                    pane1st.minimized = false;
                    pane2nd.minimized = false;
                    scope.$apply();
                };

                handler.bind('click', function (ev) {

                    if (ev.target.className !== splitHandlerClassName) {
                        var bounds = element[0].getBoundingClientRect();

                        if (scope.orientation === 'vertical') {
                            var posVertical = ev.clientX - bounds.left;

                            if (ev.target.classList[0] === 'right') {
                                posVertical = bounds.width - scope.panes[1].minSize;
                                //The width of the left pane
                                scope.panes[0].elem.css('width', posVertical + 'px');
                                scope.setTitle(scope.panes[0], scope.panes[1]);

                            } else if (ev.target.classList[0] === 'left') {
                                posVertical = bounds.left - scope.panes[1].minSize;
                                scope.setTitle(scope.panes[1], scope.panes[0]);

                            } else {
                                return;
                            }

                            handler.css('left', posVertical + 'px');
                            scope.panes[1].elem.css('left', posVertical + 'px');

                        } else {
                            var posHorizontal = ev.clientY - bounds.top;

                            if (ev.target.classList[0] === 'down') {
                                posHorizontal = bounds.height - scope.panes[1].minSize;
                                scope.setTitle(scope.panes[0], scope.panes[1]);

                            } else if (ev.target.className.lastIndexOf('up', 0) === 0) {
                                posHorizontal = scope.panes[0].minSize;
                                scope.setTitle(scope.panes[1], scope.panes[0]);
                            } else {
                                return;
                            }

                            scope.panes[0].elem.css('height', posHorizontal + 'px');
                            handler.css('top', posHorizontal + 'px');
                            scope.panes[1].elem.css('top', posHorizontal + 'px');

                        }
                    }
                });

                element.bind('mousemove', function (ev) {

                    if (!drag) { return; }

                    var bounds = element[0].getBoundingClientRect();

                    if (scope.orientation === 'horizontal') {

                        var posHorizontal = ev.clientY - bounds.top;

                        if (posHorizontal < scope.panes[0].minSize)
                        {
                            scope.setTitle(scope.panes[1], scope.panes[0]);
                            return;
                        }

                        if ((bounds.bottom - bounds.top) - posHorizontal < scope.panes[1].minSize) {
                            scope.setTitle(scope.panes[0], scope.panes[1]);
                            return;
                        }

                        scope.hideTitle(scope.panes[0],scope.panes[1]);

                        handler.css('top', posHorizontal + 'px');
                        scope.panes[0].elem.css('height', posHorizontal + 'px');
                        scope.panes[1].elem.css('top', posHorizontal + 'px');

                    } else if (scope.orientation === 'vertical'){

                        var width = bounds.right - bounds.left;
                        var posVertical = ev.clientX - bounds.left;

                        if (posVertical < scope.panes[0].minSize) {
                            scope.setTitle(scope.panes[1], scope.panes[0]);
                            return;
                        }

                        if (width - posVertical < scope.panes[1].minSize) {
                            scope.setTitle(scope.panes[0], scope.panes[1]);
                            return;
                        }

                        scope.hideTitle(scope.panes[0],scope.panes[1]);
                        handler.css('left', posVertical + 'px');

                        //update width only if more then 50%
                        if (posVertical > bounds.right / 2) {
                            scope.panes[0].elem.css('width', posVertical + 'px');
                        }

                        scope.panes[1].elem.css('left', posVertical + 'px');
                    }
                });

                handler.bind('mousedown', function (ev) {
                    if (ev.target.className === splitHandlerClassName) {
                        ev.preventDefault();
                        drag = true;
                    }
                });

                angular.element(document).bind('mouseup', function (ev) {
                    drag = false;
                });
            }
        };
    })

    .directive('bgPane', function () {
        return {
            restrict: 'E',
            require: '^bgSplitter',
            replace: true,
            transclude: true,
            scope: {
                label: '@',
                minSize: '='
            },

            template: '<div class="split-pane{{index}}"><h3 class="title" ng-show="minimized === true">{{label}}</h3 ><div ng-show="minimized === false" ng-transclude></div></div>',

            link: function (scope, element, attrs, bgSplitter) {

                scope.elem = element;
                scope.minimized = false;
                scope.index = bgSplitter.addPane(scope);
            },

            controller: ['$scope', '$http', function ($scope, $http) {
                $scope.getTemplateUrl = function () {
                    return (($scope.template) ? ('tables/' + $scope.template + '.htm') : ( 'tables/table-default.htm'));
                };
            }]
        };
    });
