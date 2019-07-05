import inherits from 'inherits';
import _PreviewSupport from 'diagram-js/lib/features/preview-support/PreviewSupport';
import {
  append as svgAppend,
  attr as svgAttr,
  classes as svgClasses,
  clone as svgClone,
  create as svgCreate
} from 'tiny-svg';

import { query as domQuery } from 'min-dom';

export default function PreviewSupport(elementRegistry, eventBus, canvas, styles) {
  _PreviewSupport.call(this, elementRegistry, eventBus, canvas, styles);
}

PreviewSupport.$inject = [
  'elementRegistry',
  'eventBus',
  'canvas',
  'styles'
];

inherits(PreviewSupport, _PreviewSupport);

// Override
PreviewSupport.prototype._cloneMarker = function(gfx, marker, markerType) {
  if (!marker) return;

  var markerId = marker.id;

  var clonedMarker = this._clonedMarkers[ markerId ];

  if (!clonedMarker) {
    clonedMarker = svgClone(marker);

    var clonedMarkerId = markerId + '-clone';

    clonedMarker.id = clonedMarkerId;

    svgClasses(clonedMarker)
      .add('djs-dragger')
      .add('djs-dragger-marker');

    this._clonedMarkers[ markerId ] = clonedMarker;

    var defs = domQuery('defs', this._canvas._svg);

    if (!defs) {
      defs = svgCreate('defs');

      svgAppend(this._canvas._svg, defs);
    }

    svgAppend(defs, clonedMarker);
  }

  var reference = idToReference(this._clonedMarkers[ markerId ].id);

  svgAttr(gfx, markerType, reference);
};

function idToReference(id) {
  return 'url(#' + id + ')';
}