import CMS from 'netlify-cms-app';

import { IdControlWidget, IdControlPreview } from './custom_widgets/IdControlWidget';

import { PostPreview } from './preview/PostPreview';
import { CasePreview } from './preview/CasePreview';
import { ServicePreview } from './preview/ServicePreview';

CMS.init();

// Register custom widget for autogenerate id for new contents
CMS.registerWidget('id', IdControlWidget, IdControlPreview);

CMS.registerPreviewTemplate('post', PostPreview);
CMS.registerPreviewTemplate('case', CasePreview);
CMS.registerPreviewTemplate('service', ServicePreview);
