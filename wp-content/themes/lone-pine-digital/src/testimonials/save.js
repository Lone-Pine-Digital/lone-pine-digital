import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save({ attributes }) {
    const { heading, testimonials, scheme} = attributes;

    const blockProps = useBlockProps.save({
        className: `testimonials ${scheme}`
    });

    return (
        <section {...blockProps}>
            <div className="container full-width">
                {heading && <h2 className="section-heading">{heading}</h2>}
                <div className="swiper swiper-testimonials">
                    <div className="swiper-wrapper">

                        {testimonials.map((item, index) => (
                            <div
                                key={index}
                                className="swiper-slide testimonial-item"
                            >
                            
                                <RichText.Content
                                    tagName="p"
                                    className="testimonial-quote h5"
                                    value={`"${item.quote}"`}
                                />
                            </div>
                        ))}

                    </div>
                </div>
            </div>
        </section>
    );
}