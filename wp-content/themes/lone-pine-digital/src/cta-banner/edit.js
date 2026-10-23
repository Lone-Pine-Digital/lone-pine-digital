import {
    useBlockProps,
    MediaUpload,
    MediaUploadCheck,
    RichText,
    URLInput,
    InspectorControls
} from '@wordpress/block-editor';

import {
    PanelBody,
    SelectControl,
    Button,
    TextControl
} from '@wordpress/components';

import { useSelect } from '@wordpress/data';
import { store as coreStore } from '@wordpress/core-data';

export default function Edit({ attributes, setAttributes }) {
    const {
        imageUrl,
        heading,
        bodyText,
        buttonText,
        buttonUrl,
        buttonPageId,
        scheme
    } = attributes;

    const blockProps = useBlockProps({
        className: `cta-banner ${scheme}`
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
                <PanelBody title="Cta banner Scheme" initialOpen={true}>
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

                <RichText
                    tagName="p"
                    value={bodyText}
                    onChange={(value) => setAttributes({ bodyText: value })}
                    placeholder="Add descriptive text…"
                />

                <RichText
                    tagName="a"
                    value={buttonText}
                    onChange={(value) => setAttributes({ buttonText: value })}
                    placeholder="Add button text…"
                />

                {/* URL Input */}
                <TextControl
                    label="Button URL"
                    value={buttonUrl}
                    onChange={(value) => {
                        setAttributes({ buttonUrl: value, buttonPageId: 0 });
                    }}
                    placeholder="https://example.com"
                />

                {/* Page Selector */}
                <SelectControl
                    label="Or select a page"
                    value={buttonPageId}
                    options={pageOptions}
                    onChange={(value) => handlePageSelect(parseInt(value, 10))}
                />
            </div>
        </>
    );
}