import {
    useBlockProps,
    MediaUpload,
    MediaUploadCheck,
    RichText,
    URLInput,
} from '@wordpress/block-editor';

import {
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
        subheading,
        buttonOneText,
        buttonOneUrl,
        buttonOnePageId,
        buttonTwoText,
        buttonTwoUrl,
        buttonTwoPageId,
    } = attributes;

    const blockProps = useBlockProps({
        className: `hero`
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

    const handlePageSelectOne = (pageIdOne) => {
        setAttributes({ 
            buttonOnePageId: pageIdOne,
        });

        if (pageIdOne === 0) return;

        const selected = pages.find((p) => p.id === pageIdOne);
        if (selected) {
            setAttributes({ buttonOneUrl: selected.link });
        }
    };

    const handlePageSelectTwo = (pageIdTwo) => {
        setAttributes({ 
            buttonTwoPageId: pageIdTwo,
        });

        if (pageIdTwo === 0) return;

        const selected = pages.find((p) => p.id === pageIdTwo);
        if (selected) {
            setAttributes({ buttonTwoUrl: selected.link });
        }
    };

    return (
        <>

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
                    tagName="h1"
                    value={heading}
                    onChange={(value) => setAttributes({ heading: value })}
                    placeholder="Add hero heading…"
                />

                <RichText
                    tagName="p"
                    value={subheading}
                    onChange={(value) => setAttributes({ subheading: value })}
                    placeholder="Add descriptive text…"
                />

                <RichText
                    tagName="a"
                    value={buttonOneText}
                    onChange={(value) => setAttributes({ buttonOneText: value })}
                    placeholder="Add button one text…"
                />

                {/* URL Input */}
                <TextControl
                    label="Button One URL"
                    value={buttonOneUrl}
                    onChange={(value) => {
                        setAttributes({ buttonOneUrl: value, buttonOnePageId: 0 });
                    }}
                    placeholder="https://example.com"
                />

                {/* Page Selector */}
                <SelectControl
                    label="Or select a page"
                    value={buttonOnePageId}
                    options={pageOptions}
                    onChange={(value) => handlePageSelectOne(parseInt(value, 10))}
                />

                <RichText
                    tagName="a"
                    value={buttonTwoText}
                    onChange={(value) => setAttributes({ buttonTwoText: value })}
                    placeholder="Add button two text…"
                />

                {/* URL Input */}
                <TextControl
                    label="Button Two URL"
                    value={buttonTwoUrl}
                    onChange={(value) => {
                        setAttributes({ buttonTwoUrl: value, buttonTwoPageId: 0 });
                    }}
                    placeholder="https://example.com"
                />

                {/* Page Selector */}
                <SelectControl
                    label="Or select a page"
                    value={buttonTwoPageId}
                    options={pageOptions}
                    onChange={(value) => handlePageSelectTwo(parseInt(value, 10))}
                />

            </div>
        </>
    );
}