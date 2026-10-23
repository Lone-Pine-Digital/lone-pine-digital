import { registerBlockType } from '@wordpress/blocks';
import Edit from './edit';
import save from './save';

import './style.scss';
import './editor.scss';

registerBlockType('lone-pine-digital/logos', {
    edit: Edit,
    save,
});