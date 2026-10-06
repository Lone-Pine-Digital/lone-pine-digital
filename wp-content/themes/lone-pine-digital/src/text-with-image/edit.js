import {
    useBlockProps,
    MediaUpload,
    MediaUploadCheck,
    RichText,
    InspectorControls,
} from '@wordpress/block-editor';

import { PanelBody, SelectControl, Button } from '@wordpress/components';
import { useSelect } from '@wordpress/data';
import { store as coreStore } from '@wordpress/core-data';

export default function Edit({ attributes, setAttributes }) {
    const { imageUrl, heading, scheme, body, imageSide, buttonText,
        buttonPageId, hasBubble } = attributes;

    const blockProps = useBlockProps({
        className: `text-with-image ${scheme} ${imageSide}`
    });

    // Fetch pages
    const pages = useSelect(
        (select) =>
            select(coreStore).getEntityRecords('postType', 'page', {
                per_page: -1,
                orderby: 'title',
                order: 'asc',
            }),
        []
    );

    const pageOptions = [
        { label: '— Select a Page —', value: 0 },
        ...(pages?.map((page) => ({
            label: page.title.rendered || '(no title)',
            value: page.id,
        })) || [])
    ];

    const handlePageSelect = (pageId) => {
        setAttributes({ buttonPageId: pageId });

        if (pageId === 0) return;

        const selected = pages.find((p) => p.id === pageId);
        if (selected) {
            setAttributes({ buttonUrl: selected.link });
        }
    };

    return (
        <>
            <InspectorControls>
                <PanelBody title="Text With Image Scheme" initialOpen={true}>
                    <SelectControl
                        label="Colour Scheme"
                        value={scheme}
                        options={[
                            { label: 'Eggshell', value: 'eggshell' },
                            { label: 'Evergreen', value: 'evergreen' },
                            { label: 'Celadon', value: 'celadon' }
                        ]}
                        onChange={(value) => setAttributes({ scheme: value })}
                    />
                </PanelBody>
                <PanelBody title="Image Side" initialOpen={true}>
                    <SelectControl
                        label="Image Side"
                        value={imageSide}
                        options={[
                            { label: 'Left', value: 'img-left' },
                            { label: 'Right', value: 'img-right' },
                        ]}
                        onChange={(value) => setAttributes({ imageSide: value })}
                    />
                    <PanelBody title="Has Bubble" initialOpen={true}>
                    <SelectControl
                        label="Has Bubble"
                        value={hasBubble}
                        options={[
                            { label: 'Yes', value: 'has-bubble' },
                            { label: 'No', value: '' },
                        ]}
                        onChange={(value) => setAttributes({ hasBubble: value })}
                    />
                </PanelBody>
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
                    placeholder="Add heading…"
                />

                <RichText
                    tagName="p"
                    value={body}
                    onChange={(value) => setAttributes({ body: value })}
                    placeholder="Add body text…"
                />

                <RichText
                    tagName="a"
                    value={buttonText}
                    onChange={(value) => setAttributes({ buttonText: value })}
                    placeholder="Add button text…"
                />

                {/* Page Selector */}
                <SelectControl
                    label="Select a page"
                    value={buttonPageId}
                    options={pageOptions}
                    onChange={(value) => handlePageSelect(parseInt(value, 10))}
                />
            </div>
        </>
    );
}