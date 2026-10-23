import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save({ attributes }) {
    const { formId, heading, scheme, text } = attributes;

    const blockProps = useBlockProps.save({
        className: `contact-form ${scheme}`
    });

    return (
        <section id="contactForm" {...blockProps}>
            <div className="container full-width">
                <div class="left fade-in-left">
                    <RichText.Content
                        className="section-heading"
                        tagName="h2"
                        value={heading}
                    />

                    <RichText.Content
                        className="section-body"
                        tagName="p"
                        value={text}
                    />

                    {formId
                        ? `[wpforms id="${formId}"]`
                        : 'No form selected'
                    }
                    
                </div>
                <div class="right fade-in-right"></div>
            </div>
        </section>
    );
}