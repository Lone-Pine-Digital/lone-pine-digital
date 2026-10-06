import { __ } from '@wordpress/i18n';

import {
    useBlockProps,
    RichText,
    InspectorControls
} from '@wordpress/block-editor';

import { PanelBody, SelectControl, TextControl } from '@wordpress/components';

export default function Edit({ attributes, setAttributes }) {
    const { heading, body, scheme } = attributes;

    const blockProps = useBlockProps({
        className: `plain-text ${scheme}`
    });

    return (
        <>
            <InspectorControls>
                <PanelBody title="Plain Text Scheme" initialOpen={true}>
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
                    placeholder="Add section heading…"
                />

                <RichText
                    tagName="p"
                    value={body}
                    onChange={(value) => setAttributes({ body: value })}
                    placeholder="Add section content…"
                />
            </div>
        </>
    );
}