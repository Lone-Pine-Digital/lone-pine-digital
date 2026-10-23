import {
    useBlockProps,
    MediaUpload,
    MediaUploadCheck,
    RichText,
    InspectorControls
} from '@wordpress/block-editor';

import { PanelBody, SelectControl, Button } from '@wordpress/components';

export default function Edit({ attributes, setAttributes }) {
    const { imageUrl, heading, scheme } = attributes;

    const blockProps = useBlockProps({
        className: `sample-block ${scheme}`
    });

    return (
        <>
            <InspectorControls>
                <PanelBody title="Sample Block Scheme" initialOpen={true}>
                    <SelectControl
                        label="Color Scheme"
                        value={scheme}
                        options={[
                            { label: 'White', value: 'white' },
                            { label: 'Dark', value: 'dark' },
                            { label: 'Blue', value: 'blue' }
                        ]}
                        onChange={(value) => setAttributes({ scheme: value })}
                    />
                </PanelBody>
            </InspectorControls>

            <div {...blockProps}>
                <MediaUploadCheck>
                    <MediaUpload
                        onSelect={(media) => setAttributes({ imageUrl: media.url })}
                        allowedTypes={['image']}
                        render={({ open }) => (
                            <Button onClick={open} variant="primary">
                                {imageUrl ? 'Change Image' : 'Select Image'}
                            </Button>
                        )}
                    />
                </MediaUploadCheck>

                {imageUrl && <img src={imageUrl} alt="" />}

                <RichText
                    tagName="h2"
                    value={heading}
                    onChange={(value) => setAttributes({ heading: value })}
                    placeholder="Add section heading…"
                />
            </div>
        </>
    );
}