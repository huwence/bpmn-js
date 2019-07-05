import PreviewSupportModule from '../preview-support';

import BpmnReplacePreview from './BpmnReplacePreview';

export default {
  __depends__: [
    PreviewSupportModule
  ],
  __init__: [ 'bpmnReplacePreview' ],
  bpmnReplacePreview: [ 'type', BpmnReplacePreview ]
};
