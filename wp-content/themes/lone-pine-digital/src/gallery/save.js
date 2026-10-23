import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save({ attributes }) {
    const { heading, imagePairs = [], scheme } = attributes;

    const blockProps = useBlockProps.save({
        className: `gallery ${scheme}`
    });

    return (
        <section {...blockProps} data-count={imagePairs.length}>
            <div className="container">

                {heading?.length > 0 && (
                    <RichText.Content
                        className="section-heading fade-in-up"
                        tagName="h2"
                        value={heading}
                    />
                )}

                <div className="gallery-grid">
                    {imagePairs.map((pair, index) => (
                        <div className="gallery-item fade-in-up" key={index}>

                            {pair.before && (
                                <img
                                    className="before"
                                    src={pair.before.url}
                                    alt={pair.before.alt}
                                    width={pair.before.width}
                                    height={pair.before.height}
                                    loading="eager"
                                />
                            )}

                            {pair.after && (
                                <img
                                    className="after"
                                    src={pair.after.url}
                                    alt={pair.after.alt}
                                    width={pair.after.width}
                                    height={pair.after.height}
                                    loading="eager"
                                />
                            )}

                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}