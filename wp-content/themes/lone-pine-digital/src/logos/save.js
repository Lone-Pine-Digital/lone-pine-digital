import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save({ attributes }) {
    const { heading, images, scheme } = attributes;

    const blockProps = useBlockProps.save({
        className: `logos-slider ${scheme}`
    });

    return (
        <section {...blockProps} data-count={images.length}>
            <div className="container full-width">
                {heading?.length > 0 && (
                    <RichText.Content
                        className="section-heading fade-in-up"
                        tagName="h2"
                        value={heading}
                    />
                )}
                <div className='swiper swiper-logo'>
                    <div className="swiper-wrapper">
                        {images.map((img) => (
                            <div className="swiper-slide" key={img.id}>
                                <img
                                className="logo"
                                src={img.url}
                                alt={img.alt}
                                height={img.height}
                                width={img.width}
                                loading="eager" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}