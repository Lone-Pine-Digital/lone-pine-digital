import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save({ attributes }) {
    const { body, heading, scheme } = attributes;

    const blockProps = useBlockProps.save({
        className: `plain-text ${scheme}`
    });

    return (
        <section {...blockProps}>
            <div className="container">
                {heading && (
                    <RichText.Content
                        className="section-heading fade-in-up"
                        tagName="h2"
                        value={heading}
                    />
                )}

                {heading ? (
                    <RichText.Content
                        className="section-body fade-in-up"
                        tagName="p"
                        value={body}
                    />
                ) : (
                    <RichText.Content
                        className="section-body fade-in-up h4"
                        tagName="h2"
                        value={body}
                    />
                )}
                
            </div>
        </section>
    );
}