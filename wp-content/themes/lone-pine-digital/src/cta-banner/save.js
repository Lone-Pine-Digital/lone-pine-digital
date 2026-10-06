import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save({ attributes }) {
    const {
        heading,
        bodyText,
        buttonText,
        buttonUrl,
        imageUrl,
        scheme
    } = attributes;

    return (
        <section {...useBlockProps.save({ className: `cta-banner ${scheme}` })}>
            {imageUrl && <img src={imageUrl} alt="" />}
            <div className='container'>
                <div className="text-wrapper">
                    <RichText.Content
                        className="section-heading fade-in-left"
                        tagName="h2"
                        value={heading}
                    />

                    <RichText.Content
                        tagName="p"
                        value={bodyText}
                        className="section-body fade-in-left"
                    />

                    {buttonText && (
                        <a
                            href={buttonUrl || '#'}
                            className={ scheme === "evergreen" ? "btn btn-secondary fade-in-left" : "btn btn-primary fade-in-left" }
                        >
                            {buttonText}
                        </a>
                    )}
                </div>
            </div>
        </section>
    );
}