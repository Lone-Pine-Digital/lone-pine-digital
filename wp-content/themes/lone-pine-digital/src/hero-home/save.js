import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save({ attributes }) {
    const {
        heading,
        subheading,
        buttonOneText,
        buttonOneUrl,
        buttonTwoText,
        buttonTwoUrl,
        imageUrl,
    } = attributes;

    return (
        <section className="hero-home">
            <div className='container'>
                <div className="text-wrapper">
                    <RichText.Content
                        className="hero-heading fade-in-left"
                        tagName="h1"
                        value={heading}
                    />

                    <RichText.Content
                        tagName="p"
                        value={subheading}
                        className="hero-text fade-in-left"
                    />

                    {buttonOneText && (
                        <a
                            href={buttonOneUrl || '#'}
                            className="btn btn-secondary fade-in-left"
                        >
                            {buttonOneText}
                        </a>
                    )}

                    {buttonTwoText && (
                        <a
                            href={buttonTwoUrl || '#'}
                            className="btn btn-secondary fade-in-left"
                        >
                            {buttonTwoText}
                        </a>
                    )}

                </div>
                <img className="fade-in-right" src={imageUrl} alt="" />
            </div>
        </section>
    );
}