import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save({ attributes }) {
    const { formId, heading, scheme, text } = attributes;

    const blockProps = useBlockProps.save({
        className: `contact-form ${scheme}`
    });

    return (
        <section id="contactForm" {...blockProps}>
            <div className="container">
                <RichText.Content
                    className="section-heading fade-in-up"
                    tagName="h2"
                    value={heading}
                />

                <RichText.Content
                    className="section-body fade-in-up"
                    tagName="p"
                    value={text}
                />

                <div className="fade-in-up">
                    {formId
                        ? `[wpforms id="${formId}"]`
                        : 'No form selected'
                    }
                </div>
            </div>
        </section>
    );
}