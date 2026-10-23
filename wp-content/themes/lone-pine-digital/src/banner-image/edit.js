import {
    useBlockProps,
    MediaUpload,
    MediaUploadCheck,
    InspectorControls
} from '@wordpress/block-editor';

import { PanelBody, Button, SelectControl } from '@wordpress/components';

export default function Edit({ attributes, setAttributes }) {
    const { image, scheme } = attributes;

    const blockProps = useBlockProps({
        className: `banner-image ${scheme}`
    });

    return (
        <>
        <InspectorControls>
          <PanelBody title="FAQs Scheme" initialOpen={true}>
            <SelectControl
              label="Color Scheme"
              value={scheme}
              options={[
                { label: 'Eggshell', value: 'eggshell' },
                { label: 'Evergreen', value: 'evergreen' },
                { label: 'Celadon', value: 'celadon' }
              ]}
              onChange={(value) => setAttributes({ scheme: value })}
            />
          </PanelBody>
        </InspectorControls>
            
            <div {...blockProps}>
                <MediaUploadCheck>
                    <MediaUpload
                        onSelect={(media) => setAttributes({ image: media.url })}
                        allowedTypes={['image']}
                        render={({ open }) => (
                            <Button onClick={open} variant="primary">
                                {image ? 'Change Image' : 'Select Image'}
                            </Button>
                        )}
                    />
                </MediaUploadCheck>
                
                {image && <img src={image} alt="Image" />}

            </div>
        </>
    );
}