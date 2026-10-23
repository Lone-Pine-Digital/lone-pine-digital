import {
    useBlockProps,
    RichText,
    InspectorControls
} from '@wordpress/block-editor';

import {
    PanelBody,
    SelectControl,
    TextControl
} from '@wordpress/components';

export default function Edit({ attributes, setAttributes }) {
    const { heading, paragraph, mapShortcode, scheme } = attributes;

    const blockProps = useBlockProps({
        className: `map-section ${scheme}`
    });

    return (
        <>
            <InspectorControls>
                <PanelBody title="Map Scheme" initialOpen={true}>
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

            <section {...blockProps}>
                <div className="container full-width">

                    <RichText
                        className="section-heading fade-in-up"
                        tagName="h2"
                        value={heading}
                        onChange={(value) => setAttributes({ heading: value })}
                        placeholder="Heading…"
                    />

                    <RichText
                        className="section-body fade-in-up"
                        tagName="p"
                        value={paragraph}
                        onChange={(value) => setAttributes({ paragraph: value })}
                        placeholder="Paragraph…"
                    />


                        <TextControl
                            label="Shortcode"
                            value={mapShortcode}
                            onChange={(value) => setAttributes({ mapShortcode: value })}
                            placeholder="[my_shortcode]"
                        />

                </div>
            </section>
        </>
    );
}