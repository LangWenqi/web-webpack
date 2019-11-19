/**
 * @description: set document's fontSize for autoSize
 */
(function () {
  var deviceWidth = document.documentElement.clientWidth;
  document.documentElement.style.fontSize = deviceWidth / 3.75 + 'px';
  window.onresize = function () {
    var deviceWidth = document.documentElement.clientWidth;
    document.documentElement.style.fontSize = deviceWidth / 3.75 + 'px';
  };
})();
