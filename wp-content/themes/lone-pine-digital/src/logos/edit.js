import {
    useBlockProps,
    MediaUpload,
    MediaUploadCheck,
    RichText,
    InspectorControls
} from '@wordpress/block-editor';
import { Button, PanelBody, SelectControl } from '@wordpress/components';

export default function Edit({ attributes, setAttributes }) {
    const { heading, images, scheme } = attributes;

    const blockProps = useBlockProps({
        className: `logos-slider ${scheme}`
    });

    const onSelectImages = (newImages) => {
        setAttributes({
            images: newImages.map((img) => ({
                id: img.id,
                url: img.url,
                alt: img.alt,
                width: img.width,
                height: img.height
            }))
        });
    };

    return (
        <>
            <InspectorControls>
                <PanelBody title="Logos Scheme" initialOpen={true}>
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
                <RichText
                    tagName="h2"
                    value={heading}
                    onChange={(value) => setAttributes({ heading: value })}
                    placeholder="Add logos heading…"
                />

                <MediaUploadCheck>
                    <MediaUpload
                        onSelect={onSelectImages}
                        allowedTypes={['image']}
                        multiple
                        gallery
                        value={images.map((img) => img.id)}
                        render={({ open }) => (
                            <Button variant="primary" onClick={open}>
                                {images.length ? 'Edit Logos' : 'Add Logos'}
                            </Button>
                        )}
                    />
                </MediaUploadCheck>

                {images.length > 0 && (
                    <div className="multi-images-preview">
                        {images.map((img) => (
                            <img
                                key={img.id}
                                src={img.url}
                                alt={img.alt}
                                width={img.width}
                                height={img.height}
                            />
                        ))}
                    </div>
                )}
            </div>
        </>
    );
}