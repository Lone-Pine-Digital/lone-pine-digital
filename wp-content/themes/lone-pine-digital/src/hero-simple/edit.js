import { useSelect } from '@wordpress/data';
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, SelectControl } from '@wordpress/components';

export default function Edit({ attributes, setAttributes }) {

    const { scheme } = attributes;

    // Get page title + featured image
    const { title, featuredImageUrl } = useSelect((select) => {
        const editor = select('core/editor');
        const featuredId = editor.getEditedPostAttribute('featured_media');

        return {
            title: editor.getEditedPostAttribute('title'),
            featuredImageUrl: featuredId
                ? select('core').getMedia(featuredId)?.source_url
                : null
        };
    }, []);

    const blockProps = useBlockProps({
        className: `hero-simple ${scheme}`
    });

    return (
        <>
            <InspectorControls>
                <PanelBody title="Hero Settings">
                    <SelectControl
                        label="Colour Scheme"
                        value={scheme}
                        options={[
                            { label: 'Eggshell', value: 'eggshell' },
                            { label: 'Evergreen', value: 'evergreen' },
                            { label: 'Celadon', value: 'celadon' },
                        ]}
                        onChange={(value) => setAttributes({ scheme: value })}
                    />
                </PanelBody>
            </InspectorControls>

            <section {...blockProps}>
                <div className="container">

                    <h1 className="hero-heading fade-in-up">
                        {title}
                    </h1>

                    {featuredImageUrl && (
                        <img className="fade-in-up" src={featuredImageUrl} alt="" />
                    )}

                </div>
            </section>
        </>
    );
}