import inherits from 'inherits';
import _ConnectionPreview from 'diagram-js/lib//features/connection-preview/ConnectionPreview';
import {
  attr as svgAttr,
  create as svgCreate,
} from 'tiny-svg';

export default function ConnectionPreview(injector, canvas, graphicsFactory, elementFactory) {
  _ConnectionPreview.call(this, injector, canvas, graphicsFactory, elementFactory);
}

ConnectionPreview.$inject = [
  'injector',
  'canvas',
  'graphicsFactory',
  'elementFactory'
];

inherits(ConnectionPreview, _ConnectionPreview);

// Override
ConnectionPreview.prototype.createNoopConnection = function(start, end) {
  var connection = svgCreate('polyline');

  svgAttr(connection, {
    'stroke': window.teamsunBpmn.doc.initNoopStrokeColor || '#333',
    'strokeDasharray': [ 1 ],
    'strokeWidth': 2,
    'pointer-events': 'none'
  });

  svgAttr(connection, { 'points': [ start.x, start.y, end.x, end.y ] });

  return connection;
};


