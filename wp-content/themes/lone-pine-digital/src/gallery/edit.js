import {
    useBlockProps,
    MediaUpload,
    MediaUploadCheck,
    RichText,
    InspectorControls
} from '@wordpress/block-editor';

import { Button, PanelBody, SelectControl } from '@wordpress/components';

export default function Edit({ attributes, setAttributes }) {
    const { heading, imagePairs = [], scheme } = attributes;

    const blockProps = useBlockProps({
        className: `gallery ${scheme}`
    });

    const updatePair = (index, type, img) => {
        const newPairs = [...imagePairs];
        newPairs[index] = {
            ...newPairs[index],
            [type]: {
                id: img.id,
                url: img.url,
                alt: img.alt,
                width: img.width,
                height: img.height
            }
        };
        setAttributes({ imagePairs: newPairs });
    };

    const addPair = () => {
        setAttributes({
            imagePairs: [
                ...imagePairs,
                { before: null, after: null }
            ]
        });
    };

    const removePair = (index) => {
        const newPairs = [...imagePairs];
        newPairs.splice(index, 1);
        setAttributes({ imagePairs: newPairs });
    };

    return (
        <>
            <InspectorControls>
                <PanelBody title="Gallery Scheme" initialOpen={true}>
                    <SelectControl
                        label="Colour Scheme"
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
                <RichText
                    tagName="h2"
                    value={heading}
                    onChange={(value) => setAttributes({ heading: value })}
                    placeholder="Add gallery heading…"
                />

                <div className="image-pairs-editor">
                    {imagePairs.map((pair, index) => (
                        <div className="image-pair" key={index}>
                            <div className="pair-column">
                                <MediaUploadCheck>
                                    <MediaUpload
                                        onSelect={(img) => updatePair(index, 'before', img)}
                                        allowedTypes={['image']}
                                        value={pair.before?.id}
                                        render={({ open }) => (
                                            <Button onClick={open} variant="secondary">
                                                {pair.before ? 'Replace Before Image' : 'Select Before Image'}
                                            </Button>
                                        )}
                                    />
                                </MediaUploadCheck>

                                {pair.before && (
                                    <img
                                        className="preview"
                                        src={pair.before.url}
                                        alt={pair.before.alt}
                                    />
                                )}
                            </div>

                            <div className="pair-column">
                                <MediaUploadCheck>
                                    <MediaUpload
                                        onSelect={(img) => updatePair(index, 'after', img)}
                                        allowedTypes={['image']}
                                        value={pair.after?.id}
                                        render={({ open }) => (
                                            <Button onClick={open} variant="secondary">
                                                {pair.after ? 'Replace After Image' : 'Select After Image'}
                                            </Button>
                                        )}
                                    />
                                </MediaUploadCheck>

                                {pair.after && (
                                    <img
                                        className="preview"
                                        src={pair.after.url}
                                        alt={pair.after.alt}
                                    />
                                )}
                            </div>

                            <Button
                                variant="link"
                                isDestructive
                                onClick={() => removePair(index)}
                            >
                                Remove Pair
                            </Button>
                        </div>
                    ))}
                </div>

                <Button variant="primary" onClick={addPair}>
                    Add Image Pair
                </Button>
            </div>
        </>
    );
}