import { useBlockProps, RichText } from '@wordpress/block-editor';
import { RawHTML } from '@wordpress/element';

export default function save({ attributes }) {
    const { heading, paragraph, mapShortcode, scheme } = attributes;

    const blockProps = useBlockProps.save({
        className: `map-section ${scheme}`
    });

    return (
        <section {...blockProps}>
            <div className="container full-width">
                
                {heading &&
                    <RichText.Content
                        className="section-heading fade-in-up"
                        tagName="h2"
                        value={heading}
                    />
                }

                {paragraph &&
                    <RichText.Content
                        className="section-body fade-in-up"
                        tagName="p"
                        value={paragraph}
                    />
                }

                <div className="map-wrapper fade-in-up">
                    {mapShortcode && (
                        <RawHTML>{ mapShortcode }</RawHTML>
                    )}
                </div>
            </div>
        </section>
    );
}